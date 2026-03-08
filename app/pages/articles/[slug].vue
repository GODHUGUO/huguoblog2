<script setup>
import { computed } from 'vue'

// ── Récupère le slug depuis l'URL ──
const route = useRoute()
const slug = route.params.slug

// ── Appel API ──
const { data: article, pending, error } = await useFetch(`/api/articles/${slug}`)

// ── Articles associés depuis l'API ──
const { data: allArticles } = await useFetch('/api/articles')

const COLORS = [
  { bg: 'bg-[#B5F23D]', text: 'text-gray-900' },
  { bg: 'bg-[#D8C4F0]', text: 'text-gray-900' },
  { bg: 'bg-[#FEE2CD]', text: 'text-gray-900' },
  { bg: 'bg-[#1a1a1a]', text: 'text-white' },
  { bg: 'bg-[#C8E6C9]', text: 'text-gray-900' },
]

const relatedArticles = computed(() => {
  const all = allArticles.value || []
  return all
    .filter(a => a.slug !== slug)
    .map((a, i) => ({
      ...a,
      bgColor: COLORS[i % COLORS.length].bg,
      textColor: COLORS[i % COLORS.length].text,
    }))
})

// ── Helpers ──
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// ── Carrousel ──
const currentIndex = ref(0)
const cardWidth = 260 + 16

const canPrev = computed(() => currentIndex.value > 0)
const canNext = computed(() => currentIndex.value < relatedArticles.value.length - 3)

const slideOffset = computed(() => currentIndex.value * cardWidth)
const nextSlide = () => { if (canNext.value) currentIndex.value++ }
const prevSlide = () => { if (canPrev.value) currentIndex.value-- }

// ── SEO ──
useHead({
  title: computed(() => article.value?.title || 'Article'),
  meta: [
    { name: 'description', content: computed(() => article.value?.excerpt || '') }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-white">

    <!-- Chargement -->
    <div v-if="pending" class="flex justify-center py-40">
      <div class="w-8 h-8 rounded-full border-4 border-gray-200 border-t-[#A8F000] animate-spin"></div>
    </div>

    <!-- Erreur / introuvable -->
    <div v-else-if="error || !article" class="flex flex-col items-center justify-center py-40 gap-4">
      <p class="text-gray-500 font-semibold">Article introuvable.</p>
      <NuxtLink to="/" class="text-sm font-bold underline">Retour à l'accueil</NuxtLink>
    </div>

    <!-- Article principal -->
    <article v-else class="max-w-4xl mx-auto px-4 sm:px-8 md:px-16 lg:px-20 py-8 pt-16 md:pt-24">

      <!-- Date -->
      <p class="text-sm md:text-lg text-gray-400 mb-3">
        Date de publication:
        <span class="font-bold text-[#111111]">{{ formatDate(article.publishDate) }}</span>
      </p>

      <!-- Titre -->
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-gray-900 mb-4 md:mb-6">
        {{ article.title }}
      </h1>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4 md:mb-6">
        <span
          v-for="tag in article.tags"
          :key="tag"
          class="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Image hero -->
      <div v-if="article.featuredImage" class="w-full rounded-2xl overflow-hidden mb-6 md:mb-8" style="height: clamp(200px, 40vw, 500px);">
        <img
          :src="article.featuredImage"
          :alt="article.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Contenu HTML de l'article -->
      <div class="prose prose-sm max-w-none" v-html="article.content" />

    </article>

    <!-- Section articles associés -->
    <section v-if="relatedArticles.length" class="bg-white px-4 sm:px-8 md:px-16 lg:px-20 py-8 md:py-12">
      <div class="max-w-4xl mx-auto">

        <!-- En-tête avec flèches -->
        <div class="flex items-center justify-between mb-6 md:mb-8">
          <h2 class="text-base md:text-xl font-extrabold text-gray-900">
            Ceux-ci peuvent vous intéresser
          </h2>

          <!-- Flèches navigation -->
          <div class="flex items-center gap-2">
            <button
              @click="prevSlide"
              :disabled="!canPrev"
              class="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center border transition-all duration-200"
              :class="canPrev
                ? 'border-gray-300 hover:bg-[#A8F000] hover:border-[#A8F000] text-gray-700'
                : 'border-gray-200 text-gray-300 cursor-not-allowed'"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              @click="nextSlide"
              :disabled="!canNext"
              class="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center border transition-all duration-200"
              :class="canNext
                ? 'border-gray-300 hover:bg-[#A8F000] hover:border-[#A8F000] text-gray-700'
                : 'border-gray-200 text-gray-300 cursor-not-allowed'"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Carrousel -->
        <div class="overflow-hidden">
          <div
            class="flex gap-4 transition-transform duration-500 ease-out"
            :style="`transform: translateX(-${slideOffset}px)`"
          >
            <article
              v-for="(related, i) in relatedArticles"
              :key="related._id"
              class="group rounded-2xl overflow-hidden flex flex-col shrink-0 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 h-[280px] md:h-[300px]"
              style="width: 220px;"
            >
              <div class="p-3 md:p-4 flex-1" :class="related.bgColor">
                <div class="flex items-center gap-2 mb-2 flex-wrap">
                  <span v-if="related.category" class="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/70 text-gray-800">
                    {{ related.category }}
                  </span>
                  <span
                    v-for="tag in related.tags"
                    :key="tag"
                    class="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/70 text-gray-800"
                  >
                    {{ tag }}
                  </span>
                </div>
                <h3 class="text-sm md:text-base font-extrabold leading-tight" :class="related.textColor">
                  {{ related.title }}
                </h3>
              </div>

              <div class="relative overflow-hidden h-36 md:h-44">
                <img
                  v-if="related.featuredImage"
                  :src="related.featuredImage"
                  :alt="related.title"
                  class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div v-else class="w-full h-full bg-gray-200"></div>
                <div class="absolute bottom-3 left-3">
                  <NuxtLink
                    :to="`/articles/${related.slug}`"
                    class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white transition-all duration-200 hover:scale-105"
                    style="background: #1a1a1a; border: 1px solid rgba(255,255,255,0.25);"
                  >
                    Lire la suite
                    <span class="w-4 h-4 rounded-full flex items-center justify-center" style="background: rgba(255,255,255,0.25);">
                      <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>