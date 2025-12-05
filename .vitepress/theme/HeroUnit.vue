<script setup>
import { useData } from 'vitepress'
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', checkMobile)
})
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
            <div class="title-line" style="font-size: 1.3em; font-weight: 800;">Beautiful emails</div>
            <div class="title-line" style="font-size: 1.125em; font-weight: 700;">Faster workflows</div>
            <div class="title-line" style="font-size: 1em; font-weight: 600;">Happier clients</div>
          </h1>
          <p class="tagline">Pay for sends, not contacts.</p>

          <div>
            <v-btn
              size="x-large"
              color="primary"
              variant="flat"
              class="no-uppercase mt-4 cta-button"
              href="https://app.bluefox.email/accounts/create-account"
              target="_blank"
            >
              <strong>Get Started for Free</strong>
            </v-btn>
          </div>

          <!-- Trust Indicators -->
          <div class="trust-bar">
            <div class="trust-item">
              <div class="trust-number">100+</div>
              <div class="trust-label">Agencies</div>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <div class="trust-number">10x</div>
              <div class="trust-label">Faster</div>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <div class="trust-number">$0.001</div>
              <div class="trust-label">Per Email</div>
            </div>
          </div>
        </div>

        <!-- Right Side: Interactive Visualization -->
        <div class="heroVisual">
          <!-- Main Email Card -->
          <div class="email-card main-card">
            <div class="card-header">
              <div class="header-bar"></div>
              <div class="header-content">
                <div class="brand-circle"></div>
                <div class="brand-lines">
                  <div class="brand-line"></div>
                  <div class="brand-line short"></div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="content-block">
                <div class="content-title"></div>
                <div class="content-subtitle"></div>
              </div>
              <div class="content-grid">
                <div class="grid-item"></div>
                <div class="grid-item"></div>
                <div class="grid-item"></div>
              </div>
              <div class="cta-block"></div>
            </div>
          </div>

          <!-- Floating Question Cards - Link to Solution Sections -->
          <div class="feature-float top-left" @click="scrollToSection('design-system')">
            <div class="float-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="float-text">
              <div class="float-title">Multiple clients?</div>
              <div class="float-desc">Manage them easily</div>
            </div>
          </div>

          <div class="feature-float top-right" @click="scrollToSection('no-rendering-issues')">
            <div class="float-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 15l-2 2m8-2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="float-text">
              <div class="float-title">Rendering issues?</div>
              <div class="float-desc">Pixel-perfect emails</div>
            </div>
          </div>

          <div class="feature-float bottom-right" @click="scrollToSection('marketers')">
            <div class="float-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>
              </svg>
            </div>
            <div class="float-text">
              <div class="float-title">Design bottleneck?</div>
              <div class="float-desc">10x faster production</div>
            </div>
          </div>

          <!-- Connecting Lines -->
          <svg class="connection-lines" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#13B0EE" stop-opacity="0"/>
                <stop offset="50%" stop-color="#13B0EE" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#13B0EE" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path class="connection-path" d="M 80 80 Q 200 200 320 120" stroke="url(#lineGradient)" stroke-width="2" fill="none" stroke-dasharray="5,5"/>
            <path class="connection-path" d="M 80 320 Q 200 200 320 280" stroke="url(#lineGradient)" stroke-width="2" fill="none" stroke-dasharray="5,5"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heroDiv {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  min-height: 100vh;
  height: auto;
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 80px;
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
  min-height: calc(100vh - var(--vp-nav-height) - var(--vp-layout-top-height, 0px) - 160px);
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
  font-size: clamp(32px, 5vw, 56px);
  line-height: 1.2;
  margin-bottom: 24px;
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

/* Trust Bar */
.trust-bar {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: 48px;
  opacity: 0;
  animation: fadeIn 0.6s ease-out 1.4s forwards;
  flex-wrap: wrap;
}

.trust-item {
  text-align: center;
}

.trust-number {
  font-size: clamp(24px, 3vw, 28px);
  font-weight: 800;
  color: #13B0EE;
  margin-bottom: 4px;
}

.trust-label {
  font-size: clamp(11px, 1.5vw, 13px);
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

html.dark .trust-label {
  color: #9ca3af;
}

.trust-divider {
  width: 1px;
  height: 40px;
  background: #d1d5db;
}

html.dark .trust-divider {
  background: #374151;
}

/* Right Visual */
.heroVisual {
  position: relative;
  height: 500px;
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

/* Main Email Card */
.email-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(19, 176, 238, 0.2);
  overflow: hidden;
  animation: cardFloat 6s ease-in-out infinite;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.email-card:hover {
  transform: translate(-50%, -50%) translateY(-5px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
}

@keyframes cardFloat {
  0%, 100% { transform: translate(-50%, -50%) translateY(0); }
  50% { transform: translate(-50%, -50%) translateY(-10px); }
}

html.dark .email-card {
  background: rgba(31, 41, 55, 0.95);
  border: 1px solid rgba(19, 176, 238, 0.3);
}

.card-header {
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

html.dark .card-header {
  border-bottom: 1px solid #374151;
}

.header-bar {
  height: 6px;
  background: linear-gradient(90deg, #13B0EE, #392C91);
  border-radius: 3px;
  margin-bottom: 16px;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #13B0EE, #392C91);
  flex-shrink: 0;
}

.brand-lines {
  flex: 1;
}

.brand-line {
  height: 8px;
  background: #d1d5db;
  border-radius: 4px;
  margin-bottom: 6px;
  animation: loadLine 2s ease-out infinite;
}

html.dark .brand-line {
  background: #4b5563;
}

.brand-line.short {
  width: 60%;
  animation-delay: 0.3s;
}

@keyframes loadLine {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.card-body {
  padding: 24px;
}

.content-block {
  margin-bottom: 20px;
}

.content-title {
  height: 16px;
  background: #d1d5db;
  border-radius: 4px;
  margin-bottom: 8px;
  width: 70%;
}

html.dark .content-title {
  background: #4b5563;
}

.content-subtitle {
  height: 10px;
  background: #d1d5db;
  border-radius: 4px;
  width: 50%;
  opacity: 0.6;
}

html.dark .content-subtitle {
  background: #4b5563;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.grid-item {
  aspect-ratio: 1;
  background: #d1d5db;
  border-radius: 8px;
  animation: itemPulse 3s ease-in-out infinite;
}

html.dark .grid-item {
  background: #4b5563;
}

.grid-item:nth-child(1) { animation-delay: 0s; }
.grid-item:nth-child(2) { animation-delay: 0.2s; }
.grid-item:nth-child(3) { animation-delay: 0.4s; }

@keyframes itemPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.cta-block {
  height: 40px;
  background: linear-gradient(135deg, #13B0EE, #392C91);
  border-radius: 8px;
  margin-bottom: 20px;
  animation: ctaGlow 3s ease-in-out infinite;
}

@keyframes ctaGlow {
  0%, 100% { box-shadow: 0 0 0 rgba(19, 176, 238, 0); }
  50% { box-shadow: 0 0 20px rgba(19, 176, 238, 0.4); }
}

.card-footer {
  height: 8px;
  background: #d1d5db;
  border-radius: 4px;
  opacity: 0.3;
}

html.dark .card-footer {
  background: #4b5563;
}

/* Floating Question Cards */
.feature-float {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(19, 176, 238, 0.2);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  animation: floatIn 1s ease-out forwards;
  opacity: 0;
  min-height: 48px;
  touch-action: manipulation;
}

html.dark .feature-float {
  background: rgba(31, 41, 55, 0.95);
  border: 1px solid rgba(19, 176, 238, 0.3);
}

.feature-float.top-left {
  top: 20px;
  left: 20px;
  animation-delay: 0.8s;
  transform: translate(var(--parallax-topleft-x, 0), var(--parallax-topleft-y, 0));
}

.feature-float.top-left:hover {
  transform: translate(var(--parallax-topleft-x, 0), var(--parallax-topleft-y, 0)) translateY(-8px) scale(1.03);
  box-shadow: 0 20px 50px rgba(19, 176, 238, 0.2);
  border-color: rgba(19, 176, 238, 0.5);
}

.feature-float.top-right {
  top: 20px;
  right: 20px;
  animation-delay: 1s;
  transform: translate(var(--parallax-topright-x, 0), var(--parallax-topright-y, 0));
}

.feature-float.top-right:hover {
  transform: translate(var(--parallax-topright-x, 0), var(--parallax-topright-y, 0)) translateY(-8px) scale(1.03);
  box-shadow: 0 20px 50px rgba(19, 176, 238, 0.2);
  border-color: rgba(19, 176, 238, 0.5);
}

.feature-float.bottom-right {
  bottom: 20px;
  right: 20px;
  animation-delay: 1.2s;
  transform: translate(var(--parallax-bottomright-x, 0), var(--parallax-bottomright-y, 0));
}

.feature-float.bottom-right:hover {
  transform: translate(var(--parallax-bottomright-x, 0), var(--parallax-bottomright-y, 0)) translateY(-8px) scale(1.03);
  box-shadow: 0 20px 50px rgba(19, 176, 238, 0.2);
  border-color: rgba(19, 176, 238, 0.5);
}

@keyframes floatIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.float-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(19, 176, 238, 0.1);
  border-radius: 10px;
  flex-shrink: 0;
  color: #13B0EE;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-float:hover .float-icon {
  background: rgba(19, 176, 238, 0.2);
  transform: scale(1.1) rotate(5deg);
}

.feature-float:active .float-icon {
  transform: scale(0.95);
  background: rgba(19, 176, 238, 0.25);
}

.float-title {
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2px;
  transition: color 0.3s ease;
}

html.dark .float-title {
  color: #f3f4f6;
}

.feature-float:hover .float-title {
  color: #13B0EE;
}

.float-desc {
  font-size: 12px;
  color: #6b7280;
  transition: color 0.3s ease;
}

html.dark .float-desc {
  color: #9ca3af;
}

/* Connection Lines */
.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.4;
}

.connection-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 3s ease-out 1.5s forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
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

  .trust-bar {
    justify-content: center;
  }

  .heroVisual {
    height: 400px;
    margin: 0 auto;
    max-width: 500px;
  }

  .email-card {
    width: 280px;
  }
  
  .feature-float {
    padding: 12px 16px;
    transform: scale(0.9);
  }
  
  .feature-float.top-left {
    transform: translate(var(--parallax-topleft-x, 0), var(--parallax-topleft-y, 0)) scale(0.9);
  }
  
  .feature-float.top-right {
    transform: translate(var(--parallax-topright-x, 0), var(--parallax-topright-y, 0)) scale(0.9);
  }
  
  .feature-float.bottom-right {
    transform: translate(var(--parallax-bottomright-x, 0), var(--parallax-bottomright-y, 0)) scale(0.9);
  }
  
  .float-icon {
    width: 36px;
    height: 36px;
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

  .trust-bar {
    flex-direction: row;
    gap: 16px;
    margin-top: 32px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .trust-divider {
    display: none;
  }
  
  .trust-item {
    flex: 0 0 auto;
    min-width: 80px;
  }

  .heroVisual {
    height: 320px;
    max-width: 100%;
  }

  .email-card {
    width: 240px;
  }
  
  .card-header,
  .card-body {
    padding: 16px;
  }
  
  .brand-circle {
    width: 24px;
    height: 24px;
  }
  
  .brand-line {
    height: 6px;
  }

  .feature-float {
    padding: 8px 12px;
    gap: 8px;
    transform: scale(0.75);
    transform-origin: top left;
    width: 167px;
  }

  .feature-float.top-left {
    top: 5px;
    left: 5px;
    transform: scale(0.75);
    transform-origin: top left;
  }
  
  .feature-float.top-left:active {
    transform: scale(0.72) translateY(-2px);
  }

  .feature-float.top-right {
    top: 5px;
    right: 5px;
    transform: scale(0.75);
    transform-origin: top right;
  }
  
  .feature-float.top-right:active {
    transform: scale(0.72) translateY(-2px);
  }

  .feature-float.bottom-right {
    bottom: 5px;
    right: 5px;
    transform: scale(0.75);
    transform-origin: bottom right;
  }
  
  .feature-float.bottom-right:active {
    transform: scale(0.72) translateY(-2px);
  }

  .float-icon {
    width: 32px;
    height: 32px;
  }
  
  .float-icon svg {
    width: 18px;
    height: 18px;
  }

  .float-title {
    font-size: 12px;
  }

  .float-desc {
    font-size: 10px;
  }
  
  .connection-lines {
    display: none;
  }
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
    height: 280px;
  }
  
  .email-card {
    width: 200px;
  }
  
  .trust-item {
    min-width: 70px;
  }
  
  .trust-number {
    font-size: 20px;
  }
  
  .trust-label {
    font-size: 10px;
  }
  
  .feature-float {
    transform: scale(0.65);
  }
  
  .feature-float.top-left {
    transform: scale(0.65);
  }
  
  .feature-float.top-right {
    transform: scale(0.65);
  }
  
  .feature-float.bottom-right {
    transform: scale(0.65);
  }
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

  .trust-bar {
    margin-top: 20px;
    gap: 12px;
  }
  
  .heroVisual {
    height: 280px;
  }
  
  .background-gradient {
    width: 600px;
    height: 600px;
  }
  
  .feature-float {
    transform: scale(0.7);
  }
  
  .feature-float.top-left {
    transform: scale(0.7);
  }
  
  .feature-float.top-right {
    transform: scale(0.7);
  }
  
  .feature-float.bottom-right {
    transform: scale(0.7);
  }
}
</style>
