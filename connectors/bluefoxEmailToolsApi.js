const BASE_URL = import.meta.env.VITE_TOOLS_API_URL

if (!BASE_URL) {
  throw new Error('VITE_TOOLS_API_URL not set')
}

export async function checkMx({ domain, turnstileToken }) {
  const body = {
    domain: domain.trim(),
    turnstileToken
  }

  const response = await fetch(`${BASE_URL}/v1/analyze-mx`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  const json = await response.json()

  if (!response.ok) {
    const error = new Error(json.error?.message || json.message || 'API error')
    error.status = response.status
    throw error
  }

  return json
}

export async function checkSpf({ domain, testIp, turnstileToken }) {
  const body = {
    domain: domain.trim(),
    turnstileToken
  }

  if (testIp) {
    body.testIp = testIp.trim()
  }

  const response = await fetch(`${BASE_URL}/v1/analyze-spf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  const json = await response.json()

  if (!response.ok) {
    const error = new Error(json.error?.message || json.message || 'API error')
    error.status = response.status
    throw error
  }

  return json
}

export async function checkDmarc({ domain, turnstileToken }) {
  const body = {
    domain: domain.trim(),
    turnstileToken
  }

  const response = await fetch(`${BASE_URL}/v1/analyze-dmarc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  const json = await response.json()

  if (!response.ok) {
    const error = new Error(json.error?.message || json.message || 'API error')
    error.status = response.status
    throw error
  }

  return json
}

export async function analyzeDmarcReport({ xmlContent, file, turnstileToken }) {
  if (file) {
    // File upload using FormData
    const formData = new FormData()
    formData.append('file', file)
    formData.append('turnstileToken', turnstileToken || '')

    const response = await fetch(`${BASE_URL}/v1/analyze-dmarc-report`, {
      method: 'POST',
      body: formData
    })

    const json = await response.json()

    if (!response.ok) {
      const error = new Error(json.error?.message || json.message || 'API error')
      error.status = response.status
      throw error
    }

    return json
  } else {
    // multipart/form-data with XML content
    const formData = new FormData()
    formData.append('xmlContent', xmlContent || '')
    formData.append('turnstileToken', turnstileToken || '')

    const response = await fetch(`${BASE_URL}/v1/analyze-dmarc-report`, {
      method: 'POST',
      body: formData
    })

    const json = await response.json()

    if (!response.ok) {
      const error = new Error(json.error?.message || json.message || 'API error')
      error.status = response.status
      throw error
    }

    return json
  }
}

export async function checkDkim({ domain, selector, turnstileToken }) {
  const body = {
    domain: domain.trim(),
    selector: selector ? selector.trim() : 'default',
    turnstileToken
  }

  const response = await fetch(`${BASE_URL}/v1/analyze-dkim`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  const json = await response.json()

  if (!response.ok) {
    const error = new Error(json.error?.message || json.message || 'API error')
    error.status = response.status
    throw error
  }

  return json
}

export async function checkLinks({ urls, timeout, includeProxy, turnstileToken }) {
  const body = {
    urls: typeof urls === 'string' ? urls.trim() : urls,
    turnstileToken
  }

  if (timeout) {
    body.timeout = timeout
  }

  if (includeProxy !== undefined) {
    body.includeProxy = includeProxy
  }

  const response = await fetch(`${BASE_URL}/v1/check-links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  const json = await response.json()

  if (!response.ok) {
    const error = new Error(json.error?.message || json.message || 'API error')
    error.status = response.status
    throw error
  }

  return json
}

export function getProxiedUrl(url) {
  if (!url) return null
  return `${BASE_URL}/v1/proxy?url=${url}`
}

export async function getPagePreview(url) {
  if (!url || !url.trim()) {
    throw new Error('URL parameter is required')
  }

  const response = await fetch(`${BASE_URL}/v1/proxy?url=${url.trim()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })

  const json = await response.json()

  if (!response.ok) {
    const error = new Error(json.error?.message || json.message || 'API error')
    error.status = response.status
    throw error
  }

  return json
}
