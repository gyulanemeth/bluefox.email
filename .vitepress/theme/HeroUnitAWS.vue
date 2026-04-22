<script setup>
const features = [
  { label: 'Drag & drop editor', cls: 'feat--editor' },
  { label: 'Email templates', cls: 'feat--templates' },
  { label: 'Automation flows', cls: 'feat--automation' },
  { label: 'Segmentation', cls: 'feat--lists' },
  { label: 'Real-time analytics', cls: 'feat--analytics' },
  { label: 'Webhooks & API', cls: 'feat--webhooks' }
]
</script>

<template>
  <div class="heroDiv">
    <div class="heroMain">
      <div class="heroContent">
        <h1 class="title">
          Supercharge Your Amazon SES
        </h1>
        <p class="tagline">BlueFox Email gives you beautiful emails, smart list management, effortless automation, and in-depth analytics, without giving up any control or deliverability.</p>
        <p class="tagline2">Get started with 3,000 free sends per month and personalized support.</p>

        <v-btn
          size="x-large"
          color="primary"
          variant="flat"
          class="hero-button"
          href="https://app.bluefox.email/accounts/create-account"
          target="_blank"
        >
          <strong>Get More from SES Today</strong>
        </v-btn>
      </div>

      <div class="heroIllustration" aria-hidden="true">
        <svg class="orbitLines" viewBox="0 0 480 480" preserveAspectRatio="none">
          <circle cx="240" cy="240" r="180" fill="none" stroke="url(#orbitGrad)" stroke-width="1.2" stroke-dasharray="4 6" opacity="0.55"/>
          <circle cx="240" cy="240" r="120" fill="none" stroke="url(#orbitGrad)" stroke-width="1" stroke-dasharray="3 5" opacity="0.35"/>
          <defs>
            <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#392c91"/>
              <stop offset="100%" stop-color="#13b0ee"/>
            </linearGradient>
          </defs>
        </svg>

        <div class="sesCore">
          <div class="sesBadge">
            <span class="sesLabel">AWS</span>
            <span class="sesName">Amazon SES</span>
          </div>
          <div class="sesPrice">
            <span class="priceTop">Your sender</span>
            <span class="priceBottom">$0.10 / 1,000</span>
          </div>
        </div>

        <div
          v-for="(f, i) in features"
          :key="f.cls"
          :class="['featChip', f.cls]"
          :style="{ '--i': i }"
        >
          <span class="featDot"></span>
          <span class="featText">{{ f.label }}</span>
        </div>

        <div class="plusBadge">
          <span>BlueFox Email</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heroDiv {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 64px) 56px 72px;
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

.heroMain {
  max-width: 1240px;
  margin: 0 auto;
  min-height: calc(100vh - var(--vp-nav-height) - var(--vp-layout-top-height, 0px) - 136px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 56px;
  align-items: center;
}

.heroContent {
  text-align: left;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title {
  font-size: clamp(34px, 5vw, 56px);
  background: -webkit-linear-gradient(120deg, #392c91 5%, #13b0ee);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.15;
  margin-bottom: 16px;
  border-top: 0 !important;
  padding-top: 0 !important;
}

html.dark .title {
  background: -webkit-linear-gradient(120deg, #8a7ed8 5%, #13b0ee);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagline {
  font-size: 19px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  margin: 0;
}

.tagline2 {
  font-size: 16px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-top: 12px;
  font-weight: 600;
}

.hero-button {
  margin-top: 20px;
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-radius: 10px !important;
  min-height: 56px !important;
  padding: 0 30px !important;
  text-decoration: none !important;
}

/* Illustration */
.heroIllustration {
  position: relative;
  width: 100%;
  max-width: clamp(280px, 45vw, 520px);
  height: clamp(320px, 45vw, 480px);
  margin-left: auto;
  justify-self: end;
}

.orbitLines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.sesCore {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 3;
}

.sesBadge {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(10px, 2vw, 18px) clamp(14px, 3vw, 28px);
  background: linear-gradient(135deg, #232f3e 0%, #131a26 100%);
  border-radius: 14px;
  box-shadow: 0 18px 40px -16px rgba(15, 23, 42, 0.45), 0 4px 12px -4px rgba(15, 23, 42, 0.2);
  min-width: clamp(108px, 16vw, 180px);
}

.sesLabel {
  font-size: clamp(9px, 1vw, 11px);
  font-weight: 800;
  letter-spacing: 0.18em;
  color: #ff9900;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  margin-bottom: 4px;
}

.sesName {
  font-size: clamp(13px, 1.8vw, 18px);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.01em;
}

.sesPrice {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: clamp(5px, 0.9vw, 8px) clamp(9px, 1.4vw, 14px);
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 6px 18px -8px rgba(15, 23, 42, 0.25);
}

html.dark .sesPrice {
  background: #1e293b;
}

.priceTop {
  font-size: clamp(9px, 1vw, 10px);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
}

.priceBottom {
  font-size: clamp(11px, 1.4vw, 14px);
  font-weight: 700;
  color: #16a34a;
  font-variant-numeric: tabular-nums;
}

/* Plus badge */
.plusBadge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - clamp(90px, 13vw, 130px)));
  padding: clamp(4px, 0.7vw, 6px) clamp(10px, 1.6vw, 16px);
  background: linear-gradient(120deg, #392c91 5%, #13b0ee);
  color: #ffffff;
  font-size: clamp(10px, 1.1vw, 12px);
  font-weight: 700;
  letter-spacing: 0.08em;
  border-radius: 999px;
  box-shadow: 0 8px 20px -8px rgba(57, 44, 145, 0.5);
  white-space: nowrap;
  z-index: 4;
}

/* Feature chips */
.featChip {
  position: absolute;
  display: flex;
  align-items: center;
  gap: clamp(6px, 0.9vw, 8px);
  padding: clamp(6px, 1vw, 10px) clamp(9px, 1.4vw, 14px);
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px -10px rgba(15, 23, 42, 0.18), 0 2px 6px -2px rgba(15, 23, 42, 0.08);
  font-size: clamp(10px, 1.3vw, 13px);
  font-weight: 600;
  color: #0f172a;
  white-space: nowrap;
  z-index: 2;
  animation: floatY 6s ease-in-out infinite;
  animation-delay: calc(var(--i) * -1s);
}

html.dark .featChip {
  background: #0f172a;
  color: #f1f5f9;
  box-shadow: 0 8px 24px -10px rgba(0, 0, 0, 0.6), 0 2px 6px -2px rgba(0, 0, 0, 0.4);
}

.featDot {
  width: clamp(6px, 0.9vw, 8px);
  height: clamp(6px, 0.9vw, 8px);
  border-radius: 50%;
  background: linear-gradient(135deg, #13b0ee, #392c91);
  flex-shrink: 0;
}

.feat--editor      { top: 8%;  left: 4%; }
.feat--templates   { top: 6%;  right: 2%; }
.feat--automation  { top: 42%; left: -2%; }
.feat--lists       { top: 44%; right: -4%; }
.feat--analytics   { bottom: 8%; left: 6%; }
.feat--webhooks    { bottom: 4%; right: 4%; }

.feat--automation,
.feat--lists {
  max-width: clamp(90px, 18vw, 160px);
  white-space: normal;
  line-height: 1.25;
  padding: clamp(6px, 1vw, 10px) clamp(8px, 1.2vw, 12px);
}

@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

@media (prefers-reduced-motion: reduce) {
  .featChip { animation: none; }
}

@media (max-width: 1024px) {
  .heroMain {
    gap: 32px;
  }
}

@media (max-width: 900px) {
  .heroMain {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .heroContent {
    text-align: center;
    align-items: center;
    max-width: 720px;
    margin: 0 auto;
  }

  .heroIllustration {
    margin: 0 auto;
    justify-self: center;
    max-width: clamp(300px, 70vw, 480px);
    height: clamp(320px, 70vw, 460px);
  }
}

@media (max-width: 768px) {
  .heroDiv {
    min-height: auto;
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 40px) 18px 48px;
  }

  .heroMain {
    min-height: auto;
  }

  .tagline {
    font-size: clamp(14px, 3.2vw, 17px);
  }

  .tagline2 {
    font-size: clamp(13px, 2.8vw, 15px);
  }
}

@media (max-width: 600px) {
  .feat--editor      { top: 10%; left: 0; }
  .feat--templates   { top: 8%;  right: 0; }
  .feat--automation  { top: 38%; left: -4%; }
  .feat--lists       { top: 40%; right: -4%; }
  .feat--analytics   { bottom: 10%; left: 2%; }
  .feat--webhooks    { bottom: 6%;  right: 2%; }
}

@media (max-width: 480px) {
  .heroDiv {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 28px) 14px 36px;
  }

  .hero-button {
    width: 100%;
    justify-content: center;
  }

  .feat--automation { left: -6%; }
  .feat--lists      { right: -6%; }
}
</style>
