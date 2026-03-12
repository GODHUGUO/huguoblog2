<template>
  <div class="flex flex-col min-h-screen">
    <header_blog_admin v-if="isLoggedIn" />
    <header_blog v-else />
    <slot />  
    <footer_blog/>
  </div>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth'
import header_blog from '~/components/header_blog.vue'
import footer_blog from '~/components/footer_blog.vue'
import header_blog_admin from '~/components/header_blog_admin.vue'

const { $auth } = useNuxtApp()
const isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    isLoggedIn.value = !!user
  })
})
</script>