<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCaptcha } from './useCaptcha.js'

const API_URL          = import.meta.env.VITE_TOOLS_API_URL
const DEFAULT_SELECTOR = 'default'

const {
  captchaProbe,
  captchaImage,
  captchaExpires,
  captchaLoading,
  isProbeExpired,
  isSolved,
  loadCaptcha,
  markSolved,
  clearSession
} = useCaptcha()

const domain      = ref('')
const selector    = ref(DEFAULT_SELECTOR)
const captchaText = ref('')
const loading     = ref(false)
const error       = ref('')
const result      = ref(null)

const shouldShowCaptcha = computed(() =>
  !isSolved.value ||
  isProbeExpired.value ||
  !captchaProbe.value ||
  !captchaImage.value
)

function validateInputs() {
  if (!API_URL)             return 'API URL is not configured.'
  if (!domain.value.trim()) return 'Please enter a domain.'
  if (shouldShowCaptcha.value) {
    if (!captchaProbe.value)       return 'Please load the captcha first.'
    if (!captchaText.value.trim()) return 'Please enter the captcha text.'
  }
  return null
}

async function refreshCaptcha() {
  captchaText.value = ''
  clearSession()     // drops previous probe/image
  await loadCaptcha()
}

async function checkDkim() {
  error.value   = ''
  result.value  = null
  loading.value = true

  // If the probe itself has expired, force a new one
  if (isProbeExpired.value) {
    await refreshCaptcha()
    error.value   = 'Captcha expired — please solve the new one.'
    loading.value = false
    return
  }

  const vErr = validateInputs()
  if (vErr) {
    error.value   = vErr
    loading.value = false
    return
  }

  try {
    const payload = {
      domain:       domain.value,
      selector:     selector.value,
      captchaProbe: captchaProbe.value,
      captchaText:  captchaText.value
    }
    const res  = await fetch(`${API_URL}/v1/analyze-dkim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    })
    const json = await res.json()

    // server‐side error or invalid captcha
    if (!res.ok || !json.result?.success) {
      const msg = json.result?.error || 'Unknown error.'
      if (msg.toLowerCase().includes('captcha')) {
        // wrong or expired
        await refreshCaptcha()
        error.value = msg.toLowerCase().includes('expired')
          ? 'Captcha expired — please solve the new one.'
          : 'Captcha incorrect — please try again with the new captcha.'
      } else {
        error.value = msg
      }
      return
    }

    // success!
    result.value      = json.result
    captchaText.value = ''
    markSolved()      // globally mark this probe as OK until expiry

  } catch (e) {
    console.error(e)
    error.value = 'Network or server error.'
  } finally {
    loading.value = false
  }
}

const DKIM_TAG_DESCRIPTIONS = {
  v: "Version (always 'DKIM1').",
  k: "Key type (e.g., 'rsa').",
  p: "Public key for signature verification.",
  s: "Service type for this key.",
  h: "Allowed hash algorithms.",
  t: "DKIM flags.",
  n: "Free-form notes."
}

const dkimTags = computed(() => {
  const record = result.value?.rawRecord || result.value?.record || ''
  return record
    .split(';')
    .map(p => p.trim())
    .filter(Boolean)
    .map(pair => {
      const [tag, ...rest] = pair.split('=')
      return {
        tag: tag.trim(),
        value: rest.join('=').trim(),
        description: DKIM_TAG_DESCRIPTIONS[tag.trim()] || ''
      }
    })
})

// only fetch on mount if we have no probe or it’s expired
onMounted(async () => {
  if (!captchaProbe.value || isProbeExpired.value) {
    await loadCaptcha()
  }
})
</script>

<template>
  <div class="dkim-checker">
    <div class="tool-form">
      <form @submit.prevent="checkDkim">
        <!-- Domain -->
        <div class="form-group">
          <label for="domain">Domain:</label>
          <input
            id="domain"
            v-model="domain"
            placeholder="example.com"
            required
            :disabled="loading"
          />
        </div>

        <!-- Selector -->
        <div class="form-group">
          <label for="selector">DKIM Selector:</label>
          <input
            id="selector"
            v-model="selector"
            placeholder="default, google, etc."
            :disabled="loading"
          />
          <small class="help-text">
            Common selectors: default, google, mail, dkim…
          </small>
        </div>

        <!-- Expiration Banner -->
        <div v-if="captchaProbe && isProbeExpired" class="captcha-expired-message">
          ⚠️ Your verification has expired. Please refresh the captcha below.
        </div>

        <!-- Captcha -->
        <div class="form-group captcha-section" v-if="shouldShowCaptcha">
          <label>Security Verification:</label>
          <div class="captcha-container">
            <div class="captcha-image-container">
              <div v-if="captchaLoading" class="captcha-loading">
                Loading captcha…
              </div>
              <div
                v-else-if="captchaImage"
                class="captcha-image"
                v-html="captchaImage"
              />
              <div v-else class="captcha-placeholder">
                <button
                  type="button"
                  @click="refreshCaptcha"
                  class="load-captcha-btn"
                >
                  Load Captcha
                </button>
              </div>
            </div>
            <button
              type="button"
              @click="refreshCaptcha"
              class="refresh-captcha-btn"
              :disabled="captchaLoading"
              title="New Captcha"
            ><img src="/public/assets/reload.webp" alt="reload captcha"></button>
          </div>
          <input
            class="captcha-input"
            v-model="captchaText"
            placeholder="Enter characters above"
            required
            :disabled="loading || !captchaImage"
          />
          <small class="captcha-help">
            Enter the characters shown in the image above
          </small>
        </div>

        <button
          class="check-btn"
          type="submit"
          :disabled="loading || (shouldShowCaptcha && !captchaText)"
        >
          {{ loading ? 'Checking…' : 'Check DKIM' }}
        </button>
      </form>

      <div v-if="error" class="error-section">
        {{ error }}
      </div>
    </div>

    <div v-if="result" class="result-section">
      <h3>DKIM Check Results</h3>
      <p v-if="result.success">✓ DKIM Record Found</p>
      <p v-else>✗ DKIM Record Missing or Invalid</p>

      <div class="info-section">
        <h4>Basic Information</h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p><strong>Selector:</strong> {{ result.selector }}</p>
        <p><strong>Record:</strong>{{ result.rawRecord || result.record }}</p>
      </div>

      <div v-if="dkimTags.length" class="dkim-table-section">
        <h4>Record Breakdown</h4>
        <table class="dkim-record-table">
          <thead>
            <tr><th>Tag</th><th>Value</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr v-for="tag in dkimTags" :key="tag.tag">
              <td>{{ tag.tag }}</td>
              <td>{{ tag.value }}</td>
              <td>{{ tag.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dkim-checker {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.tool-form {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 12px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #374151);
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-1, #374151);
}

.form-group input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1, #10B1EF);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft, rgba(16, 177, 239, 0.1));
}

.form-group input:disabled {
  background: var(--vp-c-bg-mute, #f1f5f9);
  opacity: 0.6;
  cursor: not-allowed;
}

.help-text {
  display: block;
  margin-top: 0.5rem;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  font-style: italic;
}

.captcha-section {
  background: var(--vp-c-bg, #ffffff);
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.captcha-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.captcha-image-container {
  flex: 1;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff !important;
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
  border-radius: 6px;
  padding: 0.5rem;
}

.captcha-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.captcha-loading,
.captcha-placeholder {
  color: #6b7280;
  font-style: italic;
  text-align: center;
}

.load-captcha-btn {
  background: var(--vp-c-brand-1, #10B1EF);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.load-captcha-btn:hover {
  background: var(--vp-c-brand-2, #0891d4);
}

.refresh-captcha-btn {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  color: var(--vp-c-text-1, #374151);
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.refresh-captcha-btn:hover:not(:disabled) {
  background: var(--vp-c-bg, #ffffff);
  border-color: var(--vp-c-brand-1, #10B1EF);
}

.refresh-captcha-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.captcha-input {
  margin-top: 0.75rem !important;
}

.captcha-help {
  display: block;
  margin-top: 0.5rem;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  font-style: italic;
}

.check-btn {
  background: var(--vp-c-brand-1, #10B1EF);
  color: #ffffff;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.check-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2, #0891d4);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.check-btn:disabled {
  background: var(--vp-c-bg-mute, #9ca3af);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error-message {
  margin: 0;
  font-weight: 500;
  color: var(--vp-c-danger-1, #721c24);
}

.error-section {
  background: var(--vp-c-danger-soft, #f8d7da);
  color: var(--vp-c-danger-1, #721c24);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  border: 1px solid var(--vp-c-danger-2, #f5c6cb);
}

.result-section {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 12px;
  background: var(--vp-c-bg, #ffffff);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.status-box {
  background: var(--vp-c-bg-soft, #f8f9fa);
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.info-section h4,
.dkim-table-section h4 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1, #333);
  font-size: 1.15rem;
  font-weight: 600;
}

/* New/updated DKIM table styles */
.dkim-table-section .dkim-record-table {
  margin: 1rem auto;        /* center the table */
  width: auto;              /* size to content */
  table-layout: auto;       /* allow dynamic column widths */
  border-collapse: collapse;
}

.dkim-table-section .dkim-record-table th,
.dkim-table-section .dkim-record-table td {
  border: 1px solid #ddd;
  padding: 8px;
  font-size: 0.96em;
  vertical-align: top;
}

.dkim-table-section .dkim-record-table th {
  background: var(--vp-c-bg-soft, #f8f9fa);
  font-weight: bold;
  text-align: left;
}

/* wrap long values in column 2 instead of scrolling */
.dkim-table-section .dkim-record-table td:nth-child(2) {
  white-space: pre-wrap;
  word-break: break-word;
}

.dkim-key {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.97em;
  word-break: break-all;
  white-space: pre-line;
}

/* Responsive */
@media (max-width: 768px) {
  .dkim-checker {
    padding: 0 0.5rem;
  }
  .tool-form,
  .result-section {
    padding: 1rem;
    margin: 1rem 0;
  }
  .form-group input,
  .check-btn {
    padding: 0.75rem;
  }
}

/* Dark theme tweaks */
.dark .dkim-record-table,
.dark .dkim-record-table th,
.dark .dkim-record-table td {
  background: var(--vp-c-bg, #17181c) !important;
  color: var(--vp-c-text-1, #e9e9e9);
  border-color: #282a36;
}

.dark .dkim-record-table th {
  background: #252736 !important;
  color: #aad0f7;
}

.dark .dkim-key {
  color: #77bdfb;
}
</style>
