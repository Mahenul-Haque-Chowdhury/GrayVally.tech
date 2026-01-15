"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { softwareSolutionCategories, totalSolutions, type SoftwareSolutionCategory } from "../data/softwareSolutions";
import { ArrowLeft, ArrowRight, Check, ChevronDown, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// Professional Software Solutions Page - Redesigned
// - 6 consolidated categories with clean UX
// - Modal/expandable detail sections
// - Modern glassmorphic design
// ============================================================================

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Expanded Details Modal Component
function DetailsModal({ 
  category, 
  isOpen, 
  onClose 
}: { 
  category: SoftwareSolutionCategory | null; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  if (!category) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl sm:max-h-[85vh] bg-surface/95 backdrop-blur-xl border border-border/50 rounded-2xl sm:rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className={cn(
              "relative p-6 sm:p-8 border-b border-border/30",
              "bg-gradient-to-r",
              category.gradient,
              "bg-opacity-10"
            )}>
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r opacity-10",
                category.gradient
              )} />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
              >
                <X className="h-5 w-5 text-text-secondary" />
              </button>
              <div className="relative flex items-center gap-4">
                <div className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br",
                  category.gradient
                )}>
                  <category.icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                    {category.title}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">{category.tagline}</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <p className="text-text-secondary mb-6">{category.description}</p>
              
              <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                All Solutions in this Category
              </h4>
              
              <div className="grid gap-3">
                {category.expandedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/30 hover:border-border/50 transition-colors"
                  >
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br",
                      category.gradient
                    )}>
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-text-primary">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:p-8 border-t border-border/30 bg-background/50">
              <Link
                href="/contact"
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                  "bg-gradient-to-r",
                  category.gradient
                )}
              >
                Get Started with {category.title.split(" ")[0]}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Category Card Component
function CategoryCard({ 
  category, 
  index,
  onExpand 
}: { 
  category: SoftwareSolutionCategory; 
  index: number;
  onExpand: () => void;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl sm:rounded-3xl border border-border/40 bg-surface/30 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-border/60 hover:shadow-xl hover:shadow-violet-500/5"
    >
      {/* Gradient accent line */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity",
        category.gradient
      )} />

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className={cn(
              "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110",
              category.gradient
            )}>
              <category.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-blue-400 transition-all duration-300">
                {category.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-0.5">{category.tagline}</p>
            </div>
          </div>
          <span className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white bg-gradient-to-r",
            category.gradient
          )}>
            {category.expandedItems.length}
          </span>
        </div>

        {/* Highlights */}
        <div className="space-y-3 mb-6">
          {category.highlights.map((highlight, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br",
                category.gradient
              )}>
                <Check className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm sm:text-base text-text-primary font-medium">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Expand Button */}
        <button
          onClick={onExpand}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border/40 bg-background/30 text-text-secondary hover:text-text-primary hover:border-border/60 hover:bg-background/50 transition-all duration-300"
        >
          <span className="text-sm font-medium">View All {category.expandedItems.length} Solutions</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

export function SoftwareSolutionsPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<SoftwareSolutionCategory | null>(null);

  return (
    <>
      <main className="min-h-screen bg-background transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-background to-background pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[128px] pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-violet-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

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
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-violet-400 mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Enterprise Solutions
              </span>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary">
                Enterprise{" "}
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Software Solutions
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary/90 leading-relaxed max-w-3xl mx-auto">
                Modular platforms designed to scale operations, revenue, and intelligence. 
                From core business systems to industry-specific solutions.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto"
            >
              {[
                { value: `${totalSolutions}+`, label: "Total Solutions", gradient: "from-violet-500 to-purple-500" },
                { value: `${softwareSolutionCategories.length}`, label: "Categories", gradient: "from-blue-500 to-cyan-500" },
                { value: "100%", label: "Customizable", gradient: "from-emerald-500 to-teal-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative text-center p-4 sm:p-6 rounded-2xl bg-surface/30 border border-border/30 backdrop-blur-sm overflow-hidden group hover:border-border/50 transition-all duration-300"
                >
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br",
                    stat.gradient
                  )} />
                  <p className={cn(
                    "text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                    stat.gradient
                  )}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 sm:py-24 bg-surface/10 transition-colors duration-300">
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
                  Solution Categories
                </span>
              </h2>
              <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
                Six powerful categories covering every aspect of enterprise software. 
                Click any category to explore all included solutions.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {softwareSolutionCategories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                  onExpand={() => setSelectedCategory(category)}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-surface/40 to-surface/20 border border-border/40 backdrop-blur-xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-medium text-emerald-400 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Ready to Build
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                Need a Custom{" "}
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Software Solution?
                </span>
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
                Every solution is fully customizable. Tell us your requirements and we&apos;ll build 
                exactly what your business needs.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-violet-500/25"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/audit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/30 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-text-primary transition-all duration-300 hover:border-violet-500/50 hover:bg-surface/50"
                >
                  <span>Free System Audit</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Details Modal */}
      <DetailsModal
        category={selectedCategory}
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </>
  );
}
