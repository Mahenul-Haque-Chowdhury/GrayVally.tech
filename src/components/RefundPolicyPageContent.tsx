"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";

export function RefundPolicyPageContent() {
  return (
    <main className="bg-background pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Back Link */}
        <ScrollFloatReveal
          y={REVEAL_CONFIG.translateY}
          duration={MOTION_DURATION.normal}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </ScrollFloatReveal>

        {/* Header */}
        <ScrollFloatReveal
          y={REVEAL_CONFIG.translateY}
          duration={MOTION_DURATION.medium}
          className="mb-12"
        >
          <FloatHeading
            as="h1"
            duration={MOTION_DURATION.display}
            className="my-0 mb-4 text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"
            once
          >
            Refund Policy
          </FloatHeading>
          <p className="text-text-secondary">Last updated: December 1, 2025</p>
        </ScrollFloatReveal>

        {/* Content */}
        <ScrollFloatReveal
          y={REVEAL_CONFIG.translateY}
          duration={MOTION_DURATION.medium}
          delay={0.1}
          className="prose prose-lg max-w-none"
        >
          <div className="space-y-8 text-text-secondary">
            <section>
              <FloatHeading as="h2" className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                1. Overview
              </FloatHeading>
              <p className="leading-relaxed">
                At GrayVally, we strive to deliver high-quality digital services
                that meet your expectations. This Refund Policy outlines the
                circumstances under which refunds may be issued. This policy is
                governed by the Consumer Rights Protection Act 2009 and the
                Contract Act 1872 of Bangladesh.
              </p>
            </section>

            <section>
              <FloatHeading as="h2" className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                2. Deposit &amp; Advance Payment
              </FloatHeading>
              <div className="p-4 rounded-lg bg-surface/50 border border-border mb-4">
                <p className="text-text-primary font-semibold mb-2">
                  Important Notice:
                </p>
                <p>
                  All deposits and advance payments (typically 50% of project
                  cost) are generally <strong>non-refundable</strong> once work
                  has commenced. This covers initial project setup, planning,
                  and resource allocation.
                </p>
              </div>
              <p className="leading-relaxed">
                The advance payment secures your project slot and initiates the
                development process. Once our team begins working on your
                project, significant resources are committed to your work.
              </p>
            </section>

            <section>
              <FloatHeading as="h2" className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                3. Refund Eligibility
              </FloatHeading>
              <p className="leading-relaxed mb-4">
                Refunds may be considered in the following circumstances:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <FloatHeading as="h3" className="font-semibold text-green-400 mb-2">
                    ✓ Full Refund Eligible
                  </FloatHeading>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>
                      Cancellation before project work begins (within 48 hours
                      of payment)
                    </li>
                    <li>GrayVally is unable to deliver the agreed services</li>
                    <li>Duplicate payment made in error</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <FloatHeading as="h3" className="font-semibold text-yellow-400 mb-2">
                    ⚡ Partial Refund Eligible
                  </FloatHeading>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>
                      Project cancelled during initial planning phase (up to
                      50% refund)
                    </li>
                    <li>
                      Significant scope reduction agreed by both parties
                    </li>
                    <li>
                      Service downgrade requested before milestone completion
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <FloatHeading as="h3" className="font-semibold text-red-400 mb-2">
                    ✗ Non-Refundable
                  </FloatHeading>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Work already completed and delivered</li>
                    <li>Cancellation after design/development phase has begun</li>
                    <li>Client&apos;s change of mind or business circumstances</li>
                    <li>
                      Delays caused by client&apos;s failure to provide
                      materials/feedback
                    </li>
                    <li>
                      Third-party costs already incurred (domains, hosting,
                      licenses)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <FloatHeading as="h2" className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                4. Service-Specific Refund Terms
              </FloatHeading>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-surface/50 border border-border">
                  <FloatHeading as="h3" className="font-semibold text-text-primary mb-2">
                    Website Development
                  </FloatHeading>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Before wireframe approval: Up to 70% refund</li>
                    <li>After wireframe, before development: Up to 50% refund</li>
                    <li>During development: Pro-rata based on work completed</li>
                    <li>After delivery: No refund</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-surface/50 border border-border">
                  <FloatHeading as="h3" className="font-semibold text-text-primary mb-2">
                    UI/UX Design
                  </FloatHeading>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Before concept presentation: Up to 60% refund</li>
                    <li>After concept approval: Up to 30% refund</li>
                    <li>After final delivery: No refund</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-surface/50 border border-border">
                  <FloatHeading as="h3" className="font-semibold text-text-primary mb-2">
                    Maintenance &amp; Support Plans
                  </FloatHeading>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>
                      Monthly plans: Cancellation with 7 days notice, no refund
                      for current month
                    </li>
                    <li>
                      Annual plans: Pro-rata refund for unused months (minus
                      20% admin fee)
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-surface/50 border border-border">
                  <FloatHeading as="h3" className="font-semibold text-text-primary mb-2">
                    SEO &amp; Digital Marketing
                  </FloatHeading>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Setup fees are non-refundable</li>
                    <li>Monthly retainers: No refund for current month</li>
                    <li>Campaign costs already spent: Non-refundable</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <FloatHeading as="h2" className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                5. Refund Request Process
              </FloatHeading>
              <p className="leading-relaxed mb-4">To request a refund:</p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong className="text-text-primary">Submit Request:</strong>
                  {" "}
                  Send an email to refunds@grayvally.tech with your project
                  details and reason for refund request.
                </li>
                <li>
                  <strong className="text-text-primary">Review Period:</strong>
                  {" "}
                  We will review your request within 5-7 business days.
                </li>
                <li>
                  <strong className="text-text-primary">Assessment:</strong>{" "}
                  Our team will assess the work completed and determine refund
                  eligibility.
                </li>
                <li>
                  <strong className="text-text-primary">Decision:</strong>{" "}
                  You will receive our decision via email with detailed
                  explanation.
                </li>
                <li>
                  <strong className="text-text-primary">Processing:</strong>{" "}
                  Approved refunds are processed within 10-15 business days.
                </li>
              </ol>
            </section>

            <section>
              <FloatHeading as="h2" className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                6. Refund Methods
              </FloatHeading>
              <p className="leading-relaxed mb-4">
                Refunds will be issued using the original payment method:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-primary">Bank Transfer:</strong>{" "}
                  Refunded to the same bank account (5-10 business days)
                </li>
                <li>
                  <strong className="text-text-primary">bKash/Nagad:</strong>{" "}
                  Refunded to the same mobile wallet (3-5 business days)
                </li>
                <li>
                  <strong className="text-text-primary">
                    International Payments:
                  </strong>{" "}
                  Refunded via PayPal or wire transfer (10-15 business days)
                </li>
              </ul>
              <p className="leading-relaxed mt-4 text-sm">
                Note: Bank charges or transaction fees may be deducted from the
                refund amount as applicable.
              </p>
            </section>

            <section>
              <FloatHeading as="h2" className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                7. Project Cancellation
              </FloatHeading>
              <p className="leading-relaxed mb-4">
                If you need to cancel your project:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Notify us in writing as soon as possible</li>
                <li>
                  We will calculate work completed and provide a final invoice
                </li>
                <li>
                  Any refund will be based on the difference between payment
                  made and work completed
                </li>
                <li>
                  All completed work and deliverables remain with GrayVally
                  unless fully paid for
                </li>
              </ul>
            </section>

            <section>
              <FloatHeading as="h2" className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                8. Quality Guarantee
              </FloatHeading>
              <p className="leading-relaxed">
                We stand behind the quality of our work. If deliverables do not
                meet the specifications agreed upon in the project scope, we
                will make reasonable efforts to correct any issues at no
                additional cost. This guarantee applies for 30 days after final
                project delivery.
              </p>
            </section>

            <section>
              <FloatHeading as="h2" className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                9. Disputes
              </FloatHeading>
              <p className="leading-relaxed">
                If you disagree with our refund decision, you may escalate the
                matter by contacting our management team. We are committed to
                resolving disputes amicably. If a resolution cannot be reached,
                disputes shall be settled through arbitration in Dhaka,
                Bangladesh, in accordance with the Arbitration Act 2001.
              </p>
            </section>

            <section>
              <FloatHeading as="h2" className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                10. Contact Us
              </FloatHeading>
              <p className="leading-relaxed">
                For refund requests or questions about this policy:
              </p>
              <div className="mt-4 p-4 rounded-lg bg-surface/50 border border-border">
                <p>
                  <strong className="text-text-primary">
                    GrayVally - Refunds Department
                  </strong>
                </p>
                <p>Email: support@grayvally.tech</p>
                <p>Phone: +880 1798-651950</p>
                <p>Address: Gulshan 1, Dhaka, Bangladesh</p>
                <p className="mt-2 text-sm">
                  Business Hours: Sunday - Thursday, 10:00 AM - 6:00 PM (BST)
                </p>
              </div>
            </section>

            <section className="pt-8 border-t border-border">
              <p className="text-sm">
                This Refund Policy is governed by the laws of the People&apos;s
                Republic of Bangladesh, including the Consumer Rights Protection
                Act 2009 and the Contract Act 1872. GrayVally reserves the
                right to modify this policy at any time.
              </p>
            </section>
          </div>
        </ScrollFloatReveal>
      </div>
    </main>
  );
}

