import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCategories, getPublishedArticles } from "@/lib/articles";
import { siteData } from "@/content/siteData";

export const metadata: Metadata = {
  title: "Insights & Updates | Ashipa Electric",
  description: siteData.blog.subtitle,
  alternates: { canonical: "/blog" },
};

type SearchParams = Promise<{ page?: string; category?: string }>;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page: pageParam, category } = await searchParams;

  const page = Number(pageParam ?? "1");
  if (!Number.isInteger(page) || page < 1) notFound();

  const [{ articles, totalPages, totalDocs }, categories] = await Promise.all([
    getPublishedArticles({ page, categorySlug: category }),
    getCategories(),
  ]);

  // A page number past the end is a dead URL, not an empty grid.
  if (page > 1 && articles.length === 0) notFound();

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  return (
    <>
      <Header />
      <main className="flex-grow pt-28">
        <section className="border-t border-brand-teal-100/30 bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-brand-teal-700">
                Resources &amp; News
              </span>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-teal-950 sm:text-5xl">
                Insights &amp; Updates
              </h1>
              <p className="text-base leading-relaxed text-brand-teal-900/80">
                {siteData.blog.subtitle}
              </p>
            </div>

            {categories.length > 0 && (
              <nav
                aria-label="Filter articles by category"
                className="mt-10 flex flex-wrap gap-2"
              >
                <Link
                  href="/blog"
                  aria-current={!category ? "page" : undefined}
                  className={`rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    !category
                      ? "bg-brand-teal-950 text-white"
                      : "bg-brand-teal-100/60 text-brand-teal-900 hover:bg-brand-teal-100"
                  }`}
                >
                  All
                </Link>
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/blog?category=${c.slug}`}
                    aria-current={category === c.slug ? "page" : undefined}
                    className={`rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                      category === c.slug
                        ? "bg-brand-teal-950 text-white"
                        : "bg-brand-teal-100/60 text-brand-teal-900 hover:bg-brand-teal-100"
                    }`}
                  >
                    {c.title}
                  </Link>
                ))}
              </nav>
            )}

            {articles.length === 0 ? (
              <p className="mt-16 text-base text-brand-teal-900/70">
                No articles published yet. Check back soon.
              </p>
            ) : (
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="mt-16 flex items-center justify-between border-t border-brand-teal-100 pt-8"
              >
                {page > 1 ? (
                  <Link
                    href={buildHref(page - 1)}
                    rel="prev"
                    className="text-sm font-bold text-brand-teal-950 transition-colors hover:text-brand-red-600"
                  >
                    ← Previous
                  </Link>
                ) : (
                  <span />
                )}
                <span className="text-sm text-brand-teal-900/60">
                  Page {page} of {totalPages} · {totalDocs} article
                  {totalDocs === 1 ? "" : "s"}
                </span>
                {page < totalPages ? (
                  <Link
                    href={buildHref(page + 1)}
                    rel="next"
                    className="text-sm font-bold text-brand-teal-950 transition-colors hover:text-brand-red-600"
                  >
                    Next →
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
