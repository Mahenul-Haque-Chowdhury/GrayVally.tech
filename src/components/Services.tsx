"use client";

import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Cloud Architecture",
    description: "Scalable, secure, and cost-effective cloud environments on AWS, Azure, and GCP.",
    tags: ["Terraform", "Kubernetes", "Serverless"],
  },
  {
    id: "02",
    title: "DevOps Automation",
    description: "Streamlined CI/CD pipelines that accelerate delivery and reduce deployment risk.",
    tags: ["GitHub Actions", "GitLab CI", "ArgoCD"],
  },
  {
    id: "03",
    title: "Security & Compliance",
    description: "Infrastructure security audits, penetration testing, and compliance automation.",
    tags: ["SOC2", "ISO 27001", "Zero Trust"],
  },
];

export function Services() {
  return (
    <section id="services" className="bg-surface py-24 sm:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Engineering precision for <br /> complex problems.
          </h2>
          <p className="mt-4 max-w-xs text-sm text-text-secondary md:mt-0">
            Our core competencies lie in building the invisible backbone of modern digital products.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative border border-border bg-background p-8 transition-colors hover:border-text-secondary"
            >
              <span className="font-mono text-xs text-text-secondary">{service.id}</span>
              <h3 className="mt-4 text-xl font-semibold text-text-primary group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border bg-surfaceHighlight px-2 py-1 font-mono text-[10px] text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
