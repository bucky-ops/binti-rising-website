import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Mail, Lock } from "lucide-react";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, fullPageGraph } from "@/lib/seo/schema";
import { PROGRAMS } from "@/lib/data/programs";

export const metadata: Metadata = buildMetadata({
  path: "/resources",
  title: "Free Toolkits & Session Materials | BINTI Rising",
  description:
    "Session curricula, workshop outlines and toolkits from BINTI Rising's programs for young women in Nairobi. Request materials by email.",
});

export default function ResourcesPage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/resources",
          title: "Free Toolkits & Session Materials | BINTI Rising",
          description:
            "Session curricula, workshop outlines and toolkits from BINTI Rising's programs for young women in Nairobi. Request materials by email.",
          type: "CollectionPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
          ],
        }))}
      />
      <PageHero
        kicker="Resources"
        title="Session curricula, outlines and toolkits"
        intro="Everything we teach is documented. Facilitators, partner organisations and researchers can request our session outlines and toolkits below - and every participant gets printed materials at their sessions."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {PROGRAMS.map((p) => (
              <article
                key={p.slug}
                className="rounded-2xl border-2 border-binti-warm-gray bg-binti-warm-gray/40 p-6 sm:p-8"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-binti-purple mb-3">
                  <FileText className="w-3.5 h-3.5" aria-hidden />
                  Curriculum outline
                </div>
                <h2 className="text-lg font-bold text-binti-navy">
                  {p.name}: {p.sessions.length}-session outline
                </h2>
                <ol className="mt-4 space-y-1.5 text-sm text-binti-navy/70">
                  {p.sessions.map((s, i) => (
                    <li key={s.title} className="flex gap-2">
                      <span className="font-bold text-binti-pink">{i + 1}.</span> {s.title}
                    </li>
                  ))}
                </ol>
                <Link
                  href={`/programs/${p.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-binti-pink hover:underline"
                >
                  Full session details &rarr;
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl border-2 border-binti-pink/30 bg-binti-pink/5 p-6">
              <Mail className="w-8 h-8 text-binti-pink mb-3" aria-hidden />
              <h2 className="font-bold text-binti-navy mb-2">Request the full toolkit</h2>
              <p className="text-sm text-binti-navy/70 leading-relaxed mb-4">
                Complete facilitator packs (session plans, materials lists,
                assessment forms) are shared with partner organisations and
                trained facilitators. Email info@bintirising.org with a short
                note about your work.
              </p>
              <a
                href="mailto:info@bintirising.org?subject=Toolkit%20request"
                className="inline-block rounded-full bg-binti-pink hover:bg-binti-pink/90 px-6 py-2.5 text-sm font-bold text-white transition-colors"
              >
                Request materials
              </a>
            </div>
            <div className="rounded-2xl border border-binti-warm-gray bg-binti-warm-gray/50 p-6">
              <Lock className="w-8 h-8 text-binti-teal mb-3" aria-hidden />
              <h2 className="font-bold text-binti-navy mb-2">Why downloads are gated</h2>
              <p className="text-sm text-binti-navy/70 leading-relaxed">
                Our curricula deal with sensitive topics (SRHR, GBV, mental
                health). Materials are shared with trained adults who agree to
                our safeguarding standards - this protects the young women the
                content was written for. Direct downloads are coming for
                low-risk materials like the financial literacy worksheets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
