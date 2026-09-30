<script setup>
import { mdiShieldCheckOutline, mdiFileDocumentOutline } from '@mdi/js'

const categories = [
  {
    name: 'Email Deliverability Tools',
    desc: 'Check DMARC, SPF, DKIM, and MX records to prevent spoofing and fix inbox placement issues.',
    href: '/tools/deliverability/',
    count: '5 tools',
    icon: mdiShieldCheckOutline,
  },
  {
    name: 'Email Content Tools',
    desc: 'Test links and validate your HTML email content before you hit send.',
    href: '/tools/content/',
    count: '1 tool',
    icon: mdiFileDocumentOutline,
  },
]
</script>

<template>
  <div class="tools-home">
    <div class="tools-hero">
      <h1 class="hero-title">Free Tools by BlueFox Email</h1>
      <p class="hero-subtitle">
        A growing toolbox of free utilities for email authentication and deliverability.
        No signup required.
      </p>
    </div>

    <div class="category-grid">
      <a v-for="cat in categories" :key="cat.href" :href="cat.href" class="category-card">
        <svg class="category-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path :d="cat.icon" fill="currentColor"/>
        </svg>
        <div class="category-body">
          <div class="category-heading">
            <h2 class="category-name">{{ cat.name }}</h2>
            <span class="category-count">{{ cat.count }}</span>
          </div>
          <p class="category-desc">{{ cat.desc }}</p>
        </div>
        <div class="category-link" aria-hidden="true">
          Explore
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.tools-home { width: 100%; }

.tools-hero {
  text-align: center;
  padding: 3.5rem 1.5rem 1rem;
  max-width: 640px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 0.75rem;
  padding: 0;
  border: none !important;
  color: var(--vp-c-text-1);
}

.hero-subtitle {
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 2.5rem auto 3rem;
  padding: 0 1.5rem;
}

.category-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid transparent;
  border-radius: 4px;
  text-decoration: none !important;
  color: inherit;
}

.category-card:hover {
  border-color: #13B0EE;
}

.category-icon {
  color: #13B0EE;
  flex-shrink: 0;
}

.category-body { flex: 1; }

.category-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 8px;
}

.category-name {
  font-size: 19px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
  padding: 0;
  border: none !important;
  line-height: 1.3;
}

.category-count {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #392C91;
  background: rgba(57, 44, 145, 0.1);
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  flex-shrink: 0;
  white-space: nowrap;
}

html.dark .category-count { color: #b3a4ff; background: rgba(179, 164, 255, 0.15); }

.category-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.category-link {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13.5px;
  font-weight: 600;
  color: #13B0EE;
}

@media (max-width: 640px) {
  .category-grid { grid-template-columns: 1fr; margin: 2rem auto; }
  .hero-title { font-size: 1.75rem; }
  .tools-hero { padding: 2.5rem 1.25rem 0.5rem; }
}
</style>
