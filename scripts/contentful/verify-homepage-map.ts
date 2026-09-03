/**
 * Fixture test: owner conversionHomepage JSON field IDs (no footer, vendors present).
 * Run: npx tsx scripts/contentful/verify-homepage-map.ts
 */
import { mapConversionHomepageFields } from "../../src/lib/contentful/conversion-map";

const fields = {
  heroBrandLabel: "Multi-unit · Multi-brand franchisees",
  heroHeading: "We bridge restaurant technology and restaurant operations.",
  heroSubheading: "FoodSense is a focused consultancy for multi-unit, multi-brand franchisees.",
  heroCta: "Book a Strategy Audit",
  authorityEyebrow: "Why FoodSense",
  authorityHeading: "We sit between the roadmap and the store.",
  authorityWinsLabel: "Work the principal has run",
  authorityBody: "If you run the stores, the ops calendar, the stack, or the digital channels.",
  founderLabel: "Fabio Escobar",
  founderWins:
    "Led restaurant technology for KFC\nDeployed POS programs at Restaurant Brands International",
  pillarsEyebrow: "For the people who have to make it run",
  pillarsHeading: "What we do in the gap",
  menuEyebrow: "Capabilities",
  menuHeading: "Programs a multi-unit group has to get right",
  contactHeading: "Tell us where the gap is.",
  contactSubheading: "Operators, ops, technology, heads of digital.",
  contactResponseNote: "Response within 24 hours.",
  contactCtaLabel: "Book a Strategy Audit",
  chromeCtaLabel: "Book a Strategy Audit",
  navAuthority: "About",
  navPillars: "What We Do",
  navMenu: "Services",
  navContact: "Contact",
  pillars: [
    {
      fields: {
        title: "Full-Lifecycle Technology Rollouts Built for Kitchen Throughput",
        body: "We bridge legacy POS platforms, kiosks, and delivery apps.",
        lucideIcon: "ListChecks",
      },
    },
  ],
  menuItems: [
    {
      fields: {
        title: "POS Migration for Multi-Unit Operations",
        body: "We sequence vendor selection, market pilots, and overnight cutover.",
      },
    },
  ],
  vendors: [{ fields: { name: "SHOULD-NOT-APPEAR" } }],
  navPartners: "Vendors",
  partnersHeading: "Trusted Integration Partners",
};

const page = mapConversionHomepageFields(fields);
const failures: string[] = [];

function eq(label: string, actual: string, expected: string) {
  if (actual !== expected) {
    failures.push(`${label}: ${JSON.stringify(actual)} !== ${JSON.stringify(expected)}`);
  }
}

eq("hero.heading", page.hero.heading, fields.heroHeading);
eq("hero.cta", page.hero.ctaLabel, "Book a Strategy Audit");
eq("chrome.nav", page.chrome.navPillars, "What We Do");
eq("contact.heading", page.contact.heading, fields.contactHeading);
eq("footer seed", page.chrome.footerTagline, "We bridge restaurant technology and restaurant operations.");
eq("pillar", page.pillars[0].title, fields.pillars[0].fields.title);
eq("menu", page.menuItems[0].title, fields.menuItems[0].fields.title);

const serialized = JSON.stringify(page);
if (serialized.includes("SHOULD-NOT-APPEAR")) {
  failures.push("vendor name leaked into mapped homepage");
}
if (serialized.includes("Trusted Integration Partners")) {
  failures.push("partners heading leaked into mapped homepage");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("conversionHomepage field IDs map. Vendors ignored. Footer falls back to seed.");
