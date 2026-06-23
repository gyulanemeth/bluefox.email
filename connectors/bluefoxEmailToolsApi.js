import { getSessionToken, setSession, clearSession } from './turnstileSession.js'

const BASE_URL = import.meta.env.VITE_TOOLS_API_URL

if (!BASE_URL) {
  throw new Error('VITE_TOOLS_API_URL not set')
}

// Attach the active verification session token (if any) so the backend can
// skip the captcha within the window.
function withSession(headers = {}) {
  const token = getSessionToken()
  if (token) {
    headers['X-Turnstile-Session'] = token
  }
  return headers
}

// Persist the session token the backend mints after a fresh verify.
// analyze-* endpoints nest session under result.session; check-links keeps
// it top-level (result is an array there, so it can't be nested).
function captureSession(json) {
  const session = json?.result?.session ?? json
  if (session?.sessionToken && session?.sessionExpiresIn) {
    setSession(session.sessionToken, session.sessionExpiresIn)
  }
}

// Shared response handling: capture session on success, clear it on auth fail.
function handleResponse(response, json) {
  if (!response.ok) {
    if (response.status === 401) {
      clearSession()
    }
    const error = new Error(json.error?.message || json.message || 'API error')
    error.status = response.status
    throw error
  }
  captureSession(json)
  return json
}

export async function checkMx({ domain, turnstileToken }) {
  const body = {
    domain: domain.trim(),
    turnstileToken
  }

  const response = await fetch(`${BASE_URL}/v1/analyze-mx`, {
    method: 'POST',
    headers: withSession({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  })

  return handleResponse(response, await response.json())
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
    headers: withSession({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  })

  return handleResponse(response, await response.json())
}

export async function checkDmarc({ domain, turnstileToken }) {
  const body = {
    domain: domain.trim(),
    turnstileToken
  }

  const response = await fetch(`${BASE_URL}/v1/analyze-dmarc`, {
    method: 'POST',
    headers: withSession({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  })

  return handleResponse(response, await response.json())
}

export async function analyzeDmarcReport({ xmlContent, file, turnstileToken }) {
  const formData = new FormData()
  if (file) {
    formData.append('file', file)
  } else {
    formData.append('xmlContent', xmlContent || '')
  }
  formData.append('turnstileToken', turnstileToken || '')

  const response = await fetch(`${BASE_URL}/v1/analyze-dmarc-report`, {
    method: 'POST',
    headers: withSession(),
    body: formData
  })

  return handleResponse(response, await response.json())
}

export async function checkDkim({ domain, selector, turnstileToken }) {
  const body = {
    domain: domain.trim(),
    selector: selector ? selector.trim() : 'default',
    turnstileToken
  }

  const response = await fetch(`${BASE_URL}/v1/analyze-dkim`, {
    method: 'POST',
    headers: withSession({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  })

  return handleResponse(response, await response.json())
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
    headers: withSession({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  })

  return handleResponse(response, await response.json())
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

  return handleResponse(response, await response.json())
}
