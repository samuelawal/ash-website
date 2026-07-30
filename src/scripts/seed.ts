/**
 * Carries the three articles that were previously hardcoded in
 * `siteData.blog.items` into the CMS, so the site does not go from three
 * articles to none the moment it starts reading from Payload.
 *
 * Safe to re-run: every step is keyed on slug and skips what already exists.
 *
 *   npx tsx src/scripts/seed.ts
 */
import path from "path";
import { fileURLToPath } from "url";

import { getPayload } from "payload";

import config from "../payload.config";
import { slugify } from "../fields/slug";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const publicDir = path.resolve(dirname, "../../public");

type SeedArticle = {
  title: string;
  image: string;
  alt: string;
  byline: string;
  publishedAt: string;
  category: string;
  excerpt: string;
  body: string[];
};

const SEED: SeedArticle[] = [
  {
    title: "Partnering with WeCyclers for Circular Energy Solutions",
    image: "images/blog-wecyclers.jpg",
    alt: "WeCyclers plastic collection hub powered by solar",
    byline: "Ashipa Communications",
    publishedAt: "2026-06-15",
    category: "Partnership",
    excerpt:
      "We are partnering to integrate clean energy into plastic collection hubs, combining recycling with solar power.",
    body: [
      "Ashipa Electric and WeCyclers are bringing clean energy to plastic collection hubs across Lagos, pairing recycling infrastructure with reliable solar power.",
      "Collection hubs run compaction and sorting equipment that has historically depended on grid power or diesel generators. Neither is dependable, and both erode the margins that make recycling viable at community scale.",
      "By siting solar and storage directly at the hubs, operators get predictable running costs and uninterrupted uptime — and the circular economy gains a cleaner foundation.",
    ],
  },
  {
    title: "Unlocking Carbon Credits for Distributed Energy Developers in West Africa",
    image: "images/blog-minigrid-aerial.png",
    alt: "Aerial view of a West African minigrid installation",
    byline: "Investment Team",
    publishedAt: "2026-05-02",
    category: "Finance",
    excerpt:
      "An in-depth look at how digital utilities can leverage decentralized power assets to generate and sell carbon offsets.",
    body: [
      "Distributed energy developers across West Africa are sitting on an underused asset: the verified emissions they displace every day.",
      "Carbon markets have historically been out of reach for distributed operators. Verification costs assume utility-scale volumes, and the metering evidence required is rarely available at the granularity auditors expect.",
      "That calculus changes when telemetry is built in from the start. Continuous, per-asset generation and consumption data turns a costly manual audit into a reporting exercise — and turns displaced diesel into a tradeable revenue line.",
    ],
  },
  {
    title: "Building Revenue Assurance for Decentralized Utilities",
    image: "images/team-meeting-solar.png",
    alt: "Ashipa Electric team reviewing operational data on site",
    byline: "Operations Team",
    publishedAt: "2026-03-18",
    category: "Operations",
    excerpt:
      "How transparent metering and live operational data help distributed energy developers protect revenue and serve communities reliably.",
    body: [
      "Revenue assurance is the difference between a distributed utility that scales and one that quietly leaks margin until it stalls.",
      "Losses rarely arrive as a single dramatic failure. They accumulate: an uncalibrated meter here, an unbilled connection there, a fault that goes unnoticed for a fortnight because nobody was watching the right dashboard.",
      "Live operational data closes those gaps. When generation, consumption, and payment status are visible in one place, discrepancies surface in hours instead of quarters — and communities get service that stays on.",
    ],
  },
];

/** Payload's Lexical editor state for a simple sequence of paragraphs. */
function toLexical(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "" as const,
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        textFormat: 0,
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text,
            version: 1,
          },
        ],
      })),
    },
  };
}

async function seed() {
  const payload = await getPayload({ config });

  for (const item of SEED) {
    const slug = slugify(item.title);

    const existing = await payload.find({
      collection: "articles",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      payload.logger.info(`Skipping "${item.title}" — already present.`);
      continue;
    }

    // Categories are shared, so look up before creating.
    const categorySlug = slugify(item.category);
    const foundCategory = await payload.find({
      collection: "categories",
      where: { slug: { equals: categorySlug } },
      limit: 1,
    });
    const category =
      foundCategory.docs[0] ??
      (await payload.create({
        collection: "categories",
        data: { title: item.category, slug: categorySlug },
      }));

    const media = await payload.create({
      collection: "media",
      data: { alt: item.alt },
      filePath: path.resolve(publicDir, item.image),
    });

    await payload.create({
      collection: "articles",
      data: {
        title: item.title,
        slug,
        excerpt: item.excerpt,
        byline: item.byline,
        publishedAt: new Date(item.publishedAt).toISOString(),
        category: category.id,
        heroImage: media.id,
        content: toLexical(item.body),
        _status: "published",
      },
      // The seed runs outside a request, so there is no cache to revalidate.
      context: { disableRevalidate: true },
    });

    payload.logger.info(`Created "${item.title}".`);
  }

  payload.logger.info("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
