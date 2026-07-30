/**
 * Shared between the read path (`src/lib/articles.ts`, which tags its cached
 * queries) and the write path (`src/hooks/revalidateArticle.ts`, which purges
 * them). Keeping the literal in one place stops the two drifting apart — a
 * mismatch fails silently, as stale content that never refreshes.
 */
export const ARTICLES_TAG = "articles";
