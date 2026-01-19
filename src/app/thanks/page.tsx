import type { Metadata } from "next";
import { ThanksContent } from "./thanks-content";

export const metadata: Metadata = {
  title: "Спасибо",
  description: "Заявка отправлена — спасибо за участие в СтудСтарт.",
};

export default function ThanksPage() {
  return <ThanksContent />;
}
