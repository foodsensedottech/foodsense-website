/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://foodsense.tech',
  generateRobotsTxt: false, // We're managing robots.txt manually
  exclude: ['/ui-showcase', '/franchisees', '/es/franchisees'],
  generateIndexSitemap: false,
  outDir: 'public',
} 