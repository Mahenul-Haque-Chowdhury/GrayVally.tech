import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { SoftwareSolutionsPageContent } from "@/components/SoftwareSolutionsPageContent";

export const metadata: Metadata = {
  title: "Software Solutions | GrayVally",
  description:
    "Explore GrayVally's comprehensive software solutions, including ERP, CRM, HRMS, and industry-specific management systems.",
  openGraph: {
    title: "Software Solutions | GrayVally",
    description:
      "Explore GrayVally's comprehensive software solutions, including ERP, CRM, HRMS, and industry-specific management systems.",
    url: "https://grayvally.tech/software-solutions",
    siteName: "GrayVally",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Software Solutions | GrayVally",
    description:
      "Explore GrayVally's comprehensive software solutions, including ERP, CRM, HRMS, and industry-specific management systems.",
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
