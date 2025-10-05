<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { Eye, EyeOff } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

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
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Sign Up</CardTitle>
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
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="jhondoe@mail.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <div class="relative">
              <Input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="********"
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
          <Button class="w-full" type="submit" :disabled="authStore.isLoading">
            {{ authStore.isLoading ? 'Mendaftarkan...' : 'Sign Up' }}
          </Button>
        </CardContent>
        <p class="text-center text-muted-foreground text-sm pt-4">
          already have an account?
          <RouterLink to="/login">sign in</RouterLink>
        </p>
      </form>
    </Card>
  </div>
</template>
