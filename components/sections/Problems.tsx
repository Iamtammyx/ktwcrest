import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { problems } from "@/lib/content";

export function Problems() {
  return (
    <section
      id="problems"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24"
    >
      <SectionHeading
        align="left"
        eyebrow="The problems we are called in for"
        title="From complexity to clarity"
        subtitle="Tell us which is closest to your goal and we will point you to the right practice."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.08}>
            <GlassCard interactive className="group h-full">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight text-[color:var(--fg)]">
                  {p.title}
                </h3>
                <span className="mt-0.5 shrink-0 rounded-full border border-white/40 bg-white/40 px-2.5 py-1 text-[11px] font-medium text-muted dark:border-white/10 dark:bg-white/[0.04]">
                  {p.points_to}
                </span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                “{p.body}”
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 dark:text-brand-300">
                Find the right service
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
