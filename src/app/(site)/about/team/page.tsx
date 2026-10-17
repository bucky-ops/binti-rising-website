import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import PendingNotice from "@/components/binti/PendingNotice";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, fullPageGraph } from "@/lib/seo/schema";
import { ORG } from "@/lib/data/organization";
import { ShieldCheck, UserRound, Users } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  path: "/about/team",
  title: "Our Team & Leadership | BINTI Rising Initiative",
  description:
    "Meet the team and governance roles behind BINTI Rising Initiative, a registered CBO empowering young women in Nairobi, Kenya.",
});

/**
 * R1/2.2 COMPLIANCE: leadership roles are shown with their real
 * responsibilities, but individual names, bios and photos are NOT published
 * until the organisation confirms each person in writing. When confirmed,
 * this page gains /about/team/[slug] person pages with Person + sameAs JSON-LD.
 */
export default function TeamPage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/about/team",
          title: "Our Team & Leadership | BINTI Rising Initiative",
          description:
            "Meet the team and governance roles behind BINTI Rising Initiative, a registered CBO empowering young women in Nairobi, Kenya.",
          type: "CollectionPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Team", path: "/about/team" },
          ],
        }))}
      />
      <PageHero
        kicker="Our Team"
        title="The people behind BINTI Rising"
        intro="BINTI Rising is run by a small team and a governance board, supported by trained volunteer facilitators from the communities we serve."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Team", path: "/about/team" },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-10">
            <PendingNotice fields={["founder & leadership names"]} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy mb-8">Staff roles</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {ORG.staffRoles.map((role) => (
              <article
                key={role.title}
                className="bg-white rounded-2xl p-6 border-2 border-binti-warm-gray hover:border-binti-pink/40 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-binti-pink/10 mb-4">
                  <UserRound className="w-6 h-6 text-binti-pink" aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-binti-navy">{role.title}</h3>
                <p className="mt-2 text-binti-navy/70 text-sm leading-relaxed">{role.responsibility}</p>
              </article>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy mt-16 mb-8">
            Governance board
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {ORG.boardRoles.map((role) => (
              <article
                key={role.title}
                className="bg-white rounded-2xl p-6 border-2 border-binti-warm-gray hover:border-binti-teal/40 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-binti-teal/10 mb-4">
                  <ShieldCheck className="w-6 h-6 text-binti-teal" aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-binti-navy">{role.title}</h3>
                <p className="mt-2 text-binti-navy/70 text-sm leading-relaxed">{role.responsibility}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-binti-warm-gray/60 p-6 sm:p-8 max-w-3xl mx-auto text-center">
            <Users className="w-8 h-8 text-binti-purple mx-auto mb-3" aria-hidden />
            <h2 className="text-xl font-bold text-binti-navy mb-2">Volunteers make it possible</h2>
            <p className="text-binti-navy/70 text-sm sm:text-base leading-relaxed mb-4">
              Beyond the core team, trained volunteer facilitators co-deliver
              sessions across Nairobi. If you have skills in facilitation,
              mentorship, counselling, data collection or communications, we
              would love to hear from you.
            </p>
            <Link
              href="/get-involved/volunteer"
              className="inline-block text-sm font-semibold text-binti-pink hover:underline"
            >
              Apply to volunteer &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
