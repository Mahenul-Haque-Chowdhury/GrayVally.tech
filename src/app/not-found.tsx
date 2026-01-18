"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useEffect, useState } from "react";
import FuzzyText from "@/components/FuzzyText";
import { FloatHeading } from "@/components/ui/ScrollFloat";

export default function NotFound() {
  const [fuzzyColor, setFuzzyColor] = useState("#E5E5E5");

  useEffect(() => {
    // Check initial theme and get computed CSS variable
    const updateColor = () => {
      const isDark = document.documentElement.classList.contains("theme-dark");
      // Use theme-matching colors: dark mode = bright text, light mode = dark text
      setFuzzyColor(isDark ? "#E5E5E5" : "#18181B");
    };

    updateColor();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateColor();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center overflow-hidden relative transition-colors duration-300">
      {/* Background gradient effects - theme aware */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="theme-light:bg-gradient-to-br theme-light:from-blue-100/30 theme-light:via-transparent theme-light:to-cyan-100/30 absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
      </div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none bg-blue-500/10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none bg-cyan-500/10" />
      
      <div className="relative z-10 text-center px-4 sm:px-6">
        {/* Fuzzy 404 Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <FuzzyText
            fontSize="clamp(6rem, 20vw, 14rem)"
            fontWeight={900}
            color={fuzzyColor}
            baseIntensity={0.2}
            hoverIntensity={0.6}
            enableHover={true}
          >
            404
          </FuzzyText>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FloatHeading as="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
            Page Not{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Found
            </span>
          </FloatHeading>
          <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-md mx-auto mb-8 sm:mb-10">
            Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-text-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-background transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <Home className="relative z-10 h-4 w-4" />
            <span className="relative z-10">Back to Home</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-300 group-hover:translate-x-0" />
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/30 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-text-primary transition-colors duration-300 hover:border-border hover:bg-surface/50"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-16 pt-8 border-t border-border"
        >
          <p className="text-xs sm:text-sm text-text-secondary mb-4">
            Or try one of these helpful links:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/web-solutions"
              className="text-sm text-text-secondary hover:text-blue-400 transition-colors"
            >
              Web Solutions
            </Link>
            <Link
              href="/#portfolio"
              className="text-sm text-text-secondary hover:text-blue-400 transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/#about"
              className="text-sm text-text-secondary hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-text-secondary hover:text-blue-400 transition-colors"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
