import { loadEnvFile } from 'node:process'
import { fileURLToPath } from 'node:url'

export function loadBackendEnv(mode = process.env.NODE_ENV || 'development') {
  // Highest priority first; loadEnvFile preserves variables already supplied by the host.
  for (const filename of [`.env.${mode}.local`, '.env.local', `.env.${mode}`, '.env']) {
    try {
      loadEnvFile(fileURLToPath(new URL(`../${filename}`, import.meta.url)))
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
    }
  }
}
