"use client";

import Link from "next/link";

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-5xl">Ready to build?</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
          Tell me about your next project and I&apos;ll respond with clear next
          steps, timelines, and options.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/contact"
            className="bg-text-primary px-8 py-3 text-sm font-bold text-background transition-transform hover:scale-105 active:scale-95"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
