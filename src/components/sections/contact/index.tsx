import * as React from "react";
import { ContactForm } from "./contact-form";
import { semanticConfig } from "@/lib/utils";
import type { ContactSectionCopy } from "@/lib/contentful/types";

interface ContactSectionProps {
  copy?: ContactSectionCopy | null;
}

export function ContactSection({ copy }: ContactSectionProps) {
  const title = copy?.heading;
  const subtitle = copy?.subheading;

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
        <ContactForm
          submitLabel={copy?.submitLabel}
          submittingLabel={copy?.submittingLabel}
          successMessage={copy?.successMessage}
          errorMessage={copy?.errorMessage}
        />
      </div>
    </section>
  );
}

export { ContactForm };
