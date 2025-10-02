<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import productService from '@/services/productService'
import ProductForm from '@/components/ProductForm.vue'
import { toast } from 'vue-sonner'
import EmptyState from '@/components/EmptyState.vue'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

const products = ref([])
const isLoading = ref(true)
const router = useRouter()

const isDialogOpen = ref(false)
const currentProduct = ref(null)
const isEditMode = ref(false)

// Fungsi untuk memuat ulang data produk
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

const goToDetail = (productId) => {
  router.push(`/products/${productId}`)
}

const openCreateDialog = () => {
  isEditMode.value = false
  currentProduct.value = { name: '', price: '', description: '' }
  isDialogOpen.value = true
}

const openEditDialog = (product) => {
  isEditMode.value = true
  currentProduct.value = { ...product }
  isDialogOpen.value = true
}

const handleFormSubmit = async (formData) => {
  try {
    if (isEditMode.value) {
      await productService.updateProduct(formData.id, formData)
      toast.success('Produk berhasil diperbarui!')
    } else {
      await productService.createProduct(formData)
      toast.success('Produk berhasil ditambahkan!')
    }
    isDialogOpen.value = false
    fetchProducts() // Muat ulang data
  } catch {
    toast.error('Terjadi kesalahan.')
  }
}

const handleDelete = async (productId) => {
  try {
    await productService.deleteProduct(productId)
    toast.success('Produk berhasil dihapus!')
    fetchProducts() // Muat ulang data
  } catch {
    toast.error('Gagal menghapus produk.')
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Daftar Produk</h1>
      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
          <Button @click="openCreateDialog">Tambah Produk</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{ isEditMode ? 'Edit Produk' : 'Tambah Produk Baru' }}</DialogTitle>
            <DialogDescription> Isi detail produk di bawah ini. </DialogDescription>
          </DialogHeader>
          <ProductForm
            :initial-data="currentProduct"
            @submit="handleFormSubmit"
            @cancel="isDialogOpen = false"
          />
        </DialogContent>
      </Dialog>
    </div>

    <!-- 1. Kondisi Loading (Skeleton) -->
    <div v-if="isLoading">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Produk</TableHead>
            <TableHead class="text-right">Harga</TableHead>
            <TableHead class="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="n in 3" :key="n">
            <TableCell>
              <div class="flex items-center">
                <Skeleton class="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 block" />
              </div>
            </TableCell>
            <TableCell>
              <div class="flex items-center justify-end">
                <Skeleton class="h-8 w-20 bg-zinc-200 dark:bg-zinc-800 block" />
              </div>
            </TableCell>
            <TableCell class="flex justify-center gap-2">
              <Skeleton class="h-8 w-16 bg-zinc-200 dark:bg-zinc-800" />
              <Skeleton class="h-8 w-16 bg-zinc-200 dark:bg-zinc-800" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- 2. Kondisi Data Kosong (Empty State) -->
    <EmptyState
      v-else-if="products.length === 0"
      title="Belum Ada Produk"
      description="Mulai dengan menambahkan produk baru untuk ditampilkan di sini."
    >
      <Button @click="openCreateDialog">Tambah Produk</Button>
    </EmptyState>

    <!-- 3. Kondisi Ada Data (Tabel Produk) -->
    <Table v-else>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Produk</TableHead>
          <TableHead class="text-right">Harga</TableHead>
          <TableHead class="text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="product in products"
          :key="product.id"
          @click="goToDetail(product.id)"
          class="cursor-pointer hover:bg-muted/50"
        >
          <TableCell class="font-medium">{{ product.name }}</TableCell>
          <TableCell class="text-right">Rp {{ product.price.toLocaleString('id-ID') }}</TableCell>
          <TableCell class="text-center">
            <div @click.stop class="flex gap-2 justify-center">
              <Button variant="outline" size="sm" @click="openEditDialog(product)">Edit</Button>
              <AlertDialog>
                <AlertDialogTrigger as-child>
                  <Button variant="destructive" size="sm">Hapus</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Aksi ini tidak dapat dibatalkan. Ini akan menghapus produk secara permanen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction @click="handleDelete(product.id)"
                      >Ya, Hapus</AlertDialogAction
                    >
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
