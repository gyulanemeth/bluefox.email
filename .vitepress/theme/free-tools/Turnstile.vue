<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

const emit = defineEmits(['verified', 'expired', 'error'])

const container = ref(null)
let widgetId = null

function loadScript() {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve()

    let script = document.querySelector(`script[src="${SCRIPT_SRC}"]`)
    if (script) {
      script.addEventListener('load', resolve)
      script.addEventListener('error', reject)
      return
    }

    script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.addEventListener('load', resolve)
    script.addEventListener('error', reject)
    document.head.appendChild(script)
  })
}

// api.js may define window.turnstile slightly after the load event fires.
function waitForTurnstile() {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve()
    let tries = 0
    const timer = setInterval(() => {
      if (window.turnstile) {
        clearInterval(timer)
        resolve()
      } else if (++tries > 100) {
        clearInterval(timer)
        reject(new Error('Turnstile failed to load'))
      }
    }, 50)
  })
}

function reset() {
  if (window.turnstile && widgetId !== null) {
    window.turnstile.reset(widgetId)
  }
}

defineExpose({ reset })

onMounted(async () => {
  if (!SITE_KEY) {
    console.error('VITE_TURNSTILE_SITE_KEY not set')
    emit('error')
    return
  }

  try {
    await loadScript()
    await waitForTurnstile()
    widgetId = window.turnstile.render(container.value, {
      sitekey: SITE_KEY,
      callback: (token) => emit('verified', token),
      'expired-callback': () => emit('expired'),
      'error-callback': () => emit('error')
    })
  } catch (err) {
    console.error('Failed to render Turnstile widget:', err)
    emit('error')
  }
})

onBeforeUnmount(() => {
  if (window.turnstile && widgetId !== null) {
    window.turnstile.remove(widgetId)
  }
})
</script>

<template>
  <div ref="container" class="turnstile-widget" />
</template>

<style scoped>
.turnstile-widget {
  margin-bottom: 1rem;
}
</style>
