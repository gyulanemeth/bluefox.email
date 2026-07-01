<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { checkSpf } from '../../../connectors/bluefoxEmailToolsApi.js'
import { isSessionValid } from '../../../connectors/turnstileSession.js'
import { syncWithUrl, loadFromUrl } from './helpers/urlSync.js'
import Turnstile from './Turnstile.vue'
import SignalIcon from './SignalIcon.vue'
import ToolSwitcher from './ToolSwitcher.vue'

const domain       = ref('')
const testIp       = ref('')
const showIpField  = ref(false)
const loading      = ref(false)
const result       = ref(null)
const errorMessage = ref('')

const history      = ref([])
const currentIndex = ref(-1)

const turnstileRef   = ref(null)
const turnstileToken = ref('')
const resultsRef = ref(null)

const isFormDisabled = computed(() => loading.value)

const lookupSignal = computed(() => {
  const n = result.value?.lookups
  if (n == null) return null
  if (n > 10) return { label: `${n} (exceeds 10)`, level: 'weak', icon: 'alert' }
  if (n >= 8)  return { label: `${n} of 10`, level: 'medium', icon: 'minus' }
  return { label: `${n} of 10`, level: 'strong', icon: 'check' }
})

const policySignal = computed(() => {
  const p = result.value?.policy
  if (!p) return null
  if (p.includes('-all')) return { label: 'Hard fail (-all)', level: 'strong', icon: 'check' }
  if (p.includes('~all')) return { label: 'Soft fail (~all)', level: 'medium', icon: 'minus' }
  if (p.includes('?all')) return { label: 'Neutral (?all)', level: 'weak', icon: 'alert' }
  if (p.includes('+all')) return { label: 'Allow all (+all)', level: 'weak', icon: 'alert' }
  return { label: p, level: 'muted', icon: 'dot' }
})

function onTurnstileVerified(token) { turnstileToken.value = token }
function onTurnstileInvalid()       { turnstileToken.value = '' }

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

async function checkSpfHandler() {
  result.value       = null
  errorMessage.value = ''

  domain.value = domain.value.trim()
  testIp.value = testIp.value.trim()

  if (currentIndex.value < history.value.length - 1) {
    history.value = history.value.slice(0, currentIndex.value + 1)
  }

  loading.value = true

  try {
    if (!validateInputs()) { loading.value = false; return }

    if (!isSessionValid()) {
      turnstileToken.value = await turnstileRef.value.getToken()
    }

    const data = await checkSpf({
      domain: domain.value,
      turnstileToken: turnstileToken.value,
      testIp: testIp.value.trim() || undefined,
    })

    result.value = {
      valid:   true,
      domain:  data.result.domain || domain.value,
      record:  data.result.rawRecord || data.result.record || 'Not found',
      lookups: data.result.lookups,
      policy:  data.result.policy,
      mechanisms: (data.result.mechanisms || []).map(m => {
        const match = m.original.toLowerCase().match(/^(include|redirect|a|mx):([^\s\/]+)/)
        return { ...m, targetDomain: match ? match[2] : null }
      }),
      warnings: data.result.warnings || [],
      recommendations: data.result.recommendations || [],
      mailauthResult: data.result.mailauthResult,
      ipTestResult: data.result.ipTestResult ? {
        ip: data.result.ipTestResult.ip || testIp.value || 'Unknown',
        result: data.result.ipTestResult.result || 'Unknown',
        explanation: data.result.ipTestResult.explanation || null,
      } : null,
      score: data.result.score,
    }

    resetTurnstile()

    const finalState = { domain: domain.value, testIp: testIp.value, result: result.value }
    if (currentIndex.value === -1 || history.value[currentIndex.value]?.domain !== domain.value) {
      history.value.push(finalState)
      currentIndex.value++
    } else {
      history.value[currentIndex.value] = finalState
    }
  } catch (err) {
    errorMessage.value = err.message || 'Network error. Please try again.'
    if (err.status === 401) resetTurnstile()
  } finally {
    loading.value = false
  }
}

function goBack() {
  if (currentIndex.value <= 0) return
  const previous = history.value[currentIndex.value - 1]
  currentIndex.value--
  domain.value = previous.domain
  testIp.value = previous.testIp || ''
  result.value = previous.result
  errorMessage.value = ''
}

function checkIncludedDomain(includedDomain) {
  domain.value = includedDomain
  testIp.value = ''
  result.value = null
  errorMessage.value = ''
  checkSpfHandler()
}

function getIpResultClass(res) {
  const resultString = typeof res === 'string' ? res : (res?.result || res?.status?.result || res?.status || '')
  switch (String(resultString).toLowerCase()) {
    case 'pass': return 'result-pass'
    case 'fail': return 'result-fail'
    case 'softfail': return 'result-softfail'
    case 'neutral': return 'result-neutral'
    case 'permerror':
    case 'temperror': return 'result-error'
    default: return 'result-unknown'
  }
}

function getDisplayResult(res) {
  const resultString = typeof res === 'string' ? res : (res?.result || res?.status?.result || res?.status || '')
  const normalized = String(resultString).toLowerCase()
  switch (normalized) {
    case 'pass': return 'PASS'
    case 'fail': return 'FAIL'
    case 'softfail': return 'SOFTFAIL'
    case 'neutral': return 'NEUTRAL'
    case 'temperror': return 'TEMP ERROR'
    case 'permerror': return 'PERM ERROR'
    default: return normalized ? normalized.toUpperCase() : 'UNKNOWN'
  }
}

watch([domain, testIp], () => syncWithUrl({ domain: domain.value, testIp: testIp.value }))

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)

  loadFromUrl({ domain, testIp })
  if (testIp.value) showIpField.value = true
  await nextTick()

  if (urlParams.get('run') === '1' && domain.value) {
    await turnstileRef.value?.whenReady()
    await checkSpfHandler()
    await nextTick()
    resultsRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})
</script>

<template>
  <div class="spf-checker">

    <ToolSwitcher :domain="domain" />

    <!-- ── Inline form ── -->
    <div class="search-bar" :class="{ 'has-result': result }">
      <form class="search-form" @submit.prevent="checkSpfHandler">
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
          <span v-if="loading" class="btn-loading"><span class="spinner"></span></span>
          <span v-else>Check SPF</span>
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

      <!-- Optional IP test toggle -->
      <div class="ip-toggle-row" v-if="!result || showIpField">
        <button v-if="!showIpField" type="button" class="ip-toggle-btn" @click="showIpField = true">
          + Test a specific IP against this record
        </button>
        <div v-else class="ip-field-wrap">
          <input
            v-model="testIp"
            type="text"
            class="ip-field"
            placeholder="e.g. 203.0.113.2"
            :disabled="loading"
            autocomplete="off"
          />
          <button type="button" class="ip-field-clear" aria-label="Remove IP test" @click="testIp = ''; showIpField = false">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- ── Error ── -->
    <div v-if="errorMessage" class="error-pill">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      {{ errorMessage }}
    </div>

    <!-- ── Back nav ── -->
    <div v-if="currentIndex > 0 && result" class="back-nav">
      <button type="button" @click="goBack" class="back-btn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to "{{ history[currentIndex - 1]?.domain }}"
      </button>
    </div>

    <!-- ── Results ── -->
    <div v-if="result" class="results" ref="resultsRef">

      <!-- Hero -->
      <div class="hero" :class="result.valid && result.record !== 'Not found' ? 'hero-pass' : 'hero-fail'">
        <div class="hero-icon" :class="result.valid && result.record !== 'Not found' ? 'icon-pass' : 'icon-fail'">
          <svg v-if="result.valid && result.record !== 'Not found'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <div class="hero-text">
          <h2 class="hero-title">{{ result.record !== 'Not found' ? 'SPF Record Found' : 'SPF Record Missing' }}</h2>
          <p class="hero-domain">{{ result.domain }}</p>
        </div>
        <div v-if="result.score" class="hero-score">
          <span class="score-num">{{ result.score.value }}<span class="score-denom">/{{ result.score.outOf }}</span></span>
          <span class="score-label" :class="'score-' + result.score.level?.toLowerCase()">{{ result.score.level }}</span>
        </div>
      </div>

      <!-- Signals grid -->
      <div v-if="result.record !== 'Not found'" class="signals-grid">
        <div v-if="policySignal" class="signal" :class="'signal-' + policySignal.level">
          <span class="signal-icon"><SignalIcon :name="policySignal.icon" /></span>
          <span class="signal-name">Policy</span>
          <span class="signal-value">{{ policySignal.label }}</span>
        </div>
        <div v-if="lookupSignal" class="signal" :class="'signal-' + lookupSignal.level">
          <span class="signal-icon"><SignalIcon :name="lookupSignal.icon" /></span>
          <span class="signal-name">DNS Lookups</span>
          <span class="signal-value">{{ lookupSignal.label }}</span>
        </div>
        <div class="signal signal-muted">
          <span class="signal-icon"><SignalIcon name="dot" /></span>
          <span class="signal-name">Mechanisms</span>
          <span class="signal-value">{{ result.mechanisms?.length ?? 0 }}</span>
        </div>
      </div>

      <!-- IP test result -->
      <ClientOnly>
        <div v-if="result.ipTestResult" class="tool-card">
          <h3 class="card-title">IP Test Result</h3>
          <div class="ip-test-card">
            <div class="ip-test-info">
              <span class="ip-address">{{ result.ipTestResult.ip }}</span>
              <span :class="['ip-result-pill', getIpResultClass(result.ipTestResult.result)]">
                {{ getDisplayResult(result.ipTestResult.result) }}
              </span>
            </div>
            <p v-if="result.ipTestResult.explanation" class="ip-explanation">
              {{ result.ipTestResult.explanation }}
            </p>
          </div>
        </div>
      </ClientOnly>

      <!-- Mechanisms -->
      <div v-if="result.mechanisms?.length" class="tool-card">
        <h3 class="card-title">Mechanisms</h3>
        <div class="mechanisms-list">
          <div v-for="m in result.mechanisms" :key="m.original" class="mechanism-item">
            <span class="mechanism-text">
              <template v-if="m.type === 'include' && m.targetDomain">
                include:
                <a href="#" @click.prevent="checkIncludedDomain(m.targetDomain)" class="inline-link">{{ m.targetDomain }}</a>
              </template>
              <template v-else>{{ m.original }}</template>
            </span>
            <span class="mechanism-type" :class="{ 'requires-lookup': m.requiresLookup }">
              {{ m.type }}{{ m.requiresLookup ? ' (DNS)' : '' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Alerts -->
      <div v-if="result.warnings?.length" class="alert alert-warn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <ul><li v-for="w in result.warnings" :key="w">{{ w }}</li></ul>
      </div>

      <div v-if="result.recommendations?.length" class="alert alert-tip">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <ul><li v-for="r in result.recommendations" :key="r">{{ r }}</li></ul>
      </div>

      <!-- Expert disclosures -->
      <div class="disclosures">
        <details class="disclosure">
          <summary class="disclosure-trigger">
            <span class="disclosure-label">Raw SPF record</span>
            <svg class="disclosure-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div class="disclosure-body">
            <code class="raw-record">{{ result.record }}</code>
          </div>
        </details>

        <details v-if="result.mailauthResult" class="disclosure">
          <summary class="disclosure-trigger">
            <span class="disclosure-label">Mailauth validation</span>
            <svg class="disclosure-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div class="disclosure-body">
            <p class="mailauth-status"><strong>Status:</strong> {{ result.mailauthResult.status.result }}</p>
            <pre v-if="result.mailauthResult.info" class="auth-info">{{ result.mailauthResult.info }}</pre>
          </div>
        </details>
      </div>

    </div>
  </div>
</template>

<style scoped>
.spf-checker {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
}

/* Search bar */
.search-bar { margin: 2rem 0 1.5rem; transition: margin 0.2s; }
.search-bar.has-result { margin: 0 0 1rem; }

.search-form {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
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

.has-result .search-input-wrap input { padding-top: 0.5rem; padding-bottom: 0.5rem; font-size: 0.9rem; }

.search-input-wrap input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px hsla(197, 87%, 50%, 0.12);
}

.search-input-wrap input:disabled { opacity: 0.5; cursor: not-allowed; }

.search-clear {
  position: absolute;
  right: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px; height: 20px;
  border: none;
  background: var(--vp-c-bg-mute, #f1f5f9);
  color: var(--vp-c-text-2, #6b7280);
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
}

.search-clear:hover { background: var(--vp-c-bg-soft, #e5e7eb); color: var(--vp-c-text-1, #111827); }

.turnstile-row {
  display: flex;
  justify-content: center;
  margin-top: 0.75rem;
  transition: opacity 0.2s, max-height 0.2s, margin 0.2s;
  overflow: hidden;
}

.turnstile-row.turnstile-collapsed {
  opacity: 0; max-height: 0; margin-top: 0;
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

.has-result .search-btn { padding: 0.5rem 1.25rem; min-width: 100px; font-size: 0.825rem; }
.search-btn:hover:not(:disabled) { background: var(--vp-c-brand-dark); transform: translateY(-1px); box-shadow: 0 4px 12px hsla(197, 87%, 50%, 0.35); }
.search-btn:active:not(:disabled) { transform: translateY(0); }
.search-btn:disabled { opacity: 0.55; cursor: not-allowed; box-shadow: none; }

.btn-loading { display: flex; align-items: center; justify-content: center; }

.spinner {
  display: inline-block;
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* IP toggle row */
.ip-toggle-row { margin-top: 0.625rem; }

.ip-toggle-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-3, #9ca3af);
  cursor: pointer;
  transition: color 0.15s;
}

.ip-toggle-btn:hover { color: var(--vp-c-brand); }

.ip-field-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 320px;
}

.ip-field {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1.5px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  font-size: 0.85rem;
  font-family: monospace;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text-1, #111827);
  box-sizing: border-box;
}

.ip-field:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px hsla(197, 87%, 50%, 0.12);
}

.ip-field-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px; height: 22px;
  border: none;
  background: var(--vp-c-bg-mute, #f1f5f9);
  color: var(--vp-c-text-2, #6b7280);
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
}

.ip-field-clear:hover { background: var(--vp-c-bg-soft, #e5e7eb); }

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

/* Back nav */
.back-nav { margin-bottom: 1rem; }

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  color: var(--vp-c-text-2, #6b7280);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.825rem;
  font-weight: 500;
  transition: all 0.15s;
}

.back-btn:hover { background: var(--vp-c-bg, #fff); color: var(--vp-c-brand); border-color: var(--vp-c-brand); }

/* Results */
.results { display: flex; flex-direction: column; gap: 0.875rem; }

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
.hero-fail { background: rgba(220,38,38,0.04); border-color: rgba(220,38,38,0.18); }

.hero-icon { width: 52px; height: 52px; border-radius: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.icon-pass { background: rgba(22,163,74,0.12); color: #16a34a; border: 1px solid rgba(22,163,74,0.2); }
.icon-fail { background: rgba(220,38,38,0.1);  color: #dc2626; border: 1px solid rgba(220,38,38,0.15); }

.hero-text { flex: 1; min-width: 0; }
.hero-title { margin: 0 0 0.2rem; font-size: 1.25rem; font-weight: 700; color: var(--vp-c-text-1, #111827); }
.hero-domain { margin: 0; font-size: 0.8rem; font-family: monospace; color: var(--vp-c-text-2, #6b7280); }

.hero-score { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
.score-num { font-size: 1.6rem; font-weight: 800; color: var(--vp-c-text-1, #111827); line-height: 1; }
.score-denom { font-size: 0.9rem; font-weight: 500; color: var(--vp-c-text-3, #9ca3af); }
.score-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; padding: 0.15rem 0.5rem; border-radius: 999px; margin-top: 0.25rem; }

.score-strong, .score-excellent { background: rgba(22,163,74,0.12); color: #15803d; }
.score-good, .score-medium      { background: rgba(217,119,6,0.12);  color: #b45309; }
.score-poor, .score-weak        { background: rgba(220,38,38,0.1);   color: #dc2626; }

/* Signals grid */
.signals-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.625rem; }

.signal {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.75rem 0.875rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  background: var(--vp-c-bg, #fff);
}

.signal-icon { display: inline-flex; align-items: center; }
.signal-name { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--vp-c-text-2, #6b7280); }
.signal-value { font-size: 0.875rem; font-weight: 600; color: var(--vp-c-text-1, #111827); }

.signal-strong .signal-icon { color: #16a34a; }
.signal-medium .signal-icon { color: #d97706; }
.signal-weak   .signal-icon { color: #dc2626; }
.signal-muted  .signal-icon { color: var(--vp-c-text-3, #9ca3af); }
.signal-strong { border-color: rgba(22,163,74,0.25); }
.signal-medium { border-color: rgba(217,119,6,0.25); }
.signal-weak   { border-color: rgba(220,38,38,0.2); }

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
}

/* IP test */
.ip-test-card { display: flex; flex-direction: column; gap: 0.5rem; }
.ip-test-info { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }

.ip-address {
  font-family: monospace;
  font-size: 0.9rem;
  color: var(--vp-c-text-1, #374151);
  background: var(--vp-c-bg-soft, #f8f9fa);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
}

.ip-result-pill { padding: 0.125rem 0.625rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.ip-result-pill.result-pass { background: rgba(22,163,74,0.1); color: #15803d; }
.ip-result-pill.result-fail, .ip-result-pill.result-error { background: rgba(220,38,38,0.08); color: #b91c1c; }
.ip-result-pill.result-softfail { background: rgba(217,119,6,0.1); color: #b45309; }
.ip-result-pill.result-neutral, .ip-result-pill.result-unknown { background: var(--vp-c-bg-soft, #f3f4f6); color: var(--vp-c-text-2, #6b7280); border: 1px solid var(--vp-c-border-soft, #e5e7eb); }

.ip-explanation { margin: 0; color: var(--vp-c-text-2, #6b7280); font-size: 0.85rem; line-height: 1.5; }

/* Mechanisms */
.mechanisms-list { display: flex; flex-direction: column; gap: 0.375rem; }

.mechanism-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  border-radius: 8px;
  background: var(--vp-c-bg-soft, #f8f9fa);
  font-family: monospace;
  font-size: 0.85rem;
}

.mechanism-text { font-weight: 600; color: var(--vp-c-text-1, #374151); word-break: break-all; }
.inline-link { color: var(--vp-c-brand); font-weight: 600; text-decoration: underline; cursor: pointer; }
.inline-link:hover { opacity: 0.8; }

.mechanism-type {
  font-size: 0.75rem;
  color: var(--vp-c-text-2, #6b7280);
  background: var(--vp-c-bg, #fff);
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  flex-shrink: 0;
}

.mechanism-type.requires-lookup { color: var(--vp-c-text-1, #374151); font-weight: 700; }

/* Alerts */
.alert { display: flex; gap: 0.75rem; padding: 0.875rem 1.125rem; border-radius: 10px; border: 1px solid transparent; font-size: 0.875rem; line-height: 1.6; }
.alert > svg { flex-shrink: 0; margin-top: 0.1rem; }
.alert ul { margin: 0; padding-left: 1.1rem; }
.alert li + li { margin-top: 0.2rem; }
.alert-warn { background: rgba(217,119,6,0.06); border-color: rgba(217,119,6,0.2); color: var(--vp-c-text-1); }
.alert-warn > svg { color: #d97706; }
.alert-tip { background: hsla(197,87%,50%,0.05); border-color: hsla(197,87%,50%,0.2); color: var(--vp-c-text-1); }
.alert-tip > svg { color: var(--vp-c-brand-dark, #0891b2); }

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
.disclosure-body { padding: 0 1.25rem 1.25rem; border-top: 1px solid var(--vp-c-border-soft, #f1f5f9); }

.raw-record {
  display: block;
  margin-top: 0.875rem;
  padding: 0.875rem 1rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 8px;
  font-size: 0.8rem;
  word-break: break-all;
  color: var(--vp-c-text-1, #374151);
}

.mailauth-status { margin: 0.875rem 0 0; font-size: 0.875rem; color: var(--vp-c-text-1); }

.auth-info {
  background: var(--vp-c-bg-soft, #f8f9fa);
  padding: 0.875rem 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.8rem;
  margin: 0.625rem 0 0;
}

/* Dark mode */
.dark .hero-pass { background: linear-gradient(135deg, rgba(22,163,74,0.09) 0%, hsla(197,87%,50%,0.06) 100%); border-color: rgba(22,163,74,0.25); }
.dark .hero-fail { background: rgba(220,38,38,0.08); border-color: rgba(220,38,38,0.22); }
.dark .icon-pass { background: rgba(22,163,74,0.18); color: #4ade80; }
.dark .icon-fail { background: rgba(220,38,38,0.18); color: #f87171; }
.dark .score-strong, .dark .score-excellent { background: rgba(22,163,74,0.2); color: #4ade80; }
.dark .score-good, .dark .score-medium      { background: rgba(217,119,6,0.2);  color: #fbbf24; }
.dark .score-poor, .dark .score-weak        { background: rgba(220,38,38,0.2);  color: #f87171; }
.dark .signal-strong .signal-icon { color: #4ade80; }
.dark .signal-medium .signal-icon { color: #fbbf24; }
.dark .signal-weak   .signal-icon { color: #f87171; }
.dark .mechanism-item { background: var(--vp-c-bg-soft, #252736); border-color: var(--vp-c-border, #3a3d50); }
.dark .alert-warn { background: rgba(217,119,6,0.1); border-color: rgba(217,119,6,0.25); }
.dark .alert-tip  { background: hsla(197,87%,50%,0.08); border-color: hsla(197,87%,50%,0.25); }
.dark .alert-tip > svg { color: var(--vp-c-brand-light); }
.dark .back-btn { background: var(--vp-c-bg-soft, #252736); border-color: var(--vp-c-border, #3a3d50); color: var(--vp-c-text-2); }
.dark .ip-result-pill.result-pass { background: rgba(22,163,74,0.18); color: #6ee787; }
.dark .ip-result-pill.result-fail, .dark .ip-result-pill.result-error { background: rgba(220,38,38,0.18); color: #f1948a; }
.dark .ip-result-pill.result-softfail { background: rgba(217,119,6,0.18); color: #fbbf24; }
.dark .ip-result-pill.result-neutral, .dark .ip-result-pill.result-unknown { background: var(--vp-c-bg-mute, #2a2d3e); border-color: var(--vp-c-border, #3a3d50); }

/* Responsive */
@media (max-width: 640px) {
  .search-form { flex-direction: column; align-items: stretch; }
  .search-btn { width: 100%; }
  .hero { padding: 1.25rem; gap: 1rem; }
  .hero-score { align-self: flex-start; }
  .signals-grid { grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
  .signal { padding: 0.625rem; }
  .mechanism-item { flex-direction: column; align-items: flex-start; gap: 0.375rem; }
}

@media (max-width: 400px) {
  .signals-grid { grid-template-columns: 1fr; }
}
</style>
