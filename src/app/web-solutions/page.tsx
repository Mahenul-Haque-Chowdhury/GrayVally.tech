import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ServicesPageContent } from "@/components/ServicesPageContent";

export const metadata: Metadata = {
  title: "Web Development Services Bangladesh | Website Design & Development",
  description:
    "Professional web development services in Bangladesh. Custom website design, React & Next.js development, e-commerce solutions, UI/UX design, and responsive web applications. Get a free quote!",
  keywords: [
    "web development services Bangladesh",
    "website design Bangladesh",
    "custom website development",
    "React development company",
    "Next.js development",
    "e-commerce website Bangladesh",
    "UI/UX design services",
    "responsive web design",
    "frontend development",
    "web application development"
  ],
  openGraph: {
    title: "Web Development Services Bangladesh | Website Design & Development",
    description:
      "Professional web development services in Bangladesh. Custom website design, React & Next.js development, e-commerce solutions. Get a free quote!",
    url: "https://grayvally.tech/web-solutions",
    siteName: "GrayVally Software Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Services Bangladesh | Website Design & Development",
    description:
      "Professional web development services in Bangladesh. Custom website design, React & Next.js development, e-commerce solutions.",
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

