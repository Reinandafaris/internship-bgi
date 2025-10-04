<script setup>
import { useTheme } from 'vuetify'
import { ref, watch, defineProps } from 'vue'
import { useCycleList } from '@vueuse/core'
import { VIcon, VTooltip } from 'vuetify/components'
import IconBtn from '@/components/UpgradeToPro.vue'

const props = defineProps({
  themes: {
    type: Array,
    required: true,
  },
})

const { name: themeName, global: globalTheme } = useTheme()

const {
  state: currentThemeName,
  next: getNextThemeName,
  index: currentThemeIndex,
} = useCycleList(
  props.themes.map((t) => t.name),
  { initialValue: themeName },
)

const changeTheme = () => {
  globalTheme.name.value = getNextThemeName()
}

// Update icon if theme is changed from other sources
watch(
  () => globalTheme.name.value,
  (val) => {
    currentThemeName.value = val
  },
)
</script>

<template>
  <VBtn icon variant="text" color="default" size="small" @click="changeTheme">
    <VIcon :icon="props.themes[currentThemeIndex].icon" size="24" />
    <VTooltip activator="parent" open-delay="1000" scroll-strategy="close">
      <span class="text-capitalize">{{ currentThemeName }}</span>
    </VTooltip>
  </VBtn>
</template>
