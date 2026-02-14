"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/data/navigation";
import { organizationContacts } from "@/data/contacts";
import { TrackedLink } from "@/components/tracked-link";
import { MapPinIcon, getContactIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/assets";
import type { MetrikaGoal } from "@/lib/ym";

export function SiteFooter() {
  const pathname = usePathname();
  const isMemoryPage = pathname?.startsWith("/about") ?? false;

  return (
    <footer className={cn("relative z-20", isMemoryPage && "memory-footer")}>
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(77,163,255,0.2),rgba(43,228,255,0.8),rgba(0,209,143,0.2))]",
          isMemoryPage &&
            "bg-[linear-gradient(90deg,rgba(228,145,82,0.2),rgba(236,168,102,0.85),rgba(247,208,147,0.3))] dark:bg-[linear-gradient(90deg,rgba(190,114,61,0.28),rgba(232,162,96,0.88),rgba(237,192,130,0.36))]",
        )}
      />
      
      {/* Main Footer Content */}
      <div
        className={cn(
          "relative overflow-hidden border-t border-border/40 bg-surface/90 backdrop-blur-xl",
          isMemoryPage &&
            "border-[#d6aa7f]/55 bg-[rgba(255,247,232,0.92)] dark:border-[#9f7552]/60 dark:bg-[rgba(57,36,27,0.9)]",
        )}
      >
        {/* Ambient Glows */}
        <div
          className={cn(
            "pointer-events-none absolute -top-[200px] -left-[200px] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]",
            isMemoryPage && "bg-[#e8a565]/20 dark:bg-[#cf874f]/25",
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute -right-[200px] -bottom-[200px] h-[500px] w-[500px] rounded-full bg-accent/5 blur-[100px]",
            isMemoryPage && "bg-[#f0bf81]/22 dark:bg-[#d39a62]/24",
          )}
        />

        <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-8 md:px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-6">
                <div className="relative h-12 w-48 md:h-14 md:w-64 -ml-1">
                  <Image
                    src={assetPath("/images/branding/logos/logo-horizontal-black.png")}
                    alt="StudStart Logo"
                    fill
                    className="object-contain object-left logo-theme-light"
                    sizes="(max-width: 768px) 192px, 256px"
                    loading="lazy"
                  />
                  <Image
                    src={assetPath("/images/branding/logos/logo-horizontal-white.png")}
                    alt="StudStart Logo"
                    fill
                    className="object-contain object-left logo-theme-dark"
                    sizes="(max-width: 768px) 192px, 256px"
                    loading="lazy"
                  />
                </div>
                <p
                  className={cn(
                    "max-w-xs text-base leading-relaxed text-muted/80",
                    isMemoryPage && "text-[#8d5f3f] dark:text-[#efc49c]",
                  )}
                >
                  {siteConfig.description}
                </p>
              </div>
              
            <div
              className={cn(
                "flex items-center gap-2 text-sm text-muted/80",
                isMemoryPage && "text-[#8d5f3f] dark:text-[#efc49c]",
              )}
            >
                <MapPinIcon className={cn("text-primary/70", isMemoryPage && "text-[#c5773f] dark:text-[#e9ab78]")} />
                <span>{siteConfig.location}</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-4 space-y-6">
              <h3
                className={cn(
                  "text-sm font-bold uppercase tracking-wider text-foreground/90",
                  isMemoryPage && "text-[#804d2d] dark:text-[#f0c79f]",
                )}
              >
                Навигация
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className={cn(
                        "group flex items-center gap-2 text-muted transition-colors hover:text-primary",
                        isMemoryPage && "text-[#8f6344] hover:text-[#c4733d] dark:text-[#e4bb93] dark:hover:text-[#ffc793]",
                      )}
                    >
                      <span
                        className={cn(
                          "h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-3",
                          isMemoryPage && "bg-[#ca7a44]",
                        )}
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials & Actions */}
            <div className="lg:col-span-3 space-y-6">
              <h3
                className={cn(
                  "text-sm font-bold uppercase tracking-wider text-foreground/90",
                  isMemoryPage && "text-[#804d2d] dark:text-[#f0c79f]",
                )}
              >
                Мы в соцсетях
              </h3>
              <div className="space-y-5">
                {organizationContacts
                  .filter(org => org.name !== "СОГУ")
                  .map((org) => (
                  <div key={org.name} className="space-y-1.5">
                    <p
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-wider text-muted/60",
                        isMemoryPage && "text-[#9c6d4b] dark:text-[#d9ab82]",
                      )}
                    >
                      {org.name}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {org.socials.map((social) => (
                        <TrackedLink
                          key={social.label}
                          href={social.href}
                          goal={social.goal as MetrikaGoal}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-muted transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                            isMemoryPage &&
                              "border-[#d4a67c]/70 bg-[rgba(255,243,220,0.78)] text-[#986640] dark:border-[#986d4a]/70 dark:bg-[rgba(89,57,40,0.78)] dark:text-[#e8bc93]",
                            !isMemoryPage && social.icon === "vk" && "hover:bg-[#0077FF] hover:border-[#0077FF] hover:text-white",
                            !isMemoryPage && social.icon === "telegram" && "hover:bg-[#2AABEE] hover:border-[#2AABEE] hover:text-white",
                            !isMemoryPage && social.icon === "instagram" && "hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white",
                            isMemoryPage && "hover:bg-[rgba(240,186,129,0.32)] hover:border-[#cc7d44]/65 hover:text-[#774628] dark:hover:bg-[rgba(171,106,64,0.32)] dark:hover:border-[#d5915b]/70 dark:hover:text-[#ffd2a9]"
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

          <div
            className={cn(
              "mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 text-xs text-muted/60 md:flex-row",
              isMemoryPage && "border-[#d7ac83]/50 text-[#996844] dark:border-[#9e734f]/50 dark:text-[#dbaf85]",
            )}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p>© {new Date().getFullYear()} СтудСтарт. Все права защищены.</p>
              <Link
                href="/policy"
                className={cn(
                  "transition-colors hover:text-foreground",
                  isMemoryPage && "hover:text-[#8b542f] dark:hover:text-[#ffd0a3]",
                )}
              >
                Политика конфиденциальности
              </Link>
            </div>
            
            <a
              href="https://alania-go.ru"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex items-center gap-3 rounded-full border border-border/40 bg-background/50 py-1.5 pl-4 pr-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10",
                isMemoryPage &&
                  "border-[#d4a67a]/60 bg-[rgba(255,242,218,0.76)] hover:border-[#cb7a43]/70 hover:bg-[rgba(240,186,129,0.2)] hover:shadow-[0_10px_22px_rgba(167,102,54,0.18)] dark:border-[#946a48]/60 dark:bg-[rgba(84,54,39,0.74)] dark:hover:border-[#d08a50]/70 dark:hover:bg-[rgba(191,122,72,0.2)]",
              )}
            >
              <span
                className={cn(
                  "text-sm font-semibold text-foreground/90 transition-colors group-hover:text-primary",
                  isMemoryPage && "group-hover:text-[#b76834] dark:text-[#f1c69d] dark:group-hover:text-[#ffc895]",
                )}
              >
                Сделано командой
              </span>
              <div className="relative h-8 w-8 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={assetPath("/images/branding/logos/logo-alaniago.png")}
                  alt="AlaniaGO"
                  fill
                  className="object-contain"
                  sizes="32px"
                  loading="lazy"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
