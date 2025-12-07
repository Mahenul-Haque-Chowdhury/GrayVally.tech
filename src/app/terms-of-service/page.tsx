import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { TermsOfServicePageContent } from "@/components/TermsOfServicePageContent";

export const metadata: Metadata = {
  title: "Terms of Service | GrayVally",
  description:
    "Review GrayVally's terms of service covering the use of our website, web development services, and digital products.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <TermsOfServicePageContent />
      <Footer />
    </div>
  );
}
