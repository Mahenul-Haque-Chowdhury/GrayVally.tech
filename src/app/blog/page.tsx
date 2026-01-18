import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";

export const metadata: Metadata = {
  title: "Tech Blog | Web Development Tips & Software Insights",
  description:
    "Read GrayVally's tech blog for web development tutorials, React & Next.js tips, software development best practices, UI/UX design insights, and digital transformation guides.",
  keywords: [
    "web development blog",
    "React tutorials",
    "Next.js tips",
    "software development insights",
    "UI/UX design blog",
    "tech blog Bangladesh",
    "programming tutorials"
  ],
  openGraph: {
    title: "Tech Blog | Web Development Tips & Software Insights",
    description:
      "Read GrayVally's tech blog for web development tutorials, React & Next.js tips, software development best practices, and UI/UX design insights.",
    url: "https://grayvally.tech/blog",
    siteName: "GrayVally Software Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog | Web Development Tips & Software Insights",
    description:
      "Web development tutorials, React & Next.js tips, software development best practices from GrayVally.",
  },
};

const posts = [
  {
    slug: "choose-web-development-company-bangladesh",
    title: "How to choose a web development company in Bangladesh (practical guide)",
    summary:
      "A step-by-step checklist to help you evaluate and select the right web development partner in Bangladesh.",
    readingTime: "10 min read",
  },
  {
    slug: "nextjs-performance-optimization-lessons",
    title: "Next.js performance optimization: lessons from real projects",
    summary:
      "Practical techniques for speeding up Next.js websites, from images and fonts to caching and Core Web Vitals.",
    readingTime: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24">
        <section className="mx-auto max-w-5xl px-4 sm:px-6" style={{ perspective: "1000px" }}>
          <header className="mb-10 sm:mb-14 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/40 px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary mb-4">
              Blog
            </p>
            <FloatHeading as="h1" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
              Insights on web development
              <span className="block text-xl sm:text-2xl md:text-3xl text-text-secondary mt-2">
                and digital infrastructure from GrayVally.
              </span>
            </FloatHeading>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-text-secondary">
              Guides, checklists, and lessons from the projects we shipwritten for founders, product owners, and technical leads.
            </p>
          </header>

          <div className="grid gap-6 sm:gap-8">
            {posts.map((post, index) => (
              <ScrollFloatReveal
                key={post.slug}
                as="article"
                y={REVEAL_CONFIG.translateY}
                duration={MOTION_DURATION.normal}
                delay={index * 0.1}
                className="rounded-2xl border border-border/50 bg-surface/40 p-5 sm:p-6 md:p-7 hover:border-border/80 hover:bg-surface/60 transition-colors"
              >
                <FloatHeading as="h2" className="text-lg sm:text-xl md:text-2xl font-semibold text-text-primary">
                  {post.title}
                </FloatHeading>
                <p className="mt-2 text-xs sm:text-sm text-text-secondary/80">{post.summary}</p>
                <div className="mt-4 flex items-center justify-between text-[11px] sm:text-xs text-text-secondary/70">
                  <span>{post.readingTime}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-medium text-blue-400 hover:text-blue-300"
                  >
                    <span>Read article</span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </ScrollFloatReveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
