<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EmptyState from '@/components/EmptyState.vue'
import Swal from '@/plugins/sweetalert.js'
import { Button } from '@/components/ui/button'
import { VTable } from 'vuetify/components'
import OrderForm from '@/components/OrderForm.vue'
import orderService from '@/services/orderService'

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
const orders = ref([])
const isLoading = ref(true)
const router = useRouter()

const isDialogOpen = ref(false)
const currentOrder = ref(null)
const isEditMode = ref(false)

// Ambil data pesanan
const fetchOrders = async () => {
  isLoading.value = true
  try {
    const response = await orderService.getOrders()
    orders.value = response.data
  } catch {
    Swal.fire({ icon: 'error', title: 'Gagal mengambil data pesanan.' })
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchOrders)

// Navigasi detail
const goToDetail = (orderId) => {
  router.push(`/orders-detail/${orderId}`)
}

// Buka form tambah
const openCreateDialog = () => {
  isEditMode.value = false
  currentOrder.value = {
    fullName: '',
    password: '',
    email: '',
    phone: '',
    quantity: 1,
    pickupTime: '',
    notes: '',
    product: '',
    shippingMethod: 'delivery',
    notification: [],
  }
  isDialogOpen.value = true
}

// Buka form edit
const openEditDialog = (order) => {
  isEditMode.value = true
  currentOrder.value = { ...order }
  isDialogOpen.value = true
}

// Simpan form
const handleFormSubmit = async (formData) => {
  try {
    if (isEditMode.value) {
      await orderService.updateOrder(formData.id, formData)
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Order berhasil diperbarui!',
        showConfirmButton: false,
        timer: 3000,
      })
    } else {
      await orderService.createOrder(formData)
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Order berhasil ditambahkan!',
        showConfirmButton: false,
        timer: 3000,
      })
    }
    isDialogOpen.value = false
    fetchOrders()
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

// Hapus order
const handleDelete = async (orderId) => {
  try {
    await orderService.deleteOrder(orderId)
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Order berhasil dihapus!',
      showConfirmButton: false,
      timer: 3000,
    })
    fetchOrders()
  } catch {
    toast.error('Gagal menghapus order.')
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mx-4 mb-6">
      <h1 class="text-xl">Order List</h1>
      <Dialog class="relative z-10 !p-6" v-model:open="isDialogOpen">
        <DialogTrigger as-child>
          <Button @click="openCreateDialog">Tambah Order</Button>
        </DialogTrigger>
        <DialogContent class="grid-rows-[auto_1fr_auto] max-h-[90vh] !max-w-2xl sm:w-full p-0">
          <DialogHeader class="!pt-6">
            <DialogTitle>{{ isEditMode ? 'Edit Order' : 'Tambah Order Baru' }}</DialogTitle>
            <DialogDescription>Isi detail order di bawah ini.</DialogDescription>
          </DialogHeader>

          <div class="overflow-y-auto px-6">
            <OrderForm
              :initial-data="currentOrder"
              @submit="handleFormSubmit"
              @cancel="isDialogOpen = false"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center py-10 text-muted-foreground">
      Memuat data produk...
    </div>

    <!-- Data Kosong -->
    <EmptyState
      v-else-if="orders.length === 0"
      title="Belum Ada Produk"
      description="Mulai dengan menambahkan produk baru untuk ditampilkan di sini."
    >
      <Button @click="openCreateDialog">Tambah Produk</Button>
    </EmptyState>

    <!-- Tabel -->
    <VTable v-else class="w-full border rounded-md overflow-hidden">
      <thead class="bg-muted/30">
        <tr>
          <th class="px-4 py-2 text-left uppercase">Nama Customer</th>
          <th class="px-4 py-2 text-center uppercase">Email</th>
          <th class="px-4 py-2 text-center uppercase">Kuantitas</th>
          <th class="px-4 py-2 text-center uppercase">Produk</th>
          <th class="px-4 py-2 text-center uppercase">Pickup Time</th>
          <th class="px-4 py-2 text-center uppercase">Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          class="hover:bg-muted/50 cursor-pointer transition-colors"
          @click="goToDetail(order.id)"
        >
          <td class="px-4 py-3 font-medium">{{ order.fullName }}</td>
          <td class="px-4 py-3 text-center">{{ order.email }}</td>
          <td class="px-4 py-3 text-center">{{ order.quantity }}</td>
          <td class="px-4 py-3 text-center">{{ order.product }}</td>
          <td class="px-4 py-3 text-center">{{ order.pickupTime }}</td>
          <td class="px-4 py-3 text-center" @click.stop>
            <div class="flex gap-2 justify-center">
              <Button variant="outline" size="sm" @click="openEditDialog(order)">Edit</Button>

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
                    <AlertDialogAction @click="handleDelete(order.id)">Ya, Hapus</AlertDialogAction>
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
