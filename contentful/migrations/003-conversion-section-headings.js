/**
 * Add editable section eyebrows / H2s to conversionHomepage for SEO copy tuning.
 */
module.exports = function migration(migration) {
  const homepage = migration.editContentType("conversionHomepage");

  homepage
    .createField("heroBrandLabel")
    .name("Hero Brand Label")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 80 } }]);

  homepage
    .createField("authorityEyebrow")
    .name("Authority Eyebrow")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 80 } }]);
  homepage
    .createField("authorityHeading")
    .name("Authority Heading")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 120 } }]);
  homepage
    .createField("authorityWinsLabel")
    .name("Authority Wins Label")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 80 } }]);

  homepage
    .createField("pillarsEyebrow")
    .name("Pillars Eyebrow")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 80 } }]);
  homepage
    .createField("pillarsHeading")
    .name("Pillars Heading")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 120 } }]);

  homepage
    .createField("menuEyebrow")
    .name("Menu Eyebrow")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 80 } }]);
  homepage
    .createField("menuHeading")
    .name("Menu Heading")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 120 } }]);

  homepage
    .createField("partnersEyebrow")
    .name("Partners Eyebrow")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 80 } }]);
  homepage
    .createField("partnersHeading")
    .name("Partners Heading")
    .type("Symbol")
    .required(false)
    .validations([{ size: { max: 120 } }]);

  homepage.changeFieldControl("heroBrandLabel", "builtin", "singleLine", {
    helpText: "Small label above the H1 (usually the brand). SEO-tunable.",
  });
  homepage.changeFieldControl("authorityEyebrow", "builtin", "singleLine", {
    helpText: "Small uppercase label above the Authority H2.",
  });
  homepage.changeFieldControl("authorityHeading", "builtin", "singleLine", {
    helpText: "Authority section H2 — primary SEO phrase for this block.",
  });
  homepage.changeFieldControl("pillarsHeading", "builtin", "singleLine", {
    helpText: "Pillars section H2 — primary SEO phrase for this block.",
  });
  homepage.changeFieldControl("menuHeading", "builtin", "singleLine", {
    helpText: "Specialized menu section H2.",
  });
  homepage.changeFieldControl("partnersHeading", "builtin", "singleLine", {
    helpText: "Partners / logo cloud H2.",
  });
};
