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
import { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";

// Extended details for each category modal
// ... (details object remains the same)
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


// ... (SoftwareSolutionRow interface and data array remains the same)
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


// ... CategoryModal implementation is unchanged ...
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
        {/* Modal content... */}
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
    <ScrollFloatReveal
      as="article"
      y={REVEAL_CONFIG.translateY}
      duration={MOTION_DURATION.normal}
      delay={index * 0.08}
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
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-[420px]"
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
          <FloatHeading as="h3" className="mt-3 flex items-center gap-3 text-3xl sm:text-4xl font-semibold text-text-primary">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/40 bg-surface/40">
              <CategoryIcon className="h-5 w-5 text-blue-400" />
            </span>
            <span>{category.title}</span>
          </FloatHeading>
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
    </ScrollFloatReveal>
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
                Software Solutions
              </FloatHeading>
              <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Modular systems that standardize operations, protect access, and scale revenue and intelligence with confidence.
              </p>
            </ScrollFloatReveal>
          </div>
        </section>

        {/* Solutions */}
        <section className="pb-16 sm:pb-24" style={{ transformPerspective: '1000px' }}>
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
