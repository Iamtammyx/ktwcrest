"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300",
        scrolled
          ? "border-white/40 bg-white/70 shadow-lg shadow-indigo-500/5 dark:border-white/10 dark:bg-[#050b16]/80"
          : "border-white/30 bg-white/45 dark:border-white/[0.06] dark:bg-[#050b16]/55",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 transition-all duration-300 sm:px-6">
        <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        {/* Desktop nav pill */}
        <nav
          className={cn(
            "hidden items-center gap-1 rounded-full border border-white/40 bg-white/45 px-1.5 py-1.5 backdrop-blur-xl transition-all duration-300 lg:flex dark:border-white/10 dark:bg-white/5",
            scrolled && "shadow-lg shadow-indigo-500/10",
          )}
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-brand-500/15 text-brand-500 dark:bg-white/10 dark:text-brand-300"
                  : "text-muted hover:bg-black/5 hover:text-[color:var(--fg)] dark:hover:bg-white/10",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="/contact" size="sm" className="hidden sm:inline-flex">
            Book a Discovery Call
          </Button>
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-white/50 backdrop-blur-xl lg:hidden dark:border-white/15 dark:bg-white/5"
          >
            <div className="space-y-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-transform duration-300",
                  open && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-opacity duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-transform duration-300",
                  open && "-translate-y-2 -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mb-2 overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-2 backdrop-blur-2xl lg:hidden dark:border-white/10 dark:bg-[#0e1b30]/70"
          >
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-brand-500/15 text-brand-500 dark:bg-white/10 dark:text-brand-300"
                    : "text-muted hover:bg-black/5 hover:text-[color:var(--fg)] dark:hover:bg-white/10",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="p-2">
              <Button href="/contact" size="sm" className="w-full">
                Book a Discovery Call
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
