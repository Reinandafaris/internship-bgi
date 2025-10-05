<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { Eye, EyeOff } from 'lucide-vue-next'

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
const showPassword = ref(false)

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
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Sign In</CardTitle>
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
            <div class="relative">
              <Input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <Eye v-if="!showPassword" class="h-5 w-5 text-gray-400" />
                <EyeOff v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter class="pt-6">
          <Button class="w-full" type="submit" :disabled="authStore.isLoading">
            {{ authStore.isLoading ? 'Loading...' : 'Sign In' }}
          </Button>
        </CardFooter>
        <p class="text-center text-sm text-muted-foreground pt-4">
          if you don't have an account, <RouterLink to="/register">sign up</RouterLink>
        </p>
      </form>
    </Card>
  </div>
</template>
