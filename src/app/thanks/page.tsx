import type { Metadata } from "next";
import { ThanksContent } from "./thanks-content";

export const metadata: Metadata = {
  title: "Спасибо",
  description: "Форум СтудСтарт завершён — спасибо всем участникам и команде.",
};

export default function ThanksPage() {
  return <ThanksContent />;
}
