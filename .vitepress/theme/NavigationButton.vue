<script setup>
import { useData } from 'vitepress'

const { isDark } = useData()

const props = defineProps({
  text: {
    type: String,
    default: 'Click'
  },
  link: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'flat'
  },
  color: {
    type: String,
    default: ''
  },
  screenMenu: { type: Boolean } // whether the component is inside mobile navigation menu
})
</script>

<template>
  <div :class="`navBtnDiv d-flex align-center justify-center ${screenMenu ? 'mt-4' : ''}`">
    <v-btn
      :variant="variant"
      :color="color"
      density="comfortable"
      class="no-uppercase"
      :theme="isDark? 'dark' : 'light'"
      :href="link"
      target="_blank"
    >
      {{ text }}
    </v-btn>
  </div>
</template>

<style>
.navBtnDiv {
  padding: 0 12px;
}

.no-uppercase {
  text-transform: none !important;
}
</style>
