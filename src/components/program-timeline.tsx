"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { ProgramDay } from "@/data/program";
import { 
  FaFlag, 
  FaUsers, 
  FaLightbulb, 
  FaStar, 
  FaMountain, 
  FaMapMarkerAlt,
  FaCampground,
  FaMusic
} from "react-icons/fa";

// Хелпер для выбора иконки по названию события
const getEventIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("заезд") || lowerTitle.includes("отъезд") || lowerTitle.includes("сборы")) return <FaCampground />;
  if (lowerTitle.includes("старт") || lowerTitle.includes("финал") || lowerTitle.includes("итоги") || lowerTitle.includes("открытие")) return <FaFlag />;
  if (lowerTitle.includes("команд") || lowerTitle.includes("знакомств")) return <FaUsers />;
  if (lowerTitle.includes("лекци") || lowerTitle.includes("тренинг") || lowerTitle.includes("практикум") || lowerTitle.includes("наставничество")) return <FaLightbulb />;
  if (lowerTitle.includes("вечер") || lowerTitle.includes("ночной")) return <FaMusic />;
  if (lowerTitle.includes("квест")) return <FaMapMarkerAlt />;
  if (lowerTitle.includes("свободное")) return <FaMountain />;
  return <FaStar />; // иконка по умолчанию
};

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
                    <span className={cn(
                      "text-sm transition-colors",
                      isActive ? "text-foreground/90" : "text-muted/80"
                    )}>
                      {day.label}
                    </span>
                  </div>
                </button>
              );
            })}
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
              {days[activeDayIndex].label}
            </h2>
            <p className="text-muted mt-2 text-lg">
              План действий на {days[activeDayIndex].date}
            </p>
          </div>

          {/* Список событий */}
          <div className="space-y-8">
            {days[activeDayIndex].entries.map((entry, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === days[activeDayIndex].entries.length - 1;

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
                        <div className="absolute left-1/2 -translate-x-1/2 top-[-1.5rem] bottom-1/2 w-px bg-border/30" />
                      )}
                      {!isLast && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 bottom-[-1.5rem] w-px bg-gradient-to-b from-primary/60 via-primary/20 to-border/20" />
                      )}
                      <div
                        className="relative z-10 h-3.5 w-3.5 rounded-full border border-primary/60 bg-surface shadow-[0_0_10px_rgb(var(--primary)_/_0.35)] transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="glass-card p-5 md:p-6 rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-300 hover:bg-surface/60 hover:shadow-lg hover:-translate-y-1">
                        <div className="flex flex-col sm:flex-row gap-5 sm:items-start">
                          
                          {/* Время и Иконка */}
                          <div className="flex items-center gap-4 sm:w-36 flex-none">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                              <span className="text-xl">
                                {getEventIcon(entry.title)}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-xl tabular-nums leading-none text-foreground">
                                {entry.time}
                              </span>
                              <span className="text-[10px] text-muted uppercase tracking-widest font-bold mt-1">
                                Время
                              </span>
                            </div>
                          </div>

                          {/* Описание */}
                          <div className="flex-1 pt-1 sm:pt-0">
                            <h4 className="text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                              {entry.title}
                            </h4>
                            {entry.description && (
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
