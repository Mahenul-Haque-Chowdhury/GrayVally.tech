"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "About", href: "#about" },
];

export function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          <Logo />
          <span className="font-space text-xl font-bold text-text-primary">GrayVally</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-8 md:flex">
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

          <ThemeToggle />

          <a
            href="#contact"
            className="hidden group relative overflow-hidden bg-text-primary px-4 py-2 text-sm font-medium text-background transition-transform active:scale-95 md:block"
          >
            <span className="relative z-10">Start Project</span>
            <div className="absolute inset-0 -translate-x-full bg-zinc-300 transition-transform group-hover:translate-x-0" />
          </a>
        </div>
      </div>
    </header>
  );
}
