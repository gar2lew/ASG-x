import type { AsgXUtmData } from '@/types/asgx'

const STORAGE_KEY = 'asgXUtmData'

const PARAM_MAP: Record<string, keyof AsgXUtmData> = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_content: 'utmContent',
  utm_term: 'utmTerm',
}

/**
 * Reads UTM parameters from the current URL and persists them.
 * Returns existing stored data if URL params are not present.
 */
export function readUtmData(): AsgXUtmData {
  if (typeof window === 'undefined') return {}

  const fromUrl = captureFromUrl()

  if (Object.keys(fromUrl).length > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl))
    return fromUrl
  }

  const stored = readStoredUtm()
  if (stored) return stored

  return {}
}

function captureFromUrl(): AsgXUtmData {
  const params = new URLSearchParams(window.location.search)
  const result: AsgXUtmData = {}

  for (const [urlKey, camelKey] of Object.entries(PARAM_MAP)) {
    const value = params.get(urlKey)
    if (value) {
      result[camelKey] = value
    }
  }

  return result
}

function readStoredUtm(): AsgXUtmData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as AsgXUtmData
    }
    return null
  } catch {
    return null
  }
}
