"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { registrationFields } from "@/data/registration";
import { buildN8nPayload, getN8nWebhookUrl } from "@/lib/n8n";
import { isRegistrationClosed } from "@/lib/registration";
import { Button } from "@/components/ui/button";
import { reachGoal } from "@/lib/ym";
import { contactItems } from "@/data/contacts";
import { TrackedLink } from "@/components/tracked-link";

const initialState = registrationFields.reduce<Record<string, string>>(
  (acc, field) => {
    acc[field.id] = "";
    return acc;
  },
  {}
);

export function RegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [closed] = useState(isRegistrationClosed());
  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  const missingFields = useMemo(() => {
    return registrationFields.filter((field) =>
      field.required ? !formState[field.id]?.trim() : false
    );
  }, [formState]);

  if (closed) {
    return (
      <div className="space-y-4 rounded-md border border-border/60 bg-surface p-6">
        <h2 className="text-xl font-semibold">Приём заявок закрыт</h2>
        <p className="mt-2 text-sm text-muted">
          Приём заявок завершён. Если есть вопросы — напишите нам в соцсети или на
          почту.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {contactItems.map((item) => (
            <TrackedLink
              key={item.label}
              href={item.href}
              goal={item.goal}
              className="rounded-md border border-border/60 bg-background/70 p-3 text-sm text-muted hover:text-foreground"
            >
              {item.label}: {item.value}
            </TrackedLink>
          ))}
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (missingFields.length > 0) {
      setError("Заполните обязательные поля.");
      reachGoal("form_validation_error");
      return;
    }
    setError(null);
    reachGoal("form_confirm_step");
    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const url = getN8nWebhookUrl();
    if (!url) {
      setError("Webhook не настроен.");
      setLoading(false);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const metadata = {
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      referrer: document.referrer || undefined,
      theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_term: params.get("utm_term") || undefined,
      utm_content: params.get("utm_content") || undefined,
    };

    const payload = buildN8nPayload(formState, metadata);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить заявку");
      }

      reachGoal("form_success");
      router.push("/thanks");
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Ошибка отправки"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {step === 1 && (
        <div className="space-y-4 rounded-md border border-border/60 bg-surface p-6">
          <h2 className="text-xl font-semibold">Шаг 1. Данные</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {registrationFields.map((field) => (
              <label key={field.id} className="space-y-2 text-sm">
                <span className="block text-muted">
                  {field.label} {field.required ? "*" : ""}
                </span>
                {field.type === "textarea" ? (
                  <textarea
                    className="min-h-[120px] w-full rounded-md border border-border/70 bg-background px-3 py-2 text-sm"
                    placeholder={field.placeholder}
                    value={formState[field.id]}
                    onFocus={() => {
                      if (!started) {
                        reachGoal("form_start");
                        setStarted(true);
                      }
                    }}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        [field.id]: event.target.value,
                      })
                    }
                  />
                ) : (
                  <input
                    type={field.type}
                    className="w-full rounded-md border border-border/70 bg-background px-3 py-2 text-sm"
                    placeholder={field.placeholder}
                    value={formState[field.id]}
                    onFocus={() => {
                      if (!started) {
                        reachGoal("form_start");
                        setStarted(true);
                      }
                    }}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        [field.id]: event.target.value,
                      })
                    }
                  />
                )}
              </label>
            ))}
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex justify-end">
            <Button type="button" onClick={handleNext}>
              Перейти к подтверждению
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 rounded-md border border-border/60 bg-surface p-6">
          <h2 className="text-xl font-semibold">Шаг 2. Проверьте данные</h2>
          <div className="space-y-2 text-sm text-muted">
            {registrationFields.map((field) => (
              <div key={field.id} className="flex flex-wrap gap-2">
                <span className="w-40 text-foreground">{field.label}</span>
                <span>{formState[field.id] || "—"}</span>
              </div>
            ))}
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={() => setStep(1)}>
              Назад
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Отправка..." : "Подтвердить и отправить"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
