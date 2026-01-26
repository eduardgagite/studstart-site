import type { Metadata } from "next";
import { organizationContacts } from "@/data/contacts";
import { OrganizersList } from "@/components/organizers-list";
import { TrackedLink } from "@/components/tracked-link";
import { getContactIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты и организаторы форума СтудСтарт.",
};

export default function ContactsPage() {
  return (
    <div className="space-y-20 pb-20 pt-10">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen dark:opacity-20 animate-float" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen dark:opacity-20 animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Intro / Contact Info Section */}
      <section className="animate-fade-up">
        <div className="section-shell relative overflow-hidden border-none bg-white/60 dark:bg-slate-900/60 p-8 md:p-12 backdrop-blur-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10">
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
          
          <div className="relative z-10 space-y-12">
            <div className="flex flex-col justify-center space-y-6 text-center">
              <div className="space-y-4">
                <p className="section-eyebrow">Контакты</p>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  Мы всегда <br />
                  <span className="text-gradient">на связи</span>
                </h1>
              </div>
              
              <p className="mx-auto max-w-md text-lg text-muted md:text-xl">
                Есть вопросы или предложения? <br />
                Мы открыты к общению!
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {organizationContacts.map((org) => (
                <div
                  key={org.name}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-white/60 p-6 shadow-sm backdrop-blur-md transition-all duration-300",
                    "hover:border-primary/30 hover:bg-white/80 hover:shadow-lg hover:-translate-y-1",
                    "dark:bg-white/[0.08] dark:hover:bg-white/[0.12] dark:border-white/10"
                  )}
                >
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-3 shadow-sm transition-transform duration-500 group-hover:scale-110">
                      <img
                        src={assetPath(org.logo)}
                        alt={org.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    
                    <h3 className="mb-2 text-xl font-bold text-foreground md:text-2xl">
                      {org.name}
                    </h3>
                    <p className="mb-6 text-sm text-muted-foreground dark:text-blue-100/70">
                      {org.description}
                    </p>
                  </div>

                  <div className="flex w-full gap-3">
                    {org.socials.map((social) => (
                      <TrackedLink
                        key={social.label}
                        href={social.href}
                        goal={social.goal as any}
                        target="_blank"
                        className={cn(
                          "flex h-12 flex-1 items-center justify-center rounded-xl border border-border/50 bg-background/50 text-muted transition-all duration-300",
                          "hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-105"
                        )}
                        title={social.label}
                      >
                        {getContactIcon(social.icon, "h-5 w-5")}
                      </TrackedLink>
                    ))}
                  </div>
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
