import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PortfolioPageContent } from "@/components/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Web Design & Development Portfolio | GrayVally",
  description:
    "Explore GrayVally's portfolio of web design, web development, and UI/UX projects for startups and businesses.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary transition-colors duration-300">
      <NavBar />
      <main className="pt-24 sm:pt-28 md:pt-32">
        <PortfolioPageContent />
      </main>
      <Footer />
    </div>
  );
}
