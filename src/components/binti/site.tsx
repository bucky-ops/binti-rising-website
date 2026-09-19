"use client";

import { useCallback, useEffect, useState } from "react";
import type { SectionId } from "@/lib/binti/data";
import { Navbar, Footer } from "./chrome";
import { HomeSection } from "./sections/home";
import { WorkSection } from "./sections/work";
import { DashboardSection } from "./sections/dashboard";
import { AccountabilitySection } from "./sections/accountability";
import { InvolvedSection, DonateModal } from "./sections/involved";
import { HeartHandshake } from "lucide-react";

const VALID: SectionId[] = ["home", "work", "dashboard", "accountability", "involved"];

function sectionFromHash(): SectionId {
  const h = (typeof window !== "undefined" ? window.location.hash.replace("#", "") : "") as SectionId;
  return VALID.includes(h) ? h : "home";
}

/* ------------------------------------------------------------------ */
/* BintiSite — single-route app: 5 sections as in-app "pages"          */
/* Layout: min-h-screen flex flex-col, footer sticks with mt-auto      */
/* ------------------------------------------------------------------ */
export function BintiSite() {
  const [section, setSection] = useState<SectionId>("home");
  const [donateOpen, setDonateOpen] = useState(false);

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

      <Navbar active={section} onNavigate={navigate} onDonate={() => setDonateOpen(true)} />

      <main id="main-content" className="flex-1">
        {section === "home" && <HomeSection onNavigate={navigate} />}
        {section === "work" && <WorkSection onNavigate={navigate} />}
        {section === "dashboard" && <DashboardSection />}
        {section === "accountability" && <AccountabilitySection />}
        {section === "involved" && <InvolvedSection onDonate={() => setDonateOpen(true)} />}
      </main>

      <Footer onNavigate={navigate} />

      {/* Mobile sticky Donate (prototype flow: Mobile Hamburger → Work → Donate sticky) */}
      <button
        onClick={() => setDonateOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-mpesa px-5 font-display text-[15px] font-extrabold text-white shadow-2xl shadow-green-900/30 transition hover:scale-105 hover:bg-green-600 sm:hidden"
        aria-label="Donate via M-Pesa — sticky button"
      >
        <HeartHandshake className="size-5" aria-hidden="true" />
        Donate
      </button>

      <DonateModal open={donateOpen} onOpenChange={setDonateOpen} />
    </div>
  );
}
