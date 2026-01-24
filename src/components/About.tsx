"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/Section";
import { Stagger } from "@/components/motion/Stagger";

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
    name: "Mahin Mashrur Mize",
    role: "Client Manager",
    bio: "Your day-to-day point of contact. Keeps communication clear, requirements aligned, and delivery moving smoothly.",
    image: "/ClientManager.jpeg",
    links: {
      website: "https://mahinmize.vercel.app",
    },
  },
  {
    id: 3,
    name: "Mohammad Shafin Al Rahi",
    role: "Head of Marketing",
    bio: "Owns growth and brand. Plans campaigns, messaging, and positioning to reach the right customers.",
    image: "/HeadofMarketting.jpeg",
    links: {
      website: "https://shafinar.space",
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

const pocketPeekLeftVariant = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const aboutTextContainerVariant = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export function About({ showOnlyPreview = false }: AboutProps) {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [flippedMember, setFlippedMember] = useState<number | null>(null);

  return (
    <Section id="about" className="py-16 sm:py-24 md:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* About Section */}
        <div className="grid gap-8 sm:gap-10 md:gap-12 md:grid-cols-2">
          <div>
            <motion.div
              variants={aboutTextContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative overflow-hidden">
                <motion.h2
                  variants={pocketPeekLeftVariant}
                  className="my-0 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary"
                >
                  {renderGradientTitle("About GrayVally", [1])}
                </motion.h2>
              </div>
              <div className="relative overflow-hidden mt-4 sm:mt-6">
                <motion.p
                  variants={pocketPeekLeftVariant}
                  className="text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary"
                >
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
                </motion.p>
              </div>
              <div className="relative overflow-hidden mt-4 sm:mt-6">
                <motion.p
                  variants={pocketPeekLeftVariant}
                  className="text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary"
                >
                  We believe in &quot;boring&quot; infrastructure. The best systems are the ones you don&apos;t
                  have to think about. They just work, scale, and remain secure. We bring
                  enterprise-grade engineering to agile teams.
                </motion.p>
              </div>
              <div className="relative overflow-hidden pt-3">
                <motion.div variants={pocketPeekLeftVariant}>
                  <a
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full border border-blue-500/70 bg-blue-500/5 px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors"
                  >
                    <span>Learn more about us</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
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
            <Reveal
              as="h3"
              variant="headline"
              className="my-0 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-text-primary"
              gradientWords={[2]}
            >
              Meet Our Team
            </Reveal>
            <Reveal
              as="p"
              variant="bodyText"
              className="mt-3 sm:mt-4 text-sm sm:text-base text-text-secondary/80 max-w-2xl mx-auto"
            >
              The talented people behind GrayVally who make the magic happen.
            </Reveal>
            {showOnlyPreview && (
              <Reveal as="div" variant="bodyText" className="mt-5 flex justify-center">
                <a
                  href="/about#team"
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/40 px-4 py-2 text-xs sm:text-sm font-medium text-text-secondary hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                  <span>Meet our full team</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Reveal>
            )}
          </div>

          <Stagger className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {(showOnlyPreview ? teamMembers.slice(0, 4) : teamMembers).map((member) => (
              <Reveal
                key={member.id}
                variant="cardItem"
                useParent
                className="group relative flex flex-col rounded-2xl bg-gradient-to-b from-surface/40 via-surface/25 to-surface/10 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <button
                  type="button"
                  onClick={() =>
                    setFlippedMember((current) => (current === member.id ? null : member.id))
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setFlippedMember((current) => (current === member.id ? null : member.id));
                    }
                  }}
                  aria-pressed={flippedMember === member.id}
                  className={`absolute inset-0 z-20 cursor-pointer ${
                    flippedMember === member.id ? "pointer-events-none" : ""
                  }`}
                >
                  <span className="sr-only">
                    {flippedMember === member.id ? "Show profile details" : "Show portfolio link"}
                  </span>
                </button>

                <div
                  className="relative z-10 flex flex-1 flex-col [transform-style:preserve-3d] transition-transform duration-500"
                  style={{ transform: flippedMember === member.id ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  <div className="flex h-full flex-col p-6 sm:p-8" style={{ backfaceVisibility: "hidden" }}>
                    <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 mb-6">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-[3px] rounded-full bg-surface" />
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
                      <div
                        className={`absolute -inset-2 rounded-full border-2 border-blue-400/60 transition-all duration-500 ${
                          hoveredMember === member.id ? "scale-110 opacity-100 animate-pulse" : "scale-100 opacity-0"
                        }`}
                      />
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
                    </div>

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
                  </div>

                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 text-center"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    role="button"
                    tabIndex={0}
                    onClick={() => setFlippedMember(null)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setFlippedMember(null);
                      }
                    }}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-text-secondary/70">Portfolio</p>
                    <h4 className="mt-3 text-lg font-semibold text-text-primary text-balance">
                      Visit personal portfolio
                    </h4>
                    <p className="mt-2 text-sm text-text-secondary/80 text-balance">
                      Learn more about {member.name.split(" ")[0]} and recent work.
                    </p>
                    {member.links?.website ? (
                      <a
                        href={member.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-500 dark:text-blue-400 hover:border-blue-500/60 hover:bg-blue-500/15 transition-colors"
                      >
                        Visit portfolio
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M14 5h5v5M10 14l9-9M5 10v9h9" />
                        </svg>
                      </a>
                    ) : null}
                    <span className="mt-4 text-[11px] text-text-secondary/60">Tap to flip back</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
