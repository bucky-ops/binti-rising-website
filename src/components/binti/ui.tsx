"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Risk } from "@/lib/binti/data";

/* ------------------------------------------------------------------ */
/* BintiMark — geometric rising-sun logo (wireframe Logo Pack)         */
/* ------------------------------------------------------------------ */
export function BintiMark({ light = false, size = 28 }: { light?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="16" cy="16" r="7" fill={light ? "white" : "#4F46E5"} />
      <circle cx="16" cy="5" r="2.5" fill="#F59E0B" />
      <circle cx="26" cy="9" r="2" fill="#EC4899" />
      <circle cx="28" cy="20" r="2" fill="#06B6D4" />
      <g stroke={light ? "white" : "#4F46E5"} strokeWidth="1.2" strokeLinecap="round">
        <path d="M16 2 v4 M16 26 v4 M2 16 h4 M26 16 h4 M5.5 5.5 l2.8 2.8 M23.7 23.7 l2.8 2.8 M26.5 5.5 l-2.8 2.8 M8.3 23.7 l-2.8 2.8" />
      </g>
    </svg>
  );
}

/* Wordmark: "Binti" (Caveat, pink) + "RISING" (Sora, indigo) */
export function BintiWordmark({
  variant = "color",
  className,
}: {
  variant?: "color" | "white" | "black";
  className?: string;
}) {
  const isWhite = variant === "white";
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <BintiMark light={isWhite} size={26} />
      <span className="flex items-baseline gap-1.5 leading-none">
        <span
          className={cn(
            "font-hand text-[26px] font-bold tracking-tight",
            isWhite ? "text-white" : variant === "black" ? "text-black" : "text-binti-pink"
          )}
        >
          Binti
        </span>
        <span
          className={cn(
            "font-display text-[17px] font-extrabold tracking-[0.14em]",
            isWhite ? "text-white" : variant === "black" ? "text-black" : "text-binti"
          )}
        >
          RISING
        </span>
      </span>
    </span>
  );
}

/* Full logo image (attached bri-logo.jpg) */
export function BintiLogoImage({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/binti-logo.jpg"
      alt="Binti Rising Initiative logo — young woman's profile with rising sun"
      width={size}
      height={size}
      className={cn("rounded-full object-cover ring-2 ring-binti-pink/40", className)}
      priority
    />
  );
}

/* ------------------------------------------------------------------ */
/* NairobiPhoto — renders real Nairobi Drive photo with graceful       */
/* fallback placeholder "Awaiting Nairobi Team photo upload" (DPA rule) */
/* ------------------------------------------------------------------ */
export function NairobiPhoto({
  src,
  alt,
  className,
  fill = true,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  circle = false,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  circle?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-binti-sand to-binti-pink/20 text-center p-4",
          circle && "rounded-full",
          className
        )}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.6" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <p className="text-[11px] font-semibold text-binti leading-tight">
          Awaiting Nairobi Team photo upload
        </p>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={fill ? sizes : undefined}
      width={fill ? undefined : 400}
      height={fill ? undefined : 400}
      priority={priority}
      onError={() => setError(true)}
      className={cn("object-cover binti-duotone", circle && "rounded-full", className)}
    />
  );
}

/* ------------------------------------------------------------------ */
/* CountUp — animated number for Impact Strip (count up micro-spec)    */
/* ------------------------------------------------------------------ */
export function CountUp({
  end,
  suffix = "",
  duration = 1600,
  className,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(end * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* RiskBadge — danger red ONLY for GBV / Very Heavy (WCAG AA spec)     */
/* ------------------------------------------------------------------ */
export function RiskBadge({ risk, className }: { risk: Risk; className?: string }) {
  const map: Record<Risk, string> = {
    Light: "bg-green-100 text-green-800 border-green-300",
    Medium: "bg-amber-100 text-amber-800 border-amber-300",
    Heavy: "bg-orange-100 text-orange-800 border-orange-300",
    "Very Heavy": "bg-red-100 text-red-700 border-red-400 font-bold",
  };
  return (
    <Badge variant="outline" className={cn("text-[11px] uppercase tracking-wide", map[risk], className)}>
      {risk === "Very Heavy" && <span aria-hidden="true">● </span>}
      {risk}
    </Badge>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeading — consistent section intro                           */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  light = false,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p
        className={cn(
          "font-display text-[12px] font-bold uppercase tracking-[0.22em]",
          light ? "text-binti-amber" : "text-binti-pink"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display mt-2 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl",
          light ? "text-white" : "text-binti-ink"
        )}
      >
        {title}
      </h2>
      {sub && (
        <p className={cn("mt-3 text-base leading-relaxed md:text-lg", light ? "text-white/75" : "text-binti-slate")}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DataNote — small privacy provenance note (DPA 2019)                 */
/* ------------------------------------------------------------------ */
export function DataNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-start gap-1.5 text-[12px] leading-snug text-binti-slate/80", className)}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4 M12 8h.01" />
      </svg>
      <span>{children}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* SparkLine — mini area chart for KPI cards (aggregate trend only)    */
/* ------------------------------------------------------------------ */
export function SparkLine({ data, color = "#4f46e5" }: { data: number[]; color?: string }) {
  const points = data.map((v, i) => ({ i, v }));
  const gid = `spark-${color.replace("#", "")}`;
  return (
    <div className="mt-2 h-10 w-full" aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gid})`}
            isAnimationActive
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SectionReveal — subtle whileInView reveal for section blocks        */
/* ------------------------------------------------------------------ */
export function SectionReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
