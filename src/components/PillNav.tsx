"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
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
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);
  const activeTweenRefs = useRef<gsap.core.Tween[]>([]);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    setIsMobileMenuOpen(false);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          className={`mobile-menu-button mobile-only ${isMobileMenuOpen ? 'is-open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile Menu Popup with Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[150] bg-black/20 mobile-only"
              onClick={closeMobileMenu}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-[4rem] right-3 left-auto w-[200px] z-[200] rounded-2xl bg-surface/95 backdrop-blur-xl border border-border/50 shadow-2xl mobile-only overflow-hidden"
              style={cssVars}
            >
              {/* Menu List */}
              <ul className="p-2 flex flex-col gap-1.5">
                {items.map((item, i) => (
                  <li key={item.href || `mobile-item-${i}`}>
                    {isExternalLink(item.href) ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-center transition-all duration-200 border ${
                          activeHref === item.href
                            ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white border-transparent shadow-lg"
                            : "bg-background/80 text-text-primary border-border/50 hover:bg-background hover:border-border"
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-center transition-all duration-200 border ${
                          activeHref === item.href
                            ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white border-transparent shadow-lg"
                            : "bg-background/80 text-text-primary border-border/50 hover:bg-background hover:border-border"
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              {/* Theme Toggle */}
              {rightContent && (
                <div className="px-3 pb-3 pt-2 flex justify-center border-t border-border/30">
                  {rightContent}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PillNav;
