"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Car,
  Code2,
  GraduationCap,
  Heart,
  Pill,
  Plane,
  Rocket,
  ShoppingCart,
  Store,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";
import { projects } from "@/data/portfolio";

const industries: Array<{ name: string; description: string; icon: LucideIcon }> = [
  {
    name: "Pharma",
    description:
      "Compliance-ready platforms for regulated data, approvals, and audits.",
    icon: Pill,
  },
  {
    name: "Real Estate",
    description:
      "Lead capture, listings, and portals that speed up transactions.",
    icon: Building2,
  },
  {
    name: "Software / ITES",
    description:
      "Scalable platforms and automation for fast delivery teams.",
    icon: Code2,
  },
  {
    name: "E-Commerce",
    description:
      "Conversion-first storefronts with stable payments at scale.",
    icon: ShoppingCart,
  },
  {
    name: "Education",
    description:
      "Learning platforms, enrollment flows, and performance analytics.",
    icon: GraduationCap,
  },
  {
    name: "Retail",
    description:
      "Inventory, POS integrations, and omnichannel customer journeys.",
    icon: Store,
  },
  {
    name: "Automotive",
    description:
      "Service booking, dealership ops, and aftercare workflows.",
    icon: Car,
  },
  {
    name: "Startup",
    description:
      "MVP to scale with clear milestones and rapid iteration.",
    icon: Rocket,
  },
  {
    name: "Non-Profit",
    description:
      "Donations, volunteer management, and impact reporting.",
    icon: Heart,
  },
  {
    name: "Travel Agency",
    description:
      "Bookings, itineraries, and traveler communications.",
    icon: Plane,
  },
];

const processSteps = [
  {
    title: "Understanding Your Needs",
    description:
      "We start by listening. We take time to understand your goals, challenges, and requirements so we can align the solution with what actually matters to your business.",
  },
  {
    title: "Planning the Right Solution",
    description:
      "Based on our discussions, we design a clear and scalable plan. This includes defining the architecture, timeline, and approach that best fits your objectives and future growth.",
  },
  {
    title: "Designing & Building",
    description:
      "Our team designs and develops the solution with a focus on performance, usability, and reliability. You’ll see progress early and stay informed throughout the build.",
  },
  {
    title: "Testing & Launching",
    description:
      "Before launch, we rigorously test everything to ensure quality and stability. Once ready, we deploy the solution smoothly and make sure everything works as expected.",
  },
  {
    title: "Ongoing Support & Improvement",
    description:
      "After launch, we stay with you. We provide support, monitor performance, and continuously optimize to ensure long-term success.",
  },
];

export function PortfolioPageContent() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const caseStudies = projects;
  const caseStudyStacks = [
    {
      label: "Next.js",
      icon: (
        <span className="relative h-6 w-6">
          <img
            src="/nextjs-black.svg"
            alt="Next.js"
            className="h-6 w-6 block dark:hidden absolute inset-0"
          />
          <img
            src="/nextjs-white.svg"
            alt="Next.js"
            className="h-6 w-6 hidden dark:block absolute inset-0"
          />
        </span>
      ),
    },
    {
      label: "React",
      icon: <i className="devicon-react-original colored text-2xl" aria-hidden />,
    },
    {
      label: "Tailwind CSS",
      icon: <i className="devicon-tailwindcss-plain colored text-2xl" aria-hidden />,
    },
    {
      label: "Framer Motion",
      icon: (
        <img
          src="https://cdn.worldvectorlogo.com/logos/framer-motion.svg"
          alt="Framer Motion"
          className="h-6 w-6 dark:invert"
        />
      ),
    },
    {
      label: "Supabase",
      icon: (
        <img
          src="https://supabase.com/dashboard/img/supabase-logo.svg"
          alt="Supabase"
          className="h-6 w-6"
        />
      ),
    },
    {
      label: "Secured HTTPS",
      icon: <Lock className="h-6 w-6 text-emerald-400" aria-hidden="true" />,
    },
  ];

  return (
    <>
          <section className="relative overflow-hidden pt-10 sm:pt-14 pb-10 sm:pb-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-col items-center text-center gap-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>

                <ScrollFloatReveal
                  as="h1"
                  y={REVEAL_CONFIG.translateY}
                  duration={MOTION_DURATION.medium}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold"
                >
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                    Industry Expertise & Delivery
                  </span>
                </ScrollFloatReveal>

                <p className="max-w-3xl text-sm sm:text-base md:text-lg text-text-secondary/90 leading-relaxed">
                  We don&apos;t just write code.
                  <br />
                  We&apos;re in the business of customer satisfaction.
                </p>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="relative py-10 sm:py-12 bg-surface/20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="mb-10 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-text-secondary/70">How We Work</p>
                <FloatHeading as="h2" className="mt-3 text-3xl sm:text-4xl font-bold text-text-primary">
                  A predictable delivery process
                </FloatHeading>
              </div>
              <div className="grid gap-6 lg:grid-cols-12 max-w-7xl">
                <div className="lg:col-span-5">
                  <ol className="space-y-2">
                    {processSteps.map((step, index) => {
                      const isActive = index === activeStepIndex;
                      return (
                        <li key={step.title}>
                          <button
                            type="button"
                            onClick={() => setActiveStepIndex(index)}
                            aria-current={isActive ? "step" : undefined}
                            className={
                              "w-full text-left rounded-xl p-[1px] transition-colors " +
                              (isActive
                                ? "bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-[length:220%_220%] bg-[position:0%_50%]"
                                : "bg-border/40 hover:bg-border/60")
                            }
                          >
                            <div
                              className={
                                "rounded-[11px] px-4 py-3 transition-colors " +
                                (isActive
                                  ? "bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-teal-300/10"
                                  : "bg-background/30 hover:bg-background/40")
                              }
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  aria-hidden="true"
                                  className={
                                    "inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold " +
                                    (isActive
                                      ? "bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 bg-[length:220%_220%] bg-[position:0%_50%] text-white shadow-sm"
                                      : "border border-border/40 bg-background/40 text-text-secondary")
                                  }
                                >
                                  {index + 1}
                                </span>
                                <span className="text-sm sm:text-base font-semibold text-text-primary">
                                  Step {index + 1} — {step.title}
                                </span>
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className="lg:col-span-7">
                  <motion.div
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-border/40 bg-background/40 p-5 sm:p-6 min-h-[140px] sm:min-h-[170px] overflow-hidden"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeStepIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-xs uppercase tracking-[0.25em] text-text-secondary/70">
                          Step {activeStepIndex + 1}
                        </p>
                        <FloatHeading as="h3" className="mt-3 text-lg sm:text-xl font-semibold text-text-primary">
                          {processSteps[activeStepIndex]?.title}
                        </FloatHeading>
                        <p className="mt-3 text-sm leading-relaxed text-text-secondary/85">
                          {processSteps[activeStepIndex]?.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Industries */}
          <section className="relative py-12 sm:py-16" style={{ perspective: "1000px" }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="mb-10 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-text-secondary/70">Industries</p>
                <FloatHeading as="h2" className="mt-3 text-3xl sm:text-4xl font-bold text-text-primary">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                    Industries we serve
                  </span>
                </FloatHeading>
                <p className="mt-4 text-sm text-text-secondary/70 max-w-xl mx-auto">
                  Enterprise-grade delivery across regulated and growth-stage sectors.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {industries.map((industry, index) => (
                  <ScrollFloatReveal
                    as="article"
                    key={industry.name}
                    y={REVEAL_CONFIG.translateY}
                    duration={MOTION_DURATION.normal}
                    delay={index * 0.08}
                    className="group rounded-3xl bg-surface/20 p-6 sm:p-7 backdrop-blur-sm shadow-sm shadow-black/5 dark:shadow-black/20 transition-all duration-300 hover:bg-surface/40 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary/60">Expertise</span>
                    </div>
                    <div className="mt-6 h-14 w-14 rounded-2xl border border-border/40 bg-background/40 flex items-center justify-center text-text-primary">
                      <industry.icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <FloatHeading as="h3" className="mt-5 text-2xl font-semibold text-text-primary">{industry.name}</FloatHeading>
                    <p className="mt-3 text-sm text-text-secondary/80 leading-relaxed">
                      {industry.description}
                    </p>
                  </ScrollFloatReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Case Studies */}
          <section className="relative py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="mb-10 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-text-secondary/70">Case Studies</p>
                <FloatHeading as="h2" className="mt-3 text-3xl sm:text-4xl font-bold text-text-primary">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                    Proof-led client outcomes
                  </span>
                </FloatHeading>
                <p className="mt-4 text-sm text-text-secondary/70 max-w-xl mx-auto">
                  Explore detailed case studies to see the impact we deliver for clients.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {caseStudies.map((project, index) => (
                  <ScrollFloatReveal
                    key={project.slug}
                    y={REVEAL_CONFIG.translateY}
                    duration={MOTION_DURATION.normal}
                    delay={index * 0.08}
                    className="rounded-3xl bg-surface/20 p-6 sm:p-7 backdrop-blur-sm shadow-sm shadow-black/5 dark:shadow-black/20 transition-all duration-300 hover:bg-surface/40 hover:shadow-md"
                  >
                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-[0.3em] text-text-secondary/70">Case Study</p>
                      <FloatHeading as="h3" className="mt-3 text-2xl font-semibold text-text-primary">
                        {project.client}
                      </FloatHeading>
                      <p className="mt-3 text-sm text-text-secondary/85 leading-relaxed">
                        {project.description || project.problem}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary/60">
                        Stacks →
                      </span>
                      {caseStudyStacks.map((stack) => (
                        <span
                          key={stack.label}
                          className="inline-flex items-center justify-center rounded-md bg-surface/30 p-2"
                          aria-label={stack.label}
                          title={stack.label}
                        >
                          {stack.icon}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-border/50 bg-background/40 px-3 py-1 text-xs font-semibold text-text-secondary">
                        {project.industry}
                      </span>
                      <span className="rounded-full border border-border/50 bg-background/40 px-3 py-1 text-xs font-semibold text-text-secondary">
                        {project.timeline}
                      </span>
                      <span className="rounded-full border border-border/50 bg-background/40 px-3 py-1 text-xs font-semibold text-text-secondary">
                        {project.role}
                      </span>
                    </div>

                    <div className="mt-6 rounded-2xl bg-background/40 p-4">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-text-secondary/70">Business Outcome</p>
                      <p className="mt-2 text-sm font-semibold text-text-primary">{project.businessOutcome}</p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2 text-xs sm:text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                      >
                        View Case Study
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/30 px-5 py-2 text-xs sm:text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-surface/50"
                        >
                          Visit Website
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </ScrollFloatReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Trust */}
          <section className="relative py-12 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="rounded-3xl bg-surface/20 p-8 sm:p-10">
                <p className="text-sm text-text-secondary/80">
                  Many of our engagements are confidential due to client NDAs.
                </p>
                <p className="mt-4 text-sm text-text-secondary/80">
                  We prioritize security, scalability, and long-term partnerships, supporting international teams across
                  diverse industries with enterprise-ready delivery standards.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="relative py-16 sm:py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
              <ScrollFloatReveal
                y={REVEAL_CONFIG.translateY}
                duration={MOTION_DURATION.medium}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface/50 via-background to-surface/30 p-8 sm:p-12 text-center"
              >
                <div className="absolute -top-20 left-8 h-40 w-40 rounded-full bg-blue-500/20 blur-[90px]" />
                <div className="absolute -bottom-20 right-8 h-40 w-40 rounded-full bg-emerald-500/20 blur-[90px]" />

                <div className="relative">
                  <FloatHeading as="h2" className="text-3xl sm:text-4xl font-bold text-text-primary">
                    Start a conversation with a scalable delivery partner
                  </FloatHeading>
                  <p className="mt-4 text-text-secondary/90 max-w-2xl mx-auto">
                    We align cross-functional teams, protect confidentiality, and deliver systems designed for long-term
                    growth.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                    >
                      Discuss Your Requirements
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <span className="text-sm text-text-secondary/70">
                      NDA-ready. Enterprise-grade. Global delivery.
                    </span>
                  </div>
                </div>
              </ScrollFloatReveal>
            </div>
          </section>
    </>
  );
}

