import dynamic from "next/dynamic";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { ServicesSkeleton } from "@/components/ServicesSkeleton";
import { ProductTicker } from "@/components/ProductTicker";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { TechStack } from "@/components/TechStack";

const ServicesBento = dynamic(() => import("@/components/ServicesBento").then((m) => m.ServicesBento), {
  loading: () => <ServicesSkeleton />,
});

const Portfolio = dynamic(() => import("@/components/Portfolio").then((m) => m.Portfolio), {
  loading: () => null,
});

const About = dynamic(() => import("@/components/About").then((m) => m.About), {
  loading: () => null,
});

const Contact = dynamic(() => import("@/components/Contact").then((m) => m.Contact), {
  loading: () => null,
});

export default function Home() {
  return (
    <main id="main-content" className="bg-background min-h-screen transition-colors duration-300">
      <NavBar />
      <Hero />
      <ProductTicker />
      <FeaturedProducts />
      <TechStack />
      <ServicesBento />
      <Portfolio />
      <About showOnlyPreview />
      <Contact />
      <Footer />
    </main>
  );
}
