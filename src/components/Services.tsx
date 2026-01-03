"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { allServices } from "../data/services";
import { ArrowRight } from "lucide-react";

// Show only top 6 services on landing page
const featuredServices = allServices.slice(0, 6);

export function Services() {
  return (
    <section id="services" className="relative bg-background py-16 sm:py-24 md:py-32 transition-colors duration-300 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 md:mb-20 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary mb-6">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
            Engineering{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-text-secondary/90 leading-relaxed">
            Our core competencies lie in building the invisible backbone of modern digital products.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative rounded-xl sm:rounded-2xl border border-border/40 bg-surface/20 backdrop-blur-sm p-4 sm:p-6 md:p-8 transition-all duration-300 hover:border-border/80 hover:bg-surface/40 hover:shadow-lg hover:shadow-blue-500/5"
            >
              {/* Icon Container */}
              <div className="mb-3 sm:mb-5 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-border/30 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 group-hover:border-blue-500/30">
                <service.icon className="h-5 w-5 sm:h-7 sm:w-7 text-blue-400 transition-colors duration-300 group-hover:text-cyan-400" />
              </div>
              
              {/* Service Number */}
              <span className="absolute top-4 right-4 sm:top-8 sm:right-8 font-mono text-[10px] sm:text-xs text-text-secondary/50">
                {service.id}
              </span>
              
              {/* Content */}
              <h3 className="text-sm sm:text-xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-blue-400 line-clamp-2">
                {service.title}
              </h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-text-secondary/80 line-clamp-3 sm:line-clamp-none">
                {service.description}
              </p>
              
              {/* Category Badge */}
              <div className="mt-3 sm:mt-5 pt-3 sm:pt-5 border-t border-border/30">
                <span className="inline-flex items-center rounded-full bg-surface/60 px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary/70">
                  {service.category}
                </span>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 sm:mt-16 flex justify-center"
        >
          <Link
            href="/web-solutions"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/30 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-text-primary transition-all duration-300 hover:border-blue-500/50 hover:bg-surface/50 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <span>Check out all Services</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
