"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import PillNav from "./PillNav";
import "./PillNav.css";
import { softwareSolutionCategories } from "../data/softwareSolutions";
import { allServices } from "../data/services";

const ThemeToggle = dynamic(() => import("./ThemeToggle").then((mod) => mod.ThemeToggle), { ssr: false });

const excludedNavServices = new Set([
  "UI/UX & Web Design",
  "Front-End Development",
  "Back-End Development",
]);

const getSectionAnchor = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const navItems = [
  { 
    label: "Web", 
    href: "/web-solutions",
    children: allServices
      .filter(service => !excludedNavServices.has(service.title))
      .map(service => ({
        label: service.title,
        href: `/web-solutions#${getSectionAnchor(service.title)}`
      }))
  },
  { 
    label: "Software", 
    href: "/software-solutions",
    children: softwareSolutionCategories.map(category => ({
      label: category.title,
      href: `/software-solutions#${getSectionAnchor(category.title)}`
    }))
  },
  { label: "GrayVally CRM", href: "/crm" },
  { 
    label: "Apps", 
    href: "/apps",
    children: [
      { label: "Discord Music Bot", href: "/apps/discord-bot" },
      { label: "Business Card Maker", href: "https://businesscardmaker.grayvally.tech/" },
      { label: "GrayVally QR Studio", href: "https://qrcode.grayvally.tech" }
    ]
  },
  { label: "Experience", href: "/portfolio" },
  {
    label: "Resources",
    href: "/#resources",
    children: [
      { label: "Service Plans", href: "/service-plans" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
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
      rightContent={<ThemeToggle />}
    />
  );
}
