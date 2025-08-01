<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCaptcha } from './useCaptcha.js'

// Constants
const API_URL = import.meta.env.VITE_TOOLS_API_URL
if (!API_URL) throw new Error('VITE_TOOLS_API_URL not set')

const MAX_FILENAME_LEN = 30

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
} = useCaptcha('dmarc-report-analyzer')

// Local state
const xmlPaste = ref('')
const file = ref(null)
const fileName = ref('')
const captchaText = ref('')
const loading = ref(false)
const result = ref(null)

// Drag and drop state
const isDragging = ref(false)
let dragLeaveTimeout = null

// Computed
const isFormDisabled = computed(() => 
  loading.value || (!xmlPaste.value.trim() && !file.value) || (shouldShowCaptcha.value && (!captchaText.value || isProbeExpired.value))
)

const truncatedFileName = computed(() => {
  if (!fileName.value) return ''
  if (fileName.value.length <= MAX_FILENAME_LEN) return fileName.value
  return `${fileName.value.slice(0, 15)}...${fileName.value.slice(-10)}`
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
  if (!xmlPaste.value.trim() && !file.value) {
    setError('MISSING_TEXT', 'Please paste your DMARC XML or upload an XML file to analyze.')
    return false
  }
  
  // ADDED: Check if captcha probe exists when needed
  if (shouldShowCaptcha.value && !captchaProbe.value) {
    setError('MISSING_PROBE', 'Please load the captcha first.')
    return false
  }
  
  return shouldShowCaptcha.value ? validateCaptchaInput(captchaText.value) : true
}

async function handleCaptchaExpiry() {
  console.log('CAPTCHA expired detected - refreshing')
  await refreshCaptcha('expired')
  loading.value = false
}

// Drag and drop handlers
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

// File handling
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

// Format helpers
function formatDateRange(dateRange) {
  if (!dateRange) return 'Unknown'
  if (dateRange.start && dateRange.end) {
    return `${new Date(dateRange.start * 1000).toLocaleString()} — ${new Date(dateRange.end * 1000).toLocaleString()}`
  }
  return typeof dateRange === 'string' ? dateRange : 'Unknown'
}

async function analyzeReport() {
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

    // Debug captcha values
    console.log('Debug - Captcha values:', {
      captchaProbe: captchaProbe.value,
      captchaText: captchaText.value,
      shouldShowCaptcha: shouldShowCaptcha.value
    })

    let response, data
    
    if (file.value) {
      // File upload using FormData
      const formData = new FormData()
      formData.append('file', file.value)
      formData.append('captchaText', captchaText.value || '') // FIXED: Always send
      formData.append('captchaProbe', captchaProbe.value || '') // FIXED: Always send
      
      // Debug FormData
      for (let [key, value] of formData.entries()) {
        console.log(`FormData ${key}:`, value)
      }
      
      response = await fetch(`${API_URL}/v1/analyze-dmarc-report`, {
        method: 'POST',
        body: formData
      })
    } else {
      const requestBody = {
        xmlContent: xmlPaste.value,
        captchaText: captchaText.value || '', 
        captchaProbe: captchaProbe.value || ''
      }
      
      console.log('Request body:', requestBody)
      
      response = await fetch(`${API_URL}/v1/analyze-dmarc-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })
    }
    
    data = await response.json()
    if (!response.ok) {
      const errorType = handleServerError(data)
      
      if (errorType === 'expired' || errorType === 'incorrect') {
        await autoResolveError()
      }
      return
    }

    result.value = {
      ...data.result,
      valid: true
    }
    
    captchaText.value = ''
    markSolved()
    clearFile()

  } catch (error) {
    console.error('DMARC Report Analysis Error:', error)
    setError('NETWORK_ERROR', 'Network connection failed. Please try again.')
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
    <div class="tool-form">
      <form @submit.prevent="analyzeReport">
        <!-- Form fields container with drag overlay -->
        <div 
          class="form-fields-container"
          :class="{ 'drag-hover': isDragging }"
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
          @drop="handleDrop"
        >
          <!-- Drag overlay covers only form fields area -->
          <div v-if="isDragging" class="drag-overlay-fields">
            <div class="drag-content">
              <div class="drag-icon">📁</div>
              <span class="drag-text">Drop XML file here</span>
              <small class="drag-subtext">Release to upload</small>
            </div>
          </div>

          <!-- XML Paste Input -->
          <div class="form-group">
            <label for="xmlPaste">Paste DMARC Report XML:</label>
            <textarea
              id="xmlPaste"
              v-model="xmlPaste"
              rows="8"
              placeholder="Paste your DMARC XML here..."
              :disabled="!!file || loading"
              autocomplete="off"
              autocorrect="off"
            />
          </div>

          <!-- File Upload / Drag & Drop -->
          <div class="form-group">
            <label>Or Upload XML File:</label>
            <div class="file-upload-area">
              <input
                type="file"
                accept=".xml"
                @change="handleFileChange"
                :disabled="!!xmlPaste || loading"
                style="display: none;"
                id="fileInput"
              />
              <template v-if="!fileName">
                <label
                  for="fileInput"
                  class="file-upload-label"
                  :class="{ disabled: !!xmlPaste || loading }"
                >
                  Click to select XML file or drag anywhere in this area
                </label>
              </template>
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
            </div>
          </div>
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
            Analyzing...
          </span>
          <span v-else>Analyze Report</span>
        </button>
      </form>
    </div>

    <!-- Error Display -->
    <div v-if="hasError" class="error-section">
      <p class="error-message">{{ currentError.message }}</p>
    </div>

    <!-- Results Section -->
    <div v-if="result" class="result-section">
      <h3>DMARC Report Analysis</h3>

      <!-- Summary -->
      <div class="info-section">
        <h4>Report Summary</h4>
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
            <span class="value monospace" :title="result.reportId || 'Unknown'">
              {{ result.reportId || 'Unknown' }}
            </span>
          </div>
          <div class="summary-item">
            <span class="label">Messages:</span>
            <span class="value">{{ result.totalMessages }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Pass Rate:</span>
            <span class="value">{{ result.passRate }}%</span>
          </div>
          <div class="summary-item">
            <span class="label">Date Range:</span>
            <span class="value">{{ formatDateRange(result.dateRange) }}</span>
          </div>
          <div v-if="result.score" class="summary-item">
            <span class="label">Score:</span>
            <span class="value">
              {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})
            </span>
          </div>
        </div>
      </div>

      <!-- Policy Information -->
      <div v-if="result.policy" class="policy-section">
        <h4>DMARC Policy</h4>
        <div class="policy-grid">
          <div class="policy-item">
            <span class="label">DMARC Policy:</span>
            <span class="value">{{ result.policy.dmarc }}</span>
          </div>
          <div class="policy-item">
            <span class="label">SPF Alignment:</span>
            <span class="value">{{ result.policy.spfAlignment }}</span>
          </div>
          <div class="policy-item">
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
      <div v-if="result.sources?.length" class="sources-section">
        <h4>Email Sources</h4>
        <div class="sources-table">
          <div class="table-header">
            <span>IP Address</span>
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
/* Base Layout */
.dmarc-analyzer {
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

/* Form Fields Container - Only this area handles drag */
.form-fields-container {
  position: relative;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;
}

.form-fields-container.drag-hover {
  background: rgba(16, 177, 239, 0.02);
  border-radius: 8px;
}

/* Subtle Fields-Only Drag Overlay */
.drag-overlay-fields {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 177, 239, 0.08);
  backdrop-filter: blur(4px);
  z-index: 100;
  pointer-events: none;
  border-radius: 8px;
  border: 2px dashed rgba(16, 177, 239, 0.3);
  animation: fadeInSubtle 0.2s ease-out;
}

.drag-content {
  text-align: center;
  color: var(--vp-c-brand-1, #10B1EF);
  padding: 1.5rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(16, 177, 239, 0.2);
  box-shadow: 0 4px 16px rgba(16, 177, 239, 0.1);
  animation: pulse-subtle 2s ease-in-out infinite;
}

.drag-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
  opacity: 0.8;
}

.drag-text {
  font-size: 1.1rem;
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
  color: var(--vp-c-brand-1, #10B1EF);
}

.drag-subtext {
  font-size: 0.875rem;
  opacity: 0.7;
  font-weight: 500;
  color: var(--vp-c-text-2, #6b7280);
}

/* Subtle Animations */
@keyframes fadeInSubtle {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse-subtle {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.95;
  }
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
.form-group textarea {
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

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1, #10B1EF);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft, rgba(16, 177, 239, 0.1));
}

.form-group input:disabled,
.form-group textarea:disabled {
  background: var(--vp-c-bg-mute, #f1f5f9);
  opacity: 0.6;
  cursor: not-allowed;
}

/* File Upload Area */
.file-upload-area {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  min-height: 44px;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.file-upload-label {
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: var(--vp-c-bg, #ffffff);
  border: 2px dashed var(--vp-c-border, #e5e7eb);
  color: var(--vp-c-text-1, #374151);
  font-size: 0.95rem;
  text-align: center;
  user-select: none;
  transition: all 0.2s ease;
  flex: 1;
  font-weight: 500;
}

.file-upload-label:hover:not(.disabled) {
  border-color: var(--vp-c-brand-1, #10B1EF);
  background: var(--vp-c-brand-soft, rgba(16, 177, 239, 0.05));
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.file-upload-label.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.file-name-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
  flex: 1;
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg, #ffffff);
  border: 2px solid var(--vp-c-brand-1, #10B1EF);
  border-radius: 8px;
}

.file-name {
  flex: 1;
  min-width: 0;
  font-weight: 600;
  color: var(--vp-c-brand-1, #10B1EF);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.remove-file-btn {
  background: var(--vp-c-danger-1, #dc3545);
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.remove-file-btn:hover:not(:disabled) {
  background: var(--vp-c-danger-2, #c82333);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
}

.remove-file-btn:disabled {
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

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 6px;
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
  min-width: 0;
  overflow: hidden;
}

.summary-item .label {
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  font-weight: 500;
  flex-shrink: 0;
}

.summary-item .value {
  color: var(--vp-c-text-1, #374151);
  font-weight: 600;
  font-size: 1rem;
  word-break: break-all;
  overflow-wrap: break-word;
  line-height: 1.4;
  min-width: 0;
}

.summary-item .value.monospace {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  letter-spacing: -0.25px;
}

/* Policy Section */
.policy-section {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.policy-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
}

.policy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.policy-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 6px;
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
}

.policy-item .label {
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  font-weight: 500;
}

.policy-item .value {
  color: var(--vp-c-text-1, #374151);
  font-weight: 600;
  font-size: 1rem;
}

/* Alignment Status */
.alignment-status-box {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.08rem;
  border-left: 6px solid #eee;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
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

/* Sources Table */
.sources-section {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.sources-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
}

.sources-table {
  overflow-x: auto;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 0.75rem 1rem;
  align-items: center;
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
}

.table-header {
  background: var(--vp-c-bg-soft, #f8f9fa);
  font-weight: 600;
  color: var(--vp-c-text-1, #374151);
  font-size: 0.875rem;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: var(--vp-c-bg-soft, #f8f9fa);
}

.table-row .ip {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.875rem;
  color: var(--vp-c-text-1, #374151);
}

.table-row .count {
  font-weight: 600;
  color: var(--vp-c-text-1, #374151);
}

.table-row .result.pass {
  color: #22bb33;
  font-weight: 600;
}

.table-row .result.fail {
  color: #ea4335;
  font-weight: 600;
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
  .form-fields-container.drag-hover {
    background: rgba(16, 177, 239, 0.03);
  }
  
  .drag-overlay-fields {
    background: rgba(16, 177, 239, 0.12);
    border-color: rgba(16, 177, 239, 0.4);
  }
  
  .drag-content {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(16, 177, 239, 0.3);
  }
  
  .refresh-captcha-btn {
    background: #fff;
    border-color: #333;
    color: #222;
  }
  
  .recommendations-section,
  .recommendations-section ul,
  .recommendations-section li {
    color: #2d3748 !important;
  }
  .warnings-section,
  .warnings-section ul,
  .warnings-section li {
    color: #2d3748 !important;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .dmarc-analyzer {
    padding: 0 0.5rem;
  }
  
  .tool-form {
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .drag-content {
    padding: 1rem;
  }
  
  .drag-icon {
    font-size: 1.75rem;
  }
  
  .drag-text {
    font-size: 1rem;
  }
  
  .drag-subtext {
    font-size: 0.8rem;
  }
  
  .captcha-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .refresh-captcha-btn {
    align-self: center;
  }
  
  .summary-grid,
  .policy-grid {
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
    border-bottom: 1px solid var(--vp-c-border-soft, #eee);
    gap: 0.5rem;
  }
  
  .file-name-row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
}
</style>
