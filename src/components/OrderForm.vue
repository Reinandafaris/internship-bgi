<script setup>
import { ref, watch, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, minValue, helpers } from '@vuelidate/validators'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Menerima data awal untuk mode edit
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
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
    }),
  },
})

// Mengirim event saat form disubmit atau dibatalkan
const emit = defineEmits(['submit', 'cancel'])

const formData = ref({ ...props.initialData })

// Aturan validasi
const rules = computed(() => ({
  fullName: { required: helpers.withMessage('Nama lengkap wajib diisi.', required) },
  password: {
    required: helpers.withMessage('Password wajib diisi.', required),
    minLength: helpers.withMessage('Password minimal harus 8 karakter.', minLength(8)),
  },
  email: {
    required: helpers.withMessage('Email wajib diisi.', required),
    email: helpers.withMessage('Format email tidak valid.', email),
  },
  quantity: {
    required: helpers.withMessage('Jumlah wajib diisi.', required),
    minValue: helpers.withMessage('Jumlah minimal adalah 1.', minValue(1)),
  },
  product: { required: helpers.withMessage('Anda harus memilih produk.', required) },
}))

const v$ = useVuelidate(rules, formData)

// Watcher untuk mengisi form jika initialData berubah (saat membuka mode edit)
watch(
  () => props.initialData,
  (newData) => {
    formData.value = { ...newData }
    v$.value.$reset() // Reset validasi saat data baru masuk
  },
  { deep: true },
)

const handleSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (isValid) {
    emit('submit', formData.value)
  }
}

const handleFileChange = (event) => {
  // Untuk file, kita tangani terpisah karena v-model tidak bekerja
  formData.value.paymentProof = event.target.files[0]
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="grid gap-4 py-4">
    <div class="grid gap-2">
      <Label for="fullName">Nama Lengkap</Label>
      <Input id="fullName" v-model="formData.fullName" @blur="v$.fullName.$touch" />
      <span v-if="v$.fullName.$error" class="text-red-500 text-sm">{{
        v$.fullName.$errors[0].$message
      }}</span>
    </div>

    <div class="grid gap-2">
      <Label for="password">Password</Label>
      <Input id="password" type="password" v-model="formData.password" @blur="v$.password.$touch" />
      <span v-if="v$.password.$error" class="text-red-500 text-sm">{{
        v$.password.$errors[0].$message
      }}</span>
    </div>

    <div class="grid gap-2">
      <Label for="email">Email</Label>
      <Input id="email" type="email" v-model="formData.email" @blur="v$.email.$touch" />
      <span v-if="v$.email.$error" class="text-red-500 text-sm">{{
        v$.email.$errors[0].$message
      }}</span>
    </div>

    <div class="grid gap-2">
      <Label for="phone">Nomor Telepon</Label>
      <Input id="phone" type="tel" v-model="formData.phone" />
    </div>

    <div class="grid gap-2">
      <Label for="product">Pilih Produk</Label>
      <Select v-model="formData.product" @update:open="() => v$.product.$touch()">
        <SelectTrigger>
          <SelectValue placeholder="Pilih produk..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="product-a">Produk A</SelectItem>
            <SelectItem value="product-b">Produk B</SelectItem>
            <SelectItem value="product-c">Produk C</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span v-if="v$.product.$error" class="text-red-500 text-sm">{{
        v$.product.$errors[0].$message
      }}</span>
    </div>

    <div class="grid gap-2">
      <Label for="quantity">Jumlah</Label>
      <Input id="quantity" type="number" v-model="formData.quantity" @blur="v$.quantity.$touch" />
      <span v-if="v$.quantity.$error" class="text-red-500 text-sm">{{
        v$.quantity.$errors[0].$message
      }}</span>
    </div>

    <div class="grid gap-2">
      <Label for="pickupTime">Waktu Pengambilan</Label>
      <Input id="pickupTime" type="datetime-local" v-model="formData.pickupTime" />
    </div>

    <div class="grid gap-2">
      <Label for="notes">Catatan Tambahan</Label>
      <Textarea id="notes" v-model="formData.notes" />
    </div>

    <div class="grid gap-2">
      <Label for="paymentProof">Bukti Pembayaran (Opsional)</Label>
      <Input id="paymentProof" type="file" @change="handleFileChange" />
    </div>

    <div class="grid gap-2">
      <Label>Metode Pengiriman</Label>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <input type="radio" id="delivery" value="delivery" v-model="formData.shippingMethod" />
          <Label for="delivery">Diantar</Label>
        </div>
        <div class="flex items-center gap-2">
          <input type="radio" id="pickup" value="pickup" v-model="formData.shippingMethod" />
          <Label for="pickup">Ambil Sendiri</Label>
        </div>
      </div>
    </div>

    <div class="grid gap-2">
      <Label>Metode Notifikasi</Label>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <input type="checkbox" id="notifyEmail" value="email" v-model="formData.notification" />
          <Label for="notifyEmail">Email</Label>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="notifySMS" value="sms" v-model="formData.notification" />
          <Label for="notifySMS">SMS</Label>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-4">
      <Button type="button" variant="outline" @click="$emit('cancel')">Batal</Button>
      <Button type="submit">Simpan</Button>
    </div>
  </form>
</template>
