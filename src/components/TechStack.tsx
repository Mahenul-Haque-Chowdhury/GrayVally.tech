"use client";
import { useMemo } from "react";
import ScrollVelocity from "./ScrollVelocity";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/Section";
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
  const heroTechStackIcons = useMemo(
    () =>
      (
        <span className="inline-flex items-center gap-8 sm:gap-9">
          <i className="hero-tech-icon devicon-html5-plain colored text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-css3-plain colored text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-javascript-plain colored text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-react-original colored text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-nextjs-original text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-typescript-plain colored text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-tailwindcss-plain colored text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-php-plain colored text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-laravel-plain colored text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-mysql-plain colored text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-postgresql-plain colored text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-python-plain colored text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-docker-plain colored text-[34px] sm:text-[40px]" aria-hidden />
          <i className="hero-tech-icon devicon-git-plain colored text-[34px] sm:text-[40px]" aria-hidden />
        </span>
      ),
    []
  );

  const heroTechStackWithNames = useMemo(
    () => (
      <span className="inline-flex items-center gap-8 sm:gap-9">
        {techStack.map((tech) => (
          <span key={tech.name} className="inline-flex items-center gap-2">
            <tech.icon className="h-8 w-8 sm:h-9 sm:w-9" style={{ color: tech.color }} aria-hidden />
            <span className="text-xl sm:text-2xl font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
              {tech.name}
            </span>
          </span>
        ))}
      </span>
    ),
    []
  );

  return (
    <Section
      className="relative z-0 py-8 sm:py-12 bg-background/50 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 mb-6 sm:mb-8 text-center">
        <Reveal as="div" variant="bodyText">
          <ScrollVelocity
            texts={[heroTechStackIcons, heroTechStackWithNames]}
            velocity={28}
            className="px-6 sm:px-8"
            scrollerClassName="text-xl sm:text-2xl md:text-3xl font-semibold text-text-secondary uppercase tracking-wider"
            parallaxClassName="py-0.5 sm:py-1"
          />
        </Reveal>
      </div>
    </Section>
  );
}
