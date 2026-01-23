import type { Metadata } from "next";
import { FaCompass } from "react-icons/fa";
// import { programDays } from "@/data/program";
// import { TrackedButton } from "@/components/tracked-button";
// import { assetPath } from "@/lib/assets";
// import { ProgramTimeline } from "@/components/program-timeline";

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
        {/* <TrackedButton
          href={assetPath("/program.pdf")}
          variant="secondary"
          goal="download_program"
          className="shrink-0"
        >
          Скачать PDF версию
        </TrackedButton> */}
      </section>

      {/* Заглушка программы */}
      <section className="section-shell">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-tr from-sky-500/10 via-background to-indigo-500/10 p-12 md:py-24 text-center shadow-sm">
          <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shadow-sm ring-1 ring-primary/20">
                <FaCompass className="w-10 h-10" />
            </div>
            
            <div className="space-y-3">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">Программа обновляется</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                    Финальная программа формируется. <br className="hidden sm:inline" />
                    Опубликуем здесь сразу после подтверждения.
                </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
