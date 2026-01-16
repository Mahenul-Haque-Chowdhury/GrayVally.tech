import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Free Online Tools & Apps | Business Card Maker & More",
  description:
    "Explore free online tools and apps by GrayVally. Create digital business cards, use our Discord bot, and discover productivity tools designed for modern businesses.",
  keywords: [
    "free online tools",
    "digital business card maker",
    "Discord music bot",
    "free apps",
    "productivity tools",
    "GrayVally apps"
  ],
  openGraph: {
    title: "Free Online Tools & Apps | Business Card Maker & More",
    description:
      "Explore free online tools and apps by GrayVally. Create digital business cards, use our Discord bot, and discover productivity tools.",
    url: "https://grayvally.tech/apps",
    siteName: "GrayVally Software Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools & Apps | Business Card Maker & More",
    description:
      "Explore free online tools and apps by GrayVally. Create digital business cards and discover productivity tools.",
  },
};

const apps = [
  {
    title: "Business Card Maker",
    description: "Create professional digital business cards in minutes. Customizable, shareable, and free.",
    href: "https://businesscardmaker.grayvally.tech/",
    external: true,
    status: "Live",
    category: "Identity",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Discord Music Bot",
    description: "High-quality music playback for your Discord server with advanced controls.",
    href: "/apps/discord-bot",
    external: false,
    status: "Coming Soon",
    category: "Community",
    gradient: "from-blue-500 to-cyan-500",
  },
];

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <main className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-background to-background pointer-events-none" />
          <div className="absolute -top-16 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-blue-500/15 blur-[120px] pointer-events-none" />
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/40 px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary">
                  GrayVally Labs
                </div>
                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary font-display">
                  Tools that solve real operational friction.
                </h1>
                <p className="mt-5 text-base sm:text-lg text-text-secondary/90 leading-relaxed max-w-2xl">
                  We build focused apps that remove busywork, unlock speed, and help teams look more professional
                  everywhere they show up.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                  >
                    Build a custom tool
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#apps"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/40 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-surface/60"
                  >
                    Explore apps
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20 blur-2xl" />
                <div className="relative rounded-3xl border border-border/40 bg-surface/40 backdrop-blur-xl p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">Product ethos</p>
                      <p className="text-sm font-semibold text-text-primary">Fast, clean, and self-serve</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 text-sm text-text-secondary">
                    {[
                      "Minimal onboarding with instant value.",
                      "Designed to look premium in client-facing moments.",
                      "Optimized for speed on any device.",
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-border/40 bg-background/40 px-4 py-3">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mt-16 sm:mt-20">
          <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Built for business presence",
                description: "Tools that help founders show up with clarity and credibility.",
                gradient: "from-emerald-500 to-teal-500",
              },
              {
                title: "Instantly usable",
                description: "No heavy onboarding. Get to value in minutes.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Always evolving",
                description: "We ship updates fast based on real usage.",
                gradient: "from-amber-500 to-orange-500",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-border/40 bg-surface/20 p-6 backdrop-blur-sm"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />
                <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Apps Grid */}
        <section id="apps" className="mt-16 sm:mt-20">
          <div className="mx-auto max-w-7xl flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-text-primary font-display">Apps & tools</h2>
                <p className="mt-3 text-text-secondary max-w-2xl">
                  A growing set of tools crafted for founders, teams, and communities.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/40 px-5 py-2 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-surface/60"
              >
                Request a tool
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {apps.map((app) => (
                <div
                  key={app.title}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-surface/20 backdrop-blur-sm p-8 transition-all duration-300 hover:border-border/80 hover:bg-surface/40"
                >
                  <div className={cn(
                    "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
                    app.gradient
                  )} />
                  <div className="flex justify-between items-start mb-5">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                      app.status === "Live"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    )}>
                      {app.status}
                    </span>
                    {app.external && <ExternalLink className="h-4 w-4 text-text-secondary/50" />}
                  </div>

                  <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">{app.category}</p>
                  <h3 className="mt-3 text-xl font-bold text-text-primary group-hover:text-white transition-colors">
                    {app.title}
                  </h3>
                  <p className="mt-3 text-text-secondary/80 mb-6">
                    {app.description}
                  </p>

                  <div className="mt-auto">
                    {app.external ? (
                      <a
                        href={app.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-background/60"
                      >
                        Open app <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={app.href}
                        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-background/60"
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
