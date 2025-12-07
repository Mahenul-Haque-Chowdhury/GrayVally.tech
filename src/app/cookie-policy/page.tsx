"use client";

import type { Metadata } from "next";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | GrayVally",
  description:
    "Read GrayVally's cookie policy to learn how we use cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-background pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Cookie{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-text-secondary">
              Last updated: December 1, 2025
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-8 text-text-secondary">
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  1. What Are Cookies?
                </h2>
                <p className="leading-relaxed">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit our website. They help us provide you with a better experience by remembering your preferences, understanding how you use our site, and improving our services. This policy complies with the Information and Communication Technology Act 2006 of Bangladesh.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  2. Types of Cookies We Use
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-surface/50 border border-border">
                    <h3 className="font-semibold text-text-primary mb-2">Essential Cookies</h3>
                    <p className="text-sm">
                      These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure areas access, and remembering your cookie preferences. The website cannot function properly without these cookies.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-surface/50 border border-border">
                    <h3 className="font-semibold text-text-primary mb-2">Analytics Cookies</h3>
                    <p className="text-sm">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website&apos;s structure and content.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-surface/50 border border-border">
                    <h3 className="font-semibold text-text-primary mb-2">Functional Cookies</h3>
                    <p className="text-sm">
                      These cookies enable enhanced functionality and personalization, such as remembering your language preference, theme selection (dark/light mode), and other customizations.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-surface/50 border border-border">
                    <h3 className="font-semibold text-text-primary mb-2">Marketing Cookies</h3>
                    <p className="text-sm">
                      These cookies track your online activity to help advertisers deliver more relevant advertising. They may be set by our advertising partners to build a profile of your interests.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  3. Cookies We Use
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-border rounded-lg">
                    <thead className="bg-surface/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-text-primary border-b border-border">Cookie Name</th>
                        <th className="px-4 py-3 text-left text-text-primary border-b border-border">Purpose</th>
                        <th className="px-4 py-3 text-left text-text-primary border-b border-border">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-3 border-b border-border">theme</td>
                        <td className="px-4 py-3 border-b border-border">Stores your dark/light mode preference</td>
                        <td className="px-4 py-3 border-b border-border">1 year</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-b border-border">cookie_consent</td>
                        <td className="px-4 py-3 border-b border-border">Records your cookie consent preferences</td>
                        <td className="px-4 py-3 border-b border-border">1 year</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-b border-border">_ga</td>
                        <td className="px-4 py-3 border-b border-border">Google Analytics - distinguishes users</td>
                        <td className="px-4 py-3 border-b border-border">2 years</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-b border-border">_gid</td>
                        <td className="px-4 py-3 border-b border-border">Google Analytics - distinguishes users</td>
                        <td className="px-4 py-3 border-b border-border">24 hours</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">session_id</td>
                        <td className="px-4 py-3">Maintains your session state</td>
                        <td className="px-4 py-3">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  4. Third-Party Cookies
                </h2>
                <p className="leading-relaxed mb-4">
                  We may use third-party services that set their own cookies. These include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-text-primary">Google Analytics:</strong> For website traffic analysis</li>
                  <li><strong className="text-text-primary">Google Fonts:</strong> For typography rendering</li>
                  <li><strong className="text-text-primary">Social Media Platforms:</strong> If you use social sharing features</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  These third parties have their own privacy policies governing their use of cookies.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  5. Managing Cookies
                </h2>
                <p className="leading-relaxed mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-text-primary">Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through their settings menu.</li>
                  <li><strong className="text-text-primary">Our Cookie Banner:</strong> When you first visit our site, you can choose which cookie categories to accept.</li>
                  <li><strong className="text-text-primary">Third-Party Opt-Out:</strong> Visit the third-party service websites to opt out of their cookies.</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Please note that disabling certain cookies may affect the functionality of our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  6. Browser-Specific Instructions
                </h2>
                <p className="leading-relaxed mb-4">
                  To manage cookies in your browser:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-text-primary">Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                  <li><strong className="text-text-primary">Firefox:</strong> Options → Privacy & Security → Cookies</li>
                  <li><strong className="text-text-primary">Safari:</strong> Preferences → Privacy → Cookies</li>
                  <li><strong className="text-text-primary">Edge:</strong> Settings → Privacy, Search, and Services → Cookies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  7. Your Consent
                </h2>
                <p className="leading-relaxed">
                  By continuing to use our website, you consent to the use of cookies as described in this policy. You can withdraw your consent at any time by clearing cookies from your browser or adjusting your cookie preferences through our cookie banner.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  8. Updates to This Policy
                </h2>
                <p className="leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  9. Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have questions about our use of cookies:
                </p>
                <div className="mt-4 p-4 rounded-lg bg-surface/50 border border-border">
                  <p><strong className="text-text-primary">GrayVally</strong></p>
                  <p>Email: support@grayvally.tech</p>
                  <p>Phone: +880 1798-651950</p>
                  <p>Address: Gulshan 1, Dhaka, Bangladesh</p>
                </div>
              </section>

              <section className="pt-8 border-t border-border">
                <p className="text-sm">
                  This Cookie Policy is governed by the laws of the People&apos;s Republic of Bangladesh, including the Information and Communication Technology Act 2006 and the Digital Security Act 2018.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
