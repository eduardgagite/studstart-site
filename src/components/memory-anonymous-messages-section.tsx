"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const REFRESH_INTERVAL_MS = 30_000;
const FETCH_TIMEOUT_MS = 12_000;

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
  "Длинное: Вчера после ужина мы случайно устроили мини-квиз в коридоре, и это было так смешно, что половина корпуса прибежала посмотреть. Можно ли официально сделать такой формат еще раз?",
  "Длинное: Я очень хочу поблагодарить кураторов - они реально помогли почувствовать себя частью команды, объясняли всё спокойно и без формальностей. Это сильно сняло напряжение у первокурсников, спасибо!",
  "Очень длинное: Ребята, это, наверное, самый яркий выезд за всё время учёбы. Мы познакомились с кучей людей, успели и поработать, и отдохнуть, и даже придумать несколько идей для будущих мероприятий. Было бы классно, если бы в следующем году оставили такой же формат, но добавили чуть больше времени на общение между командами и небольшие свободные окна, чтобы можно было обсудить всё не в спешке. Спасибо вам за организацию, атмосферу и внимание к мелочам!",
  "Очень длинное: Хочу спросить у ведущего - когда вы придумываете такие сценарии и тайминги, вы реально всё это тестируете заранее? Потому что ощущение, что программа очень плотная, но при этом всё успевается, и это удивляет. Может, поделитесь лайфхаками подготовки? Нам будет полезно для будущих событий.",
];

type LoadState = "loading" | "success" | "error";
type FilterMode = "date" | "all";
type SortMode = "newest" | "oldest";

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
    .replace(/\r\n?/g, "\n")
    .trim();
}

function parseQuestion(raw: unknown, fallbackId: string): QuestionItem | null {
  if (!isRecord(raw)) return null;

  const textCandidate =
    raw.text ??
    raw.question ??
    raw.message ??
    raw.value ??
    raw.content;

  const text = typeof textCandidate === "string" ? normalizeText(textCandidate) : "";
  if (!text) return null;

  const createdCandidate =
    raw.created_at ??
    raw.createdAt ??
    raw.timestamp ??
    raw.time ??
    raw.date;

  const createdAt = parseDate(createdCandidate);

  const idCandidate = raw.id ?? raw._id ?? raw.uuid;
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

export function MemoryAnonymousMessagesSection() {
  const isDev = process.env.NODE_ENV === "development";
  const devBaseRef = useRef(new Date());
  const mockItems = useMemo(() => buildMockQuestions(devBaseRef.current), []);
  const [status, setStatus] = useState<LoadState>("loading");
  const [items, setItems] = useState<QuestionItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [selectedDate, setSelectedDate] = useState<string>(() => toLocalDateKey(new Date()));
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
      setItems(mockItems);
      setStatus("success");
      setErrorMessage(null);
      setLastUpdated(new Date());
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
  }, [isDev, items.length, mockItems]);

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

    if (!selectedDate) return [];
    const chosen = new Date(`${selectedDate}T00:00:00`);
    if (Number.isNaN(chosen.getTime())) return [];
    const start = startOfDay(chosen);
    const end = endOfDay(chosen);

    return items.filter((item) => {
      if (!item.createdAt) return false;
      return item.createdAt >= start && item.createdAt <= end;
    });
  }, [filterMode, items, selectedDate]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const timeA = a.createdAt?.getTime();
      const timeB = b.createdAt?.getTime();
      const safeA = typeof timeA === "number" ? timeA : null;
      const safeB = typeof timeB === "number" ? timeB : null;

      if (safeA === null && safeB === null) return 0;
      if (safeA === null) return 1;
      if (safeB === null) return -1;

      return sortMode === "newest" ? safeB - safeA : safeA - safeB;
    });
  }, [filteredItems, sortMode]);

  const emptyState = status === "success" && sortedItems.length === 0;

  return (
    <section className="section-shell memory-anonymous-shell space-y-6">
      <div className="memory-anonymous-headline space-y-3">
        <p className="section-eyebrow">Анонимные сообщения</p>
        <h2 className="text-2xl font-semibold md:text-3xl">Голоса форума без имён</h2>
        <p className="memory-anonymous-copy">
          Сообщения берутся из общей ленты и автоматически обновляются каждые 30 секунд.
          {lastUpdated ? (
            <span className="memory-anonymous-copy-updated">
              Последнее обновление: {formatTimestamp(lastUpdated)}.
            </span>
          ) : null}
        </p>
        <div className="memory-anonymous-stats">
          <span>Показано: {sortedItems.length}</span>
          <span>Всего: {items.length}</span>
        </div>
      </div>

      <div className="memory-anonymous-toolbar">
        <section className="memory-anonymous-control-group" data-group="period" aria-label="Фильтр сообщений">
          <p className="memory-anonymous-control-title">Период</p>
          <div className="memory-anonymous-control-row" role="tablist" aria-label="Фильтр сообщений">
            <button
              type="button"
              className={cn("memory-anonymous-control-btn", filterMode === "date" && "is-active")}
              onClick={() => setFilterMode("date")}
            >
              <span className="memory-anonymous-control-btn-icon" aria-hidden>●</span>
              <span>Дата</span>
            </button>
            <button
              type="button"
              className={cn("memory-anonymous-control-btn", filterMode === "all" && "is-active")}
              onClick={() => setFilterMode("all")}
            >
              <span className="memory-anonymous-control-btn-icon" aria-hidden>∞</span>
              <span>Все</span>
            </button>
          </div>
          {filterMode === "date" && (
            <div className="memory-anonymous-date-wrap">
              {availableDates.length > 0 ? (
                <select
                  className="memory-anonymous-date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                >
                  {availableDates.map((date) => {
                    const parsed = new Date(`${date}T00:00:00`);
                    const label = Number.isNaN(parsed.getTime())
                      ? date
                      : formatDateLabel(parsed);
                    return (
                      <option key={date} value={date}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  type="date"
                  className="memory-anonymous-date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                />
              )}
            </div>
          )}
        </section>

        <section className="memory-anonymous-control-group" data-group="sort" aria-label="Сортировка по дате">
          <p className="memory-anonymous-control-title">Сортировка</p>
          <div className="memory-anonymous-control-row" role="tablist" aria-label="Сортировка по дате">
            <button
              type="button"
              className={cn("memory-anonymous-control-btn", sortMode === "newest" && "is-active")}
              onClick={() => setSortMode("newest")}
            >
              <span className="memory-anonymous-control-btn-icon" aria-hidden>↓</span>
              <span>Сначала новые</span>
            </button>
            <button
              type="button"
              className={cn("memory-anonymous-control-btn", sortMode === "oldest" && "is-active")}
              onClick={() => setSortMode("oldest")}
            >
              <span className="memory-anonymous-control-btn-icon" aria-hidden>↑</span>
              <span>Сначала старые</span>
            </button>
          </div>
        </section>

        <section
          className="memory-anonymous-control-group memory-anonymous-control-group-service"
          data-group="service"
          aria-label="Действия"
        >
          <p className="memory-anonymous-control-title">Сервис</p>
          <div className="memory-anonymous-control-row">
            <button
              type="button"
              className={cn("memory-anonymous-control-btn memory-anonymous-control-btn-refresh", isRefreshing && "is-loading")}
              onClick={loadData}
              disabled={isRefreshing}
            >
              <span className="memory-anonymous-control-btn-icon" aria-hidden>↻</span>
              <span>{isRefreshing ? "Обновление..." : "Обновить"}</span>
            </button>
          </div>
        </section>
      </div>

      <div className="memory-anonymous-cards" role="list" aria-label="Лента анонимных сообщений">
        {status === "loading" && (
          <p className="memory-anonymous-state">Загрузка сообщений...</p>
        )}

        {status === "error" && (
          <p className="memory-anonymous-state">{errorMessage ?? "Не удалось загрузить сообщения."}</p>
        )}

        {emptyState && (
          <p className="memory-anonymous-state">По выбранному фильтру пока нет сообщений.</p>
        )}

        {sortedItems.map((item, index) => (
          <article key={`${item.id}-${index}`} className="memory-anonymous-card">
            <p className="memory-anonymous-card-text">{item.text}</p>
            <p className="memory-anonymous-card-time">
              {item.createdAt ? formatTimestamp(item.createdAt) : "Время не указано"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
