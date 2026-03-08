import { connectDB } from '../../utils/mongodb'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const db = await connectDB()

  const article = await db
    .collection('articles')
    .findOne({ slug })

  if (!article) {
    throw createError({ statusCode: 404, message: 'Article non trouvé' })
  }

  return article
})