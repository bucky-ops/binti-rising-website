import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

/**
 * Serverless bootstrap (Vercel-safe).
 *
 * On Vercel there is no persistent disk: DATABASE_URL points at an ephemeral
 * SQLite file (e.g. file:/tmp/binti.db) that starts EMPTY on every cold start.
 * `dbReady()` runs idempotent CREATE TABLE IF NOT EXISTS statements once per
 * process so form submissions always have somewhere to land - locally it is a
 * harmless no-op (tables already exist via `bun run db:push`).
 *
 * NOTE (honest limitation): the SQLite fallback on serverless is EPHEMERAL
 * (per instance, cleared between invocations/deploys). It keeps the UX working
 * and nothing crashes, but durable production storage requires the Supabase
 * keys - every route writes to Supabase first when configured. See
 * download/supabase_init.sql.
 */
const TABLE_DDL: string[] = [
  `CREATE TABLE IF NOT EXISTS "JoinRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "displayName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "area" TEXT NOT NULL,
    "phone" TEXT,
    "consentDpa" BOOLEAN NOT NULL,
    "guardianConsent" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "Complaint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reference" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "hasVoiceNote" BOOLEAN NOT NULL DEFAULT false,
    "voiceNote" TEXT,
    "status" TEXT NOT NULL DEFAULT 'received',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Complaint_reference_key" ON "Complaint"("reference")`,
  `CREATE TABLE IF NOT EXISTS "Newsletter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "consentDpa" BOOLEAN NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'footer-form',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Newsletter_email_key" ON "Newsletter"("email")`,
  `CREATE TABLE IF NOT EXISTS "PartnerInquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reference" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "role" TEXT,
    "email" TEXT NOT NULL,
    "orgType" TEXT NOT NULL,
    "interests" TEXT NOT NULL,
    "message" TEXT,
    "consentDpa" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "PartnerInquiry_reference_key" ON "PartnerInquiry"("reference")`,
  `CREATE TABLE IF NOT EXISTS "KpiMonthly" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "month" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "youthEnrolled" INTEGER NOT NULL,
    "sessionsHeld" INTEGER NOT NULL,
    "attendancePct" REAL NOT NULL,
    "referralsOpen" INTEGER NOT NULL,
    "referralsClosed" INTEGER NOT NULL,
    "wellbeingAvg" REAL NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'SSK aggregation (masked)',
    "updatedAt" DATETIME NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "KpiMonthly_month_area_key" ON "KpiMonthly"("month", "area")`,
]

let bootstrapPromise: Promise<void> | null = null

export function dbReady(): Promise<void> {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      for (const ddl of TABLE_DDL) {
        try {
          await db.$executeRawUnsafe(ddl)
        } catch {
          // Local dev: tables already exist with slightly different shape from
          // `db:push`. Harmless - never surface DDL noise to the caller.
        }
      }
    })()
  }
  return bootstrapPromise
}
