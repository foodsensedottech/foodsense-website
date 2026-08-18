"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/media/logo";
import { Linkedin, Instagram } from "lucide-react";
import { getFranchiseeCopy } from "@/lib/franchisees/copy";
import { smoothScrollToSection } from "@/lib/utils";

export function Footer() {
  const pathname = usePathname();
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const copy = getFranchiseeCopy(isSpanish ? "es" : "en");
  const homePath = isSpanish ? "/es" : "/";

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
          <div className="space-y-6">
            <Link href={homePath}>
              <div className="w-[194px] h-[194px]">
                <Logo variant="footer" />
              </div>
            </Link>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">
              {isSpanish ? "Enlaces" : "Links"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={homePath}
                  className="hover:text-yellow-400/80 transition-colors"
                >
                  {isSpanish ? "Inicio" : "Home"}
                </Link>
              </li>
              <li>
                <Link
                  href={`${homePath}#about-section`}
                  className="hover:text-yellow-400/80 transition-colors"
                  onClick={(e) =>
                    handleNavClick(e, `${homePath}#about-section`)
                  }
                >
                  {copy.navAbout}
                </Link>
              </li>
              <li>
                <Link
                  href={`${homePath}#franchisee-pains`}
                  className="hover:text-yellow-400/80 transition-colors"
                  onClick={(e) =>
                    handleNavClick(e, `${homePath}#franchisee-pains`)
                  }
                >
                  {copy.navPains}
                </Link>
              </li>
              <li>
                <Link
                  href={`${homePath}#franchisee-offers`}
                  className="hover:text-yellow-400/80 transition-colors"
                  onClick={(e) =>
                    handleNavClick(e, `${homePath}#franchisee-offers`)
                  }
                >
                  {copy.navOfferings}
                </Link>
              </li>
              <li>
                <Link
                  href={isSpanish ? "/" : "/es"}
                  className="hover:text-yellow-400/80 transition-colors"
                >
                  {isSpanish ? "English" : "Español"}
                </Link>
              </li>
              <li>
                <Link
                  href={`${homePath}#contact-section`}
                  className="hover:text-yellow-400/80 transition-colors"
                  onClick={(e) =>
                    handleNavClick(e, `${homePath}#contact-section`)
                  }
                >
                  {copy.navContact}
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
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.instagram.com/foodsense.tech/"
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
