import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { AboutPageContent } from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About GrayVally Software Solutions | Web Development Company Bangladesh",
  description:
    "Learn about GrayVally Software Solutions - a leading web development and software company in Bangladesh. Founded by Mahenul Haque Chowdhury. Expert team in React, Next.js, mobile apps, and enterprise solutions.",
  keywords: [
    "about GrayVally",
    "GrayVally Software Solutions",
    "web development company Bangladesh",
    "Mahenul Haque Chowdhury",
    "software company Dhaka",
    "tech startup Bangladesh"
  ],
  openGraph: {
    title: "About GrayVally Software Solutions | Web Development Company Bangladesh",
    description:
      "Learn about GrayVally Software Solutions - a leading web development and software company in Bangladesh. Expert team in React, Next.js, mobile apps, and enterprise solutions.",
    url: "https://grayvally.tech/about",
    siteName: "GrayVally Software Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About GrayVally Software Solutions | Web Development Company Bangladesh",
    description:
      "Learn about GrayVally Software Solutions - a leading web development and software company in Bangladesh.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary transition-colors duration-300">
      <NavBar />
      <main className="pt-24 sm:pt-28 md:pt-32">
        <AboutPageContent />
      </main>
      <Footer />
    </div>
  );
}