"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Phone,
  MessageCircle,
  HeartHandshake,
  Home,
  Route,
  BarChart3,
  Scale,
  HandHeart,
  ExternalLink,
  ShieldCheck,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import { ORG, type SectionId, POLICIES } from "@/lib/binti/data";
import { BintiWordmark, BintiLogoImage, BintiMark } from "./ui";
import { SearchTrigger } from "./palette";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV: { id: SectionId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Our Work / JTW", icon: Route },
  { id: "dashboard", label: "Live Dashboard", icon: BarChart3 },
  { id: "accountability", label: "Accountability", icon: Scale },
  { id: "involved", label: "Get Involved", icon: HandHeart },
];

/* ------------------------------------------------------------------ */
/* TopBar - trust strip: registrations + GBV hotline (donor audit item) */
/* ------------------------------------------------------------------ */
function TopBar() {
  return (
    <div className="w-full bg-[#0F172A] text-white/80 text-[11px] leading-[16px] tracking-wide px-4 md:px-6 py-2 flex flex-wrap gap-x-4 gap-y-1 items-center justify-between">
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <span className="font-medium text-white">Reg No: {ORG.regNo}</span>
        <span className="hidden md:inline">Trusted by Shuga · PATH · Shujaaz</span>
      </div>
      <div className="flex gap-3 items-center">
        <a href="tel:1195" className="text-red-400 font-semibold hover:text-red-300 focus-visible:outline-2 focus-visible:outline-binti-amber">
          {ORG.hotlineLabel}
        </a>
        <a href={ORG.whatsappLink} target="_blank" rel="noreferrer" className="hover:text-white focus-visible:outline-2 focus-visible:outline-binti-amber">
          WhatsApp {ORG.whatsapp}
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */
export function Navbar({
  active,
  onNavigate,
  onDonate,
  onSearch,
}: {
  active: SectionId;
  onNavigate: (s: SectionId) => void;
  onDonate: () => void;
  onSearch: () => void;
}) {
  const [open, setOpen] = useState(false);

  const go = (s: SectionId) => {
    setOpen(false);
    onNavigate(s);
  };

  return (
    <header className="sticky top-0 z-40">
      <TopBar />
      <nav
        aria-label="Main navigation"
        className="w-full border-b border-binti-sand bg-binti-cream/95 backdrop-blur supports-[backdrop-filter]:bg-binti-cream/85"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-6">
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-binti"
            aria-label="Binti Rising Initiative - go to home"
          >
            <BintiLogoImage size={40} />
            <BintiWordmark className="hidden sm:inline-flex" />
            <span className="sm:hidden font-hand text-2xl font-bold text-binti-pink leading-none">Binti Rising</span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  aria-current={active === item.id ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-binti",
                    active === item.id
                      ? "bg-binti text-white shadow-sm"
                      : "text-binti-slate hover:bg-binti-sand/70 hover:text-binti-ink"
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <SearchTrigger onClick={onSearch} />
            <ThemeToggle />
            <Button
              onClick={onDonate}
              className="hidden sm:inline-flex bg-mpesa hover:bg-green-600 text-white font-bold rounded-full h-10 px-4 gap-1.5 shadow-sm focus-visible:outline-2 focus-visible:outline-binti-ink"
              aria-label="Donate via M-Pesa"
            >
              <HeartHandshake className="size-4" aria-hidden="true" />
              Donate M-Pesa
            </Button>

            {/* Mobile hamburger */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden border-binti/30 bg-binti-card/70"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-5 text-binti dark:text-indigo-300" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-binti-cream border-binti-sand">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="mt-2 flex flex-col gap-1">
                  <SearchTrigger
                      variant="mobile"
                      onClick={() => {
                        setOpen(false);
                        onSearch();
                      }}
                    />
                  {NAV.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => go(item.id)}
                        aria-current={active === item.id ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-semibold transition-colors",
                          active === item.id
                            ? "bg-binti text-white"
                            : "text-binti-ink hover:bg-binti-sand"
                        )}
                      >
                        <Icon className="size-4.5" aria-hidden="true" />
                        {item.label}
                      </button>
                    );
                  })}
                  <div className="mt-3 border-t border-binti-sand pt-3">
                    <Button
                      onClick={() => {
                        setOpen(false);
                        onDonate();
                      }}
                      className="w-full bg-mpesa hover:bg-green-600 text-white font-bold rounded-full h-11"
                    >
                      <HeartHandshake className="size-4" aria-hidden="true" /> Donate M-Pesa
                    </Button>
                    <a
                      href="tel:1195"
                      className="mt-2 flex items-center justify-center gap-2 rounded-full border border-red-300 bg-red-50 py-2.5 text-sm font-bold text-red-600 dark:text-red-700"
                    >
                      <Phone className="size-4" aria-hidden="true" /> GBV Hotline 1195
                    </a>
                    {/* Dark / light switch (mobile) */}
                    <div className="mt-2 flex items-center justify-center">
                      <ThemeToggle withLabel />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Footer - Reg No NC/SD/CBO/2026/0123 + Hotline 1195 + WhatsApp       */
/* Sticky to bottom via mt-auto in parent (min-h-screen flex flex-col) */
/* ------------------------------------------------------------------ */
export function Footer({ onNavigate }: { onNavigate: (s: SectionId) => void }) {
  return (
    <footer className="mt-auto w-full bg-[#0F172A] text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-3">
          <BintiWordmark variant="white" />
          <p className="font-hand text-2xl text-binti-amber">{ORG.tagline}</p>
          <p className="text-[13px] leading-relaxed text-white/60">
            Peer-led 8-session Journey to Wholeness for 15–25-year-olds of all genders in Kibera, Mathare & Kawangware. Co-created by 50 youth.
          </p>
          <div className="flex items-center gap-2 text-[12px] text-white/70">
            <ShieldCheck className="size-4 text-green-400" aria-hidden="true" />
            Kenya DPA 2019 compliant · Data aggregated only
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer navigation">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-binti-amber">Explore</h3>
          <ul className="mt-3 space-y-2" role="list">
            {NAV.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className="text-[13.5px] text-white/75 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-binti-amber"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Policies */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-binti-amber">Policy Downloads</h3>
          <ul className="mt-3 space-y-2" role="list">
            {POLICIES.map((p) => (
              <li key={p.file}>
                <a
                  href={p.file}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13.5px] text-white/75 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-binti-amber"
                >
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-binti-amber">Contact</h3>
          <ul className="mt-3 space-y-2.5 text-[13.5px] text-white/75" role="list">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-red-400" aria-hidden="true" />
              <a href="tel:1195" className="font-bold text-red-300 hover:text-red-200">Hotline 1195 GBV</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="size-4 text-green-400" aria-hidden="true" />
              <a href={ORG.whatsappLink} target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                WhatsApp {ORG.whatsapp}
              </a>
            </li>
            <li>{ORG.semaBy}</li>
            <li>{ORG.address}</li>
            <li className="pt-1 text-white/50">Socials: {ORG.socials}</li>
            <li>
              <div className="flex gap-2 pt-1">
                {[
                  { Icon: Instagram, href: "https://instagram.com/bintirising", label: "Binti Rising on Instagram" },
                  { Icon: Facebook, href: "https://facebook.com/bintirising", label: "Binti Rising on Facebook" },
                  { Icon: Twitter, href: "https://x.com/bintirising", label: "Binti Rising on X (Twitter)" },
                  { Icon: Linkedin, href: "https://linkedin.com/company/bintirising", label: "Binti Rising on LinkedIn" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-binti-pink hover:text-white"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Registration strip (donor audit: first glance) */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 md:px-6 py-3 text-[11px] text-white/60">
          <p>© 2026 Binti Rising Initiative · Reg No: {ORG.regNo} · Trusted by Shuga · PATH · Shujaaz</p>
          <p className="flex items-center gap-2">
            <BintiMark light size={14} />
            Peer-led · Data-driven · Audited · No cash, M-Pesa Till {ORG.paybill} only
          </p>
        </div>
      </div>
    </footer>
  );
}
