"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { socialProfiles } from "@/data/socials";
import { FORMSPREE_ENDPOINT } from "@/lib/formspree";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/Section";

const footerLinks = {
  services: [
    { name: "Website Development", href: "/web-solutions" },
    { name: "E-Commerce Solutions", href: "/web-solutions" },
    { name: "Bug Fixing & Maintenance", href: "/software-solutions" },
    { name: "Mobile App Development", href: "/apps" },
    { name: "Custom Software", href: "/software-solutions" },
    { name: "SEO & Digital Marketing", href: "/web-solutions" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Apps", href: "/apps" },
    { name: "Service Plans", href: "/service-plans" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/about#faqs" },
    { name: "Documentation", href: "/docs" },
    { name: "Support Ticket", href: "/contact" },
    { name: "Contact", href: "/contact" }
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
  ],
};

const socialLinks = [
  { name: socialProfiles.linkedin.label, href: socialProfiles.linkedin.url, icon: Linkedin },
  { name: socialProfiles.facebook.label, href: socialProfiles.facebook.url, icon: Facebook },
  { name: socialProfiles.instagram.label, href: socialProfiles.instagram.url, icon: Instagram },
  { name: socialProfiles.whatsapp.label, href: socialProfiles.whatsapp.url, icon: MessageCircle },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [submitting, setSubmitting] = useState(false);
  const trustBoxRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Trustpilot && trustBoxRef.current) {
      (window as any).Trustpilot.loadFromElement(trustBoxRef.current, true);
    }
  }, [theme]);

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isAndroid, setIsAndroid] = useState(false);
  const reducedMotion = useReducedMotion();

  const revealWrapperClass = isAndroid ? "relative" : "relative overflow-hidden";
  const revealInitial = isAndroid ? "visible" : "hidden";
  const revealAnimate = isAndroid ? "visible" : undefined;
  const revealWhileInView = isAndroid ? undefined : "visible";
  const revealViewport = isAndroid ? undefined : { once: true, margin: "-100px" };

  const footerRevealVariant = useMemo(() => {
    if (reducedMotion || isAndroid) {
      return {
        hidden: { opacity: 0, y: 12, clipPath: "inset(0 0 0 0)" },
        visible: {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0 0)",
          transition: { duration: 0.5, ease: "easeOut" },
        },
      };
    }

    return {
      hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      visible: {
        clipPath: "inset(0 0 0 0)",
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    };
  }, [isAndroid, reducedMotion]);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setIsAndroid(/android/i.test(navigator.userAgent));
  }, []);

  const footerClassName = "bg-slate-50/80 dark:bg-slate-900/70";

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("formType", "newsletter");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Newsletter form error:", error);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const footerBody = (
    <>
      {status === "success" && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-border/40 bg-background p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary/70">
                  Subscription confirmed
                </p>
                <p className="mt-2 text-sm text-text-primary">
                  Thank you for subscribing. You can unsubscribe anytime.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-border/60 px-4 py-2 text-xs font-semibold text-text-secondary hover:border-border/80 hover:text-text-primary transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Main Footer Content */}
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-6 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 lg:pl-12">
            <div className={revealWrapperClass}>
              <motion.div
                variants={footerRevealVariant}
                initial={revealInitial}
                animate={revealAnimate}
                whileInView={revealWhileInView}
                viewport={revealViewport}
                className="flex flex-col items-start text-left"
              >
                <Link href="/" className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                  <Image
                    src="/GrayVally.png"
                    alt="GrayVally Logo"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                  <span className="text-xl font-bold text-text-primary">GrayVally</span>
                </Link>
                <Reveal as="p" variant="bodyText" className="text-sm text-text-secondary leading-relaxed max-w-xs mb-6">
                  Building digital infrastructure that powers ambitious businesses. From concept to deployment, we deliver excellence.
                </Reveal>
                
                {/* Contact Info */}
                <div className="space-y-2">
                  <a 
                    href="mailto:contact@grayvally.tech" 
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-blue-400 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    contact@grayvally.tech
                  </a>
                  <a 
                    href="mailto:support@grayvally.tech" 
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-blue-400 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    support@grayvally.tech
                  </a>
                  <a 
                    href="tel:+8801798651950" 
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-blue-400 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    +880 1798-651950
                  </a>
                  <div className="flex items-start gap-2 text-sm text-text-secondary">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Bashundhora R/A, House: 423, Road: 14, Block: J,
                      <br />
                      Dhaka, 1229
                    </span>
                  </div>
                </div>

                <div className="mt-5 w-full">
                  <div className={revealWrapperClass}>
                    <motion.div
                      variants={footerRevealVariant}
                      initial={revealInitial}
                      animate={revealAnimate}
                      whileInView={revealWhileInView}
                      viewport={revealViewport}
                      className="flex w-full flex-col items-start gap-4"
                    >
                      {/* Social Links */}
                      <div className="flex items-center gap-3">
                        {socialLinks.map((social) => (
                          <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface/60 border border-border/30 text-text-secondary transition-colors duration-300 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400"
                            aria-label={social.name}
                          >
                            <social.icon className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                      <div className="flex w-full flex-col gap-2 text-left">
                        <h3 className="text-lg sm:text-xl font-semibold text-text-primary whitespace-nowrap">
                          Subscribe to Newsletter
                        </h3>
                        <form className="flex w-full flex-col gap-2" onSubmit={handleNewsletterSubmit}>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="w-full flex-1 rounded-full border border-border/40 bg-background/40 px-4 py-2 text-sm text-text-primary placeholder:text-text-secondary/60 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/40 transition-colors"
                          />
                          <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center justify-center rounded-full bg-text-primary px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-blue-500"
                          >
                            {submitting ? "Subscribing..." : "Subscribe"}
                          </button>
                          {status === "error" && (
                            <span className="inline-flex items-center gap-2 text-xs text-red-400">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              Something went wrong. Please try again.
                            </span>
                          )}
                        </form>
                      </div>
                      
                      {/* Trustpilot Widget */}
                      <div className="w-full pt-4">
                        <div 
                          ref={trustBoxRef}
                          className="trustpilot-widget" 
                          data-locked="true"
                          data-style-height="52px" 
                          data-style-width="100%" 
                          data-theme={theme} 
                          data-stars="5"
                          data-review-languages="en"
                          data-locale="en-US" 
                          data-template-id="56278e9abfbbba0bdcd568bc" 
                          data-businessunit-id="69862e2babb8a0a264526c5d" 
                          data-token="e2f6e294-3731-4ad7-a66b-ef59a8ba6f5f"
                        >
                          <a href="https://www.trustpilot.com/review/grayvally.tech" target="_blank" rel="noopener noreferrer">Trustpilot</a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Services Column */}
          <div className="col-span-1 text-left">
            <div className={revealWrapperClass}>
              <motion.div
                variants={footerRevealVariant}
                initial={revealInitial}
                animate={revealAnimate}
                whileInView={revealWhileInView}
                viewport={revealViewport}
              >
                <Reveal as="h3" variant="headline" className="text-sm font-semibold text-text-primary mb-4">Services</Reveal>
                <ul className="space-y-2.5">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Company Column */}
          <div className="col-span-1 text-left">
            <div className={revealWrapperClass}>
              <motion.div
                variants={footerRevealVariant}
                initial={revealInitial}
                animate={revealAnimate}
                whileInView={revealWhileInView}
                viewport={revealViewport}
              >
                <Reveal as="h3" variant="headline" className="text-sm font-semibold text-text-primary mb-4">Company</Reveal>
                <ul className="space-y-2.5">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Support Column */}
          <div className="col-span-1 text-left">
            <div className={revealWrapperClass}>
              <motion.div
                variants={footerRevealVariant}
                initial={revealInitial}
                animate={revealAnimate}
                whileInView={revealWhileInView}
                viewport={revealViewport}
              >
                <Reveal as="h3" variant="headline" className="text-sm font-semibold text-text-primary mb-4">Support</Reveal>
                <ul className="space-y-2.5">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Legal Column */}
          <div className="col-span-1 text-left">
            <div className={revealWrapperClass}>
              <motion.div
                variants={footerRevealVariant}
                initial={revealInitial}
                animate={revealAnimate}
                whileInView={revealWhileInView}
                viewport={revealViewport}
              >
                <Reveal as="h3" variant="headline" className="text-sm font-semibold text-text-primary mb-4">Legal</Reveal>
                <ul className="space-y-2.5">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-50/70 dark:bg-slate-900/70 relative z-20">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-3 sm:py-4">
          <div className={revealWrapperClass}>
            <motion.div
              variants={footerRevealVariant}
              initial={revealInitial}
              animate="visible"
              className="flex items-center justify-center text-center"
            >
              <p className="text-xs sm:text-sm text-text-secondary">
                &copy; 2026 GrayVally Software Solutions. All rights reserved.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );

  if (isAndroid) {
    return <footer className={footerClassName}>{footerBody}</footer>;
  }

  return (
    <Section as="footer" className={footerClassName}>
      {footerBody}
    </Section>
  );
}
