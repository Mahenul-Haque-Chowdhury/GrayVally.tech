"use client";

import { useState, useEffect } from "react";
import LogoLoop from "./LogoLoop";

export function ProductTicker() {
  const [isMobile, setIsMobile] = useState(false);
  const [enableLoop, setEnableLoop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setEnableLoop(false);
      return;
    }
    const timer = window.setTimeout(() => setEnableLoop(true), 900);
    return () => window.clearTimeout(timer);
  }, [isMobile]);

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
        <span className="text-sm sm:text-base font-semibold text-text-secondary/80 uppercase tracking-wider whitespace-nowrap">
          {keyword}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500/50" />
      </div>
    ),
  }));

  return (
    <div className="relative w-full bg-surface/30 py-3 sm:py-4 backdrop-blur-sm -mt-24 sm:-mt-20">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 overflow-hidden">
        {enableLoop ? (
          <LogoLoop
            logos={logoItems}
            speed={50}
            direction="left"
            pauseOnHover={true}
            logoHeight={28}
            gap={0}
          />
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-1">
            {keywords.map((keyword) => (
              <div key={keyword} className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-semibold text-text-secondary/80 uppercase tracking-wider whitespace-nowrap">
                  {keyword}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500/50" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
