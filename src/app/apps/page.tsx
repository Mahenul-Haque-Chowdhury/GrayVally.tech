import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

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
  },
  {
    title: "Discord Music Bot",
    description: "High-quality music playback for your Discord server with advanced controls.",
    href: "/apps/discord-bot",
    external: false,
    status: "Coming Soon",
  },
];

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <main className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Our <span className="text-blue-400">Apps</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Tools and applications designed to solve real problems and enhance your digital experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <div
                key={app.title}
                className="group relative rounded-2xl border border-border/40 bg-surface/20 backdrop-blur-sm p-8 transition-all duration-300 hover:border-blue-500/30 hover:bg-surface/40"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    app.status === "Live" 
                      ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}>
                    {app.status}
                  </span>
                  {app.external && <ExternalLink className="h-4 w-4 text-text-secondary/50" />}
                </div>
                
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-blue-400 transition-colors">
                  {app.title}
                </h3>
                <p className="text-text-secondary/80 mb-6">
                  {app.description}
                </p>

                {app.external ? (
                  <a
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-blue-400 transition-colors"
                  >
                    Open App <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    href={app.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-blue-400 transition-colors"
                  >
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
