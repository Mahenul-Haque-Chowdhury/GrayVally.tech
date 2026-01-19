import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FloatHeading } from "@/components/ui/ScrollFloat";

export const metadata: Metadata = {
  title: "Free Online Tools & Apps | Business Card Maker & More",
  description:
    "Explore free online tools and apps by GrayVally. Create digital business cards, use our Discord bot, and discover productivity tools designed for modern businesses.",
  alternates: {
    canonical: "https://grayvally.tech/apps",
  },
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
    image: "/business%20card%20maker%20by%20grayvally.png",
    imageAlt: "Business card maker app preview",
  },
  {
    title: "Discord Music Bot",
    description: "High-quality music playback for your Discord server with advanced controls.",
    href: "/apps/discord-bot",
    external: false,
    status: "Live",
    category: "Community",
    image: "/discord%20music%20bot%20presence.png",
    imageAlt: "Discord music bot presence preview",
  },
  {
    title: "GrayVally QR Studio",
    description: "Generate sharp QR codes in seconds with custom styling and download options.",
    href: "https://qrcode.grayvally.tech",
    external: true,
    status: "Live",
    category: "Utilities",
    image: "/qr%20code%20generator%20online%20free.png",
    imageAlt: "QR code generator app preview",
  },
];

function AppRow({
  app,
  index,
}: {
  app: (typeof apps)[number];
  index: number;
}) {
  const isOdd = index % 2 === 0;

  return (
    <section className="rounded-3xl bg-surface/20 shadow-sm backdrop-blur-sm">
      <div className="grid gap-8 md:grid-cols-2 items-center p-6 sm:p-8 lg:p-10">
        <div className={isOdd ? "md:order-2" : "md:order-1"}>
          <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-surface/30 shadow-sm">
            <Image
              src={app.image}
              alt={app.imageAlt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />
            <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-cyan-500/30 ring-1 ring-white/30 backdrop-blur">
              {app.category}
            </div>
          </div>
        </div>

        <div className={isOdd ? "md:order-1" : "md:order-2"}>
          <FloatHeading as="h3" className="text-3xl sm:text-4xl font-semibold text-text-primary">
            {app.title}
          </FloatHeading>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            {app.description}
          </p>
          <div className="mt-6">
            {app.external ? (
              <a
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-background/60"
              >
                Open app <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <Link
                href={app.href}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-background/60"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <main className="bg-background transition-colors duration-300">
        {/* Page Introduction */}
        <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-background to-background pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8 group"
              >
                <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </div>

            <header className="text-center">
              <FloatHeading as="h1" className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                  Apps & Tools
                </span>
              </FloatHeading>
              <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Clean, focused tools that remove busywork, help teams move faster, and present your brand with clarity.
              </p>
            </header>
          </div>
        </section>

        {/* Apps */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
            <div className="space-y-8 sm:space-y-12">
              {apps.map((app, index) => (
                <AppRow key={app.title} app={app} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
