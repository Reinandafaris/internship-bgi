<script setup>
import { VIcon, VList, VMenu } from 'vuetify/components'
import IconBtn from '@/components/UpgradeToPro.vue'

const props = defineProps({
  menuList: {
    type: Array,
    required: false,
  },
  itemProps: {
    type: Boolean,
    required: false,
  },
  iconSize: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <IconBtn>
    <VIcon :size="iconSize" icon="ri-more-2-line" />

    <VMenu v-if="props.menuList" activator="parent">
      <VList :items="props.menuList" :item-props="props.itemProps" />
    </VMenu>
  </IconBtn>
</template>
