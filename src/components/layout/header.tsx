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
import { getFranchiseeCopy } from "@/lib/franchisees/copy";

interface NavItem {
  label: string;
  href: string;
}

export function Header() {
  const pathname = usePathname();
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const copy = getFranchiseeCopy(isSpanish ? "es" : "en");
  const isHomePage = pathname === "/" || pathname === "/es";
  const homePath = isSpanish ? "/es" : "/";

  const navItems: NavItem[] = [
    { label: copy.navAbout, href: "#about-section" },
    { label: copy.navPains, href: "#franchisee-pains" },
    { label: copy.navContact, href: "#contact-section" },
  ];

  useEffect(() => {
    analytics.trackPageView(pathname);
    document.documentElement.lang = isSpanish ? "es" : "en";
  }, [pathname, isSpanish]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    if (!item.href.startsWith("#")) {
      analytics.trackMenuInteraction(item.label);
      return;
    }

    e.preventDefault();

    if (isHomePage) {
      const sectionId = item.href.replace("#", "");
      smoothScrollToSection(sectionId);
    } else {
      window.location.href = `${homePath}${item.href}`;
    }

    analytics.trackMenuInteraction(item.label);
  };

  const handleGetStartedClick = () => {
    analytics.trackCTAClick("header-cta", copy.getStartedCta);
    if (isHomePage) {
      smoothScrollToSection("contact-section");
    } else {
      window.location.href = `${homePath}#contact-section`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href={homePath} className="mr-6 flex items-center space-x-2">
          <Logo variant="header" />
        </Link>
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold">
          {navItems.map((item) => {
            const href = item.href.startsWith("#")
              ? isHomePage
                ? item.href
                : `${homePath}${item.href}`
              : item.href;

            return (
              <a
                key={item.href}
                href={href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href={isSpanish ? "/" : "/es"}
            className="hidden sm:inline text-sm font-semibold text-foreground/70 hover:text-foreground"
          >
            {isSpanish ? "EN" : "ES"}
          </Link>
          <ThemeToggle />
          <Button onClick={handleGetStartedClick}>{copy.getStartedCta}</Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
