<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const name = ref('')
const email = ref('')
const password = ref('')

const authStore = useAuthStore()
const router = useRouter()

const handleRegister = async () => {
  const success = await authStore.register({
    name: name.value,
    email: email.value,
    password: password.value,
  })

  if (success) {
    router.push('/')
  } else {
    alert('Registrasi Gagal!')
  }
}
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">Register</CardTitle>
      <CardDescription> Masukkan informasi Anda untuk membuat akun baru. </CardDescription>
    </CardHeader>
    <form @submit.prevent="handleRegister">
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="name">Nama</Label>
          <Input id="name" v-model="name" placeholder="John Doe" required />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" placeholder="jhondoe@mail.com" required />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" type="password" placeholder="********" required />
        </div>
        <Button class="w-full" type="submit" :disabled="authStore.isLoading">
          {{ authStore.isLoading ? 'Mendaftarkan...' : 'Register' }}
        </Button>
      </CardContent>
      <p class="text-center text-muted-foreground text-sm pt-4">
        already have an account?
        <RouterLink to="/login">Login here</RouterLink>
      </p>
    </form>
  </Card>
</template>
