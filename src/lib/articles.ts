import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import config from "@payload-config";
import type { Article, Category, Media } from "@/payload-types";
import { ARTICLES_TAG } from "./cacheTags";

export const ARTICLES_PER_PAGE = 9;

/**
 * Queries run against Payload's local API — an in-process call, not HTTP, so
 * there is no network hop and no need for an API key.
 *
 * Results are wrapped in `unstable_cache` (this project does not enable Cache
 * Components, so `use cache` is unavailable) and tagged, letting the collection
 * hooks purge them the moment an editor publishes.
 */
async function payloadClient() {
  return getPayload({ config });
}

export type ArticleListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  byline: string;
  publishedAt: string | null;
  categoryTitle: string;
  categorySlug: string;
  image: { url: string; alt: string; width: number; height: number } | null;
};

/**
 * A relationship field is either a populated document or the bare ID, depending
 * on the query's `depth`. These narrow that union at the one place it matters.
 */
function populated<T extends object>(value: number | T | null | undefined): T | null {
  return value && typeof value === "object" ? value : null;
}

type MediaSize = NonNullable<Media["sizes"]>[keyof NonNullable<Media["sizes"]>];

/** Prefers a generated size when one exists, falling back to the original upload. */
export function toImage(
  media: number | Media | null | undefined,
  preferredSize?: keyof NonNullable<Media["sizes"]>,
) {
  const m = populated<Media>(media);
  if (!m) return null;

  const sized: MediaSize | undefined = preferredSize ? m.sizes?.[preferredSize] : undefined;
  const url = sized?.url ?? m.url;
  if (!url) return null;

  return {
    url,
    alt: m.alt ?? "",
    width: sized?.width ?? m.width ?? 1600,
    height: sized?.height ?? m.height ?? 900,
  };
}

function toListItem(doc: Article): ArticleListItem {
  const category = populated<Category>(doc.category);
  return {
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug ?? "",
    excerpt: doc.excerpt,
    byline: doc.byline,
    publishedAt: doc.publishedAt ?? null,
    categoryTitle: category?.title ?? "Update",
    categorySlug: category?.slug ?? "",
    image: toImage(doc.heroImage, "card"),
  };
}

/**
 * Runs a read and degrades to `fallback` if the database is unreachable.
 *
 * The site is overwhelmingly static marketing copy; only a few sections need
 * the CMS. A database blip must not take the whole page down with it, so these
 * reads fail soft and the affected section simply renders empty.
 *
 * Deliberately wraps *outside* `unstable_cache` — catching within the cached
 * function would store the empty fallback for the full revalidate window, so a
 * momentary outage would blank the section for an hour after recovery.
 */
async function degradeOnError<T>(
  operation: () => Promise<T>,
  fallback: T,
  label: string,
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error(`[articles] ${label} failed; rendering without it.`, error);
    return fallback;
  }
}

const getPublishedArticlesCached = unstable_cache(
  async ({ page = 1, categorySlug }: { page?: number; categorySlug?: string } = {}) => {
    const payload = await payloadClient();

    const result = await payload.find({
      collection: "articles",
      // `overrideAccess: false` makes the collection's read rule apply, so a
      // draft can never leak onto the public site through this path.
      overrideAccess: false,
      draft: false,
      depth: 1,
      page,
      limit: ARTICLES_PER_PAGE,
      // Featured first, then newest.
      sort: ["-featured", "-publishedAt"],
      where: categorySlug
        ? { "category.slug": { equals: categorySlug } }
        : undefined,
    });

    return {
      articles: result.docs.map(toListItem),
      totalPages: result.totalPages,
      page: result.page ?? 1,
      totalDocs: result.totalDocs,
    };
  },
  ["published-articles"],
  { tags: [ARTICLES_TAG], revalidate: 3600 },
);

export const getPublishedArticles = (
  args: { page?: number; categorySlug?: string } = {},
) =>
  degradeOnError(
    () => getPublishedArticlesCached(args),
    { articles: [] as ArticleListItem[], totalPages: 0, page: 1, totalDocs: 0 },
    "getPublishedArticles",
  );

const getLatestArticlesCached = unstable_cache(
  async (limit = 3) => {
    const payload = await payloadClient();
    const result = await payload.find({
      collection: "articles",
      overrideAccess: false,
      draft: false,
      depth: 1,
      limit,
      sort: ["-featured", "-publishedAt"],
    });
    return result.docs.map(toListItem);
  },
  ["latest-articles"],
  { tags: [ARTICLES_TAG], revalidate: 3600 },
);

export const getLatestArticles = (limit = 3) =>
  degradeOnError(
    () => getLatestArticlesCached(limit),
    [] as ArticleListItem[],
    "getLatestArticles",
  );

/**
 * Left to throw on purpose. An article page that 404s because the database
 * blinked would tell crawlers the URL is permanently gone; a 500 correctly
 * signals a transient fault, and Next will retry on the next request.
 */
export const getArticleBySlug = unstable_cache(
  async (slug: string) => {
    const payload = await payloadClient();
    const result = await payload.find({
      collection: "articles",
      overrideAccess: false,
      draft: false,
      depth: 2,
      limit: 1,
      where: { slug: { equals: slug } },
    });
    return result.docs[0] ?? null;
  },
  ["article-by-slug"],
  { tags: [ARTICLES_TAG], revalidate: 3600 },
);

/** Slugs for `generateStaticParams`, so published articles prerender at build. */
const getAllArticleSlugsCached = unstable_cache(
  async () => {
    const payload = await payloadClient();
    const result = await payload.find({
      collection: "articles",
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: { slug: true },
    });
    return result.docs
      .map((d) => d.slug)
      .filter((s): s is string => Boolean(s));
  },
  ["article-slugs"],
  { tags: [ARTICLES_TAG], revalidate: 3600 },
);

/**
 * Degrades to prerendering nothing rather than failing the build. `dynamicParams`
 * defaults to true, so articles still render on first request — a database blip
 * during CI costs a little cold-start latency, not a broken deploy.
 */
export const getAllArticleSlugs = () =>
  degradeOnError(getAllArticleSlugsCached, [] as string[], "getAllArticleSlugs");

const getCategoriesCached = unstable_cache(
  async () => {
    const payload = await payloadClient();
    const result = await payload.find({
      collection: "categories",
      depth: 0,
      limit: 100,
      sort: "title",
    });
    return result.docs.map((d) => ({
      title: d.title,
      slug: d.slug ?? "",
    }));
  },
  ["categories"],
  { tags: [ARTICLES_TAG], revalidate: 3600 },
);

export const getCategories = () =>
  degradeOnError(
    getCategoriesCached,
    [] as { title: string; slug: string }[],
    "getCategories",
  );

/** Consistent, locale-stable date rendering across cards and article headers. */
export function formatArticleDate(value: string | null): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
