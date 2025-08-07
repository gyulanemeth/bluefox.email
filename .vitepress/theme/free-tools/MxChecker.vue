<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { checkMx } from '../../../connectors/bluefoxEmailToolsApi.js'
import { syncWithUrl, loadFromUrl } from './helpers/urlSync.js'
import { 
  loadCaptchaFromStorage, 
  loadNewCaptcha, 
  clearCaptchaStorage, 
  markCaptchaSolved 
} from './helpers/captchaHandler.js'

// ---- VARIABLES ----
const domain = ref('')
const captchaText = ref('')
const loading = ref(false)
const result = ref(null)
const errorMessage = ref('')

// Captcha state
const captchaProbe = ref(null)
const captchaImage = ref(null)
const captchaExpires = ref(0)
const captchaSolvedUntil = ref(0)
const captchaLoading = ref(false)

const now = () => Math.floor(Date.now() / 1000)

// Computed properties
const isProbeExpired = computed(() =>
  !captchaProbe.value || now() > captchaExpires.value
)

const isSolved = computed(() =>
  captchaSolvedUntil.value > now() && !isProbeExpired.value
)

const shouldShowCaptcha = computed(() =>
  !isSolved.value ||
  isProbeExpired.value ||
  !captchaProbe.value ||
  !captchaImage.value
)

const isFormDisabled = computed(() =>
  loading.value || (shouldShowCaptcha.value && !captchaText.value?.trim())
)

// ---- FUNCTIONS ----
function loadCaptchaState() {
  const stored = loadCaptchaFromStorage()
  captchaProbe.value = stored.probe
  captchaImage.value = stored.image
  captchaExpires.value = stored.expires
  captchaSolvedUntil.value = stored.solvedUntil
}

async function loadCaptcha() {
  captchaLoading.value = true
  try {
    const captchaState = await loadNewCaptcha()
    
    captchaProbe.value = captchaState.probe
    captchaImage.value = captchaState.image
    captchaExpires.value = captchaState.expires
    captchaSolvedUntil.value = captchaState.solvedUntil

  } catch (err) {
    clearCaptchaSession()
  } finally {
    captchaLoading.value = false
  }
}

async function refreshCaptcha() {
  clearCaptchaSession()
  await loadCaptcha()
}

function markSolved() {
  if (!isProbeExpired.value) {
    const captchaState = markCaptchaSolved(captchaExpires.value)
    captchaSolvedUntil.value = captchaState.solvedUntil
  }
}

function clearCaptchaSession() {
  const captchaState = clearCaptchaStorage()
  captchaProbe.value = captchaState.probe
  captchaImage.value = captchaState.image
  captchaExpires.value = captchaState.expires
  captchaSolvedUntil.value = captchaState.solvedUntil
}

function validateInputs() {
  if (!domain.value?.trim()) {
    errorMessage.value = 'Please enter a domain name'
    return false
  }

  if (shouldShowCaptcha.value && !captchaText.value?.trim()) {
    errorMessage.value = 'Please enter the captcha text'
    return false
  }

  return true
}

async function checkMxHandler() {
  result.value = null
  loading.value = true
  errorMessage.value = ''

  try {
    if (!validateInputs()) {
      loading.value = false
      return
    }

    const data = await checkMx({
      domain: domain.value,
      captchaProbe: captchaProbe.value,
      captchaText: shouldShowCaptcha.value ? captchaText.value : ''
    })

    result.value = {
      valid: true,
      domain: data.result.domain || domain.value,
      records: data.result.records || data.result.mxRecords || [],
      score: data.result.score,
      warnings: data.result.warnings || [],
      recommendations: data.result.recommendations || []
    }

    captchaText.value = ''
    markSolved()
  } catch (err) {
    errorMessage.value = err.message || 'Network error. Please try again.'
    if (err.status === 401) {
      await refreshCaptcha()
      captchaText.value = ''
    }
  } finally {
    loading.value = false
  }
}

function hasUniquePriorities(records) {
  if (!records?.length) return true
  return new Set(records.map(r => r.priority)).size === records.length
}

// ---- WATCHES ----
watch(isProbeExpired, (expired, prev) => {
  if (expired && !prev) {
    result.value = null
    captchaText.value = ''
  }
})

watch(shouldShowCaptcha, (show, prev) => {
  if (show && !prev) {
    captchaText.value = ''
  }
})

watch(domain, () => {
  syncWithUrl({ domain: domain.value })
})

// ---- LIFECYCLE ----
onMounted(async () => {
  loadCaptchaState()
  loadFromUrl({ domain })

  await nextTick()
  
  if (domain.value.trim()) {
    checkMxHandler()
  }

  if (!isSolved.value && (!captchaProbe.value || isProbeExpired.value)) {
    await loadCaptcha()
  }
})
</script>

<template>
  <div class="mx-checker">
    <div class="tool-form">
      <form @submit.prevent="checkMxHandler">
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

        <div v-if="captchaProbe && isProbeExpired" class="captcha-expired-message">
          Your verification has expired. Please refresh the captcha below.
        </div>

        <div v-if="shouldShowCaptcha" class="form-group">
          <label for="captcha">Security Verification:</label>
          <div class="captcha-container">
            <div class="captcha-image-container">
              <div v-if="captchaLoading" class="captcha-loading">Loading captcha...</div>
              <div v-else-if="captchaImage" class="captcha-image" v-html="captchaImage" />
              <div v-else class="captcha-placeholder">
                <button type="button" @click="loadCaptcha" class="load-captcha-btn">
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
          />
          <small class="captcha-help">
            Enter the characters shown in the image above
          </small>
        </div>

        <button type="submit" class="check-btn" :disabled="isFormDisabled">
          <span v-if="loading" class="btn-loading">
            <div class="loading-spinner"></div>
            Checking...
          </span>
          <span v-else>Check MX Records</span>
        </button>
      </form>
    </div>

    <!-- Error Display -->
    <div v-if="errorMessage" class="error-section">
      <p class="error-message">{{ errorMessage }}</p>
    </div>

    <!-- Results -->
    <div v-if="result" class="result-section">
      <h3>MX Records Check Results</h3>
      
      <div class="status-box">
        <p><strong>{{ result.valid ? 'MX Records Found' : 'No MX Records Found' }}</strong></p>
        <p v-if="result.valid"><strong>Total Records:</strong> {{ result.records.length }}</p>
        <p v-if="result.score">
          <strong>Security Score:</strong>
          {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">Assessment based on redundancy, priority configuration, and mail server setup quality.</span>
          </span>
        </p>
      </div>

      <div class="info-section">
        <h4>
          Basic Information
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">Essential details about the mail exchange configuration for this domain.</span>
          </span>
        </h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p>
          <strong>Records Found:</strong> {{ result.records.length }}
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">MX records tell email servers where to deliver mail for this domain. Multiple records provide redundancy.</span>
          </span>
        </p>
      </div>

      <div v-if="result.records.length" class="mx-records-section">
        <h4>
          MX Records
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">Mail exchange servers listed by priority. Lower priority numbers are preferred for mail delivery.</span>
          </span>
        </h4>
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

      <div v-if="result.valid" class="section analysis-section">
        <h4>
          Analysis
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">Quick assessment of your MX record configuration for reliability and best practices.</span>
          </span>
        </h4>
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
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-1, #374151);
}

.form-group input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(19, 176, 238, 0.1);
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
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.load-captcha-btn:hover {
  background: var(--vp-c-brand-light);
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
  border-color: var(--vp-c-brand);
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
  background: var(--vp-c-brand);
  color: #ffffff;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  width: 100%;
  box-shadow: 0 2px 4px rgba(19, 176, 238, 0.2);
}

.check-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-light);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(19, 176, 238, 0.25);
}

.check-btn:active:not(:disabled) {
  background: var(--vp-c-brand-dark);
  transform: translateY(0);
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
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-top: 1.5px solid #ffffff;
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

/* Info tip styles */
.info-tip {
  display: inline-block;
  margin-left: .3rem;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: .675rem;
  cursor: help;
  position: relative;
  vertical-align: middle;
}

.info-tip-pop {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: calc(100% + 8px);
  transform: translateX(-50%);
  width: max-content;
  max-width: min(300px, 90vw);
  padding: .8rem 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
  color: var(--vp-c-text-1, #374151);
  font-size: .825rem;
  line-height: 1.5;
  z-index: 1000;
  transition: opacity .2s ease, transform .2s ease;
  transform: translateX(-50%) translateY(-4px);
  word-wrap: break-word;
  hyphens: auto;
}

.info-tip-pop::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  border-bottom: none;
  border-right: none;
  transform: translateX(-50%) rotate(45deg);
}

.info-tip:hover .info-tip-pop,
.info-tip:focus .info-tip-pop {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.info-tip:nth-last-child(-n+2) .info-tip-pop,
.info-tip:last-child .info-tip-pop {
  left: auto;
  right: 0;
  transform: translateX(0);
}

.info-tip:nth-last-child(-n+2) .info-tip-pop::before,
.info-tip:last-child .info-tip-pop::before {
  left: auto;
  right: 1rem;
  transform: translateX(0) rotate(45deg);
}

.info-tip:hover:nth-last-child(-n+2) .info-tip-pop,
.info-tip:focus:nth-last-child(-n+2) .info-tip-pop,
.info-tip:hover:last-child .info-tip-pop,
.info-tip:focus:last-child .info-tip-pop {
  transform: translateX(0) translateY(0);
}

/* MX Records Section */
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
  background: var(--vp-c-brand);
  color: white;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(19, 176, 238, 0.3);
  border: 1px solid rgba(19, 176, 238, 0.2);
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
  color: var(--vp-c-text-1, #2d3748);
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
  color: var(--vp-c-brand);
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

.analysis-section {
  background: var(--vp-tip-soft, #f0f9ff);
  border-left: 4px solid var(--vp-c-tip-1, #17a2b8);
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
    background: var(--vp-c-bg-soft);
    border-color: var(--vp-c-border);
    color: var(--vp-c-text-1);
  }
  
  .refresh-captcha-btn:hover:not(:disabled) {
    border-color: var(--vp-c-brand);
  }
  
  .mx-records-container {
    background: var(--vp-c-bg, #17181c);
    border-color: #282a36;
  }
  
  .mx-record-item {
    border-color: #282a36;
  }
  
  .server-name {
    color: var(--vp-c-brand-light);
  }
  
  .priority-badge {
    background: var(--vp-c-brand) !important;
    box-shadow: 0 2px 8px rgba(19, 176, 238, 0.3) !important;
    border: 1px solid rgba(19, 176, 238, 0.2) !important;
  }
  
  .mx-summary-stats {
    background: #252736;
    border-color: #282a36;
  }
  
  .stat-card::after {
    background: #282a36;
  }
  
  .recommendations-section,
  .recommendations-section ul,
  .recommendations-section li {
    color: #2d3748 !important;
  }
  
  .info-tip-pop {
    background: var(--vp-c-bg-soft, #252736);
    border-color: var(--vp-c-border, #404040);
    box-shadow: 0 8px 24px rgba(0,0,0,.3);
  }
  
  .info-tip-pop::before {
    background: var(--vp-c-bg-soft, #252736);
    border-color: var(--vp-c-border, #404040);
  }
}

@media (max-width: 480px) {
  .info-tip-pop {
    position: fixed;
    left: 10px !important;
    right: 10px !important;
    top: auto !important;
    bottom: 20px;
    transform: none !important;
    width: auto !important;
    max-width: none !important;
    z-index: 9999;
  }
  
  .info-tip-pop::before {
    display: none;
  }
  
  .info-tip:hover .info-tip-pop,
  .info-tip:focus .info-tip-pop {
    transform: none !important;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .mx-checker {
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

@media (hover: none) and (pointer: coarse) {
  .info-tip {
    width: 1.25rem;
    height: 1.25rem;
    line-height: 1.25rem;
  }
  
  .info-tip-pop {
    padding: 1rem 1.25rem;
    font-size: .875rem;
  }
}
</style>

