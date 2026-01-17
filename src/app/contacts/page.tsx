import type { Metadata } from "next";
import { contactItems } from "@/data/contacts";
import { OrganizersList } from "@/components/organizers-list";
import { siteConfig } from "@/config/site";
import { TrackedLink } from "@/components/tracked-link";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты и организаторы форума СтудСтарт.",
};

const contactIcons: Record<string, JSX.Element> = {
  phone: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M6.6 3.6c.4-.4 1-.5 1.5-.3l2.6 1a1 1 0 0 1 .6 1.2l-.6 2a1 1 0 0 1-1 .7h-1a13 13 0 0 0 6.3 6.3v-1a1 1 0 0 1 .7-1l2-.6a1 1 0 0 1 1.2.6l1 2.6c.2.5.1 1.1-.3 1.5l-1.2 1.2c-.7.7-1.8 1-2.8.7-5.7-1.7-10.1-6.1-11.8-11.8-.3-1 0-2.1.7-2.8l1.2-1.2Z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.2l8 4.8 8-4.8V8H4Zm0 2.5V16h16v-5.5l-7.5 4.5a1 1 0 0 1-1 0L4 10.5Z" />
    </svg>
  ),
  vk: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4 6h3a1 1 0 0 1 1 .76c.2.88.74 2.57 2.08 3.9a1 1 0 0 0 1.7-.63V6a1 1 0 0 1 1-1h2.5a1 1 0 0 1 .94 1.34c-.3.86-1 2.48-2.3 4.02a1 1 0 0 0 .05 1.31c1.47 1.57 2.42 3.14 2.86 4.01A1 1 0 0 1 17 18h-2.1a1 1 0 0 1-.82-.43c-.63-.9-1.59-2.08-2.64-2.79a1 1 0 0 0-1.6.8V17a1 1 0 0 1-1 1H8.4a4 4 0 0 1-3.14-1.52C3.8 14.56 3.2 12.2 3 10.92A1 1 0 0 1 4 9.8Z" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4.5 11.4 18.7 5.1a1 1 0 0 1 1.4 1.1l-2.7 12.2a1 1 0 0 1-1.5.65l-4.4-2.7-2.3 2.4a1 1 0 0 1-1.7-.5l-1.1-4.7-3.6-1.2a1 1 0 0 1 0-1.9Zm4.9 2.9.7 3 1.6-1.6 4.9-6-7.2 4.6Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
    </svg>
  ),
};

export default function ContactsPage() {
  return (
    <div className="space-y-10 pt-10 pb-10">
      <section className="section-shell section-sky space-y-3">
        <p className="section-eyebrow">Контакты</p>
        <h1 className="text-3xl font-semibold">Мы на связи</h1>
        <p className="text-muted">{siteConfig.location}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {contactItems.map((item) => (
            <TrackedLink
              key={item.label}
              href={item.href}
              goal={item.goal}
              className="glass-card flex items-start gap-4 p-4 text-sm text-muted hover:text-foreground"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-primary">
                {contactIcons[item.icon]}
              </span>
              <div>
                <span className="block text-xs uppercase tracking-[0.2em] text-muted">
                  {item.label}
                </span>
                <span className="mt-2 block text-base text-foreground">
                  {item.value}
                </span>
              </div>
            </TrackedLink>
          ))}
        </div>
      </section>

      <section className="section-shell section-night space-y-4">
        <div>
          <p className="section-eyebrow">Организаторы</p>
          <h2 className="text-2xl font-semibold">Команда СтудСтарта</h2>
          <p className="text-muted">Команда, которая готовит форум.</p>
        </div>
        <OrganizersList />
      </section>
    </div>
  );
}
