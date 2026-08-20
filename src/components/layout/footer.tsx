"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/media/logo";
import { Linkedin, Instagram } from "lucide-react";
import type { SiteChromeCopy } from "@/lib/copy/resolved";

export function Footer({ chrome }: { chrome: SiteChromeCopy }) {
  const {
    footerTagline,
    footerGeo,
    footerEmail,
    linkedInUrl,
    instagramUrl,
    navItems,
    ctaLabel,
  } = chrome;
  return (
    <footer className="bg-[#1e3a5f] text-yellow-400">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block w-16 h-16">
              <Logo variant="footer" />
            </Link>
            <p className="text-sm text-yellow-400/90">{footerTagline}</p>
            <p className="text-sm">{footerGeo}</p>
            <a
              href={`mailto:${footerEmail}`}
              className="text-sm underline underline-offset-4"
            >
              {footerEmail}
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-yellow-400/80 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="hover:text-yellow-400/80 transition-colors"
                >
                  {ctaLabel}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-yellow-400/80 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="hover:text-yellow-400/80 transition-colors"
                >
                  Accessibility
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-yellow-400/80 transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="flex space-x-4">
              <Link
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400/80 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href={instagramUrl}
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
