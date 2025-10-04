<script setup>
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'
</script>

<template>
  <div class="min-h-screen bg-zinc-100 flex">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <Header />

      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>

  <!-- Toast Notification -->
  <Toaster rich-colors />
</template>

<style scoped>
/* Menambahkan styling untuk link yang aktif */
.router-link-exact-active {
  background-color: #4a5568; /* bg-gray-700 */
  color: white;
}
</style>
