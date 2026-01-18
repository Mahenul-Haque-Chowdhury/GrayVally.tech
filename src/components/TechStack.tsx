"use client";
import { useState, useEffect } from "react";
import LogoLoop from "./LogoLoop";
import { ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";
import {
  SiAdobeaftereffects,
  SiLaravel,
  SiLinkedin,
  SiAdobepremierepro,
  SiJavascript,
  SiGoogleanalytics,
  SiFigma,
  SiGooglesearchconsole,
  SiGoogletagmanager,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiAmazon,
} from "react-icons/si";

const techStack = [
  { icon: SiGooglesearchconsole, name: "Search Console", color: "#4285F4" },
  { icon: SiGoogletagmanager, name: "Tag Manager", color: "#246FDB" },
  { icon: SiLinkedin, name: "LinkedIn Ads", color: "#0A66C2" },
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: SiAmazon, name: "AWS", color: "#FF9900" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
  { icon: SiAdobeaftereffects, name: "After Effects", color: "#9999FF" },
  { icon: SiAdobepremierepro, name: "Premiere Pro", color: "#9999FF" },
  { icon: SiLaravel, name: "Laravel", color: "#FF2D20" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiGoogleanalytics, name: "Google Analytics", color: "#E37400" },
];

export function TechStack() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const logoItems = techStack.map((tech) => ({
    node: (
      <div className="flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl bg-surface/50 border border-border/50 hover:border-blue-500/30 hover:bg-surface/80 transition-colors group">
        <tech.icon
          className="h-5 w-5 sm:h-6 sm:w-6 transition-transform"
          style={{ color: tech.color }}
          aria-hidden
        />
        <span className="text-xs sm:text-sm font-semibold text-text-secondary group-hover:text-text-primary transition-colors whitespace-nowrap">
          {tech.name}
        </span>
      </div>
    ),
  }));

  return (
    <ScrollFloatReveal
      as="section"
      y={REVEAL_CONFIG.translateY}
      duration={MOTION_DURATION.medium}
      className="py-8 sm:py-12 border-y border-border/40 bg-background/50 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 mb-6 sm:mb-8 text-center">
        <p className="text-xs sm:text-sm font-medium text-text-secondary uppercase tracking-wider">
          Powered by Modern Technologies
        </p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent" />
        
        <LogoLoop
          logos={logoItems}
          speed={isMobile ? 30 : 40}
          direction="left"
          pauseOnHover={true}
          logoHeight={isMobile ? 36 : 48}
          gap={isMobile ? 12 : 16}
          colorMode="brand"
        />
      </div>
    </ScrollFloatReveal>
  );
}
