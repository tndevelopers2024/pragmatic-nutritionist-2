import { MongoClient } from 'mongodb'

let connection
let activeClient
export async function getDb() {
  if (!process.env.MONGODB_URI) {
    const error = new Error(
      'Blog admin needs a MongoDB connection. Follow CMS_SETUP.md to finish setup.'
    )
    error.status = 503
    error.code = 'CMS_NOT_CONFIGURED'
    throw error
  }
  if (!connection) {
    connection = (async () => {
      const client = new MongoClient(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 5
      })
      activeClient = client
      await client.connect()
      const db = client.db(process.env.MONGODB_DB || 'pragmatic_nutrition')
      await Promise.all([
        db.collection('posts').createIndex({ slug: 1 }, { unique: true }),
        db.collection('posts').createIndex({ reservedSlugs: 1 }, { unique: true, sparse: true }),
        db.collection('posts').createIndex({ status: 1, publishedAt: -1 }),
        db.collection('users').createIndex({ email: 1 }, { unique: true }),
        db.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
        db.collection('loginAttempts').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
      ])
      return db
    })().catch((error) => {
      connection = null
      throw error
    })
  }
  return connection
}

export async function closeDb() {
  await activeClient?.close()
  activeClient = null
  connection = null
}
