/**
 * Server-side Supabase REST helper (PostgREST over fetch, zero deps).
 *
 * Activation rule: the helper is INERT unless BOTH env vars are set:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 * Keys are read from process.env only (never hardcoded, .env.local is gitignored).
 *
 * Safety design:
 *  - Every call is best-effort with a 3.5s abort timeout. Callers MUST fall
 *    back to the local Prisma store when the helper returns null/false, so a
 *    slow or missing Supabase project can never take the site down.
 *  - The service-role key is used ONLY inside server routes (never shipped to
 *    the browser). RLS on the Supabase side blocks anonymous writes; reads of
 *    aggregates-only views are the only anon capability.
 */

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseConfigured = Boolean(SB_URL && SB_KEY);

function guard(ms: number) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  return { signal: c.signal, done: () => clearTimeout(t) };
}

function headers(json = false): Record<string, string> {
  const h: Record<string, string> = {
    apikey: SB_KEY as string,
    Authorization: `Bearer ${SB_KEY as string}`,
  };
  if (json) {
    h["Content-Type"] = "application/json";
    h.Prefer = "resolution=merge-duplicates,return=minimal";
  }
  return h;
}

/** SELECT from a table/view. Returns null when Supabase is not configured or unreachable. */
export async function sbSelect<T>(table: string, search: string): Promise<T[] | null> {
  if (!supabaseConfigured) return null;
  const { signal, done } = guard(3500);
  try {
    const res = await fetch(`${SB_URL}/rest/v1/${table}${search}`, {
      headers: headers(),
      signal,
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T[];
  } catch {
    return null;
  } finally {
    done();
  }
}

/** INSERT (upsert semantics). Returns false when not configured or on failure. */
export async function sbInsert(
  table: string,
  row: Record<string, unknown>
): Promise<boolean> {
  if (!supabaseConfigured) return false;
  const { signal, done } = guard(3500);
  try {
    const res = await fetch(`${SB_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: headers(true),
      body: JSON.stringify(row),
      signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    done();
  }
}
