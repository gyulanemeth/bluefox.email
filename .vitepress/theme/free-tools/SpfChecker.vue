<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCaptcha } from './useCaptcha.js'
import { useUrlState } from './useUrlState.js'

// Constants
const API_URL = import.meta.env.VITE_TOOLS_API_URL
if (!API_URL) throw new Error('VITE_TOOLS_API_URL not set')

// Composables
const {
  captchaProbe,
  captchaImage,
  captchaLoading,
  isProbeExpired,
  shouldShowCaptcha,
  hasError,
  currentError,
  loadCaptcha,
  refreshCaptcha,
  markSolved,
  setError,
  clearError,
  handleServerError,
  validateCaptchaInput,
  autoResolveError,
  isCurrentlyExpired
} = useCaptcha('spf-checker')

const {
  domain,
  testIp,
  initialize: initializeUrlState,
  setField
} = useUrlState({
  fields: ['domain', 'testIp'],
  autoExecute: true,
  onAutoExecute: checkSpf
})

// Local state
const captchaText = ref('')
const loading = ref(false)
const result = ref(null)

// Navigation history
const history = ref([])
const currentIndex = ref(-1)

// Computed
const isFormDisabled = computed(() => 
  loading.value || (shouldShowCaptcha.value && (!captchaText.value || isProbeExpired.value))
)

// Watch for CAPTCHA expiration and clear results - THIS IS THE FIX!
watch(isProbeExpired, (newExpired, oldExpired) => {
  if (newExpired && !oldExpired && result.value) {
    console.log('CAPTCHA expired - clearing results')
    result.value = null
  }
})

// Methods
function validateInputs() {
  if (!domain.value?.trim()) {
    setError('MISSING_TEXT', 'Please enter the domain you want to check (e.g., example.com)')
    return false
  }
  
  return shouldShowCaptcha.value ? validateCaptchaInput(captchaText.value) : true
}

async function handleCaptchaExpiry() {
  console.log('CAPTCHA expired detected - refreshing')
  await refreshCaptcha('expired')
  loading.value = false
}

async function checkSpf() {
  clearError()
  result.value = null // This clears results at the start of new checks
  
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
    // Check CAPTCHA expiry
    if (isCurrentlyExpired()) {
      await handleCaptchaExpiry()
      return
    }

    // Validate inputs
    if (!validateInputs()) return

    // Double-check expiry before request
    if (isCurrentlyExpired()) {
      await handleCaptchaExpiry()
      return
    }

    // Make request
    const payload = {
      domain: domain.value,
      captchaProbe: captchaProbe.value,
      captchaText: captchaText.value.trim()
    }
    if (testIp.value.trim()) payload.testIp = testIp.value.trim()

    const response = await fetch(`${API_URL}/v1/analyze-spf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    
    const json = await response.json()

    // Handle errors
    if (!response.ok || !json.result?.success) {
      const serverError = json.result?.error || 'Server error occurred'
      const errorType = handleServerError(serverError)
      
      if (errorType === 'expired' || errorType === 'incorrect') {
        await autoResolveError()
      }
      return
    }

    // Handle success
    result.value = {
      valid: !!json.result.success,
      domain: json.result.domain || domain.value,
      record: json.result.rawRecord || json.result.record || 'Not found',
      lookups: json.result.lookups,
      policy: json.result.policy,
      mechanisms: (json.result.mechanisms || []).map(m => {
        const match = m.original.toLowerCase().match(/^(include|redirect|a|mx):([^\s\/]+)/)
        const targetDomain = match ? match[2] : null
        return {
          ...m,
          targetDomain
        }
      }),
      warnings: json.result.warnings || [],
      recommendations: json.result.recommendations || [],
      errors: json.result.success ? [] : [json.result.error || 'Unknown error'],
      mailauthResult: json.result.mailauthResult,
      ipTestResult: json.result.ipTestResult || null,
      score: json.result.score
    }

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

  } catch (error) {
    console.error('SPF Check Error:', error)
    setError('NETWORK_ERROR')
  } finally {
    loading.value = false
  }
}

function goBack() {
  if (currentIndex.value <= 0) return

  const previous = history.value[currentIndex.value - 1]
  currentIndex.value--
  setField('domain', previous.domain)
  setField('testIp', previous.testIp || '')
  result.value = previous.result
  clearError()
}

function checkIncludedDomain(includedDomain) {
  setField('domain', includedDomain)
  setField('testIp', '')
  result.value = null
  clearError()
  checkSpf()
}

// Clean formatting helpers - safe and simple
function getIpResultClass(res) {
  const resultString = typeof res === 'string' ? res : (res?.result || res?.status?.result || res?.status || '')
  
  switch (String(resultString).toLowerCase()) {
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
  const resultString = typeof res === 'string' ? res : (res?.result || res?.status?.result || res?.status || '')
  
  const normalized = String(resultString).toLowerCase()
  
  switch (normalized) {
    case 'pass': return 'PASS'
    case 'fail': return 'FAIL'
    case 'softfail': return 'SOFTFAIL'
    case 'neutral': return 'NEUTRAL'
    case 'temperror': return 'TEMP ERROR'
    case 'permerror': return 'PERM ERROR'
    default: return normalized ? normalized.toUpperCase() : 'UNKNOWN'
  }
}

onMounted(async () => {
  await initializeUrlState()
  
  if (!captchaProbe.value || isProbeExpired.value) {
    await loadCaptcha()
  }
})
</script>

<template>
  <div class="spf-checker">
    <div class="tool-form">
      <form @submit.prevent="checkSpf">
        <!-- Domain Input -->
        <div class="form-group">
          <label for="domain">Domain:</label>
          <input
            id="domain"
            v-model="domain"
            type="text"
            placeholder="example.com"
            :disabled="loading"
            required
          />
        </div>

        <!-- Optional IP Input -->
        <div class="form-group">
          <label for="testIp">Optional: Test SPF for a specific IP</label>
          <input
            id="testIp"
            v-model="testIp"
            type="text"
            placeholder="e.g. 203.0.113.2"
            :disabled="loading"
            autocomplete="off"
          />
          <small class="form-help">Leave blank to skip IP-based test.</small>
        </div>

        <!-- Captcha Expiration Warning -->
        <div v-if="captchaProbe && isProbeExpired" class="captcha-expired-message">
          Your verification has expired. Please refresh the captcha below.
        </div>

        <!-- Captcha Section -->
        <div v-if="shouldShowCaptcha" class="form-group">
          <label for="captcha">Security Verification:</label>
          <div class="captcha-container">
            <div class="captcha-image-container">
              <div v-if="captchaLoading" class="captcha-loading">
                Loading captcha...
              </div>
              <div v-else-if="captchaImage" class="captcha-image" v-html="captchaImage" />
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
              <img src="/assets/reload.webp?url" alt="reload" />
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
          />
          <small class="captcha-help">
            Enter the characters shown in the image above
          </small>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="check-btn" :disabled="isFormDisabled">
          <span v-if="loading" class="btn-loading">
            <div class="loading-spinner"></div>
            Checking...
          </span>
          <span v-else>Check SPF</span>
        </button>
      </form>
    </div>

    <!-- Error Display -->
    <div v-if="hasError" class="error-section">
      <p class="error-message">{{ currentError.message }}</p>
    </div>

    <!-- Results -->
    <div v-if="result" class="result-section">
      <h3>SPF Check Results</h3>

      <!-- Status -->
      <div class="status-box">
        <p><strong>{{ result.valid ? 'SPF Record Found' : 'SPF Record Missing or Invalid' }}</strong></p>
        <p v-if="result.score">
          <strong>Security Score:</strong>
          {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})
        </p>
      </div>

      <!-- Basic Information -->
      <div class="info-section">
        <h4>Basic Information</h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p><strong>SPF Record:</strong> {{ result.record }}</p>
        <p v-if="result.lookups !== undefined">
          <strong>DNS Lookups:</strong> {{ result.lookups }}/10
          <span v-if="result.lookups > 10" class="lookup-warning">
            ⚠️ Exceeds limit
          </span>
        </p>
        <p v-if="result.policy"><strong>Policy:</strong> {{ result.policy }}</p>
      </div>

      <!-- NEW: Compact IP Test Container -->
      <div v-if="result.ipTestResult" class="section ip-test-compact">
        <h4>IP Test Result</h4>
        <div class="ip-test-compact-card">
          <div class="ip-test-info">
            <span class="ip-address">{{ result.ipTestResult.ip || testIp }}</span>
            <span :class="['ip-result-compact', getIpResultClass(result.ipTestResult.result)]">
              {{ getDisplayResult(result.ipTestResult.result) }}
            </span>
          </div>
          <p v-if="result.ipTestResult.explanation" class="ip-explanation-compact">
            {{ result.ipTestResult.explanation }}
          </p>
        </div>
      </div>

      <!-- Mechanisms -->
      <div v-if="result.mechanisms?.length" class="mechanisms-section">
        <h4>Mechanisms</h4>
        <div class="mechanisms-list">
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
      </div>

      <!-- Back Button -->
      <div v-if="currentIndex > 0" class="back-nav">
        <button type="button" @click="goBack" class="back-btn">
          ← Back to "{{ history[currentIndex - 1]?.domain }}"
        </button>
      </div>

      <!-- Mailauth Results -->
      <div v-if="result.mailauthResult" class="section mailauth-section">
        <h4>Mailauth</h4>
        <p><strong>Status:</strong> {{ result.mailauthResult.status.result }}</p>
        <pre v-if="result.mailauthResult.info" class="auth-info">{{ result.mailauthResult.info }}</pre>
      </div>

      <!-- Warnings, Recommendations, Errors -->
      <div v-if="result.warnings?.length" class="section warnings-section">
        <h4>Warnings</h4>
        <ul>
          <li v-for="warning in result.warnings" :key="warning">{{ warning }}</li>
        </ul>
      </div>

      <div v-if="result.recommendations?.length" class="section recommendations-section">
        <h4>Recommendations</h4>
        <ul>
          <li v-for="rec in result.recommendations" :key="rec">{{ rec }}</li>
        </ul>
      </div>

      <div v-if="result.errors?.length" class="section errors-section">
        <h4>Errors</h4>
        <ul>
          <li v-for="error in result.errors" :key="error">{{ error }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base Layout */
.spf-checker {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
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
  transition: border-color 0.2s ease;
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
  margin-top: 0.5rem;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  font-style: italic;
}

/* CAPTCHA Styles */
.captcha-expired-message {
  background: #fff3cd;
  border: 1px solid #ffc107;
  color: #856404;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
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
  background: #ffffff;
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
  border-radius: 6px;
  padding: 0.5rem;
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
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
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

.refresh-captcha-btn img {
  width: 16px;
  height: 16px;
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

.btn-loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.loading-spinner {
  width: 12px;
  height: 12px;
  border: 1.5px solid #f3f3f3;
  border-top: 1.5px solid var(--vp-c-brand-1, #10B1EF);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error Section */
.error-section {
  background: var(--vp-danger-soft, #f8d7da);
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

/* Info Section */
.info-section {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.info-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
}

.info-section p {
  margin: 0.75rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.6;
}

.lookup-warning {
  background: var(--vp-warning-soft, #fffbf0);
  color: var(--vp-c-warning-1, #d69e2e);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-left: 0.5rem;
}

/* Compact IP Test Container - Minimal but highlighted */
.ip-test-compact {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-left: 4px solid var(--vp-c-brand-1, #10B1EF);
  margin-top: 1.5rem;
}

.ip-test-compact h4 {
  color: var(--vp-c-brand-1, #10B1EF);
  margin-bottom: 0.75rem;
}

.ip-test-compact-card {
  background: var(--vp-c-bg, #fff);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.ip-test-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.ip-address {
  font-family: monospace;
  font-size: 0.95rem;
  color: var(--vp-c-text-1, #374151);
  background: var(--vp-c-bg-soft, #f8f9fa);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
}

.ip-result-compact {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Compact result colors - subtle but clear */
.ip-result-compact.result-pass {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #22c55e;
}

.ip-result-compact.result-fail {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #ef4444;
}

.ip-result-compact.result-softfail {
  background: #fefce8;
  color: #854d0e;
  border: 1px solid #f59e0b;
}

.ip-result-compact.result-neutral {
  background: #f8fafc;
  color: #374151;
  border: 1px solid #6b7280;
}

.ip-result-compact.result-error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #ef4444;
}

.ip-result-compact.result-unknown {
  background: #f1f5f9;
  color: #64748b;
  border: 1px solid #94a3b8;
}

.ip-explanation-compact {
  margin: 0.5rem 0 0 0;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  line-height: 1.5;
  font-style: italic;
}

/* Mechanisms Section */
.mechanisms-section {
  margin-top: 1.5rem;
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
}

.mechanisms-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
}

.mechanisms-list {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 8px;
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
  padding: 0.75rem;
}

.mechanism-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
  font-family: monospace;
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

/* Back Button */
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

/* Result Sections */
.section {
  margin-top: 1.5rem;
  padding: 1.25rem;
  border-radius: 8px;
}

.section h4 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.section ul {
  margin: 0;
  padding-left: 1.5rem;
}

.section li {
  margin: 0.5rem 0;
  line-height: 1.5;
}

.warnings-section {
  background: var(--vp-warning-soft, #fffbf0);
  border-left: 4px solid var(--vp-c-warning-1, #ffc107);
}

.warnings-section h4 {
  color: var(--vp-c-warning-1, #d69e2e);
}

.recommendations-section {
  background: var(--vp-tip-soft, #f0f9ff);
  border-left: 4px solid var(--vp-c-tip-1, #17a2b8);
}

.recommendations-section h4 {
  color: var(--vp-c-tip-1, #17a2b8);
}

.errors-section {
  background: var(--vp-danger-soft, #fdf2f2);
  border-left: 4px solid var(--vp-c-danger-1, #dc3545);
}

.errors-section h4 {
  color: var(--vp-c-danger-1, #dc3545);
}

/* Mailauth Section */
.mailauth-section h4 {
  color: var(--vp-c-text-1, #333);
}

.auth-info {
  background: var(--vp-c-bg-soft, #f8f9fa);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.875rem;
  margin: 1rem 0;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .refresh-captcha-btn {
    background: #fff;
    border-color: #333;
    color: #222;
  }
  
  .back-btn {
    background: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
  }
  
  .back-btn:hover {
    background: #374151;
    color: var(--vp-c-brand-1, #10B1EF);
    border-color: var(--vp-c-brand-1, #10B1EF);
  }
  
  /* Fix recommendations text color in dark mode */
  .recommendations-section,
  .recommendations-section ul,
  .recommendations-section li {
    color: #2d3748 !important;
  }
  
  .ip-test-compact-card {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .spf-checker {
    padding: 0 0.5rem;
  }
  
  .tool-form,
  .result-section {
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .captcha-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .refresh-captcha-btn {
    align-self: center;
  }
  
  .back-btn {
    font-size: 0.85rem;
    padding: 0.6rem 1rem;
  }
  
  .ip-test-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .ip-address {
    font-size: 0.85rem;
  }
  
  .ip-result-compact {
    font-size: 0.8rem;
    padding: 0.35rem 0.7rem;
  }
}
</style>
