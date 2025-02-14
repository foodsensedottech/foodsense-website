export const semanticConfig = {
  landmarks: {
    header: 'site-header',
    nav: 'site-navigation',
    main: 'main-content',
    footer: 'site-footer',
  },
  sections: {
    hero: 'hero-section',
    about: 'about-section',
    services: 'services-section',
    contact: 'contact-section',
  },
  headingLevels: {
    siteName: 1,
    pageTitle: 1,
    sectionTitle: 2,
    subsectionTitle: 3,
    cardTitle: 3,
    listTitle: 4,
  },
} as const; 