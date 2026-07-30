import { cn } from "@/lib/utils";

/**
 * KTW Crest wordmark. The gold "T-bar" crest glyph mirrors the reference brand
 * mark; the tile carries the brand-blue gradient.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/30">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <rect x="5" y="4" width="14" height="3.4" rx="1.4" fill="#d9bd82" />
          <rect x="10.3" y="4" width="3.4" height="16" rx="1.4" fill="#c8a45d" />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-[color:var(--fg)]">
        KTW <span className="text-gradient font-display italic">Crest</span>
      </span>
    </span>
  );
}
