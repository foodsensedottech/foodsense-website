/**
 * Formats a phone number string into (XXX) XXX-XXXX format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
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
 * ClickUp phone fields require a country code (FIELD_016 otherwise).
 * 10-digit numbers are treated as NANP (+1). Numbers that already include
 * + or another length are sent as +digits.
 */
export function toClickUpPhone(phone: string): string {
  const trimmed = phone.trim();
  const digits = parsePhoneNumber(trimmed);
  const hasPlus = trimmed.startsWith("+");

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  if (digits.length === 10 && (!hasPlus || trimmed.startsWith("+1"))) {
    return `+1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  if (hasPlus && digits.length >= 8) {
    return `+${digits}`;
  }

  if (digits.length >= 8) {
    return `+${digits}`;
  }

  return trimmed;
} 