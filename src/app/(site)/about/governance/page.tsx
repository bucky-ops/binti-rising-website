import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/binti/PageHero";
import CtaBand from "@/components/binti/CtaBand";
import PendingNotice from "@/components/binti/PendingNotice";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, fullPageGraph } from "@/lib/seo/schema";
import { ORG } from "@/lib/data/organization";
import { ScrollText, ShieldCheck, FileCheck, Lock, Scale, Download, Mail } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  path: "/about/governance",
  title: "Governance & Transparency | BINTI Rising Initiative",
  description:
    "Registration, governance structure, policies and accountability at BINTI Rising Initiative, a registered community-based organisation in Nairobi, Kenya.",
});

const policies = [
  {
    icon: ShieldCheck,
    title: "Safeguarding policy",
    text: "Every facilitator and volunteer works under our safeguarding framework: two-adult rule at youth sessions, confidentiality boundaries, and a named safeguarding focal point participants can contact directly.",
  },
  {
    icon: Scale,
    title: "Whistleblowing policy",
    text: "Staff, volunteers, participants and partners can report concerns about conduct or finances, in confidence, to info@bintirising.org. Reports are acknowledged and reviewed by the board.",
  },
  {
    icon: Lock,
    title: "Privacy & data protection",
    text: "Participant data (including session attendance and consent records) is collected only for program delivery and safety, stored with restricted access, and never sold. To request access or deletion of your data, email info@bintirising.org.",
  },
  {
    icon: FileCheck,
    title: "Consent for stories and photos",
    text: "Participant stories and images are published only with recorded consent. Stories on this site are currently anonymised; if you are featured and want content amended or removed, contact us and we will act on it.",
  },
];

export default function GovernancePage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/about/governance",
          title: "Governance & Transparency | BINTI Rising Initiative",
          description:
            "Registration, governance structure, policies and accountability at BINTI Rising Initiative, a registered community-based organisation in Nairobi, Kenya.",
          type: "AboutPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Governance", path: "/about/governance" },
          ],
        }))}
      />
      <PageHero
        kicker="Governance & Transparency"
        title="How BINTI Rising is governed and held accountable"
        intro="Donors, grantmakers and participants deserve to see how a community-based organisation runs. This page documents our registration, structure, policies and reporting commitments - and states plainly what is still being published."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Governance", path: "/about/governance" },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy mb-6">
                Registration &amp; legal status
              </h2>
              <div className="space-y-4 text-binti-navy/70 leading-relaxed">
                <p>
                  BINTI Rising Initiative is a registered{" "}
                  <strong className="text-binti-navy">
                    community-based organisation (CBO) in Nairobi, Kenya
                  </strong>
                  . CBO registration in Kenya is administered at county level
                  under the CBO registration framework, and obliges us to keep
                  governance records, membership registers and activity reports.
                </p>
                <div className="rounded-xl bg-binti-warm-gray/60 p-4 text-sm">
                  <dl className="space-y-2">
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt className="font-semibold text-binti-navy">Registered name</dt>
                      <dd className="text-binti-navy/70">{ORG.legalName}</dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt className="font-semibold text-binti-navy">Status</dt>
                      <dd className="text-binti-navy/70">{ORG.nonprofitStatus}</dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt className="font-semibold text-binti-navy">Registration number</dt>
                      <dd className="text-binti-navy/70" data-q-a="pending">
                        Published once certificate details are verified
                      </dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt className="font-semibold text-binti-navy">Founded</dt>
                      <dd className="text-binti-navy/70">{ORG.foundingDate}</dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt className="font-semibold text-binti-navy">Contact</dt>
                      <dd className="text-binti-navy/70">{ORG.email}</dd>
                    </div>
                  </dl>
                </div>
                <PendingNotice fields={["registrationNumber", "address.street / postalCode"]} />
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy mb-6">
                Governance structure
              </h2>
              <div className="space-y-4 text-binti-navy/70 leading-relaxed">
                <p>
                  BINTI Rising follows the standard CBO governance model: a{" "}
                  <strong className="text-binti-navy">board</strong> that owns strategy,
                  oversight and compliance, and a{" "}
                  <strong className="text-binti-navy">small executive team</strong> that runs
                  day-to-day delivery.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  {ORG.boardRoles.map((r) => (
                    <li key={r.title}>
                      <strong className="text-binti-navy">{r.title}</strong> - {r.responsibility}
                    </li>
                  ))}
                  {ORG.staffRoles.map((r) => (
                    <li key={r.title}>
                      <strong className="text-binti-navy">{r.title}</strong> - {r.responsibility}
                    </li>
                  ))}
                </ul>
                <p>
                  Names and profiles of board and staff members are published on
                  the{" "}
                  <Link href="/about/team" className="text-binti-pink font-semibold hover:underline">
                    team page
                  </Link>{" "}
                  as each person confirms publication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-binti-warm-gray/50" aria-labelledby="policies-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="policies-heading" className="text-2xl sm:text-3xl font-bold text-binti-navy mb-8">
            Our policies
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {policies.map((p) => (
              <article key={p.title} className="bg-white rounded-2xl p-6 border border-binti-warm-gray">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-binti-purple/10 mb-4">
                  <p.icon className="w-6 h-6 text-binti-purple" aria-hidden />
                </div>
                <h3 className="font-bold text-binti-navy">{p.title}</h3>
                <p className="mt-2 text-binti-navy/70 text-sm leading-relaxed">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" aria-labelledby="reporting-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="reporting-heading" className="text-2xl sm:text-3xl font-bold text-binti-navy mb-6">
            Funding &amp; reporting
          </h2>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-4 text-binti-navy/70 leading-relaxed">
              <p>
                We are funded by individual donations and partner contributions.
                Our monitoring and evaluation framework tracks six indicators
                across every cohort - SRHR knowledge, health service
                utilisation, mental wellbeing, savings habits, leadership
                skills, and GBV awareness - using baseline and endline
                assessments.
              </p>
              <p>
                <strong className="text-binti-navy">What we publish, and when:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Program curriculum and session outlines - published on each <Link href="/programs" className="text-binti-pink font-semibold hover:underline">program page</Link> now.</li>
                <li>M&amp;E indicators and targets - published on the <Link href="/#impact" className="text-binti-pink font-semibold hover:underline">homepage impact section</Link> now.</li>
                <li>Verified baseline and endline results - released as each M&amp;E cycle completes; figures are never estimated.</li>
                <li>Annual review with funding breakdown - published on this page as the first full financial year closes.</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-binti-gold/40 bg-binti-gold/5 p-6">
              <ScrollText className="w-8 h-8 text-binti-gold mb-3" aria-hidden />
              <h3 className="font-bold text-binti-navy mb-2">Documents on request</h3>
              <p className="text-sm text-binti-navy/70 leading-relaxed mb-4">
                The CBO registration certificate, governance charter,
                safeguarding policy and financial summaries are available to
                serious donors, partners and researchers on request.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${ORG.email}?subject=Document%20request`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-binti-pink hover:underline"
                >
                  <Mail className="w-4 h-4" aria-hidden /> Request documents
                </a>
                <span className="inline-flex items-center gap-2 text-sm text-binti-navy/50">
                  <Download className="w-4 h-4" aria-hidden /> Downloads coming soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Fund accountable, community-led work"
        text="Every donation supports documented programs with published indicators. Contact us for our document pack."
      />
    </>
  );
}
