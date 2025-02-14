'use client';

import React from 'react';
import { scrollToSection } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-600">
              FoodSense - Making healthy eating accessible to everyone.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('about')} className="text-sm text-gray-600 hover:text-gray-900">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-sm text-gray-600 hover:text-gray-900">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-sm text-gray-600 hover:text-gray-900">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: info@foodsense.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Food Street</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Add social media icons/links here */}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>© 2024 FoodSense. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 