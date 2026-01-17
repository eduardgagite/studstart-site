"use client";

import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";
import { reachGoal, type MetrikaGoal } from "@/lib/ym";
import { cn } from "@/lib/cn";

type TrackedLinkProps = PropsWithChildren<
  LinkProps & {
    goal?: MetrikaGoal;
    className?: string;
    target?: string;
    rel?: string;
    title?: string;
  }
>;

export function TrackedLink({ goal, className, children, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      className={cn(className)}
      onClick={() => {
        if (goal) reachGoal(goal);
      }}
    >
      {children}
    </Link>
  );
}
