<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { checkDmarc } from '../../../connectors/bluefoxEmailToolsApi.js'
import { isSessionValid } from '../../../connectors/turnstileSession.js'
import { syncWithUrl, loadFromUrl } from './helpers/urlSync.js'
import Turnstile from './Turnstile.vue'
import SignalIcon from './SignalIcon.vue'
import ToolSwitcher from './ToolSwitcher.vue'

const DMARC_TAG_DESCRIPTIONS = {
  v:     'DMARC version tag (should be DMARC1).',
  p:     'Policy for main domain (none/quarantine/reject).',
  sp:    'Subdomain policy (if present).',
  np:    'Policy for non-existent subdomains.',
  rua:   'Aggregate report recipient(s).',
  ruf:   'Forensic report recipient(s).',
  adkim: 'DKIM alignment mode (r=relaxed, s=strict).',
  aspf:  'SPF alignment mode (r=relaxed, s=strict).',
  pct:   'Percent of mail subject to filtering.',
  fo:    'Failure reporting options.',
  ri:    'Report interval in seconds.',
  t:     'Test mode flag (y = testing, policy not enforced).',
  psd:   'Public suffix domain flag.',
  rf:    'Report format (deprecated).',
}

const domain        = ref('')
const loading       = ref(false)
const result        = ref(null)
const errorMessage  = ref('')
const showRawRecord = ref(false)
const showTagTable  = ref(false)

const turnstileRef   = ref(null)
const turnstileToken = ref('')
const resultsRef = ref(null)

const isFormDisabled = computed(() => loading.value)

const dmarcTags = computed(() => {
  const parsed       = result.value?.parsed       || {}
  const explanations = result.value?.explanations || {}
  return Object.entries(DMARC_TAG_DESCRIPTIONS)
    .map(([tag, description]) => ({
      tag:         tag.toUpperCase(),
      value:       parsed[tag] || '',
      description: explanations[tag] || description,
    }))
    .filter(item => item.value)
})

const policySignal = computed(() => {
  const p = result.value?.parsed?.p?.toLowerCase()
  if (p === 'reject')      return { label: 'Reject',      level: 'strong',  icon: 'check' }
  if (p === 'quarantine')  return { label: 'Quarantine',  level: 'medium',  icon: 'minus' }
  if (p === 'none')        return { label: 'None',        level: 'weak',    icon: 'alert' }
  return null
})

const pctSignal = computed(() => {
  const pct = result.value?.parsed?.pct
  if (!pct) return { label: '100% (default)', level: 'strong', icon: 'check' }
  const n = parseInt(pct, 10)
  if (n === 100) return { label: '100%',      level: 'strong', icon: 'check' }
  if (n >= 50)   return { label: `${n}%`,     level: 'medium', icon: 'minus' }
  return         { label: `${n}%`,            level: 'weak',   icon: 'alert' }
})

const dkimAlignSignal = computed(() => {
  const adkim = result.value?.parsed?.adkim?.toLowerCase()
  if (adkim === 's') return { label: 'DKIM Strict',  level: 'strong', icon: 'check' }
  return               { label: 'DKIM Relaxed', level: 'medium', icon: 'minus' }
})

const spfAlignSignal = computed(() => {
  const aspf = result.value?.parsed?.aspf?.toLowerCase()
  if (aspf === 's') return { label: 'SPF Strict',  level: 'strong', icon: 'check' }
  return              { label: 'SPF Relaxed', level: 'medium', icon: 'minus' }
})

const ruaSignal = computed(() => {
  const rua = result.value?.parsed?.rua
  if (rua) return { label: 'Reports On',  level: 'strong', icon: 'check' }
  return    { label: 'No Reports',   level: 'weak',   icon: 'alert' }
})

const rufSignal = computed(() => {
  const ruf = result.value?.parsed?.ruf
  if (ruf) return { label: 'Forensics On', level: 'medium', icon: 'minus' }
  return    { label: 'No Forensics', level: 'muted',  icon: 'dot' }
})

const criticalWarnings = computed(() =>
  result.value?.warnings?.filter(w =>
    !/^t=y/i.test(w) && !/deprecated/i.test(w)
  ) ?? []
)

const deprecatedWarnings = computed(() =>
  result.value?.warnings?.filter(w => /deprecated/i.test(w)) ?? []
)

const testModeWarning = computed(() =>
  result.value?.warnings?.find(w => /^t=y/i.test(w)) ?? null
)

const recommendations = computed(() =>
  result.value?.recommendations ?? []
)

function onTurnstileVerified(token)  { turnstileToken.value = token }
function onTurnstileInvalid()        { turnstileToken.value = '' }

function resetTurnstile() {
  turnstileToken.value = ''
  turnstileRef.value?.reset()
}

function validateInputs() {
  if (!domain.value?.trim()) {
    errorMessage.value = 'Please enter a domain name'
    return false
  }
  return true
}

async function checkDmarcHandler() {
  result.value      = null
  loading.value     = true
  errorMessage.value = ''
  showRawRecord.value = false
  showTagTable.value  = false

  try {
    if (!validateInputs()) { loading.value = false; return }

    if (!isSessionValid()) {
      turnstileToken.value = await turnstileRef.value.getToken()
    }

    const data = await checkDmarc({
      domain:         domain.value,
      turnstileToken: turnstileToken.value,
    })

    result.value = {
      valid:        true,
      domain:       data.result.domain       || domain.value,
      record:       data.result.rawRecord    || data.result.record || 'Not found',
      parsed:       data.result.parsed       || {},
      explanations: data.result.explanations || {},
      checkedRecord: data.result.checkedRecord,
      score:        data.result.score,
      protocol:     data.result.protocol     || null,
      warnings:     data.result.warnings     || [],
      recommendations: data.result.recommendations || [],
    }

    resetTurnstile()
  } catch (err) {
    errorMessage.value = err.message || 'Network error. Please try again.'
    if (err.status === 401) resetTurnstile()
  } finally {
    loading.value = false
  }
}

watch(domain, () => syncWithUrl({ domain: domain.value }))

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)

  loadFromUrl({ domain })
  await nextTick()

  if (urlParams.get('run') === '1' && domain.value) {
    await turnstileRef.value?.whenReady()
    await checkDmarcHandler()
    await nextTick()
    resultsRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})
</script>

<template>
  <div class="dmarc-checker">

    <ToolSwitcher :domain="domain" />

    <!-- ── Inline form ── -->
    <div class="search-bar" :class="{ 'has-result': result }">
      <form class="search-form" @submit.prevent="checkDmarcHandler">
        <div class="search-input-wrap">
          <span class="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input
            id="domain"
            v-model="domain"
            type="text"
            placeholder="example.com"
            :disabled="loading"
            autocomplete="off"
            spellcheck="false"
            required
          />
          <button
            v-if="domain && !loading"
            type="button"
            class="search-clear"
            aria-label="Clear domain"
            @click="domain = ''"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <button type="submit" class="search-btn" :disabled="isFormDisabled">
          <span v-if="loading" class="btn-loading">
            <span class="spinner"></span>
          </span>
          <span v-else>Check DMARC</span>
        </button>
      </form>

      <Turnstile
        ref="turnstileRef"
        class="turnstile-row"
        :class="{ 'turnstile-collapsed': result }"
        @verified="onTurnstileVerified"
        @expired="onTurnstileInvalid"
        @error="onTurnstileInvalid"
      />
    </div>

    <!-- ── Error ── -->
    <div v-if="errorMessage" class="error-pill">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      {{ errorMessage }}
    </div>

    <!-- ── Results ── -->
    <div v-if="result" class="results" ref="resultsRef">

      <!-- Hero status -->
      <div class="hero" :class="result.valid ? 'hero-pass' : 'hero-fail'">
        <div class="hero-icon" :class="result.valid ? 'icon-pass' : 'icon-fail'">
          <svg v-if="result.valid" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <div class="hero-text">
          <h2 class="hero-title">{{ result.valid ? 'DMARC Configured' : 'DMARC Missing' }}</h2>
          <p class="hero-domain">{{ result.checkedRecord || ('_dmarc.' + result.domain) }}</p>
        </div>
        <div v-if="result.score" class="hero-score">
          <span class="score-num">{{ result.score.value }}<span class="score-denom">/{{ result.score.outOf }}</span></span>
          <span class="score-label" :class="'score-' + result.score.level?.toLowerCase()">{{ result.score.level }}</span>
        </div>
      </div>

      <!-- Policy signals grid -->
      <div v-if="result.valid" class="signals-grid">
        <div class="signal" :class="'signal-' + policySignal?.level">
          <span class="signal-icon"><SignalIcon :name="policySignal?.icon" /></span>
          <span class="signal-name">Policy</span>
          <span class="signal-value">{{ policySignal?.label }}</span>
        </div>
        <div class="signal" :class="'signal-' + pctSignal?.level">
          <span class="signal-icon"><SignalIcon :name="pctSignal?.icon" /></span>
          <span class="signal-name">Coverage</span>
          <span class="signal-value">{{ pctSignal?.label }}</span>
        </div>
        <div class="signal" :class="'signal-' + dkimAlignSignal?.level">
          <span class="signal-icon"><SignalIcon :name="dkimAlignSignal?.icon" /></span>
          <span class="signal-name">DKIM Align</span>
          <span class="signal-value">{{ dkimAlignSignal?.label }}</span>
        </div>
        <div class="signal" :class="'signal-' + spfAlignSignal?.level">
          <span class="signal-icon"><SignalIcon :name="spfAlignSignal?.icon" /></span>
          <span class="signal-name">SPF Align</span>
          <span class="signal-value">{{ spfAlignSignal?.label }}</span>
        </div>
        <div class="signal" :class="'signal-' + ruaSignal?.level">
          <span class="signal-icon"><SignalIcon :name="ruaSignal?.icon" /></span>
          <span class="signal-name">Aggregate</span>
          <span class="signal-value">{{ ruaSignal?.label }}</span>
        </div>
        <div class="signal" :class="'signal-' + rufSignal?.level">
          <span class="signal-icon"><SignalIcon :name="rufSignal?.icon" /></span>
          <span class="signal-name">Forensic</span>
          <span class="signal-value">{{ rufSignal?.label }}</span>
        </div>
      </div>

      <!-- Test-mode banner -->
      <div v-if="testModeWarning" class="alert alert-testmode">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div>
          <strong>Test mode active — policy not enforced</strong>
          <p>{{ testModeWarning }}</p>
        </div>
      </div>

      <!-- Critical warnings -->
      <div v-if="criticalWarnings.length" class="alert alert-warn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <ul>
          <li v-for="w in criticalWarnings" :key="w">{{ w }}</li>
        </ul>
      </div>

      <!-- Recommendations -->
      <div v-if="recommendations.length" class="alert alert-tip">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <ul>
          <li v-for="r in recommendations" :key="r">{{ r }}</li>
        </ul>
      </div>

      <!-- Deprecated notices -->
      <div v-if="deprecatedWarnings.length" class="alert alert-muted">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <ul>
          <li v-for="w in deprecatedWarnings" :key="w">{{ w }}</li>
        </ul>
      </div>

      <!-- Expert details — collapsed by default -->
      <div class="disclosures">
        <details class="disclosure">
          <summary class="disclosure-trigger" @click="showRawRecord = !showRawRecord">
            <span class="disclosure-label">Raw record</span>
            <svg class="disclosure-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div class="disclosure-body">
            <code class="raw-record">{{ result.record }}</code>
          </div>
        </details>

        <details v-if="dmarcTags.length" class="disclosure">
          <summary class="disclosure-trigger">
            <span class="disclosure-label">Tag breakdown</span>
            <svg class="disclosure-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div class="disclosure-body">
            <table class="tag-table">
              <thead>
                <tr>
                  <th>Tag</th>
                  <th>Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tag in dmarcTags" :key="tag.tag">
                  <td class="td-tag">{{ tag.tag }}</td>
                  <td class="td-value">{{ tag.value }}</td>
                  <td class="td-desc">{{ tag.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      </div>

    </div><!-- /results -->
  </div>
</template>

<style scoped>
/* ── Root ── */
.dmarc-checker {
  max-width: 780px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
  font-family: inherit;
}

/* ── Search bar ── */
.search-bar {
  margin: 2rem 0 1.5rem;
  transition: margin 0.2s;
}

.search-bar.has-result {
  margin: 0 0 1rem;
}

.search-form {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  transition: transform 0.2s;
}

.search-input-wrap {
  flex: 1;
  min-width: 220px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.875rem;
  color: var(--vp-c-text-3, #9ca3af);
  display: flex;
  pointer-events: none;
}

.search-input-wrap input {
  width: 100%;
  padding: 0.75rem 2.25rem 0.75rem 2.5rem;
  border: 1.5px solid var(--vp-c-border, #e5e7eb);
  border-radius: 10px;
  font-size: 1rem;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text-1, #111827);
  transition: border-color 0.15s, box-shadow 0.15s, padding 0.2s;
  box-sizing: border-box;
}

.has-result .search-input-wrap input {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 0.9rem;
}

.search-clear {
  position: absolute;
  right: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: var(--vp-c-bg-mute, #f1f5f9);
  color: var(--vp-c-text-2, #6b7280);
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
}

.search-clear:hover {
  background: var(--vp-c-bg-soft, #e5e7eb);
  color: var(--vp-c-text-1, #111827);
}

.search-input-wrap input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px hsla(197, 87%, 50%, 0.12);
}

.search-input-wrap input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.turnstile-row {
  display: flex;
  justify-content: center;
  margin-top: 0.75rem;
  transition: opacity 0.2s, max-height 0.2s, margin 0.2s;
  overflow: hidden;
}

.turnstile-row.turnstile-collapsed {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  pointer-events: none;
  position: absolute;
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, transform 0.1s, box-shadow 0.15s, padding 0.2s;
  box-shadow: 0 1px 4px hsla(197, 87%, 50%, 0.3);
  min-width: 130px;
}

.has-result .search-btn {
  padding: 0.5rem 1.25rem;
  min-width: 100px;
  font-size: 0.825rem;
}

.search-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px hsla(197, 87%, 50%, 0.35);
}

.search-btn:active:not(:disabled) {
  transform: translateY(0);
}

.search-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2.5px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Error ── */
.error-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

/* ── Results ── */
.results {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

/* ── Hero ── */
.hero {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem 1.75rem;
  border-radius: 14px;
  border: 1px solid transparent;
}

.hero-pass {
  background: linear-gradient(135deg, rgba(22,163,74,0.06) 0%, rgba(19,176,238,0.04) 100%);
  border-color: rgba(22, 163, 74, 0.2);
}

.hero-fail {
  background: rgba(220, 38, 38, 0.04);
  border-color: rgba(220, 38, 38, 0.18);
}

.hero-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-pass {
  background: rgba(22, 163, 74, 0.12);
  color: #16a34a;
  border: 1px solid rgba(22, 163, 74, 0.2);
}

.icon-fail {
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  border: 1px solid rgba(220, 38, 38, 0.15);
}

.hero-text {
  flex: 1;
  min-width: 0;
}

.hero-title {
  margin: 0 0 0.25rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #111827);
  line-height: 1.2;
}

.hero-domain {
  margin: 0;
  font-size: 0.825rem;
  color: var(--vp-c-text-2, #6b7280);
  font-family: var(--vp-font-family-mono, monospace);
  word-break: break-all;
}

.hero-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
}

.score-num {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--vp-c-text-1, #111827);
  line-height: 1;
}

.score-denom {
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-3, #9ca3af);
}

.score-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}

.score-strong, .score-excellent { background: rgba(22,163,74,0.12); color: #15803d; }
.score-good,   .score-medium   { background: rgba(217,119,6,0.12);  color: #b45309; }
.score-poor,   .score-weak     { background: rgba(220,38,38,0.1);   color: #dc2626; }

/* ── Signals grid ── */
.signals-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  background: var(--vp-c-bg, #fff);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 12px;
  padding: 1rem;
}

.signal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.625rem 0.25rem;
  border-radius: 8px;
  text-align: center;
}

.signal-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.signal-name {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-2, #6b7280);
}

.signal-value {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #374151);
}

/* Signal states */
.signal-strong .signal-icon { background: rgba(22,163,74,0.12); color: #16a34a; }
.signal-medium .signal-icon { background: rgba(217,119,6,0.12);  color: #d97706; }
.signal-weak   .signal-icon { background: rgba(220,38,38,0.1);   color: #dc2626; }
.signal-muted  .signal-icon { background: var(--vp-c-bg-soft, #f3f4f6); color: var(--vp-c-text-3, #9ca3af); }

.signal-strong { background: rgba(22,163,74,0.04); }
.signal-medium { background: rgba(217,119,6,0.04); }
.signal-weak   { background: rgba(220,38,38,0.03); }
.signal-muted  { background: transparent; }

/* ── Alerts ── */
.alert {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  border: 1px solid transparent;
  font-size: 0.875rem;
  line-height: 1.6;
}

.alert > svg {
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.alert strong {
  display: block;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.alert p {
  margin: 0;
}

.alert ul {
  margin: 0;
  padding-left: 1.1rem;
}

.alert li + li {
  margin-top: 0.25rem;
}

.alert-testmode {
  background: rgba(249,115,22,0.07);
  border-color: rgba(249,115,22,0.25);
  color: #9a3412;
}

.alert-testmode > svg { color: #ea580c; }

.alert-warn {
  background: rgba(217,119,6,0.06);
  border-color: rgba(217,119,6,0.2);
  color: var(--vp-c-text-1, #374151);
}

.alert-warn > svg { color: #d97706; }

.alert-tip {
  background: hsla(197, 87%, 50%, 0.05);
  border-color: hsla(197, 87%, 50%, 0.2);
  color: var(--vp-c-text-1, #374151);
}

.alert-tip > svg { color: var(--vp-c-brand-dark, #0891b2); }

.alert-muted {
  background: var(--vp-c-bg-soft, #f9fafb);
  border-color: var(--vp-c-border, #e5e7eb);
  color: var(--vp-c-text-2, #6b7280);
}

.alert-muted > svg { color: var(--vp-c-text-3, #9ca3af); }

/* ── Disclosure (details/summary) ── */
.disclosures {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

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

.disclosure-trigger:hover {
  background: var(--vp-c-bg-soft, #f8f9fa);
}

.disclosure-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #374151);
}

.disclosure-chevron {
  color: var(--vp-c-text-3, #9ca3af);
  transition: transform 0.2s ease;
}

details[open] .disclosure-chevron {
  transform: rotate(180deg);
}

.disclosure-body {
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid var(--vp-c-border-soft, #f1f5f9);
}

.raw-record {
  display: block;
  padding: 0.875rem 1rem;
  margin-top: 1rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.8rem;
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 1.6;
  color: var(--vp-c-text-1, #374151);
}

/* ── Tag table ── */
.tag-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.825rem;
}

.tag-table th {
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-2, #6b7280);
  border-bottom: 1px solid var(--vp-c-border, #e5e7eb);
}

.tag-table td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-border-soft, #f1f5f9);
  vertical-align: top;
}

.tag-table tr:last-child td {
  border-bottom: none;
}

.td-tag {
  font-family: monospace;
  font-weight: 700;
  color: var(--vp-c-brand);
  white-space: nowrap;
}

.td-value {
  font-family: monospace;
  word-break: break-all;
  color: var(--vp-c-text-1, #374151);
}

.td-desc {
  color: var(--vp-c-text-2, #6b7280);
  line-height: 1.5;
}

/* ── Dark mode ── */
.dark .hero-pass {
  background: linear-gradient(135deg, rgba(22,163,74,0.09) 0%, rgba(19,176,238,0.06) 100%);
  border-color: rgba(22,163,74,0.25);
}

.dark .hero-fail {
  background: rgba(220,38,38,0.08);
  border-color: rgba(220,38,38,0.22);
}

.dark .icon-pass {
  background: rgba(22,163,74,0.18);
  color: #4ade80;
  border-color: rgba(22,163,74,0.25);
}

.dark .icon-fail {
  background: rgba(220,38,38,0.18);
  color: #f87171;
  border-color: rgba(220,38,38,0.2);
}

.dark .score-strong, .dark .score-excellent { background: rgba(22,163,74,0.2); color: #4ade80; }
.dark .score-good,   .dark .score-medium   { background: rgba(217,119,6,0.2);  color: #fbbf24; }
.dark .score-poor,   .dark .score-weak     { background: rgba(220,38,38,0.2);  color: #f87171; }

.dark .signal-strong .signal-icon { background: rgba(22,163,74,0.2); color: #4ade80; }
.dark .signal-medium .signal-icon { background: rgba(217,119,6,0.2);  color: #fbbf24; }
.dark .signal-weak   .signal-icon { background: rgba(220,38,38,0.2);  color: #f87171; }

.dark .alert-testmode {
  background: rgba(249,115,22,0.12);
  border-color: rgba(249,115,22,0.3);
  color: #fdba74;
}

.dark .alert-warn {
  background: rgba(217,119,6,0.1);
  border-color: rgba(217,119,6,0.25);
  color: var(--vp-c-text-1);
}

.dark .alert-tip {
  background: hsla(197, 87%, 50%, 0.08);
  border-color: hsla(197, 87%, 50%, 0.25);
  color: var(--vp-c-text-1);
}

.dark .alert-tip > svg { color: var(--vp-c-brand-light); }

.dark .raw-record {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-light);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .signals-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .hero {
    padding: 1.25rem;
    gap: 1rem;
  }

  .hero-score {
    align-self: flex-start;
  }

  .search-form {
    flex-direction: column;
    align-items: stretch;
  }

  .search-btn {
    width: 100%;
  }
}

@media (max-width: 400px) {
  .signals-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero {
    flex-wrap: wrap;
  }
}
</style>
