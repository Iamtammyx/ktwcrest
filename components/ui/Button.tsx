import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/40 dark:shadow-brand-500/25",
  secondary:
    "border border-white/50 bg-white/50 text-[color:var(--fg)] backdrop-blur-xl shadow-lg shadow-indigo-500/10 hover:-translate-y-0.5 hover:bg-white/70 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10",
  ghost: "text-[color:var(--fg)] hover:bg-black/5 dark:hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
};

export type ButtonProps = SharedProps &
  (
    | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
    | ({ href: string } & ComponentPropsWithoutRef<"a">)
  );

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && typeof rest.href === "string") {
    return (
      <a className={classes} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
