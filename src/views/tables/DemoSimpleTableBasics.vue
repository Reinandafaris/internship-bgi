<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import productService from '@/services/productService'
import ProductForm from '@/components/ProductForm.vue'
import EmptyState from '@/components/EmptyState.vue'
import Swal from '@/plugins/sweetalert.js'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

// Data & State
const products = ref([])
const isLoading = ref(true)
const router = useRouter()

const isDialogOpen = ref(false)
const currentProduct = ref(null)
const isEditMode = ref(false)

// Ambil data produk
const fetchProducts = async () => {
  isLoading.value = true
  try {
    const response = await productService.getProducts()
    products.value = response.data
  } catch {
    toast.error('Gagal mengambil data produk.')
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchProducts)

// Navigasi detail
const goToDetail = (productId) => {
  router.push(`/products/${productId}`)
}

// Buka form tambah
const openCreateDialog = () => {
  isEditMode.value = false
  currentProduct.value = { name: '', price: '', description: '' }
  isDialogOpen.value = true
}

// Buka form edit
const openEditDialog = (product) => {
  isEditMode.value = true
  currentProduct.value = { ...product }
  isDialogOpen.value = true
}

// Simpan form
const handleFormSubmit = async (formData) => {
  try {
    if (isEditMode.value) {
      await productService.updateProduct(formData.id, formData)
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Produk berhasil diperbarui!',
        showConfirmButton: false,
        timer: 3000,
      })
    } else {
      await productService.createProduct(formData)
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Produk berhasil ditambahkan!',
        showConfirmButton: false,
        timer: 3000,
      })
    }
    isDialogOpen.value = false
    fetchProducts()
  } catch {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: 'Terjadi kesalahan.',
      showConfirmButton: false,
      timer: 3000,
    })
  }
}

// Hapus produk
const handleDelete = async (productId) => {
  try {
    await productService.deleteProduct(productId)
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Produk berhasil dihapus!',
      showConfirmButton: false,
      timer: 3000,
    })
    fetchProducts()
  } catch {
    toast.error('Gagal menghapus produk.')
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mx-4 mb-6">
      <h1 class="text-xl">Daftar Product</h1>
      <Dialog class="relative z-10 !p-6" v-model:open="isDialogOpen">
        <DialogTrigger as-child>
          <Button @click="openCreateDialog">Tambah Produk</Button>
        </DialogTrigger>
        <DialogContent class="max-w-lg sm:w-full !p-6">
          <DialogHeader>
            <DialogTitle>{{ isEditMode ? 'Edit Produk' : 'Tambah Produk Baru' }}</DialogTitle>
            <DialogDescription>Isi detail produk di bawah ini.</DialogDescription>
          </DialogHeader>
          <ProductForm
            :initial-data="currentProduct"
            @submit="handleFormSubmit"
            @cancel="isDialogOpen = false"
          />
        </DialogContent>
      </Dialog>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center py-10 text-muted-foreground">
      Memuat data produk...
    </div>

    <!-- Data Kosong -->
    <EmptyState
      v-else-if="products.length === 0"
      title="Belum Ada Produk"
      description="Mulai dengan menambahkan produk baru untuk ditampilkan di sini."
    >
      <Button @click="openCreateDialog">Tambah Produk</Button>
    </EmptyState>

    <!-- Tabel -->
    <VTable v-else class="w-full border rounded-md overflow-hidden">
      <thead class="bg-muted/30">
        <tr>
          <th class="px-4 py-2 text-left uppercase">Nama Produk</th>
          <th class="px-4 py-2 text-center uppercase">Harga</th>
          <th class="px-4 py-2 text-center uppercase">Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
          class="hover:bg-muted/50 cursor-pointer transition-colors"
          @click="goToDetail(product.id)"
        >
          <td class="px-4 py-3 font-medium">{{ product.name }}</td>
          <td class="px-4 py-3 text-center">Rp {{ product.price.toLocaleString('id-ID') }}</td>
          <td class="px-4 py-3 text-center" @click.stop>
            <div class="flex gap-2 justify-center">
              <Button variant="outline" size="sm" @click="openEditDialog(product)">Edit</Button>

              <AlertDialog>
                <AlertDialogTrigger as-child>
                  <Button class="border border-red-500 !bg-red-600" size="sm">Hapus</Button>
                </AlertDialogTrigger>
                <AlertDialogContent class="!p-3 max-w-lg sm:w-full">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Aksi ini tidak dapat dibatalkan dan akan menghapus produk secara permanen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter class="!items-baseline !justify-end !gap-2">
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction @click="handleDelete(product.id)"
                      >Ya, Hapus</AlertDialogAction
                    >
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </td>
        </tr>
      </tbody>
    </VTable>
  </div>
</template>

<style scoped>
thead th {
  font-weight: 600;
  font-size: 0.875rem;
}
tbody td {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

tbody tr:hover {
  background-color: rgba(15, 161, 218, 0.03);
}
</style>
