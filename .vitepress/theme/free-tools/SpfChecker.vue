<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCaptcha } from './useCaptcha.js'

const API_URL = import.meta.env.VITE_TOOLS_API_URL
if (!API_URL) throw new Error('VITE_TOOLS_API_URL not set')

// Use enhanced composable with context
const {
  captchaProbe,
  captchaImage,
  captchaExpires,
  captchaLoading,
  isProbeExpired,
  isSolved,
  shouldShowCaptcha,
  hasError,
  currentError,
  loadCaptcha,
  refreshCaptcha,
  markSolved,
  clearSession,
  setError,
  clearError,
  handleServerError,
  validateCaptchaInput,
  autoResolveError,
  isCurrentlyExpired,
  CAPTCHA_ERRORS
} = useCaptcha('spf-checker')

// form state
const domain = ref('')
const testIp = ref('')
const captchaText = ref('')
const loading = ref(false)
const result = ref(null)

// navigation history
const history = ref([])
const currentIndex = ref(-1)

// Enhanced validation using composable functions
function validateInputs() {
  if (!domain.value.trim()) {
    setError('MISSING_TEXT', 'Please enter the domain you want to check (e.g., example.com)')
    return false
  }
  
  if (shouldShowCaptcha.value) {
    return validateCaptchaInput(captchaText.value)
  }
  
  return true
}

// Enhanced checkSpf with precise timing and error handling
async function checkSpf() {
  clearError()
  
  // Trim inputs
  domain.value = domain.value.trim()
  testIp.value = testIp.value.trim()

  // Clear forward history if user went back and now checks a new domain
  if (currentIndex.value < history.value.length - 1) {
    history.value = history.value.slice(0, currentIndex.value + 1)
  }

  // Save current state before overwriting
  if (result.value && domain.value) {
    const currentState = {
      domain: domain.value,
      testIp: testIp.value,
      result: result.value
    }
    if (history.value[currentIndex.value]?.domain !== domain.value) {
      history.value.push(currentState)
      currentIndex.value++
    } else {
      history.value[currentIndex.value].testIp = testIp.value
    }
  }

  loading.value = true

  try {
    // Use real-time expiry check with buffer
    if (isCurrentlyExpired()) {
      console.log('CAPTCHA expired detected - refreshing')
      await refreshCaptcha('expired')
      loading.value = false
      return
    }

    // Validate inputs
    if (!validateInputs()) {
      return
    }

    // Double-check expiry right before sending request
    if (isCurrentlyExpired()) {
      console.log('CAPTCHA expired during validation - refreshing')
      await refreshCaptcha('expired')
      loading.value = false
      return
    }

    const payload = {
      domain: domain.value,
      captchaProbe: captchaProbe.value,
      captchaText: captchaText.value.trim()
    }
    if (testIp.value.trim()) payload.testIp = testIp.value.trim()

    const res = await fetch(`${API_URL}/v1/analyze-spf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    
    const json = await res.json()

    // Enhanced server response handling
    if (!res.ok || !json.result?.success) {
      const serverError = json.result?.error || 'Server error occurred'
      console.log('Server error received:', serverError)
      
      const errorType = handleServerError(serverError)
      console.log('Parsed error type:', errorType)
      
      // Auto-resolve specific error types
      if (errorType === 'expired' || errorType === 'incorrect') {
        await autoResolveError()
      }
      return
    }

    // Success
    result.value = mapResult(json.result)
    captchaText.value = ''
    markSolved()

    // Final save
    const finalState = {
      domain: domain.value,
      testIp: testIp.value,
      result: result.value
    }
    if (currentIndex.value === -1 || history.value[currentIndex.value]?.domain !== domain.value) {
      history.value.push(finalState)
      currentIndex.value++
    } else {
      history.value[currentIndex.value] = finalState
    }

  } catch (networkError) {
    console.error('SPF Check Error:', networkError)
    setError('NETWORK_ERROR')
  } finally {
    loading.value = false
  }
}

function mapResult(d) {
  return {
    valid: !!d.success,
    domain: d.domain || domain.value,
    record: d.rawRecord || d.record || 'Not found',
    lookups: d.lookups,
    policy: d.policy,
    mechanisms: (d.mechanisms || []).map(m => {
      const match = m.original.toLowerCase().match(/^(include|redirect|a|mx):([^\s\/]+)/)
      const targetDomain = match ? match[2] : null
      return {
        ...m,
        targetDomain
      }
    }),
    warnings: d.warnings || [],
    recommendations: d.recommendations || [],
    errors: d.success ? [] : [d.error || 'Unknown error'],
    mailauthResult: d.mailauthResult,
    ipTestResult: d.ipTestResult || null,
    score: d.score
  }
}

function goBack() {
  if (currentIndex.value <= 0) return

  const previous = history.value[currentIndex.value - 1]
  currentIndex.value--
  domain.value = previous.domain
  testIp.value = previous.testIp || ''
  result.value = previous.result
  clearError()
}

function checkIncludedDomain(includedDomain) {
  domain.value = includedDomain
  result.value = null
  clearError()
  testIp.value = ''
  checkSpf()
}

// formatting helpers
function getIpResultClass(res) {
  const out = typeof res === 'string' ? res : res.result || res.status || ''
  switch (out.toLowerCase()) {
    case 'pass': return 'result-pass'
    case 'fail': return 'result-fail'
    case 'softfail': return 'result-softfail'
    case 'neutral': return 'result-neutral'
    case 'permerror':
    case 'temperror': return 'result-error'
    default: return 'result-unknown'
  }
}

function getDisplayResult(res) {
  return (typeof res === 'string' ? res : res.result || res.status || '')
    .toUpperCase()
}

onMounted(async () => {
  if (!captchaProbe.value || isProbeExpired.value) {
    await loadCaptcha()
  }
})
</script>

<template>
  <div class="spf-checker">
    <div class="tool-form">
      <form @submit.prevent="checkSpf">
        <!-- Domain input -->
        <div class="form-group">
          <label for="domain">Domain:</label>
          <input 
            id="domain"
            v-model="domain" 
            placeholder="example.com"
            :disabled="loading"
            required
          />
        </div>
        <!-- Optional IP input -->
        <div class="form-group">
          <label for="ipTest">Optional: Test SPF for a specific IP</label>
          <input
            id="ipTest"
            v-model="testIp"
            placeholder="e.g. 203.0.113.2"
            :disabled="loading"
            autocomplete="off"
          />
          <small class="form-help">Leave blank to skip IP-based test.</small>
        </div>

        <!-- Expiration banner -->
        <div v-if="captchaProbe && isProbeExpired" class="captcha-expired-message">
          Your verification has expired. Please refresh the captcha below.
        </div>

        <!-- Captcha (only when needed) - FIXED: integrated into form -->
        <div v-if="shouldShowCaptcha" class="form-group">
          <label for="captcha">Security Verification:</label>
          <div class="captcha-container">
            <div class="captcha-image-container">
              <div v-if="captchaLoading" class="captcha-loading">
                Loading captcha...
              </div>
              <div v-else-if="captchaImage" class="captcha-image" v-html="captchaImage"/>
              <div v-else class="captcha-placeholder">
                <button type="button" @click="loadCaptcha" class="load-captcha-btn">
                  Load Captcha
                </button>
              </div>
            </div>
            <button
              type="button"
              @click="refreshCaptcha('manual')"
              class="refresh-captcha-btn"
              :disabled="captchaLoading"
              title="Refresh captcha"
            >
              <img src="/assets/reload.webp?url" alt="reload captcha">
            </button>
          </div>
          <input
            id="captcha"
            v-model="captchaText"
            type="text"
            placeholder="Enter the text from the image above"
            :disabled="loading || !captchaImage || isProbeExpired"
            autocomplete="off"
            required
            class="captcha-input"
          />
          <small class="captcha-help">
            Enter the characters shown in the image above
          </small>
        </div>

        <button
          type="submit"
          class="check-btn"
          :disabled="loading || (shouldShowCaptcha && (!captchaText || isProbeExpired))"
        >
          <span v-if="loading" class="btn-loading">
            <div class="loading-spinner small"></div>
            Checking...
          </span>
          <span v-else>Check SPF</span>
        </button>
      </form>
    </div>

    <!-- Enhanced Error Section -->
    <div v-if="hasError" class="error-section">
      <span class="icon-error" aria-hidden="true"></span>
      <p class="error-message">{{ currentError.message }}</p>
    </div>

    <!-- Results -->
    <div v-if="result" class="result-section">
      <h3>
        <span v-if="result.valid" class="icon-success" aria-hidden="true"></span>
        <span v-else class="icon-error" aria-hidden="true"></span>
        SPF Check Results
      </h3>

      <div class="status-box">
        <div v-if="result.valid">
          <p><strong>SPF Record Found</strong></p>
        </div>
        <div v-else>
          <p><strong>SPF Record Missing or Invalid</strong></p>
        </div>
        <div v-if="result.score">
          <p>
            <strong>Security Score:</strong>
            {{ result.score.value }}/{{ result.score.outOf }}
            ({{ result.score.level }})
          </p>
        </div>
      </div>

      <div class="info-section">
        <h4>Basic Information</h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p><strong>SPF Record:</strong> {{ result.record }}</p>
        <p v-if="result.lookups !== undefined">
          <strong>DNS Lookups:</strong> {{ result.lookups }}/10
          <span v-if="result.lookups > 10" class="lookup-warning">
            <span class="icon-warning" aria-hidden="true"></span> Exceeds limit
          </span>
        </p>
        <p v-if="result.policy"><strong>Policy:</strong> {{ result.policy }}</p>
      </div>

      <div v-if="result.mechanisms.length" class="mechanisms-list">
        <h4>Mechanisms</h4>
        <div
          v-for="m in result.mechanisms"
          :key="m.original"
          class="mechanism-item"
        >
          <span class="mechanism-text">
            <template v-if="m.type === 'include' && m.targetDomain">
              include:
              <a
                href="#"
                @click.prevent="checkIncludedDomain(m.targetDomain)"
                class="inline-link"
              >
                {{ m.targetDomain }}
              </a>
            </template>
            <template v-else>
              {{ m.original }}
            </template>
          </span>
          <span
            class="mechanism-type"
            :class="{ 'requires-lookup': m.requiresLookup }"
          >
            {{ m.type }}{{ m.requiresLookup ? ' (DNS)' : '' }}
          </span>
        </div>
      </div>

      <!-- Simple Back Button -->
      <div v-if="currentIndex > 0" class="back-nav">
        <button type="button" @click="goBack" class="back-btn">
          ← Back to "{{ history[currentIndex - 1]?.domain }}"
        </button>
      </div>

      <div v-if="result.mailauthResult" class="mailauth-section">
        <h4>Mailauth</h4>
        <p><strong>Status:</strong> {{ result.mailauthResult.status.result }}</p>
        <pre v-if="result.mailauthResult.info" class="auth-info">{{ result.mailauthResult.info }}</pre>
      </div>

      <div v-if="result.ipTestResult" class="ip-test-section">
        <h4>SPF Test for IP {{ result.ipTestResult.ip }}</h4>
        <div class="ip-test-card">
          <div class="ip-test-header">
            <span :class="['ip-result', getIpResultClass(result.ipTestResult.result)]">
              {{ getDisplayResult(result.ipTestResult.result) }}
            </span>
          </div>
          <p class="ip-explanation">{{ result.ipTestResult.explanation }}</p>
          <details v-if="result.ipTestResult.details">
            <summary>Details</summary>
            <pre>{{ JSON.stringify(result.ipTestResult.details, null, 2) }}</pre>
          </details>
        </div>
      </div>

      <div v-if="result.warnings.length" class="warnings-section">
        <h4><span class="icon-warning" aria-hidden="true"></span> Warnings</h4>
        <ul>
          <li v-for="(w, i) in result.warnings" :key="i">{{ w }}</li>
        </ul>
      </div>

      <div v-if="result.recommendations.length" class="recommendations-section">
        <h4><span class="icon-info" aria-hidden="true"></span> Recommendations</h4>
        <ul>
          <li v-for="(r, i) in result.recommendations" :key="i">{{ r }}</li>
        </ul>
      </div>

      <div v-if="result.errors.length" class="errors-section">
        <h4><span class="icon-error" aria-hidden="true"></span> Errors</h4>
        <ul>
          <li v-for="e in result.errors" :key="e">{{ e }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Main Container */
.spf-checker {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Simple Back Navigation */
.back-nav {
  margin: 1.5rem 0;
  text-align: left;
}

.back-btn {
  background: var(--vp-c-bg-soft, #f8f9fa);
  color: var(--vp-c-text-1, #374151);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.back-btn:hover:not(:disabled) {
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-brand-1, #10B1EF);
  border-color: var(--vp-c-brand-1, #10B1EF);
}

.back-btn:active {
  transform: translateY(1px);
}

/* Dark mode support */
.dark .back-btn {
  background: #2d3748;
  border-color: #4a5568;
  color: #e2e8f0;
}

.dark .back-btn:hover {
  background: #374151;
  color: var(--vp-c-brand-1, #10B1EF);
  border-color: var(--vp-c-brand-1, #10B1EF);
}

/* Form Styles */
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

.form-help {
  display: block;
  margin-top: 0.25rem;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.85rem;
  font-style: italic;
  opacity: 0.9;
}

.captcha-expired-message {
  background: #fff3cd;
  border: 1px solid #ffc107;
  color: #856404;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

/* CAPTCHA styles - FIXED: no separate container styling */
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

.dark .refresh-captcha-btn {
  background: #fff !important;
  border: 1px solid #333 !important;
  color: #222 !important;
}

.dark .refresh-captcha-btn img {
  filter: invert(0);
}

.refresh-captcha-btn:hover:not(:disabled) {
  background: var(--vp-c-bg, #ffffff);
  border-color: var(--vp-c-brand-1, #10B1EF);
}

.refresh-captcha-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-captcha-btn img {
  width: 16px;
  height: 16px;
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

/* Button */
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

/* Loading spinner */
.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid var(--vp-c-brand-1, #10B1EF);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}

.loading-spinner.small {
  width: 12px;
  height: 12px;
  border-width: 1.5px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.btn-loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

/* Results Section */
.result-section {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 12px;
  background: var(--vp-c-bg, #ffffff);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.result-section h3 {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-text-1, #1a202c);
  font-size: 1.5rem;
  font-weight: 700;
}

.status-box {
  background: var(--vp-c-bg-soft, #f8f9fa);
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.status-box p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

/* Info, Warnings, Recommendations, Errors */
.info-section,
.warnings-section,
.recommendations-section,
.errors-section {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.info-section h4,
.warnings-section h4,
.recommendations-section h4,
.errors-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-section p {
  margin: 0.75rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.6;
}

/* Lookup Warning */
.lookup-warning {
  background: var(--vp-warning-soft, #fffbf0);
  color: var(--vp-c-warning-1, #d69e2e);
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-warning-1, #ffc107);
  margin: 0.75rem 0;
  font-weight: 600;
}

/* Mechanisms List */
.mechanisms-list {
  margin: 0.75rem 0;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 6px;
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
}

.mechanism-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
}

.mechanism-item:last-child {
  border-bottom: none;
}

.mechanism-text {
  font-weight: 600;
  color: var(--vp-c-text-1, #374151);
}

.inline-link {
  color: var(--vp-c-brand-1, #10B1EF);
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}

.inline-link:hover {
  opacity: 0.8;
}

.mechanism-type {
  font-size: 0.875rem;
  color: var(--vp-c-text-2, #6b7280);
  background: var(--vp-c-bg, #ffffff);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
}

.mechanism-type.requires-lookup {
  background: var(--vp-warning-soft, #fffbf0);
  color: var(--vp-c-warning-1, #d69e2e);
  border-color: var(--vp-c-warning-2, #fbbf24);
}

/* IP Test Section */
.ip-test-section {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1, #10B1EF);
}

.ip-test-card {
  background: var(--vp-c-bg, #fff);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.ip-test-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 0.5rem;
}

.ip-result {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-pass {
  background: var(--vp-c-green-soft, #dcfce7);
  color: var(--vp-c-green-dark, #166534);
  border: 1px solid var(--vp-c-green-light, #86efac);
}

.result-fail {
  background: var(--vp-c-red-soft, #fef2f2);
  color: var(--vp-c-red-dark, #991b1b);
  border: 1px solid var(--vp-c-red-light, #fca5a5);
}

.result-softfail {
  background: var(--vp-c-yellow-soft, #fefce8);
  color: var(--vp-c-yellow-dark, #854d0e);
  border: 1px solid var(--vp-c-yellow-light, #fde047);
}

.result-neutral {
  background: var(--vp-c-gray-soft, #f8fafc);
  color: var(--vp-c-gray-dark, #374151);
  border: 1px solid var(--vp-c-gray-light, #d1d5db);
}

.result-error {
  background: var(--vp-c-red-soft, #fef2f2);
  color: var(--vp-c-red-dark, #991b1b);
  border: 1px solid var(--vp-c-red-light, #fca5a5);
}

.result-unknown {
  background: var(--vp-c-gray-soft, #f1f5f9);
  color: var(--vp-c-gray-dark, #64748b);
  border: 1px solid var(--vp-c-gray-light, #cbd5e1);
}

.ip-explanation {
  margin: 0;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  line-height: 1.4;
}

/* Prevent overflow & wrap JSON in IP test details */
.ip-test-section details {
  max-width: 100%;
  overflow-x: auto;
}

.ip-test-section details pre {
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
  margin: 0.5rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 6px;
}

/* Lists */
.info-section ul,
.warnings-section ul,
.recommendations-section ul,
.errors-section ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.info-section li,
.warnings-section li,
.recommendations-section li,
.errors-section li {
  margin: 0.25rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.5;
}

/* Warning Section */
.warnings-section {
  background: var(--vp-warning-soft, #fffbf0);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-warning-1, #ffc107);
}

.warnings-section h4 {
  color: var(--vp-c-warning-1, #d69e2e);
}

/* Recommendations Section */
.recommendations-section {
  background: var(--vp-tip-soft, #f0f9ff);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-tip-1, #17a2b8);
}

.recommendations-section h4 {
  color: var(--vp-c-tip-1, #17a2b8);
}

/* Errors Section */
.errors-section {
  background: var(--vp-danger-soft, #fdf2f2);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-danger-1, #dc3545);
}

.errors-section h4 {
  color: var(--vp-c-danger-1, #dc3545);
}

/* Error Message (Top Level) */
.error-section {
  background: var(--vp-c-danger-soft, #f8d7da);
  color: var(--vp-c-danger-1, #721c24);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  border: 1px solid var(--vp-c-danger-2, #f5c6cb);
}

.error-message {
  margin: 0;
  font-weight: 500;
}

/* Icon Placeholders */
.icon-warning::before,
.icon-info::before,
.icon-error::before,
.icon-success::before,
.icon-back::before,
.icon-refresh::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: text-bottom;
  opacity: 0.8;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .check-btn {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  .check-btn:hover:not(:disabled) {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
  .result-section {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  .dark .refresh-captcha-btn {
    background: #fff !important;
    border: 1px solid #333 !important;
    color: #222 !important;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .spf-checker {
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
  .result-section h3 {
    font-size: 1.25rem;
  }
  .info-section h4,
  .warnings-section h4,
  .recommendations-section h4,
  .errors-section h4 {
    font-size: 1.1rem;
  }
  .captcha-container {
    flex-direction: column;
    align-items: stretch;
  }
  .refresh-captcha-btn {
    align-self: center;
  }
  .ip-test-section {
    padding: 1rem;
  }
  .ip-test-card {
    padding: 0.75rem;
  }
  .ip-test-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .back-nav {
    margin: 1rem 0;
  }
  .back-btn {
    font-size: 0.85rem;
    padding: 0.6rem 1rem;
    gap: 0.5rem;
  }
}
</style>
