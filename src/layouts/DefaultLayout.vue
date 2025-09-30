<script setup>
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div class="min-h-screen bg-zinc-100 flex">
    <aside class="w-64 bg-zinc-800 text-white p-4">
      <h1 class="font-bold text-xl mb-4">Pro Dashboard</h1>
      <p>(Sidebar Navigation)</p>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow-sm p-4">
        <p>(Navbar / User Profile)</p>
      </header>

      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
  <Toaster rich-colors />
</template>
