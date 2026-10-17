#!/usr/bin/env node
/**
 * Shared helper for SEO CI scripts: ensures a server is available at
 * BASE_URL (default http://localhost:3100), otherwise starts
 * `next start -p 3100` against the production build in .next.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

export const BASE_URL = process.env.BASE_URL || "http://localhost:3100";

export async function fetchWithRetry(url, opts = {}, tries = 20, delayMs = 500) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { ...opts, redirect: "manual" });
      return res;
    } catch {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error(`Could not reach ${url} after ${tries} attempts`);
}

/** Starts `next start` if nothing answers on BASE_URL. Returns a stop fn. */
export async function ensureServer() {
  const { port } = new URL(BASE_URL);
  const probing = await fetch(BASE_URL)
    .then((r) => ({ ok: true, status: r.status }))
    .catch(() => ({ ok: false }));

  if (probing.ok) {
    console.log(`[server] reusing existing server at ${BASE_URL}`);
    return () => {};
  }

  if (!existsSync(".next/BUILD_ID")) {
    console.error("[server] .next/BUILD_ID missing - run `npm run build` first.");
    process.exit(2);
  }

  console.log(`[server] starting next start on ${BASE_URL} ...`);
  const child = spawn("npx", ["next", "start", "-p", port || "3100"], {
    stdio: ["ignore", "pipe", "pipe"],
    detached: true,
  });
  child.stdout.on("data", (d) => process.env.DEBUG && process.stdout.write(`[next] ${d}`));
  child.stderr.on("data", (d) => process.env.DEBUG && process.stderr.write(`[next:err] ${d}`));

  const stop = () => {
    try {
      process.kill(-child.pid);
    } catch {
      /* already gone */
    }
  };
  process.on("exit", stop);

  await fetchWithRetry(BASE_URL, {}, 60, 500);
  console.log(`[server] ready at ${BASE_URL}`);
  return stop;
}
