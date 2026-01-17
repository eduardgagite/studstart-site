"use client";

import { useEffect } from "react";
import { reachGoal } from "@/lib/ym";

const targets = [
  { id: "about", goal: "scroll_about" },
  { id: "howto", goal: "scroll_howto" },
  { id: "photos", goal: "scroll_photos" },
] as const;

export function HomeScrollTracker() {
  useEffect(() => {
    const observed = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            const id = entry.target.id;
            if (!observed.has(id)) {
              const match = targets.find((item) => item.id === id);
              if (match) {
                reachGoal(match.goal);
                observed.add(id);
              }
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    targets.forEach((target) => {
      const element = document.getElementById(target.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
