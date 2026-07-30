import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * KTW Crest wordmark — the official logo artwork (shield + monogram + wordmark).
 * Two theme variants are served: the navy original on light backgrounds, and a
 * light-recoloured version (gold monogram preserved) on the dark theme, so the
 * lockup stays legible in both. The correct one is shown via the `.dark` class.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/ktw-crest-logo.png"
        alt="KTW Crest"
        width={1191}
        height={316}
        priority
        className="block h-9 w-auto sm:h-10 dark:hidden"
      />
      <Image
        src="/ktw-crest-logo-dark.png"
        alt="KTW Crest"
        width={1191}
        height={316}
        priority
        className="hidden h-9 w-auto sm:h-10 dark:block"
      />
    </span>
  );
}
