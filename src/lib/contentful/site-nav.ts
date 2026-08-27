import type { SiteChrome } from "@/lib/contentful/types";

export type SiteNavItem = {
  label: string;
  href: string;
};

/** Conversion homepage nav built from chrome labels. */
export function buildSiteNav(chrome: SiteChrome | null | undefined): SiteNavItem[] {
  return [
    {
      label: chrome?.navAbout || "About",
      href: "#authority-section",
    },
    {
      label: chrome?.navOfferings || "What We Do",
      href: "#pillars-section",
    },
    {
      label: chrome?.navServices || "Services",
      href: "#menu-section",
    },
    {
      label: chrome?.navPains || "Partners",
      href: "#partners-section",
    },
    {
      label: chrome?.navContact || "Contact",
      href: "#contact-section",
    },
  ];
}
