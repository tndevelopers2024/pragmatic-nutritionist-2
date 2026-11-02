// A descriptive, unvalidated index; it is not a measure of health.
export function symptomScore(answers) {
  if (!answers.length || answers.some(value => !Number.isInteger(value) || value < 0 || value > 3)) return null
  return Math.round(100 - (answers.reduce((sum, value) => sum + value, 0) / (answers.length * 3)) * 85)
}
