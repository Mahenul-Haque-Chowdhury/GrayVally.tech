import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { AuditPageContent } from "@/components/AuditPageContent";

export const metadata: Metadata = {
  title: "Free Website Audit | Performance, SEO & Security Analysis",
  description:
    "Get a free comprehensive website audit from GrayVally. We analyze your site's performance, SEO, security, UX, and scalability, then provide an actionable improvement roadmap.",
  alternates: {
    canonical: "https://grayvally.tech/audit",
  },
  keywords: [
    "free website audit",
    "website performance analysis",
    "SEO audit free",
    "website security check",
    "UX analysis",
    "site speed test",
    "web audit Bangladesh"
  ],
  openGraph: {
    title: "Free Website Audit | Performance, SEO & Security Analysis",
    description:
      "Get a free comprehensive website audit. We analyze performance, SEO, security, and UX, then provide an actionable improvement roadmap.",
    url: "https://grayvally.tech/audit",
    siteName: "GrayVally Software Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Audit | Performance, SEO & Security Analysis",
    description:
      "Get a free comprehensive website audit. We analyze performance, SEO, security, and UX.",
  },
};

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <main>
        <AuditPageContent />
      </main>
      <Footer />
    </div>
  );
}
