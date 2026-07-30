import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

import { formatArticleDate, type ArticleListItem } from "@/lib/articles";

/**
 * The shared article card. Extracted so the blog index and the homepage preview
 * cannot drift apart visually — previously the card markup lived only inside
 * BlogPreview.
 */
export default function ArticleCard({ article }: { article: ArticleListItem }) {
  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-brand-teal-100/20 bg-[#f6f5fa] transition-all duration-300 hover:shadow-lg">
      <div>
        <div className="relative aspect-16/10 overflow-hidden bg-brand-teal-950">
          {article.image && (
            <Image
              src={article.image.url}
              alt={article.image.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          )}
          <div className="absolute left-4 top-4 rounded-sm bg-brand-red-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
            {article.categoryTitle}
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-center gap-4 text-xs font-medium text-brand-teal-900/60">
            {article.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-brand-red-600" />
                <time dateTime={article.publishedAt}>
                  {formatArticleDate(article.publishedAt)}
                </time>
              </span>
            )}
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-brand-red-600" />
              {article.byline}
            </span>
          </div>

          <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-brand-teal-950 transition-colors group-hover:text-brand-teal-700">
            <Link href={`/blog/${article.slug}`}>
              {/* Stretches the click target across the whole card. */}
              <span className="absolute inset-0 z-10" aria-hidden="true" />
              {article.title}
            </Link>
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-brand-teal-900/80">
            {article.excerpt}
          </p>
        </div>
      </div>

      <div className="mt-auto p-6 pt-0">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-teal-950 transition-colors group-hover:text-brand-red-600">
          Read Article
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
