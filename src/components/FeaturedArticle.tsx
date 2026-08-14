import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

import { formatArticleDate, type ArticleListItem } from "@/lib/articles";

/**
 * The lead article on the blog index — the same data as an ArticleCard, given
 * the width to actually be read. Shown only on the unfiltered first page, so a
 * category view is a plain grid rather than a second, competing hierarchy.
 */
export default function FeaturedArticle({ article }: { article: ArticleListItem }) {
  return (
    <article className="group relative grid overflow-hidden rounded-sm border border-brand-teal-100/30 bg-[#f6f5fa] transition-all duration-300 hover:shadow-xl lg:grid-cols-2">
      <div className="relative aspect-16/10 overflow-hidden bg-brand-teal-950 lg:aspect-auto lg:min-h-80">
        {article.image && (
          <Image
            src={article.image.url}
            alt={article.image.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            preload
          />
        )}
        <div className="absolute left-5 top-5 rounded-sm bg-brand-red-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
          {article.categoryTitle}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-5 p-8 sm:p-10">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal-700">
          Latest
        </span>

        <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-brand-teal-950 transition-colors group-hover:text-brand-teal-700 sm:text-3xl">
          <Link href={`/blog/${article.slug}`}>
            {/* Stretches the click target across the whole card. */}
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {article.title}
          </Link>
        </h2>

        <p className="text-base leading-relaxed text-brand-teal-900/80">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-brand-teal-900/60">
          {article.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-brand-red-600" />
              <time dateTime={article.publishedAt}>
                {formatArticleDate(article.publishedAt)}
              </time>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-brand-red-600" />
            {article.byline}
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-teal-950 transition-colors group-hover:text-brand-red-600">
          Read Article
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
