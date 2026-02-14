"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { TrackedButton } from "@/components/tracked-button";
import { PageGoal } from "@/components/page-goal";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { 
  FaCheckCircle, 
  FaTelegramPlane, 
  FaRocket, 
  FaUserCheck, 
  FaCalendarAlt, 
  FaIdCard,
  FaArrowRight
} from "react-icons/fa";

export function ThanksContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#2563eb', '#16a34a', '#0ea5e9']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#2563eb', '#16a34a', '#0ea5e9']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const steps = [
    {
      icon: FaCheckCircle,
      title: "Регистрация",
      desc: "Завершена",
      status: "done",
      delay: 300
    },
    {
      icon: FaUserCheck,
      title: "Отбор",
      desc: "Пройден",
      status: "done",
      delay: 400
    },
    {
      icon: FaIdCard,
      title: "Форум",
      desc: "Проведён",
      status: "done",
      delay: 500
    },
    {
      icon: FaRocket,
      title: "Итоги",
      desc: "Опубликованы",
      status: "done",
      delay: 600
    }
  ];

  return (
    <div className="space-y-8 pt-6 pb-12 md:space-y-12 md:pt-10 md:pb-20">
      <PageGoal goal="visit_thanks" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-surface-1 via-surface-2 to-surface-1 px-6 py-10 text-center shadow-soft md:px-12 md:py-16">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-2xl">
          <div className={cn(
            "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-glow transition-all duration-700 md:h-24 md:w-24", 
            mounted ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 -rotate-180"
          )}>
            <FaCheckCircle className="h-8 w-8 md:h-10 md:w-10" />
          </div>
          
          <h1 className={cn(
            "text-3xl font-bold tracking-tight md:text-5xl transition-all duration-700 delay-100", 
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            Спасибо, что были с нами на <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">СтудСтарте!</span>
          </h1>
          
          <p className={cn(
            "mx-auto mt-4 max-w-lg text-base text-muted md:text-lg transition-all duration-700 delay-200", 
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            Форум успешно завершился 12 февраля 2026. Здесь можно посмотреть программу, итоги и материалы.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="mx-auto max-w-5xl px-4">
        <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className={cn(
                "absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-border/50 md:block transition-all duration-1000 delay-500",
                mounted ? "opacity-100 width-full" : "opacity-0 width-0"
            )} />

            <div className="grid gap-4 md:grid-cols-4 md:gap-4">
            {steps.map((step, i) => (
                <div 
                key={i} 
                className={cn(
                    "group relative z-10 flex flex-row items-center gap-4 rounded-xl border bg-background/80 p-4 shadow-sm backdrop-blur-sm transition-all duration-500 md:flex-col md:justify-center md:text-center md:hover:-translate-y-1",
                    step.status === "done" && "border-green-500/20",
                    step.status === "current" && "border-primary/50 shadow-glow",
                    step.status === "waiting" && "border-border/40 opacity-70",
                    mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
                style={{ transitionDelay: `${step.delay}ms` }}
                >
                <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base transition-all duration-500 md:h-12 md:w-12 md:text-lg",
                    step.status === "done" && "bg-green-500 text-white shadow-lg shadow-green-500/20",
                    step.status === "current" && "animate-pulse bg-primary text-white shadow-lg shadow-primary/20 scale-110",
                    step.status === "waiting" && "bg-surface-2 text-muted"
                )}>
                    <step.icon />
                </div>
                <div>
                    <h3 className="text-sm font-semibold md:text-base">{step.title}</h3>
                    <p className="text-xs text-muted md:text-sm">{step.desc}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* Bottom Actions */}
      <section className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2 md:gap-6">
        {/* Telegram Promo */}
        <div className={cn(
            "section-shell section-night group relative overflow-hidden p-6 md:p-8 transition-all duration-700 delay-700", 
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}>
            {/* Background Effects */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-all group-hover:bg-primary/30" />
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 text-xl font-bold text-white">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary backdrop-blur-sm">
                          <FaTelegramPlane />
                        </div>
                        <span>Telegram-канал</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-300">
                        Подписывайся, чтобы не пропустить фото, разборы и анонсы следующего сезона.
                    </p>
                </div>

                <TrackedButton
                    href={siteConfig.social.telegram}
                    variant="primary"
                    goal="subscribe_news"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full"
                >
                    Подписаться
                </TrackedButton>
            </div>
        </div>

        {/* Navigation Links */}
        <div className={cn(
            "section-shell flex flex-col justify-center gap-6 bg-surface/50 p-6 backdrop-blur-sm md:p-8 transition-all duration-700 delay-800",
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}>
            <div>
              <h3 className="text-lg font-semibold">Что дальше?</h3>
              <p className="mt-1 text-sm text-muted">Посмотри, как это было, или вернись на главную.</p>
            </div>
            
            <div className="space-y-3">
                <TrackedButton href="/about" variant="secondary" className="w-full justify-between group">
                    <span>Как это было</span>
                    <FaCalendarAlt className="text-muted transition-colors group-hover:text-primary" />
                </TrackedButton>
                <TrackedButton href="/about" variant="ghost" className="w-full justify-between group border border-border/50">
                    <span>Итоги форума</span>
                    <FaArrowRight className="text-muted transition-transform group-hover:translate-x-1" />
                </TrackedButton>
                <TrackedButton href="/" variant="ghost" className="w-full justify-between group border border-border/50">
                    <span>Вернуться на главную</span>
                    <FaArrowRight className="text-muted transition-transform group-hover:translate-x-1" />
                </TrackedButton>
            </div>
        </div>
      </section>
    </div>
  );
}
