import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Pr3sence Terms of Service | GrayVally",
  description: "Pr3sence Discord Bot Terms of Service",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <main className="flex flex-col items-center py-12 px-4">
        <div className="max-w-3xl w-full mx-auto">
          <Link
            href="/apps/discord-bot"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Discord Bot
          </Link>

          <div className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8">📜 Pr3sence – Terms of Service</h1>
            
            <p className="text-text-secondary mb-8">
              <strong>Last Updated: January 2026</strong>
            </p>

            <p className="mb-8">
              By using Pr3sence (&quot;the Application&quot;), you agree to the following Terms of Service. If you do not agree, please discontinue use of the Application.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-8 text-text-secondary">
              By inviting or using Pr3sence on any Discord server, you agree to comply with these Terms as well as Discord&apos;s Terms of Service and Community Guidelines.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Description of Service</h2>
            <p className="mb-8 text-text-secondary">
              Pr3sence is a Discord application designed to provide presence-related and utility features using Discord&apos;s official API.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-3 mb-8 text-text-secondary">
              <li>You agree not to use the Application for any illegal, abusive, or harmful activities.</li>
              <li>You agree not to attempt to exploit, reverse-engineer, or disrupt the Application or its services.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Availability</h2>
            <p className="mb-8 text-text-secondary">
              The Application is provided &quot;as-is&quot; and &quot;as available.&quot; We do not guarantee uninterrupted or error-free service and reserve the right to modify or discontinue the Application at any time.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Limitation of Liability</h2>
            <p className="mb-8 text-text-secondary">
              Pr3sence and its developers are not responsible for any direct or indirect damages resulting from the use or inability to use the Application.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to Terms</h2>
            <p className="mb-8 text-text-secondary">
              These Terms may be updated at any time. Continued use of the Application after changes constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact</h2>
            <p className="mb-8 text-text-secondary">
              For questions or concerns regarding these Terms, please contact: <a href="mailto:contact@grayvally.tech" className="text-blue-400 hover:text-blue-300 transition-colors">contact@grayvally.tech</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
