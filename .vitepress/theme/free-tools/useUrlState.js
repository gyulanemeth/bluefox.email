import { ref, watch, nextTick } from 'vue'

export function useUrlState(options = {}) {
  const {
    fields = ['domain'],
    autoExecute = true,
    onAutoExecute = null,
    debounceMs = 300,
  } = options

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

  function shouldIncludeInUrl(field) {
    return !EXCLUDED_FIELDS.includes(field)
  }

  function getFieldValue(field) {
    const value = state[field]?.value
    return typeof value === 'string' ? value.trim() : value
  }

  // Update URL based on a given object of field:value
  function updateURLWithParams(params) {
    clearTimeout(urlUpdateTimer)

    urlUpdateTimer = setTimeout(() => {
      const queryParams = new URLSearchParams()

      // Iterate over fields, set from params or current state
      fields.forEach(field => {
        if (shouldIncludeInUrl(field)) {
          const val = params.hasOwnProperty(field) ? params[field] : getFieldValue(field)
          if (val && val.toString().trim() !== '') {
            queryParams.set(field, val.toString().trim())
          }
        }
      })

      if (typeof window !== 'undefined') {
        const baseUrl = window.location.pathname
        const queryString = queryParams.toString()
        const newUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl
        window.history.replaceState({}, '', newUrl)
      }
    }, debounceMs)
  }

  // Update reactive state fields from provided params
  function updateStateWithParams(params) {
    Object.keys(params).forEach(key => {
      if (state[key] && typeof params[key] !== 'undefined') {
        state[key].value = params[key]
      }
    })
  }

  // Load all state fields from URL on init
  function loadFromURL() {
    if (typeof window === 'undefined') return

    const urlParams = new URLSearchParams(window.location.search)
    fields.forEach(field => {
      if (state[field] && shouldIncludeInUrl(field)) {
        const val = urlParams.get(field)
        if (val !== null) {
          state[field].value = val
        }
      }
    })
  }

  // Watch reactive fields and run callback (default updates URL)
  function setupWatchers(callback = updateURLCallback) {
    const watchFields = fields
      .filter(shouldIncludeInUrl)
      .map(field => state[field])
      .filter(Boolean)

    if (watchFields.length > 0) {
      watch(watchFields, callback, { deep: true })
    }
  }

  // Default watch callback updates URL with current state
  function updateURLCallback() {
    const currentParams = {}
    fields.forEach(field => {
      if (shouldIncludeInUrl(field)) {
        currentParams[field] = getFieldValue(field)
      }
    })
    updateURLWithParams(currentParams)
  }

  // Clear URL query params, reload without them
  function clearURL() {
    if (typeof window === 'undefined') return

    const baseUrl = window.location.pathname
    window.history.replaceState({}, '', baseUrl)
  }

  // Reset all state fields to empty string
  function resetState() {
    fields.forEach(field => {
      if (state[field]) {
        state[field].value = ''
      }
    })
  }

  function canAutoExecute() {
    return autoExecute && onAutoExecute && state.domain?.value?.trim()
  }

  async function performAutoExecution() {
    if (!canAutoExecute()) return

    await nextTick()
    setTimeout(() => {
      onAutoExecute()
    }, 100)
  }

  // Main initialization function to call from component's onMounted
  async function initialize() {
    try {
      loadFromURL()
      setupWatchers()
      await performAutoExecution()
    } catch (error) {
      console.error('URL state initialization failed:', error)
    }
  }

  return {
    getFieldValue,
    setFieldValue: (field, val) => {

      if (!state[field]) {
        console.warn(`Field '${field}' not found`)
        return
      }
      state[field].value = val
      updateURLWithParams({ [field]: val })
    },

    updateURLWithParams,
    updateStateWithParams,

    clearURL,
    resetState,
    initialize,
    state,
  }
}
