/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://www.foodsense.tech",
  generateRobotsTxt: false,
  exclude: ["/ui-showcase", "/franchisees", "/es/franchisees", "/admin", "/admin/*"],
  generateIndexSitemap: false,
  outDir: "public",
};
