import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ServicesPageContent } from "@/components/ServicesPageContent";

export const metadata: Metadata = {
  title: "Web Development, UI/UX & Cloud Services | GrayVally",
  description:
    "Explore GrayVally's web development, UI/UX design, cloud infrastructure, and performance optimization services for startups and growing businesses.",
  openGraph: {
    title: "Web Development, UI/UX & Cloud Services | GrayVally",
    description:
      "Explore GrayVally's web development, UI/UX design, cloud infrastructure, and performance optimization services for startups and growing businesses.",
    url: "https://grayvally.tech/services",
    siteName: "GrayVally",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Web Development, UI/UX & Cloud Services | GrayVally",
    description:
      "Explore GrayVally's web development, UI/UX design, cloud infrastructure, and performance optimization services for startups and growing businesses.",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <main>
        <ServicesPageContent />
      </main>
      <Footer />
    </div>
  );
}

