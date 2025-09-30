<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import productService from '@/services/productService'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  const productId = route.params.id
  try {
    const response = await productService.getProductById(productId)
    product.value = response.data
  } catch (error) {
    console.error('Gagal mengambil detail produk:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <Button @click="router.back()" variant="outline" class="mb-4">
      &larr; Kembali ke Daftar
    </Button>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <Card v-else-if="product">
      <CardHeader>
        <CardTitle class="text-3xl">{{ product.name }}</CardTitle>
        <CardDescription>Detail Produk ID: {{ product.id }}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          :src="product.imageUrl"
          :alt="product.name"
          class="w-full h-64 object-cover rounded-md mb-4"
        />
        <div class="grid gap-4">
          <p class="text-lg">{{ product.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Stok: {{ product.stock }}</span>
            <span class="text-2xl font-bold">Rp {{ product.price.toLocaleString('id-ID') }}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    <div v-else>
      <p>Produk tidak ditemukan.</p>
    </div>
  </div>
</template>
