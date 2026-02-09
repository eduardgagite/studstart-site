"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { assetPath } from "@/lib/assets";
import { cn } from "@/lib/cn";

const REFRESH_INTERVAL_MS = 30_000;
const FETCH_TIMEOUT_MS = 12_000;

type LoadState = "loading" | "success" | "error";
type FilterMode = "today" | "yesterday" | "date" | "all";

type QuestionItem = {
  id: string;
  text: string;
  createdAt: Date | null;
};

function parseJsonMaybe(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function unwrapPayload(payload: unknown): unknown {
  if (!isRecord(payload)) {
    return payload;
  }

  const candidates = ["data", "result", "payload", "items", "questions"];
  for (const key of candidates) {
    const candidate = payload[key];
    if (Array.isArray(candidate) || isRecord(candidate)) {
      return candidate;
    }
  }

  return payload;
}

function toLocalDateKey(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDate(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    const millis = value > 10_000_000_000 ? value : value * 1000;
    const date = new Date(millis);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = new Date(trimmed);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
}

function parseQuestion(raw: unknown, fallbackId: string): QuestionItem | null {
  if (!isRecord(raw)) return null;

  const textCandidate =
    raw["text"] ??
    raw["question"] ??
    raw["message"] ??
    raw["value"] ??
    raw["content"];

  const text = typeof textCandidate === "string" ? textCandidate.trim() : "";
  if (!text) return null;

  const createdCandidate =
    raw["created_at"] ??
    raw["createdAt"] ??
    raw["timestamp"] ??
    raw["time"] ??
    raw["date"];

  const createdAt = parseDate(createdCandidate);

  const idCandidate = raw["id"] ?? raw["_id"] ?? raw["uuid"];
  let id = fallbackId;
  if (typeof idCandidate === "string" && idCandidate.trim()) {
    id = idCandidate.trim();
  } else if (typeof idCandidate === "number" && Number.isFinite(idCandidate)) {
    id = String(idCandidate);
  }

  return { id, text, createdAt };
}

function normalizeQuestions(payload: unknown): QuestionItem[] {
  const parsed = parseJsonMaybe(payload);
  const unwrapped = unwrapPayload(parsed);
  const items: unknown[] = [];

  if (Array.isArray(unwrapped)) {
    items.push(...unwrapped);
  } else if (isRecord(unwrapped)) {
    if (Array.isArray(unwrapped.items)) {
      items.push(...(unwrapped.items as unknown[]));
    } else if (Array.isArray(unwrapped.data)) {
      items.push(...(unwrapped.data as unknown[]));
    } else {
      items.push(unwrapped);
    }
  }

  return items
    .map((item, index) => parseQuestion(item, `question-${index}`))
    .filter((item): item is QuestionItem => Boolean(item));
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function endOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}

function formatDateLabel(value: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(value);
}

function formatTimestamp(value: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export function QuestionsDisplay() {
  const [status, setStatus] = useState<LoadState>("loading");
  const [items, setItems] = useState<QuestionItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [filterMode, setFilterMode] = useState<FilterMode>("today");
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    toLocalDateKey(new Date())
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const loadData = useCallback(async () => {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_QUESTIONS_URL;
    if (!webhookUrl) {
      setStatus("error");
      setErrorMessage("Не настроен адрес ленты сообщений.");
      return;
    }

    setIsRefreshing(true);
    if (items.length === 0) {
      setStatus("loading");
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const response = await fetch(webhookUrl, {
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Не удалось получить список сообщений.");
      }

      const payload = (await response.json()) as unknown;
      const normalized = normalizeQuestions(payload);

      if (!mountedRef.current) return;

      setItems(normalized);
      setStatus("success");
      setLastUpdated(new Date());
      setErrorMessage(null);
    } catch (error) {
      if (!mountedRef.current) return;
      const message =
        error instanceof Error ? error.message : "Не удалось загрузить сообщения.";
      setErrorMessage(message);
      setStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
      if (mountedRef.current) {
        setIsRefreshing(false);
      }
    }
  }, [items.length]);

  useEffect(() => {
    loadData();
    const intervalId = window.setInterval(loadData, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [loadData]);

  const availableDates = useMemo(() => {
    const dates = new Set<string>();
    for (const item of items) {
      if (!item.createdAt) continue;
      dates.add(toLocalDateKey(item.createdAt));
    }
    return Array.from(dates).sort((a, b) => b.localeCompare(a));
  }, [items]);

  useEffect(() => {
    if (filterMode !== "date") return;
    if (!availableDates.length) return;
    if (!availableDates.includes(selectedDate)) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, filterMode, selectedDate]);

  const filteredItems = useMemo(() => {
    if (filterMode === "all") {
      return items;
    }

    let start: Date | null = null;
    let end: Date | null = null;

    if (filterMode === "today") {
      const today = new Date();
      start = startOfDay(today);
      end = endOfDay(today);
    } else if (filterMode === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      start = startOfDay(yesterday);
      end = endOfDay(yesterday);
    } else if (filterMode === "date") {
      if (!selectedDate) return [];
      const chosen = new Date(`${selectedDate}T00:00:00`);
      if (Number.isNaN(chosen.getTime())) return [];
      start = startOfDay(chosen);
      end = endOfDay(chosen);
    }

    return items.filter((item) => {
      if (!item.createdAt || !start || !end) return false;
      return item.createdAt >= start && item.createdAt <= end;
    });
  }, [filterMode, items, selectedDate]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const timeA = a.createdAt?.getTime() ?? 0;
      const timeB = b.createdAt?.getTime() ?? 0;
      return timeB - timeA;
    });
  }, [filteredItems]);

  const emptyState = status === "success" && sortedItems.length === 0;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#0b1020] text-slate-100">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src={assetPath("/images/hero-mountains.webp")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40 animate-kenburns"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(68,170,255,0.35),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(39,109,255,0.25),transparent_55%)]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,16,32,0.35) 0%, rgba(11,16,32,0.8) 55%, rgba(11,16,32,0.98) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col gap-8 overflow-hidden px-6 py-8 md:px-12 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-300/80">
              Экран ведущего
            </p>
            <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
              Анонимные сообщения
            </h1>
            <p className="text-sm text-slate-300/80 md:text-base">
              Автообновление каждые 30 секунд.
              {lastUpdated ? ` Последнее обновление: ${formatTimestamp(lastUpdated)}.` : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200/80">
              <button
                type="button"
                className={cn(
                  "rounded-full px-4 py-2 transition",
                  filterMode === "today"
                    ? "bg-white/15 text-white"
                    : "hover:text-white"
                )}
                onClick={() => setFilterMode("today")}
              >
                Сегодня
              </button>
              <button
                type="button"
                className={cn(
                  "rounded-full px-4 py-2 transition",
                  filterMode === "yesterday"
                    ? "bg-white/15 text-white"
                    : "hover:text-white"
                )}
                onClick={() => setFilterMode("yesterday")}
              >
                Вчера
              </button>
              <button
                type="button"
                className={cn(
                  "rounded-full px-4 py-2 transition",
                  filterMode === "date"
                    ? "bg-white/15 text-white"
                    : "hover:text-white"
                )}
                onClick={() => setFilterMode("date")}
              >
                По дате
              </button>
              <button
                type="button"
                className={cn(
                  "rounded-full px-4 py-2 transition",
                  filterMode === "all"
                    ? "bg-white/15 text-white"
                    : "hover:text-white"
                )}
                onClick={() => setFilterMode("all")}
              >
                Все
              </button>
            </div>

            {filterMode === "date" && (
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-200/80">
                {availableDates.length > 0 ? (
                  <select
                    className="bg-transparent text-xs uppercase tracking-[0.22em] text-white focus:outline-none"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                  >
                    {availableDates.map((date) => {
                      const parsed = new Date(`${date}T00:00:00`);
                      const label = Number.isNaN(parsed.getTime())
                        ? date
                        : formatDateLabel(parsed);
                      return (
                        <option key={date} value={date} className="text-black">
                          {label}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    type="date"
                    className="bg-transparent text-xs uppercase tracking-[0.22em] text-white focus:outline-none"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                  />
                )}
              </div>
            )}

            <button
              type="button"
              onClick={loadData}
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-200/80 transition",
                isRefreshing ? "opacity-60" : "hover:border-white/30 hover:text-white"
              )}
              disabled={isRefreshing}
            >
              {isRefreshing ? "Обновление..." : "Обновить"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-slate-300/80">
          <span>Показано: {sortedItems.length}</span>
          <span>Всего: {items.length}</span>
        </div>

        <div className="flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-white/5 p-6">
          {status === "loading" && (
            <div className="text-sm text-slate-300/80">Загрузка сообщений...</div>
          )}

          {status === "error" && (
            <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-5 text-sm text-red-200">
              {errorMessage ?? "Не удалось загрузить сообщения."}
            </div>
          )}

          {emptyState && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300/80">
              Пока нет сообщений по выбранному фильтру.
            </div>
          )}

          {sortedItems.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {sortedItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-5 text-base leading-relaxed text-white/90 shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-400/10 blur-3xl" />
                  <p className="relative">{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
