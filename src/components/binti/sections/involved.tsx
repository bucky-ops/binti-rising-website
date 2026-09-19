"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Smartphone,
  Landmark,
  CheckCircle2,
  MessageCircle,
  Handshake,
  FileDown,
  UserRound,
  HeartHandshake,
  Info,
  Repeat,
  CalendarClock,
  ReceiptText,
  Loader2,
} from "lucide-react";
import { SectionHeading, DataNote, NairobiPhoto } from "./../ui";
import { AREA_OPTIONS, DONATE_TIERS, DONATE_IMPACT, CALC_UNIT_COSTS, CURRENCIES, toKes, fromKes, ORG, FACILITATORS } from "@/lib/binti/data";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* IMPACT CALCULATOR — "what does my gift do?" (donor conversion tool) */
/* Unit costs from the FY24/25 aggregate: KES 500 materials · 2,500    */
/* session for 12 · 10,000 full journey. Aggregates only, no PII.      */
/* ------------------------------------------------------------------ */
function ImpactCalculator({ onDonate }: { onDonate: () => void }) {
  const [curCode, setCurCode] = useState<(typeof CURRENCIES)[number]["code"]>("KES");
  const cur = CURRENCIES.find((c) => c.code === curCode) ?? CURRENCIES[0];
  const [amount, setAmount] = useState(10000); // in selected currency

  const kesAmount = toKes(amount, cur.rate);
  const journeys = Math.floor(kesAmount / CALC_UNIT_COSTS.journey);
  const sessions = Math.floor(kesAmount / CALC_UNIT_COSTS.session);
  const materials = Math.floor(kesAmount / CALC_UNIT_COSTS.materials);

  const sliderMin = fromKes(500, cur.rate);
  const sliderMax = fromKes(100000, cur.rate);
  const presets = [2500, 10000, 25000, 50000].map((k) => fromKes(k, cur.rate));
  const fmt = (n: number) => `${cur.symbol}${n.toLocaleString()}`;

  return (
    <Card className="rounded-3xl border-binti-sand bg-gradient-to-br from-binti-card to-binti-cream p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-xl font-extrabold text-binti-ink">Impact Calculator</h3>
        <Badge className="rounded-full bg-binti-cream text-[11px] font-bold text-binti dark:text-indigo-300">FY24/25 aggregate unit costs</Badge>
      </div>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-binti-slate">
        Drag to see exactly what your gift delivers — same maths the auditors use.
      </p>

      {/* Currency selector — international donors give in their own money */}
      <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="Donation currency">
        {CURRENCIES.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => {
              const prevKes = toKes(amount, cur.rate);
              setCurCode(c.code);
              setAmount(fromKes(prevKes, c.rate));
            }}
            aria-pressed={curCode === c.code}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-display text-[12px] font-extrabold transition",
              curCode === c.code
                ? "border-binti bg-binti text-white shadow-sm"
                : "border-binti/30 bg-binti-card text-binti-slate hover:border-binti hover:text-binti"
            )}
          >
            {c.code}
          </button>
        ))}
        <span className="text-[11px] text-binti-slate/70">indicative rates · monthly</span>
      </div>

      {/* Amount readout */}
      <div className="mt-6 text-center">
        <p className="font-display text-5xl font-extrabold binti-gradient-text tabular-nums">
          {fmt(amount)}
          {curCode !== "KES" && <span className="ml-1.5 align-middle text-lg text-binti-slate">{curCode}</span>}
        </p>
        <p className="mt-1 text-[12px] font-semibold uppercase tracking-widest text-binti-slate">
          ≈ {journeys} {journeys === 1 ? "girl" : "girls"} rising through the full JTW journey
        </p>
        {curCode !== "KES" && (
          <p className="mt-1 text-[12px] font-semibold text-binti-slate/80">
            ≈ KES {kesAmount.toLocaleString()} — charged in KES via M-Pesa
          </p>
        )}
      </div>

      {/* Slider */}
      <div className="mt-5">
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          step={cur.step}
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value, 10))}
          aria-label={`Donation amount in ${curCode}`}
          className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-binti via-binti-pink to-binti-amber accent-binti"
          style={{
            background: `linear-gradient(90deg, #4f46e5 0%, #ec4899 ${Math.min((amount / sliderMax) * 160, 100)}%, #fef3c7 ${Math.min((amount / sliderMax) * 100, 100)}%)`,
          }}
        />
        <div className="mt-1.5 flex justify-between text-[11px] font-semibold text-binti-slate/70">
          <span>{fmt(sliderMin)}</span>
          <span>{fmt(sliderMax)}</span>
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setAmount(p)}
              aria-pressed={amount === p}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[12px] font-bold transition",
                amount === p ? "border-binti bg-binti text-white" : "border-binti/30 bg-binti-card text-binti dark:text-indigo-300 hover:border-binti"
              )}
            >
              {curCode === "KES" ? p.toLocaleString() : fmt(p)}
            </button>
          ))}
        </div>
      </div>

      {/* Impact chips */}
      <div className="mt-6 grid grid-cols-3 gap-2.5">
        {[
          { value: materials, label: "girls' material packs", color: "bg-binti/10 text-binti dark:text-indigo-300" },
          { value: sessions, label: "circle sessions of 12", color: "bg-binti-pink/10 text-binti-pinkdeep dark:text-pink-300" },
          { value: journeys, label: "full 8-session journeys", color: "bg-mpesa/10 text-green-700 dark:text-green-300" },
        ].map((c) => (
          <div key={c.label} className={cn("rounded-2xl p-3.5 text-center", c.color)}>
            <p className="font-display text-2xl font-extrabold tabular-nums">{c.value}</p>
            <p className="mt-0.5 text-[11px] font-semibold leading-tight">{c.label}</p>
          </div>
        ))}
      </div>

      <Button onClick={onDonate} className="mt-6 h-12 w-full rounded-full bg-mpesa font-display text-[15px] font-extrabold text-white hover:bg-green-600">
        <HeartHandshake className="size-5" aria-hidden="true" /> Fund {journeys > 0 ? `${journeys} ${journeys === 1 ? "girl" : "girls"}` : "this impact"} — Give via M-Pesa
      </Button>
      <DataNote className="mt-3">
        Unit costs from the audited FY24/25 aggregate: KES 500 materials · KES 2,500 session · KES 10,000 journey.
        {curCode !== "KES" && ` ${curCode} converted at ${cur.rate} KES (indicative)`}. Receipt auto · no cash.
      </DataNote>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* JOIN CIRCLE — name initial only + age 15-25 + area + DPA consent    */
/* Success: Karibu Binti! → WhatsApp Sema na Me                        */
/* ------------------------------------------------------------------ */
function JoinCircle() {
  const [initials, setInitials] = useState("");
  const [age, setAge] = useState("");
  const [area, setArea] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [dpa, setDpa] = useState(false);
  const [guardian, setGuardian] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const ageNum = parseInt(age, 10);
  const needsGuardian = age !== "" && !isNaN(ageNum) && ageNum >= 15 && ageNum < 18;

  const submit = async () => {
    const errs: Record<string, string> = {};
    if (initials.trim().length < 1 || initials.trim().length > 4)
      errs.initials = "Initials only, max 4 characters — privacy first (e.g. F.W.)";
    if (isNaN(ageNum) || ageNum < 15 || ageNum > 25) errs.age = "Age must be 15-25";
    if (!area) errs.area = "Choose your area";
    if (phone && !/^(\+?\d{9,15})$/.test(phone.replace(/\s/g, ""))) errs.phone = "Phone looks incorrect (optional field)";
    if (!dpa) errs.dpa = "Please tick the DPA 2019 consent to continue";
    if (needsGuardian && !guardian) errs.guardian = "Guardian consent is required for ages 15-17";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: initials.trim(),
          age: ageNum,
          area,
          phone: phone.replace(/\s/g, "") || undefined,
          consentDpa: dpa,
          guardianConsent: needsGuardian && guardian,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setDone(true);
      toast({
        title: "Karibu Binti! 💛",
        description: "You are on the circle list. Sema na Me will confirm on WhatsApp.",
      });
    } catch {
      toast({ title: "Could not submit", description: `Try again or WhatsApp ${ORG.whatsapp}.`, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <Card className="mx-auto max-w-xl rounded-3xl border-2 border-green-300 bg-green-50 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-14 text-green-600 dark:text-green-400" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-extrabold text-binti-ink">Success! Karibu Binti!</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-binti-slate">
          Circle starts <strong>Monday 2pm · Laini Saba</strong>. The <strong>Sema na Me</strong> chatbot will confirm
          on WhatsApp <strong>{ORG.whatsapp}</strong> (shortcode {ORG.shortcode}).
        </p>
        <a
          href={ORG.whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-mpesa px-6 text-[15px] font-bold text-white transition hover:bg-green-600"
        >
          <MessageCircle className="size-5" aria-hidden="true" /> Open WhatsApp → Sema na Me
        </a>
        <DataNote className="mt-5 justify-center text-left">
          We stored ONLY your initials, age and area (plus optional phone under DPA 2019 consent). You can request
          deletion anytime at {ORG.email}.
        </DataNote>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-xl rounded-3xl border-binti-sand bg-binti-card p-6 md:p-8">
      <h3 className="flex items-center gap-2 font-display text-xl font-extrabold text-binti-ink">
        <UserRound className="size-5 text-binti dark:text-indigo-300" aria-hidden="true" /> Join Circle
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-binti-slate">
        For youth 15–25. Privacy first: <strong>initials only</strong> — never your full name (Kenya DPA 2019).
      </p>

      <div className="mt-6 space-y-4.5">
        {/* Initials */}
        <div className="space-y-1.5">
          <Label htmlFor="join-initials" className="text-[13px] font-semibold text-binti-ink">
            Your initials <span className="font-normal text-binti-slate">(e.g. F.W.)</span>
          </Label>
          <Input
            id="join-initials"
            value={initials}
            onChange={(e) => setInitials(e.target.value.slice(0, 4))}
            placeholder="F.W."
            aria-invalid={!!errors.initials}
            className={cn("h-11 rounded-xl border-binti/30 bg-binti-card", errors.initials && "border-red-400 focus-visible:ring-red-300")}
          />
          {errors.initials ? (
            <p className="text-[12px] font-semibold text-red-600 dark:text-red-400" role="alert">{errors.initials}</p>
          ) : (
            <p className="text-[11.5px] text-binti-slate/80">Success state: initials masked on every public surface.</p>
          )}
        </div>

        {/* Age + Area */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="join-age" className="text-[13px] font-semibold text-binti-ink">Age</Label>
            <Input
              id="join-age"
              type="number"
              inputMode="numeric"
              min={15}
              max={25}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="15-25"
              aria-invalid={!!errors.age}
              className={cn("h-11 rounded-xl border-binti/30 bg-binti-card", errors.age && "border-red-400 focus-visible:ring-red-300")}
            />
            {errors.age && <p className="text-[12px] font-semibold text-red-600 dark:text-red-400" role="alert">Age must be 15-25</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="join-area" className="text-[13px] font-semibold text-binti-ink">Area</Label>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger id="join-area" aria-invalid={!!errors.area} className={cn("h-11 rounded-xl border-binti/30 bg-binti-card", errors.area && "border-red-400")}>
                <SelectValue placeholder="Choose your area" />
              </SelectTrigger>
              <SelectContent>
                {AREA_OPTIONS.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.area && <p className="text-[12px] font-semibold text-red-600 dark:text-red-400" role="alert">{errors.area}</p>}
          </div>
        </div>

        {/* Phone optional */}
        <div className="space-y-1.5">
          <Label htmlFor="join-phone" className="text-[13px] font-semibold text-binti-ink">
            Phone <span className="font-normal text-binti-slate">(optional)</span>
          </Label>
          <Input
            id="join-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+254 7XX XXX XXX"
            aria-invalid={!!errors.phone}
            className={cn("h-11 rounded-xl border-binti/30 bg-binti-card", errors.phone && "border-red-400 focus-visible:ring-red-300")}
          />
          {errors.phone ? (
            <p className="text-[12px] font-semibold text-red-600 dark:text-red-400" role="alert">{errors.phone}</p>
          ) : (
            <p className="text-[11.5px] text-binti-slate/80">Stored only with consent below · never displayed · DPA 2019</p>
          )}
        </div>

        {/* Guardian consent (15-17) */}
        {needsGuardian && (
          <label
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 bg-binti-sand/40",
              errors.guardian ? "border-red-400" : "border-binti-amber/50"
            )}
          >
            <input type="checkbox" checked={guardian} onChange={(e) => setGuardian(e.target.checked)} className="mt-0.5 size-4.5 accent-binti" />
            <span className="text-[13px] leading-relaxed text-binti-ink">
              <strong>Guardian consent (age 15–17):</strong> my parent/guardian has agreed to my joining the circle,
              as required by Kenya DPA 2019 for children's data.
            </span>
          </label>
        )}

        {/* DPA consent */}
        <label
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5",
            errors.dpa ? "border-red-400 bg-red-50" : "border-binti/30 bg-binti-cream/60"
          )}
        >
          <input type="checkbox" checked={dpa} onChange={(e) => setDpa(e.target.checked)} className="mt-0.5 size-4.5 accent-binti" />
          <span className="text-[13px] leading-relaxed text-binti-ink">
            <strong>DPA 2019 consent:</strong> I agree that Binti Rising may store my initials, age, area (and phone if
            given) to place me in a circle. Data is aggregated for reporting; my name is never published.{" "}
            <a href="/policies/binti-dpa-2019-privacy.pdf" target="_blank" rel="noreferrer" className="font-bold text-binti dark:text-indigo-300 hover:underline">
              Read the policy
            </a>
          </span>
        </label>
        {errors.dpa && <p className="-mt-2 text-[12px] font-semibold text-red-600 dark:text-red-400" role="alert">{errors.dpa}</p>}

        <Button
          onClick={submit}
          disabled={sending}
          className="h-12 w-full rounded-full bg-binti text-[15px] font-bold shadow-lg shadow-binti/25 hover:bg-binti-deep"
        >
          {sending ? "Saving securely…" : "Submit + WhatsApp Sema na Me"}
        </Button>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* DONATE MODAL v2 — M-Pesa Paybill 522522 + KCB, no cash              */
/* NEW: one-time/monthly toggle · custom amount · impact preview ·     */
/*      simulated receipt flow (Daraja STK push in production)         */
/* ------------------------------------------------------------------ */
type DonateStep = "details" | "processing" | "receipt";

export function DonateModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<number>(DONATE_TIERS[1].amount);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [curCode, setCurCode] = useState<(typeof CURRENCIES)[number]["code"]>("KES");
  const cur = CURRENCIES.find((c) => c.code === curCode) ?? CURRENCIES[0];
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<DonateStep>("details");
  const [stepIdx, setStepIdx] = useState(0);
  const [receiptNo, setReceiptNo] = useState("");

  // effAmount is ALWAYS in KES — M-Pesa charges KES regardless of display currency.
  const effAmount =
    customAmount !== "" ? Math.max(0, toKes(Math.max(0, parseInt(customAmount, 10) || 0), cur.rate)) : amount;

  // Impact preview: monthly giving multiplies the yearly story
  const impactText =
    frequency === "monthly"
      ? `${DONATE_IMPACT[amount] ?? "Your chosen amount, put to work"} — every month of the year`
      : DONATE_IMPACT[amount] ?? "Your chosen amount, put to work";

  const reset = () => {
    setStep("details");
    setStepIdx(0);
    setCustomAmount("");
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
      toast({ title: `Copied ${text}`, description: "Paste it in your M-Pesa / bank app." });
    } catch {
      toast({ title: "Copy failed", description: "Please note it down manually." });
    }
  };

  const startDonation = () => {
    if (effAmount < 100) {
      toast({ title: "Minimum is KES 100", description: "Every shilling counts — but M-Pesa needs at least 100.", variant: "destructive" });
      return;
    }
    setStep("processing");
    setStepIdx(0);
    // Simulated Daraja STK-push flow (production: env keys, server-side)
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStepIdx(1), 1400));
    timers.push(setTimeout(() => setStepIdx(2), 2800));
    timers.push(
      setTimeout(() => {
        setReceiptNo(`BRI-${new Date().getFullYear()}-${String(Math.floor(100000 + Math.random() * 899999))}`);
        setStep("receipt");
      }, 3800)
    );
  };

  const STEPS = ["STK push sent to your phone", "Enter your M-Pesa PIN", "Confirming & issuing receipt"];

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent className="max-w-lg overflow-hidden rounded-3xl border-binti-sand bg-binti-cream p-0">
        <DialogHeader className="bg-gradient-to-r from-binti to-binti-pink px-6 py-5">
          <DialogTitle className="font-display text-xl font-extrabold text-white">
            {step === "receipt" ? "Asante sana! 🎉" : "Donate · M-Pesa / Bank"}
          </DialogTitle>
          <DialogDescription className="text-[13px] text-white/85">
            Every shilling is receipted and audit-logged. <strong>No cash</strong> — card never touches our hands.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="space-y-5 px-6 py-6"
            >
              {/* Frequency toggle — monthly is flagship for donor LTV */}
              <div className="grid grid-cols-2 gap-2 rounded-full bg-binti-sand/70 p-1.5" role="group" aria-label="Donation frequency">
                {(
                  [
                    { id: "once", label: "One-time", icon: CalendarClock },
                    { id: "monthly", label: "Monthly ♥", icon: Repeat },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFrequency(f.id)}
                    aria-pressed={frequency === f.id}
                    className={cn(
                      "flex h-10 items-center justify-center gap-1.5 rounded-full font-display text-[13px] font-bold transition-all",
                      frequency === f.id ? "bg-binti text-white shadow" : "text-binti-slate hover:text-binti-ink"
                    )}
                  >
                    <f.icon className="size-4" aria-hidden="true" /> {f.label}
                  </button>
                ))}
              </div>
              {frequency === "monthly" && (
                <p className="rounded-xl border border-binti-pink/30 bg-binti-pink/5 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-binti-pinkdeep dark:text-pink-300">
                  <strong>Monthly sisters</strong> are our backbone — predictable funding means a girl never waits for
                  materials. Cancel anytime.
                </p>
              )}

              {/* Currency — international donors give in their own money */}
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Donation currency">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCurCode(c.code);
                      setCustomAmount("");
                    }}
                    aria-pressed={curCode === c.code}
                    className={cn(
                      "rounded-full border px-3 py-1.5 font-display text-[11.5px] font-extrabold transition",
                      curCode === c.code
                        ? "border-binti bg-binti text-white shadow-sm"
                        : "border-binti/30 bg-binti-card text-binti-slate hover:border-binti hover:text-binti"
                    )}
                  >
                    {c.code}
                  </button>
                ))}
                <span className="text-[11px] text-binti-slate/70">
                  {curCode === "KES" ? "Kenyan shillings" : `≈ ${cur.rate} KES per ${curCode} · charged in KES`}
                </span>
              </div>

              {/* Amount tiers + custom */}
              <div className="grid grid-cols-3 gap-2.5">
                {DONATE_TIERS.map((t) => (
                  <button
                    key={t.amount}
                    onClick={() => {
                      setAmount(t.amount);
                      setCustomAmount("");
                    }}
                    aria-pressed={customAmount === "" && amount === t.amount}
                    className={cn(
                      "rounded-xl border-2 p-3 text-center transition-all",
                      customAmount === "" && amount === t.amount
                        ? "border-mpesa bg-green-50 shadow-sm"
                        : "border-binti-sand bg-binti-card hover:border-mpesa/50"
                    )}
                  >
                    <span className="block font-display text-[15px] font-extrabold text-binti-ink">{t.label}</span>
                    <span className="mt-0.5 block text-[10.5px] leading-tight text-binti-slate">
                      {curCode !== "KES" && `≈ ${cur.symbol}${fromKes(t.amount, cur.rate, false).toLocaleString()} · `}
                      {t.impact}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-binti-sand" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-binti-slate/70">or choose your own</span>
                <div className="h-px flex-1 bg-binti-sand" aria-hidden="true" />
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-display text-[15px] font-extrabold text-binti-slate">
                  {curCode === "KES" ? "KES" : `${cur.symbol} ${curCode}`}
                </span>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={curCode === "KES" ? 100 : 1}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder={curCode === "KES" ? "e.g. 1,500" : `e.g. ${fromKes(2500, cur.rate)}`}
                  aria-label={`Custom amount in ${curCode}`}
                  className="h-12 rounded-xl border-binti/30 bg-binti-card pl-14 font-display text-[16px] font-bold"
                />
              </div>

              {/* Impact preview */}
              <div className="flex items-start gap-2.5 rounded-xl border border-binti/25 bg-binti-card p-3.5">
                <HeartHandshake className="mt-0.5 size-4.5 shrink-0 text-mpesa" aria-hidden="true" />
                <p className="text-[13px] leading-relaxed text-binti-ink">
                  <strong>Your impact:</strong> {effAmount >= 100 ? impactText : "choose an amount to see the impact"}
                  {frequency === "monthly" && effAmount >= 100 && (
                    <span className="text-binti-pinkdeep dark:text-pink-300"> · KES {effAmount.toLocaleString()} × 12 months</span>
                  )}
                  {curCode !== "KES" && customAmount !== "" && effAmount >= 100 && (
                    <span className="text-binti-slate"> · ≈ KES {effAmount.toLocaleString()} charged</span>
                  )}
                </p>
              </div>

              {/* M-Pesa */}
              <div className="rounded-2xl border-2 border-mpesa/50 bg-binti-card p-4">
                <p className="flex items-center gap-2 font-display text-[14px] font-bold text-binti-ink">
                  <Smartphone className="size-4.5 text-mpesa" aria-hidden="true" /> M-Pesa Paybill
                </p>
                <div className="mt-2.5 flex items-center justify-between gap-2 rounded-xl bg-binti-cream px-3.5 py-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-binti-slate">Paybill</p>
                    <p className="font-display text-xl font-extrabold text-binti dark:text-indigo-300">{ORG.paybill}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-binti-slate">Account</p>
                    <p className="font-display text-[15px] font-bold text-binti-ink">{ORG.paybillAccount}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copy(ORG.paybill)}
                    className="rounded-full border-mpesa/50 font-bold text-mpesa hover:bg-mpesa hover:text-white"
                  >
                    <Copy className="size-3.5" aria-hidden="true" /> {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              {/* Bank */}
              <div className="rounded-2xl border border-binti/30 bg-binti-card p-4">
                <p className="flex items-center gap-2 font-display text-[14px] font-bold text-binti-ink">
                  <Landmark className="size-4.5 text-binti dark:text-indigo-300" aria-hidden="true" /> Bank Transfer
                </p>
                <div className="mt-2.5 flex items-center justify-between rounded-xl bg-binti-cream px-3.5 py-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-binti-slate">Bank · Account</p>
                    <p className="font-display text-[14px] font-bold text-binti-ink">{ORG.bank}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => copy("1234567890")} className="rounded-full border-binti/50 font-bold text-binti dark:text-indigo-300 hover:bg-binti hover:text-white">
                    <Copy className="size-3.5" aria-hidden="true" /> Copy
                  </Button>
                </div>
              </div>

              <Button
                onClick={startDonation}
                className="h-12 w-full rounded-full bg-mpesa text-[15px] font-bold text-white hover:bg-green-600"
              >
                <HeartHandshake className="size-5" aria-hidden="true" />{" "}
                {curCode !== "KES" && customAmount !== "" ? `${cur.symbol}${parseInt(customAmount, 10).toLocaleString()} (≈ KES ${effAmount.toLocaleString()})` : `Give KES ${effAmount.toLocaleString()}`}
                {frequency === "monthly" ? " / month via M-Pesa" : " via M-Pesa"}
              </Button>
              <DataNote>
                Giving from abroad? Pick USD / EUR / GBP above — M-Pesa charges the KES equivalent at indicative
                rates. Partnership gifts: {ORG.email}. Receipt auto · audit logged · no cash.
              </DataNote>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="px-6 py-8"
            >
              <div className="flex flex-col items-center text-center">
                <Loader2 className="size-12 animate-spin text-mpesa" aria-hidden="true" />
                <p className="mt-4 font-display text-lg font-extrabold text-binti-ink">
                  Giving KES {effAmount.toLocaleString()}{frequency === "monthly" ? " / month" : ""}…
                </p>
              </div>
              <ol className="mx-auto mt-6 max-w-xs space-y-3" role="list">
                {STEPS.map((s, i) => {
                  const state = i < stepIdx ? "done" : i === stepIdx ? "active" : "todo";
                  return (
                    <li key={s} className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-extrabold",
                          state === "done" && "border-mpesa bg-mpesa text-white",
                          state === "active" && "binti-pulse border-mpesa bg-binti-card text-mpesa",
                          state === "todo" && "border-binti-sand bg-binti-card text-binti-slate/50"
                        )}
                      >
                        {state === "done" ? "✓" : i + 1}
                      </span>
                      <span className={cn("text-[13.5px]", state === "todo" ? "text-binti-slate/60" : "font-semibold text-binti-ink")}>
                        {s}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="mx-auto mt-6 max-w-xs text-center text-[11.5px] leading-snug text-binti-slate/70">
                Demo simulation. In production this runs on the Safaricom Daraja API (keys via .env.local, never
                hardcoded).
              </p>
            </motion.div>
          )}

          {step === "receipt" && (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="px-6 py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 16 }}
              >
                <CheckCircle2 className="mx-auto size-16 text-mpesa" aria-hidden="true" />
              </motion.div>
              <h3 className="mt-4 font-display text-xl font-extrabold text-binti-ink">Donation received ✓</h3>
              <p className="mt-1 text-[13.5px] text-binti-slate">
                KES {effAmount.toLocaleString()}{frequency === "monthly" ? " / month" : ""} · M-Pesa {ORG.paybill}
              </p>
              <div className="mx-auto mt-5 max-w-xs rounded-2xl border border-binti-sand bg-binti-card p-4 text-left">
                <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-binti-slate">
                  <ReceiptText className="size-4 text-binti dark:text-indigo-300" aria-hidden="true" /> Receipt
                </p>
                <p className="mt-1.5 font-mono text-[14px] font-bold text-binti dark:text-indigo-300">{receiptNo}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-binti-slate">
                  Auto-receipt sent · audit logged · funds move to programme delivery (62% per FY24/25 aggregate).
                </p>
              </div>
              <Button
                onClick={() => {
                  reset();
                  onOpenChange(false);
                }}
                variant="outline"
                className="mt-5 h-11 rounded-full border-binti/40 px-6 font-bold text-binti dark:text-indigo-300 hover:bg-binti hover:text-white"
              >
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* GET INVOLVED — tabs: Youth / Donors / Partners                      */
/* ------------------------------------------------------------------ */
export function InvolvedSection({ onDonate }: { onDonate: () => void }) {
  return (
    <section aria-label="Get Involved" className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <SectionHeading
        eyebrow="Get Involved"
        title={
          <>
            Join a circle, fund one, or{" "}
            <span className="font-hand text-4xl font-bold text-binti-pink">partner with us</span>
          </>
        }
        sub="For Youth · For Donors · For Partners — one page, three ways to rise."
      />

      <Tabs defaultValue="youth" className="mt-8">
        <TabsList className="mx-auto flex w-full max-w-2xl rounded-full bg-binti-cream p-1.5">
          <TabsTrigger value="youth" className="flex-1 rounded-full font-display text-[13.5px] font-bold data-[state=active]:bg-binti data-[state=active]:text-white">
            For Youth
          </TabsTrigger>
          <TabsTrigger value="donors" className="flex-1 rounded-full font-display text-[13.5px] font-bold data-[state=active]:bg-binti data-[state=active]:text-white">
            For Donors
          </TabsTrigger>
          <TabsTrigger value="partners" className="flex-1 rounded-full font-display text-[13.5px] font-bold data-[state=active]:bg-binti data-[state=active]:text-white">
            For Partners
          </TabsTrigger>
        </TabsList>

        {/* YOUTH */}
        <TabsContent value="youth" className="mt-6">
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
            <JoinCircle />
            <div className="space-y-4">
              <Card className="overflow-hidden rounded-3xl border-binti-sand pt-0">
                <div className="relative h-44">
                  <NairobiPhoto src="/nairobi-team/nairobi-13.webp" alt="Nairobi team — circle facilitators" sizes="(max-width: 1024px) 100vw, 380px" />
                  <span className="absolute left-3 top-3 rounded-full bg-binti-card/95 px-3 py-1 text-[11px] font-bold text-binti dark:text-indigo-300">Your facilitators</span>
                </div>
                <CardContent className="p-4">
                  <ul className="space-y-3" role="list">
                    {FACILITATORS.map((f) => (
                      <li key={`${f.name}-${f.area}`} className="flex items-center gap-3">
                        <div className="relative size-11 overflow-hidden rounded-full border-2 border-binti-pink/40">
                          <NairobiPhoto src={f.photo} alt="" circle sizes="44px" />
                        </div>
                        <div>
                          <p className="font-display text-[13.5px] font-bold text-binti-ink">
                            {f.name} — {f.area}
                          </p>
                          <p className="text-[11.5px] text-binti-slate">
                            {f.role} · {f.sessions}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <DataNote className="mt-3">Names masked per Kenya DPA 2019 — facilitator photos: real Nairobi team.</DataNote>
                </CardContent>
              </Card>
              <Card className="rounded-3xl border-binti-amber/50 bg-binti-sand/40 p-4">
                <p className="flex items-start gap-2 text-[13px] leading-relaxed text-binti-ink">
                  <Info className="mt-0.5 size-4 shrink-0 text-binti dark:text-indigo-300" aria-hidden="true" />
                  Under 18? We ask a guardian to consent before you join — it's the law (DPA 2019) and it keeps you safe.
                </p>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* DONORS */}
        <TabsContent value="donors" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <ImpactCalculator onDonate={onDonate} />
            <div className="space-y-6">
              <Card className="rounded-3xl border-binti-sand bg-binti-card p-6 md:p-8">
                <h3 className="font-display text-xl font-extrabold text-binti-ink">Fund a full journey</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-binti-slate">
                  KES 10,000 takes one girl through all 8 sessions — materials, facilitator, referrals and the alumni wall.
                </p>
                <ul className="mt-5 space-y-3" role="list">
                  {DONATE_TIERS.map((t) => (
                    <li key={t.amount} className="flex items-center justify-between rounded-xl border border-binti-sand bg-binti-cream/50 px-4 py-3">
                      <div>
                        <p className="font-display text-[14.5px] font-extrabold text-binti-ink">{t.label}</p>
                        <p className="text-[12px] text-binti-slate">{t.impact}</p>
                      </div>
                      <Button onClick={onDonate} size="sm" className="rounded-full bg-mpesa font-bold text-white hover:bg-green-600">
                        Donate
                      </Button>
                    </li>
                  ))}
                </ul>
                <Button onClick={onDonate} className="mt-5 h-12 w-full rounded-full bg-binti font-bold hover:bg-binti-deep">
                  Open Donate — M-Pesa Paybill {ORG.paybill}
                </Button>
              </Card>
              <Card className="rounded-3xl border-binti-sand bg-gradient-to-br from-binti to-binti-deep p-6 text-white md:p-8">
                <h3 className="font-display text-xl font-extrabold">Why donors trust Binti</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {[
                    "✓ No cash — M-Pesa Till 522522 only, receipts auto-generated",
                    "✓ Board unpaid · ED cannot sign alone · FO not related to ED",
                    "✓ 94% data quality, live aggregated dashboard, DATIM-ready",
                    "✓ Financials published in aggregate on the Accountability page",
                    "✓ Kenya DPA 2019 compliant — no PII in any report",
                  ].map((t) => (
                    <li key={t} className="text-[13.5px] leading-relaxed text-white/90">{t}</li>
                  ))}
                </ul>
                <p className="mt-5 rounded-xl bg-white/10 p-3.5 text-[12.5px] text-white/80">
                  Malala Sisterhood · Gold Tier partner. USAID · Global Fund · Mastercard Foundation — audit pack ready.
                </p>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* PARTNERS */}
        <TabsContent value="partners" className="mt-6">
          <Card className="mx-auto max-w-2xl rounded-3xl border-binti-sand bg-binti-card p-6 text-center md:p-8">
            <Handshake className="mx-auto size-12 text-binti dark:text-indigo-300" aria-hidden="true" />
            <h3 className="mt-3 font-display text-xl font-extrabold text-binti-ink">Partner with Binti Rising</h3>
            <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-binti-slate">
              Referral partners (LVCT Health, Nairobi County health), content partners (Shujaaz Inc) and funders —
              start with our MOU template, then meet the team in Kibera.
            </p>
            <a
              href="/policies/binti-mou-template.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-binti px-6 text-[15px] font-bold text-white transition hover:bg-binti-deep"
            >
              <FileDown className="size-5" aria-hidden="true" /> Download MOU Template PDF
            </a>
            <div className="mt-3">
              <a
                href="/policies/binti-donor-onepager.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-binti/40 px-5 text-[13.5px] font-bold text-binti transition hover:bg-binti hover:text-white"
              >
                <FileDown className="size-4" aria-hidden="true" /> Donor One-Pager · Statement of Need (FY24/25)
              </a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["LVCT Health", "Shujaaz Inc", "Nairobi County", "Malala Sisterhood", "PATH", "Global Fund"].map((p) => (
                <Badge key={p} variant="outline" className="rounded-full border-binti/30 text-binti dark:text-indigo-300">{p}</Badge>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
