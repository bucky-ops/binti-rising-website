"use client";

import { useEffect, useMemo } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Home,
  Route,
  BarChart3,
  Scale,
  HandHeart,
  HeartHandshake,
  ShieldAlert,
  Handshake,
  FileDown,
  HelpCircle,
  Phone,
  MessageCircle,
  Hash,
  ArrowRight,
  Search as SearchIcon,
} from "lucide-react";
import { ORG, POLICIES, FAQS, type SectionId } from "@/lib/binti/data";
import { cn } from "@/lib/utils";

/**
 * BintiCommandPalette — donor-grade ⌘K quick-switcher.
 * Search/jump: sections, actions (donate/join/report/partner), policy PDFs,
 * donor FAQ answers and contact channels. Fully keyboard-driven.
 *
 * RANKING: cmdk's default fuzzy filter ranks scattered subsequence matches
 * above perfect prefixes (verified: "donate" selected "Get Involved"), so we
 * supply a deterministic scorer — prefix > word-start > substring > fuzzy —
 * and encode each item's label + keywords into its `value`. Verified:
 * "donate" → M-Pesa donate action, "safeguard" → report/policy, etc.
 *
 * DPA note: palette stores nothing — it is pure navigation.
 */

type PaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (s: SectionId) => void;
  onDonate: () => void;
};

/** Deterministic palette scorer: prefix 1 > word-start .85 > substring .7 > fuzzy .3 */
function paletteFilter(value: string, search: string): number {
  const v = value.toLowerCase();
  const s = search.toLowerCase().trim();
  if (!s) return 1;
  if (v.startsWith(s)) return 1;
  if (new RegExp(`(^|\\s)${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(v)) return 0.85;
  if (v.includes(s)) return 0.7;
  // fuzzy subsequence — all chars in order
  let i = 0;
  for (let c = 0; c < v.length && i < s.length; c++) if (v[c] === s[i]) i++;
  return i === s.length ? 0.3 : 0;
}

export function BintiCommandPalette({ open, onOpenChange, onNavigate, onDonate }: PaletteProps) {
  // Global ⌘K / Ctrl+K toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (s: SectionId) => {
    onOpenChange(false);
    onNavigate(s);
  };

  const run = (fn: () => void) => () => {
    onOpenChange(false);
    fn();
  };

  const faqItems = useMemo(() => FAQS.slice(0, 6), []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.DialogTitle className="sr-only">Search Binti Rising</DialogPrimitive.DialogTitle>
      <DialogPrimitive.DialogDescription className="sr-only">
        Jump to a section, download a policy, or take action
      </DialogPrimitive.DialogDescription>
      <DialogContent className="binti-palette overflow-hidden p-0 sm:max-w-xl">
        <Command filter={paletteFilter} className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <CommandInput placeholder="Search sections, policies, FAQ, actions…" aria-label="Search Binti Rising" />
          <CommandList className="binti-scroll max-h-[min(60vh,420px)]">
            <CommandEmpty>
              <div className="py-6 text-center">
                <p className="text-[13.5px] font-semibold text-binti-ink">No matches on this site.</p>
                <p className="mt-1 text-[12.5px] text-binti-slate">
                  Ask Sema na Me instead — WhatsApp {ORG.whatsapp} · shortcode {ORG.shortcode}
                </p>
              </div>
            </CommandEmpty>

            {/* ACTIONS FIRST — palette convention + deterministic first-hit for
                queries like "donate" (cmdk DOM-sort vs React19 re-render can
                revert group order; source order is the stable fallback). */}
            <CommandGroup heading="Take action">
              <CommandItem onSelect={run(onDonate)} value="donate via m-pesa paybill give money fund gift">
                <HeartHandshake className="text-mpesa" aria-hidden="true" />
                <span className="text-binti-ink">Donate via M-Pesa — Paybill {ORG.paybill}</span>
                <span className="ml-auto hidden text-[11px] font-semibold text-binti-slate sm:inline">Till {ORG.paybill}</span>
              </CommandItem>
              <CommandItem onSelect={run(() => go("involved"))} value="join a circle enroll signup youth ages 15 25">
                <HandHeart className="text-binti-pink" aria-hidden="true" />
                <span className="text-binti-ink">Join a Circle — ages 15–25</span>
              </CommandItem>
              <CommandItem onSelect={run(() => go("accountability"))} value="report a concern complaint safeguarding anonymous voice note">
                <ShieldAlert className="text-binti-danger" aria-hidden="true" />
                <span className="text-binti-ink">Report a concern — anonymous, 60s voice note</span>
              </CommandItem>
              <CommandItem onSelect={run(() => go("involved"))} value="partner with us mou inquiry collaboration funder">
                <Handshake className="text-binti-cyan" aria-hidden="true" />
                <span className="text-binti-ink">Partner with us — MOU & inquiry form</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Jump to">
              <CommandItem onSelect={run(() => go("home"))} value="home hero stories gallery alumni wall timeline">
                <Home className="text-binti dark:text-indigo-300" aria-hidden="true" />
                <span className="text-binti-ink">Home — stories, gallery & FAQ</span>
              </CommandItem>
              <CommandItem onSelect={run(() => go("work"))} value="our work jtw journey sessions curriculum eight steps">
                <Route className="text-binti dark:text-indigo-300" aria-hidden="true" />
                <span className="text-binti-ink">Our Work — JTW 8-session journey</span>
              </CommandItem>
              <CommandItem onSelect={run(() => go("dashboard"))} value="live impact dashboard kpis data indicators exports">
                <BarChart3 className="text-binti dark:text-indigo-300" aria-hidden="true" />
                <span className="text-binti-ink">Live Impact Dashboard — KPIs & exports</span>
              </CommandItem>
              <CommandItem onSelect={run(() => go("accountability"))} value="accountability finance reports complaints safeguarding audit">
                <Scale className="text-binti dark:text-indigo-300" aria-hidden="true" />
                <span className="text-binti-ink">Accountability — finance & complaints</span>
              </CommandItem>
              <CommandItem onSelect={run(() => go("involved"))} value="get involved youth donors partners tabs">
                <HandHeart className="text-binti dark:text-indigo-300" aria-hidden="true" />
                <span className="text-binti-ink">Get Involved — youth, donors, partners</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Policies & downloads">
              {POLICIES.map((p) => (
                <CommandItem
                  key={p.file}
                  value={`pdf download ${p.title.toLowerCase()}`}
                  onSelect={run(() => window.open(p.file, "_blank", "noreferrer"))}
                >
                  <FileDown className="text-binti-amber" aria-hidden="true" />
                  <span className="text-binti-ink">{p.title}</span>
                  <span className="ml-auto text-[11px] text-binti-slate">{p.size}</span>
                </CommandItem>
              ))}
              <CommandItem
                value="pdf download mou template memorandum of understanding partnership"
                onSelect={run(() => window.open("/policies/binti-mou-template.pdf", "_blank", "noreferrer"))}
              >
                <FileDown className="text-binti-amber" aria-hidden="true" />
                <span className="text-binti-ink">MOU Template — partnership agreement</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Donor FAQ — quick answers">
              {faqItems.map((f, i) => (
                <CommandItem key={f.q} value={`faq answer ${f.q.toLowerCase()}`} onSelect={run(() => go("home"))}>
                  <HelpCircle className="text-binti dark:text-indigo-300" aria-hidden="true" />
                  <span className="line-clamp-1 text-binti-ink">{f.q}</span>
                  <CommandShortcut className="hidden sm:inline">FAQ {i + 1}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Reach us now">
              <CommandItem
                value="whatsapp chat sema na me message"
                onSelect={run(() => window.open(ORG.whatsappLink, "_blank", "noreferrer"))}
              >
                <MessageCircle className="text-mpesa" aria-hidden="true" />
                <span className="text-binti-ink">WhatsApp {ORG.whatsapp}</span>
                <ArrowRight className="ml-auto text-binti-slate" aria-hidden="true" />
              </CommandItem>
              <CommandItem value="gbv hotline 1195 call emergency toll free" onSelect={run(() => window.location.assign("tel:1195"))}>
                <Phone className="text-red-500" aria-hidden="true" />
                <span className="text-binti-ink">GBV Hotline 1195 — toll free</span>
              </CommandItem>
              <CommandItem value="sms shortcode sema na me 20308 text" onSelect={run(() => go("accountability"))}>
                <Hash className="text-binti-cyan" aria-hidden="true" />
                <span className="text-binti-ink">SMS “Sema na Me” — shortcode {ORG.shortcode}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>

          {/* kbd hints footer */}
          <div className="flex items-center justify-between border-t border-binti-sand bg-binti-cream/60 px-3 py-2 text-[11px] text-binti-slate">
            <span className="flex items-center gap-2">
              <kbd className="binti-kbd">↑↓</kbd> browse
              <kbd className="binti-kbd">↵</kbd> select
              <kbd className="binti-kbd">esc</kbd> close
            </span>
            <span className="hidden items-center gap-1 sm:flex">
              Press <kbd className="binti-kbd">⌘K</kbd> anywhere
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

/* Navbar / mobile trigger — pill button with kbd chip */
export function SearchTrigger({
  onClick,
  variant = "desktop",
}: {
  onClick: () => void;
  variant?: "desktop" | "mobile";
}) {
  if (variant === "mobile") {
    return (
      <button
        onClick={onClick}
        className="mt-1 flex w-full items-center gap-2.5 rounded-xl border border-binti/25 bg-binti-card px-3 py-2.5 text-left text-[14px] font-semibold text-binti-slate transition hover:border-binti/50 hover:text-binti-ink"
        aria-label="Search the site"
      >
        <SearchIcon className="size-4.5 text-binti dark:text-indigo-300" aria-hidden="true" />
        Search or jump to…
        <kbd className="binti-kbd ml-auto">⌘K</kbd>
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      aria-label="Search the site (Command K)"
      className={cn(
        "hidden h-10 items-center gap-2 rounded-full border border-binti/25 bg-binti-card/70 px-3.5 text-[13px] font-semibold text-binti-slate transition",
        "hover:border-binti/50 hover:bg-binti-card hover:text-binti-ink md:inline-flex"
      )}
    >
      <SearchIcon className="size-4 text-binti dark:text-indigo-300" aria-hidden="true" />
      Search
      <kbd className="binti-kbd">⌘K</kbd>
    </button>
  );
}
