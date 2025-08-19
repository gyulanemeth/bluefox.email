<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { checkLinks } from '../../../connectors/bluefoxEmailToolsApi.js'
import {
  loadCaptchaFromStorage,
  loadNewCaptcha,
  clearCaptchaStorage,
  markCaptchaSolved
} from './helpers/captchaHandler.js'

// ---- VARIABLES ----
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

// Captcha state
const captchaProbe = ref(null)
const captchaImage = ref(null)
const captchaExpires = ref(0)
const captchaSolvedUntil = ref(0)
const captchaLoading = ref(false)

// Preview state
const showingPreview = ref({})
const loadingStates = ref({})
const reloadKeys = ref({})

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
  loading.value ||
  (shouldShowCaptcha.value && !captchaText.value?.trim())
)

// ---- FUNCTIONS ----
function extractLinksFromText(text) {
  if (!text || typeof text !== 'string') return []
  
  // Match URLs in the text (both Markdown and raw URLs)
  const urlRegex = /\bhttps?:\/\/[^\s)<>"']+/gi
  
  // Find all matches (ignore anchor text and non-URLs)
  const matches = text.match(urlRegex) || []
  
  // Remove duplicates and normalize
  const unique = [...new Set(matches.map(url => url.trim()))]
  
  return unique.map(url => ({
    href: url,
    text: url
  }))
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
      .map(link => ({
        ...link,
        href: link.href.trim()
      }))
  } catch (error) {
    console.error('Error parsing HTML:', error)
    return []
  }
}

function updateExtractedLinks() {
  extractedLinks.value = mode.value === 'html'
    ? extractLinksFromHTML(htmlTemplate.value)
    : extractLinksFromText(rawUrls.value)
}

function getCodeSnippetForLink(url) {
  if (mode.value !== 'html' || !htmlTemplate.value) return ''
  
  const lines = htmlTemplate.value.split('\n')
  const lineIndex = lines.findIndex(line => line.includes(url))
  
  if (lineIndex === -1) return ''
  
  // Get 2 lines before and after for context
  const start = Math.max(0, lineIndex - 2)
  const end = Math.min(lines.length, lineIndex + 3)
  const contextLines = lines.slice(start, end)
  
  return contextLines.map((line, idx) => {
    const actualLineNum = start + idx + 1
    const isTargetLine = (start + idx) === lineIndex
    const escapedLine = line.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    
    return isTargetLine 
      ? `<span class="line-number">${actualLineNum}:</span> <mark class="highlight-line">${escapedLine}</mark>`
      : `<span class="line-number">${actualLineNum}:</span> ${escapedLine}`
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

function getStatusIcon(status) {
  const icons = {
    working: 'Working',
    broken: 'Broken',
    redirect: 'Redirect',
    error: 'Error',
    soft404: 'Soft 404'
  }
  return icons[status] || 'Unknown'
}

function togglePreview(index) {
  showingPreview.value = {
    ...showingPreview.value,
    [index]: !showingPreview.value[index]
  }
}

async function reloadSingleLink(url, index) {
  // Check if captcha is expired before attempting reload
  if (isProbeExpired.value) {
    console.log('[Reload] Captcha expired, clearing results')
    result.value = null
    errorMessage.value = 'Your verification has expired. Please refresh the captcha to continue.'
    return
  }

  // Set loading state
  loadingStates.value = {
    ...loadingStates.value,
    [index]: true
  }
  
  try {
    const data = await checkLinks({
      urls: [url],
      timeout: timeout.value,
      includeProxy: includeProxy.value,
      captchaProbe: captchaProbe.value,
      captchaText: '' // No captcha needed for single reloads
    })
    
    if (data.result && data.result.length > 0) {
      const updatedResult = data.result[0]
      if (result.value && Array.isArray(result.value)) {
        const resultIndex = result.value.findIndex(r => r.url === url)
        if (resultIndex !== -1) {
          result.value[resultIndex] = updatedResult
          reloadKeys.value = {
            ...reloadKeys.value,
            [index]: (reloadKeys.value[index] || 0) + 1
          }
        }
      }
    }
  } catch (err) {
    console.error(`[Reload] Error reloading ${url}:`, err)
    
    // If captcha error, clear results and show form
    if (err.status === 401) {
      result.value = null
      await refreshCaptcha()
      captchaText.value = ''
      errorMessage.value = 'Your verification has expired. Please refresh the captcha to continue.'
    } else {
      errorMessage.value = `Failed to reload ${url}: ${err.message}`
      setTimeout(() => {
        if (errorMessage.value.includes('Failed to reload')) {
          errorMessage.value = ''
        }
      }, 5000)
    }
  } finally {
    loadingStates.value = {
      ...loadingStates.value,
      [index]: false
    }
  }
}

function clearReloadStates() {
  loadingStates.value = {}
  reloadKeys.value = {}
}

async function checkLinksHandler() {
  result.value = null
  loading.value = true
  errorMessage.value = ''
  clearReloadStates()
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

// ---- WATCHES ----
watch([mode, rawUrls, htmlTemplate], updateExtractedLinks, { immediate: true })

watch(mode, () => { 
  result.value = null 
})

watch(isProbeExpired, (expired, prev) => {
  if (expired && !prev) {
    console.log('[Watch] Captcha expired, clearing results')
    result.value = null
    captchaText.value = ''
  }
})

watch(shouldShowCaptcha, (show, prev) => {
  if (show && !prev) {
    captchaText.value = ''
  }
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
    <!-- Modern Pill Tabs Mode Switcher -->
    <div class="input-mode-tabs">
      <button 
        type="button"
        :class="['tab-btn', { active: mode === 'urls' }]"
        @click="mode = 'urls'"
      >
        Paste URLs
      </button>
      <button 
        type="button"
        :class="['tab-btn', { active: mode === 'html' }]"
        @click="mode = 'html'"
      >
        HTML Template
      </button>
    </div>

    <!-- Input Form -->
    <div class="tool-form">
      <form @submit.prevent="checkLinksHandler">
        <!-- URLs Input -->
        <div v-if="mode === 'urls'" class="form-group">
          <label for="rawUrlsInput">URLs to Check:</label>
          <textarea
            id="rawUrlsInput"
            v-model="rawUrls"
            rows="6"
            placeholder="https://example.com&#10;https://google.com&#10;https://github.com"
            :disabled="loading"
            required
          />
          <small class="form-help">
            Paste or type URLs here, one per line or comma separated. Markdown links and raw URLs are supported.
          </small>
        </div>

        <!-- HTML Template Input -->
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
          />
          <small class="form-help">
            Paste your HTML email template here. All hyperlinks will be automatically extracted and checked.
          </small>
        </div>

        <!-- HTML Template Live Preview -->
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

        <!-- Extracted Links Preview -->
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

        <!-- No Links Found Warning -->
        <div v-else-if="(mode === 'urls' ? rawUrls.trim() : htmlTemplate.trim())" class="form-group">
          <div class="no-links-warning">
            <p>Warning: No valid links found in your {{ mode === 'urls' ? 'URL list' : 'HTML template' }}.</p>
            <small v-if="mode === 'html'">Make sure your HTML contains &lt;a href="..."&gt; tags with valid URLs.</small>
            <small v-else>Make sure your text contains valid URLs starting with http:// or https://</small>
          </div>
        </div>

        <!-- Options -->
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

        <!-- Expired probe notice -->
        <div v-if="captchaProbe && isProbeExpired" class="captcha-expired-message">
          Your verification has expired. Please refresh the captcha below.
        </div>

        <!-- CAPTCHA -->
        <div v-if="shouldShowCaptcha" class="form-group">
          <label for="captcha">Security Verification:</label>
          <div class="captcha-container">
            <div class="captcha-image-container">
              <div v-if="captchaLoading" class="captcha-loading">
                Loading captcha...
              </div>
              <div v-else-if="captchaImage" class="captcha-image" v-html="captchaImage" />
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

        <!-- Submit -->
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

    <!-- Error -->
    <div v-if="errorMessage" class="error-section">
      <p class="error-message">{{ errorMessage }}</p>
    </div>

    <!-- Results -->
    <div v-if="result && Array.isArray(result)" class="result-section">
      <h3>Link Check Results</h3>

      <!-- Summary -->
      <div class="summary-section">
        <h4>
          Summary
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">Overview of all checked links categorized by their status.</span>
          </span>
        </h4>
        <div class="summary-grid">
          <div class="summary-item total">
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
          <div class="summary-item redirects">
            <span class="count">{{ result.filter(r => r.status === 'redirect').length }}</span>
            <span class="label">Redirects</span>
          </div>
          <div class="summary-item errors">
            <span class="count">{{ result.filter(r => r.status === 'error').length }}</span>
            <span class="label">Errors</span>
          </div>
        </div>
      </div>

      <!-- Individual Results -->
      <div class="links-section">
        <h4>
          Detailed Results
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">Individual status and details for each checked URL.</span>
          </span>
        </h4>
        <div class="links-results">
          <div 
            v-for="(linkResult, index) in result" 
            :key="index"
            class="link-result"
            :class="linkResult.status"
          >
            <div class="link-header">
              <span class="status-icon">{{ getStatusIcon(linkResult.status) }}</span>
              <div class="link-info-detailed">
                <a :href="linkResult.url" target="_blank" class="link-url">
                  {{ linkResult.url }}
                </a>
                <span v-if="mode === 'html' && extractedLinks.find(l => l.href === linkResult.url)?.text" class="anchor-text">
                  "{{ extractedLinks.find(l => l.href === linkResult.url)?.text }}"
                </span>
              </div>
              <span class="status-code" :class="linkResult.status">
                {{ linkResult.status === 'soft404' ? 'Soft 404' : linkResult.statusCode }}
              </span>
            </div>
            
            <div class="link-details">
              <span class="response-time">{{ linkResult.responseTime }}ms</span>
              <span v-if="linkResult.method" class="method">{{ linkResult.method }}</span>
              <span v-if="linkResult.finalUrl && linkResult.finalUrl !== linkResult.url" class="final-url">
                → {{ linkResult.finalUrl }}
              </span>
              <span v-if="linkResult.error" class="error-text">{{ linkResult.error }}</span>
            </div>

            <!-- Iframe Preview (only for working links) -->
            <div v-if="linkResult.pageContent && includeProxy && linkResult.status === 'working'" class="iframe-container">
              <div class="iframe-controls">
                <button 
                  @click="togglePreview(index)" 
                  class="preview-toggle"
                  type="button"
                >
                  {{ showingPreview[index] ? 'Hide Preview' : 'Show Preview' }}
                </button>
                <button 
                  v-if="showingPreview[index]"
                  @click="reloadSingleLink(linkResult.url, index)"
                  :disabled="loadingStates[index]"
                  class="reload-button"
                  type="button"
                  title="Reload this link"
                >
                  <img v-if="!loadingStates[index]" src="/assets/reload.webp?url" alt="reload" class="reload-icon" />
                  <span v-else class="reload-spinner"></span>
                  {{ loadingStates[index] ? 'Reloading...' : 'Reload' }}
                </button>
              </div>
              <iframe 
                v-if="showingPreview[index]"
                :key="`iframe-${index}-${reloadKeys[index] || 0}`"
                :srcdoc="linkResult.pageContent"
                class="link-preview"
                sandbox="allow-scripts allow-same-origin"
                title="Page Content Preview"
              ></iframe>
            </div>

            <!-- Soft 404 Block (no preview) -->
            <div v-else-if="linkResult.status === 'soft404'" class="iframe-container">
              <div class="soft404-preview">
                <p><strong>Soft 404 Detected:</strong> This page returns the homepage content instead of the requested page.</p>
                <p class="soft404-explanation">
                  The server responds with HTTP 200 but shows generic homepage content, indicating the requested page doesn't exist.
                </p>
                <button 
                  @click="reloadSingleLink(linkResult.url, index)"
                  :disabled="loadingStates[index]"
                  class="retry-button"
                  type="button"
                >
                  <img v-if="!loadingStates[index]" src="/assets/reload.webp?url" alt="reload" class="reload-icon" />
                  <span v-else class="reload-spinner"></span>
                  {{ loadingStates[index] ? 'Retrying...' : 'Retry Link' }}
                </button>
              </div>
            </div>

            <!-- Error Preview for Broken Links -->
            <div v-else-if="(linkResult.status === 'broken' || linkResult.status === 'error') && includeProxy" class="iframe-container">
              <div class="error-preview">
                <p><strong>Cannot preview:</strong> {{ linkResult.error || 'Page not accessible' }}</p>
                <button 
                  @click="reloadSingleLink(linkResult.url, index)"
                  :disabled="loadingStates[index]"
                  class="retry-button"
                  type="button"
                >
                  <img v-if="!loadingStates[index]" src="/assets/reload.webp?url" alt="reload" class="reload-icon" />
                  <span v-else class="reload-spinner"></span>
                  {{ loadingStates[index] ? 'Retrying...' : 'Retry Link' }}
                </button>
              </div>
            </div>

            <!-- Code Snippet for Broken Links in HTML Mode -->
            <div v-if="(linkResult.status === 'broken' || linkResult.status === 'error') && mode === 'html'" class="code-snippet-container">
              <button 
                @click="showingPreview['code-' + index] = !showingPreview['code-' + index]"
                class="code-snippet-toggle"
                type="button"
              >
                {{ showingPreview['code-' + index] ? 'Hide Code' : 'Show Code Location' }}
              </button>
              <pre v-if="showingPreview['code-' + index]" class="code-snippet" v-html="getCodeSnippetForLink(linkResult.url)"></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link-checker {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Modern Pill Tabs */
.input-mode-tabs {
  display: flex;
  background: var(--vp-c-bg-soft, #f1f5f9);
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 1.5rem;
  width: fit-content;
}

.tab-btn {
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2, #64748b);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tab-btn.active {
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-1, #1e293b);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tab-btn:hover:not(.active) {
  color: var(--vp-c-text-1, #1e293b);
}

/* Form Styles */
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

/* HTML Template Preview */
.html-template-preview {
  width: 100%;
  height: 300px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  background: white;
  margin-bottom: 0.5rem;
}

/* Extracted Links Preview */
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

/* Form Options */
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

.result-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.result-section h4:first-of-type {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

/* Summary */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.summary-item {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
}

.summary-item .count {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.summary-item .label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2, #6b7280);
}

.summary-item.total { background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }
.summary-item.working { background: #d4edda; color: #155724; }
.summary-item.broken { background: #f8d7da; color: #721c24; }
.summary-item.redirects { background: #fff3cd; color: #856404; }

/* Links Results */
.links-results {
  margin: 1rem 0;
}

.link-result {
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--vp-c-bg, #ffffff);
}

.link-result.working { border-left: 4px solid #28a745; }
.link-result.broken { border-left: 4px solid #dc3545; }
.link-result.redirect { border-left: 4px solid #ffc107; }
.link-result.soft404 { border-left: 4px solid #ffc107; }
.link-result.error { border-left: 4px solid #dc3545; }

.link-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.status-icon {
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.125rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.link-info-detailed {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.link-url {
  color: var(--vp-c-brand);
  text-decoration: none;
  word-break: break-all;
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.9rem;
}

.link-url:hover {
  text-decoration: underline;
}

.anchor-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2, #6b7280);
  font-style: italic;
}

.status-code {
  background: var(--vp-c-text-2, #6c757d);
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  height: fit-content;
}

.status-code.soft404 {
  background: #ffc107;
  color: #000;
}

.link-details {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2, #666);
  flex-wrap: wrap;
}

.method {
  background: var(--vp-c-bg-soft);
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 500;
}

.final-url {
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
}

.error-text {
  color: var(--vp-c-danger-1, #dc3545);
  font-weight: 500;
}

/* Iframe Preview */
.iframe-container {
  margin-top: 1rem;
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1rem;
}

/* Iframe Controls */
.iframe-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  align-items: center;
}

.preview-toggle {
  background: var(--vp-c-text-2, #6c757d);
  color: white;
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.preview-toggle:hover {
  background: var(--vp-c-text-1, #495057);
}

.reload-button, .retry-button {
  background: var(--vp-c-brand, #007bff);
  color: white;
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.reload-button:hover:not(:disabled), 
.retry-button:hover:not(:disabled) {
  background: var(--vp-c-brand-light, #0056b3);
  transform: translateY(-1px);
}

.reload-button:disabled, 
.retry-button:disabled {
  background: var(--vp-c-bg-mute, #9ca3af);
  cursor: not-allowed;
  transform: none;
}

.retry-button {
  background: var(--vp-c-warning, #ffc107);
  color: #000;
}

.retry-button:hover:not(:disabled) {
  background: #ffb300;
}

.reload-icon {
  width: 12px;
  height: 12px;
}

.reload-spinner {
  width: 12px;
  height: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-top: 1.5px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.link-preview {
  width: 100%;
  height: 400px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 6px;
  background: white;
}

/* Soft 404 Preview */
.soft404-preview {
  background: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #ffc107;
}

.soft404-preview p {
  margin: 0 0 0.5rem 0;
}

.soft404-explanation {
  font-size: 0.875rem;
  font-style: italic;
  margin-bottom: 1rem !important;
}

/* Error Preview */
.error-preview {
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #f5c6cb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.error-preview p {
  margin: 0;
  flex: 1;
}

/* Code Snippet */
.code-snippet-container {
  margin-top: 1rem;
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1rem;
}

.code-snippet-toggle {
  background: var(--vp-c-bg-soft, #f1f5f9);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  transition: background-color 0.2s ease;
}

.code-snippet-toggle:hover {
  background: var(--vp-c-bg, #ffffff);
}

.code-snippet {
  background: #f8f9fa;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 6px;
  padding: 1rem;
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  overflow-x: auto;
  white-space: pre-wrap;
  line-height: 1.5;
}

.line-number {
  color: var(--vp-c-text-2, #6b7280);
  margin-right: 1rem;
  user-select: none;
}

.highlight-line {
  background: #ffe993;
  padding: 0 4px;
  border-radius: 3px;
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

/* Responsive */
@media (max-width: 768px) {
  .link-checker {
    padding: 0 0.5rem;
  }
  
  .tool-form,
  .result-section {
    padding: 1rem;
    margin: 1rem 0;
  }

  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .option-group {
    justify-content: space-between;
  }

  .summary-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 0.5rem;
  }

  .summary-item {
    padding: 0.75rem 0.5rem;
  }

  .link-header {
    flex-wrap: wrap;
  }

  .link-details {
    flex-direction: column;
    gap: 0.5rem;
  }

  .link-preview,
  .html-template-preview {
    height: 300px;
  }

  .iframe-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .error-preview,
  .soft404-preview {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
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

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .refresh-captcha-btn {
    background: var(--vp-c-bg-soft);
    border-color: var(--vp-c-border);
    color: var(--vp-c-text-1);
  }
  
  .refresh-captcha-btn:hover:not(:disabled) {
    border-color: var(--vp-c-brand);
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
</style>
