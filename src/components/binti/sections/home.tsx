"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  ChevronDown,
  ArrowRight,
  Eye,
  Sparkles,
  Mail,
  Send,
  CheckCircle2,
  Quote as QuoteIcon,
} from "lucide-react";
import type { SectionId } from "@/lib/binti/data";
import { IMPACT_STRIP, WHAT_WE_DO, JTW, PARTNERS, HERO_QUOTE, STORIES, FAQS, MILESTONES } from "@/lib/binti/data";
import { CountUp, NairobiPhoto, SectionHeading, RiskBadge, BintiMark, DataNote, SectionReveal } from "../ui";
import { cn } from "@/lib/utils";

const ICONS = { Heart, Users, ShieldCheck, BarChart3 } as const;

/* ------------------------------------------------------------------ */
/* HERO — "From Silence, She Rises." 56px + circle photo + S4 overlay  */
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
            Peer-led · Journey to Wholeness · AGYW 15–25
          </Badge>
          <h1 className="font-display text-[40px] font-extrabold leading-[1.05] tracking-tight text-binti-ink sm:text-5xl md:text-[56px]">
            From Silence,{" "}
            <span className="binti-gradient-text">She Rises.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[18px] leading-[28px] text-binti-slate">
            Peer-led 8-session mentorship for 15–25 AGYW on SRH, mental health and healthy
            relationships — in Kibera, Mathare & Kawangware. Co-created by 50 youth, backed by
            live data, audited finances.
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
              alt="Nairobi team — Binti Rising sisterhood circle member, portrait"
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
/* IMPACT STRIP — count-up animated aggregated totals                  */
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
/* STORIES OF RISE — masked testimonials w/ Nairobi photos (DPA 2019)  */
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
            sub="Real journeys from the circles — names masked per Kenya DPA 2019, shared with each storyteller's consent."
          />
        </SectionReveal>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {STORIES.map((s, i) => (
            <SectionReveal key={s.initials} delay={i * 0.08}>
              <Card className="binti-card-glow h-full overflow-hidden rounded-2xl border-binti-sand bg-binti-card pt-0">
                <div className="binti-img-zoom relative h-44">
                  <NairobiPhoto src={s.photo} alt={`Binti Rising circle session photo — ${s.area}`} sizes="(max-width: 768px) 100vw, 380px" />
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
            Safeguarding Lead — no questions asked (DPA 2019, right to erasure).
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* DONOR FAQ — accordion, donor-grade answers                          */
/* ------------------------------------------------------------------ */
function DonorFaq() {
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
        <SectionReveal delay={0.1} className="mt-8">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
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
        </SectionReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* NEWSLETTER — monthly impact digest (DPA 2019 consent mandatory)     */
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
      toast({ title: "Consent needed", description: "Please tick the DPA 2019 consent — the law requires it.", variant: "destructive" });
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
      toast({ title: "Karibu aboard! 💌", description: "Monthly impact digest — one email a month, no spam, ever." });
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
              The Binti Digest: cohort outcomes, referral closures and finance lines — aggregated, audited, honest.
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
/* WHAT WE DO — 4 cards using Nairobi photos only                      */
/* ------------------------------------------------------------------ */
function WhatWeDo() {
  return (
    <section aria-label="What we do" className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <SectionHeading
        eyebrow="What We Do"
        title={<>Four pillars, <span className="font-hand text-4xl font-bold text-binti-pink">one sisterhood</span></>}
        sub="Every pillar is peer-led, data-tracked and safeguarded. Photos are our real Nairobi team — never stock."
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
                  <NairobiPhoto src={p.photo} alt={`${p.title} — Nairobi team photo`} sizes="(max-width: 640px) 100vw, 320px" />
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
/* JTW TIMELINE TEASER — 8-step mini stepper                           */
/* ------------------------------------------------------------------ */
function JtwTeaser({ onNavigate }: { onNavigate: (s: SectionId) => void }) {
  return (
    <section aria-label="JTW journey teaser" className="bg-binti-card py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Our Work"
            title="The JTW Journey — 8 steps from silence to strength"
            sub="Journey to Wholeness: field-tested Oct 2025–Mar 2026 by 36 facilitators in Kibera, Mathare & Kawangware."
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
          Facilitator-to-youth ratio 1:35 · referral lists memorised before S4 · sessions follow the JTW Guide.
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
/* QUOTE — Caveat handwritten (Remember the stone…)                    */
/* ------------------------------------------------------------------ */
function Quote() {
  return (
    <section aria-label="Quote from a graduate" className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6">
      <p className="font-hand text-4xl leading-tight text-binti-ink md:text-[44px]">
        “{HERO_QUOTE.text}”
      </p>
      <p className="mt-4 font-display text-sm font-bold text-binti dark:text-indigo-300">
        — {HERO_QUOTE.author} · {HERO_QUOTE.detail}
      </p>
      <p className="mt-1 text-[12px] text-binti-slate/70">Name masked per Kenya DPA 2019</p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* BRAND BOOK — Phase 1 & 2 deliverable: 3 mood boards (A+B winner),   */
/* tokens, typography, logo pack — Nairobi photos only                 */
/* ------------------------------------------------------------------ */
function BrandBook() {
  const [open, setOpen] = useState(false);
  const moods = [
    {
      id: "MOOD A",
      name: "Terracotta Sisterhood",
      desc: "Feminine, powerful, sisterhood circles. Warm terracotta + cream + deep purple.",
      swatches: ["#C2571B", "#FFFBEB", "#6D28D9", "#FEF3C7"],
      photo: "/nairobi-team/nairobi-03.webp",
      winner: false,
    },
    {
      id: "MOOD B",
      name: "Shujaaz Youth Vibrant",
      desc: "Inspo: Shujaaz Kenya, MTV Shuga. Youth first, unapologetic.",
      swatches: ["#EC4899", "#F59E0B", "#06B6D4", "#0F172A"],
      photo: "/nairobi-team/nairobi-11.webp",
      winner: false,
    },
    {
      id: "WINNER · A+B",
      name: "Vibrant Youth + Donor Trust",
      desc: "Merge A + B = Youth vibrant + institutional trust. Inspo: PATH.org, LVCT Health. Data-driven, fundable at first glance.",
      swatches: ["#4F46E5", "#EC4899", "#06B6D4", "#FFFBEB"],
      photo: "/nairobi-team/nairobi-06.webp",
      winner: true,
    },
  ];

  return (
    <section aria-label="Brand book" className="bg-binti-card py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Collapsible open={open} onOpenChange={setOpen}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionHeading
              eyebrow="Design System · Phase 1–2"
              title="Brand Book — Nairobi Edition"
              sub="Three directions tested with 36 facilitators in Kibera. Winner: vibrant youth + donor trust. All imagery: Nairobi team only."
            />
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="rounded-full border-binti/40 font-bold text-binti dark:text-indigo-300">
                {open ? "Hide" : "Show"} mood boards & UI kit
                <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="mt-8 space-y-8">
            {/* Mood boards */}
            <div className="grid gap-5 md:grid-cols-3">
              {moods.map((m) => (
                <Card
                  key={m.id}
                  className={cn(
                    "binti-lift overflow-hidden rounded-2xl pt-0",
                    m.winner ? "border-2 border-binti shadow-lg shadow-binti/15" : "border-binti-sand"
                  )}
                >
                  <div className="relative h-40">
                    <NairobiPhoto src={m.photo} alt={`${m.name} mood board — Nairobi team photo`} sizes="(max-width: 768px) 100vw, 380px" />
                    {m.winner && (
                      <span className="absolute left-3 top-3 rounded-full bg-binti px-3 py-1 text-[11px] font-extrabold text-white shadow">
                        WINNER · FINAL STYLE
                      </span>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <p className="font-display text-[11px] font-extrabold tracking-widest text-binti-pink">{m.id}</p>
                    <h3 className="mt-1 font-display text-[15px] font-bold text-binti-ink">{m.name}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-binti-slate">{m.desc}</p>
                    <div className="mt-3 flex gap-2">
                      {m.swatches.map((c) => (
                        <span
                          key={c}
                          className="size-7 rounded-full border border-black/10 shadow-sm"
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>
                    {/* circle crop + duotone demo */}
                    <div className="mt-4 flex items-center gap-3">
                      <div className="relative size-14 overflow-hidden rounded-full">
                        <NairobiPhoto src={m.photo} alt="" sizes="56px" />
                      </div>
                      <p className="text-[11px] leading-tight text-binti-slate/80">
                        Nairobi photo · circle crop + duotone treatment
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tokens + typography + logo pack */}
            <div className="grid gap-5 lg:grid-cols-3">
              <Card className="rounded-2xl border-binti-sand p-5">
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-binti dark:text-indigo-300">Colour Tokens</h3>
                <ul className="mt-3 space-y-2 text-[12.5px]" role="list">
                  {[
                    ["--color-binti", "#4F46E5", "Primary Indigo"],
                    ["--color-binti-pink", "#EC4899", "Pink Binti"],
                    ["--color-binti-cyan", "#06B6D4", "Accent"],
                    ["--color-binti-cream", "#FFFBEB", "BG Warm"],
                    ["--color-binti-ink", "#0F172A", "Text"],
                  ].map(([token, hex, label]) => (
                    <li key={token} className="flex items-center gap-2.5">
                      <span className="size-6 rounded-md border border-black/10" style={{ backgroundColor: hex }} />
                      <code className="text-[11px] text-binti-slate">{token}</code>
                      <span className="ml-auto font-mono text-[11px] text-binti-slate/70">{hex}</span>
                      <span className="hidden text-[11px] text-binti-slate sm:inline">{label}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[11px] leading-relaxed text-binti-slate/70">
                  WCAG AA contrast checked. Danger red used only for GBV / Very Heavy sessions.
                </p>
              </Card>

              <Card className="rounded-2xl border-binti-sand p-5">
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-binti dark:text-indigo-300">Typography</h3>
                <p className="mt-3 font-display text-3xl font-extrabold text-binti-ink">Sora Bold — 56px Hero</p>
                <p className="mt-2 text-[15px] leading-relaxed text-binti-slate">
                  Inter 18px/28px body — UI text at 16px+, 44px touch targets.
                </p>
                <p className="mt-2 font-hand text-4xl text-binti-pink">Caveat 40px — “Remember the stone…”</p>
                <p className="mt-1 text-[11px] text-binti-slate/70">Caveat for soul · Sora for strength · Inter for clarity</p>
              </Card>

              <Card className="rounded-2xl border-binti-sand p-5">
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-binti dark:text-indigo-300">Logo Pack</h3>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl bg-binti-cream p-3">
                    <BintiMark size={26} />
                    <span className="font-hand text-2xl font-bold text-binti-pink">Binti</span>
                    <span className="font-display text-lg font-extrabold tracking-widest text-binti dark:text-indigo-300">RISING</span>
                    <span className="ml-auto text-[10px] text-binti-slate">Full color</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-[#0F172A] p-3">
                    <BintiMark light size={26} />
                    <span className="font-hand text-2xl font-bold text-white">Binti</span>
                    <span className="font-display text-lg font-extrabold tracking-widest text-white">RISING</span>
                    <span className="ml-auto text-[10px] text-white/60">White</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-binti-sand p-3">
                    <BintiMark size={26} />
                    <span className="font-hand text-2xl font-bold text-black">Binti</span>
                    <span className="font-display text-lg font-extrabold tracking-widest text-black">RISING</span>
                    <span className="ml-auto text-[10px] text-binti-slate">Black</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-binti-sand p-3">
                    <img src="/favicon.png" alt="Binti Rising favicon" className="size-8 rounded-full" />
                    <span className="text-[11px] text-binti-slate">Favicon 32 · App icon 1024</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-binti-sand p-3">
                    <img src="/og.png" alt="Binti Rising OG image 1200 by 630" className="h-10 w-[76px] rounded object-cover" />
                    <span className="text-[11px] text-binti-slate">OG image 1200×630</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* UI kit states strip (Phase 2) */}
            <Card className="rounded-2xl border-binti-sand p-5">
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-binti dark:text-indigo-300">UI Kit — Components with ALL states</h3>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button className="rounded-full bg-binti">Primary · Default</Button>
                <Button className="rounded-full bg-binti hover:scale-[1.02] hover:shadow-lg">Hover 1.02 + lift</Button>
                <Button disabled className="rounded-full bg-binti opacity-50">Disabled 50%</Button>
                <Button className="rounded-full bg-mpesa hover:bg-green-600">
                  <HeartHandshakePlaceholder /> Donate · M-Pesa green
                </Button>
                <Button variant="outline" className="rounded-full border-binti/50 text-binti dark:text-indigo-300">Secondary</Button>
              </div>
              <div className="mt-4 grid gap-3 text-[12px] text-binti-slate sm:grid-cols-3">
                <p className="rounded-lg bg-binti-cream p-3"><strong className="text-binti-ink">Inputs:</strong> Default · Focus (ring indigo) · Error “Age must be 15–25” · Success · Disabled · DPA consent checkbox</p>
                <p className="rounded-lg bg-binti-cream p-3"><strong className="text-binti-ink">Cards:</strong> Program · KPI · Facilitator (Nairobi photos only) · Skeleton · Empty “No youth yet”</p>
                <p className="rounded-lg bg-binti-cream p-3"><strong className="text-binti-ink">Feedback:</strong> Toasts · Modals Join/Donate/Safety · Charts loading / empty / error · JTW stepper S1–S8</p>
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
}

function HeartHandshakePlaceholder() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="m12 13-1-1 2-2-3-3 2-2" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
export function HomeSection({ onNavigate }: { onNavigate: (s: SectionId) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <ImpactStrip />
      <WhatWeDo />
      <JtwTeaser onNavigate={onNavigate} />
      <OurStoryTimeline />
      <StoriesOfRise />
      <PartnersMarquee />
      <Quote />
      <DonorFaq />
      <NewsletterSignup />
      <BrandBook />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* OUR STORY — milestone timeline 2023 → 2026 (aggregate facts only)   */
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
            sub="From one room in Laini Saba to a live, audited movement — told in four milestones."
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
          <p className="font-hand text-2xl text-binti dark:text-indigo-300">Karibu — the next milestone is written with our donors.</p>
        </SectionReveal>
      </div>
    </section>
  );
}
