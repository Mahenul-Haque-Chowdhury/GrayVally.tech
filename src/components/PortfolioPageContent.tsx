"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getAllProjects } from "@/data/portfolio";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import ProjectPreviewModal from "./ProjectPreviewModal";
import { ProjectCard } from "./ProjectCard";

export function PortfolioPageContent() {
  const projects = getAllProjects();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-background to-background pointer-events-none" />
        <div className="absolute -top-20 left-1/2 h-72 w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-emerald-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-8 h-56 w-56 rounded-full bg-cyan-500/10 blur-[110px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center"
          >
            <div>
              <div className="flex flex-col items-start gap-6 sm:gap-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
                <div className="w-full flex justify-center sm:justify-start">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary">
                    Selected Work
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary font-display">
                Digital products that feel premium and perform fast.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-text-secondary/90 leading-relaxed max-w-2xl">
                Explore a curated set of builds across e-commerce, SaaS, and modern business platforms. Every project
                is designed for speed, clarity, and measurable results.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                >
                  Start a project
                </Link>
                <Link
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/30 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-surface/50"
                >
                  View portfolio
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-emerald-500/20 blur-2xl" />
              <div className="relative rounded-3xl border border-border/40 bg-surface/40 backdrop-blur-xl p-6 sm:p-8">
                <h2 className="text-sm uppercase tracking-[0.3em] text-text-secondary">Work Snapshot</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Projects", value: `${projects.length}+` },
                    { label: "Satisfaction", value: "100%" },
                    { label: "Industries", value: "5+" },
                    { label: "Experience", value: "3+ Years" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-border/40 bg-background/40 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">{stat.label}</p>
                      <p className="mt-2 text-lg font-semibold text-text-primary">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-10 sm:py-14 border-y border-border/30 bg-surface/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Performance-first builds",
                description: "Fast load times, optimized assets, and stable deployments for real users.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Conversion-led UX",
                description: "Interfaces that guide attention, reduce friction, and move customers to action.",
                gradient: "from-emerald-500 to-teal-500",
              },
              {
                title: "Scalable foundations",
                description: "Systems that handle growth without a rewrite or a fragile patchwork.",
                gradient: "from-amber-500 to-orange-500",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-6 backdrop-blur-sm"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />
                <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="work" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10 sm:mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
                Case studies & builds
              </h2>
              <p className="mt-4 text-text-secondary max-w-2xl">
                Hover any card for a live preview, or open the full experience in a new tab.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/30 px-5 py-2 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-surface/50"
            >
              Build something similar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-12 sm:gap-16 md:gap-20 grid-cols-1 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onPreview={(url) => setPreviewUrl(url)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-surface/40 via-background to-surface/30 p-8 sm:p-12 text-center"
          >
            <div className="absolute -top-16 left-10 h-40 w-40 rounded-full bg-blue-500/20 blur-[90px]" />
            <div className="absolute -bottom-16 right-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-[90px]" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
                Ready to build your next launch?
              </h2>
              <p className="mt-4 text-text-secondary/90 max-w-2xl mx-auto">
                We can help you go from idea to production with reliable infrastructure, polished UX, and measurable
                outcomes.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                >
                  Start a conversation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/software-solutions"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/60 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-background/80"
                >
                  Explore services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectPreviewModal 
        url={previewUrl} 
        onClose={() => setPreviewUrl(null)} 
      />
    </>
  );
}
