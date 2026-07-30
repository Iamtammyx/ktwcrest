"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { heroStats, site } from "@/lib/content";

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.09, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="top"
      className="relative mx-auto flex max-w-7xl flex-col gap-14 px-4 pt-16 pb-20 sm:px-6 lg:flex-row lg:items-center lg:pt-24 lg:pb-28"
    >
      {/* Left — message */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/50 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted uppercase backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Technology consulting, strategy through delivery
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 max-w-2xl font-display text-4xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl"
        >
          Strategy-led technology.{" "}
          <span className="text-gradient italic">Built to perform.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          {site.intro}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button href="#contact" size="lg">
            Book a Discovery Call
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Button>
          <Button href="#services" size="lg" variant="secondary">
            Explore Our Services
          </Button>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 text-sm text-muted"
        >
          One team, from first workshop to post-launch improvement.
        </motion.p>
      </motion.div>

      {/* Right — stat panel + reserved product frame */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:max-w-md"
      >
        <GlassCard className="p-5 sm:p-6">
          <div className="grid grid-cols-2 gap-3">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/40 bg-white/40 p-4 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="font-display text-3xl font-semibold text-[color:var(--fg)]">
                  {s.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Reserved for KTW Crest product screenshots (per reference note). */}
          <div className="mt-3 grid aspect-video place-items-center overflow-hidden rounded-2xl border border-dashed border-white/50 bg-gradient-to-br from-brand-500/15 to-transparent text-center dark:border-white/15">
            <div className="px-6">
              <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="14" rx="2" />
                  <path d="M3 9h18M8 21h8" />
                </svg>
              </div>
              <p className="mt-3 text-xs text-muted">
                Interface imagery reserved for KTW&nbsp;Crest product
                screenshots.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
