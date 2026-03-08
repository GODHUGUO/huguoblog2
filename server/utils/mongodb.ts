import { MongoClient, Db } from 'mongodb'

let client: MongoClient
let db: Db

export async function connectDB(): Promise<Db> {
  if (db) return db

  const uri = process.env.MONGODB_URI!
  const dbName = process.env.MONGODB_DB!

  client = new MongoClient(uri, {
    tls: true,
    tlsAllowInvalidCertificates: true,  // ← corrige l'erreur SSL
  })

  await client.connect()
  db = client.db(dbName)

  console.log('✅ Connecté à MongoDB')
  return db
}
