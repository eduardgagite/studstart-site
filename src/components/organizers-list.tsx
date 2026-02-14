"use client";

import { useState } from "react";
import Image from "next/image";
import { organizerGroups } from "@/data/organizers";
import { assetPath } from "@/lib/assets";
import { ProfkomOrbit } from "@/components/profkom-orbit";
import { cn } from "@/lib/cn";
import { FaThLarge, FaAtom } from "react-icons/fa";

export function OrganizersList() {
  const [profkomMode, setProfkomMode] = useState<"grid" | "orbit">("grid");

  return (
    <div className="space-y-14">
      {organizerGroups.map((group) => (
        <section
          key={group.id}
          className="rounded-3xl border border-border/60 bg-surface-1/60 p-6 shadow-sm backdrop-blur-sm md:p-8"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-2xl font-bold md:text-3xl">
                {group.name}
              </h3>
              {group.description && (
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                  {group.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-4">
                 {/* Toggle for Profkom */}
                 {group.id === "profkom" && (
                    <div className="flex items-center gap-1 rounded-full bg-surface-2 p-1 border border-border/60">
                        <button
                            onClick={() => setProfkomMode("grid")}
                            className={cn(
                                "flex items-center justify-center rounded-full p-2 transition-all",
                                profkomMode === "grid" 
                                    ? "bg-white text-primary shadow-sm dark:bg-white/10" 
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            title="Сетка"
                        >
                            <FaThLarge className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setProfkomMode("orbit")}
                            className={cn(
                                "flex items-center justify-center rounded-full p-2 transition-all",
                                profkomMode === "orbit" 
                                    ? "bg-white text-primary shadow-sm dark:bg-white/10" 
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            title="Орбита"
                        >
                            <FaAtom className="h-4 w-4" />
                        </button>
                    </div>
                 )}

                <div className="inline-flex items-center rounded-full border border-border/60 bg-white/60 px-4 py-2 text-sm font-semibold text-muted-foreground shadow-sm dark:bg-white/10">
                  {group.members.length} человек
                </div>
            </div>
          </div>

          {group.id === "profkom" && profkomMode === "orbit" ? (
             <div className="mt-8 animate-fade-up">
                 <ProfkomOrbit members={group.members} />
             </div>
          ) : (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fade-up">
                {group.members.map((organizer) => (
                  <div
                    key={organizer.id}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-surface-1 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:border-primary/20"
                  >
                    {/* Photo Container */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2">
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-surface-1 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      
                      {organizer.photo ? (
                        <Image
                          src={assetPath(organizer.photo)}
                          alt={organizer.name}
                          fill
                          className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
                          loading="lazy"
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-surface-2 p-8 opacity-50 grayscale transition-all duration-500 group-hover:opacity-80 group-hover:grayscale-0">
                          <div className="relative h-24 w-24 transition-transform duration-500 group-hover:scale-110">
                            <Image
                              src={assetPath(group.fallbackLogo ?? "/images/branding/logos/logo-profkom.png")}
                              alt={group.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content Container */}
                    <div className="relative flex flex-1 flex-col justify-between bg-surface-1 p-5 transition-colors duration-500 group-hover:bg-surface-2/50">
                       {/* Decorative top border fade */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                      
                      <div className="relative z-10">
                        <h4 className="font-display text-xl font-bold leading-tight tracking-tight text-foreground transition-all duration-300 group-hover:text-primary">
                          {organizer.name}
                        </h4>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground/90 group-hover:text-muted-foreground">
                          {organizer.role}
                        </p>
                      </div>

                      {/* Hover Accent Line */}
                      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                ))}
              </div>
          )}
        </section>
      ))}
    </div>
  );
}
