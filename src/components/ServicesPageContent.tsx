"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { allServices } from "../data/services";
import { ArrowLeft, ArrowRight, X, LucideIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// Premium Web Solutions Page with Softvence-style Overlay Modal
// - Full-screen blur overlay on service click
// - Detailed service information
// - Smooth animations
// ============================================================================

// Extended service details for the modal
const serviceDetails: Record<string, {
  tagline: string;
  features: string[];
  technologies?: string[];
  process?: string[];
}> = {
  "01": {
    tagline: "Complete web builds that launch fast, scale securely, and convert globally",
    features: [
      "Discovery, requirements, and stakeholder alignment",
      "Information architecture & user journey mapping",
      "UI/UX design, wireframes, and high‑fidelity prototypes",
      "Responsive front-end engineering (mobile, tablet, desktop)",
      "Back-end services, APIs, and database integration",
      "CMS or admin dashboard setup (content & workflows)",
      "Authentication, roles, and security hardening",
      "Performance optimization, caching, and image strategy",
      "Technical SEO, metadata, and accessibility compliance",
      "Analytics, event tracking, and conversion reporting",
      "Automated testing, QA, and cross‑browser validation",
      "Deployment, CI/CD, monitoring, and documentation",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Vercel",
      "AWS",
      "Cloudflare",
      "Framer Motion",
    ],
    process: [
      "Discovery & Scope",
      "UX/UI Design",
      "Architecture & Planning",
      "Front-End & Back-End Development",
      "QA & Performance",
      "Launch & Monitoring",
      "Ongoing Optimization",
    ],
  },
  "02": {
    tagline: "Design systems and experiences that build trust and drive conversion",
    features: [
      "User research and stakeholder workshops",
      "Persona definition and journey mapping",
      "Wireframes, flows, and clickable prototypes",
      "Design system with components & tokens",
      "Mobile-first and accessibility‑first layouts",
      "Conversion-focused UI patterns",
      "Usability testing and iteration cycles",
      "Developer-ready handoff specs",
    ],
    technologies: ["Figma", "FigJam", "Adobe XD", "Framer", "Notion"],
    process: ["Research", "Wireframes", "Design System", "Prototyping", "Validation", "Handoff"],
  },
  "03": {
    tagline: "Fast, accessible front-end delivery engineered for scale",
    features: [
      "Component-driven architecture",
      "Pixel-perfect UI implementation",
      "Advanced animations and micro‑interactions",
      "Performance budgets & Core Web Vitals",
      "State management & data fetching patterns",
      "Accessibility and keyboard navigation",
      "Reusable UI library for long-term maintainability",
    ],
    technologies: ["React", "Next.js", "TypeScript", "GSAP", "Framer Motion", "Storybook"],
    process: ["Architecture", "Component Build", "Integration", "Optimization", "Testing"],
  },
  "04": {
    tagline: "Secure, resilient back-end systems built for enterprise traffic",
    features: [
      "API design (REST/GraphQL) with documentation",
      "Business logic & workflow orchestration",
      "Authentication, authorization, and RBAC",
      "Payments, billing, and third‑party integrations",
      "Scalable deployment and infrastructure automation",
      "Database schema design and optimization",
      "Monitoring, logging, and alerting",
    ],
    technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS"],
    process: ["Requirements", "System Design", "Development", "Security Review", "Testing", "Deployment"],
  },
  "05": {
    tagline: "Revenue-ready commerce ecosystems optimized for conversion",
    features: [
      "Product catalog architecture and merchandising",
      "Checkout flow optimization and payment gateways",
      "Shipping, taxes, and multi‑currency setup",
      "Inventory, promotions, and discount logic",
      "Customer accounts and order management",
      "Performance, SEO, and analytics instrumentation",
      "Fraud protection and security checks",
    ],
    technologies: ["Shopify", "WooCommerce", "Stripe", "Next.js Commerce", "Saleor", "Algolia"],
    process: ["Commerce Strategy", "UX Design", "Build & Integrations", "QA", "Launch & Growth"],
  },
  "06": {
    tagline: "Stable, secure data platforms that keep business systems healthy",
    features: [
      "Database architecture and schema design",
      "Performance tuning and indexing strategy",
      "Backup policies and disaster recovery",
      "Server provisioning, scaling, and patching",
      "Replication and high availability setup",
      "Monitoring, alerts, and capacity planning",
    ],
    technologies: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS RDS", "Docker", "Grafana"],
    process: ["Assessment", "Design", "Implementation", "Optimization", "Monitoring"],
  },
  "07": {
    tagline: "Proactive maintenance that protects uptime and user trust",
    features: [
      "Critical bug triage and rapid fixes",
      "Performance diagnostics and remediation",
      "Cross-browser and device compatibility",
      "Security patching and dependency updates",
      "Monitoring, alerts, and uptime reporting",
      "SLA-based support and routine health checks",
    ],
    technologies: ["Sentry", "Datadog", "Lighthouse", "Jest", "Playwright", "Dependabot"],
    process: ["Audit", "Prioritization", "Fix & Validate", "Release", "Ongoing Monitoring"],
  },
  "08": {
    tagline: "Mobile applications engineered for performance and adoption",
    features: [
      "Native iOS and Android delivery",
      "Cross‑platform builds with shared code",
      "API integration and real-time sync",
      "Push notifications and app analytics",
      "App Store and Play Store compliance",
      "Ongoing updates and performance tuning",
    ],
    technologies: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "App Store Connect"],
    process: ["Discovery", "UX/UI", "Development", "QA", "Store Submission", "Iteration"],
  },
  "09": {
    tagline: "Automation and custom systems built around your operations",
    features: [
      "Business process mapping and automation",
      "Custom software and internal tooling",
      "CRM/ERP workflow alignment",
      "AI and ML integrations where valuable",
      "Secure API integrations and data pipelines",
      "Legacy modernization and system consolidation",
    ],
    technologies: ["Python", "Node.js", "OpenAI", "Zapier", "n8n", "PostgreSQL"],
    process: ["Discovery", "Solution Design", "Build", "Integration", "Enablement"],
  },
  "11": {
    tagline: "Search visibility and growth strategy that compounds",
    features: [
      "Technical SEO audits and fixes",
      "On‑page optimization and content planning",
      "Structured data and schema markup",
      "Performance and Core Web Vitals improvements",
      "Paid search and social campaign setup",
      "Analytics dashboards and KPI tracking",
    ],
    technologies: ["Google Analytics", "Search Console", "Ahrefs", "SEMrush", "Meta Ads", "Tag Manager"],
    process: ["Audit", "Roadmap", "Implementation", "Campaigns", "Optimization"],
  },
  "12": {
    tagline: "Senior guidance that aligns technology with business outcomes",
    features: [
      "Technical discovery and risk assessment",
      "Architecture planning and scalability review",
      "Stack selection and vendor evaluation",
      "Delivery roadmap and milestone planning",
      "Cost optimization and operational readiness",
      "Ongoing advisory and governance support",
    ],
    technologies: ["Miro", "Notion", "Jira", "AWS", "Azure", "GCP"],
    process: ["Assessment", "Strategy", "Roadmap", "Execution Support", "Review"],
  },
};

// Stagger animation variants for content
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
};

const serviceGradients: Record<string, string> = {
  Development: "from-blue-500 to-cyan-500",
  Design: "from-rose-500 to-orange-500",
  Solutions: "from-emerald-500 to-teal-500",
  Support: "from-amber-500 to-orange-500",
  Growth: "from-sky-500 to-blue-500",
};

const getServiceGradient = (category: string) =>
  serviceGradients[category] ?? "from-slate-500 to-slate-600";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
}

interface WebSolutionItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  includes?: string;
}

const webSolutionsServices: WebSolutionItem[] = [
  {
    id: "01",
    title: "Web Development",
    description:
      "End-to-end web delivery for modern businesses from strategy to launch with secure, scalable, and high-performing builds.",
    includes: "Includes UI/UX Design, Front-End Development, Back-End Development.",
    image: "/web-development-services.png",
    imageAlt: "Enterprise web development service visual",
  },
  {
    id: "05",
    title: "E-Commerce Solutions",
    description:
      "Conversion-optimized storefronts with secure payments, inventory workflows, and scalable architecture for global sales.",
    image: "/ecommerce-solutions.png",
    imageAlt: "Professional e-commerce solutions dashboard visual",
  },
  {
    id: "06",
    title: "Database & Server Management",
    description:
      "Reliable infrastructure with optimized databases, backups, monitoring, and performance tuning to keep systems fast and secure.",
    image: "/database-server-management.png",
    imageAlt: "Database and server management infrastructure visual",
  },
  {
    id: "07",
    title: "Bug Fixing & Maintenance",
    description:
      "Rapid issue resolution, stability improvements, and ongoing maintenance that protects uptime and customer trust.",
    image: "/bug-fixing-maintenance.png",
    imageAlt: "Bug fixing and maintenance workflow visual",
  },
  {
    id: "08",
    title: "Mobile App Development",
    description:
      "Cross-platform and native mobile apps with seamless API integrations, push notifications, and app-store readiness.",
    image: "/mobile-app-development.png",
    imageAlt: "Mobile app development service visual",
  },
  {
    id: "09",
    title: "Custom Software & Automation",
    description:
      "Tailor-made business software and workflow automation that reduces manual work and unlocks operational efficiency.",
    image: "/custom-software-automation.png",
    imageAlt: "Custom software and automation systems visual",
  },
  {
    id: "11",
    title: "SEO & Digital Marketing",
    description:
      "Technical SEO and growth campaigns that improve visibility, traffic quality, and measurable ROI.",
    image: "/seo-digital-marketing.png",
    imageAlt: "SEO and digital marketing analytics visual",
  },
  {
    id: "12",
    title: "Tech Consultancy",
    description:
      "Senior advisory for architecture, tooling, and delivery strategy to de-risk launches and scale with confidence.",
    image: "/tech-consultancy.png",
    imageAlt: "Technology consultancy and strategy session visual",
  },
];

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
  clickPosition: { x: number; y: number };
}

function ServiceModal({ service, onClose, clickPosition }: ServiceModalProps) {
  const Icon = service.icon;
  const details = serviceDetails[service.id] || {
    tagline: "Professional solutions for your business",
    features: service.description.split(", "),
  };
  const gradient = getServiceGradient(service.category);

  const scrollRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      // Scroll to top on mobile when modal opens
      node.scrollTop = 0;
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1920, 
    height: typeof window !== 'undefined' ? window.innerHeight : 1080 
  });

  // Calculate max radius from click position to cover entire screen
  const maxRadius = useMemo(() => {
    return Math.hypot(
      Math.max(clickPosition.x, windowSize.width - clickPosition.x),
      Math.max(clickPosition.y, windowSize.height - clickPosition.y)
    ) * 1.5;
  }, [clickPosition.x, clickPosition.y, windowSize.width, windowSize.height]);

  useEffect(() => {
    // Trigger open animation
    const timer = requestAnimationFrame(() => setIsOpen(true));

    // Stop Lenis smooth scroll when modal is open
    const lenis = (window as Window & { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (lenis) {
      lenis.stop();
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(timer);
      window.removeEventListener("resize", handleResize);
      // Re-enable Lenis when modal closes
      if (lenis) {
        lenis.start();
      }
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 500); // Wait for animation to complete
  };

  // Prevent wheel events from propagating to background
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={false}
      animate={{
        clipPath: isOpen
          ? `circle(${maxRadius}px at ${clickPosition.x}px ${clickPosition.y}px)`
          : `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
      }}
      transition={{
        type: "spring",
        stiffness: isOpen ? 20 : 300,
        damping: isOpen ? 10 : 40,
      }}
      className="fixed inset-0 z-[100] bg-background/10 backdrop-blur-lg"
      onWheel={handleWheel}
    >
      {/* Glassmorphism gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/5 via-transparent to-surface/5 pointer-events-none" />
      
      {/* Scrollable container - this handles the scroll */}
      <div 
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch]"
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        onWheel={handleWheel}
      >
        {/* Close Button - Fixed position with safe area for mobile */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClose}
          className="fixed top-[max(1rem,env(safe-area-inset-top))] right-4 sm:top-8 sm:right-8 z-[110] flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-surface/80 sm:bg-surface/50 backdrop-blur-xl border border-border/50 text-text-primary shadow-2xl transition-all duration-300 hover:bg-surface/80 hover:scale-110"
        >
          <X className="h-5 w-5 sm:h-7 sm:w-7" />
        </motion.button>

        {/* Full Screen Content Container */}
        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          className="min-h-full flex flex-col"
        >
          {/* Header - Modern centered layout */}
          <div className="pt-14 sm:pt-20 pb-6 sm:pb-12 px-4 sm:px-8 md:px-16 lg:px-24">
            <div className="max-w-4xl mx-auto text-center">
              {/* Icon with category badge inline */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-4 mb-8 sm:mb-10"
              >
                <div className={cn(
                  "flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br",
                  gradient
                )}>
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <span className={cn(
                  "rounded-full px-5 py-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-white bg-gradient-to-r",
                  gradient
                )}>
                  {service.category}
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.1]"
              >
                {service.title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-text-secondary/80 leading-relaxed max-w-2xl mx-auto font-light"
              >
                {details.tagline}
              </motion.p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 sm:px-8 md:px-16 lg:px-24 pb-12 sm:pb-16">
            <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
              {/* Features */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-lg sm:text-xl font-medium text-text-secondary mb-5 sm:mb-6 text-center uppercase tracking-widest">
                  What&apos;s Included
                </h3>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {details.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={staggerItem}
                      className="flex items-center gap-3 p-4 sm:p-5 rounded-xl bg-surface/30 backdrop-blur-sm border border-border/30 hover:bg-surface/50 hover:border-border/50 transition-all duration-300"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-text-primary font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Technologies */}
              {details.technologies && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <h3 className="text-lg sm:text-xl font-medium text-text-secondary mb-5 sm:mb-6 uppercase tracking-widest">
                    Technologies We Use
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    {details.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-surface/30 backdrop-blur-sm border border-border/30 text-sm font-medium text-text-primary hover:bg-surface/50 hover:border-border/50 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Process */}
              {details.process && details.process.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <h3 className="text-lg sm:text-xl font-medium text-text-secondary mb-5 sm:mb-6 uppercase tracking-widest">
                    Our Process
                  </h3>
                  <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
                    {details.process.map((step, index, arr) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-3 sm:gap-4"
                      >
                        <div className="flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-surface/30 backdrop-blur-sm border border-border/30 hover:bg-surface/50 transition-all duration-300">
                          <span className={cn(
                            "flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r",
                            gradient
                          )}>
                            {index + 1}
                          </span>
                          <span className="text-sm sm:text-base font-medium text-text-primary">{step}</span>
                        </div>
                        {index < arr.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-text-secondary/30 hidden md:block" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA */}
              <motion.div
                variants={itemVariants}
                className="pt-8 sm:pt-10 text-center"
              >
                <Link
                  href="/contact"
                  className={cn(
                    "group inline-flex items-center justify-center gap-3 rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r",
                    gradient
                  )}
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="mt-3 text-sm text-text-secondary/60">
                  Free consultation • No commitment
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface ServiceRowProps {
  item: WebSolutionItem;
  index: number;
  service?: Service;
  onLearnMore: (event: React.MouseEvent) => void;
}

function ServiceRow({ item, index, service, onLearnMore }: ServiceRowProps) {
  const isOdd = index % 2 === 0;
  const buttonLabel = service?.title ?? item.title;
  const Icon = service?.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl bg-surface/20 shadow-sm backdrop-blur-sm"
    >
      <div className="grid gap-8 md:grid-cols-2 items-center p-6 sm:p-8 lg:p-10">
        <div
          className={cn(
            "order-1",
            isOdd ? "md:order-2" : "md:order-1"
          )}
        >
          <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-surface/30 shadow-sm">
            <Image
              src={item.image}
              alt={item.imageAlt}
              width={1200}
              height={800}
              className="h-72 w-full object-cover sm:h-96 md:h-[420px]"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-surface/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-6 py-2.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-500/30 ring-1 ring-white/30 backdrop-blur-sm transition-all duration-200 hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110"
              >
                Get free consultation
              </Link>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "order-2",
            isOdd ? "md:order-1" : "md:order-2"
          )}
        >
          <h3 className="flex items-center gap-3 text-3xl sm:text-4xl font-semibold text-text-primary">
            {Icon && (
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/40 bg-surface/40">
                <Icon className="h-5 w-5 text-blue-400" />
              </span>
            )}
            <span>{item.title}</span>
          </h3>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            {item.description}
          </p>
          {item.includes && (
            <p className="mt-3 text-sm text-text-secondary/80">
              <span className="font-semibold text-text-primary">Includes:</span> {item.includes}
            </p>
          )}
          <div className="mt-6">
            <button
              type="button"
              onClick={onLearnMore}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/40 px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-blue-500/60 hover:bg-surface/50"
              aria-label={`Learn more about ${buttonLabel}`}
            >
              <span>Learn more</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ServicesPageContent() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleServiceClick = useCallback((service: Service, event: React.MouseEvent) => {
    // Get click position for the circular reveal
    setClickPosition({ x: event.clientX, y: event.clientY });
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedService(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      <main className="min-h-screen bg-background transition-colors duration-300">
        {/* Page Introduction */}
        <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-background to-background pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8 group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </motion.div>

            <motion.header
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                  Our Web Solutions
                </span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                A well-structured, scalable web solution cuts costs, avoids growth bottlenecks, and struggling measurable business results.
              </p>
            </motion.header>
          </div>
        </section>

        {/* Services */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
            <div className="space-y-8 sm:space-y-12">
              {webSolutionsServices.map((item, index) => {
                const service = allServices.find((entry) => entry.id === item.id);
                if (!service) return null;

                return (
                  <ServiceRow
                    key={item.id}
                    item={item}
                    index={index}
                    service={service}
                    onLearnMore={(event) => handleServiceClick(service, event)}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={handleCloseModal}
            clickPosition={clickPosition}
          />
        )}
      </AnimatePresence>
    </>
  );
}
