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

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Pains", href: "#franchisee-pains" },
  { label: "Offerings", href: "#franchisee-offers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "#contact-section" },
];

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    // Track page views
    analytics.trackPageView(pathname);
  }, [pathname]);

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
      window.location.href = `/${item.href}`;
    }

    analytics.trackMenuInteraction(item.label);
  };

  const handleGetStartedClick = () => {
    analytics.trackCTAClick("header-cta", "Get Started");
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
            const href = item.href.startsWith("#")
              ? isHomePage
                ? item.href
                : `/${item.href}`
              : item.href;
            const isActive =
              (item.href === "/about" && pathname === "/about") ||
              (item.href === "/services" && pathname === "/services");

            return item.href.startsWith("#") ? (
              <a
                key={item.href}
                href={href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={href}
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
          {pathname === "/" || pathname.includes("franchisees") ? (
            <Link
              href={pathname.startsWith("/es/") ? "/" : "/es/franchisees"}
              className="hidden sm:inline text-sm font-semibold text-foreground/70 hover:text-foreground"
            >
              {pathname.startsWith("/es/") ? "EN" : "ES"}
            </Link>
          ) : null}
          <ThemeToggle />
          <Button onClick={handleGetStartedClick}>Get Started</Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
