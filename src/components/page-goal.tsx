"use client";

import { useEffect } from "react";
import { reachGoal, type MetrikaGoal } from "@/lib/ym";

export function PageGoal({ goal }: { goal: MetrikaGoal }) {
  useEffect(() => {
    reachGoal(goal);
  }, [goal]);

  return null;
}
