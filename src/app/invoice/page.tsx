import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { InvoiceMaker } from "@/components/InvoiceMaker";
import { InvoiceGate } from "@/components/InvoiceGate";

export const metadata: Metadata = {
  title: "Invoice Maker | GrayVally (Private)",
  description: "Private invoice maker tool for GrayVally.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function InvoicePage() {
  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      <NavBar />
      <InvoiceGate pin="3348">
        <InvoiceMaker />
      </InvoiceGate>
      <Footer />
    </main>
  );
}
