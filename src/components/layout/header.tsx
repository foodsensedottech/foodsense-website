"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Loyalty", href: "#loyalty" },
  { name: "Contact", href: "#contact" }
];

const menuItemVariants = {
  closed: { opacity: 0, x: -10 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: "easeOut"
    }
  })
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "transition-colors duration-200",
        isScrolled
          ? "bg-white dark:bg-blue-900/50 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-secondary dark:text-white text-xl">
          FoodSense
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu.Root className="hidden md:block">
          <NavigationMenu.List className="flex space-x-8">
            {navigation.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-secondary/80 dark:text-white/80",
                      "hover:text-secondary dark:hover:text-white",
                      "transition-colors text-sm"
                    )}
                  >
                    {item.name}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Desktop CTA and Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="#contact"
            className={cn(
              "bg-primary text-secondary px-4 py-2 rounded-md",
              "text-sm font-medium hover:bg-primary/90 transition-colors"
            )}
          >
            🚀 Get Free Growth Audit
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2 relative w-10 h-10 group">
                <div className="flex flex-col justify-center items-center w-full h-full">
                  <span 
                    className={cn(
                      "w-6 h-0.5 bg-secondary dark:bg-white rounded-full transition-all duration-300 ease-out",
                      "absolute",
                      isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                    )}
                  />
                  <span 
                    className={cn(
                      "w-6 h-0.5 bg-secondary dark:bg-white rounded-full transition-all duration-300 ease-out",
                      "absolute",
                      isOpen ? "opacity-0" : "opacity-100"
                    )}
                  />
                  <span 
                    className={cn(
                      "w-6 h-0.5 bg-secondary dark:bg-white rounded-full transition-all duration-300 ease-out",
                      "absolute",
                      isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                    )}
                  />
                </div>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {isMounted && (
                  <AnimatePresence mode="wait">
                    {isOpen && (
                      <>
                        {navigation.map((item, i) => (
                          <motion.div
                            key={item.href}
                            custom={i}
                            variants={menuItemVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                          >
                            <Link
                              href={item.href}
                              className="text-lg font-medium text-secondary dark:text-white hover:text-primary transition-colors block"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </motion.div>
                        ))}
                        <motion.div
                          variants={menuItemVariants}
                          custom={navigation.length}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          <Link
                            href="#contact"
                            className={cn(
                              "bg-primary text-secondary px-4 py-2 rounded-md",
                              "text-sm font-medium hover:bg-primary/90 transition-colors",
                              "text-center mt-4 block w-full"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            🚀 Get Free Growth Audit
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
} 