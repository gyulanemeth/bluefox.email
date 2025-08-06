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

  const markSolved = () => {
    if (!isProbeExpired.value) {
      captchaSolvedUntil.value = captchaExpires.value
    }
  }

  const loadCaptcha = async () => {
    captchaLoading.value = true
    try {
      const API_URL = import.meta.env.VITE_TOOLS_API_URL
      if (!API_URL) throw new Error('Missing API URL')

      const res = await fetch(`${API_URL}/v1/captcha/generate`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const { result } = await res.json()
      if (!result?.captcha) throw new Error('Bad response')

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

  const refreshCaptcha = async () => {
    clearSession()
    await loadCaptcha()
  }

  const clearSession = () => {
    captchaProbe.value = null
    captchaImage.value = null
    captchaExpires.value = 0
    captchaSolvedUntil.value = 0
  }

  return {
    captchaProbe,
    captchaImage,
    captchaLoading,
    captchaExpires,

    isProbeExpired,
    isSolved,
    shouldShowCaptcha,

    loadCaptcha,
    refreshCaptcha,
    markSolved,
    clearSession,
    now
  }
}
