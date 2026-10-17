import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, articleNode, fullPageGraph } from "@/lib/seo/schema";
import { LEARN_ARTICLES, getArticle, articleWordCount } from "@/lib/data/learn";
import { LearnBody } from "@/components/binti/LearnBlocks";
import { SITE_URL } from "@/lib/site-url";

const CONTENT_EPOCH = "2026-10-17";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LEARN_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    path: `/learn/${article.slug}`,
    title: article.title,
    description: article.metaDescription,
    type: "article",
    publishedTime: CONTENT_EPOCH,
    modifiedTime: CONTENT_EPOCH,
  });
}

export default async function LearnArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const wordCount = articleWordCount(article);
  const siblings = article.siblings
    .map((s) => LEARN_ARTICLES.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: `/learn/${article.slug}`,
          title: article.title,
          description: article.metaDescription,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Learn", path: "/learn" },
            { name: article.title, path: `/learn/${article.slug}` },
          ],
          extra: [
            articleNode({
              path: `/learn/${article.slug}`,
              headline: article.title,
              description: article.metaDescription,
              datePublished: CONTENT_EPOCH,
              dateModified: CONTENT_EPOCH,
              wordCount,
              authorName: "BINTI Rising Initiative Editorial Team",
            }),
          ],
        }))}
      />
      <PageHero
        kicker="Learning guide"
        title={article.title}
        intro={article.directAnswer}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Learn", path: "/learn" },
          { name: article.title, path: `/learn/${article.slug}` },
        ]}
      />

      <section className="py-14 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-binti-navy/50 border-b border-binti-warm-gray pb-6 mb-8">
            <span className="font-semibold text-binti-navy/70">
              BINTI Rising Editorial Team
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="w-4 h-4" aria-hidden />
              <time dateTime={CONTENT_EPOCH}>October 2026</time>
            </span>
            <span>{wordCount} words &middot; {Math.max(3, Math.round(wordCount / 200))} min read</span>
          </div>

          <LearnBody blocks={article.blocks} helpline />

          {/* Author box (organisational author until a named, confirmed author exists) */}
          <div className="mt-12 rounded-2xl bg-binti-warm-gray/60 p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-binti-pink/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-extrabold text-binti-pink">BR</span>
              </div>
              <div>
                <h2 className="font-bold text-binti-navy">BINTI Rising Editorial Team</h2>
                <p className="text-sm text-binti-navy/70 leading-relaxed mt-1">
                  Guides are written from our session curricula and reviewed
                  against Kenya law and WHO/UNFPA public guidance. Named authors
                  are published as team members confirm attribution.
                </p>
              </div>
            </div>
          </div>

          {/* Hub-and-spoke: back to hub, across to siblings, into the program */}
          <nav aria-label="Continue reading" className="mt-10 grid sm:grid-cols-2 gap-4">
            {siblings.map((sib) => (
              <Link
                key={sib.slug}
                href={`/learn/${sib.slug}`}
                className="group rounded-xl border border-binti-warm-gray bg-white p-5 hover:border-binti-pink/40 hover:shadow-md transition-all"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-binti-purple">
                  Next guide
                </span>
                <h3 className="mt-1 font-bold text-binti-navy group-hover:text-binti-pink transition-colors text-sm sm:text-base">
                  {sib.title}
                </h3>
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1 text-sm font-semibold text-binti-navy/60 hover:text-binti-pink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden /> All guides
            </Link>
            <Link
              href={`/programs/${article.programSlug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-binti-pink hover:underline"
            >
              See the related program <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
