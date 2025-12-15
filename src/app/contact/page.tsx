import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Contact } from "@/components/ContactPage";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact GrayVally | Start Your Web Project",
  description:
    "Contact GrayVally to discuss web development, UI/UX design, or cloud infrastructure projects. Based in Bangladesh and working with clients globally.",
  openGraph: {
    title: "Contact GrayVally | Start Your Web Project",
    description:
      "Contact GrayVally to discuss web development, UI/UX design, or cloud infrastructure projects. Based in Bangladesh and working with clients globally.",
    url: "https://grayvally.tech/contact",
    siteName: "GrayVally",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact GrayVally | Start Your Web Project",
    description:
      "Contact GrayVally to discuss web development, UI/UX design, or cloud infrastructure projects. Based in Bangladesh and working with clients globally.",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      <NavBar />
      <Contact />
      <Footer />
    </main>
  );
}
