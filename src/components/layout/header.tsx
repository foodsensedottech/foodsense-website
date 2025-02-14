'use client';

import React from 'react';
import { scrollToSection } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <nav className="container mx-auto">
        <ul className="flex gap-6 p-4">
          <li>
            <button className="hover:text-gray-600 transition-colors" onClick={() => scrollToSection('hero')}>
              Home
            </button>
          </li>
          <li>
            <button className="hover:text-gray-600 transition-colors" onClick={() => scrollToSection('about')}>
              About
            </button>
          </li>
          <li>
            <button className="hover:text-gray-600 transition-colors" onClick={() => scrollToSection('services')}>
              Services
            </button>
          </li>
          <li>
            <button className="hover:text-gray-600 transition-colors" onClick={() => scrollToSection('testimonials')}>
              Testimonials
            </button>
          </li>
          <li>
            <button className="hover:text-gray-600 transition-colors" onClick={() => scrollToSection('blog')}>
              Blog
            </button>
          </li>
          <li>
            <button className="hover:text-gray-600 transition-colors" onClick={() => scrollToSection('contact')}>
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
} 