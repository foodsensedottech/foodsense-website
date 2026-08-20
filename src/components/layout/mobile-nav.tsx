"use client";

import * as React from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ctaLabel, navItems } from "@/lib/copy/site";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

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
            "bg-background p-6",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
            "duration-300"
          )}
        >
          <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>

          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Dialog.Close>

          <nav className="mt-8 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center rounded-md px-4 py-3 text-lg font-semibold hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
            </Link>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
