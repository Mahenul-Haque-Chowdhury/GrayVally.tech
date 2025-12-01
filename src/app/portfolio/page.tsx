"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getAllProjects } from "@/data/portfolio";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen bg-background text-text-primary transition-colors duration-300">
      <NavBar />
      
      <main className="pt-24 sm:pt-28 md:pt-32">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-blue-400 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              
              <span className="block mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Complete Portfolio
                </span>
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Our{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Portfolio
                </span>
              </h1>
              <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-text-secondary/90 leading-relaxed">
                A showcase of our work across various industries. Each project represents our commitment to quality, innovation, and client success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 sm:py-12 border-y border-border/30 bg-surface/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{projects.length}+</div>
                <div className="text-xs sm:text-sm text-text-secondary mt-1">Projects Completed</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">100%</div>
                <div className="text-xs sm:text-sm text-text-secondary mt-1">Client Satisfaction</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">3+</div>
                <div className="text-xs sm:text-sm text-text-secondary mt-1">Years Experience</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">5+</div>
                <div className="text-xs sm:text-sm text-text-secondary mt-1">Industries Served</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
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
                    {project.description && (
                      <p className="mt-3 text-xs sm:text-sm text-text-secondary/60 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-[10px] sm:text-xs text-text-secondary/70 bg-background/50 px-2 py-0.5 sm:py-1 rounded border border-border/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Role Badge & Visit Link */}
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/60 to-surface/40 pointer-events-none" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                Have a project in mind?
              </h2>
              <p className="mt-4 text-text-secondary/90 max-w-xl mx-auto">
                Let&apos;s discuss how we can help bring your vision to life with our expertise.
              </p>
              <Link
                href="/contact"
                className="mt-8 group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-text-primary text-background px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
