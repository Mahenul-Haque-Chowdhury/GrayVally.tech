"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import PillNav from "./PillNav";
import "./PillNav.css";

const ThemeToggle = dynamic(() => import("./ThemeToggle").then((mod) => mod.ThemeToggle), { ssr: false });

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <PillNav
      logo="/GrayVally.png"
      logoAlt="GrayVally Logo"
      brandName="GrayVally"
      items={navItems}
      activeHref={pathname}
      ease="power3.easeOut"
      rightContent={<ThemeToggle />}
    />
  );
}
