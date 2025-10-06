<script setup>
import { ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, helpers } from '@vuelidate/validators'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Menerima data awal untuk mode edit
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      name: '',
      price: 0,
      oldPrice: 0,
      description: '',
      details: '',
      images: '',
    }),
  },
})

// Mengirim event saat form disubmit atau dibatalkan
const emit = defineEmits(['submit', 'cancel'])

const formData = ref({ ...props.initialData })
const imageFile = ref(null)

// Aturan validasi
const rules = {
  name: { required: helpers.withMessage('Nama produk tidak boleh kosong.', required) },
  price: {
    required: helpers.withMessage('Harga tidak boleh kosong.', required),
    minValue: helpers.withMessage('Harga harus lebih dari 0.', minValue(1)),
  },
  oldPrice: {
    minValue: helpers.withMessage('Harga lama harus lebih dari 0.', minValue(1)),
  },
  description: { required: helpers.withMessage('Deskripsi tidak boleh kosong.', required) },
  details: { required: helpers.withMessage('Detail produk tidak boleh kosong.', required) },
  // images: { required: helpers.withMessage('Anda harus mengunggah setidaknya satu gambar.', required) },
}

const v$ = useVuelidate(rules, formData)

// Watcher untuk mengisi form jika initialData berubah (saat membuka mode edit)
watch(
  () => props.initialData,
  (newData) => {
    formData.value = { ...newData }
    v$.value.$reset() // Reset validasi saat data baru masuk
  },
)

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
  }
}

const handleSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (isValid) {
    const payloadToEmit = { ...formData.value, imageFile: imageFile.value }

    emit('submit', payloadToEmit)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="grid gap-4">
    <div class="grid gap-2">
      <Label for="name">Nama Produk</Label>
      <Input id="name" v-model="formData.name" @blur="v$.name.$touch" />
      <span v-if="v$.name.$error" class="text-red-500 text-sm">{{
        v$.name.$errors[0].$message
      }}</span>
    </div>
    <div class="grid gap-2">
      <Label for="price">Harga</Label>
      <Input id="price" v-model="formData.price" type="number" @blur="v$.price.$touch" />
      <span v-if="v$.price.$error" class="text-red-500 text-sm">{{
        v$.price.$errors[0].$message
      }}</span>
    </div>
    <div class="grid gap-2">
      <Label for="oldPrice">Harga Lama (Opsional)</Label>
      <Input id="oldPrice" v-model="formData.oldPrice" type="number" @blur="v$.oldPrice.$touch" />
      <span v-if="v$.oldPrice.$error" class="text-red-500 text-sm">{{
        v$.oldPrice.$errors[0].$message
      }}</span>
    </div>
    <div class="grid gap-2">
      <Label for="description">Deskripsi</Label>
      <Textarea id="description" v-model="formData.description" @blur="v$.description.$touch" />
      <span v-if="v$.description.$error" class="text-red-500 text-sm">{{
        v$.description.$errors[0].$message
      }}</span>
    </div>
    <div class="grid gap-2">
      <Label for="details">Detail Produk</Label>
      <Textarea id="details" v-model="formData.details" @blur="v$.details.$touch" />
      <span v-if="v$.details.$error" class="text-red-500 text-sm">{{
        v$.details.$errors[0].$message
      }}</span>
    </div>
    <!-- File input untuk gambar -->
    <div class="grid gap-2">
      <Label for="images">Gambar Produk</Label>
      <Input id="images" type="file" @change="handleFileChange" accept="image/png, image/jpeg" />
      <!-- <span v-if="v$.images.$error" class="text-red-500 text-sm">{{
        v$.images.$errors[0].$message
      }}</span> -->
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <Button type="button" variant="outline" @click="$emit('cancel')">Batal</Button>
      <Button type="submit">Simpan</Button>
    </div>
  </form>
</template>
