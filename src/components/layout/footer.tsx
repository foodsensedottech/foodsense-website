"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/media/logo";
import { Icon } from "@/lib/icons";

export function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-yellow-400">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="space-y-6">
            <div className="w-[194px] h-[194px]">
              <Logo variant="footer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              {["About", "Services", "Testimonials", "Blog", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="hover:text-yellow-400/80 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
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

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400/80 transition-colors"
              >
                <Icon name="linkedin" className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400/80 transition-colors"
              >
                <Icon name="instagram" className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
