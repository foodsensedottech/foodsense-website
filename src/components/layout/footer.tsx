"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/media/logo";
import { Linkedin, Instagram, Mail } from "lucide-react";
import { smoothScrollToSection } from "@/lib/utils";
import type { SiteChrome } from "@/lib/contentful/types";
import { buildSiteNav } from "@/lib/contentful/site-nav";

interface FooterProps {
  chrome?: SiteChrome | null;
}

export function Footer({ chrome = null }: FooterProps) {
  const navItems = buildSiteNav(chrome);
  const linkedIn =
    chrome?.linkedInUrl ||
    "https://www.linkedin.com/company/foodsensedottech/";
  const instagram =
    chrome?.instagramUrl || "https://www.instagram.com/foodsense.tech/";
  const contactHeading = chrome?.navContact || "Contact Us";

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.includes("#")) {
      e.preventDefault();
      const sectionId = href.split("#")[1];
      smoothScrollToSection(sectionId);
    }
  };

  return (
    <footer className="bg-[#1e3a5f] text-yellow-400">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/">
              <div className="w-[194px] h-[194px]">
                <Logo variant="footer" />
              </div>
            </Link>
            {chrome?.footerTagline ? (
              <p className="text-sm text-yellow-400/90 max-w-xs">
                {chrome.footerTagline}
              </p>
            ) : null}
            {chrome?.footerGeo ? (
              <p className="text-sm text-yellow-400/70">{chrome.footerGeo}</p>
            ) : null}
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-yellow-400/80 transition-colors"
                >
                  Home
                </Link>
              </li>
              {navItems.map((item) => {
                const href = item.href.startsWith("#")
                  ? `/${item.href}`
                  : item.href;
                return (
                  <li key={`${item.label}-${item.href}`}>
                    <Link
                      href={href}
                      className="hover:text-yellow-400/80 transition-colors"
                      onClick={(e) => handleNavClick(e, href)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Terms and Conditions", "Privacy Policy", "Accessibility"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:text-yellow-400/80 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{contactHeading}</h3>
            <div className="flex flex-col space-y-3">
              {chrome?.footerEmail ? (
                <a
                  href={`mailto:${chrome.footerEmail}`}
                  className="inline-flex items-center gap-2 hover:text-yellow-400/80 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-sm">{chrome.footerEmail}</span>
                </a>
              ) : null}
              <div className="flex space-x-4">
                <Link
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400/80 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400/80 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-400/20 mt-8 pt-6 text-center">
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} FoodSense. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
