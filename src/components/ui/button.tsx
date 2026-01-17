import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50";

const variantStyles = {
  primary:
    "bg-gradient-to-r from-primary to-accent text-slate-900 shadow-glow hover:brightness-110 active:brightness-95",
  secondary:
    "border border-border/70 bg-surface text-foreground hover:border-primary/60",
  ghost: "bg-transparent text-foreground hover:bg-surface/70",
};

type BaseProps = {
  className?: string;
  variant?: keyof typeof variantStyles;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  BaseProps & {
    href?: undefined;
  };

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  BaseProps & {
    href: string;
  };

export function Button(props: ButtonProps | LinkProps) {
  const { className, variant = "primary", ...rest } = props;
  const classes = cn(baseStyles, variantStyles[variant], className);

  if ("href" in rest) {
    const { href, ...linkProps } = rest;
    return (
      <Link href={href} className={classes} {...linkProps} />
    );
  }

  return <button className={classes} {...rest} />;
}
