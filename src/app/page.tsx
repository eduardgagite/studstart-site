import { TrackedButton } from "@/components/tracked-button";
import { TrackedLink } from "@/components/tracked-link";
import { heroContent, photoGrid, vkAlbumUrl, organizers } from "@/data/home";
import { contactItems } from "@/data/contacts";
import { siteConfig } from "@/config/site";
import { assetPath } from "@/lib/assets";
import { HomeScrollTracker } from "@/components/home-scroll-tracker";
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

const routeTitles = ["Заявка", "Проверка", "Собеседование", "Форум"];
const routeNotes = [
  "Оставляешь данные, чтобы мы познакомились.",
  "Команда форума внимательно смотрит заявки.",
  "Короткая встреча, чтобы узнать друг друга ближе.",
  "Стартовая точка твоей студенческой истории.",
];

const contactIcons: Record<string, JSX.Element> = {
  phone: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M6.6 3.6c.4-.4 1-.5 1.5-.3l2.6 1a1 1 0 0 1 .6 1.2l-.6 2a1 1 0 0 1-1 .7h-1a13 13 0 0 0 6.3 6.3v-1a1 1 0 0 1 .7-1l2-.6a1 1 0 0 1 1.2.6l1 2.6c.2.5.1 1.1-.3 1.5l-1.2 1.2c-.7.7-1.8 1-2.8.7-5.7-1.7-10.1-6.1-11.8-11.8-.3-1 0-2.1.7-2.8l1.2-1.2Z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.2l8 4.8 8-4.8V8H4Zm0 2.5V16h16v-5.5l-7.5 4.5a1 1 0 0 1-1 0L4 10.5Z" />
    </svg>
  ),
  vk: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4 6h3a1 1 0 0 1 1 .76c.2.88.74 2.57 2.08 3.9a1 1 0 0 0 1.7-.63V6a1 1 0 0 1 1-1h2.5a1 1 0 0 1 .94 1.34c-.3.86-1 2.48-2.3 4.02a1 1 0 0 0 .05 1.31c1.47 1.57 2.42 3.14 2.86 4.01A1 1 0 0 1 17 18h-2.1a1 1 0 0 1-.82-.43c-.63-.9-1.59-2.08-2.64-2.79a1 1 0 0 0-1.6.8V17a1 1 0 0 1-1 1H8.4a4 4 0 0 1-3.14-1.52C3.8 14.56 3.2 12.2 3 10.92A1 1 0 0 1 4 9.8Z" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4.5 11.4 18.7 5.1a1 1 0 0 1 1.4 1.1l-2.7 12.2a1 1 0 0 1-1.5.65l-4.4-2.7-2.3 2.4a1 1 0 0 1-1.7-.5l-1.1-4.7-3.6-1.2a1 1 0 0 1 0-1.9Zm4.9 2.9.7 3 1.6-1.6 4.9-6-7.2 4.6Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
    </svg>
  ),
};

export default function Home() {
  return (
    <div>
      <HomeScrollTracker />

      <section className="section-panel panel-sky pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="section-inner">
          <div
            className="section-shell hero-mountains relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(150deg, rgba(11,16,32,0.7), rgba(11,16,32,0.15)), url(${assetPath(
                "/images/hero-mountains.png"
              )})`,
            }}
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

      <section id="howto" className="section-panel panel-route">
        <div className="section-inner space-y-8">
          <div className="space-y-3">
            <p className="section-eyebrow">Путь к СтудСтарту</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Маршрут участника</h2>
            <p className="max-w-2xl text-sm text-muted md:text-base">
              Путь построен как маршрут: от заявки до старта в горах.
            </p>
          </div>
          <div className="route-grid">
            {routeNotes.map((note, index) => (
              <div key={routeTitles[index]} className="route-step">
                <span className="route-dot">{index + 1}</span>
                <div className="glass-card p-6">
                  <h3 className="text-base font-semibold md:text-lg">{routeTitles[index]}</h3>
                  <p className="mt-3 text-sm text-muted md:text-base">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="section-eyebrow">Команда</p>
              <h2 className="text-3xl font-semibold md:text-4xl">Кто делает СтудСтарт</h2>
            </div>
            <TrackedButton href="/contacts" variant="secondary">
              Контакты
            </TrackedButton>
          </div>
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <div className="grid gap-5 md:grid-cols-2">
              {organizers.map((item) => (
                <div key={item.name} className="glass-card p-6 text-center md:p-8">
                  <div className="mx-auto mb-5 h-24 w-24 rounded-sm border border-border/60 bg-white/90 p-2 shadow-soft md:h-28 md:w-28">
                    <img
                      src={assetPath(item.logo)}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="text-lg font-semibold md:text-xl">{item.name}</p>
                  <p className="mt-2 text-sm text-muted md:text-base">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-4">
              {contactItems.map((item) => (
                <TrackedLink
                  key={item.label}
                  href={item.href}
                  goal={item.goal}
                  className="glass-card flex items-start gap-4 p-5 text-sm hover:text-foreground md:p-6"
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-primary md:h-14 md:w-14">
                    {contactIcons[item.icon]}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">
                      {item.label}
                    </p>
                    <p className="mt-2 text-base text-foreground md:text-lg">{item.value}</p>
                  </div>
                </TrackedLink>
              ))}
            </div>
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
