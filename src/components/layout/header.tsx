"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/media/logo";
import { MobileNav } from "@/components/ui/navigation/mobile-nav";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Icon } from "@/lib/icons";

const NAVIGATION_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1e3a5f]/10">
      <div className="absolute inset-0 bg-[#1e3a5f]/80 backdrop-blur-sm" />
      <div className="container flex h-16 items-center justify-between relative">
        <div className="flex items-center">
          <Link href="/" className="mr-6">
            <Logo variant="header" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-yellow-400 font-semibold hover:text-yellow-400/80 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-yellow-400"
          >
            <Icon
              name={theme === "dark" ? "sun" : "moon"}
              className="h-5 w-5"
            />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <MobileNav items={NAVIGATION_ITEMS} />
      </div>
    </header>
  );
}
