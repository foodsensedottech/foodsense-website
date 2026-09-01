import { BaseLayout } from "@/components/layout";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { getConversionHomepage } from "@/lib/contentful/conversion";

export const revalidate = 3600;

export default async function ContactPage() {
  const page = await getConversionHomepage();

  return (
    <BaseLayout>
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <ContactForm
            variant="page"
            formId="contact_page_form"
            heading={page.contact.heading}
            subheading={page.contact.subheading}
            responseNote={page.contact.responseNote}
            submitLabel={page.contact.ctaLabel}
          />
        </div>
      </section>
    </BaseLayout>
  );
}
