import { NavBar } from "@/components/NavBar";
import { Contact } from "@/components/ContactPage";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen transition-colors duration-300">
      <NavBar />
      <Contact />
      <Footer />
    </main>
  );
}
