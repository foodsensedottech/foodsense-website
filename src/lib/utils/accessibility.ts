export const a11yConfig = {
  skipLinks: [
    { id: 'main-content', label: 'Skip to main content' },
    { id: 'nav', label: 'Skip to navigation' },
  ],
  ariaLabels: {
    nav: 'Main',
    search: 'Search',
    menuButton: 'Toggle menu',
  },
  roles: {
    banner: 'banner',
    main: 'main',
    navigation: 'navigation',
    footer: 'contentinfo',
  },
};

export function getAriaLabel(key: keyof typeof a11yConfig.ariaLabels): string {
  return a11yConfig.ariaLabels[key];
} 