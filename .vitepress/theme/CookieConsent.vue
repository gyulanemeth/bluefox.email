<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { readConsent, saveConsent, OPEN_CONSENT_EVENT } from './consent'

// Stays hidden during SSR and the first client render, so hydration matches.
const visible = ref(false)
const customizing = ref(false)
const hasChoice = ref(false)
const analytics = ref(false)
const advertising = ref(false)
const panel = ref(null)
let returnFocusTo = null

function close() {
  visible.value = false
  customizing.value = false
  if (returnFocusTo && document.contains(returnFocusTo)) {
    returnFocusTo.focus()
  }
  returnFocusTo = null
}

function apply(choice) {
  saveConsent(choice)
  hasChoice.value = true
  close()
}

const acceptAll = () => apply({ analytics: true, advertising: true })
const rejectAll = () => apply({ analytics: false, advertising: false })
const saveChoices = () => apply({ analytics: analytics.value, advertising: advertising.value })

function customize() {
  customizing.value = true
}

async function openSettings() {
  const stored = readConsent()
  analytics.value = stored?.analytics ?? false
  advertising.value = stored?.advertising ?? false
  returnFocusTo = document.activeElement
  customizing.value = true
  visible.value = true
  await nextTick()
  panel.value?.focus()
}

function onKeydown(event) {
  // Escape only dismisses when a choice already exists; a first-time visitor
  // keeps the banner (and denied consent) until they pick something.
  if (event.key === 'Escape' && hasChoice.value) {
    close()
  }
}

onMounted(() => {
  const stored = readConsent()
  hasChoice.value = !!stored
  visible.value = !stored
  window.addEventListener(OPEN_CONSENT_EVENT, openSettings)
})

onBeforeUnmount(() => {
  window.removeEventListener(OPEN_CONSENT_EVENT, openSettings)
})
</script>

<template>
  <section
    v-if="visible"
    ref="panel"
    class="bf-consent"
    role="region"
    aria-labelledby="bf-consent-title"
    tabindex="-1"
    @keydown="onKeydown"
  >
    <p id="bf-consent-title" class="bf-consent-title">Cookie preferences</p>
    <p class="bf-consent-text">
      We use optional analytics and advertising cookies to understand how BlueFox is used and to show relevant ads.
      You can accept them, reject them, or choose your preferences.
      <a href="/privacy-policy">Privacy policy</a>
    </p>

    <div v-if="customizing" class="bf-consent-prefs">
      <div class="bf-consent-row">
        <div class="bf-consent-row-text">
          <span class="bf-consent-label">Necessary</span>
          <span class="bf-consent-desc">Needed for the site to work, for example to remember this choice.</span>
        </div>
        <span class="bf-consent-always">Always on</span>
      </div>
      <label class="bf-consent-row" for="bf-consent-analytics">
        <span class="bf-consent-row-text">
          <span class="bf-consent-label">Analytics</span>
          <span id="bf-consent-analytics-desc" class="bf-consent-desc">Helps us understand how the site is used (Google Analytics).</span>
        </span>
        <input
          id="bf-consent-analytics"
          v-model="analytics"
          class="bf-consent-switch"
          type="checkbox"
          role="switch"
          aria-describedby="bf-consent-analytics-desc"
        />
      </label>
      <label class="bf-consent-row" for="bf-consent-advertising">
        <span class="bf-consent-row-text">
          <span class="bf-consent-label">Advertising</span>
          <span id="bf-consent-advertising-desc" class="bf-consent-desc">Lets us measure our ads and show you relevant ones (Google Ads).</span>
        </span>
        <input
          id="bf-consent-advertising"
          v-model="advertising"
          class="bf-consent-switch"
          type="checkbox"
          role="switch"
          aria-describedby="bf-consent-advertising-desc"
        />
      </label>
    </div>

    <div class="bf-consent-actions">
      <button type="button" class="bf-consent-btn" @click="acceptAll">Accept all</button>
      <button type="button" class="bf-consent-btn" @click="rejectAll">Reject all</button>
      <button v-if="!customizing" type="button" class="bf-consent-btn bf-consent-btn-text" @click="customize">Customize</button>
      <button v-else type="button" class="bf-consent-btn bf-consent-btn-text" @click="saveChoices">Save choices</button>
    </div>
  </section>
</template>

<style scoped>
.bf-consent {
  position: fixed;
  left: 16px;
  bottom: 16px;
  z-index: 100;
  width: 360px;
  max-width: calc(100vw - 32px);
  padding: 16px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
  font-size: 13px;
  line-height: 1.5;
}

.bf-consent:focus {
  outline: none;
}

.bf-consent:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

.bf-consent-title {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 600;
}

.bf-consent-text {
  margin: 0;
  color: var(--vp-c-text-2);
}

.bf-consent-text a {
  color: var(--vp-c-brand);
  font-weight: 500;
  text-decoration: underline;
}

.bf-consent-prefs {
  margin-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.bf-consent-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
}

.bf-consent-row:first-child {
  cursor: default;
}

.bf-consent-row-text {
  display: flex;
  flex-direction: column;
}

.bf-consent-label {
  font-weight: 600;
}

.bf-consent-desc {
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.bf-consent-always {
  flex-shrink: 0;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.bf-consent-switch {
  appearance: none;
  flex-shrink: 0;
  position: relative;
  width: 36px;
  height: 20px;
  margin: 0;
  border-radius: 10px;
  background: var(--vp-c-divider);
  cursor: pointer;
  transition: background 0.2s ease;
}

.bf-consent-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.bf-consent-switch:checked {
  background: var(--vp-c-brand);
}

.bf-consent-switch:checked::after {
  transform: translateX(16px);
}

.bf-consent-switch:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

.bf-consent-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.bf-consent-btn {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-brand);
  border-radius: 4px;
  background: transparent;
  color: var(--vp-c-brand);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.bf-consent-btn:hover {
  background: rgba(19, 176, 238, 0.08);
}

.bf-consent-btn:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

.bf-consent-btn-text {
  border-color: transparent;
  color: var(--vp-c-text-2);
}

.bf-consent-btn-text:hover {
  color: var(--vp-c-text-1);
  background: transparent;
}

@media (max-width: 480px) {
  .bf-consent {
    left: 8px;
    right: 8px;
    bottom: 8px;
    width: auto;
    max-width: none;
  }

  .bf-consent-btn {
    flex: 1 1 auto;
  }
}
</style>
