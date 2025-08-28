const BASE_URL = import.meta.env.VITE_TOOLS_API_URL

if (!BASE_URL) {
  throw new Error('VITE_TOOLS_API_URL not set')
}

export async function checkMx({ domain, captchaProbe, captchaText }) {
  const body = {
    domain: domain.trim(),
    captchaProbe,
    captchaText: captchaText ? captchaText.trim() : ''
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

export async function checkSpf({ domain, captchaProbe, captchaText, testIp }) {
  const body = {
    domain: domain.trim(),
    captchaProbe,
    captchaText: captchaText ? captchaText.trim() : ''
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

export async function checkDmarc({ domain, captchaProbe, captchaText }) {
  const body = {
    domain: domain.trim(),
    captchaProbe,
    captchaText: captchaText ? captchaText.trim() : ''
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

export async function analyzeDmarcReport({ xmlContent, file, captchaProbe, captchaText }) {
  if (file) {
    // File upload using FormData
    const formData = new FormData()
    formData.append('file', file)
    formData.append('captchaProbe', captchaProbe || '')
    formData.append('captchaText', captchaText ? captchaText.trim() : '')

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
    // JSON request with XML content
    const body = {
      xmlContent,
      captchaProbe: captchaProbe || '',
      captchaText: captchaText ? captchaText.trim() : ''
    }

    const response = await fetch(`${BASE_URL}/v1/analyze-dmarc-report`, {
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
}

export async function checkDkim({ domain, selector, captchaProbe, captchaText }) {
  const body = {
    domain: domain.trim(),
    selector: selector ? selector.trim() : 'default',
    captchaProbe,
    captchaText: captchaText ? captchaText.trim() : ''
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

export async function checkLinks({ urls, timeout, includeProxy, captchaProbe, captchaText }) {
  const body = {
    urls: typeof urls === 'string' ? urls.trim() : urls,
    captchaProbe,
    captchaText: captchaText ? captchaText.trim() : ''
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
  return `${BASE_URL}/v1/proxy?url=${encodeURIComponent(url)}`
}

export async function generateCaptcha() {
  const response = await fetch(`${BASE_URL}/v1/captcha/generate`)

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}`)
    error.status = response.status
    throw error
  }

  const json = await response.json()

  if (!json.result?.captcha) {
    throw new Error('Invalid captcha response')
  }

  return json.result.captcha
}