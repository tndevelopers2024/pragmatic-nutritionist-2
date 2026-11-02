import test from 'node:test'
import assert from 'node:assert/strict'
import { cleanContent, normalizePost, slugify, isPublished } from '../../src/cms/content.js'
import { hashPassword, verifyPassword } from '../../src/cms/auth.js'

const body = {
  title: 'A practical guide',
  categorySlug: 'gut-health',
  status: 'draft',
  contentHtml: '<p>A useful article with practical advice for readers and their families.</p>'
}
test('content removes executable HTML and unsafe images and generates unique heading IDs', () => {
  const result = cleanContent(
    '<script>alert(1)</script><h2>Start here</h2><h2>Start here</h2><a href="javascript:alert(1)" onclick="bad()">Read</a><img src="data:text/html,bad" onerror="bad()"><p>Helpful content</p>'
  )
  assert.doesNotMatch(result.contentHtml, /script|onclick|onerror|javascript:|data:text/)
  assert.deepEqual(
    result.headings.map((h) => h.id),
    ['start-here', 'start-here-2']
  )
  assert.ok(result.wordCount > 0)
})
test('normalization derives excerpt and reading time and requires real publish content', () => {
  const post = normalizePost({ ...body, status: 'published', tags: ['Fibre', 'Fibre'] })
  assert.equal(post.slug, 'a-practical-guide')
  assert.equal(
    post.excerpt,
    'A useful article with practical advice for readers and their families.'
  )
  assert.deepEqual(post.tags, ['Fibre'])
  assert.throws(
    () => normalizePost({ ...body, status: 'published', contentHtml: '<p>Too short</p>' }),
    /content/
  )
  assert.throws(
    () => normalizePost({ ...body, status: 'scheduled', publishedAt: 'invalid' }),
    /publishing status/
  )
  assert.throws(() => normalizePost({ ...body, categorySlug: 'anything' }), /category/)
  assert.equal(slugify('Food & café — a guide!'), 'food-cafe-a-guide')
})
test('only explicitly published articles are public', () => {
  assert.equal(isPublished({ status: 'published' }), true)
  assert.equal(isPublished({ status: 'draft' }), false)
  assert.equal(isPublished({ status: 'archived' }), false)
  assert.equal(isPublished({ status: 'scheduled', publishedAt: '2000-01-01T00:00:00Z' }), false)
})
test('passwords have salted hashes and constant length verification', async () => {
  const one = await hashPassword('a-long-test-password')
  const two = await hashPassword('a-long-test-password')
  assert.notEqual(one, two)
  assert.equal(await verifyPassword('a-long-test-password', one), true)
  assert.equal(await verifyPassword('wrong-password', one), false)
})
