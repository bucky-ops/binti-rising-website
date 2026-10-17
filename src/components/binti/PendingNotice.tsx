import { CircleAlert } from "lucide-react";
import { PENDING_HUMAN_INPUT } from "@/lib/data/organization";

/**
 * Visible pending-input marker (spec R1 + 2.1). Renders a discreet but
 * unmistakable notice where data awaits written human confirmation, and
 * carries data-q-a="pending" so audits can find these spots.
 */
export default function PendingNotice({
  fields,
  compact,
}: {
  /** PENDING_HUMAN_INPUT `field` values to reference; empty = generic. */
  fields?: string[];
  compact?: boolean;
}) {
  const items = fields
    ? PENDING_HUMAN_INPUT.filter((p) => fields.includes(p.field))
    : [];

  return (
    <div
      data-q-a="pending"
      className="rounded-xl border border-dashed border-binti-gold/50 bg-binti-gold/5 p-4"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <CircleAlert className="h-4 w-4 text-binti-gold shrink-0" aria-hidden />
        <span className="text-sm font-bold text-binti-navy">
          Being confirmed by our team
        </span>
      </div>
      {!compact && items.length > 0 && (
        <ul className="list-disc pl-5 space-y-1">
          {items.map((item) => (
            <li key={item.field} className="text-sm text-binti-navy/70 leading-relaxed">
              {item.why}
            </li>
          ))}
        </ul>
      )}
      {!compact && items.length === 0 && (
        <p className="text-sm text-binti-navy/70 leading-relaxed">
          Some details on this page are awaiting written confirmation from the
          organisation and are intentionally left unpublished rather than
          estimated. Questions? Email info@bintirising.org.
        </p>
      )}
    </div>
  );
}
