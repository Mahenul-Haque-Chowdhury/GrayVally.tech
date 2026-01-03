"use client";

import { useState, useEffect } from "react";
import LogoLoop from "./LogoLoop";
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
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiTailwindcss, name: "Tailwind CSS" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiAmazon, name: "AWS" },
  { icon: SiFigma, name: "Figma" },
  { icon: SiAdobeaftereffects, name: "After Effects" },
  { icon: SiAdobepremierepro, name: "Premiere Pro" },
  { icon: SiLaravel, name: "Laravel" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiGoogleanalytics, name: "Google Analytics" },
  { icon: SiGooglesearchconsole, name: "Search Console" },
  { icon: SiGoogletagmanager, name: "Tag Manager" },
  { icon: SiLinkedin, name: "LinkedIn Ads" },
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
        <tech.icon className="h-5 w-5 sm:h-6 sm:w-6 text-text-secondary group-hover:text-blue-400 transition-colors" />
        <span className="text-xs sm:text-sm font-semibold text-text-secondary group-hover:text-text-primary transition-colors whitespace-nowrap">
          {tech.name}
        </span>
      </div>
    ),
  }));

  return (
    <section className="py-8 sm:py-12 border-y border-border/40 bg-background/50 backdrop-blur-sm">
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
        />
      </div>
    </section>
  );
}
