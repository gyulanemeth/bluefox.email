<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_TOOLS_API_URL

const ERROR_MSG = {
  apiConfig: 'API URL not configured. Please set VITE_TOOLS_API_URL in your environment.',
  captchaFirst: 'Please load the captcha first.',
  captchaPrompt: 'Please enter the captcha text.'
}
const errorMsgs = {
  connect: 'Cannot connect to the server. Please make sure the backend is running.',
  endpoint: 'API endpoint not found. Please check the server configuration.',
  server: 'Server error occurred. Please try again later.'
}

// === STATE ===
const xmlPaste = ref('')
const file = ref(null)
const fileName = ref('')
const captchaText = ref('')
const captchaImage = ref(null)
const captchaProbe = ref(null)
const captchaLoading = ref(false)
const loading = ref(false)
const error = ref(null)
const result = ref(null)

// === HELPERS ===
function validateInputs() {
  if (!xmlPaste.value.trim() && !file.value) {
    return 'Paste your DMARC XML or upload an XML file to analyze.'
  }
  if (!captchaProbe.value) {
    return ERROR_MSG.captchaFirst
  }
  if (!captchaText.value.trim()) {
    return ERROR_MSG.captchaPrompt
  }
  if (!API_URL) {
    return ERROR_MSG.apiConfig
  }
  return null
}

function formatDateRange(dateRange) {
  if (!dateRange) return 'Unknown'
  if (dateRange.start && dateRange.end) {
    return `${new Date(dateRange.start * 1000).toLocaleString()} — ${new Date(dateRange.end * 1000).toLocaleString()}`
  }
  return typeof dateRange === 'string' ? dateRange : 'Unknown'
}

function handleApiError(msg) {
  if (msg.includes('fetch')) return errorMsgs.connect
  if (msg.includes('404')) return errorMsgs.endpoint
  if (msg.includes('500')) return errorMsgs.server
  if (msg.toLowerCase().includes('captcha')) return msg + ' Please try again with the new captcha.'
  return msg
}

// === CAPTCHA ===
async function loadCaptcha() {
  captchaLoading.value = true
  error.value = null
  try {
    if (!API_URL) throw new Error(ERROR_MSG.apiConfig)
    const response = await fetch(`${API_URL}/v1/captcha/generate`)
    if (!response.ok) throw new Error(`Failed to load captcha: ${response.status}`)
    const data = await response.json()
    if (data.result && data.result.captcha) {
      captchaImage.value = data.result.captcha.image
      captchaProbe.value = data.result.captcha.probe
      captchaText.value = ''
    } else {
      throw new Error('Invalid captcha response from server')
    }
  } catch (err) {
    error.value = `Failed to load captcha: ${err.message}`
  } finally {
    captchaLoading.value = false
  }
}
async function refreshCaptcha() {
  await loadCaptcha()
}

// === FILE HANDLING ===
function handleFileChange(e) {
  const selected = e.target.files[0]
  if (!selected) {
    clearFile()
    return
  }
  if (!selected.name.endsWith('.xml')) {
    error.value = 'Only XML files are supported.'
    clearFile()
    return
  }
  file.value = selected
  fileName.value = selected.name
  // Clear paste field if file chosen
  xmlPaste.value = ''
}
function clearFile() {
  file.value = null
  fileName.value = ''
  // (optional) clear error on clear
  error.value = null
}
function handleDrop(e) {
  e.preventDefault()
  const dropped = e.dataTransfer.files[0]
  if (dropped && dropped.name.endsWith('.xml')) {
    file.value = dropped
    fileName.value = dropped.name
    xmlPaste.value = ''
    error.value = null
  } else {
    error.value = 'Only XML files are supported.'
  }
}

// === MAIN SUBMIT ===
async function analyzeReport() {
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
    let response, data
    if (file.value) {
      // Use file upload endpoint
      const formData = new FormData()
      formData.append('file', file.value)
      formData.append('captchaText', captchaText.value)
      formData.append('captchaProbe', captchaProbe.value)
      response = await fetch(`${API_URL}/v1/analyze-dmarc-report-upload`, {
        method: 'POST',
        body: formData
      })
      data = await response.json()
    } else {
      // Use pasted XML
      const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xml: xmlPaste.value,
          captchaText: captchaText.value,
          captchaProbe: captchaProbe.value
        })
      }
      response = await fetch(`${API_URL}/v1/analyze-dmarc-report`, reqOptions)
      data = await response.json()
    }

    const resultData = data.result || data
    if (!response.ok || !resultData.success) {
      if (resultData.error && resultData.error.toLowerCase().includes('captcha')) {
        await refreshCaptcha()
        captchaText.value = ''
      }
      throw new Error(resultData.error || 'Failed to analyze DMARC report.')
    }
    result.value = resultData
    await refreshCaptcha()
    // Reset upload field after successful upload
    clearFile()
  } catch (err) {
    const msg = err?.message || 'Failed to analyze DMARC report. Please try again.'
    error.value = handleApiError(msg)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCaptcha()
})
</script>

<template>
  <div class="dmarc-analyzer">
    <div class="tool-form">
      <form @submit.prevent="analyzeReport">
        <div class="form-group">
          <label for="xmlPaste">Paste DMARC Report XML:</label>
          <textarea
            id="xmlPaste"
            rows="8"
            class="xml-paste"
            v-model="xmlPaste"
            placeholder="Paste your DMARC XML here..."
            :disabled="!!file || loading"
            autocomplete="off"
            autocorrect="off"
          />
        </div>
        <div class="form-group">
          <label>Or Upload XML File:</label>
          <div
            class="file-upload-area"
            @dragover.prevent
            @drop="handleDrop"
          >
            <input
              type="file"
              accept=".xml"
              @change="handleFileChange"
              :disabled="!!xmlPaste || loading"
              style="display: none;"
              id="fileInput"
            />
            <label for="fileInput" class="file-upload-label" :class="{ disabled: !!xmlPaste || loading }">
              <span v-if="fileName">{{ fileName }}</span>
              <span v-else>Click or drag XML file here</span>
            </label>
            <button
              v-if="fileName"
              type="button"
              class="remove-file-btn"
              @click="clearFile"
              :disabled="loading"
            >Remove</button>
          </div>
        </div>
        <!-- Captcha Section -->
        <div class="form-group captcha-section">
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
              🔄
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
                :disabled="loading || (!xmlPaste && !file) || !captchaImage || !captchaText"
                class="analyze-btn">
          {{ loading ? 'Analyzing...' : 'Analyze Report' }}
        </button>
      </form>
    </div>
    <div v-if="result" class="result-section">
      <h3>DMARC Report Analysis</h3>
      <div class="report-summary">
        <div class="summary-grid">
          <div class="summary-item">
            <span class="label">Email Provider:</span>
            <span class="value">{{ result.emailProvider || result.organization || 'Unknown' }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Domain:</span>
            <span class="value">{{ result.domain || 'Unknown' }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Report Date:</span>
            <span class="value">
              {{ result.reportDate ? new Date(result.reportDate).toLocaleString() : 'Unknown' }}
            </span>
          </div>
          <div class="summary-item">
            <span class="label">Report ID:</span>
            <span class="value">{{ result.reportId || 'Unknown' }}</span>
          </div>
        </div>
        <div class="summary-grid">
          <div class="summary-item">
            <span class="label">Messages:</span>
            <span class="value">{{ result.totalMessages }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Pass Rate:</span>
            <span class="value">{{ result.passRate }}%</span>
          </div>
          <div class="summary-item">
            <span class="label">Score:</span>
            <span class="value">{{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})</span>
          </div>
          <div class="summary-item">
            <span class="label">Date Range:</span>
            <span class="value">{{ formatDateRange(result.dateRange) }}</span>
          </div>
          <div class="summary-item">
            <span class="label">DMARC Policy:</span>
            <span class="value">{{ result.policy.dmarc }}</span>
          </div>
          <div class="summary-item">
            <span class="label">SPF Alignment:</span>
            <span class="value">{{ result.policy.spfAlignment }}</span>
          </div>
          <div class="summary-item">
            <span class="label">DKIM Alignment:</span>
            <span class="value">{{ result.policy.dkimAlignment }}</span>
          </div>
        </div>
      </div>
      <div class="sources-section">
        <h4>Sources</h4>
        <div class="sources-table">
          <div class="table-header">
            <span>IP</span>
            <span>Count</span>
            <span>DMARC</span>
            <span>SPF</span>
            <span>DKIM</span>
          </div>
          <div
            v-for="src in result.sources"
            :key="src.ip"
            class="table-row"
          >
            <span class="ip">{{ src.ip }}</span>
            <span class="count">{{ src.count }}</span>
            <span class="result" :class="{ pass: src.dmarcResult === 'Pass', fail: src.dmarcResult !== 'Pass' }">
              {{ src.dmarcResult }}
            </span>
            <span class="result" :class="{ pass: src.spfResult === 'pass', fail: src.spfResult !== 'pass' }">
              {{ src.spfResult }}
            </span>
            <span class="result" :class="{ pass: src.dkimResult === 'pass', fail: src.dkimResult !== 'pass' }">
              {{ src.dkimResult }}
            </span>
          </div>
        </div>
      </div>
      <div class="recommendations" v-if="result.warnings.length || result.recommendations.length">
        <h4>Warnings</h4>
        <ul>
          <li v-for="w in result.warnings" :key="w">{{ w }}</li>
        </ul>
        <h4>Recommendations</h4>
        <ul>
          <li v-for="r in result.recommendations" :key="r">{{ r }}</li>
        </ul>
      </div>
    </div>
    <div v-if="error" class="error-section">
      <p class="error-message">{{ error }}</p>
    </div>
  </div>
</template>


<style scoped>
.dmarc-analyzer {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.form-group textarea.xml-paste {
  width: 100%;
  min-height: 140px;
  padding: 0.875rem 1rem;
  border: 2px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-1, #374151);
  resize: vertical;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-group textarea.xml-paste:focus {
  outline: none;
  border-color: var(--vp-c-brand-1, #10B1EF);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft, rgba(16, 177, 239, 0.1));
}

.form-group textarea.xml-paste:disabled {
  background: var(--vp-c-bg-mute, #f1f5f9);
  opacity: 0.6;
  cursor: not-allowed;
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

.file-info {
  margin-top: 0.5rem;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
}

.remove-file-btn {
  background: var(--vp-c-danger-1, #dc3545);
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  margin-left: 0.5rem;
  transition: background-color 0.2s ease;
}

.remove-file-btn:hover:not(:disabled) {
  background: var(--vp-c-danger-2, #c82333);
}

.remove-file-btn:disabled {
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

.file-upload-area {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}
.file-upload-label {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  color: var(--vp-c-text-1, #374151);
  font-size: 0.95rem;
  user-select: none;
  transition: background 0.2s;
}
.file-upload-label.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
.remove-file-btn {
  background: var(--vp-c-danger-1, #dc3545);
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background-color 0.2s ease;
}
.remove-file-btn:hover:not(:disabled) {
  background: var(--vp-c-danger-2, #c82333);
}
.remove-file-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.analyze-btn {
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

.analyze-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2, #0891d4);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.analyze-btn:disabled {
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

.result-content h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
}

.report-summary,
.policy-info,
.sources-section,
.recommendations {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.report-summary:first-child {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

.summary-grid,
.policy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.summary-item,
.policy-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.summary-item .label,
.policy-item .label {
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  font-weight: 500;
}

.summary-item .value,
.policy-item .value {
  color: var(--vp-c-text-1, #374151);
  font-weight: 600;
  font-size: 1rem;
}

.value.excellent {
  color: var(--vp-c-tip-1, #28a745);
}

.value.good {
  color: var(--vp-c-tip-1, #28a745);
}

.value.warning {
  color: var(--vp-c-warning-1, #ffc107);
}

.value.poor {
  color: var(--vp-c-danger-1, #dc3545);
}

.sources-table {
  overflow-x: auto;
  margin-top: 1rem;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  gap: 1rem;
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
  align-items: center;
}

.table-header {
  background: var(--vp-c-bg-soft, #f8f9fa);
  font-weight: 600;
  color: var(--vp-c-text-1, #374151);
  font-size: 0.875rem;
}

.table-row:hover {
  background: var(--vp-c-bg-soft, #f8f9fa);
}

.table-row .ip {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.875rem;
}

.table-row .count {
  font-weight: 600;
}

.table-row .result.pass {
  color: var(--vp-c-tip-1, #28a745);
  font-weight: 600;
}

.table-row .result.fail {
  color: var(--vp-c-danger-1, #dc3545);
  font-weight: 600;
}

.recommendations ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.recommendations li {
  margin: 0.5rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.5;
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
  .analyze-btn {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .analyze-btn:hover:not(:disabled) {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
  
  .result-section {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .dmarc-analyzer {
    padding: 0 0.5rem;
  }
  
  .tool-form,
  .result-section {
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .form-group input,
  .form-group textarea.xml-paste,
  .analyze-btn {
    padding: 0.75rem;
  }
  
  .result-section h3 {
    font-size: 1.25rem;
  }
  
  .result-content h4 {
    font-size: 1.1rem;
  }
  
  .summary-grid,
  .policy-grid {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .table-header {
    display: none;
  }
  
  .table-row {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 1rem;
    border: 1px solid var(--vp-c-border-soft, #eee);
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }
  
  .table-row > span::before {
    content: attr(data-label) ": ";
    font-weight: 600;
    color: var(--vp-c-text-2, #6b7280);
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