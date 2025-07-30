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
} = useCaptcha('mx-checker')

// Form state
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

// Enhanced checkMx with precise timing and error handling
async function checkMx() {
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

    const res = await fetch(`${API_URL}/v1/analyze-mx`, {
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
    result.value = mapMxResult(json.result)
    captchaText.value = ''
    markSolved()

  } catch (networkError) {
    console.error('MX Check Error:', networkError)
    setError('NETWORK_ERROR')
  } finally {
    loading.value = false
  }
}

function mapMxResult(data) {
  return {
    valid: !!data.success,
    domain: data.domain || domain.value,
    records: data.records || data.mxRecords || [],
    errors: data.success ? [] : [data.error || 'Unknown error occurred'],
    score: data.score,
    warnings: data.warnings || [],
    recommendations: data.recommendations || []
  }
}

function hasUniquePriorities(records) {
  if (!records?.length) return true
  return new Set(records.map(r => r.priority)).size === records.length
}

onMounted(async () => {
  if (!captchaProbe.value || isProbeExpired.value) {
    await loadCaptcha()
  }
})
</script>

<template>
  <div class="mx-checker">
    <div class="tool-form">
      <form @submit.prevent="checkMx">
        <!-- Domain -->
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

        <!-- Expiration banner -->
        <div v-if="captchaProbe && isProbeExpired" class="captcha-expired-message">
          Your verification has expired. Please refresh the captcha below.
        </div>

        <!-- Captcha -->
        <div v-if="shouldShowCaptcha" class="form-group captcha-section">
          <label for="captcha">Security Verification:</label>
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
              <img src="/assets/reload.webp?url" alt="reload captcha">
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

        <!-- Submit -->
        <button
          type="submit"
          class="check-btn"
          :disabled="loading || (shouldShowCaptcha && !captchaText)"
        >
          <span v-if="loading" class="btn-loading">
            <div class="loading-spinner small"></div>
            Checking…
          </span>
          <span v-else>Check MX Records</span>
        </button>
      </form>
    </div>

    <!-- Enhanced Error Section -->
    <div v-if="hasError" class="error-section">
      <p class="error-message">{{ currentError.message }}</p>
    </div>

    <!-- Results -->
    <div v-if="result" class="result-section">
      <h3>MX Records Check Results</h3>
      <div class="status-box">
        <div v-if="result.valid">
          <p><strong>MX Records Found</strong></p>
          <p><strong>Total Records:</strong> {{ result.records.length }}</p>
        </div>
        <div v-else>
          <p><strong>No MX Records Found</strong></p>
        </div>
        <div v-if="result.score">
          <p>
            <strong>Score:</strong> {{ result.score.value }}/{{ result.score.outOf }}
            ({{ result.score.level }})
          </p>
        </div>
      </div>

      <!-- Enhanced MX Records Card-Based Layout -->
      <div v-if="result.records.length" class="mx-records-section">
        <h4>MX Records</h4>
        <div class="mx-records-container">
          <div class="mx-records-list">
            <div 
              v-for="(record, index) in result.records" 
              :key="record.exchange"
              class="mx-record-item"
            >
              <div class="mx-record-content">
                <div class="priority-section">
                  <div class="priority-badge">{{ record.priority }}</div>
                  <span class="priority-label">Priority</span>
                </div>
                <div class="server-section">
                  <div class="server-name">{{ record.exchange }}</div>
                  <div class="server-meta">
                    <span class="server-type">Mail Exchange Server</span>
                    <span class="server-status">• Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Summary stats -->
          <div class="mx-summary-stats">
            <div class="stat-card">
              <div class="stat-number">{{ result.records.length }}</div>
              <div class="stat-label">Mail Servers</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ Math.min(...result.records.map(r => r.priority)) }}</div>
              <div class="stat-label">Highest Priority</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ hasUniquePriorities(result.records) ? 'Yes' : 'No' }}</div>
              <div class="stat-label">Unique Priorities</div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <h4>Basic Info</h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p><strong>Records:</strong> {{ result.records.length }}</p>
      </div>

      <div v-if="result.valid" class="analysis-section">
        <h4>Analysis</h4>
        <div class="analysis-grid">
          <div class="analysis-item">
            <span class="label">Redundancy:</span>
            <span :class="result.records.length > 1 ? 'value good' : 'value warning'">
              {{ result.records.length > 1 ? 'Multiple servers' : 'Single server' }}
            </span>
          </div>
          <div class="analysis-item">
            <span class="label">Priority setup:</span>
            <span
              :class="hasUniquePriorities(result.records) ? 'value good' : 'value warning'"
            >
              {{ hasUniquePriorities(result.records) ? 'Unique priorities' : 'Duplicate priorities' }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="result.warnings.length" class="warnings-section">
        <h4>Warnings</h4>
        <ul><li v-for="w in result.warnings" :key="w">{{ w }}</li></ul>
      </div>
      <div v-if="result.recommendations.length" class="recommendations-section">
        <h4>Recommendations</h4>
        <ul><li v-for="r in result.recommendations" :key="r">{{ r }}</li></ul>
      </div>
      <div v-if="result.errors.length" class="errors-section">
        <h4>Errors</h4>
        <ul><li v-for="e in result.errors" :key="e">{{ e }}</li></ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mx-checker {
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

/* Enhanced MX Records Section - Card-Based Layout */
.mx-records-section {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.mx-records-section h4 {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
}

.mx-records-container {
  background: var(--vp-c-bg, #ffffff);
  border-radius: 12px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.mx-records-list {
  padding: 0;
}

.mx-record-item {
  border-bottom: 1px solid var(--vp-c-border-soft, #f1f5f9);
  transition: background-color 0.2s ease;
}

.mx-record-item:last-child {
  border-bottom: none;
}

.mx-record-item:hover {
  background: var(--vp-c-bg-soft, #f8f9fa);
}

.mx-record-content {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  align-items: center;
}

/* Priority Section */
.priority-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.priority-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--vp-c-brand-1, #10B1EF), var(--vp-c-brand-2, #0891d4));
  color: white;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(16, 177, 239, 0.25);
}

.priority-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2, #6b7280);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* Server Section */
.server-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.server-name {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-weight: 600;
  color: var(--vp-c-text-1, #333);
  font-size: 1rem;
  word-break: break-all;
  line-height: 1.4;
}

.server-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.server-type {
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  font-weight: 500;
}

.server-status {
  color: #22c55e;
  font-size: 0.875rem;
  font-weight: 600;
}

/* Summary Stats */
.mx-summary-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-top: 1px solid var(--vp-c-border-soft, #f1f5f9);
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  text-align: center;
  position: relative;
}

.stat-card:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 25%;
  bottom: 25%;
  width: 1px;
  background: var(--vp-c-border-soft, #dee2e6);
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-brand-1, #10B1EF);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2, #6b7280);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
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

.info-section p {
  margin: 0.75rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.6;
}

.analysis-section {
  background: var(--vp-tip-soft, #f0f9ff);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-tip-1, #17a2b8);
  margin-top: 1.5rem;
}

.analysis-section h4 {
  color: var(--vp-c-tip-1, #17a2b8);
}

.analysis-grid {
  display: grid;
  gap: 1rem;
}

.analysis-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--vp-c-bg, #ffffff);
  border-radius: 6px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
}

.analysis-item .label {
  font-weight: 600;
  color: var(--vp-c-text-1, #495057);
}

.analysis-item .value {
  font-weight: 500;
}

.analysis-item .value.good {
  color: var(--vp-c-green-1, #28a745);
}

.analysis-item .value.warning {
  color: var(--vp-c-warning-1, #ffc107);
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

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .mx-records-container {
    background: var(--vp-c-bg, #17181c);
    border-color: #282a36;
  }
  
  .mx-record-item {
    border-color: #282a36;
  }
  
  .server-name {
    color: #77bdfb;
  }
  
  .priority-badge {
    background: linear-gradient(135deg, #77bdfb, #5ba7f7);
    color: #1a1a1a;
  }
  
  .mx-summary-stats {
    background: #252736;
    border-color: #282a36;
  }
  
  .stat-card::after {
    background: #282a36;
  }

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
  .mx-checker {
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
  .mx-records-section h4,
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

  .mx-record-content {
    grid-template-columns: 100px 1fr;
    gap: 1rem;
    padding: 1.25rem;
  }
  
  .priority-badge {
    width: 42px;
    height: 42px;
    font-size: 0.9rem;
  }
  
  .server-name {
    font-size: 0.9rem;
  }
  
  .mx-summary-stats {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-card:not(:last-child)::after {
    display: none;
  }
  
  .stat-card:not(:last-child) {
    border-bottom: 1px solid var(--vp-c-border-soft, #dee2e6);
  }
}

@media (max-width: 480px) {
  .mx-record-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
    padding: 1rem;
  }
  
  .priority-section {
    flex-direction: row;
    justify-content: center;
  }
  
  .server-meta {
    justify-content: center;
  }
}
</style>

