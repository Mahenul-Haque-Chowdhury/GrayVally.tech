import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { RefundPolicyPageContent } from "@/components/RefundPolicyPageContent";

export const metadata: Metadata = {
  title: "Refund Policy | GrayVally",
  description:
    "Understand GrayVally's refund policy, including eligibility, timelines, and how we handle cancellations for web development and design projects.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <RefundPolicyPageContent />
      <Footer />
    </div>
  );
}
