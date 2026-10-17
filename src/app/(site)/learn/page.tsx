import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, itemListNode, definedTermSetNode, fullPageGraph } from "@/lib/seo/schema";
import { LEARN_ARTICLES } from "@/lib/data/learn";

export const metadata: Metadata = buildMetadata({
  path: "/learn",
  title: "Learn: SRHR, Mental Health & Money Guides | BINTI Rising",
  description:
    "Free, practical guides for young women in Kenya on SRHR rights, mental health, consent, GBV support, menstrual health and managing money on irregular income.",
});

const clusterLabels: Record<string, string> = {
  srhr: "SRHR & safety",
  "mental-health": "Mental health",
  "financial-freedom": "Money skills",
  leadership: "Leadership",
};

export default function LearnPage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/learn",
          title: "Learn: SRHR, Mental Health & Money Guides | BINTI Rising",
          description:
            "Free, practical guides for young women in Kenya on SRHR rights, mental health, consent, GBV support, menstrual health and managing money.",
          type: "CollectionPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Learn", path: "/learn" },
          ],
          extra: [
            itemListNode({
              path: "/learn",
              name: "BINTI Rising learning guides",
              items: LEARN_ARTICLES.map((a) => ({ name: a.title, path: `/learn/${a.slug}` })),
            }),
            definedTermSetNode(LEARN_ARTICLES),
          ],
        }))}
      />
      <PageHero
        kicker="Learn"
        title="Free guides written for young women in Kenya"
        intro="Straight answers on sexual and reproductive health, consent, gender-based violence, mental health, menstrual health and money - written in plain language, checked against Kenya's laws and public health guidance."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Learn", path: "/learn" },
        ]}
      />

      <section className="py-16 bg-binti-warm-gray/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {LEARN_ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="group bg-white rounded-2xl p-6 sm:p-8 border-2 border-binti-warm-gray hover:border-binti-pink/40 transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-binti-purple mb-3">
                  <BookOpen className="w-3.5 h-3.5" aria-hidden />
                  {clusterLabels[article.cluster]}
                </div>
                <h2 className="text-xl font-bold text-binti-navy leading-snug">
                  <Link href={`/learn/${article.slug}`} className="hover:text-binti-pink transition-colors">
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-3 text-binti-navy/70 text-sm leading-relaxed line-clamp-3">
                  {article.directAnswer}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/learn/${article.slug}`}
                    className="text-sm font-semibold text-binti-pink hover:underline"
                  >
                    Read the guide &rarr;
                  </Link>
                  <Link
                    href={`/programs/${article.programSlug}`}
                    className="text-xs text-binti-navy/50 hover:text-binti-pink transition-colors"
                  >
                    Related program
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl bg-white border border-binti-warm-gray p-6 sm:p-8 text-center">
              <h2 className="text-xl font-bold text-binti-navy mb-2">Request a topic</h2>
              <p className="text-binti-navy/70 text-sm leading-relaxed mb-4">
                Is there a question you wish someone had answered plainly? Send it
                to info@bintirising.org - guides are prioritised by what young
                women actually ask in sessions.
              </p>
              <a
                href="mailto:info@bintirising.org?subject=Guide%20topic%20request"
                className="inline-block text-sm font-semibold text-binti-pink hover:underline"
              >
                Suggest a topic &rarr;
              </a>
            </div>
            <div className="rounded-2xl bg-white border border-binti-warm-gray p-6 sm:p-8 text-center">
              <h2 className="text-xl font-bold text-binti-navy mb-2">Need the curricula?</h2>
              <p className="text-binti-navy/70 text-sm leading-relaxed mb-4">
                Facilitators and partners can request session outlines,
                materials lists and assessment forms.
              </p>
              <Link
                href="/resources"
                className="inline-block text-sm font-semibold text-binti-pink hover:underline"
              >
                Browse resources &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
