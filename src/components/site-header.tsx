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

  const isMemoryPage = pathname?.startsWith("/about") ?? false;
  return <SiteHeaderContent isMemoryPage={isMemoryPage} />;
}

function SiteHeaderContent({ isMemoryPage }: { isMemoryPage: boolean }) {
  const [open, setOpen] = useState(false);
  const memoryThemeToggleClass = isMemoryPage
    ? "border-[#d1a175]/75 bg-[linear-gradient(145deg,rgba(255,245,227,0.94),rgba(244,221,186,0.88))] text-[#8e5935] shadow-[0_10px_22px_rgba(137,87,50,0.18)] hover:border-[#c47a44]/70 hover:bg-[linear-gradient(145deg,rgba(255,241,214,0.98),rgba(238,204,162,0.92))] [&>svg]:!text-[#c47a44] dark:border-[#9f744f]/75 dark:bg-[linear-gradient(145deg,rgba(91,59,42,0.9),rgba(70,46,34,0.86))] dark:text-[#f4c99f] dark:hover:border-[#d7965f]/72 dark:hover:bg-[linear-gradient(145deg,rgba(104,67,47,0.92),rgba(81,53,38,0.9))] dark:[&>svg]:!text-[#f1ad76]"
    : undefined;

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
        open ? "bg-transparent border-transparent" : "bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
        isMemoryPage &&
          !open &&
          "border-[#d4a478]/70 bg-[rgba(255,246,229,0.88)] shadow-[0_10px_28px_rgba(124,79,45,0.12)] supports-[backdrop-filter]:bg-[rgba(255,243,220,0.75)] dark:border-[#9f734f]/70 dark:bg-[rgba(71,45,32,0.88)] dark:supports-[backdrop-filter]:bg-[rgba(63,39,29,0.76)]"
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
              src={assetPath("/images/branding/logos/logo-horizontal-black.png")}
              alt="StudStart Logo"
              fill
              className="object-contain logo-theme-light"
              sizes="(max-width: 768px) 128px, 160px"
              priority
            />
            <Image
              src={assetPath("/images/branding/logos/logo-horizontal-white.png")}
              alt="StudStart Logo"
              fill
              className="object-contain logo-theme-dark"
              sizes="(max-width: 768px) 128px, 160px"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={cn(
            "hidden items-center gap-8 text-base font-semibold text-muted md:flex",
            isMemoryPage && "text-[#9e6b46] dark:text-[#e8b889]",
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:text-foreground hover:after:w-full",
                isMemoryPage &&
                  "after:bg-[#ce7d43] hover:text-[#6d3f20] dark:after:bg-[#f1ad76] dark:hover:text-[#ffd6ad]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions & Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:block">
             <ThemeToggle className={memoryThemeToggleClass} />
          </div>
          
          <Button
            href="/about"
            variant="primary"
            className={cn(
              "hidden md:inline-flex",
              isMemoryPage &&
                "!bg-gradient-to-r !from-[#efb478] !to-[#d9884e] !text-[#3a1f10] !shadow-[0_0_0_1px_rgba(182,112,59,0.42),0_0_20px_rgba(224,146,88,0.3)] hover:!brightness-105 dark:!from-[#d48a4f] dark:!to-[#b66a3d] dark:!text-[#1f120a]",
            )}
          >
            Как это было
          </Button>
          
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={cn(
              "group relative z-50 ml-1 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-surface/50 text-foreground transition-all hover:bg-surface md:hidden",
              open ? "border-transparent bg-transparent hover:bg-white/10" : "",
              isMemoryPage &&
                !open &&
                "border-[#d3a377]/70 bg-[rgba(255,245,227,0.82)] text-[#7a4b2a] hover:bg-[rgba(252,236,210,0.95)] dark:border-[#9a6f4d]/70 dark:bg-[rgba(82,52,37,0.78)] dark:text-[#f0be8f] dark:hover:bg-[rgba(98,63,45,0.86)]",
              isMemoryPage && open && "text-[#f4c79b]"
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
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none",
          isMemoryPage &&
            "bg-[linear-gradient(165deg,rgba(255,248,236,0.96),rgba(247,228,196,0.97))] dark:bg-[linear-gradient(165deg,rgba(67,42,30,0.97),rgba(47,30,23,0.98))]"
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
                  open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
                  isMemoryPage &&
                    "border-[#d8ad84]/35 text-[#855234] hover:text-[#b96936] dark:border-[#9b734f]/40 dark:text-[#f2c79e] dark:hover:text-[#ffc996]"
                )}
                style={{ transitionDelay: `${100 + idx * 50}ms` }}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <svg 
                  className={cn(
                    "h-5 w-5 text-muted opacity-0 transition-all -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100",
                    isMemoryPage && "text-[#b07a53] dark:text-[#d8a677]",
                  )}
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
             <div
               className={cn(
                 "flex items-center justify-between rounded-2xl border border-border/50 bg-surface/50 p-4",
                 isMemoryPage &&
                   "border-[#d3a77b]/60 bg-[rgba(255,243,220,0.8)] dark:border-[#9b724f]/60 dark:bg-[rgba(85,55,39,0.72)]",
               )}
             >
               <span
                 className={cn(
                   "text-sm font-medium text-muted",
                   isMemoryPage && "text-[#8c5b37] dark:text-[#efc79f]",
                 )}
               >
                 Тема оформления
               </span>
               <ThemeToggle className={memoryThemeToggleClass} />
             </div>

            <Button
              href="/about"
              variant="primary"
              size="lg"
              className={cn(
                "w-full justify-center text-lg font-bold shadow-lg shadow-primary/20",
                isMemoryPage &&
                  "!bg-gradient-to-r !from-[#efb478] !to-[#d9884e] !text-[#3a1f10] !shadow-[0_0_0_1px_rgba(182,112,59,0.42),0_0_20px_rgba(224,146,88,0.3)] hover:!brightness-105 dark:!from-[#d48a4f] dark:!to-[#b66a3d] dark:!text-[#1f120a]",
              )}
              onClick={() => {
                setOpen(false);
              }}
            >
              Как это было
            </Button>

            {/* Social Links */}
            <div
              className={cn(
                "flex justify-center gap-6 border-t border-border/30 pt-4",
                isMemoryPage && "border-[#d8ac83]/40 dark:border-[#966f4c]/40",
              )}
            >
               <a
                 href={siteConfig.social.vkSogu}
                 target="_blank"
                 rel="noreferrer"
                 className={cn(
                   "p-2 text-muted transition-colors hover:text-[#0077FF]",
                   isMemoryPage &&
                     "text-[#9f6b45] hover:text-[#ba6d39] dark:text-[#e8bb8e] dark:hover:text-[#ffc996]",
                 )}
               >
                 <VKIcon className="h-8 w-8" />
               </a>
               <a
                 href={siteConfig.social.telegram}
                 target="_blank"
                 rel="noreferrer"
                 className={cn(
                   "p-2 text-muted transition-colors hover:text-[#2AABEE]",
                   isMemoryPage &&
                     "text-[#9f6b45] hover:text-[#ba6d39] dark:text-[#e8bb8e] dark:hover:text-[#ffc996]",
                 )}
               >
                 <TelegramIcon className="h-8 w-8" />
               </a>
               <a
                 href={siteConfig.social.instagram}
                 target="_blank"
                 rel="noreferrer"
                 className={cn(
                   "p-2 text-muted transition-colors hover:text-[#E1306C]",
                   isMemoryPage &&
                     "text-[#9f6b45] hover:text-[#ba6d39] dark:text-[#e8bb8e] dark:hover:text-[#ffc996]",
                 )}
               >
                 <InstagramIcon className="h-8 w-8" />
               </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
