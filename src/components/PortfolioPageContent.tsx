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
  type LucideIcon,
} from "lucide-react";
import { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";

const industries: Array<{ name: string; description: string; icon: LucideIcon }> = [
  {
    name: "Pharma",
    description:
      "Compliance-ready systems that manage sensitive data, approvals, and regulated workflows without friction.",
    icon: Pill,
  },
  {
    name: "Real Estate",
    description:
      "Lead capture, property management, and client portals designed for faster transactions and clearer reporting.",
    icon: Building2,
  },
  {
    name: "Software / ITES",
    description:
      "Scalable platforms, internal tooling, and automation that keep delivery teams fast and aligned.",
    icon: Code2,
  },
  {
    name: "E-Commerce",
    description:
      "Conversion-first storefronts and transaction systems built for scale, stability, and global payments.",
    icon: ShoppingCart,
  },
  {
    name: "Education",
    description:
      "Learning platforms, enrollment workflows, and analytics that support modern institutions and growth.",
    icon: GraduationCap,
  },
  {
    name: "Retail",
    description:
      "Inventory-aware systems, POS integrations, and customer experiences optimized for omnichannel commerce.",
    icon: Store,
  },
  {
    name: "Automotive",
    description:
      "Service booking, dealership operations, and CRM systems that streamline sales and aftercare.",
    icon: Car,
  },
  {
    name: "Startup",
    description:
      "MVP-to-scale product engineering with clear milestones, rapid iteration, and investor-ready execution.",
    icon: Rocket,
  },
  {
    name: "Non-Profit",
    description:
      "Donation platforms, volunteer management, and impact dashboards built for transparency and trust.",
    icon: Heart,
  },
  {
    name: "Travel Agency",
    description:
      "Booking experiences, itinerary management, and customer communications designed for global travelers.",
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
                  We don't just write code.
                  <br />
                  We're in the business of customer satisfaction.
                </p>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="relative py-10 sm:py-12 border-y border-border/30 bg-surface/20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="mb-10">
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
              <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-secondary/70">Industries</p>
                  <FloatHeading as="h2" className="mt-3 text-3xl sm:text-4xl font-bold text-text-primary">
                    Industries we serve
                  </FloatHeading>
                </div>
                <p className="text-sm text-text-secondary/70 max-w-xl">
                  Enterprise-grade delivery across regulated and growth-stage sectors.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

          {/* Trust */}
          <section className="relative py-12 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="rounded-3xl border border-border/40 bg-surface/20 p-8 sm:p-10">
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
                className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-surface/50 via-background to-surface/30 p-8 sm:p-12 text-center"
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

