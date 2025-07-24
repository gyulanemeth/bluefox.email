<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCaptcha } from './useCaptcha.js'

// --- CONSTANTS ---
const API_URL = import.meta.env.VITE_TOOLS_API_URL

const {
  captchaProbe,
  captchaImage,
  captchaExpires,
  captchaLoading,
  loadCaptcha
} = useCaptcha()

const domain = ref('')
const captchaText = ref('')
const loading = ref(false)
const error = ref(null)
const result = ref(null)
const captchaSolved = ref(false)

function isProbeExpired() {
  return !captchaProbe.value || Date.now() / 1000 > captchaExpires.value
}
function shouldShowCaptcha() {
  return (
    !captchaSolved.value ||
    !captchaProbe.value ||
    !captchaImage.value ||
    isProbeExpired()
  )
}
function validateInputs() {
  if (!API_URL) return 'API URL not configured. Please set VITE_TOOLS_API_URL.'
  if (shouldShowCaptcha()) {
    if (!captchaProbe.value) return 'Please load the captcha first.'
    if (!captchaText.value.trim()) return 'Please enter the captcha text.'
  }
  if (!domain.value.trim()) return 'Please enter a domain name.'
  return null
}
async function refreshCaptcha() {
  captchaText.value = ''
  captchaSolved.value = false
  await loadCaptcha()
}
async function callDmarcApi() {
  const response = await fetch(`${API_URL}/v1/analyze-dmarc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      domain: domain.value,
      captchaText: captchaSolved.value ? '' : captchaText.value,
      captchaProbe: captchaProbe.value,
    })
  })

  let json
  try {
    json = await response.json()
  } catch {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const backendError = (json.error || (json.result && json.result.error) || '').toLowerCase()
  if (!response.ok) {
    if (backendError.includes('captcha')) {
      await refreshCaptcha()
      throw new Error('Captcha expired or invalid. Please solve the new captcha.')
    } else {
      throw new Error(json.error || json.message || `HTTP error! status: ${response.status}`)
    }
  }

  return json.result || json
}
async function checkDmarc() {
  error.value = null
  result.value = null
  loading.value = true

  if (isProbeExpired()) {
    await refreshCaptcha()
    error.value = 'Captcha expired, please solve the new captcha.'
    loading.value = false
    return
  }

  const validationError = validateInputs()
  if (validationError) {
    error.value = validationError
    loading.value = false
    return
  }

  try {
    const resultData = await callDmarcApi()
    result.value = mapDmarcResult(resultData)
    if (resultData.success) {
      captchaSolved.value = true
      captchaText.value = ''
    }
  } catch (err) {
    if ((err?.message || '').toLowerCase().includes('captcha')) {
      // Already handled by refreshCaptcha above
    } else {
      error.value = handleApiError(err?.message || 'Failed to check DMARC. Please try again.')
    }
  } finally {
    loading.value = false
  }
}
function handleApiError(msg) {
  if (msg.includes('fetch')) return 'Cannot connect to the server. Please make sure the backend is running.'
  if (msg.includes('404')) return 'API endpoint not found. Please check the server configuration.'
  if (msg.includes('500')) return 'Server error occurred. Please try again later.'
  if (msg.toLowerCase().includes('captcha')) return msg + ' Please try again with the new captcha.'
  return msg
}
function mapDmarcResult(resultData) {
  return {
    valid: !!resultData.success,
    domain: resultData.domain || domain.value,
    record: resultData.rawRecord || resultData.record || 'Not found',
    parsed: resultData.parsed || {},
    checkedRecord: resultData.checkedRecord,
    errors: resultData.success ? [] : [resultData.error || 'Unknown error occurred'],
    score: resultData.score,
    warnings: resultData.warnings || [],
    recommendations: resultData.recommendations || [],
  }
}

// DMARC TAG TABLE
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
  const parsed = result.value?.parsed || {}
  return [
    { tag: "v", value: parsed.v || "", description: DMARC_TAG_DESCRIPTIONS.v },
    { tag: "p", value: parsed.p || "", description: DMARC_TAG_DESCRIPTIONS.p },
    { tag: "sp", value: parsed.sp || "", description: DMARC_TAG_DESCRIPTIONS.sp },
    { tag: "rua", value: parsed.rua || "", description: DMARC_TAG_DESCRIPTIONS.rua },
    { tag: "ruf", value: parsed.ruf || "", description: DMARC_TAG_DESCRIPTIONS.ruf },
    { tag: "adkim", value: parsed.adkim || "", description: DMARC_TAG_DESCRIPTIONS.adkim },
    { tag: "aspf", value: parsed.aspf || "", description: DMARC_TAG_DESCRIPTIONS.aspf },
    { tag: "pct", value: parsed.pct != null ? parsed.pct : "", description: DMARC_TAG_DESCRIPTIONS.pct },
    { tag: "fo", value: parsed.fo || "", description: DMARC_TAG_DESCRIPTIONS.fo },
    { tag: "ri", value: parsed.ri || "", description: DMARC_TAG_DESCRIPTIONS.ri },
  ].filter(item => item.value !== "")
})

onMounted(async () => {
  await loadCaptcha()
  captchaSolved.value = false
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
            type="text"
            id="domain"
            v-model="domain"
            placeholder="example.com"
            required
            :disabled="loading"
          />
        </div>

        <!-- Captcha Section (stateless, per-component) -->
        <div class="form-group captcha-section" v-if="shouldShowCaptcha()">
          <label for="captcha">Security Verification:</label>
          <div class="captcha-container">
            <div class="captcha-image-container">
              <div v-if="captchaLoading" class="captcha-loading">Loading captcha...</div>
              <div v-else-if="captchaImage" class="captcha-image" v-html="captchaImage"></div>
              <div v-else class="captcha-placeholder">
                <button type="button" @click="refreshCaptcha" class="load-captcha-btn">
                  Load Captcha
                </button>
              </div>
            </div>
            <button
              type="button"
              @click="refreshCaptcha"
              class="refresh-captcha-btn"
              :disabled="captchaLoading"
              title="Refresh captcha"
            >
              <img src="/assets/reload.webp" alt="reload button" />
            </button>
          </div>
          <input
            type="text"
            id="captcha"
            v-model="captchaText"
            placeholder="Enter the text from the image above"
            required
            :disabled="loading || !captchaImage"
            autocomplete="off"
            class="captcha-input"
          />
          <small class="captcha-help">Enter the characters shown in the image above</small>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading || (shouldShowCaptcha() && (!captchaImage || !captchaText))"
          class="check-btn"
        >
          {{ loading ? 'Checking...' : 'Check DMARC' }}
        </button>
      </form>
    </div>

    <!-- Error Section -->
    <div v-if="error" class="error-section">
      <p class="error-message">{{ error }}</p>
    </div>

    <!-- DMARC Result Section -->
    <div v-if="result" class="result-section">
      <h3>DMARC Check Results</h3>
      <div class="status-box">
        <div v-if="result.valid">
          <p><strong>✓ DMARC Record Found</strong></p>
        </div>
        <div v-else>
          <p><strong>✗ DMARC Record Missing or Invalid</strong></p>
        </div>
        <div v-if="result.score">
          <p>
            <strong>Security Score:</strong>
            {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})
          </p>
        </div>
      </div>
      <!-- Basic Information -->
      <div class="info-section">
        <h4>Basic Information</h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p v-if="result.checkedRecord"><strong>Checked Record:</strong> {{ result.checkedRecord }}</p>
        <p><strong>DMARC Record:</strong> {{ result.record }}</p>
      </div>
      <!-- DMARC Record Breakdown Table -->
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
      <div v-if="result.warnings && result.warnings.length" class="warnings-section">
        <h4>⚠️ Warnings</h4>
        <ul>
          <li v-for="warning in result.warnings" :key="warning">{{ warning }}</li>
        </ul>
      </div>
      <div v-if="result.recommendations && result.recommendations.length" class="recommendations-section">
        <h4>💡 Recommendations</h4>
        <ul>
          <li v-for="recommendation in result.recommendations" :key="recommendation">{{ recommendation }}</li>
        </ul>
      </div>
      <div v-if="result.errors && result.errors.length" class="errors-section">
        <h4>Errors</h4>
        <ul>
          <li v-for="errMsg in result.errors" :key="errMsg">{{ errMsg }}</li>
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

.authentication-results {
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border, #dee2e6);
  border-radius: 6px;
  padding: 1rem;
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  overflow-x: auto;
  color: var(--vp-c-text-1, #2d3748);
}

.authentication-results pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
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
