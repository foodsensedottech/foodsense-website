"use client";

import Link from "next/link";

export function NavMenu() {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link href="/" className="hover:text-primary">
        Home
      </Link>
      <Link href="/about" className="hover:text-primary">
        About
      </Link>
      <Link href="/services" className="hover:text-primary">
        Services
      </Link>
      <Link href="/contact" className="hover:text-primary">
        Contact
      </Link>
    </nav>
  );
} 