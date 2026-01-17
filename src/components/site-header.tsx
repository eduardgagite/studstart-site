"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/data/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { reachGoal } from "@/lib/ym";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 md:px-6 md:py-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/60 bg-surface/80">
            <svg
              viewBox="0 0 32 32"
              className="h-6 w-6 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 22L14 10L20 18L28 8" />
              <path d="M5 26H27" />
            </svg>
          </span>
          <span className="text-xl font-semibold text-gradient md:text-2xl">
            СтудСтарт
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-base font-semibold text-muted md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:text-foreground hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            href="/register"
            variant="primary"
            onClick={() => reachGoal("cta_register")}
          >
            Стать участником
          </Button>
          <button
            type="button"
            className="ml-1 inline-flex h-11 w-11 items-center justify-center rounded-md border border-border/70 bg-surface text-foreground md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Открыть меню"
            aria-expanded={open}
          >
            <span className="sr-only">Меню</span>
            <span className="flex h-4 w-5 flex-col justify-between">
              <span className="h-[2px] w-full bg-current" />
              <span
                className={cn(
                  "h-[2px] w-full bg-current transition",
                  open && "opacity-0"
                )}
              />
              <span className="h-[2px] w-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-surface md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 text-sm text-muted">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
