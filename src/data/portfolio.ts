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
}

export const projects: Project[] = [
  {
    id: 1,
    client: "Intovah - IT Company",
    project: "AI-Driven VA & Agency Automation Platform",
    description: "A comprehensive automation platform leveraging AI to streamline virtual assistant operations and agency workflows.",
    year: "2025",
    role: "Full-Stack Developer",
    link: "https://intovah.com/",
    technologies: ["Next.js", "TypeScript", "AI/ML", "Node.js"],
    featured: true,
  },
  {
    id: 2,
    client: "JMR Trucking - Logistics Company",
    project: "Logistics & Freight Website for a US-Based Company",
    description: "Modern, responsive website for a logistics company showcasing their freight services and fleet management capabilities.",
    year: "2024",
    role: "Frontend Developer",
    link: "https://jmrtrucking.vercel.app/",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    featured: true,
  },
  {
    id: 3,
    client: "Trendology - E-Commerce",
    project: "AI-Powered Trend Prediction & Digital Research Tool",
    description: "Innovative platform using artificial intelligence to predict market trends and provide actionable insights for e-commerce businesses.",
    year: "2025",
    role: "Full-Stack Developer",
    link: "https://www.trendology.page/",
    technologies: ["Next.js", "Python", "Machine Learning", "PostgreSQL"],
    featured: true,
  },
  {
    id: 4,
    client: "WeSell - E-Commerce Store",
    project: "Modern E-Commerce Platform with Product Showcase",
    description: "Feature-rich e-commerce platform with modern UI/UX, product catalogs, and seamless shopping experience.",
    year: "2023",
    role: "Frontend Developer",
    link: "https://e-commerece-bice.vercel.app/",
    technologies: ["React", "CSS3", "JavaScript"],
    featured: true,
  },
  // Add more projects below as your portfolio grows
  // {
  //   id: 5,
  //   client: "Client Name",
  //   project: "Project Title",
  //   description: "Brief description of the project.",
  //   year: "2024",
  //   role: "Your Role",
  //   link: "https://project-link.com",
  //   technologies: ["Tech1", "Tech2"],
  //   featured: false,
  // },
];

// Get featured projects for homepage (first 4)
export const getFeaturedProjects = (count: number = 4): Project[] => {
  return projects.filter(p => p.featured).slice(0, count);
};

// Get all projects
export const getAllProjects = (): Project[] => {
  return projects;
};
