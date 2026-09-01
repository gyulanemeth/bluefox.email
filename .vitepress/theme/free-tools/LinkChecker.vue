<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { checkLinks, getPagePreview  } from '../../../connectors/bluefoxEmailToolsApi.js'
import { isSessionValid } from '../../../connectors/turnstileSession.js'
import Turnstile from './Turnstile.vue'

const htmlTemplate = ref('')
const loading = ref(false)
const result = ref(null)
const errorMessage = ref('')
const extractedLinks = ref([])

const selectedResult = ref(null)
const selectedIndex = ref(0)
const activeDetailsTab = ref('page-preview')

// Turnstile state
const turnstileRef = ref(null)
const turnstileToken = ref('')

const loadingStates = ref({})
const reloadKeys = ref({})

const previewMode = ref('desktop')
const templatePreviewMode = ref('desktop')

const showModal = ref(false)
const isMobile = ref(false)

const pagePreviewUrl = ref('')
const loadingPreview = ref(false)

const isFormDisabled = computed(() => {
  if (loading.value) {
    return true
  }
  return false
})

const shouldUseModal = computed(() => {
  if (!isMobile.value) {
    return false
  }
  if (window.innerWidth <= 768) {
    return true
  }
  return false
})

// Aggregate counts for the results summary row.
const stats = computed(() => {
  const list = result.value || []

  function count(status) {
    return list.filter(item => item.status === status).length
  }

  return {
    total: list.length,
    working: count('working'),
    broken: count('broken'),
    error: count('error'),
    redirect: count('redirect'),
    soft404: count('soft404')
  }
})

function extractLinksFromHTML(html) {
  if (!html || typeof html !== 'string') {
    return []
  }

  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const anchors = Array.from(doc.querySelectorAll('a[href]'))
    const links = anchors.map(a => {
      return {
        href: a.getAttribute('href'),
        text: a.textContent?.trim() || 'No anchor text'
      }
    }).filter(link => {
      if (!link.href) {
        return false
      }
      const trimmed = link.href.trim()
      if (!trimmed) {
        return false
      }
      if (trimmed.startsWith('#')) {
        return false
      }
      if (trimmed.startsWith('mailto:')) {
        return false
      }
      return true
    }).map(link => {
      return {
        href: link.href.trim(),
        text: link.text
      }
    })

    return links

  } catch {
    return []
  }
}

// Label + semantic tone for a link status. Tone drives all status coloring so
// light/dark palettes stay consistent.
function statusMeta(status) {
  const map = {
    working: {
      label: 'Working',
      tone: 'positive'
    },
    broken: {
      label: 'Broken',
      tone: 'negative'
    },
    error: {
      label: 'Error',
      tone: 'negative'
    },
    redirect: {
      label: 'Redirect',
      tone: 'warning'
    },
    soft404: {
      label: 'Soft 404',
      tone: 'warning'
    }
  }

  if (map[status]) {
    return map[status]
  }

  return {
    label: 'Unknown',
    tone: 'neutral'
  }
}

function selectResult(item, index) {
  selectedResult.value = item
  selectedIndex.value = index

  if (shouldUseModal.value) {
    showModal.value = true
  }

  updatePagePreviewUrl(item)
}

function closeModal() {
  showModal.value = false
}

function getCodeSnippetForLink(url) {
  if (!htmlTemplate.value) {
    return ''
  }

  const lines = htmlTemplate.value.split('\n')
  const lineIndex = lines.findIndex(line => line.includes(url))

  if (lineIndex === -1) {
    return ''
  }

  const start = Math.max(0, lineIndex - 2)
  const end = Math.min(lines.length, lineIndex + 3)
  const segment = lines.slice(start, end)

  const snippet = segment.map((line, idx) => {
    const actualLine = start + idx + 1
    const isTarget = (start + idx) === lineIndex
    const escapedLine = line.replace(/</g, '&lt;').replace(/>/g, '&gt;')

    if (isTarget) {
      return `<span class="line-number">${actualLine}:</span> <mark class="highlight-line">${escapedLine}</mark>`
    }

    return `<span class="line-number">${actualLine}:</span> ${escapedLine}`

  }).join('\n')

  return snippet
}

async function copyToClipboard(text, event = null) {
  try {
    await navigator.clipboard.writeText(text)

    let button = null

    if (event && event.target) {
      button = event.target.closest('button')
    }

    if (!button) {
      const buttons = document.querySelectorAll('.lc-icon-btn')
      buttons.forEach(btn => {
        if (btn.title?.includes(text)) {
          button = btn
        }
      })
    }

    if (button) {
      button.classList.add('copied')
      setTimeout(() => {
        button.classList.remove('copied')
      }, 1000)
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

function getHighlightedTemplate(url) {
  if (!htmlTemplate.value || !url) {
    return ''
  }

  // Escape the target only for safe embedding inside a single-quoted JS string.
  const target = url.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

  // Highlight inside the iframe with JS rather than CSS attribute selectors:
  // the backend may normalize the URL (e.g. add a trailing slash), so we compare
  // each anchor's raw href AND its browser-resolved href against the target,
  // ignoring a trailing slash. Inline styles beat any template CSS, and we scroll
  // the first match into view.
  const script = [
    '<scr' + 'ipt>',
    '(function () {',
    '  function normalize(value) {',
    '    if (!value) {',
    '      return ""',
    '    }',
    '    return value.trim().replace(/\\/+$/, "")',
    '  }',
    "  var target = normalize('" + target + "')",
    '  function highlight() {',
    '    var anchors = document.querySelectorAll("a[href]")',
    '    var first = null',
    '    for (var i = 0; i < anchors.length; i++) {',
    '      var anchor = anchors[i]',
    '      var raw = normalize(anchor.getAttribute("href"))',
    '      var resolved = normalize(anchor.href)',
    '      if (raw === target || resolved === target) {',
    '        anchor.style.setProperty("outline", "2px solid #ff0000", "important")',
    '        anchor.style.setProperty("outline-offset", "2px", "important")',
    '        anchor.style.setProperty("background-color", "rgba(255, 0, 0, 0.08)", "important")',
    '        if (!first) {',
    '          first = anchor',
    '        }',
    '      }',
    '    }',
    '    if (first) {',
    '      setTimeout(function () {',
    '        first.scrollIntoView({ behavior: "smooth", block: "center" })',
    '      }, 120)',
    '    }',
    '  }',
    '  if (document.readyState === "loading") {',
    '    document.addEventListener("DOMContentLoaded", highlight)',
    '  } else {',
    '    highlight()',
    '  }',
    '})()',
    '</scr' + 'ipt>'
  ].join('\n')

  return htmlTemplate.value + script
}

async function getPagePreviewDataUrl(url) {
  if (!url || !url.trim()) {
    return ''
  }

  loadingPreview.value = true

  try {
    const data = await getPagePreview(url)

    if (data.result && data.result.dataUrl) {
      return data.result.dataUrl
    }

    if (data.result && data.result.error) {
      console.warn('Proxy returned error:', data.result.error)
      return ''
    }

    throw new Error('No dataUrl returned from proxy')

  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      console.error('Backend server is not running or not accessible')
      console.error('Please ensure your API server is running')
    } else {
      console.error('Error getting page preview:', error)
    }
    return ''
  } finally {
    setTimeout(() => {
      loadingPreview.value = false
    }, 500)
  }
}

async function updatePagePreviewUrl(item) {
  if (!item) {
    pagePreviewUrl.value = ''
    loadingPreview.value = false
    return
  }

  const validStatuses = ['working', 'broken', 'error', 'redirect', 'soft404']
  if (validStatuses.includes(item.status)) {
    loadingPreview.value = true
    pagePreviewUrl.value = await getPagePreviewDataUrl(item.url)
  } else {
    pagePreviewUrl.value = ''
    loadingPreview.value = false
  }
}

function onTurnstileVerified(token) {
  turnstileToken.value = token
}

function onTurnstileInvalid() {
  turnstileToken.value = ''
}

function resetTurnstile() {
  turnstileToken.value = ''
  turnstileRef.value?.reset()
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

  return true
}

async function reloadSelectedResult() {
  if (!selectedResult.value) {
    return
  }

  loadingStates.value = {
    ...loadingStates.value,
    [selectedIndex.value]: true
  }

  try {
    if (!isSessionValid()) {
      turnstileToken.value = await turnstileRef.value.getToken()
    }

    const data = await checkLinks({
      urls: [selectedResult.value.url],
      turnstileToken: turnstileToken.value
    })

    if (data.result?.links?.length > 0 && result.value) {
      const updated = data.result.links[0]
      const idx = result.value.findIndex(r => r.url === updated.url)

      if (idx !== -1) {
        result.value[idx] = updated
        selectedResult.value = updated
        reloadKeys.value = {
          ...reloadKeys.value,
          [selectedIndex.value]: (reloadKeys.value[selectedIndex.value] || 0) + 1
        }
        await updatePagePreviewUrl(updated)
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
    // Token is single-use; clear it so the next action requires a fresh one.
    resetTurnstile()
    loadingStates.value = {
      ...loadingStates.value,
      [selectedIndex.value]: false
    }
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

    if (!isSessionValid()) {
      turnstileToken.value = await turnstileRef.value.getToken()
    }

    const urlsToCheck = extractedLinks.value.map(l => l.href)

    const data = await checkLinks({
      urls: urlsToCheck,
      turnstileToken: turnstileToken.value
    })

    result.value = data.result.links
    resetTurnstile()
    await nextTick()
    window.scrollTo({ top: 0, behavior: 'smooth' })

  } catch (err) {
    errorMessage.value = err.message || 'Network error. Please try again.'

    if (err.status === 401) {
      resetTurnstile()
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
  loadingPreview.value = false
}

function handleResize() {
  isMobile.value = window.innerWidth <= 768

  if (!isMobile.value) {
    showModal.value = false
  }
}

watch(result, (newResult) => {
  if (newResult && newResult.length > 0) {
    selectedIndex.value = 0
    selectedResult.value = newResult[0]
  }
})

watch(
  [selectedResult, activeDetailsTab],
  async ([item, tab]) => {
    if (!item) {
      pagePreviewUrl.value = ''
      loadingPreview.value = false
      return
    }

    if (tab === 'template-preview') {
      return
    }

    if (tab === 'page-preview') {
      await updatePagePreviewUrl(item)
    }
  },
  { immediate: true }
)

watch(htmlTemplate, (newTemplate) => {
  extractedLinks.value = extractLinksFromHTML(newTemplate)
}, { immediate: true })

onMounted(async () => {
  await nextTick()
  handleResize()

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="link-checker">
    <!-- ============================ FORM STAGE ============================ -->
    <div v-if="!result" class="lc-form-stage">
      <header class="lc-hero">
        <a href="/tools/content/" class="lc-hero-crumb">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Content tools
        </a>
        <div class="lc-hero-band">
          <span class="lc-hero-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </span>
          <div class="lc-hero-copy">
            <h1 class="lc-hero-title">Free Link Checker</h1>
            <p class="lc-hero-sub">Validate every link in your email template — catch broken URLs, redirects, and soft 404s before you hit send.</p>
          </div>
        </div>
      </header>

      <form class="lc-card" @submit.prevent="checkLinksHandler">
        <!-- Template input -->
        <div class="lc-field">
          <label for="htmlTemplate">HTML email template</label>
          <textarea
            id="htmlTemplate"
            v-model="htmlTemplate"
            rows="12"
            placeholder="Paste your HTML email template here…&#10;&#10;<a href='https://example.com'>Visit Example</a>"
            :disabled="loading"
            spellcheck="false"
            required
          ></textarea>
          <small class="lc-hint">All hyperlinks are extracted and checked automatically.</small>
        </div>

        <!-- Template live preview -->
        <div v-if="htmlTemplate.trim()" class="lc-field">
          <div class="lc-field-head">
            <label>Template preview</label>
            <div class="lc-segmented" role="group" aria-label="Preview device">
              <button type="button" @click="previewMode = 'desktop'" :class="['lc-seg-btn', { active: previewMode === 'desktop' }]" title="Desktop preview">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <span>Desktop</span>
              </button>
              <button type="button" @click="previewMode = 'mobile'" :class="['lc-seg-btn', { active: previewMode === 'mobile' }]" title="Mobile preview">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                <span>Mobile</span>
              </button>
            </div>
          </div>
          <div class="lc-preview-frame">
            <iframe
              :srcdoc="htmlTemplate"
              :class="['lc-iframe', previewMode]"
              sandbox="allow-scripts allow-same-origin"
              title="HTML template live preview"
            ></iframe>
          </div>
          <small class="lc-hint lc-desktop-only">Live preview of your template. Switch views to see desktop and mobile rendering.</small>
          <small class="lc-hint lc-mobile-only">Preview is hidden on mobile for performance — use a desktop or tablet.</small>
        </div>

        <!-- Extracted links -->
        <div v-if="extractedLinks.length > 0" class="lc-field">
          <div class="lc-field-head">
            <label>Extracted links <span class="lc-count">{{ extractedLinks.length }}</span></label>
          </div>
          <div class="lc-links">
            <div v-for="(link, index) in extractedLinks" :key="index" class="lc-link">
              <div class="lc-link-main">
                <span class="lc-link-url" :title="link.href">{{ link.href }}</span>
                <span class="lc-link-text">{{ link.text }}</span>
              </div>
              <button
                type="button"
                @click="copyToClipboard(link.href, $event)"
                class="lc-icon-btn"
                :title="`Copy ${link.href} to clipboard`"
                aria-label="Copy link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </div>
          </div>
          <small class="lc-hint">These links are checked on submit. Click the copy icon to copy a URL.</small>
        </div>

        <div v-else-if="htmlTemplate.trim()" class="lc-alert lc-alert-warn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <div>
            <p>No valid links found in your template.</p>
            <small>Make sure your HTML contains &lt;a href="…"&gt; tags with real URLs.</small>
          </div>
        </div>

        <Turnstile
          ref="turnstileRef"
          class="lc-turnstile"
          @verified="onTurnstileVerified"
          @expired="onTurnstileInvalid"
          @error="onTurnstileInvalid"
        />

        <button
          type="submit"
          class="lc-submit"
          :disabled="isFormDisabled || (extractedLinks.length === 0)"
        >
          <span v-if="loading" class="lc-btn-loading"><span class="lc-spinner"></span> Checking…</span>
          <span v-else>Check {{ extractedLinks.length }} {{ extractedLinks.length === 1 ? 'link' : 'links' }}</span>
        </button>

        <div v-if="errorMessage" class="lc-error">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {{ errorMessage }}
        </div>
      </form>
    </div>

    <!-- ============================ RESULTS STAGE ============================ -->
    <div v-else class="lc-results-stage">
      <div class="lc-results-inner">
        
        <!-- UPDATED HEADER (Option 1) -->
        <div class="lc-results-head">
          <button @click="resetToForm" class="lc-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Back to form</span>
          </button>
          <h2>Link check results</h2>
        </div>

        <!-- Summary stat row -->
        <div class="lc-stats">
          <div class="lc-stat">
            <span class="lc-stat-num">{{ stats.total }}</span>
            <span class="lc-stat-label">Total</span>
          </div>
          <div class="lc-stat" data-tone="positive">
            <span class="lc-stat-num">{{ stats.working }}</span>
            <span class="lc-stat-label">Working</span>
          </div>
          <div class="lc-stat" data-tone="negative">
            <span class="lc-stat-num">{{ stats.broken }}</span>
            <span class="lc-stat-label">Broken</span>
          </div>
          <div class="lc-stat" data-tone="negative">
            <span class="lc-stat-num">{{ stats.error }}</span>
            <span class="lc-stat-label">Errors</span>
          </div>
          <div v-if="stats.redirect" class="lc-stat" data-tone="warning">
            <span class="lc-stat-num">{{ stats.redirect }}</span>
            <span class="lc-stat-label">Redirects</span>
          </div>
          <div v-if="stats.soft404" class="lc-stat" data-tone="warning">
            <span class="lc-stat-num">{{ stats.soft404 }}</span>
            <span class="lc-stat-label">Soft 404</span>
          </div>
        </div>

        <div class="lc-split">
          <!-- Results list -->
          <aside class="lc-list-panel">
            <div class="lc-list">
              <button
                v-for="(linkResult, index) in result"
                :key="index"
                type="button"
                @click="selectResult(linkResult, index)"
                :class="['lc-row', { selected: selectedResult && selectedResult.url === linkResult.url }]"
                :data-tone="statusMeta(linkResult.status).tone"
              >
                <span class="lc-row-status">
                  <span class="lc-dot" :data-tone="statusMeta(linkResult.status).tone"></span>
                  {{ statusMeta(linkResult.status).label }}
                </span>
                <span class="lc-row-url" :title="linkResult.url">{{ linkResult.url }}</span>
                <span class="lc-row-meta">
                  <span v-if="linkResult.statusCode" class="lc-chip">{{ linkResult.statusCode }}</span>
                  <span class="lc-chip lc-chip-muted">{{ linkResult.responseTime }}ms</span>
                </span>
              </button>
            </div>
          </aside>

          <!-- Detail panel -->
          <section class="lc-detail-panel">
            <div v-if="selectedResult" class="lc-detail">
              <!-- Selected link hero -->
              <div class="lc-detail-hero" :data-tone="statusMeta(selectedResult.status).tone">
                <div class="lc-detail-hero-top">
                  <span class="lc-status-pill" :data-tone="statusMeta(selectedResult.status).tone">
                    <span class="lc-dot" :data-tone="statusMeta(selectedResult.status).tone"></span>
                    {{ statusMeta(selectedResult.status).label }}
                  </span>
                  <div class="lc-detail-actions">
                    <button @click="copyToClipboard(selectedResult.url, $event)" class="lc-icon-btn" :title="`Copy ${selectedResult.url} to clipboard`" aria-label="Copy URL">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                    <button @click="reloadSelectedResult" :disabled="loadingStates[selectedIndex]" class="lc-icon-btn" title="Re-check this link" aria-label="Re-check link">
                      <svg v-if="!loadingStates[selectedIndex]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                      <span v-else class="lc-spinner lc-spinner-dark"></span>
                    </button>
                  </div>
                </div>
                <a :href="selectedResult.url" target="_blank" rel="noopener noreferrer" class="lc-detail-url" :title="selectedResult.url">
                  {{ selectedResult.url }}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
                <div class="lc-detail-meta">
                  <span v-if="selectedResult.statusCode" class="lc-chip">HTTP {{ selectedResult.statusCode }}</span>
                  <span class="lc-chip lc-chip-muted">{{ selectedResult.responseTime }}ms</span>
                </div>
              </div>

              <!-- Diagnostics -->
              <div v-if="selectedResult.error" class="lc-alert lc-alert-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <div><strong>Error:</strong> {{ selectedResult.error }}</div>
              </div>

              <div v-if="selectedResult.finalUrl && selectedResult.finalUrl !== selectedResult.url" class="lc-alert lc-alert-warn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                <div class="lc-redirect">
                  <div class="lc-redirect-head">
                    <strong>Redirects to</strong>
                    <button @click="copyToClipboard(selectedResult.finalUrl, $event)" class="lc-icon-btn lc-icon-btn-sm" :title="`Copy ${selectedResult.finalUrl}`" aria-label="Copy final URL">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                  </div>
                  <span class="lc-redirect-url">{{ selectedResult.finalUrl }}</span>
                </div>
              </div>

              <!-- Preview tabs -->
              <div class="lc-tabs">
                <div class="lc-tabs-head">
                  <div class="lc-tabs-nav" role="tablist">
                    <button
                      role="tab"
                      @click="activeDetailsTab = 'page-preview'"
                      :class="['lc-tab', { active: activeDetailsTab === 'page-preview' }]"
                    >Page preview</button>
                    <button
                      role="tab"
                      @click="activeDetailsTab = 'template-preview'"
                      :class="['lc-tab', { active: activeDetailsTab === 'template-preview' }]"
                    >Link location</button>
                  </div>

                  <div v-if="activeDetailsTab === 'page-preview'" class="lc-segmented" role="group" aria-label="Preview device">
                    <button type="button" @click="previewMode = 'desktop'" :class="['lc-seg-btn', { active: previewMode === 'desktop' }]" title="Desktop">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      <span>Desktop</span>
                    </button>
                    <button type="button" @click="previewMode = 'mobile'" :class="['lc-seg-btn', { active: previewMode === 'mobile' }]" title="Mobile">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                      <span>Mobile</span>
                    </button>
                  </div>

                  <div v-if="activeDetailsTab === 'template-preview'" class="lc-segmented" role="group" aria-label="Preview device">
                    <button type="button" @click="templatePreviewMode = 'desktop'" :class="['lc-seg-btn', { active: templatePreviewMode === 'desktop' }]" title="Desktop">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      <span>Desktop</span>
                    </button>
                    <button type="button" @click="templatePreviewMode = 'mobile'" :class="['lc-seg-btn', { active: templatePreviewMode === 'mobile' }]" title="Mobile">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                      <span>Mobile</span>
                    </button>
                  </div>
                </div>

                <!-- Page preview panel -->
                <div v-if="activeDetailsTab === 'page-preview'" class="lc-tab-panel">
                  <div class="lc-preview-frame">
                    <div v-if="loadingPreview" :class="['lc-skeleton', previewMode]">
                      <div class="lc-sk-bar" style="height:52px;margin-bottom:1.5rem"></div>
                      <div class="lc-sk-bar"></div>
                      <div class="lc-sk-bar"></div>
                      <div class="lc-sk-bar" style="width:60%"></div>
                      <div class="lc-sk-bar" style="height:160px;margin:0.5rem 0"></div>
                      <div class="lc-sk-bar"></div>
                      <div class="lc-sk-bar" style="width:70%"></div>
                    </div>
                    <iframe
                      v-else-if="pagePreviewUrl"
                      :key="`detail-${selectedIndex}-${reloadKeys[selectedIndex] || 0}-${previewMode}`"
                      :src="pagePreviewUrl"
                      :class="['lc-iframe', previewMode]"
                      sandbox="allow-scripts allow-same-origin"
                      title="Page content preview"
                      @load="loadingPreview = false"
                    ></iframe>
                    <div v-else class="lc-empty-preview">
                      <h4>No page preview available</h4>
                      <p>Page preview is only available for links that return content.</p>
                    </div>
                  </div>
                  <small class="lc-hint lc-mobile-only">Page preview is hidden on mobile for performance — use a desktop or tablet.</small>
                </div>

                <!-- Link location panel -->
                <div v-if="activeDetailsTab === 'template-preview'" class="lc-tab-panel">
                  <div class="lc-preview-frame">
                    <iframe
                      :srcdoc="getHighlightedTemplate(selectedResult.url)"
                      :class="['lc-iframe', templatePreviewMode]"
                      sandbox="allow-scripts allow-same-origin"
                      title="Template preview with highlighted link"
                    ></iframe>
                  </div>
                  <small class="lc-hint lc-desktop-only">The selected link is highlighted with a red outline in your original template.</small>
                  <small class="lc-hint lc-mobile-only">Template preview is hidden on mobile for performance — use a desktop or tablet.</small>
                </div>
              </div>

              <!-- Code location (always visible for broken/error) -->
              <div v-if="selectedResult.status === 'broken' || selectedResult.status === 'error'" class="lc-code">
                <h4>Code location</h4>
                <pre class="lc-code-snippet" v-html="getCodeSnippetForLink(selectedResult.url)"></pre>
              </div>

              <div v-if="selectedResult.status === 'soft404'" class="lc-alert lc-alert-warn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <div>
                  <strong>Soft 404 detected.</strong>
                  <p>This page returns HTTP 200 but shows generic homepage content instead of the requested page — a sign the page doesn't really exist.</p>
                </div>
              </div>
            </div>

            <div v-else class="lc-empty">
              <h3>Select a link</h3>
              <p>Pick any link on the left to inspect its details here.</p>
            </div>
          </section>
        </div>
      </div>

      <!-- Mobile modal -->
      <div v-if="showModal && selectedResult" class="lc-modal-overlay" @click="closeModal">
        <div class="lc-modal" @click.stop>
          <div class="lc-modal-head">
            <span class="lc-status-pill" :data-tone="statusMeta(selectedResult.status).tone">
              <span class="lc-dot" :data-tone="statusMeta(selectedResult.status).tone"></span>
              {{ statusMeta(selectedResult.status).label }}
            </span>
            <button @click="closeModal" class="lc-modal-close" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="lc-modal-body">
            <div class="lc-detail-actions lc-detail-actions-end">
              <button @click="copyToClipboard(selectedResult.url, $event)" class="lc-icon-btn" :title="`Copy ${selectedResult.url}`" aria-label="Copy URL">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
              <button @click="reloadSelectedResult" :disabled="loadingStates[selectedIndex]" class="lc-icon-btn" title="Re-check this link" aria-label="Re-check link">
                <svg v-if="!loadingStates[selectedIndex]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                <span v-else class="lc-spinner lc-spinner-dark"></span>
              </button>
            </div>

            <a :href="selectedResult.url" target="_blank" rel="noopener noreferrer" class="lc-detail-url" :title="selectedResult.url">
              {{ selectedResult.url }}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>

            <div class="lc-detail-meta">
              <span v-if="selectedResult.statusCode" class="lc-chip">HTTP {{ selectedResult.statusCode }}</span>
              <span class="lc-chip lc-chip-muted">{{ selectedResult.responseTime }}ms</span>
            </div>

            <div v-if="selectedResult.error" class="lc-alert lc-alert-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <div><strong>Error:</strong> {{ selectedResult.error }}</div>
            </div>

            <div v-if="selectedResult.finalUrl && selectedResult.finalUrl !== selectedResult.url" class="lc-alert lc-alert-warn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              <div class="lc-redirect">
                <div class="lc-redirect-head">
                  <strong>Redirects to</strong>
                  <button @click="copyToClipboard(selectedResult.finalUrl, $event)" class="lc-icon-btn lc-icon-btn-sm" :title="`Copy ${selectedResult.finalUrl}`" aria-label="Copy final URL">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                </div>
                <span class="lc-redirect-url">{{ selectedResult.finalUrl }}</span>
              </div>
            </div>

            <div v-if="selectedResult.status === 'broken' || selectedResult.status === 'error'" class="lc-code">
              <h4>Code location</h4>
              <pre class="lc-code-snippet" v-html="getCodeSnippetForLink(selectedResult.url)"></pre>
            </div>

            <div v-if="selectedResult.status === 'soft404'" class="lc-alert lc-alert-warn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <div><strong>Soft 404 detected.</strong><p>This page returns the homepage content instead of the requested page.</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ======================================================================
   Design tokens — semantic status colors that flip for dark mode.
   ====================================================================== */
.link-checker {
  --lc-radius: 12px;
  --lc-radius-sm: 8px;
  --lc-positive: #16a34a;
  --lc-negative: #dc2626;
  --lc-warning: #d97706;
  --lc-neutral: var(--vp-c-text-3, #9ca3af);
  --lc-positive-soft: rgba(22, 163, 74, 0.1);
  --lc-negative-soft: rgba(220, 38, 38, 0.09);
  --lc-warning-soft: rgba(217, 119, 6, 0.09);
  --lc-positive-border: rgba(22, 163, 74, 0.22);
  --lc-negative-border: rgba(220, 38, 38, 0.2);
  --lc-warning-border: rgba(217, 119, 6, 0.22);

  color: var(--vp-c-text-1);
}

:global(.dark) .link-checker {
  --lc-positive: #4ade80;
  --lc-negative: #f87171;
  --lc-warning: #fbbf24;
  --lc-positive-soft: rgba(22, 163, 74, 0.14);
  --lc-negative-soft: rgba(220, 38, 38, 0.14);
  --lc-warning-soft: rgba(217, 119, 6, 0.14);
  --lc-positive-border: rgba(74, 222, 128, 0.28);
  --lc-negative-border: rgba(248, 113, 113, 0.28);
  --lc-warning-border: rgba(251, 191, 36, 0.28);
}

/* ============================ FORM STAGE ============================ */
.lc-form-stage {
  max-width: 820px;
  margin: 0 auto;
  padding: 1rem 1rem 3rem;
}

/* Hero — page identity, integrated with the tool */
.lc-hero {
  margin-bottom: 1.75rem;
}

.lc-hero-crumb {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.15s;
}

.lc-hero-crumb:hover {
  color: var(--vp-c-brand);
}

.lc-hero-band {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  padding: 1.5rem 1.75rem;
  border-radius: 16px;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  background: linear-gradient(135deg, hsla(197, 87%, 50%, 0.1), hsla(197, 87%, 50%, 0.02));
}

.lc-hero-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: var(--vp-c-brand);
  color: #fff;
  box-shadow: 0 4px 14px hsla(197, 87%, 50%, 0.35);
}

.lc-hero-copy {
  min-width: 0;
}

/* Guard the h1 against VitePress .vp-doc article heading styles. */
.lc-hero-title {
  margin: 0 0 0.3rem;
  padding: 0;
  border: 0;
  font-size: 1.55rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

.lc-hero-sub {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.lc-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 14px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.lc-field { display: flex; flex-direction: column; }

.lc-field > label,
.lc-field-head label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.lc-field-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.lc-field-head label { margin-bottom: 0; }

.lc-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.4rem;
  height: 1.4rem;
  padding: 0 0.4rem;
  margin-left: 0.35rem;
  border-radius: 999px;
  background: hsla(197, 87%, 50%, 0.12);
  color: var(--vp-c-brand-dark, #0891b2);
  font-size: 0.75rem;
  font-weight: 700;
  vertical-align: middle;
}

:global(.dark) .lc-count { color: var(--vp-c-brand-light); }

.lc-field textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1.5px solid var(--vp-c-border, #e5e7eb);
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: var(--vp-font-family-mono, monospace);
  line-height: 1.5;
  resize: vertical;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.lc-field textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px hsla(197, 87%, 50%, 0.12);
}

.lc-field textarea:disabled {
  background: var(--vp-c-bg-mute, #f1f5f9);
  opacity: 0.6;
  cursor: not-allowed;
}

.lc-hint {
  display: block;
  margin-top: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  line-height: 1.5;
}

.lc-desktop-only { display: block; }
.lc-mobile-only { display: none; }

/* Segmented control (desktop / mobile) */
.lc-segmented {
  display: inline-flex;
  background: var(--vp-c-bg-soft, #f1f5f9);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.lc-seg-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;
}

.lc-seg-btn:hover:not(.active) { color: var(--vp-c-text-1); }

.lc-seg-btn.active {
  background: var(--vp-c-brand);
  color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

/* Iframe preview frame */
.lc-preview-frame {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  border-radius: var(--lc-radius);
  padding: 1.25rem;
  overflow: auto;
}

.lc-iframe {
  height: 560px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: var(--lc-radius-sm);
  background: #fff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: width 0.25s ease, max-width 0.25s ease;
}

.lc-iframe.desktop { width: 100%; max-width: 1100px; }
.lc-iframe.mobile { width: 375px; max-width: 375px; }

/* Extracted links */
.lc-links {
  max-height: 260px;
  overflow-y: auto;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  border-radius: var(--lc-radius-sm);
  background: var(--vp-c-bg);
}

.lc-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.9rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #f1f5f9);
  transition: background 0.15s;
}

.lc-link:last-child { border-bottom: none; }
.lc-link:hover { background: var(--vp-c-bg-soft, #f8f9fa); }

.lc-link-main { min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 0.15rem; }

.lc-link-url {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.82rem;
  color: var(--vp-c-brand);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lc-link-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

/* Icon buttons — unified across the whole tool */
.lc-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  padding: 0;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 7px;
  background: var(--vp-c-bg-soft, #f8f9fa);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.1s;
}

.lc-icon-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.lc-icon-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.lc-icon-btn.copied {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.lc-icon-btn-sm { width: 1.6rem; height: 1.6rem; }

/* Alerts — subtle, semantic, dark-aware */
.lc-alert {
  display: flex;
  gap: 0.7rem;
  padding: 0.875rem 1rem;
  border-radius: var(--lc-radius-sm);
  border: 1px solid transparent;
  font-size: 0.875rem;
  line-height: 1.55;
}

.lc-alert > svg { flex-shrink: 0; margin-top: 0.1rem; }
.lc-alert p { margin: 0.25rem 0 0; }
.lc-alert small { color: var(--vp-c-text-2); font-size: 0.8rem; }

.lc-alert-warn {
  background: var(--lc-warning-soft);
  border-color: var(--lc-warning-border);
  color: var(--vp-c-text-1);
}
.lc-alert-warn > svg { color: var(--lc-warning); }

.lc-alert-error {
  background: var(--lc-negative-soft);
  border-color: var(--lc-negative-border);
  color: var(--vp-c-text-1);
}
.lc-alert-error > svg { color: var(--lc-negative); }

/* Turnstile + submit */
.lc-turnstile { display: flex; justify-content: center; }

.lc-submit {
  width: 100%;
  padding: 0.85rem 2rem;
  border: none;
  border-radius: 10px;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 4px hsla(197, 87%, 50%, 0.3);
  transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
}

.lc-submit:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px hsla(197, 87%, 50%, 0.35);
}

.lc-submit:disabled {
  background: var(--vp-c-bg-mute, #9ca3af);
  color: var(--vp-c-text-2);
  cursor: not-allowed;
  box-shadow: none;
}

.lc-btn-loading { display: inline-flex; align-items: center; gap: 0.5rem; }

.lc-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: lc-spin 0.7s linear infinite;
  display: inline-block;
}

.lc-spinner-dark {
  border-color: rgba(0, 0, 0, 0.12);
  border-top-color: var(--vp-c-brand);
}

@keyframes lc-spin { to { transform: rotate(360deg); } }

.lc-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  background: var(--lc-negative-soft);
  color: var(--lc-negative);
  border: 1px solid var(--lc-negative-border);
  border-radius: var(--lc-radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
}

/* ============================ RESULTS STAGE ============================ */
.lc-results-stage {
  width: 100vw;
  position: relative;
  left: 50%;
  margin-left: -50vw;
  padding: 1rem clamp(1rem, 4vw, 3rem) 3rem;
  box-sizing: border-box;
  overflow-x: hidden;
}

.lc-results-inner {
  max-width: 1400px;
  margin: 0 auto;
}

/* UPDATED HEADER STYLES (Option 1) */
.lc-results-head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--vp-c-border-soft, #e5e7eb);
}

.lc-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin-left: -12px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.lc-back:hover {
  background: var(--vp-c-bg-soft, #f3f4f6);
  color: var(--vp-c-text-1);
}

.lc-results-head h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

/* Stat row */
.lc-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
  gap: 0.625rem;
  margin-bottom: 1.25rem;
}

.lc-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  background: var(--vp-c-bg);
}

.lc-stat[data-tone="positive"] { border-color: var(--lc-positive-border); }
.lc-stat[data-tone="negative"] { border-color: var(--lc-negative-border); }
.lc-stat[data-tone="warning"] { border-color: var(--lc-warning-border); }

.lc-stat-num {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
  color: var(--vp-c-text-1);
}

.lc-stat[data-tone="positive"] .lc-stat-num { color: var(--lc-positive); }
.lc-stat[data-tone="negative"] .lc-stat-num { color: var(--lc-negative); }
.lc-stat[data-tone="warning"] .lc-stat-num { color: var(--lc-warning); }

.lc-stat-label {
  margin-top: 0.3rem;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
}

/* Split view */
.lc-split {
  display: flex;
  height: 760px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: var(--lc-radius);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.lc-list-panel {
  width: 420px;
  min-width: 340px;
  border-right: 1px solid var(--vp-c-border-soft, #eee);
  background: var(--vp-c-bg-alt, #fafafa);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.lc-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lc-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
  text-align: left;
  padding: 0.8rem 0.95rem;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  border-radius: 10px;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.lc-row:hover { border-color: var(--vp-c-border, #d1d5db); }

.lc-row.selected {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px hsla(197, 87%, 50%, 0.12);
}

.lc-row-status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 700;
}

.lc-row[data-tone="positive"] .lc-row-status { color: var(--lc-positive); }
.lc-row[data-tone="negative"] .lc-row-status { color: var(--lc-negative); }
.lc-row[data-tone="warning"] .lc-row-status { color: var(--lc-warning); }
.lc-row[data-tone="neutral"] .lc-row-status { color: var(--vp-c-text-2); }

.lc-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--lc-neutral);
}

.lc-dot[data-tone="positive"] { background: var(--lc-positive); }
.lc-dot[data-tone="negative"] { background: var(--lc-negative); }
.lc-dot[data-tone="warning"] { background: var(--lc-warning); }

.lc-row-url {
  font-size: 0.78rem;
  color: var(--vp-c-text-1);
  line-height: 1.35;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.lc-row-meta { display: flex; gap: 0.4rem; }

.lc-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.12rem 0.45rem;
  border-radius: 5px;
  background: var(--vp-c-bg-soft, #f1f5f9);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.72rem;
  color: var(--vp-c-text-1);
}

.lc-chip-muted { color: var(--vp-c-text-2); }

/* Detail panel */
.lc-detail-panel {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
}

.lc-detail { padding: 1.75rem; display: flex; flex-direction: column; gap: 1.25rem; }

.lc-detail-hero {
  padding: 1.25rem;
  border-radius: var(--lc-radius);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  background: var(--vp-c-bg-soft, #f8f9fa);
}

.lc-detail-hero[data-tone="positive"] { background: var(--lc-positive-soft); border-color: var(--lc-positive-border); }
.lc-detail-hero[data-tone="negative"] { background: var(--lc-negative-soft); border-color: var(--lc-negative-border); }
.lc-detail-hero[data-tone="warning"] { background: var(--lc-warning-soft); border-color: var(--lc-warning-border); }

.lc-detail-hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.875rem;
}

.lc-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  font-size: 0.8rem;
  font-weight: 700;
}

.lc-status-pill[data-tone="positive"] { color: var(--lc-positive); }
.lc-status-pill[data-tone="negative"] { color: var(--lc-negative); }
.lc-status-pill[data-tone="warning"] { color: var(--lc-warning); }
.lc-status-pill[data-tone="neutral"] { color: var(--vp-c-text-2); }

.lc-detail-actions { display: flex; gap: 0.5rem; }
.lc-detail-actions-end { justify-content: flex-end; margin-bottom: 1rem; }

.lc-detail-url {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.875rem;
  color: var(--vp-c-brand);
  text-decoration: none;
  word-break: break-all;
  line-height: 1.45;
}

.lc-detail-url svg { flex-shrink: 0; opacity: 0.7; }
.lc-detail-url:hover { text-decoration: underline; }

.lc-detail-meta { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.875rem; }

.lc-redirect { min-width: 0; flex: 1; }
.lc-redirect-head { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; }

.lc-redirect-url {
  display: block;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  word-break: break-all;
  line-height: 1.4;
}

/* Tabs */
.lc-tabs { display: flex; flex-direction: column; }

.lc-tabs-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
}

.lc-tabs-nav { display: flex; gap: 0.35rem; }

.lc-tab {
  padding: 0.5rem 0.95rem;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.15s, color 0.15s;
}

.lc-tab:hover:not(.active) { background: var(--vp-c-bg-soft, #f8f9fa); color: var(--vp-c-text-1); }

.lc-tab.active {
  background: var(--vp-c-brand);
  color: #fff;
}

.lc-tab-panel { animation: lc-fade 0.25s ease; }

@keyframes lc-fade {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.lc-empty-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
  text-align: center;
  padding: 2rem;
  border: 2px dashed var(--vp-c-border, #e5e7eb);
  border-radius: var(--lc-radius);
}

.lc-empty-preview h4 { margin: 0 0 0.4rem; color: var(--vp-c-text-1); font-size: 1.05rem; }
.lc-empty-preview p { margin: 0; color: var(--vp-c-text-2); font-size: 0.875rem; }

/* Skeleton loader */
.lc-skeleton {
  width: 100%;
  max-width: 1100px;
  height: 560px;
  padding: 1.5rem;
  box-sizing: border-box;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  border-radius: var(--lc-radius-sm);
}

.lc-skeleton.mobile { width: 375px; max-width: 375px; margin: 0 auto; }

.lc-sk-bar {
  height: 18px;
  margin-bottom: 0.75rem;
  border-radius: 5px;
  background: linear-gradient(90deg, var(--vp-c-bg-soft) 25%, var(--vp-c-bg-mute) 50%, var(--vp-c-bg-soft) 75%);
  background-size: 200% 100%;
  animation: lc-shimmer 1.4s infinite;
}

@keyframes lc-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Code snippet */
.lc-code h4 {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.lc-code-snippet {
  margin: 0;
  padding: 1.25rem;
  border-radius: var(--lc-radius-sm);
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.82rem;
  line-height: 1.55;
  white-space: pre-wrap;
  overflow-x: auto;
  color: var(--vp-c-text-1);
}

.lc-code-snippet :deep(.line-number) {
  color: var(--vp-c-text-3, #9ca3af);
  margin-right: 1rem;
  user-select: none;
}

.lc-code-snippet :deep(.highlight-line) {
  background: hsla(45, 100%, 50%, 0.25);
  color: var(--vp-c-text-1);
  padding: 0 4px;
  border-radius: 3px;
}

/* Empty state */
.lc-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--vp-c-text-2);
  padding: 2rem;
}

.lc-empty h3 { margin: 0 0 0.5rem; font-size: 1.2rem; font-weight: 600; color: var(--vp-c-text-1); }
.lc-empty p { margin: 0; font-size: 0.9rem; }

/* ============================ MOBILE MODAL ============================ */
.lc-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
}

.lc-modal {
  width: 100%;
  max-width: 92vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: var(--lc-radius);
  overflow: hidden;
  animation: lc-modal-in 0.25s ease;
}

@keyframes lc-modal-in {
  from { opacity: 0; transform: translateY(-16px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.lc-modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
  background: var(--vp-c-bg-soft, #f8f9fa);
}

.lc-modal-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.lc-modal-close:hover { background: var(--vp-c-bg-mute, #eee); color: var(--vp-c-text-1); }

.lc-modal-body {
  padding: 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  -webkit-overflow-scrolling: touch;
}

/* ============================ RESPONSIVE ============================ */
@media (max-width: 900px) {
  .lc-list-panel { width: 340px; min-width: 300px; }
}

@media (max-width: 768px) {
  .lc-desktop-only { display: none; }
  .lc-mobile-only { display: block; }

  .lc-iframe.desktop,
  .lc-iframe.mobile { width: 100%; max-width: 100%; height: 440px; }

  .lc-split {
    display: block;
    height: auto;
  }

  .lc-list-panel {
    width: 100%;
    min-width: 0;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-border-soft, #eee);
  }

  .lc-list { max-height: 60vh; }

  /* On mobile the detail opens in a modal, so hide the inline panel. */
  .lc-detail-panel { display: none; }
}

@media (max-width: 640px) {
  .lc-card { padding: 1.1rem; }
  .lc-preview-frame { padding: 0.75rem; }
  .lc-hero-band { padding: 1.25rem; gap: 0.875rem; }
  .lc-hero-icon { width: 44px; height: 44px; border-radius: 12px; }
  .lc-hero-title { font-size: 1.35rem; }
}

@media (max-width: 480px) {
  .lc-results-stage {
    width: 100%;
    position: static;
    left: auto;
    margin-left: 0;
    padding: 1rem 0.75rem 2rem;
  }
}
</style>