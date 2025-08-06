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
