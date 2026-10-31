import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// Runs api/send-mail.js inside `npm run dev` so the mail endpoint works locally
// (in production Vercel serves the same file as a serverless function).
function devMailApi(env) {
  return {
    name: 'dev-mail-api',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, env)
      server.middlewares.use('/api/send-mail', async (req, res) => {
        const chunks = []
        for await (const c of req) chunks.push(c)
        try {
          req.body = JSON.parse(Buffer.concat(chunks).toString() || '{}')
        } catch {
          req.body = {}
        }
        res.status = (code) => {
          res.statusCode = code
          return res
        }
        res.json = (obj) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(obj))
        }
        const { default: handler } = await server.ssrLoadModule('/api/send-mail.js')
        await handler(req, res)
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), devMailApi(loadEnv(mode, process.cwd(), ''))],
}))
