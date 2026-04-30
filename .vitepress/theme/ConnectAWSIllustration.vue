<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

defineProps({
  isDark: { type: Boolean, default: false }
})

const flowRef = ref(null)
const sourceRef = ref(null)
const pathTargetRefs = ref([])
const setPathTargetRef = (el, idx) => { if (el) pathTargetRefs.value[idx] = el }

const paths = ref([])
const flowSize = ref({ w: 0, h: 0 })
const viewBox = computed(() => `0 0 ${flowSize.value.w || 1} ${flowSize.value.h || 1}`)

const activeIdx = ref(1) // start on STS to telegraph "recommended"
const activePath = computed(() => paths.value[activeIdx.value] || '')

let flyTimer = null
let resizeObs = null
let recalcRaf = null
let lastSig = ''

function recalcPaths() {
  if (!flowRef.value || !sourceRef.value) return
  const flowRect = flowRef.value.getBoundingClientRect()
  const srcRect = sourceRef.value.getBoundingClientRect()

  const startX = Math.round(srcRect.left - flowRect.left + srcRect.width / 2)
  const startY = Math.round(srcRect.bottom - flowRect.top - 6)

  const endpoints = []
  pathTargetRefs.value.forEach((el) => {
    if (!el) return
    const r = el.getBoundingClientRect()
    endpoints.push({
      x: Math.round(r.left - flowRect.left + r.width / 2),
      y: Math.round(r.top - flowRect.top + 6)
    })
  })

  const sig = `${Math.round(flowRect.width)}|${Math.round(flowRect.height)}|${startX},${startY}|` +
    endpoints.map(p => `${p.x},${p.y}`).join(';')
  if (sig === lastSig) return
  lastSig = sig

  flowSize.value = { w: flowRect.width, h: flowRect.height }
  paths.value = endpoints.map(({ x: endX, y: endY }) => {
    const dy = endY - startY
    const c1y = startY + dy * 0.55
    const c2y = endY - dy * 0.4
    return `M ${startX} ${startY} C ${startX} ${c1y}, ${endX} ${c2y}, ${endX} ${endY}`
  })
}

function scheduleRecalc() {
  if (recalcRaf) return
  recalcRaf = requestAnimationFrame(() => {
    recalcRaf = null
    recalcPaths()
  })
}

onMounted(async () => {
  await nextTick()
  recalcPaths()
  setTimeout(recalcPaths, 300)
  setTimeout(recalcPaths, 800)

  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(recalcPaths)
  }

  flyTimer = setInterval(() => {
    activeIdx.value = activeIdx.value === 0 ? 1 : 0
  }, 2400)

  if (typeof ResizeObserver !== 'undefined' && flowRef.value) {
    resizeObs = new ResizeObserver(scheduleRecalc)
    resizeObs.observe(flowRef.value)
    pathTargetRefs.value.forEach((el) => el && resizeObs.observe(el))
  }
  window.addEventListener('resize', scheduleRecalc)
})

onBeforeUnmount(() => {
  if (flyTimer) clearInterval(flyTimer)
  if (resizeObs) resizeObs.disconnect()
  if (recalcRaf) cancelAnimationFrame(recalcRaf)
  window.removeEventListener('resize', scheduleRecalc)
})
</script>

<template>
  <figure
    class="caws-illus"
    role="img"
    aria-label="Two ways to connect Amazon SES: long-lived Access Keys, or temporary STS credentials. The CloudFormation script automates the STS setup."
  >
    <!-- Source node -->
    <div class="caws-source" ref="sourceRef">
      <span class="caws-source-pulse" aria-hidden="true"></span>
      <div class="caws-source-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
          <path d="m3.3 7 8.7 5 8.7-5"/>
          <path d="M12 22V12"/>
        </svg>
      </div>
      <div class="caws-source-meta">
        <span class="caws-source-eyebrow">Your AWS account</span>
        <strong>Amazon SES</strong>
      </div>
    </div>

    <!-- Flow area -->
    <div class="caws-flow" ref="flowRef">
      <!-- Path overlay -->
      <svg class="caws-paths" :viewBox="viewBox" preserveAspectRatio="xMinYMin meet" aria-hidden="true">
        <defs>
          <linearGradient id="cawsLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#13B0EE" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#392C91" stop-opacity="0.55"/>
          </linearGradient>
        </defs>
        <path
          v-for="(d, i) in paths"
          :key="`p-${i}`"
          :d="d"
          class="caws-path"
          :class="{ 'caws-path--active': i === activeIdx, 'caws-path--sts': i === 1 }"
          fill="none"
          stroke="url(#cawsLineGrad)"
          :stroke-width="i === 1 ? 2 : 1.6"
          stroke-dasharray="5 6"
          stroke-linecap="round"
        />
      </svg>

      <!-- Traveling token follows active path -->
      <div
        v-if="activePath"
        :key="`tok-${activeIdx}`"
        class="caws-token-track"
        :style="{ offsetPath: `path('${activePath}')`, '-webkit-offset-path': `path('${activePath}')` }"
        aria-hidden="true"
      >
        <div class="caws-token">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="8" cy="15" r="4"/>
            <path d="M10.85 12.15 19 4"/>
            <path d="m18 5 3 3"/>
            <path d="m15 8 3 3"/>
          </svg>
        </div>
      </div>

      <!-- Two paths -->
      <div class="caws-paths-grid">
        <article
          class="caws-path-card"
          :class="{ 'caws-path-card--active': activeIdx === 0 }"
          :ref="(el) => setPathTargetRef(el, 0)"
        >
          <header class="caws-card-head">
            <span class="caws-card-icon caws-card-icon--keys" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="15" r="4"/>
                <path d="M10.85 12.15 19 4"/>
                <path d="m18 5 3 3"/>
                <path d="m15 8 3 3"/>
              </svg>
            </span>
            <h3 class="caws-card-title">Access Keys</h3>
          </header>
          <p class="caws-card-desc">Paste your Access Key ID and Secret. Simple, but long-lived.</p>
          <ul class="caws-card-meta">
            <li>Long-lived credentials</li>
            <li>Quick to set up</li>
          </ul>
        </article>

        <article
          class="caws-path-card caws-path-card--sts"
          :class="{ 'caws-path-card--active': activeIdx === 1 }"
          :ref="(el) => setPathTargetRef(el, 1)"
        >
          <span class="caws-card-badge">Recommended</span>
          <header class="caws-card-head">
            <span class="caws-card-icon caws-card-icon--sts" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </span>
            <h3 class="caws-card-title">STS (AssumeRole)</h3>
          </header>
          <p class="caws-card-desc">Temporary credentials, scoped permissions, revocable any time.</p>
          <ul class="caws-card-meta">
            <li>Auto-expiring credentials</li>
            <li>Least-privilege role</li>
          </ul>

          <!-- CFN attached helper -->
          <div class="caws-cfn" role="note">
            <span class="caws-cfn-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>
              </svg>
            </span>
            <span class="caws-cfn-text">One-click setup via our CloudFormation script</span>
          </div>
        </article>
      </div>
    </div>

    <figcaption class="caws-foot">It literally takes a few minutes to get started.</figcaption>
  </figure>
</template>

<style scoped>
.caws-illus {
  max-width: 980px;
  margin: 24px auto 0;
  padding: 0;
}

/* Source */
.caws-source {
  position: relative;
  margin: 0 auto 0;
  width: max-content;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 22px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -14px rgba(15, 23, 42, 0.18);
  z-index: 2;
}

html.dark .caws-source {
  background: #0f172a;
  border-color: #1e293b;
}

.caws-source-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 18px;
  border: 2px solid rgba(19, 176, 238, 0.4);
  opacity: 0;
  animation: cawsSourcePulse 2.6s ease-out infinite;
  pointer-events: none;
}

@keyframes cawsSourcePulse {
  0%   { opacity: 0.7; transform: scale(0.94); }
  100% { opacity: 0;   transform: scale(1.08); }
}

.caws-source-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(19,176,238,0.14), rgba(57,44,145,0.14));
  color: #392c91;
}

html.dark .caws-source-icon {
  background: linear-gradient(135deg, rgba(19,176,238,0.22), rgba(57,44,145,0.22));
  color: #a5b4fc;
}

.caws-source-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.2;
}

.caws-source-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
}

html.dark .caws-source-eyebrow { color: #94a3b8; }

.caws-source-meta strong {
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
}

html.dark .caws-source-meta strong { color: #f1f5f9; }

/* Flow */
.caws-flow {
  position: relative;
  margin-top: 56px;
}

.caws-paths {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
}

.caws-path {
  opacity: 0.45;
  transition: opacity 0.4s ease, stroke-width 0.4s ease;
  animation: cawsDashFlow 2.4s linear infinite;
}

.caws-path--sts {
  opacity: 0.6;
}

.caws-path--active {
  opacity: 0.95;
  stroke-width: 2.4;
  filter: drop-shadow(0 0 6px rgba(19, 176, 238, 0.55));
  animation: cawsDashFlowFast 1.2s linear infinite;
}

@keyframes cawsDashFlow {
  to { stroke-dashoffset: -40; }
}

@keyframes cawsDashFlowFast {
  to { stroke-dashoffset: -24; }
}

/* Traveling token */
.caws-token-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  z-index: 2;
  offset-rotate: 0deg;
  -webkit-offset-rotate: 0deg;
  animation: cawsTokenFly 2.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  pointer-events: none;
}

@keyframes cawsTokenFly {
  0%   { offset-distance: 0%;   opacity: 0; transform: scale(0.6); }
  10%  { offset-distance: 5%;   opacity: 1; transform: scale(1); }
  85%  { offset-distance: 95%;  opacity: 1; transform: scale(1); }
  100% { offset-distance: 100%; opacity: 0; transform: scale(0.5); }
}

.caws-token {
  position: absolute;
  top: -14px;
  left: -14px;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #13B0EE, #392C91);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(19, 176, 238, 0.4);
}

/* Path cards grid */
.caws-paths-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: stretch;
  position: relative;
  z-index: 2;
}

.caws-path-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px 22px 22px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.3s ease;
}

html.dark .caws-path-card {
  background: #0f172a;
  border-color: #1e293b;
}

.caws-path-card--active {
  transform: translateY(-2px);
  border-color: rgba(19, 176, 238, 0.55);
  box-shadow: 0 0 0 3px rgba(19, 176, 238, 0.15), 0 14px 32px -16px rgba(19, 176, 238, 0.4);
}

.caws-path-card--sts {
  border: 2px solid transparent;
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(120deg, #392c91 5%, #13b0ee) border-box;
  box-shadow:
    0 4px 10px -2px rgba(57, 44, 145, 0.18),
    0 16px 32px -12px rgba(19, 176, 238, 0.25);
}

html.dark .caws-path-card--sts {
  background:
    linear-gradient(#0f172a, #0f172a) padding-box,
    linear-gradient(120deg, #8a7ed8 5%, #13b0ee) border-box;
}

.caws-path-card--sts.caws-path-card--active {
  box-shadow:
    0 6px 14px -2px rgba(57, 44, 145, 0.3),
    0 22px 40px -14px rgba(19, 176, 238, 0.45);
}

.caws-card-badge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 4px 12px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  background: linear-gradient(120deg, #392c91 5%, #13b0ee);
  border-radius: 999px;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(19, 176, 238, 0.35);
  z-index: 3;
}

.caws-card-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.caws-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  flex-shrink: 0;
}

.caws-card-icon--keys {
  background: rgba(19, 176, 238, 0.12);
  color: #0a7aa6;
}

.caws-card-icon--sts {
  background: linear-gradient(120deg, rgba(57, 44, 145, 0.14), rgba(19, 176, 238, 0.18));
  color: #392c91;
}

html.dark .caws-card-icon--keys { color: #38bdf8; }
html.dark .caws-card-icon--sts { color: #a5b4fc; }

.caws-card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  border-top: 0 !important;
  padding-top: 0 !important;
  line-height: 1.25;
}

html.dark .caws-card-title { color: #f1f5f9; }

.caws-card-desc {
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.6;
  color: #475569;
}

html.dark .caws-card-desc { color: #cbd5e1; }

.caws-card-meta {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.caws-card-meta li {
  position: relative;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.5;
  color: #475569;
}

.caws-card-meta li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #13b0ee;
  opacity: 0.7;
}

html.dark .caws-card-meta li { color: #cbd5e1; }

/* CFN helper */
.caws-cfn {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 10px 14px;
  background: linear-gradient(120deg, rgba(57, 44, 145, 0.08), rgba(19, 176, 238, 0.12));
  border: 1px dashed rgba(19, 176, 238, 0.45);
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.4;
  color: #392c91;
  font-weight: 600;
}

html.dark .caws-cfn {
  background: linear-gradient(120deg, rgba(138, 126, 216, 0.12), rgba(19, 176, 238, 0.18));
  border-color: rgba(19, 176, 238, 0.55);
  color: #a5b4fc;
}

.caws-cfn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(120deg, #392c91, #13b0ee);
  color: #ffffff;
  flex-shrink: 0;
}

.caws-cfn-text { flex: 1; }

/* Foot */
.caws-foot {
  margin: 28px 0 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #392c91;
}

html.dark .caws-foot { color: #a5b4fc; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .caws-path,
  .caws-source-pulse,
  .caws-token-track {
    animation: none !important;
    opacity: 1 !important;
  }
  .caws-token-track { display: none; }
}

/* Responsive */
@media (max-width: 760px) {
  .caws-flow { margin-top: 36px; }
  .caws-paths-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .caws-paths,
  .caws-token-track { display: none; }
  .caws-card-badge { transform: translate(-50%, -50%); }
  .caws-source { padding: 12px 18px; }
  .caws-source-meta strong { font-size: 15px; }
}
</style>
