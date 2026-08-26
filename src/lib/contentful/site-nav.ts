import type { SiteChrome } from "@/lib/contentful/types";

export type SiteNavItem = {
  label: string;
  href: string;
};

/** Homepage-oriented nav built from siteChrome labels. */
export function buildSiteNav(chrome: SiteChrome | null | undefined): SiteNavItem[] {
  const items: SiteNavItem[] = [
    {
      label: chrome?.navAbout || "About",
      href: "#about-section",
    },
    {
      label: chrome?.navPains || "Pains",
      href: "#franchisee-pains",
    },
    {
      label: chrome?.navOfferings || "Offerings",
      href: "#franchisee-offers",
    },
  ];

  if (chrome?.navServices) {
    items.push({ label: chrome.navServices, href: "/services" });
  }

  items.push({
    label: chrome?.navContact || "Contact",
    href: "#contact-section",
  });

  return items;
}
