export type ConversionPillar = {
  title: string;
  body: string;
  lucideIcon: string;
};

export type ConversionMenuItem = {
  title: string;
  body: string;
};

export type ConversionSectionChrome = {
  eyebrow?: string;
  heading: string;
};

export type ConversionHomepage = {
  hero: {
    /** Small brand / SEO label above the H1 */
    brandLabel: string;
    heading: string;
    subheading: string;
    ctaLabel: string;
    imageUrl?: string;
    imageAlt?: string;
  };
  authority: {
    eyebrow: string;
    heading: string;
    winsLabel: string;
    body: string;
    founderLabel: string;
    wins: string[];
    founderImageUrl?: string;
    founderImageAlt?: string;
  };
  pillarsSection: ConversionSectionChrome;
  pillars: ConversionPillar[];
  menuSection: ConversionSectionChrome;
  menuItems: ConversionMenuItem[];
  contact: {
    heading: string;
    subheading: string;
    responseNote: string;
    ctaLabel: string;
  };
  chrome: {
    ctaLabel: string;
    navAuthority: string;
    navPillars: string;
    navMenu: string;
    navContact: string;
    footerTagline: string;
    footerGeo: string;
    footerEmail: string;
    linkedInUrl: string;
    instagramUrl: string;
  };
};

/**
 * Canonical Website 2.0 conversion copy (Brand OS voice).
 * Keep in sync with `scripts/contentful/conversion-seed-data.mjs`.
 */
export const conversionSeed: ConversionHomepage = {
  chrome: {
    ctaLabel: "Book a Strategy Audit",
    navAuthority: "About",
    navPillars: "What We Do",
    navMenu: "Services",
    navContact: "Contact",
    footerTagline:
      "We bridge restaurant technology and restaurant operations.",
    footerGeo: "Latin America · Caribbean · United States",
    footerEmail: "fabio@foodsense.tech",
    linkedInUrl: "https://www.linkedin.com/company/foodsensedottech/",
    instagramUrl: "https://www.instagram.com/foodsense.tech/",
  },
  hero: {
    brandLabel: "Multi-unit · Multi-brand franchisees",
    heading: "We bridge restaurant technology and restaurant operations.",
    subheading:
      "FoodSense is a focused consultancy for multi-unit, multi-brand franchisees in the US, LATAM, and the Caribbean. Operators, ops leads, technology teams, and heads of digital channels hire us when the vendor roadmap and the stores have stopped speaking the same language. We sequence POS, kiosk, delivery, and data. We guide the teams you already have. Advisory, then Fractional or Project.",
    ctaLabel: "Book a Strategy Audit",
  },
  authority: {
    eyebrow: "Why FoodSense",
    heading: "We sit between the roadmap and the store.",
    winsLabel: "Work the principal has run",
    body: "If you run the stores, the ops calendar, the stack, or the digital channels, you already know the scene: corporate sent a stack, the vendors sent a deck, and Friday night still has to work. FoodSense is a boutique firm at that intersection — restaurant operations and restaurant technology — across the US, LATAM, and the Caribbean. We have sat in the 6am cutover and in the payload review. We do not sell software. We do not become another FTE. We help you sequence what you already bought, guide the team you already have, and keep the rollout honest.",
    founderLabel: "Fabio Escobar",
    wins: [
      "Led restaurant technology for KFC across 20+ countries and 2,200 restaurants in Latin America and the Caribbean",
      "Deployed POS programs across the US and Canada at Restaurant Brands International",
      "Helped shape early cloud-kitchen and delivery stacks at REEF",
      "Built vendor assessment and store-level landing playbooks for multi-unit franchisees",
    ],
  },
  pillarsSection: {
    eyebrow: "For the people who have to make it run",
    heading: "What we do in the gap",
  },
  pillars: [
    {
      title: "Full-Lifecycle Technology Rollouts Built for Kitchen Throughput",
      body: "We bridge legacy POS platforms, kiosks, and delivery apps with back-of-house kitchen displays so peak digital rushes don't turn into prep-line bottlenecks or burned-out store teams.",
      lucideIcon: "ListChecks",
    },
    {
      title: "Hands-On Rollout Support for Lean Local IT Teams",
      body: "We embed directly alongside internal store IT teams to manage vendor accountability, debug live store setups, and activate overnight rollouts—turning static strategy into reliable store execution.",
      lucideIcon: "Monitor",
    },
    {
      title: "Established Regional & Franchise Ecosystem",
      body: "We navigate complex multi-market franchise dynamics in English and Spanish, using established relationships with brand leads, master franchisees, and regional vendors to keep deployments moving on schedule.",
      lucideIcon: "Cable",
    },
  ],
  menuSection: {
    eyebrow: "Capabilities",
    heading: "Programs a multi-unit group has to get right",
  },
  menuItems: [
    {
      title: "POS Migration for Multi-Unit Operations",
      body: "We sequence vendor selection, market pilots, and overnight cutover so the new POS lands while kitchens keep ticket times and stores stay open.",
    },
    {
      title: "Kiosk Programs Your Store Team Can Run",
      body: "We connect kiosk, POS, and kitchen display, then stay with local IT through activation so a rush of digital tickets does not stall the prep line.",
    },
    {
      title: "Delivery Volume the Kitchen Can Fulfill",
      body: "Marketplace and first-party orders hit the same line. We set what each store can take, then hold vendors and the promo calendar to that limit.",
    },
    {
      title: "Vendor Accountability Across Every Store",
      body: "We run the RFP, debug live setups, and keep brand leads and regional vendors on a schedule. You stop funding software that never made it past the pilot.",
    },
    {
      title: "Loyalty the Store and the App Can Both Run",
      body: "We connect offers, POS, and the cashier playbook before you scale loyalty across brands and markets.",
    },
    {
      title: "Reporting Operators and Digital Leads Can Share",
      body: "We define the numbers the franchisee, ops, and head of digital will use at period close, so markets are not reconciling three dashboards after every cycle.",
    },
  ],
  contact: {
    heading: "Tell us where the gap is.",
    subheading:
      "Operators, ops, technology, heads of digital. One conversation. We will tell you if a Strategy Audit is the right first move, or if you already know the blocker and need a scoped engagement.",
    responseNote: "Response within 24 hours.",
    ctaLabel: "Book a Strategy Audit",
  },
};
