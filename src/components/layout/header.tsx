"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { analytics } from "@/lib/analytics/tracking";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { Logo } from "@/components/ui/media/logo";
import { ctaLabel, navItems } from "@/lib/copy/site";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const ctaHref = isHomePage ? "/#contact-section" : "/contact";

  useEffect(() => {
    analytics.trackPageView(pathname);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo variant="header" />
        </Link>
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold">
          {navItems.map((item) => {
            const isActive =
              (item.href === "/about" && pathname === "/about") ||
              (item.href === "/services" && pathname === "/services") ||
              (item.href === "/contact" && pathname === "/contact");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                  isActive ? "text-foreground" : "text-foreground/60"
                }`}
                onClick={() => analytics.trackMenuInteraction(item.label)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href={ctaHref}
            className="hidden sm:inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            onClick={() => analytics.trackCTAClick("header-cta", ctaLabel)}
          >
            {ctaLabel}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
