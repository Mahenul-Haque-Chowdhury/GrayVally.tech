"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
  totalSolutions,
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

// Animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  },
};

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
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  },
};

// Full-screen Modal Component with circular reveal animation
function CategoryModal({ 
  category, 
  onClose,
  clickPosition 
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
      // Scroll to top on mobile when modal opens
      node.scrollTop = 0;
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1920, 
    height: typeof window !== 'undefined' ? window.innerHeight : 1080 
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
      {/* Gradient overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b opacity-5 pointer-events-none",
        category.gradient
      )} />
      
      {/* Scrollable container */}
      <div 
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y"
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        style={{ WebkitOverflowScrolling: 'touch' }}
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

        {/* Content */}
        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          className="min-h-full flex flex-col"
        >
          {/* Header */}
          <div className="pt-14 sm:pt-20 pb-6 sm:pb-12 px-4 sm:px-8 md:px-16 lg:px-24">
            <div className="max-w-4xl mx-auto text-center">
              {/* Icon with badge */}
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

          {/* Content Sections */}
          <div className="flex-1 px-6 sm:px-8 md:px-16 lg:px-24 pb-12 sm:pb-16">
            <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
              
              {/* All Solutions */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
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

              {/* Use Cases */}
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

              {/* Technologies */}
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

              {/* Benefits */}
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

              {/* CTA */}
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

// Category Card Component - Fully clickable
function CategoryCard({ 
  category, 
  onExpand 
}: { 
  category: SoftwareSolutionCategory; 
  onExpand: (e: React.MouseEvent) => void;
}) {
  return (
    <motion.div
      variants={cardVariants}
      onClick={onExpand}
      className="group relative rounded-2xl sm:rounded-3xl border border-border/40 bg-surface/30 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-border/60 hover:shadow-xl hover:shadow-violet-500/5 cursor-pointer"
    >
      {/* Gradient accent line */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity",
        category.gradient
      )} />

      {/* Hover overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500",
        category.gradient
      )} />

      <div className="p-6 sm:p-8 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className={cn(
              "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110",
              category.gradient
            )}>
              <category.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-blue-400 transition-all duration-300">
                {category.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-0.5">{category.tagline}</p>
            </div>
          </div>
          <span className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white bg-gradient-to-r",
            category.gradient
          )}>
            {category.expandedItems.length}
          </span>
        </div>

        {/* Highlights */}
        <div className="space-y-3 mb-6">
          {category.highlights.map((highlight, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br",
                category.gradient
              )}>
                <Check className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm sm:text-base text-text-primary font-medium">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Click indicator */}
        <div className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border/40 bg-background/30 text-text-secondary group-hover:text-text-primary group-hover:border-border/60 group-hover:bg-background/50 transition-all duration-300">
          <span className="text-sm font-medium">View All {category.expandedItems.length} Solutions</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
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
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-background to-background pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[128px] pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-violet-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
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

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-violet-400 mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Enterprise Solutions
              </span>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary">
                Enterprise{" "}
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Software Solutions
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary/90 leading-relaxed max-w-3xl mx-auto">
                Modular platforms designed to scale operations, revenue, and intelligence. 
                From core business systems to industry-specific solutions.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto"
            >
              {[
                { value: `${totalSolutions}+`, label: "Total Solutions", gradient: "from-violet-500 to-purple-500" },
                { value: `${softwareSolutionCategories.length}`, label: "Categories", gradient: "from-blue-500 to-cyan-500" },
                { value: "100%", label: "Customizable", gradient: "from-emerald-500 to-teal-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative text-center p-4 sm:p-6 rounded-2xl bg-surface/30 border border-border/30 backdrop-blur-sm overflow-hidden group hover:border-border/50 transition-all duration-300"
                >
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br",
                    stat.gradient
                  )} />
                  <p className={cn(
                    "text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                    stat.gradient
                  )}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 sm:py-24 bg-surface/10 transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                Our{" "}
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Solution Categories
                </span>
              </h2>
              <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
                Six powerful categories covering every aspect of enterprise software. 
                Click any category to explore all included solutions.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {softwareSolutionCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onExpand={(e) => handleCardClick(category, e)}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-surface/40 to-surface/20 border border-border/40 backdrop-blur-xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-medium text-emerald-400 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Ready to Build
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                Need a Custom{" "}
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Software Solution?
                </span>
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
                Every solution is fully customizable. Tell us your requirements and we&apos;ll build 
                exactly what your business needs.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-violet-500/25"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/audit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/30 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-text-primary transition-all duration-300 hover:border-violet-500/50 hover:bg-surface/50"
                >
                  <span>Free System Audit</span>
                </Link>
              </div>
            </motion.div>
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
