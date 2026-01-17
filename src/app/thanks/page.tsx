import type { Metadata } from "next";
import { TrackedButton } from "@/components/tracked-button";
import { PageGoal } from "@/components/page-goal";
import { assetPath } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Спасибо",
  description: "Заявка отправлена — спасибо за участие в СтудСтарт.",
};

export default function ThanksPage() {
  return (
    <div className="space-y-8 pt-10 pb-10">
      <PageGoal goal="visit_thanks" />
      <section className="section-shell section-sky">
        <h1 className="text-3xl font-semibold">Заявка отправлена</h1>
        <p className="mt-3 text-muted">
          Мы проверим данные. Одобренных пригласим на очное собеседование.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <TrackedButton href="/" variant="secondary">
            Вернуться на главную
          </TrackedButton>
          <TrackedButton href="/program" variant="primary">
            Посмотреть программу
          </TrackedButton>
        </div>
      </section>

      <section className="section-shell section-night grid gap-6 md:grid-cols-[1fr_240px]">
        <div>
          <h2 className="text-2xl font-semibold">Подписаться на новости</h2>
          <p className="mt-2 text-sm text-muted">
            Подписывайся на Telegram, чтобы быть в курсе новостей форума.
          </p>
          <TrackedButton
            href="https://t.me/"
            variant="ghost"
            goal="subscribe_news"
            target="_blank"
            rel="noreferrer"
          >
            Перейти в Telegram
          </TrackedButton>
        </div>
        <div className="flex items-center justify-center rounded-md border border-border/60 bg-background">
          <img
            src={assetPath("/qr-telegram.svg")}
            alt="QR-код Telegram"
            className="h-36 w-36"
          />
        </div>
      </section>
    </div>
  );
}
