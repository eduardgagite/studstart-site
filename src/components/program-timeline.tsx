"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { ProgramDay } from "@/data/program";
// Иконки убраны по запросу

const RU_MONTHS: Record<string, number> = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
};

type DayStatus = "past" | "today" | "future" | "unknown";

function stripTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseRussianDate(value: string, year: number) {
  const parts = value.trim().toLowerCase().split(/\s+/);
  if (parts.length < 2) return null;

  const day = Number(parts[0].replace(/\D/g, ""));
  const monthName = parts.slice(1).join(" ");
  const month = RU_MONTHS[monthName];

  if (!day || month === undefined) return null;
  return new Date(year, month, day);
}

function getDayStatus(dayDate: Date | null, today: Date): DayStatus {
  if (!dayDate) return "unknown";
  if (dayDate.getTime() === today.getTime()) return "today";
  return dayDate.getTime() < today.getTime() ? "past" : "future";
}

function getInitialDayIndex(days: ProgramDay[], today: Date) {
  const withStatus = days.map((day) =>
    getDayStatus(parseRussianDate(day.date, today.getFullYear()), today)
  );
  const todayIndex = withStatus.findIndex((status) => status === "today");
  if (todayIndex >= 0) return todayIndex;

  const futureIndex = withStatus.findIndex((status) => status === "future");
  if (futureIndex >= 0) return futureIndex;

  return Math.max(0, days.length - 1);
}

interface ProgramTimelineProps {
  days: ProgramDay[];
}

export function ProgramTimeline({ days }: ProgramTimelineProps) {
  const today = stripTime(new Date());
  const [activeDayIndex, setActiveDayIndex] = useState(() =>
    getInitialDayIndex(days, today)
  );

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
                const dayDate = parseRussianDate(day.date, today.getFullYear());
                const status = getDayStatus(dayDate, today);
                const isPast = status === "past";
                const isToday = status === "today";
                
                return (
                  <button
                    key={day.date}
                    onClick={() => setActiveDayIndex(index)}
                    className={cn(
                      "group relative flex-none snap-start min-w-[150px] lg:min-w-0 p-4 rounded-xl border text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActive 
                        ? "bg-surface border-primary/50 shadow-[0_4px_20px_-12px_rgb(var(--primary))]" 
                        : isPast
                          ? "bg-surface/20 border-border/40 text-muted/70 hover:bg-surface/30 hover:border-border/60"
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

                    {isPast && (
                      <div className="absolute right-3 top-3 rotate-6 rounded-full border border-border/60 bg-surface/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted shadow-sm">
                        Пройдено
                      </div>
                    )}
                    {isToday && (
                      <div className="absolute right-3 top-3 rounded-full border border-primary/60 bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow-[0_0_12px_rgb(var(--primary)_/_0.35)]">
                        Сегодня
                      </div>
                    )}

                    <div className="flex flex-col gap-1 pl-2 lg:pl-3">
                      <span className={cn(
                        "text-xs font-bold uppercase tracking-wider transition-colors",
                        isActive ? "text-primary" : isPast ? "text-muted/70" : "text-muted group-hover:text-foreground"
                      )}>
                        День {index + 1}
                      </span>
                      <span className={cn(
                        "text-xl font-bold",
                        isPast ? "text-muted/60 line-through decoration-dashed decoration-2" : "text-foreground"
                      )}>
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
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
                {days[activeDayIndex].date}
              </h2>
              {getDayStatus(
                parseRussianDate(days[activeDayIndex].date, today.getFullYear()),
                today
              ) === "today" && (
                <span className="inline-flex items-center rounded-full border border-primary/60 bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-[0_0_12px_rgb(var(--primary)_/_0.35)]">
                  Сегодня
                </span>
              )}
            </div>
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
                      <div className="glass-card p-5 md:p-6 rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-300 hover:bg-surface/60 hover:-translate-y-1 relative overflow-hidden shadow-[0_8px_18px_-12px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_24px_-16px_rgba(0,0,0,0.22)] dark:shadow-[0_12px_30px_-18px_rgba(0,0,0,0.55)] dark:hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]">
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
