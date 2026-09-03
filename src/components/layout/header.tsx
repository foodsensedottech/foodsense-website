"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { analytics } from "@/lib/analytics/tracking";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { Logo } from "@/components/ui/media/logo";
import { smoothScrollToSection } from "@/lib/utils";
import type { SiteChrome } from "@/lib/contentful/types";
import { buildSiteNav } from "@/lib/contentful/site-nav";

interface HeaderProps {
  chrome?: SiteChrome | null;
}

export function Header({ chrome = null }: HeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const navItems = buildSiteNav(chrome);
  const ctaLabel = chrome?.ctaLabel || "Book a Strategy Audit";

  useEffect(() => {
    analytics.trackPageView(pathname);
    document.documentElement.lang = "en";
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    label: string
  ) => {
    if (!href.startsWith("#") && !href.includes("#")) {
      analytics.trackMenuInteraction(label);
      return;
    }

    if (!href.includes("#")) {
      analytics.trackMenuInteraction(label);
      return;
    }

    const hash = href.includes("#") ? href.split("#")[1] : "";
    if (!hash) {
      analytics.trackMenuInteraction(label);
      return;
    }

    e.preventDefault();

    if (isHomePage) {
      smoothScrollToSection(hash);
    } else {
      window.location.href = `/#${hash}`;
    }

    analytics.trackMenuInteraction(label);
  };

  const handleGetStartedClick = () => {
    analytics.trackCTAClick("header-cta", ctaLabel);
    if (isHomePage) {
      smoothScrollToSection("contact-section");
    } else {
      window.location.href = "/#contact-section";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo variant="header" />
        </Link>
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold">
          {navItems.map((item) => {
            const href =
              item.href.startsWith("#") && !isHomePage
                ? `/${item.href}`
                : item.href;

            return (
              <a
                key={`${item.label}-${item.href}`}
                href={href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={(e) => handleNavClick(e, item.href, item.label)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Button
            onClick={handleGetStartedClick}
            className="rounded-md bg-brand-yellow text-brand-navy hover:bg-brand-dark-gold font-semibold"
          >
            {ctaLabel}
          </Button>
          <MobileNav chrome={chrome} />
        </div>
      </div>
    </header>
  );
}
