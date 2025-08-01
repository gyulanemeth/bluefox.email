<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCaptcha } from './useCaptcha.js'
import { useUrlState } from './useUrlState.js'

// Constants
const API_URL = import.meta.env.VITE_TOOLS_API_URL

const DMARC_TAG_DESCRIPTIONS = {
  v: "DMARC version tag (should be DMARC1).",
  p: "Policy for main domain (none/quarantine/reject).",
  sp: "Subdomain policy (if present).",
  rua: "Aggregate report recipient(s).",
  ruf: "Forensic report recipient(s).",
  adkim: "DKIM alignment mode (r=relaxed, s=strict).",
  aspf: "SPF alignment mode (r=relaxed, s=strict).",
  pct: "Percent of mail subject to filtering.",
  fo: "Failure reporting options.",
  ri: "Report interval in seconds."
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
} = useCaptcha('dmarc-checker')

const {
  domain,
  initialize: initializeUrlState
} = useUrlState({
  fields: ['domain'],
  autoExecute: true,
  onAutoExecute: checkDmarc
})

// Local state
const captchaText = ref('')
const loading = ref(false)
const result = ref(null)

// Computed
const dmarcTags = computed(() => {
  const parsed = result.value?.parsed || {}
  return Object.entries(DMARC_TAG_DESCRIPTIONS)
    .map(([tag, description]) => ({
      tag: tag.toUpperCase(),
      value: parsed[tag] || '',
      description
    }))
    .filter(item => item.value)
})

const isFormDisabled = computed(() => 
  loading.value || (shouldShowCaptcha.value && (!captchaText.value || isProbeExpired.value))
)

// Methods
function validateInputs() {
  if (!API_URL) {
    setError('NETWORK_ERROR', 'API configuration is missing. Please contact support.')
    return false
  }
  
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

async function checkDmarc() {
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
    const response = await fetch(`${API_URL}/v1/analyze-dmarc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain: domain.value.trim(),
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
      record: json.result.rawRecord || json.result.record || 'Not found',
      parsed: json.result.parsed || {},
      checkedRecord: json.result.checkedRecord,
      score: json.result.score,
      warnings: json.result.warnings || [],
      recommendations: json.result.recommendations || []
    }
    
    captchaText.value = ''
    markSolved()

  } catch (error) {
    console.error('DMARC Check Error:', error)
    setError('NETWORK_ERROR', 'Network connection failed. Please try again.')
  } finally {
    loading.value = false
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
  <div class="dmarc-checker">
    <div class="tool-form">
      <form @submit.prevent="checkDmarc">
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
          <span v-else>Check DMARC</span>
        </button>
      </form>
    </div>

    <!-- Error Display -->
    <div v-if="hasError" class="error-section">
      <p class="error-message">{{ currentError.message }}</p>
    </div>

    <!-- Results -->
    <div v-if="result" class="result-section">
      <h3>DMARC Check Results</h3>
      
      <!-- Status -->
      <div class="status-box">
        <p><strong>{{ result.valid ? 'DMARC Record Found' : 'DMARC Record Missing or Invalid' }}</strong></p>
        <p v-if="result.score">
          <strong>Security Score:</strong>
          {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})
        </p>
      </div>

      <!-- Basic Information -->
      <div class="info-section">
        <h4>Basic Information</h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p v-if="result.checkedRecord"><strong>Checked Record:</strong> {{ result.checkedRecord }}</p>
        <p><strong>DMARC Record:</strong> {{ result.record }}</p>
      </div>

      <!-- DMARC Tags Table -->
      <div v-if="dmarcTags.length" class="dmarc-table-section">
        <h4>DMARC Record Breakdown</h4>
        <div class="table-container">
          <table class="dmarc-table">
            <thead>
              <tr>
                <th class="tag-col">Tag</th>
                <th class="value-col">Value</th>
                <th class="desc-col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tag in dmarcTags" :key="tag.tag">
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
.dmarc-checker {
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

/* DMARC Table */
.dmarc-table-section {
  margin-top: 1.5rem;
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
}

.dmarc-table-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
}

.table-container {
  overflow-x: auto;
}

.dmarc-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background: var(--vp-c-bg, #fff);
}

.dmarc-table th,
.dmarc-table td {
  border: 1px solid var(--vp-c-border-soft, #ddd);
  padding: 0.75rem;
  text-align: left;
  vertical-align: top;
}

.dmarc-table th {
  background: var(--vp-c-bg-soft, #f5f5f5);
  font-weight: 600;
}

.tag-col { width: 80px; }
.value-col { width: 200px; }
.desc-col { width: auto; }

.tag-cell { 
  font-family: monospace; 
  font-weight: 600;
}

.value-cell { 
  font-family: monospace; 
  word-break: break-all;
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
  .dmarc-table th {
    background: var(--vp-c-bg-soft, #252736);
    color: var(--vp-c-text-1, #aad0f7);
  }
  
  .refresh-captcha-btn {
    background: #fff;
    border-color: #333;
    color: #222;
  }
  
  /* Fix recommendations text color in dark mode */
  .recommendations-section,
  .recommendations-section ul,
  .recommendations-section li {
    color: #2d3748 !important; /* Dark grey/black text */
  }
}

/* Responsive */
@media (max-width: 768px) {
  .dmarc-checker {
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
  
  .dmarc-table {
    font-size: 0.875rem;
  }
  
  .dmarc-table th,
  .dmarc-table td {
    padding: 0.5rem;
  }
}
</style>
