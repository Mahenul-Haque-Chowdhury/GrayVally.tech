"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { softwareSolutionCategories } from "@/data/softwareSolutions";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/Section";
import { Stagger } from "@/components/motion/Stagger";

// Select a few key categories to feature
const featuredCategories = [
  {
    ...softwareSolutionCategories[0],
    image: "/enterprise-core-operations-platform.webp",
    imageAlt: "Enterprise core and operations platform preview",
  },
  {
    ...softwareSolutionCategories[2],
    image: "/revenue-sales-customer-platforms.webp",
    imageAlt: "Revenue, sales, and customer platforms preview",
  },
  {
    ...softwareSolutionCategories[3],
    image: "/finance-monetization-systems.webp",
    imageAlt: "Finance and monetization systems preview",
  },
  {
    ...softwareSolutionCategories[4],
    image: "/data-analytics-intelligence.webp",
    imageAlt: "Data, analytics, and intelligence platform preview",
  },
];

const titleGradientClass =
  "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent";

const renderGradientTitle = (text: string, gradientIndices: number[]) => {
  const words = text.split(" ");
  const gradientSet = new Set(gradientIndices);
  return words.map((word, index) => (
    <span
      key={`${word}-${index}`}
      className={gradientSet.has(index) ? titleGradientClass : undefined}
    >
      {word}
      {index < words.length - 1 ? " " : null}
    </span>
  ));
};

const cardGridVariant = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const cardPeekVariant = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function FeaturedProducts() {
  return (
    <Section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
        <Stagger className="mb-16 flex flex-col items-center text-center">
          <Reveal
            as="span"
            variant="bodyText"
            useParent
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/35 bg-blue-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-400 mb-6"
          >
            <Star className="h-3 w-3 fill-blue-400 animate-pulse" />
            New Solutions
          </Reveal>
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="my-0 mb-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary font-display"
          >
            {renderGradientTitle("Enterprise Software Suite", [1, 2])}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="mb-8 text-lg text-text-secondary/80 max-w-2xl mx-auto"
          >
            Powerful, scalable systems designed to run your entire organization.
          </motion.p>
        </Stagger>

        <motion.div
          className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4"
          variants={cardGridVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {featuredCategories.map((category, index) => (
            <div
              key={category.title}
              className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <motion.div
                variants={cardPeekVariant}
                className="group relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-transparent bg-surface/20 backdrop-blur-xl p-5 sm:p-6 min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] transition-all duration-500 hover:border-transparent hover:bg-surface/35 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="relative overflow-hidden rounded-2xl bg-surface/30">
                    <Image
                      src={category.image}
                      alt={category.imageAlt}
                      width={1200}
                      height={800}
                      className="h-44 sm:h-52 w-full object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
                  </div>

                  <div className="mt-5 flex items-start justify-between">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-border/30 transition-colors duration-300 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 group-hover:border-blue-500/30">
                      <category.icon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
                    </div>
                    <span className="rounded-full bg-surface/60 px-3 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary/70">
                      Software Suite
                    </span>
                  </div>

                  <Reveal
                    as="h3"
                    variant="headline"
                    className="mt-5 text-xl sm:text-2xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-blue-400"
                  >
                    {category.title}
                  </Reveal>
                  <Reveal
                    as="p"
                    variant="bodyText"
                    className="mt-3 text-sm sm:text-base text-text-secondary/80 leading-relaxed flex-grow"
                  >
                    {category.description}
                  </Reveal>

                  <Link
                    href={`/software-solutions#${category.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)+/g, "")}`}
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300 shadow-sm shadow-blue-500/20 transition-colors duration-300 hover:border-blue-400 hover:bg-blue-500/20"
                    aria-label={`Learn more about ${category.title}`}
                  >
                    <span>Learn more about {category.title}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Gradient Glow */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0 pointer-events-none" />
              </motion.div>
            </div>
          ))}
        </motion.div>

        <Reveal variant="bodyText" className="mt-12 sm:mt-16 flex justify-center">
          <Link
            href="/software-solutions"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-500/30 ring-1 ring-white/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110"
          >
            <span>View All Solutions</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}

