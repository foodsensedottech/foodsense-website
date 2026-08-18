"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFranchiseeCopy } from "@/lib/franchisees/copy";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const copy = getFranchiseeCopy(isSpanish ? "es" : "en");
  const homePath = isSpanish ? "/es" : "/";

  const menuItems = [
    { title: isSpanish ? "Inicio" : "Home", href: homePath },
    { title: copy.navAbout, href: `${homePath}#about-section` },
    { title: copy.navPains, href: `${homePath}#franchisee-pains` },
    { title: copy.navContact, href: `${homePath}#contact-section` },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="lg:hidden rounded-md p-2 text-primary hover:bg-secondary/10 dark:hover:bg-secondary-dark/20"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-full max-w-xs",
            "bg-secondary dark:bg-secondary-dark p-6",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
            "duration-300"
          )}
        >
          <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>

          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
            <X className="h-6 w-6 text-primary" />
            <span className="sr-only">Close menu</span>
          </Dialog.Close>

          <nav className="mt-8 flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-4 py-3",
                  "text-lg font-bold text-primary",
                  "hover:bg-secondary/10 dark:hover:bg-secondary-dark/20",
                  "focus:outline-none focus-visible:ring focus-visible:ring-primary/20"
                )}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
