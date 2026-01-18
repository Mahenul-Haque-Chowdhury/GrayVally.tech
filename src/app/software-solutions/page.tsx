import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { SoftwareSolutionsPageContent } from "@/components/SoftwareSolutionsPageContent";

export const metadata: Metadata = {
  title: "Software Development Services Bangladesh | ERP, CRM, HRMS Solutions",
  description:
    "Custom software development company in Bangladesh. ERP software, CRM systems, HRMS solutions, inventory management, POS systems, and enterprise applications. Affordable pricing, expert team!",
  alternates: {
    canonical: "https://grayvally.tech/software-solutions",
  },
  keywords: [
    "software development company Bangladesh",
    "ERP software Bangladesh",
    "CRM development Dhaka",
    "HRMS software Bangladesh",
    "inventory management system",
    "POS software development",
    "custom software development",
    "enterprise software solutions",
    "business management software",
    "school management system"
  ],
  openGraph: {
    title: "Software Development Services Bangladesh | ERP, CRM, HRMS Solutions",
    description:
      "Custom software development company in Bangladesh. ERP, CRM, HRMS, inventory management, and enterprise applications. Affordable pricing!",
    url: "https://grayvally.tech/software-solutions",
    siteName: "GrayVally Software Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Services Bangladesh | ERP, CRM, HRMS Solutions",
    description:
      "Custom software development company in Bangladesh. ERP, CRM, HRMS, inventory management, and enterprise applications.",
  },
};

export default function SoftwareSolutionsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <main>
        <SoftwareSolutionsPageContent />
      </main>
      <Footer />
    </div>
  );
}
