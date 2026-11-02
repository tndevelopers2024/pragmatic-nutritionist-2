import { loadBackendEnv } from '../src/env.js'
import { getDb, closeDb } from '../src/cms/db.js'
import { migrateBundledPosts, readBundledPosts } from '../src/cms/migration.js'

loadBackendEnv()
try {
  const args = process.argv.slice(2)
  if (args.some(arg => arg !== '--dry-run')) throw new Error('Supported option: --dry-run')
  const articles = await readBundledPosts()
  const result = await migrateBundledPosts(await getDb(), articles, {
    dryRun: args.includes('--dry-run')
  })
  console.log(JSON.stringify(result, null, 2))
} catch (error) {
  // Driver connection errors may contain private host/connection details.
  console.error(error.name?.startsWith('Mongo')
    ? 'Database migration failed. Check the database connection and access settings.'
    : error.message)
  process.exitCode = 1
} finally {
  await closeDb()
}
