"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LucideIcon, X, CheckCircle2 } from "lucide-react";
import {
  Globe,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import ScrollFloat, { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";
import { lockScroll, unlockScroll } from "@/lib/scroll/scrollLock";

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
    tagline: "Custom websites built to convert, scale, and ship fast",
    features: [
      "Discovery and requirements alignment",
      "Information architecture and UX flows",
      "Responsive front-end development",
      "Secure back-end integrations",
      "Performance optimization and SEO",
      "Launch, monitoring, and support",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    process: ["Discovery", "Design", "Build", "QA", "Launch"],
  },
  "02": {
    tagline: "Revenue-ready online stores optimized for conversion",
    features: [
      "Storefront UX and merchandising",
      "Checkout flow optimization",
      "Payment gateway setup",
      "Inventory and order management",
      "Performance and SEO tuning",
      "Analytics and conversion tracking",
    ],
    technologies: ["Shopify", "WooCommerce", "Stripe", "Next.js Commerce", "Algolia"],
    process: ["Strategy", "Design", "Build", "QA", "Launch"],
  },
  "03": {
    tagline: "Search visibility and growth strategy that compounds",
    features: [
      "Technical SEO audits",
      "On-page optimization",
      "Structured data and schema",
      "Core Web Vitals improvements",
      "Campaign setup and tracking",
      "Analytics dashboards",
    ],
    technologies: ["Google Analytics", "Search Console", "Ahrefs", "SEMrush", "Tag Manager"],
    process: ["Audit", "Roadmap", "Implementation", "Campaigns", "Optimization"],
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
  image: string;
  imageAlt: string;
}

// Curated services for the bento layout with specific sizing
const bentoServices: BentoService[] = [
  {
    id: "01",
    title: "Website Development",
    description: "Custom business websites and landing pages built for speed, scale, and conversion.",
    icon: Globe,
    category: "Development",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    image: "/web-development-services.png",
    imageAlt: "Website development service preview",
  },
  {
    id: "02",
    title: "E-Commerce Solutions",
    description: "Conversion-first storefronts with secure payments and scalable architecture.",
    icon: ShoppingCart,
    category: "Solutions",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    image: "/ecommerce-solutions.png",
    imageAlt: "E-commerce solutions service preview",
  },
  {
    id: "03",
    title: "SEO & Digital Marketing",
    description: "Technical SEO and growth campaigns that improve visibility and ROI.",
    icon: BarChart3,
    category: "Growth",
    gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    image: "/seo-digital-marketing.png",
    imageAlt: "SEO and digital marketing service preview",
  },
];

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
                variants={staggerContainer}
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

              {/* Technologies */}
              {details.technologies && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <FloatHeading as="h3" className="text-lg sm:text-xl font-medium text-text-secondary mb-5 sm:mb-6 uppercase tracking-widest">
                    Technologies We Use
                  </FloatHeading>
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    {details.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-surface/30 backdrop-blur-sm border border-border/30 text-sm font-medium text-text-primary hover:bg-surface/50 hover:border-border/50 transition-colors duration-300 cursor-default"
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
                  <FloatHeading as="h3" className="text-lg sm:text-xl font-medium text-text-secondary mb-5 sm:mb-6 uppercase tracking-widest">
                    Our Process
                  </FloatHeading>
                  <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
                    {details.process.map((step, index, arr) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-3 sm:gap-4"
                      >
                        <div className="flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-surface/30 backdrop-blur-sm border border-border/30 hover:bg-surface/50 transition-colors duration-300">
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
    <ScrollFloatReveal
      y={REVEAL_CONFIG.translateY}
      duration={MOTION_DURATION.normal}
      delay={index * 0.1}
      onClick={onClick}
      className={cn(
        // Base glassmorphism styling - theme aware
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer",
        "bg-surface/20 backdrop-blur-xl",
        "border border-transparent",
        // Padding
        "p-5 sm:p-6",
        "min-h-[340px] sm:min-h-[420px] lg:min-h-[460px]",
        // Hover glow transition
        "transition-all duration-500 ease-out",
        "hover:border-transparent",
        "hover:bg-surface/40",
        "hover:shadow-lg hover:shadow-blue-500/10",
        "hover:scale-[1.01]",
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
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-surface/30">
          <Image
            src={service.image}
            alt={service.imageAlt}
            width={1200}
            height={800}
            className="h-44 sm:h-52 w-full object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
        </div>

        {/* Header: Icon + Category */}
        <div className="flex items-start justify-between mt-5">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-border/30 transition-colors duration-300 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 group-hover:border-blue-500/30">
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400 transition-colors duration-300 group-hover:text-cyan-400" />
          </div>
          <span className="rounded-full bg-surface/60 px-3 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary/70">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <FloatHeading as="h3" className="mt-5 text-xl sm:text-2xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-blue-400">
          {service.title}
        </FloatHeading>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-text-secondary/80 leading-relaxed transition-colors duration-300 group-hover:text-text-secondary flex-grow">
          {service.description}
        </p>

        {/* Learn more link */}
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-text-secondary/50 transition-colors duration-300 group-hover:text-cyan-400">
          <span>Explore</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </ScrollFloatReveal>
  );
}

export function ServicesBento() {
  const [selectedService, setSelectedService] = useState<BentoService | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleServiceClick = useCallback((service: BentoService, event: React.MouseEvent) => {
    // Get click position for the circular reveal
    setClickPosition({ x: event.clientX, y: event.clientY });
    setSelectedService(service);
    lockScroll();
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedService(null);
    unlockScroll();
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
            gradientWords={[1]}
            titleClassName="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl"
            className="mb-14 sm:mb-20"
          />

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {bentoServices.map((service, index) => (
              <BentoCard
                key={service.id}
                service={service}
                index={index}
                onClick={(e) => handleServiceClick(service, e)}
              />
            ))}
          </div>

          {/* CTA Button */}
          <ScrollFloatReveal
            y={REVEAL_CONFIG.translateY}
            delay={0.2}
            duration={MOTION_DURATION.medium}
            className="mt-14 sm:mt-20 flex justify-center"
          >
            <Link
              href="/web-solutions"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-500/30 ring-1 ring-white/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110"
            >
              <span>Explore Web Services</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ScrollFloatReveal>
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

