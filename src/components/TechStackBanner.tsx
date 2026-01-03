"use client";

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

export function TechStackBanner() {
  const logoItems = techStack.map((tech) => ({
    node: (
      <div className="flex items-center gap-3 px-4">
        <tech.icon className="h-5 w-5 text-blue-400" />
        <span className="text-sm font-medium text-text-secondary/80 uppercase tracking-wider whitespace-nowrap">
          {tech.name}
        </span>
        <span className="h-1 w-1 rounded-full bg-blue-500/50 ml-2" />
      </div>
    ),
  }));

  return (
    <div className="relative w-full border-y border-border/40 bg-surface/30 py-3 backdrop-blur-sm">
      <LogoLoop
        logos={logoItems}
        speed={40}
        direction="left"
        pauseOnHover={true}
        logoHeight={24}
        gap={0}
      />
    </div>
  );
}
