import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/content";

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4V9Z",
  },
  {
    label: "X",
    href: "#",
    path: "M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1L8.7 21H5.5l7.4-8.5L5 3h6.6l4.5 5.6L17.5 3Zm-1.1 16h1.8L8 4.8H6.1L16.4 19Z",
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    path: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2.2V18h18V7.2l-9 6-9-6Zm1.8-.2 7.2 4.8L19.2 7H4.8Z",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/30 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Technology consulting from strategy through delivery. {site.name}{" "}
              is a technology consulting company. Company registration details to
              be confirmed.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/40 bg-white/50 text-muted backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:text-[color:var(--fg)] dark:border-white/10 dark:bg-white/5"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[color:var(--fg)]">
              Explore
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-[color:var(--fg)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[color:var(--fg)]">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-[color:var(--fg)]"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="transition-colors hover:text-[color:var(--fg)]"
                >
                  Book a Discovery Call
                </a>
              </li>
              <li className="text-xs">
                A senior consultant replies within two working days.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/30 pt-6 text-xs text-muted sm:flex-row sm:items-center dark:border-white/10">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
