import type { Metadata } from "next";
import PageHero from "@/components/binti/PageHero";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, fullPageGraph } from "@/lib/seo/schema";
import PartnerForm from "@/components/binti/forms/PartnerForm";
import { Handshake, Landmark, Building, Boxes, GraduationCap } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  path: "/get-involved/partner",
  title: "Partner With BINTI Rising | NGOs & Companies",
  description:
    "Partner with BINTI Rising Initiative: fund a cohort, co-deliver programs, provide venues or in-kind support for young women in Nairobi, Kenya.",
});

const partnershipModels = [
  {
    icon: Landmark,
    title: "Fund a cohort",
    text: "Sponsor a full six-month program cycle for around 20 young women in one community - with published indicators and reporting against our six KPIs.",
  },
  {
    icon: Building,
    title: "Co-deliver programs",
    text: "NGOs and CBOs with complementary expertise (health services, legal aid, psychosocial support) can co-deliver sessions or refer participants.",
  },
  {
    icon: Boxes,
    title: "In-kind support",
    text: "Venues, training materials, sanitary products, refreshments for sessions, or professional services (design, legal, audit) all extend what donations cover.",
  },
  {
    icon: GraduationCap,
    title: "Expertise & research",
    text: "Universities, M&E professionals and health educators can strengthen our curriculum, evaluation design and published reporting.",
  },
];

export default function PartnerPage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/get-involved/partner",
          title: "Partner With BINTI Rising | NGOs & Companies",
          description:
            "Partner with BINTI Rising Initiative: fund a cohort, co-deliver programs, provide venues or in-kind support for young women in Nairobi, Kenya.",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Get involved", path: "/get-involved/partner" },
            { name: "Partner", path: "/get-involved/partner" },
          ],
        }))}
      />
      <PageHero
        kicker="Partner with us"
        title="Partner with BINTI Rising Initiative"
        intro="We work with NGOs, companies, schools, health facilities and community organisations that share one goal: giving young women in Nairobi the knowledge, support and economic tools to lead. Partnership starts with a conversation - the form below reaches the team directly."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Get involved", path: "/get-involved/partner" },
          { name: "Partner", path: "/get-involved/partner" },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy text-center mb-12">
            Ways organisations work with us
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {partnershipModels.map((m) => (
              <article key={m.title} className="rounded-2xl bg-binti-warm-gray/50 border border-binti-warm-gray p-6 sm:p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-binti-teal/10 mb-4">
                  <m.icon className="w-6 h-6 text-binti-teal" aria-hidden />
                </div>
                <h3 className="font-bold text-binti-navy text-lg">{m.title}</h3>
                <p className="mt-2 text-binti-navy/70 text-sm leading-relaxed">{m.text}</p>
              </article>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy">
                Why partners choose community-based delivery
              </h2>
              <div className="space-y-4 text-binti-navy/70 leading-relaxed">
                <p>
                  National programs struggle to reach young women who are out of
                  school, married early, or working informal jobs. Community-based
                  organisations meet them where they already are - the estate, the
                  church hall, the shopping centre - in their own language, at
                  times that fit their lives.
                </p>
                <p>
                  BINTI Rising brings a documented curriculum (26 sessions across
                  four pillars), a six-indicator M&amp;E framework, and deep
                  community relationships across{" "}
                  <a href="/communities" className="text-binti-pink font-semibold hover:underline">
                    11 Nairobi communities
                  </a>
                  . Partners bring funding, expertise and reach. Together that
                  means programs that actually arrive - and can prove what they
                  changed.
                </p>
                <p className="text-sm">
                  Serious partners can request our governance pack,
                  registration certificate and M&amp;E framework via the{" "}
                  <a href="/about/governance" className="text-binti-pink font-semibold hover:underline">
                    governance page
                  </a>
                  .
                </p>
              </div>
              <div className="rounded-xl border border-binti-pink/20 bg-binti-pink/5 p-5 flex items-start gap-3">
                <Handshake className="w-5 h-5 text-binti-pink shrink-0 mt-0.5" aria-hidden />
                <p className="text-sm text-binti-navy/70 leading-relaxed">
                  <strong className="text-binti-navy">Media and press:</strong>{" "}
                  for interviews, coverage requests or speaker invitations, use
                  the form with &ldquo;partnership&rdquo; or email
                  info@bintirising.org - we respond quickly.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-2xl border-2 border-binti-warm-gray bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-binti-navy mb-1">Partnership inquiry</h2>
                <p className="text-sm text-binti-navy/60 mb-6">
                  Tell us who you are and how you would like to collaborate.
                </p>
                <PartnerForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
