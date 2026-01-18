"use client";

import Link from "next/link";
import { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";

export function Contact() {
  return (
    <ScrollFloatReveal
      as="section"
      y={REVEAL_CONFIG.translateY}
      duration={MOTION_DURATION.medium}
      id="contact"
      className="py-16 sm:py-24 md:py-32 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
        <FloatHeading
          as="h2"
          duration={MOTION_DURATION.display}
          className="my-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary"
          gradientWords={[2]}
          once
        >
          Ready to build?
        </FloatHeading>
        <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-text-secondary px-2">
          Tell me about your next project and I&apos;ll respond with clear next
          steps, timelines, and options.
        </p>
        <div className="mt-8 sm:mt-10 flex justify-center gap-4">
          <Link
            href="/contact"
            className="bg-text-primary px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-background transition-transform hover:scale-105 active:scale-95"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </ScrollFloatReveal>
  );
}
