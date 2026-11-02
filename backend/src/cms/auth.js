import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHash } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCallback)
export const digest = (value) => createHash('sha256').update(value).digest('hex')
const cookieName = 'pn_admin_session'
export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const key = await scrypt(password, salt, 64)
  return `${salt}:${key.toString('hex')}`
}
export async function verifyPassword(password, stored) {
  const [salt, encoded] = (stored || '').split(':')
  if (!salt || !encoded) return false
  const actual = await scrypt(password, salt, 64)
  const expected = Buffer.from(encoded, 'hex')
  return expected.length === actual.length && timingSafeEqual(actual, expected)
}
function sessionToken(req) {
  return (
    (req.headers.cookie || '')
      .split(';')
      .map((v) => v.trim())
      .find((v) => v.startsWith(`${cookieName}=`))
      ?.slice(cookieName.length + 1) || ''
  )
}
function cookie(value, maxAge) {
  return `${cookieName}=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${process.env.NODE_ENV === 'production' || process.env.VERCEL ? '; Secure' : ''}`
}
export async function createSession(db, user, res) {
  const token = randomBytes(32).toString('hex')
  await db
    .collection('sessions')
    .insertOne({
      _id: digest(token),
      userId: user._id,
      expiresAt: new Date(Date.now() + 8 * 3600_000)
    })
  res.setHeader('Set-Cookie', cookie(token, 8 * 3600))
}
export async function getUser(db, req) {
  const token = sessionToken(req)
  if (!token) return null
  const session = await db
    .collection('sessions')
    .findOne({ _id: digest(token), expiresAt: { $gt: new Date() } })
  if (!session) return null
  return db
    .collection('users')
    .findOne({ _id: session.userId }, { projection: { passwordHash: 0 } })
}
export async function logout(db, req, res) {
  await db.collection('sessions').deleteOne({ _id: digest(sessionToken(req)) })
  res.setHeader('Set-Cookie', cookie('', 0))
}
export function checkMutation(req) {
  if (!['POST', 'PUT', 'DELETE'].includes(req.method)) return
  // A custom header prevents cross-site form submissions, including login CSRF.
  if (req.headers['x-cms-request'] !== '1')
    throw Object.assign(new Error('Invalid request.'), { status: 403 })
  const origin = req.headers.origin
  const host = req.headers.host
  if (origin && new URL(origin).host !== host)
    throw Object.assign(new Error('Invalid request origin.'), { status: 403 })
  if (req.headers['sec-fetch-site'] === 'cross-site')
    throw Object.assign(new Error('Invalid request origin.'), { status: 403 })
}
export async function checkLoginRate(db, req) {
  const ip = process.env.VERCEL
    ? req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for']
    : req.socket?.remoteAddress
  const _id = digest(String(ip || 'unknown').split(',')[0])
  const collection = db.collection('loginAttempts')
  await collection.deleteOne({ _id, expiresAt: { $lte: new Date() } })
  const attempt = await collection.findOneAndUpdate(
    { _id },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(Date.now() + 15 * 60_000) } },
    { upsert: true, returnDocument: 'after' }
  )
  if (attempt.count > 10)
    throw Object.assign(new Error('Too many sign-in attempts. Try again in 15 minutes.'), {
      status: 429
    })
}
