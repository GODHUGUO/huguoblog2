import { connectDB } from '../../utils/mongodb'

export default defineEventHandler(async () => {
  const db = await connectDB()
  const articles = await db
    .collection('articles')
    .find({ status: 'published' })
    .sort({ publishDate: -1 })
    .toArray()

  return articles
})


