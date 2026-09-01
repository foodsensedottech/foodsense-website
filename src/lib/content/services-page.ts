/**
 * /services page copy — Brand OS capabilities + three live engagement modes.
 * Not a CMS type yet (lean model). Keep aligned with docs/brand/03-services.md.
 */
export const servicesPageCopy = {
  eyebrow: "How we engage",
  heading: "Advisory, Fractional, Project.",
  intro:
    "We guide the teams you already have. We do not become extra FTE, and we do not sell a platform. Work starts as Advisory, then becomes Fractional or a bounded project. Test, prove, scale.",
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
      title: "POS & core systems",
      body: "Migration strategy, vendor evaluation, cutover planning, phased rollouts, and post-go-live stabilization (Oracle Simphony, NCR, and the rest of the core stack).",
    },
    {
      title: "Self-service & kiosks",
      body: "End-to-end kiosk program management: vendor assessment, UI alignment, POS connectivity, menu config, deployment coordination.",
    },
    {
      title: "Loyalty, CRM & guest engagement",
      body: "Platform selection and integration. Campaign architecture, API / webhook contracts, earn/burn, segmentation.",
    },
    {
      title: "Delivery & e-commerce",
      body: "First- and third-party integration, menu syndication, order routing, channel connectivity — volume without fee bleed.",
    },
    {
      title: "Kitchen management & IoT",
      body: "KDS, production management, and sensors for cook-time and food safety where they earn their place.",
    },
    {
      title: "Data & analytics",
      body: "KPI definition, cross-market reconciliation, reporting ops can run. Dashboard before the initiative.",
    },
    {
      title: "Digital strategy & roadmapping",
      body: "Multi-year tech roadmaps aligned to growth. Channel strategy and prioritization — not a deck that sits on a shelf.",
    },
    {
      title: "Vendor governance",
      body: "Risk assessments, RFPs, and performance management so you stop paying for tools that never landed in every store.",
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
  ctaBody: "Tell us the blocker — stack, cutover, or vendor.",
  ctaLabel: "Request audit",
} as const;
