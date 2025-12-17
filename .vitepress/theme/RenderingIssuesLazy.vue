<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue'

// Lazy load the heavy RenderingIssues component only when needed
const RenderingIssues = defineAsyncComponent(() => import('./RenderingIssues.vue'))

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  },
  lgAndUp: {
    type: Boolean,
    default: true
  },
  md: {
    type: Boolean,
    default: false
  },
  sm: {
    type: Boolean,
    default: false
  },
  xs: {
    type: Boolean,
    default: false
  }
})

const shouldLoad = ref(false)

onMounted(() => {
  // Use Intersection Observer to load component when it's about to be visible
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        shouldLoad.value = true
        observer.disconnect()
      }
    },
    { rootMargin: '200px' } // Start loading 200px before component is visible
  )

  const el = document.querySelector('#no-rendering-issues')
  if (el) {
    observer.observe(el)
  } else {
    // Fallback: load immediately if element not found
    shouldLoad.value = true
  }
})
</script>

<template>
  <div>
    <RenderingIssues
      v-if="shouldLoad"
      :is-dark="isDark"
      :lg-and-up="lgAndUp"
      :md="md"
      :sm="sm"
      :xs="xs"
    />
    <div v-else style="min-height: 400px; display: flex; align-items: center; justify-content: center;">
      <div style="color: var(--vp-c-text-2);">Loading...</div>
    </div>
  </div>
</template>
