"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { softwareSolutionCategories } from "@/data/softwareSolutions";

// Select a few key categories to feature
const featuredCategories = [
  {
    ...softwareSolutionCategories[0],
    image: "/enterprise-core-operations-platform.png",
    imageAlt: "Enterprise core and operations platform preview",
  },
  {
    ...softwareSolutionCategories[2],
    image: "/revenue-sales-customer-platforms.png",
    imageAlt: "Revenue, sales, and customer platforms preview",
  },
  {
    ...softwareSolutionCategories[4],
    image: "/data-analytics-intelligence.png",
    imageAlt: "Data, analytics, and intelligence platform preview",
  },
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
          
        </motion.div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-transparent bg-surface/20 backdrop-blur-xl p-5 sm:p-6 min-h-[420px] sm:min-h-[460px] transition-all duration-500 hover:border-transparent hover:bg-surface/35 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-surface/30">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    width={1200}
                    height={800}
                    className="h-44 sm:h-52 w-full object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
                </div>

                <div className="mt-5 flex items-start justify-between">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-border/30 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 group-hover:border-blue-500/30">
                    <category.icon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
                  </div>
                  <span className="rounded-full bg-surface/60 px-3 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary/70">
                    Software Suite
                  </span>
                </div>

                <h3 className="mt-5 text-xl sm:text-2xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-blue-400">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-text-secondary/80 leading-relaxed flex-grow">
                  {category.description}
                </p>

                <Link
                  href="/software-solutions"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-secondary/50 transition-all duration-300 group-hover:text-cyan-400"
                >
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Gradient Glow */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 sm:mt-16 flex justify-center"
        >
          <Link
            href="/software-solutions"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-500/30 ring-1 ring-white/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110"
          >
            <span>View All Solutions</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
