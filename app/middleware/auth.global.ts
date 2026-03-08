import { onAuthStateChanged, type User } from 'firebase/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const publicPages = ['/aboutme', '/login', '/contact', '/']
  
  // ✅ Vérifie aussi les chemins dynamiques
  const isPublicPage = publicPages.includes(to.path) || to.path.startsWith('/articles/')

  const { $auth } = useNuxtApp() as unknown as { $auth: ReturnType<typeof import('firebase/auth').getAuth> }

  if (!$auth) return

  const user = await new Promise<User | null>((resolve) => {
    const unsubscribe = onAuthStateChanged($auth, (firebaseUser) => {
      unsubscribe()
      resolve(firebaseUser)
    })
  })

  if (user && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/createarticle')
  }

  if (!user && !isPublicPage) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})