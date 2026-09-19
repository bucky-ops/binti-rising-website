// Donor One-Pager FY24/25 — Statement of Need (A4, brand-styled, aggregates only)
// Kenya DPA 2019: contains ONLY aggregated figures; no PII of any kind.
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFileSync } from "fs";

const C = {
  indigo: rgb(0.31, 0.275, 0.898),
  indigoDeep: rgb(0.216, 0.188, 0.639),
  pink: rgb(0.925, 0.282, 0.6),
  cyan: rgb(0.024, 0.714, 0.831),
  amber: rgb(0.961, 0.62, 0.043),
  ink: rgb(0.059, 0.09, 0.165),
  grey: rgb(0.42, 0.45, 0.5),
  cream: rgb(1, 0.984, 0.922),
  white: rgb(1, 1, 1),
};

async function main() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  const H = await doc.embedFont(StandardFonts.HelveticaBold);
  const F = await doc.embedFont(StandardFonts.Helvetica);

  const M = 46;
  let y = height;

  const text = (s: string, x: number, size: number, font = F, color = C.ink) => page.drawText(s, { x, y, size, font, color });
  const line = (x1: number, y1: number, x2: number, y2: number, color = C.indigo, w = 2) =>
    page.drawLine({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness: w, color });

  // Header band
  page.drawRectangle({ x: 0, y: height - 108, width, height: 108, color: C.indigo });
  page.drawRectangle({ x: 0, y: height - 114, width, height: 6, color: C.pink });
  y = height - 52;
  page.drawText("BINTI RISING INITIATIVE", { x: M, y, size: 20, font: H, color: C.white });
  y -= 24;
  page.drawText("Donor One-Pager FY24/25 — Statement of Need", { x: M, y, size: 12.5, font: F, color: rgb(0.92, 0.9, 1) });
  y -= 18;
  page.drawText("Kibera · Mathare · Kawangware, Nairobi  |  Reg No NC/SD/CBO/2026/0123  |  hello@bintirising.or.ke", {
    x: M, y, size: 8.5, font: F, color: rgb(0.82, 0.8, 1),
  });

  y = height - 146;
  text("THE NEED", M, 11, H, C.pink);
  y -= 16;
  const need =
    "In three Nairobi informal settlements, girls aged 15-25 face unplanned pregnancy, school dropout and gender-based violence — in silence. Peer-led, evidence-based mentorship changes that trajectory. Since 2023, 50 youth co-created the Journey to Wholeness (JTW): an 8-session curriculum on SRH, mental health and healthy relationships.";
  for (const ln of wrap(need, 96)) { text(ln, M, 9.8, F, C.ink); y -= 13.5; }

  y -= 10;
  text("FY24/25 AT A GLANCE (AGGREGATED — KENYA DPA 2019 COMPLIANT)", M, 11, H, C.pink);
  y -= 20;
  const stats: [string, string][] = [
    ["4,500+", "alumni since 2023"],
    ["1,248", "youth enrolled YTD across 3 areas"],
    ["36", "certified peer facilitators"],
    ["28", "sisterhood circles"],
    ["94%", "average circle attendance"],
    ["87%", "referral closure (48h median)"],
  ];
  const colW = (width - M * 2) / 3;
  stats.forEach(([v, l], i) => {
    const cx = M + (i % 3) * colW;
    const cy = y - Math.floor(i / 3) * 54;
    page.drawText(v, { x: cx, y: cy - 12, size: 19, font: H, color: i % 3 === 0 ? C.indigo : i % 3 === 1 ? C.pink : C.cyan });
    page.drawText(l, { x: cx, y: cy - 26, size: 8.2, font: F, color: C.grey });
  });
  y -= 132;

  // Where the money goes
  text("WHERE EVERY SHILLING GOES (AUDITED, NO-CASH POLICY)", M, 11, H, C.pink);
  y -= 18;
  const rows: [string, number, string][] = [
    ["Programme Delivery (circles, materials, referrals)", 62, "KES 3.72M"],
    ["Facilitator Stipends (peer-led model)", 18, "KES 1.08M"],
    ["Monitoring, Evaluation & Data (94% quality)", 7, "KES 0.42M"],
    ["Admin & Rent — board-capped", 8, "KES 0.48M"],
    ["Fundraising & Audit", 5, "KES 0.30M"],
  ];
  const barMax = 180;
  for (const [label, pct, kes] of rows) {
    text(label, M, 9.5, F, C.ink);
    page.drawText(`${pct}% · ${kes}`, { x: width - M - 108, y, size: 9.5, font: H, color: C.indigoDeep });
    const bw = (pct / 62) * barMax;
    page.drawRectangle({ x: M + 250, y: y - 1, width: barMax, height: 7, color: C.cream });
    page.drawRectangle({ x: M + 250, y: y - 1, width: bw, height: 7, color: pct >= 18 ? C.indigo : C.pink });
    y -= 17;
  }

  y -= 12;
  text("SAFEGUARDING & DATA PROTECTION", M, 11, H, C.pink);
  y -= 15;
  for (const ln of wrap(
    "Segregation of duties (unpaid Board; ED cannot sign alone; FO independent). Safeguarding focal points on standby for every session — S4 'Breaking Silence' runs with mandatory team debrief. Kenya DPA 2019 compliant: aggregates only, masked names, guardian consent for 15-17, encrypted storage, never any PII in reports.",
    98
  )) { text(ln, M, 9.6, F, C.ink); y -= 13; }

  y -= 14;
  // CTA band
  page.drawRectangle({ x: M, y: y - 86, width: width - M * 2, height: 92, color: C.indigoDeep });
  page.drawRectangle({ x: M, y: y - 86, width: 5, height: 92, color: C.amber });
  page.drawText("FUND A FULL JOURNEY — KES 10,000 TAKES ONE GIRL THROUGH ALL 8 SESSIONS", {
    x: M + 18, y: y - 18, size: 11, font: H, color: C.white,
  });
  page.drawText("M-Pesa Paybill 522522 · Account: Binti Rising      KCB Bank · Acc 1234567890", {
    x: M + 18, y: y - 38, size: 10, font: H, color: rgb(0.65, 0.95, 0.72),
  });
  page.drawText("GBV Hotline 1195 · WhatsApp +254 758 919 709 · Shortcode 20308 'Sema na Me'", {
    x: M + 18, y: y - 56, size: 8.6, font: F, color: rgb(0.85, 0.85, 1),
  });
  page.drawText("Every gift auto-receipted and audit-logged. Live impact dashboard: binti-rising-initiative.vercel.app", {
    x: M + 18, y: y - 72, size: 8.6, font: F, color: rgb(0.85, 0.85, 1),
  });

  // Footer
  page.drawText(
    "© 2026 Binti Rising Initiative · CBO/NAI/2024/0147 · KRA PIN P051823456K · PBO Pending · Figures are FY24/25 aggregates (Statement of Need)",
    { x: M, y: 34, size: 7.4, font: F, color: C.grey }
  );
  line(M, 48, width - M, 48, rgb(0.9, 0.9, 0.9), 1);

  const bytes = await doc.save();
  const out = "/home/z/my-project/public/policies/binti-donor-onepager.pdf";
  writeFileSync(out, bytes);
  console.log("wrote", out, bytes.length, "bytes");
}

function wrap(s: string, max: number): string[] {
  const words = s.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max) { lines.push(cur.trim()); cur = w; } else cur += " " + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

main().catch((e) => { console.error(e); process.exit(1); });
