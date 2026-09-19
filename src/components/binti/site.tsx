"use client";

import { useCallback, useEffect, useState } from "react";
import type { SectionId } from "@/lib/binti/data";
import { Navbar, Footer } from "./chrome";
import { HomeSection } from "./sections/home";
import { WorkSection } from "./sections/work";
import { DashboardSection } from "./sections/dashboard";
import { AccountabilitySection } from "./sections/accountability";
import { InvolvedSection, DonateModal } from "./sections/involved";
import { SemaChat } from "./sema";
import { BintiCommandPalette } from "./palette";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, ArrowUp, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

const VALID: SectionId[] = ["home", "work", "dashboard", "accountability", "involved"];

function sectionFromHash(): SectionId {
  const h = (typeof window !== "undefined" ? window.location.hash.replace("#", "") : "") as SectionId;
  return VALID.includes(h) ? h : "home";
}

/* ------------------------------------------------------------------ */
/* BackToTop - appears after scrolling, smooth scroll to top           */
/* ------------------------------------------------------------------ */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 left-4 z-40 flex size-11 items-center justify-center rounded-full border border-binti/30 bg-binti-card/90 text-binti dark:text-indigo-300 shadow-lg backdrop-blur transition hover:bg-binti hover:text-white"
          aria-label="Back to top"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* ScrollProgress - thin gradient bar under the navbar                 */
/* ------------------------------------------------------------------ */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min((h.scrollTop / max) * 100, 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="no-print pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]" aria-hidden="true">
      <div className="binti-progress h-full transition-[width] duration-150 ease-out" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PrivacyNotice - DPA 2019 notice, bottom-center, dismiss (1 visit)   */
/* ------------------------------------------------------------------ */
const NOTICE_KEY = "binti-dpa-notice-v1";
function PrivacyNotice({ onLearnMore }: { onLearnMore: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // localStorage read must happen client-side only (no SSR mismatch)
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(NOTICE_KEY) === "1";
    } catch {
      /* private mode - just show */
    }
    if (!dismissed) {
      const t = setTimeout(() => setShow(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);
  const dismiss = () => {
    setShow(false);
    try {
      window.localStorage.setItem(NOTICE_KEY, "1");
    } catch {
      /* ignore */
    }
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          role="region"
          aria-label="Privacy notice"
          className="no-print fixed bottom-24 left-1/2 z-[35] mx-4 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 sm:bottom-5"
        >
          <div className="binti-card-glow relative flex items-start gap-3 rounded-2xl border border-binti/25 bg-binti-card/95 p-4 pr-11 shadow-2xl shadow-binti/15 backdrop-blur">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-binti to-binti-pink text-white" aria-hidden="true">
              <ShieldCheck className="size-4.5" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-[13.5px] font-extrabold text-binti-ink">Our data promise</p>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-binti-slate">
                Binti Rising publishes <strong className="text-binti-ink">aggregates only</strong> - never names,
                phones or IDs. This site sets no tracking cookies. Aligned with Kenya DPA 2019.
              </p>
              <div className="mt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    onLearnMore();
                    dismiss();
                  }}
                  className="text-[12.5px] font-bold text-binti dark:text-indigo-300 underline-offset-4 hover:underline"
                >
                  See how we protect data
                </button>
                <button
                  onClick={dismiss}
                  className="rounded-full bg-binti px-3.5 py-1.5 text-[12px] font-bold text-white transition hover:bg-binti-deep"
                >
                  Got it
                </button>
              </div>
            </div>
            <button
              onClick={dismiss}
              aria-label="Dismiss privacy notice"
              className="absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-full text-binti-slate transition hover:bg-binti-sand hover:text-binti-ink"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* SectionDots - desktop quick-switcher for the 5 in-app sections      */
/* (xl screens only; tooltips on hover; aria-current on active)        */
/* ------------------------------------------------------------------ */
const DOT_LABELS: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Our Work / JTW" },
  { id: "dashboard", label: "Live Dashboard" },
  { id: "accountability", label: "Accountability" },
  { id: "involved", label: "Get Involved" },
];
function SectionDots({ active, onNavigate }: { active: SectionId; onNavigate: (s: SectionId) => void }) {
  return (
    <nav
      aria-label="Section quick navigation"
      className="no-print fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-2.5 xl:flex"
    >
      {DOT_LABELS.map((d) => {
        const isActive = active === d.id;
        return (
          <button
            key={d.id}
            onClick={() => onNavigate(d.id)}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-2"
          >
            <span
              className={cn(
                "pointer-events-none rounded-full px-2.5 py-1 text-[11px] font-bold opacity-0 transition-all duration-200 group-hover:opacity-100",
                isActive ? "bg-binti text-white" : "bg-binti-card text-binti-ink shadow-md ring-1 ring-binti-sand"
              )}
            >
              {d.label}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "block rounded-full transition-all duration-300",
                isActive
                  ? "h-2.5 w-7 bg-gradient-to-r from-binti to-binti-pink shadow-md shadow-binti/30"
                  : "size-2.5 bg-binti-slate/35 group-hover:bg-binti"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* BintiSite - single-route app: 5 sections as in-app "pages"          */
/* Layout: min-h-screen flex flex-col, footer sticks with mt-auto      */
/* ------------------------------------------------------------------ */
export function BintiSite() {
  const [section, setSection] = useState<SectionId>("home");
  const [donateOpen, setDonateOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const navigate = useCallback((s: SectionId) => {
    setSection(s);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${s}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Deep links: #dashboard etc. + browser back/forward
  useEffect(() => {
    const apply = () => setSection(sectionFromHash());
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-binti-cream">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-binti focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <ScrollProgress />
      <Navbar
        active={section}
        onNavigate={navigate}
        onDonate={() => setDonateOpen(true)}
        onSearch={() => setPaletteOpen(true)}
      />
      <SectionDots active={section} onNavigate={navigate} />

      <main id="main-content" className="flex-1">
        {/* Keyed div + CSS animation (binti-page-enter) replays on section change.
            NOTE: no framer AnimatePresence here - PresenceChild's useId() shifts
            Radix ids and breaks SSR hydration (verified via dev overlay). */}
        <div key={section} className="binti-page-enter">
          {section === "home" && <HomeSection onNavigate={navigate} />}
          {section === "work" && <WorkSection onNavigate={navigate} />}
          {section === "dashboard" && <DashboardSection />}
          {section === "accountability" && <AccountabilitySection />}
          {section === "involved" && <InvolvedSection onDonate={() => setDonateOpen(true)} />}
        </div>
      </main>

      <Footer onNavigate={navigate} />

      <PrivacyNotice onLearnMore={() => navigate("accountability")} />

      <BackToTop />

      {/* Sema na Me - floating check-in buddy (WhatsApp 20308 flows) */}
      <SemaChat onNavigate={navigate} />

      {/* Mobile sticky Donate (prototype flow: Mobile Hamburger → Work → Donate sticky) */}
      <button
        onClick={() => setDonateOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-mpesa px-5 font-display text-[15px] font-extrabold text-white shadow-2xl shadow-green-900/30 transition hover:scale-105 hover:bg-green-600 sm:hidden"
        aria-label="Donate via M-Pesa - sticky button"
      >
        <HeartHandshake className="size-5" aria-hidden="true" />
        Donate
      </button>

      <DonateModal open={donateOpen} onOpenChange={setDonateOpen} />

      {/* ⌘K quick-switcher - pure navigation, stores nothing */}
      <BintiCommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onNavigate={navigate}
        onDonate={() => setDonateOpen(true)}
      />
    </div>
  );
}
