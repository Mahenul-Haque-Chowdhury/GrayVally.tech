import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { ServicesSkeleton } from "@/components/ServicesSkeleton";
import { ProductTicker } from "@/components/ProductTicker";

const ServicesBento = dynamic(() => import("@/components/ServicesBento").then((m) => m.ServicesBento), {
  loading: () => <ServicesSkeleton />,
});

const FeaturedProducts = dynamic(() => import("@/components/FeaturedProducts").then((m) => m.FeaturedProducts), {
  loading: () => null,
});

const About = dynamic(() => import("@/components/About").then((m) => m.About), {
  loading: () => null,
});

const Contact = dynamic(() => import("@/components/Contact").then((m) => m.Contact), {
  loading: () => null,
});

export const metadata: Metadata = {
  title: "GrayVally Software Solutions | Web Development & Software Company in Bangladesh",
  description:
    "GrayVally Software Solutions is a leading web development and software company in Bangladesh. We specialize in custom websites, web applications, mobile apps, UI/UX design, ERP, CRM, and cloud-native solutions for startups and enterprises.",
  alternates: {
    canonical: "https://grayvally.tech/",
  },
};

export default function Home() {
  return (
    <main id="main-content" className="bg-background min-h-screen transition-colors duration-300">
      <NavBar />
      <Hero />
      <ProductTicker />
      <ServicesBento />
      <FeaturedProducts />
      <About showOnlyPreview />
      <Contact />
      <Footer />
    </main>
  );
}
