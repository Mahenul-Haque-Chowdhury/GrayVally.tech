"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FORMSPREE_ENDPOINT } from "@/lib/formspree";
import { Section } from "@/components/motion/Section";

type FormField = "fullName" | "email" | "website" | "phone";

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  includes: string[];
  startingFrom: number;
  range: [number, number];
}

const services: ServiceItem[] = [
  {
    id: "website-maintenance",
    name: "Website Maintenance",
    description: "Ongoing updates, security monitoring, and speed improvements that keep your site healthy.",
    includes: [
      "Website Maintenance",
      "Bug Fixes",
      "Improvements",
      "Cybersecurity",
      "Hosting",
      "SSL",
      "24/7 Technical Support",
      "Technical SEO",
    ],
    startingFrom: 99,
    range: [99, 200],
  },
  {
    id: "seo",
    name: "SEO (Search Engine Optimization)",
    description: "Search-first technical and content optimization to grow qualified organic traffic.",
    includes: [
      "Keyword strategy & Research",
      "On-Page SEO",
      "Off-Page SEO Including All SEO Tools",
    ],
    startingFrom: 499,
    range: [499, 799],
  },
  {
    id: "content-writing",
    name: "Content Writing (Website & Social)",
    description: "Clear, conversion-ready copy aligned to your brand tone and search intent.",
    includes: ["Web copy", "Social captions", "Content briefs"],
    startingFrom: 49,
    range: [49, 99],
  },
  {
    id: "graphic-design",
    name: "Creative Graphic Design",
    description: "Visual assets that elevate campaigns, landing pages, and social presence.",
    includes: ["Campaign assets", "Brand visuals", "Template system"],
    startingFrom: 9,
    range: [9, 49],
  },
  {
    id: "gmb",
    name: "Google My Business Management",
    description: "Local visibility improvement through optimized listings and review management.",
    includes: ["Profile optimization", "Post scheduling", "Review response"],
    startingFrom: 99,
    range: [99, 199],
  },
  {
    id: "social-media",
    name: "Social Media Management & Content Creation",
    description: "Strategic posting, community engagement, and content that drives brand trust.",
    includes: ["Content calendar", "Creative production", "Community management"],
    startingFrom: 199,
    range: [199, 299],
  },
  {
    id: "video-production",
    name: "Video Production",
    description: "End-to-end video shoots and production support for marketing and brand stories.",
    includes: ["Pre-production planning", "On-site filming", "Delivery formats"],
    startingFrom: 499,
    range: [499, 1199],
  },
  {
    id: "video-editing",
    name: "Video Editing (Long & Short Form)",
    description: "Polished edits for YouTube, reels, ads, and short-form content performance.",
    includes: ["Long-form editing", "Short-form cuts", "Captioning"],
    startingFrom: 199,
    range: [199, 499],
  },
  {
    id: "email-marketing",
    name: "Email Marketing",
    description: "Lifecycle campaigns and newsletters that grow retention and revenue.",
    includes: ["Campaign strategy", "Template design", "Performance reporting"],
    startingFrom: 199,
    range: [199, 499],
  },
  {
    id: "digital-ads",
    name: "Digital Advertising Management",
    description: "Paid media strategy, setup, and optimization across major platforms.",
    includes: ["Campaign setup", "Audience targeting", "Weekly optimization"],
    startingFrom: 399,
    range: [399, 999],
  },
];

const faqs = [
  {
    question: "Can I start with just one service?",
    answer:
      "Yes. Many teams begin with a single service and expand once the strategy proves results. The plan is modular by design.",
  },
  {
    question: "How fast can you begin after I submit the form?",
    answer:
      "We typically respond within 1-2 business days with next steps, timeline options, and a scoped proposal.",
  },
  {
    question: "Do you work with existing tools and platforms?",
    answer:
      "Absolutely. We integrate with your current stack and recommend improvements only when they unlock measurable impact.",
  },
  {
    question: "Is there a minimum contract length?",
    answer:
      "We offer flexible monthly engagements. Some services benefit from a 3-month runway, but we align to your goals.",
  },
];

const defaultFormData = {
  fullName: "",
  email: "",
  website: "",
  phone: "",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const validateField = (field: FormField, value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "This field is required.";
  }
  if (field === "email") {
    const emailValue = trimmed.toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      return "Enter a valid email address.";
    }
  }
  if (field === "website") {
    if (/\s/.test(trimmed)) {
      return "Enter a valid website URL.";
    }
    try {
      const withProtocol = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
      new URL(withProtocol);
    } catch {
      const domainPattern = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
      if (!domainPattern.test(trimmed)) {
        return "Enter a valid website URL.";
      }
    }
  }
  if (field === "phone" && trimmed.replace(/\\D/g, "").length < 7) {
    return "Enter a valid phone number.";
  }
  return "";
};

export function ServicePlansContent() {
  const [formData, setFormData] = useState(defaultFormData);
  const [touched, setTouched] = useState<Record<FormField, boolean>>({
    fullName: false,
    email: false,
    website: false,
    phone: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [proposalStatus, setProposalStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [proposalMessage, setProposalMessage] = useState("");

  const errors = useMemo(() => {
    return (Object.keys(formData) as FormField[]).reduce((acc, field) => {
      acc[field] = validateField(field, formData[field]);
      return acc;
    }, {} as Record<FormField, string>);
  }, [formData]);

  const selectionCount = selected.length;

  const estimate = useMemo(() => {
    if (!selectionCount) {
      return null;
    }
    const selectedServices = services.filter((service) => selected.includes(service.id));
    const minTotal = selectedServices.reduce((sum, item) => sum + item.range[0], 0);
    const maxTotal = selectedServices.reduce((sum, item) => sum + item.range[1], 0);
    return `${formatCurrency(minTotal)} - ${formatCurrency(maxTotal)} / month`;
  }, [selected, selectionCount]);

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const hasError = (Object.keys(errors) as FormField[]).some((field) => errors[field]);
    if (hasError) {
      return;
    }

    setUnlocked(true);
    setTimeout(() => {
      document.getElementById("service-selection")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const toggleService = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleProposalRequest = async () => {
    setProposalStatus("idle");
    setProposalMessage("");

    if (!unlocked) {
      setSubmitted(true);
      setProposalStatus("error");
      setProposalMessage("Please complete your details to unlock service selection.");
      document.getElementById("service-form-fullName")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!selectionCount) {
      setProposalStatus("error");
      setProposalMessage("Select at least one service to request a proposal.");
      return;
    }

    const selectedServices = services.filter((service) => selected.includes(service.id));
    const submissionData = new FormData();
    submissionData.set("formType", "service-plans");
    submissionData.set("fullName", formData.fullName);
    submissionData.set("email", formData.email);
    submissionData.set("website", formData.website);
    submissionData.set("phone", formData.phone);
    submissionData.set("selectedServices", selectedServices.map((service) => service.name).join(", "));
    submissionData.set("estimateRange", estimate ?? "Not calculated");
    submissionData.set("source", "service-plans-page");

    setProposalStatus("sending");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: submissionData,
      });

      if (response.ok) {
        setProposalStatus("success");
        setProposalMessage("Thanks! We received your request and will follow up soon.");
      } else {
        setProposalStatus("error");
        setProposalMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Service plan proposal error:", error);
      setProposalStatus("error");
      setProposalMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="relative pb-24 sm:pb-16">
      <Section className="relative pt-12 sm:pt-16 pb-10 sm:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-background to-background pointer-events-none" />
        <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-text-secondary/70">Service Plans</p>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary">
              Service{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                Plans
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-text-secondary/80 leading-relaxed">
              Build a plan that matches your business stage without the confusion of bundled pricing tables. Start with a few
              essentials, then add modular marketing services as you grow. Every selection is mapped to clear deliverables, a
              predictable range, and a dedicated team that understands your goals. Share your details first, then choose the
              services that matter most to your next quarter.
            </p>
          </div>
        </div>
      </Section>

      <Section className="mx-auto max-w-screen-2xl px-4 sm:px-6 pb-12 sm:pb-14">
        <div className="rounded-3xl bg-surface/20 p-6 sm:p-8 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
              Enter your details to unlock service plans
            </h2>
            <p className="mt-2 text-sm sm:text-base text-text-secondary/75">
              Please enter your details so we can tailor a plan that fits your business and guide you to the best selection.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 max-w-3xl mx-auto text-center">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-left">
              {(
                [
                  { field: "fullName", label: "Full Name", type: "text", autoComplete: "name" },
                  { field: "email", label: "Email Address", type: "email", autoComplete: "email" },
                  { field: "website", label: "Website URL", type: "text", autoComplete: "url" },
                  { field: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
                ] as const
              ).map(({ field, label, type, autoComplete }) => {
                const errorMessage = (submitted || touched[field]) ? errors[field] : "";
                const inputId = `service-form-${field}`;

                return (
                  <div key={field} className="space-y-2">
                    <label htmlFor={inputId} className="text-sm font-medium text-text-primary">
                      {label}
                    </label>
                    <input
                      id={inputId}
                      type={type}
                      value={formData[field]}
                      autoComplete={autoComplete}
                      onChange={(event) => handleChange(field, event.target.value)}
                      onBlur={() => handleBlur(field)}
                      aria-invalid={!!errorMessage}
                      aria-describedby={errorMessage ? `${inputId}-error` : undefined}
                      className={cn(
                        "w-full rounded-xl border bg-background/50 px-4 py-3 text-sm text-text-primary shadow-sm transition-colors duration-200",
                        "placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
                        errorMessage ? "border-red-500/60" : "border-border/40"
                      )}
                    />
                    {errorMessage ? (
                      <p id={`${inputId}-error`} className="text-xs text-red-500">
                        {errorMessage}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          <button
            type="submit"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-sky-200 bg-sky-100/80 px-6 py-3 text-sm font-semibold text-sky-900 transition-colors duration-200 hover:bg-sky-100"
          >
            Continue to Service Selection
            <span aria-hidden className="text-base leading-none">↓</span>
          </button>
        </form>
        </div>
      </Section>

      <Section
        id="service-selection"
        className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-12 sm:py-14"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-text-secondary/60">Service Modules</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-text-primary">
            Digital Marketing &amp; Growth Services
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-text-secondary/80 leading-relaxed mx-auto">
            Choose your plan that fit your current goals or schedule a quick 1:1 meeting to map the right service mix.
          </p>
          <div className="mt-6">
            <a
              href="https://calendly.com/grayvally-tech/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#006BFF] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1a78ff]"
            >
              Set 1:1 Meeting
            </a>
          </div>
        </div>

        <div className="relative mt-8 max-w-6xl mx-auto">
          {!unlocked ? (
            <p className="text-sm text-text-secondary/80 sm:hidden">
              Complete your details above to unlock service selection.
            </p>
          ) : null}
          {!unlocked ? (
            <div className="absolute inset-0 z-10 hidden items-center justify-center rounded-xl bg-surface/30 text-center text-sm text-text-secondary/80 backdrop-blur-sm sm:flex">
              Complete your details above to unlock service selection.
            </div>
          ) : null}
          <div
            className={cn(
              "flex flex-col gap-3 rounded-xl bg-surface/10 transition-all duration-200",
              !unlocked &&
                "pointer-events-none opacity-0 max-h-0 overflow-hidden sm:opacity-60 sm:max-h-none sm:overflow-visible"
            )}
          >
            {services.map((service, index) => {
              const isSelected = selected.includes(service.id);

              return (
                <article
                  key={service.id}
                  className={cn(
                    "flex flex-col gap-4 rounded-xl px-5 py-4 transition-colors duration-200 sm:flex-row sm:items-start sm:justify-between",
                    "bg-slate-50/80 dark:bg-slate-900/60",
                    isSelected ? "ring-1 ring-blue-500/30" : ""
                  )}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold text-text-primary">{service.name}</h3>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-text-secondary/70">
                      <span className="font-semibold text-text-secondary">Includes:</span>
                      {service.includes.map((item) => (
                        <span
                          key={item}
                          className="whitespace-nowrap rounded-full bg-sky-100/80 px-3 py-1.5 text-[13px] font-medium text-sky-900 shadow-sm dark:bg-sky-500/15 dark:text-sky-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-start gap-3 text-left sm:w-56 sm:items-end sm:text-right">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-text-primary">
                        Monthly engagement from {formatCurrency(service.startingFrom)}
                      </p>
                      <p className="text-xs text-text-secondary/70">Ongoing</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleService(service.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        "inline-flex min-h-[44px] w-full items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors duration-200 sm:w-auto",
                        isSelected
                          ? "border-blue-500/40 bg-blue-500/10 text-blue-400"
                          : "border-border/40 text-text-secondary hover:border-border/60"
                      )}
                    >
                      {isSelected ? "Remove from Plan" : "Include in Plan"}
                      {!isSelected ? <Plus className="ml-2 h-4 w-4" aria-hidden /> : null}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <section
          id="summary"
          className="mt-10 max-w-6xl mx-auto rounded-3xl bg-slate-50/80 p-6 shadow-sm backdrop-blur-sm text-center dark:bg-slate-900/60"
        >
          <h2 className="text-xl font-semibold text-text-primary">Your selection summary</h2>
          <p className="mt-2 text-sm text-text-secondary/75">
            Review the services you selected. We&apos;ll confirm scope and finalize a tailored monthly range.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="text-left">
              {selectionCount ? (
                <ul className="space-y-2 text-sm text-text-secondary/80">
                  {services
                    .filter((service) => selected.includes(service.id))
                    .map((service) => (
                      <li key={service.id} className="flex items-center justify-between gap-4">
                        <span>{service.name}</span>
                        <span className="text-text-secondary/60">from {formatCurrency(service.startingFrom)}</span>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-sm text-text-secondary/70">
                  Select services to build your custom plan and unlock a monthly estimate.
                </p>
              )}
            </div>
            <div className="rounded-2xl bg-background/60 p-4 dark:bg-background/40">
              <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/60">Estimated range</p>
              <p className="mt-2 text-lg font-semibold text-text-primary">
                {estimate ?? "Add services to calculate"}
              </p>
              <button
                type="button"
                onClick={handleProposalRequest}
                disabled={proposalStatus === "sending" || !selectionCount}
                className={cn(
                  "mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-4 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition-all duration-200",
                  "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 hover:brightness-110",
                  "disabled:cursor-not-allowed disabled:opacity-70"
                )}
              >
                {proposalStatus === "sending" ? "Sending..." : "Request Custom Proposal"}
              </button>
              {proposalStatus !== "idle" && proposalMessage ? (
                <p
                  className={cn(
                    "mt-3 inline-flex items-center gap-2 text-xs",
                    proposalStatus === "success" ? "text-emerald-400" : "text-red-400"
                  )}
                >
                  {proposalStatus === "success" ? (
                    <CheckCircle2 className="h-4 w-4" aria-hidden />
                  ) : (
                    <AlertTriangle className="h-4 w-4" aria-hidden />
                  )}
                  {proposalMessage}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </Section>

      <Section className="mx-auto max-w-screen-2xl px-4 sm:px-6 pb-16 sm:pb-20">
        <h2 className="text-2xl font-semibold text-text-primary text-center">Service Plans FAQ</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-2xl bg-surface/20 p-5 shadow-sm backdrop-blur-sm"
            >
              <h3 className="text-base font-semibold text-text-primary">{faq.question}</h3>
              <p className="mt-2 text-sm text-text-secondary/75 leading-relaxed">{faq.answer}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Mobile summary bar removed */}
    </div>
  );
}
