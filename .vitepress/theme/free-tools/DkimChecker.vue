<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { checkDkim } from '../../../connectors/bluefoxEmailToolsApi.js'
import { isSessionValid } from '../../../connectors/turnstileSession.js'
import { syncWithUrl, loadFromUrl } from './helpers/urlSync.js'
import Turnstile from './Turnstile.vue'
import SignalIcon from './SignalIcon.vue'
import ToolSwitcher from './ToolSwitcher.vue'

const DEFAULT_SELECTOR = 'default'
const DKIM_TAG_DESCRIPTIONS = {
  v: "Version (always 'DKIM1').",
  k: "Key type (e.g., 'rsa').",
  p: 'Public key for signature verification.',
  s: 'Service type for this key.',
  h: 'Allowed hash algorithms.',
  t: 'DKIM flags.',
  n: 'Free-form notes.',
}

const domain       = ref('')
const selector     = ref('')
const loading      = ref(false)
const result       = ref(null)
const errorMessage = ref('')

const turnstileRef   = ref(null)
const turnstileToken = ref('')
const guessedSelector = ref(false)
const resultsRef = ref(null)

const isFormDisabled = computed(() => loading.value)

const TRUNCATE_AT = 40

function truncateMiddle(value) {
  if (value.length <= TRUNCATE_AT) return value
  const head = value.slice(0, 20)
  const tail = value.slice(-16)
  return `${head}…${tail}`
}

const dkimTags = computed(() => {
  const record = result.value?.rawRecord || result.value?.record || ''
  return record
    .split(';')
    .map(p => p.trim())
    .filter(Boolean)
    .map(pair => {
      const [tag, ...rest] = pair.split('=')
      const value = rest.join('=').trim()
      return {
        tag: tag.trim(),
        value,
        displayValue: truncateMiddle(value),
        truncated: value.length > TRUNCATE_AT,
        description: DKIM_TAG_DESCRIPTIONS[tag.trim()] || '',
      }
    })
})

const copiedTag = ref('')

async function copyTagValue(tag) {
  try {
    await navigator.clipboard.writeText(tag.value)
    copiedTag.value = tag.tag
    setTimeout(() => { if (copiedTag.value === tag.tag) copiedTag.value = '' }, 1500)
  } catch {
    /* clipboard unavailable */
  }
}

const keyTypeSignal = computed(() => {
  const k = dkimTags.value.find(t => t.tag === 'k')?.value?.toLowerCase() || 'rsa'
  return { label: k.toUpperCase(), level: 'muted', icon: 'dot' }
})

const keyLengthSignal = computed(() => {
  const p = dkimTags.value.find(t => t.tag === 'p')?.value
  if (!p) return null
  const approxBits = Math.floor((p.length * 6) / 8) * 8
  if (approxBits >= 2048) return { label: `~${approxBits} bit`, level: 'strong', icon: 'check' }
  if (approxBits >= 1024) return { label: `~${approxBits} bit`, level: 'medium', icon: 'minus' }
  return { label: `~${approxBits} bit`, level: 'weak', icon: 'alert' }
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

async function checkDkimHandler() {
  result.value       = null
  loading.value       = true
  errorMessage.value = ''

  try {
    if (!validateInputs()) { loading.value = false; return }

    if (!isSessionValid()) {
      turnstileToken.value = await turnstileRef.value.getToken()
    }

    const data = await checkDkim({
      domain: domain.value,
      selector: selector.value || DEFAULT_SELECTOR,
      turnstileToken: turnstileToken.value,
    })

    result.value = {
      valid:    true,
      domain:   data.result.domain || domain.value,
      selector: data.result.selector || selector.value,
      record:    data.result.rawRecord || data.result.record,
      rawRecord: data.result.rawRecord || data.result.record,
      warnings: data.result.warnings || [],
      recommendations: data.result.recommendations || [],
      score: data.result.score,
    }

    resetTurnstile()
  } catch (err) {
    errorMessage.value = err.message || 'Network error. Please try again.'
    if (err.status === 401) resetTurnstile()
  } finally {
    loading.value = false
  }
}

watch([domain, selector], () => syncWithUrl({ domain: domain.value, selector: selector.value }))

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)

  loadFromUrl({ domain, selector })
  if (!selector.value) selector.value = DEFAULT_SELECTOR
  await nextTick()

  if (urlParams.get('run') === '1' && domain.value) {
    if (urlParams.get('selector') === 'google') guessedSelector.value = true
    await turnstileRef.value?.whenReady()
    await checkDkimHandler()
    await nextTick()
    resultsRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})
</script>

<template>
  <div class="dkim-checker">

    <ToolSwitcher :domain="domain" />

    <!-- ── Inline form ── -->
    <div class="search-bar" :class="{ 'has-result': result }">
      <form class="search-form" @submit.prevent="checkDkimHandler">
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
        <div class="selector-input-wrap">
          <span class="selector-prefix">selector:</span>
          <input
            id="selector"
            v-model="selector"
            type="text"
            placeholder="default"
            :disabled="loading"
            autocomplete="off"
            spellcheck="false"
          />
        </div>
        <button type="submit" class="search-btn" :disabled="isFormDisabled">
          <span v-if="loading" class="btn-loading"><span class="spinner"></span></span>
          <span v-else>Check DKIM</span>
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

      <p v-if="guessedSelector" class="form-hint form-hint-notice">
        Guessed selector <code>google</code> from the switcher. Not right? Change it in the <strong>selector</strong> field above.
      </p>
      <p v-else class="form-hint">Common selectors: <code>default</code>, <code>google</code>, <code>selector1</code>, <code>mail</code></p>
    </div>

    <!-- ── Error ── -->
    <div v-if="errorMessage" class="error-pill">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      {{ errorMessage }}
    </div>

    <!-- ── Results ── -->
    <div v-if="result" class="results" ref="resultsRef">

      <!-- Hero -->
      <div class="hero" :class="result.valid && result.record ? 'hero-pass' : 'hero-fail'">
        <div class="hero-icon" :class="result.valid && result.record ? 'icon-pass' : 'icon-fail'">
          <svg v-if="result.valid && result.record" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <div class="hero-text">
          <h2 class="hero-title">{{ result.record ? 'DKIM Record Found' : 'DKIM Record Missing' }}</h2>
          <p class="hero-domain">{{ result.selector }}._domainkey.{{ result.domain }}</p>
        </div>
        <div v-if="result.score" class="hero-score">
          <span class="score-num">{{ result.score.value }}<span class="score-denom">/{{ result.score.outOf }}</span></span>
          <span class="score-label" :class="'score-' + result.score.level?.toLowerCase()">{{ result.score.level }}</span>
        </div>
      </div>

      <!-- Signals grid -->
      <div v-if="result.record" class="signals-grid">
        <div class="signal" :class="'signal-' + keyTypeSignal.level">
          <span class="signal-icon"><SignalIcon :name="keyTypeSignal.icon" /></span>
          <span class="signal-name">Key Type</span>
          <span class="signal-value">{{ keyTypeSignal.label }}</span>
        </div>
        <div v-if="keyLengthSignal" class="signal" :class="'signal-' + keyLengthSignal.level">
          <span class="signal-icon"><SignalIcon :name="keyLengthSignal.icon" /></span>
          <span class="signal-name">Key Length</span>
          <span class="signal-value">{{ keyLengthSignal.label }}</span>
        </div>
        <div class="signal signal-muted">
          <span class="signal-icon"><SignalIcon name="dot" /></span>
          <span class="signal-name">Tags</span>
          <span class="signal-value">{{ dkimTags.length }}</span>
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
            <span class="disclosure-label">Raw DKIM record</span>
            <svg class="disclosure-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div class="disclosure-body">
            <code class="raw-record">{{ result.record }}</code>
          </div>
        </details>

        <details v-if="dkimTags.length" class="disclosure">
          <summary class="disclosure-trigger">
            <span class="disclosure-label">Tag breakdown</span>
            <svg class="disclosure-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <div class="disclosure-body">
            <div class="tag-list">
              <div class="tag-row" v-for="tag in dkimTags" :key="tag.tag">
                <span class="tag-key">{{ tag.tag }}</span>
                <div class="tag-main">
                  <div class="tag-value-line">
                    <code class="tag-value">{{ tag.displayValue }}</code>
                    <button
                      v-if="tag.truncated"
                      type="button"
                      class="tag-copy-btn"
                      :class="{ copied: copiedTag === tag.tag }"
                      :aria-label="`Copy ${tag.tag} tag value`"
                      @click="copyTagValue(tag)"
                    >
                      <svg v-if="copiedTag === tag.tag" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      <span>{{ copiedTag === tag.tag ? 'Copied' : 'Copy' }}</span>
                    </button>
                  </div>
                  <p class="tag-desc">{{ tag.description }}</p>
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
.dkim-checker {
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
  gap: 0.625rem;
  flex-wrap: wrap;
}

.search-input-wrap {
  flex: 1.5;
  min-width: 200px;
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

.has-result .search-input-wrap input,
.has-result .selector-input-wrap input { padding-top: 0.5rem; padding-bottom: 0.5rem; font-size: 0.9rem; }

.search-input-wrap input:focus,
.selector-input-wrap input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px hsla(197, 87%, 50%, 0.12);
}

.search-input-wrap input:disabled,
.selector-input-wrap input:disabled { opacity: 0.5; cursor: not-allowed; }

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

.selector-input-wrap {
  flex: 1;
  min-width: 150px;
  display: flex;
  align-items: center;
  border: 1.5px solid var(--vp-c-border, #e5e7eb);
  border-radius: 10px;
  background: var(--vp-c-bg, #fff);
  padding: 0 0.875rem;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.selector-input-wrap:focus-within {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px hsla(197, 87%, 50%, 0.12);
}

.selector-prefix {
  font-size: 0.8rem;
  color: var(--vp-c-text-3, #9ca3af);
  white-space: nowrap;
}

.selector-input-wrap input {
  border: none;
  background: transparent;
  padding: 0.75rem 0 0.75rem 0.375rem;
  font-size: 1rem;
  color: var(--vp-c-text-1, #111827);
  width: 100%;
  min-width: 0;
}

.selector-input-wrap input:focus { outline: none; box-shadow: none; }

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

.form-hint {
  margin: 0.625rem 0 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-3, #9ca3af);
}

.form-hint code {
  background: var(--vp-c-bg-mute, #f1f5f9);
  padding: 0.05rem 0.3rem;
  border-radius: 4px;
  font-size: 0.7rem;
}

.form-hint-notice {
  color: #b45309;
}

.dark .form-hint-notice {
  color: #fbbf24;
}

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
.hero-domain { margin: 0; font-size: 0.8rem; font-family: monospace; color: var(--vp-c-text-2, #6b7280); word-break: break-all; }

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

.tag-list { display: flex; flex-direction: column; margin-top: 0.875rem; }

.tag-row {
  display: flex;
  gap: 0.75rem;
  padding: 0.625rem 0;
  border-bottom: 1px solid var(--vp-c-border-soft, #f1f5f9);
}

.tag-row:last-child { border-bottom: none; padding-bottom: 0; }
.tag-row:first-child { padding-top: 0; }

.tag-key {
  flex-shrink: 0;
  width: 1.5rem;
  font-family: monospace;
  font-weight: 700;
  font-size: 0.825rem;
  color: var(--vp-c-brand);
}

.tag-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.2rem; }

.tag-value-line { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }

.tag-value {
  font-family: monospace;
  font-size: 0.825rem;
  color: var(--vp-c-text-1);
  word-break: break-all;
}

.tag-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 6px;
  background: var(--vp-c-bg-mute, #f1f5f9);
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.tag-copy-btn:hover { background: var(--vp-c-bg-soft, #e5e7eb); color: var(--vp-c-text-1); }
.tag-copy-btn.copied { color: #16a34a; border-color: rgba(22,163,74,0.3); background: rgba(22,163,74,0.08); }

.tag-desc { margin: 0; font-size: 0.8rem; color: var(--vp-c-text-2, #6b7280); }

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
.dark .alert-warn { background: rgba(217,119,6,0.1); border-color: rgba(217,119,6,0.25); }
.dark .alert-tip  { background: hsla(197,87%,50%,0.08); border-color: hsla(197,87%,50%,0.25); }
.dark .alert-tip > svg { color: var(--vp-c-brand-light); }
.dark .tag-copy-btn.copied { color: #4ade80; border-color: rgba(74,222,128,0.3); background: rgba(74,222,128,0.1); }

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
