import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PrivacyPolicyPageContent } from "@/components/PrivacyPolicyPageContent";

export const metadata: Metadata = {
  title: "Privacy Policy | GrayVally",
  description:
    "Read GrayVally's privacy policy to understand how we collect, use, and protect your data when you use our web development and digital services.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <PrivacyPolicyPageContent />
      <Footer />
    </div>
  );
}
