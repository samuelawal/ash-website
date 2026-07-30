import Link from "next/link";

import ArticleCard from "@/components/ArticleCard";
import FadeIn from "@/components/FadeIn";
import { getLatestArticles } from "@/lib/articles";
import { siteData } from "@/content/siteData";

/**
 * Server Component — reads the three most recent published articles straight
 * from Payload. Was previously a client component rendering hardcoded entries
 * from `siteData.blog.items`; the section headings still come from siteData,
 * since they are site copy rather than content.
 */
export default async function BlogPreview() {
  const data = siteData.blog;
  const articles = await getLatestArticles(3);

  // Nothing published yet — omit the section rather than show an empty grid.
  if (articles.length === 0) return null;

  return (
    <section
      id="updates"
      className="border-t border-brand-teal-100/30 bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-4">
            <FadeIn y={15} className="text-xs font-bold uppercase tracking-wider text-brand-teal-700">
              Resources &amp; News
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-teal-950 sm:text-4xl">
                {data.title}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base leading-relaxed text-brand-teal-900/80">
                {data.subtitle}
              </p>
            </FadeIn>
          </div>

          <FadeIn x={20} y={0}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border-b-2 border-brand-teal-950 pb-1 text-sm font-bold tracking-wide text-brand-teal-950 transition-colors hover:border-brand-red-600 hover:text-brand-red-600"
            >
              View All Articles
            </Link>
          </FadeIn>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article, index) => (
            <FadeIn key={article.id} delay={index * 0.1} y={30} className="h-full">
              <ArticleCard article={article} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
