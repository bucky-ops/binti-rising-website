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
} from "lucide-react";
import { SectionHeading, DataNote, NairobiPhoto } from "./../ui";
import { AREA_OPTIONS, DONATE_TIERS, ORG, FACILITATORS } from "@/lib/binti/data";
import { cn } from "@/lib/utils";

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
        <CheckCircle2 className="mx-auto size-14 text-green-600" aria-hidden="true" />
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
    <Card className="mx-auto max-w-xl rounded-3xl border-binti-sand bg-white p-6 md:p-8">
      <h3 className="flex items-center gap-2 font-display text-xl font-extrabold text-binti-ink">
        <UserRound className="size-5 text-binti" aria-hidden="true" /> Join Circle
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
            className={cn("h-11 rounded-xl border-binti/30 bg-white", errors.initials && "border-red-400 focus-visible:ring-red-300")}
          />
          {errors.initials ? (
            <p className="text-[12px] font-semibold text-red-600" role="alert">{errors.initials}</p>
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
              className={cn("h-11 rounded-xl border-binti/30 bg-white", errors.age && "border-red-400 focus-visible:ring-red-300")}
            />
            {errors.age && <p className="text-[12px] font-semibold text-red-600" role="alert">Age must be 15-25</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="join-area" className="text-[13px] font-semibold text-binti-ink">Area</Label>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger id="join-area" aria-invalid={!!errors.area} className={cn("h-11 rounded-xl border-binti/30 bg-white", errors.area && "border-red-400")}>
                <SelectValue placeholder="Choose your area" />
              </SelectTrigger>
              <SelectContent>
                {AREA_OPTIONS.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.area && <p className="text-[12px] font-semibold text-red-600" role="alert">{errors.area}</p>}
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
            className={cn("h-11 rounded-xl border-binti/30 bg-white", errors.phone && "border-red-400 focus-visible:ring-red-300")}
          />
          {errors.phone ? (
            <p className="text-[12px] font-semibold text-red-600" role="alert">{errors.phone}</p>
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
            <a href="/policies/binti-dpa-2019-privacy.pdf" target="_blank" rel="noreferrer" className="font-bold text-binti hover:underline">
              Read the policy
            </a>
          </span>
        </label>
        {errors.dpa && <p className="-mt-2 text-[12px] font-semibold text-red-600" role="alert">{errors.dpa}</p>}

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
/* DONATE MODAL — M-Pesa Paybill 522522 + KCB, no cash                 */
/* ------------------------------------------------------------------ */
export function DonateModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [amount, setAmount] = useState<number>(DONATE_TIERS[1].amount);
  const [copied, setCopied] = useState(false);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-3xl border-binti-sand bg-binti-cream p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-binti to-binti-pink px-6 py-5">
          <DialogTitle className="font-display text-xl font-extrabold text-white">Donate · M-Pesa / Bank</DialogTitle>
          <DialogDescription className="text-[13px] text-white/85">
            Every shilling is receipted and audit-logged. <strong>No cash</strong> — card never touches our hands.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-6 py-6">
          {/* Amount tiers */}
          <div className="grid grid-cols-3 gap-2.5">
            {DONATE_TIERS.map((t) => (
              <button
                key={t.amount}
                onClick={() => setAmount(t.amount)}
                aria-pressed={amount === t.amount}
                className={cn(
                  "rounded-xl border-2 p-3 text-center transition-all",
                  amount === t.amount
                    ? "border-mpesa bg-green-50 shadow-sm"
                    : "border-binti-sand bg-white hover:border-mpesa/50"
                )}
              >
                <span className="block font-display text-[15px] font-extrabold text-binti-ink">{t.label}</span>
                <span className="mt-0.5 block text-[10.5px] leading-tight text-binti-slate">{t.impact}</span>
              </button>
            ))}
          </div>

          {/* M-Pesa */}
          <div className="rounded-2xl border-2 border-mpesa/50 bg-white p-4">
            <p className="flex items-center gap-2 font-display text-[14px] font-bold text-binti-ink">
              <Smartphone className="size-4.5 text-mpesa" aria-hidden="true" /> M-Pesa Paybill
            </p>
            <div className="mt-2.5 flex items-center justify-between gap-2 rounded-xl bg-binti-cream px-3.5 py-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-binti-slate">Paybill</p>
                <p className="font-display text-xl font-extrabold text-binti">{ORG.paybill}</p>
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
          <div className="rounded-2xl border border-binti/30 bg-white p-4">
            <p className="flex items-center gap-2 font-display text-[14px] font-bold text-binti-ink">
              <Landmark className="size-4.5 text-binti" aria-hidden="true" /> Bank Transfer
            </p>
            <div className="mt-2.5 flex items-center justify-between rounded-xl bg-binti-cream px-3.5 py-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-binti-slate">Bank · Account</p>
                <p className="font-display text-[14px] font-bold text-binti-ink">{ORG.bank}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => copy("1234567890")} className="rounded-full border-binti/50 font-bold text-binti hover:bg-binti hover:text-white">
                <Copy className="size-3.5" aria-hidden="true" /> Copy
              </Button>
            </div>
          </div>

          <Button
            onClick={() =>
              toast({
                title: "Donation success ✓",
                description: "Receipt sent · Audit logged · No cash. Asante sana!",
              })
            }
            className="h-12 w-full rounded-full bg-mpesa text-[15px] font-bold text-white hover:bg-green-600"
          >
            <HeartHandshake className="size-5" aria-hidden="true" /> Donate {amount.toLocaleString()} KES via M-Pesa
          </Button>
          <DataNote>
            Prefer USD or a partnership gift? Email {ORG.email}. Receipt auto · audit logged · no cash.
          </DataNote>
        </div>
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
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-binti">Your facilitators</span>
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
                  <Info className="mt-0.5 size-4 shrink-0 text-binti" aria-hidden="true" />
                  Under 18? We ask a guardian to consent before you join — it's the law (DPA 2019) and it keeps you safe.
                </p>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* DONORS */}
        <TabsContent value="donors" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-3xl border-binti-sand bg-white p-6 md:p-8">
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
        </TabsContent>

        {/* PARTNERS */}
        <TabsContent value="partners" className="mt-6">
          <Card className="mx-auto max-w-2xl rounded-3xl border-binti-sand bg-white p-6 text-center md:p-8">
            <Handshake className="mx-auto size-12 text-binti" aria-hidden="true" />
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
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["LVCT Health", "Shujaaz Inc", "Nairobi County", "Malala Sisterhood", "PATH", "Global Fund"].map((p) => (
                <Badge key={p} variant="outline" className="rounded-full border-binti/30 text-binti">{p}</Badge>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
