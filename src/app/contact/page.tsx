import { BaseLayout } from "@/components/layout";
import { ContactSection } from "@/components/sections/contact";
import { getContactHeading } from "@/lib/contentful/contact";

export default async function ContactPage() {
  const heading = await getContactHeading();

  return (
    <BaseLayout>
      <ContactSection heading={heading} />
    </BaseLayout>
  );
}

export const revalidate = 3600;
