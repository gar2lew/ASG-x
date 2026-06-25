/**
 * Australian mobile number validation and normalisation.
 * Valid formats: 04xxxxxxxx or +614xxxxxxxxx
 */

export const auMobileRegex: RegExp = /^(\+61|0)4\d{8}$/;

/**
 * Strips spaces/dashes and normalises to 04xxxxxxxx format.
 * If the number starts with +61, converts to 04xxxxxxxx format.
 * Returns the normalised string as-is even if invalid (use isValidAustralianMobile to check).
 */
export function normalizeAustralianMobile(input: string): string {
  let cleaned = input.trim().replace(/[^\d+]/g, '');

  // Convert +61 prefix to 0
  if (cleaned.startsWith('+61')) {
    cleaned = '0' + cleaned.slice(3);
  }

  return cleaned;
}

/**
 * Returns true if the number matches the Australian mobile pattern after normalisation.
 * Valid: 04xxxxxxxx (10 digits starting with 04)
 */
export function isValidAustralianMobile(input: string): boolean {
  const normalized = normalizeAustralianMobile(input);
  return auMobileRegex.test(normalized);
}
