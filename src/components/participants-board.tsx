"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const FETCH_TIMEOUT_MS = 15000;

type Participant = {
  name: string;
  points: number;
};

type Group = {
  curator: string;
  participants: Participant[];
  totalPoints: number;
};

type LoadState = "loading" | "success" | "error";
type ViewMode = "overall" | "curators";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function unwrapPayload(payload: unknown): unknown {
  if (!isRecord(payload)) {
    return payload;
  }

  const candidates = ["data", "result", "payload", "items"];
  for (const key of candidates) {
    const candidate = payload[key];
    if (Array.isArray(candidate) || isRecord(candidate)) {
      return candidate;
    }
  }

  return payload;
}

function parsePoints(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const normalized = value.replace(",", ".");
    const parsed = Number.parseFloat(normalized);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return 0;
}

function parseParticipant(raw: unknown): Participant | null {
  if (!isRecord(raw)) return null;

  const nameCandidate =
    raw["ФИО"] ?? raw["fio"] ?? raw["name"] ?? raw["fullName"] ?? raw["full_name"];
  const pointsCandidate = raw["Баллы"] ?? raw["points"] ?? raw["score"];
  const name = typeof nameCandidate === "string" ? nameCandidate.trim() : "";

  if (!name) return null;

  return {
    name,
    points: parsePoints(pointsCandidate),
  };
}

function normalizeGroups(payload: unknown): Group[] {
  const unwrapped = unwrapPayload(payload);
  const entries: Array<[string, unknown]> = [];

  if (Array.isArray(unwrapped)) {
    for (const item of unwrapped) {
      if (!isRecord(item)) continue;
      entries.push(...Object.entries(item));
    }
  } else if (isRecord(unwrapped)) {
    entries.push(...Object.entries(unwrapped));
  }

  const groupMap = new Map<string, Participant[]>();

  for (const [curator, value] of entries) {
    if (!Array.isArray(value)) continue;
    const participants = value
      .map((item) => parseParticipant(item))
      .filter((item): item is Participant => Boolean(item));

    if (groupMap.has(curator)) {
      groupMap.get(curator)?.push(...participants);
    } else {
      groupMap.set(curator, participants);
    }
  }

  const groups: Group[] = [];
  for (const [curator, participants] of groupMap.entries()) {
    const totalPoints = participants.reduce((sum, participant) => sum + participant.points, 0);
    groups.push({ curator, participants, totalPoints });
  }

  return groups;
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function SkeletonGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-border/60 bg-surface/70 p-5 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-3 w-24 rounded-full bg-foreground/10" />
              <div className="h-6 w-32 rounded-full bg-foreground/10" />
            </div>
            <div className="h-10 w-16 rounded-full bg-foreground/10" />
          </div>
          <div className="mt-5 space-y-3">
            {Array.from({ length: 4 }).map((__, row) => (
              <div key={row} className="flex items-center justify-between">
                <div className="h-4 w-44 rounded-full bg-foreground/10" />
                <div className="h-6 w-12 rounded-full bg-foreground/10" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ParticipantsBoard() {
  const [status, setStatus] = useState<LoadState>("loading");
  const [groups, setGroups] = useState<Group[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("overall");
  const [isCompact, setIsCompact] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const loadData = useCallback(async () => {
    setStatus("loading");
    setErrorMessage(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_PARTICIPANTS_WEBHOOK_URL;
      if (!webhookUrl) {
        throw new Error("Не настроен адрес загрузки участников.");
      }

      const response = await fetch(webhookUrl, {
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Не удалось получить данные.");
      }

      const payload = (await response.json()) as unknown;
      const normalized = normalizeGroups(payload);

      if (!mountedRef.current) return;

      setGroups(normalized);
      setStatus("success");
      setLastUpdated(new Date());
    } catch (error) {
      if (!mountedRef.current) return;

      const message = error instanceof Error ? error.message : "Не удалось загрузить данные.";
      setErrorMessage(message);
      setStatus("error");
    } finally {
      clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const emptyState = status === "success" && groups.length === 0;

  const overallParticipants = useMemo(() => {
    const all = groups.flatMap((group) =>
      group.participants.map((participant) => ({
        ...participant,
        curator: group.curator,
      }))
    );

    return all.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return a.name.localeCompare(b.name, "ru");
    });
  }, [groups]);

  const podiumRowStyles = [
    "border-amber-300/40 bg-amber-300/10 text-amber-200",
    "border-slate-300/40 bg-slate-300/10 text-slate-200",
    "border-orange-300/40 bg-orange-300/10 text-orange-200",
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/70 p-4 md:p-5 animate-fade-up">
        <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-0 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  status === "loading" && "bg-primary animate-pulse-soft",
                  status === "error" && "bg-rose-400",
                  status === "success" && "bg-emerald-400"
                )}
              />
              <span>
                {status === "loading" && "Загрузка списка"}
                {status === "error" && "Ошибка загрузки"}
                {status === "success" && "Список обновлен"}
              </span>
            </div>
            <p className="text-xs text-muted">
              {status === "success" && lastUpdated
                ? `Обновлено: ${formatDate(lastUpdated)}`
                : "Загрузка может занять до 15 секунд."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full border border-border/60 bg-background/50 p-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              <button
                type="button"
                className={cn(
                  "relative rounded-full px-4 py-2 transition duration-300",
                  viewMode === "overall"
                    ? "bg-primary/10 text-primary ring-1 ring-primary/30 shadow-[0_8px_24px_rgba(37,99,235,0.18)]"
                    : "hover:text-foreground/80"
                )}
                onClick={() => setViewMode("overall")}
              >
                Общая таблица
              </button>
              <button
                type="button"
                className={cn(
                  "relative rounded-full px-4 py-2 transition duration-300",
                  viewMode === "curators"
                    ? "bg-primary/10 text-primary ring-1 ring-primary/30 shadow-[0_8px_24px_rgba(37,99,235,0.18)]"
                    : "hover:text-foreground/80"
                )}
                onClick={() => setViewMode("curators")}
              >
                По кураторам
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsCompact((value) => !value)}
              className={cn(
                "inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted transition duration-300",
                isCompact
                  ? "border-primary/50 text-primary shadow-[0_8px_24px_rgba(37,99,235,0.18)]"
                  : "hover:border-primary/50 hover:text-foreground"
              )}
              aria-label={isCompact ? "Отключить компактный вид" : "Включить компактный вид"}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h10" />
              </svg>
            </button>
            <button
              type="button"
              onClick={loadData}
              disabled={status === "loading"}
              className={cn(
                "inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted transition duration-300",
                status === "loading"
                  ? "opacity-60"
                  : "hover:border-primary/50 hover:text-foreground"
              )}
              aria-label="Обновить"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className={cn("h-4 w-4", status === "loading" && "animate-spin")}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <path d="M21 3v6h-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {status === "loading" && (
        <div className="animate-pulse">
          <SkeletonGrid />
        </div>
      )}

      {status === "error" && (
        <div className="rounded-2xl border border-border/60 bg-surface/70 p-6">
          <p className="text-sm text-muted">
            {errorMessage ?? "Не удалось загрузить список участников. Попробуйте еще раз."}
          </p>
          <div className="mt-4">
            <Button type="button" variant="secondary" size="sm" onClick={loadData}>
              Повторить
            </Button>
          </div>
        </div>
      )}

      {status === "success" && !emptyState && viewMode === "curators" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {groups.map((group, index) => (
            <div
              key={group.curator}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40 md:p-6 animate-fade-up"
              style={{ "--delay": `${index * 90}ms` } as CSSProperties}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">Куратор</p>
                  <h3 className="mt-2 text-xl font-semibold">{group.curator}</h3>
                  <p className="mt-1 text-xs text-muted">Участников: {group.participants.length}</p>
                </div>
                <div className="rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {group.totalPoints} баллов
                </div>
              </div>

              <div className="mt-5 divide-y divide-border/40">
                {group.participants.map((participant, participantIndex) => {
                  const hasPoints = participant.points > 0;

                  return (
                    <div
                      key={`${group.curator}-${participant.name}-${participantIndex}`}
                      className={cn(
                        "flex items-center justify-between gap-4 text-sm",
                        isCompact ? "py-2 text-[13px]" : "py-3"
                      )}
                    >
                      <span className="min-w-0 truncate font-medium">{participant.name}</span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
                          hasPoints
                            ? "bg-primary/10 text-primary"
                            : "bg-background/70 text-muted"
                        )}
                      >
                        {participant.points}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {status === "success" && !emptyState && viewMode === "overall" && (
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/70 p-5 md:p-6 animate-fade-up">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Общая таблица</p>
              <h3 className="mt-2 text-2xl font-semibold">Все участники</h3>
              <p className="mt-1 text-xs text-muted">Всего: {overallParticipants.length}</p>
            </div>
            <div className="rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Сортировка: по баллам
            </div>
          </div>

          <div className={cn("mt-6 space-y-3", isCompact && "space-y-2")}>
            {overallParticipants.map((participant, index) => {
              const hasPoints = participant.points > 0;
              const isPodium = index < 3;

              return (
                <div
                  key={`${participant.name}-${participant.curator}-${index}`}
                  className={cn(
                    "group relative flex flex-wrap items-center justify-between gap-3 overflow-hidden rounded-2xl border border-border/40 bg-background/40 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface/80",
                    isCompact ? "px-3 py-2 text-[13px]" : "px-4 py-3",
                    isPodium && "shadow-[0_16px_40px_rgba(0,0,0,0.18)]",
                    isPodium ? podiumRowStyles[index] : ""
                  )}
                >
                  {isPodium && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-0 h-full w-1.5",
                        index === 0 && "bg-amber-300/70",
                        index === 1 && "bg-slate-300/70",
                        index === 2 && "bg-orange-300/70"
                      )}
                    />
                  )}
                  {isPodium && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-3xl"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                          isPodium
                            ? podiumRowStyles[index]
                            : "border-border/60 bg-background/60 text-muted"
                        )}
                      >
                        {isPodium ? (
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M8 12l-2 8 6-3 6 3-2-8" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </span>
                      <p className={cn("truncate font-medium", isPodium && "text-foreground")}>
                        {participant.name}
                      </p>
                    </div>
                    <p
                      className={cn(
                        isCompact ? "text-[11px]" : "text-xs",
                        isPodium ? "text-foreground/70" : "text-muted"
                      )}
                    >
                      Куратор: {participant.curator}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
                      hasPoints
                        ? "bg-primary/10 text-primary"
                        : "bg-background/70 text-muted"
                    )}
                  >
                    {participant.points}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {emptyState && (
        <div className="rounded-2xl border border-border/60 bg-surface/70 p-6 text-sm text-muted">
          Список участников пока пуст.
        </div>
      )}
    </div>
  );
}
