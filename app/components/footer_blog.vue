<template>
  <footer class="w-full bg-[#1a1a1a]" style="font-family: 'DM Sans', sans-serif;">

    <!-- Newsletter -->
    <div class="mx-4 mt-6 rounded-2xl bg-[#A8F000] px-5 py-8 sm:px-8 md:px-12 md:py-12">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <!-- Texte -->
        <div class="max-w-md text-center md:text-left">
          <h2 class="text-lg sm:text-2xl md:text-3xl font-bold leading-tight text-[#1a1a1a]">
            S'abonner à ma Newsletter
          </h2>
        </div>

        <!-- Formulaire -->
       <div class="w-full md:max-w-md">
  <div class="flex flex-col sm:flex-row items-stretch gap-2 rounded-2xl sm:rounded-full bg-[#1a1a1a] px-3 py-2">
    <input
      v-model="email"
      type="email"
      placeholder="Entrer votre email"
      class="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-white/60 outline-none"
    />
    <button
      @click="handleSubscribe"
      class="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#1a1a1a] transition-all duration-200 hover:bg-orange-50 active:scale-95"
    >
      Subscribe
    </button>
  </div>
</div>

      </div>
    </div>

    <!-- Bas du footer -->
    <div class="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 py-10">

     <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between items-center">

        <!-- Réseaux sociaux -->
        <div class="flex flex-col items-center md:items-start gap-3 w-full md:w-auto text-center md:text-left">
          <p class="text-white text-xs font-medium">Suivez moi :</p>
          <div class="flex items-center justify-center md:justify-start gap-3">

            <!-- X -->
            <a
              href="https://x.com/JGodonou65958"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-200"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <!-- LinkedIn -->
            <a
              href="https://www.linkedin.com/in/jean-hugues-godonou-9781471b9"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-200"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

          </div>
        </div>

        <!-- Liens de navigation -->
        <div class="flex items-center justify-center md:justify-end gap-6 text-sm">
          <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors duration-200">
            Accueil
          </NuxtLink>
          <NuxtLink to="/aboutme" class="text-gray-400 hover:text-white transition-colors duration-200">
            À propos
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-400 hover:text-white transition-colors duration-200">
            Contact
          </NuxtLink>
         
        </div>

      </div>

      <!-- Séparateur + copyright -->
      <div class="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p>© {{ new Date().getFullYear() }} Jean-Hugues GODONOU. Tous droits réservés.</p>
       
      </div>

    </div>

  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const handleSubscribe = () => {
  if (!email.value || !email.value.includes('@')) return
  console.log('Subscribed:', email.value)
  email.value = ''
}
</script>