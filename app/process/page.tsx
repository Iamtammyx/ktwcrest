import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our 5-Step Consulting Process — KTW Crest",
  description:
    "Discover, Define, Design, Deliver, Improve — how KTW Crest runs engagements with consulting discipline and named outputs at every step.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Delivery Governance"
        title={
          <>
            Our 5-step{" "}
            <span className="text-gradient italic">consulting process</span>
          </>
        }
        subtitle="Each step has named outputs you approve before we move on — so momentum never comes at the cost of clarity."
      />

      <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
        <div className="relative">
          {/* Vertical connector */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-2 bottom-2 left-7 w-px bg-gradient-to-b from-brand-400/60 via-brand-400/30 to-transparent sm:left-8"
          />
          <div className="flex flex-col gap-5">
            {processSteps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.05}>
                <div className="relative flex items-start gap-5">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-lg font-semibold text-white shadow-lg shadow-brand-500/30 ring-4 ring-[var(--bg-base)] sm:h-16 sm:w-16">
                    {step.number}
                  </div>
                  <GlassCard className="flex-1">
                    <h2 className="font-display text-xl font-semibold tracking-tight text-[color:var(--fg)]">
                      {step.name}
                    </h2>
                    <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <CtaBand title="Ready to begin at step one?" />
    </>
  );
}
