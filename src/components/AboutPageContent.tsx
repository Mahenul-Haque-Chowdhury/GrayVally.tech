"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { About } from "@/components/About";

export function AboutPageContent() {
  return (
    <>
      {/* Hero / Intro */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-blue-400 transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <div className="mt-2 mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/40 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary">
                About Us
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
              The team behind
              <span className="ml-2 bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
                GrayVally
              </span>
            </h1>
            <p className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed">
              We&apos;re a small, focused team of engineers, designers, and builders who care deeply about durable
              systems, clear communication, and doing the unglamorous infrastructure work that keeps ambitious
              products fast, secure, and reliable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story & Principles */}
      <section className="py-10 sm:py-14 md:py-16 border-t border-border/60 bg-surface/40/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-text-primary">
              Why GrayVally exists
            </h2>
            <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
              GrayVally started as a solo studio, helping a handful of teams untangle slow, fragile products. Today we
              still operate like a tight strike team: small on purpose, opinionated about quality, and obsessed with the
              boring details that make everything else feel fast and effortless.
            </p>
            <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
              We sit in the space between "agency" and "in‑house"—close enough to care about your roadmap, independent
              enough to tell you when the foundations need rethinking.
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/80 shadow-sm shadow-black/5 p-5 sm:p-6">
            <h3 className="text-sm font-medium tracking-wide text-text-secondary uppercase mb-4">
              What we optimise for
            </h3>
            <dl className="space-y-3 text-sm sm:text-[15px]">
              <div className="flex gap-3">
                <dt className="mt-1 h-6 w-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-semibold">
                  01
                </dt>
                <dd>
                  <div className="font-medium text-text-primary">Reliability over flash</div>
                  <p className="text-text-secondary mt-1">
                    Stable deployments, clear rollbacks, and observability before animations. Pretty is good;
                    predictable is non‑negotiable.
                  </p>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="mt-1 h-6 w-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-semibold">
                  02
                </dt>
                <dd>
                  <div className="font-medium text-text-primary">Clarity in collaboration</div>
                  <p className="text-text-secondary mt-1">
                    Fewer status meetings, more written context. We treat every integration and hand‑off like it will be
                    read a year from now.
                  </p>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="mt-1 h-6 w-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-semibold">
                  03
                </dt>
                <dd>
                  <div className="font-medium text-text-primary">Long‑term thinking</div>
                  <p className="text-text-secondary mt-1">
                    We design infrastructure so adding the next feature feels cheaper, not more painful.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-10 sm:py-14 md:py-18 border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="md:flex md:items-start md:justify-between md:gap-10">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-text-primary">
                How we work with teams
              </h2>
              <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                Whether we&apos;re owning a greenfield build or hardening an existing product, the shape of the work is
                similar: understand constraints, design a stable core, then move quickly on top of it.
              </p>
            </div>

            <div className="mt-8 md:mt-0 grid gap-4 sm:gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-border/70 bg-surface/60 p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold">
                    1
                  </span>
                  Discover &amp; align
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-text-secondary">
                  We map out systems, failure modes, and goals so we&apos;re solving the root problem, not just the
                  visible bugs.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface/60 p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold">
                    2
                  </span>
                  Architect the boring bits
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-text-secondary">
                  Environments, CI/CD, monitoring, and data flows get designed first so feature work can ship safely.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface/60 p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold">
                    3
                  </span>
                  Build &amp; iterate
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-text-secondary">
                  We ship in small, observable slices with room for feedback, rather than one huge "big bang" release.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-surface/60 p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold">
                    4
                  </span>
                  Support &amp; handover
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-text-secondary">
                  We leave behind documentation, dashboards, and patterns your team can own, not fragile magic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed About & Team (reuses homepage component) */}
      <About />
    </>
  );
}
