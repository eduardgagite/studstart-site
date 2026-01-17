import { TrackedButton } from "@/components/tracked-button";
import { heroContent, photoGrid, vkAlbumUrl, organizers } from "@/data/home";
import { siteConfig } from "@/config/site";
import { assetPath } from "@/lib/assets";
import { HomeScrollTracker } from "@/components/home-scroll-tracker";
import { RouteSection } from "@/components/route-section";
import { cn } from "@/lib/cn";

const highlights = [
  {
    title: "Каникулы с пользой",
    description: "Пять дней активности, где ты быстро находишь свой ритм.",
  },
  {
    title: "Новые связи",
    description: "Друзья, с которыми вы вместе будете учиться и отдыхать.",
  },
  {
    title: "Командные форматы",
    description: "Квесты, игры и задания, которые сближают и раскрывают.",
  },
  {
    title: "Порог неба",
    description: "Горы, чистый воздух и атмосферный старт студенческой жизни.",
  },
  {
    title: "Наставники рядом",
    description: "Кураторы и спикеры помогут и зададут верный вектор.",
  },
  {
    title: "Энергия форума",
    description: "Твои первые громкие впечатления в университете.",
  },
];


export default function Home() {
  return (
    <div>
      <HomeScrollTracker />

      <section 
        className="section-panel panel-sky hero-mountains pt-12 pb-16 md:pt-16 md:pb-20"
        style={{
          '--hero-image': `url(${assetPath("/images/hero-mountains.png")})`,
        } as React.CSSProperties}
      >
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
                <span className="block text-gradient">ночной старт</span>
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

      <section id="about" className="section-panel panel-glow">
        <div className="section-inner space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="section-eyebrow">Почему СтудСтарт</p>
              <h2 className="text-3xl font-semibold md:text-4xl">Точки силы</h2>
            </div>
            <p className="max-w-md text-sm text-muted md:text-base">
              Всё, что нужно первокурснику, чтобы почувствовать уверенность и
              поддержку в новом городе.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "glass-card p-6",
                  index === 0 && "md:col-span-2"
                )}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-lg font-semibold md:text-xl">{item.title}</h3>
                <p className="mt-3 text-sm text-muted md:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
          <div className="grid auto-rows-[160px] gap-4 md:grid-cols-3 md:auto-rows-[200px]">
            {photoGrid.map((photo, index) => (
              <div
                key={photo.id}
                className={cn(
                  "overflow-hidden rounded-md border border-border/60 bg-surface",
                  index === 0 && "md:col-span-2 md:row-span-2"
                )}
              >
                <img
                  src={assetPath(photo.src)}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-panel panel-glow">
        <div className="section-inner space-y-8">
          <div className="space-y-2">
            <p className="section-eyebrow">Команда</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Кто делает СтудСтарт</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {organizers.map((item) => (
              <div
                key={item.name}
                className="group relative flex h-full min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-white/95 dark:border-border/40 dark:bg-surface/60 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:border-primary/60 dark:hover:border-primary/50 hover:shadow-[0_0_0_1px_rgb(var(--primary)/0.25),0_0_40px_rgb(var(--primary)/0.1)] dark:hover:shadow-[0_0_0_1px_rgb(var(--primary)/0.3),0_0_40px_rgb(var(--primary)/0.15)] md:min-h-[380px] md:p-10"
              >
                <div className="relative mb-8 flex h-64 w-64 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-white dark:border-border/30 dark:bg-white/90 p-8 shadow-lg dark:shadow-sm transition-all duration-500 group-hover:border-primary/60 dark:group-hover:border-primary/40 group-hover:shadow-xl dark:group-hover:shadow-md md:h-72 md:w-72 md:p-10">
                  <img
                    src={assetPath(item.logo)}
                    alt={item.name}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-6 text-2xl font-semibold transition-colors duration-300 group-hover:text-primary md:text-3xl">
                  {item.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
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
