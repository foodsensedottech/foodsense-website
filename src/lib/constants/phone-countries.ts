import type { CountryCode } from "libphonenumber-js";

/** Markets FoodSense writes to: LATAM, Caribbean, US. */
export const PHONE_COUNTRIES: { iso: CountryCode; name: string }[] = [
  { iso: "US", name: "United States" },
  { iso: "MX", name: "Mexico" },
  { iso: "CO", name: "Colombia" },
  { iso: "BR", name: "Brazil" },
  { iso: "AR", name: "Argentina" },
  { iso: "CL", name: "Chile" },
  { iso: "PE", name: "Peru" },
  { iso: "EC", name: "Ecuador" },
  { iso: "VE", name: "Venezuela" },
  { iso: "PA", name: "Panama" },
  { iso: "CR", name: "Costa Rica" },
  { iso: "GT", name: "Guatemala" },
  { iso: "HN", name: "Honduras" },
  { iso: "SV", name: "El Salvador" },
  { iso: "NI", name: "Nicaragua" },
  { iso: "DO", name: "Dominican Republic" },
  { iso: "PR", name: "Puerto Rico" },
  { iso: "CU", name: "Cuba" },
  { iso: "HT", name: "Haiti" },
  { iso: "JM", name: "Jamaica" },
  { iso: "TT", name: "Trinidad and Tobago" },
  { iso: "BB", name: "Barbados" },
  { iso: "BS", name: "Bahamas" },
  { iso: "GY", name: "Guyana" },
  { iso: "SR", name: "Suriname" },
  { iso: "BO", name: "Bolivia" },
  { iso: "PY", name: "Paraguay" },
  { iso: "UY", name: "Uruguay" },
  { iso: "BZ", name: "Belize" },
  { iso: "LC", name: "Saint Lucia" },
  { iso: "GD", name: "Grenada" },
  { iso: "AG", name: "Antigua and Barbuda" },
  { iso: "CA", name: "Canada" },
];

export const DEFAULT_PHONE_COUNTRY: CountryCode = "US";

export function flagEmoji(iso: string): string {
  return iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
