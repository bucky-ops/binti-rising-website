"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, SendHorizonal, ShieldCheck } from "lucide-react";
import { SEMA_FLOWS, ORG } from "@/lib/binti/data";
import type { SectionId } from "@/lib/binti/data";
import { cn } from "@/lib/utils";
import { BintiMark } from "./ui";

/* ------------------------------------------------------------------ */
/* SEMA NA ME — floating WhatsApp-style check-in buddy (shortcode      */
/* 20308). Purely client-side canned flows; SAFETY FIRST: the "I need  */
/* help now" path always surfaces the free GBV Hotline 1195 + WhatsApp. */
/* Anonymous by design — nothing typed here is stored anywhere (DPA).  */
/* ------------------------------------------------------------------ */

interface Msg {
  id: number;
  from: "bot" | "user";
  text: string;
  action?: { label: string; go: SectionId };
}

let msgId = 0;
const nextId = () => ++msgId;

function botReply(input: string): { text: string; action?: Msg["action"] } {
  const t = input.toLowerCase();
  if (/help|now|danger|abuse|violence|urgent|1195|scared/.test(t))
    return { text: SEMA_FLOWS.replies.safe };
  if (/join|circle|member|start|register/.test(t))
    return { text: SEMA_FLOWS.replies.join, action: { label: "Go to Join Circle form →", go: "involved" } };
  if (/jtw|journey|wholeness|session|what is|programme|program/.test(t))
    return { text: SEMA_FLOWS.replies.jtw, action: { label: "Explore S1–S8 →", go: "work" } };
  if (/donat|give|paybill|support|mpesa|m-pesa|fund/.test(t))
    return { text: SEMA_FLOWS.replies.donate, action: { label: "Open Donate →", go: "involved" } };
  return { text: SEMA_FLOWS.fallback };
}

export function SemaChat({ onNavigate }: { onNavigate?: (s: SectionId) => void }) {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const greeted = useRef(false);

  // Greet on first open (with a human-feel delay)
  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true;
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setMsgs([{ id: nextId(), from: "bot", text: SEMA_FLOWS.greet }]);
      }, 650);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Auto-scroll to the latest message
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const push = (m: Omit<Msg, "id">) => setMsgs((prev) => [...prev, { ...m, id: nextId() }]);

  const sendBot = (text: string, action?: Msg["action"]) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      push({ from: "bot", text, action });
    }, 550 + Math.random() * 350);
  };

  const onUser = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    push({ from: "user", text: clean });
    setInput("");
    const r = botReply(clean);
    sendBot(r.text, r.action);
  };

  const onOption = (id: string, label: string) => {
    push({ from: "user", text: label });
    const r = botReply(id + " " + label);
    sendBot(r.text, r.action);
  };

  return (
    <>
      {/* Launcher — above the mobile Donate FAB on small screens */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Sema na Me chat" : "Open Sema na Me chat — anonymous check-in buddy"}
        aria-expanded={open}
        className={cn(
          "fixed right-4 z-40 flex size-14 items-center justify-center rounded-full shadow-2xl transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-binti-ink",
          open ? "bottom-4 bg-[#0F172A] text-white" : "bottom-20 bg-mpesa text-white sm:bottom-5 sm:right-5",
          !open && "binti-pulse"
        )}
      >
        {open ? <X className="size-6" aria-hidden="true" /> : <MessageCircle className="size-7" aria-hidden="true" />}
        {!open && (
          <span className="absolute -left-1 -top-1 flex size-4 items-center justify-center rounded-full bg-binti-pink text-[9px] font-extrabold text-white" aria-hidden="true">
            1
          </span>
        )}
      </button>
      {!open && (
        <span
          aria-hidden="true"
          className="pointer-events-none fixed bottom-[4.9rem] right-[4.6rem] z-40 hidden rounded-full bg-[#0F172A] px-3 py-1.5 font-display text-[11px] font-bold text-white shadow-lg sm:block"
        >
          Sema na Me
        </span>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Sema na Me chat"
            className="fixed bottom-[4.75rem] right-4 z-40 flex h-[480px] w-[min(92vw,360px)] flex-col overflow-hidden rounded-3xl border border-binti-sand bg-binti-cream shadow-2xl sm:right-5"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-mpesa to-green-600 px-4 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-binti-card/95">
                <BintiMark size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[14px] font-extrabold leading-tight text-white">Sema na Me</p>
                <p className="text-[10.5px] text-white/85">WhatsApp {ORG.shortcode} · replies instantly</p>
              </div>
              <a
                href="tel:1195"
                className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
                aria-label="Call free GBV Hotline 1195"
              >
                <Phone className="size-4" aria-hidden="true" />
              </a>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="binti-scroll flex-1 space-y-2.5 overflow-y-auto px-3.5 py-4" aria-live="polite">
              {msgs.map((m) => (
                <div key={m.id} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm",
                      m.from === "user"
                        ? "rounded-br-md bg-mpesa text-white"
                        : "rounded-bl-md border border-binti-sand bg-binti-card text-binti-ink"
                    )}
                  >
                    {m.text}
                    {m.action && (
                      <button
                        onClick={() => {
                          setOpen(false);
                          onNavigate?.(m.action!.go);
                        }}
                        className="mt-2 block w-full rounded-full bg-binti px-3 py-2 text-[12px] font-bold text-white transition hover:bg-binti-deep"
                      >
                        {m.action.label}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start" aria-hidden="true">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-binti-sand bg-binti-card px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 animate-bounce rounded-full bg-binti-slate/50"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {/* Quick replies — always available above input */}
              {msgs.length > 0 && !typing && (
                <div className="flex flex-wrap gap-1.5 pt-1.5" role="group" aria-label="Quick replies">
                  {SEMA_FLOWS.options.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => onOption(o.id, o.label)}
                      className="rounded-full border border-mpesa/40 bg-binti-card px-2.5 py-1.5 text-[11.5px] font-semibold text-green-700 dark:text-green-300 transition hover:bg-mpesa hover:text-white"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onUser(input);
              }}
              className="flex items-center gap-2 border-t border-binti-sand bg-binti-card px-3 py-2.5"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                aria-label="Message Sema na Me"
                maxLength={300}
                className="h-10 min-w-0 flex-1 rounded-full border border-binti-sand bg-binti-cream/60 px-4 text-[13px] focus-visible:outline-2 focus-visible:outline-mpesa"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mpesa text-white transition hover:bg-green-600 disabled:opacity-50"
                disabled={!input.trim()}
              >
                <SendHorizonal className="size-4.5" aria-hidden="true" />
              </button>
            </form>
            <p className="flex items-center justify-center gap-1.5 bg-binti-card pb-2 text-[10px] text-binti-slate/70">
              <ShieldCheck className="size-3 text-green-600 dark:text-green-400" aria-hidden="true" />
              Anonymous · nothing you type is stored (Kenya DPA 2019)
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
