import type { Metadata } from "next";
import { faqItems } from "@/data/faq";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "О форуме",
  description: "Миссия, формат и ответы на вопросы о форуме СтудСтарт.",
};

export default function AboutPage() {
  return (
    <div className="space-y-10 pt-10 pb-10">
      <section className="section-shell section-sky space-y-4">
        <p className="section-eyebrow">О форуме</p>
        <h1 className="text-3xl font-semibold">Старт для первокурсников</h1>
        <p className="text-muted">
          СтудСтарт — выездной офлайн-форум для первокурсников СОГУ. Мы собираемся
          в горах, чтобы познакомиться, найти друзей и понять, как сделать
          студенческие годы яркими.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass-card p-5 text-sm text-muted">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Формат</p>
            <p className="mt-2 text-base text-foreground">Офлайн, выездной</p>
          </div>
          <div className="glass-card p-5 text-sm text-muted">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Локация</p>
            <p className="mt-2 text-base text-foreground">{siteConfig.location}</p>
          </div>
          <div className="glass-card p-5 text-sm text-muted">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Даты</p>
            <p className="mt-2 text-base text-foreground">{siteConfig.dates}</p>
          </div>
        </div>
      </section>

      <section className="section-shell section-glow space-y-4">
        <p className="section-eyebrow">Почему это важно</p>
        <h2 className="text-2xl font-semibold">Миссия</h2>
        <p className="text-muted">
          Мы помогаем первокурсникам почувствовать себя частью университета. Форум
          даёт поддержку, уверенность и вдохновение, чтобы начать свой путь без
          стресса.
        </p>
      </section>

      <section className="section-shell section-night space-y-4">
        <p className="section-eyebrow">FAQ</p>
        <h2 className="text-2xl font-semibold">Ответы на вопросы</h2>
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-md border border-border/60 bg-surface p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
