/**
 * Captures UTM parameters from the current URL's search params.
 * Only includes keys that are present in the URL.
 * Maps snake_case URL params to camelCase keys.
 */
export function captureUtmParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const mapping: Record<string, string> = {
    utm_source: 'utmSource',
    utm_medium: 'utmMedium',
    utm_campaign: 'utmCampaign',
    utm_content: 'utmContent',
    utm_term: 'utmTerm',
  };

  const result: Record<string, string> = {};

  for (const [urlKey, camelKey] of Object.entries(mapping)) {
    const value = params.get(urlKey);
    if (value) {
      result[camelKey] = value;
    }
  }

  return result;
}
