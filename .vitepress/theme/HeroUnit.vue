<script setup>
import { useData } from 'vitepress'
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import BrandLogos from './BrandLogos.vue'

const { isDark } = useData()

// Mouse position for subtle parallax
const mouseX = ref(0)
const mouseY = ref(0)
const isMobile = ref(false)

const handleMouseMove = (e) => {
  // Disable parallax on mobile/tablet
  if (isMobile.value){ 
    return
  }
  
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 15
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 15
  
  // Update CSS variables for parallax
  document.documentElement.style.setProperty('--parallax-main-x', `${mouseX.value * 0.5}px`)
  document.documentElement.style.setProperty('--parallax-main-y', `${mouseY.value * 0.5}px`)
  document.documentElement.style.setProperty('--parallax-topleft-x', `${mouseX.value * -0.8}px`)
  document.documentElement.style.setProperty('--parallax-topleft-y', `${mouseY.value * -0.8}px`)
  document.documentElement.style.setProperty('--parallax-topright-x', `${mouseX.value * 0.6}px`)
  document.documentElement.style.setProperty('--parallax-topright-y', `${mouseY.value * -0.6}px`)
  document.documentElement.style.setProperty('--parallax-bottomright-x', `${mouseX.value * 0.8}px`)
  document.documentElement.style.setProperty('--parallax-bottomright-y', `${mouseY.value * 0.8}px`)
}

// Check if mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 1024
}

// Smooth scroll to solution sections
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Polar orbit — symmetric satellites + lines synced via angle
const heroVisualRef = ref(null)
const orbitSize = ref({ w: 400, h: 400 })
const orbitAngle = ref(0)
const orbitPaused = ref(false)
const SAT_COUNT = 4
const BASE_ANGLES = [-Math.PI * 3 / 4, -Math.PI / 4, Math.PI * 3 / 4, Math.PI / 4] // TL, TR, BL, BR (start positions)

const orbitViewBox = computed(() => `0 0 ${orbitSize.value.w} ${orbitSize.value.h}`)
const ringCx = computed(() => orbitSize.value.w / 2)
const ringCy = computed(() => orbitSize.value.h / 2)
const orbitRadius = computed(() => Math.min(orbitSize.value.w, orbitSize.value.h) * 0.38)
const ringR1 = computed(() => orbitRadius.value)
const ringR2 = computed(() => orbitRadius.value * 0.7)

const satPositions = computed(() => {
  const cx = ringCx.value
  const cy = ringCy.value
  const r = orbitRadius.value
  return BASE_ANGLES.map((base) => {
    const a = base + orbitAngle.value
    // Scale by horizontal position: 1.05 at far-left/right, 0.92 at top/bottom
    const rawScale = 0.92 + Math.abs(Math.cos(a)) * 0.13
    const scale = Math.round(rawScale * 100) / 100 // quantize to 1% steps
    return {
      x: Math.round(cx + Math.cos(a) * r),
      y: Math.round(cy + Math.sin(a) * r),
      angle: a,
      scale
    }
  })
})

const lineCoords = computed(() => {
  const cx = ringCx.value
  const cy = ringCy.value
  return satPositions.value.map((p) => ({ x1: cx, y1: cy, x2: p.x, y2: p.y }))
})

function measureHost() {
  if (!heroVisualRef.value) return
  const r = heroVisualRef.value.getBoundingClientRect()
  if (r.width > 0) orbitSize.value = { w: r.width, h: r.height }
}

let orbitResizeObs = null
let orbitRaf = null
let lastTs = 0
const ORBIT_SPEED = (Math.PI * 2) / 30000 // full rev / 30s

function tick(ts) {
  if (!lastTs) lastTs = ts
  const dt = ts - lastTs
  lastTs = ts
  if (!orbitPaused.value) {
    orbitAngle.value += ORBIT_SPEED * dt
  }
  orbitRaf = requestAnimationFrame(tick)
}

onMounted(() => {
  // Initialize CSS variables
  document.documentElement.style.setProperty('--parallax-main-x', '0px')
  document.documentElement.style.setProperty('--parallax-main-y', '0px')
  document.documentElement.style.setProperty('--parallax-topleft-x', '0px')
  document.documentElement.style.setProperty('--parallax-topleft-y', '0px')
  document.documentElement.style.setProperty('--parallax-topright-x', '0px')
  document.documentElement.style.setProperty('--parallax-topright-y', '0px')
  document.documentElement.style.setProperty('--parallax-bottomright-x', '0px')
  document.documentElement.style.setProperty('--parallax-bottomright-y', '0px')
  
  checkMobile()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', checkMobile)

  nextTick(() => {
    measureHost()
    if (typeof ResizeObserver !== 'undefined' && heroVisualRef.value) {
      orbitResizeObs = new ResizeObserver(measureHost)
      orbitResizeObs.observe(heroVisualRef.value)
    }
    window.addEventListener('resize', measureHost)
    orbitRaf = requestAnimationFrame(tick)
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('resize', measureHost)
  if (orbitResizeObs) orbitResizeObs.disconnect()
  if (orbitRaf) cancelAnimationFrame(orbitRaf)
})

const pauseOrbit = () => { orbitPaused.value = true }
const resumeOrbit = () => { orbitPaused.value = false }
</script>

<template>
  <div class="heroDiv">
    <!-- Subtle Background Effects -->
    <div class="background-gradient"></div>
    <div class="grid-overlay"></div>

    <div class="heroMain">
      <div class="heroGrid">
        <!-- Left Side: Content -->
        <div class="heroContent">
          <h1 class="title">
            <div class="title-line" style="font-size: 1.3em; font-weight: 800;">Stop paying for contacts</div>
            <div class="title-line" style="font-size: 1.3em; font-weight: 800;">you don&rsquo;t email.</div>
          </h1>
          <p class="tagline">BlueFox Email includes everything serious email platforms offer, without hiding features behind upgrades.</p>
          <p class="tagline tagline--accent">You only pay for sends.</p>

          <div class="hero-highlights" role="list" aria-label="Key features">
            <span class="highlight-item" role="listitem">Pay per send</span>
            <span class="highlight-item" role="listitem">No contact-based billing</span>
            <span class="highlight-item" role="listitem">3,000 free sends to start</span>
          </div>

          <div>
            <v-btn
              size="x-large"
              color="primary"
              variant="flat"
              class="no-uppercase mt-4 cta-button"
              href="https://app.bluefox.email/accounts/create-account"
              target="_blank"
            >
              <strong>Get started for free</strong>
            </v-btn>
          </div>
        </div>

        <!-- Right Side: Email Orbit Visualization -->
        <div class="heroVisual" ref="heroVisualRef">
          <!-- Orbit rings + connection paths + data particles -->
          <svg class="orbit-svg" :viewBox="orbitViewBox" preserveAspectRatio="xMinYMin meet" aria-hidden="true">
            <defs>
              <linearGradient id="orbitLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#13B0EE" stop-opacity="0.6"/>
                <stop offset="100%" stop-color="#392C91" stop-opacity="0.4"/>
              </linearGradient>
              <radialGradient id="orbitRingGlow" cx="50%" cy="50%" r="50%">
                <stop offset="60%" stop-color="#13B0EE" stop-opacity="0"/>
                <stop offset="100%" stop-color="#13B0EE" stop-opacity="0.18"/>
              </radialGradient>
            </defs>

            <!-- Orbit rings (rotating) -->
            <g class="orbit-rings" :style="{ transformOrigin: `${ringCx}px ${ringCy}px` }">
              <circle class="orbit-ring outer" :cx="ringCx" :cy="ringCy" :r="ringR1" fill="none" stroke="rgba(19,176,238,0.18)" stroke-width="1.2" stroke-dasharray="3 6"/>
              <circle class="orbit-ring inner" :cx="ringCx" :cy="ringCy" :r="ringR2" fill="none" stroke="rgba(57,44,145,0.18)" stroke-width="1.2" stroke-dasharray="2 4" :style="{ transformOrigin: `${ringCx}px ${ringCy}px` }"/>
              <circle :cx="ringCx" :cy="ringCy" :r="ringR1" fill="url(#orbitRingGlow)"/>
            </g>

            <!-- Connection lines from center to satellites -->
            <g class="connection-group">
              <line
                v-for="(c, i) in lineCoords"
                :key="`l-${i}`"
                class="conn-line"
                :x1="c.x1" :y1="c.y1" :x2="c.x2" :y2="c.y2"
                stroke="url(#orbitLineGradient)" stroke-width="1.5" stroke-dasharray="4 4"
              />
            </g>
          </svg>

          <!-- Center email card -->
          <div class="orbit-center" aria-hidden="true">
            <div class="center-card">
              <div class="center-pulse"></div>
              <div class="center-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" stroke-width="1.8"/>
                  <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="center-label">Your email</div>
              <div class="center-sub">One platform. Every lever.</div>
            </div>
          </div>

          <!-- 4 orbiting satellite cards (positioned by index) -->
          <div
            v-for="(sat, i) in [
              { title: 'Templates', desc: 'Sell sooner', target: 'templates-heading', icon: 'tpl' },
              { title: 'Segments', desc: 'Sell smarter', target: 'segmentation-heading', icon: 'seg' },
              { title: 'Automation', desc: 'Sell on autopilot', target: 'automation-heading', icon: 'auto' },
              { title: 'Analytics', desc: 'Sell more of what works', target: 'analytics-heading', icon: 'chart' }
            ]"
            :key="sat.target"
            class="satellite"
            :style="{
              left: `${satPositions[i].x}px`,
              top: `${satPositions[i].y}px`,
              '--orbit-scale': satPositions[i].scale
            }"
            @click="scrollToSection(sat.target)"
            @mouseenter="pauseOrbit"
            @mouseleave="resumeOrbit"
            @focusin="pauseOrbit"
            @focusout="resumeOrbit"
          >
            <div class="sat-icon">
              <svg v-if="sat.icon === 'tpl'" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M3 9h18M9 3v18" stroke="currentColor" stroke-width="2"/>
              </svg>
              <svg v-else-if="sat.icon === 'seg'" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
              </svg>
              <svg v-else-if="sat.icon === 'auto'" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 3v18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M7 14l4-4 3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="sat-text">
              <div class="sat-title">{{ sat.title }}</div>
              <div class="sat-desc">{{ sat.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Brand logos marquee inside hero -->
    <div class="hero-marquee">
      <BrandLogos />
    </div>
  </div>
</template>

<style scoped>
.heroDiv {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  min-height: 100vh;
  height: auto;
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 64px 32px;
  position: relative;
  left: calc(-50vw + 50%);
  width: 100vw;
  box-sizing: border-box;
  background: linear-gradient(278deg, hsl(247.72, 53.44%, 90%) 10%, hsl(196.99, 86.56%, 90%) 90%);
  overflow: hidden;
}

html.dark .heroDiv {
  background: linear-gradient(278deg, hsl(247.72, 53.44%, 10%) 10%, hsl(196.99, 86.56%, 10%) 90%);
}

/* Subtle Background Effects */
.background-gradient {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(19, 176, 238, 0.15), transparent 70%);
  border-radius: 50%;
  filter: blur(60px);
  animation: pulse 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.15; }
  50% { transform: scale(1.1); opacity: 0.25; }
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(19, 176, 238, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(19, 176, 238, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

html.dark .grid-overlay {
  background-image: 
    linear-gradient(rgba(19, 176, 238, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(19, 176, 238, 0.06) 1px, transparent 1px);
}

/* Main Layout */
.heroMain {
  min-height: calc(100vh - var(--vp-nav-height) - var(--vp-layout-top-height, 0px) - 320px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.heroGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: center;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

/* Left Content */
.heroContent {
  opacity: 0;
  animation: fadeInLeft 1s ease-out 0.2s forwards;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.title {
  font-size: clamp(26px, 3.8vw, 42px);
  line-height: 1.15;
  margin-bottom: 18px;
}

.title-line {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.6s ease-out forwards;
  background: -webkit-linear-gradient(120deg, #392C91 30%, #13B0EE 70%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-line:nth-child(1) { animation-delay: 0.4s; }
.title-line:nth-child(2) { animation-delay: 0.6s; }
.title-line:nth-child(3) { animation-delay: 0.8s; }

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tagline {
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.6;
  color: #4b5563;
  margin-bottom: 16px;
  opacity: 0;
  animation: fadeIn 0.6s ease-out 1s forwards;
}

html.dark .tagline {
  color: #9ca3af;
}

.tagline--accent {
  margin-top: 4px;
  animation-delay: 1.15s;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* CTA Button with Shine Animation - FIXED TEXT CENTERING */
.cta-button {
  opacity: 0;
  transform: translateY(10px);
  animation: slideUp 0.6s ease-out 1.2s forwards;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 8px 24px rgba(19, 176, 238, 0.25) !important;
  position: relative;
  overflow: hidden;
  border-radius: 12px !important;
  padding: 20px 40px !important;
  font-size: 16px !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  /* Perfect text centering */
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
  height: auto !important;
  min-height: 48px !important;
}

/* Shine effect */
.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
  pointer-events: none;
  z-index: 1;
}

.cta-button strong {
  position: relative;
  z-index: 2;
}

.cta-button:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 12px 32px rgba(19, 176, 238, 0.35) !important;
}

.cta-button:hover::before {
  left: 100%;
}

html.dark .cta-button {
  box-shadow: 0 8px 24px rgba(19, 176, 238, 0.3) !important;
}

html.dark .cta-button:hover {
  box-shadow: 0 12px 32px rgba(19, 176, 238, 0.45) !important;
}

/* Hero Highlights (signature pills) */
.hero-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  opacity: 0;
  animation: fadeIn 0.6s ease-out 1.1s forwards;
}

.highlight-item {
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(19, 176, 238, 0.12);
  color: #0e7490;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
}

html.dark .highlight-item {
  background: rgba(19, 176, 238, 0.2);
  color: #67e8f9;
}

/* Right Visual */
.heroVisual {
  position: relative;
  height: 380px;
  transform: translate(var(--parallax-main-x, 0), var(--parallax-main-y, 0));
  transition: transform 0.1s ease-out;
  opacity: 0;
  animation: fadeInRight 1s ease-out 0.4s forwards;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Orbit SVG layer (rings + connection lines + particles) */
.orbit-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.orbit-rings {
  transform-origin: 200px 200px;
  animation: ringSpin 60s linear infinite;
}

.orbit-ring.inner {
  transform-origin: 200px 200px;
  animation: ringSpinReverse 45s linear infinite;
}

@keyframes ringSpin {
  to { transform: rotate(360deg); }
}

@keyframes ringSpinReverse {
  to { transform: rotate(-360deg); }
}

.conn-line {
  opacity: 0;
  animation: connFadeIn 0.8s ease-out forwards;
}
.conn-line.c1 { animation-delay: 0.9s; }
.conn-line.c2 { animation-delay: 1.05s; }
.conn-line.c3 { animation-delay: 1.2s; }
.conn-line.c4 { animation-delay: 1.35s; }

@keyframes connFadeIn {
  to { opacity: 1; }
}

/* Center email card */
.orbit-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  animation: centerFloat 6s ease-in-out infinite;
}

@keyframes centerFloat {
  0%, 100% { transform: translate(-50%, -50%) translateY(0); }
  50%      { transform: translate(-50%, -50%) translateY(-8px); }
}

.center-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  padding: 18px;
  background: linear-gradient(140deg, rgba(255, 255, 255, 0.96), rgba(238, 248, 253, 0.96));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1.5px solid rgba(19, 176, 238, 0.35);
  box-shadow: 0 24px 60px rgba(19, 176, 238, 0.22), 0 0 0 6px rgba(19, 176, 238, 0.05);
  text-align: center;
}

html.dark .center-card {
  background: linear-gradient(140deg, rgba(31, 41, 55, 0.96), rgba(15, 23, 42, 0.96));
  border-color: rgba(19, 176, 238, 0.45);
  box-shadow: 0 24px 60px rgba(19, 176, 238, 0.3), 0 0 0 6px rgba(19, 176, 238, 0.08);
}

.center-pulse {
  position: absolute;
  inset: -8px;
  border-radius: 28px;
  border: 2px solid rgba(19, 176, 238, 0.5);
  opacity: 0;
  animation: centerPulse 2.8s ease-out infinite;
  pointer-events: none;
}

@keyframes centerPulse {
  0%   { opacity: 0.7; transform: scale(0.95); }
  100% { opacity: 0;   transform: scale(1.25); }
}

.center-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #13B0EE, #392C91);
  color: #fff;
  border-radius: 16px;
  margin-bottom: 10px;
  box-shadow: 0 10px 24px rgba(19, 176, 238, 0.4);
}

.center-label {
  font-size: 13px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.01em;
}

html.dark .center-label { color: #f3f4f6; }

.center-sub {
  font-size: 10.5px;
  font-weight: 500;
  color: #6b7280;
  margin-top: 2px;
  line-height: 1.3;
}

html.dark .center-sub { color: #9ca3af; }

/* Satellite cards (orbital) */
.satellite {
  position: absolute;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 14px;
  border: 1px solid rgba(19, 176, 238, 0.22);
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.1);
  cursor: pointer;
  --orbit-scale: 1;
  transform: translate(-50%, -50%) scale(var(--orbit-scale));
  transition: transform 0.4s ease-out, box-shadow 0.4s ease, border-color 0.3s ease;
  touch-action: manipulation;
  width: 175px;
  will-change: left, top, transform;
}

.sat-text { min-width: 0; flex: 1; }
.sat-title { white-space: nowrap; }
.sat-desc { white-space: normal; line-height: 1.3; }

html.dark .satellite {
  background: rgba(31, 41, 55, 0.94);
  border: 1px solid rgba(19, 176, 238, 0.32);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
}

.satellite:hover {
  transform: translate(-50%, -50%) scale(calc(var(--orbit-scale) * 1.08));
  box-shadow: 0 18px 44px rgba(19, 176, 238, 0.28);
  border-color: rgba(19, 176, 238, 0.55);
}

.satellite:active {
  transform: translate(-50%, -50%) scale(calc(var(--orbit-scale) * 1.02));
}

.sat-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.16), rgba(57, 44, 145, 0.12));
  border-radius: 10px;
  color: #13B0EE;
  flex-shrink: 0;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease;
}

.satellite:hover .sat-icon {
  transform: scale(1.1) rotate(-6deg);
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.28), rgba(57, 44, 145, 0.22));
}

.sat-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
  line-height: 1.2;
}

html.dark .sat-title { color: #f3f4f6; }

.satellite:hover .sat-title { color: #13B0EE; }

.sat-desc {
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
  margin-top: 1px;
  line-height: 1.3;
}

html.dark .sat-desc { color: #9ca3af; }

@media (prefers-reduced-motion: reduce) {
  .orbit-rings, .orbit-ring.inner, .conn-line, .particles, .orbit-center, .satellite, .center-pulse {
    animation: none !important;
  }
  .satellite { opacity: 1; }
}

a {
  text-decoration: none;
}

/* Responsive - Tablet */
@media (max-width: 1024px) {
  .heroDiv {
    min-height: auto;
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 40px) 40px 60px;
  }
  
  .heroMain {
    min-height: auto;
  }
  
  .heroGrid {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .heroContent {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .hero-highlights {
    justify-content: center;
  }

  .heroVisual {
    height: 400px;
    margin: 0 auto;
    max-width: 560px;
  }
}

/* Responsive - Mobile */
@media (max-width: 640px) {
  .heroDiv {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 24px) 20px 40px;
    min-height: auto;
  }
  
  .heroMain {
    min-height: auto;
  }

  .heroGrid {
    gap: 40px;
  }

  .title {
    font-size: 32px;
    margin-bottom: 16px;
  }

  .tagline {
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  .tagline:last-of-type {
    margin-bottom: 20px;
  }

  .hero-highlights {
    flex-direction: row;
    gap: 8px;
    margin-top: 18px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .heroVisual {
    height: 380px;
    max-width: 100%;
  }

  .center-card {
    width: 130px;
    height: 130px;
    padding: 14px;
    border-radius: 20px;
  }

  .center-icon {
    width: 44px;
    height: 44px;
    margin-bottom: 6px;
    border-radius: 12px;
  }

  .center-icon svg {
    width: 26px;
    height: 26px;
  }

  .center-label { font-size: 11.5px; }
  .center-sub { font-size: 9.5px; }

  .satellite {
    padding: 9px 12px;
    gap: 8px;
    border-radius: 12px;
    min-width: auto;
  }

  .sat-icon {
    width: 30px;
    height: 30px;
    border-radius: 8px;
  }

  .sat-icon svg {
    width: 17px;
    height: 17px;
  }

  .sat-title { font-size: 12px; }
  .sat-desc { font-size: 10px; }

}

/* Extra small mobile devices */
@media (max-width: 380px) {
  .heroDiv {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 20px) 16px 32px;
  }
  
  .title {
    font-size: 28px;
  }

  .tagline {
    font-size: 14px;
  }

  .heroVisual {
    height: 320px;
  }

  .highlight-item {
    font-size: 11px;
    padding: 5px 10px;
  }

  .center-card {
    width: 110px;
    height: 110px;
    padding: 10px;
  }

  .center-icon {
    width: 36px;
    height: 36px;
  }

  .center-label { font-size: 10.5px; }
  .center-sub { display: none; }

  .satellite {
    padding: 7px 10px;
    gap: 6px;
  }

  .sat-icon {
    width: 26px;
    height: 26px;
  }

  .sat-title { font-size: 10.5px; }
  .sat-desc { font-size: 9px; }
}

/* Landscape mobile fix */
@media (orientation: landscape) and (max-height: 640px) {
  .heroDiv {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 20px) 24px 32px;
    min-height: auto;
    height: auto;
  }
  
  .heroMain {
    min-height: auto;
  }
  
  .heroGrid {
    gap: 40px;
  }

  .title {
    font-size: 28px;
    margin-bottom: 12px;
  }

  .tagline {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .hero-highlights {
    margin-top: 14px;
    gap: 6px;
  }


  .heroVisual {
    height: 300px;
  }

  .background-gradient {
    width: 600px;
    height: 600px;
  }

  .center-card {
    width: 110px;
    height: 110px;
  }

  .satellite {
    padding: 7px 10px;
    gap: 6px;
  }
}

/* Brand logos marquee inside hero */
.hero-marquee {
  position: relative;
  z-index: 3;
  margin: 0 -64px;
  padding: 56px 0 24px;
}
.hero-marquee :deep(.brand-logos-intro) { display: none; }
.hero-marquee :deep(.logos-carousel) { padding: 0; }
.hero-marquee :deep(.logos-carousel::before),
.hero-marquee :deep(.logos-carousel::after) {
  display: none;
}

@media (max-width: 768px) {
  .hero-marquee {
    margin: 0 -24px;
    padding: 20px 0 4px;
  }
}
</style>
