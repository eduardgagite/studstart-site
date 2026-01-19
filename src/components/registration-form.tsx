"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registrationFields, stepTitles } from "@/data/registration";
import { buildN8nPayload } from "@/lib/n8n";
import { isRegistrationClosed, formatPhoneNumber, formatTelegram } from "@/lib/registration";
import { Button } from "@/components/ui/button";
import { reachGoal } from "@/lib/ym";
import { organizationContacts } from "@/data/contacts";
import { TrackedLink } from "@/components/tracked-link";
import { cn } from "@/lib/cn";
import { 
  FaExclamationCircle, 
  FaCheckCircle, 
  FaChevronRight, 
  FaChevronLeft,
  FaPaperPlane 
} from "react-icons/fa";

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
  const [closed, setClosed] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  // Check for registration closed client-side to match server time if needed, 
  // but usually safe to do in effect or initial state.
  useEffect(() => {
    setClosed(isRegistrationClosed());
  }, []);

  const totalSteps = Math.max(...registrationFields.map((f) => f.step)) + 1; // +1 for confirmation step
  const currentStepFields = useMemo(() => {
    return registrationFields.filter((field) => field.step === step);
  }, [step]);

  const progress = Math.min(((step - 1) / (totalSteps - 1)) * 100, 100);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleNext = () => {
    // Validate current step
    const missing = currentStepFields.filter((field) =>
      field.required ? !formState[field.id]?.trim() : false
    );

    if (missing.length > 0) {
      setError("Пожалуйста, заполните все обязательные поля.");
      reachGoal("form_validation_error");
      
      // Shake animation or focus effect could go here
      return;
    }

    setError(null);
    if (step < totalSteps) {
      setStep(step + 1);
      reachGoal(`form_step_${step}_complete`);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

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

    const payload = {
      ...buildN8nPayload(formState, metadata),
      honeypot,
    };

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Не удалось отправить заявку");
      }

      reachGoal("form_success");
      router.push("/thanks");
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Ошибка отправки"
      );
    } finally {
      window.clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const handleInputChange = (id: string, value: string) => {
    let formattedValue = value;

    if (id === "phone") {
      formattedValue = formatPhoneNumber(value);
    } else if (id === "telegram") {
      // For telegram we might want to be less aggressive during typing to allow editing,
      // but let's try strict formatting first as requested.
      // To prevent preventing deletion, only format if length > 0
      formattedValue = formatTelegram(value);
    }

    setFormState((prev) => ({ ...prev, [id]: formattedValue }));
    if (!started) {
      reachGoal("form_start");
      setStarted(true);
    }
  };

  if (closed) {
    return (
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 flex justify-center text-primary/80">
          <FaExclamationCircle className="h-20 w-20 animate-pulse" />
        </div>
        <h2 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          Регистрация завершена
        </h2>
        <p className="mt-4 text-lg text-muted">
          К сожалению, мы уже набрали участников. <br />
          Следите за новостями, чтобы не пропустить следующие мероприятия!
        </p>
        
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {organizationContacts.map((org) => (
            <div key={org.name} className="flex flex-col space-y-3 rounded-2xl border border-border/50 bg-surface/30 p-5 backdrop-blur-sm">
              <h3 className="font-semibold text-foreground/90">{org.name}</h3>
              <div className="flex flex-col gap-2">
                {org.socials.map((social) => (
                  <TrackedLink
                    key={`${org.name}-${social.label}`}
                    href={social.href}
                    goal={social.goal as any}
                    target="_blank"
                    className="group relative flex items-center justify-between rounded-xl border border-border/30 bg-surface/50 px-4 py-3 transition-all hover:border-primary/50 hover:bg-surface hover:shadow-sm"
                  >
                    <span className="text-sm font-medium text-muted transition-colors group-hover:text-foreground">
                      {social.label}
                    </span>
                    <span className="text-xs text-primary opacity-70 group-hover:opacity-100">
                      Перейти &rarr;
                    </span>
                  </TrackedLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isConfirmationStep = step === totalSteps;

  return (
    <div className="mx-auto max-w-5xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs uppercase tracking-wider text-muted">
          <span>Шаг {step} из {totalSteps}</span>
          <span>{isConfirmationStep ? "Подтверждение" : stepTitles[step]}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="section-shell section-glow mx-auto max-w-5xl">
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>
        {!isConfirmationStep ? (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold md:text-3xl">
              {stepTitles[step]}
            </h2>
            
            <div className="space-y-6">
              {currentStepFields.map((field) => (
                <div key={field.id} className="space-y-3">
                  <label className="block text-sm font-medium text-foreground/90">
                    {field.label} {field.required && <span className="text-primary">*</span>}
                  </label>
                  
                  {field.type === "textarea" ? (
                    <textarea
                      className="min-h-[140px] w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm transition focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10"
                      placeholder={field.placeholder}
                      value={formState[field.id]}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  ) : field.type === "select" ? (
                    <div className="relative">
                      <select
                        className="w-full appearance-none rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm transition focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10"
                        value={formState[field.id]}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                      >
                        <option value="" disabled>
                          {field.placeholder || "Выберите..."}
                        </option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  ) : field.type === "radio" ? (
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                      {field.options?.map((opt) => (
                        <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/40 bg-background/30 px-4 py-3 transition hover:border-primary/40 hover:bg-background/50">
                          <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-muted transition group-hover:border-primary">
                            <input
                              type="radio"
                              name={field.id}
                              value={opt}
                              checked={formState[field.id] === opt}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              className="peer h-full w-full opacity-0"
                            />
                            <div className={cn(
                              "absolute h-2.5 w-2.5 rounded-full bg-primary transition-transform duration-200",
                              formState[field.id] === opt ? "scale-100" : "scale-0"
                            )} />
                          </div>
                          <span className="text-sm">{opt}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm transition focus:border-primary/50 focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10"
                      placeholder={field.placeholder}
                      value={formState[field.id]}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FaCheckCircle className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">Проверьте данные</h2>
            </div>
            
            <div className="space-y-6 divide-y divide-border/40">
              {registrationFields.map((field) => (
                <div key={field.id} className="grid gap-2 pt-4 sm:grid-cols-3">
                  <span className="text-sm font-medium text-muted">{field.label}</span>
                  <span className="text-sm sm:col-span-2">{formState[field.id] || "—"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
            <FaExclamationCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          {step > 1 ? (
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handleBack}
              className="w-full sm:w-auto"
            >
              <FaChevronLeft className="mr-2 h-3 w-3" /> Назад
            </Button>
          ) : (
            <div /> // Spacer
          )}

          <Button 
            type="button" 
            onClick={isConfirmationStep ? handleSubmit : handleNext} 
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? (
              "Отправка..."
            ) : isConfirmationStep ? (
              <>Отправить заявку <FaPaperPlane className="ml-2 h-3 w-3" /></>
            ) : (
              <>Далее <FaChevronRight className="ml-2 h-3 w-3" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
