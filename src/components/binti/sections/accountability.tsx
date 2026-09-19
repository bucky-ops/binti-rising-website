"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  Download,
  ShieldCheck,
  Landmark,
  UserRound,
  Calculator,
  FileDown,
  Megaphone,
  Mic,
  Lock,
} from "lucide-react";
import { SectionHeading, DataNote } from "./../ui";
import { FINANCE_FY2425, SEGREGATION, POLICIES, ORG } from "@/lib/binti/data";
import { cn } from "@/lib/utils";

const SEG_ICONS = { Landmark, UserRound, Calculator, ShieldCheck } as const;

/* ------------------------------------------------------------------ */
/* VOICE NOTE — MediaRecorder → base64 → complaint API (DPA 2019)      */
/* Audio is stored ONLY for the Safeguarding Lead; never rendered on   */
/* any public surface. 60 s cap. Graceful fallback to the sealed box.  */
/* ------------------------------------------------------------------ */
const MAX_VOICE_MS = 60_000;

interface VoiceRecorderState {
  supported: boolean;
  recording: boolean;
  denied: boolean;
  seconds: number;
  audioData: string | null; // base64 data URL
  audioUrl: string | null; // object URL for preview
}

function useVoiceRecorder(): [
  VoiceRecorderState,
  { start: () => Promise<void>; stop: () => void; clear: () => void },
] {
  const [state, setState] = useState<VoiceRecorderState>({
    supported: true,
    recording: false,
    denied: false,
    seconds: 0,
    audioData: null,
    audioUrl: null,
  });
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoStopRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timers + mic stream if unmounted mid-recording
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (autoStopRef.current) clearTimeout(autoStopRef.current);
      try {
        recorderRef.current?.stream.getTracks().forEach((t) => t.stop());
      } catch {
        /* stream already stopped */
      }
    };
  }, []);

  const start = async () => {
    // Support is checked at click time (client only) — avoids SSR state mismatch
    if (typeof navigator === "undefined" || !navigator.mediaDevices || typeof MediaRecorder === "undefined") {
      setState((s) => ({ ...s, denied: true }));
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
        const url = URL.createObjectURL(blob);
        const reader = new FileReader();
        reader.onloadend = () => {
          setState((s) => ({ ...s, recording: false, audioUrl: url, audioData: String(reader.result) }));
        };
        reader.readAsDataURL(blob);
      };
      rec.start();
      recorderRef.current = rec;
      setState((s) => ({ ...s, recording: true, denied: false, seconds: 0, audioData: null, audioUrl: null }));
      timerRef.current = setInterval(() => setState((s) => ({ ...s, seconds: s.seconds + 1 })), 1000);
      autoStopRef.current = setTimeout(() => {
        if (recorderRef.current && recorderRef.current.state === "recording") recorderRef.current.stop();
        if (timerRef.current) clearInterval(timerRef.current);
      }, MAX_VOICE_MS);
    } catch {
      // Permission denied or device error → fall back to sealed-box flow
      setState((s) => ({ ...s, denied: true, recording: false }));
    }
  };

  const stop = () => {
    if (recorderRef.current && recorderRef.current.state === "recording") recorderRef.current.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    if (autoStopRef.current) clearTimeout(autoStopRef.current);
  };

  const clear = () => {
    setState((s) => ({ ...s, audioData: null, audioUrl: null, seconds: 0 }));
  };

  return [state, { start, stop, clear }];
}

/* ------------------------------------------------------------------ */
/* ACCOUNTABILITY — donor audit on first glance                        */
/* ------------------------------------------------------------------ */
export function AccountabilitySection() {
  const [category, setCategory] = useState<string>("safeguarding");
  const [message, setMessage] = useState("");
  const [hasVoice, setHasVoice] = useState(false); // sealed-box fallback checkbox
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState<string | null>(null);
  const [voice, voiceCtl] = useVoiceRecorder();

  const submitComplaint = async () => {
    if (message.trim().length < 10) {
      toast({
        title: "Add a bit more detail",
        description: "Please describe the concern in at least 10 characters. Do NOT include your own name — the box is anonymous.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          message: message.trim(),
          hasVoiceNote: hasVoice || !!voice.audioData,
          voiceNote: voice.audioData ?? undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setRef(data.reference);
      setMessage("");
      setHasVoice(false);
      voiceCtl.clear();
      toast({
        title: "✕ Safety concern flagged — FO notified",
        description: `Anonymous reference: ${data.reference}. No retaliation. Safeguarding Lead independent.`,
      });
    } catch {
      toast({
        title: "Could not submit",
        description: `Please try again, or report via WhatsApp ${ORG.whatsapp} / shortcode ${ORG.shortcode}.`,
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section aria-label="Accountability" className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <SectionHeading
        eyebrow="Accountability · Download Constitution PDF"
        title={
          <>
            Pass a donor audit on <span className="font-hand text-4xl font-bold text-binti-pink">first glance</span>
          </>
        }
        sub="No cash badge, segregation chart, policy PDFs — everything a USAID / Global Fund / Mastercard Foundation reviewer needs, in aggregate."
      />

      {/* One-pager download — the 30-second donor brief */}
      <div className="mt-5">
        <a
          href="/policies/binti-donor-onepager.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-binti/40 bg-binti-card px-5 text-[13.5px] font-bold text-binti transition hover:bg-binti hover:text-white focus-visible:outline-2 focus-visible:outline-binti-pink"
        >
          <FileDown className="size-4" aria-hidden="true" /> Donor One-Pager · Statement of Need FY24/25 (PDF)
        </a>
      </div>

      {/* Trust badges */}
      <div className="mt-6 flex flex-wrap gap-2.5">
        <Badge className="rounded-full bg-binti px-3.5 py-2 text-[12px] font-bold text-white">✓ No cash · M-Pesa only</Badge>
        <Badge className="rounded-full bg-binti-pink px-3.5 py-2 text-[12px] font-bold text-white">✓ DPA 2019</Badge>
        <Badge className="rounded-full bg-binti-cyan px-3.5 py-2 text-[12px] font-bold text-white">✓ Safeguarding certified</Badge>
        <Badge className="rounded-full bg-[#0F172A] px-3.5 py-2 text-[12px] font-bold text-white">✓ Finance segregation</Badge>
        <Badge className="rounded-full bg-mpesa px-3.5 py-2 text-[12px] font-bold text-white">✓ Audited FY24</Badge>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {/* Financial table */}
        <Card className="overflow-hidden rounded-2xl border-binti-sand bg-binti-card">
          <div className="flex flex-wrap items-center justify-between gap-2 p-5 pb-3">
            <h3 className="font-display text-[15px] font-bold text-binti-ink">Financial Table FY24/25 · No Cash Policy</h3>
            <Badge className="rounded-full bg-green-100 border border-green-300 text-[11px] font-bold text-green-800">
              Receipt auto · Audit logged
            </Badge>
          </div>
          <div className="binti-scroll max-h-80 overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-binti-cream">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-display text-[12px] font-bold text-binti-ink">Line (aggregated)</TableHead>
                  <TableHead className="text-right font-display text-[12px] font-bold text-binti-ink">Share</TableHead>
                  <TableHead className="text-right font-display text-[12px] font-bold text-binti-ink">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FINANCE_FY2425.map((f) => (
                  <TableRow key={f.line} className="hover:bg-binti-cream/50">
                    <TableCell className="text-[13px]">
                      <span className="font-semibold text-binti-ink">{f.line}</span>
                      <span className="block text-[11px] text-binti-slate/80">{f.note}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="hidden h-2 w-16 overflow-hidden rounded-full bg-binti-cream sm:block">
                          <div className="h-full rounded-full bg-gradient-to-r from-binti to-binti-pink" style={{ width: `${f.pct}%` }} />
                        </div>
                        <span className="text-[13px] font-bold text-binti dark:text-indigo-300">{f.pct}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-[13px] text-binti-slate">{f.kes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="border-t border-binti-sand p-4">
            <DataNote>
              No cash policy highlighted · M-Pesa Till {ORG.paybill} only. Donations: M-Pesa Paybill {ORG.paybill} · {ORG.bank}.
              Figures aggregated by the Finance Officer (not related to ED).
            </DataNote>
          </div>
        </Card>

        {/* Segregation of duties org chart */}
        <Card className="rounded-2xl border-binti-sand bg-binti-card p-5">
          <h3 className="font-display text-[15px] font-bold text-binti-ink">Org Chart · Segregation of Duties — Audit Proof</h3>
          <div className="mt-4 space-y-3">
            {SEGREGATION.map((s, i) => {
              const Icon = SEG_ICONS[s.icon as keyof typeof SEG_ICONS];
              return (
                <div key={s.role}>
                  <div className="binti-lift flex items-start gap-3.5 rounded-xl border border-binti-sand bg-binti-cream/60 p-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-binti/10">
                      <Icon className="size-5 text-binti dark:text-indigo-300" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display text-[14px] font-bold text-binti-ink">{s.role}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-binti-slate">{s.detail}</p>
                    </div>
                    {i === 0 && <Badge className="ml-auto rounded-full bg-binti-cream text-[10px] font-bold text-binti dark:text-indigo-300">UNPAID</Badge>}
                  </div>
                  {i < SEGREGATION.length - 1 && (
                    <div className="flex justify-center" aria-hidden="true">
                      <div className="h-3 w-0.5 bg-binti/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <DataNote className="mt-4">
            ED cannot sign alone. FO not related to ED verified. Board unpaid. Safeguarding Lead independent — no
            financial authority.
          </DataNote>
        </Card>
      </div>

      {/* Policy downloads */}
      <Card className="mt-6 rounded-2xl border-binti-sand bg-binti-card p-5">
        <h3 className="font-display text-[15px] font-bold text-binti-ink">Policy Downloads · Audit Ready</h3>
        <p className="mt-1 text-[13px] text-binti-slate">
          Constitution non-profit clause, Safeguarding, DPA 2019 (encrypted storage), Finance Manual segregation — downloadable.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {POLICIES.map((p) => (
            <a
              key={p.file}
              href={p.file}
              target="_blank"
              rel="noreferrer"
              className="binti-lift group flex flex-col justify-between rounded-xl border border-binti-sand bg-binti-cream/50 p-4 focus-visible:outline-2 focus-visible:outline-binti"
            >
              <div>
                <FileDown className="size-5 text-binti dark:text-indigo-300" aria-hidden="true" />
                <p className="mt-2 font-display text-[13.5px] font-bold leading-snug text-binti-ink">{p.title}</p>
                <p className="mt-1 text-[11px] text-binti-slate">{p.size}</p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-binti dark:text-indigo-300 group-hover:underline">
                <Download className="size-3.5" aria-hidden="true" /> Download PDF
              </span>
            </a>
          ))}
        </div>
      </Card>

      {/* Anonymous complaints box */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card className="rounded-2xl border-2 border-dashed border-binti-pink/50 bg-binti-card p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-extrabold text-binti-ink">
            <Lock className="size-5 text-binti-pink" aria-hidden="true" /> Anonymous Complaints Box
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-binti-slate">
            <strong>No retaliation.</strong> Safeguarding Lead independent. Report via this box, WhatsApp{" "}
            <a href={ORG.whatsappLink} target="_blank" rel="noreferrer" className="font-bold text-binti dark:text-indigo-300 hover:underline">{ORG.whatsapp}</a>, shortcode{" "}
            <strong>{ORG.shortcode}</strong>, or the sealed box at the Laini Saba centre.
            <br />
            <span className="mt-1 inline-block text-[12px] text-binti-slate/80">
              Please do NOT include your own name or anyone's full name — keep it anonymous, DPA 2019.
            </span>
          </p>

          {ref ? (
            <div className="mt-5 rounded-xl border border-green-300 bg-green-50 p-4 text-center" role="status">
              <p className="font-display text-[15px] font-bold text-green-800">Submitted anonymously ✓</p>
              <p className="mt-1 text-[13px] text-green-700">
                Your reference: <strong>{ref}</strong>. FO notified. Track it anytime with this code.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="complaint-category" className="text-[13px] font-semibold text-binti-ink">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="complaint-category" className="h-11 rounded-xl border-binti/30 bg-binti-card">
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safeguarding">Safeguarding concern</SelectItem>
                    <SelectItem value="fraud">Fraud / misuse of funds</SelectItem>
                    <SelectItem value="data">Data privacy issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="complaint-message" className="text-[13px] font-semibold text-binti-ink">
                  Message (anonymous)
                </Label>
                <Textarea
                  id="complaint-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe what happened. Avoid names — write roles and areas instead, e.g. 'a facilitator in S4…'"
                  className="min-h-[110px] rounded-xl border-binti/30 bg-binti-card"
                  maxLength={2000}
                />
                <p className="text-right text-[11px] text-binti-slate/70">{message.length}/2000</p>
              </div>
              {/* Voice note: in-browser recorder → Safeguarding Lead only */}
              <div
                className={cn(
                  "rounded-xl border p-3.5",
                  voice.recording ? "binti-recording border-red-300 bg-red-50" : "border-binti/25 bg-binti-cream/60"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Mic className={cn("size-4", voice.recording ? "text-red-600 dark:text-red-400" : "text-binti dark:text-indigo-300")} aria-hidden="true" />
                  <p className="flex-1 text-[13px] font-semibold text-binti-ink">
                    {voice.recording
                      ? `Recording… ${voice.seconds}s / 60s — speak freely, stay anonymous`
                      : voice.audioData
                        ? "Voice note attached ✓ (Safeguarding Lead only)"
                        : "Voice note — or record it right here (60s max)"}
                  </p>
                  {voice.recording ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={voiceCtl.stop}
                      className="h-9 rounded-full border-red-400 font-bold text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      Stop
                    </Button>
                  ) : voice.audioData ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={voiceCtl.clear}
                      className="h-9 rounded-full font-bold text-binti-slate hover:text-red-600"
                    >
                      Delete
                    </Button>
                  ) : (
                    !voice.denied &&
                    voice.supported && (
                      <Button
                        size="sm"
                        onClick={voiceCtl.start}
                        className="h-9 rounded-full bg-binti font-bold text-white hover:bg-binti-deep"
                      >
                        Record
                      </Button>
                    )
                  )}
                </div>
                {voice.audioUrl && (
                  <audio controls src={voice.audioUrl} className="mt-2.5 h-9 w-full" aria-label="Preview of your anonymous voice note" />
                )}
                {voice.denied && (
                  <p className="mt-2 text-[12px] leading-snug text-binti-slate">
                    Microphone unavailable — tick the box below instead and drop your voice note in the sealed box at
                    the Laini Saba centre.
                  </p>
                )}
                {!voice.recording && !voice.audioData && !voice.denied && voice.supported && (
                  <p className="mt-1.5 text-[11.5px] leading-snug text-binti-slate/80">
                    The recording is encrypted at rest and heard only by the independent Safeguarding Lead (DPA 2019).
                  </p>
                )}
              </div>
              <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-binti/25 bg-binti-cream/60 p-3">
                <input
                  type="checkbox"
                  checked={hasVoice}
                  onChange={(e) => setHasVoice(e.target.checked)}
                  className="size-4.5 accent-binti"
                />
                <Mic className="size-4 text-binti dark:text-indigo-300" aria-hidden="true" />
                <span className="text-[13px] font-semibold text-binti-ink">
                  I have a voice note to drop at the sealed box (Laini Saba centre)
                </span>
              </label>
              {hasVoice && (
                <p className="-mt-1.5 rounded-lg bg-binti-cream px-3 py-2 text-[12px] text-binti-slate">
                  ✓ Noted — drop your sealed voice note at Laini Saba and quote your reference.
                </p>
              )}
              <Button
                onClick={submitComplaint}
                disabled={sending}
                className="h-12 w-full rounded-full bg-binti-pink text-[15px] font-bold text-white hover:bg-binti-pinkdeep"
              >
                {sending ? "Submitting anonymously…" : "Submit anonymously"}
              </Button>
            </div>
          )}
        </Card>

        {/* Donor audit checklist — first glance */}
        <Card className="rounded-2xl border-binti-sand bg-gradient-to-br from-binti to-binti-deep p-6 text-white">
          <h3 className="flex items-center gap-2 font-display text-lg font-extrabold">
            <Megaphone className="size-5 text-binti-amber" aria-hidden="true" /> Donor Audit Checklist — First Glance
          </h3>
          <ul className="mt-4 space-y-3" role="list">
            {[
              "Top bar CBO/KRA reg visible ✓",
              "No cash badge — M-Pesa Till 522522 only ✓",
              "Segregation chart: Board unpaid, ED cannot sign alone, FO not related ✓",
              "Policy PDFs downloadable (Constitution, Safeguarding, DPA 2019, Finance) ✓",
              "Complaints box anonymous + voice note ✓",
              "Live dashboard aggregates only — no PII ✓",
              "94% data quality · audit trail kept · last sync 2 min ✓",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-white/90">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[11px] font-bold" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className={cn("mt-5 rounded-xl bg-white/10 p-3.5 text-[12.5px] leading-relaxed text-white/80")}>
            USAID · Global Fund · Mastercard Foundation — audit pack ready. Report exported · 94% data quality ·
            audit trail kept · FO not related to ED verified.
          </p>
        </Card>
      </div>
    </section>
  );
}
