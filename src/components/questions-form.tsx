"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const SUBMIT_TIMEOUT_MS = 12000;

type SubmitStatus = "idle" | "sending" | "success" | "error";

function getSubmitErrorMessage(error: unknown) {
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
  return "Не удалось отправить сообщение. Попробуйте позже.";
}

export function QuestionsForm() {
  const isDev = process.env.NODE_ENV === "development";
  const [text, setText] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const normalizedText = useMemo(
    () => text.replace(/\s+/g, " ").trim(),
    [text]
  );
  const isSending = status === "sending";

  const resetController = () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = null;
  };

  const handleSubmit = async () => {
    if (!normalizedText) {
      setError("Напишите текст сообщения.");
      setStatus("error");
      return;
    }

    if (honeypot && honeypot.trim().length > 0) {
      setError("Некорректные данные.");
      setStatus("error");
      return;
    }

    if (isDev) {
      setStatus("sending");
      setError(null);
      window.setTimeout(() => {
        setText("");
        setStatus("success");
      }, 400);
      return;
    }

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_QUESTIONS_URL;
    if (!webhookUrl) {
      setError("Сервис отправки сообщений пока не настроен.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError(null);
    resetController();

    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const payload = {
        text: normalizedText,
        created_at: new Date().toISOString(),
        page_url: window.location.href,
        referrer: document.referrer || undefined,
        request_id: crypto.randomUUID(),
        source: "participants",
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить сообщение. Попробуйте позже.");
      }

      setText("");
      setStatus("success");
    } catch (submitError) {
      setError(getSubmitErrorMessage(submitError));
      setStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
      resetController();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/70 p-6 md:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative space-y-5">
        <div className="space-y-3">
          <p className="section-eyebrow">Анонимные сообщения</p>
          <h2 className="text-2xl font-semibold md:text-3xl">
            Отправить анонимное сообщение
          </h2>
          <p className="text-sm text-muted md:text-base">
            Пиши всё, что хочется сказать форуму: шутки, идеи, благодарности. Пожалуйста, пишите в рамках
            цензуры. Эдуард следит за вами...
          </p>
        </div>

        <div className="sr-only" aria-hidden="true">
          <label htmlFor="question-company">Company</label>
          <input
            id="question-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <textarea
            className="min-h-[160px] w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm transition focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10 md:text-base"
            placeholder="Например: «На форуме очень крутой диджей»"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              if (status !== "idle") {
                setStatus("idle");
                setError(null);
              }
            }}
          />
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
            <span>Это анонимное сообщение.</span>
            <span>{text.length} символов</span>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {status === "success" && !error && (
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
            Сообщение отправлено! Спасибо.
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-muted">
            Отправка занимает пару секунд. Не закрывайте страницу во время отправки.
          </span>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSending}
            className={cn("w-full sm:w-auto", isSending && "cursor-wait")}
          >
            {isSending ? "Отправка..." : "Отправить сообщение"}
          </Button>
        </div>
      </div>
    </div>
  );
}
