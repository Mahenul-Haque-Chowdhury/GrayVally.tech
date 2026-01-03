import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Discord Music Bot | GrayVally Apps",
  description: "High-quality music playback for your Discord server. Coming soon from GrayVally.",
};

export default function DiscordBotPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-400 mb-6">
            Coming Soon
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Discord <span className="text-blue-400">Music Bot</span>
          </h1>
          <p className="text-lg text-text-secondary mb-10 max-w-lg mx-auto">
            We are building the ultimate high-quality music experience for your Discord server. Stay tuned for updates.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
