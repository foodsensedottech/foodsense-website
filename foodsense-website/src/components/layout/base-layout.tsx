"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Dynamically import components to avoid hydration issues
const DynamicHeader = dynamic(() => import("@/components/layout/header").then(mod => mod.Header), {
  ssr: true,
});

const DynamicFooter = dynamic(() => import("@/components/layout/footer").then(mod => mod.Footer), {
  ssr: true,
});

interface BaseLayoutProps {
  children: React.ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <DynamicHeader />
      <main className="flex-grow">{children}</main>
      <DynamicFooter />
    </div>
  );
}
