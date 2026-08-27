import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getSiteChrome } from "@/lib/contentful/site-chrome";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export async function BaseLayout({ children }: BaseLayoutProps) {
  const chrome = await getSiteChrome();

  return (
    <div className="min-h-screen flex flex-col">
      <Header chrome={chrome} />
      <main className="flex-grow">{children}</main>
      <Footer chrome={chrome} />
    </div>
  );
}
