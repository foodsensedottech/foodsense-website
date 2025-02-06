import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinks = {
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms & Conditions", href: "/terms" },
    { title: "Cookie Policy", href: "/cookies" },
  ],
  social: [
    { title: "Instagram", href: "https://instagram.com" },
    { title: "LinkedIn", href: "https://www.linkedin.com/company/foodsensedottech/" },
    { title: "Twitter", href: "https://twitter.com" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary dark:bg-dark border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="font-bold text-white text-xl mb-4">FoodSense</h3>
            <p className="text-white/80 text-sm">
              Empowering Independent Restaurants to Scale and Succeed
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-medium text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-white/80 hover:text-white text-sm",
                      "transition-colors"
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-medium text-white mb-4">Connect</h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-white/80 hover:text-white text-sm",
                      "transition-colors"
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={cn(
          "mt-12 pt-8 border-t border-white/10",
          "text-center text-sm text-white/60"
        )}>
          © {new Date().getFullYear()} FoodSense Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 