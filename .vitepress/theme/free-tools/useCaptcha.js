import { ref, computed } from 'vue'

const PROBE_KEY = 'captchaProbe'
const IMAGE_KEY = 'captchaImage'
const EXPIRES_KEY = 'captchaExpires'
const SOLVED_UNTIL_KEY = 'captchaSolvedUntil'

// Enhanced error configuration matching backend responses
const CAPTCHA_ERRORS = {
  EXPIRED: {
    message: 'Your security verification has expired. Please complete the new verification above.',
    action: 'refresh',
    severity: 'warning',
    autoResolve: true
  },
  INCORRECT: {
    message: 'The characters you entered don\'t match the image. Please try again with the new verification.',
    action: 'refresh',
    severity: 'error',
    autoResolve: true
  },
  MISSING_TEXT: {
    message: 'Please enter the characters shown in the verification image to continue.',
    action: 'focus',
    severity: 'info',
    autoResolve: false
  },
  MISSING_PROBE: {
    message: 'Security verification is required. Please load the verification image first.',
    action: 'load',
    severity: 'warning',
    autoResolve: false
  },
  NETWORK_ERROR: {
    message: 'Unable to connect to verification service. Please check your connection and try again.',
    action: 'retry',
    severity: 'error',
    autoResolve: false
  },
  LOAD_FAILED: {
    message: 'Failed to load verification image. Please try again.',
    action: 'retry',
    severity: 'error',
    autoResolve: false
  },
  SERVER_ERROR: {
    message: 'Server error occurred. Please try again later.',
    action: 'retry',
    severity: 'error',
    autoResolve: false
  }
}

function now() {
  return Math.floor(Date.now() / 1000)
}

// Detect if running in browser
const isBrowser = typeof window !== 'undefined'

// Global error state (shared across all instances)
const globalErrorState = ref({
  message: '',
  type: null,
  severity: 'info',
  timestamp: null,
  context: null
})

// Individual captcha states (per instance)
function createCaptchaState() {
  return {
    captchaProbe: ref(isBrowser ? localStorage.getItem(PROBE_KEY) : null),
    captchaImage: ref(isBrowser ? localStorage.getItem(IMAGE_KEY) : null),
    captchaExpires: ref(isBrowser ? Number(localStorage.getItem(EXPIRES_KEY)) || 0 : 0),
    captchaSolvedUntil: ref(isBrowser ? Number(localStorage.getItem(SOLVED_UNTIL_KEY)) || 0 : 0),
    captchaLoading: ref(false)
  }
}

export function useCaptcha(context = 'default') {
  const state = createCaptchaState()
  
  // Computed flags
  const isProbeExpired = computed(() =>
    !state.captchaProbe.value || now() > state.captchaExpires.value
  )
  
  const isSolved = computed(() =>
    state.captchaSolvedUntil.value > now() && !isProbeExpired.value
  )
  
  const shouldShowCaptcha = computed(() =>
    !isSolved.value ||
    isProbeExpired.value ||
    !state.captchaProbe.value ||
    !state.captchaImage.value
  )

  // Real-time expiry check with buffer
  const isCurrentlyExpired = () => {
    if (!state.captchaProbe.value || !state.captchaExpires.value) return true
    
    const currentTime = now()
    const expiryTime = state.captchaExpires.value
    
    // Add 10-second buffer to account for network delays
    const bufferTime = 10
    return currentTime > (expiryTime - bufferTime)
  }

  // Error management functions
  const clearError = () => {
    globalErrorState.value = {
      message: '',
      type: null,
      severity: 'info',
      timestamp: null,
      context: null
    }
  }

  const setError = (errorType, customMessage = null, errorContext = null) => {
    const errorConfig = CAPTCHA_ERRORS[errorType]
    if (!errorConfig) {
      console.warn(`Unknown error type: ${errorType}`)
      return
    }

    globalErrorState.value = {
      message: customMessage || errorConfig.message,
      type: errorType,
      severity: errorConfig.severity,
      timestamp: Date.now(),
      context: errorContext || context
    }
  }

  const hasError = computed(() => !!globalErrorState.value.message)
  
  const currentError = computed(() => globalErrorState.value)

  // Enhanced load captcha with error handling
  async function loadCaptcha() {
    state.captchaLoading.value = true
    clearError()
    
    try {
      const API_URL = import.meta.env.VITE_TOOLS_API_URL
      if (!API_URL) {
        throw new Error('API URL not configured')
      }

      const res = await fetch(`${API_URL}/v1/captcha/generate`)
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }
      
      const { result } = await res.json()
      
      if (!result?.captcha) {
        throw new Error('Invalid response format')
      }
      
      const { probe, image, expires } = result.captcha

      // Update state
      state.captchaProbe.value = probe
      state.captchaImage.value = image
      state.captchaExpires.value = expires

      // Update localStorage
      if (isBrowser) {
        localStorage.setItem(PROBE_KEY, String(probe))
        localStorage.setItem(IMAGE_KEY, String(image))
        localStorage.setItem(EXPIRES_KEY, String(expires))
        localStorage.removeItem(SOLVED_UNTIL_KEY)
      }

      state.captchaSolvedUntil.value = 0

    } catch (err) {
      console.error('Failed to load captcha:', err)
      setError('LOAD_FAILED', `Failed to load verification: ${err.message}`)
      clearSession()
      throw err
    } finally {
      state.captchaLoading.value = false
    }
  }

  // Enhanced refresh captcha with reason tracking
  async function refreshCaptcha(reason = 'manual') {
    try {
      clearError()
      clearSession()
      await loadCaptcha()
      
      // Set contextual error message based on refresh reason
      if (reason === 'expired') {
        setError('EXPIRED')
      } else if (reason === 'incorrect') {
        setError('INCORRECT')
      }
    } catch (error) {
      setError('LOAD_FAILED')
    }
  }

  // Mark current probe as solved
  function markSolved() {
    if (!isProbeExpired.value) {
      state.captchaSolvedUntil.value = state.captchaExpires.value
      if (isBrowser) {
        localStorage.setItem(SOLVED_UNTIL_KEY, String(state.captchaExpires.value))
      }
      clearError() // Clear any existing errors on successful solve
    }
  }

  // Clear everything
  function clearSession() {
    state.captchaProbe.value = null
    state.captchaImage.value = null
    state.captchaExpires.value = 0
    state.captchaSolvedUntil.value = 0

    if (isBrowser) {
      localStorage.removeItem(PROBE_KEY)
      localStorage.removeItem(IMAGE_KEY)
      localStorage.removeItem(EXPIRES_KEY)
      localStorage.removeItem(SOLVED_UNTIL_KEY)
    }
  }

  // Validation functions
  function validateCaptchaInput(inputText) {
    if (!state.captchaProbe.value) {
      setError('MISSING_PROBE')
      return false
    }
    
    if (!inputText?.trim()) {
      setError('MISSING_TEXT')
      return false
    }
    
    return true
  }

  // Enhanced server error handling that matches backend responses
  function handleServerError(serverMessage, serverResponse = null) {
    const lowerMsg = serverMessage.toLowerCase()
    
    if (lowerMsg.includes('captcha')) {
      // Match backend error messages exactly
      if (lowerMsg.includes('expired') || lowerMsg.includes('expire')) {
        setError('EXPIRED')
        return 'expired'
      } 
      else if (lowerMsg.includes('don\'t match') || lowerMsg.includes('incorrect') || lowerMsg.includes('invalid') || lowerMsg.includes('wrong')) {
        setError('INCORRECT')
        return 'incorrect'
      }
      else if (lowerMsg.includes('enter the characters') || lowerMsg.includes('missing')) {
        setError('MISSING_TEXT')
        return 'missing'
      }
      else {
        // Generic captcha error - but still distinct
        setError('INCORRECT', 'Security verification failed. Please try again with the new verification.')
        return 'incorrect'
      }
    } else {
      setError('SERVER_ERROR', `Server Error: ${serverMessage}`)
      return 'server_error'
    }
  }

  // Auto-resolve errors that can be fixed automatically
  async function autoResolveError() {
    const errorType = globalErrorState.value.type
    const errorConfig = CAPTCHA_ERRORS[errorType]
    
    if (!errorConfig?.autoResolve) {
      return false
    }

    try {
      if (errorType === 'EXPIRED' || errorType === 'INCORRECT') {
        await refreshCaptcha(errorType.toLowerCase())
        return true
      }
    } catch (error) {
      console.error('Auto-resolve failed:', error)
      return false
    }
    
    return false
  }

  return {
    // State
    captchaProbe: state.captchaProbe,
    captchaImage: state.captchaImage,
    captchaExpires: state.captchaExpires,
    captchaLoading: state.captchaLoading,
    captchaSolvedUntil: state.captchaSolvedUntil,
    
    // Computed
    isProbeExpired,
    isSolved,
    shouldShowCaptcha,
    hasError,
    currentError,
    
    // Actions
    loadCaptcha,
    refreshCaptcha,
    markSolved,
    clearSession,
    
    // Error Management
    setError,
    clearError,
    handleServerError,
    validateCaptchaInput,
    autoResolveError,
    isCurrentlyExpired,
    now,
    
    // Constants
    CAPTCHA_ERRORS
  }
}
