"use client";

import { motion } from "framer-motion";
import { allServices } from "../data/services";

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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative border border-border bg-background p-8 transition-colors hover:border-text-secondary"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs text-text-secondary">{service.id}</span>
                <service.icon className="h-6 w-6 text-text-secondary transition-colors group-hover:text-blue-500" />
              </div>
              
              <h3 className="mt-4 text-xl font-semibold text-text-primary group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {service.description}
              </p>
              <div className="mt-6">
                <span className="inline-block rounded-full bg-surfaceHighlight px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-text-secondary">
                  {service.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
