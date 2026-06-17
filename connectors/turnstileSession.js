// Short-lived verification session.
//
// Turnstile tokens are single-use and rejected on reuse, so we can't resend
// the captcha token. Instead, after a successful verify the backend mints a
// short-lived session token. We cache it here and send it on later requests
// so the user is not re-challenged within the window.

let sessionToken = null
let expiresAt = 0

// Small safety margin so we don't send a token that expires mid-flight.
const EXPIRY_SKEW_MS = 5000

export function isSessionValid() {
  return !!sessionToken && Date.now() < expiresAt - EXPIRY_SKEW_MS
}

export function getSessionToken() {
  return isSessionValid() ? sessionToken : null
}

// expiresInSec: lifetime the backend reports for the session token.
export function setSession(token, expiresInSec) {
  if (!token || !expiresInSec) return
  sessionToken = token
  expiresAt = Date.now() + expiresInSec * 1000
}

export function clearSession() {
  sessionToken = null
  expiresAt = 0
}
