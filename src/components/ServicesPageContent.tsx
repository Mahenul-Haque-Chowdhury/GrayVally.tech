"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    tagline: "Crafting digital experiences that convert visitors into customers",
    features: [
      "Custom business websites tailored to your brand",
      "High-converting landing pages",
      "Personal portfolios that stand out",
      "Corporate and agency sites",
      "Complete end-to-end development",
      "SEO-optimized structure",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    process: ["Discovery & Planning", "Design & Prototyping", "Development", "Testing & QA", "Launch & Support"],
  },
  "02": {
    tagline: "Beautiful interfaces that users love to interact with",
    features: [
      "Modern, responsive designs",
      "Wireframing & interactive prototyping",
      "Complete branding and design systems",
      "Mobile-first approach",
      "User research & testing",
      "Accessibility compliance",
    ],
    technologies: ["Figma", "Adobe XD", "Framer", "Principle", "Zeplin"],
    process: ["Research", "Wireframes", "Visual Design", "Prototyping", "Handoff"],
  },
  "03": {
    tagline: "Pixel-perfect implementations with buttery-smooth animations",
    features: [
      "React, Next.js, Vue expertise",
      "Complex animation & interaction design",
      "Performance optimization",
      "Responsive across all devices",
      "Component library development",
      "State management solutions",
    ],
    technologies: ["React", "Next.js", "Vue", "GSAP", "Three.js", "Framer Motion"],
    process: ["Architecture", "Component Design", "Implementation", "Optimization", "Testing"],
  },
  "04": {
    tagline: "Scalable server infrastructure that powers your business",
    features: [
      "RESTful & GraphQL API development",
      "Server-side logic & business rules",
      "Authentication & authorization",
      "Payment gateway integration",
      "Cloud deployment & DevOps",
      "Database design & optimization",
    ],
    technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "AWS", "Docker"],
    process: ["Requirements", "Architecture", "Development", "Testing", "Deployment"],
  },
  "05": {
    tagline: "Complete e-commerce solutions that drive sales",
    features: [
      "Custom online store development",
      "Shopify & WooCommerce expertise",
      "Next.js Commerce implementations",
      "Cart & checkout optimization",
      "Secure payment integrations",
      "Inventory management systems",
    ],
    technologies: ["Shopify", "WooCommerce", "Stripe", "Next.js Commerce", "Saleor"],
    process: ["Store Planning", "Design", "Development", "Payment Setup", "Launch"],
  },
  "06": {
    tagline: "Robust data infrastructure for reliable operations",
    features: [
      "Database design & architecture",
      "MySQL, MongoDB, PostgreSQL",
      "Query optimization & indexing",
      "Backup & disaster recovery",
      "Server setup & maintenance",
      "Performance monitoring",
    ],
    technologies: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "AWS RDS", "Docker"],
    process: ["Assessment", "Design", "Migration", "Optimization", "Monitoring"],
  },
  "07": {
    tagline: "Keep your applications running smoothly",
    features: [
      "Front-end & back-end bug fixing",
      "Performance issue resolution",
      "Cross-browser compatibility fixes",
      "Security patching & updates",
      "Regular maintenance plans",
      "24/7 emergency support",
    ],
    technologies: ["All modern frameworks", "Debugging tools", "Monitoring systems"],
    process: ["Diagnosis", "Analysis", "Fix Implementation", "Testing", "Monitoring"],
  },
  "08": {
    tagline: "Native experiences on every device",
    features: [
      "iOS & Android development",
      "Cross-platform with Flutter & React Native",
      "API integration & backend connectivity",
      "Push notifications & real-time features",
      "App Store & Play Store deployment",
      "Ongoing maintenance & updates",
    ],
    technologies: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
    process: ["Planning", "Design", "Development", "Testing", "Store Submission"],
  },
  "09": {
    tagline: "Tailored solutions for unique business needs",
    features: [
      "Custom business applications",
      "CRM & ERP development",
      "Workflow automation",
      "AI & ML integrations",
      "Third-party API integrations",
      "Legacy system modernization",
    ],
    technologies: ["Python", "Node.js", "TensorFlow", "OpenAI", "Zapier", "n8n"],
    process: ["Discovery", "Design", "Development", "Integration", "Training"],
  },
  "11": {
    tagline: "Get found by your ideal customers",
    features: [
      "On-page SEO optimization",
      "Technical SEO audits",
      "Content strategy & optimization",
      "Google Ads setup & management",
      "Meta Ads campaigns",
      "Analytics & reporting",
    ],
    technologies: ["Google Analytics", "Search Console", "Ahrefs", "SEMrush", "Meta Ads"],
    process: ["Audit", "Strategy", "Implementation", "Monitoring", "Optimization"],
  },
  "12": {
    tagline: "Strategic guidance for your digital journey",
    features: [
      "Project planning & roadmapping",
      "System architecture design",
      "Technology stack selection",
      "Business process automation",
      "Digital transformation strategy",
      "Ongoing advisory & mentorship",
    ],
    technologies: ["Miro", "Notion", "Various tech stacks"],
    process: ["Assessment", "Strategy", "Roadmap", "Implementation Support", "Review"],
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

interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
}

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
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-surface/40 backdrop-blur-xl border border-border/40">
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
                </div>
                <span className="rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 px-5 py-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-blue-400">
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
                          <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-blue-500/20 text-xs sm:text-sm font-bold text-blue-400">
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
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-text-primary px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-background transition-all duration-300 hover:scale-105 hover:shadow-lg"
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

interface ServiceCardProps {
  service: Service;
  index: number;
  onClick: (event: React.MouseEvent) => void;
}

function ServiceCard({ service, index, onClick }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer",
        "bg-surface/20 backdrop-blur-xl",
        "border border-border/40",
        "p-6 sm:p-8",
        "transition-all duration-500 ease-out",
        "hover:border-border/80 hover:bg-surface/40",
        "hover:shadow-xl hover:shadow-blue-500/10"
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-border/30 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 group-hover:border-blue-500/30">
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400 transition-colors duration-300 group-hover:text-cyan-400" />
          </div>
          <span className="rounded-full bg-surface/60 px-3 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary/70">
            {service.category}
          </span>
        </div>

        {/* Content */}
        <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-blue-400">
          {service.title}
        </h3>

        <p className="mt-3 text-sm text-text-secondary/80 leading-relaxed flex-grow">
          {service.description}
        </p>

        {/* Click indicator - no horizontal line */}
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-text-secondary/50 transition-all duration-300 group-hover:text-cyan-400">
          <span>View Details</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Corner glow */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
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
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-background to-background pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[128px] pointer-events-none" />

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
              <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary mb-6">
                Our Services
              </span>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary">
                Complete{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Digital Solutions
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary/90 leading-relaxed max-w-2xl mx-auto">
                From concept to deployment, we provide end-to-end services to build, scale, and maintain your digital infrastructure.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
            >
              {[
                { value: `${allServices.length}+`, label: "Services" },
                { value: "4", label: "Categories" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-surface/20 border border-border/30 backdrop-blur-sm"
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* All Services Grid */}
        <section className="pt-0 pb-8 sm:pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8 text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                All{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Services
                </span>
              </h2>
              <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
                Click on any service to learn more about what we offer.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {allServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  onClick={(e) => handleServiceClick(service, e)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-12 rounded-3xl bg-surface/20 border border-border/40 backdrop-blur-xl"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                Ready to Build Something{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Amazing?
                </span>
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
                Let&apos;s discuss how we can help bring your vision to life.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-text-primary px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-background transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10">Start a Project</span>
                  <ArrowRight className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-300 group-hover:translate-x-0" />
                </Link>
                <Link
                  href="/"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/30 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-text-primary transition-all duration-300 hover:border-blue-500/50 hover:bg-surface/50"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </motion.div>
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
