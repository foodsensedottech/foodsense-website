/**
 * Canonical /services copy. Seeded to `services` or `servicesPage` + linked
 * `conversionMenuItem`s.
 * Keep aligned with docs/brand/03-services.md.
 */
export type ServicesCard = {
  title: string;
  body: string;
};

export type ServicesPageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  modes: ServicesCard[];
  capabilitiesEyebrow: string;
  capabilitiesHeading: string;
  capabilities: ServicesCard[];
  notHeading: string;
  notItems: string[];
  ctaHeading: string;
  ctaBody: string;
  ctaLabel: string;
};

export const servicesPageCopy: ServicesPageCopy = {
  metaTitle: "Services",
  metaDescription:
    "Advisory, fractional work, and project management for POS, kiosk, delivery, loyalty, and data — for 10+ unit QSR and franchise operators.",
  eyebrow: "How we engage",
  heading: "Advisory, Fractional, Project.",
  intro:
    "FoodSense is a focused consultancy at the gap between restaurant technology and restaurant operations. We work with multi-unit, multi-brand franchisees in the US, LATAM, and the Caribbean — operators, ops, technology, and heads of digital channels. We guide the teams you already have. We do not become extra FTE, and we do not sell a platform. Advisory, then Fractional or Project. Test, prove, scale.",
  modes: [
    {
      title: "Advisory",
      body: "For the decision-maker at 10+ units who needs the gap named and a sequence for what to standardize. We name what is fractured and guide the teams that already exist.",
    },
    {
      title: "Fractional work",
      body: "Embedded leadership cadence without another FTE. Roadmap ownership, vendor relationships, and decision support beside the operator's clock.",
    },
    {
      title: "Project management",
      body: "Bounded initiatives with a clear start and end — RFP, cutover, kiosk program, migration. Scoped deliverables and milestones.",
    },
  ],
  capabilitiesEyebrow: "Capabilities",
  capabilitiesHeading: "What those modes cover",
  capabilities: [
    {
      title: "POS Migration for Multi-Unit Operations",
      body: "We sequence vendor selection, market pilots, and overnight cutover so the new POS lands while kitchens keep ticket times and stores stay open.",
    },
    {
      title: "Kiosk Programs Your Store Team Can Run",
      body: "We connect kiosk, POS, and kitchen display, then stay with local IT through activation so a rush of digital tickets does not stall the prep line.",
    },
    {
      title: "Loyalty the Store and the App Can Both Run",
      body: "We connect offers, POS, and the cashier playbook before you scale loyalty across brands and markets.",
    },
    {
      title: "Delivery Volume the Kitchen Can Fulfill",
      body: "Marketplace and first-party orders hit the same line. We set what each store can take, then hold vendors and the promo calendar to that limit.",
    },
    {
      title: "Kitchen Management and IoT",
      body: "Kitchen display, production, and sensors for cook time and food safety where they earn their place in the store.",
    },
    {
      title: "Reporting Operators and Digital Leads Can Share",
      body: "We define the numbers the franchisee, ops, and head of digital will use at period close, so markets are not reconciling three dashboards after every cycle.",
    },
    {
      title: "Digital Strategy and Roadmapping",
      body: "Multi-year technology roadmaps tied to store growth and channel mix, with a sequence the existing team can run.",
    },
    {
      title: "Vendor Accountability Across Every Store",
      body: "We run the RFP, debug live setups, and keep brand leads and regional vendors on a schedule. You stop funding software that never made it past the pilot.",
    },
  ],
  notHeading: "What we don't do",
  notItems: [
    "Software product development — we architect and guide; we do not ship a platform",
    "Brand or marketing strategy",
    "Single-unit independents",
    "Hardware procurement",
    "Help desk / managed services",
    "Strategy decks with no execution path",
  ],
  ctaHeading: "Book a Strategy Audit",
  ctaBody:
    "Operators, ops, technology, heads of digital. Tell us where the vendor roadmap and the stores have stopped lining up.",
  ctaLabel: "Book a Strategy Audit",
};
