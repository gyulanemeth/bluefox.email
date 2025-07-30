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
} = useCaptcha('dmarc-report-analyzer')

const xmlPaste = ref('')
const file = ref(null)
const fileName = ref('')
const captchaText = ref('')
const loading = ref(false)
const result = ref(null)

// --- Drag and Drop State ---
const isDragging = ref(false)
let dragLeaveTimeout = null

function handleDragOver(e) {
  e.preventDefault()
  if (dragLeaveTimeout) clearTimeout(dragLeaveTimeout)
  isDragging.value = true
}

function handleDragLeave(e) {
  e.preventDefault()
  dragLeaveTimeout = setTimeout(() => {
    isDragging.value = false
  }, 30)
}

function handleDrop(e) {
  e.preventDefault()
  isDragging.value = false
  const dropped = e.dataTransfer.files[0]
  if (dropped && dropped.name.endsWith('.xml')) {
    file.value = dropped
    fileName.value = dropped.name
    xmlPaste.value = ''
    clearError()
  } else {
    setError('NETWORK_ERROR', 'Only XML files are supported.')
  }
}

const MAX_FILENAME_LEN = 30
const truncatedFileName = computed(() => {
  if (!fileName.value) return ''
  if (fileName.value.length <= MAX_FILENAME_LEN) return fileName.value
  return `${fileName.value.slice(0, 15)}...${fileName.value.slice(-10)}`
})

// Enhanced validation using composable functions
function validateInputs() {
  if (!xmlPaste.value.trim() && !file.value) {
    setError('MISSING_TEXT', 'Please paste your DMARC XML or upload an XML file to analyze.')
    return false
  }

  if (!API_URL) {
    setError('NETWORK_ERROR', 'API configuration is missing. Please contact support.')
    return false
  }

  if (shouldShowCaptcha.value) {
    return validateCaptchaInput(captchaText.value)
  }

  return true
}

function formatDateRange(dateRange) {
  if (!dateRange) return 'Unknown'
  if (dateRange.start && dateRange.end) {
    return `${new Date(dateRange.start * 1000).toLocaleString()} — ${new Date(dateRange.end * 1000).toLocaleString()}`
  }
  return typeof dateRange === 'string' ? dateRange : 'Unknown'
}

// --- File Handling ---
function handleFileChange(e) {
  const selected = e.target.files[0]
  if (!selected) {
    clearFile()
    return
  }
  if (!selected.name.endsWith('.xml')) {
    setError('NETWORK_ERROR', 'Only XML files are supported.')
    clearFile()
    return
  }
  file.value = selected
  fileName.value = selected.name
  xmlPaste.value = ''
  clearError()
}

function clearFile() {
  file.value = null
  fileName.value = ''
  clearError()
}

// Enhanced analyzeReport with precise timing and error handling
async function analyzeReport() {
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

    let response, data
    if (file.value) {
      const formData = new FormData()
      formData.append('file', file.value)
      formData.append('captchaText', shouldShowCaptcha.value ? captchaText.value : '')
      formData.append('captchaProbe', captchaProbe.value)
      response = await fetch(`${API_URL}/v1/analyze-dmarc-report-upload`, {
        method: 'POST',
        body: formData
      })
      data = await response.json()
    } else {
      response = await fetch(`${API_URL}/v1/analyze-dmarc-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xml: xmlPaste.value,
          captchaText: shouldShowCaptcha.value ? captchaText.value : '',
          captchaProbe: captchaProbe.value
        })
      })
      data = await response.json()
    }

    // Enhanced server response handling
    if (!response.ok || !data.result?.success) {
      const serverError = data.result?.error || 'Server error occurred'
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
    result.value = data.result
    captchaText.value = ''
    markSolved()
    clearFile()

  } catch (networkError) {
    console.error('DMARC Report Analysis Error:', networkError)
    setError('NETWORK_ERROR')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (!captchaProbe.value || isProbeExpired.value) {
    await loadCaptcha()
  }
})
</script>

<template>
  <div class="dmarc-analyzer">
    <!-- Form -->
    <div class="tool-form">
      <form @submit.prevent="analyzeReport">
        <!-- XML Paste Input -->
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

        <!-- File Upload / Drag & Drop -->
        <div class="form-group">
          <label>Or Upload XML File:</label>
          <div
            class="file-upload-area"
            :class="{ 'drag-hover': isDragging }"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @drop="handleDrop"
          >
            <div v-if="isDragging" class="drag-overlay">
              <span>Drop XML file here…</span>
            </div>
            <input
              type="file"
              accept=".xml"
              @change="handleFileChange"
              :disabled="!!xmlPaste || loading"
              style="display: none;"
              id="fileInput"
            />
            <template v-if="!isDragging">
              <label
                v-if="!fileName"
                for="fileInput"
                class="file-upload-label"
                :class="{ disabled: !!xmlPaste || loading }"
              >
                Click or drag XML file here
              </label>
              <div v-else class="file-name-row">
                <span class="file-name" :title="fileName">{{ truncatedFileName }}</span>
                <button
                  type="button"
                  class="remove-file-btn"
                  @click="clearFile"
                  :disabled="loading"
                >
                  Remove
                </button>
              </div>
            </template>
          </div>
        </div>

        <!-- Expiration banner -->
        <div v-if="captchaProbe && isProbeExpired" class="captcha-expired-message">
          Your verification has expired. Please refresh the captcha below.
        </div>

        <!-- Captcha -->
        <div class="form-group captcha-section" v-if="shouldShowCaptcha">
          <label for="captcha">Security Verification:</label>
          <div class="captcha-container">
            <div class="captcha-image-container">
              <div v-if="captchaLoading" class="captcha-loading">Loading captcha…</div>
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
          class="analyze-btn"
          :disabled="loading || (!xmlPaste && !file) || (shouldShowCaptcha && !captchaText)"
        >
          <span v-if="loading" class="btn-loading">
            <div class="loading-spinner small"></div>
            Analyzing…
          </span>
          <span v-else>Analyze Report</span>
        </button>
      </form>
    </div>

    <!-- Enhanced Error Section -->
    <div v-if="hasError" class="error-section">
      <p class="error-message">{{ currentError.message }}</p>
    </div>

    <!-- Results Section -->
    <div v-if="result" class="result-section">
      <h3>DMARC Report Analysis</h3>

      <!-- Summary Grids -->
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
            <span class="value">
              {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})
            </span>
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

      <!-- Alignment Status -->
      <div
        v-if="result.domainAlignmentIssue !== undefined"
        class="alignment-status-box"
        :class="result.domainAlignmentIssue ? 'fail' : 'pass'"
      >
        <span v-if="result.domainAlignmentIssue">
          <strong>Domain Alignment Issue Detected:</strong> Some emails failed DMARC alignment.
        </span>
        <span v-else>
          <strong>No domain alignment issue detected.</strong>
        </span>
      </div>

      <!-- Sources Table -->
      <div class="sources-section">
        <h4>Sources</h4>
        <div class="sources-table">
          <div class="table-header">
            <span>IP</span><span>Count</span><span>DMARC</span><span>SPF</span><span>DKIM</span>
          </div>
          <div
            v-for="src in result.sources"
            :key="src.ip"
            class="table-row"
          >
            <span class="ip">{{ src.ip }}</span>
            <span class="count">{{ src.count }}</span>
            <span class="result" :class="src.dmarcResult === 'Pass' ? 'pass' : 'fail'">
              {{ src.dmarcResult === 'Pass' ? 'Pass' : 'Fail' }}
            </span>
            <span class="result" :class="src.spfResult === 'pass' ? 'pass' : 'fail'">
              {{ src.spfResult === 'pass' ? 'Pass' : 'Fail' }}
            </span>
            <span class="result" :class="src.dkimResult === 'pass' ? 'pass' : 'fail'">
              {{ src.dkimResult === 'pass' ? 'Pass' : 'Fail' }}
            </span>
          </div>
        </div>
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
          <li v-for="r in result.recommendations" :key="r">{{ r }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ROOT */
.dmarc-analyzer {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* --- FORM STYLES --- */
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

.form-group input,
.form-group textarea.xml-paste {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text-1, #374151);
  transition: all 0.2s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea.xml-paste:focus {
  outline: none;
  border-color: var(--vp-c-brand-1, #10B1EF);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft, rgba(16,177,239,0.1));
}

.form-group input:disabled,
.form-group textarea.xml-paste:disabled {
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

/* --- FILE UPLOAD & DRAG --- */
.file-upload-area {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  position: relative;
  min-height: 44px;
  transition: border 0.2s, background 0.2s;
}

.file-upload-area.drag-hover {
  border: 2px dashed var(--vp-c-brand, #13B0EE);
  background: var(--vp-c-brand-dimm, #e6f7ff);
}

.drag-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16,177,239,0.08);
  color: var(--vp-c-brand, #10B1EF);
  font-size: 1.08rem;
  font-weight: 600;
  border-radius: 6px;
  pointer-events: none;
  z-index: 2;
}

.file-upload-label {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  color: var(--vp-c-text-1, #374151);
  font-size: 0.95rem;
  white-space: nowrap;
  user-select: none;
  transition: background 0.2s;
}

.file-upload-label.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.file-name-row {
  display: flex;
  align-items: center;
  min-width: 0;
}

.file-name {
  flex: 1 1 0;
  min-width: 0;
  max-width: 220px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 600;
  color: var(--vp-c-text-1, #374151);
  padding-right: 1rem;
  transition: color 0.2s;
}

.file-name:hover {
  color: var(--vp-c-brand-1, #10B1EF);
}

.remove-file-btn {
  background: var(--vp-c-danger-1, #dc3545);
  color: #fff;
  border: none;
  padding: 0.32rem 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.87rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background 0.2s;
}

.remove-file-btn:hover:not(:disabled) {
  background: var(--vp-c-danger-2, #c82333);
}

.remove-file-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* --- CAPTCHA --- */
.captcha-section {
  background: var(--vp-c-bg, #fff);
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
  background: #fff !important;
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
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.2s;
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
  transition: all 0.2s;
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
  background: var(--vp-c-bg, #fff);
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

/* --- BUTTON --- */
.analyze-btn {
  background: var(--vp-c-brand-1, #10B1EF);
  color: #fff;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.analyze-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2, #0891d4);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.analyze-btn:disabled {
  background: var(--vp-c-bg-mute, #9ca3af);
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
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

/* --- ERROR SECTION --- */
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

/* --- RESULTS --- */
.result-section {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 12px;
  background: var(--vp-c-bg, #fff);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.result-section h3 {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-text-1, #1a202c);
  font-size: 1.5rem;
  font-weight: 700;
}

/* --- SUMMARY GRID --- */
.report-summary {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.summary-item .label {
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  font-weight: 500;
}

.summary-item .value {
  color: var(--vp-c-text-1, #374151);
  font-weight: 600;
  font-size: 1rem;
}

/* --- ALIGNMENT STATUS BOX --- */
.alignment-status-box {
  margin: 2rem 0 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.08rem;
  border-left: 6px solid #eee;
  display: flex;
  align-items: center;
  gap: 0.8em;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
}

.alignment-status-box.pass {
  color: #217b2d;
  border-left-color: #22bb33;
  background: #ebf7ed;
}

.alignment-status-box.fail {
  color: #b91c1c;
  border-left-color: #ea4335;
  background: #fbeaea;
}

/* --- SOURCES TABLE --- */
.sources-section {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
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
  color: #22bb33;
}

.table-row .result.fail {
  color: #ea4335;
}

/* --- WARNINGS & RECOMMENDATIONS --- */
.warnings-section,
.recommendations-section {
  padding: 1.25rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.warnings-section {
  background: var(--vp-warning-soft, #fffbf0);
  border-left: 4px solid var(--vp-c-warning-1, #ffc107);
}

.warnings-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-warning-1, #d69e2e);
  font-size: 1.25rem;
  font-weight: 600;
}

.warnings-section ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.warnings-section li {
  margin: 0.25rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.5;
}

.recommendations-section {
  background: var(--vp-tip-soft, #f0f9ff);
  border-left: 4px solid var(--vp-c-tip-1, #17a2b8);
}

.recommendations-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-tip-1, #17a2b8);
  font-size: 1.25rem;
  font-weight: 600;
}

.recommendations-section ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.recommendations-section li {
  margin: 0.25rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.5;
}

/* --- RESPONSIVE --- */
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
  
  .summary-grid {
    grid-template-columns: 1fr;
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
  
  .captcha-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .refresh-captcha-btn {
    align-self: center;
  }
  
  .file-name {
    max-width: 120px;
  }
}
</style>


