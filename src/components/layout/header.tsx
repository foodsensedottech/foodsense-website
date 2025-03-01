"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { analytics } from "@/lib/analytics/tracking";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    analytics.trackEvent("page_view", {
      event_category: "Navigation",
      event_label: pathname,
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">FoodSense</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-foreground/80 ${
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              }`}
              onClick={() => {
                analytics.trackEvent("menu_interaction", {
                  event_category: "Navigation",
                  event_label: item.label,
                  menu_item: item.label,
                  current_path: pathname,
                  target_path: item.href,
                });
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button
            onClick={() => {
              analytics.trackEvent("cta_click", {
                event_category: "CTA",
                event_label: "Get Started",
                cta_text: "Get Started",
                cta_location: "header",
              });
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
