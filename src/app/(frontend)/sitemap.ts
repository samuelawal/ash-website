import type { MetadataRoute } from "next";

import { getAllArticleSlugs, getPublishedArticles } from "@/lib/articles";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://ashipaelectric.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/ev-charging`, changeFrequency: "monthly", priority: 0.8 },
    // MONITORING DISABLED — the route is parked, so keep it out of the sitemap.
    // { url: `${SITE_URL}/monitoring`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/resources`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/compliance`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/careers`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  try {
    const slugs = await getAllArticleSlugs();
    // One extra query supplies real publish dates for `lastModified`.
    const { articles } = await getPublishedArticles({ page: 1 });
    const dateBySlug = new Map(articles.map((a) => [a.slug, a.publishedAt]));

    return [
      ...staticRoutes,
      ...slugs.map((slug) => ({
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: dateBySlug.get(slug)
          ? new Date(dateBySlug.get(slug) as string)
          : undefined,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    // A database blip should degrade the sitemap, not fail the whole build.
    return staticRoutes;
  }
}
