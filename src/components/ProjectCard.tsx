"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/data/portfolio";
import { ExternalLink, Globe, Eye } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
  onPreview: (url: string) => void;
}

export function ProjectCard({ project, index, onPreview }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
      className="group flex flex-col gap-6"
    >
      {/* Browser Frame / Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/40 bg-surface/30 backdrop-blur-sm shadow-2xl transition-all duration-500 group-hover:border-blue-500/30 group-hover:shadow-blue-500/10">
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
           {/* Live Website Preview - Scaled for Desktop View */}
           <div className="relative h-full w-full bg-white overflow-hidden">
             {project.link && project.useScreenshot !== false ? (
               <div className="h-[200%] w-[200%] origin-top-left scale-50">
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
               <div className="flex h-full items-center justify-center text-text-secondary/30 font-mono text-sm">
                 No Preview Available
               </div>
             )}
             
             {/* Overlay - Blocks interaction with iframe to allow scrolling the page, enables 'Visit' button */}
             <div className="absolute inset-0 bg-transparent hover:bg-black/5 transition-colors duration-300 flex items-center justify-center z-10 gap-3">
                {project.link && (
                  <>
                    <button
                      onClick={() => onPreview(project.link!)}
                      className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 shadow-lg"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </button>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 font-medium hover:shadow-lg hover:shadow-blue-500/25 border border-white/10"
                    >
                      <Globe className="h-4 w-4" />
                      Visit
                    </a>
                  </>
                )}
             </div>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <span 
              key={tech} 
              className="rounded-md border border-border/40 bg-surface/30 px-2.5 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary/80"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-2xl font-bold text-text-primary mb-2 group-hover:text-blue-400 transition-colors duration-300">
            {project.client}
          </h3>
          <p className="text-text-secondary/80 leading-relaxed line-clamp-2">
            {project.description || project.project}
          </p>
        </div>

        {/* Footer: Role & Link */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30 mt-2">
          <div className="flex flex-col">
             <span className="text-[10px] uppercase tracking-wider text-text-secondary/60 font-semibold mb-1">Development Type</span>
             <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{project.role}</span>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Visit Website
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
