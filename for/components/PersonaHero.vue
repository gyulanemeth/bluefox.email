<script setup>
defineProps({
  badge: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  highlights: { type: Array, default: () => [] },
  ctaText: { type: String, required: true },
  ctaHref: { type: String, required: true }
})
</script>

<template>
  <div class="heroDiv">
    <div class="background-gradient"></div>
    <div class="grid-overlay"></div>

    <div class="heroMain">
      <div class="heroContent">
        <v-chip color="primary" class="hero-badge" aria-label="Audience badge">
          <span class="text-overline">{{ badge }}</span>
        </v-chip>

        <h1 class="hero-title">{{ title }}</h1>
        <p v-if="description" class="hero-description">{{ description }}</p>

        <div v-if="highlights.length" class="hero-highlights" role="list" aria-label="Hero highlights">
          <span v-for="(item, index) in highlights" :key="`${item}-${index}`" class="highlight-item" role="listitem">
            {{ item }}
          </span>
        </div>

        <v-btn
          size="x-large"
          color="primary"
          variant="flat"
          class="hero-button"
          :href="ctaHref"
          target="_blank"
        >
          <strong>{{ ctaText }}</strong>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heroDiv {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  min-height: 90vh;
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

.background-gradient {
  position: absolute;
  top: -35%;
  right: -12%;
  width: 720px;
  height: 720px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(19, 176, 238, 0.18), transparent 70%);
  filter: blur(60px);
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(19, 176, 238, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(19, 176, 238, 0.03) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none;
}

html.dark .grid-overlay {
  background-image:
    linear-gradient(rgba(19, 176, 238, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(19, 176, 238, 0.06) 1px, transparent 1px);
}

.heroMain {
  position: relative;
  z-index: 1;
  max-width: 980px;
  margin: 0 auto;
}

.heroContent {
  text-align: center;
}

.hero-title {
  font-size: clamp(34px, 5vw, 56px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 12px 0;
  border-top: 0 !important;
  padding-top: 0 !important;
  background: -webkit-linear-gradient(120deg, #392c91 20%, #13b0ee 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

html.dark .hero-title {
  background: -webkit-linear-gradient(120deg, #8a7ed8 20%, #13b0ee 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 18px;
  line-height: 1.5;
  margin: 0;
  color: var(--vp-c-text-2);
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.hero-highlights {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
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

.hero-button {
  margin-top: 18px;
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-radius: 10px !important;
  min-height: 56px !important;
  padding: 0 30px !important;
}

.hero-button :deep(.v-btn__content) {
  align-items: center;
  line-height: 1.2;
}

.hero-button strong {
  line-height: 1.2;
}

.hero-badge {
  margin-bottom: 6px;
}

@media (max-width: 768px) {
  .heroDiv {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 52px) 18px 54px;
  }

  .hero-description {
    font-size: 16px;
  }

  .hero-highlights {
    gap: 8px;
  }
}
</style>