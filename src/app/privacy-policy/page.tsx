"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicyPage() {
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
              Privacy{" "}
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
                  1. Introduction
                </h2>
                <p className="leading-relaxed">
                  GrayVally (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. This policy is compliant with the Digital Security Act 2018 of Bangladesh and the Information and Communication Technology Act 2006.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  2. Information We Collect
                </h2>
                <p className="leading-relaxed mb-4">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-text-primary">Personal Information:</strong> Name, email address, phone number, billing address, and other contact details you provide.</li>
                  <li><strong className="text-text-primary">Business Information:</strong> Company name, business registration details, and project requirements.</li>
                  <li><strong className="text-text-primary">Technical Data:</strong> IP address, browser type, device information, and usage data collected through cookies.</li>
                  <li><strong className="text-text-primary">Communication Data:</strong> Records of correspondence, support tickets, and feedback.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="leading-relaxed mb-4">We use collected information for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing and maintaining our services</li>
                  <li>Processing transactions and sending related information</li>
                  <li>Responding to inquiries and providing customer support</li>
                  <li>Sending promotional communications (with your consent)</li>
                  <li>Improving our website and services</li>
                  <li>Complying with legal obligations under Bangladesh law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  4. Data Protection & Security
                </h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and access controls. In accordance with the Digital Security Act 2018, we take all reasonable steps to ensure the security of your data.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  5. Data Sharing & Disclosure
                </h2>
                <p className="leading-relaxed mb-4">We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-text-primary">Service Providers:</strong> Third-party vendors who assist in our operations (payment processors, hosting providers).</li>
                  <li><strong className="text-text-primary">Legal Requirements:</strong> When required by Bangladesh law, court order, or government authorities.</li>
                  <li><strong className="text-text-primary">Business Transfers:</strong> In connection with any merger, acquisition, or sale of company assets.</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  6. Your Rights
                </h2>
                <p className="leading-relaxed mb-4">Under applicable Bangladesh law, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data we hold</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Lodge a complaint with relevant authorities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  7. Data Retention
                </h2>
                <p className="leading-relaxed">
                  We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by Bangladesh law. Project-related data may be retained for up to 5 years for legal and accounting purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  8. International Data Transfers
                </h2>
                <p className="leading-relaxed">
                  Your information may be transferred to and processed in countries outside Bangladesh where our servers or service providers are located. We ensure appropriate safeguards are in place to protect your data in accordance with this policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  9. Children&apos;s Privacy
                </h2>
                <p className="leading-relaxed">
                  Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a minor, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  10. Changes to This Policy
                </h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. Continued use of our services after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                  11. Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="mt-4 p-4 rounded-lg bg-surface/50 border border-border">
                  <p><strong className="text-text-primary">GrayVally</strong></p>
                  <p>Email: privacy@grayvally.tech</p>
                  <p>Phone: +880 1XXX-XXXXXX</p>
                  <p>Address: Dhaka, Bangladesh</p>
                </div>
              </section>

              <section className="pt-8 border-t border-border">
                <p className="text-sm">
                  This Privacy Policy is governed by the laws of the People&apos;s Republic of Bangladesh, including the Digital Security Act 2018 and the Information and Communication Technology Act 2006.
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
