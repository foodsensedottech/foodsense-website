import { BaseLayout } from "@/components/layout";
import { ContactSection } from "@/components/sections/contact";
import { getContactSectionCopy } from "@/lib/contentful/contact";

export default async function ContactPage() {
  const copy = await getContactSectionCopy();

  return (
    <BaseLayout>
      <ContactSection copy={copy} />
    </BaseLayout>
  );
}

export const revalidate = 3600;
