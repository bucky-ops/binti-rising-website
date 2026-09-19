"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

/**
 * ThemeToggle - light (brand cream) ⇄ dark ("Nairobi Midnight").
 * useSyncExternalStore-based mount guard (no setState-in-effect) to avoid
 * SSR hydration mismatch with next-themes.
 * `withLabel` renders a labelled pill (mobile sheet); default is icon-only.
 */
export function ThemeToggle({ withLabel = false, className }: { withLabel?: boolean; className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isDark = mounted && resolvedTheme === "dark";

  if (withLabel) {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
        className={cn(
          "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-binti/30 bg-binti-card px-4 text-sm font-bold text-binti-ink transition hover:border-binti focus-visible:outline-2 focus-visible:outline-binti",
          className
        )}
      >
        {isDark ? <Sun className="size-4.5 text-binti-amber" aria-hidden="true" /> : <Moon className="size-4.5 text-binti" aria-hidden="true" />}
        {isDark ? "Light mode" : "Dark mode"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center rounded-full border border-binti/30 bg-binti-card/80 text-binti-slate shadow-sm backdrop-blur transition hover:border-binti/60 hover:text-binti focus-visible:outline-2 focus-visible:outline-binti",
        className
      )}
    >
      <Sun
        className={cn(
          "absolute size-4.5 transition-all duration-300",
          isDark ? "rotate-0 scale-100 text-binti-amber" : "-rotate-90 scale-0"
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "absolute size-4.5 transition-all duration-300",
          isDark ? "rotate-90 scale-0" : "rotate-0 scale-100 text-binti dark:text-indigo-300"
        )}
        aria-hidden="true"
      />
    </button>
  );
}
