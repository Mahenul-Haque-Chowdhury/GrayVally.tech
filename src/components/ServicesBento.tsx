"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, LucideIcon, X, CheckCircle2 } from "lucide-react";
import {
  Globe,
  Palette,
  Layout,
  Server,
  ShoppingCart,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

// ============================================================================
// DESIGN NOTES:
// - Bento Grid: Uses CSS Grid with varying spans for visual interest
// - Glassmorphism: backdrop-blur, semi-transparent backgrounds, subtle borders
// - Hover Effects: Scale + glow using box-shadow, GPU-accelerated
// - Layout: First two cards are "featured" (larger), rest are standard
// - Modal: Full-screen overlay with circular clip-path reveal animation
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
    tagline: "Tailored solutions that automate and scale your operations",
    features: [
      "CRM & ERP systems",
      "Workflow automation tools",
      "Custom dashboards & analytics",
      "Integration with existing systems",
      "Business process optimization",
      "Scalable architecture",
    ],
    technologies: ["Node.js", "Python", "React", "PostgreSQL", "AWS", "Docker"],
    process: ["Discovery", "Design", "Development", "Integration", "Deployment"],
  },
};

interface BentoService {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  featured?: boolean;
  gradient?: string;
}

// Curated services for the bento layout with specific sizing
const bentoServices: BentoService[] = [
  {
    id: "01",
    title: "Website Development",
    description:
      "Custom business websites, landing pages, and portfolios crafted with modern frameworks and pixel-perfect attention to detail.",
    icon: Globe,
    category: "Development",
    featured: true,
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: "02",
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces designed for conversion. From wireframes to high-fidelity prototypes.",
    icon: Palette,
    category: "Design",
    featured: true,
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  },
  {
    id: "03",
    title: "Front-End Development",
    description: "React, Next.js, Vue — pixel-perfect implementations with smooth animations.",
    icon: Layout,
    category: "Development",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    id: "04",
    title: "Back-End Development",
    description: "Scalable APIs, authentication, payment systems, and cloud infrastructure.",
    icon: Server,
    category: "Development",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
  },
  {
    id: "05",
    title: "E-Commerce",
    description: "Custom stores with seamless checkout and payment integration.",
    icon: ShoppingCart,
    category: "Solutions",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
  },
  {
    id: "06",
    title: "Custom Software",
    description: "CRM, ERP, and automated workflows tailored to your business.",
    icon: Code2,
    category: "Solutions",
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Modal animation variants
const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.3 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
  },
};

// ============================================================================
// Service Modal Component - Full screen overlay with circular reveal
// ============================================================================

interface ServiceModalProps {
  service: BentoService;
  onClose: () => void;
  clickPosition: { x: number; y: number };
}

function ServiceModal({ service, onClose, clickPosition }: ServiceModalProps) {
  const Icon = service.icon;
  const details = serviceDetails[service.id] || {
    tagline: "Professional solutions for your business",
    features: service.description.split(", "),
  };

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
      
      {/* Scrollable container */}
      <div 
        className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y"
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        style={{ WebkitOverflowScrolling: 'touch' }}
        onWheel={handleWheel}
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClose}
          className="fixed top-6 right-6 sm:top-8 sm:right-8 z-[110] flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-surface/50 backdrop-blur-xl border border-border/50 text-text-primary shadow-2xl transition-all duration-300 hover:bg-surface/80 hover:scale-110"
        >
          <X className="h-6 w-6 sm:h-7 sm:w-7" />
        </motion.button>

        {/* Full Screen Content Container */}
        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          className="min-h-full flex flex-col"
        >
          {/* Header - Modern centered layout */}
          <div className="pt-16 sm:pt-20 pb-8 sm:pb-12 px-6 sm:px-8 md:px-16 lg:px-24">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
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

// ============================================================================
// Bento Card Component
// ============================================================================

interface BentoCardProps {
  service: BentoService;
  index: number;
  className?: string;
  onClick: (event: React.MouseEvent) => void;
}

function BentoCard({ service, index, className, onClick }: BentoCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={cn(
        // Base glassmorphism styling - theme aware
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer",
        "bg-surface/20 backdrop-blur-xl",
        "border border-border/40",
        // Padding
        "p-6 sm:p-8",
        // Hover glow transition
        "transition-all duration-500 ease-out",
        "hover:border-border/80",
        "hover:bg-surface/40",
        "hover:shadow-lg hover:shadow-blue-500/10",
        className
      )}
    >
      {/* Gradient background on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          service.gradient
        )}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header: Icon + Category */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-border/30 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 group-hover:border-blue-500/30">
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400 transition-colors duration-300 group-hover:text-cyan-400" />
          </div>
          <span className="rounded-full bg-surface/60 px-3 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary/70">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-blue-400">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-text-secondary/80 leading-relaxed transition-colors duration-300 group-hover:text-text-secondary flex-grow">
          {service.description}
        </p>

        {/* Learn more link */}
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-text-secondary/50 transition-all duration-300 group-hover:text-cyan-400">
          <span>Explore</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}

export function ServicesBento() {
  const [selectedService, setSelectedService] = useState<BentoService | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleServiceClick = useCallback((service: BentoService, event: React.MouseEvent) => {
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
      <section
        id="services"
        className="relative bg-background py-20 sm:py-28 md:py-36 overflow-hidden transition-colors duration-300"
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />

        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[128px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6">
          {/* Section Header */}
          <SectionHeading
            badge="What We Do"
            title="Engineering Excellence"
            subtitle="Our core competencies lie in building the invisible backbone of modern digital products."
            align="center"
            animation="word-by-word"
            gradientWords={[1]}
            className="mb-14 sm:mb-20"
          />

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Featured cards - span 2 columns on large screens */}
            {bentoServices.slice(0, 2).map((service, index) => (
              <BentoCard
                key={service.id}
                service={service}
                index={index}
                onClick={(e) => handleServiceClick(service, e)}
                className={cn(
                  "md:col-span-1 lg:col-span-1",
                  index === 0 && "lg:row-span-2 lg:min-h-[400px]"
                )}
              />
            ))}

            {/* Standard cards */}
            {bentoServices.slice(2).map((service, index) => (
              <BentoCard
                key={service.id}
                service={service}
                index={index + 2}
                onClick={(e) => handleServiceClick(service, e)}
              />
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-14 sm:mt-20 flex justify-center"
          >
            <Link
              href="/web-solutions"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-surface/30 backdrop-blur-sm px-8 py-4 text-sm sm:text-base font-semibold text-text-primary transition-all duration-300 hover:border-blue-500/50 hover:bg-surface/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <span>View All Services</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence mode="wait">
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

export default ServicesBento;
