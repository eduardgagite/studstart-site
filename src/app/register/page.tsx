import type { Metadata } from "next";
import { RegistrationForm } from "@/components/registration-form";
import { PageGoal } from "@/components/page-goal";
import { FaRocket } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Стать участником | СтудСтарт",
  description: "Заполни анкету, чтобы стать участником форума СтудСтарт для первокурсников СОГУ.",
};

export default function RegisterPage() {
  return (
    <div>
      <PageGoal goal="visit_register" />
      
      <section className="section-panel panel-sky pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="section-inner container mx-auto px-4">
          <header className="mb-12 text-center animate-fade-up">
            <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-glow transition hover:bg-primary/10 hover:border-primary/30 cursor-default">
               <FaRocket className="h-4 w-4" />
               <span>Твой старт здесь</span>
            </div>
            <h1 className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              Стать участником
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted leading-relaxed">
              Мы ищем активных, ярких и заряженных первокурсников. 
              Заполни форму честно и подробно — это твой шанс попасть в команду.
            </p>
          </header>

          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <RegistrationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
