"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { assetPath } from "@/lib/assets";
import { cn } from "@/lib/cn";

const REFRESH_INTERVAL_MS = 30_000;
const FETCH_TIMEOUT_MS = 12_000;
const DISPLAY_PARTICLES = [
  { left: "8%", top: "18%", size: 6, opacity: 0.55, duration: "14s", delay: "0s" },
  { left: "22%", top: "8%", size: 4, opacity: 0.45, duration: "12s", delay: "1s" },
  { left: "38%", top: "24%", size: 5, opacity: 0.5, duration: "16s", delay: "0.5s" },
  { left: "52%", top: "10%", size: 3, opacity: 0.35, duration: "10s", delay: "0.2s" },
  { left: "66%", top: "18%", size: 6, opacity: 0.6, duration: "18s", delay: "0.8s" },
  { left: "78%", top: "6%", size: 4, opacity: 0.45, duration: "13s", delay: "0.4s" },
  { left: "88%", top: "20%", size: 5, opacity: 0.5, duration: "17s", delay: "0.6s" },
  { left: "12%", top: "54%", size: 5, opacity: 0.4, duration: "19s", delay: "0.9s" },
  { left: "30%", top: "62%", size: 4, opacity: 0.35, duration: "15s", delay: "1.1s" },
  { left: "58%", top: "58%", size: 6, opacity: 0.55, duration: "20s", delay: "0.3s" },
  { left: "72%", top: "64%", size: 4, opacity: 0.4, duration: "14s", delay: "0.7s" },
  { left: "86%", top: "52%", size: 5, opacity: 0.45, duration: "16s", delay: "0.2s" },
];

const DEV_MESSAGES = [
  "На форуме очень крутой диджей",
  "Кто придумал тему для квиза? Было смешно!",
  "Спасибо за атмосферу, вы лучшие!",
  "Где можно взять плед? Очень уютно.",
  "Можно больше кофе на завтраке?",
  "Сколько нужно баллов, чтобы попасть в топ?",
  "Фотограф ловит лучшие моменты, респект.",
  "Музыка на вечернем мероприятии 🔥",
  "Когда будет следующий квест?",
  "Передайте привет 2 группе!",
  "Предлагаю флешмоб на открытии.",
  "Где найти расписание на завтра?",
  "Отдельный лайк за горы.",
  "У кого есть зарядка USB-C?",
  "Кто ведет утреннюю зарядку? Класс!",
  "Сделайте фотозону побольше.",
  "Саша, ты супер ведущий!",
  "Хочу стикеры форума.",
  "Спасибо за организацию, всё чётко.",
  "Можно ли добавить настольные игры?",
  "Хочу повторить квиз, было топово.",
  "Где найти куратора моей группы?",
  "Пусть будет больше мемов на экране!",
  "Я в восторге от атмосферы.",
  "Сделайте плейлист форума доступным.",
  "Кто отвечает за свет? Он огонь.",
  "Ведущий, ты топ!",
  "Хочу ещё вечерних активностей.",
  "Где взять мерч?",
  "Вопрос: будут ли призы за активность?",
  "Нужны ли нам дополнительные бейджи?",
  "Пусть будет ещё больше фото.",
  "Сегодня лучший день форума!",
  "Классно, что всё по таймингу.",
  "Орги, вы супер команда!",
];

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

function buildMockQuestions(base: Date): QuestionItem[] {
  return DEV_MESSAGES.map((text, index) => {
    const createdAt = new Date(base);
    const dayOffset = Math.floor(index / 9);
    createdAt.setDate(base.getDate() - dayOffset);
    createdAt.setMinutes(base.getMinutes() - index * 11);
    return {
      id: `dev-${index + 1}`,
      text,
      createdAt,
    };
  });
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

function normalizeText(value: string) {
  return value
    .replace(/\p{Cf}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseQuestion(raw: unknown, fallbackId: string): QuestionItem | null {
  if (!isRecord(raw)) return null;

  const textCandidate =
    raw["text"] ??
    raw["question"] ??
    raw["message"] ??
    raw["value"] ??
    raw["content"];

  const text =
    typeof textCandidate === "string" ? normalizeText(textCandidate) : "";
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

function getFetchErrorMessage(error: unknown) {
  if (error instanceof Error) {
    const message = error.message || "";
    if (/AbortError/i.test(error.name)) {
      return "Время ожидания истекло. Попробуйте еще раз.";
    }
    if (/failed to fetch/i.test(message) || /networkerror/i.test(message) || /load failed/i.test(message)) {
      return "Не удалось подключиться к сервису. Проверьте интернет или доступность вебхука.";
    }
    if (/string did not match the expected pattern/i.test(message) || /invalid url/i.test(message)) {
      return "Неверный адрес сервиса. Проверьте URL вебхука.";
    }
    return message;
  }
  return "Не удалось загрузить сообщения.";
}

export function QuestionsDisplay() {
  const isDev = process.env.NODE_ENV === "development";
  const devBaseRef = useRef(new Date());
  const mockItems = useMemo(() => buildMockQuestions(devBaseRef.current), []);
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
    if (isDev) {
      if (!mountedRef.current) return;
      setIsRefreshing(true);
      window.setTimeout(() => {
        if (!mountedRef.current) return;
        setLastUpdated(new Date());
        setIsRefreshing(false);
      }, 300);
      return;
    }

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
      setErrorMessage(getFetchErrorMessage(error));
      setStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
      if (mountedRef.current) {
        setIsRefreshing(false);
      }
    }
  }, [isDev, items.length]);

  useEffect(() => {
    if (isDev) {
      setItems(mockItems);
      setStatus("success");
      setLastUpdated(new Date());
      setErrorMessage(null);
      return;
    }

    loadData();
    const intervalId = window.setInterval(loadData, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [isDev, loadData, mockItems]);

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
          className="object-cover opacity-30 animate-kenburns"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(68,170,255,0.45),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(39,109,255,0.35),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(120deg, rgba(76,148,255,0.3), rgba(45,212,255,0.12), transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-35 mix-blend-soft-light"
          style={{
            background:
              "repeating-linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 1px, transparent 1px, transparent 4px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,16,32,0.2) 0%, rgba(11,16,32,0.75) 55%, rgba(11,16,32,0.98) 100%)",
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0">
        {DISPLAY_PARTICLES.map((particle, index) => (
          <span
            key={`particle-${index}`}
            className="display-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col gap-8 overflow-hidden px-6 py-8 md:px-12 md:py-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-200/80">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              Live
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">
                Экран ведущего
              </p>
              <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                Анонимные сообщения
              </h1>
              <p className="text-sm text-slate-300/80 md:text-base">
                Автообновление каждые 30 секунд.
                {lastUpdated
                  ? ` Последнее обновление: ${formatTimestamp(lastUpdated)}.`
                  : ""}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-slate-300/80">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Показано: {sortedItems.length}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Всего: {items.length}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
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
                "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-200/80 transition",
                isRefreshing ? "opacity-60" : "hover:border-white/30 hover:text-white"
              )}
              disabled={isRefreshing}
            >
              {isRefreshing ? "Обновление..." : "Обновить"}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
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
                  className="rounded-2xl border border-white/10 bg-white/10 p-5 text-base leading-relaxed text-white/90 shadow-[0_20px_40px_rgba(0,0,0,0.28)] backdrop-blur-md animate-fade-up"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {item.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
