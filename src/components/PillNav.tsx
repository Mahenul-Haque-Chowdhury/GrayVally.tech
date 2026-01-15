"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import "./PillNav.css";

interface NavItem {
  label: string;
  href: string;
  ariaLabel?: string;
  children?: NavItem[];
}

interface PillNavProps {
  logo: string;
  logoAlt?: string;
  brandName?: string;
  brandSubtitle?: string;
  items: NavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
  rightContent?: React.ReactNode;
}

const DropdownItem = ({ href, label, isExternal }: { href: string, label: string, isExternal: boolean }) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const hoverLabelRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const circle = circleRef.current;
    const labelEl = labelRef.current;
    const hoverLabel = hoverLabelRef.current;

    if (!container || !circle || !labelEl || !hoverLabel) return;

    const tl = gsap.timeline({ paused: true });
    
    // Initial states
    gsap.set(circle, { scale: 0, transformOrigin: "50% 50%" });
    gsap.set(hoverLabel, { yPercent: 100, opacity: 0 });
    
    tl.to(circle, { scale: 1, duration: 0.4, ease: "power3.out" }, 0)
      .to(labelEl, { yPercent: -100, opacity: 0, duration: 0.4, ease: "power3.out" }, 0)
      .to(hoverLabel, { yPercent: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0);

    tlRef.current = tl;

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      tl.kill();
    };
  }, []);

  const Component = isExternal ? 'a' : Link;
  const props = isExternal ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };

  return (
    <Component
      {...props}
      ref={containerRef}
      className="relative block w-full overflow-hidden rounded-full px-4 py-2 text-center text-sm font-medium text-text-secondary transition-colors whitespace-nowrap"
    >
      {/* Hover Circle */}
      <span
        ref={circleRef}
        className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full bg-[var(--base)] pointer-events-none z-0"
      />
      
      {/* Label Stack */}
      <span className="relative z-10 block overflow-hidden">
        <span ref={labelRef} className="block relative px-2">{label}</span>
        <span 
          ref={hoverLabelRef} 
          className="absolute inset-0 flex items-center justify-center text-[var(--hover-text)]"
        >
          {label}
        </span>
      </span>
    </Component>
  );
};

const PillNav = ({
  logo,
  logoAlt = "Logo",
  brandName,
  brandSubtitle,
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#fff",
  pillColor = "#060010",
  hoveredPillTextColor = "#060010",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
  rightContent,
}: PillNavProps) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);
  const activeTweenRefs = useRef<gsap.core.Tween[]>([]);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate window size for circular reveal
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

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const white = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1 });
    }

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;

      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, {
          scale: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: "hidden" });
        gsap.to(navItems, {
          width: "auto",
          duration: 0.6,
          ease,
          onComplete: () => {
            gsap.set(navItems, { overflow: "visible" });
          },
        });
      }
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleDropdownEnter = (i: number) => {
    const dropdown = dropdownRefs.current[i];
    if (!dropdown) return;
    
    gsap.to(dropdown, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease,
      overwrite: "auto"
    });
  };

  const handleDropdownLeave = (i: number) => {
    const dropdown = dropdownRefs.current[i];
    if (!dropdown) return;

    gsap.to(dropdown, {
      autoAlpha: 0,
      y: 10,
      scale: 0.95,
      duration: 0.3,
      ease,
      overwrite: "auto"
    });
  };

  const closeMobileMenu = useCallback(() => {
    if (!isMobileMenuOpen) return;
    
    setIsAnimatingOpen(false);
    
    // Stop Lenis smooth scroll
    const lenis = (window as Window & { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (lenis) lenis.start();
    
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 500);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
      return;
    }
    
    // Capture click position for circular reveal
    setClickPosition({ x: e.clientX, y: e.clientY });
    setIsMobileMenuOpen(true);
    
    // Trigger animation after state update
    requestAnimationFrame(() => {
      setIsAnimatingOpen(true);
    });
    
    // Stop Lenis smooth scroll
    const lenis = (window as Window & { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (lenis) lenis.stop();

    onMobileMenuClick?.();
  };

  const isExternalLink = (href: string) =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#") ||
    href.startsWith("/#");

  const cssVars = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--hover-text": hoveredPillTextColor,
    "--pill-text": resolvedPillTextColor,
  } as React.CSSProperties;

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        <Link
          className="pill-brand"
          href="/"
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          ref={logoRef}
        >
          <div className="pill-logo">
            <Image
              src={logo}
              alt={logoAlt}
              width={36}
              height={36}
              ref={logoImgRef}
              className="pill-logo-img"
            />
          </div>
          {(brandName || brandSubtitle) && (
            <span className="pill-brand-title">
              {brandName && <span className="pill-brand-name">{brandName}</span>}
              {brandSubtitle && <span className="pill-brand-subtitle">{brandSubtitle}</span>}
            </span>
          )}
        </Link>

        <div className="pill-nav-center desktop-only">
          <div className="pill-nav-items" ref={navItemsRef}>
            <ul className="pill-list" role="menubar">
              {items.map((item, i) => (
                <li 
                  key={item.href || `item-${i}`} 
                  role="none" 
                  className="relative"
                  onMouseEnter={() => { handleEnter(i); handleDropdownEnter(i); }}
                  onMouseLeave={() => { handleLeave(i); handleDropdownLeave(i); }}
                >
                  {isExternalLink(item.href) ? (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={`pill${activeHref === item.href ? " is-active" : ""}`}
                      aria-label={item.ariaLabel || item.label}
                    >
                      <span
                        className="hover-circle"
                        aria-hidden="true"
                        ref={(el) => {
                          circleRefs.current[i] = el;
                        }}
                      />
                      <span className="label-stack">
                        <span className="pill-label">{item.label}</span>
                        <span className="pill-label-hover" aria-hidden="true">
                          {item.label}
                        </span>
                      </span>
                    </a>
                  ) : (
                    <Link
                      role="menuitem"
                      href={item.href}
                      className={`pill${activeHref === item.href ? " is-active" : ""}`}
                      aria-label={item.ariaLabel || item.label}
                    >
                      <span
                        className="hover-circle"
                        aria-hidden="true"
                        ref={(el) => {
                          circleRefs.current[i] = el;
                        }}
                      />
                      <span className="label-stack">
                        <span className="pill-label">{item.label}</span>
                        <span className="pill-label-hover" aria-hidden="true">
                          {item.label}
                        </span>
                      </span>
                    </Link>
                  )}
                  
                  {item.children && (
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 invisible opacity-0 z-50"
                      ref={(el) => { dropdownRefs.current[i] = el; }}
                    >
                      <div className="bg-surface border border-border/50 rounded-2xl shadow-xl overflow-hidden min-w-[260px] w-max max-w-[90vw] max-h-[60vh] overflow-y-auto p-2 flex flex-col gap-1">
                        {item.children.map((child, childIndex) => (
                          <div key={childIndex}>
                            <DropdownItem 
                              href={child.href} 
                              label={child.label} 
                              isExternal={isExternalLink(child.href)} 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {rightContent && <div className="pill-nav-right">{rightContent}</div>}
        </div>

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Full-screen Mobile Menu with Circular Reveal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={false}
            animate={{
              clipPath: isAnimatingOpen
                ? `circle(${maxRadius}px at ${clickPosition.x}px ${clickPosition.y}px)`
                : `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
            }}
            transition={{
              type: "spring",
              stiffness: isAnimatingOpen ? 20 : 300,
              damping: isAnimatingOpen ? 10 : 40,
            }}
            className="fixed inset-0 z-[200] bg-background/98 backdrop-blur-xl mobile-only"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
            
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={closeMobileMenu}
              className="fixed top-[max(1rem,env(safe-area-inset-top))] right-4 z-[210] flex h-12 w-12 items-center justify-center rounded-full bg-surface/80 backdrop-blur-xl border border-border/50 text-text-primary shadow-2xl transition-all duration-300 hover:bg-surface hover:scale-110"
            >
              <X className="h-6 w-6" />
            </motion.button>
            
            {/* Menu Content */}
            <div className="h-full flex flex-col items-center justify-center px-6">
              {/* Brand */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-10"
              >
                <Link href="/" onClick={closeMobileMenu} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface/50 border border-border/30 p-2">
                    <Image src={logo} alt={logoAlt} width={64} height={64} className="w-full h-full object-contain" />
                  </div>
                  {brandName && (
                    <span className="text-2xl font-bold text-text-primary">{brandName}</span>
                  )}
                  {brandSubtitle && (
                    <span className="text-sm text-text-secondary">{brandSubtitle}</span>
                  )}
                </Link>
              </motion.div>
              
              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-2 w-full max-w-xs">
                {items.map((item, i) => (
                  <motion.div
                    key={item.href || `mobile-item-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                    className="w-full"
                  >
                    {isExternalLink(item.href) ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full text-center py-4 px-6 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                          activeHref === item.href
                            ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white"
                            : "bg-surface/50 text-text-primary border border-border/30 hover:bg-surface hover:border-border/50"
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block w-full text-center py-4 px-6 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                          activeHref === item.href
                            ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white"
                            : "bg-surface/50 text-text-primary border border-border/30 hover:bg-surface hover:border-border/50"
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
              
              {/* Theme Toggle */}
              {rightContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="mt-8 p-4 rounded-2xl bg-surface/30 border border-border/30"
                >
                  {rightContent}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PillNav;
