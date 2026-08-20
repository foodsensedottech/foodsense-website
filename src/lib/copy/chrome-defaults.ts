import {
  SITE_EMAIL,
  SITE_INSTAGRAM,
  SITE_LINKEDIN,
  cookieCopy,
  ctaLabel,
  footerCopy,
  navItems,
} from "@/lib/copy/site";
import type { SiteChromeCopy } from "@/lib/copy/resolved";

export function defaultSiteChrome(): SiteChromeCopy {
  return {
    ctaLabel,
    navItems: navItems.map((item) => ({ label: item.label, href: item.href })),
    footerTagline: footerCopy.tagline,
    footerGeo: footerCopy.geo,
    footerEmail: SITE_EMAIL,
    linkedInUrl: SITE_LINKEDIN,
    instagramUrl: SITE_INSTAGRAM,
    cookieHeadline: cookieCopy.headline,
    cookieBody: cookieCopy.body,
    cookieAccept: cookieCopy.accept,
    cookieReject: cookieCopy.reject,
  };
}
