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
    slug: "crystal-valley-auto-detail",
    client: "Crystal Valley-Auto Detail Service",
    project: "Crystal Valley-Auto Detail Service",
    description: "An online booking and service showcase platform for a premium auto detailing business, emphasizing quality and customer trust.",
    year: "2025",
    role: "Service",
    link: "https://crystalvalley.autos/",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    featured: true,
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
    id: 2,
    slug: "course-logistics-platform",
    client: "Course Logistics Platform",
    project: "Course Logistics Platform",
    description: "Developed a full-stack course management system for educational institutions with real-time analytics.",
    year: "2025",
    role: "Education",
    link: "https://courselogistics.net",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: true,
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
  {
    id: 3,
    slug: "intovah-business-platform",
    client: "Intovah-Business Platform",
    project: "Intovah-Business Platform",
    description: "Modern corporate website delivering a clean, fast, and responsive user experience with clear service messaging.",
    year: "2025",
    role: "Corporate",
    link: "https://intovah.com",
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "TypeScript"],
    featured: true,
    featuredCaseStudy: true,
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
