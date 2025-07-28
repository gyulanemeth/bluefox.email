// useCaptcha.js
import { ref, computed } from 'vue'

const PROBE_KEY         = 'captchaProbe'
const IMAGE_KEY         = 'captchaImage'
const EXPIRES_KEY       = 'captchaExpires'
const SOLVED_UNTIL_KEY  = 'captchaSolvedUntil'

function now() {
  return Math.floor(Date.now() / 1000)
}

// — reactive values, initialized from localStorage —
const captchaProbe        = ref(localStorage.getItem(PROBE_KEY))
const captchaImage        = ref(localStorage.getItem(IMAGE_KEY))
const captchaExpires      = ref(Number(localStorage.getItem(EXPIRES_KEY)       || 0))
const captchaSolvedUntil  = ref(Number(localStorage.getItem(SOLVED_UNTIL_KEY) || 0))
const captchaLoading      = ref(false)

// — computed flags —
const isProbeExpired = computed(() =>
  !captchaProbe.value || now() > captchaExpires.value
)
const isSolved = computed(() =>
  captchaSolvedUntil.value > now() &&
  !isProbeExpired.value
)

// — load a fresh captcha —
async function loadCaptcha() {
  captchaLoading.value = true
  try {
    const API_URL = import.meta.env.VITE_TOOLS_API_URL
    const res     = await fetch(`${API_URL}/v1/captcha/generate`)
    const { result } = await res.json()
    const { probe, image, expires } = result.captcha

    captchaProbe.value       = probe
    captchaImage.value       = image
    captchaExpires.value     = expires
    localStorage.setItem(PROBE_KEY,      probe)
    localStorage.setItem(IMAGE_KEY,      image)
    localStorage.setItem(EXPIRES_KEY,    String(expires))

    captchaSolvedUntil.value = 0
    localStorage.removeItem(SOLVED_UNTIL_KEY)
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
    localStorage.setItem(SOLVED_UNTIL_KEY, String(captchaExpires.value))
  }
}

// — clear everything —
function clearSession() {
  captchaProbe.value       = null
  captchaImage.value       = null
  captchaExpires.value     = 0
  captchaSolvedUntil.value = 0

  localStorage.removeItem(PROBE_KEY)
  localStorage.removeItem(IMAGE_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(SOLVED_UNTIL_KEY)
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
