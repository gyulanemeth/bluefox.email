<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

const emit = defineEmits(['verified', 'expired', 'error'])

const container = ref(null)
let widgetId = null
let tokenResolve = null
let tokenReject = null

function loadScript() {
  return new Promise((resolve, reject) => {
    if (window.turnstile) {
      return resolve()
    }

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
    if (window.turnstile) {
      return resolve()
    }
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

// Runs the (hidden) challenge on demand and resolves with the token.
// Cloudflare only shows UI if it decides an interaction is needed.
function getToken() {
  return new Promise((resolve, reject) => {
    if (!window.turnstile || widgetId === null) {
      return reject(new Error('Turnstile not ready'))
    }
    tokenResolve = resolve
    tokenReject = reject
    window.turnstile.reset(widgetId)
    window.turnstile.execute(widgetId)
  })
}

defineExpose({ reset, getToken })

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
      appearance: 'interaction-only',
      execution: 'execute',
      callback: (token) => {
        emit('verified', token)
        if (tokenResolve) {
          tokenResolve(token)
          tokenResolve = tokenReject = null
        }
      },
      'expired-callback': () => emit('expired'),
      'error-callback': () => {
        emit('error')
        if (tokenReject) {
          tokenReject(new Error('Turnstile verification failed'))
          tokenResolve = tokenReject = null
        }
      }
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
