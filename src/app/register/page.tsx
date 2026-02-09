import type { Metadata } from "next";
import { RegistrationForm } from "@/components/registration-form";
import { PageGoal } from "@/components/page-goal";
import { FaRocket, FaExclamationCircle } from "react-icons/fa";
import { TrackedButton } from "@/components/tracked-button";
import { isRegistrationClosed } from "@/lib/registration";

export const metadata: Metadata = {
  title: "Регистрация завершена | СтудСтарт",
  description:
    "Регистрация завершена. Форум СтудСтарт проходит 8–12 февраля 2026. Смотрите программу и контакты.",
};

export default function RegisterPage() {
  const registrationClosed = isRegistrationClosed();

  return (
    <div>
      <PageGoal goal="visit_register" />
      
      <section className="section-panel panel-sky pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="section-inner container mx-auto px-4">
          <header className="mb-12 text-center animate-fade-up">
            <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-glow transition hover:bg-primary/10 hover:border-primary/30 cursor-default">
               <FaRocket className="h-4 w-4" />
               <span>Форум идет</span>
            </div>
            <h1 className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              Регистрация завершена
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted leading-relaxed">
              Форум СтудСтарт проходит 8–12 февраля 2026. 
              Следи за программой и новостями, а если есть вопросы — напиши команде.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <TrackedButton href="/program" variant="primary">
                Смотреть программу
              </TrackedButton>
              <TrackedButton href="/contacts" variant="secondary">
                Контакты штаба
              </TrackedButton>
            </div>
          </header>

          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            {registrationClosed || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ? (
              <RegistrationForm />
            ) : (
              <div className="mx-auto max-w-2xl text-center rounded-2xl border border-red-500/20 bg-red-500/10 p-8 backdrop-blur-sm">
                <div className="mb-4 flex justify-center text-red-400">
                  <FaExclamationCircle className="h-12 w-12" />
                </div>
                <h2 className="text-xl font-bold text-red-400 md:text-2xl mb-2">
                  Отправка заявок недоступна
                </h2>
                <p className="text-muted text-lg">
                  Обратитесь к тех. администратору
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
