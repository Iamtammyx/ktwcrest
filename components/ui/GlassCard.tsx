import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type GlassCardProps = {
  /** Adds hover lift + shadow growth for clickable/feature cards. */
  interactive?: boolean;
  /** Removes the default padding when you need full control. */
  bare?: boolean;
} & ComponentPropsWithoutRef<"div">;

/**
 * Frosted glassmorphism surface, theme-aware.
 *  - Light: translucent white, indigo-tinted soft shadow (KidsGPT look)
 *  - Dark : translucent navy, blue-tinted glow (KTW Crest look)
 * A top-edge sheen sells the "glass" without extra markup at the call site.
 */
export function GlassCard({
  interactive = false,
  bare = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border backdrop-blur-xl",
        // Light surface
        "border-white/40 bg-white/55 shadow-2xl shadow-indigo-500/15",
        // Dark surface
        "dark:border-white/10 dark:bg-[#0e1b30]/45 dark:shadow-blue-950/40",
        !bare && "p-6 sm:p-7",
        interactive &&
          "transition-all duration-300 will-change-transform hover:-translate-y-1 hover:border-white/60 hover:shadow-indigo-500/25 dark:hover:border-white/20 dark:hover:shadow-blue-900/50",
        className,
      )}
      {...props}
    >
      {/* top-edge glass sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-px rounded-[inherit] bg-gradient-to-b from-white/50 to-transparent opacity-50 dark:from-white/[0.07] dark:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
