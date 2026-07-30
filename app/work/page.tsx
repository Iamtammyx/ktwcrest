import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies & Work — KTW Crest",
  description:
    "Featured client transformations across CRM modernization, executive dashboards, and custom self-service portals.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies & Work"
        title={
          <>
            Featured client{" "}
            <span className="text-gradient italic">transformations</span>
          </>
        }
        subtitle="Representative engagements showing how we turn operational friction into dependable, working systems."
      />

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06}>
              <GlassCard interactive className="flex h-full flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold tracking-wide text-gold-500 uppercase dark:text-gold-400">
                    {c.tag}
                  </span>
                  {c.sample && (
                    <span className="rounded-full border border-white/40 bg-white/40 px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted uppercase dark:border-white/10 dark:bg-white/[0.04]">
                      Sample
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-lg font-semibold tracking-tight text-[color:var(--fg)]">
                  {c.title}
                </h2>

                <dl className="mt-4 space-y-3 text-sm">
                  <Block label="Challenge" body={c.challenge} />
                  <Block label="Solution" body={c.solution} />
                </dl>

                <div className="mt-4 rounded-2xl bg-brand-500/10 px-4 py-3 text-sm text-[color:var(--fg)]">
                  <span className="font-semibold text-brand-500 dark:text-brand-300">
                    Outcome:{" "}
                  </span>
                  {c.outcome}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {c.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/40 bg-white/40 px-3 py-1 text-xs text-muted dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-center text-xs text-muted">
            Sample placeholders. A filterable case-study library with verified
            client names, metrics and testimonials follows once approved.
          </p>
        </Reveal>
      </div>

      <CtaBand title="Have a transformation in mind?" />
    </>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-brand-500 uppercase dark:text-brand-300">
        {label}
      </dt>
      <dd className="mt-1 leading-relaxed text-muted">{body}</dd>
    </div>
  );
}
