import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const now = () => Math.floor(Date.now() / 1000)

export function useCaptcha() {
  const captchaProbe = useLocalStorage('captchaProbe', null)
  const captchaImage = useLocalStorage('captchaImage', null)
  const captchaExpires = useLocalStorage('captchaExpires', 0)
  const captchaSolvedUntil = useLocalStorage('captchaSolvedUntil', 0)
  const captchaLoading = ref(false)

  const isProbeExpired = computed(() =>
    !captchaProbe.value || now() > captchaExpires.value
  )

  const isSolved = computed(() =>
    captchaSolvedUntil.value > now() && !isProbeExpired.value
  )

  const shouldShowCaptcha = computed(() =>
    !isSolved.value ||
    isProbeExpired.value ||
    !captchaProbe.value ||
    !captchaImage.value
  )

  async function loadCaptcha() {
    captchaLoading.value = true
    try {
      const API_URL = import.meta.env.VITE_TOOLS_API_URL
      if (!API_URL) {
        throw new Error('Missing API URL')
      }

      const res = await fetch(`${API_URL}/v1/captcha/generate`)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const { result } = await res.json()
      if (!result?.captcha) {
        throw new Error('Bad response')
      }

      const { probe, image, expires } = result.captcha

      captchaProbe.value = probe
      captchaImage.value = image
      captchaExpires.value = expires
      captchaSolvedUntil.value = 0

    } catch (err) {
      console.error('Failed to load captcha:', err)
      clearSession()
    } finally {
      captchaLoading.value = false
    }
  }

  async function refreshCaptcha() {
    clearSession()
    await loadCaptcha()
  }

  function markSolved() {
    if (!isProbeExpired.value) {
      captchaSolvedUntil.value = captchaExpires.value
    }
  }

  function clearSession() {
    captchaProbe.value = null
    captchaImage.value = null
    captchaExpires.value = 0
    captchaSolvedUntil.value = 0
  }

  return {
    // Getter functions instead of direct refs
    getCaptchaProbe: () => captchaProbe.value,
    getCaptchaImage: () => captchaImage.value,
    getCaptchaLoading: () => captchaLoading.value,
    getCaptchaExpires: () => captchaExpires.value,
    
    // State checkers
    getIsProbeExpired: () => isProbeExpired.value,
    getIsSolved: () => isSolved.value,
    getShouldShowCaptcha: () => shouldShowCaptcha.value,
    
    // Action functions
    loadCaptcha,
    refreshCaptcha,
    markSolved,
    clearSession,
  }
}