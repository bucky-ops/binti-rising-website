import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, faqPageNode, fullPageGraph } from "@/lib/seo/schema";
import { FAQS } from "@/lib/data/faqs";
import { FaqList } from "@/components/binti/FaqList";

export const metadata: Metadata = buildMetadata({
  path: "/faqs",
  title: "FAQs: Programs, Volunteering & Donations | BINTI Rising",
  description:
    "Answers about BINTI Rising Initiative: who we serve (young women 15-25 in Nairobi), program cost (free), locations, impact measurement and how to help.",
});

export default function FaqsPage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/faqs",
          title: "FAQs: Programs, Volunteering & Donations | BINTI Rising",
          description:
            "Answers about BINTI Rising Initiative: who we serve, program cost, locations, impact measurement and how to help.",
          type: "WebPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "FAQs", path: "/faqs" },
          ],
          extra: [faqPageNode(FAQS)],
        }))}
      />
      <PageHero
        kicker="Frequently asked questions"
        title="Everything people ask us about BINTI Rising"
        intro="Who we serve, what programs cost, where sessions happen, how impact is measured, and how to join, volunteer or donate. If your question is missing, email info@bintirising.org."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "FAQs", path: "/faqs" },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FaqList faqs={FAQS} />

          <div className="mt-12 text-center p-6 bg-gradient-to-r from-binti-pink/10 to-binti-purple/10 rounded-2xl border border-binti-pink/20">
            <p className="text-binti-navy font-medium mb-2">Still have questions?</p>
            <p className="text-binti-navy/70">
              Email{" "}
              <a
                href="mailto:info@bintirising.org"
                className="text-binti-pink font-semibold hover:underline"
              >
                info@bintirising.org
              </a>{" "}
              or use the{" "}
              <Link href="/contact" className="text-binti-pink font-semibold hover:underline">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
