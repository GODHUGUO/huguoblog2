<template>
  <section class="w-full px-6 py-10 max-w-7xl mx-auto" style="font-family: 'Syne', sans-serif;">

    <!-- En-tête -->
    <div class="flex items-start justify-between mt-16 mb-4">
      <p class="text-xl font-semibold text-[#1a1a1a] mb-3">Mes articles</p>
    </div>

    <!-- Chargement -->
    <div v-if="pending" class="text-center py-20">
      <p class="text-gray-400 font-medium">Chargement des articles...</p>
    </div>

    <!-- Erreur -->
    <div v-else-if="error" class="text-center py-20">
      <p class="text-red-400 font-medium">Erreur lors du chargement des articles.</p>
    </div>

    <!-- Aucun article -->
    <div v-else-if="visibleArticles.length === 0" class="text-center py-20">
      <p class="text-gray-400 font-medium">Aucun article publié pour l'instant.</p>
    </div>

    <!-- Grille d'articles -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <article
        v-for="(article, index) in visibleArticles"
        :key="article._id"
        class="group relative rounded-2xl overflow-hidden shadow-xl"
        :style="{ backgroundColor: getColor(index).bg, minHeight: '420px' }"
      >

        <!-- Tags -->
        <div class="absolute top-4 left-4 flex items-center gap-2 z-10 flex-wrap">
          <span v-if="article.category" class="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-gray-800">
            {{ article.category }}
          </span>
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-gray-800"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Titre -->
        <div class="absolute top-16 left-4 right-4 z-10">
          <h3
            class="text-2xl font-extrabold leading-tight mb-2"
            :style="{ color: getColor(index).text }"
          >
            {{ article.title }}
          </h3>
        </div>

        <!-- Image -->
        <div class="absolute bottom-0 left-0 right-0 h-72 overflow-hidden rounded-2xl">
          <img
            :src="article.featuredImage"
            :alt="article.title"
            class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <!-- Bouton -->
        <div class="absolute bottom-4 left-4 z-10">
          <NuxtLink
            :to="`/articles/${article.slug}`"
            class="flex items-center gap-2 bg-white/90 hover:bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:shadow-md"
          >
            Lire la suite
          </NuxtLink>
        </div>

      </article>
    </div>

    <!-- Voir plus -->
    <div v-if="!showAll && articles && articles.length > INITIAL_COUNT" class="flex justify-center mt-12">
      <button
        @click="showAll = true"
        class="px-8 py-3.5 rounded-full bg-[#1a1a1a] text-white text-sm font-semibold"
      >
        Voir plus d'articles
      </button>
    </div>

  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'default'
})

/* -----------------------------
   Couleurs des cartes
----------------------------- */
const COLORS = [
  { bg: '#B5F23D', text: '#1a1a1a' },
  { bg: '#D8C4F0', text: '#1a1a1a' },
  { bg: '#F5F0E8', text: '#1a1a1a' },
  { bg: '#1a1a1a', text: '#ffffff' },
  { bg: '#FEE2CD', text: '#1a1a1a' },
]

const getColor = (index) => COLORS[index % COLORS.length]

/* -----------------------------
   Récupération des articles depuis MongoDB
----------------------------- */
const { data: articles, pending, error } = await useFetch('/api/articles')

/* -----------------------------
   Pagination
----------------------------- */
const INITIAL_COUNT = 6
const showAll = ref(false)

const visibleArticles = computed(() => {
  if (!articles.value) return []
  return showAll.value
    ? articles.value
    : articles.value.slice(0, INITIAL_COUNT)
})
</script>