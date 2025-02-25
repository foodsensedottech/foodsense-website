"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { smoothScrollToSection } from "@/lib/utils";

interface NavigationItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  items: NavigationItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Only handle hash links
    if (href.includes("#")) {
      e.preventDefault();
      const sectionId = href.split("#")[1];
      smoothScrollToSection(sectionId);
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="md:hidden flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-yellow-400"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="text-yellow-400"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 border-t border-[#1e3a5f]/10">
          <div className="absolute inset-0 bg-[#1e3a5f]/80 backdrop-blur-sm" />
          <nav className="relative container py-4 flex flex-col space-y-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-yellow-400 font-semibold hover:text-yellow-400/80 transition-colors"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
