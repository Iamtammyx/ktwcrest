import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/50 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted uppercase backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
        {eyebrow}
      </span>
      <h2 className="max-w-3xl font-display text-3xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
