import * as React from "react";
import { ContactForm } from "./contact-form";
import { semanticConfig } from "@/lib/utils";

export function ContactSection() {
  return (
    <section id={semanticConfig.sections.contact} className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Contact Us!</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Fill out this Form and we will be in touch with you as soon as
            possible.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

// Export both the section and the form
export { ContactForm };
