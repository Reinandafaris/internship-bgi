<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import productService from '@/services/productService'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const products = ref([])
const isLoading = ref(true)
const router = useRouter()

onMounted(async () => {
  try {
    const response = await productService.getProducts()
    products.value = response.data
  } catch (error) {
    console.error('Gagal mengambil data produk:', error)
  } finally {
    isLoading.value = false
  }
})

const goToDetail = (productId) => {
  router.push(`/products/${productId}`)
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Daftar Produk</h1>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else-if="products.length === 0">
      <p>Belum ada produk.</p>
    </div>
    <Table v-else>
      <TableCaption>Daftar semua produk yang tersedia.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">ID</TableHead>
          <TableHead>Nama Produk</TableHead>
          <TableHead>Stok</TableHead>
          <TableHead class="text-right">Harga</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="product in products"
          :key="product.id"
          @click="goToDetail(product.id)"
          class="cursor-pointer hover:bg-muted/50"
        >
          <TableCell class="font-medium">{{ product.id }}</TableCell>
          <TableCell>{{ product.name }}</TableCell>
          <TableCell>{{ product.stock }}</TableCell>
          <TableCell class="text-right">Rp {{ product.price.toLocaleString('id-ID') }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
