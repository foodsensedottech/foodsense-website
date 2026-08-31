import type { ConversionHomepage } from "@/lib/content/conversion-seed";
import { ContactForm } from "@/components/sections/contact/contact-form";

interface Props {
  data: ConversionHomepage["contact"];
}

export function ConversionContact({ data }: Props) {
  return (
    <section id="contact-section" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <ContactForm
          variant="homepage"
          formId="homepage_contact_form"
          heading={data.heading}
          subheading={data.subheading}
          responseNote={data.responseNote}
          submitLabel={data.ctaLabel}
        />
      </div>
    </section>
  );
}
