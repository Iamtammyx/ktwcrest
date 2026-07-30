import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24">
      <SectionHeading
        eyebrow="What we build, in practice"
        title="Eight practices, one delivery model"
        subtitle="Each engagement is scoped around the outcome you need, not the tools we happen to like."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={(i % 4) * 0.06}>
            <GlassCard interactive className="h-full">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-300/10 text-brand-500 ring-1 ring-white/40 dark:text-brand-300 dark:ring-white/10">
                <Icon name={service.icon} className="h-[22px] w-[22px]" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-[color:var(--fg)]">
                {service.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {service.summary}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
