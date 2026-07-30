import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section
      id="process"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24"
    >
      <SectionHeading
        eyebrow="How the work connects"
        title="Five steps, run with consulting discipline"
        subtitle="Discover, Define, Design, Deliver, Improve — each step has named outputs, so you always know what you are approving."
      />

      <div className="relative mt-16">
        {/* Connector line (desktop) — shows through the gaps between steps. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[8%] top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent lg:block"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.06}>
              <GlassCard className="h-full text-center lg:text-left">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-lg font-semibold text-white shadow-lg shadow-brand-500/30 ring-4 ring-[var(--bg-base)] lg:mx-0">
                  {step.number}
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-[color:var(--fg)]">
                  {step.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
