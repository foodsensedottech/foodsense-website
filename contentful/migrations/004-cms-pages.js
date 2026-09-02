/**
 * CMS for every live marketing route. Drop vendor logo cloud from the model
 * we seed (type may remain until deleted). Add services + franchisee pages
 * and footer fields on conversionHomepage.
 */
module.exports = function migration(migration) {
  const homepage = migration.editContentType("conversionHomepage");

  homepage
    .createField("footerTagline")
    .name("Footer Tagline")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 200 } }]);
  homepage
    .createField("footerGeo")
    .name("Footer Geography")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 120 } }]);
  homepage
    .createField("footerEmail")
    .name("Footer Email")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 120 } }]);
  homepage
    .createField("linkedInUrl")
    .name("LinkedIn URL")
    .type("Symbol")
    .required(false);
  homepage
    .createField("instagramUrl")
    .name("Instagram URL")
    .type("Symbol")
    .required(false);

  homepage.changeFieldControl("footerTagline", "builtin", "singleLine", {
    helpText: "Shown under the footer logo. Same line as the homepage H1 is fine.",
  });
  homepage.changeFieldControl("footerGeo", "builtin", "singleLine", {
    helpText: "Markets line under the tagline.",
  });

  const services = migration
    .createContentType("servicesPage")
    .name("Services Page")
    .description("Singleton /services page. Modes and capabilities link conversionMenuItem.")
    .displayField("heading");

  services.createField("metaTitle").name("Meta Title").type("Symbol").required(true);
  services.createField("metaDescription").name("Meta Description").type("Text").required(true);
  services.createField("eyebrow").name("Eyebrow").type("Symbol").required(true);
  services.createField("heading").name("Heading").type("Symbol").required(true);
  services.createField("intro").name("Intro").type("Text").required(true);
  services
    .createField("modes")
    .name("Engagement Modes")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["conversionMenuItem"] }],
    });
  services
    .createField("capabilitiesEyebrow")
    .name("Capabilities Eyebrow")
    .type("Symbol")
    .required(false);
  services
    .createField("capabilitiesHeading")
    .name("Capabilities Heading")
    .type("Symbol")
    .required(true);
  services
    .createField("capabilities")
    .name("Capabilities")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["conversionMenuItem"] }],
    });
  services.createField("notHeading").name("Not-this Heading").type("Symbol").required(true);
  services
    .createField("notItems")
    .name("Not-this Items")
    .type("Text")
    .required(true);
  services.createField("ctaHeading").name("CTA Heading").type("Symbol").required(true);
  services.createField("ctaBody").name("CTA Body").type("Text").required(true);
  services.createField("ctaLabel").name("CTA Label").type("Symbol").required(true);

  services.changeFieldControl("notItems", "builtin", "multipleLine", {
    helpText: "One item per line. What FoodSense does not do.",
  });
  services.changeFieldControl("modes", "builtin", "entryLinksEditor", {
    helpText: "Three engagement modes: Advisory, Fractional, Project.",
  });

  const franchisee = migration
    .createContentType("franchiseeLandingPage")
    .name("Franchisee Landing Page")
    .description("Singleton /franchisees (+ /es/franchisees). Localize fields for Spanish.")
    .displayField("heroHeadline");

  franchisee.createField("metaTitle").name("Meta Title").type("Symbol").required(true);
  franchisee.createField("metaDescription").name("Meta Description").type("Text").required(true);
  franchisee.createField("htmlLang").name("HTML Lang").type("Symbol").required(false);
  franchisee.createField("navLabel").name("Nav Label").type("Symbol").required(false);
  franchisee
    .createField("otherLocaleLabel")
    .name("Other Locale Label")
    .type("Symbol")
    .required(false);
  franchisee
    .createField("otherLocaleHref")
    .name("Other Locale Href")
    .type("Symbol")
    .required(false);

  franchisee.createField("heroEyebrow").name("Hero Eyebrow").type("Symbol").required(true);
  franchisee.createField("heroHeadline").name("Hero Headline").type("Text").required(true);
  franchisee
    .createField("heroSubheadline")
    .name("Hero Subheadline")
    .type("Text")
    .required(true);
  franchisee
    .createField("heroPrimaryCta")
    .name("Hero Primary CTA")
    .type("Symbol")
    .required(true);
  franchisee
    .createField("heroSecondaryCta")
    .name("Hero Secondary CTA")
    .type("Symbol")
    .required(true);
  franchisee.createField("trustMetric").name("Trust Metric").type("Text").required(false);

  franchisee.createField("painHeading").name("Pains Heading").type("Symbol").required(true);
  franchisee.createField("painIntro").name("Pains Intro").type("Text").required(true);
  franchisee
    .createField("pains")
    .name("Pain Cards")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["conversionMenuItem"] }],
    });

  franchisee.createField("offersHeading").name("Offers Heading").type("Symbol").required(true);
  franchisee.createField("offersIntro").name("Offers Intro").type("Text").required(true);
  franchisee
    .createField("offers")
    .name("Offer Cards")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["conversionMenuItem"] }],
    });

  franchisee
    .createField("assessmentHeading")
    .name("Assessment Heading")
    .type("Symbol")
    .required(true);
  franchisee
    .createField("assessmentIntro")
    .name("Assessment Intro")
    .type("Text")
    .required(true);
  franchisee
    .createField("assessmentCta")
    .name("Assessment CTA")
    .type("Symbol")
    .required(false);

  franchisee.createField("questions").name("Assessment Questions").type("Object").required(false);
  franchisee.changeFieldControl("questions", "builtin", "objectEditor", {
    helpText:
      "JSON. Do not change option value keys (1-9, us, one, …) — scoring uses them. Edit labels only.",
  });

  franchisee.createField("captureHeading").name("Capture Heading").type("Symbol").required(false);
  franchisee.createField("captureIntro").name("Capture Intro").type("Text").required(false);
  franchisee.createField("captureName").name("Capture Name Label").type("Symbol").required(false);
  franchisee.createField("captureEmail").name("Capture Email Label").type("Symbol").required(false);
  franchisee
    .createField("captureCompany")
    .name("Capture Company Label")
    .type("Symbol")
    .required(false);
  franchisee.createField("captureSubmit").name("Capture Submit").type("Symbol").required(false);
  franchisee
    .createField("captureSubmitting")
    .name("Capture Submitting")
    .type("Symbol")
    .required(false);
  franchisee.createField("captureError").name("Capture Error").type("Text").required(false);

  franchisee.createField("resultsHeading").name("Results Heading").type("Symbol").required(false);
  franchisee
    .createField("resultOptimized")
    .name("Result Band Optimized")
    .type("Text")
    .required(false);
  franchisee.createField("resultScaling").name("Result Band Scaling").type("Text").required(false);
  franchisee
    .createField("resultFragmented")
    .name("Result Band Fragmented")
    .type("Text")
    .required(false);
  franchisee.createField("resultsNextCta").name("Results Next CTA").type("Symbol").required(false);
  franchisee.createField("resultsRestart").name("Results Restart").type("Symbol").required(false);
  franchisee.createField("nextLabel").name("Next Label").type("Symbol").required(false);
  franchisee.createField("backLabel").name("Back Label").type("Symbol").required(false);

  const localizedFranchiseeFields = [
    "metaTitle",
    "metaDescription",
    "htmlLang",
    "navLabel",
    "otherLocaleLabel",
    "otherLocaleHref",
    "heroEyebrow",
    "heroHeadline",
    "heroSubheadline",
    "heroPrimaryCta",
    "heroSecondaryCta",
    "trustMetric",
    "painHeading",
    "painIntro",
    "offersHeading",
    "offersIntro",
    "assessmentHeading",
    "assessmentIntro",
    "assessmentCta",
    "questions",
    "captureHeading",
    "captureIntro",
    "captureName",
    "captureEmail",
    "captureCompany",
    "captureSubmit",
    "captureSubmitting",
    "captureError",
    "resultsHeading",
    "resultOptimized",
    "resultScaling",
    "resultFragmented",
    "resultsNextCta",
    "resultsRestart",
    "nextLabel",
    "backLabel",
  ];
  for (const fieldId of localizedFranchiseeFields) {
    franchisee.editField(fieldId).localized(true);
  }

  const menuItem = migration.editContentType("conversionMenuItem");
  menuItem.editField("title").localized(true);
  menuItem.editField("body").localized(true);
};
