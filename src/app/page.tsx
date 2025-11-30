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
      <footer className="border-t border-border py-8 text-center transition-colors duration-300">
        <p className="font-mono text-xs text-text-secondary">
          © {new Date().getFullYear()} GrayVally. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
