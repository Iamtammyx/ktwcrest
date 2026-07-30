import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { serviceDisciplines } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services & Capabilities — KTW Crest",
  description:
    "Our 8 core technology disciplines: CRM, BI & dashboards, eCommerce, custom applications, integration & automation, digital strategy, product design, and delivery.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services & Capabilities"
        title={
          <>
            Our 8 core{" "}
            <span className="text-gradient italic">technology disciplines</span>
          </>
        }
        subtitle="Each engagement is scoped around the outcome you need — from executive strategy through hands-on delivery."
      />

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="flex flex-col gap-6">
          {serviceDisciplines.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.05}>
              <GlassCard interactive className="scroll-mt-24" id={s.slug}>
                <div className="flex flex-col gap-6 lg:flex-row">
                  {/* Left: identity + approach */}
                  <div className="lg:w-[38%]">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-300/10 text-brand-500 ring-1 ring-white/40 dark:text-brand-300 dark:ring-white/10">
                        <Icon name={s.icon} className="h-[22px] w-[22px]" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wide text-gold-500 uppercase dark:text-gold-400">
                        {s.tag}
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {s.summary}
                    </p>
                    <div className="mt-4 rounded-2xl border-l-2 border-brand-400 bg-white/40 px-4 py-3 text-sm text-muted dark:bg-white/[0.03]">
                      <span className="font-semibold text-[color:var(--fg)]">
                        Approach:{" "}
                      </span>
                      {s.approach}
                    </div>
                  </div>

                  {/* Right: capabilities + deliverables + tech */}
                  <div className="flex-1">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <List title="Capabilities" items={s.capabilities} kind="bullet" />
                      <List title="Deliverables" items={s.deliverables} kind="check" />
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/40 bg-white/40 px-3 py-1 text-xs text-muted dark:border-white/10 dark:bg-white/[0.04]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>

      <CtaBand />
    </>
  );
}

function List({
  title,
  items,
  kind,
}: {
  title: string;
  items: string[];
  kind: "bullet" | "check";
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-wide text-brand-500 uppercase dark:text-brand-300">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted">
            <span
              className={
                kind === "check"
                  ? "mt-0.5 text-brand-500 dark:text-brand-300"
                  : "mt-0.5 text-gold-500 dark:text-gold-400"
              }
              aria-hidden
            >
              {kind === "check" ? "✓" : "•"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
