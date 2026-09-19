// MOU template PDF + KpiMonthly seed
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFileSync } from "fs";
import { PrismaClient } from "@prisma/client";

const pdfColor = () => ({
  indigo: rgb(0.31, 0.275, 0.898),
  pink: rgb(0.925, 0.282, 0.6),
  ink: rgb(0.059, 0.09, 0.165),
  grey: rgb(0.42, 0.45, 0.5),
});

async function mou() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const c = pdfColor();
  const page = doc.addPage([595, 842]);
  const M = 56;
  page.drawRectangle({ x: 0, y: 792, width: 595, height: 50, color: c.indigo });
  page.drawText("BINTI RISING INITIATIVE", { x: M, y: 810, size: 14, font: bold, color: rgb(1, 1, 1) });
  page.drawText("Reg No: NC/SD/CBO/2026/0123 - KRA PIN: P051823456K", { x: 320, y: 810, size: 8, font, color: rgb(1, 1, 1) });
  let y = 758;
  page.drawText("Memorandum of Understanding - Partner Template", { x: M, y, size: 18, font: bold, color: c.indigo });
  y -= 30;
  const lines = [
    "This MOU is entered into between Binti Rising Initiative (CBO Reg No",
    "NC/SD/CBO/2026/0123), hereinafter 'Binti Rising', and the Partner",
    "organisation named below, effective from the date of the last signature.",
    "",
    "1. PURPOSE",
    "To collaborate on peer-led SRH education, safeguarding referrals and",
    "wellbeing support for adolescent girls and young women (15-25) in",
    "Kibera, Mathare and Kawangware, Nairobi.",
    "",
    "2. ROLES OF THE PARTNER (select applicable)",
    "[ ] Referral partner (health, GBV rescue, psychosocial support)",
    "[ ] Content partner (media, comics, training materials)",
    "[ ] Funder (grants aligned to published FY24/25 budget lines)",
    "[ ] County / government liaison",
    "",
    "3. DATA PROTECTION (Kenya DPA 2019)",
    "Both parties agree to share only aggregated, de-identified data.",
    "No personal identifiers (names, phone numbers, IDs, exact locations)",
    "shall be exchanged or published by either party.",
    "",
    "4. SAFEGUARDING",
    "The Partner shall uphold Binti Rising's Safeguarding Policy, including",
    "no-retaliation reporting channels (WhatsApp +254758919709, shortcode",
    "20308, sealed box at Laini Saba centre, GBV hotline 1195).",
    "",
    "5. FINANCIAL CONTROLS",
    "Any funds are transferred to M-Pesa Paybill 522522 or KCB account",
    "1234567890 only. Binti Rising operates a strict no-cash policy with",
    "segregation of duties (Board unpaid, ED cannot sign alone, FO not",
    "related to ED).",
    "",
    "6. DURATION AND TERMINATION",
    "This MOU runs for 12 months and may be terminated by either party",
    "with 30 days written notice.",
    "",
    "Signed:",
    "Binti Rising Initiative ______________________  Date ____________",
    "Partner organisation ________________________  Date ____________",
  ];
  for (const line of lines) {
    if (y < 60) break;
    page.drawText(line, { x: M, y, size: 9.5, font, color: c.ink });
    y -= 14;
  }
  page.drawText("Questions: hello@bintirising.or.ke | WhatsApp +254758919709", { x: M, y: 50, size: 8, font, color: c.grey });
  const bytes = await doc.save();
  writeFileSync("/home/z/my-project/public/policies/binti-mou-template.pdf", bytes);
  console.log("MOU PDF done");
}

async function seed() {
  const db = new PrismaClient();
  const months = ["2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09"];
  const areas = [
    { name: "Kibera", youth: [540, 556, 572, 590, 602, 612], att: [91, 92, 94, 95, 94, 95] },
    { name: "Mathare", youth: [350, 358, 368, 378, 388, 394], att: [87, 88, 89, 91, 92, 93] },
    { name: "Kawangware", youth: [210, 218, 224, 232, 238, 242], att: [84, 86, 88, 89, 90, 90] },
  ];
  for (let m = 0; m < months.length; m++) {
    let totOpen = 0;
    let totClosed = 0;
    for (const a of areas) {
      const closed = Math.round(a.youth[m] * 0.09);
      const open = Math.round(a.youth[m] * 0.014);
      totOpen += open;
      totClosed += closed;
      await db.kpiMonthly.upsert({
        where: { month_area: { month: months[m], area: a.name } },
        update: { youthEnrolled: a.youth[m], attendancePct: a.att[m], referralsOpen: open, referralsClosed: closed },
        create: {
          month: months[m],
          area: a.name,
          youthEnrolled: a.youth[m],
          sessionsHeld: Math.round(a.youth[m] / 6.4),
          attendancePct: a.att[m],
          referralsOpen: open,
          referralsClosed: closed,
          wellbeingAvg: 61 + m * 3.2,
        },
      });
    }
    await db.kpiMonthly.upsert({
      where: { month_area: { month: months[m], area: "ALL" } },
      update: { referralsOpen: totOpen, referralsClosed: totClosed },
      create: {
        month: months[m],
        area: "ALL",
        youthEnrolled: areas.reduce((s, a) => s + a.youth[m], 0),
        sessionsHeld: Math.round(areas.reduce((s, a) => s + a.youth[m] / 6.4, 0)),
        attendancePct: 91 + m * 0.6,
        referralsOpen: totOpen,
        referralsClosed: totClosed,
        wellbeingAvg: 61 + m * 3.2,
      },
    });
  }
  const n = await db.kpiMonthly.count();
  console.log(`KpiMonthly seeded: ${n} rows`);
  await db.$disconnect();
}

(async () => {
  await mou();
  await seed();
  console.log("DONE");
})();
