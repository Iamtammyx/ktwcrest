import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { expertise } from "@/lib/content";

export function Expertise() {
  return (
    <section
      id="expertise"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            eyebrow="Where the work applies"
            title={expertise.heading}
            subtitle={expertise.body}
          />

          <Reveal delay={0.1} className="mt-8">
            <p className="mb-3 text-xs font-medium tracking-wide text-muted uppercase">
              Areas of experience
            </p>
            <div className="flex flex-wrap gap-2">
              {expertise.sectors.map((sector) => (
                <span
                  key={sector}
                  className="rounded-full border border-white/40 bg-white/45 px-3.5 py-1.5 text-sm text-muted backdrop-blur-xl transition-colors hover:text-[color:var(--fg)] dark:border-white/10 dark:bg-white/5"
                >
                  {sector}
                </span>
              ))}
            </div>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-muted">
              Areas of experience do not imply a partnership, certification or
              endorsement.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          {expertise.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <GlassCard interactive className="flex gap-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-300/10 text-brand-500 ring-1 ring-white/40 dark:text-brand-300 dark:ring-white/10">
                  <Icon name={pillar.icon} className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-[color:var(--fg)]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
