<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCaptcha } from './useCaptcha.js'
import { useUrlState } from './useUrlState.js'

// Constants
const API_URL = import.meta.env.VITE_TOOLS_API_URL
if (!API_URL) throw new Error('VITE_TOOLS_API_URL not set')

const DEFAULT_SELECTOR = 'default'

const DKIM_TAG_DESCRIPTIONS = {
  v: "Version (always 'DKIM1').",
  k: "Key type (e.g., 'rsa').",
  p: "Public key for signature verification.",
  s: "Service type for this key.",
  h: "Allowed hash algorithms.",
  t: "DKIM flags.",
  n: "Free-form notes."
}

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
} = useCaptcha('dkim-checker')

const {
  domain,
  selector,
  initialize: initializeUrlState,
  setField
} = useUrlState({
  fields: ['domain', 'selector'],
  autoExecute: true,
  onAutoExecute: checkDkim
})

// Local state
const captchaText = ref('')
const loading = ref(false)
const result = ref(null)

// Computed
const isFormDisabled = computed(() => 
  loading.value || (shouldShowCaptcha.value && (!captchaText.value || isProbeExpired.value))
)

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

// Watch for CAPTCHA expiration and clear results
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

async function checkDkim() {
  clearError()
  result.value = null
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
    const response = await fetch(`${API_URL}/v1/analyze-dkim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain: domain.value.trim(),
        selector: selector.value.trim() || DEFAULT_SELECTOR,
        captchaProbe: captchaProbe.value,
        captchaText: captchaText.value.trim()
      })
    })
    
    const json = await response.json()
    if (!response.ok) {
      const errorType = handleServerError(json)
      
      if (errorType === 'expired' || errorType === 'incorrect') {
        await autoResolveError()
      }
      return
    }
    result.value = {
      valid: true,
      domain: json.result.domain || domain.value,
      selector: json.result.selector || selector.value,
      record: json.result.rawRecord || json.result.record,
      rawRecord: json.result.rawRecord || json.result.record,
      warnings: json.result.warnings || [],
      recommendations: json.result.recommendations || [],
      score: json.result.score
    }
    captchaText.value = ''
    markSolved()

  } catch (error) {
    console.error('DKIM Check Error:', error)
    setError('NETWORK_ERROR', 'Network connection failed. Please try again.')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await initializeUrlState()
  
  // Set default selector if none provided
  if (!selector.value) {
    setField('selector', DEFAULT_SELECTOR)
  }
  
  if (!captchaProbe.value || isProbeExpired.value) {
    await loadCaptcha()
  }
})
</script>

<template>
  <div class="dkim-checker">
    <div class="tool-form">
      <form @submit.prevent="checkDkim">
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
          <small class="form-help">
            Enter the domain name you want to check for DKIM records
          </small>
        </div>

        <!-- Selector Input -->
        <div class="form-group">
          <label for="selector">DKIM Selector:</label>
          <input
            id="selector"
            v-model="selector"
            type="text"
            placeholder="default"
            :disabled="loading"
          />
          <small class="form-help">
            Most common selectors are: <code>default</code>, <code>google</code>, <code>mail</code>
          </small>
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
          <span v-else>Check DKIM Record</span>
        </button>
      </form>
    </div>

    <!-- Error Display -->
    <div v-if="hasError" class="error-section">
      <p class="error-message">{{ currentError.message }}</p>
    </div>

    <!-- Results -->
    <div v-if="result" class="result-section">
      <h3>DKIM Check Results</h3>
      
      <!-- Status -->
      <div class="status-box">
        <p><strong>{{ result.valid ? 'DKIM Record Found' : 'DKIM Record Missing or Invalid' }}</strong></p>
        <p v-if="result.score">
          <strong>Security Score:</strong>
          {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">Security assessment based on key strength, algorithm choice, and record configuration.</span>
          </span>
        </p>
      </div>

      <!-- Basic Information -->
      <div class="info-section">
        <h4>
          Basic Information
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">Core details about the DKIM record found for this domain and selector.</span>
          </span>
        </h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p>
          <strong>Selector:</strong> {{ result.selector }}
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">The DKIM selector used to locate the public key. Different services often use different selectors.</span>
          </span>
        </p>
        <p><strong>DKIM Record:</strong></p>
        <div class="record-display">
          <code class="dkim-record">{{ result.record }}</code>
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">The complete DKIM TXT record retrieved from DNS at [selector]._domainkey.[domain].</span>
          </span>
        </div>
      </div>

      <!-- DKIM Tags Table -->
      <div v-if="dkimTags.length" class="dkim-table-section">
        <h4>
          DKIM Record Breakdown
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">Each component of the DKIM record explained. These tags define the public key and signature parameters.</span>
          </span>
        </h4>
        <div class="table-container">
          <table class="dkim-table">
            <thead>
              <tr>
                <th class="tag-col">Tag</th>
                <th class="value-col">Value</th>
                <th class="desc-col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tag in dkimTags" :key="tag.tag">
                <td class="tag-cell">{{ tag.tag }}</td>
                <td class="value-cell">{{ tag.value }}</td>
                <td class="desc-cell">{{ tag.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Warnings, Recommendations -->
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
    </div>
  </div>
</template>

<style scoped>
.dkim-checker {
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
  line-height: 1.4;
}

.form-help code {
  background: var(--vp-c-bg-soft, #f8f9fa);
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.8rem;
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

.record-display {
  margin-top: 0.5rem;
  position: relative;
}

.dkim-record {
  display: block;
  padding: 0.75rem;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 6px;
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 1.4;
  color: var(--vp-c-text-1, #333);
  margin-right: 2rem;
}

/* Info tip styles */
.info-tip {
  display: inline-block;
  margin-left: .3rem;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-radius: 50%;
  background: var(--vp-c-brand-1, #10B1EF);
  color: #fff;
  font-size: .675rem;
  cursor: help;
  position: relative;
}

.info-tip-pop {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 125%;
  transform: translateX(-50%);
  min-width: 220px;
  padding: .6rem .8rem;
  border-radius: 6px;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
  color: var(--vp-c-text-1, #374151);
  font-size: .775rem;
  z-index: 10;
  transition: opacity .15s;
}

.info-tip:hover .info-tip-pop,
.info-tip:focus .info-tip-pop {
  opacity: 1;
}

.dkim-table-section {
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.dkim-table-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
}

.table-container {
  overflow-x: auto;
  margin: 1rem 0;
  padding: 0 1rem;
  background: var(--vp-c-bg, #ffffff);
}

.dkim-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  background: var(--vp-c-bg, #fff);
  border-radius: 8px;
  border: 1px solid var(--vp-c-border-soft, #ddd);
}

.dkim-table th,
.dkim-table td {
  padding: 0.875rem 1.25rem;
  text-align: left;
  vertical-align: top;
}

.dkim-table th {
  background: var(--vp-c-bg-soft, #f5f5f5);
  font-weight: 600;
  border-bottom: 2px solid var(--vp-c-border, #e5e7eb);
}

.tag-col { width: 15%; min-width: 80px; }
.value-col { width: 50%; min-width: 200px; }
.desc-col { width: 35%; min-width: 150px; }

.tag-cell { 
  font-family: monospace; 
  font-weight: 600;
  color: var(--vp-c-brand-1, #10B1EF);
}

.value-cell { 
  font-family: monospace; 
  word-break: break-all;
  font-size: 0.875rem;
  line-height: 1.4;
}

.desc-cell {
  font-size: 0.875rem;
  color: var(--vp-c-text-2, #6b7280);
  line-height: 1.4;
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

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .refresh-captcha-btn {
    background: #fff;
    border-color: #333;
    color: #222;
  }
  
  .dkim-table th {
    background: var(--vp-c-bg-soft, #252736);
    color: var(--vp-c-text-1, #aad0f7);
  }
  
  .dkim-record {
    background: var(--vp-c-bg-soft, #252736);
    color: #77bdfb;
  }
  
  .recommendations-section,
  .recommendations-section ul,
  .recommendations-section li {
    color: #2d3748 !important;
  }
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
  
  .dkim-table-section {
    margin-left: -1rem;
    margin-right: -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .table-container {
    margin: 1rem -1rem;
  }
  
  .captcha-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .refresh-captcha-btn {
    align-self: center;
  }
  
  .dkim-table {
    font-size: 0.875rem;
    min-width: 600px;
  }
  
  .dkim-table th,
  .dkim-table td {
    padding: 0.5rem 0.75rem;
  }
  
  .dkim-record {
    margin-right: 1rem;
  }
}
</style>
