import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PortfolioPageContent } from "@/components/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Web Development Portfolio | Our Work & Case Studies",
  description:
    "Explore GrayVally's web development portfolio. See our best website designs, web applications, e-commerce projects, and mobile apps built for clients in Bangladesh and worldwide.",
  alternates: {
    canonical: "https://grayvally.tech/portfolio",
  },
  robots: {
    index: false,
    follow: true,
  },
  keywords: [
    "web development portfolio",
    "website design examples",
    "web design portfolio Bangladesh",
    "case studies",
    "client projects",
    "GrayVally work"
  ],
  openGraph: {
    title: "Web Development Portfolio | Our Work & Case Studies",
    description:
      "Explore GrayVally's web development portfolio. See our best website designs, web applications, e-commerce projects, and mobile apps.",
    url: "https://grayvally.tech/portfolio",
    siteName: "GrayVally Software Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Portfolio | Our Work & Case Studies",
    description:
      "Explore GrayVally's web development portfolio. See our best website designs, web applications, and client projects.",
  },
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary transition-colors duration-300">
      <NavBar />
      <main className="pt-20 sm:pt-24 md:pt-28">
        <PortfolioPageContent />
      </main>
      <Footer />
    </div>
  );
}
