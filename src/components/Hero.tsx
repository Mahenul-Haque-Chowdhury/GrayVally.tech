"use client";

import { motion } from "framer-motion";
import Hyperspeed, { hyperspeedPresets } from "./Hyperspeed";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed effectOptions={hyperspeedPresets.one} />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="mx-auto max-w-4xl text-balance font-display text-5xl font-bold tracking-tight text-text-primary sm:text-7xl md:text-8xl">
            Digital Infrastructure <br />
            <span className="text-text-secondary">Architects.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg text-text-secondary sm:text-xl"
        >
          We design and build resilient, cloud-native systems for companies that
          demand precision, scalability, and zero downtime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex justify-center gap-6"
        >
          <div className="flex flex-col items-center gap-2 border-r border-border pr-6">
            <span className="font-mono text-2xl font-bold text-text-primary">99.99%</span>
            <span className="text-xs text-text-secondary uppercase tracking-wider">Uptime</span>
          </div>
          <div className="flex flex-col items-center gap-2 border-r border-border pr-6">
            <span className="font-mono text-2xl font-bold text-text-primary">Global</span>
            <span className="text-xs text-text-secondary uppercase tracking-wider">Reach</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-2xl font-bold text-text-primary">24/7</span>
            <span className="text-xs text-text-secondary uppercase tracking-wider">Support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
