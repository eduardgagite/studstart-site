import type { Metadata } from "next";
import { contactItems } from "@/data/contacts";
import { OrganizersList } from "@/components/organizers-list";
import { siteConfig } from "@/config/site";
import { TrackedLink } from "@/components/tracked-link";
import { getContactIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты и организаторы форума СтудСтарт.",
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
                {getContactIcon(item.icon)}
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
