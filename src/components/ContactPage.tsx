"use client";

import { FormEvent, useState } from "react";
import { allServices } from "@/data/services";

const countries = [
  { code: "+1", label: "US / Canada" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "Australia" },
  { code: "+880", label: "Bangladesh" },
  { code: "+91", label: "India" },
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder submit – integrate with backend or form tool later.
    setTimeout(() => {
      setSubmitting(false);
      alert("Thanks for reaching out. I will get back to you shortly.");
    }, 600);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background pt-24 pb-24">
      <section className="mx-auto flex max-w-5xl flex-col gap-12 px-6 md:flex-row">
        <div className="md:w-3/5">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Let&apos;s talk about your project.
          </h1>
          <p className="mt-4 text-sm text-text-secondary">
            Share a bit about what you&apos;re building and I&apos;ll follow up with
            a focused, technical response  no spam, no fluff.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="w-full">
                <label className="block text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  className="mt-2 w-full border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Company <span className="text-xs lowercase text-text-secondary/60">(optional)</span>
                </label>
                <input
                  type="text"
                  name="company"
                  className="mt-2 w-full border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="Company or team name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Mobile
                </label>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <select
                    name="countryCode"
                    className="w-full sm:w-32 border border-border bg-surface px-2 py-2 text-xs text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    defaultValue="+880"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code}  {c.label}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    type="tel"
                    name="phone"
                    className="w-full flex-1 border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-text-secondary">
                Project of interest
              </label>
              <select
                name="projectInterest"
                required
                className="mt-2 w-full border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                {allServices.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-text-secondary">
                Tell me about your project
              </label>
              <textarea
                required
                name="description"
                rows={5}
                className="mt-2 w-full border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
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
              <label htmlFor="agreement" className="text-xs text-text-secondary">
                I agree that my information may be used to contact me about this
                inquiry. Your details will never be shared or sold.
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-md bg-text-primary px-6 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Sending..." : "Submit inquiry"}
            </button>
          </form>
        </div>

        <aside className="md:w-2/5 md:border-l md:border-border md:pl-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">
            Direct lines
          </h2>
          <div className="mt-4 space-y-4 text-sm text-text-secondary">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-secondary/70">Email</p>
              <a
                href="mailto:mahenul.haque.chowdhury@g.bracu.ac.bd"
                className="mt-1 block text-text-primary underline-offset-2 hover:underline"
              >
                mahenul.haque.chowdhury@g.bracu.ac.bd
              </a>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-secondary/70">Phone</p>
              <a
                href="tel:+8801798651950"
                className="mt-1 block text-text-primary underline-offset-2 hover:underline"
              >
                +880 1798651950
              </a>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
