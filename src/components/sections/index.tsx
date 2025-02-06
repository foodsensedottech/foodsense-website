'use client';

import dynamic from 'next/dynamic';

export { Hero } from './hero';

export const About = dynamic(() => import('./about').then(mod => mod.default), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
  ssr: true
});

export const Services = dynamic(() => import('./services').then(mod => mod.default), {
  loading: () => <div className="min-h-[800px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
  ssr: true
});

export const Loyalty = dynamic(() => import('./loyalty').then(mod => mod.default), {
  loading: () => <div className="min-h-[700px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
  ssr: true
});

export const Contact = dynamic(() => import('./contact').then(mod => mod.default), {
  loading: () => <div className="min-h-[900px] animate-pulse bg-gray-100 dark:bg-gray-800" />,
  ssr: true
}); 