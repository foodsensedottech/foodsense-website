import {
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

/**
 * Formats a phone number string into (XXX) XXX-XXXX format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

/**
 * Removes all non-digit characters from a phone number string
 */
export function parsePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * ClickUp phone fields need a country code, e.g. "+1 305 298 7934".
 */
export function toClickUpPhone(
  phone: string,
  country?: CountryCode
): string {
  const parsed =
    parsePhoneNumberFromString(phone) ||
    (country ? parsePhoneNumberFromString(phone, country) : undefined);

  if (parsed) {
    return parsed.formatInternational();
  }

  const trimmed = phone.trim();
  const digits = parsePhoneNumber(trimmed);

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `+1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  if (digits.length >= 8) {
    return trimmed.startsWith("+") ? `+${digits}` : `+${digits}`;
  }

  return trimmed;
}
