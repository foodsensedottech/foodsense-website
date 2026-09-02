import { ConversionHero } from "./hero";
import { ConversionAuthority } from "./authority";
import { ConversionPillars } from "./pillars";
import { ConversionMenu } from "./menu";
import { ConversionContact } from "./contact";
import { getConversionHomepage } from "@/lib/contentful/conversion";

export async function ConversionHome() {
  const page = await getConversionHomepage();

  return (
    <>
      <ConversionHero data={page.hero} />
      <ConversionAuthority data={page.authority} />
      <ConversionPillars section={page.pillarsSection} pillars={page.pillars} />
      <ConversionMenu section={page.menuSection} items={page.menuItems} />
      <ConversionContact data={page.contact} />
    </>
  );
}
