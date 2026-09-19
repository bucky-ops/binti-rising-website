"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  BookOpen,
  Home as HomeIcon,
  Compass,
  MessageCircle,
  Timer,
} from "lucide-react";
import type { SectionId } from "@/lib/binti/data";
import { JTW, ORG } from "@/lib/binti/data";
import { NairobiPhoto, RiskBadge, SectionHeading, DataNote } from "./../ui";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* OUR WORK / JTW — 8-Step Stepper (S1–S8) with session detail         */
/* Facilitator flow entry: Our Work → S4 → Dashboard → Report          */
/* ------------------------------------------------------------------ */
export function WorkSection({ onNavigate }: { onNavigate: (s: SectionId) => void }) {
  const [current, setCurrent] = useState(3); // default S4 (index 3) — the pivotal session
  const s = JTW[current];
  const isVeryHeavy = s.risk === "Very Heavy";
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(JTW.length - 1, c + 1));

  // Keep the active step visible inside the horizontal rail (no vertical jump)
  useEffect(() => {
    stepRefs.current[current]?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [current]);

  // Keyboard: ← → move sessions, Home/End jump — roving focus follows selection
  const onRailKeyDown = (e: React.KeyboardEvent) => {
    const jump = (n: number) => {
      setCurrent(n);
      stepRefs.current[n]?.focus();
    };
    if (e.key === "ArrowRight") {
      e.preventDefault();
      jump(Math.min(current + 1, JTW.length - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      jump(Math.max(current - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      jump(0);
    } else if (e.key === "End") {
      e.preventDefault();
      jump(JTW.length - 1);
    }
  };

  return (
    <section aria-label="Our Work — Journey to Wholeness" className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <SectionHeading
        eyebrow="Our Work / JTW · Journey to Wholeness"
        title={
          <>
            8 sessions. One circle.{" "}
            <span className="font-hand text-4xl font-bold text-binti-pink">Haki Yetu!</span>
          </>
        }
        sub="Peer-led 8-session mentorship for 15–25 AGYW in Kibera, Mathare & Kawangware. Field-tested Oct 2025–Mar 2026 by 36 Surround Sound facilitators. Every activity below is illustrated with our real Nairobi team."
      />

      {/* Journey progress — Session N of 8 + gradient track + kbd hint */}
      <div className="mt-8 flex items-center gap-3">
        <span className="whitespace-nowrap font-display text-[11.5px] font-extrabold uppercase tracking-widest text-binti dark:text-indigo-300">
          Session {current + 1} / {JTW.length}
        </span>
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-binti-sand"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={JTW.length}
          aria-valuenow={current + 1}
          aria-label={`JTW journey progress: session ${current + 1} of ${JTW.length}`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-binti via-binti-pink to-binti-amber transition-[width] duration-500 ease-out"
            style={{ width: `${((current + 1) / JTW.length) * 100}%` }}
          />
        </div>
        <span className="hidden items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold text-binti-slate sm:flex">
          <kbd className="binti-kbd">←</kbd>
          <kbd className="binti-kbd">→</kbd> keys to move
        </span>
      </div>

      {/* Stepper rail */}
      <ol
        className="binti-scroll mt-4 flex snap-x gap-2 overflow-x-auto pb-3"
        role="list"
        aria-label="JTW 8-step stepper"
        onKeyDown={onRailKeyDown}
      >
        {JTW.map((item, i) => {
          const active = i === current;
          const done = i < current;
          return (
            <li key={item.id} className="snap-start">
              <button
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                onClick={() => setCurrent(i)}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex w-[122px] flex-col items-start gap-1.5 rounded-2xl border-2 p-3 text-left transition-all",
                  active
                    ? item.risk === "Very Heavy"
                      ? "border-binti-danger bg-red-50 binti-pulse"
                      : "border-binti bg-binti-card shadow-md"
                    : done
                      ? "border-binti/30 bg-binti/5"
                      : "border-binti-sand bg-binti-card/60 hover:border-binti/40"
                )}
              >
                <span className="flex w-full items-center justify-between">
                  <span className={cn("font-display text-[12px] font-extrabold", active && item.risk === "Very Heavy" ? "text-binti-danger" : active ? "text-binti dark:text-indigo-300" : "text-binti-pink")}>
                    {item.id}
                  </span>
                  {done && <span className="text-[10px] font-bold text-green-600 dark:text-green-400">✓ done</span>}
                </span>
                <span className="font-display text-[13px] font-bold leading-tight text-binti-ink">{item.title}</span>
                <RiskBadge risk={item.risk} className="!px-1.5 !py-0 !text-[9px]" />
              </button>
            </li>
          );
        })}
      </ol>

      {/* Session detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={s.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <Card className={cn("overflow-hidden rounded-3xl pt-0", isVeryHeavy ? "border-2 border-red-300" : "border-binti-sand")}>
            <div className="grid lg:grid-cols-[420px_1fr]">
              {/* Photo side */}
              <div className="relative min-h-[260px] lg:min-h-[420px]">
                <NairobiPhoto
                  src={s.photo}
                  alt={`${s.id} ${s.title} — Nairobi team activity photo`}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority={s.id === "S4"}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-14">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-binti-card/95 px-3 py-1 font-display text-[12px] font-extrabold text-binti dark:text-indigo-300">
                      {s.id}
                    </span>
                    <RiskBadge risk={s.risk} />
                    <span className="inline-flex items-center gap-1 rounded-full bg-binti-card/95 px-2.5 py-1 text-[11px] font-bold text-binti-slate">
                      <Clock className="size-3" aria-hidden="true" /> {s.duration} min
                    </span>
                  </div>
                  <p className="mt-2 font-display text-2xl font-extrabold text-white">{s.title}</p>
                </div>
              </div>

              {/* Content side */}
              <CardContent className="p-6 md:p-7">
                {isVeryHeavy && (
                  <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 p-3.5" role="alert">
                    <span className="mt-0.5 size-2.5 shrink-0 animate-pulse rounded-full bg-binti-danger" aria-hidden="true" />
                    <p className="text-[12.5px] leading-relaxed text-red-700">
                      <strong>VERY HEAVY · Safeguarding on standby.</strong> Safeguarding focal point present, referral
                      lists memorised by every facilitator, mandatory team debrief after session. Danger red is used
                      only for GBV / Very Heavy steps.
                    </p>
                  </div>
                )}

                <p className="font-display text-[13px] font-bold uppercase tracking-widest text-binti-pink">Focus</p>
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-binti-ink">{s.focus}</p>

                <Separator className="my-5 bg-binti-sand" />

                <p className="font-display text-[13px] font-bold uppercase tracking-widest text-binti-pink">Activities</p>
                <ul className="mt-2 space-y-2" role="list">
                  {s.activities.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-binti-slate">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-binti-amber" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>

                {s.shujaaz && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border-2 border-dashed border-binti-amber/60 bg-binti-sand/40 p-3">
                    <span aria-hidden="true" className="text-lg">💥</span>
                    <p className="text-[12.5px] font-semibold text-binti-ink">
                      Comic panel · hand-drawn border · bold ink — {s.shujaaz}
                      <span className="ml-1 text-[10px] font-normal text-binti-slate">(watermark 10% opacity)</span>
                    </p>
                  </div>
                )}

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-binti-cream p-3.5">
                    <p className="flex items-center gap-1.5 font-display text-[12px] font-bold uppercase tracking-wider text-binti dark:text-indigo-300">
                      <HomeIcon className="size-3.5" aria-hidden="true" /> Homework
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-binti-slate">{s.homework}</p>
                  </div>
                  <div className="rounded-xl bg-binti-cream p-3.5">
                    <p className="flex items-center gap-1.5 font-display text-[12px] font-bold uppercase tracking-wider text-binti dark:text-indigo-300">
                      <BookOpen className="size-3.5" aria-hidden="true" /> Materials
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-binti-slate">{s.materials}</p>
                  </div>
                </div>

                {/* Navigation + facilitator flow */}
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <Button onClick={prev} disabled={current === 0} variant="outline" className="rounded-full border-binti/40 font-bold text-binti dark:text-indigo-300">
                    <ArrowLeft className="size-4" aria-hidden="true" /> {current > 0 ? JTW[current - 1].id : "Start"}
                  </Button>
                  <Button
                    onClick={next}
                    disabled={current === JTW.length - 1}
                    className="rounded-full bg-binti font-bold hover:bg-binti-deep"
                  >
                    {current < JTW.length - 1 ? JTW[current + 1].id : "End"} <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                  {s.id === "S4" && (
                    <Button
                      onClick={() => onNavigate("dashboard")}
                      className="rounded-full bg-binti-pink font-bold hover:bg-binti-pinkdeep hover:scale-[1.02]"
                      aria-label="Facilitator flow: open the Live Dashboard and file the S4 report"
                    >
                      <BarChartIcon /> Dashboard → Report
                    </Button>
                  )}
                  {s.id === "S8" && (
                    <Button
                      onClick={() => onNavigate("involved")}
                      className="rounded-full bg-mpesa font-bold text-white hover:bg-green-600"
                    >
                      <MessageCircle className="size-4" aria-hidden="true" /> Join — Sema na Me
                    </Button>
                  )}
                </div>

                <DataNote className="mt-4">
                  Session content follows the JTW Guide logic. LVCT Health referral, Nairobi County health, Shujaaz Inc
                  content. USAID compliance checklist included. Safety concern? WhatsApp {ORG.whatsapp} · Shortcode {ORG.shortcode} ·
                  Hotline {ORG.hotline}.
                </DataNote>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Web of Support explainer (S4 signature activity) */}
      <Card className="mt-8 rounded-3xl border-binti-sand bg-gradient-to-br from-binti-card to-binti-cream p-6 md:p-8">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 font-display text-[12px] font-bold uppercase tracking-widest text-binti-pink">
              <Compass className="size-4" aria-hidden="true" /> Signature activity · S4
            </p>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-binti-ink">The Web of Support</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-binti-slate">
              Every girl draws <strong>3 circles — Self, Trusted, Services</strong> — and memorises her own referral
              list. When silence breaks, she already knows who to call: her trusted person, LVCT Health, Nairobi
              County facilities, or the GBV hotline <strong className="text-red-600 dark:text-red-400">1195</strong>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="border-binti/40 text-binti dark:text-indigo-300">Self</Badge>
              <Badge variant="outline" className="border-binti-pink/40 text-binti-pinkdeep dark:text-pink-300">Trusted</Badge>
              <Badge variant="outline" className="border-binti-cyan/50 text-binti-cyan">Services</Badge>
              <Badge className="bg-[#0F172A]">Referral lists memorised</Badge>
            </div>
          </div>
          <div className="relative mx-auto size-56 md:size-64">
            <span aria-hidden="true" className="absolute inset-0 rounded-full border-4 border-dashed border-binti-cyan/50" />
            <span aria-hidden="true" className="absolute inset-8 rounded-full border-4 border-dashed border-binti-pink/60" />
            <span aria-hidden="true" className="absolute inset-16 rounded-full border-4 border-dashed border-binti/60" />
            <span className="absolute inset-16 flex items-center justify-center rounded-full bg-binti font-display text-sm font-extrabold text-white">Self</span>
            <span className="absolute inset-8 flex items-start justify-center pt-2 text-[11px] font-bold text-binti-pinkdeep dark:text-pink-300">Trusted</span>
            <span className="absolute inset-0 flex items-start justify-center pt-1.5 text-[11px] font-bold text-binti-cyan">Services</span>
          </div>
        </div>
      </Card>
    </section>
  );
}

function BarChartIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 3v18h18" />
      <rect x="7" y="12" width="3" height="6" />
      <rect x="12" y="8" width="3" height="10" />
      <rect x="17" y="4" width="3" height="14" />
    </svg>
  );
}
