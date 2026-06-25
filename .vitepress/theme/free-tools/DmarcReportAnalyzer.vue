<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { analyzeDmarcReport } from '../../../connectors/bluefoxEmailToolsApi.js'
import { isSessionValid } from '../../../connectors/turnstileSession.js'
import Turnstile from './Turnstile.vue'

// ---- VARIABLES ----
const MAX_FILENAME_LEN = 30

const xmlPaste = ref('')
const file = ref(null)
const fileName = ref('')
const loading = ref(false)
const result = ref(null)
const errorMessage = ref('')

// Drag and drop state
const isDragging = ref(false)
let dragLeaveTimeout = null

// Turnstile state
const turnstileRef = ref(null)
const turnstileToken = ref('')

// Result display state
const expandedSources = ref(new Set())
const showRecords = ref(false)

// Computed properties
const isFormDisabled = computed(() =>
  loading.value || (!xmlPaste.value.trim() && !file.value)
)

const truncatedFileName = computed(() => {
  if (!fileName.value) {
    return ''
  }
  if (fileName.value.length <= MAX_FILENAME_LEN) {
    return fileName.value
  }
  return `${fileName.value.slice(0, 15)}...${fileName.value.slice(-10)}`
})

const hasEnvelopeFrom = computed(() =>
  result.value?.sources?.some(s => s.envelopeFrom != null) ?? false
)

const hasSpfScope = computed(() =>
  result.value?.sources?.some(s => s.spfScope != null) ?? false
)

// New API returns alignment fields per source; old responses don't.
const hasAlignmentData = computed(() =>
  result.value?.sources?.some(s => s.spfAlignment !== undefined) ?? false
)

const sourcesGridColumns = computed(() => {
  const cols = ['2fr', '1.5fr', '0.7fr', '1fr', '1fr', '1fr']
  if (hasAlignmentData.value) {
    cols.push('1.2fr', '1.2fr', '0.5fr')
  } else {
    if (hasEnvelopeFrom.value) {
      cols.push('2fr')
    }
    if (hasSpfScope.value) {
      cols.push('1fr')
    }
  }
  return cols.join(' ')
})

const dkimWarnings = computed(() =>
  result.value?.warnings?.filter(w => /dkim.*selector|selector.*dkim/i.test(w)) ?? []
)

const regularWarnings = computed(() =>
  result.value?.warnings?.filter(w => !/dkim.*selector|selector.*dkim/i.test(w)) ?? []
)

const testModeRecommendations = computed(() =>
  result.value?.recommendations?.filter(r => /policy[_\s]?test[_\s]?mode|test\s?mode/i.test(r)) ?? []
)

const forwardingRecommendations = computed(() =>
  result.value?.recommendations?.filter(r =>
    /forwarded mail|forwarding/i.test(r) && !/policy[_\s]?test[_\s]?mode/i.test(r)
  ) ?? []
)

const regularRecommendations = computed(() =>
  result.value?.recommendations?.filter(r =>
    !/policy[_\s]?test[_\s]?mode|test\s?mode/i.test(r) &&
    !forwardingRecommendations.value.includes(r)
  ) ?? []
)

// ---- ALIGNMENT / DISPLAY HELPERS ----
const ALIGNMENT_LABELS = {
  aligned: 'Aligned',
  unaligned: 'Not aligned',
  mixed: 'Mixed',
  no_data: 'No data'
}

const ALIGNMENT_CLASSES = {
  aligned: 'pass',
  unaligned: 'fail',
  mixed: 'warn',
  no_data: 'muted'
}

function alignmentLabel(value) {
  return ALIGNMENT_LABELS[value] || value || '-'
}

function alignmentClass(value) {
  return ALIGNMENT_CLASSES[value] || 'muted'
}

function authDotClass(status) {
  if (status === 'aligned_pass') {
    return 'pass'
  }
  if (status === 'unaligned_pass') {
    return 'warn'
  }
  if (status === 'auth_fail') {
    return 'fail'
  }
  return 'muted'
}

function toggleSource(ip) {
  const next = new Set(expandedSources.value)
  if (next.has(ip)) {
    next.delete(ip)
  } else {
    next.add(ip)
  }
  expandedSources.value = next
}

function isSourceExpanded(ip) {
  return expandedSources.value.has(ip)
}

// ---- FUNCTIONS ----
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
  if (!xmlPaste.value.trim() && !file.value) {
    errorMessage.value = 'Please paste your DMARC XML or upload an XML file to analyze.'
    return false
  }

  return true
}

// Drag and drop handlers
function handleDragOver(e) {
  e.preventDefault()
  if (dragLeaveTimeout) {
    clearTimeout(dragLeaveTimeout)
  }
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
    errorMessage.value = ''
  } else {
    errorMessage.value = 'Only XML files are supported.'
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

// Format helpers
function formatDateRange(dateRange) {
  if (!dateRange) {
    return 'Unknown'
  }
  if (dateRange.start && dateRange.end) {
    return `${new Date(dateRange.start * 1000).toLocaleString()} to ${new Date(dateRange.end * 1000).toLocaleString()}`
  }
  return typeof dateRange === 'string' ? dateRange : 'Unknown'
}

function formatOverride(reason) {
  if (reason.comment) {
    return `${reason.type} (${reason.comment})`
  }
  return reason.type
}

async function analyzeReport() {
  result.value = null
  expandedSources.value = new Set()
  showRecords.value = false
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

    const data = await analyzeDmarcReport({
      xmlContent: file.value ? null : xmlPaste.value,
      file: file.value,
      turnstileToken: turnstileToken.value
    })

    const { session, ...analysis } = data.result

    result.value = {
      ...analysis,
      valid: true
    }

    resetTurnstile()
    clearFile()

  } catch (err) {
    errorMessage.value = err.message || 'Network error. Please try again.'
    if (err.status === 401) {
      resetTurnstile()
    }
  } finally {
    loading.value = false
  }
}

// ---- LIFECYCLE ----
onMounted(async () => {
  await nextTick()
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

        <!-- Verification -->
        <div class="form-group">
          <Turnstile
            ref="turnstileRef"
            @verified="onTurnstileVerified"
            @expired="onTurnstileInvalid"
            @error="onTurnstileInvalid"
          />
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
    <div v-if="errorMessage" class="error-section">
      <p class="error-message">{{ errorMessage }}</p>
    </div>

    <!-- Results Section -->
    <div v-if="result" class="result-section">
      <h3>DMARC Report Analysis</h3>

      <!-- Summary -->
      <div class="info-section">
        <h4>
          Report Summary
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">Key metrics and details extracted from the DMARC aggregate report.</span>
          </span>
        </h4>
        <div class="summary-grid">
          <div class="summary-item">
            <span class="label">Email Provider:</span>
            <span class="value">
              {{ result.emailProvider || result.organization || 'Unknown' }}
              <span class="info-tip" tabindex="0">
                ?
                <span class="info-tip-pop">The organization that sent this DMARC report (usually the receiving mail server).</span>
              </span>
            </span>
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
            <span class="value">
              {{ result.totalMessages }}
              <span class="info-tip" tabindex="0">
                ?
                <span class="info-tip-pop">Total number of email messages included in this DMARC report.</span>
              </span>
            </span>
          </div>
          <div class="summary-item">
            <span class="label">Pass Rate:</span>
            <span class="value">
              {{ result.passRate }}%
              <span class="info-tip" tabindex="0">
                ?
                <span class="info-tip-pop">Percentage of messages that passed DMARC authentication (either SPF or DKIM aligned).</span>
              </span>
            </span>
          </div>
          <div class="summary-item">
            <span class="label">Date Range:</span>
            <span class="value">{{ formatDateRange(result.dateRange) }}</span>
          </div>
          <div v-if="result.score" class="summary-item">
            <span class="label">Score:</span>
            <span class="value">
              {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})
              <span class="info-tip" tabindex="0">
                ?
                <span class="info-tip-pop">Overall assessment of your DMARC authentication performance based on pass rates and configurations.</span>
              </span>
            </span>
          </div>
          <div v-if="result.version" class="summary-item">
            <span class="label">Report Version:</span>
            <span class="value">{{ result.version }}</span>
          </div>
          <div v-if="result.generator" class="summary-item">
            <span class="label">Generator:</span>
            <span class="value">{{ result.generator }}</span>
          </div>
          <div v-if="result.likelyForwardedCount" class="summary-item">
            <span class="label">Likely Forwarded:</span>
            <span class="value">
              {{ result.likelyForwardedCount }}
              <span class="info-tip" tabindex="0">
                ?
                <span class="info-tip-pop">Messages where DKIM passed and aligned but SPF failed. This is the typical fingerprint of forwarded mail, not a misconfiguration.</span>
              </span>
            </span>
          </div>
        </div>
      </div>

      <!-- Authentication Breakdown -->
      <div v-if="result.authSummary" class="auth-summary-section">
        <h4>
          Authentication Breakdown
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">DMARC needs authentication AND alignment. "Passed, not aligned" means the check succeeded but for the wrong domain, so it does not count toward DMARC.</span>
          </span>
        </h4>
        <div class="auth-summary-grid">
          <div class="auth-card">
            <div class="auth-card-title">
              SPF
              <span v-if="result.alignmentMode" class="alignment-mode-badge">{{ result.alignmentMode.spf }} alignment</span>
            </div>
            <div class="auth-stats">
              <div class="auth-stat pass">
                <span class="auth-stat-num">{{ result.authSummary.spf.alignedPass }}</span>
                <span class="auth-stat-label">Aligned &amp; passed</span>
              </div>
              <div class="auth-stat warn">
                <span class="auth-stat-num">{{ result.authSummary.spf.unalignedPass }}</span>
                <span class="auth-stat-label">Passed, not aligned</span>
              </div>
              <div class="auth-stat fail">
                <span class="auth-stat-num">{{ result.authSummary.spf.authFail }}</span>
                <span class="auth-stat-label">Auth failed</span>
              </div>
              <div class="auth-stat muted">
                <span class="auth-stat-num">{{ result.authSummary.spf.noData }}</span>
                <span class="auth-stat-label">No data</span>
              </div>
            </div>
          </div>
          <div class="auth-card">
            <div class="auth-card-title">
              DKIM
              <span v-if="result.alignmentMode" class="alignment-mode-badge">{{ result.alignmentMode.dkim }} alignment</span>
            </div>
            <div class="auth-stats">
              <div class="auth-stat pass">
                <span class="auth-stat-num">{{ result.authSummary.dkim.alignedPass }}</span>
                <span class="auth-stat-label">Aligned &amp; passed</span>
              </div>
              <div class="auth-stat warn">
                <span class="auth-stat-num">{{ result.authSummary.dkim.unalignedPass }}</span>
                <span class="auth-stat-label">Passed, not aligned</span>
              </div>
              <div class="auth-stat fail">
                <span class="auth-stat-num">{{ result.authSummary.dkim.authFail }}</span>
                <span class="auth-stat-label">Auth failed</span>
              </div>
              <div class="auth-stat muted">
                <span class="auth-stat-num">{{ result.authSummary.dkim.noData }}</span>
                <span class="auth-stat-label">Not signed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Policy Information -->
      <div v-if="result.policy" class="policy-section">
        <h4>
          DMARC Policy
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">The DMARC policy configuration that was in effect during this reporting period.</span>
          </span>
        </h4>
        <div class="policy-grid">
          <div class="policy-item">
            <span class="label">DMARC Policy:</span>
            <span class="value">{{ result.policy.dmarc }}</span>
          </div>
          <div class="policy-item">
            <span class="label">SPF Alignment:</span>
            <span class="value">{{ result.alignmentMode?.spf || result.policy.spfAlignment }}</span>
          </div>
          <div class="policy-item">
            <span class="label">DKIM Alignment:</span>
            <span class="value">{{ result.alignmentMode?.dkim || result.policy.dkimAlignment }}</span>
          </div>
          <div v-if="result.policy.sp" class="policy-item">
            <span class="label">Subdomain Policy:</span>
            <span class="value">{{ result.policy.sp }}</span>
          </div>
          <div v-if="result.policy.np" class="policy-item">
            <span class="label">Non-Existent Subdomain Policy:</span>
            <span class="value">{{ result.policy.np }}</span>
          </div>
          <div v-if="result.policy.testing" class="policy-item">
            <span class="label">Test Mode (t=):</span>
            <span class="value">{{ result.policy.testing }}</span>
          </div>
          <div v-if="result.policy.pct !== null && result.policy.pct !== undefined" class="policy-item">
            <span class="label">Percentage (deprecated):</span>
            <span class="value">{{ result.policy.pct }}</span>
          </div>
          <div v-if="result.policy.discoveryMethod" class="policy-item">
            <span class="label">Discovery Method:</span>
            <span class="value">{{ result.policy.discoveryMethod }}</span>
          </div>
        </div>
      </div>

      <!-- Report Generator / Protocol Compliance -->
      <div v-if="result.protocol" class="protocol-section">
        <h4>
          Report Format
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">How well the report generator conforms to the updated DMARC standards (RFC 9989 / RFC 9990).</span>
          </span>
        </h4>
        <div class="protocol-grid">
          <div class="policy-item">
            <span class="label">Standard:</span>
            <span class="value">
              <span class="proto-badge" :class="result.protocol.likelyRfc9990Generator ? 'pass' : 'muted'">
                {{ result.protocol.likelyRfc9990Generator ? 'RFC 9990' : 'Legacy (RFC 7489)' }}
              </span>
            </span>
          </div>
          <div class="policy-item">
            <span class="label">DKIM Selectors Reported:</span>
            <span class="value">
              <span class="proto-badge" :class="result.protocol.rfc9990SelectorsPresent ? 'pass' : 'warn'">
                {{ result.protocol.rfc9990SelectorsPresent ? 'Yes' : 'Missing' }}
              </span>
            </span>
          </div>
          <div v-if="result.protocol.publishedTestMode" class="policy-item">
            <span class="label">Published Test Mode:</span>
            <span class="value"><span class="proto-badge warn">t=y (not enforced)</span></span>
          </div>
          <div v-if="result.protocol.deprecatedPublishedTags?.length" class="policy-item">
            <span class="label">Deprecated Tags:</span>
            <span class="value">
              <span class="proto-badge warn">{{ result.protocol.deprecatedPublishedTags.join(', ') }}</span>
            </span>
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
        <h4>
          Email Sources
          <span class="info-tip" tabindex="0">
            ?
            <span class="info-tip-pop">IP addresses that sent email claiming to be from your domain, with their authentication results.</span>
          </span>
        </h4>
        <div class="sources-table">
          <div class="table-header" :style="{ gridTemplateColumns: sourcesGridColumns }">
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
              class="table-row"
              :class="{ clickable: hasAlignmentData, expanded: isSourceExpanded(src.ip) }"
              :style="{ gridTemplateColumns: sourcesGridColumns }"
              :tabindex="hasAlignmentData ? 0 : undefined"
              @click="hasAlignmentData && toggleSource(src.ip)"
              @keydown.enter="hasAlignmentData && toggleSource(src.ip)"
            >
              <span class="ip">{{ src.ip }}</span>
              <span class="domain" :title="src.headerFrom || ''">{{ src.headerFrom ?? '-' }}</span>
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
              <template v-if="hasAlignmentData">
                <span class="result" :class="alignmentClass(src.spfAlignment)">
                  {{ alignmentLabel(src.spfAlignment) }}
                </span>
                <span class="result" :class="alignmentClass(src.dkimAlignment)">
                  {{ alignmentLabel(src.dkimAlignment) }}
                </span>
                <span class="expand-arrow">{{ isSourceExpanded(src.ip) ? '▾' : '▸' }}</span>
              </template>
              <template v-else>
                <span v-if="hasEnvelopeFrom" class="envelope-from">{{ src.envelopeFrom ?? '-' }}</span>
                <span v-if="hasSpfScope" class="spf-scope">{{ src.spfScope ?? '-' }}</span>
              </template>
            </div>

            <!-- Expanded source detail -->
            <div v-if="hasAlignmentData && isSourceExpanded(src.ip)" class="source-detail">
              <div class="source-detail-grid">
                <div v-if="src.headerFrom" class="source-detail-item">
                  <span class="label">Header From:</span>
                  <span class="value monospace">{{ src.headerFrom }}</span>
                </div>
                <div v-if="src.envelopeFrom" class="source-detail-item">
                  <span class="label">Envelope From:</span>
                  <span class="value monospace">{{ src.envelopeFrom }}</span>
                </div>
                <div v-if="src.spfDomains?.length" class="source-detail-item">
                  <span class="label">SPF Domain(s):</span>
                  <span class="value monospace">{{ src.spfDomains.join(', ') }}</span>
                </div>
                <div v-if="src.dkimDomains?.length" class="source-detail-item">
                  <span class="label">DKIM Domain(s):</span>
                  <span class="value monospace">{{ src.dkimDomains.join(', ') }}</span>
                </div>
                <div v-if="src.dkimSelectors?.length" class="source-detail-item">
                  <span class="label">DKIM Selector(s):</span>
                  <span class="value monospace">{{ src.dkimSelectors.join(', ') }}</span>
                </div>
                <div v-if="src.dispositions?.length" class="source-detail-item">
                  <span class="label">Disposition(s):</span>
                  <span class="value">{{ src.dispositions.join(', ') }}</span>
                </div>
                <div v-if="src.spfScope" class="source-detail-item">
                  <span class="label">SPF Scope:</span>
                  <span class="value">{{ src.spfScope }}</span>
                </div>
              </div>
              <div v-if="src.failureReasons?.length" class="source-failure-reasons">
                <span class="label">Why it failed:</span>
                <ul>
                  <li v-for="reason in src.failureReasons" :key="reason">{{ reason }}</li>
                </ul>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Detailed Records -->
      <div v-if="result.records?.length" class="records-section">
        <button type="button" class="collapse-toggle" @click="showRecords = !showRecords">
          {{ showRecords ? '▾' : '▸' }} Detailed Records ({{ result.records.length }})
        </button>
        <div v-if="showRecords" class="records-list">
          <div
            v-for="(rec, i) in result.records"
            :key="i"
            class="record-card"
          >
            <div class="record-head">
              <div class="record-id">
                <span class="status-dot" :class="rec.dmarcResult === 'pass' ? 'pass' : 'fail'"></span>
                <span class="ip monospace">{{ rec.sourceIp }}</span>
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
            <div
              v-if="rec.headerFrom || rec.envelopeFrom || rec.policyEvaluated?.reasons?.length"
              class="record-meta"
            >
              <span v-if="rec.headerFrom" class="record-meta-item">
                From <span class="monospace">{{ rec.headerFrom }}</span>
              </span>
              <span v-if="rec.envelopeFrom" class="record-meta-item">
                Envelope <span class="monospace">{{ rec.envelopeFrom }}</span>
              </span>
              <span v-if="rec.policyEvaluated?.reasons?.length" class="record-meta-item">
                Overrides:
                <span v-for="(reason, ri) in rec.policyEvaluated.reasons" :key="ri">
                  {{ formatOverride(reason) }}<template v-if="ri < rec.policyEvaluated.reasons.length - 1">, </template>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Errors -->
      <div v-if="result.errors?.length" class="section errors-section">
        <h4>Errors</h4>
        <ul>
          <li v-for="error in result.errors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <!-- DKIM selector notices (info, not an error) -->
      <div v-if="dkimWarnings.length" class="section dkim-notice-section">
        <h4>Notices</h4>
        <ul>
          <li v-for="warning in dkimWarnings" :key="warning">{{ warning }}</li>
        </ul>
      </div>

      <!-- Warnings -->
      <div v-if="regularWarnings.length" class="section warnings-section">
        <h4>Warnings</h4>
        <ul>
          <li v-for="warning in regularWarnings" :key="warning">{{ warning }}</li>
        </ul>
      </div>

      <!-- Recommendations -->
      <div v-if="regularRecommendations.length" class="section recommendations-section">
        <h4>Recommendations</h4>
        <ul>
          <li v-for="rec in regularRecommendations" :key="rec">{{ rec }}</li>
        </ul>
      </div>

      <!-- Forwarding (informational) -->
      <div v-if="forwardingRecommendations.length" class="section dkim-notice-section">
        <h4>Forwarding Detected</h4>
        <ul>
          <li v-for="rec in forwardingRecommendations" :key="rec">{{ rec }}</li>
        </ul>
      </div>

      <!-- Policy test mode (informational, not a failure) -->
      <div v-if="testModeRecommendations.length" class="section test-mode-rec-section">
        <h4>Policy Test Mode</h4>
        <ul>
          <li v-for="rec in testModeRecommendations" :key="rec">{{ rec }}</li>
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
  background: rgba(19, 176, 238, 0.02);
  border-radius: 8px;
}

.drag-overlay-fields {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(19, 176, 238, 0.08);
  backdrop-filter: blur(4px);
  z-index: 100;
  pointer-events: none;
  border-radius: 8px;
  border: 2px dashed rgba(19, 176, 238, 0.3);
  animation: fadeInSubtle 0.2s ease-out;
}

.drag-content {
  text-align: center;
  color: var(--vp-c-brand);
  padding: 1.5rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(19, 176, 238, 0.2);
  box-shadow: 0 4px 16px rgba(19, 176, 238, 0.1);
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
  color: var(--vp-c-brand);
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
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px rgba(19, 176, 238, 0.1);
}

.form-group input:disabled,
.form-group textarea:disabled {
  background: var(--vp-c-bg-mute, #f1f5f9);
  opacity: 0.6;
  cursor: not-allowed;
}

/* File Upload Area - Using Brand Colors */
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
  border-color: var(--vp-c-brand);
  background: rgba(19, 176, 238, 0.05);
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
  border: 2px solid var(--vp-c-brand);
  border-radius: 8px;
}

.file-name {
  flex: 1;
  min-width: 0;
  font-weight: 600;
  color: var(--vp-c-brand);
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
  overflow: visible;
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
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
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
  overflow: visible;
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
  display: flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
}

.alignment-status-box.pass {
  color: #217b2d;
  background: #ebf7ed;
  border: 1px solid rgba(34, 187, 51, 0.2);
}

.alignment-status-box.fail {
  color: #b91c1c;
  background: #fbeaea;
  border: 1px solid rgba(234, 67, 53, 0.2);
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

.table-row .domain {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.875rem;
  color: var(--vp-c-text-1, #374151);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
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

.errors-section {
  background: var(--vp-danger-soft, #fef2f2);
  border: 1px solid rgba(220, 53, 69, 0.15);
}

.errors-section h4 {
  color: var(--vp-c-danger-1, #b91c1c);
}

.warnings-section {
  background: var(--vp-warning-soft, #fffbf0);
  border: 1px solid rgba(214, 158, 46, 0.2);
}

.warnings-section h4 {
  color: var(--vp-c-warning-1, #d69e2e);
}

.recommendations-section {
  background: var(--vp-tip-soft, #f0f9ff);
  border: 1px solid rgba(23, 162, 184, 0.18);
}

.recommendations-section h4 {
  color: var(--vp-c-tip-1, #17a2b8);
}

.dkim-notice-section {
  background: #f0f9ff;
  border: 1px solid rgba(59, 130, 246, 0.18);
}

.dkim-notice-section h4 {
  color: #1d4ed8;
}

.test-mode-rec-section {
  background: #f0f9ff;
  border: 1px solid rgba(59, 130, 246, 0.18);
}

.test-mode-rec-section h4 {
  color: #1d4ed8;
}

.table-row .envelope-from {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.875rem;
  color: var(--vp-c-text-2, #6b7280);
  word-break: break-all;
}

.table-row .spf-scope {
  font-size: 0.875rem;
  color: var(--vp-c-text-2, #6b7280);
}

/* ---- Auth Summary ---- */
.auth-summary-section {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.auth-summary-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
}

.auth-summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 1rem;
}

.auth-card {
  padding: 1rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
  border-radius: 8px;
}

.auth-card-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-1, #374151);
}

.alignment-mode-badge {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: rgba(19, 176, 238, 0.12);
  color: var(--vp-c-brand);
}

.auth-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.auth-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.25rem;
  border-radius: 6px;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border-soft, #eee);
  text-align: center;
}

.auth-stat-num {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
}

.auth-stat-label {
  font-size: 0.7rem;
  color: var(--vp-c-text-2, #6b7280);
  line-height: 1.3;
}

.auth-stat.pass .auth-stat-num { color: #22bb33; }
.auth-stat.warn .auth-stat-num { color: #d69e2e; }
.auth-stat.fail .auth-stat-num { color: #ea4335; }
.auth-stat.muted .auth-stat-num { color: var(--vp-c-text-2, #6b7280); }

/* ---- Protocol Section ---- */
.protocol-section {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.protocol-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
}

.protocol-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.proto-badge {
  display: inline-block;
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
}

.proto-badge.pass { background: #ebf7ed; color: #217b2d; }
.proto-badge.warn { background: #fff8e6; color: #b45309; }
.proto-badge.fail { background: #fbeaea; color: #b91c1c; }
.proto-badge.muted { background: var(--vp-c-bg-mute, #f1f5f9); color: var(--vp-c-text-2, #6b7280); }

/* ---- Alignment cells ---- */
.table-row .result.warn {
  color: #d69e2e;
  font-weight: 600;
}

.table-row .result.muted {
  color: var(--vp-c-text-2, #9ca3af);
  font-weight: 500;
}

.table-row.clickable {
  cursor: pointer;
}

.table-row.expanded {
  background: var(--vp-c-bg-soft, #f8f9fa);
}

.expand-arrow {
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.8rem;
  text-align: right;
}

/* ---- Expanded source detail ---- */
.source-detail {
  padding: 0.75rem 1.25rem 1rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-bottom: 1px solid var(--vp-c-border-soft, #eee);
  font-size: 0.875rem;
}

.source-detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.5rem 1.5rem;
  margin-bottom: 0.5rem;
}

.source-detail-item .label {
  color: var(--vp-c-text-2, #6b7280);
  font-weight: 500;
  margin-right: 0.4rem;
}

.source-detail-item .value {
  color: var(--vp-c-text-1, #374151);
  font-weight: 600;
  word-break: break-all;
}

.source-detail-item .value.monospace,
.record-card .monospace {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.85em;
}

.source-failure-reasons .label {
  color: #b91c1c;
  font-weight: 600;
  font-size: 0.85rem;
}

.source-failure-reasons ul {
  margin: 0.25rem 0 0;
  padding-left: 1.25rem;
}

.source-failure-reasons li {
  margin: 0.2rem 0;
  color: var(--vp-c-text-1, #374151);
}

/* ---- Detailed Records ---- */
.records-section {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.collapse-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #374151);
  padding: 0;
}

.collapse-toggle:hover {
  color: var(--vp-c-brand);
}

.records-list {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.record-card {
  padding: 0.875rem 1.125rem;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  border-radius: 10px;
  background: var(--vp-c-bg, #ffffff);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.record-card:hover {
  border-color: var(--vp-c-border, #d1d5db);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.record-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.625rem;
}

.record-id {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.record-id .ip {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-1, #1f2937);
}

.record-count {
  color: var(--vp-c-text-3, #9ca3af);
  font-size: 0.8rem;
  font-weight: 500;
}

.record-badges {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
}

/* Status dot, the single source of color */
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--vp-c-text-3, #9ca3af);
}

.status-dot.pass { background: #16a34a; }
.status-dot.warn { background: #d97706; }
.status-dot.fail { background: #dc2626; }
.status-dot.muted { background: var(--vp-c-text-3, #c3c8cf); }

/* Soft pill for the headline verdict */
.status-pill {
  padding: 0.125rem 0.625rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.status-pill.pass {
  background: rgba(22, 163, 74, 0.1);
  color: #15803d;
}

.status-pill.fail {
  background: rgba(220, 38, 38, 0.08);
  color: #b91c1c;
}

/* Neutral chips for secondary facts (disposition, forwarded) */
.chip {
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--vp-c-text-2, #6b7280);
  background: var(--vp-c-bg-soft, #f3f4f6);
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
}

/* SPF / DKIM rows */
.record-auth {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.record-auth-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.5;
}

.record-auth-row .status-dot {
  align-self: center;
}

.auth-label {
  width: 2.75rem;
  flex-shrink: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--vp-c-text-3, #9ca3af);
}

.auth-text {
  color: var(--vp-c-text-1, #374151);
  min-width: 0;
}

/* Muted meta footer */
.record-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  margin-top: 0.625rem;
  padding-top: 0.625rem;
  border-top: 1px solid var(--vp-c-divider-light, #f3f4f6);
  font-size: 0.78rem;
  color: var(--vp-c-text-3, #9ca3af);
}

.record-meta-item .monospace {
  color: var(--vp-c-text-2, #6b7280);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .form-fields-container.drag-hover {
    background: rgba(19, 176, 238, 0.03);
  }
  
  .drag-overlay-fields {
    background: rgba(19, 176, 238, 0.12);
    border-color: rgba(19, 176, 238, 0.4);
  }
  
  .drag-content {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(19, 176, 238, 0.3);
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

  .dkim-notice-section {
    background: rgba(59, 130, 246, 0.1);
  }

  .dkim-notice-section h4,
  .dkim-notice-section li {
    color: #93c5fd;
  }

  .test-mode-rec-section {
    background: rgba(59, 130, 246, 0.1);
  }

  .test-mode-rec-section h4,
  .test-mode-rec-section li {
    color: #93c5fd;
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

  .proto-badge.pass { background: rgba(34, 187, 51, 0.15); color: #6ee787; }
  .proto-badge.warn { background: rgba(214, 158, 46, 0.15); color: #f0c36b; }
  .proto-badge.fail { background: rgba(234, 67, 53, 0.15); color: #f1948a; }

  .auth-stat {
    background: var(--vp-c-bg-soft, #252736);
    border-color: var(--vp-c-border, #404040);
  }

  .record-card {
    background: var(--vp-c-bg-soft, #1e2030);
    border-color: var(--vp-c-border, #2e3142);
  }

  .record-card:hover {
    border-color: var(--vp-c-border, #3e4156);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  }

  .status-pill.pass { background: rgba(22, 163, 74, 0.18); color: #6ee787; }
  .status-pill.fail { background: rgba(220, 38, 38, 0.18); color: #f1948a; }

  .chip {
    background: var(--vp-c-bg-mute, #2a2d3e);
    border-color: var(--vp-c-border, #3a3d50);
  }

  .record-meta {
    border-top-color: var(--vp-c-border, #2e3142);
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

  .auth-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .source-detail-grid {
    grid-template-columns: 1fr;
  }

  .expand-arrow {
    display: none;
  }

  .table-row .domain {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
    word-break: break-all;
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
