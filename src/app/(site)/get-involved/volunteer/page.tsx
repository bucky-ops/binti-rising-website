import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Clock3, GraduationCap, MapPin } from "lucide-react";
import PageHero from "@/components/binti/PageHero";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, fullPageGraph } from "@/lib/seo/schema";
import VolunteerForm from "@/components/binti/forms/VolunteerForm";

export const metadata: Metadata = buildMetadata({
  path: "/get-involved/volunteer",
  title: "Volunteer With Us in Nairobi | BINTI Rising",
  description:
    "Volunteer with BINTI Rising: facilitate sessions, mentor young women, support M&E or communications in Nairobi. Apply online, response within 48 hours.",
});

const roles = [
  {
    icon: GraduationCap,
    title: "Session facilitator",
    text: "Co-deliver curriculum sessions (SRHR, mental health, financial literacy or leadership) with our staff, in community venues.",
    needs: "Subject confidence, Swahili and/or English, willingness to train in safeguarding.",
  },
  {
    icon: HeartHandshake,
    title: "Mentor",
    text: "Walk alongside participants and recent graduates as a consistent, trusted adult - especially around school, work and business goals.",
    needs: "Reliability and empathy; former participants especially welcome.",
  },
  {
    icon: Clock3,
    title: "M&E and data support",
    text: "Help collect and clean baseline/endline assessment data so our impact reporting stays honest.",
    needs: "Attention to detail; spreadsheets; discretion with sensitive data.",
  },
  {
    icon: MapPin,
    title: "Mobilisation & comms",
    text: "Spread the word in your community, support event logistics, capture consented photos and stories.",
    needs: "Local networks in Nairobi communities; photography or social media skills a plus.",
  },
];

export default function VolunteerPage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/get-involved/volunteer",
          title: "Volunteer With Us in Nairobi | BINTI Rising",
          description:
            "Volunteer with BINTI Rising: facilitate sessions, mentor young women, support M&E or communications in Nairobi.",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Get involved", path: "/get-involved/volunteer" },
            { name: "Volunteer", path: "/get-involved/volunteer" },
          ],
        }))}
      />
      <PageHero
        kicker="Volunteer"
        title="Volunteer with BINTI Rising in Nairobi"
        intro="Our programs run on people power. Facilitators, mentors, data volunteers and communicators each extend how many young women we can reach - and every volunteer is trained in safeguarding before entering a session."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Get involved", path: "/get-involved/volunteer" },
          { name: "Volunteer", path: "/get-involved/volunteer" },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy text-center mb-12">
            How volunteers help
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {roles.map((role) => (
              <article key={role.title} className="rounded-2xl bg-binti-warm-gray/50 border border-binti-warm-gray p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-binti-pink/10 mb-4">
                  <role.icon className="w-6 h-6 text-binti-pink" aria-hidden />
                </div>
                <h3 className="font-bold text-binti-navy">{role.title}</h3>
                <p className="mt-2 text-sm text-binti-navy/70 leading-relaxed">{role.text}</p>
                <p className="mt-3 text-xs text-binti-navy/50">
                  <strong className="text-binti-navy/70">Good fit if:</strong> {role.needs}
                </p>
              </article>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-binti-navy">
                What to expect
              </h2>
              <ol className="space-y-4">
                {[
                  "Apply through the form - tell us how you want to help and your availability.",
                  "We respond within 48 hours with next steps and a short conversation.",
                  "Safeguarding orientation and, for facilitators, curriculum training.",
                  "Get matched to a cohort near you - travel within Nairobi is supported where possible.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-binti-navy/70 leading-relaxed">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-binti-purple/10 text-binti-purple font-bold text-xs flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="rounded-xl border border-binti-gold/40 bg-binti-gold/5 p-4 text-sm text-binti-navy/70">
                <strong className="text-binti-navy">A note on safety:</strong> all
                volunteer roles involving contact with participants require a
                short safeguarding induction and adherence to our two-adult
                rule and confidentiality standards.
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-2xl border-2 border-binti-warm-gray bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-binti-navy mb-1">Volunteer application</h2>
                <p className="text-sm text-binti-navy/60 mb-6">
                  Fill this in and we&apos;ll get back to you within 48 hours.
                </p>
                <VolunteerForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-navy">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Not ready to apply yet?
          </h2>
          <p className="mt-3 text-white/70">
            Ask a question first - email{" "}
            <a href="mailto:info@bintirising.org" className="text-binti-gold font-semibold hover:underline">
              info@bintirising.org
            </a>{" "}
            or read about our{" "}
            <Link href="/programs" className="text-binti-gold font-semibold hover:underline">
              programs
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
