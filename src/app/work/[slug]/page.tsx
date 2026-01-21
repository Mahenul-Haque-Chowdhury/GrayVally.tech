import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { getProjectBySlug, getProjectSlugs } from "@/data/portfolio";
import { ArrowLeft, ArrowRight, ExternalLink, Lock } from "lucide-react";
import { FloatHeading } from "@/components/ui/ScrollFloat";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study | GrayVally",
      description: "Detailed case study for a GrayVally project.",
    };
  }

  return {
    title: `${project.client} Case Study | GrayVally`,
    description: project.description || project.problem,
    openGraph: {
      title: `${project.client} Case Study | GrayVally`,
      description: project.description || project.problem,
      url: `https://grayvally.tech/work/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.client} Case Study | GrayVally`,
      description: project.description || project.problem,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const caseStudyStacks = [
    {
      label: "Next.js",
      icon: (
        <span className="relative h-6 w-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nextjs-black.svg"
            alt="Next.js"
            className="h-6 w-6 block dark:hidden absolute inset-0"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nextjs-white.svg"
            alt="Next.js"
            className="h-6 w-6 hidden dark:block absolute inset-0"
          />
        </span>
      ),
    },
    {
      label: "React",
      icon: <i className="devicon-react-original colored text-2xl" aria-hidden />,
    },
    {
      label: "Tailwind CSS",
      icon: <i className="devicon-tailwindcss-plain colored text-2xl" aria-hidden />,
    },
    {
      label: "Framer Motion",
      icon: (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="https://cdn.worldvectorlogo.com/logos/framer-motion.svg"
          alt="Framer Motion"
          className="h-6 w-6 dark:invert"
        />
      ),
    },
    {
      label: "Supabase",
      icon: (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="https://supabase.com/dashboard/img/supabase-logo.svg"
          alt="Supabase"
          className="h-6 w-6"
        />
      ),
    },
    {
      label: "Secured HTTPS",
      icon: <Lock className="h-6 w-6 text-emerald-400" aria-hidden="true" />,
    },
  ];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-text-primary transition-colors duration-300">
      <NavBar />
      <main className="pt-24 sm:pt-28 md:pt-32">
        <section className="relative overflow-hidden py-16 sm:py-20 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-background to-background pointer-events-none" />
          <div className="absolute -top-20 left-1/2 h-72 w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-emerald-500/15 blur-[120px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Work
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary">
                  Case Study
                </div>
                <FloatHeading as="h1" className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-text-primary font-display">
                  {project.client}
                </FloatHeading>
                <p className="mt-4 text-text-secondary/90 max-w-2xl">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full border border-border/50 bg-surface/30 px-4 py-1.5 text-xs font-semibold text-text-secondary">
                    {project.clientType}
                  </span>
                  <span className="rounded-full border border-border/50 bg-surface/30 px-4 py-1.5 text-xs font-semibold text-text-secondary">
                    {project.industry}
                  </span>
                  <span className="rounded-full border border-border/50 bg-surface/30 px-4 py-1.5 text-xs font-semibold text-text-secondary">
                    {project.timeline}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary/60">
                    Stacks →
                  </span>
                  {caseStudyStacks.map((stack) => (
                    <span
                      key={stack.label}
                      className="inline-flex items-center justify-center rounded-md bg-surface/30 p-2"
                      aria-label={stack.label}
                      title={stack.label}
                    >
                      {stack.icon}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                    >
                      Visit Website
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/30 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-border/80 hover:bg-surface/50"
                  >
                    Discuss a similar project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-border/40 bg-surface/40 p-6 sm:p-8 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">Business Outcome</p>
                <p className="mt-3 text-xl font-semibold text-text-primary">{project.businessOutcome}</p>
                <div className="mt-6 grid gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">Year</p>
                    <p className="mt-2 text-base font-semibold text-text-primary">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">Project Type</p>
                    <p className="mt-2 text-base font-semibold text-text-primary">{project.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-10">
              <div>
                <FloatHeading as="h2" className="text-2xl sm:text-3xl font-bold text-text-primary font-display">The Problem</FloatHeading>
                <p className="mt-4 text-text-secondary leading-relaxed">{project.problem}</p>
              </div>

              <div>
                <FloatHeading as="h2" className="text-2xl sm:text-3xl font-bold text-text-primary font-display">The Solution</FloatHeading>
                <ul className="mt-4 grid gap-3 text-text-secondary">
                  {project.solution.map((item) => (
                    <li key={item} className="rounded-2xl border border-border/40 bg-surface/30 px-5 py-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <FloatHeading as="h2" className="text-2xl sm:text-3xl font-bold text-text-primary font-display">Key Features</FloatHeading>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-text-secondary">
                  {project.keyFeatures.map((feature) => (
                    <li key={feature} className="rounded-2xl border border-border/40 bg-background/40 px-5 py-4">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <FloatHeading as="h2" className="text-2xl sm:text-3xl font-bold text-text-primary font-display">Technical Depth</FloatHeading>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {project.technicalDepth.map((section) => (
                    <div key={section.title} className="rounded-2xl border border-border/40 bg-surface/30 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/70">{section.title}</p>
                      <p className="mt-3 text-sm text-text-secondary/90 leading-relaxed">{section.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <FloatHeading as="h2" className="text-2xl sm:text-3xl font-bold text-text-primary font-display">Outcome / Value</FloatHeading>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-text-secondary">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="rounded-2xl border border-border/40 bg-background/40 px-5 py-4">
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <FloatHeading as="h2" className="text-2xl sm:text-3xl font-bold text-text-primary font-display">Screens / Preview</FloatHeading>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {project.gallery.map((image) => (
                      <div
                        key={image}
                        className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/40 bg-surface/30"
                      >
                        <Image src={image} alt={project.client} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

