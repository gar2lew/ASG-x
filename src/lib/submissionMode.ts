/**
 * Submission mode selector for the ASG-x lead pipeline.
 *
 * Reads VITE_ASGX_SUBMISSION_MODE from Vite env vars.
 * Default: "mock"  -  all submissions stay in sessionStorage.
 */
export type SubmissionMode = 'mock' | 'firebase'

export function getSubmissionMode(): SubmissionMode {
  const mode = import.meta.env.VITE_ASGX_SUBMISSION_MODE

  if (mode === 'firebase') {
    return 'firebase'
  }

  return 'mock'
}

export function isMockMode(): boolean {
  return getSubmissionMode() === 'mock'
}

export function isFirebaseMode(): boolean {
  return getSubmissionMode() === 'firebase'
}
