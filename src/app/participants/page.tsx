import type { Metadata } from "next";
import { ParticipantsBoard } from "@/components/participants-board";

export const metadata: Metadata = {
  title: "Участники",
  description: "Таблица участников форума СтудСтарт: общая и по кураторам.",
};

export default function ParticipantsPage() {
  return (
    <section className="section-panel panel-participants pt-6 pb-12 md:pt-10 md:pb-16">
      <div className="section-inner space-y-8">
        <section className="section-shell section-sky space-y-4">
          <p className="section-eyebrow">Участники</p>
          <h1 className="text-3xl font-semibold md:text-4xl">Таблица участников</h1>
          <p className="text-sm text-muted md:text-base">
            Два режима просмотра: общая таблица по баллам и список по кураторам. Данные
            подтягиваются из внутренней системы и могут загружаться не сразу.
          </p>
        </section>

        <section className="section-shell section-glow">
          <ParticipantsBoard />
        </section>
      </div>
    </section>
  );
}
