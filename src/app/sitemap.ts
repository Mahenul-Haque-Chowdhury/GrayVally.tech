import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/data/portfolio";
import { blogPosts } from "@/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://grayvally.tech";

  const now = new Date();

  const workPages = getProjectSlugs().map((slug) => ({
    url: `${base}/work/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    // High priority pages
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/web-solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/software-solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/service-plans`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/audit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/apps`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    // Blog posts
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.lastModified),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...workPages,
  ];
}
