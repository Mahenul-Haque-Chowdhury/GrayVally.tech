import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      <NavBar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <footer className="py-6 sm:py-8 text-center transition-colors duration-300 px-4">
        <p className="font-mono text-[10px] sm:text-xs text-text-secondary">
          © {new Date().getFullYear()} GrayVally. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
