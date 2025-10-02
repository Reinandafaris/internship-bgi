<script setup>
import { ref } from 'vue'
import { DollarSign, Users, CreditCard, Activity } from 'lucide-vue-next'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Data dummy untuk statistik
const stats = ref([
  {
    title: 'Total Pendapatan',
    value: 'Rp 45.231.890',
    change: '+20.1% dari bulan lalu',
    icon: DollarSign,
  },
  { title: 'Langganan Baru', value: '+2350', change: '+180.1% dari bulan lalu', icon: Users },
  { title: 'Penjualan', value: '+12.234', change: '+19% dari bulan lalu', icon: CreditCard },
  { title: 'Aktif Sekarang', value: '+573', change: '+201 sejak jam terakhir', icon: Activity },
])

// Data dummy untuk penjualan terbaru
const recentSales = ref([
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: 'Rp 1.999.000' },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: 'Rp 390.000' },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: 'Rp 299.000' },
  { name: 'William Kim', email: 'will@email.com', amount: 'Rp 999.000' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: 'Rp 390.000' },
])
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.title">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            {{ stat.title }}
          </CardTitle>
          <component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <p class="text-xs text-muted-foreground">{{ stat.change }}</p>
        </CardContent>
      </Card>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="lg:col-span-4">
        <CardHeader>
          <CardTitle>Ringkasan</CardTitle>
        </CardHeader>
        <CardContent class="pl-2">
          <div class="w-full h-[350px] bg-zinc-200 rounded-lg flex items-center justify-center">
            <p class="text-muted-foreground">-- Placeholder untuk Grafik --</p>
          </div>
        </CardContent>
      </Card>

      <Card class="lg:col-span-3">
        <CardHeader>
          <CardTitle>Penjualan Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pelanggan</TableHead>
                <TableHead class="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="sale in recentSales" :key="sale.email">
                <TableCell>
                  <div class="font-medium">{{ sale.name }}</div>
                  <div class="text-sm text-muted-foreground">{{ sale.email }}</div>
                </TableCell>
                <TableCell class="text-right">{{ sale.amount }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
