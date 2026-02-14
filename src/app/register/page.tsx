import type { Metadata } from "next";
import { PageGoal } from "@/components/page-goal";
import { FaCheckCircle } from "react-icons/fa";
import { TrackedButton } from "@/components/tracked-button";

export const metadata: Metadata = {
  title: "Форум завершен | СтудСтарт",
  description:
    "Форум СтудСтарт успешно завершился 12 февраля 2026. Смотрите программу, итоги и контакты команды.",
};

export default function RegisterPage() {
  return (
    <div>
      <PageGoal goal="visit_register" />
      
      <section className="section-panel panel-sky pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="section-inner container mx-auto px-4">
          <header className="mb-12 text-center animate-fade-up">
            <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-glow transition hover:bg-primary/10 hover:border-primary/30 cursor-default">
               <FaCheckCircle className="h-4 w-4" />
               <span>Форум завершён</span>
            </div>
            <h1 className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              СтудСтарт 2026 завершён
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted leading-relaxed">
              Форум успешно прошёл 8-12 февраля 2026. Спасибо участникам, кураторам и организаторам за сильный выезд.
              Здесь можно посмотреть, как это было, и связаться с командой.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <TrackedButton href="/about" variant="primary">
                Как это было
              </TrackedButton>
              <TrackedButton href="/about" variant="secondary">
                Смотреть итоги
              </TrackedButton>
              <TrackedButton href="/contacts" variant="secondary">
                Контакты штаба
              </TrackedButton>
            </div>
          </header>
        </div>
      </section>
    </div>
  );
}
