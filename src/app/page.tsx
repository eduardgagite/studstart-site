import { TrackedButton } from "@/components/tracked-button";
import { TrackedLink } from "@/components/tracked-link";
import { heroContent, photoGrid, vkAlbumUrl, organizers } from "@/data/home";
import { contactItems } from "@/data/contacts";
import { siteConfig } from "@/config/site";
import { assetPath } from "@/lib/assets";
import { HomeScrollTracker } from "@/components/home-scroll-tracker";
import { cn } from "@/lib/cn";
import { getContactIcon } from "@/components/ui/icons";

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
              {organizers.map((item, index) => (
                <div
                  key={item.name}
                  className="glass-card group relative overflow-hidden p-6 text-center transition-all duration-300 hover:scale-[1.02] md:p-8"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />
                  <div className="relative mx-auto mb-5 h-24 w-24 overflow-hidden rounded-lg border-2 border-border/40 bg-white/95 p-3 shadow-soft transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-lg md:h-28 md:w-28">
                    <img
                      src={assetPath(item.logo)}
                      alt={item.name}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary md:text-xl">
                    {item.name}
                  </p>
                  <p className="mt-2 text-sm text-muted md:text-base">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {contactItems
                .filter((item) => item.icon === "phone" || item.icon === "email")
                .map((item) => (
                  <TrackedLink
                    key={item.label}
                    href={item.href}
                    goal={item.goal}
                    className="glass-card flex items-start gap-4 p-5 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground md:p-6"
                  >
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-primary transition-all duration-300 group-hover:border-primary/60 md:h-14 md:w-14">
                      {getContactIcon(item.icon)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.3em] text-muted">
                        {item.label}
                      </p>
                      <p className="mt-2 text-base text-foreground md:text-lg">{item.value}</p>
                    </div>
                  </TrackedLink>
                ))}
              <div className="flex gap-4">
                {contactItems
                  .filter((item) => ["vk", "telegram", "instagram"].includes(item.icon))
                  .map((item) => (
                    <TrackedLink
                      key={item.label}
                      href={item.href}
                      goal={item.goal}
                      className="glass-card flex h-12 w-12 flex-1 items-center justify-center text-primary transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/10 hover:shadow-lg md:h-14 md:w-14"
                      title={item.label}
                    >
                      {getContactIcon(item.icon)}
                    </TrackedLink>
                  ))}
              </div>
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
