<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/button/Button.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout(router)
}
</script>

<template>
  <header class="bg-white shadow-sm p-4 flex justify-between items-center">
    <p class="font-medium">Welcome back 👋</p>
    <div class="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon" class="rounded-full h-8 w-8">
            <img src="https://i.pravatar.cc/40" alt="User" class="w-9 h-9 rounded-full border" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Pengaturan</DropdownMenuItem>
          <DropdownMenuItem>Dukungan</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout" class="cursor-pointer"> Logout </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
