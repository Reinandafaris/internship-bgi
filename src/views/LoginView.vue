<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const email = ref('admin@example.com') // Pre-fill untuk kemudahan testing
const password = ref('password')

const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  const success = await authStore.login({ email: email.value, password: password.value })
  if (success) {
    router.push('/') // Arahkan ke dashboard jika berhasil
  } else {
    alert('Login Gagal!') // Nanti kita ganti dengan Notifikasi/Toast
  }
}
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl"> Login </CardTitle>
      <CardDescription> Masukkan email dan password Anda untuk masuk. </CardDescription>
    </CardHeader>
    <form @submit.prevent="handleLogin">
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" placeholder="m@example.com" required />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" type="submit" :disabled="authStore.isLoading">
          {{ authStore.isLoading ? 'Loading...' : 'Sign In' }}
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
