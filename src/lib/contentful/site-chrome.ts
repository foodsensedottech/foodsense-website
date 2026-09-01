import { getConversionHomepage } from "@/lib/contentful/conversion";
import type { SiteChrome } from "@/lib/contentful/types";

/** Map lean conversion chrome onto the shared SiteChrome shape used by header/footer. */
export async function getSiteChrome(): Promise<SiteChrome | null> {
  try {
    const page = await getConversionHomepage();
    return {
      ctaLabel: page.chrome.ctaLabel,
      navAbout: page.chrome.navAuthority,
      navOfferings: page.chrome.navPillars,
      navServices: page.chrome.navMenu,
      navPains: page.chrome.navPartners,
      navContact: page.chrome.navContact,
      footerTagline: page.chrome.footerTagline,
      footerGeo: "Latin America · Caribbean · United States",
      footerEmail: "fabio@foodsense.tech",
      linkedInUrl: "https://www.linkedin.com/company/foodsensedottech/",
      instagramUrl: "https://www.instagram.com/foodsense.tech/",
    };
  } catch {
    return null;
  }
}
