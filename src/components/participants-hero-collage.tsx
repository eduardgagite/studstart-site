"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/assets";
import type { MemoryParticipant } from "@/data/memory";

const HERO_CARDS = [
  {
    container: "left-1 top-8 -rotate-6 [animation-delay:0s]",
    size: "h-24 w-24",
  },
  {
    container: "left-20 top-0 rotate-4 [animation-delay:0.8s]",
    size: "h-20 w-20",
  },
  {
    container: "right-12 top-6 -rotate-3 [animation-delay:1.4s]",
    size: "h-24 w-24",
  },
  {
    container: "right-0 top-[6.5rem] rotate-6 [animation-delay:0.35s]",
    size: "h-20 w-20",
  },
  {
    container: "left-8 bottom-12 rotate-5 [animation-delay:1.15s]",
    size: "h-24 w-24",
  },
  {
    container: "right-20 bottom-4 -rotate-4 [animation-delay:0.55s]",
    size: "h-[5.5rem] w-[5.5rem]",
  },
];

function pickRandomParticipants(source: MemoryParticipant[], count: number) {
  const shuffled = [...source];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, count);
}

type ParticipantsHeroCollageProps = {
  participants: MemoryParticipant[];
};

export function ParticipantsHeroCollage({ participants }: ParticipantsHeroCollageProps) {
  const [spotlightParticipants, setSpotlightParticipants] = useState(() =>
    participants.slice(0, HERO_CARDS.length)
  );

  useEffect(() => {
    setSpotlightParticipants(pickRandomParticipants(participants, HERO_CARDS.length));
  }, [participants]);

  return (
    <div className="relative mx-auto hidden h-[290px] w-full max-w-[360px] lg:block">
      <div className="pointer-events-none absolute inset-10 rounded-full border border-border/35" />
      <div className="pointer-events-none absolute inset-[3.25rem] rounded-full border border-primary/35 [animation:memoryCuratorOrbitSpin_46s_linear_infinite] motion-reduce:[animation:none]" />
      <div className="pointer-events-none absolute inset-0 rounded-full border border-accent/20 [animation:memoryCuratorOrbitSpinReverse_58s_linear_infinite] motion-reduce:[animation:none]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-2xl" />

      {spotlightParticipants.map((participant, index) => {
        const layout = HERO_CARDS[index];

        if (!layout) {
          return null;
        }

        return (
          <article
            key={participant.id}
            className={cn(
              "absolute rounded-2xl border border-border/70 bg-background/85 p-2 shadow-[0_14px_34px_rgba(4,14,32,0.24)] backdrop-blur-sm [animation:memoryFloat_8.5s_ease-in-out_infinite]",
              "motion-reduce:[animation:none]",
              layout.container
            )}
          >
            <div className={cn("relative overflow-hidden rounded-xl border border-border/65", layout.size)}>
              <Image
                src={assetPath(participant.photo)}
                alt={participant.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <p className="mt-1 max-w-24 truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/85">
              {participant.name.split(" ")[0]}
            </p>
          </article>
        );
      })}
    </div>
  );
}
