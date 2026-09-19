"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Heart,
  Users,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  Eye,
  Sparkles,
  Zap,
  Globe,
  Mail,
  Send,
  CheckCircle2,
  Quote as QuoteIcon,
  Search,
  X,
  MessageCircleQuestion,
} from "lucide-react";
import type { SectionId } from "@/lib/binti/data";
import { IMPACT_STRIP, WHAT_WE_DO, JTW, PARTNERS, TRUSTED_BY, HERO_QUOTE, STORIES, FAQS, MILESTONES, ALUMNI_WALL, type AlumniTile } from "@/lib/binti/data";
import { CountUp, NairobiPhoto, SectionHeading, RiskBadge, DataNote, SectionReveal } from "../ui";
import { CircleGallery } from "../gallery";
import { cn } from "@/lib/utils";

const ICONS = { Heart, Users, ShieldCheck, BarChart3 } as const;

/* ------------------------------------------------------------------ */
/* HERO - "From Silence, She Rises." 56px + circle photo + S4 overlay  */
/* ------------------------------------------------------------------ */
function Hero({ onNavigate }: { onNavigate: (s: SectionId) => void }) {
  return (
    <section aria-label="Hero" className="relative overflow-hidden bg-binti-cream">
      {/* decorative sun rays */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-gradient-to-br from-binti-amber/30 via-binti-pink/20 to-transparent blur-2xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 size-80 rounded-full bg-binti-cyan/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-2 lg:gap-14">
        {/* Left: headline + CTAs */}
        <div>
          <Badge className="mb-4 gap-1.5 rounded-full bg-binti-pink/10 px-3 py-1.5 text-[12px] font-bold text-binti-pinkdeep dark:text-pink-300 border border-binti-pink/30">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Peer-led · Journey to Wholeness · All genders 15–25
          </Badge>
          <h1 className="font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-binti-ink sm:text-5xl md:text-[56px]">
            From Silence,{" "}
            <span className="binti-gradient-text">She Rises.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[18px] leading-[28px] text-binti-slate">
            Peer-led 8-session mentorship for young people aged 15–25 (all genders) on SRH, mental
            health and healthy relationships in Kibera, Mathare & Kawangware. Binti does not just
            support the She, but also the He. Co-created by 50 youth, backed by live data, audited
            finances.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => onNavigate("work")}
              className="h-12 rounded-full bg-binti px-6 text-[15px] font-bold shadow-lg shadow-binti/25 hover:bg-binti-deep hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-binti-pink"
            >
              Meet Binti <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              onClick={() => onNavigate("dashboard")}
              variant="outline"
              className="h-12 rounded-full border-2 border-binti/40 bg-binti-card/70 px-6 text-[15px] font-bold text-binti dark:text-indigo-300 hover:bg-binti hover:text-white hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-binti-pink"
            >
              <Eye className="size-4" aria-hidden="true" /> View Live Data
            </Button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-[13px] text-binti-slate/80">
            <span className="inline-block size-2 rounded-full bg-green-500" aria-hidden="true" />
            Live dashboard synced {HERO_QUOTE.detail === "S4 Graduate" ? "2 min ago" : ""} · Data Quality 94% · DPA 2019
          </p>
        </div>

        {/* Right: circle photo with overlay S4 Very Heavy + floating chips */}
        <div className="relative mx-auto w-full max-w-[440px]">
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative aspect-square"
          >
            {/* slow-spinning sun rays behind the circle */}
            <svg
              viewBox="0 0 200 200"
              aria-hidden="true"
              className="binti-spin-slow absolute -inset-8 z-0 h-[calc(100%+4rem)] w-[calc(100%+4rem)] opacity-45"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2="100"
                  y2={i % 2 === 0 ? "2" : "10"}
                  stroke={i % 3 === 0 ? "#f59e0b" : i % 3 === 1 ? "#ec4899" : "#4f46e5"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  transform={`rotate(${i * 30} 100 100)`}
                  opacity={0.55}
                />
              ))}
            </svg>
            <div aria-hidden="true" className="absolute -inset-3 rounded-full bg-gradient-to-tr from-binti-pink/35 via-binti-amber/25 to-binti-cyan/30 blur-md" />
            <NairobiPhoto
              src="/nairobi-team/nairobi-01.webp"
              alt="Nairobi team - Binti Rising sisterhood circle member, portrait"
              circle
              priority
              sizes="(max-width: 768px) 90vw, 440px"
              className="relative h-full w-full border-[6px] border-white shadow-2xl shadow-binti/20"
            />
            {/* floating stat chips */}
            <div className="binti-float absolute left-0 top-10 rounded-2xl border border-binti-sand bg-binti-card/95 px-3.5 py-2 shadow-lg backdrop-blur sm:-left-8">
              <p className="font-display text-[17px] font-extrabold leading-none text-binti dark:text-indigo-300">94%</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-binti-slate">attendance</p>
            </div>
            <div className="binti-float-delay absolute bottom-14 right-0 rounded-2xl border border-binti-sand bg-binti-card/95 px-3.5 py-2 shadow-lg backdrop-blur sm:-right-6">
              <p className="font-display text-[17px] font-extrabold leading-none text-binti-pink">87%</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-binti-slate">referrals closed</p>
            </div>
            {/* overlay badge */}
            <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-red-300 bg-binti-card/95 px-4 py-2 shadow-lg backdrop-blur">
              <span className="size-2 animate-pulse rounded-full bg-binti-danger" aria-hidden="true" />
              <span className="font-display text-[12px] font-extrabold text-binti-ink">
                S4 Breaking Silence · <span className="text-binti-danger">VERY HEAVY</span>
              </span>
            </div>
            <div className="absolute right-0 top-6 rounded-full border border-binti-amber/40 bg-binti-card/95 px-3 py-1.5 shadow-md sm:-right-6">
              <span className="text-[11px] font-bold text-binti-slate">Safeguarding on standby</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* TRUSTED BY - Shuga · PATH · Shujaaz (client-requested trust strip)  */
/* Text wordmarks: no fabricated logo files, DPA/brand-safe.          */
/* ------------------------------------------------------------------ */
const TRUSTED_STYLES: Record<string, { icon: typeof Sparkles; chip: string; word: string }> = {
  Shuga: { icon: Sparkles, chip: "hover:border-binti-pink/50 hover:shadow-binti-pink/20", word: "text-binti-pink" },
  PATH: { icon: Globe, chip: "hover:border-binti/50 hover:shadow-binti/20", word: "text-binti dark:text-indigo-300" },
  Shujaaz: { icon: Zap, chip: "hover:border-binti-amber/60 hover:shadow-binti-amber/20", word: "text-amber-500" },
};

function TrustedBy() {
  return (
    <section aria-label="Trusted by partners" className="border-b border-binti-sand bg-binti-card/70">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-5 md:px-6">
        <p className="font-display text-[11.5px] font-bold uppercase tracking-[0.22em] text-binti-slate">
          Trusted by
        </p>
        {TRUSTED_BY.map((name) => {
          const s = TRUSTED_STYLES[name] ?? TRUSTED_STYLES.PATH;
          const Icon = s.icon;
          return (
            <span
              key={name}
              className={cn(
                "binti-lift inline-flex items-center gap-2 rounded-full border border-binti-sand bg-binti-cream px-4 py-1.5 shadow-sm transition-all",
                s.chip
              )}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              <span className={cn("font-display text-[14px] font-extrabold tracking-wide", s.word)}>{name}</span>
            </span>
          );
        })}
        <span className="hidden text-[11px] text-binti-slate/70 sm:inline">
          alongside LVCT Health, Nairobi County & Global Fund partners
        </span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* IMPACT STRIP - count-up animated aggregated totals                  */
/* ------------------------------------------------------------------ */
function ImpactStrip() {
  return (
    <section aria-label="Impact at a glance" className="w-full bg-binti">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4 md:px-6 md:py-10">
        {IMPACT_STRIP.map((s, i) => (
          <div key={s.label} className={cn("binti-stat text-center", i > 0 && "md:pl-6")}>
            <p className="font-display text-4xl font-extrabold text-white md:text-5xl">
              <CountUp end={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-binti-amber">
              {s.label}
            </p>
            <p className="text-[12px] text-white/60">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* STORIES OF RISE - masked testimonials w/ Nairobi photos (DPA 2019)  */
/* ------------------------------------------------------------------ */
function StoriesOfRise() {
  return (
    <section aria-label="Stories of Rise" className="bg-gradient-to-b from-binti-cream to-binti-card py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionReveal>
          <SectionHeading
            align="center"
            eyebrow="Stories of Rise"
            title={
              <>
                She carried the stone. <span className="font-hand text-4xl font-bold text-binti-pink">Then she set it down.</span>
              </>
            }
            sub="Real journeys from the circles - names masked per Kenya DPA 2019, shared with each storyteller's consent."
          />
        </SectionReveal>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {STORIES.map((s, i) => (
            <SectionReveal key={s.initials} delay={i * 0.08}>
              <Card className="binti-card-glow h-full overflow-hidden rounded-2xl border-binti-sand bg-binti-card pt-0">
                <div className="binti-img-zoom relative h-44">
                  <NairobiPhoto src={s.photo} alt={`Binti Rising circle session photo - ${s.area}`} sizes="(max-width: 768px) 100vw, 380px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" aria-hidden="true" />
                  <span className="absolute left-3 top-3 rounded-full bg-binti-card/95 px-2.5 py-1 text-[11px] font-bold text-binti dark:text-indigo-300 shadow-sm">
                    {s.tag}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5">
                    <span className="font-hand text-2xl font-bold text-white">{s.initials}</span>
                    <span className="text-[11.5px] font-semibold text-white/85">
                      {s.age} · {s.area}
                    </span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <QuoteIcon className="size-5 text-binti-pink/60" aria-hidden="true" />
                  <p className="mt-2 text-[14px] leading-relaxed text-binti-ink">
                    “{s.quote}”
                  </p>
                  <p className="mt-3 font-display text-[11.5px] font-extrabold uppercase tracking-widest text-binti dark:text-indigo-300">
                    {s.session}
                  </p>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
        <SectionReveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-center text-[12px] leading-relaxed text-binti-slate/80">
            Consent is renewed every cohort; any storyteller can withdraw her story at any time via the
            Safeguarding Lead - no questions asked (DPA 2019, right to erasure).
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* DONOR FAQ - accordion, donor-grade answers                          */
/* ------------------------------------------------------------------ */
function DonorFaq() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const results = q
    ? FAQS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
    : FAQS;
  return (
    <section aria-label="Donor FAQ" className="bg-binti-card py-14">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <SectionReveal>
          <SectionHeading
            align="center"
            eyebrow="Donor FAQ"
            title={
              <>
                Questions donors <span className="font-hand text-4xl font-bold text-binti-pink">actually ask</span>
              </>
            }
          />
        </SectionReveal>
        {/* Live search - filters as you type (client-side, nothing stored) */}
        <SectionReveal delay={0.05} className="mt-7">
          <div className="relative mx-auto max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-binti-slate/70" aria-hidden="true" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the FAQ - try “referrals” or “tax”"
              aria-label="Search frequently asked questions"
              className="h-12 rounded-full border-binti/25 bg-binti-cream/60 pl-11 pr-4 text-[14px]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-binti-slate transition hover:bg-binti-sand hover:text-binti-ink"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
          {q && (
            <p className="mt-2.5 text-center text-[12.5px] font-semibold text-binti-slate" role="status">
              {results.length === 0
                ? "No answers match - WhatsApp +254 758 919 709 and we'll reply within a day."
                : `${results.length} of ${FAQS.length} questions match “${query.trim()}”`}
            </p>
          )}
        </SectionReveal>
        <SectionReveal delay={0.1} className="mt-6">
          {results.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-3">
              {results.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${FAQS.indexOf(f)}`}
                  className="rounded-2xl border border-binti-sand bg-binti-cream/50 px-5 last:border-b"
                >
                  <AccordionTrigger className="py-4 text-left font-display text-[15px] font-bold text-binti-ink hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[13.5px] leading-relaxed text-binti-slate">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="rounded-2xl border border-dashed border-binti-sand bg-binti-cream/40 p-8 text-center">
              <MessageCircleQuestion className="mx-auto size-8 text-binti/50" aria-hidden="true" />
              <p className="mt-2 font-display text-[14.5px] font-bold text-binti-ink">Ask Sema na Me instead</p>
              <p className="mt-1 text-[13px] text-binti-slate">
                Sema na Me, the WhatsApp chatbot by Shujaaz, answers joining, safety and donation questions, anonymously. WhatsApp only.
              </p>
            </div>
          )}
        </SectionReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* NEWSLETTER - monthly impact digest (DPA 2019 consent mandatory)     */
/* ------------------------------------------------------------------ */
function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [dpa, setDpa] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const subscribe = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      toast({ title: "Check your email", description: "That address doesn't look complete.", variant: "destructive" });
      return;
    }
    if (!dpa) {
      toast({ title: "Consent needed", description: "Please tick the DPA 2019 consent - the law requires it.", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), consentDpa: dpa, source: "home-section" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setDone(true);
      toast({ title: "Karibu aboard! 💌", description: "Monthly impact digest - one email a month, no spam, ever." });
    } catch (e) {
      toast({
        title: "Could not subscribe",
        description: e instanceof Error ? e.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section aria-label="Newsletter signup" className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <SectionReveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-binti via-binti-deep to-binti-pinkdeep px-6 py-10 md:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-binti-pink/30 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-binti-cyan/20 blur-3xl" />
          <div className="relative mx-auto max-w-2xl text-center">
            <Mail className="mx-auto size-10 text-binti-amber" aria-hidden="true" />
            <h2 className="mt-3 font-display text-2xl font-extrabold text-white md:text-3xl">
              One email a month. <span className="font-hand text-3xl font-bold text-binti-amber">Real numbers only.</span>
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-white/80">
              The Binti Digest: cohort outcomes, referral closures and finance lines - aggregated, audited, honest.
            </p>
            {done ? (
              <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2.5 rounded-2xl border border-green-300 bg-green-50 px-5 py-4" role="status">
                <CheckCircle2 className="size-5 shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" />
                <p className="text-[13.5px] font-semibold text-green-800">You're subscribed. First digest arrives on the 1st.</p>
              </div>
            ) : (
              <div className="mx-auto mt-6 max-w-md">
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.org"
                    aria-label="Email address for the Binti Digest"
                    className="h-12 flex-1 rounded-full border-white/20 bg-binti-card/95 pl-5"
                  />
                  <Button
                    onClick={subscribe}
                    disabled={sending}
                    className="h-12 rounded-full bg-binti-amber px-6 font-display text-[14px] font-extrabold text-binti-ink hover:bg-amber-400"
                  >
                    {sending ? "Subscribing…" : (<>Subscribe <Send className="size-4" aria-hidden="true" /></>)}
                  </Button>
                </div>
                <label className="mt-3 flex cursor-pointer items-start justify-center gap-2 text-left text-[12px] leading-relaxed text-white/75">
                  <input type="checkbox" checked={dpa} onChange={(e) => setDpa(e.target.checked)} className="mt-0.5 size-4 accent-binti-amber" />
                  <span>
                    I consent to Binti Rising storing my email for the monthly digest only (Kenya DPA 2019). Unsubscribe
                    anytime with one click.
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* WHAT WE DO - 4 cards using Nairobi photos only                      */
/* ------------------------------------------------------------------ */
function WhatWeDo() {
  return (
    <section aria-label="What we do" className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <SectionHeading
        eyebrow="What We Do"
        title={<>Four pillars, <span className="font-hand text-4xl font-bold text-binti-pink">one sisterhood</span></>}
        sub="Every pillar is peer-led, data-tracked and safeguarded. Photos are our real Nairobi team - never stock."
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WHAT_WE_DO.map((p, i) => {
          const Icon = ICONS[p.icon as keyof typeof ICONS];
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <Card className="binti-lift h-full overflow-hidden rounded-2xl border-binti-sand bg-binti-card pt-0">
                <div className="binti-img-zoom relative h-36 w-full">
                  <NairobiPhoto src={p.photo} alt={`${p.title} - Nairobi team photo`} sizes="(max-width: 640px) 100vw, 320px" />
                  <span className="absolute left-3 top-3 rounded-full bg-binti-card/95 px-2.5 py-1 text-[11px] font-bold text-binti dark:text-indigo-300 shadow-sm">
                    {p.tag}
                  </span>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-binti/10">
                      <Icon className="size-4 text-binti dark:text-indigo-300" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-[15px] font-bold text-binti-ink">{p.title}</h3>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-binti-slate">{p.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* JTW TIMELINE TEASER - 8-step mini stepper                           */
/* ------------------------------------------------------------------ */
function JtwTeaser({ onNavigate }: { onNavigate: (s: SectionId) => void }) {
  return (
    <section aria-label="JTW journey teaser" className="bg-binti-card py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Our Work"
            title="The JTW Journey - 8 steps from silence to strength"
            sub="Journey to Wholeness: field-tested Oct 2025–Mar 2026 by 24 facilitators working in 12 pairs, in Kibera, Mathare & Kawangware. All genders welcome."
          />
          <Button
            onClick={() => onNavigate("work")}
            variant="ghost"
            className="font-bold text-binti dark:text-indigo-300 hover:bg-binti-sand"
          >
            Explore all sessions <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <ol className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8" role="list" aria-label="JTW 8 sessions">
          {JTW.map((s, i) => (
            <li key={s.id}>
              <button
                onClick={() => onNavigate("work")}
                className={cn(
                  "binti-lift group h-full w-full rounded-2xl border p-3 text-left",
                  s.risk === "Very Heavy"
                    ? "border-red-300 bg-red-50"
                    : "border-binti-sand bg-binti-cream"
                )}
                aria-label={`Session ${s.id}: ${s.title}, risk ${s.risk}`}
              >
                <span
                  className={cn(
                    "font-display text-[11px] font-extrabold",
                    s.risk === "Very Heavy" ? "text-binti-danger" : "text-binti-pink"
                  )}
                >
                  {s.id}
                </span>
                <p className="mt-0.5 font-display text-[13.5px] font-bold leading-tight text-binti-ink">{s.title}</p>
                <div className="mt-2">
                  <RiskBadge risk={s.risk} className="!text-[9px] px-1.5 py-0" />
                </div>
              </button>
            </li>
          ))}
        </ol>
        <DataNote className="mt-4">
          Facilitator pairs co-lead every session · referral lists memorised before S4 · sessions follow the JTW Guide.
        </DataNote>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PARTNERS MARQUEE                                                    */
/* ------------------------------------------------------------------ */
function PartnersMarquee() {
  const items = [...PARTNERS, ...PARTNERS];
  return (
    <section aria-label="Partners" className="border-y border-binti-sand bg-binti-cream py-8">
      <p className="text-center font-display text-[12px] font-bold uppercase tracking-[0.22em] text-binti-slate">
        Trusted by · Donor & Community Partners
      </p>
      <div className="relative mt-5 overflow-hidden" aria-hidden="false">
        <div className="binti-marquee-track flex w-max items-center gap-10 px-4">
          {items.map((p, i) => (
            <span
              key={`${p}-${i}`}
              aria-hidden={i >= PARTNERS.length}
              className="whitespace-nowrap font-display text-lg font-bold text-binti-slate/50"
            >
              {p}
            </span>
          ))}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-binti-cream to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-binti-cream to-transparent" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* QUOTE - Caveat handwritten (Remember the stone…)                    */
/* ------------------------------------------------------------------ */
function Quote() {
  return (
    <section aria-label="Quote from a graduate" className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6">
      <p className="font-hand text-4xl leading-tight text-binti-ink md:text-[44px]">
        “{HERO_QUOTE.text}”
      </p>
      <p className="mt-4 font-display text-sm font-bold text-binti dark:text-indigo-300">
        {HERO_QUOTE.author} · {HERO_QUOTE.detail}
      </p>
      <p className="mt-1 text-[12px] text-binti-slate/70">Name masked per Kenya DPA 2019</p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ALUMNI WALL - masked initials grid (DPA 2019) - "she rose, and stays" */
/* ------------------------------------------------------------------ */
const WALL_TONES: Record<AlumniTile["tone"], { ring: string; chip: string; grad: string }> = {
  indigo: { ring: "hover:border-binti/60", chip: "bg-binti/10 text-binti dark:text-indigo-300", grad: "from-binti/25 to-binti-pink/20" },
  pink: { ring: "hover:border-binti-pink/60", chip: "bg-binti-pink/10 text-binti-pinkdeep dark:text-pink-300", grad: "from-binti-pink/25 to-binti-amber/20" },
  cyan: { ring: "hover:border-binti-cyan/60", chip: "bg-binti-cyan/10 text-binti-cyan", grad: "from-binti-cyan/25 to-binti/15" },
  amber: { ring: "hover:border-binti-amber/60", chip: "bg-binti-amber/15 text-amber-600 dark:text-amber-300", grad: "from-binti-amber/25 to-binti-pink/15" },
};

function AlumniWall({ onNavigate }: { onNavigate: (s: SectionId) => void }) {
  return (
    <section aria-label="Alumni wall" className="relative overflow-hidden bg-binti-cream py-14 md:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-binti/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-16 size-72 rounded-full bg-binti-pink/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <SectionReveal>
          <SectionHeading
            align="center"
            eyebrow="Alumni Wall · 4,500+ strong"
            title={
              <>
                She rose. <span className="font-hand text-4xl font-bold text-binti-cyan">She's still rising.</span>
              </>
            }
            sub="A wall of first names only - every alum chose to be shown here, initials and all. No faces, no contacts, ever (Kenya DPA 2019)."
          />
        </SectionReveal>

        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {ALUMNI_WALL.map((a, i) => {
            const tone = WALL_TONES[a.tone];
            return (
              <motion.div
                key={a.initials + a.cohort}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.32, delay: Math.min(i * 0.045, 0.35), ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "binti-lift group rounded-2xl border border-binti-sand bg-binti-card p-4 text-center shadow-sm",
                  tone.ring
                )}
              >
                {/* initials medallion */}
                <div className="relative mx-auto flex size-14 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className={cn("absolute inset-0 rounded-full bg-gradient-to-br", tone.grad)}
                  />
                  <span className="relative font-hand text-2xl font-bold text-binti-ink">{a.initials}</span>
                </div>
                <p className="mt-2.5 font-display text-[13px] font-extrabold tracking-tight text-binti-ink">
                  {a.initials.replace(".", "")} - {a.area}
                </p>
                <p className="mt-1 line-clamp-2 min-h-[2.4em] text-[12px] leading-snug text-binti-slate">{a.now}</p>
                <span
                  className={cn(
                    "mt-2.5 inline-block rounded-full px-2.5 py-0.5 text-[10.5px] font-extrabold tracking-wide",
                    tone.chip
                  )}
                >
                  CLASS OF {a.cohort}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Footer row: note + CTA */}
        <SectionReveal delay={0.1} className="mt-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-binti-sand bg-binti-card p-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-[12.5px] leading-relaxed text-binti-slate">
              <strong className="text-binti-ink">Showing 12 of 4,500+</strong> - the rest chose to stay off the wall.
              Both choices are equally respected. Initials published only with written, revocable consent.
            </p>
            <Button
              onClick={() => onNavigate("involved")}
              className="h-11 shrink-0 rounded-full bg-binti px-6 font-bold text-white shadow-lg shadow-binti/25 hover:bg-binti-deep"
            >
              Join the next cohort <ArrowRight className="size-4.5" aria-hidden="true" />
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function HomeSection({ onNavigate }: { onNavigate: (s: SectionId) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <TrustedBy />
      <ImpactStrip />
      <WhatWeDo />
      <JtwTeaser onNavigate={onNavigate} />
      <OurStoryTimeline />
      <StoriesOfRise />
      <CircleGallery />
      <AlumniWall onNavigate={onNavigate} />
      <PartnersMarquee />
      <Quote />
      <DonorFaq />
      <NewsletterSignup />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* OUR STORY - milestone timeline 2023 → 2026 (aggregate facts only)   */
/* Gradient spine + scroll-reveal nodes; alternating cards on desktop. */
/* ------------------------------------------------------------------ */
const MILESTONE_TONES: Record<string, { dot: string; chip: string }> = {
  indigo: { dot: "bg-binti", chip: "bg-binti/10 text-binti dark:text-indigo-300" },
  pink: { dot: "bg-binti-pink", chip: "bg-binti-pink/10 text-binti-pinkdeep dark:text-pink-300" },
  cyan: { dot: "bg-binti-cyan", chip: "bg-binti-cyan/10 text-binti-cyan" },
  amber: { dot: "bg-binti-amber", chip: "bg-binti-amber/10 text-amber-600 dark:text-amber-300" },
};

function OurStoryTimeline() {
  return (
    <section aria-label="Our story 2023 to 2026" className="relative overflow-hidden bg-binti-cream py-14 md:py-20">
      {/* soft glow decorations */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-binti-pink/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 size-72 rounded-full bg-binti-cyan/10 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <SectionReveal>
          <SectionHeading
            align="center"
            eyebrow="Our Story · 2023 → 2026"
            title={
              <>
                Three years ago, fifty girls sat in a circle.{" "}
                <span className="font-hand text-4xl font-bold text-binti-pink">They never stopped rising.</span>
              </>
            }
            sub="From one room in Laini Saba to a live, audited movement - told in four milestones."
          />
        </SectionReveal>

        <ol className="relative mt-12 space-y-10 md:space-y-0" role="list">
          {/* spine */}
          <span
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-1 rounded-full bg-gradient-to-b from-binti via-binti-pink to-binti-amber md:left-1/2 md:-translate-x-1/2"
          />
          {MILESTONES.map((m, i) => {
            const tone = MILESTONE_TONES[m.tone] ?? MILESTONE_TONES.indigo;
            const leftSide = i % 2 === 0;
            return (
              <li key={m.year} className="relative md:grid md:grid-cols-2 md:gap-12 md:py-6">
                {/* node */}
                <span
                  aria-hidden="true"
                  className="absolute left-[19px] top-1.5 z-10 flex size-5 -translate-x-1/2 items-center justify-center md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                >
                  <span className={cn("absolute inline-flex size-5 rounded-full opacity-25", tone.dot, "animate-ping")} />
                  <span className={cn("relative inline-flex size-3.5 rounded-full ring-4 ring-binti-cream", tone.dot)} />
                </span>
                <SectionReveal delay={i * 0.06} className={cn("pl-12 md:pl-0", leftSide ? "md:col-start-1 md:pr-4 md:text-right" : "md:col-start-2 md:pl-4")}>
                  <div className={cn("binti-card-glow rounded-2xl border border-binti-sand bg-binti-card p-5 shadow-sm md:p-6", leftSide && "md:ml-auto")}>
                    <div className={cn("flex items-center gap-3", leftSide && "md:flex-row-reverse")}>
                      <span className={cn("rounded-full px-3 py-1 font-display text-[13px] font-extrabold", tone.chip)}>{m.year}</span>
                      <h3 className="font-display text-[16px] font-extrabold leading-snug text-binti-ink md:text-[17px]">{m.title}</h3>
                    </div>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-binti-slate">{m.body}</p>
                    <p className={cn("mt-3 font-hand text-xl font-bold text-binti dark:text-indigo-300", leftSide && "md:text-left")}>{m.stat}</p>
                  </div>
                </SectionReveal>
              </li>
            );
          })}
        </ol>

        <SectionReveal className="mt-10 text-center">
          <p className="font-hand text-2xl text-binti dark:text-indigo-300">Karibu - the next milestone is written with our donors.</p>
        </SectionReveal>
      </div>
    </section>
  );
}
