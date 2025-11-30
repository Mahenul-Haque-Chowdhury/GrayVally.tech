"use client";

import { motion } from "framer-motion";
import Hyperspeed, { hyperspeedPresets } from "./Hyperspeed";
import LogoLoop from "./LogoLoop";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 md:pt-16">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed effectOptions={hyperspeedPresets.one} />
      </div>
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--hero-overlay-from), var(--hero-overlay-via), var(--hero-overlay-to))",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="mx-auto max-w-4xl text-balance font-display text-3xl font-bold tracking-tight text-text-primary xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
            Digital Infrastructure <br />
            <span className="text-text-secondary">Architects.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 sm:mt-8 max-w-2xl text-sm sm:text-base md:text-lg text-text-secondary lg:text-xl px-2"
        >
          We design and build resilient, cloud-native systems for companies that
          demand precision, scalability, and zero downtime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-6 sm:gap-10"
        >
          <div className="flex flex-col items-center gap-1 sm:gap-2 px-3 sm:pr-6">
            <span className="font-mono text-xl sm:text-2xl font-bold text-text-primary">99.99%</span>
            <span className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider">Uptime</span>
          </div>
          <div className="flex flex-col items-center gap-1 sm:gap-2 px-3 sm:pr-6">
            <span className="font-mono text-xl sm:text-2xl font-bold text-text-primary">Global</span>
            <span className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider">Reach</span>
          </div>
          <div className="flex flex-col items-center gap-1 sm:gap-2 px-3">
            <span className="font-mono text-xl sm:text-2xl font-bold text-text-primary">24/7</span>
            <span className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider">Support</span>
          </div>
        </motion.div>
        <div className="mt-8 sm:mt-10 flex justify-center px-2">
          <div className="hero-tech-capsule w-full max-w-6xl overflow-hidden rounded-full px-4 sm:px-6 md:px-10 py-3 sm:py-4 text-left">
            <LogoLoop
              logos={[
                {
                  node: <i className="hero-tech-icon devicon-html5-plain" aria-hidden />,
                  title: "HTML5",
                },
                {
                  node: <i className="hero-tech-icon devicon-css3-plain" aria-hidden />,
                  title: "CSS3",
                },
                {
                  node: <i className="hero-tech-icon devicon-javascript-plain" aria-hidden />,
                  title: "JavaScript",
                },
                {
                  node: <i className="hero-tech-icon devicon-react-original" aria-hidden />,
                  title: "React",
                },
                {
                  node: <i className="hero-tech-icon devicon-nextjs-original" aria-hidden />,
                  title: "Next.js",
                },
                {
                  node: <i className="hero-tech-icon devicon-typescript-plain" aria-hidden />,
                  title: "TypeScript",
                },
                {
                  node: <i className="hero-tech-icon devicon-tailwindcss-plain" aria-hidden />,
                  title: "Tailwind",
                },
                {
                  node: <i className="hero-tech-icon devicon-php-plain" aria-hidden />,
                  title: "PHP",
                },
                {
                  node: <i className="hero-tech-icon devicon-laravel-plain" aria-hidden />,
                  title: "Laravel",
                },
                {
                  node: <i className="hero-tech-icon devicon-mysql-plain" aria-hidden />,
                  title: "MySQL",
                },
                {
                  node: <i className="hero-tech-icon devicon-postgresql-plain" aria-hidden />,
                  title: "PostgreSQL",
                },
                {
                  node: <i className="hero-tech-icon devicon-python-plain" aria-hidden />,
                  title: "Python",
                },
                {
                  node: <i className="hero-tech-icon devicon-cplusplus-plain" aria-hidden />,
                  title: "C++",
                },
                {
                  node: <i className="hero-tech-icon devicon-github-original" aria-hidden />,
                  title: "GitHub",
                },
                {
                  node: <i className="hero-tech-icon devicon-git-plain" aria-hidden />,
                  title: "Git",
                },
                {
                  node: <i className="hero-tech-icon devicon-gitlab-plain" aria-hidden />,
                  title: "GitLab",
                },
                {
                  node: <i className="hero-tech-icon devicon-docker-plain" aria-hidden />,
                  title: "Docker",
                },
                {
                  node: <i className="hero-tech-icon devicon-wordpress-plain" aria-hidden />,
                  title: "WordPress",
                },
              ]}
              speed={70}
              direction="left"
              logoHeight={20}
              gap={30}
              hoverSpeed={0}
              fadeOut={false}
              scaleOnHover
              ariaLabel="Core technologies"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
