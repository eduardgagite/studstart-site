"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { reachGoal, type MetrikaGoal } from "@/lib/ym";

type TrackedButtonProps = ComponentProps<typeof Button> & {
  goal?: MetrikaGoal;
};

export function TrackedButton({ goal, onClick, ...props }: TrackedButtonProps) {
  return (
    <Button
      {...props}
      onClick={(event) => {
        if (goal) reachGoal(goal);
        onClick?.(event);
      }}
    />
  );
}
