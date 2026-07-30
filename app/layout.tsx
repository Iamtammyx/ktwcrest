import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Scene } from "@/components/three/Scene";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { site } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display serif for headings / wordmark — gives the "Crest" its premium tone.
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.intro,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.intro,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <ThemeProvider>
          {/* Interactive WebGL background (fixed, behind everything). */}
          <Scene />
          {/* Fine film grain for a premium, non-flat finish. */}
          <div className="grain pointer-events-none fixed inset-0 -z-10 opacity-[0.035] mix-blend-overlay dark:opacity-[0.05]" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          {/* Floating WhatsApp chat launcher (hands off to business WhatsApp). */}
          <WhatsAppWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
