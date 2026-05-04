<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import alexPhoto from '../../for/marketing-agencies/alex-suprun-ZHvM3XIOHoE-unsplash.webp'
import chrisPhoto from '../../for/marketing-agencies/christopher-campbell-rDEOVtE7vOs-unsplash.webp'
import michaelPhoto from '../../for/marketing-agencies/michael-dam-mEZ3PoFGs_k-unsplash.webp'
import vickyPhoto from '../../for/marketing-agencies/vicky-hladynets-C8Ta0gwPbQg-unsplash.webp'
import jakePhoto from '../../for/marketing-agencies/jake-nackos-IF9TK5Uy-KI-unsplash.webp'
import nguyenPhoto from '../../for/marketing-agencies/nguyen.webp'

defineProps({
  isDark: { type: Boolean, default: false },
  lgAndUp: { type: Boolean, default: true },
  md: { type: Boolean, default: false },
  sm: { type: Boolean, default: false },
  xs: { type: Boolean, default: false }
})

const filters = [
  { icon: 'clock',  label: 'Active in last 30 days', tone: 'cyan'   },
  { icon: 'star',   label: 'Plan: Pro',              tone: 'purple' },
  { icon: 'check',  label: 'Project created',        tone: 'green'  }
]

const everyone = [
  { name: 'John',   photo: vickyPhoto,   matched: true  },
  { name: 'Robert', photo: jakePhoto,    matched: false },
  { name: 'Sarah',  photo: chrisPhoto,   matched: true  },
  { name: 'Diego',  photo: alexPhoto,    matched: true  },
  { name: 'Gabriel',photo: michaelPhoto, matched: false },
  { name: 'Tom',    photo: nguyenPhoto,  matched: true  }
]

const matched = everyone.filter(p => p.matched)

// Animated match counter
const TARGET_COUNT = 326
const TOTAL_CONTACTS = 1240
const matchCount = ref(0)
let countTimer = null

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3) }

function animateCount() {
  const duration = 1800
  const start = performance.now()
  cancelAnimationFrame(countTimer)
  function frame(now) {
    const t = Math.min(1, (now - start) / duration)
    matchCount.value = Math.round(easeOutCubic(t) * TARGET_COUNT)
    if (t < 1) countTimer = requestAnimationFrame(frame)
  }
  countTimer = requestAnimationFrame(frame)
}

const flyingIdx = ref(0)
let flyTimer = null

const flowRef = ref(null)
const funnelRef = ref(null)
const personRefs = ref([])
const filterRefs = ref([])
const setPersonRef = (el, idx) => {
  if (el) personRefs.value[idx] = el
}
const setFilterRef = (el, idx) => {
  if (el) filterRefs.value[idx] = el
}

const paths = ref([])
const filterPaths = ref([])
const flowSize = ref({ w: 0, h: 0 })
const activePath = computed(() => paths.value[flyingIdx.value] || '')
const viewBox = computed(() => `0 0 ${flowSize.value.w || 1} ${flowSize.value.h || 1}`)

let lastSig = ''

function recalcPaths() {
  if (!flowRef.value || !funnelRef.value) return
  const flowRect = flowRef.value.getBoundingClientRect()
  const funnelRect = funnelRef.value.getBoundingClientRect()

  // Right-side: funnel right-edge -> recipient left-edge
  const startX = Math.round(funnelRect.right - flowRect.left - 6)
  const startY = Math.round(funnelRect.top - flowRect.top + funnelRect.height / 2)
  const endpoints = []
  personRefs.value.forEach((el) => {
    if (!el) return
    const r = el.getBoundingClientRect()
    endpoints.push({
      x: Math.round(r.left - flowRect.left + 2),
      y: Math.round(r.top - flowRect.top + r.height / 2)
    })
  })

  // Left-side: filter chip right-edge -> funnel left-edge
  const inX = Math.round(funnelRect.left - flowRect.left + 6)
  const inY = startY
  const filterStarts = []
  filterRefs.value.forEach((el) => {
    if (!el) return
    const r = el.getBoundingClientRect()
    filterStarts.push({
      x: Math.round(r.right - flowRect.left - 2),
      y: Math.round(r.top - flowRect.top + r.height / 2)
    })
  })

  const sig = `${Math.round(flowRect.width)}|${Math.round(flowRect.height)}|${startX},${startY}|` +
    endpoints.map(p => `${p.x},${p.y}`).join(';') + '|' +
    `${inX},${inY}|` + filterStarts.map(p => `${p.x},${p.y}`).join(';')
  if (sig === lastSig) return
  lastSig = sig

  flowSize.value = { w: flowRect.width, h: flowRect.height }
  paths.value = endpoints.map(({ x: endX, y: endY }) => {
    const dx = endX - startX
    const c1x = startX + dx * 0.5
    const c2x = startX + dx * 0.5
    return `M ${startX} ${startY} C ${c1x} ${startY}, ${c2x} ${endY}, ${endX} ${endY}`
  })
  filterPaths.value = filterStarts.map(({ x: sX, y: sY }) => {
    const dx = inX - sX
    const c1x = sX + dx * 0.5
    const c2x = sX + dx * 0.5
    return `M ${sX} ${sY} C ${c1x} ${sY}, ${c2x} ${inY}, ${inX} ${inY}`
  })
}

let resizeObs = null
let recalcRaf = null

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
  animateCount()

  // Re-run count animation when section enters viewport
  if (typeof IntersectionObserver !== 'undefined' && flowRef.value) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) animateCount() })
    }, { threshold: 0.4 })
    io.observe(flowRef.value)
  }

  // Run twice more after layout settles (chip slide-in animations finish)
  setTimeout(recalcPaths, 300)
  setTimeout(recalcPaths, 800)

  // Recalc after images load
  if (flowRef.value) {
    flowRef.value.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', recalcPaths, { once: true })
    })
  }

  // Recalc after fonts settle
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(recalcPaths)
  }

  flyTimer = setInterval(() => {
    flyingIdx.value = (flyingIdx.value + 1) % matched.length
  }, 2200)

  if (typeof ResizeObserver !== 'undefined') {
    resizeObs = new ResizeObserver(scheduleRecalc)
    resizeObs.observe(flowRef.value)
    personRefs.value.forEach((el) => el && resizeObs.observe(el))
    filterRefs.value.forEach((el) => el && resizeObs.observe(el))
  }
  window.addEventListener('resize', scheduleRecalc)
})

onBeforeUnmount(() => {
  if (flyTimer) clearInterval(flyTimer)
  if (resizeObs) resizeObs.disconnect()
  if (recalcRaf) cancelAnimationFrame(recalcRaf)
  if (countTimer) cancelAnimationFrame(countTimer)
  window.removeEventListener('resize', scheduleRecalc)
})
</script>

<template>
  <section class="seg-illus" aria-label="How segments work">
    <!-- Match badge -->
    <div class="seg-match-badge" role="status" aria-live="polite">
      <span class="seg-dot"></span>
      <strong>{{ matchCount.toLocaleString('en-US') }}</strong>
      <span>of {{ TOTAL_CONTACTS.toLocaleString('en-US') }} contacts matched</span>
    </div>

    <div class="seg-flow" ref="flowRef">
      <!-- Path overlay (lines from funnel to each recipient) -->
      <svg class="seg-paths" :viewBox="viewBox" preserveAspectRatio="xMinYMin meet" aria-hidden="true">
        <defs>
          <linearGradient id="segPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#13B0EE" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#392C91" stop-opacity="0.45"/>
          </linearGradient>
        </defs>
        <path
          v-for="(d, i) in filterPaths"
          :key="`fp-${i}`"
          :d="d"
          class="seg-path-line seg-path-line--in"
          fill="none"
          stroke="url(#segPathGrad)"
          stroke-width="1.6"
          stroke-dasharray="5 5"
        />
        <path
          v-for="(d, i) in paths"
          :key="`p-${i}`"
          :d="d"
          class="seg-path-line"
          :class="{ 'seg-path-line--active': i === flyingIdx }"
          fill="none"
          stroke="url(#segPathGrad)"
          stroke-width="1.6"
          stroke-dasharray="5 5"
        />
      </svg>

      <!-- Email envelope follows active path -->
      <div
        v-if="activePath"
        :key="`env-${flyingIdx}`"
        class="seg-envelope-track"
        :style="{ offsetPath: `path('${activePath}')`, '-webkit-offset-path': `path('${activePath}')` }"
        aria-hidden="true"
      >
        <div class="seg-envelope-card">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <path d="M3 7l9 6 9-6"/>
          </svg>
        </div>
      </div>

      <!-- Column 1: Filters -->
      <div class="seg-col seg-col--filters">
        <div class="seg-col-head">
          <span class="seg-col-eyebrow">You choose</span>
          <strong>Who should hear this?</strong>
        </div>
        <ul class="seg-filter-list">
          <li
            v-for="(f, i) in filters"
            :key="f.label"
            class="seg-filter-chip"
            :class="`tone-${f.tone}`"
            :style="{ animationDelay: `${i * 0.15}s` }"
            :ref="(el) => setFilterRef(el, i)"
          >
            <span class="seg-filter-icon" aria-hidden="true">
              <svg v-if="f.icon === 'clock'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
              </svg>
              <svg v-else-if="f.icon === 'star'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3 6.5 7 .9-5.2 4.7L18 21l-6-3.4L6 21l1.2-6.9L2 9.4l7-.9z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </span>
            {{ f.label }}
          </li>
        </ul>
      </div>

      <!-- Column 2: BlueFox matcher -->
      <div class="seg-col seg-col--funnel" aria-hidden="true">
        <div class="seg-funnel" ref="funnelRef">
          <span class="seg-logo-pulse"></span>
          <img
            src="/assets/bluefoxemail-logo.webp"
            alt=""
            class="seg-logo-img"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="seg-funnel-label">We match</div>
      </div>

      <!-- Column 3: Recipients -->
      <div class="seg-col seg-col--recipients">
        <div class="seg-col-head">
          <span class="seg-col-eyebrow">We deliver to</span>
          <strong>Only the right people</strong>
        </div>
        <ul class="seg-people">
          <li
            v-for="(p, i) in matched"
            :key="p.name"
            class="seg-person"
            :class="{ 'seg-person--ping': i === flyingIdx }"
            :style="{ animationDelay: `${i * 0.12}s` }"
            :ref="(el) => setPersonRef(el, i)"
          >
            <img :src="p.photo" :alt="p.name" class="seg-person-avatar" width="96" height="96" loading="lazy" decoding="async" />
            <div class="seg-person-meta">
              <strong>{{ p.name }}</strong>
              <span class="seg-person-status">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Matched
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom callout -->
    <div class="seg-callout">
      <div class="seg-callout-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12l3-9 3 9-3 9z"/>
          <path d="M21 12l-3-9-3 9 3 9z"/>
        </svg>
      </div>
      <div class="seg-callout-text">
        <strong>Stop blasting everyone.</strong>
        <span> Filter by behavior, plan, activity, or any property you've collected. Higher engagement, less waste, more revenue per send.</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.seg-illus {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px 8px;
}

.seg-match-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(90deg, rgba(19, 176, 238, 0.12), rgba(57, 44, 145, 0.12));
  border: 1px solid rgba(19, 176, 238, 0.3);
  border-radius: 999px;
  font-size: 13px;
  color: #0f172a;
  margin: 0 auto 28px;
  display: flex;
  width: fit-content;
}

html.dark .seg-match-badge {
  background: linear-gradient(90deg, rgba(19, 176, 238, 0.2), rgba(57, 44, 145, 0.2));
  border-color: rgba(103, 232, 249, 0.3);
  color: #f1f5f9;
}

.seg-match-badge strong { color: #13B0EE; font-weight: 800; }
html.dark .seg-match-badge strong { color: #67e8f9; }

.seg-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
  animation: pulseDot 1.8s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% { box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25); }
  50%      { box-shadow: 0 0 0 7px rgba(16, 185, 129, 0); }
}

.seg-flow {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 72px;
  align-items: center;
}

.seg-paths {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
}

.seg-path-line {
  opacity: 0.45;
  transition: opacity 0.3s ease, stroke-width 0.3s ease;
}

.seg-path-line--active {
  opacity: 0.95;
  stroke-width: 2.4;
  filter: drop-shadow(0 0 6px rgba(19, 176, 238, 0.55));
  animation: dashFlow 1.2s linear infinite;
}

.seg-path-line--in {
  opacity: 0.55;
  animation: dashFlowIn 2.4s linear infinite;
}

@keyframes dashFlow {
  to { stroke-dashoffset: -20; }
}

@keyframes dashFlowIn {
  to { stroke-dashoffset: -40; }
}

/* Envelope tracks current path via offset-path */
.seg-envelope-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  z-index: 2;
  offset-rotate: 0deg;
  -webkit-offset-rotate: 0deg;
  animation: envelopeFly 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  pointer-events: none;
}

@keyframes envelopeFly {
  0%   { offset-distance: 0%;   opacity: 0; transform: scale(0.6); }
  10%  { offset-distance: 5%;   opacity: 1; transform: scale(1); }
  85%  { offset-distance: 95%;  opacity: 1; transform: scale(1); }
  100% { offset-distance: 100%; opacity: 0; transform: scale(0.5); }
}

.seg-envelope-card {
  position: absolute;
  top: -16px;
  left: -16px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #13B0EE, #392C91);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(19, 176, 238, 0.4);
}

.seg-col-head {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

.seg-col-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #13B0EE;
}

html.dark .seg-col-eyebrow { color: #67e8f9; }

.seg-col-head strong {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
}

html.dark .seg-col-head strong { color: #f1f5f9; }

/* Filters */
.seg-filter-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.seg-filter-chip {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05), 0 4px 12px rgba(15, 23, 42, 0.04);
  opacity: 0;
  animation: chipIn 0.6s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
}

html.dark .seg-filter-chip {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(148, 163, 184, 0.18);
  color: #f1f5f9;
}

@keyframes chipIn {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}

.seg-filter-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex-shrink: 0;
}

.tone-cyan .seg-filter-icon   { background: rgba(19, 176, 238, 0.15); color: #0369a1; }
.tone-purple .seg-filter-icon { background: rgba(99, 102, 241, 0.15); color: #4f46e5; }
.tone-green .seg-filter-icon  { background: rgba(16, 185, 129, 0.15); color: #047857; }

html.dark .tone-cyan .seg-filter-icon   { background: rgba(19, 176, 238, 0.25); color: #67e8f9; }
html.dark .tone-purple .seg-filter-icon { background: rgba(99, 102, 241, 0.25); color: #a5b4fc; }
html.dark .tone-green .seg-filter-icon  { background: rgba(16, 185, 129, 0.25); color: #6ee7b7; }

/* Funnel column */
.seg-col--funnel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 2;
}

.seg-funnel {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.seg-logo-img {
  position: relative;
  z-index: 1;
  width: 96px;
  height: 96px;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(19, 176, 238, 0.35));
  animation: logoFloat 5s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

.seg-logo-pulse {
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  border: 2px solid rgba(19, 176, 238, 0.45);
  opacity: 0;
  animation: logoPulse 2.6s ease-out infinite;
  pointer-events: none;
}

@keyframes logoPulse {
  0%   { opacity: 0.8; transform: scale(0.85); }
  100% { opacity: 0;   transform: scale(1.4); }
}

@media (prefers-reduced-motion: reduce) {
  .seg-logo-img, .seg-logo-pulse { animation: none !important; }
}

.seg-funnel-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #13B0EE;
}

html.dark .seg-funnel-label { color: #67e8f9; }

/* Recipients */
.seg-people {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.seg-person {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  opacity: 0;
  animation: chipIn 0.6s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
  transition: box-shadow 0.4s ease, border-color 0.3s ease, transform 0.3s ease;
}

html.dark .seg-person {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(148, 163, 184, 0.18);
}

.seg-person--ping {
  border-color: rgba(19, 176, 238, 0.6);
  box-shadow: 0 0 0 3px rgba(19, 176, 238, 0.18), 0 8px 22px rgba(19, 176, 238, 0.18);
  transform: translateX(2px);
}

.seg-person-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px #ffffff, 0 1px 3px rgba(15, 23, 42, 0.12);
}

html.dark .seg-person-avatar {
  box-shadow: 0 0 0 2px rgba(30, 41, 59, 0.95), 0 1px 3px rgba(0, 0, 0, 0.4);
}

.seg-person-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.seg-person-meta strong {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .seg-person-meta strong { color: #f1f5f9; }

.seg-person-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  color: #047857;
  letter-spacing: 0.02em;
}

html.dark .seg-person-status { color: #6ee7b7; }

/* Callout */
.seg-callout {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 14px 18px;
  margin-top: 28px;
}

html.dark .seg-callout { background: rgba(30, 41, 59, 0.6); }

.seg-callout-icon {
  flex-shrink: 0;
  margin-top: 1px;
  color: #13B0EE;
}

html.dark .seg-callout-icon { color: #67e8f9; }

.seg-callout-text {
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

html.dark .seg-callout-text { color: #94a3b8; }

.seg-callout-text strong { color: #0f172a; }
html.dark .seg-callout-text strong { color: #f1f5f9; }

@media (prefers-reduced-motion: reduce) {
  .seg-filter-chip, .seg-person, .seg-envelope-track, .seg-dot, .seg-path-line {
    animation: none !important;
    opacity: 1 !important;
  }
  .seg-envelope-track { display: none; }
}

@media (max-width: 820px) {
  .seg-flow {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .seg-col--funnel {
    flex-direction: row;
    justify-content: center;
    gap: 12px;
    height: auto;
    padding: 4px 0;
  }

  .seg-funnel { width: 64px; height: 64px; }
  .seg-logo-img { width: 52px; height: 52px; }

  .seg-funnel-label {
    display: inline;
    font-size: 11px;
  }

  .seg-paths,
  .seg-envelope-track { display: none; }

  .seg-match-badge {
    margin-bottom: 18px;
    font-size: 12px;
    padding: 6px 12px;
  }

  .seg-col-head {
    margin-bottom: 10px;
    text-align: center;
  }

  .seg-col-head strong { font-size: 16px; }

  .seg-filter-list,
  .seg-people {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .seg-illus { padding: 12px 4px 8px; }

  .seg-flow { gap: 12px; }

  .seg-filter-chip {
    padding: 9px 12px;
    font-size: 12.5px;
    border-radius: 10px;
  }

  .seg-filter-icon { width: 24px; height: 24px; }

  .seg-person {
    padding: 8px 10px;
    border-radius: 10px;
  }

  .seg-person-avatar { width: 30px; height: 30px; }

  .seg-person-meta strong { font-size: 13px; }
  .seg-person-status { font-size: 10px; }

  .seg-funnel { width: 52px; height: 52px; }
  .seg-logo-img { width: 42px; height: 42px; }
  .seg-funnel-label { display: none; }

  .seg-callout {
    padding: 12px 14px;
    margin-top: 18px;
    border-radius: 10px;
  }
  .seg-callout-text { font-size: 13px; line-height: 1.5; }
}
</style>
