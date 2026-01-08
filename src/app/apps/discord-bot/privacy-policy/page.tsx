import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Pr3sence Privacy Policy | GrayVally",
  description: "Pr3sence Discord Bot Privacy Policy",
};

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl font-bold mb-8">🔐 Pr3sence – Privacy Policy</h1>
            
            <p className="text-text-secondary mb-8">
              <strong>Last Updated: January 2026</strong>
            </p>

            <p className="mb-8">
              Your privacy is important to us. This Privacy Policy explains how Pr3sence handles data.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Data We Access</h2>
            <p className="mb-4 text-text-secondary">
              Pr3sence only accesses data made available through the Discord API, such as:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-8 text-text-secondary">
              <li>User IDs</li>
              <li>Server IDs</li>
              <li>Basic interaction-related data</li>
            </ul>
            <p className="mb-8 text-text-secondary">
              This data is accessed only as necessary for the Application to function.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Data Storage</h2>
            <ul className="list-disc list-inside space-y-2 mb-8 text-text-secondary">
              <li>Pr3sence does not sell or share personal data with third parties.</li>
              <li>Any temporary data used for functionality is not retained longer than necessary.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Data Usage</h2>
            <p className="mb-4 text-text-secondary">
              Accessed data is used solely to:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-8 text-text-secondary">
              <li>Provide core bot functionality</li>
              <li>Respond to user commands</li>
              <li>Improve stability and performance</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Third-Party Services</h2>
            <p className="mb-8 text-text-secondary">
              Pr3sence operates entirely within Discord&apos;s ecosystem and complies with Discord&apos;s Developer Policies.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
            <p className="mb-8 text-text-secondary">
              Reasonable measures are taken to protect accessed data from unauthorized access or misuse.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to This Policy</h2>
            <p className="mb-8 text-text-secondary">
              This Privacy Policy may be updated from time to time. Updates will be reflected on this page.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact</h2>
            <p className="mb-8 text-text-secondary">
              If you have any questions about this Privacy Policy, please contact: <a href="mailto:contact@grayvally.tech" className="text-blue-400 hover:text-blue-300 transition-colors">contact@grayvally.tech</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
