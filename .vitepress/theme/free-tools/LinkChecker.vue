<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { checkLinks } from '../../../connectors/bluefoxEmailToolsApi.js'
import {
  loadCaptchaFromStorage,
  loadNewCaptcha,
  clearCaptchaStorage,
  markCaptchaSolved
} from './helpers/captchaHandler.js'

const mode = ref('urls')
const rawUrls = ref('')
const htmlTemplate = ref('')
const timeout = ref(10000)
const includeProxy = ref(true)
const captchaText = ref('')
const loading = ref(false)
const result = ref(null)
const errorMessage = ref('')
const extractedLinks = ref([])

const selectedResult = ref(null)
const selectedIndex = ref(0)

const captchaProbe = ref(null)
const captchaImage = ref(null)
const captchaExpires = ref(0)
const captchaSolvedUntil = ref(0)
const captchaLoading = ref(false)
const loadingStates = ref({})
const reloadKeys = ref({})

const now = () => Math.floor(Date.now() / 1000)
const isProbeExpired = computed(() => !captchaProbe.value || now() > captchaExpires.value)
const isSolved = computed(() => captchaSolvedUntil.value > now() && !isProbeExpired.value)
const shouldShowCaptcha = computed(() =>
  !isSolved.value || isProbeExpired.value || !captchaProbe.value || !captchaImage.value
)
const isFormDisabled = computed(() =>
  loading.value || (shouldShowCaptcha.value && !captchaText.value?.trim())
)

watch(result, (newResult) => {
  if (newResult && newResult.length > 0) {
    selectedIndex.value = 0
    selectedResult.value = newResult[0]
  }
})

function extractLinksFromText(text) {
  if (!text || typeof text !== 'string') return []
  const urlRegex = /\bhttps?:\/\/[^\s)<>"']+/gi
  const matches = text.match(urlRegex) || []
  const unique = [...new Set(matches.map(url => url.trim()))]
  return unique.map(url => ({ href: url, text: url }))
}

function extractLinksFromHTML(html) {
  if (!html || typeof html !== 'string') return []
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const anchors = Array.from(doc.querySelectorAll('a[href]'))
    return anchors
      .map(a => ({
        href: a.getAttribute('href'),
        text: a.textContent?.trim() || 'No anchor text'
      }))
      .filter(link =>
        link.href &&
        link.href.trim().length > 0 &&
        !link.href.startsWith('#') &&
        !link.href.startsWith('mailto:')
      )
      .map(link => ({ ...link, href: link.href.trim() }))
  } catch { return [] }
}

function updateExtractedLinks() {
  extractedLinks.value = mode.value === 'html'
    ? extractLinksFromHTML(htmlTemplate.value)
    : extractLinksFromText(rawUrls.value)
}

function getStatusText(status) {
  const map = {
    working: 'Working', broken: 'Broken', redirect: 'Redirect',
    error: 'Error', soft404: 'Soft 404'
  }
  return map[status] || 'Unknown'
}

function selectResult(resultItem, index) {
  selectedResult.value = resultItem
  selectedIndex.value = index
}

function getCodeSnippetForLink(url) {
  if (mode.value !== 'html' || !htmlTemplate.value) return ''
  const lines = htmlTemplate.value.split('\n')
  const lineIndex = lines.findIndex(line => line.includes(url))
  if (lineIndex === -1) return ''
  const start = Math.max(0, lineIndex - 2)
  const end = Math.min(lines.length, lineIndex + 3)
  const contextLines = lines.slice(start, end)
  return contextLines.map((line, idx) => {
    const actualLineNum = start + idx + 1
    const isTargetLine = (start + idx) === lineIndex
    const escapedLine = line.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    if (isTargetLine) {
      return `<span class="line-number">${actualLineNum}:</span> <mark class="highlight-line">${escapedLine}</mark>`
    } else {
      return `<span class="line-number">${actualLineNum}:</span> ${escapedLine}`
    }
  }).join('\n')
}

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
  } catch { clearCaptchaSession() }
  finally { captchaLoading.value = false }
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
  if (mode.value === 'html') {
    if (!htmlTemplate.value?.trim()) {
      errorMessage.value = 'Please paste your HTML email template'
      return false
    }
  } else {
    if (!rawUrls.value?.trim()) {
      errorMessage.value = 'Please enter at least one URL'
      return false
    }
  }
  if (extractedLinks.value.length === 0) {
    errorMessage.value = 'No valid links found in your input'
    return false
  }
  if (shouldShowCaptcha.value && !captchaText.value?.trim()) {
    errorMessage.value = 'Please enter the captcha text'
    return false
  }
  return true
}

async function reloadSelectedResult() {
  if (!selectedResult.value || isProbeExpired.value) return
  
  loadingStates.value = { ...loadingStates.value, [selectedIndex.value]: true }
  
  try {
    const data = await checkLinks({
      urls: [selectedResult.value.url],
      timeout: timeout.value,
      includeProxy: includeProxy.value,
      captchaProbe: captchaProbe.value,
      captchaText: ''
    })
    
    if (data.result && data.result.length > 0 && result.value) {
      const updatedResult = data.result[0]
      const resultIndex = result.value.findIndex(r => r.url === selectedResult.value.url)
      if (resultIndex !== -1) {
        result.value[resultIndex] = updatedResult
        selectedResult.value = updatedResult
        reloadKeys.value = {
          ...reloadKeys.value,
          [selectedIndex.value]: (reloadKeys.value[selectedIndex.value] || 0) + 1
        }
      }
    }
  } catch (err) {
    errorMessage.value = `Failed to reload: ${err.message}`
    setTimeout(() => {
      if (errorMessage.value.includes('Failed to reload')) {
        errorMessage.value = ''
      }
    }, 5000)
  } finally {
    loadingStates.value = { ...loadingStates.value, [selectedIndex.value]: false }
  }
}

async function checkLinksHandler() {
  result.value = null
  loading.value = true
  errorMessage.value = ''
  
  try {
    if (!validateInputs()) {
      loading.value = false
      return
    }
    
    const urlsToCheck = extractedLinks.value.map(link => link.href)
    const data = await checkLinks({
      urls: urlsToCheck,
      timeout: timeout.value,
      includeProxy: includeProxy.value,
      captchaProbe: captchaProbe.value,
      captchaText: shouldShowCaptcha.value ? captchaText.value : ''
    })
    
    result.value = data.result
    captchaText.value = ''
    markSolved()

    await nextTick()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    
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

function resetToForm() {
  result.value = null
  selectedResult.value = null
  selectedIndex.value = 0
}

watch([mode, rawUrls, htmlTemplate], updateExtractedLinks, { immediate: true })
watch(mode, () => { result.value = null })
watch(isProbeExpired, (expired, prev) => {
  if (expired && !prev) {
    result.value = null
    captchaText.value = ''
  }
})
watch(shouldShowCaptcha, (show, prev) => {
  if (show && !prev) captchaText.value = ''
})

onMounted(async () => {
  loadCaptchaState()
  await nextTick()
  if (!isSolved.value && (!captchaProbe.value || isProbeExpired.value)) {
    await loadCaptcha()
  }
})
</script>

<template>
  <div class="link-checker">
    <div v-if="!result" class="form-stage">
      <div class="mode-tabs">
        <button 
          :class="['tab', { active: mode === 'urls' }]"
          @click="mode = 'urls'"
        >
          Paste URLs
        </button>
        <button 
          :class="['tab', { active: mode === 'html' }]"
          @click="mode = 'html'"
        >
          HTML Template
        </button>
      </div>

      <div class="tool-form">
        <form @submit.prevent="checkLinksHandler">
          <div v-if="mode === 'urls'" class="form-group">
            <label for="rawUrlsInput">URLs to Check:</label>
            <textarea
              id="rawUrlsInput"
              v-model="rawUrls"
              rows="6"
              placeholder="https://example.com&#10;https://google.com&#10;https://github.com"
              :disabled="loading"
              required
            ></textarea>
            <small class="form-help">
              Paste or type URLs here, one per line or comma separated. Markdown links and raw URLs are supported.
            </small>
          </div>

          <div v-else class="form-group">
            <label for="htmlTemplate">HTML Email Template:</label>
            <textarea
              id="htmlTemplate"
              v-model="htmlTemplate"
              rows="12"
              placeholder="Paste your HTML email template here...

Example:
<html>
<body>
  <a href='https://example.com'>Visit Example</a>
  <a href='https://google.com'>Google</a>
</body>
</html>"
              :disabled="loading"
              required
            ></textarea>
            <small class="form-help">
              Paste your HTML email template here. All hyperlinks will be automatically extracted and checked.
            </small>
          </div>

          <div v-if="mode === 'html' && htmlTemplate.trim()" class="form-group">
            <label>HTML Template Preview:</label>
            <iframe
              :srcdoc="htmlTemplate"
              class="html-template-preview"
              sandbox="allow-scripts allow-same-origin"
              title="HTML Template Live Preview"
            ></iframe>
            <small class="form-help">
              Live preview of your HTML template as it would appear in an email client.
            </small>
          </div>

          <div v-if="extractedLinks.length > 0" class="form-group">
            <label>Extracted Links ({{ extractedLinks.length }}):</label>
            <div class="extracted-links">
              <div 
                v-for="(link, index) in extractedLinks" 
                :key="index"
                class="extracted-link"
              >
                <div class="link-info">
                  <span class="link-url">{{ link.href }}</span>
                  <span v-if="mode === 'html'" class="link-text">{{ link.text }}</span>
                </div>
              </div>
            </div>
            <small class="form-help">
              These links will be checked when you submit the form.
            </small>
          </div>

          <div v-else-if="(mode === 'urls' ? rawUrls.trim() : htmlTemplate.trim())" class="form-group">
            <div class="no-links-warning">
              <p>Warning: No valid links found in your {{ mode === 'urls' ? 'URL list' : 'HTML template' }}.</p>
              <small v-if="mode === 'html'">Make sure your HTML contains &lt;a href="..."&gt; tags with valid URLs.</small>
              <small v-else>Make sure your text contains valid URLs starting with http:// or https://</small>
            </div>
          </div>

          <div class="form-group">
            <div class="form-options">
              <div class="option-group">
                <label for="timeout">Timeout (ms):</label>
                <input
                  id="timeout"
                  v-model="timeout"
                  type="number"
                  min="1000"
                  max="30000"
                  :disabled="loading"
                />
              </div>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="includeProxy"
                    :disabled="loading"
                  > 
                  Include page preview content
                  <span class="info-tip" tabindex="0">
                    ?
                    <span class="info-tip-pop">Enable this to fetch webpage content for iframe preview. May increase processing time.</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div v-if="captchaProbe && isProbeExpired" class="captcha-expired-message">
            Your verification has expired. Please refresh the captcha below.
          </div>

          <div v-if="shouldShowCaptcha" class="form-group">
            <label for="captcha">Security Verification:</label>
            <div class="captcha-container">
              <div class="captcha-image-container">
                <div v-if="captchaLoading" class="captcha-loading">
                  Loading captcha...
                </div>
                <div v-else-if="captchaImage" class="captcha-image" v-html="captchaImage"></div>
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

          <button
            type="submit"
            class="check-btn"
            :disabled="isFormDisabled || extractedLinks.length === 0"
          >
            <span v-if="loading" class="btn-loading">
              <div class="loading-spinner"></div>
              Checking {{ extractedLinks.length }} Links...
            </span>
            <span v-else>Check {{ extractedLinks.length }} Links</span>
          </button>
        </form>
      </div>

      <div v-if="errorMessage" class="error-section">
        <p class="error-message">{{ errorMessage }}</p>
      </div>
    </div>

    <div v-else class="results-stage">
      <div class="results-header">
        <h2>Link Check Results</h2>
        <button @click="resetToForm" class="back-btn">
          ← Back to Form
        </button>
      </div>

      <div class="split-view">
        <div class="results-panel">
          <div class="results-summary">
            <div class="summary-item">
              <span class="count">{{ result.length }}</span>
              <span class="label">Total</span>
            </div>
            <div class="summary-item working">
              <span class="count">{{ result.filter(r => r.status === 'working').length }}</span>
              <span class="label">Working</span>
            </div>
            <div class="summary-item broken">
              <span class="count">{{ result.filter(r => r.status === 'broken').length }}</span>
              <span class="label">Broken</span>
            </div>
            <div class="summary-item error">
              <span class="count">{{ result.filter(r => r.status === 'error').length }}</span>
              <span class="label">Errors</span>
            </div>
          </div>

          <div class="results-list">
            <div
              v-for="(linkResult, index) in result"
              :key="index"
              @click="selectResult(linkResult, index)"
              :class="['result-item', linkResult.status, { selected: selectedIndex === index }]"
            >
              <div class="result-status">
                <span class="status-dot" :class="linkResult.status"></span>
                <span class="status-text">{{ getStatusText(linkResult.status) }}</span>
              </div>
              <div class="result-url">{{ linkResult.url }}</div>
              <div class="result-meta">
                <span v-if="linkResult.statusCode" class="status-code">{{ linkResult.statusCode }}</span>
                <span class="response-time">{{ linkResult.responseTime }}ms</span>
              </div>
            </div>
          </div>
        </div>

        <div class="details-panel">
          <div v-if="selectedResult" class="details-content">
            <div class="details-header">
              <h3>Link Details</h3>
              <button
                @click="reloadSelectedResult"
                :disabled="loadingStates[selectedIndex]"
                class="reload-btn"
                title="Reload this link"
              >
                <img 
                  v-if="!loadingStates[selectedIndex]" 
                  src="/assets/reload.webp?url" 
                  alt="reload"
                />
                <div v-else class="spinner"></div>
                {{ loadingStates[selectedIndex] ? 'Reloading...' : 'Reload' }}
              </button>
            </div>

            <a 
              :href="selectedResult.url" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="detail-url"
            >
              {{ selectedResult.url }}
            </a>
            
            <div class="detail-status" :class="selectedResult.status">
              <span class="status-dot" :class="selectedResult.status"></span>
              <span class="status-text">{{ getStatusText(selectedResult.status) }}</span>
              <span v-if="selectedResult.statusCode" class="detail-status-code">
                {{ selectedResult.statusCode }}
              </span>
              <span class="response-time">{{ selectedResult.responseTime }}ms</span>
            </div>

            <div v-if="selectedResult.error" class="detail-error">
              <strong>Error:</strong> {{ selectedResult.error }}
            </div>

            <div v-if="selectedResult.finalUrl && selectedResult.finalUrl !== selectedResult.url" class="detail-redirect">
              <strong>Redirects to:</strong> {{ selectedResult.finalUrl }}
            </div>

            <div v-if="mode === 'html' && (selectedResult.status === 'broken' || selectedResult.status === 'error')" class="code-location">
              <h4>Code Location:</h4>
              <pre class="code-snippet" v-html="getCodeSnippetForLink(selectedResult.url)"></pre>
            </div>

            <div v-if="selectedResult.pageContent && includeProxy && selectedResult.status === 'working'" class="preview-section">
              <h4>Page Preview:</h4>
              <iframe
                :key="`detail-${selectedIndex}-${reloadKeys[selectedIndex] || 0}`"
                :srcdoc="selectedResult.pageContent"
                class="detail-preview"
                sandbox="allow-scripts allow-same-origin"
                title="Page Content Preview"
              ></iframe>
            </div>

            <div v-if="selectedResult.status === 'soft404'" class="soft404-info">
              <h4>Soft 404 Detected</h4>
              <p>This page returns the homepage content instead of the requested page. The server responds with HTTP 200 but shows generic content, indicating the page doesn't exist.</p>
            </div>
          </div>

          <div v-else class="no-selection">
            <h3>Select a Link</h3>
            <p>Click on any link from the left panel to view its details here.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-stage {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

.results-stage {
  width: 85vw !important;
  margin: 2rem !important;
  padding: 0 2rem !important;
  position: static !important;
  left: auto !important;
  right: auto !important;
  margin-left: -15vw !important;
}

.link-checker {
  width: 100%;
}

.mode-tabs {
  display: flex;
  background: var(--vp-c-bg-soft, #f1f5f9);
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 1.5rem;
  width: fit-content;
}

.tab {
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2, #64748b);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.tab.active {
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-1, #1e293b);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tab:hover:not(.active) {
  color: var(--vp-c-text-1, #1e293b);
}

.tool-form {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 12px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  padding: 1.5rem;
  margin-bottom: 2rem;
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

.form-group textarea {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  resize: vertical;
  line-height: 1.4;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(19, 176, 238, 0.1);
}

.form-group input:disabled,
.form-group textarea:disabled {
  background: var(--vp-c-bg-mute, #f1f5f9);
  opacity: 0.6;
  cursor: not-allowed;
}

.form-help {
  display: block;
  margin-top: 0.5rem;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  font-style: italic;
  line-height: 1.4;
}

.html-template-preview {
  width: 100%;
  height: 300px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  background: white;
  margin-bottom: 0.5rem;
}

.extracted-links {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  border-radius: 6px;
  background: var(--vp-c-bg, #ffffff);
}

.extracted-link {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #f1f5f9);
}

.extracted-link:last-child {
  border-bottom: none;
}

.link-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.link-url {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  color: var(--vp-c-brand);
  word-break: break-all;
}

.link-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2, #6b7280);
  font-style: italic;
}

.no-links-warning {
  background: #fff3cd;
  border: 1px solid #ffc107;
  color: #856404;
  padding: 1rem;
  border-radius: 6px;
}

.no-links-warning p {
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.no-links-warning small {
  font-size: 0.875rem;
}

.form-options {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.option-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.option-group label {
  margin-bottom: 0;
  white-space: nowrap;
}

.option-group input {
  width: 100px;
  margin-bottom: 0;
}

.checkbox-group {
  flex: 1;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}

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
  to { transform: rotate(360deg); }
}

.error-section {
  background: var(--vp-danger-soft, #f8d7da);
  color: var(--vp-c-danger-1, #721c24);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid var(--vp-c-danger-2, #f5c6cb);
}

.error-message {
  margin: 0;
  font-weight: 500;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.results-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #333);
}

.back-btn {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border, #ddd);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  color: var(--vp-c-text-1, #333);
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: var(--vp-c-bg, #fff);
  border-color: var(--vp-c-brand);
}

.split-view {
  display: flex;
  height: 750px;
  background: var(--vp-c-bg, #fff);
  border-radius: 12px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  max-width: 1900px;
  margin: 0 auto;
}

.results-panel {
  width: 450px;
  min-width: 400px;
  border-right: 1px solid var(--vp-c-border-soft, #eee);
  background: var(--vp-c-bg-alt, #fafafa);
  display: flex;
  flex-direction: column;
}

.details-panel {
  flex: 1;
  background: var(--vp-c-bg, #fff);
  overflow-y: auto;
}

.results-summary {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
  background: var(--vp-c-bg, #fff);
}

.summary-item {
  text-align: center;
  padding: 0.6rem 0.5rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border-soft, #eee);
  flex: 1;
  font-size: 0.85rem;
}

.summary-item.working { border-left: 3px solid #28a745; }
.summary-item.broken { border-left: 3px solid #dc3545; }
.summary-item.error { border-left: 3px solid #dc3545; }

.summary-item .count {
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.summary-item .label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2, #666);
}

.results-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.result-item {
  padding: 0.875rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 0.5px solid gray;
}

.result-item:hover {
  background: var(--vp-c-bg, #fff);
  border-color: var(--vp-c-border, #e5e7eb);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.result-item.selected {
  background: var(--vp-c-bg, #fff);
  border-color: var(--vp-c-brand, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.result-item.working { border-left: 4px solid #28a745; }
.result-item.broken { border-left: 4px solid #dc3545; }
.result-item.error { border-left: 4px solid #dc3545; }
.result-item.redirect { border-left: 4px solid #ffc107; }
.result-item.soft404 { border-left: 4px solid #ffc107; }

.result-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ddd;
}

.status-dot.working { background: #28a745; }
.status-dot.broken { background: #dc3545; }
.status-dot.error { background: #dc3545; }
.status-dot.redirect { background: #ffc107; }
.status-dot.soft404 { background: #ffc107; }

.status-text {
  font-weight: 600;
  font-size: 0.8rem;
}

.result-url {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.75rem;
  color: var(--vp-c-text-1, #333);
  margin-bottom: 0.5rem;
  word-break: break-all;
  line-height: 1.3;
}

.result-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.7rem;
  color: var(--vp-c-text-2, #666);
}

.status-code {
  background: var(--vp-c-bg-soft, #f8f9fa);
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
}

.details-content {
  padding: 2rem;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
}

.details-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #333);
}

.reload-btn {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.reload-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-light);
}

.reload-btn:disabled {
  background: #999;
  cursor: not-allowed;
}

.reload-btn img {
  width: 16px;
  height: 16px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-top: 1.5px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.detail-url {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 1rem;
  color: var(--vp-c-brand);
  margin-bottom: 1.5rem;
  word-break: break-all;
  line-height: 1.4;
  background: var(--vp-c-bg-soft, #f8f9fa);
  padding: 1rem;
  border-radius: 6px;
  text-decoration: none;
  display: block;
}

.detail-url:hover {
  background: var(--vp-c-bg, #fff);
  border: 1px solid var(--vp-c-brand);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft, #f8f9fa);
}

.detail-status .status-text {
  font-weight: 600;
  font-size: 1rem;
}

.detail-status-code {
  background: var(--vp-c-bg, #fff);
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-border-soft, #eee);
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.9rem;
}

.detail-error,
.detail-redirect {
  background: #f8d7da;
  color: #721c24;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.detail-redirect {
  background: #fff3cd;
  color: #856404;
}

.code-location {
  margin: 2rem 0;
}

.code-location h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.code-snippet {
  background: #f8f9fa;
  border: 1px solid var(--vp-c-border, #ddd);
  border-radius: 8px;
  padding: 1.5rem;
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.85rem;
  overflow-x: auto;
  white-space: pre-wrap;
  line-height: 1.5;
  margin: 0;
}

.line-number {
  color: var(--vp-c-text-2, #666);
  margin-right: 1rem;
  user-select: none;
}

.highlight-line {
  background: #ffe993;
  padding: 0 4px;
  border-radius: 3px;
}

.preview-section {
  margin: 2rem 0;
}

.preview-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.detail-preview {
  width: 100%;
  height: 600px;
  border: 1px solid var(--vp-c-border, #ddd);
  border-radius: 8px;
  background: white;
}

.soft404-info {
  background: #fff3cd;
  color: #856404;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
}

.soft404-info h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.soft404-info p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.no-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--vp-c-text-2, #666);
}

.no-selection h3 {
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.no-selection p {
  margin: 0;
  font-size: 1rem;
}

.info-tip {
  display: inline-block;
  margin-left: 0.3rem;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 0.675rem;
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
  padding: 0.8rem 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  color: var(--vp-c-text-1, #374151);
  font-size: 0.825rem;
  line-height: 1.5;
  z-index: 1000;
  transition: opacity 0.2s ease, transform 0.2s ease;
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

@media (max-width: 1800px) {
  .detail-preview {
    height: 500px;
  }
}

@media (max-width: 1400px) {
  .results-panel {
    width: 400px;
    min-width: 350px;
  }
  
  .detail-preview {
    height: 450px;
  }
}

@media (max-width: 1024px) {
  .results-stage {
    position: static !important;
    left: auto !important;
    right: auto !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    width: 100% !important;
    max-width: 1000px !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  .split-view {
    flex-direction: column;
    height: auto;
  }

  .results-panel {
    width: 100%;
    max-height: 350px;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-border-soft, #eee);
  }

  .details-panel {
    min-height: 500px;
  }
  
  .detail-preview {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .form-stage {
    padding: 0 0.5rem;
  }

  .results-stage {
    padding: 0 0.5rem !important;
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }

  .tool-form {
    padding: 1rem;
  }

  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .option-group {
    justify-content: space-between;
  }

  .results-summary {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .html-template-preview,
  .detail-preview {
    height: 300px;
  }

  .details-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .split-view {
    height: auto;
  }

  .details-content {
    padding: 1rem;
  }

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
</style>
