"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { softwareSolutionCategories } from "@/data/softwareSolutions";

// Select a few key categories to feature
const featuredCategories = [
  softwareSolutionCategories[0], // Core Business
  softwareSolutionCategories[2], // Sales & CRM
  softwareSolutionCategories[4], // Finance
];

export function FeaturedProducts() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-400 mb-6">
            <Star className="h-3 w-3 fill-blue-400" />
            New Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Enterprise{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Software Suite
            </span>
          </h2>
          <p className="text-lg text-text-secondary/80 max-w-2xl mx-auto mb-8">
            Powerful, scalable systems designed to run your entire organization.
          </p>
          
          <Link
            href="/software-solutions"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All Solutions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-sm p-8 transition-all duration-500 hover:border-blue-500/30 hover:bg-surface/40"
            >
              <div>
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-border/30 group-hover:scale-110 transition-transform duration-500">
                  <category.icon className="h-7 w-7 text-blue-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  {category.title}
                </h3>
                <p className="text-text-secondary/80 mb-8 leading-relaxed">
                  {category.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {category.highlights.slice(0, 3).map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500/50" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/software-solutions"
                className="inline-flex items-center justify-center w-full rounded-xl border border-border/50 bg-surface/50 py-3 text-sm font-medium text-text-primary transition-all duration-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
              >
                Learn More
              </Link>

              {/* Gradient Glow */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
