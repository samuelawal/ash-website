import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://ashipaelectric.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The CMS and its API have no business in search results.
      disallow: ["/admin", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
