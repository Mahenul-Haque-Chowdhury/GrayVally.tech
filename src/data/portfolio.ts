export type ProjectCategory =
  | "Web Apps"
  | "E-commerce"
  | "Business Websites"
  | "Internal Tools"
  | "MVPs";

export type ClientType = "Startup" | "SME" | "Internal" | "Agency";

export interface TechnicalDepthSection {
  title: string;
  description: string;
}

export interface Project {
  id: number;
  slug: string;
  client: string;
  project: string;
  description?: string;
  year: string;
  role: string;
  link?: string;
  technologies?: string[];
  featured?: boolean;
  featuredCaseStudy?: boolean;
  image?: string;
  color?: string;
  useScreenshot?: boolean;
  categories: ProjectCategory[];
  businessOutcome: string;
  clientType: ClientType;
  industry: string;
  timeline: string;
  problem: string;
  solution: string[];
  keyFeatures: string[];
  technicalDepth: TechnicalDepthSection[];
  outcomes: string[];
  gallery?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "restaurant-showcase-reservation",
    client: "Restaurant Showcase & Reservation",
    project: "Restaurant Showcase & Reservation",
    description: "A modern restaurant website featuring menu showcasing, reservation system, and an elegant user interface.",
    year: "2025",
    role: "Web App",
    link: "https://restaurant-gulshan.vercel.app/",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    featured: true,
    featuredCaseStudy: false,
    color: "from-orange-500 to-red-500",
    categories: ["Web Apps", "Business Websites"],
    businessOutcome: "Reduced manual bookings and improved table utilization.",
    clientType: "SME",
    industry: "Hospitality",
    timeline: "3-4 weeks",
    problem:
      "The restaurant relied on phone bookings and an outdated site, which caused missed reservations and low visibility for signature dishes. Staff had no easy way to manage table flow or communicate availability. They needed a modern, mobile-first experience that could handle real dining traffic.",
    solution: [
      "Designed a high-end storefront that highlights menus and specials with clear CTAs.",
      "Built a reservation flow that captures party size, preferred time, and contact details.",
      "Structured content blocks so staff can update menus without redesigning pages.",
    ],
    keyFeatures: [
      "Reservation form with validation and confirmation state",
      "Menu and specials sections with clear hierarchy",
      "Sticky call-to-action for bookings on mobile",
      "Location, hours, and contact info modules",
      "Trust cues with reviews and photo highlights",
    ],
    technicalDepth: [
      {
        title: "Architecture decisions",
        description: "Component-driven layout with reusable content blocks for menus, offers, and service details.",
      },
      {
        title: "Performance/SEO considerations",
        description: "Optimized imagery and semantic structure to improve local discovery and load speed.",
      },
      {
        title: "Backend-ready decisions",
        description: "Reservation capture and menu content modeled to plug into a future CMS or booking API.",
      },
    ],
    outcomes: [
      "Clearer booking flow that reduces back-and-forth calls.",
      "Improved visibility of signature items and time-limited offers.",
      "A premium brand feel aligned with in-person dining experience.",
    ],
  },
  {
    id: 2,
    slug: "grayvally-tech-agency-site",
    client: "Grayvally.tech - Software Company",
    project: "Grayvally.tech - Software Company",
    description: "Official website for Grayvally.tech, a software development agency specializing in high-performance web products and digital transformation.",
    year: "2025",
    role: "Agency",
    link: "https://www.grayvally.tech/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Radix UI", "Lenis"],
    featured: true,
    featuredCaseStudy: false,
    color: "from-indigo-600 to-violet-600",
    categories: ["Business Websites"],
    businessOutcome: "Brand-first site designed to convert qualified leads.",
    clientType: "Agency",
    industry: "Software Services",
    timeline: "2-3 weeks",
    problem:
      "The agency needed a credibility-focused site that communicated services, expertise, and proof without feeling generic. Existing messaging was too broad and did not guide prospects toward action. The site had to balance visual polish with fast load times.",
    solution: [
      "Structured service narratives around outcomes and decision-maker concerns.",
      "Created modular sections for proof, process, and differentiation.",
      "Implemented a performance-minded design system for speed and consistency.",
    ],
    keyFeatures: [
      "Service pages with clear deliverables and benefits",
      "Trust-building proof points and testimonials",
      "Conversion-focused CTAs with minimal friction",
      "Scalable component library for rapid updates",
      "Responsive layout for desktop and mobile decision-makers",
    ],
    technicalDepth: [
      {
        title: "Architecture decisions",
        description: "Reusable content blocks support future expansion without redesigning templates.",
      },
      {
        title: "Performance/SEO considerations",
        description: "Lean assets and optimized metadata for faster loads and better discovery.",
      },
      {
        title: "Backend-ready decisions",
        description: "Content structured to map cleanly into a CMS or headless API later.",
      },
    ],
    outcomes: [
      "Clearer positioning and service clarity for inbound leads.",
      "Improved confidence for enterprise and SME buyers.",
      "A scalable base for adding new verticals and case studies.",
    ],
  },
  {
    id: 3,
    slug: "grays-ecommerce-platform",
    client: "Grays-E-commerce Platform",
    project: "Grays-E-commerce Platform",
    description: "A high-performance e-commerce storefront featuring conversion-centric product browsing, merchandising, and seamless checkout flows.",
    year: "2025",
    role: "E-commerce",
    link: "https://grays-com-bd.vercel.app/",
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "TypeScript"],
    featured: true,
    featuredCaseStudy: false,
    color: "from-indigo-500 to-blue-500",
    categories: ["E-commerce", "Web Apps"],
    businessOutcome: "Conversion-focused storefront built for scale.",
    clientType: "SME",
    industry: "Retail",
    timeline: "4-6 weeks",
    problem:
      "The brand needed an e-commerce experience that could handle growing catalog complexity without slowing down. Existing pages lacked merchandising clarity and the checkout path felt fragmented. The team wanted a storefront optimized for conversion and future integrations.",
    solution: [
      "Built a fast, scalable catalog experience with clear product hierarchy.",
      "Designed checkout and cart flows to reduce friction at key decision points.",
      "Created reusable merchandising blocks for campaigns and seasonal pushes.",
    ],
    keyFeatures: [
      "High-performance product listing and filtering",
      "Clear product detail layout with upsell opportunities",
      "Streamlined cart and checkout flow",
      "Promo and campaign-ready merchandising blocks",
      "Mobile-first shopping experience with fast browsing",
      "Order confirmation and post-purchase UX",
    ],
    technicalDepth: [
      {
        title: "Architecture decisions",
        description: "Modular storefront architecture that supports catalog expansion without rebuilds.",
      },
      {
        title: "Performance/SEO considerations",
        description: "Optimized routing, caching-friendly layouts, and SEO-ready product metadata.",
      },
      {
        title: "Backend-ready decisions",
        description: "Product and order schemas designed to plug into future ERP or CMS systems.",
      },
    ],
    outcomes: [
      "Stronger merchandising clarity for browsing customers.",
      "Checkout flow designed to reduce abandonment.",
      "Foundation ready for integrations and marketing campaigns.",
    ],
  },
  {
    id: 4,
    slug: "wesell-electronics-shop",
    client: "WeSell-Electronics Online Shop",
    project: "WeSell-Electronics Online Shop",
    description: "A feature-rich electronics e-commerce platform with advanced product filtering, cart management, and a modern user interface.",
    year: "2025",
    role: "E-commerce",
    link: "https://e-commerece-bice.vercel.app/",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    featured: true,
    featuredCaseStudy: false,
    color: "from-blue-600 to-indigo-600",
    categories: ["E-commerce"],
    businessOutcome: "Streamlined product discovery and checkout experience.",
    clientType: "SME",
    industry: "Electronics Retail",
    timeline: "4-5 weeks",
    problem:
      "The shop needed a faster way for customers to find the right electronics without getting lost in large inventories. Existing product navigation felt crowded and cart actions were inconsistent. The goal was a refined storefront that boosted confidence and clarity.",
    solution: [
      "Implemented structured product filtering for quick discovery.",
      "Designed consistent cart interactions for updates and checkout.",
      "Created a UI system that highlights specs and comparisons.",
    ],
    keyFeatures: [
      "Category and filter panels for large product catalogs",
      "Persistent cart with clear quantity controls",
      "Product detail layout with specs and highlights",
      "Promo-ready banner and featured product blocks",
      "Mobile-optimized navigation and cart access",
    ],
    technicalDepth: [
      {
        title: "Architecture decisions",
        description: "Componentized catalog and cart modules for future feature expansion.",
      },
      {
        title: "Performance/SEO considerations",
        description: "Efficient page structure to keep high-traffic product pages fast.",
      },
      {
        title: "Backend-ready decisions",
        description: "Data models structured to support inventory syncing and order APIs.",
      },
    ],
    outcomes: [
      "Faster product discovery for buyers.",
      "More consistent checkout experience across devices.",
      "Cleaner merchandising for featured electronics.",
    ],
  },
  {
    id: 5,
    slug: "exclusive-modern-ecommerce",
    client: "Exclusive-Modern E-Commerce",
    project: "Exclusive-Modern E-Commerce",
    description: "A high-performance retail storefront with a focus on speed, responsiveness, and a premium shopping experience for modern consumers.",
    year: "2025",
    role: "E-commerce",
    link: "https://exclusive-e-commerce-five.vercel.app/",
    technologies: ["Next.js", "Tailwind CSS", "Redux", "TypeScript"],
    featured: false,
    featuredCaseStudy: false,
    color: "from-rose-500 to-pink-600",
    categories: ["E-commerce"],
    businessOutcome: "Premium storefront that keeps shoppers moving.",
    clientType: "Startup",
    industry: "Retail",
    timeline: "3-4 weeks",
    problem:
      "The client needed a storefront that felt premium yet loaded fast on mobile networks. The existing experience was inconsistent across devices and lacked strong merchandising. They wanted a fast, modern UI that could support growth.",
    solution: [
      "Built a responsive storefront with consistent interactions across devices.",
      "Focused merchandising blocks on featured categories and promotions.",
      "Implemented state management to keep cart actions smooth.",
    ],
    keyFeatures: [
      "Fast-loading product grids",
      "Responsive category navigation",
      "Stable cart state with instant feedback",
      "Hero merchandising for seasonal drops",
      "Product highlight sections for best sellers",
    ],
    technicalDepth: [
      {
        title: "Architecture decisions",
        description: "Redux-backed storefront to keep cart and product states predictable.",
      },
      {
        title: "Performance/SEO considerations",
        description: "Lean component structure and optimized media for faster rendering.",
      },
      {
        title: "Backend-ready decisions",
        description: "Catalog and cart models prepared for API-driven data later.",
      },
    ],
    outcomes: [
      "Cleaner shopping experience with premium presentation.",
      "Faster browsing for mobile shoppers.",
      "Merchandising layout ready for campaign launches.",
    ],
  },
  {
    id: 6,
    slug: "crystal-valley-auto-detail",
    client: "Crystal Valley-Auto Detail Service",
    project: "Crystal Valley-Auto Detail Service",
    description: "An online booking and service showcase platform for a premium auto detailing business, emphasizing quality and customer trust.",
    year: "2025",
    role: "Service",
    link: "https://crystalvalley.autos/",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    featured: false,
    featuredCaseStudy: true,
    color: "from-cyan-500 to-blue-500",
    categories: ["Business Websites", "Web Apps"],
    businessOutcome: "Online booking flow that reduces scheduling friction.",
    clientType: "SME",
    industry: "Automotive Services",
    timeline: "1-2 weeks",
    problem:
      "The business relied on messaging and calls to schedule services, which created delays and missed opportunities. The existing site did not communicate service tiers or outcomes clearly. They needed a polished platform that builds trust and drives bookings.",
    solution: [
      "Designed a premium service showcase with clear package tiers.",
      "Built a booking-focused layout that reduces friction on mobile.",
      "Added trust cues and before/after context throughout the site.",
    ],
    keyFeatures: [
      "Service package comparisons",
      "Quick booking CTA placement",
      "Mobile-first layout for local customers",
      "Trust sections for reviews and guarantees",
      "Process overview to set expectations",
    ],
    technicalDepth: [
      {
        title: "Architecture decisions",
        description: "Reusable service and testimonial blocks for ongoing promotions.",
      },
      {
        title: "Performance/SEO considerations",
        description: "Optimized for local search intent and fast page delivery.",
      },
      {
        title: "Backend-ready decisions",
        description: "Booking capture and service data structured for a future scheduling system.",
      },
    ],
    outcomes: [
      "Clearer service positioning for premium customers.",
      "Simpler booking path that reduces manual coordination.",
      "Brand trust reinforced with structured proof points.",
    ],
  },
  {
    id: 7,
    slug: "jmr-trucking-logistics",
    client: "JMR Trucking-Logistics Platform",
    project: "JMR Trucking-Logistics Platform",
    description: "Responsive web experience for a U.S.-based logistics company, highlighting services, KPIs, and lead capture.",
    year: "2025",
    role: "Logistics",
    link: "https://jmrtrucking.vercel.app/",
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "TypeScript"],
    featured: false,
    featuredCaseStudy: false,
    color: "from-blue-500 to-cyan-500",
    categories: ["Business Websites"],
    businessOutcome: "Lead-focused site clarifying services and credibility.",
    clientType: "SME",
    industry: "Logistics",
    timeline: "3-5 weeks",
    problem:
      "The company needed a credible digital presence that communicated operational capabilities and safety standards. The previous site did not highlight service scope or regional coverage clearly. They wanted a lead-focused experience for shippers.",
    solution: [
      "Structured service pages around shipment types and coverage.",
      "Added KPI and trust sections to reinforce operational credibility.",
      "Created a clear inquiry path to capture qualified leads.",
    ],
    keyFeatures: [
      "Service capability breakdowns",
      "Operations and safety highlight blocks",
      "Lead capture forms with clear CTAs",
      "Coverage and fleet overview sections",
      "Responsive layout for mobile decision-makers",
    ],
    technicalDepth: [
      {
        title: "Architecture decisions",
        description: "Section-based layout for rapid updates and new service lines.",
      },
      {
        title: "Performance/SEO considerations",
        description: "Optimized for fast loading and industry keyword targeting.",
      },
      {
        title: "Backend-ready decisions",
        description: "Lead data capture structured to connect to CRM pipelines.",
      },
    ],
    outcomes: [
      "Clearer service story for prospective shippers.",
      "Stronger credibility for enterprise buyers.",
      "Improved lead flow with focused CTAs.",
    ],
  },
  {
    id: 8,
    slug: "intovah-business-platform",
    client: "Intovah-Business Platform",
    project: "Intovah-Business Platform",
    description: "Modern corporate website delivering a clean, fast, and responsive user experience with clear service messaging.",
    year: "2025",
    role: "Corporate",
    link: "https://intovah.com",
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "TypeScript"],
    featured: false,
    featuredCaseStudy: false,
    color: "from-purple-500 to-pink-500",
    categories: ["Business Websites"],
    businessOutcome: "Clear service messaging with a refined corporate presence.",
    clientType: "SME",
    industry: "Professional Services",
    timeline: "3-4 weeks",
    problem:
      "The organization needed a modern corporate site that communicated services clearly and felt trustworthy. Previous content was scattered and lacked a consistent visual hierarchy. The goal was to present a polished brand while staying fast and accessible.",
    solution: [
      "Created a clean content structure that prioritizes core services.",
      "Designed a layout system for consistent messaging across pages.",
      "Focused on clarity and speed to support decision-maker browsing.",
    ],
    keyFeatures: [
      "Service overview and detail pages",
      "Consistent typography and spacing system",
      "Trust cues and company highlights",
      "Responsive layout for desktop and mobile",
      "Simple contact flow for inquiries",
    ],
    technicalDepth: [
      {
        title: "Architecture decisions",
        description: "Standardized layout components to keep content consistent.",
      },
      {
        title: "Performance/SEO considerations",
        description: "Optimized structure and metadata for visibility and speed.",
      },
      {
        title: "Backend-ready decisions",
        description: "Content data modeled to slot into a future CMS workflow.",
      },
    ],
    outcomes: [
      "Clearer service narrative for prospective clients.",
      "Improved brand consistency across pages.",
      "Foundation ready for adding new service lines.",
    ],
  },
  {
    id: 9,
    slug: "trendology-analytics",
    client: "Trendology.page",
    project: "Trendology.page",
    description: "A modern platform with a clean design and user-friendly experience for trend analysis.",
    year: "2025",
    role: "Web App",
    link: "https://trendology.page/",
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "TypeScript"],
    featured: false,
    featuredCaseStudy: false,
    color: "from-emerald-500 to-teal-500",
    categories: ["Web Apps", "MVPs"],
    businessOutcome: "Insight dashboard built for quick trend discovery.",
    clientType: "Startup",
    industry: "Analytics",
    timeline: "5-6 weeks",
    problem:
      "The product needed a clear way to surface insights without overwhelming users. Early screens were too data-heavy and lacked obvious next steps. The goal was a crisp, usable dashboard that communicated trends quickly.",
    solution: [
      "Designed a dashboard layout focused on top insights first.",
      "Created visual hierarchy for charts and actionable cards.",
      "Built navigation flows that support exploration without clutter.",
    ],
    keyFeatures: [
      "Insight-first dashboard layout",
      "Trend cards with quick summaries",
      "Expandable detail panels",
      "Responsive chart components",
      "Focused navigation for fast switching",
    ],
    technicalDepth: [
      {
        title: "Architecture decisions",
        description: "Modular dashboard widgets allow new metrics without redesigns.",
      },
      {
        title: "Performance/SEO considerations",
        description: "Optimized data rendering paths to keep dashboards responsive.",
      },
      {
        title: "Backend-ready decisions",
        description: "Clear API boundaries for analytics data and user preferences.",
      },
    ],
    outcomes: [
      "Cleaner insights presentation for early adopters.",
      "Reduced cognitive load for complex data sets.",
      "Dashboard framework ready for new data sources.",
    ],
  },
  {
    id: 10,
    slug: "course-logistics-platform",
    client: "Course Logistics Platform",
    project: "Course Logistics Platform",
    description: "Developed a full-stack course management system for educational institutions with real-time analytics.",
    year: "2025",
    role: "Education",
    link: "https://courselogistics.net",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false,
    featuredCaseStudy: false,
    color: "from-orange-500 to-red-500",
    categories: ["Internal Tools", "Web Apps"],
    businessOutcome: "Operations platform that centralizes course logistics.",
    clientType: "Internal",
    industry: "Education",
    timeline: "6-8 weeks",
    problem:
      "Course coordinators managed schedules, resources, and progress across fragmented spreadsheets. Updates were slow and reporting lacked consistency. The institution needed a unified platform for visibility and operational control.",
    solution: [
      "Created a centralized system for schedules, resources, and progress tracking.",
      "Designed a workflow that mirrors real coordinator tasks.",
      "Added analytics views to surface operational bottlenecks.",
    ],
    keyFeatures: [
      "Course scheduling dashboard",
      "Resource assignment tracking",
      "Instructor and cohort management",
      "Progress and completion insights",
      "Admin-ready reporting views",
    ],
    technicalDepth: [
      {
        title: "Architecture decisions",
        description: "Role-based views to separate admin and coordinator workflows.",
      },
      {
        title: "Performance/SEO considerations",
        description: "Optimized internal navigation and data tables for fast access.",
      },
      {
        title: "Backend-ready decisions",
        description: "Structured entities for courses, cohorts, and resources to scale.",
      },
    ],
    outcomes: [
      "Centralized operations that reduce manual tracking.",
      "Clear visibility into course progress and capacity.",
      "Scalable foundation for new programs and reporting.",
    ],
  },
];

// Get featured projects for homepage (first 4)
export const getFeaturedProjects = (count: number = 4): Project[] => {
  return projects.filter((project) => project.featured).slice(0, count);
};

// Get all projects
export const getAllProjects = (): Project[] => {
  return projects;
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};

export const getProjectSlugs = (): string[] => {
  return projects.map((project) => project.slug);
};
