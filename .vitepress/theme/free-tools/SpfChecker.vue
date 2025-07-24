<script setup>
import { ref, onMounted } from 'vue'

// === Config/Globals ===
const API_URL = import.meta.env.VITE_TOOLS_API_URL
if (!API_URL) {
  throw new Error('API URL not configured. Please set VITE_TOOLS_API_URL in your environment.')
}
const ERROR_MSG = {
  apiConfig: 'API URL not configured. Please set VITE_TOOLS_API_URL in your environment.',
  connect: 'Cannot connect to the server. Please make sure the backend is running.',
  endpoint: 'API endpoint not found. Please check the server configuration.',
  server: 'Server error occurred. Please try again later.',
  default: 'Failed to check SPF. Please try again.',
  captchaFirst: 'Please load the captcha first',
  captchaPrompt: 'Please enter the captcha text'
}

// === State ===
const domain = ref('')
const testIp = ref('') // NEW: user-provided IP for test
const captchaText = ref('')
const captchaImage = ref(null)
const captchaProbe = ref(null)
const captchaLoading = ref(false)
const result = ref(null)
const error = ref(null)
const loading = ref(false)

// === In-memory Captcha State ===
const captchaSolved = ref(false)
const captchaSolvedUntil = ref(0) // Unix timestamp

function now() {
  return Math.floor(Date.now() / 1000)
}
function shouldShowCaptcha() {
  if (!captchaSolved.value) return true
  if (!captchaProbe.value || !captchaImage.value) return true
  if (now() > captchaSolvedUntil.value) {
    captchaSolved.value = false
    return true
  }
  return false
}

// === Captcha Handling ===
async function loadCaptcha() {
  captchaLoading.value = true
  error.value = null
  try {
    const response = await fetch(`${API_URL}/v1/captcha/generate`)
    if (!response.ok) throw new Error(`Failed to load captcha: ${response.status}`)
    const data = await response.json()
    if (data.result && data.result.success && data.result.captcha) {
      captchaImage.value = data.result.captcha.image
      captchaProbe.value = data.result.captcha.probe
      captchaText.value = ''
    } else {
      throw new Error('Invalid captcha response from server')
    }
  } catch (err) {
    error.value = `Failed to load captcha: ${err.message}`
    captchaImage.value = null
    captchaProbe.value = null
    captchaText.value = ''
  } finally {
    captchaLoading.value = false
  }
}
const refreshCaptcha = async () => {
  captchaSolved.value = false
  captchaSolvedUntil.value = 0
  await loadCaptcha()
}

// === API Error Handler ===
function handleApiError(err) {
  const msg = err?.message || ERROR_MSG.default
  if (msg.toLowerCase().includes('captcha')) {
    refreshCaptcha()
    error.value = msg + ' Please try again with the new captcha.'
  } else if (msg.includes('fetch')) {
    error.value = ERROR_MSG.connect
  } else if (msg.includes('404')) {
    error.value = ERROR_MSG.endpoint
  } else if (msg.includes('500')) {
    error.value = ERROR_MSG.server
  } else {
    error.value = msg
  }
}

// === SPF CHECK ===
async function checkSpf() {
  error.value = null
  result.value = null

  if (shouldShowCaptcha()) {
    if (!captchaProbe.value) {
      error.value = ERROR_MSG.captchaFirst
      return
    }
    if (!captchaText.value.trim()) {
      error.value = ERROR_MSG.captchaPrompt
      return
    }
  }
  loading.value = true

  try {
    const bodyObj = {
      domain: domain.value,
      captchaText: shouldShowCaptcha() ? captchaText.value : '',
      captchaProbe: captchaProbe.value
    }
    if (testIp.value && testIp.value.trim().length > 0) {
      bodyObj.testIp = testIp.value.trim()
    }

    const response = await fetch(`${API_URL}/v1/analyze-spf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyObj)
    })

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.result?.error || errorData.error || errorData.message || errorMessage
      } catch {}
      throw new Error(errorMessage)
    }

    const data = await response.json()
    const resultData = data.result || data
    if (!resultData.success && resultData.error) {
      if (resultData.error.toLowerCase().includes('captcha')) {
        await refreshCaptcha()
        captchaText.value = ''
      }
      throw new Error(resultData.error)
    }

    // Flatten result and also support .ipTestResult
    result.value = {
      valid: resultData.success || false,
      domain: resultData.domain || domain.value,
      record: resultData.rawRecord || resultData.record || 'Not found',
      lookups: resultData.lookups,
      policy: resultData.policy,
      mechanisms: resultData.mechanisms || [],
      errors: resultData.success ? [] : [resultData.error || 'Unknown error occurred'],
      warnings: resultData.warnings || [],
      recommendations: resultData.recommendations || [],
      mailauthResult: resultData.mailauthResult,
      ipTestResult: resultData.ipTestResult || null
    }
    // On success, hide captcha for 1 minute (in-memory)
    captchaSolved.value = true
    captchaSolvedUntil.value = now() + 60
    captchaText.value = ''
  } catch (err) {
    handleApiError(err)
  } finally {
    loading.value = false
  }
}

// Util: Result styling for IP test card
function getIpResultClass(result) {
  let resultStr = ''
  if (typeof result === 'string') resultStr = result
  else if (result && typeof result === 'object' && result.result) resultStr = result.result
  else if (result && typeof result === 'object' && result.status) resultStr = result.status
  else resultStr = String(result || 'unknown')

  switch (resultStr.toLowerCase()) {
    case 'pass': return 'result-pass'
    case 'fail': return 'result-fail'
    case 'softfail': return 'result-softfail'
    case 'neutral': return 'result-neutral'
    case 'permerror':
    case 'temperror': return 'result-error'
    default: return 'result-unknown'
  }
}

function getDisplayResult(result) {
  let resultStr = ''
  if (typeof result === 'string') resultStr = result
  else if (result && typeof result === 'object' && result.result) resultStr = result.result
  else if (result && typeof result === 'object' && result.status) resultStr = result.status
  else resultStr = String(result || 'unknown')
  return resultStr.toUpperCase()
}

// On mount, always reset state
onMounted(() => {
  captchaSolved.value = false
  captchaSolvedUntil.value = 0
  loadCaptcha()
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
            type="text" 
            id="domain"
            name="domain"
            v-model="domain" 
            placeholder="example.com"
            required
            :disabled="loading"
          />
        </div>

        <!-- Optional IP input -->
        <div class="form-group">
          <label for="ipTest">Optional: Test SPF with a specific IP</label>
          <input
            type="text"
            id="ipTest"
            name="ipTest"
            v-model="testIp"
            placeholder="Enter IPv4/IPv6 address (e.g. 203.0.113.2)"
            :disabled="loading"
            autocomplete="off"
          />
          <small class="form-help">Leave blank to skip IP-based test.</small>
        </div>

        <!-- Captcha Section (shows only when needed) -->
        <div class="form-group captcha-section" v-if="shouldShowCaptcha()">
          <label for="captcha">Security Verification:</label>
          <div class="captcha-container">
            <div class="captcha-image-container">
              <div v-if="captchaLoading" class="captcha-loading">
                Loading captcha...
              </div>
              <div v-else-if="captchaImage" 
                   class="captcha-image" 
                   v-html="captchaImage">
              </div>
              <div v-else class="captcha-placeholder">
                <button type="button" @click="loadCaptcha" class="load-captcha-btn">
                  Load Captcha
                </button>
              </div>
            </div>
            <button type="button" 
                    @click="refreshCaptcha" 
                    class="refresh-captcha-btn"
                    :disabled="captchaLoading"
                    title="Refresh captcha">
              <img src="/assets/reload.webp" alt="reload button">
            </button>
          </div>
          <input 
            type="text" 
            id="captcha"
            name="captcha"
            v-model="captchaText" 
            placeholder="Enter the text from the image above"
            required
            :disabled="loading || !captchaImage"
            autocomplete="off"
            class="captcha-input"
          />
          <small class="captcha-help">Enter the characters shown in the image above</small>
        </div>

        <button type="submit"
                :disabled="loading || (shouldShowCaptcha() && (!captchaImage || !captchaText))"
                class="check-btn">
          {{ loading ? 'Checking...' : 'Check SPF' }}
        </button>
      </form>
    </div>

    <!-- Result Section -->
    <div v-if="result" class="result-section">
      <h3>SPF Check Results</h3>
      
      <!-- Status -->
      <div class="status-box">
        <div v-if="result.valid">
          <p><strong>✓ SPF Record Found</strong></p>
        </div>
        <div v-else>
          <p><strong>✗ SPF Record Missing or Invalid</strong></p>
        </div>
        <div v-if="result.score">
          <p><strong>Security Score:</strong> {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})</p>
        </div>
      </div>

      <!-- Basic Information -->
      <div class="info-section">
        <h4>Basic Information</h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p><strong>SPF Record:</strong> {{ result.record || 'Not found' }}</p>
        
        <div v-if="result.lookups !== undefined">
          <p><strong>DNS Lookups:</strong> {{ result.lookups }}/10</p>
          <div v-if="result.lookups > 10" class="lookup-warning">
            ⚠️ Exceeds the 10 DNS lookup limit
          </div>
        </div>
        
        <div v-if="result.policy">
          <p><strong>Policy:</strong> {{ result.policy }}</p>
        </div>
        
        <div v-if="result.mechanisms && result.mechanisms.length">
          <p><strong>SPF Mechanisms:</strong></p>
          <div class="mechanisms-list">
            <div v-for="mechanism in result.mechanisms" :key="mechanism.original" class="mechanism-item">
              <span class="mechanism-text">{{ mechanism.original }}</span>
              <span class="mechanism-type" :class="{ 'requires-lookup': mechanism.requiresLookup }">
                {{ mechanism.type }}{{ mechanism.requiresLookup ? ' (DNS lookup)' : '' }}
              </span>
            </div>
          </div>
        </div>
        
        <div v-if="result.mailauthResult" class="mailauth-section">
          <h5>Mailauth Analysis</h5>
          <p><strong>Status:</strong> {{ result.mailauthResult.status?.result || 'Unknown' }}</p>
          <div v-if="result.mailauthResult.info" class="auth-info">
            <code>{{ result.mailauthResult.info }}</code>
          </div>
        </div>
      </div>

      <!-- IP Test Result Card (only if IP was tested) -->
      <div v-if="result.ipTestResult" class="ip-test-section">
        <h5>SPF Test for IP: <span class="ip-address">{{ result.ipTestResult.ip }}</span></h5>
        <div class="ip-test-card">
          <div class="ip-test-header">
            <span :class="['ip-result', getIpResultClass(result.ipTestResult.result)]">
              {{ getDisplayResult(result.ipTestResult.result) }}
            </span>
          </div>
          <p class="ip-explanation">{{ result.ipTestResult.explanation }}</p>
          <div v-if="result.ipTestResult.details">
            <details style="margin-top: 0.5rem;">
              <summary>Show SPF Engine Details</summary>
              <pre>{{ JSON.stringify(result.ipTestResult.details, null, 2) }}</pre>
            </details>
          </div>
        </div>
      </div>

      <!-- Warnings -->
      <div v-if="result.warnings && result.warnings.length" class="warnings-section">
        <h4>⚠️ Warnings</h4>
        <ul>
          <li v-for="warning in result.warnings" :key="warning">{{ warning }}</li>
        </ul>
      </div>

      <!-- Recommendations -->
      <div v-if="result.recommendations && result.recommendations.length" class="recommendations-section">
        <h4>💡 Recommendations</h4>
        <ul>
          <li v-for="recommendation in result.recommendations" :key="recommendation">{{ recommendation }}</li>
        </ul>
      </div>
      
      <!-- Errors -->
      <div v-if="result.errors && result.errors.length" class="errors-section">
        <h4>Errors</h4>
        <ul>
          <li v-for="error in result.errors" :key="error">{{ error }}</li>
        </ul>
      </div>
    </div>

    <div v-if="error" class="error-section">
      <p class="error-message">{{ error }}</p>
    </div>
  </div>
</template>


<style scoped>
.spf-checker {
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

.form-help {
  display: block;
  margin-top: 0.25rem;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.85rem;
  font-style: italic;
  opacity: 0.9;
}

/* Captcha specific styles */
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
}

.info-section p {
  margin: 0.75rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.6;
}

.lookup-warning {
  background: var(--vp-warning-soft, #fffbf0);
  color: var(--vp-c-warning-1, #d69e2e);
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-warning-1, #ffc107);
  margin: 0.75rem 0;
  font-weight: 600;
}

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

.mailauth-section {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-text-3, #6c757d);
}

.mailauth-section h5 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-2, #495057);
  font-size: 1.1rem;
  font-weight: 600;
}

.auth-info {
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border, #dee2e6);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.75rem;
}

.auth-info code {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  color: var(--vp-c-text-1, #2d3748);
  word-break: break-all;
}

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

.warnings-section {
  background: var(--vp-warning-soft, #fffbf0);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-warning-1, #ffc107);
  margin-top: 1.5rem;
}

.warnings-section h4 {
  color: var(--vp-c-warning-1, #d69e2e);
}

.recommendations-section {
  background: var(--vp-tip-soft, #f0f9ff);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-tip-1, #17a2b8);
  margin-top: 1.5rem;
}

.recommendations-section h4 {
  color: var(--vp-c-tip-1, #17a2b8);
}

.errors-section {
  background: var(--vp-danger-soft, #fdf2f2);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-danger-1, #dc3545);
  margin-top: 1.5rem;
}

.errors-section h4 {
  color: var(--vp-c-danger-1, #dc3545);
}

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

/* --- IP Test Section/Card Styling --- */
.ip-test-section {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1, #10B1EF);
}

.ip-test-section h5 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-brand-1, #10B1EF);
  font-size: 1.1rem;
  font-weight: 600;
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

.ip-address {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-weight: 600;
  color: var(--vp-c-text-1, #374151);
  background: var(--vp-c-bg-soft, #f8f9fa);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
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
}

/* Responsive design */
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
}

</style>
