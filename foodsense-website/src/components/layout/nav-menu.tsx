"use client";

import * as React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Services",
    href: "#services",
  },
  {
    title: "Testimonials",
    href: "#testimonials",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

export function NavMenu() {
  return (
    <NavigationMenu.Root className="relative z-10">
      <NavigationMenu.List className="flex flex-row gap-1 p-2">
        {menuItems.map((item) => (
          <NavigationMenu.Item key={item.title}>
            <a
              href={item.href}
              className={cn(
                "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2",
                "text-primary font-bold hover:bg-secondary/10",
                "focus:outline-none focus-visible:ring focus-visible:ring-primary/20",
                "disabled:pointer-events-none disabled:opacity-50",
                "dark:hover:bg-secondary-dark/20"
              )}
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(item.href);
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {item.title}
            </a>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
