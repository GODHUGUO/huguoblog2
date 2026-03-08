// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image'],
   runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI
  },
   css: ['./app/assets/css/main.css'],
   vite: {
    plugins: [
      tailwindcss(),
    ],
  },
    app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: 'images/logoblog.png' }
      ]
    }
  }
  
})




