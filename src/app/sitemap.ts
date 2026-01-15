import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://grayvally.tech";

  const now = new Date();

  const blogPosts = [
    { slug: "choose-web-development-company-bangladesh", lastModified: new Date("2024-01-15") },
    { slug: "nextjs-performance-optimization-lessons", lastModified: new Date("2024-02-01") },
  ];

  return [
    // High priority pages
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/web-solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/software-solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/audit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/apps`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    // Legal pages
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/refund-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    // Blog posts
    ...blogPosts.map(post => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
