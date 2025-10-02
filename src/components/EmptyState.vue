<script setup>
import { defineProps } from 'vue'
import { PackageOpen } from 'lucide-vue-next'

defineProps({
  title: {
    type: String,
    default: 'Tidak Ada Data',
  },
  description: {
    type: String,
    default: 'Sepertinya belum ada data yang bisa ditampilkan di sini.',
  },
})
</script>
<template>
  <div class="flex flex-col items-center justify-center text-center py-12">
    <PackageOpen class="h-16 w-16 text-muted-foreground mb-4" />
    <h3 class="text-xl font-semibold">{{ title }}</h3>
    <p class="text-muted-foreground mt-2">{{ description }}</p>
    <div class="mt-6">
      <slot />
    </div>
  </div>
</template>
