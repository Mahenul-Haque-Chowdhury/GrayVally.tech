import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { AboutPageContent } from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About GrayVally | Web Development & Digital Infrastructure Studio",
  description:
    "Learn about GrayVally, the team behind our web development, UI/UX design, and cloud-native infrastructure projects based in Bangladesh.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary transition-colors duration-300">
      <NavBar />
      <main className="pt-24 sm:pt-28 md:pt-32">
        <AboutPageContent />
      </main>
      <Footer />
    </div>
  );
}