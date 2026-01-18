"use client";

import { useState, useEffect } from "react";
import LogoLoop from "./LogoLoop";

export function ProductTicker() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const keywords = [
    "Website Development",
    "E-Commerce Solutions",
    "Database & Server Management",
    "Bug Fixing & Maintenance",
    "Mobile App Development",
    "Custom Software & Automation",
    "SEO & Digital Marketing",
    "Tech Consultancy",
    "Enterprise Core & Operations Platform",
    "People, Identity & Access",
    "Revenue, Sales & Customer Platforms",
    "Finance & Monetization Systems",
    "Data, Analytics & Intelligence",
    "Industry & SaaS Platforms",
  ];

  const logoItems = keywords.map((keyword) => ({
    node: (
      <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4">
        <span className="text-xs sm:text-sm font-medium text-text-secondary/80 uppercase tracking-wider whitespace-nowrap">
          {keyword}
        </span>
        <span className="h-1 w-1 rounded-full bg-blue-500/50" />
      </div>
    ),
  }));

  return (
    <div className="relative w-full overflow-hidden border-y border-border/40 bg-surface/30 py-2 sm:py-3 backdrop-blur-sm -mt-12 sm:-mt-16">
      <LogoLoop
        logos={logoItems}
        speed={isMobile ? 30 : 50}
        direction="left"
        pauseOnHover={true}
        logoHeight={isMobile ? 20 : 24}
        gap={0}
      />
    </div>
  );
}
