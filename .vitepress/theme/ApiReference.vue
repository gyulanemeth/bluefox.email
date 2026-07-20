<template>
  <div ref="redocContainer" class="api-reference-redoc">
    <p v-if="loadFailed">
      Could not load the interactive reference. View the raw spec at
      <a :href="specUrl">{{ specUrl }}</a>.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  specUrl: { type: String, default: `${import.meta.env.VITE_BLUEFOX_URL}/v1/openapi.json` }
})

const redocContainer = ref(null)
const loadFailed = ref(false)

function loadRedocScript() {
  return new Promise((resolve, reject) => {
    if (window.Redoc) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Redoc'))
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  try {
    await loadRedocScript()
    window.Redoc.init(props.specUrl, {
      expandResponses: '200,201',
      hideDownloadButton: false,
      theme: {
        colors: {
          primary: { main: '#13B0EE' },
          text: { primary: '#1a1a2e', secondary: '#4b5563' },
          border: { dark: '#e2e8f0', light: '#f1f5f9' },
          http: { get: '#13B0EE', post: '#392C91', put: '#b45309', patch: '#b45309', delete: '#dc2626' }
        },
        sidebar: {
          width: '260px',
          backgroundColor: '#ffffff',
          textColor: '#1a1a2e',
          activeTextColor: '#13B0EE'
        },
        rightPanel: {
          backgroundColor: '#1a1a2e',
          textColor: '#e5e7eb'
        }
      }
    }, redocContainer.value)
  } catch (e) {
    loadFailed.value = true
  }
})
</script>

<style scoped>
.api-reference-redoc {
  min-height: 60vh;
}
</style>
