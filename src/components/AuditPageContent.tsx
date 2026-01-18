"use client";
import {
  ShieldCheck,
  Gauge,
  Search,
  Layers,
  MousePointerClick,
  CheckCircle2,
  FileText,
  ListChecks,
  MessageSquare,
} from "lucide-react";
import { AuditRequestForm } from "@/components/AuditRequestForm";
import { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";

const auditAreas = [
  {
    title: "Performance & Core Web Vitals",
    description: "Load times, rendering stability, and real-world responsiveness.",
    icon: Gauge,
  },
  {
    title: "UI/UX & Conversion Flow",
    description: "Clarity, friction points, and the path to action.",
    icon: MousePointerClick,
  },
  {
    title: "Code Quality & SEO Basics",
    description: "Maintainability signals and essential on-page foundations.",
    icon: Search,
  },
  {
    title: "Security & Best Practices",
    description: "Common risks, hardening opportunities, and safe defaults.",
    icon: ShieldCheck,
  },
  {
    title: "Scalability & Tech Stack Review",
    description: "Architecture fit, growth constraints, and pragmatic next steps.",
    icon: Layers,
  },
];

const deliverables = [
  {
    label: "Written audit summary (email or PDF)",
    icon: FileText,
  },
  {
    label: "Prioritized improvement list",
    icon: ListChecks,
  },
  {
    label: "Honest feasibility feedback (even if we don’t work together)",
    icon: MessageSquare,
  },
];

export function AuditPageContent() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 pb-8 sm:pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-background to-background pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <FloatHeading
            as="h1"
            duration={MOTION_DURATION.display}
            className="my-0 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent"
            once
          >
            Complimentary Website Audit
          </FloatHeading>

          <ScrollFloatReveal
            as="p"
            y={REVEAL_CONFIG.translateY}
            duration={MOTION_DURATION.card}
            delay={0.1}
            className="mt-5 text-sm sm:text-base md:text-lg text-text-secondary/90 leading-relaxed max-w-2xl mx-auto"
          >
            We review your website&apos;s performance, UX, security, and scalability, then send you a clear, actionable
            improvement roadmap.
          </ScrollFloatReveal>

          <ScrollFloatReveal
            as="p"
            y={REVEAL_CONFIG.translateY}
            duration={MOTION_DURATION.card}
            delay={0.2}
            className="mt-4 text-xs sm:text-sm text-text-secondary/80"
          >
            Free Service • No obligation • Limited weekly audits
          </ScrollFloatReveal>
        </div>
      </section>

      {/* What We Audit */}
      <section className="pt-8 pb-12 sm:pt-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollFloatReveal
            y={REVEAL_CONFIG.translateY}
            duration={MOTION_DURATION.medium}
            className="grid gap-8 lg:grid-cols-2 lg:items-start"
          >
            <div>
              <FloatHeading as="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                What we audit
              </FloatHeading>
              <p className="mt-4 text-sm sm:text-base text-text-secondary/90 leading-relaxed max-w-xl">
                A fast, focused review designed to highlight high-impact improvements without the noise.
              </p>
            </div>

            <div className="rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm p-6 sm:p-8">
              <ul className="space-y-3">
                {auditAreas.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-400 flex-shrink-0" aria-hidden />
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-surface/40 border border-border/30 flex-shrink-0">
                      <item.icon className="h-5 w-5 text-blue-400" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-text-primary">{item.title}</p>
                      <p className="mt-1 text-sm text-text-secondary/85 leading-relaxed">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollFloatReveal>
        </div>
      </section>

      {/* What You Receive */}
      <section className="py-12 sm:py-16 bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollFloatReveal
            y={REVEAL_CONFIG.translateY}
            duration={MOTION_DURATION.medium}
            className="grid gap-8 lg:grid-cols-2 lg:items-start"
          >
            <div>
              <FloatHeading as="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                What you receive
              </FloatHeading>
              <p className="mt-4 text-sm sm:text-base text-text-secondary/90 leading-relaxed max-w-xl">
                You&apos;ll get a concise, decision-ready view of what to fix first and what&apos;s not worth your time.
              </p>
            </div>

            <div className="rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm p-6 sm:p-8">
              <ul className="space-y-3">
                {deliverables.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-400 flex-shrink-0" aria-hidden />
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-surface/40 border border-border/30 flex-shrink-0">
                      <item.icon className="h-5 w-5 text-blue-400" aria-hidden />
                    </span>
                    <span className="text-sm sm:text-base text-text-secondary/90">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollFloatReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollFloatReveal
            y={REVEAL_CONFIG.translateY}
            duration={MOTION_DURATION.medium}
            className="grid gap-8 lg:grid-cols-2 lg:items-start"
          >
            <div>
              <FloatHeading as="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                Audit FAQ
              </FloatHeading>
              <p className="mt-4 text-sm sm:text-base text-text-secondary/90 leading-relaxed max-w-xl">
                Quick answers to the most common questions before you request an audit.
              </p>
            </div>

            <dl className="rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm p-6 sm:p-8 space-y-5">
              <div>
                <dt className="text-sm sm:text-base font-semibold text-text-primary">How long does the audit take?</dt>
                <dd className="mt-2 text-sm text-text-secondary/85 leading-relaxed">
                  Most audits are completed within 3–5 business days after we receive your website details.
                </dd>
              </div>
              <div>
                <dt className="text-sm sm:text-base font-semibold text-text-primary">Do you need access to our codebase?</dt>
                <dd className="mt-2 text-sm text-text-secondary/85 leading-relaxed">
                  Not usually. We can audit from the live site and public signals. If deeper access is needed, we’ll ask.
                </dd>
              </div>
              <div>
                <dt className="text-sm sm:text-base font-semibold text-text-primary">Is this only for websites you built?</dt>
                <dd className="mt-2 text-sm text-text-secondary/85 leading-relaxed">
                  No. We audit sites built by any team or agency. The goal is clear, unbiased improvement steps.
                </dd>
              </div>
              <div>
                <dt className="text-sm sm:text-base font-semibold text-text-primary">Will you also fix the issues?</dt>
                <dd className="mt-2 text-sm text-text-secondary/85 leading-relaxed">
                  We can. The audit is separate and no-obligation, but we’re available if you want us to implement changes.
                </dd>
              </div>
              <div>
                <dt className="text-sm sm:text-base font-semibold text-text-primary">What types of sites are a good fit?</dt>
                <dd className="mt-2 text-sm text-text-secondary/85 leading-relaxed">
                  Business websites, SaaS products, landing pages, and web apps that need better performance or clarity.
                </dd>
              </div>
              <div>
                <dt className="text-sm sm:text-base font-semibold text-text-primary">Is the audit really free?</dt>
                <dd className="mt-2 text-sm text-text-secondary/85 leading-relaxed">
                  Yes. It’s complimentary and designed to be useful whether or not we work together afterward.
                </dd>
              </div>
            </dl>
          </ScrollFloatReveal>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollFloatReveal
            y={REVEAL_CONFIG.translateY}
            duration={MOTION_DURATION.medium}
            className="grid gap-8 lg:grid-cols-2 lg:items-start"
          >
            <div>
              <FloatHeading as="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                Request an audit
              </FloatHeading>
              <p className="mt-4 text-sm sm:text-base text-text-secondary/90 leading-relaxed max-w-xl">
                Share your website and what you’re aiming to improve. We’ll reply with next steps and a timeline.
              </p>

              <div className="mt-8 rounded-2xl border border-border/40 bg-surface/10 backdrop-blur-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-surface/40 border border-border/30">
                    <CheckCircle2 className="h-5 w-5 text-blue-400" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">What happens next</p>
                    <p className="mt-2 text-sm text-text-secondary/85 leading-relaxed">
                      We’ll confirm your request, review the site, and send a clear, actionable roadmap.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <AuditRequestForm />
          </ScrollFloatReveal>
        </div>
      </section>
    </div>
  );
}
