<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { checkMx } from '../../../connectors/bluefoxEmailToolsApi.js'
import { isSessionValid } from '../../../connectors/turnstileSession.js'
import { syncWithUrl, loadFromUrl } from './helpers/urlSync.js'
import Turnstile from './Turnstile.vue'
import SignalIcon from './SignalIcon.vue'
import ToolSwitcher from './ToolSwitcher.vue'

const domain       = ref('')
const loading      = ref(false)
const result       = ref(null)
const errorMessage = ref('')

const turnstileRef   = ref(null)
const turnstileToken = ref('')
const resultsRef = ref(null)

const isFormDisabled = computed(() => loading.value)

function hasUniquePriorities(records) {
  if (!records?.length) return true
  return new Set(records.map(r => r.priority)).size === records.length
}

const redundancySignal = computed(() => {
  const n = result.value?.records?.length ?? 0
  if (n > 1) return { label: 'Multiple servers', level: 'strong', icon: 'check' }
  if (n === 1) return { label: 'Single server', level: 'weak', icon: 'alert' }
  return { label: 'None', level: 'weak', icon: 'alert' }
})

const priorityShape = computed(() => {
  if (!result.value?.records?.length) return { label: '—', level: 'muted', icon: 'dot' }
  return hasUniquePriorities(result.value.records)
    ? { label: 'Unique priorities', level: 'strong', icon: 'check' }
    : { label: 'Duplicate priorities', level: 'medium', icon: 'minus' }
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

async function checkMxHandler() {
  result.value       = null
  loading.value       = true
  errorMessage.value = ''

  try {
    if (!validateInputs()) { loading.value = false; return }

    if (!isSessionValid()) {
      turnstileToken.value = await turnstileRef.value.getToken()
    }

    const data = await checkMx({
      domain: domain.value,
      turnstileToken: turnstileToken.value,
    })

    result.value = {
      valid:   true,
      domain:  data.result.domain || domain.value,
      records: data.result.records || data.result.mxRecords || [],
      score:   data.result.score,
      warnings: data.result.warnings || [],
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
    await checkMxHandler()
    await nextTick()
    resultsRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})
</script>

<template>
  <div class="mx-checker">

    <ToolSwitcher :domain="domain" />

    <!-- ── Inline form ── -->
    <div class="search-bar" :class="{ 'has-result': result }">
      <form class="search-form" @submit.prevent="checkMxHandler">
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
          <span v-else>Check MX</span>
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

      <!-- Hero -->
      <div class="hero" :class="result.valid && result.records.length ? 'hero-pass' : 'hero-fail'">
        <div class="hero-icon" :class="result.valid && result.records.length ? 'icon-pass' : 'icon-fail'">
          <svg v-if="result.valid && result.records.length" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <div class="hero-text">
          <h2 class="hero-title">{{ result.records.length ? 'MX Records Found' : 'No MX Records' }}</h2>
          <p class="hero-domain">{{ result.domain }}</p>
        </div>
        <div v-if="result.score" class="hero-score">
          <span class="score-num">{{ result.score.value }}<span class="score-denom">/{{ result.score.outOf }}</span></span>
          <span class="score-label" :class="'score-' + result.score.level?.toLowerCase()">{{ result.score.level }}</span>
        </div>
      </div>

      <!-- Signals grid -->
      <div v-if="result.records.length" class="signals-grid">
        <div class="signal" :class="'signal-' + redundancySignal.level">
          <span class="signal-icon"><SignalIcon :name="redundancySignal.icon" /></span>
          <span class="signal-name">Redundancy</span>
          <span class="signal-value">{{ redundancySignal.label }}</span>
        </div>
        <div class="signal" :class="'signal-' + priorityShape.level">
          <span class="signal-icon"><SignalIcon :name="priorityShape.icon" /></span>
          <span class="signal-name">Priorities</span>
          <span class="signal-value">{{ priorityShape.label }}</span>
        </div>
        <div class="signal signal-muted">
          <span class="signal-icon"><SignalIcon name="dot" /></span>
          <span class="signal-name">Servers</span>
          <span class="signal-value">{{ result.records.length }}</span>
        </div>
      </div>

      <!-- MX records list -->
      <div v-if="result.records.length" class="tool-card">
        <h3 class="card-title">Mail Servers</h3>
        <div class="mx-list">
          <div v-for="record in result.records" :key="record.exchange" class="mx-item">
            <div class="priority-badge">{{ record.priority }}</div>
            <div class="mx-item-text">
              <div class="mx-host">{{ record.exchange }}</div>
              <div class="mx-meta">Priority {{ record.priority }}</div>
            </div>
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

    </div>
  </div>
</template>

<style scoped>
.mx-checker {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
}

/* Search bar — shared pattern */
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

.search-input-wrap input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px hsla(197, 87%, 50%, 0.12);
}

.search-input-wrap input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
.hero-fail { background: rgba(220,38,38,0.04); border-color: rgba(220,38,38,0.18); }

.hero-icon {
  width: 52px; height: 52px;
  border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.icon-pass { background: rgba(22,163,74,0.12); color: #16a34a; border: 1px solid rgba(22,163,74,0.2); }
.icon-fail { background: rgba(220,38,38,0.1);  color: #dc2626; border: 1px solid rgba(220,38,38,0.15); }

.hero-text { flex: 1; min-width: 0; }

.hero-title {
  margin: 0 0 0.2rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #111827);
}

.hero-domain {
  margin: 0;
  font-size: 0.8rem;
  font-family: monospace;
  color: var(--vp-c-text-2, #6b7280);
}

.hero-score { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }

.score-num {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--vp-c-text-1, #111827);
  line-height: 1;
}

.score-denom { font-size: 0.9rem; font-weight: 500; color: var(--vp-c-text-3, #9ca3af); }

.score-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  margin-top: 0.25rem;
}

.score-strong, .score-excellent { background: rgba(22,163,74,0.12); color: #15803d; }
.score-good, .score-medium      { background: rgba(217,119,6,0.12);  color: #b45309; }
.score-poor, .score-weak        { background: rgba(220,38,38,0.1);   color: #dc2626; }

/* Signals grid */
.signals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.625rem;
}

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

/* MX list */
.mx-list { display: flex; flex-direction: column; gap: 0.5rem; }

.mx-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem 0.875rem;
  border: 1px solid var(--vp-c-border-soft, #e5e7eb);
  border-radius: 9px;
  background: var(--vp-c-bg-soft, #f8f9fa);
}

.priority-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  background: var(--vp-c-brand);
  color: #fff;
  border-radius: 9px;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
  box-shadow: 0 1px 4px hsla(197, 87%, 50%, 0.3);
}

.mx-item-text { min-width: 0; }
.mx-host { font-family: monospace; font-size: 0.875rem; font-weight: 600; color: var(--vp-c-text-1); word-break: break-all; }
.mx-meta { font-size: 0.75rem; color: var(--vp-c-text-3, #9ca3af); margin-top: 0.1rem; }

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
.alert ul { margin: 0; padding-left: 1.1rem; }
.alert li + li { margin-top: 0.2rem; }

.alert-warn { background: rgba(217,119,6,0.06); border-color: rgba(217,119,6,0.2); color: var(--vp-c-text-1); }
.alert-warn > svg { color: #d97706; }
.alert-tip  { background: hsla(197,87%,50%,0.05); border-color: hsla(197,87%,50%,0.2); color: var(--vp-c-text-1); }
.alert-tip > svg { color: var(--vp-c-brand-dark, #0891b2); }

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
.dark .mx-item { background: var(--vp-c-bg-soft, #252736); border-color: var(--vp-c-border, #3a3d50); }
.dark .alert-warn { background: rgba(217,119,6,0.1); border-color: rgba(217,119,6,0.25); }
.dark .alert-tip  { background: hsla(197,87%,50%,0.08); border-color: hsla(197,87%,50%,0.25); }
.dark .alert-tip > svg { color: var(--vp-c-brand-light); }

/* Responsive */
@media (max-width: 640px) {
  .search-form { flex-direction: column; align-items: stretch; }
  .search-btn { width: 100%; }
  .hero { padding: 1.25rem; gap: 1rem; }
  .hero-score { align-self: flex-start; }
  .signals-grid { grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
  .signal { padding: 0.625rem; }
}

@media (max-width: 400px) {
  .signals-grid { grid-template-columns: 1fr; }
}
</style>
