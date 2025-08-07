export function syncWithUrl(fields) {
  if (typeof window === 'undefined') return
  
  const params = new URLSearchParams()
  
  if (typeof fields === 'object' && !Array.isArray(fields)) {
    Object.entries(fields).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        params.set(key, value.toString().trim())
      }
    })
  }
  
  const newUrl = params.toString() 
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname
    
  window.history.replaceState({}, '', newUrl)
}

export function loadFromUrl(fieldRefs) {
  if (typeof window === 'undefined') return
  const urlParams = new URLSearchParams(window.location.search)
  Object.entries(fieldRefs).forEach(([key, ref]) => {
    const value = urlParams.get(key)
    if (value && ref) {
      ref.value = value
    }
  })
}
