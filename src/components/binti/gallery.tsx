"use client";

/* ------------------------------------------------------------------ */
/* CIRCLE GALLERY — "Inside the Circles"                               */
/* Area filter + masonry-style grid + accessible lightbox              */
/* (arrow keys / Escape / backdrop click, counter, DPA-safe captions). */
/* Photos ONLY from /public/nairobi-team/ (Drive manifest).            */
/* ------------------------------------------------------------------ */

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Image as ImageIcon, MapPin, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GALLERY, GALLERY_KINDS, type GalleryKind } from "@/lib/binti/data";

const FILTERS: ("All" | GalleryKind)[] = ["All", ...GALLERY_KINDS];

const KIND_STYLE: Record<GalleryKind, { chip: string; dot: string }> = {
  "Circle Session": { chip: "bg-binti/10 text-binti dark:text-indigo-300", dot: "bg-binti" },
  "Facilitator Training": { chip: "bg-binti-amber/15 text-amber-600 dark:text-amber-300", dot: "bg-binti-amber" },
  "Community Day": { chip: "bg-binti-pink/10 text-binti-pinkdeep dark:text-pink-300", dot: "bg-binti-pink" },
};

/* ------------------------------ LIGHTBOX ------------------------------ */
function Lightbox({
  index,
  items,
  onClose,
  onMove,
}: {
  index: number;
  items: typeof GALLERY;
  onClose: () => void;
  onMove: (next: number) => void;
}) {
  const item = items[index];

  const prev = useCallback(() => onMove((index - 1 + items.length) % items.length), [index, items.length, onMove]);
  const next = useCallback(() => onMove((index + 1) % items.length), [index, items.length, onMove]);

  // Keyboard: Escape closes, arrows navigate; body scroll locked while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="no-print fixed inset-0 z-[80] flex items-center justify-center bg-[#0F172A]/92 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${items.length}: ${item.caption}`}
    >
      <button
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      {/* Prev / next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:left-6"
      >
        <ChevronLeft className="size-6" aria-hidden="true" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:right-6"
      >
        <ChevronRight className="size-6" aria-hidden="true" />
      </button>

      <motion.figure
        key={item.src}
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-binti-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={item.src}
            alt={item.caption}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
            priority={index === 0}
          />
          {/* gradient scrim for caption legibility */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0F172A]/85 to-transparent" />
        </div>
        <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/80">
              <MapPin className="size-3.5" aria-hidden="true" /> {item.area}
              <span aria-hidden="true">·</span> {item.kind}
              {item.session && (
                <>
                  <span aria-hidden="true">·</span> {item.session}
                </>
              )}
            </p>
            <p className="mt-0.5 font-display text-[15px] font-bold text-white md:text-[16px]">{item.caption}</p>
          </div>
          <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-[12px] font-bold tabular-nums text-white">
            {index + 1} / {items.length}
          </span>
        </figcaption>
      </motion.figure>

      {/* DPA note */}
      <p className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-white/85 md:flex">
        <ShieldCheck className="size-3.5" aria-hidden="true" />
        Photos published with consent · no names, no identifiers (Kenya DPA 2019)
      </p>
    </motion.div>
  );
}

/* ------------------------------ GALLERY ------------------------------- */
export function CircleGallery() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(() => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.kind === filter)), [filter]);

  return (
    <section aria-label="Photo gallery — inside the circles" className="relative overflow-hidden bg-binti-cream py-14 md:py-20">
      {/* ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-16 size-80 rounded-full bg-binti/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 bottom-16 size-80 rounded-full bg-binti-amber/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.2em] text-binti-cyan">
            <ImageIcon className="size-4" aria-hidden="true" /> Inside the Circles
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-binti-ink md:text-4xl">
            Real moments, <span className="binti-gradient-text">dignified always</span>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-binti-slate">
            Every photo comes from the Nairobi team&apos;s own camera roll — shared with consent, published without a
            single name. Tap any photo to look closer.
          </p>
        </div>

        {/* Filter chips */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter photos by activity">
          {FILTERS.map((f) => {
            const active = filter === f;
            const count = f === "All" ? GALLERY.length : GALLERY.filter((g) => g.kind === f).length;
            return (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setLightbox(null);
                }}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-4 py-2 text-[12.5px] font-bold transition-all",
                  active
                    ? "border-binti bg-binti text-white shadow-md shadow-binti/25"
                    : "border-binti-sand bg-binti-card text-binti-slate hover:border-binti/50 hover:text-binti"
                )}
              >
                {f !== "All" && <span className={cn("size-1.5 rounded-full", KIND_STYLE[f].dot)} aria-hidden="true" />}
                {f} <span className={cn("tabular-nums", active ? "text-white/75" : "text-binti-slate/60")}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid — deliberate rhythm: some tiles span 2 rows / 2 cols */}
        <div className="mt-8 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[170px] md:grid-cols-4 md:gap-4">
          {items.map((g, i) => {
            const big = filter === "All" && (i === 0 || i === 5);
            return (
              <motion.button
                key={g.src}
                layout
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightbox(i)}
                className={cn(
                  "binti-img-zoom group relative min-h-0 overflow-hidden rounded-2xl border border-binti-sand/70 bg-binti-card text-left shadow-sm transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-binti hover:shadow-xl hover:shadow-binti/20",
                  big && "row-span-2 md:col-span-2"
                )}
                aria-label={`Open photo: ${g.caption}`}
              >
                <Image
                  src={g.src}
                  alt={g.caption}
                  fill
                  sizes={big ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />

                {/* top badges */}
                <div className="absolute inset-x-2.5 top-2.5 flex items-start justify-between gap-2">
                  <span className={cn("rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-900 backdrop-blur", KIND_STYLE[g.kind].dot === "bg-binti" && "text-binti")}>
                    {g.kind}
                  </span>
                  {g.session && (
                    <span className="rounded-full bg-binti-pink px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                      {g.session}
                    </span>
                  )}
                </div>

                {/* caption on hover / always on touch-friendly bottom */}
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-widest text-white/75">
                    <MapPin className="size-3" aria-hidden="true" /> {g.area}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[12.5px] font-semibold leading-snug text-white md:translate-y-2 md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    {g.caption}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* DPA footer note */}
        <p className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2 text-center text-[12px] font-semibold text-binti-slate/80">
          <ShieldCheck className="size-4 shrink-0 text-binti-cyan" aria-hidden="true" />
          Photos published with consent · aggregated captions only — never names, phones or IDs (Kenya DPA 2019)
        </p>
      </div>

      {/* Lightbox — portal to body so it stacks above sticky navbar / FABs */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {lightbox !== null && items[lightbox] && (
              <Lightbox index={lightbox} items={items} onClose={() => setLightbox(null)} onMove={setLightbox} />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
