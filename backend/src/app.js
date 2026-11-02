import cms from '../api/cms.js'
import sendMail from '../api/send-mail.js'

async function readMailBody(req) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > 64_000)
      throw Object.assign(new Error('Message is too large.'), { status: 413 })
    chunks.push(chunk)
  }
  try {
    const body = JSON.parse(Buffer.concat(chunks).toString() || '{}')
    return body && typeof body === 'object' && !Array.isArray(body) ? body : {}
  } catch {
    throw Object.assign(new Error('Invalid request body.'), { status: 400 })
  }
}

export async function app(req, res) {
  res.status = (code) => { res.statusCode = code; return res }
  res.json = (value) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(value))
  }
  res.setHeader('X-Content-Type-Options', 'nosniff')
  try {
    const { pathname } = new URL(req.url, 'http://localhost')
    if (pathname === '/api/health' && req.method === 'GET')
      return res.status(200).json({ ok: true })
    if (pathname === '/api/cms') return await cms(req, res)
    if (pathname === '/api/send-mail') {
      if (req.method === 'POST') req.body = await readMailBody(req)
      return await sendMail(req, res)
    }
    return res.status(404).json({ error: 'Endpoint not found.' })
  } catch (error) {
    if (res.headersSent) return res.destroy()
    const status = error.status || 500
    return res.status(status).json({
      error: status === 500 ? 'The service could not complete this request.' : error.message
    })
  }
}
