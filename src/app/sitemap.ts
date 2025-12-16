import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://grayvally.tech";

  const now = new Date();

  const blogPosts = [
    { slug: "choose-web-development-company-bangladesh", lastModified: new Date("2024-01-15") },
    { slug: "nextjs-performance-optimization-lessons", lastModified: new Date("2024-02-01") },
  ];

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/audit`, lastModified: now },
    { url: `${base}/services`, lastModified: now },
    { url: `${base}/portfolio`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
    { url: `${base}/blog`, lastModified: now },
    { url: `${base}/privacy-policy`, lastModified: now },
    { url: `${base}/terms-of-service`, lastModified: now },
    { url: `${base}/refund-policy`, lastModified: now },
    { url: `${base}/cookie-policy`, lastModified: now },
    ...blogPosts.map(post => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.lastModified,
    })),
  ];
}
