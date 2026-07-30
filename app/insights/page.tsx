import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { insights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights & Thought Leadership — KTW Crest",
  description:
    "Perspectives on CRM data quality, executive dashboards, and resilient API integration for enterprise workflows.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights & Thought Leadership"
        title={
          <>
            Latest <span className="text-gradient italic">perspectives</span>
          </>
        }
        subtitle="Practical, senior viewpoints on the decisions that make or break technology programmes."
      />

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((post, i) => (
            <Reveal key={post.title} delay={(i % 3) * 0.06}>
              <GlassCard interactive className="group flex h-full flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-brand-500 dark:text-brand-300">
                    {post.category} · {post.readTime}
                  </span>
                  {post.draft && (
                    <span className="rounded-full border border-white/40 bg-white/40 px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted uppercase dark:border-white/10 dark:bg-white/[0.04]">
                      Draft
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-[color:var(--fg)]">
                  {post.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <p className="mt-3 line-clamp-4 text-[13px] leading-relaxed text-muted/80">
                  {post.preview}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                  {post.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/40 bg-white/40 px-3 py-1 text-xs text-muted dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 dark:text-brand-300">
                  Read article
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-center text-xs text-muted">
            Draft articles. Full pieces are published as the insights library
            grows.
          </p>
        </Reveal>
      </div>

      <CtaBand
        title="Want these insights applied to your systems?"
        subtitle="Bring us the problem — we will frame the approach and the outcome you can expect."
      />
    </>
  );
}
