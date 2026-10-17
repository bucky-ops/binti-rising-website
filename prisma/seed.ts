/**
 * Seeds the content models from the typed source-of-truth files (spec 6.1
 * "Seed from ORG"). Run with: bun prisma/seed.ts
 */
import { PrismaClient } from "@prisma/client";
import { ORG } from "../src/lib/data/organization";
import { PROGRAMS } from "../src/lib/data/programs";
import { COMMUNITIES } from "../src/lib/data/communities";
import { STORIES } from "../src/lib/data/stories";
import { FAQS } from "../src/lib/data/faqs";

const prisma = new PrismaClient();

async function main() {
  // People: only role entries, publish=false until written consent (R1)
  for (const role of ORG.staffRoles) {
    await prisma.person.upsert({
      where: { slug: role.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
      update: {},
      create: {
        slug: role.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: role.title, // placeholder label, not a person name
        jobTitle: role.title,
        bio: role.responsibility,
        role: "staff",
        publish: false,
      },
    });
  }

  for (const p of PROGRAMS) {
    await prisma.program.upsert({
      where: { slug: p.slug },
      update: { summary: p.summary },
      create: {
        slug: p.slug,
        name: p.name,
        serviceType: p.serviceType,
        summary: p.summary,
        sessionsJson: JSON.stringify(p.sessions),
        outcomesJson: JSON.stringify(p.outcomes),
        sdgs: JSON.stringify(p.sdgs),
        status: "published",
        publishedAt: new Date("2026-10-17"),
      },
    });
  }

  for (const c of COMMUNITIES) {
    await prisma.location.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        name: c.name,
        subCounty: c.subCounty,
        description: c.description,
        lat: c.lat,
        lng: c.lng,
        status: "published",
        publishedAt: new Date("2026-10-17"),
      },
    });
  }

  for (const s of STORIES) {
    await prisma.story.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        attribution: s.attribution,
        ward: s.ward,
        pillar: s.pillar,
        pillarSlug: s.pillarSlug,
        quote: s.quote,
        anonymised: true,
        status: "published",
        publishedAt: new Date("2026-10-17"),
      },
    });
  }

  for (const [i, f] of FAQS.entries()) {
    await prisma.faq.upsert({
      where: { question: f.question },
      update: { answer: f.answer, sortOrder: i },
      create: { question: f.question, answer: f.answer, sortOrder: i, status: "published" },
    });
  }

  await prisma.mediaAsset.upsert({
    where: { key: "logo" },
    update: {},
    create: { key: "logo", url: "/binti-logo.jpg", alt: ORG.logoAlt, kind: "image" },
  });

  await prisma.mediaAsset.upsert({
    where: { key: "srhr-video" },
    update: {},
    create: {
      key: "srhr-video",
      url: "", // PENDING_HUMAN_INPUT: real YouTube URL
      alt: "Understanding SRHR: video guide",
      kind: "video",
      provider: "youtube",
    },
  });

  console.log("Seed complete: people, programs, locations, stories, faqs, media assets.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
