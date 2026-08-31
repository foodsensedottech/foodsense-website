/**
 * Phase 1.3 — Lean conversion homepage model (4 types).
 * @see docs/website-2.0/contentful.md
 */
module.exports = function migration(migration) {
  const pillar = migration
    .createContentType("conversionPillar")
    .name("Conversion Pillar")
    .description("Core pillar card for Website 2.0 conversion homepage")
    .displayField("title");

  pillar
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true);
  pillar
    .createField("body")
    .name("Body")
    .type("Text")
    .required(true);
  pillar
    .createField("lucideIcon")
    .name("Lucide Icon")
    .type("Symbol")
    .required(false);

  const menuItem = migration
    .createContentType("conversionMenuItem")
    .name("Conversion Menu Item")
    .description("Specialized menu accordion row for Website 2.0 homepage")
    .displayField("title");

  menuItem
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true);
  menuItem
    .createField("body")
    .name("Body")
    .type("Text")
    .required(true);

  const vendor = migration
    .createContentType("conversionVendor")
    .name("Conversion Vendor")
    .description("Partner / vendor logo cloud entry")
    .displayField("name");

  vendor
    .createField("name")
    .name("Name")
    .type("Symbol")
    .required(true);
  vendor
    .createField("logo")
    .name("Logo")
    .type("Link")
    .linkType("Asset")
    .required(false);

  const homepage = migration
    .createContentType("conversionHomepage")
    .name("Conversion Homepage")
    .description("Single Website 2.0 conversion homepage entry")
    .displayField("heroHeading");

  homepage
    .createField("heroHeading")
    .name("Hero Heading")
    .type("Symbol")
    .required(true);
  homepage
    .createField("heroSubheading")
    .name("Hero Subheading")
    .type("Text")
    .required(true);
  homepage
    .createField("heroCta")
    .name("Hero CTA")
    .type("Symbol")
    .required(true);
  homepage
    .createField("heroImage")
    .name("Hero Image")
    .type("Link")
    .linkType("Asset")
    .required(false);

  homepage
    .createField("authorityBody")
    .name("Authority Body")
    .type("Text")
    .required(true);
  homepage
    .createField("founderLabel")
    .name("Founder Label")
    .type("Symbol")
    .required(true);
  homepage
    .createField("founderWins")
    .name("Founder Wins")
    .type("Text")
    .required(true);
  homepage
    .createField("founderImage")
    .name("Founder Image")
    .type("Link")
    .linkType("Asset")
    .required(false);

  homepage
    .createField("pillars")
    .name("Pillars")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["conversionPillar"] }],
    })
    .required(false);

  homepage
    .createField("menuItems")
    .name("Menu Items")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["conversionMenuItem"] }],
    })
    .required(false);

  homepage
    .createField("vendors")
    .name("Vendors")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["conversionVendor"] }],
    })
    .required(false);

  homepage
    .createField("contactHeading")
    .name("Contact Heading")
    .type("Symbol")
    .required(true);
  homepage
    .createField("contactSubheading")
    .name("Contact Subheading")
    .type("Text")
    .required(true);
  homepage
    .createField("contactResponseNote")
    .name("Contact Response Note")
    .type("Symbol")
    .required(true);
  homepage
    .createField("contactCtaLabel")
    .name("Contact CTA Label")
    .type("Symbol")
    .required(true);

  homepage
    .createField("chromeCtaLabel")
    .name("Chrome CTA Label")
    .type("Symbol")
    .required(false);
  homepage
    .createField("navAuthority")
    .name("Nav Authority")
    .type("Symbol")
    .required(false);
  homepage
    .createField("navPillars")
    .name("Nav Pillars")
    .type("Symbol")
    .required(false);
  homepage
    .createField("navMenu")
    .name("Nav Menu")
    .type("Symbol")
    .required(false);
  homepage
    .createField("navPartners")
    .name("Nav Partners")
    .type("Symbol")
    .required(false);
  homepage
    .createField("navContact")
    .name("Nav Contact")
    .type("Symbol")
    .required(false);
};
