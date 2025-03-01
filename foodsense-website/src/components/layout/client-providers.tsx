"use client";

import { AnalyticsProvider } from "@/lib/analytics";
import { Providers } from "@/app/providers";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <Providers>
      {children}
      <AnalyticsProvider />
    </Providers>
  );
}
