"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function TermsOfServicePageContent() {
  return (
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
            Terms of{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          <p className="text-text-secondary">Last updated: December 1, 2025</p>
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
                1. Agreement to Terms
              </h2>
              <p className="leading-relaxed">
                By accessing or using GrayVally&apos;s services, you agree to be
                bound by these Terms of Service. If you do not agree to these
                terms, please do not use our services. These terms constitute a
                legally binding agreement between you and GrayVally, governed by
                the laws of the People&apos;s Republic of Bangladesh, including the
                Contract Act 1872 and the Information and Communication
                Technology Act 2006.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                2. Services Description
              </h2>
              <p className="leading-relaxed mb-4">
                GrayVally provides the following digital services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Website Development and Design</li>
                <li>Mobile Application Development</li>
                <li>UI/UX Design Services</li>
                <li>E-Commerce Solutions</li>
                <li>Custom Software Development</li>
                <li>SEO and Digital Marketing</li>
                <li>Technical Consultancy</li>
                <li>Maintenance and Support Services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                3. Client Obligations
              </h2>
              <p className="leading-relaxed mb-4">As a client, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information for project requirements</li>
                <li>Respond to communications and provide feedback in a timely manner</li>
                <li>Make payments according to the agreed schedule</li>
                <li>
                  Provide necessary access, credentials, and materials for
                  project completion
                </li>
                <li>Review and approve deliverables within the specified timeframe</li>
                <li>
                  Not use our services for any unlawful purpose under
                  Bangladesh law
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                4. Payment Terms
              </h2>
              <p className="leading-relaxed mb-4">Payment terms are as follows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-primary">Advance Payment:</strong>{" "}
                  50% of the total project cost is required before work begins.
                </li>
                <li>
                  <strong className="text-text-primary">Final Payment:</strong>{" "}
                  Remaining 50% is due upon project completion and before final
                  delivery.
                </li>
                <li>
                  <strong className="text-text-primary">Currency:</strong>{" "}
                  All payments are accepted in Bangladeshi Taka (BDT) or USD.
                </li>
                <li>
                  <strong className="text-text-primary">Payment Methods:</strong>{" "}
                  Bank transfer, bKash, Nagad, or other approved methods.
                </li>
                <li>
                  <strong className="text-text-primary">Late Payment:</strong>{" "}
                  Overdue payments may incur a 2% monthly late fee.
                </li>
              </ul>
              <p className="leading-relaxed mt-4">
                All prices are exclusive of VAT/taxes unless otherwise stated.
                Applicable taxes will be charged as per Bangladesh tax
                regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                5. Project Timeline &amp; Delivery
              </h2>
              <p className="leading-relaxed mb-4">
                Regarding project timelines:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Project timelines are estimates and may vary based on scope
                  and complexity
                </li>
                <li>
                  Delays caused by client feedback delays will extend the
                  timeline accordingly
                </li>
                <li>
                  We will communicate any significant timeline changes promptly
                </li>
                <li>Rush projects may incur additional charges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                6. Intellectual Property Rights
              </h2>
              <p className="leading-relaxed mb-4">
                Regarding ownership and rights:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-primary">Client Materials:</strong>{" "}
                  You retain ownership of all materials you provide.
                </li>
                <li>
                  <strong className="text-text-primary">Deliverables:</strong>{" "}
                  Upon full payment, you receive ownership of custom
                  deliverables created specifically for your project.
                </li>
                <li>
                  <strong className="text-text-primary">
                    Pre-existing Materials:
                  </strong>{" "}
                  GrayVally retains ownership of pre-existing code, templates,
                  and frameworks used.
                </li>
                <li>
                  <strong className="text-text-primary">Portfolio Rights:</strong>{" "}
                  We reserve the right to showcase completed work in our
                  portfolio unless otherwise agreed.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                7. Revisions &amp; Changes
              </h2>
              <p className="leading-relaxed mb-4">Our revision policy includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Each project includes up to 3 rounds of revisions as
                  specified in the project agreement
                </li>
                <li>
                  Additional revisions will be billed at our standard hourly
                  rate
                </li>
                <li>
                  Major scope changes require a change order and may affect
                  timeline and cost
                </li>
                <li>Revision requests must be submitted in writing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                8. Confidentiality
              </h2>
              <p className="leading-relaxed">
                Both parties agree to maintain confidentiality of proprietary
                information shared during the project. This includes business
                strategies, technical specifications, and any information marked
                as confidential. This obligation survives termination of
                services and is enforceable under the Contract Act 1872 of
                Bangladesh.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                9. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by Bangladesh law, GrayVally
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages. Our total liability shall
                not exceed the amount paid by you for the specific service
                giving rise to the claim. We are not responsible for
                third-party services, hosting issues, or circumstances beyond
                our reasonable control.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                10. Termination
              </h2>
              <p className="leading-relaxed mb-4">
                Either party may terminate the agreement:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With 14 days written notice for convenience</li>
                <li>
                  Immediately for material breach that remains uncured after 7
                  days notice
                </li>
                <li>Upon termination, client pays for all work completed to date</li>
                <li>
                  Deposits are non-refundable if termination occurs after
                  project commencement
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                11. Dispute Resolution
              </h2>
              <p className="leading-relaxed">
                Any disputes arising from these terms shall first be attempted
                to be resolved through good-faith negotiation. If unresolved,
                disputes shall be submitted to arbitration in Dhaka,
                Bangladesh, in accordance with the Arbitration Act 2001. The
                decision of the arbitrator shall be final and binding. The laws
                of Bangladesh shall govern these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                12. Force Majeure
              </h2>
              <p className="leading-relaxed">
                Neither party shall be liable for delays or failures in
                performance resulting from circumstances beyond reasonable
                control, including natural disasters, war, terrorism, riots,
                embargoes, acts of government, pandemic, or other force majeure
                events.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                13. Amendments
              </h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. Changes
                will be effective upon posting to our website. Your continued
                use of our services constitutes acceptance of the modified
                terms. We encourage you to review these terms periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                14. Contact Information
              </h2>
              <p className="leading-relaxed">
                For questions regarding these Terms of Service:
              </p>
              <div className="mt-4 p-4 rounded-lg bg-surface/50 border border-border">
                <p>
                  <strong className="text-text-primary">GrayVally</strong>
                </p>
                <p>Email: support@grayvally.tech</p>
                <p>Phone: +880 1798-651950</p>
                <p>Address: Gulshan 1, Dhaka, Bangladesh</p>
              </div>
            </section>

            <section className="pt-8 border-t border-border">
              <p className="text-sm">
                These Terms of Service are governed by and construed in
                accordance with the laws of the People&apos;s Republic of
                Bangladesh, including the Contract Act 1872, the Information
                and Communication Technology Act 2006, and other applicable
                legislation.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
