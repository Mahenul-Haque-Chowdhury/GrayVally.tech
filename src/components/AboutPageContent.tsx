"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";

export function AboutPageContent() {

  const stats = [
    { label: "Founded", value: "2024", detail: "Bangladesh-based studio" },
    { label: "Focus", value: "Product Systems", detail: "Engineering + design" },
    { label: "Delivery", value: "End-to-End", detail: "Strategy to launch" },
    { label: "Partners", value: "Founder-led", detail: "Direct collaboration" },
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

  const faqItems = [
    {
      question: "What kind of projects does GrayVally usually work on?",
      answer:
        "We focus on web platforms, business websites, and custom software solutions. Most projects involve building or improving systems that companies rely on in daily operations.",
    },
    {
      question: "Do you work with small businesses or only large companies?",
      answer:
        "We work with both. Company size matters less than mindset. Clients who value quality, clarity, and long-term thinking tend to benefit most from working with us.",
    },
    {
      question: "How is GrayVally different from other digital agencies?",
      answer:
        "We do not rely on templates or one-size-fits-all solutions. Every project is approached with technical analysis, careful planning, and honest communication.",
    },
    {
      question: "Will my project be scalable for the future?",
      answer:
        "Yes. Scalability and maintainability are central to how we build. Our systems are designed to grow alongside your business without becoming unstable or difficult to manage.",
    },
    {
      question: "Do you provide support after the project is completed?",
      answer:
        "Yes. We continue to support clients after delivery with improvements, maintenance, and guidance to ensure long-term performance.",
    },
    {
      question: "How do we start working together?",
      answer:
        "It starts with a conversation. We take time to understand your goals and challenges. If we can add value, we move forward with a clear and transparent plan.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-4 pb-10 sm:pt-6 sm:pb-12 md:pt-8 md:pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-background to-background pointer-events-none" />
        <div className="absolute -top-16 sm:-top-24 left-1/2 h-56 sm:h-64 w-[320px] sm:w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500/15 via-sky-500/10 to-amber-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollFloatReveal
            y={REVEAL_CONFIG.translateY}
            duration={MOTION_DURATION.medium}
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

              <FloatHeading
                as="h1"
                duration={MOTION_DURATION.display}
                className="my-0 mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary font-display"
                once
              >
                GrayVally builds digital systems that scale with your business.
              </FloatHeading>
              <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
                I’m Mahenul Haque Chowdhury, the founder of GrayVally. We didn’t start as a digital agency on paper.
                We started by building, breaking, fixing, and learning what actually works for real businesses.
              </p>
              <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
                Today, tools are everywhere. The difference is in execution. We are a small, focused team that treats
                every project like our own product, prioritizing performance, scalability, and long-term value from day one.
              </p>
              <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
                GrayVally exists for businesses that want more than “just another solution.” We work with clients who value
                clarity, honesty, and thoughtful delivery so their websites, platforms, and custom systems are reliable and effective.
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
              <div className="relative rounded-3xl bg-surface/40 backdrop-blur-xl p-6 sm:p-8">
                <FloatHeading as="h2" className="text-sm uppercase tracking-[0.3em] text-text-secondary">
                  Studio Snapshot
                </FloatHeading>
                <div className="mt-6 space-y-4 text-sm text-text-secondary">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">Mission</div>
                    <p className="mt-2 text-text-primary">
                      Engineer resilient platforms and delightful experiences that scale with ambition.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {stats.map((stat, index) => (
                      <ScrollFloatReveal
                        key={stat.label}
                        y={REVEAL_CONFIG.translateY}
                        duration={MOTION_DURATION.normal}
                        delay={index * 0.08}
                        className="rounded-2xl bg-background/40 p-4"
                      >
                        <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">{stat.label}</p>
                        <p className="mt-2 text-lg font-semibold text-text-primary">{stat.value}</p>
                        <p className="mt-1 text-xs text-text-secondary/80">{stat.detail}</p>
                      </ScrollFloatReveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollFloatReveal>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollFloatReveal y={REVEAL_CONFIG.translateY} duration={MOTION_DURATION.medium} className="max-w-3xl">
            <FloatHeading as="h2" className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
              What problem it solves
            </FloatHeading>
            <div className="mt-4 space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed">
              <p>
                Many businesses struggle because their digital systems are slow, disconnected, or built without long-term
                thinking. Poorly structured websites, fragile applications, and generic solutions often create friction
                instead of progress.
              </p>
              <p>
                GrayVally closes that gap. We turn unclear requirements into reliable, scalable digital solutions. Instead
                of quick fixes, we build systems that support real growth through performance, clean architecture, and
                thoughtful user experience.
              </p>
              <p>
                In simple terms, we solve the problem of digital work that looks acceptable on the surface but fails where
                it matters most.
              </p>
            </div>
          </ScrollFloatReveal>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollFloatReveal y={REVEAL_CONFIG.translateY} duration={MOTION_DURATION.medium} className="max-w-3xl">
            <FloatHeading as="h2" className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
              How we work with clients
            </FloatHeading>
            <div className="mt-4 space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed">
              <p>
                GrayVally is a compact, senior-led studio. That means you work directly with the people who plan the
                architecture, design the experience, and ship the product. We keep the team small so decision-making is
                fast, priorities are clear, and the quality bar stays high. There are no long chains of approvals and no
                hand-offs between sales and delivery. From the first call to the final release, you have a single team that
                understands the context and the outcomes you care about.
              </p>
              <p>
                We start with a short discovery phase to clarify goals, constraints, and success metrics. If you already
                have a scope, we validate it. If the scope is still forming, we help you define it. Either way, we focus on
                removing ambiguity before writing code. That alignment prevents wasted effort and keeps timelines realistic.
                It also ensures that the final build is not only attractive but structurally sound and maintainable.
              </p>
              <p>
                During delivery, we work in milestones with visible progress. You can expect clear updates, staging links,
                and feedback checkpoints so there are no surprises at launch. Performance, accessibility, and SEO are built
                into the workflow rather than treated as add-ons. Our team ships with modern tooling, disciplined reviews,
                and production-ready testing, because a fast release is only useful if the system stays reliable.
              </p>
              <p>
                After launch, we help teams stay stable and improve continuously. That might mean adding features, refining
                analytics, or hardening infrastructure as traffic grows. Our goal is to be the technical partner that makes
                your digital stack easier to operate, not harder. If you want a clear, accountable team with a long-term
                mindset, we are built for that kind of collaboration.
              </p>
            </div>
          </ScrollFloatReveal>
        </div>
      </section>

      {/* Who it’s for */}
      <section className="py-16 sm:py-20 bg-surface/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollFloatReveal y={REVEAL_CONFIG.translateY} duration={MOTION_DURATION.medium} className="max-w-3xl">
            <FloatHeading as="h2" className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
              Who it’s for
            </FloatHeading>
            <div className="mt-4 space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed">
              <p>
                GrayVally is built for people who take their business seriously and expect their digital presence to work
                as hard as they do.
              </p>
              <p>
                We work with owners tired of rebuilding the same site, startups that need strong foundations, and growing
                companies that require scalable, maintainable software. We do best with founders who value clear
                communication and honest technical guidance.
              </p>
              <p>
                If someone is only looking for the cheapest or fastest option, we may not be the right fit. For those who
                want things done properly, with care and responsibility, GrayVally is a strong partner.
              </p>
            </div>
          </ScrollFloatReveal>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollFloatReveal y={REVEAL_CONFIG.translateY} duration={MOTION_DURATION.medium} className="max-w-3xl">
            <FloatHeading as="h2" className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
              Frequently Asked Questions
            </FloatHeading>
          </ScrollFloatReveal>

          <div className="mt-8 grid gap-4">
            {faqItems.map((item, index) => (
              <ScrollFloatReveal
                key={item.question}
                y={REVEAL_CONFIG.translateY}
                duration={MOTION_DURATION.normal}
                delay={index * 0.04}
                className="rounded-2xl border border-border/40 bg-background/40 backdrop-blur-sm"
              >
                <details className="group p-5">
                  <summary className="cursor-pointer list-none text-base sm:text-lg font-semibold text-text-primary flex items-center justify-between gap-4">
                    <span>{item.question}</span>
                    <span className="text-text-secondary transition-transform duration-200 group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              </ScrollFloatReveal>
            ))}
          </div>
        </div>
      </section>


      {/* Team */}
      <section
        id="team"
        className="py-16 sm:py-20 bg-surface/20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollFloatReveal
            y={REVEAL_CONFIG.translateY}
            duration={MOTION_DURATION.medium}
            className="text-center"
          >
            <FloatHeading as="h2" className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
              The people behind the work
            </FloatHeading>
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
              A compact team that cares about outcomes, communication, and the details that make products feel premium.
            </p>
          </ScrollFloatReveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <ScrollFloatReveal
                key={member.name}
                y={REVEAL_CONFIG.translateY}
                duration={MOTION_DURATION.normal}
                delay={index * 0.08}
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
                    <FloatHeading as="h3" className="text-base font-semibold text-text-primary">
                      {member.name}
                    </FloatHeading>
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
              </ScrollFloatReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ScrollFloatReveal
        as="section"
        y={REVEAL_CONFIG.translateY}
        duration={MOTION_DURATION.medium}
        className="py-16 sm:py-20"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div
            className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-surface/40 via-background to-surface/30 p-8 sm:p-12 text-center"
          >
            <div className="absolute -top-20 right-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-[100px]" />
            <div className="relative">
              <FloatHeading as="h2" className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
                Ready to build with GrayVally?
              </FloatHeading>
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
          </div>
        </div>
      </ScrollFloatReveal>
    </>
  );
}
