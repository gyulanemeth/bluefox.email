// Cookie consent + Google Consent Mode v2.
//
// The stored choice lives in localStorage under CONSENT_STORAGE_KEY as
// { analytics: boolean, advertising: boolean }. Bump CONSENT_VERSION to ask
// every visitor again (old keys are ignored and cleaned up).
export const CONSENT_VERSION = 1
export const CONSENT_STORAGE_KEY = `bluefox_consent_v${CONSENT_VERSION}`
const CONSENT_KEY_PREFIX = 'bluefox_consent_v'

// Event the "Cookie settings" link dispatches to reopen the preferences.
export const OPEN_CONSENT_EVENT = 'bluefox:open-cookie-settings'

export function toGoogleConsent({ analytics, advertising }) {
  const ads = advertising ? 'granted' : 'denied'
  return {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  }
}

// Inline <head> script. It must run before gtag.js and the gtag('config')
// calls: it sets every signal to denied, then immediately applies a stored
// choice, so Google tags never start with consent they were not given.
export const consentDefaultsScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'});
gtag('set', 'ads_data_redaction', true);
try {
  var c = JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}'));
  if (c && typeof c.analytics === 'boolean' && typeof c.advertising === 'boolean') {
    var ads = c.advertising ? 'granted' : 'denied';
    gtag('consent', 'update', {analytics_storage: c.analytics ? 'granted' : 'denied', ad_storage: ads, ad_user_data: ads, ad_personalization: ads});
  }
} catch (e) {}`

export function readConsent() {
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY))
    if (stored && typeof stored.analytics === 'boolean' && typeof stored.advertising === 'boolean') {
      return { analytics: stored.analytics, advertising: stored.advertising }
    }
  } catch (e) {
    // Storage blocked or corrupt: treat as no choice made.
  }
  return null
}

function removeOldConsentKeys() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(CONSENT_KEY_PREFIX) && key !== CONSENT_STORAGE_KEY)
      .forEach((key) => localStorage.removeItem(key))
  } catch (e) {}
}

// Google tags stop reading/writing their cookies once consent is denied, but
// cookies set earlier stay behind. Remove them when consent is withdrawn.
function deleteCookies(prefixes) {
  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  document.cookie.split(';').forEach((part) => {
    const name = part.split('=')[0].trim()
    if (!prefixes.some((prefix) => name.startsWith(prefix))) {
      return
    }
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`
    })
  })
}

export function saveConsent(choice) {
  const previous = readConsent()
  const next = { analytics: !!choice.analytics, advertising: !!choice.advertising }
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next))
  } catch (e) {}
  removeOldConsentKeys()

  window.dataLayer = window.dataLayer || []
  const gtag = window.gtag || function () { window.dataLayer.push(arguments) }
  gtag('consent', 'update', toGoogleConsent(next))

  if (previous?.analytics && !next.analytics) {
    deleteCookies(['_ga'])
  }
  if (previous?.advertising && !next.advertising) {
    deleteCookies(['_gcl', '_gac'])
  }
  return next
}

export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT))
}
