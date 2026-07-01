<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { analyzeDmarcReport } from '../../../connectors/bluefoxEmailToolsApi.js'
import { isSessionValid } from '../../../connectors/turnstileSession.js'
import Turnstile from './Turnstile.vue'

const MAX_FILENAME_LEN = 30

const xmlPaste  = ref('')
const file      = ref(null)
const fileName  = ref('')
const loading   = ref(false)
const result    = ref(null)
const errorMessage = ref('')

const isDragging = ref(false)
let dragLeaveTimeout = null

const fileInputRef   = ref(null)
const turnstileRef   = ref(null)
const turnstileToken = ref('')

const expandedSources = ref(new Set())
const showRecords     = ref(false)

const isFormDisabled = computed(() =>
  loading.value || (!xmlPaste.value.trim() && !file.value)
)

const truncatedFileName = computed(() => {
  if (!fileName.value) return ''
  if (fileName.value.length <= MAX_FILENAME_LEN) return fileName.value
  return `${fileName.value.slice(0, 15)}...${fileName.value.slice(-10)}`
})

const hasEnvelopeFrom  = computed(() => result.value?.sources?.some(s => s.envelopeFrom != null) ?? false)
const hasSpfScope      = computed(() => result.value?.sources?.some(s => s.spfScope != null) ?? false)
const hasAlignmentData = computed(() => result.value?.sources?.some(s => s.spfAlignment !== undefined) ?? false)

const sourcesGridColumns = computed(() => {
  const cols = ['2fr', '1.5fr', '0.7fr', '1fr', '1fr', '1fr']
  if (hasAlignmentData.value) {
    cols.push('1.2fr', '1.2fr', '0.5fr')
  } else {
    if (hasEnvelopeFrom.value) cols.push('2fr')
    if (hasSpfScope.value)     cols.push('1fr')
  }
  return cols.join(' ')
})

const dkimWarnings    = computed(() => result.value?.warnings?.filter(w => /dkim.*selector|selector.*dkim/i.test(w)) ?? [])
const regularWarnings = computed(() => result.value?.warnings?.filter(w => !/dkim.*selector|selector.*dkim/i.test(w)) ?? [])

const testModeRecommendations  = computed(() => result.value?.recommendations?.filter(r => /policy[_\s]?test[_\s]?mode|test\s?mode/i.test(r)) ?? [])
const forwardingRecommendations = computed(() =>
  result.value?.recommendations?.filter(r => /forwarded mail|forwarding/i.test(r) && !/policy[_\s]?test[_\s]?mode/i.test(r)) ?? []
)
const regularRecommendations = computed(() =>
  result.value?.recommendations?.filter(r =>
    !/policy[_\s]?test[_\s]?mode|test\s?mode/i.test(r) && !forwardingRecommendations.value.includes(r)
  ) ?? []
)

const ALIGNMENT_LABELS  = { aligned: 'Aligned', unaligned: 'Not aligned', mixed: 'Mixed', no_data: 'No data' }
const ALIGNMENT_CLASSES = { aligned: 'pass', unaligned: 'fail', mixed: 'warn', no_data: 'muted' }

function alignmentLabel(v) { return ALIGNMENT_LABELS[v] || v || '-' }
function alignmentClass(v) { return ALIGNMENT_CLASSES[v] || 'muted' }

function authDotClass(status) {
  if (status === 'aligned_pass')   return 'pass'
  if (status === 'unaligned_pass') return 'warn'
  if (status === 'auth_fail')      return 'fail'
  return 'muted'
}

function toggleSource(ip) {
  const next = new Set(expandedSources.value)
  next.has(ip) ? next.delete(ip) : next.add(ip)
  expandedSources.value = next
}

function isSourceExpanded(ip) { return expandedSources.value.has(ip) }

function onTurnstileVerified(token) { turnstileToken.value = token }
function onTurnstileInvalid()       { turnstileToken.value = '' }

function resetTurnstile() {
  turnstileToken.value = ''
  turnstileRef.value?.reset()
}

function validateInputs() {
  if (!xmlPaste.value.trim() && !file.value) {
    errorMessage.value = 'Please paste your DMARC XML or upload an XML file to analyze.'
    return false
  }
  return true
}

function handleDragOver(e) {
  e.preventDefault()
  if (dragLeaveTimeout) clearTimeout(dragLeaveTimeout)
  isDragging.value = true
}

function handleDragLeave(e) {
  e.preventDefault()
  dragLeaveTimeout = setTimeout(() => { isDragging.value = false }, 30)
}

function handleDrop(e) {
  e.preventDefault()
  isDragging.value = false
  const dropped = e.dataTransfer.files[0]
  if (dropped && dropped.name.endsWith('.xml')) {
    file.value = dropped
    fileName.value = dropped.name
    xmlPaste.value = ''
    errorMessage.value = ''
  } else {
    errorMessage.value = 'Only XML files are supported.'
  }
}

function handleFileChange(e) {
  const selected = e.target.files[0]
  if (!selected) { clearFile(); return }
  if (!selected.name.endsWith('.xml')) {
    errorMessage.value = 'Only XML files are supported.'
    clearFile()
    return
  }
  file.value = selected
  fileName.value = selected.name
  xmlPaste.value = ''
  errorMessage.value = ''
}

function clearFile() {
  file.value = null
  fileName.value = ''
  errorMessage.value = ''
}

function formatDateRange(dateRange) {
  if (!dateRange) return 'Unknown'
  if (dateRange.start && dateRange.end) {
    return `${new Date(dateRange.start * 1000).toLocaleString()} – ${new Date(dateRange.end * 1000).toLocaleString()}`
  }
  return typeof dateRange === 'string' ? dateRange : 'Unknown'
}

function formatOverride(reason) {
  return reason.comment ? `${reason.type} (${reason.comment})` : reason.type
}

async function analyzeReport() {
  result.value         = null
  expandedSources.value = new Set()
  showRecords.value    = false
  loading.value        = true
  errorMessage.value   = ''

  try {
    if (!validateInputs()) { loading.value = false; return }

    if (!isSessionValid()) {
      turnstileToken.value = await turnstileRef.value.getToken()
    }

    const data = await analyzeDmarcReport({
      xmlContent: file.value ? null : xmlPaste.value,
      file: file.value,
      turnstileToken: turnstileToken.value,
    })

    const { session, ...analysis } = data.result
    result.value = { ...analysis, valid: true }

    resetTurnstile()
    clearFile()
  } catch (err) {
    errorMessage.value = err.message || 'Network error. Please try again.'
    if (err.status === 401) resetTurnstile()
  } finally {
    loading.value = false
  }
}

onMounted(async () => { await nextTick() })
</script>

<template>
  <div class="dmarc-analyzer">

    <!-- ── Upload form ── -->
    <div class="upload-card"
      :class="{ 'drag-active': isDragging }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <!-- Drag overlay -->
      <div v-if="isDragging" class="drag-overlay">
        <div class="drag-content">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <span>Drop XML file here</span>
        </div>
      </div>

      <form @submit.prevent="analyzeReport">
        <!-- Paste area -->
        <div class="form-group">
          <label for="xmlPaste">Paste DMARC Report XML</label>
          <textarea
            id="xmlPaste"
            v-model="xmlPaste"
            rows="8"
            placeholder="Paste your DMARC aggregate report XML here..."
            :disabled="!!file || loading"
            autocomplete="off"
            autocorrect="off"
          />
        </div>

        <!-- File upload -->
        <div class="form-group">
          <label>Or upload XML file</label>
          <div class="file-zone">
            <input ref="fileInputRef" type="file" accept=".xml" @change="handleFileChange"
              :disabled="!!xmlPaste || loading" style="display:none" />
            <template v-if="!fileName">
              <div
                class="file-label"
                :class="{ disabled: !!xmlPaste || loading }"
                role="button"
                tabindex="0"
                @click="!xmlPaste && !loading && fileInputRef.click()"
                @keydown.enter="!xmlPaste && !loading && fileInputRef.click()"
                @keydown.space.prevent="!xmlPaste && !loading && fileInputRef.click()"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span>Click to select or drag &amp; drop XML</span>
              </div>
            </template>
            <div v-else class="file-selected">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span class="file-name" :title="fileName">{{ truncatedFileName }}</span>
              <button type="button" class="file-remove" @click="clearFile" :disabled="loading">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>

        <Turnstile ref="turnstileRef" @verified="onTurnstileVerified" @expired="onTurnstileInvalid" @error="onTurnstileInvalid" />

        <button type="submit" class="submit-btn" :disabled="isFormDisabled">
          <span v-if="loading" class="btn-loading"><span class="spinner"></span> Analyzing...</span>
          <span v-else>Analyze Report</span>
        </button>
      </form>
    </div>

    <!-- ── Error ── -->
    <div v-if="errorMessage" class="error-pill">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      {{ errorMessage }}
    </div>

    <!-- ── Results ── -->
    <div v-if="result" class="results">

      <!-- Hero -->
      <div class="hero" :class="(result.passRate ?? 0) >= 90 ? 'hero-pass' : (result.passRate ?? 0) >= 50 ? 'hero-warn' : 'hero-fail'">
        <div class="hero-icon" :class="(result.passRate ?? 0) >= 90 ? 'icon-pass' : (result.passRate ?? 0) >= 50 ? 'icon-warn' : 'icon-fail'">
          <svg v-if="(result.passRate ?? 0) >= 90" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else-if="(result.passRate ?? 0) >= 50" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <div class="hero-text">
          <h2 class="hero-title">{{ result.domain || 'Report Analyzed' }}</h2>
          <p class="hero-sub">
            {{ result.emailProvider || result.organization || 'Unknown provider' }}
            <span v-if="result.reportDate"> · {{ new Date(result.reportDate).toLocaleDateString() }}</span>
          </p>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="stat-num">{{ result.passRate ?? '—' }}<span v-if="result.passRate != null">%</span></span>
            <span class="stat-label">Pass rate</span>
          </div>
          <div class="hero-stat-divider"></div>
          <div class="hero-stat">
            <span class="stat-num">{{ result.totalMessages ?? '—' }}</span>
            <span class="stat-label">Messages</span>
          </div>
          <template v-if="result.score">
            <div class="hero-stat-divider"></div>
            <div class="hero-stat">
              <span class="stat-num">{{ result.score.value }}<span class="stat-denom">/{{ result.score.outOf }}</span></span>
              <span class="stat-label score-badge" :class="'score-' + result.score.level?.toLowerCase()">{{ result.score.level }}</span>
            </div>
          </template>
        </div>
      </div>

      <!-- Auth breakdown -->
      <div v-if="result.authSummary" class="tool-card">
        <h3 class="card-title">
          Authentication Breakdown
          <span class="tip" tabindex="0">?<span class="tip-pop">DMARC needs authentication AND alignment. "Passed, not aligned" means the check succeeded but for the wrong domain — it does not count toward DMARC.</span></span>
        </h3>
        <div class="auth-grid">
          <div class="auth-card">
            <div class="auth-card-head">
              SPF
              <span v-if="result.alignmentMode" class="align-badge">{{ result.alignmentMode.spf }} alignment</span>
            </div>
            <div class="auth-stats">
              <div class="auth-stat pass">
                <span class="as-num">{{ result.authSummary.spf.alignedPass }}</span>
                <span class="as-label">Aligned &amp; passed</span>
              </div>
              <div class="auth-stat warn">
                <span class="as-num">{{ result.authSummary.spf.unalignedPass }}</span>
                <span class="as-label">Passed, not aligned</span>
              </div>
              <div class="auth-stat fail">
                <span class="as-num">{{ result.authSummary.spf.authFail }}</span>
                <span class="as-label">Auth failed</span>
              </div>
              <div class="auth-stat muted">
                <span class="as-num">{{ result.authSummary.spf.noData }}</span>
                <span class="as-label">No data</span>
              </div>
            </div>
          </div>
          <div class="auth-card">
            <div class="auth-card-head">
              DKIM
              <span v-if="result.alignmentMode" class="align-badge">{{ result.alignmentMode.dkim }} alignment</span>
            </div>
            <div class="auth-stats">
              <div class="auth-stat pass">
                <span class="as-num">{{ result.authSummary.dkim.alignedPass }}</span>
                <span class="as-label">Aligned &amp; passed</span>
              </div>
              <div class="auth-stat warn">
                <span class="as-num">{{ result.authSummary.dkim.unalignedPass }}</span>
                <span class="as-label">Passed, not aligned</span>
              </div>
              <div class="auth-stat fail">
                <span class="as-num">{{ result.authSummary.dkim.authFail }}</span>
                <span class="as-label">Auth failed</span>
              </div>
              <div class="auth-stat muted">
                <span class="as-num">{{ result.authSummary.dkim.noData }}</span>
                <span class="as-label">Not signed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Alignment status banner -->
      <div v-if="result.domainAlignmentIssue !== undefined"
        class="alert"
        :class="result.domainAlignmentIssue ? 'alert-warn' : 'alert-pass'"
      >
        <svg v-if="result.domainAlignmentIssue" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        <span>
          <strong>{{ result.domainAlignmentIssue ? 'Domain alignment issue detected' : 'No domain alignment issues' }}</strong>
          <span v-if="result.domainAlignmentIssue"> — some emails failed DMARC alignment.</span>
        </span>
      </div>

      <!-- Alerts -->
      <div v-if="regularWarnings.length" class="alert alert-warn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <ul><li v-for="w in regularWarnings" :key="w">{{ w }}</li></ul>
      </div>

      <div v-if="result.errors?.length" class="alert alert-error">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <ul><li v-for="e in result.errors" :key="e">{{ e }}</li></ul>
      </div>

      <div v-if="regularRecommendations.length" class="alert alert-tip">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <ul><li v-for="r in regularRecommendations" :key="r">{{ r }}</li></ul>
      </div>

      <div v-if="forwardingRecommendations.length" class="alert alert-muted">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div><strong>Forwarding detected</strong><ul><li v-for="r in forwardingRecommendations" :key="r">{{ r }}</li></ul></div>
      </div>

      <div v-if="testModeRecommendations.length" class="alert alert-muted">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div><strong>Policy test mode</strong><ul><li v-for="r in testModeRecommendations" :key="r">{{ r }}</li></ul></div>
      </div>

      <div v-if="dkimWarnings.length" class="alert alert-muted">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div><strong>DKIM notices</strong><ul><li v-for="w in dkimWarnings" :key="w">{{ w }}</li></ul></div>
      </div>

      <!-- Email sources table -->
      <div v-if="result.sources?.length" class="tool-card">
        <h3 class="card-title">
          Email Sources
          <span class="tip" tabindex="0">?<span class="tip-pop">IP addresses that sent email claiming to be from your domain, with their authentication results.</span></span>
        </h3>
        <div class="sources-wrap">
          <div class="sources-table">
            <div class="sources-head" :style="{ gridTemplateColumns: sourcesGridColumns }">
              <span>IP Address</span>
              <span>Domain</span>
              <span>Count</span>
              <span>DMARC</span>
              <span>SPF</span>
              <span>DKIM</span>
              <template v-if="hasAlignmentData">
                <span>SPF Align</span>
                <span>DKIM Align</span>
                <span></span>
              </template>
              <template v-else>
                <span v-if="hasEnvelopeFrom">Envelope From</span>
                <span v-if="hasSpfScope">SPF Scope</span>
              </template>
            </div>
            <template v-for="src in result.sources" :key="src.ip">
              <div
                class="sources-row"
                :class="{ clickable: hasAlignmentData, expanded: isSourceExpanded(src.ip) }"
                :style="{ gridTemplateColumns: sourcesGridColumns }"
                :tabindex="hasAlignmentData ? 0 : undefined"
                @click="hasAlignmentData && toggleSource(src.ip)"
                @keydown.enter="hasAlignmentData && toggleSource(src.ip)"
              >
                <span class="cell-mono">{{ src.ip }}</span>
                <span class="cell-mono cell-ellipsis" :title="src.headerFrom || ''">{{ src.headerFrom ?? '—' }}</span>
                <span class="cell-bold">{{ src.count }}</span>
                <span class="cell-result" :class="src.dmarcResult === 'Pass' ? 'pass' : 'fail'">{{ src.dmarcResult === 'Pass' ? 'Pass' : 'Fail' }}</span>
                <span class="cell-result" :class="src.spfResult === 'pass' ? 'pass' : 'fail'">{{ src.spfResult === 'pass' ? 'Pass' : 'Fail' }}</span>
                <span class="cell-result" :class="src.dkimResult === 'pass' ? 'pass' : 'fail'">{{ src.dkimResult === 'pass' ? 'Pass' : 'Fail' }}</span>
                <template v-if="hasAlignmentData">
                  <span class="cell-result" :class="alignmentClass(src.spfAlignment)">{{ alignmentLabel(src.spfAlignment) }}</span>
                  <span class="cell-result" :class="alignmentClass(src.dkimAlignment)">{{ alignmentLabel(src.dkimAlignment) }}</span>
                  <span class="cell-chevron">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                      :style="{ transform: isSourceExpanded(src.ip) ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </span>
                </template>
                <template v-else>
                  <span v-if="hasEnvelopeFrom" class="cell-mono">{{ src.envelopeFrom ?? '—' }}</span>
                  <span v-if="hasSpfScope" class="cell-muted">{{ src.spfScope ?? '—' }}</span>
                </template>
              </div>

              <div v-if="hasAlignmentData && isSourceExpanded(src.ip)" class="source-detail">
                <div class="source-detail-grid">
                  <div v-if="src.headerFrom" class="sd-item"><span class="sd-label">Header From</span><span class="sd-value mono">{{ src.headerFrom }}</span></div>
                  <div v-if="src.envelopeFrom" class="sd-item"><span class="sd-label">Envelope From</span><span class="sd-value mono">{{ src.envelopeFrom }}</span></div>
                  <div v-if="src.spfDomains?.length" class="sd-item"><span class="sd-label">SPF Domain(s)</span><span class="sd-value mono">{{ src.spfDomains.join(', ') }}</span></div>
                  <div v-if="src.dkimDomains?.length" class="sd-item"><span class="sd-label">DKIM Domain(s)</span><span class="sd-value mono">{{ src.dkimDomains.join(', ') }}</span></div>
                  <div v-if="src.dkimSelectors?.length" class="sd-item"><span class="sd-label">DKIM Selector(s)</span><span class="sd-value mono">{{ src.dkimSelectors.join(', ') }}</span></div>
                  <div v-if="src.dispositions?.length" class="sd-item"><span class="sd-label">Disposition(s)</span><span class="sd-value">{{ src.dispositions.join(', ') }}</span></div>
                  <div v-if="src.spfScope" class="sd-item"><span class="sd-label">SPF Scope</span><span class="sd-value">{{ src.spfScope }}</span></div>
                </div>
                <div v-if="src.failureReasons?.length" class="sd-failures">
                  <span class="sd-fail-label">Why it failed</span>
                  <ul><li v-for="reason in src.failureReasons" :key="reason">{{ reason }}</li></ul>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Expert disclosures -->
      <div class="disclosures">

        <!-- Report metadata -->
        <details class="disclosure">
          <summary class="disclosure-trigger">
            <span class="disclosure-label">Report details</span>
            <svg class="disclosure-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div class="disclosure-body">
            <dl class="meta-list">
              <div class="meta-row"><dt>Provider</dt><dd>{{ result.emailProvider || result.organization || '—' }}</dd></div>
              <div class="meta-row"><dt>Domain</dt><dd>{{ result.domain || '—' }}</dd></div>
              <div class="meta-row"><dt>Report ID</dt><dd class="mono">{{ result.reportId || '—' }}</dd></div>
              <div class="meta-row"><dt>Date range</dt><dd>{{ formatDateRange(result.dateRange) }}</dd></div>
              <div v-if="result.version" class="meta-row"><dt>Version</dt><dd>{{ result.version }}</dd></div>
              <div v-if="result.generator" class="meta-row"><dt>Generator</dt><dd>{{ result.generator }}</dd></div>
              <div v-if="result.likelyForwardedCount" class="meta-row">
                <dt>Likely forwarded</dt><dd>{{ result.likelyForwardedCount }}</dd>
              </div>
            </dl>
          </div>
        </details>

        <!-- Policy -->
        <details v-if="result.policy" class="disclosure">
          <summary class="disclosure-trigger">
            <span class="disclosure-label">DMARC policy in effect</span>
            <svg class="disclosure-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div class="disclosure-body">
            <dl class="meta-list">
              <div class="meta-row"><dt>Policy</dt><dd>{{ result.policy.dmarc }}</dd></div>
              <div class="meta-row"><dt>SPF alignment</dt><dd>{{ result.alignmentMode?.spf || result.policy.spfAlignment }}</dd></div>
              <div class="meta-row"><dt>DKIM alignment</dt><dd>{{ result.alignmentMode?.dkim || result.policy.dkimAlignment }}</dd></div>
              <div v-if="result.policy.sp" class="meta-row"><dt>Subdomain policy</dt><dd>{{ result.policy.sp }}</dd></div>
              <div v-if="result.policy.np" class="meta-row"><dt>Non-existent subdomain</dt><dd>{{ result.policy.np }}</dd></div>
              <div v-if="result.policy.testing" class="meta-row"><dt>Test mode</dt><dd>{{ result.policy.testing }}</dd></div>
              <div v-if="result.policy.pct != null" class="meta-row"><dt>Percentage (deprecated)</dt><dd>{{ result.policy.pct }}</dd></div>
              <div v-if="result.policy.discoveryMethod" class="meta-row"><dt>Discovery method</dt><dd>{{ result.policy.discoveryMethod }}</dd></div>
            </dl>
          </div>
        </details>

        <!-- Report format / protocol -->
        <details v-if="result.protocol" class="disclosure">
          <summary class="disclosure-trigger">
            <span class="disclosure-label">Report format compliance</span>
            <svg class="disclosure-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div class="disclosure-body">
            <dl class="meta-list">
              <div class="meta-row">
                <dt>Standard</dt>
                <dd><span class="proto-badge" :class="result.protocol.likelyRfc9990Generator ? 'pass' : 'muted'">{{ result.protocol.likelyRfc9990Generator ? 'RFC 9990' : 'Legacy (RFC 7489)' }}</span></dd>
              </div>
              <div class="meta-row">
                <dt>DKIM selectors reported</dt>
                <dd><span class="proto-badge" :class="result.protocol.rfc9990SelectorsPresent ? 'pass' : 'warn'">{{ result.protocol.rfc9990SelectorsPresent ? 'Yes' : 'Missing' }}</span></dd>
              </div>
              <div v-if="result.protocol.publishedTestMode" class="meta-row">
                <dt>Published test mode</dt>
                <dd><span class="proto-badge warn">t=y (not enforced)</span></dd>
              </div>
              <div v-if="result.protocol.deprecatedPublishedTags?.length" class="meta-row">
                <dt>Deprecated tags</dt>
                <dd><span class="proto-badge warn">{{ result.protocol.deprecatedPublishedTags.join(', ') }}</span></dd>
              </div>
            </dl>
          </div>
        </details>

        <!-- Detailed records -->
        <details v-if="result.records?.length" class="disclosure">
          <summary class="disclosure-trigger">
            <span class="disclosure-label">Detailed records ({{ result.records.length }})</span>
            <svg class="disclosure-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div class="disclosure-body">
            <div class="records-list">
              <div v-for="(rec, i) in result.records" :key="i" class="record-card">
                <div class="record-head">
                  <div class="record-id">
                    <span class="status-dot" :class="rec.dmarcResult === 'pass' ? 'pass' : 'fail'"></span>
                    <span class="mono record-ip">{{ rec.sourceIp }}</span>
                    <span class="record-count">{{ rec.count }} {{ rec.count === 1 ? 'message' : 'messages' }}</span>
                  </div>
                  <div class="record-badges">
                    <span v-if="rec.likelyForwarded" class="chip">forwarded</span>
                    <span v-if="rec.disposition && rec.disposition !== 'none'" class="chip">{{ rec.disposition }}</span>
                    <span class="status-pill" :class="rec.dmarcResult === 'pass' ? 'pass' : 'fail'">
                      {{ rec.dmarcResult === 'pass' ? 'Pass' : 'Fail' }}
                    </span>
                  </div>
                </div>
                <div class="record-auth">
                  <div class="record-auth-row">
                    <span class="auth-label">SPF</span>
                    <span class="status-dot" :class="authDotClass(rec.spf.status)"></span>
                    <span class="auth-text">{{ rec.spf.detail }}</span>
                  </div>
                  <div class="record-auth-row">
                    <span class="auth-label">DKIM</span>
                    <span class="status-dot" :class="authDotClass(rec.dkim.status)"></span>
                    <span class="auth-text">{{ rec.dkim.detail }}</span>
                  </div>
                </div>
                <div v-if="rec.headerFrom || rec.envelopeFrom || rec.policyEvaluated?.reasons?.length" class="record-meta">
                  <span v-if="rec.headerFrom" class="record-meta-item">From <span class="mono">{{ rec.headerFrom }}</span></span>
                  <span v-if="rec.envelopeFrom" class="record-meta-item">Envelope <span class="mono">{{ rec.envelopeFrom }}</span></span>
                  <span v-if="rec.policyEvaluated?.reasons?.length" class="record-meta-item">
                    Overrides: <span v-for="(reason, ri) in rec.policyEvaluated.reasons" :key="ri">{{ formatOverride(reason) }}<template v-if="ri < rec.policyEvaluated.reasons.length - 1">, </template></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </details>

      </div>
    </div>
  </div>
</template>

<style scoped>
.dmarc-analyzer {
  max-width: 820px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
}

/* ── Upload card ── */
.upload-card {
  position: relative;
  margin: 2rem 0 1.5rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1.5px solid var(--vp-c-border, #e5e7eb);
  border-radius: 14px;
  transition: border-color 0.15s;
}

.upload-card.drag-active {
  border-color: var(--vp-c-brand);
  background: hsla(197, 87%, 50%, 0.03);
}

.drag-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsla(197, 87%, 50%, 0.08);
  backdrop-filter: blur(3px);
  border-radius: 12px;
  z-index: 10;
  pointer-events: none;
  border: 2px dashed hsla(197, 87%, 50%, 0.4);
}

.drag-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 2rem;
  background: var(--vp-c-bg, #fff);
  border-radius: 10px;
  border: 1px solid hsla(197, 87%, 50%, 0.2);
  color: var(--vp-c-brand);
  font-weight: 600;
  font-size: 1rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--vp-c-text-1, #374151);
  letter-spacing: 0.01em;
}

.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: var(--vp-font-family-mono, monospace);
  resize: vertical;
  line-height: 1.5;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text-1, #374151);
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}

.form-group textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px hsla(197, 87%, 50%, 0.12);
}

.form-group textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* File zone */
.file-zone { margin-top: 0.25rem; }

.file-label {
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.875rem 1rem;
  border: 1.5px dashed var(--vp-c-border, #d1d5db);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2, #6b7280);
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.file-label:hover:not(.disabled) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: hsla(197, 87%, 50%, 0.04);
}

.file-label.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.file-selected {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.875rem;
  border: 1.5px solid var(--vp-c-brand);
  border-radius: 8px;
  background: hsla(197, 87%, 50%, 0.05);
  color: var(--vp-c-brand);
}

.file-name {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--vp-c-text-2, #6b7280);
  border-radius: 4px;
  flex-shrink: 0;
  transition: color 0.15s, background 0.15s;
}

.file-remove:hover { color: #dc2626; background: rgba(220,38,38,0.08); }

/* Submit */
.submit-btn {
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
  box-shadow: 0 1px 4px hsla(197, 87%, 50%, 0.3);
}

.submit-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px hsla(197, 87%, 50%, 0.35);
}

.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }

.btn-loading { display: flex; align-items: center; justify-content: center; gap: 0.5rem; }

.spinner {
  display: inline-block;
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Error */
.error-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid rgba(220,38,38,0.2);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

/* Results */
.results {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

/* Hero */
.hero {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem 1.75rem;
  border-radius: 14px;
  border: 1px solid transparent;
  flex-wrap: wrap;
}

.hero-pass { background: linear-gradient(135deg, rgba(22,163,74,0.06) 0%, hsla(197,87%,50%,0.04) 100%); border-color: rgba(22,163,74,0.2); }
.hero-warn { background: rgba(217,119,6,0.05); border-color: rgba(217,119,6,0.2); }
.hero-fail { background: rgba(220,38,38,0.04); border-color: rgba(220,38,38,0.18); }

.hero-icon {
  width: 52px; height: 52px;
  border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.icon-pass { background: rgba(22,163,74,0.12); color: #16a34a; border: 1px solid rgba(22,163,74,0.2); }
.icon-warn { background: rgba(217,119,6,0.12);  color: #d97706; border: 1px solid rgba(217,119,6,0.2); }
.icon-fail { background: rgba(220,38,38,0.1);   color: #dc2626; border: 1px solid rgba(220,38,38,0.15); }

.hero-text { flex: 1; min-width: 0; }

.hero-title {
  margin: 0 0 0.2rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #111827);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hero-sub {
  margin: 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2, #6b7280);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.hero-stat { display: flex; flex-direction: column; align-items: center; text-align: center; }

.stat-num {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--vp-c-text-1, #111827);
  line-height: 1;
}

.stat-denom { font-size: 0.9rem; font-weight: 500; color: var(--vp-c-text-3, #9ca3af); }

.stat-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-2, #6b7280);
  margin-top: 0.15rem;
}

.score-badge {
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}

.score-strong, .score-excellent { background: rgba(22,163,74,0.12); color: #15803d; }
.score-good,   .score-medium   { background: rgba(217,119,6,0.12);  color: #b45309; }
.score-poor,   .score-weak     { background: rgba(220,38,38,0.1);   color: #dc2626; }

.hero-stat-divider {
  width: 1px; height: 2rem;
  background: var(--vp-c-border, #e5e7eb);
}

/* Card */
.tool-card {
  background: var(--vp-c-bg, #fff);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
}

.card-title {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-1, #374151);
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

/* Alerts */
.alert {
  display: flex;
  gap: 0.75rem;
  padding: 0.875rem 1.125rem;
  border-radius: 10px;
  border: 1px solid transparent;
  font-size: 0.875rem;
  line-height: 1.6;
}

.alert > svg { flex-shrink: 0; margin-top: 0.1rem; }
.alert strong { display: block; font-weight: 700; margin-bottom: 0.2rem; }
.alert ul { margin: 0; padding-left: 1.1rem; }
.alert li + li { margin-top: 0.2rem; }

.alert-pass  { background: rgba(22,163,74,0.06);   border-color: rgba(22,163,74,0.2);  color: var(--vp-c-text-1); }
.alert-pass  > svg { color: #16a34a; }
.alert-warn  { background: rgba(217,119,6,0.06);   border-color: rgba(217,119,6,0.2);  color: var(--vp-c-text-1); }
.alert-warn  > svg { color: #d97706; }
.alert-error { background: rgba(220,38,38,0.05);   border-color: rgba(220,38,38,0.18); color: #991b1b; }
.alert-error > svg { color: #dc2626; }
.alert-tip   { background: hsla(197,87%,50%,0.05); border-color: hsla(197,87%,50%,0.2); color: var(--vp-c-text-1); }
.alert-tip   > svg { color: var(--vp-c-brand-dark, #0891b2); }
.alert-muted { background: var(--vp-c-bg-soft, #f9fafb); border-color: var(--vp-c-border, #e5e7eb); color: var(--vp-c-text-2, #6b7280); }
.alert-muted > svg { color: var(--vp-c-text-3, #9ca3af); }

/* Auth breakdown */
.auth-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 0.75rem;
}

.auth-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  border-radius: 10px;
}

.auth-card-head {
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-1, #374151);
}

.align-badge {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  background: hsla(197, 87%, 50%, 0.12);
  color: var(--vp-c-brand);
}

.auth-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.375rem;
}

.auth-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.25rem;
  border-radius: 7px;
  background: var(--vp-c-bg, #fff);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  text-align: center;
}

.as-num { font-size: 1.2rem; font-weight: 700; line-height: 1.2; }
.as-label { font-size: 0.65rem; color: var(--vp-c-text-2, #6b7280); line-height: 1.3; margin-top: 0.15rem; }

.auth-stat.pass .as-num { color: #16a34a; }
.auth-stat.warn .as-num { color: #d97706; }
.auth-stat.fail .as-num { color: #dc2626; }
.auth-stat.muted .as-num { color: var(--vp-c-text-2, #6b7280); }

/* Sources table */
.sources-wrap { overflow-x: auto; border-radius: 8px; border: 1px solid var(--vp-c-border, #e5e7eb); }

.sources-table { min-width: 600px; }

.sources-head {
  display: grid;
  gap: 0.75rem;
  padding: 0.625rem 1rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-2, #6b7280);
  border-bottom: 1px solid var(--vp-c-border, #e5e7eb);
}

.sources-row {
  display: grid;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  align-items: center;
  border-bottom: 1px solid var(--vp-c-border-soft, #f1f5f9);
  font-size: 0.85rem;
  transition: background 0.1s;
}

.sources-row:last-child { border-bottom: none; }
.sources-row:hover { background: var(--vp-c-bg-soft, #f8f9fa); }
.sources-row.clickable { cursor: pointer; }
.sources-row.expanded { background: var(--vp-c-bg-soft, #f8f9fa); }

.cell-mono    { font-family: monospace; font-size: 0.8rem; color: var(--vp-c-text-1); }
.cell-ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.cell-bold    { font-weight: 600; color: var(--vp-c-text-1); }
.cell-muted   { color: var(--vp-c-text-2, #6b7280); font-size: 0.8rem; }
.cell-chevron { display: flex; align-items: center; color: var(--vp-c-text-3, #9ca3af); }

.cell-result { font-weight: 600; font-size: 0.8rem; }
.cell-result.pass    { color: #16a34a; }
.cell-result.fail    { color: #dc2626; }
.cell-result.warn    { color: #d97706; }
.cell-result.muted   { color: var(--vp-c-text-3, #9ca3af); font-weight: 400; }
.cell-result.aligned { color: #16a34a; }
.cell-result.unaligned { color: #dc2626; }
.cell-result.mixed   { color: #d97706; }
.cell-result.no_data { color: var(--vp-c-text-3, #9ca3af); font-weight: 400; }

/* Source detail expand */
.source-detail {
  padding: 0.875rem 1rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-bottom: 1px solid var(--vp-c-border-soft, #e5e7eb);
}

.source-detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem 1.25rem;
  margin-bottom: 0.5rem;
}

.sd-item { display: flex; flex-direction: column; gap: 0.1rem; }
.sd-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--vp-c-text-2, #6b7280); }
.sd-value { font-size: 0.825rem; color: var(--vp-c-text-1); word-break: break-all; }
.sd-value.mono { font-family: monospace; }

.sd-failures { margin-top: 0.5rem; }
.sd-fail-label { font-size: 0.75rem; font-weight: 700; color: #dc2626; text-transform: uppercase; letter-spacing: 0.04em; }
.sd-failures ul { margin: 0.25rem 0 0; padding-left: 1.25rem; }
.sd-failures li { font-size: 0.825rem; color: var(--vp-c-text-1); margin: 0.15rem 0; }

/* Disclosures */
.disclosures { display: flex; flex-direction: column; gap: 0.5rem; }

.disclosure {
  background: var(--vp-c-bg, #fff);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 10px;
  overflow: hidden;
}

.disclosure-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  cursor: pointer;
  user-select: none;
  list-style: none;
}

.disclosure-trigger::-webkit-details-marker { display: none; }
.disclosure-trigger:hover { background: var(--vp-c-bg-soft, #f8f9fa); }

.disclosure-label { font-size: 0.875rem; font-weight: 600; color: var(--vp-c-text-1, #374151); }

.disclosure-chevron { color: var(--vp-c-text-3, #9ca3af); transition: transform 0.2s; }
details[open] .disclosure-chevron { transform: rotate(180deg); }

.disclosure-body {
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid var(--vp-c-border-soft, #f1f5f9);
}

/* Meta list inside disclosures */
.meta-list { margin: 0.875rem 0 0; display: flex; flex-direction: column; gap: 0.5rem; }

.meta-row {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 0.5rem;
  align-items: baseline;
  font-size: 0.875rem;
}

.meta-row dt { font-weight: 600; color: var(--vp-c-text-2, #6b7280); }
.meta-row dd { margin: 0; color: var(--vp-c-text-1); word-break: break-all; }
.meta-row dd.mono { font-family: monospace; font-size: 0.8rem; }

/* Proto badges */
.proto-badge {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.proto-badge.pass  { background: rgba(22,163,74,0.1);  color: #15803d; }
.proto-badge.warn  { background: rgba(217,119,6,0.1);  color: #b45309; }
.proto-badge.muted { background: var(--vp-c-bg-mute, #f1f5f9); color: var(--vp-c-text-2, #6b7280); }

/* Detailed records */
.records-list { display: flex; flex-direction: column; gap: 0.625rem; margin-top: 1rem; }

.record-card {
  padding: 0.875rem 1rem;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  border-radius: 9px;
  background: var(--vp-c-bg, #fff);
}

.record-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.625rem;
}

.record-id { display: flex; align-items: center; gap: 0.5rem; min-width: 0; }
.record-ip { font-weight: 600; font-size: 0.875rem; }
.record-count { font-size: 0.75rem; color: var(--vp-c-text-3, #9ca3af); }
.record-badges { display: flex; align-items: center; gap: 0.375rem; }

.status-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--vp-c-text-3, #9ca3af);
}
.status-dot.pass { background: #16a34a; }
.status-dot.warn { background: #d97706; }
.status-dot.fail { background: #dc2626; }
.status-dot.muted { background: var(--vp-c-text-3, #c3c8cf); }

.status-pill {
  padding: 0.1rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
}
.status-pill.pass { background: rgba(22,163,74,0.1); color: #15803d; }
.status-pill.fail { background: rgba(220,38,38,0.08); color: #b91c1c; }

.chip {
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--vp-c-text-2, #6b7280);
  background: var(--vp-c-bg-soft, #f3f4f6);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
}

.record-auth { display: flex; flex-direction: column; gap: 0.3rem; }

.record-auth-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.825rem;
}

.auth-label {
  width: 2.5rem;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3, #9ca3af);
  flex-shrink: 0;
}

.auth-text { color: var(--vp-c-text-1); }
.mono { font-family: monospace; font-size: 0.85em; }

.record-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-border-soft, #f1f5f9);
  font-size: 0.75rem;
  color: var(--vp-c-text-3, #9ca3af);
}

/* Tooltip */
.tip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem; height: 1rem;
  border-radius: 50%;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  cursor: help;
  position: relative;
  vertical-align: middle;
}

.tip-pop {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: calc(100% + 8px);
  transform: translateX(-50%) translateY(-4px);
  width: max-content;
  max-width: min(280px, 90vw);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg, #fff);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
  color: var(--vp-c-text-1, #374151);
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.5;
  z-index: 1000;
  transition: opacity 0.15s, transform 0.15s;
  word-wrap: break-word;
}

.tip:hover .tip-pop,
.tip:focus .tip-pop {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ── Dark mode ── */
.dark .hero-pass { background: linear-gradient(135deg, rgba(22,163,74,0.09) 0%, hsla(197,87%,50%,0.06) 100%); border-color: rgba(22,163,74,0.25); }
.dark .hero-warn { background: rgba(217,119,6,0.09); border-color: rgba(217,119,6,0.25); }
.dark .hero-fail { background: rgba(220,38,38,0.08); border-color: rgba(220,38,38,0.22); }

.dark .icon-pass { background: rgba(22,163,74,0.18); color: #4ade80; }
.dark .icon-warn { background: rgba(217,119,6,0.18);  color: #fbbf24; }
.dark .icon-fail { background: rgba(220,38,38,0.18);  color: #f87171; }

.dark .score-strong, .dark .score-excellent { background: rgba(22,163,74,0.2); color: #4ade80; }
.dark .score-good,   .dark .score-medium   { background: rgba(217,119,6,0.2);  color: #fbbf24; }
.dark .score-poor,   .dark .score-weak     { background: rgba(220,38,38,0.2);  color: #f87171; }

.dark .alert-warn  { background: rgba(217,119,6,0.1);   border-color: rgba(217,119,6,0.25);  color: var(--vp-c-text-1); }
.dark .alert-error { background: rgba(220,38,38,0.1);   border-color: rgba(220,38,38,0.25);  color: #fca5a5; }
.dark .alert-tip   { background: hsla(197,87%,50%,0.08); border-color: hsla(197,87%,50%,0.25); color: var(--vp-c-text-1); }
.dark .alert-tip > svg { color: var(--vp-c-brand-light); }

.dark .proto-badge.pass { background: rgba(22,163,74,0.2);  color: #4ade80; }
.dark .proto-badge.warn { background: rgba(217,119,6,0.2);  color: #fbbf24; }

.dark .auth-stat { background: var(--vp-c-bg-soft, #252736); border-color: var(--vp-c-border, #3a3d50); }
.dark .status-pill.pass { background: rgba(22,163,74,0.18); color: #4ade80; }
.dark .status-pill.fail { background: rgba(220,38,38,0.18); color: #f87171; }
.dark .chip { background: var(--vp-c-bg-mute, #2a2d3e); border-color: var(--vp-c-border, #3a3d50); }

.dark .tip-pop {
  background: var(--vp-c-bg-soft, #252736);
  border-color: var(--vp-c-border, #404040);
  box-shadow: 0 8px 24px rgba(0,0,0,.3);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .hero { padding: 1.25rem; gap: 1rem; }
  .hero-stats { gap: 0.75rem; }
  .stat-num { font-size: 1.3rem; }
  .hero-stat-divider { height: 1.5rem; }
  .auth-stats { grid-template-columns: repeat(2, 1fr); }
  .meta-row { grid-template-columns: 1fr; gap: 0.15rem; }
  .meta-row dt { color: var(--vp-c-text-2); }
}

@media (max-width: 480px) {
  .hero { flex-wrap: wrap; }
  .hero-stats { width: 100%; justify-content: space-around; }
  .tip-pop {
    position: fixed;
    left: 10px !important; right: 10px !important;
    top: auto !important; bottom: 20px;
    transform: none !important;
    width: auto !important; max-width: none !important;
    z-index: 9999;
  }
  .tip:hover .tip-pop, .tip:focus .tip-pop { transform: none !important; }
}
</style>
