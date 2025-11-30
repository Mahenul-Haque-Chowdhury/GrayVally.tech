import { NavBar } from "@/components/NavBar";
import { Contact } from "@/components/ContactPage";

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      <NavBar />
      <Contact />
      <footer className="py-8 text-center transition-colors duration-300">
        <p className="font-mono text-xs text-text-secondary">
          © {new Date().getFullYear()} GrayVally. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
