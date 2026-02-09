"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { VKIcon, TelegramIcon, InstagramIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/assets";

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/display")) {
    return null;
  }

  return <SiteHeaderContent />;
}

function SiteHeaderContent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 transition-colors duration-300",
        open ? "bg-transparent border-transparent" : "bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6 md:py-5">
        <Link 
          href="/" 
          className="group flex items-center gap-3 relative z-50" 
          onClick={() => setOpen(false)}
        >
          <div className="relative h-8 w-32 md:h-10 md:w-40">
            <Image
              src={assetPath("/images/logo-horizontal-black.png")}
              alt="StudStart Logo"
              fill
              className="object-contain logo-theme-light"
              sizes="(max-width: 768px) 128px, 160px"
              priority
            />
            <Image
              src={assetPath("/images/logo-horizontal-white.png")}
              alt="StudStart Logo"
              fill
              className="object-contain logo-theme-dark"
              sizes="(max-width: 768px) 128px, 160px"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-base font-semibold text-muted md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:text-foreground hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions & Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:block">
             <ThemeToggle />
          </div>
          
          <Button
            href="/program"
            variant="primary"
            className="hidden md:inline-flex"
          >
            Программа
          </Button>
          
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={cn(
              "group relative z-50 ml-1 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-surface/50 text-foreground transition-all hover:bg-surface md:hidden",
              open ? "border-transparent bg-transparent hover:bg-white/10" : ""
            )}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            <span className="sr-only">Меню</span>
            <div className="relative flex h-5 w-5 flex-col justify-center items-center">
              <span 
                className={cn(
                  "absolute h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-out",
                  open ? "rotate-45" : "-translate-y-1.5"
                )} 
              />
              <span 
                className={cn(
                  "absolute h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-out",
                  open ? "opacity-0 translate-x-2" : "opacity-100"
                )} 
              />
              <span 
                className={cn(
                  "absolute h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-out",
                  open ? "-rotate-45" : "translate-y-1.5"
                )} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-2xl transition-all duration-500 md:hidden",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
        style={{ top: "0px" }} // Covers entire screen including header area to avoid layering issues
      >
        {/* Spacer for header area so content starts below */}
        <div className="h-[73px] w-full shrink-0" /> 

        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-8">
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center justify-between border-b border-border/30 pb-4 text-2xl font-bold tracking-tight text-foreground/80 transition-all hover:text-primary hover:pl-2",
                  open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                )}
                style={{ transitionDelay: `${100 + idx * 50}ms` }}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <svg 
                  className="h-5 w-5 text-muted opacity-0 transition-all group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Spacer to push content down */}
          <div className="flex-1" />

          {/* Bottom Actions */}
          <div 
            className={cn(
              "mt-8 space-y-8 transition-all duration-700 delay-300",
              open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
             <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-surface/50 p-4">
               <span className="text-sm font-medium text-muted">Тема оформления</span>
               <ThemeToggle />
             </div>

            <Button
              href="/program"
              variant="primary"
              size="lg"
              className="w-full justify-center text-lg font-bold shadow-lg shadow-primary/20"
              onClick={() => {
                setOpen(false);
              }}
            >
              Программа
            </Button>

            {/* Social Links */}
            <div className="flex justify-center gap-6 pt-4 border-t border-border/30">
               <a href={siteConfig.social.vkSogu} target="_blank" rel="noreferrer" className="text-muted hover:text-[#0077FF] transition-colors p-2">
                 <VKIcon className="h-8 w-8" />
               </a>
               <a href={siteConfig.social.telegram} target="_blank" rel="noreferrer" className="text-muted hover:text-[#2AABEE] transition-colors p-2">
                 <TelegramIcon className="h-8 w-8" />
               </a>
               <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="text-muted hover:text-[#E1306C] transition-colors p-2">
                 <InstagramIcon className="h-8 w-8" />
               </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
