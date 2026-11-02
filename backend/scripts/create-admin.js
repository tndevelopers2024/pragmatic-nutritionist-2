import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'
import { loadBackendEnv } from '../src/env.js'
import { getDb } from '../src/cms/db.js'
import { hashPassword } from '../src/cms/auth.js'

loadBackendEnv()
const rl = createInterface({ input: stdin, output: stdout })
try {
  const db = await getDb()
  const name = (await rl.question('Client name: ')).trim() || 'Meenu Balaji'
  const email = (await rl.question('Admin email: ')).toLowerCase().trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Enter a valid email.')
  // Use terminal masking so the password is never printed or passed as a shell argument.
  stdout.write('Admin password (at least 12 characters): ')
  rl.close()
  const password = await new Promise((resolve) => {
    let value = ''
    stdin.setRawMode(true)
    stdin.resume()
    const onData = (chunk) => {
      for (const character of chunk.toString()) {
        if (character === '\u0003') process.exit(130)
        if (character === '\r' || character === '\n') {
          stdin.setRawMode(false)
          stdin.off('data', onData)
          stdin.pause()
          stdout.write('\n')
          resolve(value)
          return
        }
        if (character === '\u007f') value = value.slice(0, -1)
        else value += character
      }
    }
    stdin.on('data', onData)
  })
  if (password.length < 12) throw new Error('Use a password with at least 12 characters.')
  const existing = await db.collection('users').findOne({ email })
  if (existing && process.argv[2] !== '--reset-password')
    throw new Error('This account already exists. Use --reset-password explicitly to change it.')
  await db
    .collection('users')
    .updateOne(
      { email },
      {
        $set: { name, passwordHash: await hashPassword(password) },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    )
  if (existing) await db.collection('sessions').deleteMany({ userId: existing._id })
  console.log('Admin account ready. Open /admin to sign in.')
  process.exit(0)
} catch (error) {
  console.error(error.message)
  rl.close()
  process.exit(1)
}
