"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  X,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  softwareSolutionCategories, 
  SoftwareSolutionCategory 
} from "@/data/softwareSolutions";

// Extended details for each category modal
const categoryDetails: Record<string, { 
  useCases: string[]; 
  technologies: string[]; 
  benefits: string[];
}> = {
  "core-business": {
    useCases: [
      "Multi-location inventory management",
      "Automated payroll and tax filing",
      "Real-time financial reporting",
      "Vendor and supplier management",
      "Customer relationship tracking",
      "Project budget monitoring"
    ],
    technologies: ["SAP", "Oracle", "Microsoft Dynamics", "QuickBooks", "Zoho", "Node.js", "PostgreSQL"],
    benefits: ["Reduce operational costs by 40%", "Automated compliance reporting", "Real-time business insights", "Streamlined workflows"]
  },
  "sales-operations": {
    useCases: [
      "Lead scoring and qualification",
      "Sales pipeline automation",
      "Quote and proposal generation",
      "Territory management",
      "Commission tracking",
      "Customer lifecycle management"
    ],
    technologies: ["Salesforce", "HubSpot", "Pipedrive", "React", "GraphQL", "MongoDB"],
    benefits: ["Increase sales by 30%", "Reduce sales cycle time", "Better lead conversion", "Accurate forecasting"]
  },
  "productivity-tools": {
    useCases: [
      "Cross-team project collaboration",
      "Document versioning and sharing",
      "Meeting scheduling optimization",
      "Task delegation and tracking",
      "Internal knowledge sharing",
      "Remote team coordination"
    ],
    technologies: ["Slack", "Microsoft Teams", "Notion", "Asana", "Monday.com", "WebSocket", "Redis"],
    benefits: ["50% faster project delivery", "Improved team collaboration", "Centralized documentation", "Reduced meeting time"]
  },
  "data-intelligence": {
    useCases: [
      "Customer behavior analysis",
      "Predictive sales forecasting",
      "Market trend identification",
      "Operational efficiency metrics",
      "Risk assessment modeling",
      "Competitive analysis"
    ],
    technologies: ["Python", "TensorFlow", "Power BI", "Tableau", "Apache Spark", "Snowflake", "AWS ML"],
    benefits: ["Data-driven decisions", "Predictive insights", "Competitive advantage", "Automated reporting"]
  },
  "security-compliance": {
    useCases: [
      "Employee access management",
      "GDPR/HIPAA compliance tracking",
      "Threat detection and response",
      "Data encryption and backup",
      "Audit trail management",
      "Security policy enforcement"
    ],
    technologies: ["Okta", "Auth0", "AWS IAM", "Cloudflare", "HashiCorp Vault", "SIEM Tools"],
    benefits: ["Zero-trust security", "Regulatory compliance", "Reduced breach risk", "Automated auditing"]
  },
  "industry-specific": {
    useCases: [
      "Patient record management (Healthcare)",
      "Student enrollment systems (Education)",
      "Reservation and booking (Hospitality)",
      "Supply chain optimization (Logistics)",
      "Donor management (Non-profit)",
      "Case management (Legal)"
    ],
    technologies: ["Domain-specific APIs", "HIPAA-compliant stacks", "Custom frameworks", "Industry standards"],
    benefits: ["Industry best practices", "Regulatory compliance", "Specialized workflows", "Sector expertise"]
  }
};

interface SoftwareSolutionRow {
  id: SoftwareSolutionCategory["id"];
  description: string;
  image: string;
  imageAlt: string;
}

const softwareSolutionRows: SoftwareSolutionRow[] = [
  {
    id: "enterprise-core",
    description:
      "Centralize operations, automate workflows, and gain visibility across every core business function.",
    image: "/enterprise-core-operations-platform.png",
    imageAlt: "Enterprise core and operations platform interface",
  },
  {
    id: "people-identity",
    description:
      "Secure identity, roles, and workforce systems that keep teams productive and compliant.",
    image: "/people-identity-access.png",
    imageAlt: "People identity and access management platform",
  },
  {
    id: "revenue-sales",
    description:
      "Accelerate revenue with customer platforms, CRM workflows, and sales enablement tooling.",
    image: "/revenue-sales-customer-platforms.png",
    imageAlt: "Revenue, sales, and customer platform dashboard",
  },
  {
    id: "finance-monetization",
    description:
      "Billing, subscriptions, and finance systems that improve cash flow and reporting accuracy.",
    image: "/finance-monetization-systems.png",
    imageAlt: "Finance and monetization systems analytics",
  },
  {
    id: "data-analytics",
    description:
      "Business intelligence, dashboards, and data platforms that turn signals into decisions.",
    image: "/data-analytics-intelligence.png",
    imageAlt: "Data analytics and intelligence platform visualization",
  },
  {
    id: "industry-saas",
    description:
      "Industry-ready SaaS platforms built to scale with compliance, security, and multi-tenant control.",
    image: "/industry-saas-platforms.png",
    imageAlt: "Industry and SaaS platform management interface",
  },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

function CategoryModal({
  category,
  onClose,
  clickPosition,
}: {
  category: SoftwareSolutionCategory;
  onClose: () => void;
  clickPosition: { x: number; y: number };
}) {
  const details = categoryDetails[category.id] || {
    useCases: category.highlights,
    technologies: ["Custom Stack"],
    benefits: ["Tailored to your needs"],
  };

  const scrollRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.scrollTop = 0;
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });

  const maxRadius = useMemo(() => {
    return Math.hypot(
      Math.max(clickPosition.x, windowSize.width - clickPosition.x),
      Math.max(clickPosition.y, windowSize.height - clickPosition.y)
    ) * 1.5;
  }, [clickPosition.x, clickPosition.y, windowSize.width, windowSize.height]);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsOpen(true));

    const lenis = (window as Window & { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (lenis) lenis.stop();

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(timer);
      window.removeEventListener("resize", handleResize);
      if (lenis) lenis.start();
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 500);
  };

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
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-lg"
      onWheel={handleWheel}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b opacity-5 pointer-events-none",
        category.gradient
      )} />

      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch]"
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        onWheel={handleWheel}
      >
        <motion.button
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClose}
          className="fixed top-[max(1rem,env(safe-area-inset-top))] right-4 sm:top-8 sm:right-8 z-[110] flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-surface/80 sm:bg-surface/50 backdrop-blur-xl border border-border/50 text-text-primary shadow-2xl transition-all duration-300 hover:bg-surface/80 hover:scale-110"
        >
          <X className="h-5 w-5 sm:h-7 sm:w-7" />
        </motion.button>

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          className="min-h-full flex flex-col"
        >
          <div className="pt-14 sm:pt-20 pb-6 sm:pb-12 px-4 sm:px-8 md:px-16 lg:px-24">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-4 mb-8 sm:mb-10"
              >
                <div className={cn(
                  "flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br",
                  category.gradient
                )}>
                  <category.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <span className={cn(
                  "rounded-full px-5 py-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-white bg-gradient-to-r",
                  category.gradient
                )}>
                  {category.expandedItems.length} Solutions
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1]"
              >
                {category.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-text-secondary/80 leading-relaxed max-w-2xl mx-auto font-light"
              >
                {category.description}
              </motion.p>
            </div>
          </div>

          <div className="flex-1 px-6 sm:px-8 md:px-16 lg:px-24 pb-12 sm:pb-16">
            <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <h3 className="text-lg sm:text-xl font-medium text-text-secondary mb-5 sm:mb-6 text-center uppercase tracking-widest">
                  Solutions Included
                </h3>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
                  {category.expandedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={staggerItem}
                      className="flex items-center gap-3 p-4 sm:p-5 rounded-xl bg-surface/30 backdrop-blur-sm border border-border/30 hover:bg-surface/50 hover:border-border/50 transition-all duration-300"
                    >
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br flex-shrink-0",
                        category.gradient
                      )}>
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm sm:text-base text-text-primary font-medium">{item.title}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg sm:text-xl font-medium text-text-secondary mb-5 sm:mb-6 text-center uppercase tracking-widest">
                  Use Cases
                </h3>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {details.useCases.map((useCase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-surface/20 border border-border/20"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-primary">{useCase}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
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
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-surface/30 backdrop-blur-sm border border-border/30 text-sm font-medium text-text-primary hover:bg-surface/50 hover:border-border/50 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <h3 className="text-lg sm:text-xl font-medium text-text-secondary mb-5 sm:mb-6 uppercase tracking-widest">
                  Key Benefits
                </h3>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  {details.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-surface/30 border border-border/30 text-sm font-medium text-text-primary"
                    >
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      {benefit}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-8 sm:pt-10 text-center"
              >
                <Link
                  href="/contact"
                  className={cn(
                    "group inline-flex items-center justify-center gap-3 rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r",
                    category.gradient
                  )}
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="mt-3 text-sm text-text-secondary/60">
                  Free consultation • Custom pricing
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SoftwareSolutionRow({
  category,
  row,
  index,
  onLearnMore,
}: {
  category: SoftwareSolutionCategory;
  row: SoftwareSolutionRow;
  index: number;
  onLearnMore: (event: React.MouseEvent) => void;
}) {
  const isOdd = index % 2 === 0;
  const CategoryIcon = category.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl bg-surface/20 shadow-sm backdrop-blur-sm"
    >
      <div className="grid gap-8 md:grid-cols-2 items-center p-6 sm:p-8 lg:p-10">
        <div className={cn("order-1", isOdd ? "md:order-2" : "md:order-1")}>
          <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-surface/30 shadow-sm">
            <Image
              src={row.image}
              alt={row.imageAlt}
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

        <div className={cn("order-2", isOdd ? "md:order-1" : "md:order-2")}>
          <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
            {category.tagline}
          </p>
          <h3 className="mt-3 flex items-center gap-3 text-3xl sm:text-4xl font-semibold text-text-primary">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/40 bg-surface/40">
              <CategoryIcon className="h-5 w-5 text-blue-400" />
            </span>
            <span>{category.title}</span>
          </h3>
          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            {row.description}
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={onLearnMore}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/40 px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-blue-500/60 hover:bg-surface/50"
              aria-label={`Learn more about ${category.title}`}
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

export function SoftwareSolutionsPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<SoftwareSolutionCategory | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleCardClick = (category: SoftwareSolutionCategory, e: React.MouseEvent) => {
    setClickPosition({ x: e.clientX, y: e.clientY });
    setSelectedCategory(category);
  };

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
                  Software Solutions
                </span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Modular systems that standardize operations, protect access, and scale revenue and intelligence with confidence.
              </p>
            </motion.header>
          </div>
        </section>

        {/* Solutions */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
            <div className="space-y-8 sm:space-y-12">
              {softwareSolutionRows.map((row, index) => {
                const category = softwareSolutionCategories.find((item) => item.id === row.id);
                if (!category) return null;

                return (
                  <SoftwareSolutionRow
                    key={row.id}
                    row={row}
                    category={category}
                    index={index}
                    onLearnMore={(event) => handleCardClick(category, event)}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Full-screen Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <CategoryModal
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
            clickPosition={clickPosition}
          />
        )}
      </AnimatePresence>
    </>
  );
}
