<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from './layouts/AuthLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'

const route = useRoute()

// Secara dinamis memilih komponen layout berdasarkan meta di router
const layout = computed(() => {
  if (route.meta.layout === 'AuthLayout') {
    return AuthLayout
  }
  return DefaultLayout
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
