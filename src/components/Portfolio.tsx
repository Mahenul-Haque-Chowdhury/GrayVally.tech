"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getFeaturedProjects } from "@/data/portfolio";
import { ArrowRight, ExternalLink } from "lucide-react";

export function Portfolio() {
  const projects = getFeaturedProjects(4);

  return (
    <section id="portfolio" className="relative bg-background py-16 sm:py-24 md:py-32 transition-colors duration-300 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 md:mb-20 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary mb-6">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
            Selected{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-text-secondary/90 leading-relaxed">
            A glimpse of our recent projects that showcase our expertise and dedication to excellence.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative rounded-xl sm:rounded-2xl border border-border/40 bg-surface/20 backdrop-blur-sm p-5 sm:p-6 md:p-8 transition-all duration-300 hover:border-border/80 hover:bg-surface/40 hover:shadow-lg hover:shadow-blue-500/5"
            >
              {/* Year Badge */}
              <span className="absolute top-4 right-4 sm:top-6 sm:right-6 font-mono text-xs sm:text-sm text-text-secondary/60 bg-background/50 px-2 py-1 rounded-md border border-border/30">
                {project.year}
              </span>

              {/* Project Number */}
              <div className="mb-4 sm:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-border/30 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 group-hover:border-blue-500/30">
                <span className="font-mono text-lg sm:text-xl font-bold text-blue-400 transition-colors duration-300 group-hover:text-cyan-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="pr-12 sm:pr-16">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-blue-400">
                  {project.client}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-text-secondary/80 line-clamp-2">
                  {project.project}
                </p>
              </div>

              {/* Role Badge */}
              <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-border/30 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-blue-400 border border-blue-500/20">
                  {project.role}
                </span>

                {/* Visit Project Link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-text-secondary hover:text-blue-400 transition-colors duration-300"
                  >
                    <span>Visit project</span>
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                )}
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* View Complete Portfolio Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 sm:mt-16 flex justify-center"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/30 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-text-primary transition-all duration-300 hover:border-blue-500/50 hover:bg-surface/50 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <span>View Complete Portfolio</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
