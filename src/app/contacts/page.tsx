import type { Metadata } from "next";
import { contactItems } from "@/data/contacts";
import { OrganizersList } from "@/components/organizers-list";
import { TrackedLink } from "@/components/tracked-link";
import { getContactIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { FaArrowRight } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты и организаторы форума СтудСтарт.",
};

function getActionLabel(icon: string) {
  switch (icon) {
    case "phone":
      return "Позвонить";
    case "email":
      return "Написать";
    case "vk":
    case "telegram":
    case "instagram":
      return "Подписаться";
    default:
      return "Перейти";
  }
}

export default function ContactsPage() {
  return (
    <div className="space-y-20 pb-20 pt-10">
      {/* Intro / Contact Info Section */}
      <section className="animate-fade-up">
        <div className="section-shell relative overflow-hidden bg-gradient-to-br from-surface-1 to-surface-2 p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
          
          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <p className="section-eyebrow">Контакты</p>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  Мы всегда <br />
                  <span className="text-gradient">на связи</span>
                </h1>
              </div>
              
              <p className="max-w-md text-lg text-muted md:text-xl">
                Есть вопросы или предложения? <br />
                Мы открыты к общению!
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-md transition-all duration-300",
                    "hover:border-primary/30 hover:bg-white/10 hover:shadow-glow hover:-translate-y-1"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl transition-colors group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary"
                    )}>
                      {getContactIcon(item.icon)}
                    </span>
                    
                    <span className="block text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                      {item.label}
                    </span>
                  </div>

                  <TrackedLink
                    href={item.href}
                    goal={item.goal}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-sm font-semibold transition-all hover:bg-primary hover:text-white group-hover:shadow-lg"
                  >
                    {getActionLabel(item.icon)}
                    <FaArrowRight className="h-3 w-3" />
                  </TrackedLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-10 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <h2 className="text-3xl font-bold md:text-4xl">
            Команда <span className="text-primary">СтудСтарт</span>
          </h2>
          <p className="text-lg text-muted">
            Люди, которые делают этот форум реальностью.
          </p>
        </div>
        
        <OrganizersList />
      </section>
    </div>
  );
}
