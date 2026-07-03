export function isDemoMode(): boolean {
  return import.meta.env.VITE_ASGX_DEMO_MODE === 'true'
}

export function isDebugEnabled(): boolean {
  return import.meta.env.VITE_ASGX_ENABLE_DEBUG === 'true'
}
