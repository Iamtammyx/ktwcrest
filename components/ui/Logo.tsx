import { cn } from "@/lib/utils";

/**
 * KTW Crest shield mark, rebuilt as a crisp, theme-aware SVG:
 *  - shield outline + inner keyline use `currentColor` (navy in light mode,
 *    near-white in dark) so it reads on any background
 *  - the interlocked K·T monogram is heraldic gold; the W anchors the base
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 140"
      className={cn("h-9 w-auto", className)}
      role="img"
      aria-label="KTW Crest"
      fill="none"
    >
      {/* Outer shield */}
      <path
        d="M18 27 C18 19 24 15 32 15 L88 15 C96 15 102 19 102 27 L102 70 C102 98 80 118 60 130 C40 118 18 98 18 70 Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Inner keyline */}
      <path
        d="M26 32 C26 26 30 23 36 23 L84 23 C90 23 94 26 94 32 L94 69 C94 92 76 108 60 119 C44 108 26 92 26 69 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.55"
      />
      {/* Monogram — gold K + T */}
      <g
        stroke="var(--color-gold-400, #c8a45d)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* T bar + stem */}
        <path d="M40 44 H86" />
        <path d="M63 44 V96" />
        {/* K */}
        <path d="M42 48 V88" />
        <path d="M42 68 L57 52" />
        <path d="M42 68 L60 90" />
      </g>
      {/* W base — foreground */}
      <path
        d="M42 96 L50 114 L60 101 L70 114 L78 96"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Full lockup: shield mark + KTW CREST wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-9 text-[color:var(--fg)] sm:h-10" />
      <span className="font-display text-[19px] font-semibold tracking-[0.12em] text-[color:var(--fg)] uppercase sm:text-xl">
        KTW <span className="text-gradient">Crest</span>
      </span>
    </span>
  );
}
