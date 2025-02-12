<script setup>
import { defineProps } from 'vue'

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
  }
})
</script>

<template>
  <div class="navBtnDiv d-flex align-center">
    <v-btn
      :variant="variant"
      :color="color"
      density="comfortable"
      :href="link"
      target="_blank"
      class="no-uppercase "
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
