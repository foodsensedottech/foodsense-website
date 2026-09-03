import { getConversionHomepage } from "@/lib/contentful/conversion";
import type { SiteChrome } from "@/lib/contentful/types";

/** Map conversion chrome onto the shared SiteChrome shape used by header/footer. */
export async function getSiteChrome(): Promise<SiteChrome | null> {
  try {
    const page = await getConversionHomepage();
    return {
      ctaLabel: page.chrome.ctaLabel,
      navAbout: page.chrome.navAuthority,
      navOfferings: page.chrome.navPillars,
      navServices: page.chrome.navMenu,
      navContact: page.chrome.navContact,
      footerTagline: page.chrome.footerTagline,
      footerGeo: page.chrome.footerGeo,
      footerEmail: page.chrome.footerEmail,
      linkedInUrl: page.chrome.linkedInUrl,
      instagramUrl: page.chrome.instagramUrl,
    };
  } catch {
    return null;
  }
}
