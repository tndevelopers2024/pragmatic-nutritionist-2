import { createServer } from 'node:http'
import { app } from './app.js'
import { loadBackendEnv } from './env.js'
import { closeDb } from './cms/db.js'

loadBackendEnv()
const port = Number(process.env.PORT || 4000)
const host = process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1')
const server = createServer(app)
server.listen(port, host, () => console.log(`Backend listening at http://${host}:${port}`))
server.on('error', (error) => {
  console.error('Backend could not start:', error.code || error.name)
  process.exitCode = 1
})
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => {
    server.close(async () => { await closeDb(); process.exit(0) })
    setTimeout(() => process.exit(1), 5000).unref()
  })
}
