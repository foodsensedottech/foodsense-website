"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import type { SiteChromeCopy } from "@/lib/copy/resolved";

interface BaseLayoutProps {
  children: React.ReactNode;
  chrome: SiteChromeCopy;
}

export function BaseLayout({ children, chrome }: BaseLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header chrome={chrome} />
      <main className="flex-grow">{children}</main>
      <Footer chrome={chrome} />
      <CookieBanner copy={chrome} />
    </div>
  );
}
