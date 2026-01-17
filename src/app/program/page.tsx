import type { Metadata } from "next";
import { programDays } from "@/data/program";
import { TrackedButton } from "@/components/tracked-button";
import { assetPath } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Программа",
  description: "Программа форума СтудСтарт по дням.",
};

export default function ProgramPage() {
  return (
    <div className="space-y-10 pt-10 pb-10">
      <section className="section-shell section-sky flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Программа</p>
          <h1 className="text-3xl font-semibold">Пять дней, пять историй</h1>
          <p className="mt-2 text-muted">
            Формат, который сочетает обучение, командную работу и атмосферные вечера.
          </p>
        </div>
        <TrackedButton
          href={assetPath("/program.pdf")}
          variant="secondary"
          goal="download_program"
        >
          Скачать программу PDF
        </TrackedButton>
      </section>

      <section className="section-shell section-glow space-y-4">
        {programDays.map((day, index) => (
          <details
            key={day.date}
            className="group glass-card p-5"
            open={index === 0}
          >
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3 text-lg font-semibold">
              <span>{day.date}</span>
              <span className="flex items-center gap-2 text-sm font-normal text-muted">
                {day.label}
                <span className="text-base text-primary transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {day.entries.map((entry) => (
                <li key={`${day.date}-${entry.time}`} className="flex gap-3">
                  <span className="min-w-[64px] font-semibold text-foreground">
                    {entry.time}
                  </span>
                  <span>{entry.title}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </section>
    </div>
  );
}
