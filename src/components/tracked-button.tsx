"use client";

import type { ComponentProps, MouseEventHandler } from "react";
import { Button } from "@/components/ui/button";
import { reachGoal, type MetrikaGoal } from "@/lib/ym";

type TrackedButtonProps = ComponentProps<typeof Button> & {
  goal?: MetrikaGoal;
};

export function TrackedButton(props: TrackedButtonProps) {
  if (typeof props.href === "string") {
    const { goal, onClick, ...rest } = props;
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
      if (goal) reachGoal(goal);
      onClick?.(event);
    };

    return <Button {...rest} onClick={handleClick} />;
  }

  const { goal, onClick, ...rest } = props;
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (goal) reachGoal(goal);
    onClick?.(event);
  };

  return <Button {...rest} onClick={handleClick} />;
}
