import { PhoneCall, ShieldAlert } from "lucide-react";
import { ORG } from "@/lib/data/organization";

/**
 * Crisis / safety block (spec 5.6) - visible, crawlable, server-rendered.
 * Shown on every SRHR, mental-health and GBV page. Lists Kenya's national
 * PUBLIC helplines only (government-run services); each is marked
 * data-verify-pending until the organisation confirms current wording.
 */
export default function CrisisHelpline({ title }: { title?: string }) {
  return (
    <aside
      aria-label="Urgent help lines"
      data-q-a="helpline"
      className="rounded-2xl border-2 border-binti-pink/30 bg-binti-pink/5 p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <ShieldAlert className="h-5 w-5 text-binti-pink" aria-hidden />
        <h2 className="text-base sm:text-lg font-bold text-binti-navy">
          {title ?? "Get urgent help now"}
        </h2>
      </div>
      <p className="text-sm text-binti-navy/70 leading-relaxed mb-4">
        If you or someone you know is in danger, these Kenya national
        helplines are free to call. BINTI Rising is not an emergency service;
        these public lines are.
      </p>
      <ul className="grid sm:grid-cols-3 gap-3">
        {ORG.helplines.map((line) => (
          <li
            key={line.phone}
            data-verify-pending={line.verifyPending ? "true" : undefined}
            className="rounded-xl bg-white p-4 border border-binti-pink/20"
          >
            <a
              href={`tel:${line.phone}`}
              className="inline-flex items-center gap-2 text-xl font-extrabold text-binti-pink hover:underline"
            >
              <PhoneCall className="h-4 w-4" aria-hidden />
              {line.phone}
            </a>
            <div className="mt-1 text-sm font-semibold text-binti-navy">{line.name}</div>
            <p className="text-xs text-binti-navy/60 mt-1 leading-relaxed">{line.description}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-binti-navy/50 leading-relaxed">
        After an assault: seek medical care within 72 hours - public hospitals
        provide free post-rape care. Every SRHR and mental-health page on this
        site carries these numbers.
      </p>
    </aside>
  );
}
