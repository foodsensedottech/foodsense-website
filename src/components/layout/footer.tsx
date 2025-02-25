"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/media/logo";
import { Icon } from "@/lib/ui-icons";
import { smoothScrollToSection } from "@/lib/utils";

export function Footer() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Only handle hash links
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
          {/* Logo and Tagline */}
          <div className="space-y-6">
            <Link href="/">
              <div className="w-[194px] h-[194px]">
                <Logo variant="footer" />
              </div>
            </Link>
          </div>

          {/* Quick Links */}
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
              <li>
                <Link
                  href="/#about-section"
                  className="hover:text-yellow-400/80 transition-colors"
                  onClick={(e) => handleNavClick(e, "/#about-section")}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#services-section"
                  className="hover:text-yellow-400/80 transition-colors"
                  onClick={(e) => handleNavClick(e, "/#services-section")}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials-section"
                  className="hover:text-yellow-400/80 transition-colors"
                  onClick={(e) => handleNavClick(e, "/#testimonials-section")}
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact-section"
                  className="hover:text-yellow-400/80 transition-colors"
                  onClick={(e) => handleNavClick(e, "/#contact-section")}
                >
                  Contact Us
                </Link>
              </li>
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
                href="https://www.linkedin.com/company/foodsensedottech/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400/80 transition-colors"
              >
                <Icon name="linkedin" className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.instagram.com/foodsense.tech/"
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

        {/* Copyright Statement */}
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
