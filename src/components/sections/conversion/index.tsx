import { ConversionHero } from "./hero";
import { ConversionAuthority } from "./authority";
import { ConversionPillars } from "./pillars";
import { ConversionMenu } from "./menu";
import { ConversionVendors } from "./vendors";
import { ConversionContact } from "./contact";
import { getConversionHomepage } from "@/lib/contentful/conversion";

export async function ConversionHome() {
  const page = await getConversionHomepage();

  return (
    <>
      <ConversionHero data={page.hero} />
      <ConversionAuthority data={page.authority} />
      <ConversionPillars pillars={page.pillars} />
      <ConversionMenu items={page.menuItems} />
      <ConversionVendors vendors={page.vendors} />
      <ConversionContact data={page.contact} />
    </>
  );
}
