import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CRMPageContent } from "@/components/CRMPageContent";

export const metadata: Metadata = {
  title: "GrayVally CRM | Custom CRM Solutions for Every Business",
  description:
    "GrayVally CRM is a fully custom-built customer relationship management platform tailored to your business. Manage leads, automate workflows, and grow revenue. Built for freelancers, SMEs, and enterprises.",
  alternates: {
    canonical: "https://grayvally.tech/crm",
  },
  keywords: [
    "custom CRM",
    "CRM software",
    "GrayVally CRM",
    "customer relationship management",
    "CRM for small business",
    "CRM for enterprise",
    "sales pipeline software",
    "lead management system",
    "CRM Bangladesh",
    "bespoke CRM development",
  ],
  openGraph: {
    title: "GrayVally CRM | Custom CRM Solutions for Every Business",
    description:
      "A fully custom-built CRM platform designed around your business. Manage leads, automate workflows, and grow revenue with GrayVally CRM.",
    url: "https://grayvally.tech/crm",
    siteName: "GrayVally Software Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrayVally CRM | Custom CRM Solutions for Every Business",
    description:
      "A fully custom-built CRM platform designed around your business. Manage leads, automate workflows, and grow revenue.",
  },
};

export default function CRMPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary transition-colors duration-300">
      <NavBar />
      <main className="pt-24 sm:pt-28 md:pt-32">
        <CRMPageContent />
      </main>
      <Footer />
    </div>
  );
}
