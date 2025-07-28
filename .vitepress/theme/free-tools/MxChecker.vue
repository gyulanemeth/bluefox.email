<script setup>
import { ref, computed, onMounted } from 'vue'

// --- CONSTANTS ---
const API_URL = import.meta.env.VITE_TOOLS_API_URL

// --- CAPTCHA STATE ---
const captchaImage = ref(null)
const captchaProbe = ref(null)
const captchaExpires = ref(0)
const captchaLoading = ref(false)
const captchaText = ref('')

// --- FORM STATE ---
const domain = ref('')
const loading = ref(false)
const error = ref(null)
const result = ref(null)

// --- GLOBAL CAPTCHA MEMORY (in-memory, NOT localStorage) ---
const captchaSolved = ref(false)
const captchaSolvedUntil = ref(0) // Unix timestamp in seconds

function now() {
  return Math.floor(Date.now() / 1000)
}

// --- Show/hide captcha input ---
const shouldShowCaptcha = computed(() =>
  !captchaSolved.value ||
  !captchaProbe.value ||
  !captchaImage.value ||
  now() > captchaSolvedUntil.value
)

// --- LOAD CAPTCHA ---
async function loadCaptchaAndClearInput() {
  captchaLoading.value = true
  error.value = null
  try {
    if (!API_URL) throw new Error('API URL not configured.')
    const response = await fetch(`${API_URL}/v1/captcha/generate`)
    if (!response.ok) throw new Error(`Failed to load captcha: ${response.status}`)
    const data = await response.json()
    if (data.result && data.result.success && data.result.captcha) {
      captchaImage.value = data.result.captcha.image
      captchaProbe.value = data.result.captcha.probe
      captchaExpires.value = data.result.captcha.expires
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

function clearSession() {
  captchaProbe.value = null
  captchaImage.value = null
  captchaExpires.value = 0
  captchaText.value = ''
  captchaSolved.value = false
  captchaSolvedUntil.value = 0
}

// --- VALIDATION ---
function validateInputs() {
  if (!API_URL) return 'API URL not configured.'
  if (shouldShowCaptcha.value) {
    if (!captchaProbe.value) return 'Please load the captcha first.'
    if (!captchaText.value.trim()) return 'Please enter the captcha text.'
  }
  if (!domain.value.trim()) return 'Please enter a domain name.'
  return null
}

// --- MAIN ACTION ---
async function callMxApi() {
  const response = await fetch(`${API_URL}/v1/analyze-mx`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      domain: domain.value,
      captchaText: shouldShowCaptcha.value ? captchaText.value : '',
      captchaProbe: captchaProbe.value
    })
  })
  let json
  try {
    json = await response.json()
  } catch {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  if (!response.ok) {
    let errorMessage = json?.result?.error || json?.error || json?.message || `HTTP error! status: ${response.status}`
    throw new Error(errorMessage)
  }
  return json.result || json
}

function mapMxResult(resultData) {
  return {
    valid: !!resultData.success,
    domain: resultData.domain || domain.value,
    records: resultData.records || resultData.mxRecords || [],
    errors: resultData.success ? [] : [resultData.error || 'Unknown error occurred'],
    score: resultData.score,
    warnings: resultData.warnings || [],
    recommendations: resultData.recommendations || []
  }
}

function hasUniquePriorities(records) {
  if (!records || records.length === 0) return true
  const priorities = records.map(r => r.priority)
  const uniquePriorities = [...new Set(priorities)]
  return uniquePriorities.length === records.length
}

async function checkMx() {
  error.value = null
  result.value = null
  loading.value = true

  const validationError = validateInputs()
  if (validationError) {
    error.value = validationError
    loading.value = false
    return
  }

  try {
    const resultData = await callMxApi()
    if (!resultData.success && resultData.error?.toLowerCase().includes('captcha')) {
      captchaSolved.value = false
      captchaSolvedUntil.value = 0
      await loadCaptchaAndClearInput()
      throw new Error('Captcha expired or invalid. Please solve the new captcha.')
    }
    result.value = mapMxResult(resultData)
    // On success, hide captcha for 1 minute (in-memory)
    captchaSolved.value = true
    captchaSolvedUntil.value = now() + 60 // 1 minute
    captchaText.value = ''
  } catch (err) {
    error.value = err?.message || 'Failed to check MX records. Please try again.'
  } finally {
    loading.value = false
  }
}

// --- ON MOUNT: Always fresh, always ready ---
onMounted(async () => {
  clearSession()
  await loadCaptchaAndClearInput()
})
</script>


<template>
  <div class="mx-checker">
    <div class="tool-form">
      <form @submit.prevent="checkMx">
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
        <!-- Captcha Section (hidden after solve for 1 min) -->
        <div class="form-group captcha-section" v-if="shouldShowCaptcha">
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
                <button type="button" @click="loadCaptchaAndClearInput" class="load-captcha-btn">
                  Load Captcha
                </button>
              </div>
            </div>
            <button type="button" 
                    @click="() => { clearSession(); loadCaptchaAndClearInput(); }" 
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
                :disabled="loading || (shouldShowCaptcha && (!captchaImage || !captchaText))"
                class="check-btn">
          {{ loading ? 'Checking...' : 'Check MX Records' }}
        </button>
      </form>
    </div>

    <div v-if="result" class="result-section">
      <h3>MX Records Check Results</h3>
      <!-- Status -->
      <div class="status-box">
        <div v-if="result.valid">
          <p><strong>✓ MX Records Found</strong></p>
          <p><strong>Total Records:</strong> {{ result.records ? result.records.length : 0 }}</p>
        </div>
        <div v-else>
          <p><strong>✗ No MX Records Found</strong></p>
        </div>
        <div v-if="result.score">
          <p><strong>Configuration Score:</strong> {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})</p>
        </div>
      </div>
      <!-- MX Records Information -->
      <div v-if="result.records && result.records.length" class="mx-records-section">
        <h4>MX Records</h4>
        <div class="mx-table">
          <table>
            <thead>
              <tr>
                <th>Priority</th>
                <th>Mail Server</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in result.records" :key="record.exchange">
                <td>{{ record.priority }}</td>
                <td>{{ record.exchange }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Basic Information -->
      <div class="info-section">
        <h4>Basic Information</h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p><strong>Records Found:</strong> {{ result.records ? result.records.length : 0 }}</p>
        <div v-if="result.records && result.records.length">
          <p><strong>Primary Mail Server:</strong> {{ result.records[0].exchange }} (Priority: {{ result.records[0].priority }})</p>
          <div v-if="result.records.length > 1">
            <p><strong>Backup Servers:</strong></p>
            <ul>
              <li v-for="record in result.records.slice(1)" :key="record.exchange">
                {{ record.exchange }} (Priority: {{ record.priority }})
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Configuration Analysis -->
      <div v-if="result.valid" class="analysis-section">
        <h4>Configuration Analysis</h4>
        <div class="analysis-grid">
          <div class="analysis-item">
            <span class="label">Redundancy:</span>
            <span class="value" :class="result.records.length > 1 ? 'good' : 'warning'">
              {{ result.records.length > 1 ? 'Multiple servers configured' : 'Single server (consider adding backup)' }}
            </span>
          </div>
          <div class="analysis-item">
            <span class="label">Priority Configuration:</span>
            <span class="value" :class="hasUniquePriorities(result.records) ? 'good' : 'warning'">
              {{ hasUniquePriorities(result.records) ? 'Proper priority setup' : 'Some records have same priority' }}
            </span>
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
          <li v-for="errorMsg in result.errors" :key="errorMsg">{{ errorMsg }}</li>
        </ul>
      </div>
    </div>

    <div v-if="error" class="error-section">
      <p class="error-message">{{ error }}</p>
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

.mx-records-section {
  background: var(--vp-tip-soft, #f0f9ff);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-tip-1, #28a745);
  margin-top: 1.5rem;
}

.mx-records-section h4 {
  color: var(--vp-c-tip-1, #28a745);
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.mx-table {
  margin-top: 1rem;
}

.mx-table table {
  width: 100%;
  border-collapse: collapse;
  background: var(--vp-c-bg, #ffffff);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.mx-table th,
.mx-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-border, #dee2e6);
}

.mx-table th {
  background: var(--vp-c-bg-soft, #f8f9fa);
  font-weight: 600;
  color: var(--vp-c-text-2, #495057);
}

.mx-table tr:hover {
  background: var(--vp-c-bg-soft, #f8f9fa);
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
}
</style>
