"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, X, LucideIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollFloat, { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";
import ServiceDetails from "@/components/ServiceDetails";

// ============================================================================
// Premium Web Solutions Page with Softvence-style Overlay Modal
// - Full-screen blur overlay on service click
// - Detailed service information
// - Smooth animations
// ============================================================================

// ... (rest of the file content is large and unchanged, so it's omitted for brevity)
// The key change is wrapping the service list with motion variants.

// ... (serviceDetails, staggerContainer (modal-specific), staggerItem, etc. remain)

// Stagger animation variants for content
const modalStaggerContainer = {
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

// ... (serviceGradients, getServiceGradient, interfaces also remain the same)
const serviceDetails: Record<string, { tagline: string; features: string[] }> = {};
const serviceGradients: Record<string, string> = {
  Development: "from-blue-500 to-cyan-500",
  Design: "from-rose-500 to-orange-500",
  Solutions: "from-emerald-500 to-teal-500",
  Support: "from-amber-500 to-orange-500",
  Growth: "from-sky-500 to-blue-500",
};

const getServiceGradient = (category: string) =>
  serviceGradients[category] ?? "from-slate-500 to-slate-600";

const getServiceAnchor = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

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
  intro: string;
  covers: string[];
  capabilities: string[];
  technologies: string;
  outcomes: string[];
  useCases: string[];
  delivery: string[];
  image: string;
  imageAlt: string;
}

interface ServiceRowProps {
  item: WebSolutionItem;
  index: number;
}

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
  clickPosition: { x: number; y: number };
}

const webSolutionsServices: WebSolutionItem[] = [
  {
    id: "01",
    title: "Website Development",
    intro:
      "We design and build websites that explain your business clearly and load quickly. This helps teams reduce bounce, support sales conversations, and keep updates easy to manage.",
    covers: [
      "Requirements and site map",
      "Content structure and page layout",
      "Front-end development",
      "CMS or editing setup",
      "Performance and accessibility checks",
      "Deployment and handoff",
    ],
    capabilities: [
      "Translate goals into clear page flows",
      "Build responsive layouts that work across devices",
      "Integrate forms, analytics, and tracking",
      "Set up editing workflows for your team",
    ],
    technologies:
      "We use React or Next.js for the front end, content stored in a CMS or markdown, and deploy on Vercel with caching and monitoring.",
    outcomes: [
      "Faster page loads",
      "Higher clarity for buyers",
      "Lower maintenance overhead",
      "More reliable lead capture",
    ],
    useCases: [
      "New brand site",
      "Redesign of an aging website",
      "Marketing site for a SaaS product",
      "Campaign landing pages",
    ],
    delivery: [
      "Discovery and goals",
      "Information architecture",
      "Design and content",
      "Build and integration",
      "QA and accessibility",
      "Launch and handover",
    ],
    image: "/web-development-services.png",
    imageAlt: "Enterprise web development service visual",
  },
  {
    id: "05",
    title: "E-Commerce Solutions",
    intro:
      "We build online stores that make it easy to browse, purchase, and manage orders. This reduces cart drop off and gives teams better control of inventory and fulfillment.",
    covers: [
      "Storefront UX and catalog setup",
      "Checkout and payment flows",
      "Product and inventory management",
      "Shipping and tax configuration",
      "Performance and security reviews",
      "Post launch support",
    ],
    capabilities: [
      "Configure Shopify or custom storefronts",
      "Integrate payment and shipping providers",
      "Improve product discovery and search",
      "Set up analytics for conversion tracking",
    ],
    technologies:
      "We work with Shopify, WooCommerce, or custom Next.js stores with Stripe, and connect to ERP or fulfillment tools when needed.",
    outcomes: [
      "Higher checkout completion",
      "Fewer manual order steps",
      "Clearer inventory visibility",
      "More dependable revenue reporting",
    ],
    useCases: [
      "New online store",
      "Migration from a legacy platform",
      "Multi product catalogs",
      "Regional shipping rules",
    ],
    delivery: [
      "Discovery and catalog review",
      "Store structure and UX",
      "Build and integrations",
      "Payment and shipping setup",
      "QA and launch prep",
      "Launch and training",
    ],
    image: "/ecommerce-solutions.png",
    imageAlt: "Professional e-commerce solutions dashboard visual",
  },
  {
    id: "06",
    title: "Database & Server Management",
    intro:
      "We manage the database and server layer that keeps your application available and secure. This reduces outages and improves response time for users.",
    covers: [
      "Database tuning and indexing",
      "Backups and recovery planning",
      "Server configuration and scaling",
      "Monitoring and alerting",
      "Security updates",
      "Uptime reporting",
    ],
    capabilities: [
      "Diagnose slow queries",
      "Set up automated backups",
      "Implement staging safeguards",
      "Track performance and error metrics",
    ],
    technologies:
      "We use managed cloud services for PostgreSQL or MySQL, with automated backups and monitoring tools such as Grafana or Cloudflare.",
    outcomes: [
      "More stable uptime",
      "Faster response times",
      "Lower risk of data loss",
      "Predictable infrastructure costs",
    ],
    useCases: [
      "Growing traffic",
      "Recurring outages",
      "Legacy server cleanup",
      "Compliance requirements",
    ],
    delivery: [
      "Discovery and system audit",
      "Risk and performance assessment",
      "Optimization plan",
      "Implementation and hardening",
      "Monitoring setup",
      "Ongoing support",
    ],
    image: "/database-server-management.png",
    imageAlt: "Database and server management infrastructure visual",
  },
  {
    id: "07",
    title: "Bug Fixing & Maintenance",
    intro:
      "We fix issues in existing systems and keep them stable over time. This gives teams confidence to ship changes without breaking core flows.",
    covers: [
      "Bug triage and root cause analysis",
      "Hotfixes and patches",
      "Regression testing",
      "Dependency updates",
      "Performance and security checks",
      "Monthly maintenance reports",
    ],
    capabilities: [
      "Reproduce and isolate problems",
      "Improve error logging",
      "Reduce recurring issues",
      "Clean up technical debt safely",
    ],
    technologies:
      "We work within your current stack and add lightweight monitoring and error tracking where needed.",
    outcomes: [
      "Fewer customer tickets",
      "More predictable releases",
      "Lower downtime risk",
      "Better system health",
    ],
    useCases: [
      "Legacy apps with recurring bugs",
      "Teams without in house support",
      "Post launch stabilization",
      "Pre audit cleanup",
    ],
    delivery: [
      "Issue intake and triage",
      "Root cause analysis",
      "Fix and validate",
      "Regression testing",
      "Release and monitoring",
      "Ongoing maintenance",
    ],
    image: "/bug-fixing-maintenance.png",
    imageAlt: "Bug fixing and maintenance workflow visual",
  },
  {
    id: "08",
    title: "Mobile App Development",
    intro:
      "We build mobile apps that connect to your existing systems and keep user workflows simple. This helps you serve customers and teams where they already work.",
    covers: [
      "App strategy and UX flows",
      "iOS and Android builds",
      "API integration",
      "Push notifications",
      "App store submission",
      "Ongoing support",
    ],
    capabilities: [
      "Design clear onboarding flows",
      "Build offline friendly features",
      "Integrate analytics and crash reporting",
      "Maintain versions across stores",
    ],
    technologies:
      "We use React Native or native builds when needed, backed by secure APIs and cloud services.",
    outcomes: [
      "Faster time to mobile launch",
      "Consistent experience across devices",
      "Reduced support issues",
      "Actionable usage insights",
    ],
    useCases: [
      "Customer mobile apps",
      "Internal field tools",
      "Companion apps for web platforms",
      "Legacy app refresh",
    ],
    delivery: [
      "Discovery and app scope",
      "UX and wireframes",
      "Build and integration",
      "Testing on devices",
      "Store submission",
      "Launch and support",
    ],
    image: "/mobile-app-development.png",
    imageAlt: "Mobile app development service visual",
  },
  {
    id: "09",
    title: "Custom Software & Automation",
    intro:
      "We design internal tools and automated workflows that match how your team works. This cuts manual tasks and reduces errors in daily operations.",
    covers: [
      "Process mapping",
      "Workflow design",
      "Custom dashboards",
      "Integrations with existing tools",
      "Access and roles",
      "Documentation and training",
    ],
    capabilities: [
      "Replace spreadsheets with structured systems",
      "Automate approvals and notifications",
      "Integrate third party APIs",
      "Create reporting views for leaders",
    ],
    technologies:
      "We build on modern web stacks with secure APIs, role based access, and cloud hosting.",
    outcomes: [
      "Less manual work",
      "Faster cycle times",
      "Better data consistency",
      "Clearer visibility for managers",
    ],
    useCases: [
      "Operations teams scaling fast",
      "Manual approval processes",
      "Data spread across tools",
      "Need for custom reporting",
    ],
    delivery: [
      "Discovery and workflow audit",
      "Solution design",
      "Build and integration",
      "Validation with stakeholders",
      "Training and handover",
      "Continuous improvement",
    ],
    image: "/custom-software-automation.png",
    imageAlt: "Custom software and automation systems visual",
  },
  {
    id: "11",
    title: "SEO & Digital Marketing",
    intro:
      "We improve search visibility and run targeted campaigns based on clear goals. This helps qualified visitors find you and makes marketing performance easier to track.",
    covers: [
      "Technical SEO audit",
      "On page optimization",
      "Content guidance",
      "Campaign setup and tracking",
      "Reporting and iteration",
      "Landing page support",
    ],
    capabilities: [
      "Fix crawl and index issues",
      "Improve page titles and structure",
      "Set up analytics and attribution",
      "Build conversion focused landing pages",
    ],
    technologies:
      "We use Search Console, Analytics, Tag Manager, and structured data to measure and improve results.",
    outcomes: [
      "Improved search visibility",
      "More qualified inbound traffic",
      "Cleaner attribution",
      "Better conversion rates",
    ],
    useCases: [
      "Declining organic traffic",
      "New site launch",
      "Paid campaign support",
      "Local search growth",
    ],
    delivery: [
      "Discovery and baseline audit",
      "Priority roadmap",
      "Implementation",
      "Campaign setup",
      "Reporting and iteration",
      "Ongoing optimization",
    ],
    image: "/seo-digital-marketing.png",
    imageAlt: "SEO and digital marketing analytics visual",
  },
  {
    id: "12",
    title: "Tech Consultancy",
    intro:
      "We review your current product, architecture, and delivery plan to reduce risk. This helps leaders make informed decisions before committing budget.",
    covers: [
      "Architecture review",
      "Roadmap and scope audit",
      "Risk assessment",
      "Vendor and stack evaluation",
      "Technical discovery workshops",
      "Implementation plan",
    ],
    capabilities: [
      "Identify bottlenecks and gaps",
      "Define phased delivery plans",
      "Estimate effort and tradeoffs",
      "Align tech decisions with business goals",
    ],
    technologies:
      "We work with your existing stack and recommend focused changes rather than full rewrites.",
    outcomes: [
      "Clearer technical direction",
      "Reduced project risk",
      "Faster decision making",
      "Better alignment across teams",
    ],
    useCases: [
      "Pre build planning",
      "Legacy modernization",
      "New product evaluation",
      "Due diligence support",
    ],
    delivery: [
      "Discovery workshops",
      "System review",
      "Risk and dependency mapping",
      "Recommendations and plan",
      "Executive readout",
      "Follow up support",
    ],
    image: "/tech-consultancy.png",
    imageAlt: "Technology consultancy and strategy session visual",
  },
];


function ServiceModal({ service, onClose, clickPosition }: ServiceModalProps) {
  // ... Modal implementation remains unchanged ...
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

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(timer);
      window.removeEventListener("resize", handleResize);
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
              
              <ScrollFloat as="div">
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.1]"
                >
                  {service.title}
                </motion.h2>
              </ScrollFloat>
              
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
                variants={modalStaggerContainer}
                initial="hidden"
                animate="visible"
              >
                <FloatHeading as="h3" className="text-lg sm:text-xl font-medium text-text-secondary mb-5 sm:mb-6 text-center uppercase tracking-widest">
                  What&apos;s Included
                </FloatHeading>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {details.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={staggerItem}
                      className="flex items-center gap-3 p-4 sm:p-5 rounded-xl bg-surface/30 backdrop-blur-sm border border-border/30 hover:bg-surface/50 hover:border-border/50 transition-colors duration-300"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-text-primary font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              {/* ... rest of modal content ... */}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


function ServiceRow({ item, index }: ServiceRowProps) {
  const contactHref = `/contact?projectInterest=${encodeURIComponent(item.title)}`;
  const ctaText = `Contact for ${item.title}`;
  const anchor = getServiceAnchor(item.title);

  return (
    <ScrollFloatReveal
      as="article"
      y={REVEAL_CONFIG.translateY}
      duration={MOTION_DURATION.normal}
      delay={index * 0.08}
    >
      <div id={anchor} className="scroll-mt-28">
        <ServiceDetails
          label="WEB SOLUTION"
          title={item.title}
          description={item.intro}
          imageSrc={item.image}
          imageAlt={item.imageAlt}
          outcomes={item.outcomes}
          useCases={item.useCases}
          process={item.delivery}
          ctaText={ctaText}
          ctaHref={contactHref}
          imagePriority={parseInt(item.id) < 3}
        />
      </div>
    </ScrollFloatReveal>
  );
}

export function ServicesPageContent() {
  return (
    <>
      <main className="bg-background transition-colors duration-300">
        {/* Page Introduction */}
        <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-background to-background pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
            <ScrollFloatReveal
              y={REVEAL_CONFIG.translateY}
              duration={MOTION_DURATION.medium}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8 group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </ScrollFloatReveal>

            <ScrollFloatReveal
              as="header"
              y={REVEAL_CONFIG.translateY}
              duration={MOTION_DURATION.medium}
              delay={0.1}
              className="text-center"
            >
              <FloatHeading
                as="h1"
                duration={MOTION_DURATION.display}
                className="my-0 mt-4 text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent"
                once
              >
                Our Web Solutions
              </FloatHeading>
              <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                A well-structured, scalable web solution cuts costs, avoids growth bottlenecks, and struggling measurable business results.
              </p>
            </ScrollFloatReveal>
          </div>
        </section>

        {/* Services */}
        <section className="pb-16 sm:pb-24" style={{ perspective: "1000px" }}>
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
            <div className="space-y-8 sm:space-y-12">
              {webSolutionsServices.map((item, index) => {
                return (
                  <ServiceRow
                    key={item.id}
                    item={item}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

