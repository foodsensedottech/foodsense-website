export type ConversionPillar = {
  title: string;
  body: string;
  lucideIcon: string;
};

export type ConversionMenuItem = {
  title: string;
  body: string;
};

export type ConversionVendor = {
  name: string;
  logoUrl?: string;
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
  partnersSection: ConversionSectionChrome;
  vendors: ConversionVendor[];
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
    navPartners: string;
    navContact: string;
    footerTagline: string;
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
    navPartners: "Vendors",
    navContact: "Contact",
    footerTagline:
      "We bridge restaurant technology and restaurant operations.",
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
    heading: "The stack you already have. In the order the store can absorb.",
  },
  menuItems: [
    {
      title: "POS & core systems — migration without downtime theater",
      body: "The system the store actually runs on. We help operators, ops, and technology choose, cut over, and stabilize POS so the ticket, the kitchen, and the guest path agree.",
    },
    {
      title: "Kiosk & self-service — program management end to end",
      body: "Kiosk only pays off when the menu, the labor plan, and the kitchen ticket agree. We treat it as an operations project with a screen on it, not a hardware drop.",
    },
    {
      title: "Delivery & e-commerce — volume without fee bleed",
      body: "First-party and marketplace orders hitting one kitchen. We sit with ops and the head of digital channels so the store can fulfill what the app promised.",
    },
    {
      title: "Vendor governance — who stays and who goes",
      body: "You already bought more than you can land. We run the RFP, the risk call, and the performance review so technology and ops stop paying for tools that never made it to every store.",
    },
    {
      title: "Loyalty, CRM & guest engagement",
      body: "Points, offers, and identity only work if they survive the POS, the app, and the store playbook. We connect the program to the operation — not the other way around.",
    },
    {
      title: "Data & analytics",
      body: "One number for the operator, the ops lead, and the head of digital. We help you stop reconciling three dashboards after every period close.",
    },
  ],
  partnersSection: {
    eyebrow: "The stack",
    heading: "Vendors we have run in the field",
  },
  vendors: [
    { name: "Oracle" },
    { name: "NCR" },
    { name: "Toast" },
    { name: "Deliverect" },
    { name: "Tillster" },
    { name: "GRUBBRR" },
    { name: "HME" },
    { name: "Restaurant365" },
  ],
  contact: {
    heading: "Tell us where the gap is.",
    subheading:
      "Operators, ops, technology, heads of digital. One conversation. We will tell you if a Strategy Audit is the right first move, or if you already know the blocker and need a scoped engagement.",
    responseNote: "Response within 24 hours.",
    ctaLabel: "Book a Strategy Audit",
  },
};
