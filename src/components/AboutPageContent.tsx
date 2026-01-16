"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function AboutPageContent() {
  const stats = [
    { label: "Founded", value: "2024", detail: "Bangladesh-based studio" },
    { label: "Focus", value: "Product Systems", detail: "Engineering + design" },
    { label: "Delivery", value: "End-to-End", detail: "Strategy to launch" },
    { label: "Partners", value: "Founder-led", detail: "Direct collaboration" },
  ];

  const principles = [
    {
      title: "Systems before features",
      description:
        "We build stable cores first: architecture, observability, and workflows that keep teams moving fast.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Clarity in every handoff",
      description:
        "Written context, transparent decisions, and artifacts your team can trust months later.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Quality without the theater",
      description:
        "No buzzword inflation. Just shipping reliable products with disciplined execution.",
      gradient: "from-sky-500 to-blue-500",
    },
  ];

  const milestones = [
    {
      title: "Founded as a focused studio",
      description:
        "Started by Mahenul Haque Chowdhury to help teams ship fast, durable web products.",
      year: "2024",
    },
    {
      title: "Expanded into full-stack delivery",
      description:
        "Added design, frontend, and infrastructure capabilities under one roof.",
      year: "2024",
    },
    {
      title: "Enterprise-ready systems",
      description:
        "Scaled engagements to include compliance, observability, and high-availability builds.",
      year: "2025",
    },
  ];

  const capabilities = [
    {
      title: "Product Strategy",
      description: "Roadmaps, scoping, and release planning that keeps momentum.",
    },
    {
      title: "UI/UX Design",
      description: "Clear interfaces with accessibility and conversion in mind.",
    },
    {
      title: "Front-End Engineering",
      description: "Modern React and Next.js builds with polished interaction.",
    },
    {
      title: "Back-End Systems",
      description: "APIs, data architecture, and secure infrastructure.",
    },
    {
      title: "Performance & Reliability",
      description: "Monitoring, optimization, and stable deployments.",
    },
    {
      title: "Growth Enablement",
      description: "SEO, analytics, and experimentation to scale adoption.",
    },
  ];

  const teamMembers = [
    {
      name: "Mahenul Haque Chowdhury",
      role: "CEO & Lead Engineer",
      bio: "Leads strategy and ships end-to-end web products with a focus on performance, security, and reliability.",
      image: "/CEO.jpeg",
      accent: "from-violet-500 to-purple-500",
      website: "https://arnob.life",
    },
    {
      name: "Mahin Mize",
      role: "Client Manager",
      bio: "Keeps communication clear, requirements aligned, and delivery moving smoothly.",
      image: "/ClientManager.jpeg",
      accent: "from-sky-500 to-cyan-500",
      website: "https://example.com",
    },
    {
      name: "Shafin Al Rahi",
      role: "Head of Marketing",
      bio: "Owns growth, positioning, and the story that connects with the right customers.",
      image: "/HeadofMarketting.jpeg",
      accent: "from-amber-500 to-orange-500",
      website: "https://example.com",
    },
    {
      name: "Riffat Tonmoy",
      role: "Head of Business",
      bio: "Drives partnerships and sustainable growth with a focus on long-term impact.",
      image: "/riffattonmoy.jpg",
      accent: "from-emerald-500 to-teal-500",
      website: "https://riffattonmoy.online/",
    },
    {
      name: "Sumaiya Tanzin",
      role: "Front-End Developer",
      bio: "Builds clean, responsive UI with attention to accessibility and motion.",
      accent: "from-rose-500 to-pink-500",
      website: "https://example.com",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-background to-background pointer-events-none" />
        <div className="absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500/15 via-sky-500/10 to-amber-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-center"
          >
            <div>
              <div className="flex flex-col items-start gap-6 sm:gap-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </Link>

                <div className="w-full flex justify-center sm:justify-start">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/40 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary">
                    About GrayVally
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary font-display">
                Building reliable systems for teams that ship fast.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
                We are a focused team of engineers, designers, and builders crafting modern web products with durable
                foundations. GrayVally brings enterprise-grade execution to fast-moving teams that need clarity and
                momentum.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                >
                  Start a project
                </Link>
                <Link
                  href="#team"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/40 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-surface/60"
                >
                  Meet the team
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-transparent to-amber-500/20 blur-2xl" />
              <div className="relative rounded-3xl border border-border/40 bg-surface/40 backdrop-blur-xl p-6 sm:p-8">
                <h2 className="text-sm uppercase tracking-[0.3em] text-text-secondary">Studio Snapshot</h2>
                <div className="mt-6 space-y-4 text-sm text-text-secondary">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">Mission</div>
                    <p className="mt-2 text-text-primary">
                      Engineer resilient platforms and delightful experiences that scale with ambition.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-border/40 bg-background/40 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">{stat.label}</p>
                        <p className="mt-2 text-lg font-semibold text-text-primary">{stat.value}</p>
                        <p className="mt-1 text-xs text-text-secondary/80">{stat.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 sm:py-20 border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
              Principles that shape every build
            </h2>
            <p className="mt-4 text-text-secondary">
              We optimize for long-term durability, clear communication, and smooth handoffs.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {principles.map((principle) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl border border-border/40 bg-surface/30 p-6 backdrop-blur-sm"
              >
                <div className={cn(
                  "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
                  principle.gradient
                )} />
                <h3 className="text-lg font-semibold text-text-primary">{principle.title}</h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 sm:py-20 border-t border-border/60 bg-surface/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
                What we deliver
              </h2>
              <p className="mt-4 text-text-secondary max-w-2xl">
                A full-stack team that blends strategy, design, and engineering into one continuous delivery pipeline.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/40 px-5 py-2 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-background/70"
            >
              Start the conversation
            </Link>
          </motion.div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl border border-border/40 bg-background/40 p-5 backdrop-blur-sm"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">
                  0{index + 1}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-text-primary">{capability.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 sm:py-20 border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
              Our story, in milestones
            </h2>
            <p className="mt-4 text-text-secondary">
              From a focused studio to a full-service partner for ambitious teams.
            </p>
          </motion.div>

          <div className="mt-10 space-y-6">
            {milestones.map((milestone) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl border border-border/40 bg-surface/30 p-6 backdrop-blur-sm"
              >
                <div className="absolute left-6 top-6 h-full w-px bg-gradient-to-b from-emerald-500/40 via-sky-500/40 to-transparent" />
                <div className="relative pl-8">
                  <div className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">
                    {milestone.year}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-text-primary">{milestone.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-16 sm:py-20 border-t border-border/60 bg-surface/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
              The people behind the work
            </h2>
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
              A compact team that cares about outcomes, communication, and the details that make products feel premium.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-6 backdrop-blur-sm"
              >
                <div className={cn(
                  "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
                  member.accent
                )} />
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "relative h-14 w-14 overflow-hidden rounded-2xl bg-gradient-to-br",
                    member.accent
                  )}>
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-white">
                        {member.name.split(" ").map((item) => item[0]).join("")}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary">{member.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-text-secondary/70">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed">{member.bio}</p>
                <div className="mt-5">
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary transition-colors group-hover:text-text-primary"
                  >
                    View profile
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17l10-10M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 border-t border-border/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-surface/40 via-background to-surface/30 p-8 sm:p-12 text-center"
          >
            <div className="absolute -top-20 right-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-[100px]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
                Ready to build with GrayVally?
              </h2>
              <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
                Tell us about your goals and we will map the fastest path to a durable, high-performing product.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                >
                  Book a discovery call
                </Link>
                <Link
                  href="/software-solutions"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/60 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-background/80"
                >
                  Explore solutions
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
