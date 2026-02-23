"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Check,
  Users,
  BarChart3,
  Zap,
  Shield,
  Bell,
  FileText,
  Settings,
  PieChart,
  MessageSquare,
  Globe,
  Star,
  Rocket,
  Building2,
  Smartphone,
  TabletSmartphone,
  Code2,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/motion/Section";

const DEMO_URL = "https://core.grayvally.tech";

/* ─── Features ─────────────────────────────────────────────────────── */
const features = [
  {
    icon: Users,
    title: "Contact & Lead Management",
    description:
      "Centralise all your contacts, leads, and prospects in one place. Track interactions, notes, and follow-ups effortlessly.",
  },
  {
    icon: BarChart3,
    title: "Sales Pipeline Tracking",
    description:
      "Visualise every deal stage with a drag-and-drop Kanban pipeline. Never let a hot lead go cold again.",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description:
      "Automate repetitive tasks like follow-up emails, reminders, and status updates so your team can focus on closing.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Get real-time alerts for lead activity, task deadlines, and important business events across all devices.",
  },
  {
    icon: PieChart,
    title: "Reports & Analytics",
    description:
      "Understand your sales performance with detailed dashboards, revenue forecasts, and team productivity metrics.",
  },
  {
    icon: MessageSquare,
    title: "Client Communication Hub",
    description:
      "Manage emails, chat, and follow-up history from a single timeline view per contact or deal.",
  },
  {
    icon: FileText,
    title: "Invoice & Quote Generation",
    description:
      "Create and send professional invoices and quotes directly from the CRM, with automatic payment tracking.",
  },
  {
    icon: Shield,
    title: "Role-Based Access Control",
    description:
      "Assign granular permissions to team members. Keep sensitive data visible only to the right people.",
  },
  {
    icon: Settings,
    title: "Fully Customisable",
    description:
      "Every GrayVally CRM is built to match your exact workflows, including custom fields, stages, modules, and integrations.",
  },
];

/* ─── Pricing Packages ──────────────────────────────────────────────── */
const plans = [
  {
    id: "starter",
    icon: Rocket,
    badge: null,
    name: "Starter",
    businessType: "Freelancers & Small Businesses",
    tagline: "Everything you need to get organised and start growing.",
    price: 9,
    period: "/month",
    highlight: false,
    features: [
      "Up to 3 team members",
      "Up to 1,000 contacts",
      "Basic sales pipeline (3 stages)",
      "Email & task reminders",
      "Contact & lead management",
      "Basic reporting dashboard",
      "Invoice & quote generation",
      "Mobile-friendly access",
      "Email support (48 h SLA)",
    ],
  },
  {
    id: "growth",
    icon: Star,
    badge: "Most Popular",
    name: "Growth",
    businessType: "SMEs & Growing Teams",
    tagline: "Scale smarter with automation, deeper analytics, and more power.",
    price: 49,
    period: "/month",
    highlight: true,
    features: [
      "Up to 15 team members",
      "Up to 10,000 contacts",
      "Advanced pipeline (unlimited stages)",
      "Workflow automation (up to 20 rules)",
      "Smart notifications & alerts",
      "Revenue forecasts & team analytics",
      "Role-based access control",
      "Client communication hub",
      "Priority support (24 h SLA)",
      "Custom fields & modules",
      "Integration with popular tools",
    ],
  },
  {
    id: "enterprise",
    icon: Building2,
    badge: "Custom Build",
    name: "Enterprise",
    businessType: "Corporations & Large Businesses",
    tagline: "A fully bespoke CRM engineered around your exact business model.",
    price: null,
    period: "",
    highlight: false,
    features: [
      "Unlimited team members",
      "Unlimited contacts & records",
      "Fully custom pipeline & modules",
      "Unlimited automation workflows",
      "AI-powered insights & forecasting",
      "Multi-branch / multi-location support",
      "Custom integrations & APIs",
      "Advanced security & compliance",
      "Dedicated account manager",
      "On-site onboarding & training",
      "SLA-backed 24/7 support",
    ],
  },
];

/* ── animation ────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/* ─── What makes it custom ─────────────────────────────────── */
const customHighlights = [
  {
    title: "Built for your industry",
    body: "We study your processes, terminology, and team structure, then build a CRM that speaks your language.",
  },
  {
    title: "No bloated features",
    body: "You only get what you actually need. Every module, field, and workflow is intentional and purposeful.",
  },
  {
    title: "Seamlessly integrated",
    body: "We wire your CRM into the tools you already use, including accounting software, e-commerce platforms, messaging apps, and more.",
  },
  {
    title: "Ongoing support",
    body: "As your business evolves so does your CRM. We iterate, refine, and scale with you at every stage.",
  },
];

export function CRMPageContent() {
  return (
    <div className="overflow-x-hidden">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-20 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-sky-400/[0.06] dark:bg-sky-400/[0.08] blur-[140px] -z-10" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-blue-400/[0.04] dark:bg-blue-400/[0.06] blur-[120px] -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-5"
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-text-secondary backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
                  </span>
                  In Development &middot; Demo Live
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.06]">
                GrayVally{" "}
                <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  CRM
                </span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-secondary">
                  Built Around Your Business
                </span>
              </h1>

              <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl">
                A fully custom Customer Relationship Management platform. Not a
                template you squeeze your business into. We design, build, and
                deliver a CRM that works exactly the way you do.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                {[
                  { value: "100%", label: "Custom Built" },
                  { value: "3 Tiers", label: "Business Plans" },
                  { value: "Web + Mobile", label: "All Platforms" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border/60 bg-card/80 px-4 py-2.5 text-center"
                  >
                    <p className="text-sm font-bold text-sky-600 dark:text-sky-400">{s.value}</p>
                    <p className="text-[10px] text-text-secondary mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-500 dark:bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-600 hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  View Live Demo
                  <ExternalLink className="w-3.5 h-3.5 opacity-75" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-6 py-3 text-sm font-semibold text-text-primary hover:border-sky-500/50 hover:bg-card/80 transition-all hover:-translate-y-0.5"
                >
                  Request a Custom CRM
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-xs text-text-secondary/60 max-w-sm">
                Demo hosted at{" "}
                <Link
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 dark:text-sky-400 hover:underline underline-offset-2 transition-colors"
                >
                  core.grayvally.tech
                </Link>
                . Billing and client management will go live through this
                portal once out of development.
              </p>
            </motion.div>

            {/* Right: screenshot */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-3xl bg-sky-400/[0.08] blur-3xl scale-90 -z-10" />
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/40 shadow-2xl shadow-black/20 dark:shadow-black/40">
                <Image
                  src="/grayvally-CRM.png"
                  alt="GrayVally CRM dashboard preview"
                  width={900}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute -bottom-4 left-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/95 px-4 py-2 text-xs font-semibold text-text-primary shadow-xl backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
                </span>
                Live at core.grayvally.tech
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <Section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-text-secondary mb-4">
            What We Build
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
            Not just a CRM, a complete business platform
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every GrayVally product is custom-engineered for your team&apos;s exact
            workflow. We don&apos;t hand you a generic tool. We build the system
            around how you operate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {customHighlights.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-2xl border border-border/50 bg-card/60 p-6 hover:border-sky-500/30 hover:bg-card/80 transition-all"
            >
              <h3 className="font-semibold text-text-primary mb-2 text-sm sm:text-base">
                {item.title}
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* MOBILE APPS */}
      <Section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-text-secondary mb-4">
            Mobile Development
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
            Your CRM in your pocket
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            On demand, we build dedicated mobile applications for your CRM and
            any custom software, available on both Android and iOS. Your team
            stays connected from anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* React Native */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-2xl border border-border/50 bg-card/60 p-7 sm:p-8 overflow-hidden group hover:border-sky-500/30 transition-all"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-sky-400/[0.06] blur-3xl group-hover:bg-sky-400/[0.10] transition-all" />
            <div className="flex items-start gap-4 mb-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">React Native</h3>
                <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold mt-0.5">Android &amp; iOS &middot; On Demand</p>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-5">
              We build high-performance mobile apps using React Native, sharing
              code across iOS and Android to deliver a consistent, native-feeling
              experience on both platforms. Ideal when your web CRM needs a
              dedicated mobile companion app.
            </p>
            <ul className="space-y-2.5">
              {[
                "Single codebase for Android & iOS",
                "Near-native performance & UX",
                "Smooth integration with your existing CRM APIs",
                "Push notifications, offline mode & biometric auth",
                "App Store & Play Store deployment support",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-text-secondary">
                  <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-sky-500" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Flutter */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-2xl border border-border/50 bg-card/60 p-7 sm:p-8 overflow-hidden group hover:border-sky-500/30 transition-all"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-blue-400/[0.06] blur-3xl group-hover:bg-blue-400/[0.10] transition-all" />
            <div className="flex items-start gap-4 mb-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Flutter</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">Android &amp; iOS &middot; On Demand</p>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-5">
              For clients who need deeply custom UI or pixel-perfect designs,
              we build with Flutter. Its rich widget library and fast rendering
              engine make it perfect for complex, visually demanding mobile CRM
              experiences on both platforms.
            </p>
            <ul className="space-y-2.5">
              {[
                "Pixel-perfect custom UI on Android & iOS",
                "High-fidelity animations & transitions",
                "Strong performance on both platforms",
                "Ideal for data-heavy dashboards & charts",
                "App Store & Play Store deployment support",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-text-secondary">
                  <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* platform strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border/50 bg-card/60 px-6 py-5 flex flex-wrap items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Android &amp; iOS</p>
              <p className="text-xs text-text-secondary">Both platforms, one project</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
              <TabletSmartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Phone &amp; Tablet</p>
              <p className="text-xs text-text-secondary">Responsive layouts for any screen</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">React Native or Flutter</p>
              <p className="text-xs text-text-secondary">We recommend based on your needs</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-500/30 px-5 py-2.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all"
          >
            Request Mobile App
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Section>

      {/* FEATURES */}
      <Section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-text-secondary mb-4">
            Features
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
            Everything your team needs
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
            Core capabilities in every GrayVally CRM, with room to extend
            further for your specific requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group flex gap-4 rounded-2xl border border-border/50 bg-card/60 p-5 sm:p-6 hover:border-sky-500/30 hover:bg-card/80 transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500/20 transition-colors flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1 text-sm sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* PRICING */}
      <Section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-text-secondary mb-4">
            Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
            Three plans for three stages of business growth. Every plan is a
            custom build with no cookie-cutter software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-6 sm:p-8 transition-all",
                  plan.highlight
                    ? "border-sky-500/40 bg-sky-500/[0.04] shadow-2xl shadow-sky-500/10 ring-1 ring-sky-500/20"
                    : "border-border/50 bg-card/60 hover:border-sky-500/25 hover:bg-card/80"
                )}
              >
                {plan.badge && (
                  <div
                    className={cn(
                      "absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap",
                      plan.highlight
                        ? "bg-sky-500 text-white"
                        : "bg-card border border-border/60 text-text-secondary"
                    )}
                  >
                    {plan.highlight && <Star className="w-3 h-3 fill-current" />}
                    {plan.badge}
                  </div>
                )}

                <div className="mb-5">
                  <div className={cn(
                    "inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4",
                    plan.highlight
                      ? "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                      : "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary">{plan.name}</h3>
                  <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold mt-0.5 mb-2">{plan.businessType}</p>
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">{plan.tagline}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-border/40">
                  {plan.price !== null ? (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-text-primary">${plan.price}</span>
                      <span className="text-text-secondary text-sm mb-1.5">{plan.period}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-3xl sm:text-4xl font-extrabold text-text-primary">Custom</span>
                      <p className="text-text-secondary text-xs mt-1">Tailored quote after discovery call</p>
                    </div>
                  )}
                </div>

                <ul className="flex-1 space-y-2.5 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Check className={cn(
                        "w-4 h-4 mt-0.5 shrink-0",
                        plan.highlight ? "text-sky-500" : "text-sky-500/60"
                      )} />
                      <span className="text-text-secondary">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all",
                    plan.highlight
                      ? "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/25"
                      : "border border-border/60 bg-card/80 text-text-primary hover:border-sky-500/40 hover:bg-card"
                  )}
                >
                  {plan.id === "enterprise" ? "Get a Custom Quote" : "Get Started"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs text-text-secondary/55 mt-8 max-w-xl mx-auto">
          All plans billed monthly. Setup fees may apply for Enterprise builds.
          Prices are starting points and final pricing depends on scope and
          customisation requirements.
        </p>
      </Section>

      {/* DEMO CTA */}
      <Section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-sky-500/20 bg-card/60 p-8 sm:p-14 overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-sky-400/[0.06] blur-[90px]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/80 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-text-secondary mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
                </span>
                Live Demo
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                See GrayVally CRM in action
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                Our live demo at{" "}
                <span className="text-text-primary font-semibold">core.grayvally.tech</span>{" "}
                showcases the core platform. Client onboarding, billing, and
                full management will be handled through this portal once live.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
              <Link
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:bg-sky-600 hover:-translate-y-0.5 transition-all"
              >
                <Globe className="w-4 h-4" />
                Open Demo
                <ExternalLink className="w-3.5 h-3.5 opacity-75" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-card/80 px-7 py-3.5 text-sm font-semibold text-text-primary hover:border-sky-500/40 hover:bg-card transition-all hover:-translate-y-0.5"
              >
                Request Custom CRM
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </Section>

    </div>
  );
}

