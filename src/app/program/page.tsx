import type { Metadata } from "next";
import { programDays } from "@/data/program";
import { TrackedButton } from "@/components/tracked-button";
import { assetPath } from "@/lib/assets";
import { ProgramTimeline } from "@/components/program-timeline";

export const metadata: Metadata = {
  title: "Программа",
  description: "Программа форума СтудСтарт по дням.",
};

export default function ProgramPage() {
  return (
    <div className="space-y-12 pt-10 pb-20">
      {/* Hero секция страницы */}
      <section className="section-shell section-sky flex flex-wrap items-end justify-between gap-6 pb-8 border-b border-border/40">
        <div className="max-w-2xl">
          <p className="section-eyebrow text-primary">Расписание форума</p>
          <h1 className="text-4xl font-bold md:text-5xl mt-2">
            Путь к вершине
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Пять насыщенных дней: от знакомства и командной работы до защиты проектов и вечеров под звездами.
          </p>
        </div>
        <TrackedButton
          href={assetPath("/program.pdf")}
          variant="secondary"
          goal="download_program"
          className="shrink-0"
        >
          Скачать PDF версию
        </TrackedButton>
      </section>

      {/* Основной компонент программы */}
      <section className="section-shell">
        <ProgramTimeline days={programDays} />
      </section>
    </div>
  );
}
