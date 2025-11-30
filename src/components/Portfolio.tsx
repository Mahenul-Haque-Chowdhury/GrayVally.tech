"use client";

import { motion } from "framer-motion";

const projects = [
  {
    client: "FinTech Corp",
    project: "Core Banking Migration",
    year: "2023",
    role: "Lead Architect",
  },
  {
    client: "HealthData Inc",
    project: "HIPAA Compliant Cloud",
    year: "2023",
    role: "Security Consultant",
  },
  {
    client: "Global Logistics",
    project: "Real-time Tracking System",
    year: "2022",
    role: "DevOps Engineering",
  },
  {
    client: "E-Commerce Giant",
    project: "Black Friday Scaling",
    year: "2022",
    role: "SRE",
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
