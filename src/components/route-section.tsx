"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const steps = [
  {
    title: "Заявка",
    description: "Оставляешь данные, чтобы мы познакомились.",
    icon: (className: string) => (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 3h7l4 4v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M14 3v5h5" />
      </svg>
    ),
  },
  {
    title: "Проверка",
    description: "Команда форума внимательно смотрит заявки.",
    icon: (className: string) => (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
  {
    title: "Собеседование",
    description: "Короткая встреча, чтобы узнать друг друга ближе.",
    icon: (className: string) => (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 6h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-3 3v-3H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
  {
    title: "Очная встреча",
    description: "Знакомство с командой и другими участниками форума.",
    icon: (className: string) => (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Форум",
    description: "Стартовая точка твоей студенческой истории.",
    icon: (className: string) => (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 4v16" />
        <path d="M6 5h10l-2 3 2 3H6" />
      </svg>
    ),
  },
];

const compassSize = 420;
const compassCenter = compassSize / 2;
const compassRadius = 180;
const markerRadius = 18;
// Центр цифр должен лежать на оси внешнего кольца
const orbitRadius = compassRadius;
const innerRadius = 145;
const textRadius = 135;
const markerHitRadius = markerRadius + 12;
const markerOrbit = orbitRadius;
const compassCircumference = 2 * Math.PI * compassRadius;

const toInset = (radius: number) =>
  `${(((compassSize / 2 - radius) / compassSize) * 100).toFixed(2)}%`;
const plateInset = toInset(compassRadius + markerRadius + 10);
const innerInset = toInset(innerRadius);
const textInset = toInset(textRadius);
const markerPositions = steps.map((_, index) => {
  const angle = (index / steps.length) * 2 * Math.PI - Math.PI / 2;
  return {
    x: compassCenter + Math.cos(angle) * markerOrbit,
    y: compassCenter + Math.sin(angle) * markerOrbit,
  };
});

export function RouteSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeHover, setActiveHover] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const compassRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [linkLine, setLinkLine] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);
  const activeStep = steps[activeIndex];
  const progress = ((activeIndex + 1) / steps.length) * compassCircumference;

  useEffect(() => {
    setActiveHover(false);
  }, [activeIndex]);

  useEffect(() => {
    const updateLine = () => {
      const container = containerRef.current;
      const compass = compassRef.current;
      const card = cardRefs.current[activeIndex];

      if (!container || !compass || !card) {
        setLinkLine(null);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const compassRect = compass.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const scale = compassRect.width / compassSize;
      const fallbackAngle = (activeIndex / steps.length) * Math.PI * 2 - Math.PI / 2;
      const fallbackPosition = {
        x: compassCenter + Math.cos(fallbackAngle) * markerOrbit,
        y: compassCenter + Math.sin(fallbackAngle) * markerOrbit,
      };
      const markerPosition = markerPositions[activeIndex] ?? fallbackPosition;
      const markerX = compassRect.left + scale * markerPosition.x;
      const markerY = compassRect.top + scale * markerPosition.y;

      setLinkLine({
        x1: markerX - containerRect.left,
        y1: markerY - containerRect.top,
        x2: cardRect.left - containerRect.left, 
        y2: cardRect.top + 28 - containerRect.top, 
      });
    };

    const handle = () => requestAnimationFrame(updateLine);
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [activeIndex]);

  return (
    <section id="howto" className="section-panel panel-route">
      <div className="section-inner space-y-10 md:space-y-12">
        <div className="max-w-2xl space-y-3">
          <p className="section-eyebrow">Путь к СтудСтарту</p>
          <h2 className="text-4xl font-semibold md:text-5xl">Маршрут участника</h2>
          <p className="text-sm text-muted md:text-base">
            Путь построен как маршрут: от заявки до старта в горах.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative grid gap-12 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:items-stretch lg:gap-16"
        >
          {linkLine && (
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden lg:block"
            >
              <defs>
                <linearGradient id="linkGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgb(var(--primary))" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="rgb(var(--primary))" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path
                d={`M ${linkLine.x1} ${linkLine.y1} C ${linkLine.x1 + 100} ${linkLine.y1}, ${linkLine.x2 - 100} ${linkLine.y2}, ${linkLine.x2} ${linkLine.y2}`}
                fill="none"
                stroke="url(#linkGradient)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="transition-all duration-300"
              />
              <circle cx={linkLine.x2} cy={linkLine.y2} r="3" fill="rgb(var(--primary))" />
            </svg>
          )}
          
          {/* Левая колонка: Компас */}
          <div className="relative z-10 hidden h-full flex-col gap-4 lg:flex">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Компас этапов</p>
            <div className="flex-1 rounded-3xl border border-border/50 bg-surface/70 p-6 md:p-8 backdrop-blur-xl shadow-[var(--shadow-soft)] min-h-[400px] sm:min-h-[440px] md:min-h-[480px]">
              <div className="flex h-full items-center justify-center">
                <div
                  ref={compassRef}
                  className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] md:max-w-[400px] lg:max-w-[420px] aspect-square"
                >
                  <div
                    className="absolute rounded-full border border-border/25 bg-surface/50"
                    style={{
                      inset: plateInset,
                      boxShadow: "inset 0 0 40px rgb(var(--primary) / 0.03)",
                    }}
                  />
                  <svg
                    viewBox={`0 0 ${compassSize} ${compassSize}`}
                    className="absolute inset-0 h-full w-full"
                  >
                    <defs>
                      <linearGradient
                        id="compassProgress"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="rgb(var(--primary))" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0.8" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    
                    {/* Орбита */}
                    <circle
                      cx={compassCenter}
                      cy={compassCenter}
                      r={orbitRadius}
                      strokeWidth="1.5"
                      fill="none"
                      className="stroke-border/30"
                    />
                    
                    {/* Прогресс */}
                    <circle
                      cx={compassCenter}
                      cy={compassCenter}
                      r={orbitRadius}
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={compassCircumference}
                      strokeDashoffset={compassCircumference - progress}
                      strokeLinecap="round"
                      className="origin-center -rotate-90 transition-all duration-500 ease-out"
                      stroke="url(#compassProgress)"
                      filter="url(#glow)"
                    />

                    {/* Внутренний круг контур */}
                    <circle
                      cx={compassCenter}
                      cy={compassCenter}
                      r={innerRadius}
                      strokeWidth="1"
                      fill="none"
                      className="stroke-border/30"
                      strokeDasharray="4 4"
                    />

                    {/* Перекрестие (декоративное) */}
                    <line
                      x1={compassCenter}
                      y1={compassCenter - (innerRadius - 20)}
                      x2={compassCenter}
                      y2={compassCenter + (innerRadius - 20)}
                      strokeWidth="1"
                      className="stroke-border/15"
                    />
                    <line
                      x1={compassCenter - (innerRadius - 20)}
                      y1={compassCenter}
                      x2={compassCenter + (innerRadius - 20)}
                      y2={compassCenter}
                      strokeWidth="1"
                      className="stroke-border/15"
                    />

                    {/* Маркеры */}
                    {steps.map((step, index) => {
                      const isActive = index === activeIndex;
                      const isPast = index < activeIndex;
                      const fallbackAngle =
                        (index / steps.length) * Math.PI * 2 - Math.PI / 2;
                      const fallbackPosition = {
                        x: compassCenter + Math.cos(fallbackAngle) * markerOrbit,
                        y: compassCenter + Math.sin(fallbackAngle) * markerOrbit,
                      };
                      const position = markerPositions[index] ?? fallbackPosition;
                      
                      return (
                        <g
                          key={step.title}
                          role="button"
                          tabIndex={0}
                          aria-label={`Этап ${index + 1}: ${step.title}`}
                          onClick={() => setActiveIndex(index)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              setActiveIndex(index);
                            }
                          }}
                          className="cursor-pointer transition-colors duration-300"
                          style={{ outline: "none" }}
                        >
                          {/* Область клика */}
                          <circle
                            cx={position.x}
                            cy={position.y}
                            r={markerHitRadius}
                            fill="transparent"
                            stroke="transparent"
                          />
                          
                          {/* Активное свечение */}
                          <circle
                            cx={position.x}
                            cy={position.y}
                            r={isActive ? markerRadius + 10 : 0}
                            fill="rgb(var(--primary) / 0.15)"
                            className="transition-all duration-500"
                          />
                          
                          {/* Фон маркера */}
                          <circle
                            cx={position.x}
                            cy={position.y}
                            r={markerRadius}
                            fill={
                              isActive
                                ? "rgb(var(--surface-1))"
                                : isPast 
                                ? "rgb(var(--surface-1) / 0.8)" 
                                : "rgb(var(--surface-1) / 0.6)"
                            }
                            stroke={
                              isActive
                                ? "rgb(var(--primary))"
                                : isPast
                                ? "rgb(var(--primary) / 0.5)"
                                : "rgb(var(--border) / 0.5)"
                            }
                            strokeWidth={isActive ? 2 : 1.5}
                            className="transition-all duration-300"
                          />
                          
                          {/* Номер */}
                          <text
                            x={position.x}
                            y={position.y}
                            dy="1"
                            textAnchor="middle"
                            dominantBaseline="central"
                            className={cn(
                              "font-bold tabular-nums text-[11px] md:text-xs transition-colors duration-300",
                              isActive 
                                ? "fill-primary" 
                                : isPast
                                ? "fill-primary/70"
                                : "fill-muted"
                            )}
                          >
                            {index + 1}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Стеклянный фон контента */}
                  <div
                    className="pointer-events-none absolute rounded-full border border-border/20 bg-background/30 backdrop-blur-md"
                    style={{
                      inset: innerInset,
                      boxShadow:
                        "inset 0 1px 0 rgb(var(--ice) / 0.1), inset 0 -10px 20px rgb(var(--night) / 0.2)",
                    }}
                  />

                  {/* Текстовый контент */}
                  <div
                    className="pointer-events-none absolute flex flex-col items-center justify-center text-center px-4"
                    style={{ inset: textInset }}
                  >
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-primary/80 mb-3 font-medium">
                      Этап {activeIndex + 1} из {steps.length}
                    </p>
                    <h3
                      className="text-2xl font-bold leading-tight break-words md:text-3xl text-foreground"
                      style={{ hyphens: "auto" }}
                    >
                      {activeStep.title}
                    </h3>
                    <p
                      className="mt-3 text-sm text-muted leading-relaxed max-w-[200px]"
                    >
                      {activeStep.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка: Современный Журнал (Таймлайн) */}
          <div className="relative z-10 flex h-full flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.6rem] uppercase tracking-[0.26em] text-muted">
                Журнал маршрута
              </p>
              <span className="text-[0.6rem] uppercase tracking-[0.26em] text-muted whitespace-nowrap hidden sm:inline-block">
                Полевая тетрадь
              </span>
            </div>
            
            <div className="relative flex-1 overflow-hidden rounded-3xl border border-border/45 bg-surface/70 p-4 shadow-[var(--shadow-soft)] md:p-8">
              {/* Фоновая сетка */}
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(var(--border) / 0.1) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border) / 0.1) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              
              {/* Декоративное свечение */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />

              <div className="relative z-10 h-full flex flex-col">
                 <div className="relative flex-1">
                   <div className="flex flex-col gap-6">
                     {steps.map((step, index) => {
                       const isActive = index === activeIndex;
                       const isPast = index < activeIndex;
                       const isLast = index === steps.length - 1;
                       
                       return (
                        <div key={step.title} className="group relative flex gap-3 md:gap-4 items-stretch">
                           
                           {/* КОЛОНКА МАРКЕРА (Ось таймлайна) */}
                          <div className="flex-none w-8 md:w-12 relative flex items-center justify-center">
                            {/* Линия вверх (до предыдущего шага) */}
                            {index > 0 && (
                              <div
                                className={cn(
                                  "absolute left-1/2 -translate-x-1/2 top-[-1.5rem] bottom-1/2 w-px",
                                  index <= activeIndex ? "bg-primary" : "bg-border/30"
                                )}
                              />
                            )}

                            {/* Линия вниз (до следующего шага) */}
                            {!isLast && (
                              <div
                                className={cn(
                                  "absolute left-1/2 -translate-x-1/2 top-1/2 bottom-[-1.5rem] w-px",
                                  isPast
                                    ? "bg-primary"
                                    : isActive
                                    ? "bg-gradient-to-b from-primary via-primary/40 to-transparent"
                                    : "bg-border/30"
                                )}
                              />
                            )}

                            {/* Маркер — строго по центру блока */}
                            <div
                              className={cn(
                                "relative z-10 rounded-full border transition-all duration-500 box-content",
                                isActive
                                  ? "h-3.5 w-3.5 bg-primary border-primary shadow-[0_0_12px_rgb(var(--primary))]"
                                  : isPast
                                  ? "h-2.5 w-2.5 bg-primary/70 border-primary/30"
                                  : "h-2 w-2 bg-surface border-border/50"
                              )}
                              style={{
                                backgroundColor: isActive || isPast ? "rgb(var(--primary))" : "rgb(var(--surface))",
                                borderColor: isActive || isPast ? "transparent" : "rgba(var(--border), 0.5)",
                              }}
                            />
                          </div>

                           {/* КОНТЕНТ */}
                           <div className="flex-1 min-w-0">
                             <button
                               onClick={() => setActiveIndex(index)}
                               ref={(node) => {
                                 cardRefs.current[index] = node;
                               }}
                               className={cn(
                                 "w-full text-left rounded-xl p-4 transition-all duration-300 border backdrop-blur-sm flex gap-4 items-start group-hover:border-border/60",
                                 isActive
                                   ? "bg-surface/80 border-primary/30 shadow-lg translate-x-2"
                                   : "border-transparent bg-surface/20 hover:bg-surface/40 hover:translate-x-1"
                               )}
                             >
                               {/* Иконка внутри карточки - высота 48px (h-12) */}
                               <div className={cn(
                                 "flex-none h-10 w-10 md:h-12 md:w-12 rounded-lg border flex items-center justify-center transition-colors duration-300",
                                 isActive 
                                   ? "bg-primary/10 border-primary/30 text-primary" 
                                   : "bg-surface/50 border-border/30 text-muted group-hover:text-foreground group-hover:border-primary/20"
                               )}>
                                 {step.icon(cn("transition-transform duration-300", isActive ? "scale-110" : "scale-100", "h-6 w-6"))}
                               </div>
                               
                               <div className="flex-1 min-w-0 pt-0.5">
                                 <div className="flex items-center justify-between mb-1">
                                   <span className={cn(
                                     "text-[0.6rem] font-mono uppercase tracking-widest transition-colors",
                                     isActive ? "text-primary" : "text-muted"
                                   )}>
                                     Этап 0{index + 1}
                                   </span>
                                 </div>
                                 <h3 className={cn(
                                   "text-lg font-bold mb-1.5 transition-colors",
                                   isActive ? "text-foreground" : "text-foreground/80"
                                 )}>
                                   {step.title}
                                 </h3>
                                 <p className={cn(
                                   "text-xs leading-relaxed transition-colors line-clamp-2",
                                   isActive ? "text-muted" : "text-muted/60"
                                 )}>
                                   {step.description}
                                 </p>
                               </div>
                             </button>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}