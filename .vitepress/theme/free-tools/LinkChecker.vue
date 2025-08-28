<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { checkLinks } from '../../../connectors/bluefoxEmailToolsApi.js'
import {
  loadCaptchaFromStorage,
  loadNewCaptcha,
  clearCaptchaStorage,
  markCaptchaSolved
} from './helpers/captchaHandler.js'

const htmlTemplate = ref('')
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

const previewMode = ref('desktop')
const templatePreviewMode = ref('desktop')
const activeDetailsTab = ref('page-preview')

// Modal functionality
const showModal = ref(false)
const isMobile = ref(false)

const timeout = 10000
const includeProxy = true

const pagePreviewUrl = ref('')

const now = () => Math.floor(Date.now() / 1000)
const isProbeExpired = computed(() => !captchaProbe.value || now() > captchaExpires.value)
const isSolved = computed(() => captchaSolvedUntil.value > now() && !isProbeExpired.value)
const shouldShowCaptcha = computed(() =>
  !isSolved.value || isProbeExpired.value || !captchaProbe.value || !captchaImage.value
)
const isFormDisabled = computed(() =>
  loading.value || (shouldShowCaptcha.value && !captchaText.value?.trim())
)
const shouldUseModal = computed(() => isMobile.value && window.innerWidth <= 768)

watch(result, (newResult) => {
  if (newResult && newResult.length > 0) {
    selectedIndex.value = 0
    selectedResult.value = newResult[0]
    activeDetailsTab.value = 'page-preview'
  }
})

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
  extractedLinks.value = extractLinksFromHTML(htmlTemplate.value)
}

function getStatusText(status) {
  const statusMap = {
    working: 'Working',
    broken: 'Broken',
    redirect: 'Redirect',
    error: 'Error',
    soft404: 'Soft 404'
  }
  return statusMap[status] || 'Unknown'
}

function selectResult(resultItem, index) {
  selectedResult.value = resultItem
  selectedIndex.value = index

  if (shouldUseModal.value) {
    showModal.value = true
  }
  activeDetailsTab.value = 'page-preview'
  
  updatePagePreviewUrl(resultItem)
}

function closeModal() {
  showModal.value = false
}

function getCodeSnippetForLink(url) {
  if (!htmlTemplate.value) return ''
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
    }
    return `<span class="line-number">${actualLineNum}:</span> ${escapedLine}`
  }).join('\n')
}

async function copyToClipboard(text, event = null) {
  try {
    await navigator.clipboard.writeText(text)
    let button = null
    if (event && event.target) {
      button = event.target.closest('button')
    } else {
      const buttons = document.querySelectorAll('.copy-link-btn, .copy-detail-btn')
      buttons.forEach(btn => {
        if (btn.title && btn.title.includes(text)) {
          button = btn
        }
      })
    }
    if (button) {
      button.classList.add('copied')
      setTimeout(() => button.classList.remove('copied'), 1000)
    }
    return true
  } catch {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return true
  }
}

function setPreviewMode(mode) {
  previewMode.value = mode
}
function setTemplatePreviewMode(mode) {
  templatePreviewMode.value = mode
}
function setActiveDetailsTab(tab) {
  activeDetailsTab.value = tab
}

// --- Highlighted Location Template Preview ---
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getHighlightedTemplate(targetUrl) {
  if (!htmlTemplate.value || !targetUrl) return ''
  let highlightedHtml = htmlTemplate.value
  const escapedUrl = escapeRegExp(targetUrl)
  const linkRegex = new RegExp(`(<a[^>]*href=["']${escapedUrl}["'][^>]*>)`, 'gi')
  highlightedHtml = highlightedHtml.replace(linkRegex, (match) => {
    return match.replace('<a', '<a id="highlighted-link" style="border: 8px solid #ff0000 !important; padding: 8px 12px !important; border-radius: 8px !important; box-shadow: 0 0 20px rgba(255, 0, 0, 0.8) !important; background: rgba(255, 255, 0, 0.3) !important; position: relative !important; z-index: 9999 !important; display: inline-block !important; transform: scale(1.1) !important; animation: highlight-pulse 2s infinite !important;"')
  })
  return [
    '<style>',
      `a[href="${targetUrl}"] {`,
        'border: 8px solid #ff0000 !important;',
        'padding: 8px 12px !important;',
        'border-radius: 8px !important;',
        'box-shadow: 0 0 20px rgba(255, 0, 0, 0.8) !important;',
        'background: rgba(255, 255, 0, 0.3) !important;',
        'position: relative !important;',
        'z-index: 9999 !important;',
        'display: inline-block !important;',
        'transform: scale(1.1) !important;',
        'animation: highlight-pulse 2s infinite !important;',
      '}',
      `a[href="${targetUrl}"]:before {`,
        'content: "";',
        'position: absolute;',
        'top: -15px;',
        'left: -15px;',
        'right: -15px;',
        'bottom: -15px;',
        'background: rgba(255, 0, 0, 0.2);',
        'border: 3px dashed #ff0000;',
        'border-radius: 15px;',
        'z-index: -1;',
        'animation: glow-rotate 3s linear infinite;',
      '}',
      '@keyframes highlight-pulse {',
        '0%, 100% {',
          'box-shadow: 0 0 20px rgba(255, 0, 0, 0.8);',
          'background: rgba(255, 255, 0, 0.3);',
        '}',
        '50% {',
          'box-shadow: 0 0 35px rgba(255, 0, 0, 1);',
          'background: rgba(255, 255, 0, 0.6);',
        '}',
      '}',
      'body {',
        'margin: 8px !important;',
        'padding: 8px !important;',
        'position: relative !important;',
      '}',
      'body > * {',
        'opacity: 0.7 !important;',
        'transition: opacity 0.3s ease !important;',
      '}',
      `a[href="${targetUrl}"], a[href="${targetUrl}"] * {`,
        'opacity: 1 !important;',
      '}',
    '</style>',
    '<scr' + 'ipt>',
      'window.addEventListener("load", function() {',
        'const highlightedLink = document.getElementById("highlighted-link");',
        'if (highlightedLink) {',
          'setTimeout(function() {',
            'highlightedLink.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });',
          '}, 100);',
        '}',
      '});',
      'document.addEventListener("DOMContentLoaded", function() {',
        'const highlightedLink = document.getElementById("highlighted-link");',
        'if (highlightedLink) {',
          'setTimeout(function() {',
            'highlightedLink.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });',
          '}, 200);',
        '}',
      '});',
    '</scr' + 'ipt>',
    highlightedHtml
  ].join('')
}

async function getPagePreviewDataUrl(url) {
  if (!url || !url.trim()) return ''
  try {
    const response = await fetch(`http://localhost:3000/v1/proxy?url=${encodeURIComponent(url)}`)
    const data = await response.json()
    if (data.result && data.result.dataUrl) {
      return data.result.dataUrl
    }
    throw new Error('No dataUrl returned')
  } catch (error) {
    console.error('Error getting page preview:', error)
    return ''
  }
}

async function updatePagePreviewUrl(selected) {
  // Only fetch preview for working, broken, error, or redirect links
  if (selected && (selected.status === 'working' || selected.status === 'broken' || selected.status === 'error' || selected.status === 'redirect' || selected.status === 'soft404')) {
    pagePreviewUrl.value = await getPagePreviewDataUrl(selected.url)
  } else {
    pagePreviewUrl.value = ''
  }
}
// Update page preview when selection or tab changes (only for Page Preview tab)
watch([selectedResult, activeDetailsTab, previewMode], async ([selected, tab, mode]) => {
  if (!selected || tab !== 'page-preview') return
  await updatePagePreviewUrl(selected)
}, { immediate: true })

function setDesktopMode() {
  previewMode.value = 'desktop'
}
function setMobileMode() {
  previewMode.value = 'mobile'
}
function setTemplateDesktopMode() {
  templatePreviewMode.value = 'desktop'
}
function setTemplateMobileMode() {
  templatePreviewMode.value = 'mobile'
}

// ---- CAPTCHA (existing) ----
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
  } catch {
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
  if (!htmlTemplate.value?.trim()) {
    errorMessage.value = 'Please paste your HTML email template'
    return false
  }
  if (extractedLinks.value.length === 0) {
    errorMessage.value = 'No valid links found in your HTML template'
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
      timeout: timeout,
      includeProxy: includeProxy,
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
      await updatePagePreviewUrl(updatedResult)
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
      timeout: timeout,
      includeProxy: includeProxy,
      captchaProbe: captchaProbe.value,
      captchaText: shouldShowCaptcha.value ? captchaText.value : ''
    })
    result.value = data.result
    captchaText.value = ''
    markSolved()
    await nextTick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
  showModal.value = false
}
function handleResize() {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) showModal.value = false
}
watch(htmlTemplate, updateExtractedLinks, { immediate: true })
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
  handleResize()
  window.addEventListener('resize', handleResize)
  if (!isSolved.value && (!captchaProbe.value || isProbeExpired.value)) {
    await loadCaptcha()
  }
})
</script>

<template>
  <div class="link-checker-breakout">
    <div class="link-checker">
      <div v-if="!result" class="form-stage">
        <div class="form-container">
          <h2 class="form-title">HTML Email Link Checker</h2>          
          <div class="tool-form">
            <form @submit.prevent="checkLinksHandler">
              <div class="form-group">
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

              <div v-if="htmlTemplate.trim()" class="form-group">
                <div class="preview-header">
                  <label>HTML Template Preview:</label>
                  <div class="preview-switcher">
                    <button
                      type="button"
                      @click="setPreviewMode('desktop')"
                      :class="['preview-btn', { active: previewMode === 'desktop' }]"
                      title="Desktop Preview"
                    >
                      <img src="/assets/monitor.webp?url" alt="desktop" />
                      <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      @click="setPreviewMode('mobile')"
                      :class="['preview-btn', { active: previewMode === 'mobile' }]"
                      title="Mobile Preview"
                    >
                      <img src="/assets/cellphone.webp?url" alt="mobile" />
                      <span>Mobile</span>
                    </button>
                  </div>
                </div>
                <div class="preview-container">
                  <iframe
                    :srcdoc="htmlTemplate"
                    :class="['html-template-preview', previewMode]"
                    sandbox="allow-scripts allow-same-origin"
                    title="HTML Template Live Preview"
                  ></iframe>
                </div>
                <small class="form-help mobile-hidden-message">
                  Live preview of your HTML template. Switch between desktop and mobile views to see how it appears on different devices.
                </small>
                <small class="form-help mobile-only-message">
                  Preview is hidden on mobile devices for better performance. Use a desktop or tablet to view the HTML template preview.
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
                      <div class="link-url-container">
                        <span class="link-url" :title="link.href">{{ link.href }}</span>
                        <button
                          type="button"
                          @click="copyToClipboard(link.href)"
                          class="copy-link-btn"
                          :title="`Copy ${link.href} to clipboard`"
                        >
                          <img src="/assets/copy.webp?url" alt="copy" />
                        </button>
                      </div>
                      <span class="link-text">{{ link.text }}</span>
                    </div>
                  </div>
                </div>
                <small class="form-help">
                  These links will be checked when you submit the form. Click the copy icon to copy individual URLs.
                </small>
              </div>

              <div v-else-if="htmlTemplate.trim()" class="form-group">
                <div class="no-links-warning">
                  <p>Warning: No valid links found in your HTML template.</p>
                  <small>Make sure your HTML contains &lt;a href="..."&gt; tags with valid URLs.</small>
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
                <div class="result-url" :title="linkResult.url">{{ linkResult.url }}</div>
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
                <div class="header-actions">
                  <button
                    @click="copyToClipboard(selectedResult.url)"
                    class="copy-detail-btn"
                    :title="`Copy ${selectedResult.url} to clipboard`"
                  >
                    <img src="/assets/copy.webp?url" alt="copy" />
                  </button>
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
                  </button>
                </div>
              </div>
              <a 
                :href="selectedResult.url" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="detail-url"
                :title="selectedResult.url"
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
                <strong>Redirects to:</strong><br>
                <span class="redirect-url" :title="selectedResult.finalUrl">{{ selectedResult.finalUrl }}</span>
              </div>
              
              <div v-if="selectedResult" class="preview-tabs-section">
                <div class="preview-tabs-header">
                  <div class="preview-tabs-nav">
                    <button
                      @click="setActiveDetailsTab('page-preview')"
                      :class="['preview-tab-btn', { active: activeDetailsTab === 'page-preview' }]"
                    >
                      <span>Page Preview</span>
                    </button>
                    <button
                      @click="setActiveDetailsTab('template-preview')"
                      :class="['preview-tab-btn', { active: activeDetailsTab === 'template-preview' }]"
                    >
                      <span>Link Location</span>
                    </button>
                  </div>
                  
                  <div v-if="activeDetailsTab === 'page-preview'" class="tab-switcher">
                    <div class="preview-switcher">
                      <button 
                        type="button" 
                        @click="setPreviewMode('desktop')" 
                        :class="['preview-btn', { active: previewMode === 'desktop' }]"
                        title="Desktop Preview"
                      >
                        <img src="/assets/monitor.webp?url" alt="desktop" />
                        <span>Desktop</span>
                      </button>
                      <button 
                        type="button" 
                        @click="setPreviewMode('mobile')" 
                        :class="['preview-btn', { active: previewMode === 'mobile' }]"
                        title="Mobile Preview"
                      >
                        <img src="/assets/cellphone.webp?url" alt="mobile" />
                        <span>Mobile</span>
                      </button>
                    </div>
                  </div>
                  
                  <div v-if="activeDetailsTab === 'template-preview'" class="tab-switcher">
                    <div class="template-preview-switcher">
                      <button 
                        type="button" 
                        @click="setTemplatePreviewMode('desktop')" 
                        :class="['template-preview-btn', { active: templatePreviewMode === 'desktop' }]"
                        title="Desktop Template Preview"
                      >
                        <img src="/assets/monitor.webp?url" alt="desktop" />
                        <span>Desktop</span>
                      </button>
                      <button 
                        type="button" 
                        @click="setTemplatePreviewMode('mobile')" 
                        :class="['template-preview-btn', { active: templatePreviewMode === 'mobile' }]"
                        title="Mobile Template Preview"
                      >
                        <img src="/assets/cellphone.webp?url" alt="mobile" />
                        <span>Mobile</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="preview-tabs-content">
                  <div v-if="activeDetailsTab === 'page-preview'" class="preview-tab-panel">
                    <div class="tab-panel-header">
                      <h4>Page Content Preview</h4>
                      <small class="tab-panel-help">Live preview of the destination page</small>
                    </div>
                    <div class="page-preview-container">
                      <iframe
                        v-if="pagePreviewUrl"
                        :key="`detail-${selectedIndex}-${reloadKeys[selectedIndex] || 0}-${previewMode}`"
                        :src="pagePreviewUrl"
                        :class="['detail-preview', previewMode]"
                        sandbox="allow-scripts allow-same-origin"
                        title="Page Content Preview"
                      ></iframe>
                      <div v-else class="no-preview-content">
                        <h4>No Page Preview Available</h4>
                        <p>Page preview is only available for fetched links that return content.</p>
                      </div>
                    </div>
                    <small class="form-help mobile-only-message preview-hidden-message">
                      Page preview is hidden on mobile devices for better performance. Use a desktop or tablet to view the full page preview.
                    </small>
                  </div>

                  <div v-if="activeDetailsTab === 'template-preview'" class="preview-tab-panel">
                    <div class="tab-panel-header">
                      <h4>Template Preview - Link Location</h4>
                      <small class="tab-panel-help">Original template with the selected link highlighted</small>
                    </div>
                    <div class="template-preview-container">
                      <iframe
                        :srcdoc="getHighlightedTemplate(selectedResult.url)"
                        :class="['template-preview-iframe', templatePreviewMode]"
                        sandbox="allow-scripts allow-same-origin"
                        title="Template Preview with Highlighted Link"
                      ></iframe>
                    </div>
                    <small class="tab-panel-help template-preview-mobile-hidden">
                      Original template with the selected link highlighted with a red border. Switch views to see how it appears on different devices.
                    </small>
                    <small class="tab-panel-help template-preview-mobile-only">
                      Template preview is hidden on mobile devices for better performance. Use a desktop or tablet to view the highlighted template.
                    </small>
                    
                    <!-- ENHANCED: Code location for both broken AND error links -->
                    <div v-if="selectedResult.status === 'broken' || selectedResult.status === 'error'" class="code-location">
                      <h4>Code Location:</h4>
                      <pre class="code-snippet" v-html="getCodeSnippetForLink(selectedResult.url)"></pre>
                    </div>
                  </div>
                </div>
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

        <!-- Mobile Modal - Only shows on mobile -->
        <div v-if="showModal && selectedResult" class="modal-overlay" @click="closeModal">
          <div class="modal-container" @click.stop>
            <div class="modal-header">
              <h3>Link Details</h3>
              <button @click="closeModal" class="close-modal-btn">
                <span>&times;</span>
              </button>
            </div>
            
            <div class="modal-content">
              <div class="details-header mobile">
                <div class="header-actions">
                  <button
                    @click="copyToClipboard(selectedResult.url)"
                    class="copy-detail-btn mobile"
                    :title="`Copy ${selectedResult.url} to clipboard`"
                  >
                    <img src="/assets/copy.webp?url" alt="copy" />
                  </button>
                  <button
                    @click="reloadSelectedResult"
                    :disabled="loadingStates[selectedIndex]"
                    class="reload-btn mobile"
                    title="Reload this link"
                  >
                    <img 
                      v-if="!loadingStates[selectedIndex]" 
                      src="/assets/reload.webp?url" 
                      alt="reload"
                    />
                    <div v-else class="spinner"></div>
                  </button>
                </div>
              </div>

              <a 
                :href="selectedResult.url" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="detail-url mobile"
                :title="selectedResult.url"
              >
                {{ selectedResult.url }}
              </a>
              
              <div class="detail-status mobile" :class="selectedResult.status">
                <span class="status-dot" :class="selectedResult.status"></span>
                <span class="status-text">{{ getStatusText(selectedResult.status) }}</span>
                <span v-if="selectedResult.statusCode" class="detail-status-code">
                  {{ selectedResult.statusCode }}
                </span>
                <span class="response-time">{{ selectedResult.responseTime }}ms</span>
              </div>

              <div v-if="selectedResult.error" class="detail-error mobile">
                <strong>Error:</strong> {{ selectedResult.error }}
              </div>

              <div v-if="selectedResult.finalUrl && selectedResult.finalUrl !== selectedResult.url" class="detail-redirect mobile">
                <strong>Redirects to:</strong><br>
                <span class="redirect-url">{{ selectedResult.finalUrl }}</span>
              </div>

              <div v-if="selectedResult.status === 'broken' || selectedResult.status === 'error'" class="code-location mobile">
                <h4>Code Location:</h4>
                <pre class="code-snippet mobile" v-html="getCodeSnippetForLink(selectedResult.url)"></pre>
              </div>

              <div v-if="selectedResult.status === 'soft404'" class="soft404-info mobile">
                <h4>Soft 404 Detected</h4>
                <p>This page returns the homepage content instead of the requested page.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link-checker-breakout {
  width: 100vw;
  position: relative;
  left: 50%;
  margin-left: -50vw;
  margin-top: 2rem;
  margin-bottom: 2rem;
  overflow-x: hidden;
  box-sizing: border-box;
}

.link-checker {
  width: 100%;
  max-width: none;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 4rem);
  box-sizing: border-box;
}

.form-stage {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 70vh;
  padding: 2rem 0;
}

.form-container {
  width: 100%;
  max-width: 1200px;
}

.form-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #1e293b);
}


.results-stage {
  width: 100%;
  max-width: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 1600px;
  padding: 0 clamp(1rem, 5vw, 4rem);
  box-sizing: border-box;
}

.results-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #333);
  flex: 1;
  text-align: left;
}

.back-btn {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border, #ddd);
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  color: var(--vp-c-text-1, #333);
  font-size: 0.9rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
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
  width: 100%;
  max-width: 1600px; /* Same as results-header max-width */
  margin: 0 auto;
  box-sizing: border-box;
}

.results-panel {
  width: 500px;
  min-width: 450px;
  border-right: 1px solid var(--vp-c-border-soft, #eee);
  background: var(--vp-c-bg-alt, #fafafa);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.details-panel {
  flex: 1;
  background: var(--vp-c-bg, #fff);
  overflow-y: auto;
  min-width: 0;
}

.tool-form {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 12px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  padding: 2rem;
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

.mobile-hidden-message {
  display: block;
}

.mobile-only-message {
  display: none;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.preview-switcher {
  display: flex;
  background: var(--vp-c-bg-soft, #f1f5f9);
  border-radius: 8px;
  padding: 4px;
  gap: 2px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
}

.preview-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2, #64748b);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.preview-btn img {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}

.preview-btn.active {
  background: var(--vp-c-brand);
  color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.preview-btn.active img {
  opacity: 1;
  filter: brightness(0) invert(1);
}

.preview-btn:hover:not(.active) {
  color: var(--vp-c-text-1, #1e293b);
  background: var(--vp-c-bg, #ffffff);
}

.preview-btn:hover:not(.active) img {
  opacity: 1;
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: var(--vp-c-bg-mute, #f8f9fa);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 0.5rem;
}

.html-template-preview {
  height: 600px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.html-template-preview.desktop {
  width: 100%;
  max-width: 1200px;
}

.html-template-preview.mobile {
  width: 375px;
  max-width: 375px;
}

.detail-preview {
  width: 100%;
  height: 600px;
  border: 1px solid var(--vp-c-border, #ddd);
  border-radius: 8px;
  background: white;
}

.detail-preview.desktop {
  width: 100%;
  max-width: 1200px;
}

.detail-preview.mobile {
  width: 375px;
  max-width: 375px;
  margin: 0 auto;
}

.extracted-links {
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  border-radius: 6px;
  background: var(--vp-c-bg, #ffffff);
}

.extracted-link {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #f1f5f9);
  transition: background-color 0.2s ease;
}

.extracted-link:last-child {
  border-bottom: none;
}

.extracted-link:hover {
  background: var(--vp-c-bg-soft, #f8f9fa);
}

.link-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.link-url-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

.link-url {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  color: var(--vp-c-brand);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: help;
  flex: 1;
  min-width: 0;
}

.link-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2, #6b7280);
  font-style: italic;
}

.copy-link-btn {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  padding: 0.25rem;
  border-radius: 4px;
  cursor: pointer;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.copy-link-btn:hover {
  background: var(--vp-c-bg, #ffffff);
  border-color: var(--vp-c-brand);
  transform: scale(1.05);
}

.copy-link-btn img {
  width: 12px;
  height: 12px;
  opacity: 0.7;
}

.copy-link-btn:hover img {
  opacity: 1;
}

.copy-link-btn.copied {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.copy-link-btn.copied img {
  opacity: 1;
  filter: brightness(0) invert(1);
}

/* Enhanced URL styling with proper word breaking */
.result-url,
.detail-url {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  color: var(--vp-c-brand);
  word-break: break-all !important;
  overflow-wrap: break-word !important;
  white-space: normal !important;
  line-height: 1.4;
  max-width: 100%;
  box-sizing: border-box;
}

/* Enhanced redirect URL container with proper overflow handling */
.redirect-url {
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  color: var(--vp-c-brand);
  word-break: break-all !important;
  overflow-wrap: break-word !important;
  white-space: normal !important;
  line-height: 1.4;
  display: block;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  border: 1px solid rgba(133, 100, 4, 0.2);
  max-width: 100%;
  box-sizing: border-box;
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
  transition: all 0.2s ease;
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
  font-size: 0.75rem;
  color: var(--vp-c-text-1, #333);
  margin-bottom: 0.5rem;
  line-height: 1.3;
  word-break: break-all !important;
  white-space: normal !important;
  overflow: hidden;
  max-width: 100%;
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

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.copy-detail-btn {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.copy-detail-btn:hover {
  background: var(--vp-c-bg, #ffffff);
  border-color: var(--vp-c-brand);
  transform: scale(1.05);
}

.copy-detail-btn img {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}

.copy-detail-btn:hover img {
  opacity: 1;
}

.copy-detail-btn.copied {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.copy-detail-btn.copied img {
  opacity: 1;
  filter: brightness(0) invert(1);
}

.reload-btn {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.reload-btn:hover:not(:disabled) {
  background: var(--vp-c-bg, #ffffff);
  border-color: var(--vp-c-brand);
}

.reload-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reload-btn img {
  width: 16px;
  height: 16px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 1.5px solid rgba(0, 0, 0, 0.1);
  border-top: 1.5px solid var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.detail-url {
  font-size: 1rem;
  color: var(--vp-c-brand);
  margin-bottom: 1.5rem;
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

.detail-error {
  background: #f8d7da;
  color: #721c24;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

/* Enhanced detail-redirect container with proper overflow handling */
.detail-redirect {
  background: #fff3cd;
  color: #856404;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  box-sizing: border-box;
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

.preview-tabs-section {
  margin: 2rem 0;
}

.preview-tabs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
}

.preview-tabs-nav {
  display: flex;
  gap: 0.5rem;
}

.tab-switcher {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.preview-tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2, #64748b);
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;
}

.preview-tab-btn.active {
  background: var(--vp-c-brand);
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preview-tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--vp-c-brand);
}

.preview-tab-btn:hover:not(.active) {
  background: var(--vp-c-bg-soft, #f8f9fa);
  color: var(--vp-c-text-1, #1e293b);
}

.preview-tabs-content {
  min-height: 400px;
}

.preview-tab-panel {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.tab-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
}

.tab-panel-header h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #333);
}

.tab-panel-help {
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.8rem;
  font-style: italic;
  margin-top: 0.5rem;
}

.page-preview-container {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.template-preview-switcher {
  display: flex;
  background: var(--vp-c-bg-soft, #f1f5f9);
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
}

.template-preview-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2, #64748b);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.template-preview-btn img {
  width: 14px;
  height: 14px;
  opacity: 0.7;
}

.template-preview-btn.active {
  background: var(--vp-c-brand);
  color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.template-preview-btn.active img {
  opacity: 1;
  filter: brightness(0) invert(1);
}

.template-preview-btn:hover:not(.active) {
  color: var(--vp-c-text-1, #1e293b);
  background: rgba(255, 255, 255, 0.8);
}

.template-preview-btn:hover:not(.active) img {
  opacity: 1;
}

.template-preview-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid var(--vp-c-border, #e5e7eb);
}

.template-preview-iframe {
  height: 500px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.template-preview-iframe.desktop {
  width: 100%;
  max-width: 800px;
}

.template-preview-iframe.mobile {
  width: 320px;
  max-width: 320px;
}

.template-preview-mobile-hidden {
  display: block;
  font-size: 0.8rem;
  color: var(--vp-c-text-2, #6b7280);
}

.template-preview-mobile-only {
  display: none;
  font-size: 0.8rem;
  color: var(--vp-c-text-2, #6b7280);
}

.no-preview-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 12px;
  padding: 2rem;
  border: 2px dashed var(--vp-c-border, #e5e7eb);
}

.no-preview-content h4 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.1rem;
}

.no-preview-content p {
  margin: 0;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.9rem;
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
}

.modal-container {
  background: var(--vp-c-bg, #fff);
  border-radius: 12px;
  width: 100%;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
  background: var(--vp-c-bg-soft, #f8f9fa);
  flex-shrink: 0;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #333);
}

.close-modal-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--vp-c-text-2, #666);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-modal-btn:hover {
  background: var(--vp-c-border-soft, #eee);
  color: var(--vp-c-text-1, #333);
}

.modal-content {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  max-height: calc(90vh - 80px);
  -webkit-overflow-scrolling: touch;
}

/* Mobile-specific styles for details in modal */
.details-header.mobile {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
}

.copy-detail-btn.mobile,
.reload-btn.mobile {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-left: 0.5rem;
}

.copy-detail-btn.mobile:hover,
.reload-btn.mobile:hover:not(:disabled) {
  background: var(--vp-c-bg, #ffffff);
  border-color: var(--vp-c-brand);
  transform: scale(1.05);
}

.copy-detail-btn.mobile img,
.reload-btn.mobile img {
  width: 18px;
  height: 18px;
  opacity: 0.7;
}

.copy-detail-btn.mobile:hover img,
.reload-btn.mobile:hover:not(:disabled) img {
  opacity: 1;
}

.copy-detail-btn.mobile.copied {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.copy-detail-btn.mobile.copied img {
  opacity: 1;
  filter: brightness(0) invert(1);
}

.reload-btn.mobile:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reload-btn.mobile .spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top: 2px solid var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Mobile URL styling with proper word breaking */
.detail-url.mobile {
  font-size: 0.875rem;
  word-break: break-all !important;
  white-space: normal !important;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 6px;
  text-decoration: none;
  display: block;
  color: var(--vp-c-brand);
  overflow-wrap: anywhere !important;
  hyphens: auto;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.detail-status.mobile {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 6px;
}

.detail-error.mobile {
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  border-radius: 6px;
  background: #f8d7da;
  color: #721c24;
  word-break: break-word;
  line-height: 1.4;
}

/* Mobile redirect container with enhanced overflow handling */
.detail-redirect.mobile {
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  border-radius: 6px;
  background: #fff3cd;
  color: #856404;
  overflow: hidden;
  word-break: break-all;
}

.detail-redirect.mobile .redirect-url {
  word-break: break-all !important;
  white-space: normal !important;
  display: block;
  margin-top: 0.5rem;
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.8rem;
  line-height: 1.3;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  border: 1px solid rgba(133, 100, 4, 0.3);
  max-width: 100%;
  box-sizing: border-box;
  overflow-wrap: anywhere;
  hyphens: auto;
}

.code-location.mobile {
  margin: 1rem 0;
}

.code-snippet.mobile {
  font-size: 0.75rem;
  padding: 1rem;
  max-height: 200px !important;
  overflow-y: auto !important;
  overflow-x: auto !important;
  background: #f8f9fa;
  border: 1px solid var(--vp-c-border, #ddd);
  border-radius: 8px;
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-all;
  -webkit-overflow-scrolling: touch;
}

.soft404-info.mobile {
  background: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.soft404-info.mobile h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.soft404-info.mobile p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.4;
}

/* Modal scrollbar styling */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: var(--vp-c-bg-soft, #f1f1f1);
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: var(--vp-c-border, #ccc);
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-text-2, #999);
}

.code-snippet.mobile::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.code-snippet.mobile::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.code-snippet.mobile::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.code-snippet.mobile::-webkit-scrollbar-thumb:hover {
  background: #999;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 480px) {
  .link-checker-breakout {
    width: 100% !important;
    position: static !important;
    left: auto !important;
    margin-left: 0 !important;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  
  .link-checker {
    padding: 0 0.75rem;
    max-width: 100vw;
  }

  .results-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    margin-bottom: 1.25rem;
    padding: 0 0.75rem;
    align-items: center;
    max-width: 100%;
  }

  .results-header h2 {
    font-size: 1.25rem;
    text-align: center;
    flex: none;
  }

  .back-btn {
    align-self: center;
    padding: 0.6rem 1.25rem;
    font-size: 0.875rem;
    min-height: 44px;
    width: auto;
  }

  .split-view {
    display: block !important;
    height: auto !important;
    min-height: auto !important;
    padding: 0;
    margin: 0;
    max-width: 100%;
    border-radius: 8px;
    overflow: visible;
  }
  
  .form-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  .tool-form {
    padding: 1rem;
    border-radius: 8px;
  }
  
  .form-group textarea {
    font-size: 0.875rem;
    padding: 0.75rem;
    min-height: 120px;
  }

  .results-summary {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 0.5rem;
    padding: 0.75rem;
  }
  
  .summary-item {
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
  }
  
  .summary-item .count {
    font-size: 1.2rem;
    margin-bottom: 0.375rem;
  }
  
  .summary-item .label {
    font-size: 0.75rem;
  }

  .modal-container {
    max-width: 95vw;
    max-height: 95vh;
  }
  
  .modal-content {
    padding: 1rem;
    max-height: calc(95vh - 70px);
  }
  
  .code-snippet.mobile {
    max-height: 150px !important;
    font-size: 0.7rem;
  }

  .results-panel {
    min-height: 250px !important;
  }
  
  .results-list {
    max-height: 300px !important;
    min-height: 150px !important;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .results-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    margin-bottom: 1.25rem;
    padding: 0 1.5rem;
    align-items: center;
    max-width: 1200px;
  }

  .results-header h2 {
    font-size: 1.375rem;
    text-align: center;
    flex: none;
  }

  .split-view {
    max-width: 1200px;
  }

  .results-summary {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.5rem;
    padding: 0.75rem;
  }

  .summary-item {
    padding: 0.6rem 0.4rem;
    font-size: 0.75rem;
  }

  .summary-item .count {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .summary-item .label {
    font-size: 0.65rem;
  }

  .modal-container {
    max-width: 85vw;
    max-height: 90vh;
  }
  
  .code-snippet.mobile {
    max-height: 180px !important;
  }

  /* Mobile responsive adjustments for tab switchers */
  .preview-tabs-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .tab-switcher {
    margin-left: 0;
    justify-content: center;
  }
  
  .preview-switcher,
  .template-preview-switcher {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .link-checker-breakout {
    width: 100% !important;
    position: static !important;
    left: auto !important;
    margin-left: 0 !important;
    overflow-x: hidden;
  }
  
  .link-checker {
    padding: 0 1rem;
    max-width: 100vw;
  }

  .form-stage {
    padding: 1rem 0;
    min-height: auto;
  }

  .tool-form {
    padding: 1.25rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
  }

  .form-title {
    font-size: 1.375rem;
    margin-bottom: 1.25rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .form-group input,
  .form-group textarea {
    padding: 0.75rem;
    font-size: 0.9rem;
    border-radius: 6px;
  }
  
  .form-group textarea {
    min-height: 150px;
    font-size: 0.8rem;
  }

  .preview-container,
  .preview-header {
    display: none !important;
  }

  .preview-tabs-section {
    display: none !important;
  }

  .mobile-hidden-message {
    display: none !important;
  }

  .mobile-only-message {
    display: block !important;
  }

  .template-preview-mobile-hidden {
    display: none !important;
  }
  
  .template-preview-mobile-only {
    display: block !important;
  }

  .extracted-links {
    max-height: 180px;
    padding: 0;
    border: none;
    background: transparent;
    gap: 0.5rem;
  }

  .extracted-link {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    background: var(--vp-c-bg-soft, #f8f9fa);
    border: 1px solid var(--vp-c-border-soft, #e5e7eb);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .link-info {
    flex: 1;
    min-width: 0;
    margin-right: 0.75rem;
  }

  .link-url {
    white-space: normal !important;
    word-break: break-all !important;
    text-overflow: initial !important;
    font-size: 0.8rem;
    line-height: 1.3;
    overflow: visible;
  }

  .link-text {
    font-size: 0.75rem;
    margin-top: 0.25rem;
    line-height: 1.2;
  }

  .copy-link-btn {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
    flex-shrink: 0;
    align-self: flex-start;
  }

  .copy-link-btn img {
    width: 14px;
    height: 14px;
  }

  .results-panel {
    width: 100% !important;
    min-width: auto !important;
    height: auto !important;
    min-height: 300px;
    border-right: none;
    border-radius: 8px;
    overflow: hidden;
    display: flex !important;
    flex-direction: column;
  }

  .details-panel {
    display: none !important;
  }

  .results-summary {
    flex-shrink: 0 !important;
    border-bottom: 1px solid var(--vp-c-border-soft, #eee);
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--vp-c-bg, #fff);
  }
  
  .results-list {
    flex: 1 !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    padding: 0.5rem;
    min-height: 300px !important;
    max-height: 60vh !important;
    -webkit-overflow-scrolling: touch !important;
    overscroll-behavior: contain !important;
  }

  .result-item {
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    border: 1px solid var(--vp-c-border-soft, #e5e7eb);
    flex-shrink: 0;
    min-height: 80px;
  }

  .result-status {
    margin-bottom: 0.375rem;
  }

  .status-text {
    font-size: 0.75rem;
  }

  .result-url {
    font-size: 0.7rem;
    white-space: normal !important;
    word-break: break-all !important;
    line-height: 1.3;
    margin-bottom: 0.375rem;
  }

  .result-meta {
    font-size: 0.65rem;
    gap: 0.5rem;
  }

  .captcha-container {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }

  .captcha-image-container {
    min-height: 60px;
    padding: 0.75rem;
  }

  .refresh-captcha-btn {
    width: 100%;
    height: 3rem;
    align-self: center;
    max-width: 120px;
  }

  .check-btn {
    padding: 1rem 1.5rem;
    font-size: 1rem;
    min-height: 48px;
  }

  .btn-loading {
    gap: 0.75rem;
  }

  .loading-spinner {
    width: 16px;
    height: 16px;
    border-width: 2px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .link-checker {
    padding: 0 1.5rem;
  }

  .results-header {
    max-width: 1200px;
    padding: 0 1.5rem;
  }

  .split-view {
    max-width: 1200px;
  }

  .results-summary {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.6rem;
    padding: 0.875rem;
  }

  .summary-item {
    padding: 0.7rem 0.5rem;
    font-size: 0.8rem;
  }

  .split-view {
    display: flex !important;
    flex-direction: row;
    height: auto;
    min-height: 600px;
  }

  .results-panel {
    width: 350px !important;
    min-width: 350px !important;
    max-height: 600px;
    overflow: hidden;
  }

  .details-panel {
    flex: 1;
    min-height: 600px;
    display: block !important;
  }

  .preview-header,
  .preview-container {
    display: flex;
  }

  .preview-tabs-section {
    display: block;
  }

  .mobile-hidden-message {
    display: block;
  }

  .mobile-only-message {
    display: none;
  }

  .template-preview-mobile-hidden {
    display: block;
  }
  
  .template-preview-mobile-only {
    display: none;
  }

  .html-template-preview.mobile {
    width: 300px;
    max-width: 300px;
  }

  .template-preview-iframe.mobile {
    width: 280px;
    max-width: 280px;
  }

  .template-preview-iframe {
    height: 400px;
  }

  .detail-preview {
    display: block;
    height: 500px;
  }

  .details-header {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }

  .header-actions {
    display: flex;
    gap: 0.5rem;
  }
}

@media (min-width: 1025px) {
  .results-header {
    max-width: 1600px;
    padding: 0 clamp(1rem, 5vw, 4rem);
  }

  .split-view {
    max-width: 1600px;
  }

  .results-summary {
    display: flex !important;
    gap: 0.75rem;
  }
  
  .summary-item {
    flex: 1;
  }

  .details-panel {
    display: block !important;
  }

  .html-template-preview.mobile {
    width: 375px;
    max-width: 375px;
  }

  .template-preview-iframe.mobile {
    width: 320px;
    max-width: 320px;
  }
}

@media (max-width: 1400px) {
  .results-header {
    max-width: 1200px;
  }

  .split-view {
    max-width: 1200px;
  }
  
  .results-panel {
    width: 450px;
    min-width: 400px;
  }
  
  .detail-preview {
    height: 500px;
  }
}

@media (max-width: 1800px) {
  .detail-preview {
    height: 600px;
  }
  
  .results-header {
    max-width: 1400px;
  }

  .split-view {
    max-width: 1400px;
  }
}
</style>

