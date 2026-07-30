import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Consistent hero-style header for interior pages. Matches the home hero's
 * type scale and eyebrow treatment, with generous top padding to clear the
 * sticky navbar.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative mx-auto max-w-7xl px-4 pt-16 pb-8 text-center sm:px-6 lg:pt-24",
        className,
      )}
    >
      <Reveal className="flex flex-col items-center gap-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/50 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted uppercase backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          {eyebrow}
        </span>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.06] font-semibold tracking-tight text-balance sm:text-5xl md:text-[3.4rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
            {children}
          </div>
        )}
      </Reveal>
    </section>
  );
}
