import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const file = formData.get('file') as File

  if (!file) {
    throw createError({ statusCode: 400, message: 'Aucun fichier reçu' })
  }

  // Convertir le fichier en buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Upload sur Cloudinary
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'hugoblognuxt' }, // ← dossier dans Cloudinary
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    ).end(buffer)
  })
 console.log('CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME)
  console.log('API_KEY:', process.env.CLOUDINARY_API_KEY)
  console.log('API_SECRET existe ?', !!process.env.CLOUDINARY_API_SECRET)
  console.log('API_SECRET longueur:', process.env.CLOUDINARY_API_SECRET?.length)
  return {
    url: (result as any).secure_url
  }
})