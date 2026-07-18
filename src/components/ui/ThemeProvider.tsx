"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  [key: string]: unknown;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...(props as object)}>{children}</NextThemesProvider>;
}
