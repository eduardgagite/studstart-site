import type { Metadata } from "next";
import { QuestionsDisplay } from "@/components/questions-display";

export const metadata: Metadata = {
  title: "Экран сообщений",
  description: "Экран с анонимными сообщениями участников.",
};

export default function DisplayQuestionsPage() {
  return <QuestionsDisplay />;
}
