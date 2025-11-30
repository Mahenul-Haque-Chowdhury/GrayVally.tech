"use client";

import { motion } from "framer-motion";

const projects = [
  {
    client: "Intovah - IT Company",
    project: "AI-Driven VA & Agency Automation Platform",
    year: "2025",
    role: "Full-Stack Developer",
    link: "https://intovah.com/",
  },
  {
    client: "JMR Trucking - Logistics Company",
    project: "Logistics & Freight Website for a US-Based Company",
    year: "2024",
    role: "Frontend Developer",
    link: "https://jmrtrucking.vercel.app/",
  },
  {
    client: "Trendology - E-Commerce",
    project: "AI-Powered Trend Prediction & Digital Research Tool",
    year: "2025",
    role: "Full-Stack Developer",
    link: "https://www.trendology.page/",
  },
  {
    client: "WeSell - E-Commerce Store",
    project: "Modern E-Commerce Platform with Product Showcase",
    year: "2023",
    role: "Frontend Developer",
    link: "https://e-commerece-bice.vercel.app/",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 sm:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-16 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Selected Works
        </h2>

        <div className="border-t border-border">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group flex flex-col items-start justify-between border-b border-border py-8 md:flex-row md:items-center"
            >
              <div className="md:w-1/3">
                <h3 className="text-xl font-medium text-text-primary group-hover:text-blue-400 transition-colors">
                  {project.client}
                </h3>
                <p className="text-sm text-text-secondary">{project.project}</p>
                {"link" in project && project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2 inline-block text-xs font-mono text-blue-400 underline-offset-2 hover:underline"
                  >
                    Visit project ↗
                  </a>
                )}
              </div>
              <div className="mt-4 md:mt-0 md:w-1/3">
                <span className="font-mono text-sm text-text-secondary">{project.role}</span>
              </div>
              <div className="mt-2 md:mt-0 md:w-1/3 md:text-right">
                <span className="font-mono text-sm text-text-secondary">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
