"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { softwareSolutionCategories } from "../data/softwareSolutions";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// Professional Software Solutions Page
// - Glassmorphic cards with hover effects
// - Staggered animations
// - Theme-aware styling matching the Web Solutions page
// ============================================================================

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function SoftwareSolutionsPageContent() {
  const totalSolutions = softwareSolutionCategories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <>
      <main className="min-h-screen bg-background transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-background to-background pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[128px] pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8 group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary mb-6">
                Software Solutions
              </span>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary">
                Enterprise{" "}
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Software Systems
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary/90 leading-relaxed max-w-2xl mx-auto">
                Comprehensive software solutions to streamline your business operations, from core enterprise systems to specialized industry tools.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
            >
              {[
                { value: `${totalSolutions}+`, label: "Solutions" },
                { value: `${softwareSolutionCategories.length}`, label: "Categories" },
                { value: "100%", label: "Customizable" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-surface/20 border border-border/30 backdrop-blur-sm"
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 sm:py-24 bg-surface/20 transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                Our{" "}
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Software Suite
                </span>
              </h2>
              <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
                Explore our extensive range of software systems designed to empower every aspect of your organization.
              </p>
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              {softwareSolutionCategories.map((category, catIndex) => (
                <motion.div
                  key={category.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                  className="group rounded-2xl sm:rounded-3xl border border-border/40 bg-background/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-border/60 hover:shadow-lg hover:shadow-violet-500/5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-border/30 transition-all duration-300 group-hover:from-violet-500/20 group-hover:to-blue-500/20 group-hover:border-violet-500/30">
                        <category.icon className="h-6 w-6 sm:h-7 sm:w-7 text-violet-400 transition-colors duration-300 group-hover:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-text-primary">{category.title}</h3>
                        <p className="text-sm text-text-secondary mt-1">{category.description}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 px-4 py-1.5 text-xs font-medium text-violet-400 w-fit">
                      {category.items.length} solutions
                    </span>
                  </div>

                  <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIndex * 0.05 }}
                        className="flex items-start gap-4 p-4 rounded-xl bg-surface/30 border border-border/30 transition-all duration-300 hover:bg-surface/50 hover:border-border/50 hover:shadow-md"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-primary">{item.title}</h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[128px] pointer-events-none" />
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-12 rounded-3xl bg-surface/20 border border-border/40 backdrop-blur-xl"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                Need a Custom{" "}
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Software Solution?
                </span>
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
                We can tailor any of these systems to your specific business requirements. Let&apos;s talk about your needs.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-text-primary px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-background transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10">Get a Quote</span>
                  <ArrowRight className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-500 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
                </Link>
                <Link
                  href="/"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/30 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-text-primary transition-all duration-300 hover:border-violet-500/50 hover:bg-surface/50"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
