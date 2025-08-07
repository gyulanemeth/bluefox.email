import { generateCaptcha } from '../../../connectors/bluefoxEmailToolsApi.js'

export function loadCaptchaFromStorage() {
  if (typeof window === 'undefined') return {}
  
  try {
    const stored = {
      probe: localStorage.getItem('captchaProbe'),
      image: localStorage.getItem('captchaImage'),
      expires: localStorage.getItem('captchaExpires'),
      solvedUntil: localStorage.getItem('captchaSolvedUntil')
    }
    
    return {
      probe: stored.probe || null,
      image: stored.image || null,
      expires: parseInt(stored.expires) || 0,
      solvedUntil: parseInt(stored.solvedUntil) || 0
    }
  } catch (err) {
    console.warn('Failed to load captcha from storage:', err)
    return {}
  }
}

export function saveCaptchaToStorage(captchaState) {
  if (typeof window === 'undefined') return
  
  try {
    if (captchaState.probe) {
      localStorage.setItem('captchaProbe', captchaState.probe)
    } else {
      localStorage.removeItem('captchaProbe')
    }
    
    if (captchaState.image) {
      localStorage.setItem('captchaImage', captchaState.image)
    } else {
      localStorage.removeItem('captchaImage')
    }
    
    localStorage.setItem('captchaExpires', captchaState.expires.toString())
    localStorage.setItem('captchaSolvedUntil', captchaState.solvedUntil.toString())
  } catch (err) {
    console.warn('Failed to save captcha to storage:', err)
  }
}

export async function loadNewCaptcha() {
  try {
    const { probe, image, expires } = await generateCaptcha()
    
    const captchaState = {
      probe,
      image,
      expires,
      solvedUntil: 0
    }
    
    // Save to localStorage
    saveCaptchaToStorage(captchaState)
    
    return captchaState
  } catch (err) {
    console.error('Failed to load captcha:', err)
    throw err
  }
}

export function clearCaptchaStorage() {
  const emptyCaptchaState = {
    probe: null,
    image: null,
    expires: 0,
    solvedUntil: 0
  }
  
  saveCaptchaToStorage(emptyCaptchaState)
  
  return emptyCaptchaState
}

export function markCaptchaSolved(expires) {
  const captchaState = loadCaptchaFromStorage()
  captchaState.solvedUntil = expires
  saveCaptchaToStorage(captchaState)
  return captchaState
}
