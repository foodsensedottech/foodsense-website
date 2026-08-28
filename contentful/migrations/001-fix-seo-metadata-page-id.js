/**
 * Phase 1.2 — Replace closed pageId enum with free unique slug.
 * @see docs/website-2.0/assessment.md §4.4
 */
module.exports = function migration(migration) {
  const seo = migration.editContentType("seoMetadata");
  seo.editField("pageId").required(true).validations([{ unique: true }]);
};
