export type QuizOutcome = 'explore' | 'review' | 'not_now'

export type ScoringResponses = {
  hasSmsf: string
  superBalanceRange: string
  superBalanceType: string
  ageRange: string
  employmentStatus: string
  propertyType: string
  timeframe: string
  currentlyWithAdviser: string
}

export const outcomeMessages: Record<QuizOutcome, string> = {
  explore: 'This may be worth exploring with the right professionals.',
  review: 'Your situation needs more review before next steps.',
  not_now: 'This may not be the right pathway right now.',
}

const hasSmsfScores: Record<string, number> = {
  yes: 12,
  unsure: 7,
  no: 5,
}

const superBalanceScores: Record<string, number> = {
  'Under $100k': 0,
  '$100k-$200k': 8,
  '$200k-$300k': 15,
  '$300k-$500k': 22,
  '$500k+': 25,
  'Prefer not to say': 5,
}

const superBalanceTypeScores: Record<string, number> = {
  combined: 10,
  individual: 7,
  unsure: 4,
}

const ageRangeScores: Record<string, number> = {
  'Under 35': 5,
  '35-44': 10,
  '45-54': 12,
  '55-64': 10,
  '65+': 5,
}

const employmentStatusScores: Record<string, number> = {
  'Employed full-time': 10,
  'Employed part-time': 7,
  'Self-employed': 10,
  Retired: 4,
  Other: 4,
}

const propertyTypeScores: Record<string, number> = {
  residential: 8,
  commercial: 8,
  'not sure': 4,
}

const timeframeScores: Record<string, number> = {
  Now: 10,
  '1-3 months': 9,
  '3-6 months': 7,
  '6-12 months': 4,
  'Research only': 2,
}

const adviserScores: Record<string, number> = {
  yes: 8,
  unsure: 5,
  no: 4,
}

export function calculateQuizScore(responses: ScoringResponses): number {
  const score =
    (hasSmsfScores[responses.hasSmsf] ?? 0) +
    (superBalanceScores[responses.superBalanceRange] ?? 0) +
    (superBalanceTypeScores[responses.superBalanceType] ?? 0) +
    (ageRangeScores[responses.ageRange] ?? 0) +
    (employmentStatusScores[responses.employmentStatus] ?? 0) +
    (propertyTypeScores[responses.propertyType] ?? 0) +
    (timeframeScores[responses.timeframe] ?? 0) +
    (adviserScores[responses.currentlyWithAdviser] ?? 0)

  return Math.min(100, Math.max(0, score))
}

export function getQuizOutcome(score: number): QuizOutcome {
  if (score >= 70) return 'explore'
  if (score >= 40) return 'review'
  return 'not_now'
}
