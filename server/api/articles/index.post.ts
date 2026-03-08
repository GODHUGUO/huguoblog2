import { connectDB } from '../../utils/mongodb'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validation
  if (!body.title?.trim()) {
    throw createError({ statusCode: 400, message: 'Le titre est obligatoire' })
  }
  if (!body.content?.trim()) {
    throw createError({ statusCode: 400, message: 'Le contenu est obligatoire' })
  }

  const db = await connectDB()

  // Vérifier que le slug n'existe pas déjà
  const slug = body.title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const existing = await db.collection('articles').findOne({ slug })
  if (existing) {
    throw createError({ statusCode: 400, message: 'Un article avec ce titre existe déjà' })
  }

  // Créer l'article
  const newArticle = {
    title: body.title.trim(),
    slug,
    content: body.content,
    excerpt: body.excerpt || body.content.replace(/<[^>]+>/g, '').substring(0, 160) + '...',
    featuredImage: body.featuredImage || null,
    category: body.category || null,
    tags: body.tags || [],
    author: 'Jean-Hugues GODONOU',
    status: body.status || 'published',
    publishDate: new Date().toISOString(),
    metaTitle: body.metaTitle || body.title,
    metaDescription: body.metaDescription || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const result = await db.collection('articles').insertOne(newArticle)

  return {
    success: true,
    id: result.insertedId,
    slug,
    message: 'Article créé avec succès'
  }
})