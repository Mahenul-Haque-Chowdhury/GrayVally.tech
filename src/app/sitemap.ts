import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://grayvally.tech";

  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/services`, lastModified: now },
    { url: `${base}/work`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
    { url: `${base}/privacy-policy`, lastModified: now },
    { url: `${base}/terms-of-service`, lastModified: now },
    { url: `${base}/refund-policy`, lastModified: now },
    { url: `${base}/cookie-policy`, lastModified: now },
  ];
}
