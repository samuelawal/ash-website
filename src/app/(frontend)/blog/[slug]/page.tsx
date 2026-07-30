import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";

import ArticleBody from "@/components/ArticleBody";
import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Category } from "@/payload-types";
import {
  formatArticleDate,
  getAllArticleSlugs,
  getArticleBySlug,
  getLatestArticles,
  toImage,
} from "@/lib/articles";

type Params = Promise<{ slug: string }>;

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://ashipaelectric.com";

/** Prerender every published article at build; new ones render on first request. */
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  // The SEO tab overrides these; both fall back to the on-page copy.
  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt;
  const share = toImage(article.ogImage ?? article.heroImage, "hero");

  return {
    title: `${title} | Ashipa Electric`,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: article.publishedAt ?? undefined,
      authors: [article.byline],
      images: share ? [{ url: share.url, alt: share.alt || title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: share ? [share.url] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const hero = toImage(article.heroImage, "hero");
  const heroCredit =
    typeof article.heroImage === "object" ? article.heroImage.credit : null;
  const category =
    typeof article.category === "object" ? (article.category as Category) : null;
  const publishedAt = article.publishedAt ?? null;

  // Fetch one extra so filtering out the current article still leaves three.
  const latest = await getLatestArticles(4);
  const related = latest.filter((a) => a.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: publishedAt ?? undefined,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: article.byline },
    publisher: {
      "@type": "Organization",
      name: "Ashipa Electric",
      url: SITE_URL,
    },
    image: hero ? [hero.url] : undefined,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <>
      <Header />
      <main className="flex-grow pt-28">
        <script
          type="application/ld+json"
          // Payload sanitises rich text on save; this object is built from typed
          // scalar fields only, so there is no untrusted markup to inject here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="bg-white pb-24 pt-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-teal-900/70 transition-colors hover:text-brand-red-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Articles
            </Link>

            <header className="mt-8 space-y-5">
              {category?.title && (
                <Link
                  href={`/blog?category=${category.slug}`}
                  className="inline-block rounded-sm bg-brand-red-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                >
                  {category.title}
                </Link>
              )}

              <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-brand-teal-950 sm:text-4xl">
                {article.title}
              </h1>

              <p className="text-lg leading-relaxed text-brand-teal-900/80">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-5 border-t border-brand-teal-100 pt-5 text-sm text-brand-teal-900/60">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-brand-red-600" />
                  {article.byline}
                </span>
                {publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-brand-red-600" />
                    <time dateTime={publishedAt}>{formatArticleDate(publishedAt)}</time>
                  </span>
                )}
              </div>
            </header>

            {hero && (
              <figure className="mt-10">
                <div className="relative aspect-video overflow-hidden rounded-sm bg-brand-teal-950">
                  <Image
                    src={hero.url}
                    alt={hero.alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                {heroCredit && (
                  <figcaption className="mt-3 text-xs italic text-brand-teal-900/60">
                    {heroCredit}
                  </figcaption>
                )}
              </figure>
            )}

            <div className="mt-12">
              <ArticleBody data={article.content} />
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="border-t border-brand-teal-100/30 bg-[#faf9fd] py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-10 font-display text-2xl font-extrabold tracking-tight text-brand-teal-950">
                More from Ashipa Electric
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
