"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { FORMSPREE_ENDPOINT } from "@/lib/formspree";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<"website" | "name" | "email" | "consent", string>>;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function AuditRequestForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const isSubmitting = status === "submitting";

  const validate = (formData: FormData): FieldErrors => {
    const nextErrors: FieldErrors = {};

    const website = String(formData.get("website") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const consent = formData.get("consent");

    if (!website) nextErrors.website = "Website URL is required.";
    if (!name) nextErrors.name = "Name is required.";
    if (!email) nextErrors.email = "Email is required.";
    else if (!isValidEmail(email)) nextErrors.email = "Please enter a valid email.";
    if (!consent) nextErrors.consent = "Please agree before submitting.";

    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    try {
      // Reuse the existing Formspree workflow used on /contact.
      // A hidden `formType` field helps distinguish submissions.
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        setErrors({});
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border/40 bg-surface/20 backdrop-blur-sm p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-text-primary">Request received</h3>
        <p className="mt-3 text-sm sm:text-base text-text-secondary/90 leading-relaxed">
          Thanks! We’ll review your website and get back to you within 24–48 hours.
        </p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-text-primary hover:text-blue-400 transition-colors"
          >
            <span>Want to talk sooner? Book a consultation</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border/40 bg-surface/20 backdrop-blur-sm p-6 sm:p-8"
    >
      <input type="hidden" name="formType" value="complimentary-website-audit" />

      <div className="grid gap-4 sm:gap-5">
        <div>
          <label htmlFor="audit-website" className="block text-sm font-semibold text-text-primary">
            Website URL <span className="text-text-secondary">(required)</span>
          </label>
          <input
            id="audit-website"
            name="website"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://yourwebsite.com"
            aria-invalid={Boolean(errors.website)}
            aria-describedby={errors.website ? "audit-website-error" : undefined}
            className="mt-2 w-full rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-secondary/60 outline-none transition-colors focus:border-text-secondary/60 focus-visible:ring-2 focus-visible:ring-text-primary/20"
          />
          {errors.website && (
            <p id="audit-website-error" className="mt-2 text-xs sm:text-sm text-red-200">
              {errors.website}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="audit-name" className="block text-sm font-semibold text-text-primary">
              Name <span className="text-text-secondary">(required)</span>
            </label>
            <input
              id="audit-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "audit-name-error" : undefined}
              className="mt-2 w-full rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-secondary/60 outline-none transition-colors focus:border-text-secondary/60 focus-visible:ring-2 focus-visible:ring-text-primary/20"
            />
            {errors.name && (
              <p id="audit-name-error" className="mt-2 text-xs sm:text-sm text-red-200">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="audit-email" className="block text-sm font-semibold text-text-primary">
              Email <span className="text-text-secondary">(required)</span>
            </label>
            <input
              id="audit-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "audit-email-error" : undefined}
              className="mt-2 w-full rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-secondary/60 outline-none transition-colors focus:border-text-secondary/60 focus-visible:ring-2 focus-visible:ring-text-primary/20"
            />
            {errors.email && (
              <p id="audit-email-error" className="mt-2 text-xs sm:text-sm text-red-200">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="audit-goal" className="block text-sm font-semibold text-text-primary">
            What are you trying to improve? <span className="text-text-secondary">(optional)</span>
          </label>
          <textarea
            id="audit-goal"
            name="goal"
            rows={4}
            placeholder="Performance, conversions, accessibility, stability, SEO basics…"
            className="mt-2 w-full resize-none rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-secondary/60 outline-none transition-colors focus:border-text-secondary/60 focus-visible:ring-2 focus-visible:ring-text-primary/20"
          />
        </div>

        <div className="pt-1">
          <div className="pb-4">
            <div className="flex items-start gap-3">
              <input
                id="audit-consent"
                name="consent"
                type="checkbox"
                required
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? "audit-consent-error" : undefined}
                className="mt-1 h-4 w-4 rounded border border-border/60 bg-background/40 text-blue-500 outline-none focus-visible:ring-2 focus-visible:ring-text-primary/20"
              />
              <label htmlFor="audit-consent" className="text-xs sm:text-sm text-text-secondary/85 leading-relaxed">
                By submitting this form, you agree to our{" "}
                <Link href="/terms-of-service" className="text-text-primary hover:text-blue-400 transition-colors">
                  Terms
                </Link>{" "}
                &amp; acknowledge our{" "}
                <Link href="/privacy-policy" className="text-text-primary hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
            {errors.consent && (
              <p id="audit-consent-error" className="mt-2 text-xs sm:text-sm text-red-200">
                {errors.consent}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-text-primary px-6 py-3.5 text-sm sm:text-base font-semibold text-background transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="relative z-10">
              {isSubmitting ? "Requesting…" : "Request Complimentary Audit"}
            </span>
            {isSubmitting ? (
              <Loader2 className="relative z-10 h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            )}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-300 group-hover:translate-x-0" />
          </button>

          <p className="mt-3 text-xs sm:text-sm text-text-secondary/80">We respect your privacy. No spam.</p>

          {status === "error" && (
            <div className="mt-4 rounded-xl border border-border/40 bg-background/40 px-4 py-3 text-sm text-text-secondary">
              Something went wrong submitting your request. Please try again, or use the contact form.
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
