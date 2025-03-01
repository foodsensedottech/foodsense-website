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
  return phone.replace(/\D/g, '');
} 