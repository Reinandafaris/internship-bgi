<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { Home, ShoppingCart, Users, Settings } from 'lucide-vue-next'

const menuItems = [
  { name: 'Home', icon: Home, to: '/dashboard' },
  { name: 'Products', icon: ShoppingCart, to: '/products' },
  { name: 'Customers', icon: Users, to: '/customers' },
  { name: 'Settings', icon: Settings, to: '/settings' },
]
</script>

<template>
  <!-- Sidebar -->
  <aside class="w-64 bg-zinc-900 text-zinc-100 flex flex-col">
    <!-- Brand -->
    <div class="p-6 border-b border-zinc-800">
      <h1 class="font-bold text-2xl tracking-wide">Dashboard</h1>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-4 space-y-1">
      <RouterLink
        v-for="item in menuItems"
        :key="item.name"
        :to="item.to"
        class="flex items-center gap-3 !p-6 rounded-lg text-sm font-medium hover:bg-zinc-800 hover:text-white transition-colors"
      >
        <component :is="item.icon" class="w-5 h-5" />
        {{ item.name }}
      </RouterLink>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-zinc-800">
      <p class="text-xs text-zinc-400">&copy; 2025 Your Company</p>
    </div>
  </aside>
</template>
