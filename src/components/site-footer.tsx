import Link from "next/link";
import { siteConfig } from "@/config/site";
import { contactItems } from "@/data/contacts";
import { navLinks } from "@/data/navigation";
import { TrackedLink } from "@/components/tracked-link";
import { VKIcon, TelegramIcon, InstagramIcon } from "@/components/ui/icons";

const socialItems = [
  {
    key: "vk",
    label: "ВКонтакте",
    href: siteConfig.social.vk,
    goal: "click_vk_footer" as const,
  },
  {
    key: "telegram",
    label: "Telegram",
    href: siteConfig.social.telegram,
    goal: "click_tg_footer" as const,
  },
  {
    key: "instagram",
    label: "Instagram",
    href: siteConfig.social.instagram,
    goal: "click_instagram_footer" as const,
  },
];

export function SiteFooter() {
  const footerContacts = contactItems.filter(
    (item) => item.icon === "phone" || item.icon === "email"
  );

  return (
    <footer className="relative border-t border-border/60 bg-surface/90">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(77,163,255,0.2),rgba(43,228,255,0.8),rgba(0,209,143,0.2))]" />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.3fr_1fr_1.2fr] md:px-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gradient">СтудСтарт</h2>
          <p className="text-sm text-muted">{siteConfig.description}</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Навигация</p>
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-muted hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4 text-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Контакты</p>
          <div className="grid gap-2">
            {footerContacts.map((item) => (
              <TrackedLink
                key={item.label}
                href={item.href}
                goal={item.goal}
                className="text-muted hover:text-foreground"
              >
                {item.label}: {item.value}
              </TrackedLink>
            ))}
          </div>
          <div className="flex items-center gap-4 pt-2">
            {socialItems.map((item) => (
              <TrackedLink
                key={item.key}
                href={item.href}
                goal={item.goal}
                target="_blank"
                rel="noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-muted transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                aria-label={item.label}
              >
                {item.key === "vk" && <VKIcon />}
                {item.key === "telegram" && <TelegramIcon />}
                {item.key === "instagram" && <InstagramIcon />}
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-4 text-center text-xs text-muted md:px-6">
        <p>© {new Date().getFullYear()} СтудСтарт. Все права защищены.</p>
      </div>
    </footer>
  );
}
