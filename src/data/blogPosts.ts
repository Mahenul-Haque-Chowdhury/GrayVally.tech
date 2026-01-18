export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  readingTime: string;
  lastModified: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "choose-web-development-company-bangladesh",
    title: "How to choose a web development company in Bangladesh (practical guide)",
    summary:
      "A step-by-step checklist to help you evaluate and select the right web development partner in Bangladesh.",
    description:
      "A practical, non-technical checklist for founders and business owners evaluating web development companies in Bangladesh.",
    readingTime: "10 min read",
    lastModified: "2024-01-15",
  },
  {
    slug: "nextjs-performance-optimization-lessons",
    title: "Next.js performance optimization: lessons from real projects",
    summary:
      "Practical techniques for speeding up Next.js websites, from images and fonts to caching and Core Web Vitals.",
    description:
      "Concrete techniques we use at GrayVally to improve performance and Core Web Vitals on Next.js websites.",
    readingTime: "8 min read",
    lastModified: "2024-02-01",
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
