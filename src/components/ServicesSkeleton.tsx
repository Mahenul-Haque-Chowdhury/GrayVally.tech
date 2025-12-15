"use client";

import { motion } from "framer-motion";

export function ServicesSkeleton() {
  return (
    <section className="relative bg-background py-16 sm:py-24 md:py-32 transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 sm:mb-16 md:mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary mb-6">
            <div className="h-3 w-16 bg-surface animate-pulse rounded" />
          </div>
          <div className="h-12 w-80 mx-auto bg-surface animate-pulse rounded mb-4" />
          <div className="h-4 w-96 mx-auto bg-surface animate-pulse rounded" />
        </motion.div>
        <div className="grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl sm:rounded-2xl border border-border/40 bg-surface/20 backdrop-blur-sm p-4 sm:p-6 md:p-8"
            >
              <div className="h-6 w-6 bg-surface animate-pulse rounded mb-4" />
              <div className="h-6 w-24 bg-surface animate-pulse rounded mb-2" />
              <div className="h-4 w-full bg-surface animate-pulse rounded mb-1" />
              <div className="h-4 w-3/4 bg-surface animate-pulse rounded" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}