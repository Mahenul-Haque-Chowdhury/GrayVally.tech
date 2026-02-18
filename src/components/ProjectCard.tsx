"use client";

import Image from "next/image";
import { Project } from "@/data/portfolio";
import { ExternalLink, Globe } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";

interface ProjectCardProps {
  project: Project;
  index: number;
  showOutcome?: boolean;
  showCaseStudyLink?: boolean;
}

export function ProjectCard({
  project,
  index,
  showOutcome = false,
  showCaseStudyLink = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const techIcons: Record<string, { iconClass: string; label: string }> = {
    "Next.js": { iconClass: "devicon-nextjs-original", label: "Next.js" },
    "Tailwind CSS": { iconClass: "devicon-tailwindcss-plain", label: "Tailwind CSS" },
    "Framer Motion": { iconClass: "devicon-framer-plain", label: "Framer Motion" },
    TypeScript: { iconClass: "devicon-typescript-plain", label: "TypeScript" },
    "Node.js": { iconClass: "devicon-nodejs-plain", label: "Node.js" },
    React: { iconClass: "devicon-react-original", label: "React" },
    MongoDB: { iconClass: "devicon-mongodb-plain", label: "MongoDB" },
    Redux: { iconClass: "devicon-redux-original", label: "Redux" },
    HTML: { iconClass: "devicon-html5-plain", label: "HTML" },
    CSS: { iconClass: "devicon-css3-plain", label: "CSS" },
    JavaScript: { iconClass: "devicon-javascript-plain", label: "JavaScript" },
    "shadcn/ui": { iconClass: "custom-shadcn", label: "shadcn/ui" },
    "Radix UI": { iconClass: "custom-radix", label: "Radix UI" },
    Lenis: { iconClass: "custom-lenis", label: "Lenis" },
  };

  const renderTechIcon = (tech: string) => {
    if (tech === "Framer Motion") {
      return (
        <svg viewBox="0 0 140 140" className="h-8 w-8 text-black dark:text-white" aria-hidden>
          <path
            d="M 44.65 33.992 L 95.35 33.992 L 95.35 59.341 L 70 59.341 Z M 44.65 59.341 L 70 59.341 L 95.35 84.691 L 44.65 84.691 Z M 44.65 84.691 L 70 84.691 L 70 110.041 Z"
            fill="currentColor"
          />
        </svg>
      );
    }

    if (tech === "Next.js") {
      return <i className="devicon-nextjs-original text-black dark:text-white text-2xl" aria-hidden />;
    }

    if (tech === "shadcn/ui") {
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-black dark:text-white" aria-hidden>
          <path
            d="M5 19L19 5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    if (tech === "Radix UI") {
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-black dark:text-white" aria-hidden>
          <circle cx="12" cy="12" r="6" fill="currentColor" />
          <rect x="15.5" y="6.5" width="2.8" height="2.8" rx="0.4" fill="currentColor" />
        </svg>
      );
    }

    if (tech === "Lenis") {
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-black dark:text-white" aria-hidden>
          <path
            d="M5 8c3 0 4 8 7 8s4-8 7-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    const icon = techIcons[tech];
    if (!icon) return null;
    return <i className={`${icon.iconClass} colored text-2xl`} aria-hidden />;
  };

  return (
    <ScrollFloatReveal
      y={REVEAL_CONFIG.translateY}
      scale={0.98}
      delay={index * 0.1}
      duration={MOTION_DURATION.card}
      className="group flex flex-col gap-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Browser Frame / Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/40 bg-surface/30 backdrop-blur-sm shadow-2xl transition duration-500 group-hover:border-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/15">
        {/* Top accent line on hover */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-30 pointer-events-none rounded-t-2xl" />
        {/* Browser Header (Dots & Address Bar) */}
        <div className="absolute top-0 left-0 right-0 z-20 flex h-10 items-center gap-4 bg-[#1a1b26] px-4 border-b border-white/5">
          <div className="flex gap-1.5 shrink-0">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          </div>
          {/* Address Bar */}
          <div className="flex-1 flex items-center justify-center px-4">
             <div className="flex items-center justify-center gap-2 w-full max-w-[80%] bg-black/20 rounded px-3 py-1 text-[10px] text-white/40 font-mono border border-white/5">
                <Globe className="h-2.5 w-2.5 opacity-50" />
                <span className="truncate max-w-[200px]">{project.link?.replace(/^https?:\/\//, '')}</span>
             </div>
          </div>
          <div className="w-10 shrink-0" /> {/* Spacer for balance */}
        </div>

        {/* Image / Preview */}
        <div className="relative h-full w-full overflow-hidden bg-surface/50 pt-10">
          {/* Hover gradient overlay — bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20 pointer-events-none" />
           {/* Live Website Preview - Scaled for Desktop View */}
           <div className="relative h-full w-full bg-white overflow-hidden">
             {project.link && project.useScreenshot !== false && isHovered ? (
               <div className="h-[400%] w-[400%] origin-top-left scale-[0.25]">
                 <iframe
                   src={project.link}
                   title={project.project}
                   className="h-full w-full border-0"
                   loading="lazy"
                   sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                 />
               </div>
             ) : project.image ? (
                <Image
                  src={project.image}
                  alt={project.project}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
             ) : (
               <div className="relative flex h-full items-center justify-center overflow-hidden">
                 <div
                   className={cn(
                     "absolute inset-0 bg-gradient-to-br opacity-80",
                     project.color ?? "from-slate-500 to-slate-700"
                   )}
                 />
                 <div className="absolute inset-0 opacity-25 bg-grid-pattern [background-size:48px_48px]" />
                 <div className="relative z-10 px-6 text-center text-white">
                   <p className="text-xs uppercase tracking-[0.3em] text-white/60">{project.year}</p>
                   <h4 className="mt-3 text-2xl font-semibold">{project.client}</h4>
                   <p className="mt-2 text-sm text-white/80">{project.project}</p>
                 </div>
               </div>
             )}
             
             {/* Overlay - Blocks interaction with iframe to allow scrolling the page, enables 'Visit' button */}
             <div className="absolute inset-0 bg-transparent hover:bg-black/5 transition-colors duration-300 flex items-center justify-center z-10 gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 font-medium border border-white/10 transition duration-300 translate-y-0 opacity-100 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    <Globe className="h-4 w-4" />
                    Visit
                  </a>
                )}
             </div>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {/* Technologies */}
        <div className="flex flex-wrap items-center gap-2">
          {project.technologies && project.technologies.length > 0 && (
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary/60">
              Stacks →
            </span>
          )}
          {project.technologies?.map((tech) => {
            const icon = techIcons[tech];
            if (!icon) return null;
            return (
              <span
                key={tech}
                className="inline-flex items-center justify-center rounded-md bg-surface/20 p-2"
                aria-label={icon.label}
                title={icon.label}
              >
                {renderTechIcon(tech)}
              </span>
            );
          })}
        </div>

        {/* Title & Description */}
        <div>
          <FloatHeading
            as="h3"
            className="text-2xl font-bold text-text-primary mb-2 group-hover:text-blue-400 transition-colors duration-300"
          >
            {project.client}
          </FloatHeading>
          {showOutcome && (
            <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/70 mb-2">
              Business Outcome:{" "}
              <span className="normal-case text-text-secondary/90 font-medium tracking-normal">
                {project.businessOutcome}
              </span>
            </p>
          )}
          <p className="text-text-secondary/80 leading-relaxed line-clamp-2">
            {project.description || project.project}
          </p>
        </div>

        {/* Footer: Role & Link */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30 mt-2 flex-wrap gap-3">
          <div className="flex flex-col">
             <span className="text-[10px] uppercase tracking-wider text-text-secondary/60 font-semibold mb-1">Development Type</span>
             <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{project.role}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {showCaseStudyLink && (
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/30 px-4 py-2 text-xs sm:text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-surface/50"
              >
                View Case Study
              </Link>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-xs sm:text-sm font-medium text-white transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Visit Website
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </ScrollFloatReveal>
  );
}
