import Image from "next/image";
import { TrackedButton } from "@/components/tracked-button";
import { heroContent, photoGrid, vkAlbumUrl } from "@/data/home";
import { siteConfig } from "@/config/site";
import { assetPath } from "@/lib/assets";
import { HomeScrollTracker } from "@/components/home-scroll-tracker";
import { RouteSection } from "@/components/route-section";
import { cn } from "@/lib/cn";

import { OrganizersShowcase } from "@/components/organizers-showcase";
import { RectorBlock } from "@/components/rector-block";
import { PowerPoints } from "@/components/power-points";
import { PhotoScatter } from "@/components/photo-scatter";

export default function Home() {
  return (
    <div>
      <HomeScrollTracker />

      <section 
        className="section-panel panel-sky hero-mountains pt-12 pb-16 md:pt-16 md:pb-20 relative"
      >
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2">
          <Image
            src={assetPath("/images/hero-mountains.webp")}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20 dark:opacity-40"
          />
        </div>
        <div className="section-inner">
          <div
            className="section-shell hero-section-shell relative overflow-hidden"
          >
          <div className="absolute -right-10 top-10 hidden h-40 w-40 rounded-full bg-accent/30 blur-3xl md:block" />
          <div className="absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative z-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
            <div className="space-y-6">
              <p className="section-eyebrow">Форум первокурсников СОГУ</p>
              <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl">
                {heroContent.title}
                <span className="mt-4 block text-2xl text-gradient md:text-3xl lg:text-4xl">твой старт в студенческую жизнь</span>
              </h1>
              <p className="text-lg text-muted md:text-xl">{heroContent.subtitle}</p>
              <p className="max-w-xl text-base text-muted">{heroContent.description}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <TrackedButton href="/register" variant="primary" goal="cta_register">
                  {heroContent.primaryCta}
                </TrackedButton>
                <TrackedButton href="/program" variant="secondary">
                  {heroContent.secondaryCta}
                </TrackedButton>
              </div>
              <p className="text-xs text-muted pt-2">
                Приём заявок до 31 января, 23:59 (местное время).
              </p>
            </div>
            <div className="glass-card relative flex flex-col gap-6 p-6 md:p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Когда и где</p>
                <p className="mt-3 text-2xl font-semibold">{siteConfig.dates}</p>
                <p className="mt-1.5 text-sm text-muted">{siteConfig.location}</p>
              </div>
              <div className="grid gap-3 text-sm text-muted">
                <div className="rounded-md border border-border/60 bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">Формат</p>
                  <p className="mt-2 text-base text-foreground">Офлайн, выездной</p>
                </div>
                <div className="rounded-md border border-border/60 bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">Для кого</p>
                  <p className="mt-2 text-base text-foreground">Первокурсники СОГУ</p>
                </div>
                <div className="rounded-md border border-border/60 bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">Дедлайн</p>
                  <p className="mt-2 text-base text-foreground">31 января, 23:59</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <RectorBlock />

      <PowerPoints />

      <RouteSection />

      <section id="photos" className="section-panel panel-night">
        <div className="section-inner space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="section-eyebrow">Фото</p>
              <h2 className="text-3xl font-semibold md:text-4xl">Атмосфера СтудСтарта</h2>
            </div>
            <TrackedButton
              href={vkAlbumUrl}
              variant="secondary"
              goal="open_vk_album"
              target="_blank"
              rel="noreferrer"
            >
              Смотреть альбом VK
            </TrackedButton>
          </div>
          
          <PhotoScatter photos={photoGrid} albumUrl={vkAlbumUrl} />
        </div>
      </section>

      <section className="section-panel panel-glow">
        <div className="section-inner space-y-8">
          <div className="space-y-2">
            <p className="section-eyebrow">Команда</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Кто делает СтудСтарт</h2>
          </div>
          <OrganizersShowcase />
        </div>
      </section>

      <section className="section-panel panel-mountains pt-16 pb-20 md:pt-20 md:pb-24">
        <div className="section-inner space-y-6 text-center">
          <p className="section-eyebrow">Финальный старт</p>
          <h2 className="text-3xl font-semibold md:text-4xl">Готов попасть на СтудСтарт?</h2>
          <p className="mx-auto max-w-xl text-sm text-muted md:text-base">
            Заполни заявку, дождись подтверждения и приходи на очное
            собеседование. Места ограничены.
          </p>
          <div className="flex justify-center pt-2">
            <TrackedButton href="/register" variant="primary" goal="cta_register">
              Стать участником
            </TrackedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
