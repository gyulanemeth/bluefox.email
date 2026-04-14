<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  items: {
    type: Array,
    default: () => []
  }
})

function scrollTo(anchor) {
  if (!anchor) return
  const el = document.getElementById(anchor)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <aside class="feature-panel" aria-label="Audience specific platform highlights">
    <p class="panel-kicker">Why it fits</p>
    <h2 class="panel-title">{{ title }}</h2>
    <p v-if="subtitle" class="panel-subtitle">{{ subtitle }}</p>

    <ul v-if="items.length" class="feature-list" role="list">
      <li
        v-for="(item, index) in items"
        :key="`${item.title}-${index}`"
        class="feature-card"
        :class="{ 'feature-card--link': item.anchor }"
        role="listitem"
        :tabindex="item.anchor ? 0 : undefined"
        :aria-label="item.anchor ? `Scroll to ${item.title}` : undefined"
        @click="item.anchor && scrollTo(item.anchor)"
        @keydown.enter.prevent="item.anchor && scrollTo(item.anchor)"
        @keydown.space.prevent="item.anchor && scrollTo(item.anchor)"
      >
        <div class="feature-dot" aria-hidden="true"></div>
        <div class="feature-body">
          <p class="feature-title">{{ item.title }}</p>
          <p v-if="item.description" class="feature-description">{{ item.description }}</p>
          <p v-if="item.metric" class="feature-metric">{{ item.metric }}</p>
        </div>
        <svg
          v-if="item.anchor"
          class="feature-arrow"
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true"
        ><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.feature-panel {
  width: 100%;
  border-radius: 16px;
  padding: 22px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(19, 176, 238, 0.2);
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
}

.feature-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 120% 0%, rgba(19, 176, 238, 0.16), transparent 50%);
  opacity: 0.55;
}

html.dark .feature-panel {
  background: rgba(15, 23, 42, 0.7);
  border-color: rgba(19, 176, 238, 0.3);
}

.panel-kicker {
  margin: 0;
  color: #0e7490;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  font-size: 12px;
}

.panel-title {
  margin: 6px 0 8px;
  font-size: clamp(22px, 2.7vw, 28px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.panel-subtitle {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  font-size: 14px;
}

.feature-list {
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  z-index: 1;
}

.feature-card {
  border-radius: 12px;
  padding: 11px 12px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(19, 176, 238, 0.16);
  display: flex;
  gap: 10px;
  align-items: flex-start;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease;
}

html.dark .feature-card {
  background: rgba(30, 41, 59, 0.72);
  border-color: rgba(19, 176, 238, 0.2);
}

.feature-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  margin-top: 5px;
  background: linear-gradient(180deg, #13b0ee 0%, #392c91 100%);
  flex-shrink: 0;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.feature-body {
  flex: 1;
  min-width: 0;
}

.feature-title {
  margin: 0;
  font-weight: 700;
  font-size: 13px;
  line-height: 1.3;
  transition: color 0.22s ease;
}

.feature-description {
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.45;
  color: var(--vp-c-text-2);
  transition: color 0.22s ease;
}

.feature-metric {
  margin: 4px 0 0;
  color: #0e7490;
  font-size: 11px;
  font-weight: 700;
  transition: color 0.22s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  border-color: rgba(19, 176, 238, 0.42);
  box-shadow: 0 10px 24px rgba(19, 176, 238, 0.14);
  background: rgba(255, 255, 255, 0.9);
}

html.dark .feature-card:hover {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(19, 176, 238, 0.48);
  box-shadow: 0 10px 24px rgba(19, 176, 238, 0.2);
}

.feature-card:hover .feature-dot {
  transform: scale(1.25);
  box-shadow: 0 0 0 5px rgba(19, 176, 238, 0.12);
}

.feature-card:hover .feature-title {
  color: #0369a1;
}

html.dark .feature-card:hover .feature-title {
  color: #38bdf8;
}

.feature-card:hover .feature-description {
  color: var(--vp-c-text-1);
}

.feature-card:active {
  transform: translateY(-1px) scale(0.997);
}

.feature-card--link {
  cursor: pointer;
}

.feature-arrow {
  flex-shrink: 0;
  align-self: center;
  color: #94a3b8;
  opacity: 0;
  transform: translateY(-3px);
  transition: opacity 0.22s ease, transform 0.22s ease, color 0.22s ease;
}

.feature-card--link:hover .feature-arrow {
  opacity: 1;
  transform: translateY(0);
  color: #13b0ee;
}

@media (prefers-reduced-motion: reduce) {
  .feature-card,
  .feature-dot,
  .feature-title,
  .feature-description,
  .feature-metric {
    transition: none;
  }
}

@media (max-width: 760px) {
  .feature-panel {
    padding: 16px;
  }
}
</style>
