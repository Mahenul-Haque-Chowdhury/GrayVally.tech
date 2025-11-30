"use client";

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-5xl">
          Ready to scale?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
          Let&apos;s discuss your infrastructure needs. No sales pitch, just engineering.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="mailto:hello@grayvally.tech"
            className="bg-text-primary px-8 py-3 text-sm font-bold text-background transition-transform hover:scale-105 active:scale-95"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
