"use client";

import { useState } from "react";
import Image from "next/image";

// Team member type
interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image?: string;
  links?: {
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

// Team members data - Add your team members here
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Mahenul Haque Chowdhury",
    role: "CEO & Lead Engineer",
    bio: "Leads strategy and ships end-to-end web products with a focus on performance, security, and reliability.",
    image: "/mahenul-haque-chowdhury-grayvally-ceo.png",
    links: {
      website: "https://arnob.life",
    },
  },
  {
    id: 2,
    name: "Mahin Mize",
    role: "Client Manager",
    bio: "Your day-to-day point of contact. Keeps communication clear, requirements aligned, and delivery moving smoothly.",
    image: "/ClientManager.jpeg",
    links: {
      website: "https://example.com",
    },
  },
  {
    id: 3,
    name: "Shafin Al Rahi",
    role: "Head of Marketing",
    bio: "Owns growth and brand. Plans campaigns, messaging, and positioning to reach the right customers.",
    image: "/HeadofMarketting.jpeg",
    links: {
      website: "https://example.com",
    },
  },
  {
    id: 4,
    name: "Riffat Tonmoy",
    role: "Head of Business",
    bio: "Drives business strategy and partnerships. Focuses on sustainable growth, and market expansion.",
    image: "/riffattonmoy.jpg",
    links: {
      website: "https://riffattonmoy.online/",
    },
  },
  {
    id: 5,
    name: "Sumaiya Tanzin",
    role: "Front-End Developer",
    bio: "Builds clean, responsive UI with attention to accessibility, motion, and polished user experience.",
    links: {
      website: "https://example.com",
    },
  },
];

interface AboutProps {
  showOnlyPreview?: boolean; // when true, show limited team + CTA
}

export function About({ showOnlyPreview = false }: AboutProps) {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* About Section */}
        <div className="grid gap-8 sm:gap-10 md:gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              About GrayVally
            </h2>
            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary">
              <p>
                Founded by{" "}
                <a
                  href="https://arnob.life"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors underline underline-offset-4"
                >
                  Mahenul Haque Chowdhury
                </a>
                , GrayVally is a software company specializing in digital infrastructure and modern web solutions.
                We don&apos;t just write code; we architect the systems that power your business.
              </p>
              <p>
                We believe in &quot;boring&quot; infrastructure. The best systems are the ones you don&apos;t
                have to think about. They just work, scale, and remain secure. We bring
                enterprise-grade engineering to agile teams.
              </p>
              <div className="pt-3">
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/70 bg-blue-500/5 px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors"
                >
                  <span>Learn more about us</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="relative order-first md:order-last">
            <div className="aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto overflow-hidden rounded-lg border border-border/50 bg-surface/50">
              <div className="relative h-full w-full">
                <Image
                  src="/company.png"
                  alt="GrayVally company"
                  fill
                  sizes="(min-width: 768px) 28rem, (min-width: 640px) 24rem, 20rem"
                  className="object-cover"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/10 via-transparent to-background/5" />
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div id="team" className="mt-20 sm:mt-28 md:mt-36">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
              Meet Our Team
            </h3>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-text-secondary/80 max-w-2xl mx-auto">
              The talented people behind GrayVally who make the magic happen.
            </p>
            {showOnlyPreview && (
              <div className="mt-5 flex justify-center">
                <a
                  href="/about#team"
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/40 px-4 py-2 text-xs sm:text-sm font-medium text-text-secondary hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                  <span>Meet our full team</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {(showOnlyPreview ? teamMembers.slice(0, 4) : teamMembers).map((member) => (
              <div
                key={member.id}
                className="group relative flex flex-col rounded-2xl border border-border/30 bg-gradient-to-b from-surface/60 to-surface/20 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative flex flex-col flex-1 p-6 sm:p-8">
                  {/* Avatar */}
                  <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 mb-6">
                    {/* Gradient border ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-[3px] rounded-full bg-surface" />
                    
                    {/* Image container */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-transparent">
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(min-width: 640px) 128px, 112px"
                            quality={95}
                            className="object-cover object-center rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                            <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent">
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Animated outer ring */}
                    <div
                      className={`absolute -inset-2 rounded-full border-2 border-blue-400/60 transition-all duration-500 ${
                        hoveredMember === member.id ? "scale-110 opacity-100 animate-pulse" : "scale-100 opacity-0"
                      }`}
                    />
                    {/* Decorative dots */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-3 flex-1 flex flex-col">
                    <h4 className="text-sm sm:text-base lg:text-[15px] font-bold text-text-primary group-hover:text-blue-400 transition-colors duration-300 text-balance">
                      {member.name}
                    </h4>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mx-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-xs sm:text-sm font-semibold text-blue-500 dark:text-blue-400">{member.role}</span>
                    </div>
                    <p className="text-sm text-text-secondary/90 leading-relaxed pt-2 flex-1">
                      {member.bio}
                    </p>
                  </div>

                  {/* Portfolio Link */}
                  <div className="flex justify-center gap-4 mt-auto pt-5 border-t border-border/20">
                    {member.links?.website && (
                      <a
                        href={member.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link relative p-2 rounded-full bg-surface/50 border border-border/30 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300"
                        aria-label={`${member.name}'s website`}
                      >
                        <svg className="w-5 h-5 text-text-secondary/70 group-hover/link:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </a>
                    )}
                    {member.links?.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link relative p-2 rounded-full bg-surface/50 border border-border/30 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <svg className="w-5 h-5 text-text-secondary/70 group-hover/link:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {member.links?.github && (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link relative p-2 rounded-full bg-surface/50 border border-border/30 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <svg className="w-5 h-5 text-text-secondary/70 group-hover/link:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {member.links?.twitter && (
                      <a
                        href={member.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link relative p-2 rounded-full bg-surface/50 border border-border/30 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <svg className="w-5 h-5 text-text-secondary/70 group-hover/link:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
