'use client';

export function analyzeKeywordLocations(keyword: string): Array<'title' | 'headings' | 'content' | 'meta'> {
  const locations: Array<'title' | 'headings' | 'content' | 'meta'> = [];
  const regex = new RegExp(keyword, 'gi');

  // Check title
  if (document.title.match(regex)) {
    locations.push('title');
  }

  // Check headings
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (Array.from(headings).some(h => h.textContent?.match(regex))) {
    locations.push('headings');
  }

  // Check meta description
  const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
  if (metaDesc?.match(regex)) {
    locations.push('meta');
  }

  // Check content
  const bodyText = document.body.textContent || '';
  if (bodyText.match(regex)) {
    locations.push('content');
  }

  return locations;
} 