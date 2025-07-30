<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCaptcha } from './useCaptcha.js'

const API_URL = import.meta.env.VITE_TOOLS_API_URL

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
} = useCaptcha('dmarc-checker')

const domain = ref('')
const captchaText = ref('')
const loading = ref(false)
const result = ref(null)

// Enhanced validation using composable functions
function validateInputs() {
  if (!API_URL) {
    setError('NETWORK_ERROR', 'API configuration is missing. Please contact support.')
    return false
  }
  
  if (!domain.value.trim()) {
    setError('MISSING_TEXT', 'Please enter the domain you want to check (e.g., example.com)')
    return false
  }
  
  if (shouldShowCaptcha.value) {
    return validateCaptchaInput(captchaText.value)
  }
  
  return true
}

// Enhanced checkDmarc with precise timing and error handling
async function checkDmarc() {
  clearError()
  result.value = null
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
      domain: domain.value.trim(),
      captchaProbe: captchaProbe.value,
      captchaText: captchaText.value.trim()
    }

    const res = await fetch(`${API_URL}/v1/analyze-dmarc`, {
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
    result.value = mapDmarcResult(json.result)
    captchaText.value = ''
    markSolved()

  } catch (networkError) {
    console.error('DMARC Check Error:', networkError)
    setError('NETWORK_ERROR')
  } finally {
    loading.value = false
  }
}

function mapDmarcResult(d) {
  return {
    valid: !!d.success,
    domain: d.domain || domain.value,
    record: d.rawRecord || d.record || 'Not found',
    parsed: d.parsed || {},
    checkedRecord: d.checkedRecord,
    errors: d.success ? [] : [d.error || 'Unknown error occurred'],
    score: d.score,
    warnings: d.warnings || [],
    recommendations: d.recommendations || []
  }
}

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

const dmarcTags = computed(() => {
  const p = result.value?.parsed || {}
  return Object.entries(DMARC_TAG_DESCRIPTIONS)
    .map(([tag, desc]) => ({ tag, value: p[tag] ?? '', description: desc }))
    .filter(i => i.value !== '')
})

onMounted(async () => {
  if (!captchaProbe.value || isProbeExpired.value) {
    await loadCaptcha()
  }
})
</script>

<template>
  <div class="dmarc-checker">
    <div class="tool-form">
      <form @submit.prevent="checkDmarc">
        <!-- Domain input -->
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

        <!-- Expiration banner -->
        <div v-if="captchaProbe && isProbeExpired" class="captcha-expired-message">
          Your verification has expired. Please refresh the captcha below.
        </div>

        <!-- Captcha Section -->
        <div class="form-group captcha-section" v-if="shouldShowCaptcha">
          <label for="captcha">Security Verification:</label>
          <div class="captcha-container">
            <div class="captcha-image-container">
              <div v-if="captchaLoading" class="captcha-loading">
                Loading captcha...
              </div>
              <div
                v-else-if="captchaImage"
                class="captcha-image"
                v-html="captchaImage"
              />
              <div v-else class="captcha-placeholder">
                <button
                  type="button"
                  @click="loadCaptcha"
                  class="load-captcha-btn"
                >
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
            :disabled="loading || !captchaImage"
            autocomplete="off"
            required
            class="captcha-input"
          />
          <small class="captcha-help">
            Enter the characters shown in the image above
          </small>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="check-btn"
          :disabled="loading || (shouldShowCaptcha && !captchaText)"
        >
          <span v-if="loading" class="btn-loading">
            <div class="loading-spinner small"></div>
            Checking...
          </span>
          <span v-else>Check DMARC</span>
        </button>
      </form>
    </div>

    <!-- Error Section - Enhanced error display -->
    <div v-if="hasError" class="error-section">
      <p class="error-message">{{ currentError.message }}</p>
    </div>

    <!-- Results Section -->
    <div v-if="result" class="result-section">
      <h3>DMARC Check Results</h3>
      <!-- Status -->
      <div class="status-box">
        <div v-if="result.valid">
          <p><strong>DMARC Record Found</strong></p>
        </div>
        <div v-else>
          <p><strong>DMARC Record Missing or Invalid</strong></p>
        </div>
        <div v-if="result.score">
          <p>
            <strong>Security Score:</strong>
            {{ result.score.value }}/{{ result.score.outOf }}
            ({{ result.score.level }})
          </p>
        </div>
      </div>
      <!-- Basic Information -->
      <div class="info-section">
        <h4>Basic Information</h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p v-if="result.checkedRecord">
          <strong>Checked Record:</strong> {{ result.checkedRecord }}
        </p>
        <p><strong>DMARC Record:</strong> {{ result.record }}</p>
      </div>
      <!-- DMARC Record Breakdown -->
      <div v-if="dmarcTags.length" class="dmarc-table-section">
        <h4>DMARC Record Breakdown</h4>
        <table class="dmarc-record-table">
          <thead>
            <tr>
              <th style="width: 60px;">Tag</th>
              <th style="width: 200px;">Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tag in dmarcTags" :key="tag.tag">
              <td>{{ tag.tag.toUpperCase() }}</td>
              <td>{{ tag.value }}</td>
              <td>{{ tag.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Warnings -->
      <div v-if="result.warnings?.length" class="warnings-section">
        <h4>Warnings</h4>
        <ul>
          <li v-for="w in result.warnings" :key="w">{{ w }}</li>
        </ul>
      </div>
      <!-- Recommendations -->
      <div v-if="result.recommendations?.length" class="recommendations-section">
        <h4>Recommendations</h4>
        <ul>
          <li v-for="rec in result.recommendations" :key="rec">{{ rec }}</li>
        </ul>
      </div>
      <!-- Errors -->
      <div v-if="result.errors?.length" class="errors-section">
        <h4>Errors</h4>
        <ul>
          <li v-for="e in result.errors" :key="e">{{ e }}</li>
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

/* Captcha expiration message */
.captcha-expired-message {
  background: #fff3cd;
  border: 1px solid #ffc107;
  color: #856404;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
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
.analysis-section, 
.warnings-section, 
.recommendations-section, 
.errors-section {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.info-section h4, 
.analysis-section h4, 
.warnings-section h4, 
.recommendations-section h4, 
.errors-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
}

.info-section p,
.analysis-section p {
  margin: 0.75rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.6;
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

.dmarc-table-section {
  margin: 2em 0 0 0;
}

.dmarc-record-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
  background: var(--vp-c-bg, #fff);
}

.dmarc-record-table th,
.dmarc-record-table td {
  border: 1px solid #ddd;
  padding: 8px;
  font-size: 0.97em;
  vertical-align: top;
}

.dmarc-record-table th {
  background: #f5f5f5;
  font-weight: bold;
  text-align: left;
}

@media (prefers-color-scheme: dark) {
  .dmarc-record-table,
  .dmarc-record-table th,
  .dmarc-record-table td {
    background: var(--vp-c-bg, #17181c) !important;
    color: var(--vp-c-text-1, #e9e9e9);
    border-color: #282a36;
  }
  .dmarc-record-table th {
    background: #252736 !important;
    color: #aad0f7;
  }
}

/* Dark mode adjustments */
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
  .dmarc-checker {
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
  .analysis-section h4,
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
}
</style>
