import {
  Globe,
  Palette,
  Layout,
  Server,
  ShoppingCart,
  Database,
  Wrench,
  Smartphone,
  Cpu,
  TrendingUp,
  Lightbulb,
  Code2,
} from "lucide-react";

export const serviceCategories = [
  {
    title: "Development",
    items: [
      {
        id: "web-dev",
        title: "Website Development",
        description: "Custom business websites, landing pages, and portfolios.",
        icon: Globe,
      },
      {
        id: "frontend",
        title: "Front-End Development",
        description: "Pixel-perfect React/Next.js implementations with animations.",
        icon: Layout,
      },
      {
        id: "backend",
        title: "Back-End Development",
        description: "API development, server logic, and cloud deployment.",
        icon: Server,
      },
      {
        id: "mobile",
        title: "Mobile App Development",
        description: "Android/iOS apps using Flutter or React Native.",
        icon: Smartphone,
      },
    ],
  },
  {
    title: "Design",
    items: [
      {
        id: "ui-ux",
        title: "UI/UX & Web Design",
        description: "Modern, responsive designs, wireframing, and prototyping.",
        icon: Palette,
      },
    ],
  },
  {
    title: "Solutions",
    items: [
      {
        id: "ecommerce",
        title: "E-Commerce Solutions",
        description: "Custom online stores, Shopify, and payment integrations.",
        icon: ShoppingCart,
      },
      {
        id: "software",
        title: "Custom Software",
        description: "CRM/ERP development and automated workflows.",
        icon: Code2,
      },
      {
        id: "database",
        title: "Database & Server",
        description: "Database design, optimization, and server maintenance.",
        icon: Database,
      },
    ],
  },
  {
    title: "Growth & Support",
    items: [
      {
        id: "seo",
        title: "SEO & Marketing",
        description: "On-page/Technical SEO and content optimization.",
        icon: TrendingUp,
      },
      {
        id: "consultancy",
        title: "Tech Consultancy",
        description: "System architecture and technology advisory.",
        icon: Lightbulb,
      },
      {
        id: "maintenance",
        title: "Bug Fixing & Support",
        description: "Performance optimization, security patching, and updates.",
        icon: Wrench,
      },
    ],
  },
];

export const allServices = [
  {
    id: "01",
    title: "Website Development",
    description: "Custom business websites, Landing pages, Personal portfolios, Corporate and agency sites, Complete end-to-end builds.",
    icon: Globe,
    category: "Development",
  },
  {
    id: "02",
    title: "UI/UX & Web Design",
    description: "Modern, responsive designs, Wireframing & prototyping, Branding and design systems, Mobile-first layouts.",
    icon: Palette,
    category: "Design",
  },
  {
    id: "03",
    title: "Front-End Development",
    description: "Pixel-perfect implementations, React, Next.js, Vue, Animation & interaction design, Performance optimization.",
    icon: Layout,
    category: "Development",
  },
  {
    id: "04",
    title: "Back-End Development",
    description: "API development, Server-side logic, Authentication & user management, Payment gateway integration, Cloud deployment.",
    icon: Server,
    category: "Development",
  },
  {
    id: "05",
    title: "E-Commerce Solutions",
    description: "Custom online stores, Shopify, WooCommerce, Next.js Commerce, Cart, checkout & order flow setup, Secure payment integrations.",
    icon: ShoppingCart,
    category: "Solutions",
  },
  {
    id: "06",
    title: "Database & Server Management",
    description: "Database design (MySQL, MongoDB, PostgreSQL), Optimization & indexing, Backup & recovery, Server setup & maintenance.",
    icon: Database,
    category: "Solutions",
  },
  {
    id: "07",
    title: "Bug Fixing & Maintenance",
    description: "Front-end bug fixing, Performance issues, Cross-browser issues, Security patching, Regular updates & support plans.",
    icon: Wrench,
    category: "Support",
  },
  {
    id: "08",
    title: "Mobile App Development",
    description: "Android / iOS apps, Cross-platform (Flutter / React Native), API integration.",
    icon: Smartphone,
    category: "Development",
  },
  {
    id: "09",
    title: "Custom Software & Automation",
    description: "Tailored business tools, CRM/ERP development, Automated workflows, AI/ML integrations.",
    icon: Code2,
    category: "Solutions",
  },
  {
    id: "11",
    title: "SEO & Digital Marketing",
    description: "On-page SEO, Technical SEO, Content optimization, ads setup (Google, Meta).",
    icon: TrendingUp,
    category: "Growth",
  },
  {
    id: "12",
    title: "Tech Consultancy",
    description: "Project planning, System architecture, Business process automation, Ongoing technology advisory.",
    icon: Lightbulb,
    category: "Growth",
  },
];
