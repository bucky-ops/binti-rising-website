"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps, ReactNode } from "react";

/**
 * Brand theme provider - "Vibrant Youth (light) / Nairobi Midnight (dark)".
 * Class-based so Tailwind @custom-variant dark + .dark token flips apply.
 * defaultTheme is light (brand cream is the identity); visitors opt into dark.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider> & { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
