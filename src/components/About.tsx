"use client";

import { useState } from "react";

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
    role: "Founder & CEO",
    bio: "Visionary leader with a passion for building scalable digital infrastructure and empowering businesses through technology.",
    image: "/CEO.jpg",
    links: {
      website: "https://arnob.life",
    },
  },
  {
    id: 2,
    name: "Mahin Mize",
    role: "Project Manager",
    bio: "Keeps projects on schedule, aligns stakeholders, and makes sure every delivery feels calm and well-organized.",
    image: "/ProjectManager.png",
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
                have to think about—they just work, scale, and remain secure. We bring
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
              {/* Abstract graphic */}
              <div className="h-full w-full bg-gradient-to-br from-blue-50/50 to-background dark:from-surfaceHighlight dark:to-background p-8">
                <div className="h-full w-full border-2 border-border/60 rounded-lg flex items-center justify-center">
                  <span className="font-mono text-sm sm:text-base text-text-secondary/70 tracking-wider">EST. 2024</span>
                </div>
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

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(showOnlyPreview ? teamMembers.slice(0, 4) : teamMembers).map((member) => (
              <div
                key={member.id}
                className="group relative bg-white dark:bg-background border border-gray-200 dark:border-border rounded-xl p-6 sm:p-7 transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-blue-500/10"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Avatar */}
                <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 mb-5">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 dark:from-blue-500/20 to-blue-50 dark:to-blue-500/5 border-2 border-blue-200 dark:border-blue-500/30 group-hover:border-blue-400 dark:group-hover:border-blue-400 transition-colors duration-300 flex items-center justify-center overflow-hidden">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl sm:text-3xl font-bold text-blue-400 dark:text-blue-300">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    )}
                  </div>
                  {/* Hover ring effect */}
                  <div
                    className={`absolute inset-0 rounded-full border-2 border-blue-400 dark:border-blue-400 transition-all duration-300 ${
                      hoveredMember === member.id ? "scale-110 opacity-100" : "scale-100 opacity-0"
                    }`}
                  />
                </div>

                {/* Info */}
                <div className="text-center">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">{member.role}</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary mt-3 line-clamp-3">{member.bio}</p>
                </div>

                {/* Social Links */}
                {member.links && (
                  <div className="flex justify-center gap-3 mt-5 pt-4 border-t border-gray-200 dark:border-border">
                    {member.links.website && (
                      <a
                        href={member.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 dark:text-text-secondary hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        aria-label={`${member.name}'s website`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </a>
                    )}
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 dark:text-text-secondary hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {member.links.github && (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 dark:text-text-secondary hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {member.links.twitter && (
                      <a
                        href={member.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 dark:text-text-secondary hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
