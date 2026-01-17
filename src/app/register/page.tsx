import type { Metadata } from "next";
import { RegistrationForm } from "@/components/registration-form";
import { PageGoal } from "@/components/page-goal";

export const metadata: Metadata = {
  title: "Стать участником",
  description: "Стать участником форума СтудСтарт для первокурсников СОГУ.",
};

export default function RegisterPage() {
  return (
    <div className="space-y-6 pt-10 pb-10">
      <PageGoal goal="visit_register" />
      <header className="section-shell section-sky space-y-2">
        <h1 className="text-3xl font-semibold">Стать участником</h1>
        <p className="text-muted">
          Заполни форму, дождись подтверждения и приходи на очное собеседование.
        </p>
      </header>
      <div className="section-shell section-glow">
        <RegistrationForm />
      </div>
    </div>
  );
}
