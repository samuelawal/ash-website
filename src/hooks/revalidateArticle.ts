import { revalidatePath, revalidateTag } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import type { Article } from "../payload-types";
import { ARTICLES_TAG } from "../lib/cacheTags";

/**
 * Pushes a published change onto the live site immediately, rather than waiting
 * for the time-based window in `src/lib/articles.ts` to lapse.
 *
 * Drafts deliberately still revalidate: an article that is unpublished (or saved
 * back to draft) must disappear from the index just as promptly as it appeared.
 *
 * Note the second argument to `revalidateTag` — Next 16 made the cache profile
 * required. `'max'` gives the longest stale-while-revalidate window, so readers
 * keep getting an instant response while the new content renders behind them.
 */
export const revalidateArticle: CollectionAfterChangeHook<Article> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc;

  const paths = new Set<string>(["/", "/blog"]);
  if (doc?.slug) paths.add(`/blog/${doc.slug}`);
  // A renamed slug leaves a stale page behind at the old URL.
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    paths.add(`/blog/${previousDoc.slug}`);
  }

  try {
    revalidateTag(ARTICLES_TAG, "max");
    for (const path of paths) revalidatePath(path);
  } catch (error) {
    // Never fail the editor's save because a cache purge misfired.
    payload.logger.error({ err: error }, "Failed to revalidate after article change");
  }

  return doc;
};

export const revalidateArticleDelete: CollectionAfterDeleteHook<Article> = ({
  doc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc;

  try {
    revalidateTag(ARTICLES_TAG, "max");
    revalidatePath("/");
    revalidatePath("/blog");
    if (doc?.slug) revalidatePath(`/blog/${doc.slug}`);
  } catch (error) {
    payload.logger.error({ err: error }, "Failed to revalidate after article delete");
  }

  return doc;
};
