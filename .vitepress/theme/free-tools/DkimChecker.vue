<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCaptcha } from './useCaptcha.js'

const API_URL = import.meta.env.VITE_TOOLS_API_URL
const DEFAULT_SELECTOR = 'default'

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
} = useCaptcha('dkim-checker')

// Form state
const domain = ref('')
const selector = ref(DEFAULT_SELECTOR)
const captchaText = ref('')
const loading = ref(false)
const result = ref(null)

// Enhanced validation
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

// Enhanced checkDkim with precise timing and error handling
async function checkDkim() {
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
      selector: selector.value.trim() || DEFAULT_SELECTOR,
      captchaProbe: captchaProbe.value,
      captchaText: captchaText.value.trim()
    }

    const res = await fetch(`${API_URL}/v1/analyze-dkim`, {
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
    result.value = json.result
    captchaText.value = ''
    markSolved()

  } catch (networkError) {
    console.error('DKIM Check Error:', networkError)
    setError('NETWORK_ERROR')
  } finally {
    loading.value = false
  }
}

// DKIM parsing logic
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
        <!-- Domain Input -->
        <div class="form-group">
          <label for="domain">Domain to Check:</label>
          <input
            id="domain"
            v-model="domain"
            placeholder="example.com"
            required
            :disabled="loading"
          />
          <small class="help-text">
            Enter the domain name you want to check for DKIM records
          </small>
        </div>

        <!-- Selector Input -->
        <div class="form-group">
          <label for="selector">DKIM Selector:</label>
          <input
            id="selector"
            v-model="selector"
            placeholder="default"
            :disabled="loading"
          />
          <small class="help-text">
            Most common selectors are: <code>default</code>, <code>google</code>, <code>mail</code>
          </small>
        </div>

        <!-- Expiration banner - Same as DMARC -->
        <div v-if="captchaProbe && isProbeExpired" class="captcha-expired-message">
          Your verification has expired. Please refresh the captcha below.
        </div>

        <!-- CAPTCHA Section -->
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
                role="img"
                aria-label="Security verification image"
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
              title="Get a new verification image"
              aria-label="Refresh verification image"
            >
              <img src="/assets/reload.webp?url" alt="Refresh">
            </button>
          </div>
          
          <input
            id="captcha"
            class="captcha-input"
            v-model="captchaText"
            type="text"
            placeholder="Enter the text from the image above"
            :disabled="loading || !captchaImage"
            autocomplete="off"
            required
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
          <span v-else>Check DKIM Record</span>
        </button>
      </form>
    </div>

    <!-- Error Section - Same placement as DMARC (after form, before results) -->
    <div v-if="hasError" class="error-section">
      <p class="error-message">{{ currentError.message }}</p>
    </div>

    <!-- Results Section -->
    <div v-if="result" class="result-section">
      <h3>DKIM Check Results</h3>
      <div class="status-indicator">
        <p v-if="result.success" class="status-success">
          DKIM Record Found
        </p>
        <p v-else class="status-error">
          DKIM Record Missing or Invalid
        </p>
      </div>

      <div class="info-section">
        <h4>Basic Information</h4>
        <div class="info-grid">
          <div class="info-item">
            <strong>Domain:</strong> {{ result.domain }}
          </div>
          <div class="info-item">
            <strong>Selector:</strong> {{ result.selector }}
          </div>
          <div class="info-item record-display">
            <strong>Record:</strong>
            <code class="dkim-record">{{ result.rawRecord || result.record }}</code>
          </div>
        </div>
      </div>

      <div v-if="dkimTags.length" class="dkim-table-section">
        <h4>Record Breakdown</h4>
        <div class="table-container">
          <table class="dkim-record-table">
            <thead>
              <tr>
                <th>Tag</th>
                <th>Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tag in dkimTags" :key="tag.tag">
                <td class="tag-column">{{ tag.tag }}</td>
                <td class="value-column">{{ tag.value }}</td>
                <td class="description-column">{{ tag.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
  line-height: 1.4;
}

.help-text code {
  background: var(--vp-c-bg-soft, #f8f9fa);
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

/* Captcha expiration message - Same as DMARC */
.captcha-expired-message {
  background: #fff3cd;
  border: 1px solid #ffc107;
  color: #856404;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

/* Captcha specific styles - Same as DMARC */
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
  background: #ffffff !important; /* Force white background for captcha visibility */
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
  color: #6b7280; /* Use fixed gray color for better contrast on white background */
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

/* Error Section - Same as DMARC */
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
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1, #333);
  font-size: 1.5rem;
}

.status-indicator {
  margin-bottom: 1.5rem;
}

.status-success {
  color: #059669;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
}

.status-error {
  color: #dc2626;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
}

.info-section h4,
.dkim-table-section h4 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1, #333);
  font-size: 1.15rem;
  font-weight: 600;
}

.info-grid {
  display: grid;
  gap: 1rem;
}

.info-item {
  padding: 0.75rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 6px;
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
}

.info-item strong {
  color: var(--vp-c-text-1, #333);
}

.record-display {
  grid-column: 1 / -1;
}

.dkim-record {
  display: block;
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 4px;
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 1.4;
}

/* Enhanced DKIM table styles */
.table-container {
  overflow-x: auto;
  margin: 1rem 0;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
}

.dkim-record-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--vp-c-bg, #ffffff);
}

.dkim-record-table th,
.dkim-record-table td {
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
  padding: 0.75rem;
  text-align: left;
  vertical-align: top;
}

.dkim-record-table th {
  background: var(--vp-c-bg-soft, #f8f9fa);
  font-weight: 600;
  color: var(--vp-c-text-1, #333);
  font-size: 0.9rem;
}

.tag-column {
  width: 60px;
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-weight: 600;
  color: var(--vp-c-brand-1, #10B1EF);
}

.value-column {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  word-break: break-all;
  white-space: pre-wrap;
  max-width: 300px;
}

.description-column {
  font-size: 0.875rem;
  color: var(--vp-c-text-2, #6b7280);
  line-height: 1.4;
}

/* Enhanced responsive design */
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
  
  .captcha-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .refresh-captcha-btn {
    align-self: center;
    margin-top: 0.5rem;
  }
  
  .table-container {
    font-size: 0.875rem;
  }
  
  .dkim-record-table th,
  .dkim-record-table td {
    padding: 0.5rem;
  }
  
  .value-column {
    max-width: 200px;
  }
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
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

  .dark .tag-column {
    color: #77bdfb;
  }
  
  .dark .dkim-record {
    color: #77bdfb;
    background: var(--vp-c-bg-soft, #252736);
  }
}
</style>
