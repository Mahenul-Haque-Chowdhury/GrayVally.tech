"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getFeaturedProjects } from "@/data/portfolio";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";

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
          className="mb-16 sm:mb-24 md:mb-32 text-center"
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
        <div className="grid gap-12 sm:gap-16 md:gap-20 grid-cols-1 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>

        {/* View Complete Portfolio Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 sm:mt-24 flex justify-center"
        >
          <Link
            href="/portfolio"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-surface/50 px-8 py-3 text-sm font-medium text-text-primary transition-all duration-300 hover:bg-surface/80 hover:shadow-lg hover:shadow-blue-500/10 border border-border/50"
          >
            <span>View Complete Portfolio</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
