import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { symptomScore } from '../src/data/quizScore.js'

test('symptom index is rounded, bounded and gives each answer equal weight', () => {
  assert.equal(symptomScore(Array(9).fill(0)), 100)
  assert.equal(symptomScore(Array(9).fill(3)), 15)
  assert.equal(symptomScore([0, 1, 2, 3]), 58)
  assert.equal(symptomScore([3, 2, 1, 0]), 58)
})
test('invalid or absent answers do not produce a score', () => {
  for (const values of [[], [-1], [4], [1.5], [NaN], [undefined]]) assert.equal(symptomScore(values), null)
})
