declare module "next-themes" {
  import type { ReactNode } from "react";

  export interface ThemeProviderProps {
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
    forcedTheme?: string;
    storageKey?: string;
    themes?: string[];
    value?: { [key: string]: string };
    children: ReactNode;
  }

  export function ThemeProvider(props: ThemeProviderProps): JSX.Element;
  export function useTheme(): {
    theme: string | undefined;
    setTheme: (theme: string) => void;
    resolvedTheme: string | undefined;
    themes: string[];
  };
}
