"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/content";
import {
  classify,
  matchAnswer,
  suggestedQuestions,
} from "@/lib/chatbot";
import { cn } from "@/lib/utils";

const WA_GREEN = "#25D366";

const GREETING =
  "Hi! 👋 I'm the KTW Crest assistant. Ask me about our services, process, pricing or where we're based — or pick a question below.";

type Msg = {
  id: number;
  role: "bot" | "user";
  text: string;
  /** Render a "Talk to a human on WhatsApp" button under this message. */
  human?: boolean;
};

function waUrl(text: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, role: "bot", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const idRef = useRef(1);
  const lastUser = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const nextId = () => idRef.current++;
  const push = (m: Omit<Msg, "id">) =>
    setMessages((prev) => [...prev, { id: nextId(), ...m }]);

  // auto-scroll to the latest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  function openWhatsApp(prefill?: string) {
    const body = (prefill ?? lastUser.current).trim() ||
      "Hi KTW Crest, I have a question.";
    window.open(waUrl(body), "_blank", "noopener,noreferrer");
  }

  function respond(text: string) {
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      const kind = classify(text);

      if (kind === "greeting") {
        push({ role: "bot", text: "Hello! How can I help you today?" });
        return;
      }
      if (kind === "thanks") {
        push({ role: "bot", text: "You're welcome! Anything else I can help with?" });
        return;
      }
      if (kind === "human") {
        push({
          role: "bot",
          text: "Of course — I'll connect you with a senior consultant on WhatsApp.",
          human: true,
        });
        return;
      }

      const entry = matchAnswer(text);
      if (entry) {
        push({ role: "bot", text: entry.a });
      } else {
        push({
          role: "bot",
          text: "I don't have a confident answer for that one — but a senior consultant can help you directly.",
          human: true,
        });
      }
    }, 650);
    timers.current.push(t);
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    lastUser.current = trimmed;
    push({ role: "user", text: trimmed });
    setInput("");
    respond(trimmed);
  }

  const showSuggestions = messages.length <= 1 && !typing;

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Chat with the KTW Crest assistant"
            className="flex h-[32rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/85 shadow-2xl shadow-indigo-500/20 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0e1b30]/90 dark:shadow-black/40"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-br from-brand-500 to-brand-700 px-5 py-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white">
                <BotGlyph className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">KTW Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-white/85">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Answers instantly · handover to a human anytime
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-7 w-7 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) =>
                m.role === "bot" ? (
                  <div key={m.id} className="flex flex-col items-start gap-2">
                    <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-black/5 px-3.5 py-2.5 text-sm leading-relaxed text-[color:var(--fg)] dark:bg-white/10">
                      {m.text}
                    </div>
                    {m.human && (
                      <button
                        type="button"
                        onClick={() => openWhatsApp()}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow-md transition-transform hover:-translate-y-0.5"
                        style={{ backgroundColor: WA_GREEN }}
                      >
                        <WhatsAppGlyph className="h-4 w-4" />
                        Talk to a human on WhatsApp
                      </button>
                    )}
                  </div>
                ) : (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[88%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-brand-500 to-brand-600 px-3.5 py-2.5 text-sm leading-relaxed text-white">
                      {m.text}
                    </div>
                  </div>
                ),
              )}

              {typing && (
                <div className="flex w-14 items-center gap-1 rounded-2xl rounded-tl-sm bg-black/5 px-3.5 py-3 dark:bg-white/10">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-50"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              )}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="rounded-full border border-white/50 bg-white/60 px-3 py-1.5 text-xs font-medium text-[color:var(--fg)] transition-all hover:-translate-y-0.5 hover:border-brand-400/40 dark:border-white/15 dark:bg-white/5"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Persistent human handover */}
            <button
              type="button"
              onClick={() => openWhatsApp()}
              className="flex items-center justify-center gap-2 border-t border-white/30 py-2.5 text-xs font-medium text-muted transition-colors hover:text-[color:var(--fg)] dark:border-white/10"
            >
              <WhatsAppGlyph className="h-3.5 w-3.5" style={{ color: WA_GREEN }} />
              Prefer a person? Chat on WhatsApp
            </button>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-white/30 px-3 py-3 dark:border-white/10"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                aria-label="Your message"
                className="min-w-0 flex-1 rounded-full border border-white/40 bg-white/70 px-4 py-2.5 text-sm text-[color:var(--fg)] outline-none transition placeholder:text-muted/70 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/25 dark:border-white/10 dark:bg-white/[0.06]"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with the KTW Crest assistant"}
        aria-expanded={open}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-xl shadow-brand-500/30 transition-transform hover:scale-105 active:scale-95"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-20" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="relative"
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <BotGlyph className="h-7 w-7" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}

/** Chat bubble with a sparkle — signals an assistant. */
function BotGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
      <path d="M12.2 8.2l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppGlyph({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
