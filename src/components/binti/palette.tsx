"use client";

import { useEffect, useMemo, useState } from "react";
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
  History,
  Eraser,
  ArrowRight,
  Search as SearchIcon,
  type LucideIcon,
} from "lucide-react";
import { ORG, POLICIES, FAQS, type SectionId } from "@/lib/binti/data";
import { cn } from "@/lib/utils";

/**
 * BintiCommandPalette - donor-grade ⌘K quick-switcher.
 * Search/jump: sections, actions (donate/join/report/partner), policy PDFs,
 * donor FAQ answers and contact channels. Fully keyboard-driven.
 *
 * RECENT ITEMS: the last 4 selections are remembered per device
 * (localStorage key below) and surfaced as a "Recent" group. We store ONLY
 * anonymous item ids - never keystrokes, never form data, no PII - and the
 * data never leaves the device (Kenya DPA 2019 aligned).
 *
 * RANKING: cmdk's default fuzzy filter ranks scattered subsequence matches
 * above perfect prefixes (verified: "donate" selected "Get Involved"), so we
 * supply a deterministic scorer - prefix > word-start > substring > fuzzy -
 * and encode each item's label + keywords into its `value`. Verified:
 * "donate" → M-Pesa donate action, "safeguard" → report/policy, etc.
 */

type PaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (s: SectionId) => void;
  onDonate: () => void;
};

const RECENT_KEY = "binti.palette.recent.v1";
const RECENT_MAX = 4;

/** Safe read of recent item ids (device-local, anonymous ids only). */
function readRecent(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    const arr = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string").slice(0, RECENT_MAX) : [];
  } catch {
    return [];
  }
}

/** Persist a freshly used item id (most-recent-first, deduped, capped). */
function trackRecent(id: string) {
  try {
    const next = [id, ...readRecent().filter((x) => x !== id)].slice(0, RECENT_MAX);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable (private mode) - recents simply stay empty */
  }
}

/** Deterministic palette scorer: prefix 1 > word-start .85 > substring .7 > fuzzy .3 */
function paletteFilter(value: string, search: string): number {
  const v = value.toLowerCase();
  const s = search.toLowerCase().trim();
  if (!s) return 1;
  if (v.startsWith(s)) return 1;
  if (new RegExp(`(^|\\s)${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(v)) return 0.85;
  if (v.includes(s)) return 0.7;
  // fuzzy subsequence - all chars in order
  let i = 0;
  for (let c = 0; c < v.length && i < s.length; c++) if (v[c] === s[i]) i++;
  return i === s.length ? 0.3 : 0;
}

type RecentEntry = { label: string; value: string; Icon: LucideIcon; tone: string; act: () => void };

export function BintiCommandPalette({ open, onOpenChange, onNavigate, onDonate }: PaletteProps) {
  // Recents are read during render (device-local, anonymous ids only).
  // SSR-safe: the server renders open=false; on the client a closed palette
  // shows nothing, and every open render re-reads localStorage so entries
  // are always fresh right after a selection.
  const recents = open && typeof window !== "undefined" ? readRecent() : [];

  // Bumped when the visitor clears recents: forces a re-render so the
  // render-time localStorage read above picks up the emptied list at once.
  const [, setClearTick] = useState(0);

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

  const run = (id: string, fn: () => void) => () => {
    trackRecent(id);
    onOpenChange(false);
    fn();
  };

  const go = (s: SectionId) => {
    onOpenChange(false);
    onNavigate(s);
  };

  // Registry mirrors every tracked item so the Recent group can re-run it.
  // Built inline each render (~20 tiny entries) - React-compiler friendly.
  const registry = new Map<string, RecentEntry>();
  registry.set("donate", { label: `Donate via M-Pesa - Paybill ${ORG.paybill}`, value: "donate via m-pesa paybill give money fund gift", Icon: HeartHandshake, tone: "text-mpesa", act: onDonate });
    registry.set("join", { label: "Join a Circle - ages 15–25", value: "join a circle enroll signup youth ages 15 25", Icon: HandHeart, tone: "text-binti-pink", act: () => go("involved") });
    registry.set("report", { label: "Report a concern - anonymous, 60s voice note", value: "report a concern complaint safeguarding anonymous voice note", Icon: ShieldAlert, tone: "text-binti-danger", act: () => go("accountability") });
    registry.set("partner", { label: "Partner with us - MOU & inquiry form", value: "partner with us mou inquiry collaboration funder", Icon: Handshake, tone: "text-binti-cyan", act: () => go("involved") });
    registry.set("nav:home", { label: "Home - stories, gallery & FAQ", value: "home hero stories gallery alumni wall timeline", Icon: Home, tone: "text-binti dark:text-indigo-300", act: () => go("home") });
    registry.set("nav:work", { label: "Our Work - JTW 8-session journey", value: "our work jtw journey sessions curriculum eight steps", Icon: Route, tone: "text-binti dark:text-indigo-300", act: () => go("work") });
    registry.set("nav:dashboard", { label: "Live Impact Dashboard - KPIs & exports", value: "live impact dashboard kpis data indicators exports", Icon: BarChart3, tone: "text-binti dark:text-indigo-300", act: () => go("dashboard") });
    registry.set("nav:accountability", { label: "Accountability - finance & complaints", value: "accountability finance reports complaints safeguarding audit", Icon: Scale, tone: "text-binti dark:text-indigo-300", act: () => go("accountability") });
    registry.set("nav:involved", { label: "Get Involved - youth, donors, partners", value: "get involved youth donors partners tabs", Icon: HandHeart, tone: "text-binti dark:text-indigo-300", act: () => go("involved") });
    for (const p of POLICIES) {
        registry.set(`pdf:${p.file}`, { label: p.title, value: `pdf download ${p.title.toLowerCase()}`, Icon: FileDown, tone: "text-binti-amber", act: () => window.open(p.file, "_blank", "noreferrer") });
    }
    registry.set("pdf:mou", { label: "MOU Template - partnership agreement", value: "pdf download mou template memorandum of understanding partnership", Icon: FileDown, tone: "text-binti-amber", act: () => window.open("/policies/binti-mou-template.pdf", "_blank", "noreferrer") });
    registry.set("whatsapp", { label: `WhatsApp ${ORG.whatsapp}`, value: "whatsapp chat sema na me message", Icon: MessageCircle, tone: "text-mpesa", act: () => window.open(ORG.whatsappLink, "_blank", "noreferrer") });
    registry.set("tel1195", { label: "GBV Hotline 1195 - toll free", value: "gbv hotline 1195 call emergency toll free", Icon: Phone, tone: "text-red-500", act: () => window.location.assign("tel:1195") });
    registry.set("sema", { label: "Sema na Me · WhatsApp chatbot by Shujaaz", value: "sema na me chatbot shujaaz whatsapp join help", Icon: MessageCircle, tone: "text-mpesa", act: () => go("involved") });
    FAQS.slice(0, 6).forEach((f, i) => {
        registry.set(`faq:${i}`, { label: f.q, value: `faq answer ${f.q.toLowerCase()}`, Icon: HelpCircle, tone: "text-binti dark:text-indigo-300", act: () => go("home") });
    });

  const recentEntries = recents.filter((id) => registry.has(id));

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
                  Ask Sema na Me instead, the WhatsApp chatbot by Shujaaz: {ORG.whatsapp}
                </p>
              </div>
            </CommandEmpty>

            {/* RECENT - device-local, anonymous ids only; plain re-runs of
                earlier selections so repeat donors are one Enter away. */}
            {recentEntries.length > 0 && (
              <>
                <CommandGroup heading="Recently used">
                  {recentEntries.map((id) => {
                    const r = registry.get(id)!;
                    return (
                      <CommandItem key={`recent-${id}`} onSelect={run(id, r.act)} value={`recent ${r.value}`}>
                        <r.Icon className={cn(r.tone)} aria-hidden="true" />
                        <span className="line-clamp-1 text-binti-ink">{r.label}</span>
                        <CommandShortcut className="hidden items-center gap-1 text-[10.5px] sm:inline-flex">
                          <History className="size-3" aria-hidden="true" /> recent
                        </CommandShortcut>
                      </CommandItem>
                    );
                  })}
                  {/* Device-local reset - maintenance action: never tracked as
                      a recent itself, keeps the palette open so the group
                      vanishing is the immediate visual confirmation. */}
                  <CommandItem
                    value="clear recently used history privacy reset device"
                    onSelect={() => {
                      try {
                        window.localStorage.removeItem(RECENT_KEY);
                      } catch {
                        /* storage unavailable - nothing to clear */
                      }
                      setClearTick((t) => t + 1);
                    }}
                    className="mt-1 border-t border-dashed border-binti-sand/80 pt-1 text-[12px] text-binti-slate/80 data-[selected=true]:text-binti-danger"
                  >
                    <Eraser className="size-4 text-binti-slate/70" aria-hidden="true" />
                    <span>Clear recently used (this device)</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {/* ACTIONS FIRST - palette convention + deterministic first-hit for
                queries like "donate" (cmdk DOM-sort vs React19 re-render can
                revert group order; source order is the stable fallback). */}
            <CommandGroup heading="Take action">
              <CommandItem onSelect={run("donate", onDonate)} value="donate via m-pesa paybill give money fund gift">
                <HeartHandshake className="text-mpesa" aria-hidden="true" />
                <span className="text-binti-ink">Donate via M-Pesa - Paybill {ORG.paybill}</span>
                <span className="ml-auto hidden text-[11px] font-semibold text-binti-slate sm:inline">Till {ORG.paybill}</span>
              </CommandItem>
              <CommandItem onSelect={run("join", () => go("involved"))} value="join a circle enroll signup youth ages 15 25">
                <HandHeart className="text-binti-pink" aria-hidden="true" />
                <span className="text-binti-ink">Join a Circle - ages 15–25</span>
              </CommandItem>
              <CommandItem onSelect={run("report", () => go("accountability"))} value="report a concern complaint safeguarding anonymous voice note">
                <ShieldAlert className="text-binti-danger" aria-hidden="true" />
                <span className="text-binti-ink">Report a concern - anonymous, 60s voice note</span>
              </CommandItem>
              <CommandItem onSelect={run("partner", () => go("involved"))} value="partner with us mou inquiry collaboration funder">
                <Handshake className="text-binti-cyan" aria-hidden="true" />
                <span className="text-binti-ink">Partner with us - MOU & inquiry form</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Jump to">
              <CommandItem onSelect={run("nav:home", () => go("home"))} value="home hero stories gallery alumni wall timeline">
                <Home className="text-binti dark:text-indigo-300" aria-hidden="true" />
                <span className="text-binti-ink">Home - stories, gallery & FAQ</span>
              </CommandItem>
              <CommandItem onSelect={run("nav:work", () => go("work"))} value="our work jtw journey sessions curriculum eight steps">
                <Route className="text-binti dark:text-indigo-300" aria-hidden="true" />
                <span className="text-binti-ink">Our Work - JTW 8-session journey</span>
              </CommandItem>
              <CommandItem onSelect={run("nav:dashboard", () => go("dashboard"))} value="live impact dashboard kpis data indicators exports">
                <BarChart3 className="text-binti dark:text-indigo-300" aria-hidden="true" />
                <span className="text-binti-ink">Live Impact Dashboard - KPIs & exports</span>
              </CommandItem>
              <CommandItem onSelect={run("nav:accountability", () => go("accountability"))} value="accountability finance reports complaints safeguarding audit">
                <Scale className="text-binti dark:text-indigo-300" aria-hidden="true" />
                <span className="text-binti-ink">Accountability - finance & complaints</span>
              </CommandItem>
              <CommandItem onSelect={run("nav:involved", () => go("involved"))} value="get involved youth donors partners tabs">
                <HandHeart className="text-binti dark:text-indigo-300" aria-hidden="true" />
                <span className="text-binti-ink">Get Involved - youth, donors, partners</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Policies & downloads">
              {POLICIES.map((p) => (
                <CommandItem
                  key={p.file}
                  value={`pdf download ${p.title.toLowerCase()}`}
                  onSelect={run(`pdf:${p.file}`, () => window.open(p.file, "_blank", "noreferrer"))}
                >
                  <FileDown className="text-binti-amber" aria-hidden="true" />
                  <span className="text-binti-ink">{p.title}</span>
                  <span className="ml-auto text-[11px] text-binti-slate">{p.size}</span>
                </CommandItem>
              ))}
              <CommandItem
                value="pdf download mou template memorandum of understanding partnership"
                onSelect={run("pdf:mou", () => window.open("/policies/binti-mou-template.pdf", "_blank", "noreferrer"))}
              >
                <FileDown className="text-binti-amber" aria-hidden="true" />
                <span className="text-binti-ink">MOU Template - partnership agreement</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Donor FAQ - quick answers">
              {faqItems.map((f, i) => (
                <CommandItem key={f.q} value={`faq answer ${f.q.toLowerCase()}`} onSelect={run(`faq:${i}`, () => go("home"))}>
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
                onSelect={run("whatsapp", () => window.open(ORG.whatsappLink, "_blank", "noreferrer"))}
              >
                <MessageCircle className="text-mpesa" aria-hidden="true" />
                <span className="text-binti-ink">WhatsApp {ORG.whatsapp}</span>
                <ArrowRight className="ml-auto text-binti-slate" aria-hidden="true" />
              </CommandItem>
              <CommandItem value="gbv hotline 1195 call emergency toll free" onSelect={run("tel1195", () => window.location.assign("tel:1195"))}>
                <Phone className="text-red-500" aria-hidden="true" />
                <span className="text-binti-ink">GBV Hotline 1195 - toll free</span>
              </CommandItem>
              <CommandItem value="sema na me chatbot shujaaz whatsapp join help" onSelect={run("sema", () => go("involved"))}>
                <MessageCircle className="text-mpesa" aria-hidden="true" />
                <span className="text-binti-ink">Sema na Me · WhatsApp chatbot by Shujaaz</span>
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

/* Navbar / mobile trigger - pill button with kbd chip */
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
