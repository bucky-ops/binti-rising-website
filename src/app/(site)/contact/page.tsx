import type { Metadata } from "next";
import { Mail, MapPin, Clock3 } from "lucide-react";
import PageHero from "@/components/binti/PageHero";
import JsonLdGraph from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { pageGraph, fullPageGraph } from "@/lib/seo/schema";
import { ORG } from "@/lib/data/organization";
import ContactForm from "@/components/binti/forms/ContactForm";
import PendingNotice from "@/components/binti/PendingNotice";

export const metadata: Metadata = buildMetadata({
  path: "/contact",
  title: "Contact BINTI Rising Initiative | Nairobi, Kenya",
  description:
    "Contact BINTI Rising Initiative in Nairobi, Kenya: email info@bintirising.org or send a message. We respond to general, volunteer and partner queries.",
});

export default function ContactPage() {
  return (
    <>
      <JsonLdGraph
        nodes={fullPageGraph(
          pageGraph({
          path: "/contact",
          title: "Contact BINTI Rising Initiative | Nairobi, Kenya",
          description:
            "Contact BINTI Rising Initiative in Nairobi, Kenya: email info@bintirising.org or send a message.",
          type: "ContactPage",
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ],
        }))}
      />
      <PageHero
        kicker="Contact"
        title="Talk to BINTI Rising"
        intro="Whether you want to join a program, volunteer, partner, donate or just ask a question - this form reaches the team directly. We aim to respond within 48 hours, Monday to Saturday, in English or Swahili. Every message is read by a real person on the team, and anything sensitive stays confidential."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-binti-warm-gray/50 border border-binti-warm-gray p-6">
                <h2 className="font-bold text-binti-navy text-lg mb-4">Reach us directly</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-binti-pink shrink-0 mt-0.5" aria-hidden />
                    <div>
                      <div className="text-sm font-semibold text-binti-navy">Email</div>
                      <a
                        href={`mailto:${ORG.email}`}
                        className="text-sm text-binti-pink font-medium hover:underline"
                      >
                        {ORG.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-binti-pink shrink-0 mt-0.5" aria-hidden />
                    <div>
                      <div className="text-sm font-semibold text-binti-navy">Where we work</div>
                      <p className="text-sm text-binti-navy/70">
                        Nairobi, Kenya - community venues across 11 wards.{" "}
                        <a href="/communities" className="text-binti-pink font-medium hover:underline">
                          See the list
                        </a>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock3 className="w-5 h-5 text-binti-pink shrink-0 mt-0.5" aria-hidden />
                    <div>
                      <div className="text-sm font-semibold text-binti-navy">Response time</div>
                      <p className="text-sm text-binti-navy/70">
                        Within 48 hours, Monday to Saturday.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <PendingNotice fields={["telephone", "address.street / postalCode"]} />

              <div className="rounded-2xl border-2 border-binti-pink/30 bg-binti-pink/5 p-6">
                <h2 className="font-bold text-binti-navy mb-2">In immediate danger?</h2>
                <p className="text-sm text-binti-navy/70 leading-relaxed mb-3">
                  This contact form is not monitored for emergencies. Use
                  Kenya&apos;s national toll-free lines:
                </p>
                <ul className="space-y-1.5">
                  {ORG.helplines.map((l) => (
                    <li key={l.phone} className="text-sm text-binti-navy/70">
                      <a href={`tel:${l.phone}`} className="font-extrabold text-binti-pink hover:underline">
                        {l.phone}
                      </a>{" "}
                      - {l.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border-2 border-binti-warm-gray bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-binti-navy mb-1">Send us a message</h2>
                <p className="text-sm text-binti-navy/60 mb-6">
                  All fields marked * are required.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
