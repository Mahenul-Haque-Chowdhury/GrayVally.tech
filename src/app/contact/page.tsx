import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import ContactPageClient from "@/app/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact GrayVally | Get Free Consultation for Web & Software Projects",
  description:
    "Contact GrayVally Software Solutions for web development, mobile apps, and software projects. Based in Dhaka, Bangladesh - serving clients worldwide. Get a free consultation and quote today!",
  keywords: [
    "contact GrayVally",
    "hire web developers Bangladesh",
    "software company contact",
    "web development quote",
    "free consultation",
    "GrayVally Dhaka"
  ],
  openGraph: {
    title: "Contact GrayVally | Get Free Consultation for Web & Software Projects",
    description:
      "Contact GrayVally Software Solutions for web development, mobile apps, and software projects. Get a free consultation today!",
    url: "https://grayvally.tech/contact",
    siteName: "GrayVally Software Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact GrayVally | Get Free Consultation for Web & Software Projects",
    description:
      "Contact GrayVally Software Solutions for web development, mobile apps, and software projects. Get a free consultation!",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      <NavBar />
      <ContactPageClient />
      <Footer />
    </main>
  );
}
