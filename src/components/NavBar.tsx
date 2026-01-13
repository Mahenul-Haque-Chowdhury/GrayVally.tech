"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import PillNav from "./PillNav";
import "./PillNav.css";
import { softwareSolutionCategories } from "../data/softwareSolutions";
import { allServices } from "../data/services";

const ThemeToggle = dynamic(() => import("./ThemeToggle").then((mod) => mod.ThemeToggle), { ssr: false });

const navItems = [
  { 
    label: "Web Solutions", 
    href: "/web-solutions",
    children: allServices.map(service => ({
      label: service.title,
      href: "/web-solutions"
    }))
  },
  { 
    label: "Software Solutions", 
    href: "/software-solutions",
    children: softwareSolutionCategories.map(category => ({
      label: category.title,
      href: "/software-solutions"
    }))
  },
  { 
    label: "Apps", 
    href: "/apps",
    children: [
      { label: "Discord Music Bot", href: "/apps/discord-bot" },
      { label: "Business Card Maker", href: "https://businesscardmaker.grayvally.tech/" }
    ]
  },
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
      brandSubtitle="Software Solutions"
      items={navItems}
      activeHref={pathname}
      ease="power3.easeOut"
      rightContent={<ThemeToggle />}
    />
  );
}
