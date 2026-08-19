import * as React from "react";
import { ContactForm } from "./contact-form";
import { semanticConfig } from "@/lib/utils";
import type { FranchiseeTitleEntry } from "@/lib/contentful/types";

interface ContactSectionProps {
  heading?: FranchiseeTitleEntry | null;
}

export function ContactSection({ heading }: ContactSectionProps) {
  const title = heading?.fields?.heading;
  const subtitle = heading?.fields?.subheading;

  return (
    <section id={semanticConfig.sections.contact} className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {title ? (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            {subtitle ? (
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            ) : null}
          </div>
        ) : null}
        <ContactForm />
      </div>
    </section>
  );
}

export { ContactForm };
