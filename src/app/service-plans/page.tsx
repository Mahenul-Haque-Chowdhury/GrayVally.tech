import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ServicePlansContent } from "@/components/ServicePlansContent";

export const metadata: Metadata = {
  title: "Structured Service Plans | GrayVally Software Solutions",
  description:
    "Explore structured service plans designed for startups and growing businesses. Transparent scopes, clear deliverables, and scalable support.",
  alternates: {
    canonical: "https://grayvally.tech/service-plans",
  },
};

export default function ServicePlansPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary transition-colors duration-300">
      <NavBar />
      <main className="pt-24 sm:pt-28 md:pt-32">
        <ServicePlansContent />
      </main>
      <Footer />
    </div>
  );
}
