import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type CtaBandProps = {
  title?: React.ReactNode;
  subtitle?: string;
};

/** Shared closing call-to-action used across interior pages. */
export function CtaBand({
  title = "Start your technology discovery",
  subtitle = "A senior consultant reads every enquiry and will confirm scope, price and delivery dates — usually within two working days.",
}: CtaBandProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal>
        <GlassCard className="overflow-hidden px-6 py-12 text-center sm:px-10 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl"
          />
          <h2 className="relative mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted">{subtitle}</p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Book a Discovery Call
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Button>
            <Button href="/services" size="lg" variant="secondary">
              Explore Services
            </Button>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}
