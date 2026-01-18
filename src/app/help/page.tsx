import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Help Center | GrayVally",
  description: "Help resources and support for GrayVally clients and products.",
  alternates: {
    canonical: "https://grayvally.tech/help",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24">
        <section className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">Help center</h1>
          <p className="mt-4 text-sm sm:text-base text-text-secondary">
            Need assistance with a project or one of our tools? Reach out and we&apos;ll guide you to the right resource.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/30 px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-surface/50"
            >
              Get support
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
