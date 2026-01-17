"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { contactItems } from "@/data/contacts";
import { navLinks } from "@/data/navigation";
import { TrackedLink } from "@/components/tracked-link";
import { VKIcon, TelegramIcon, InstagramIcon, ArrowUpIcon, MapPinIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const socialItems = [
  {
    key: "vkSogu",
    label: "VK СОГУ",
    href: siteConfig.social.vkSogu,
    goal: "click_vk_sogu_footer" as const,
    icon: VKIcon,
    color: "hover:bg-[#0077FF] hover:border-[#0077FF] hover:text-white",
  },
  {
    key: "vkProfkom",
    label: "VK Профком",
    href: siteConfig.social.vkProfkom,
    goal: "click_vk_profkom_footer" as const,
    icon: VKIcon,
    color: "hover:bg-[#0077FF] hover:border-[#0077FF] hover:text-white",
  },
  {
    key: "telegram",
    label: "Telegram",
    href: siteConfig.social.telegram,
    goal: "click_tg_footer" as const,
    icon: TelegramIcon,
    color: "hover:bg-[#2AABEE] hover:border-[#2AABEE] hover:text-white",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: siteConfig.social.instagram,
    goal: "click_instagram_footer" as const,
    icon: InstagramIcon,
    color: "hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white",
  },
];

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(77,163,255,0.2),rgba(43,228,255,0.8),rgba(0,209,143,0.2))]" />
      
      {/* Main Footer Content */}
      <div className="relative bg-surface/90 backdrop-blur-xl border-t border-border/40 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-[200px] -left-[200px] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

        <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-8 md:px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  <span className="text-gradient">СтудСтарт</span>
                </h2>
                <p className="max-w-xs text-base text-muted/80 leading-relaxed">
                  {siteConfig.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted/80">
                <MapPinIcon className="text-primary/70" />
                <span>г. Владикавказ, ул. Ватутина 44-46</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/90">
                Навигация
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="group flex items-center gap-2 text-muted transition-colors hover:text-primary"
                    >
                      <span className="h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials & Actions */}
            <div className="lg:col-span-3 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/90">
                  Мы в соцсетях
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialItems.map((item) => (
                    <TrackedLink
                      key={item.key}
                      href={item.href}
                      goal={item.goal}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-background/50 text-muted transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                        item.color
                      )}
                      aria-label={item.label}
                    >
                      <item.icon className="h-6 w-6" />
                    </TrackedLink>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollToTop}
                className="group flex items-center gap-3 self-start md:self-auto text-sm font-medium text-muted hover:text-primary transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/50 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                  <ArrowUpIcon className="group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <span>Наверх</span>
              </button>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted/60">
            <p>© {new Date().getFullYear()} СтудСтарт. Все права защищены.</p>
            <div className="flex items-center gap-6">
              <Link href="/policy" className="hover:text-foreground transition-colors">
                Политика конфиденциальности
              </Link>
              {/* Optional: Add developer credit */}
              {/* <span className="hidden md:inline">•</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Design by ...
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
