"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

type ServiceDetailsProps = {
  label?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  outcomes: string[];
  useCases: string[];
  process: string[];
  ctaText: string;
  ctaHref: string;
  imagePriority?: boolean;
};

export default function ServiceDetails({
  label = "WEB SOLUTION",
  title,
  description,
  imageSrc,
  imageAlt,
  outcomes,
  useCases,
  process,
  ctaText,
  ctaHref,
  imagePriority = false,
}: ServiceDetailsProps) {
  return (
    <section className="w-full rounded-3xl bg-slate-100/80 dark:bg-slate-900/50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary/70">
              {label}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-text-primary sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
              {description}
            </p>
            <a
              href={ctaHref}
              className="mt-4 inline-flex min-h-[40px] items-center justify-center rounded-full border border-border/50 bg-background/50 px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-surface/40"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="flex lg:justify-end">
            <div className="w-full max-w-[320px] overflow-hidden rounded-2xl border border-border/40 bg-surface/30 shadow-sm">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1200}
                height={800}
                className="h-44 w-full object-cover sm:h-52"
                sizes="(min-width: 1024px) 30vw, 100vw"
                priority={imagePriority}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-surface/20 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-secondary/70">
            Business outcomes
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((item) => (
              <div
                key={item}
                className="rounded-full border border-border/40 bg-background/60 px-3 py-2 text-xs font-medium text-text-secondary"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-surface/15 p-4 shadow-sm shadow-black/10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-secondary/70">
              Ideal use cases
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
              {useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-surface/15 p-4 shadow-sm shadow-black/10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-secondary/70">
              Delivery process
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-text-secondary">
              {process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface/25 px-4 py-3">
          <p className="text-sm text-text-secondary">
            Discuss your requirements with our team.
          </p>
          <a
            href={ctaHref}
            className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-text-primary px-5 py-2 text-sm font-semibold text-background transition-colors hover:bg-blue-500"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
