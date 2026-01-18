"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/data/navigation";
import { organizationContacts } from "@/data/contacts";
import { TrackedLink } from "@/components/tracked-link";
import { ArrowUpIcon, MapPinIcon, getContactIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              <div className="space-y-6">
                <div className="relative h-12 w-48 md:h-14 md:w-64 -ml-1">
                  <Image
                    src={
                      mounted && resolvedTheme === "dark"
                        ? "/images/logo-horizontal-white.png"
                        : "/images/logo-horizontal-black.png"
                    }
                    alt="StudStart Logo"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
                <p className="max-w-xs text-base text-muted/80 leading-relaxed">
                  {siteConfig.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted/80">
                <MapPinIcon className="text-primary/70" />
                <span>{siteConfig.location}</span>
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
            <div className="lg:col-span-3 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/90">
                Мы в соцсетях
              </h3>
              <div className="space-y-5">
                {organizationContacts
                  .filter(org => org.name !== "СОГУ")
                  .map((org) => (
                  <div key={org.name} className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted/60">
                      {org.name}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {org.socials.map((social) => (
                        <TrackedLink
                          key={social.label}
                          href={social.href}
                          goal={social.goal as any}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-muted transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                            social.icon === "vk" && "hover:bg-[#0077FF] hover:border-[#0077FF] hover:text-white",
                            social.icon === "telegram" && "hover:bg-[#2AABEE] hover:border-[#2AABEE] hover:text-white",
                            social.icon === "instagram" && "hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white"
                          )}
                          aria-label={`${org.name} ${social.label}`}
                        >
                          {getContactIcon(social.icon, "h-4 w-4")}
                        </TrackedLink>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted/60">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p>© {new Date().getFullYear()} СтудСтарт. Все права защищены.</p>
              <Link href="/policy" className="hover:text-foreground transition-colors">
                Политика конфиденциальности
              </Link>
            </div>
            
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 rounded-full border border-border/60 bg-background/50 py-1.5 pl-4 pr-1.5 text-xs font-medium text-muted transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
            >
              <span>Наверх</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:bg-primary group-hover:text-white">
                <ArrowUpIcon className="h-3 w-3" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
