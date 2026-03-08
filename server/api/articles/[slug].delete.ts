import { connectDB } from '../../utils/mongodb'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const db = await connectDB()

  await db.collection('articles').deleteOne({ slug })

  return { success: true, message: 'Article supprimé' }
})