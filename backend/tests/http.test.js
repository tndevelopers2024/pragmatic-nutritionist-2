import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { app } from '../src/app.js'

let server, base
before(async () => {
  server = createServer(app)
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  base = `http://127.0.0.1:${server.address().port}`
})
after(async () => { await new Promise(resolve => server.close(resolve)) })

test('standalone backend exposes health and JSON errors without serving frontend files', async () => {
  const health = await fetch(`${base}/api/health`)
  assert.equal(health.status, 200)
  assert.deepEqual(await health.json(), { ok: true })
  for (const path of ['/admin', '/src/server.js', '/api/unknown']) {
    const missing = await fetch(`${base}${path}`)
    assert.equal(missing.status, 404)
    assert.deepEqual(await missing.json(), { error: 'Endpoint not found.' })
  }
})
test('mail requests are parsed and bounded without sending mail for invalid input', async () => {
  const method = await fetch(`${base}/api/send-mail`)
  assert.equal(method.status, 405)
  const invalid = await fetch(`${base}/api/send-mail`, { method: 'POST', body: '{' })
  assert.equal(invalid.status, 400)
  const oversized = await fetch(`${base}/api/send-mail`, {
    method: 'POST', body: JSON.stringify({ message: 'a'.repeat(64_001) })
  })
  assert.equal(oversized.status, 413)
})
