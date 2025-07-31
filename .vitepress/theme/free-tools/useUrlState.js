import { ref, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vitepress'

export function useUrlState(options = {}) {
  const {
    fields = ['domain'],
    autoExecute = true,
    onAutoExecute = null,
    debounceMs = 300
  } = options

  const router = useRouter()
  const route = useRoute()

  // Fields that should never appear in URL
  const EXCLUDED_FIELDS = ['captchaText', 'captchaProbe', 'captchaImage']
  const state = createReactiveState(fields)
  let urlUpdateTimer = null

  function createReactiveState(fieldNames) {
    const reactiveState = {}
    fieldNames.forEach(field => {
      reactiveState[field] = ref('')
    })
    return reactiveState
  }

  // Updates URL with current field values (debounced)
  function updateURL() {
    clearTimeout(urlUpdateTimer)
    
    urlUpdateTimer = setTimeout(() => {
      const newQuery = buildQueryObject()
      const newUrl = buildNewUrl(newQuery)
      
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', newUrl)
      }
    }, debounceMs)
  }

  function buildQueryObject() {
    const queryParams = new URLSearchParams()
    
    fields.forEach(field => {
      if (shouldIncludeInUrl(field)) {
        const value = getFieldValue(field)
        if (value) {
          queryParams.set(field, value)
        }
      }
    })
    
    return queryParams
  }

  function buildNewUrl(queryParams) {
    const baseUrl = window.location.pathname
    const queryString = queryParams.toString()
    return queryString ? `${baseUrl}?${queryString}` : baseUrl
  }

  function shouldIncludeInUrl(field) {
    return !EXCLUDED_FIELDS.includes(field)
  }

  function getFieldValue(field) {
    const value = state[field]?.value
    return typeof value === 'string' ? value.trim() : value
  }

  // Loads values from URL query parameters into state
  function loadFromURL() {
    if (typeof window === 'undefined') return
    
    const urlParams = new URLSearchParams(window.location.search)
    
    fields.forEach(field => {
      const urlValue = urlParams.get(field)
      if (urlValue && state[field]) {
        state[field].value = urlValue
      }
    })
  }

  function setupURLWatchers() {
    const watchableFields = getWatchableFields()
    
    if (watchableFields.length > 0) {
      watch(watchableFields, updateURL, { deep: true })
    }
  }

  function getWatchableFields() {
    return fields
      .filter(shouldIncludeInUrl)
      .map(field => state[field])
      .filter(Boolean)
  }

  function canAutoExecute() {
    return autoExecute && onAutoExecute && state.domain?.value?.trim()
  }

  // Performs auto-execution with proper timing
  async function performAutoExecution() {
    if (!canAutoExecute()) return

    await nextTick()
    setTimeout(() => {
      onAutoExecute()
    }, 100)
  }

  // Main initialization - call this in onMounted()
  async function initialize() {
    try {
      loadFromURL()
      setupURLWatchers()
      await performAutoExecution()
    } catch (error) {
      console.error('URL state initialization failed:', error)
    }
  }

  function setField(fieldName, value) {
    if (!state[fieldName]) {
      console.warn(`Field '${fieldName}' not found in URL state`)
      return
    }
    
    state[fieldName].value = value
    updateURL()
  }

  function getShareableURL() {
    if (typeof window === 'undefined') return ''
    
    const baseURL = `${window.location.origin}${window.location.pathname}`
    const queryParams = new URLSearchParams()
    
    fields.forEach(field => {
      if (shouldIncludeInUrl(field)) {
        const value = getFieldValue(field)
        if (value) {
          queryParams.set(field, value)
        }
      }
    })
    
    const queryString = queryParams.toString()
    return queryString ? `${baseURL}?${queryString}` : baseURL
  }

  function clearURL() {
    if (typeof window === 'undefined') return
    
    const baseUrl = window.location.pathname
    window.history.replaceState({}, '', baseUrl)
  }

  function resetState() {
    fields.forEach(field => {
      if (state[field]) {
        state[field].value = ''
      }
    })
  }

  return {
    // Reactive state
    ...state,
    
    // Core methods
    initialize,
    setField,
    
    // URL methods
    updateURL,
    getShareableURL,
    clearURL,
    
    // Utility methods
    resetState,
    
    // State checks
    canAutoExecute: canAutoExecute()
  }
}
