"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { ProgramDay } from "@/data/program";
// Иконки убраны по запросу

interface ProgramTimelineProps {
  days: ProgramDay[];
}

export function ProgramTimeline({ days }: ProgramTimelineProps) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
      {/* Навигация по дням (Левая колонка / Верхняя на мобилках) */}
      <div className="flex-none lg:w-72">
        <div className="sticky top-24 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted hidden lg:block mb-6 pl-1">
            Этапы маршрута
          </h3>
          
          <div className="lg:hidden flex items-center justify-between px-1 text-xs uppercase tracking-widest text-muted/80">
            <span>Листайте дни</span>
            <span className="text-primary/70 animate-pulse">↔</span>
          </div>

          <div className="relative lg:static">
            <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-6 bg-gradient-to-r from-background to-transparent lg:hidden" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-6 bg-gradient-to-l from-background to-transparent lg:hidden" />

            <div className="flex overflow-x-auto pb-4 gap-3 lg:flex-col lg:pb-0 lg:gap-3 no-scrollbar snap-x -mx-4 px-4 lg:mx-0 lg:px-0">
              {days.map((day, index) => {
                const isActive = index === activeDayIndex;
                
                return (
                  <button
                    key={day.date}
                    onClick={() => setActiveDayIndex(index)}
                    className={cn(
                      "group relative flex-none snap-start min-w-[150px] lg:min-w-0 p-4 rounded-xl border text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActive 
                        ? "bg-surface border-primary/50 shadow-[0_4px_20px_-12px_rgb(var(--primary))]" 
                        : "bg-surface/30 border-transparent hover:bg-surface/50 hover:border-border/50"
                    )}
                  >
                    {/* Индикатор активного дня */}
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r-full lg:block hidden shadow-[0_0_10px_rgb(var(--primary))]" />
                    )}
                    {isActive && (
                      <div className="absolute inset-x-4 bottom-0 h-0.5 bg-primary rounded-t-full lg:hidden shadow-[0_0_10px_rgb(var(--primary))]" />
                    )}

                    <div className="flex flex-col gap-1 pl-2 lg:pl-3">
                      <span className={cn(
                        "text-xs font-bold uppercase tracking-wider transition-colors",
                        isActive ? "text-primary" : "text-muted group-hover:text-foreground"
                      )}>
                        День {index + 1}
                      </span>
                      <span className="text-xl font-bold text-foreground">
                        {day.date}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Контент дня (Правая колонка) */}
      <div className="flex-1 min-w-0">
        <div className="relative space-y-8 py-2 min-h-[500px]">
          
          {/* Заголовок выбранного дня */}
          <div 
            key={`header-${activeDayIndex}`}
            className="mb-10 animate-in fade-in slide-in-from-left-4 duration-500 ease-out"
          >
            <h2 className="text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
              {days[activeDayIndex].date}
            </h2>
            <p className="text-muted mt-2 text-lg">
              План действий на {days[activeDayIndex].date}
            </p>
            <div className="mt-4 inline-flex items-center rounded-full border border-border/50 bg-surface/40 px-3 py-1 text-xs text-muted">
              Программа может дополняться и изменяться в процессе
            </div>
          </div>

          {/* Список событий */}
          <div className="space-y-8">
            {days[activeDayIndex].entries.map((entry, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === days[activeDayIndex].entries.length - 1;
              const hasDescription = Boolean(entry.description);

              return (
                <div 
                  key={`${days[activeDayIndex].date}-${entry.time}`}
                  className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                  style={{ 
                    animationDelay: `${idx * 100}ms`
                  }}
                >
                  <div className="flex gap-4 items-stretch">
                    {/* Колонка таймлайна */}
                    <div className="flex-none w-10 sm:w-12 relative flex items-center justify-center">
                      {!isFirst && (
                        <>
                          <div className="absolute left-1/2 -translate-x-1/2 top-[-1.5rem] bottom-1/2 w-[2px] bg-gradient-to-b from-primary/10 via-primary/25 to-primary/40" />
                          <div className="absolute left-1/2 -translate-x-1/2 top-[-1.5rem] bottom-1/2 w-[6px] bg-gradient-to-b from-primary/0 via-primary/25 to-primary/40 blur-[6px] opacity-70" />
                        </>
                      )}
                      {!isLast && (
                        <>
                          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 bottom-[-1.5rem] w-[2px] bg-gradient-to-b from-primary/60 via-primary/25 to-border/20" />
                          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 bottom-[-1.5rem] w-[6px] bg-gradient-to-b from-primary/40 via-primary/20 to-primary/0 blur-[6px] opacity-70" />
                        </>
                      )}
                      <div className="relative z-10 flex h-4 w-4 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <div className="absolute h-7 w-7 rounded-full bg-primary/20 blur-[6px]" />
                        <div className="h-3.5 w-3.5 rounded-full border border-primary/70 bg-surface shadow-[0_0_12px_rgb(var(--primary)_/_0.45)]" />
                        <div className="absolute h-1.5 w-1.5 rounded-full bg-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="glass-card p-5 md:p-6 rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-300 hover:bg-surface/60 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        <div
                          className={cn(
                            "flex flex-col sm:flex-row gap-5",
                            hasDescription ? "sm:items-start" : "sm:items-center"
                          )}
                        >
                          
                          {/* Время */}
                          <div className="sm:w-40 flex-none">
                            <div className="inline-flex flex-col rounded-xl border border-border/50 bg-gradient-to-br from-surface/80 to-surface/40 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                              <span className="font-bold text-lg tabular-nums leading-none text-foreground">
                                {entry.time}
                              </span>
                            </div>
                          </div>

                          {/* Описание */}
                          <div className="flex-1 pt-1 sm:pt-0">
                            <h4
                              className={cn(
                                "text-xl font-bold leading-tight group-hover:text-primary transition-colors",
                                hasDescription ? "mb-2" : "mb-0"
                              )}
                            >
                              {entry.title}
                            </h4>
                            {hasDescription && (
                              <p className="text-base text-muted leading-relaxed">
                                {entry.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
