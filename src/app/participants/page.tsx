import type { Metadata } from "next";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { memoryCuratorTeams, memoryParticipants } from "@/data/memory";
import { assetPath } from "@/lib/assets";
import { ParticipantsHeroCollage } from "@/components/participants-hero-collage";

export const metadata: Metadata = {
  title: "Участники",
  description: "Список участников форума СтудСтарт с ФИО и аватарками.",
};

const CURATOR_THEME: Record<string, { gradient: string; badge: string; pin: string }> = {
  uruzmag: {
    gradient:
      "from-amber-400/30 via-orange-300/20 to-transparent dark:from-amber-400/20 dark:via-orange-300/10",
    badge:
      "border-amber-400/40 bg-amber-400/10 text-amber-700 dark:text-amber-200",
    pin: "bg-amber-300",
  },
  alana: {
    gradient:
      "from-rose-400/28 via-pink-300/22 to-transparent dark:from-rose-400/20 dark:via-pink-300/12",
    badge:
      "border-rose-400/40 bg-rose-400/10 text-rose-700 dark:text-rose-200",
    pin: "bg-rose-300",
  },
  dayana: {
    gradient:
      "from-sky-400/30 via-cyan-300/22 to-transparent dark:from-sky-400/20 dark:via-cyan-300/12",
    badge:
      "border-sky-400/40 bg-sky-400/10 text-sky-700 dark:text-sky-200",
    pin: "bg-sky-300",
  },
  polina: {
    gradient:
      "from-emerald-400/28 via-lime-300/22 to-transparent dark:from-emerald-400/20 dark:via-lime-300/12",
    badge:
      "border-emerald-400/40 bg-emerald-400/10 text-emerald-700 dark:text-emerald-200",
    pin: "bg-emerald-300",
  },
};

const CARD_ROTATION = [
  "-rotate-1",
  "rotate-1",
  "rotate-[0.6deg]",
  "-rotate-[0.6deg]",
];

const DEFAULT_THEME = {
  gradient:
    "from-primary/20 via-accent/10 to-transparent dark:from-primary/15 dark:via-accent/10",
  badge: "border-primary/40 bg-primary/10 text-primary",
  pin: "bg-primary/80",
};

export default function ParticipantsPage() {
  const participants = [...memoryParticipants].sort((a, b) => a.name.localeCompare(b.name, "ru"));
  const teams = memoryCuratorTeams.map((team) => ({
    id: team.id,
    curatorName: team.curatorName,
    members: participants.filter((participant) => participant.curatorId === team.id),
  }));

  return (
    <section className="section-panel panel-participants pt-6 pb-12 md:pt-10 md:pb-16">
      <div className="section-inner space-y-8">
        <section className="section-shell section-sky relative isolate overflow-hidden rounded-3xl p-6 md:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-50 [background:repeating-linear-gradient(90deg,transparent,transparent_48px,rgb(var(--border)/0.16)_48px,rgb(var(--border)/0.16)_49px)]" />
          <div className="pointer-events-none absolute -left-10 -top-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-mint/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-10 h-52 w-52 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-28 top-1/3 h-px w-72 -rotate-12 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-12 h-px w-64 rotate-12 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div className="space-y-5">
              <p className="section-eyebrow relative">Участники</p>
              <h1 className="relative text-3xl font-semibold leading-tight md:text-5xl">
                Живой состав
                <span className="block text-primary">СтудСтарта</span>
              </h1>
              <p className="relative max-w-2xl text-sm text-muted md:text-base">
                Здесь ребята, с кем мы прожили эти насыщенные дни: знакомые лица, теплые
                воспоминания и наша общая история.
              </p>

            </div>

            <ParticipantsHeroCollage participants={participants} />
          </div>
        </section>

        <section className="section-shell section-glow">
          <div className="grid gap-6 xl:grid-cols-2">
            {teams.map((team, teamIndex) => {
              const theme = CURATOR_THEME[team.id] ?? DEFAULT_THEME;

              return (
                <article
                  key={team.id}
                  className="group relative overflow-hidden rounded-3xl border border-border/60 bg-surface/75 p-5 md:p-6"
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-br",
                      theme?.gradient
                    )}
                  />
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-background/50 blur-2xl" />
                  <div className="relative flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted">
                        Команда куратора
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold leading-none md:text-3xl">
                        {team.curatorName}
                      </h2>
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
                        theme?.badge
                      )}
                    >
                      Участники
                    </span>
                  </div>

                  <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
                    {team.members.map((participant, index) => (
                      <div
                        key={participant.id}
                        className={cn(
                          "group/card relative rounded-2xl border border-border/70 bg-background/80 p-3 shadow-[0_10px_26px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:rotate-0 hover:border-primary/40",
                          CARD_ROTATION[(index + teamIndex) % CARD_ROTATION.length]
                        )}
                      >
                        <span
                          className={cn(
                            "absolute right-3 top-3 h-2.5 w-2.5 rounded-full ring-4 ring-background/70",
                            theme?.pin
                          )}
                        />
                        <div className="flex items-center gap-3">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-surface">
                            <Image
                              src={assetPath(participant.photo)}
                              alt={participant.name}
                              fill
                              sizes="64px"
                              className="object-cover transition duration-300 group-hover/card:scale-105"
                            />
                          </div>
                          <p className="text-sm font-semibold leading-tight text-foreground">
                            {participant.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
