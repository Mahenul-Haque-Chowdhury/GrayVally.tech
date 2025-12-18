export interface Project {
  id: number;
  client: string;
  project: string;
  description?: string;
  year: string;
  role: string;
  link?: string;
  technologies?: string[];
  featured?: boolean;
  image?: string;
  color?: string;
  useScreenshot?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    client: "Restaurant Showcase & Reservation",
    project: "Restaurant Showcase & Reservation",
    description: "A modern restaurant website featuring menu showcasing, reservation system, and an elegant user interface.",
    year: "2025",
    role: "Web App",
    link: "https://restaurant-gulshan.vercel.app/",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    featured: true,
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://restaurant-gulshan.vercel.app/",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    client: "Grayvally.tech — Software Company",
    project: "Grayvally.tech — Software Company",
    description: "Official website for Grayvally.tech, a software development agency specializing in high-performance web products and digital transformation.",
    year: "2025",
    role: "Agency",
    link: "https://www.grayvally.tech/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    featured: true,
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://www.grayvally.tech/",
    color: "from-indigo-600 to-violet-600",
  },
  {
    id: 3,
    client: "Grays — E-commerce Platform",
    project: "Grays — E-commerce Platform",
    description: "A high-performance e-commerce storefront featuring conversion-centric product browsing, merchandising, and seamless checkout flows.",
    year: "2025",
    role: "E-commerce",
    link: "https://grays-com-bd.vercel.app/",
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "TypeScript"],
    featured: true,
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://grays-com-bd.vercel.app/",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 4,
    client: "WeSell — Electronics Online Shop",
    project: "WeSell — Electronics Online Shop",
    description: "A feature-rich electronics e-commerce platform with advanced product filtering, cart management, and a modern user interface.",
    year: "2025",
    role: "E-commerce",
    link: "https://e-commerece-bice.vercel.app/",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    featured: true,
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://e-commerece-bice.vercel.app/",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 5,
    client: "Exclusive — Modern E-Commerce",
    project: "Exclusive — Modern E-Commerce",
    description: "A high-performance retail storefront with a focus on speed, responsiveness, and a premium shopping experience for modern consumers.",
    year: "2025",
    role: "E-commerce",
    link: "https://exclusive-e-commerce-five.vercel.app/",
    technologies: ["Next.js", "Tailwind CSS", "Redux", "TypeScript"],
    featured: false,
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://exclusive-e-commerce-five.vercel.app/",
    color: "from-rose-500 to-pink-600",
  },
  {
    id: 6,
    client: "Crystal Valley — Auto Detail Service",
    project: "Crystal Valley — Auto Detail Service",
    description: "An online booking and service showcase platform for a premium auto detailing business, emphasizing quality and customer trust.",
    year: "2025",
    role: "Service",
    link: "https://crystal-auto-detailing.vercel.app/",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    featured: false,
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://crystal-auto-detailing.vercel.app/",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 7,
    client: "JMR Trucking — Logistics Platform",
    project: "JMR Trucking — Logistics Platform",
    description: "Responsive web experience for a U.S.-based logistics company, highlighting services, KPIs, and lead capture.",
    year: "2025",
    role: "Logistics",
    link: "https://jmrtrucking.vercel.app/",
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "TypeScript"],
    featured: false,
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://jmrtrucking.vercel.app/",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 8,
    client: "Intovah — Business Platform",
    project: "Intovah — Business Platform",
    description: "Modern corporate website delivering a clean, fast, and responsive user experience with clear service messaging.",
    year: "2025",
    role: "Corporate",
    link: "https://intovah.com",
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "TypeScript"],
    featured: false,
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://intovah.com",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 9,
    client: "Trendology.page",
    project: "Trendology.page",
    description: "A modern platform with a clean design and user‑friendly experience for trend analysis.",
    year: "2025",
    role: "Web App",
    link: "https://trendology.page/",
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "TypeScript"],
    featured: false,
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://trendology.page/",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 10,
    client: "Course Logistics Platform",
    project: "Course Logistics Platform",
    description: "Developed a full-stack course management system for educational institutions with real-time analytics.",
    year: "2025",
    role: "Education",
    link: "https://courselogistics.net",
    technologies: ["HTML", "CSS", "JavaScript"],
    featured: false,
    image: "https://image.thum.io/get/width/1200/crop/750/noanimate/https://courselogistics.net",
    color: "from-orange-500 to-red-500",
  }
];

// Get featured projects for homepage (first 4)
export const getFeaturedProjects = (count: number = 4): Project[] => {
  return projects.filter(p => p.featured).slice(0, count);
};

// Get all projects
export const getAllProjects = (): Project[] => {
  return projects;
};
