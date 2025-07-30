import { ref, computed } from 'vue'

const PROBE_KEY        = 'captchaProbe'
const IMAGE_KEY        = 'captchaImage'
const EXPIRES_KEY      = 'captchaExpires'
const SOLVED_UNTIL_KEY = 'captchaSolvedUntil'

function now() {
  return Math.floor(Date.now() / 1000)
}

// Detect if running in browser (localStorage available)
const isBrowser = typeof window !== 'undefined'

// — reactive values, initialized from localStorage in browser —
const captchaProbe       = ref(isBrowser ? localStorage.getItem(PROBE_KEY) : null)
const captchaImage       = ref(isBrowser ? localStorage.getItem(IMAGE_KEY) : null)
const captchaExpires     = ref(isBrowser ? Number(localStorage.getItem(EXPIRES_KEY)) || 0 : 0)
const captchaSolvedUntil = ref(isBrowser ? Number(localStorage.getItem(SOLVED_UNTIL_KEY)) || 0 : 0)
const captchaLoading     = ref(false)

// — computed flags —
const isProbeExpired = computed(() =>
  !captchaProbe.value || now() > captchaExpires.value
)
const isSolved = computed(() =>
  captchaSolvedUntil.value > now() && !isProbeExpired.value
)

// — load a fresh captcha —
async function loadCaptcha() {
  captchaLoading.value = true
  try {
    const API_URL = import.meta.env.VITE_TOOLS_API_URL
    const res     = await fetch(`${API_URL}/v1/captcha/generate`)
    const { result } = await res.json()
    const { probe, image, expires } = result.captcha

    captchaProbe.value   = probe
    captchaImage.value   = image
    captchaExpires.value = expires

    if (isBrowser) {
      localStorage.setItem(PROBE_KEY, String(probe))
      localStorage.setItem(IMAGE_KEY, String(image))
      localStorage.setItem(EXPIRES_KEY, String(expires))
      localStorage.removeItem(SOLVED_UNTIL_KEY)
    }

    captchaSolvedUntil.value = 0

  } catch (err) {
    clearSession()
    throw err
  } finally {
    captchaLoading.value = false
  }
}

// — mark current probe as solved —
function markSolved() {
  if (!isProbeExpired.value) {
    captchaSolvedUntil.value = captchaExpires.value
    if (isBrowser) {
      localStorage.setItem(SOLVED_UNTIL_KEY, String(captchaExpires.value))
    }
  }
}

// — clear everything —
function clearSession() {
  captchaProbe.value       = null
  captchaImage.value       = null
  captchaExpires.value     = 0
  captchaSolvedUntil.value = 0

  if (isBrowser) {
    localStorage.removeItem(PROBE_KEY)
    localStorage.removeItem(IMAGE_KEY)
    localStorage.removeItem(EXPIRES_KEY)
    localStorage.removeItem(SOLVED_UNTIL_KEY)
  }
}

export function useCaptcha() {
  return {
    captchaProbe,
    captchaImage,
    captchaExpires,
    captchaLoading,
    isProbeExpired,
    isSolved,
    loadCaptcha,
    markSolved,
    clearSession
  }
}
