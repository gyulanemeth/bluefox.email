<script setup>
import BrandLogos from './BrandLogos.vue'
</script>

<template>
  <div class="heroDiv">
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

/* Main Layout */
.heroMain {
  min-height: calc(100vh - var(--vp-nav-height) - var(--vp-layout-top-height, 0px) - 220px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.heroGrid {
  display: flex;
  justify-content: center;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

/* Content */
.heroContent {
  text-align: center;
  max-width: 720px;
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
  color: #1f2937;
}

html.dark .title-line {
  color: #f3f4f6;
}

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
}

html.dark .tagline {
  color: #9ca3af;
}

.tagline--accent {
  margin-top: 4px;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.cta-button {
  transition: transform 0.2s ease, box-shadow 0.2s ease !important;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15) !important;
  border-radius: 4px !important;
  padding: 20px 40px !important;
  font-size: 16px !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
  height: auto !important;
  min-height: 48px !important;
}

.cta-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.2) !important;
}

html.dark .cta-button {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
}

html.dark .cta-button:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5) !important;
}

/* Hero Highlights (signature pills) */
.hero-highlights {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
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

  .heroContent {
    max-width: 600px;
    margin: 0 auto;
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
    gap: 8px;
    margin-top: 18px;
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

  .highlight-item {
    font-size: 11px;
    padding: 5px 10px;
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
