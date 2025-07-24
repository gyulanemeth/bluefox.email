// useCaptcha.js (stateless, NO localStorage)
import { ref } from 'vue'

const captchaProbe    = ref(null)
const captchaImage    = ref(null)
const captchaExpires  = ref(0)
const captchaLoading  = ref(false)

async function loadCaptcha() {
  captchaLoading.value = true
  try {
    const API_URL = import.meta.env.VITE_TOOLS_API_URL
    const res = await fetch(`${API_URL}/v1/captcha/generate`)
    const { result } = await res.json()
    captchaProbe.value   = result.captcha.probe
    captchaImage.value   = result.captcha.image
    captchaExpires.value = result.captcha.expires
  } catch (error) {
    captchaProbe.value = null
    captchaImage.value = null
    captchaExpires.value = 0
    throw error
  } finally {
    captchaLoading.value = false
  }
}

export function useCaptcha() {
  return {
    captchaProbe,
    captchaImage,
    captchaExpires,
    captchaLoading,
    loadCaptcha
  }
}
