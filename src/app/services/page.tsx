"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { serviceCategories, allServices } from "../../data/services";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function ServicesPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-background to-background pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
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
              Our Services
            </span>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary">
              Complete{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Digital Solutions
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary/90 leading-relaxed max-w-2xl mx-auto">
              From concept to deployment, we provide end-to-end services to build, scale, and maintain your digital infrastructure.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-16"
          >
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-text-primary">{allServices.length}+</p>
              <p className="text-xs sm:text-sm text-text-secondary uppercase tracking-wider mt-1">Services</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-text-primary">{serviceCategories.length}</p>
              <p className="text-xs sm:text-sm text-text-secondary uppercase tracking-wider mt-1">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-text-primary">24/7</p>
              <p className="text-xs sm:text-sm text-text-secondary uppercase tracking-wider mt-1">Support</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
              All Services
            </h2>
            <p className="mt-4 text-text-secondary max-w-2xl">
              Explore our complete range of services designed to meet all your digital needs.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3">
            {allServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group relative rounded-2xl border border-border/40 bg-surface/20 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-border/80 hover:bg-surface/40 hover:shadow-lg hover:shadow-blue-500/5"
              >
                {/* Icon Container */}
                <div className="mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-border/30 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 group-hover:border-blue-500/30">
                  <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400 transition-colors duration-300 group-hover:text-cyan-400" />
                </div>
                
                {/* Service Number */}
                <span className="absolute top-6 right-6 sm:top-8 sm:right-8 font-mono text-xs text-text-secondary/50">
                  {service.id}
                </span>
                
                {/* Content */}
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-blue-400">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary/80 hidden sm:block">
                  {service.description}
                </p>
                <details className="mt-3 text-sm leading-relaxed text-text-secondary/80 sm:hidden">
                  <summary className="cursor-pointer select-none text-xs font-semibold text-blue-400">Show details</summary>
                  <p className="mt-2 text-xs text-text-secondary/80">{service.description}</p>
                </details>
                
                {/* Category Badge */}
                <div className="mt-5 pt-5 border-t border-border/30">
                  <span className="inline-flex items-center rounded-full bg-surface/60 px-3 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary/70">
                    {service.category}
                  </span>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-24 bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
              Services by{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
              Organized expertise across different domains to serve your specific needs.
            </p>
          </motion.div>

          <div className="space-y-8 sm:space-y-12">
            {serviceCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1, duration: 0.6 }}
                className="rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm p-6 sm:p-8 md:p-10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                      {category.title}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      {category.items.length} services available
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 px-4 py-1.5 text-xs font-medium text-blue-400">
                    {category.title}
                  </span>
                </div>

                <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-2">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-start gap-4 p-4 rounded-xl bg-surface/30 border border-border/30 transition-all duration-300 hover:bg-surface/50 hover:border-border/50"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">{item.title}</h4>
                        <p className="mt-1 text-sm text-text-secondary/80">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
              Ready to Build Something{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Amazing?
              </span>
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Let&apos;s discuss how we can help bring your vision to life with our comprehensive digital solutions.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-text-primary px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-background transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Start a Project</span>
                <ArrowRight className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-300 group-hover:translate-x-0" />
              </Link>
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/30 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-text-primary transition-all duration-300 hover:border-text-secondary/50 hover:bg-surface/50"
              >
                <span>Back to Home</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
