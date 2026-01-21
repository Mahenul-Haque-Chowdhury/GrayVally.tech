"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { socialProfiles } from "@/data/socials";
import { FORMSPREE_ENDPOINT } from "@/lib/formspree";
import { FreeMap } from "@/components/FreeMap";
import { motion } from "framer-motion";
import { FloatHeading } from "@/components/ui/ScrollFloat";

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const dialingCodes = [
  "+1",
  "+7",
  "+20",
  "+27",
  "+30",
  "+31",
  "+32",
  "+33",
  "+34",
  "+36",
  "+39",
  "+40",
  "+41",
  "+43",
  "+44",
  "+45",
  "+46",
  "+47",
  "+48",
  "+49",
  "+51",
  "+52",
  "+53",
  "+54",
  "+55",
  "+56",
  "+57",
  "+58",
  "+60",
  "+61",
  "+62",
  "+63",
  "+64",
  "+65",
  "+66",
  "+81",
  "+82",
  "+84",
  "+86",
  "+90",
  "+91",
  "+92",
  "+93",
  "+94",
  "+95",
  "+98",
  "+211",
  "+212",
  "+213",
  "+216",
  "+218",
  "+220",
  "+221",
  "+222",
  "+223",
  "+224",
  "+225",
  "+226",
  "+227",
  "+228",
  "+229",
  "+230",
  "+231",
  "+232",
  "+233",
  "+234",
  "+235",
  "+236",
  "+237",
  "+238",
  "+239",
  "+240",
  "+241",
  "+242",
  "+243",
  "+244",
  "+245",
  "+246",
  "+248",
  "+249",
  "+250",
  "+251",
  "+252",
  "+253",
  "+254",
  "+255",
  "+256",
  "+257",
  "+258",
  "+260",
  "+261",
  "+262",
  "+263",
  "+264",
  "+265",
  "+266",
  "+267",
  "+268",
  "+269",
  "+290",
  "+291",
  "+297",
  "+298",
  "+299",
  "+350",
  "+351",
  "+352",
  "+353",
  "+354",
  "+355",
  "+356",
  "+357",
  "+358",
  "+359",
  "+370",
  "+371",
  "+372",
  "+373",
  "+374",
  "+375",
  "+376",
  "+377",
  "+378",
  "+380",
  "+381",
  "+382",
  "+385",
  "+386",
  "+387",
  "+389",
  "+420",
  "+421",
  "+423",
  "+500",
  "+501",
  "+502",
  "+503",
  "+504",
  "+505",
  "+506",
  "+507",
  "+508",
  "+509",
  "+590",
  "+591",
  "+592",
  "+593",
  "+594",
  "+595",
  "+596",
  "+597",
  "+598",
  "+599",
  "+670",
  "+672",
  "+673",
  "+674",
  "+675",
  "+676",
  "+677",
  "+678",
  "+679",
  "+680",
  "+681",
  "+682",
  "+683",
  "+685",
  "+686",
  "+687",
  "+688",
  "+689",
  "+690",
  "+691",
  "+692",
  "+850",
  "+852",
  "+853",
  "+855",
  "+856",
  "+870",
  "+871",
  "+872",
  "+873",
  "+874",
  "+880",
  "+886",
  "+960",
  "+961",
  "+962",
  "+963",
  "+964",
  "+965",
  "+966",
  "+967",
  "+968",
  "+970",
  "+971",
  "+972",
  "+973",
  "+974",
  "+975",
  "+976",
  "+977",
  "+992",
  "+993",
  "+994",
  "+995",
  "+996",
  "+998",
];

const projectInterestOptions = [
  "Website Development",
  "E-Commerce Solutions",
  "Database & Server Management",
  "Bug Fixing & Maintenance",
  "Mobile App Development",
  "Custom Software & Automation",
  "SEO & Digital Marketing",
  "Tech Consultancy",
  "Enterprise Core & Operations Platform",
  "People, Identity & Access",
  "Revenue, Sales & Customer Platforms",
  "Finance & Monetization Systems",
  "Data, Analytics & Intelligence",
  "Industry & SaaS Platforms",
  "other",
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [showNextSteps, setShowNextSteps] = useState(false);
  const directSocialLinks = [
    { label: socialProfiles.linkedin.label, href: socialProfiles.linkedin.url, icon: Linkedin },
    { label: socialProfiles.facebook.label, href: socialProfiles.facebook.url, icon: Facebook },
    { label: socialProfiles.instagram.label, href: socialProfiles.instagram.url, icon: Instagram },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        setShowNextSteps(true);
        form.reset();
      } else {
        try {
          const data = await response.json();
          console.error("Formspree error response:", data);
        } catch (err) {
          console.error("Formspree error (non-JSON response)");
        }
        setStatus("error");
      }
    } catch (error) {
      console.error("Network error submitting form:", error);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      id="contact"
      aria-labelledby="contact-title"
      className="bg-background pt-24 sm:pt-28 pb-16 sm:pb-24"
    >
      {showNextSteps && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-3xl border border-border/40 bg-background p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary/70">
                    What happens next
                  </p>
                  <p className="mt-2 text-sm text-text-primary">
                    Thanks for reaching out. Your inquiry has been received and we&apos;ll respond shortly.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNextSteps(false)}
                className="inline-flex items-center justify-center rounded-full border border-border/60 px-3 py-1 text-xs font-semibold text-text-secondary hover:border-border/80 hover:text-text-primary transition-colors"
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {[
                {
                  title: "We reply quickly",
                  description: "Usually within 24 hours with next steps.",
                },
                {
                  title: "We clarify scope",
                  description: "A short call or chat to confirm requirements, timeline, and constraints.",
                },
                {
                  title: "You get a plan",
                  description: "A clear proposal with milestones, estimate, and delivery approach.",
                },
              ].map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-3 rounded-2xl border border-border/40 bg-background/60 px-4 py-3"
                >
                  <div className="h-8 w-8 flex-shrink-0 rounded-full border border-border/50 bg-background/80 flex items-center justify-center text-xs font-semibold text-text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{step.title}</p>
                    <p className="mt-0.5 text-xs text-text-secondary">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={socialProfiles.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-xs font-medium text-text-secondary hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="mailto:contact@grayvally.tech"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-xs font-medium text-text-secondary hover:border-blue-500/50 hover:text-blue-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="tel:+8801798651950"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-xs font-medium text-text-secondary hover:border-border/80 hover:text-text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
            </div>
          </div>
        </div>
      )}
      {/* Hero */}
      <motion.section variants={fadeUp} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-background to-background pointer-events-none" />
        <div className="absolute -top-10 sm:-top-16 left-1/2 h-56 sm:h-64 w-[320px] sm:w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-emerald-500/15 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] items-start">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/40 px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary">
                Contact GrayVally
              </div>
              <FloatHeading
                as="h1"
                id="contact-title"
                className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary font-display"
              >
                Let&apos;s build the next version of your product.
              </FloatHeading>
              <p className="mt-5 text-base sm:text-lg text-text-secondary/90 leading-relaxed max-w-2xl">
                Share your goals and we will come back with timelines, approach, and the best path to delivery.
              </p>
              <div className="mt-8 grid gap-4 justify-items-center sm:justify-items-start sm:grid-cols-[auto_auto] sm:items-start">
                <a
                  href={socialProfiles.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp live chat
                </a>
                <div className="flex flex-col items-center gap-2">
                  <a
                    href="https://calendly.com/grayvally-tech/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#006bff] px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                  >
                    Book a meeting
                  </a>
                  <span className="text-[11px] leading-none text-text-secondary">Powered by Calendly</span>
                </div>
              </div>
              <div className="mt-10 rounded-3xl bg-surface/20 backdrop-blur-sm p-6 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary/70">Direct lines</p>
                <div className="mt-4 space-y-4 text-sm text-text-secondary">
                  {[
                    { label: "Support", value: "support@grayvally.tech", href: "mailto:support@grayvally.tech", icon: Mail },
                    { label: "General", value: "contact@grayvally.tech", href: "mailto:contact@grayvally.tech", icon: Mail },
                    { label: "Partnerships", value: "mahenulhaque@grayvally.tech", href: "mailto:mahenulhaque@grayvally.tech", icon: Mail },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 rounded-2xl border border-border/40 bg-background/40 px-4 py-3 hover:border-border/70 transition-colors"
                    >
                      <span className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">{item.label}</span>
                      <span className="flex items-center gap-2 text-sm font-medium text-text-primary break-all sm:break-normal">
                        <item.icon className="h-4 w-4" />
                        {item.value}
                      </span>
                    </a>
                  ))}
                  <a
                    href="tel:+8801608613747"
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 rounded-2xl border border-border/40 bg-background/40 px-4 py-3 hover:border-border/70 transition-colors"
                  >
                    <span className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">Phone</span>
                    <span className="flex items-center gap-2 text-sm font-medium text-text-primary break-all sm:break-normal">
                      <Phone className="h-4 w-4" />
                      +880 1608-613747
                    </span>
                  </a>
                  <div className="mt-5">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary/70">Socials</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {directSocialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background/40 px-3 py-1.5 text-xs font-medium text-text-secondary hover:border-blue-500/50 hover:text-blue-400 transition-colors"
                        >
                          <social.icon className="h-3.5 w-3.5" />
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="relative pt-10 sm:pt-12">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-emerald-500/20 blur-2xl" />
              <div className="relative rounded-3xl border border-border/40 bg-surface/40 backdrop-blur-xl p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <FloatHeading as="h2" className="text-2xl sm:text-3xl font-bold text-text-primary font-display">
                      Tell us about your project
                    </FloatHeading>
                    <p className="mt-2 text-sm sm:text-base text-text-secondary">
                      The more context you share, the faster we can propose a plan.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-text-secondary">
                    Form
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="w-full">
                      <label className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        className="mt-2 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        className="mt-2 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
                    <div className="min-w-[6rem] sm:min-w-[8rem]">
                      <label className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                        Company <span className="text-xs lowercase text-text-secondary/60">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        className="mt-2 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="Company or team name"
                      />
                    </div>
                    <div className="min-w-[9rem] sm:min-w-[11rem]">
                      <label className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                        Mobile
                      </label>
                      <div className="mt-2 flex gap-2 items-center">
                        <select
                          name="countryCode"
                          className="w-[56px] sm:w-[70px] rounded-lg border border-border/60 bg-background/60 px-2 py-2 text-xs text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent flex-shrink-0"
                          defaultValue="+880"
                        >
                          {dialingCodes.map((code) => (
                            <option key={code} value={code}>
                              {code}
                            </option>
                          ))}
                        </select>
                        <div className="flex-1 min-w-[7rem] sm:min-w-[9rem]">
                          <input
                            required
                            type="tel"
                            name="phone"
                            className="mt-0 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                      Project of interest
                    </label>
                    <select
                      name="projectInterest"
                      required
                      className="mt-2 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {projectInterestOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                      Tell us about your project
                    </label>
                    <textarea
                      required
                      name="description"
                      rows={5}
                      className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="What are you building? Timelines, scope, existing stack, or links are all helpful."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      required
                      id="agreement"
                      type="checkbox"
                      name="agreement"
                      className="mt-1 h-4 w-4 rounded border-border bg-surface text-accent focus:ring-accent"
                    />
                    <label htmlFor="agreement" className="text-xs text-text-secondary leading-relaxed">
                      By submitting this form, you agree to our{" "}
                      <Link href="/terms-of-service" className="text-text-primary hover:text-blue-400 transition-colors">
                        Terms
                      </Link>{" "}
                      &amp; acknowledge our{" "}
                      <Link href="/privacy-policy" className="text-text-primary hover:text-blue-400 transition-colors">
                        Privacy Policy
                      </Link>
                      . You agree that your information may be used to contact us about this inquiry.
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center rounded-full bg-text-primary px-6 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting ? "Sending..." : "Submit inquiry"}
                    </button>
                  </div>

                  {status === "success" && (
                    <div className="mt-3 inline-flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/5 px-3 py-2.5 text-xs sm:text-sm text-emerald-100 shadow-sm">
                      <div className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-medium text-emerald-200">Message sent successfully</p>
                        <p className="text-[11px] sm:text-xs text-emerald-200/80">
                          Thanks for reaching out. We will get back to you shortly.
                        </p>
                      </div>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="mt-3 inline-flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/5 px-3 py-2.5 text-xs sm:text-sm text-red-100 shadow-sm">
                      <div className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-red-500/20 text-red-300">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-medium text-red-200">Something went wrong</p>
                        <p className="text-[11px] sm:text-xs text-red-200/80">
                          Please try again in a moment or email{" "}
                          <a
                            href="mailto:contact@grayvally.tech"
                            className="underline underline-offset-2"
                          >
                            contact@grayvally.tech
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  )}
                </form>

              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section variants={fadeUp} className="mx-auto mt-12 sm:mt-16 max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-surface/20 p-6 sm:p-8">
          <div className="mb-6 rounded-2xl bg-background/50 px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary/70">
              GrayVally Software Solutions
            </p>
            <p className="mt-2 text-sm font-semibold text-text-primary">Majeda Garden, CHHA: 59</p>
            <p className="text-sm text-text-secondary">Dhaka 1212, Bangladesh</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <FloatHeading as="h2" className="text-lg sm:text-xl font-semibold text-text-primary">
                Our location
              </FloatHeading>
              <p className="mt-1 text-xs text-text-secondary">
                Use the search box to find our office.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-text-secondary">
              Map
            </div>
          </div>

          <div className="relative z-0 mt-5 h-[320px] sm:h-[420px] overflow-hidden rounded-2xl">
            <FreeMap
              locations={[
                {
                  title: "GrayVally Software Solutions",
                  address1: "Majeda Garden, CHHA: 59",
                  address2: "Dhaka 1212, Bangladesh",
                  coords: { lat: 23.78545244379042, lng: 90.42377593809815 },
                },
              ]}
              className="h-full w-full"
            />
          </div>
        </div>
      </motion.section>
    </motion.section>
  );
}
