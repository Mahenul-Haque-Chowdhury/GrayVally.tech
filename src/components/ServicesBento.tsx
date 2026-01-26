"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  LucideIcon,
  X,
  CheckCircle2,
  Network,
  Webhook,
  ShieldCheck,
  Layers,
  Search,
  Bug,
} from "lucide-react";
import {
  Globe,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import {
  SiAdobeaftereffects,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiJavascript,
  SiJsonwebtokens,
  SiGithub,
  SiGraphql,
  SiGoogleanalytics,
  SiGoogleads,
  SiFigma,
  SiGooglesearchconsole,
  SiGoogletagmanager,
  SiHotjar,
  SiHubspot,
  SiLinkedin,
  SiMailchimp,
  SiMeta,
  SiMysql,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiPrisma,
  SiPostgresql,
  SiRedis,
  SiReactquery,
  SiRadixui,
  SiTrpc,
  SiFramer,
  SiLucide,
  SiGit,
  SiVercel,
  SiCloudflare,
  SiYoutube,
  SiDigitalocean,
  SiDocker,
  SiAmazon,
  SiZoho,
} from "react-icons/si";
import { cn } from "@/lib/utils";
import ScrollFloat, { FloatHeading, ScrollFloatReveal } from "@/components/ui/ScrollFloat";
import { MOTION_DURATION, REVEAL_CONFIG } from "@/lib/motion/constants";
import ScrollVelocity from "@/components/ScrollVelocity";

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

const getServiceAnchor = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Curated services for the bento layout with specific sizing
const bentoServices: BentoService[] = [
  {
    id: "01",
    title: "Website Development",
    description: "Custom business websites and landing pages built for speed, scale, and conversion.",
    icon: Globe,
    category: "Development",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    image: "/web-development-services.webp",
    imageAlt: "Website development service preview",
  },
  {
    id: "02",
    title: "E-Commerce Solutions",
    description: "Conversion-first storefronts with secure payments and scalable architecture.",
    icon: ShoppingCart,
    category: "Solutions",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    image: "/ecommerce-solutions.webp",
    imageAlt: "E-commerce solutions service preview",
  },
  {
    id: "03",
    title: "SEO & Digital Marketing",
    description: "Technical SEO and growth campaigns that improve visibility and ROI.",
    icon: BarChart3,
    category: "Growth",
    gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    image: "/seo-digital-marketing.webp",
    imageAlt: "SEO and digital marketing service preview",
  },
];

const techStackIcons = [
  { icon: SiHtml5, label: "HTML5", color: "#E34F26" },
  { icon: SiCss3, label: "CSS3", color: "#1572B6" },
  { icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: SiMysql, label: "SQL", color: "#4479A1" },
  { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, label: "Next.js", className: "text-slate-900 dark:text-white" },
  { icon: SiExpress, label: "Express.js", className: "text-slate-900 dark:text-white" },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "#06B6D4" },
  { icon: SiRadixui, label: "Radix UI", className: "text-slate-900 dark:text-white" },
  { icon: SiFramer, label: "Framer Motion", className: "text-slate-900 dark:text-white" },
  { icon: SiLucide, label: "Lucide", className: "text-slate-900 dark:text-white" },
  { icon: Layers, label: "Zustand", color: "#94A3B8" },
  { icon: SiReactquery, label: "React Query", color: "#FF4154" },
  { icon: SiTrpc, label: "tRPC", color: "#2596BE" },
  { icon: SiPrisma, label: "Prisma", color: "#2D3748" },
  { icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
  { icon: SiRedis, label: "Redis", color: "#DC382D" },
  { icon: Network, label: "REST APIs", color: "#38BDF8" },
  { icon: SiGraphql, label: "GraphQL", color: "#E10098" },
  { icon: Webhook, label: "WebSockets", color: "#38BDF8" },
  { icon: SiJsonwebtokens, label: "JWT", color: "#94A3B8" },
  { icon: ShieldCheck, label: "OAuth 2.0", color: "#22C55E" },
  { icon: SiGit, label: "Git", color: "#F05032" },
  { icon: SiGithub, label: "GitHub", className: "text-slate-900 dark:text-white" },
  { icon: SiDocker, label: "Docker", color: "#2496ED" },
  { icon: SiVercel, label: "Vercel", className: "text-slate-900 dark:text-white" },
  { icon: SiCloudflare, label: "Cloudflare", color: "#F38020" },
];

const toolsStack = [
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
  { icon: SiAdobephotoshop, name: "Photoshop", color: "#31A8FF" },
  { icon: SiAdobeillustrator, name: "Illustrator", color: "#FF9A00" },
  { icon: SiAdobepremierepro, name: "Premiere Pro", color: "#9999FF" },
  { icon: SiAdobeaftereffects, name: "After Effects", color: "#9999FF" },
  { icon: SiGoogleanalytics, name: "Google Analytics", color: "#E37400" },
  { icon: SiGooglesearchconsole, name: "Google Search Console", color: "#4285F4" },
  { icon: SiGoogletagmanager, name: "Google Tag Manager", color: "#246FDB" },
  { icon: SiMeta, name: "Meta Pixel", color: "#1877F2" },
  { icon: SiMeta, name: "Meta Business Suite", color: "#1877F2" },
  { icon: SiGoogleads, name: "Google Ads", color: "#4285F4" },
  { icon: SiLinkedin, name: "LinkedIn Ads", color: "#0A66C2" },
  { icon: SiYoutube, name: "YouTube Ads", color: "#FF0000" },
  { icon: SiHubspot, name: "HubSpot", color: "#FF7A59" },
  { icon: SiMailchimp, name: "Mailchimp", color: "#FFE01B" },
  { icon: Search, name: "Ahrefs", color: "#FF6B2B" },
  { icon: Bug, name: "Screaming Frog", color: "#22C55E" },
  { icon: SiHotjar, name: "Hotjar", color: "#FF3C00" },
  { icon: SiAmazon, name: "AWS", color: "#FF9900" },
  { icon: SiDigitalocean, name: "DigitalOcean", color: "#0080FF" },
  { icon: SiVercel, name: "Vercel", color: "#FFFFFF" },
  { icon: SiCloudflare, name: "Cloudflare", color: "#F38020" },
  { icon: SiZoho, name: "Zoho Mail", color: "#E42527" },
  { icon: SiGoogleads, name: "Google Keyword Planner", color: "#4285F4" },
];

const titleGradientClass =
  "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent";

const renderGradientTitle = (text: string, gradientIndices: number[]) => {
  const words = text.split(" ");
  const gradientSet = new Set(gradientIndices);
  return words.map((word, index) => (
    <span
      key={`${word}-${index}`}
      className={gradientSet.has(index) ? titleGradientClass : undefined}
    >
      {word}
      {index < words.length - 1 ? " " : null}
    </span>
  ));
};

const whyChooseUsFeatures = [
  {
    title: "Your ideas are safe with us. Period.",
    description: "We treat your concepts, data, and intellectual property with strict confidentiality.",
  },
  {
    title: "Reasonable, growth-focused service plans",
    description: "Transparent pricing tiers designed to scale with your goals.",
  },
  {
    title: "Experienced engineering team",
    description: "Senior builders with proven delivery across complex products.",
  },
  {
    title: "Business-first development approach",
    description: "We align every feature to outcomes that matter to your business.",
  },
  {
    title: "Clear communication and transparency",
    description: "Weekly updates, clear milestones, and no hidden surprises.",
  },
  {
    title: "Long-term technical partnership",
    description: "Ongoing optimization, support, and strategic guidance.",
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

const bentoGridVariant: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const bentoCardPeekVariant: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
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
      
      {/* Scrollable container */}
      <div 
        className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y"
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
}

function BentoCard({ service, index, className }: BentoCardProps) {
  const Icon = service.icon;
  const anchor = getServiceAnchor(service.title);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-3xl",
        className
      )}
    >
      <motion.div
        variants={bentoCardPeekVariant}
        className={cn(
          // Base glassmorphism styling - theme aware
          "group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer z-0",
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
          "hover:scale-[1.01]"
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
        <div className="relative overflow-hidden rounded-2xl bg-surface/30">
          <Image
            src={service.image}
            alt={service.imageAlt}
            width={1200}
            height={800}
            className="h-44 sm:h-52 w-full object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
        <Link
          href={`/web-solutions#${anchor}`}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300 shadow-sm shadow-blue-500/20 transition-colors duration-300 hover:border-blue-400 hover:bg-blue-500/20"
          aria-label={`Learn more about ${service.title}`}
        >
          <span>Learn more about {service.title}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Corner accent */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>
    </div>
  );
}

export function ServicesBento() {
  const [enableVelocity, setEnableVelocity] = useState(false);
  const heroTechStackIcons = useMemo(
    () =>
      (
        <span className="inline-flex items-center gap-8 sm:gap-9">
          {techStackIcons.map(({ icon: Icon, label, color, className }) => (
            <span key={label} className="inline-flex items-center">
              <Icon
                className={cn("h-8 w-8 sm:h-9 sm:w-9", className)}
                style={color ? { color } : undefined}
                aria-label={label}
              />
            </span>
          ))}
        </span>
      ),
    []
  );

  const heroToolsWithNames = useMemo(
    () => (
      <span className="inline-flex items-center gap-8 sm:gap-9">
        {toolsStack.map((tool) => (
          <span key={tool.name} className="inline-flex items-center gap-2">
            <tool.icon className="h-8 w-8 sm:h-9 sm:w-9" style={{ color: tool.color }} aria-hidden />
            <span className="text-xl sm:text-2xl font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
              {tool.name}
            </span>
          </span>
        ))}
      </span>
    ),
    []
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setEnableVelocity(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <>
      <section
        id="services"
        className="relative z-10 bg-background pt-12 pb-20 sm:pt-16 sm:pb-24 md:pt-20 md:pb-28 overflow-hidden transition-colors duration-300"
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />

        {/* Ambient glow (hidden on small screens to avoid overlapping mobile strips) */}
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] pointer-events-none z-0" />
        <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[128px] pointer-events-none z-0" />

        <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6">
          <div className="mb-16 sm:mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: -30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
                Why <span className="text-blue-500">Choose</span> Us?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-start">
              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-2xl lg:sticky lg:top-24">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                      hidden: { opacity: 0, scale: 0, borderRadius: "100%" },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        borderRadius: "24px",
                        transition: { type: "spring", stiffness: 60, damping: 15, delay: 0.2 },
                      },
                    }}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-transparent"
                  >
                    <Image
                      src="/whychooseus.webp"
                      alt="Why choose us"
                      fill
                      className="object-contain scale-110"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="space-y-1"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {whyChooseUsFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    variants={{
                      hidden: { opacity: 0, y: -20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: "easeOut" },
                      },
                    }}
                    className="rounded-2xl bg-surface/10 p-2 sm:p-3 border border-white/5 hover:bg-surface/20 transition-colors duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <motion.div
                        variants={{
                          hidden: { y: "-100%" },
                          visible: {
                            y: "0%",
                            transition: { duration: 0.45, ease: "easeOut" },
                          },
                        }}
                        className="flex items-center gap-3 min-w-0"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/15">
                          <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.55)]" />
                        </span>
                        <h3 className="min-w-0 text-base sm:text-xl font-semibold text-text-primary tracking-tight">
                          {feature.title}
                        </h3>
                      </motion.div>
                    </div>
                    {index === 1 ? (
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: -6 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.4, ease: "easeOut", delay: 0.25 },
                          },
                        }}
                        className="pl-9 mt-2"
                      >
                        <Link
                          href="/service-plans"
                          className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 shadow-sm shadow-blue-500/20 transition-colors hover:border-blue-400 hover:bg-blue-500/20"
                        >
                          View Structured Service Plans
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </motion.div>
                    ) : null}
                    {feature.description ? (
                      <div className="relative overflow-hidden pl-9 mt-2">
                        <motion.p
                          variants={{
                            hidden: { y: "100%" },
                            visible: {
                              y: "0%",
                              transition: { duration: 0.4, ease: "easeOut", delay: 0.05 },
                            },
                          }}
                          className="text-sm sm:text-lg text-text-secondary/80 tracking-tight"
                        >
                          {feature.description}
                        </motion.p>
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="mt-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-3 text-base sm:text-lg md:text-xl font-semibold text-text-secondary uppercase tracking-wider"
              >
                <span className="text-base sm:text-xl font-semibold tracking-tight">
                  We handle all your stacks &amp; Tools
                </span>
              </motion.div>
              <div className="mt-6">
                {enableVelocity ? (
                  <ScrollVelocity
                    texts={[heroTechStackIcons, heroToolsWithNames]}
                    velocity={28}
                    className="px-6 sm:px-8"
                    scrollerClassName="text-xl sm:text-2xl md:text-3xl font-semibold text-text-secondary uppercase tracking-wider"
                    parallaxClassName="py-0.5 sm:py-1"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-6">
                      {techStackIcons.map(({ icon: Icon, label, color, className }) => (
                        <span key={label} className="inline-flex items-center">
                          <Icon
                            className={cn("h-7 w-7", className)}
                            style={color ? { color } : undefined}
                            aria-label={label}
                          />
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      {toolsStack.map((tool) => (
                        <span key={tool.name} className="inline-flex items-center gap-2">
                          <tool.icon className="h-6 w-6" style={{ color: tool.color }} aria-hidden />
                          <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                            {tool.name}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="mb-14 sm:mb-20 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/30 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-text-secondary mb-6">
              What We Do
            </span>
            <div className="relative overflow-hidden">
              <motion.h2
                initial={{ y: "-100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="my-0 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-text-primary font-display"
              >
                {renderGradientTitle("Engineering Excellence", [1])}
              </motion.h2>
            </div>
            <div className="relative overflow-hidden mt-4 sm:mt-6">
              <motion.p
                initial={{ y: "-100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="max-w-2xl text-sm sm:text-base md:text-lg text-text-secondary/90 leading-relaxed"
              >
                Our core competencies lie in building the invisible backbone of modern digital products.
              </motion.p>
            </div>
          </div>

          {/* Bento Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={bentoGridVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {bentoServices.map((service, index) => (
              <BentoCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </motion.div>

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

    </>
  );
}

export default ServicesBento;



