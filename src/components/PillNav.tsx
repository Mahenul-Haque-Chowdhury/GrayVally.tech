"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import "./PillNav.css";

const DropdownChevron = () => (
  <span className="pill-caret" aria-hidden="true">
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const MotionLink = motion.create(Link);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

const DropdownItem = ({ href, label, isExternal, isActive }: { href: string, label: string, isExternal: boolean, isActive?: boolean }) => {
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
      className={`relative block w-full overflow-hidden rounded-full px-4 py-2 text-center text-sm font-medium text-text-secondary transition-colors whitespace-nowrap${isActive ? " pill-dropdown-item-active" : ""}`}
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
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);
  const activeTweenRefs = useRef<gsap.core.Tween[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotionRef = useRef(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      prefersReducedMotionRef.current = media.matches;
    };

    update();
    media.addEventListener?.("change", update);

    return () => {
      media.removeEventListener?.("change", update);
    };
  }, []);


  useIsomorphicLayoutEffect(() => {
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

    const constrainDropdowns = () => {
      if (typeof window === "undefined") return;
      const gutter = 12;
      dropdownRefs.current.forEach((dropdown) => {
        if (!dropdown) return;
        dropdown.style.setProperty("--dropdown-shift", "0px");
        const rect = dropdown.getBoundingClientRect();
        if (!rect.width) return;
        let shift = 0;
        if (rect.left < gutter) {
          shift = gutter - rect.left;
        } else if (rect.right > window.innerWidth - gutter) {
          shift = window.innerWidth - gutter - rect.right;
        }
        if (shift !== 0) {
          dropdown.style.setProperty("--dropdown-shift", `${Math.round(shift)}px`);
        }
      });
    };

    layout();
    constrainDropdowns();

    const onResize = () => {
      layout();
      constrainDropdowns();
    };
    window.addEventListener("resize", onResize);

    const fontReady = document.fonts?.ready?.then(() => {
      layout();
      constrainDropdowns();
    }).catch(() => {});
    const readyTimeout = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 600);
    });

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;

      if (logoEl) {
        gsap.set(logoEl, { scale: 1, opacity: 1 });
      }

      if (navItems) {
        gsap.set(navItems, { width: "auto", overflow: "visible" });
      }
    }

    const reveal = async () => {
      if (prefersReducedMotionRef.current) {
        setIsReady(true);
        return;
      }

      await Promise.race([fontReady, readyTimeout]);
      requestAnimationFrame(() => {
        setIsReady(true);
        constrainDropdowns();
      });
    };

    reveal();

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

  const handleDropdownEnter = (i: number) => {
    const dropdown = dropdownRefs.current[i];
    if (!dropdown) return;

    dropdown.style.setProperty("--dropdown-shift", "0px");
    const rect = dropdown.getBoundingClientRect();
    if (rect.width) {
      const gutter = 12;
      let shift = 0;
      if (rect.left < gutter) {
        shift = gutter - rect.left;
      } else if (rect.right > window.innerWidth - gutter) {
        shift = window.innerWidth - gutter - rect.right;
      }
      if (shift !== 0) {
        dropdown.style.setProperty("--dropdown-shift", `${Math.round(shift)}px`);
      }
    }
    
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
    setExpandedMobileItems([]);

    const hamburger = hamburgerRef.current;
    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
      gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
    }

    requestAnimationFrame(() => {
      hamburgerRef.current?.focus();
    });
  }, [ease, isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    onMobileMenuClick?.();
  }, [ease, isMobileMenuOpen, onMobileMenuClick]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    lastFocusedElementRef.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusedElementRef.current?.focus();
    };
  }, [closeMobileMenu, isMobileMenuOpen]);

  const toggleMobileSubmenu = useCallback((href: string) => {
    setExpandedMobileItems((current) =>
      current.includes(href) ? current.filter((item) => item !== href) : [...current, href]
    );
  }, []);

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
    <div className="pill-nav-container" data-ready={isReady ? "true" : "false"}>
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        <MotionLink
          className="pill-brand"
          href="/"
          aria-label="Home"
          ref={logoRef}
          whileHover={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          onClick={(event) => {
            if (activeHref === "/") {
              event.preventDefault();
              window.location.reload();
            }
          }}
        >
          <div className="pill-logo">
            <Image
              src={logo}
              alt={logoAlt}
              width={36}
              height={36}
              className="pill-logo-img"
            />
          </div>
          {(brandName || brandSubtitle) && (
            <span className="pill-brand-title">
              {brandName && <span className="pill-brand-name">{brandName}</span>}
              {brandSubtitle && <span className="pill-brand-subtitle">{brandSubtitle}</span>}
            </span>
          )}
        </MotionLink>

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
                        <span className="pill-label">
                          <span className="pill-label-content">
                            {item.label}
                            {item.children?.length ? <DropdownChevron /> : null}
                          </span>
                        </span>
                        <span className="pill-label-hover" aria-hidden="true">
                          <span className="pill-label-content">
                            {item.label}
                            {item.children?.length ? <DropdownChevron /> : null}
                          </span>
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
                        <span className="pill-label">
                          <span className="pill-label-content">
                            {item.label}
                            {item.children?.length ? <DropdownChevron /> : null}
                          </span>
                        </span>
                        <span className="pill-label-hover" aria-hidden="true">
                          <span className="pill-label-content">
                            {item.label}
                            {item.children?.length ? <DropdownChevron /> : null}
                          </span>
                        </span>
                      </span>
                    </Link>
                  )}
                  
                  {item.children && (
                    <div 
                      className="pill-dropdown-popover absolute left-1/2 top-full pt-4 invisible opacity-0 z-50"
                      ref={(el) => { dropdownRefs.current[i] = el; }}
                    >
                      <div className="bg-surface border border-border/50 rounded-2xl shadow-xl overflow-hidden min-w-[260px] w-max max-w-[90vw] max-h-[60vh] overflow-y-auto p-2 flex flex-col gap-1">
                        {item.children.map((child, childIndex) => (
                          <div key={childIndex}>
                            <DropdownItem 
                              href={child.href} 
                              label={child.label} 
                              isExternal={isExternalLink(child.href)}
                              isActive={activeHref ? child.href === activeHref || (activeHref.startsWith(child.href.split("#")[0]) && child.href.split("#")[0].length > 1) : false}
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
          type="button"
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-haspopup="dialog"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            className="mobile-menu-popover mobile-only"
            initial={{ opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{ ...cssVars, visibility: "visible" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <ul className="mobile-menu-list">
              {items.map((item) => (
                <li key={item.href}>
                  <div className="flex items-center justify-between gap-2">
                    {isExternalLink(item.href) ? (
                      <a
                        href={item.href}
                        className="mobile-menu-link flex-1"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="mobile-menu-link flex-1"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                    {item.children ? (
                      <button
                        type="button"
                        className="mobile-subtoggle"
                        aria-label={`Toggle ${item.label} menu`}
                        aria-expanded={expandedMobileItems.includes(item.href)}
                        onClick={() => toggleMobileSubmenu(item.href)}
                      >
                        <span className="pill-caret" aria-hidden="true">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9l6 6 6-6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                    ) : null}
                  </div>
                  {item.children ? (
                    <ul className={`mobile-submenu ${expandedMobileItems.includes(item.href) ? "expanded" : ""}`}>
                      {item.children.map((child) =>
                        isExternalLink(child.href) ? (
                          <li key={`${child.href}-${child.label}`}>
                            <a
                              href={child.href}
                              className="mobile-menu-link mobile-submenu-link"
                              onClick={closeMobileMenu}
                            >
                              {child.label}
                            </a>
                          </li>
                        ) : (
                          <li key={`${child.href}-${child.label}`}>
                            <Link
                              href={child.href}
                              className="mobile-menu-link mobile-submenu-link"
                              onClick={closeMobileMenu}
                            >
                              {child.label}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
            {rightContent && <div className="mobile-menu-extras">{rightContent}</div>}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default PillNav;
