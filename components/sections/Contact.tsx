"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/lib/content";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  email: string;
  org: string;
  message: string;
  consent: boolean;
  company: string; // honeypot
};

const empty: Fields = {
  name: "",
  email: "",
  org: "",
  message: "",
  consent: false,
  company: "",
};

const reassurances = [
  "A senior consultant reads every enquiry.",
  "We confirm scope, price and delivery dates together.",
  "Nothing is sent until you approve it.",
];

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [sent, setSent] = useState(false);

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      next.email = "Please enter a valid work email address.";
    if (!fields.message.trim())
      next.message = "Tell us a little about what you are trying to achieve.";
    if (!fields.consent)
      next.consent = "Please give consent so we may store your details to reply.";
    return next;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (fields.company) return; // honeypot tripped — silently drop
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    // Demo mode: no live endpoint. In production this would POST to a secure
    // server-side endpoint and a consultant would reply within two working days.
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Tell us what needs to work better"
            title={contact.heading}
            subtitle={contact.body}
          />
          <ul className="mt-8 space-y-3">
            {reassurances.map((r) => (
              <li key={r} className="flex items-start gap-3 text-sm text-muted">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-500 dark:text-brand-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        <GlassCard className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-80 flex-col items-center justify-center text-center"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-[color:var(--fg)]">
                  Summary queued for KTW Crest
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  Demo mode: no live endpoint, so nothing was transmitted. In
                  production this posts to a secure endpoint and a consultant
                  replies within two working days.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-6"
                  onClick={() => {
                    setFields(empty);
                    setSent(false);
                  }}
                >
                  Send another enquiry
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={onSubmit}
                noValidate
                className="grid gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    value={fields.name}
                    onChange={(v) => set("name", v)}
                    error={errors.name}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  <Field
                    label="Work email"
                    type="email"
                    value={fields.email}
                    onChange={(v) => set("email", v)}
                    error={errors.email}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </div>
                <Field
                  label="Organisation"
                  value={fields.org}
                  onChange={(v) => set("org", v)}
                  placeholder="Company or team (optional)"
                  autoComplete="organization"
                  optional
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[color:var(--fg)]">
                    What are you trying to achieve?
                  </label>
                  <textarea
                    value={fields.message}
                    onChange={(e) => set("message", e.target.value)}
                    rows={4}
                    placeholder="A sentence or two about the outcome you need."
                    className={cn(
                      "w-full resize-none rounded-2xl border bg-white/55 px-4 py-3 text-sm text-[color:var(--fg)] outline-none transition placeholder:text-muted/70 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 dark:bg-white/[0.04]",
                      errors.message
                        ? "border-red-400/70"
                        : "border-white/40 dark:border-white/10",
                    )}
                  />
                  {errors.message && <ErrorText>{errors.message}</ErrorText>}
                </div>

                {/* Honeypot (hidden from users, catches bots) */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  value={fields.company}
                  onChange={(e) => set("company", e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <label className="flex items-start gap-3 text-sm text-muted">
                  <input
                    type="checkbox"
                    checked={fields.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/40 accent-brand-500"
                  />
                  <span>
                    I consent to {`KTW Crest`} storing these details to respond to
                    my enquiry. Only the minimum lead data is kept.
                  </span>
                </label>
                {errors.consent && <ErrorText>{errors.consent}</ErrorText>}

                <Button type="submit" size="lg" className="mt-1 w-full">
                  Send enquiry
                </Button>
                <p className="text-center text-xs text-muted">
                  Protected by a hidden spam check. No data leaves the page in
                  demo mode.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  optional?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[color:var(--fg)]">
        {label}
        {optional && <span className="ml-1 text-xs text-muted">· optional</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(
          "w-full rounded-2xl border bg-white/55 px-4 py-3 text-sm text-[color:var(--fg)] outline-none transition placeholder:text-muted/70 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 dark:bg-white/[0.04]",
          error ? "border-red-400/70" : "border-white/40 dark:border-white/10",
        )}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{children}</p>;
}
