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
  { label: "About", href: "#about-section" },
  { label: "Services", href: "#services-section" },
  { label: "Testimonials", href: "#testimonials-section" },
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
    e.preventDefault();

    if (isHomePage) {
      // If on home page, smooth scroll to section
      const sectionId = item.href.replace("#", "");
      smoothScrollToSection(sectionId);
    } else {
      // If on other pages, navigate to home page with hash
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
          {navItems.map((item) => (
            <a
              key={item.href}
              href={isHomePage ? item.href : `/${item.href}`}
              className={`transition-colors hover:text-foreground/80 ${
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              }`}
              onClick={(e) => handleNavClick(e, item)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Button onClick={handleGetStartedClick}>Get Started</Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
