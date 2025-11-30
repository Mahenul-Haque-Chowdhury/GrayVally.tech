"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { serviceCategories } from "../data/services";
import { ChevronDown } from "lucide-react";

const navItems = [
  { label: "Work", href: "#portfolio" },
  { label: "About", href: "#about" },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          <Logo />
          <span className="font-space text-xl font-bold text-text-primary">GrayVally</span>
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary focus:outline-none">
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full mt-4 w-[500px] -translate-x-1/2 rounded-xl border border-white/10 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {serviceCategories.map((category) => (
                        <div key={category.title}>
                          <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
                            {category.title}
                          </h3>
                          <ul className="space-y-3">
                            {category.items.map((item) => (
                              <li key={item.id}>
                                <Link
                                  href={`#services`}
                                  className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/5"
                                >
                                  <div className="mt-1 rounded-md bg-white/5 p-1 text-zinc-100 transition-colors group-hover:bg-blue-500/10 group-hover:text-blue-400">
                                    <item.icon className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-zinc-100 group-hover:text-blue-400">
                                      {item.title}
                                    </div>
                                    <p className="line-clamp-1 text-xs text-zinc-400">
                                      {item.description}
                                    </p>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <a
            href="#contact"
            className="hidden group relative overflow-hidden bg-text-primary px-4 py-2 text-sm font-medium text-background transition-transform active:scale-95 md:block"
          >
            <span className="relative z-10">Start Project</span>
            <div className="absolute inset-0 -translate-x-full bg-zinc-300 transition-transform group-hover:translate-x-0" />
          </a>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background md:hidden"
          >
            <nav className="flex flex-col space-y-4 p-6">
              <Link
                href="#services"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                Services
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="inline-block w-full bg-text-primary px-4 py-2 text-center text-sm font-medium text-background transition-transform active:scale-95"
              >
                Start Project
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
