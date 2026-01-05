import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { AuditPageContent } from "@/components/AuditPageContent";

export const metadata: Metadata = {
  title: "Complimentary Website Audit | GrayVally",
  description:
    "Request a complimentary website audit. We review performance, UX, security, and scalability and send a clear, actionable improvement roadmap.",
  openGraph: {
    title: "Complimentary Website Audit | GrayVally",
    description:
      "We review your website's performance, UX, security, and scalability, then send you a clear, actionable improvement roadmap.",
    url: "https://grayvally.tech/audit",
    siteName: "GrayVally",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Complimentary Website Audit | GrayVally",
    description:
      "We review your website's performance, UX, security, and scalability, then send you a clear, actionable improvement roadmap.",
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
