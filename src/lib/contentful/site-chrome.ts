import client from "@/lib/contentful/client";
import { pickString } from "@/lib/contentful/fields";
import type { SiteChrome } from "@/lib/contentful/types";

export async function getSiteChrome(): Promise<SiteChrome | null> {
  try {
    const response = await client.getEntries({
      content_type: "siteChrome",
      limit: 1,
      order: ["-sys.updatedAt"],
    });
    const item = response.items[0];
    if (!item) return null;

    const fields = (item.fields || {}) as Record<string, unknown>;

    return {
      ctaLabel: pickString(fields, ["ctaLabel", "CtaLabel"]),
      navAbout: pickString(fields, ["navAbout", "NavAbout"]),
      navPains: pickString(fields, ["navPains", "NavPains"]),
      navOfferings: pickString(fields, ["navOfferings", "NavOfferings"]),
      navServices: pickString(fields, ["navServices", "NavServices"]),
      navContact: pickString(fields, ["navContact", "NavContact"]),
      footerTagline: pickString(fields, ["footerTagline", "FooterTagline"]),
      footerGeo: pickString(fields, ["footerGeo", "FooterGeo"]),
      footerEmail: pickString(fields, ["footerEmail", "FooterEmail"]),
      linkedInUrl: pickString(fields, ["linkedInUrl", "LinkedInUrl"]),
      instagramUrl: pickString(fields, ["instagramUrl", "InstagramUrl"]),
      cookieHeadline: pickString(fields, ["cookieHeadline", "CookieHeadline"]),
      cookieBody: pickString(fields, ["cookieBody", "CookieBody"]),
      cookieAccept: pickString(fields, ["cookieAccept", "CookieAccept"]),
      cookieReject: pickString(fields, ["cookieReject", "CookieReject"]),
    };
  } catch (error) {
    console.error("Error fetching siteChrome:", error);
    return null;
  }
}
