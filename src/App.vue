<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from './layouts/AuthLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import LandingLayout from './layouts/LandingLayout.vue'

const route = useRoute()

// Secara dinamis memilih komponen layout berdasarkan meta di router
const layout = computed(() => {
  if (route.meta.layout === 'AuthLayout') {
    return AuthLayout
  }
  if (route.meta.layout === 'LandingLayout') {
    return LandingLayout
  }
  return DefaultLayout
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
