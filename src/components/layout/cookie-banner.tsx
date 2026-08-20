"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cookieCopy } from "@/lib/copy/site";

const STORAGE_KEY = "foodsense-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "9rem";
    return () => {
      document.body.style.paddingBottom = previous;
    };
  }, [visible]);

  const setConsent = (granted: boolean) => {
    window.localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
      .gtag;
    if (typeof gtag === "function") {
      gtag("consent", "update", {
        analytics_storage: granted ? "granted" : "denied",
        ad_storage: granted ? "granted" : "denied",
      });
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] border-t bg-background p-4 shadow-sm">
      <div className="container mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium">{cookieCopy.headline}</p>
          <p className="text-sm text-muted-foreground">
            {cookieCopy.body}{" "}
            <Link href="/privacy-policy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md border px-3 py-2 text-sm"
            onClick={() => setConsent(false)}
          >
            {cookieCopy.reject}
          </button>
          <button
            type="button"
            className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
            onClick={() => setConsent(true)}
          >
            {cookieCopy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
