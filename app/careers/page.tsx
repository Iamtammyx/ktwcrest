import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { careers, services, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers — KTW Crest",
  description:
    "Build, grow and ship work that performs. Join a senior, multidisciplinary team turning complex business needs into working software.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow={careers.hero.eyebrow}
        title={
          <>
            Build. Grow.{" "}
            <span className="text-gradient italic">Ship work that performs.</span>
          </>
        }
        subtitle={careers.hero.body}
      >
        <Button
          href={`mailto:${site.email}?subject=Careers at KTW Crest`}
          size="lg"
        >
          Send your CV
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Button>
        <Button href="/contact" size="lg" variant="secondary">
          Talk to us
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <Reveal>
          <GlassCard className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {careers.stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="font-display text-3xl font-semibold text-[color:var(--fg)] sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </GlassCard>
        </Reveal>
      </div>

      {/* Where you can grow — disciplines as tracks */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Whatever you want to do"
          title="Eight disciplines to grow across"
          subtitle="Go deep in one craft, or broaden into the disciplines next door. We back both mastery and range."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.06}>
              <GlassCard interactive className="h-full">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-300/10 text-brand-500 ring-1 ring-white/40 dark:text-brand-300 dark:ring-white/10">
                  <Icon name={s.icon} className="h-[22px] w-[22px]" />
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-[color:var(--fg)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.summary}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Wherever you are in your career */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Wherever you are in your career"
          title="Room to start, and room to lead"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {careers.stages.map((stage, i) => (
            <Reveal key={stage.title} delay={i * 0.08}>
              <GlassCard interactive className="h-full">
                <div className="font-display text-2xl font-semibold text-brand-500 dark:text-brand-300">
                  0{i + 1}
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-[color:var(--fg)]">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {stage.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why KTW Crest — values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="You belong here"
          title="How we work with our team"
          subtitle="The things that make KTW Crest a place senior practitioners choose to stay."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careers.values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 0.06}>
              <GlassCard interactive className="flex h-full gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-300/10 text-brand-500 ring-1 ring-white/40 dark:text-brand-300 dark:ring-white/10">
                  <Icon name={v.icon} className="h-[22px] w-[22px]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-[color:var(--fg)]">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {v.body}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8">
          <GlassCard className="text-center">
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted">
              {careers.note}
            </p>
          </GlassCard>
        </Reveal>
      </section>

      <CtaBand
        title="See yourself here?"
        subtitle="Send your CV and a note on the work you want to do — a senior consultant reads every application."
      />
    </>
  );
}
