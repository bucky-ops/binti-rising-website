import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ShieldCheck, ReceiptText, HeartHandshake } from "lucide-react";
import PageHero from "@/components/binti/PageHero";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, donateActionNode, fullPageGraph } from "@/lib/seo/schema";
import PendingNotice from "@/components/binti/PendingNotice";

export const metadata: Metadata = buildMetadata({
  path: "/get-involved/donate",
  title: "Donate to Empower Young Women | BINTI Rising",
  description:
    "Support BINTI Rising Initiative. KES 1,000 funds a session for a young woman in Nairobi. Contact us to give via M-Pesa or bank transfer today.",
});

const tiers = [
  { amount: "KES 1,000", impact: "One training session for a young woman" },
  { amount: "KES 5,000", impact: "Complete pillar training (6-8 sessions)" },
  { amount: "KES 10,000", impact: "Materials and supplies for a cohort of 20" },
  { amount: "KES 20,000", impact: "Sponsor an entire cohort of 20 young women" },
  { amount: "KES 50,000", impact: "Fund a full program cycle for one community" },
];

export default function DonatePage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/get-involved/donate",
          title: "Donate to Empower Young Women | BINTI Rising",
          description:
            "Support BINTI Rising Initiative. KES 1,000 funds a session for a young woman in Nairobi. Contact us to give via M-Pesa or bank transfer today.",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Get involved", path: "/get-involved/donate" },
            { name: "Donate", path: "/get-involved/donate" },
          ],
          extra: [donateActionNode()],
        }))}
      />
      <PageHero
        kicker="Donate"
        title="Your shilling becomes her knowledge, her savings, her voice"
        intro="Every donation to BINTI Rising funds free programs for young women aged 15-25 across Nairobi: SRHR education, mental health support, financial literacy and leadership training. Here is exactly how to give safely."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Get involved", path: "/get-involved/donate" },
          { name: "Donate", path: "/get-involved/donate" },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy mb-6">
                How to give
              </h2>
              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-binti-pink/30 bg-binti-pink/5 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-binti-pink/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-binti-pink" aria-hidden />
                    </div>
                    <h3 className="font-bold text-binti-navy text-lg">Step 1: Contact us</h3>
                  </div>
                  <p className="text-sm text-binti-navy/70 leading-relaxed mb-4">
                    Email{" "}
                    <a
                      href="mailto:info@bintirising.org?subject=I%20want%20to%20donate"
                      className="text-binti-pink font-semibold hover:underline"
                    >
                      info@bintirising.org
                    </a>{" "}
                    with the subject &ldquo;I want to donate&rdquo;, or send a
                    message through our{" "}
                    <Link href="/contact" className="text-binti-pink font-semibold hover:underline">
                      contact form
                    </Link>
                    . Tell us the amount you have in mind.
                  </p>
                  <a
                    href="mailto:info@bintirising.org?subject=I%20want%20to%20donate"
                    className="inline-block rounded-full bg-binti-pink hover:bg-binti-pink/90 px-6 py-3 text-sm font-bold text-white transition-colors"
                  >
                    Email us to give now
                  </a>
                </div>

                <div className="rounded-2xl border border-binti-warm-gray bg-binti-warm-gray/40 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-binti-teal/10 flex items-center justify-center">
                      <ReceiptText className="w-5 h-5 text-binti-teal" aria-hidden />
                    </div>
                    <h3 className="font-bold text-binti-navy text-lg">Step 2: Receive official details</h3>
                  </div>
                  <p className="text-sm text-binti-navy/70 leading-relaxed">
                    We reply with our verified M-Pesa Paybill or bank account
                    details and your reference number. Payments go directly to
                    the organisation&apos;s official accounts - never to an
                    individual.
                  </p>
                </div>

                <div className="rounded-2xl border border-binti-warm-gray bg-binti-warm-gray/40 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-binti-gold/10 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-binti-gold" aria-hidden />
                    </div>
                    <h3 className="font-bold text-binti-navy text-lg">Step 3: Get your receipt</h3>
                  </div>
                  <p className="text-sm text-binti-navy/70 leading-relaxed">
                    Every donation is acknowledged with a receipt. Regular
                    donors receive periodic impact updates drawn from our M&amp;E
                    reporting.
                  </p>
                </div>

                <PendingNotice fields={["donation.paybill / bankAccount"]} />
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy mb-6">
                What your gift funds
              </h2>
              <div className="rounded-2xl bg-gradient-navy p-6 sm:p-8 text-white">
                <div className="flex items-center gap-2 mb-5">
                  <HeartHandshake className="w-5 h-5 text-binti-gold" aria-hidden />
                  <h3 className="font-bold">Donation tiers</h3>
                </div>
                <ul className="space-y-3">
                  {tiers.map((t) => (
                    <li
                      key={t.amount}
                      className="flex items-center justify-between gap-4 bg-white/10 rounded-xl px-4 py-3 border border-white/10"
                    >
                      <span className="text-binti-gold font-extrabold whitespace-nowrap">{t.amount}</span>
                      <span className="text-sm text-white/70 text-right leading-snug">{t.impact}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-white/50 leading-relaxed">
                  Tiers reflect the real unit costs of session delivery,
                  materials and facilitation. A full funding breakdown is
                  published in our annual review (see{" "}
                  <Link href="/about/governance" className="text-binti-gold font-semibold hover:underline">
                    governance
                  </Link>
                  ).
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-binti-warm-gray p-6">
                <h3 className="font-bold text-binti-navy mb-2">Corporate and institutional giving</h3>
                <p className="text-sm text-binti-navy/70 leading-relaxed mb-3">
                  Companies and foundations can fund cohorts, match employee
                  giving or sponsor specific communities. Start with the{" "}
                  <Link href="/get-involved/partner" className="text-binti-pink font-semibold hover:underline">
                    partnership page
                  </Link>{" "}
                  for structured reporting and recognition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
