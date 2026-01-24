"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  X,
  CheckCircle2
} from "lucide-react";
import { softwareSolutionCategories, SoftwareSolutionCategory } from "@/data/softwareSolutions";
import { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";
import ServiceDetails from "@/components/ServiceDetails";

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

const getServiceAnchor = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// ... (SoftwareSolutionRow interface and data array remains the same)
interface SoftwareSolutionRow {
  id: SoftwareSolutionCategory["id"];
  title: string;
  intro: string;
  covers: string[];
  capabilities: string[];
  technologies: string;
  outcomes: string[];
  useCases: string[];
  delivery: string[];
  description: string;
  image: string;
  imageAlt: string;
}

const softwareSolutionRows: SoftwareSolutionRow[] = [
  {
    id: "enterprise-core",
    title: "Enterprise Core & Operations Platform",
    intro:
      "We build core operational systems that unify finance, inventory, and process tracking in one place. This reduces data silos and makes daily operations easier to run and report on.",
    covers: [
      "Operational workflows and approvals",
      "Inventory and vendor management",
      "Finance and reporting modules",
      "Role based access controls",
      "Integration with existing tools",
      "Audit trails and compliance logging",
    ],
    capabilities: [
      "Map current processes and standardize them",
      "Replace spreadsheets with reliable systems",
      "Integrate data sources for a single view",
      "Provide dashboards for leadership",
    ],
    technologies:
      "We use secure APIs, relational databases, and modular architecture to keep systems scalable and maintainable.",
    outcomes: [
      "Better operational visibility",
      "Reduced manual handoffs",
      "Cleaner reporting for finance teams",
      "Improved compliance readiness",
    ],
    useCases: [
      "Multi location operations",
      "Rapidly scaling teams",
      "Legacy ERP replacements",
      "High compliance environments",
    ],
    delivery: [
      "Discovery and workflow audit",
      "Process design",
      "System architecture",
      "Build and integration",
      "QA and training",
      "Launch and support",
    ],
    description:
      "Centralize operations, automate workflows, and gain visibility across every core business function.",
    image: "/enterprise-core-operations-platform.png",
    imageAlt: "Enterprise core and operations platform interface",
  },
  {
    id: "people-identity",
    title: "People, Identity & Access",
    intro:
      "We design systems that manage users, roles, and access across your products and internal tools. This reduces security risk and keeps onboarding consistent.",
    covers: [
      "User directories and roles",
      "Single sign on and authentication",
      "Access policies and approvals",
      "Audit logs and activity history",
      "Integration with HR systems",
      "Security monitoring",
    ],
    capabilities: [
      "Define clear role permissions",
      "Centralize identity management",
      "Automate onboarding and offboarding",
      "Improve access visibility",
    ],
    technologies:
      "We integrate identity providers with secure authentication flows and encrypted data storage.",
    outcomes: [
      "Lower access related risk",
      "Faster onboarding cycles",
      "Clearer audit trails",
      "Consistent user management",
    ],
    useCases: [
      "Growing employee headcount",
      "Multiple internal apps",
      "Regulated environments",
      "Customer and staff access control",
    ],
    delivery: [
      "Discovery and access review",
      "Role and policy design",
      "Integration planning",
      "Implementation",
      "Security testing",
      "Rollout and training",
    ],
    description:
      "Secure identity, roles, and workforce systems that keep teams productive and compliant.",
    image: "/people-identity-access.png",
    imageAlt: "People identity and access management platform",
  },
  {
    id: "revenue-sales",
    title: "Revenue, Sales & Customer Platforms",
    intro:
      "We build sales and customer systems that centralize pipeline data and improve follow through. This helps teams close deals faster and reduce manual reporting.",
    covers: [
      "CRM workflows and pipeline stages",
      "Lead and opportunity management",
      "Quote and proposal tooling",
      "Customer data and notes",
      "Sales activity reporting",
      "Automation and notifications",
    ],
    capabilities: [
      "Create structured pipeline stages",
      "Reduce manual data entry",
      "Improve visibility across teams",
      "Connect marketing and sales data",
    ],
    technologies:
      "We build on modern web stacks and integrate with email, marketing, and finance systems where needed.",
    outcomes: [
      "More consistent sales follow up",
      "Cleaner pipeline forecasting",
      "Faster handoffs between teams",
      "Reduced reporting time",
    ],
    useCases: [
      "Sales teams scaling quickly",
      "Complex deal cycles",
      "Multiple customer segments",
      "Need for integrated reporting",
    ],
    delivery: [
      "Discovery and sales audit",
      "Workflow design",
      "System build",
      "Integration testing",
      "Team training",
      "Launch and support",
    ],
    description:
      "Accelerate revenue with customer platforms, CRM workflows, and sales enablement tooling.",
    image: "/revenue-sales-customer-platforms.png",
    imageAlt: "Revenue, sales, and customer platform dashboard",
  },
  {
    id: "finance-monetization",
    title: "Finance & Monetization Systems",
    intro:
      "We deliver billing and finance systems that make revenue and cash flow easier to track. This reduces invoicing errors and improves subscription management.",
    covers: [
      "Billing and invoicing flows",
      "Subscription management",
      "Payment reconciliation",
      "Revenue recognition support",
      "Tax and compliance setup",
      "Finance dashboards",
    ],
    capabilities: [
      "Automate billing cycles",
      "Reduce payment failures",
      "Track revenue by product or client",
      "Integrate finance tools",
    ],
    technologies:
      "We integrate secure payment providers with backend services and reporting layers built for finance teams.",
    outcomes: [
      "Cleaner cash flow visibility",
      "Lower billing errors",
      "More reliable revenue reporting",
      "Better subscription control",
    ],
    useCases: [
      "SaaS subscriptions",
      "Usage based billing",
      "Multi currency sales",
      "Complex pricing models",
    ],
    delivery: [
      "Discovery and billing review",
      "Pricing and workflow design",
      "System build",
      "QA and compliance checks",
      "Launch and migration support",
      "Ongoing optimization",
    ],
    description:
      "Billing, subscriptions, and finance systems that improve cash flow and reporting accuracy.",
    image: "/finance-monetization-systems.png",
    imageAlt: "Finance and monetization systems analytics",
  },
  {
    id: "data-analytics",
    title: "Data, Analytics & Intelligence",
    intro:
      "We build data platforms and dashboards that make performance easy to understand. This helps leaders make decisions without waiting on manual reports.",
    covers: [
      "Data pipeline setup",
      "Dashboards and reporting",
      "Data modeling and definitions",
      "Access and governance",
      "Scheduled exports",
      "Analyst handoff",
    ],
    capabilities: [
      "Centralize data from multiple sources",
      "Create metrics that teams trust",
      "Automate recurring reports",
      "Visualize trends clearly",
    ],
    technologies:
      "We use modern data warehouses and BI tools with secure access controls and documented metrics.",
    outcomes: [
      "Faster insight cycles",
      "Fewer reporting bottlenecks",
      "Improved data consistency",
      "Clearer performance tracking",
    ],
    useCases: [
      "Growing data volume",
      "Multiple systems feeding reports",
      "Leadership reporting needs",
      "Operational analytics gaps",
    ],
    delivery: [
      "Discovery and data audit",
      "Model and metric design",
      "Pipeline build",
      "Dashboard development",
      "Validation with teams",
      "Rollout and training",
    ],
    description:
      "Business intelligence, dashboards, and data platforms that turn signals into decisions.",
    image: "/data-analytics-intelligence.png",
    imageAlt: "Data analytics and intelligence platform visualization",
  },
  {
    id: "industry-saas",
    title: "Industry & SaaS Platforms",
    intro:
      "We build SaaS platforms tailored to specific industries, with workflows and compliance built in. This helps businesses launch faster without sacrificing control.",
    covers: [
      "Multi tenant architecture",
      "Industry specific workflows",
      "Subscription management",
      "Compliance and data governance",
      "Admin and support tooling",
      "Customer onboarding flows",
    ],
    capabilities: [
      "Design scalable account structures",
      "Build secure role management",
      "Support configuration per client",
      "Plan for long term extensibility",
    ],
    technologies:
      "We use modular application architecture with secure APIs and cloud hosting suited for multi tenant products.",
    outcomes: [
      "Faster product launch",
      "Simpler customer onboarding",
      "Lower support overhead",
      "Scalable infrastructure",
    ],
    useCases: [
      "Vertical SaaS products",
      "B2B platforms",
      "Regulated industry tools",
      "New product lines",
    ],
    delivery: [
      "Discovery and product scope",
      "Architecture and data design",
      "Build and integration",
      "QA and security review",
      "Launch and onboarding",
      "Iteration and support",
    ],
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
}: {
  category: SoftwareSolutionCategory;
  row: SoftwareSolutionRow;
  index: number;
}) {
  const CategoryIcon = category.icon;
  const contactHref = `/contact?projectInterest=${encodeURIComponent(row.title)}`;
  const anchor = getServiceAnchor(row.title);
  const ctaText = `Contact for ${row.title}`;

  return (
    <ScrollFloatReveal
      as="article"
      y={REVEAL_CONFIG.translateY}
      duration={MOTION_DURATION.normal}
      delay={index * 0.08}
    >
      <div id={anchor} className="scroll-mt-28">
        <ServiceDetails
          label="SOFTWARE SOLUTION"
          title={row.title}
          description={`${row.intro} ${category.tagline}`}
          imageSrc={row.image}
          imageAlt={row.imageAlt}
          outcomes={row.outcomes}
          useCases={row.useCases}
          process={row.delivery}
          ctaText={ctaText}
          ctaHref={contactHref}
          imagePriority={index < 2}
        />
      </div>
    </ScrollFloatReveal>
  );
}

export function SoftwareSolutionsPageContent() {
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
                Software Solutions
              </FloatHeading>
              <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Modular systems that standardize operations, protect access, and scale revenue and intelligence with confidence.
              </p>
            </ScrollFloatReveal>
          </div>
        </section>

        {/* Solutions */}
        <section className="pb-16 sm:pb-24" style={{ perspective: "1000px" }}>
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
