export type FranchiseeLocale = "en" | "es";

export const franchiseeCopy = {
  en: {
    htmlLang: "en",
    metaTitle: "Restaurant Tech for Multi-Unit Franchisees",
    metaDescription:
      "Next-gen restaurant technology for multi-unit franchisees across the US, Latin America, and the Caribbean. POS, kiosk, payments, and data governance at scale.",
    navLabel: "Multi-Unit",
    otherLocaleLabel: "Español",
    otherLocaleHref: "/es",
    heroEyebrow: "US · Latin America · Caribbean",
    heroHeadline: "Next-Gen Restaurant Tech for Multi-Unit Franchisees.",
    heroSubheadline:
      "We turn global enterprise strategy into scalable store-level architecture across POS, kiosk, payments, and data governance.",
    heroPrimaryCta: "Talk to Our Team",
    heroSecondaryCta: "Talk to Our Team",
    getStartedCta: "Get Started",
    navAbout: "About",
    navPains: "Pains",
    navContact: "Contact",
    trustMetric: "",
    painHeading: "What breaks when you scale past 10 units",
    painIntro:
      "Multi-unit operators need predictable execution, labor efficiency, third-party margin protection, and uniform visibility across stores.",
    pains: [
      {
        title: "Fragmented tech stacks",
        body: "Three POS versions or mismatched KDS/KMS across 15 locations. Every store becomes a one-off, and enterprise playbooks never land.",
      },
      {
        title: "Margin loss",
        body: "Un-optimized third-party delivery fees and promo spend quietly erase the profit you thought the extra volume would create.",
      },
      {
        title: "Vendor lock-in & rogue tooling",
        body: "Store GMs deploy non-compliant apps or unapproved payment processors. Corporate loses control of data, fees, and risk.",
      },
      {
        title: "No single view of the group",
        body: "Labor, sales, and menu data live in different systems per market. You cannot compare stores, and decisions lag the P&L.",
      },
    ],
    offersHeading: "Packaged systems, not general consulting",
    offersIntro:
      "Repeatable, enterprise-tested offerings built for franchisee groups running 10+ units.",
    offers: [
      {
        title: "Franchisee Tech Maturity Assessment",
        body: "A structured scorecard of tech adoption, readiness, and ROI across your locations — using the same discipline as enterprise (Yum!) playbooks.",
      },
      {
        title: "POS & Kiosk Migration Management",
        body: "Risk-controlled platform transitions, BOH integration (Restaurant365, accounting), and store training so cutover does not stall operations.",
      },
      {
        title: "Payment Lifecycle & Wallet Architecture",
        body: "Lower processing fees via RTP/FedNow rails and tighten card/POS payment workflows so every unit runs the same approved stack.",
      },
    ],
    assessmentHeading: "2-minute Technology Maturity Score",
    assessmentIntro:
      "Tell us your store count and stack. We’ll score fragmentation, delivery margin control, and payment governance — then route you to the right next step.",
    assessmentCta: "Start assessment",
    questions: {
      locations: {
        label: "How many restaurants are in the group?",
        options: [
          { value: "1-9", label: "1–9 units" },
          { value: "10-24", label: "10–24 units" },
          { value: "25-99", label: "25–99 units" },
          { value: "100+", label: "100+ units" },
        ],
      },
      region: {
        label: "Where do you operate?",
        options: [
          { value: "us", label: "United States" },
          { value: "latam", label: "Latin America" },
          { value: "caribbean", label: "Caribbean" },
          { value: "multi", label: "More than one region" },
        ],
      },
      pos: {
        label: "How many POS platforms or versions are in production?",
        options: [
          { value: "one", label: "One standard POS" },
          { value: "two", label: "Two platforms or major versions" },
          { value: "three_plus", label: "Three or more" },
        ],
      },
      kds: {
        label: "Kiosk / KDS / KMS across stores?",
        options: [
          { value: "standard", label: "Standardized across the group" },
          { value: "mixed", label: "Mixed or store-by-store" },
          { value: "none", label: "Limited or none" },
        ],
      },
      delivery: {
        label: "Who controls third-party delivery fees and promos?",
        options: [
          { value: "central", label: "Centralized for the group" },
          { value: "store", label: "Mostly store-level" },
          { value: "none", label: "Not actively managed" },
        ],
      },
      payments: {
        label: "Payment processors and wallet flows?",
        options: [
          { value: "standard", label: "One approved processor / architecture" },
          { value: "mixed", label: "Multiple processors or rogue store tools" },
          { value: "unknown", label: "Not sure / not governed" },
        ],
      },
    },
    capture: {
      heading: "See your score",
      intro: "We’ll email a copy and route 10+ unit groups to a franchisee specialist.",
      name: "Full name",
      email: "Work email",
      company: "Franchisee group or brand",
      submit: "Show my score",
      submitting: "Scoring…",
      error: "We calculated your score, but could not save the lead. You can still book a conversation.",
    },
    results: {
      heading: "Your Technology Maturity Score",
      bands: {
        optimized: "Optimized — enterprise-ready operating model",
        scaling: "Scaling — material gaps will compound with each new unit",
        fragmented: "Fragmented — store-level tools are driving the stack",
      },
      nextCta: "Book a franchisee working session",
      restart: "Retake assessment",
    },
    next: "Continue",
    back: "Back",
  },
  es: {
    htmlLang: "es",
    metaTitle: "Tecnología restaurantera para franquiciatarios multi-unidad",
    metaDescription:
      "Tecnología restaurantera de nueva generación para grupos franquiciatarios en EE.UU., Latinoamérica y el Caribe. POS, kiosco, pagos y gobierno de datos a escala.",
    navLabel: "Multi-unidad",
    otherLocaleLabel: "English",
    otherLocaleHref: "/",
    heroEyebrow: "EE.UU. · Latinoamérica · Caribe",
    heroHeadline:
      "Tecnología restaurantera de nueva generación para franquiciatarios multi-unidad.",
    heroSubheadline:
      "Convertimos la estrategia empresarial global en arquitectura escalable a nivel de tienda: POS, kiosco, pagos y gobierno de datos.",
    heroPrimaryCta: "Habla con nuestro equipo",
    heroSecondaryCta: "Habla con nuestro equipo",
    getStartedCta: "Empezar",
    navAbout: "Acerca de",
    navPains: "Retos",
    navContact: "Contacto",
    trustMetric: "",
    painHeading: "Qué se rompe al pasar de 10 unidades",
    painIntro:
      "Los operadores multi-unidad necesitan ejecución predecible, eficiencia de labor, protección de margen en delivery y visibilidad uniforme entre tiendas.",
    pains: [
      {
        title: "Stacks tecnológicos fragmentados",
        body: "Tres versiones de POS o KDS/KMS distintos en 15 sucursales. Cada tienda se vuelve un caso especial y los playbooks corporativos no aterrizan.",
      },
      {
        title: "Pérdida de margen",
        body: "Comisiones y promociones de delivery de terceros, sin optimizar, se comen la utilidad que el volumen extra debía generar.",
      },
      {
        title: "Dependencia de proveedores y herramientas no autorizadas",
        body: "Los gerentes instalan apps no conformes o procesadores de pago no aprobados. Corporativo pierde control de datos, tarifas y riesgo.",
      },
      {
        title: "Sin una vista única del grupo",
        body: "Labor, ventas y menú viven en sistemas distintos por mercado. No puedes comparar sucursales y las decisiones van detrás del P&L.",
      },
    ],
    offersHeading: "Sistemas empaquetados, no consultoría genérica",
    offersIntro:
      "Ofertas repetibles, probadas a nivel enterprise, para grupos franquiciatarios de 10+ unidades.",
    offers: [
      {
        title: "Evaluación de madurez tecnológica del franquiciatario",
        body: "Un scorecard estructurado de adopción, preparación y ROI en tus sucursales, con la misma disciplina de playbooks enterprise (Yum!).",
      },
      {
        title: "Gestión de migración de POS y kiosco",
        body: "Transiciones controladas, integración BOH (Restaurant365, contabilidad) y capacitación en tienda para que el corte no detenga la operación.",
      },
      {
        title: "Arquitectura de pagos y wallets",
        body: "Menores comisiones con rieles RTP/FedNow y flujos de pago tarjeta/POS unificados para que cada unidad opere el stack aprobado.",
      },
    ],
    assessmentHeading: "Puntaje de madurez tecnológica en 2 minutos",
    assessmentIntro:
      "Indica número de sucursales y stack. Calculamos fragmentación, control de margen de delivery y gobierno de pagos, y te canalizamos al siguiente paso.",
    assessmentCta: "Iniciar evaluación",
    questions: {
      locations: {
        label: "¿Cuántos restaurantes tiene el grupo?",
        options: [
          { value: "1-9", label: "1–9 unidades" },
          { value: "10-24", label: "10–24 unidades" },
          { value: "25-99", label: "25–99 unidades" },
          { value: "100+", label: "100+ unidades" },
        ],
      },
      region: {
        label: "¿Dónde operan?",
        options: [
          { value: "us", label: "Estados Unidos" },
          { value: "latam", label: "Latinoamérica" },
          { value: "caribbean", label: "Caribe" },
          { value: "multi", label: "Más de una región" },
        ],
      },
      pos: {
        label: "¿Cuántas plataformas o versiones de POS están en producción?",
        options: [
          { value: "one", label: "Un POS estándar" },
          { value: "two", label: "Dos plataformas o versiones mayores" },
          { value: "three_plus", label: "Tres o más" },
        ],
      },
      kds: {
        label: "¿Kiosco / KDS / KMS entre sucursales?",
        options: [
          { value: "standard", label: "Estandarizado en el grupo" },
          { value: "mixed", label: "Mixto o por tienda" },
          { value: "none", label: "Limitado o inexistente" },
        ],
      },
      delivery: {
        label: "¿Quién controla comisiones y promociones de delivery de terceros?",
        options: [
          { value: "central", label: "Centralizado para el grupo" },
          { value: "store", label: "Mayormente a nivel tienda" },
          { value: "none", label: "No se gestiona de forma activa" },
        ],
      },
      payments: {
        label: "¿Procesadores de pago y flujos de wallet?",
        options: [
          { value: "standard", label: "Un procesador / arquitectura aprobada" },
          { value: "mixed", label: "Varios procesadores o herramientas no autorizadas" },
          { value: "unknown", label: "No está claro / no hay gobierno" },
        ],
      },
    },
    capture: {
      heading: "Ver tu puntaje",
      intro:
        "Te enviamos una copia y canalizamos grupos de 10+ unidades con un especialista en franquiciatarios.",
      name: "Nombre completo",
      email: "Correo de trabajo",
      company: "Grupo franquiciatario o marca",
      submit: "Mostrar mi puntaje",
      submitting: "Calculando…",
      error:
        "Calculamos tu puntaje, pero no pudimos guardar el lead. Aún puedes agendar una conversación.",
    },
    results: {
      heading: "Tu puntaje de madurez tecnológica",
      bands: {
        optimized: "Optimizado — modelo operativo listo a nivel enterprise",
        scaling: "En escala — las brechas se multiplican con cada unidad nueva",
        fragmented: "Fragmentado — las herramientas de tienda están dictando el stack",
      },
      nextCta: "Agendar sesión de trabajo",
      restart: "Repetir evaluación",
    },
    next: "Continuar",
    back: "Atrás",
  },
} as const;

export function getFranchiseeCopy(locale: FranchiseeLocale) {
  return franchiseeCopy[locale];
}
