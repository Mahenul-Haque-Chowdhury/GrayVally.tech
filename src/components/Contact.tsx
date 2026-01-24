"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/Section";

const contentContainerVariant = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const pocketPeekTopVariant = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Contact() {
  return (
    <Section
      id="contact"
      className="py-16 sm:py-24 md:py-32 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
        <motion.div
          variants={contentContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative overflow-hidden">
            <motion.h2
              variants={pocketPeekTopVariant}
              className="my-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary"
            >
              Ready to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                build?
              </span>
            </motion.h2>
          </div>
          <div className="relative overflow-hidden mt-4 sm:mt-6">
            <motion.p
              variants={pocketPeekTopVariant}
              className="mx-auto max-w-xl text-sm sm:text-base md:text-lg text-text-secondary px-2"
            >
              Tell me about your next project and I&apos;ll respond with clear next
              steps, timelines, and options.
            </motion.p>
          </div>
          <div className="relative overflow-hidden mt-8 sm:mt-10 flex justify-center gap-4">
            <motion.div variants={pocketPeekTopVariant}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-8 sm:px-10 py-3 sm:py-3.5 text-base sm:text-lg font-semibold text-white shadow-lg shadow-blue-500/30 ring-1 ring-white/20 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30"
              >
                Get in Touch
                <svg className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
