import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CookiePolicyPageContent } from "@/components/CookiePolicyPageContent";

export const metadata: Metadata = {
  title: "Cookie Policy | GrayVally",
  description:
    "Read GrayVally's cookie policy to learn how we use cookies and similar technologies on our website.",
  alternates: {
    canonical: "https://grayvally.tech/cookie-policy",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <CookiePolicyPageContent />
      <Footer />
    </div>
  );
}
