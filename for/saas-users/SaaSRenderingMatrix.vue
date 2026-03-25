<script setup>
import { ref } from 'vue'

const activeType = ref('welcome')

const emailTypes = [
  {
    id: 'welcome',
    label: 'Welcome',
    description: 'The first email a new user sees after signing up. Sets the tone for your product relationship and drives initial activation.',
    challenges: ['Hero image rendering across clients', 'CTA button alignment on mobile', 'Web font fallback handling']
  },
  {
    id: 'invoice',
    label: 'Invoice',
    description: 'Payment confirmations and receipts that users reference repeatedly. Must render tables, line items, and totals correctly everywhere.',
    challenges: ['Table layout in Outlook\'s Word engine', 'Number alignment across fonts', 'PDF attachment preview support']
  },
  {
    id: 'usage-alert',
    label: 'Usage Alert',
    description: 'Threshold notifications triggered by product events. Often include dynamic data like percentages, progress bars, and conditional blocks.',
    challenges: ['Dynamic content block rendering', 'Progress bar CSS support', 'Conditional section display']
  },
  {
    id: 'trial-expiry',
    label: 'Trial Expiry',
    description: 'Time-sensitive conversion emails that drive upgrade decisions. Visual urgency elements must render consistently to create the right impact.',
    challenges: ['Countdown/urgency styling', 'Feature comparison table layout', 'Upgrade CTA prominence on mobile']
  },
  {
    id: 'password-reset',
    label: 'Password Reset',
    description: 'Security-critical transactional emails that users need immediately. The reset link and instructions must be unmistakable in any client.',
    challenges: ['Single-CTA focus rendering', 'Security notice formatting', 'Plain-text fallback accuracy']
  }
]

const clients = [
  { name: 'Gmail', platform: 'Web', color: '#EA4335' },
  { name: 'Outlook 365', platform: 'Desktop', color: '#0078D4' },
  { name: 'Apple Mail', platform: 'Desktop', color: '#555555' },
  { name: 'Yahoo Mail', platform: 'Web', color: '#6001D2' },
  { name: 'Samsung Mail', platform: 'Mobile', color: '#1428A0' },
  { name: 'Outlook 2016', platform: 'Desktop', color: '#0078D4' }
]

const activeEmailType = () => emailTypes.find(t => t.id === activeType.value) || emailTypes[0]
</script>

<template>
  <section class="rendering-matrix" aria-labelledby="rendering-matrix-title">
    <div class="matrix-head">
      <v-chip color="primary" class="matrix-badge">
        <span class="text-overline">Cross-Client Rendering</span>
      </v-chip>
      <h2 id="rendering-matrix-title">Lifecycle Emails That Render Consistently Across Clients</h2>
      <p>Welcome sequences, invoices, usage alerts, and password resets, all generated with markup engineered to render as consistently as possible across Gmail, Outlook, Apple Mail, and mobile clients.</p>
    </div>

    <div class="type-tabs" role="tablist" aria-label="Email types">
      <button
        v-for="et in emailTypes"
        :key="et.id"
        type="button"
        class="type-tab"
        :class="{ active: activeType === et.id }"
        :aria-selected="activeType === et.id"
        @click="activeType = et.id"
      >{{ et.label }}</button>
    </div>

    <p class="type-desc" role="tabpanel">{{ activeEmailType().description }}</p>

    <div class="client-grid">
      <div v-for="client in clients" :key="client.name" class="client-row">
        <div class="client-info">
          <div class="client-dot" :style="{ background: client.color }" />
          <span class="client-name">{{ client.name }}</span>
        </div>
        <span class="platform-pill" :class="`platform--${client.platform.toLowerCase()}`">{{ client.platform }}</span>
        <div class="status-pass">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
          <span>Renders consistently</span>
        </div>
      </div>
    </div>

    <div class="matrix-callout" role="note">
      <strong>Engineered for email client quirks.</strong>
      <span> BlueFox Email generates HTML that accounts for Outlook's Word engine, web font fallbacks, and mobile layout differences, so your lifecycle emails look as intended across the clients your users actually open.</span>
    </div>
  </section>
</template>

<style scoped>
.rendering-matrix {
  padding: 36px 24px;
}

.matrix-head {
  margin-bottom: 24px;
}

.matrix-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.matrix-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.matrix-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .matrix-head p { color: #94a3b8; }

.type-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.type-tab {
  border: 1px solid #cbd5e1;
  background: transparent;
  color: #334155;
  border-radius: 999px;
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}

.type-tab.active {
  border-color: #13b0ee;
  background: rgba(19, 176, 238, 0.12);
  color: #0369a1;
}

html.dark .type-tab {
  border-color: #475569;
  color: #e2e8f0;
}

html.dark .type-tab.active {
  border-color: #13b0ee;
  background: rgba(19, 176, 238, 0.18);
  color: #67e8f9;
}

.type-desc {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.6;
  color: #475569;
  max-width: 640px;
}

html.dark .type-desc { color: #94a3b8; }

.client-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.client-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.05);
}

html.dark .client-row {
  background: rgba(30, 41, 59, 0.8);
  box-shadow: 0 1px 2px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.2);
}

.client-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.client-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.client-name {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

html.dark .client-name { color: #f1f5f9; }

.platform-pill {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 999px;
  padding: 2px 8px;
  flex-shrink: 0;
}

.platform--web { background: rgba(19, 176, 238, 0.1); color: #0369a1; }
.platform--desktop { background: rgba(99, 102, 241, 0.1); color: #4338ca; }
.platform--mobile { background: rgba(16, 185, 129, 0.1); color: #047857; }

html.dark .platform--web { background: rgba(19, 176, 238, 0.15); color: #67e8f9; }
html.dark .platform--desktop { background: rgba(99, 102, 241, 0.15); color: #a5b4fc; }
html.dark .platform--mobile { background: rgba(16, 185, 129, 0.15); color: #34d399; }

.status-pass {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #047857;
  flex-shrink: 0;
}

.status-pass span {
  font-size: 12px;
  font-weight: 600;
}

html.dark .status-pass { color: #34d399; }

.matrix-callout {
  margin-top: 20px;
  background: #f8fafc;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

html.dark .matrix-callout {
  background: rgba(30, 41, 59, 0.6);
  color: #94a3b8;
}

.matrix-callout strong { color: #0f172a; }
html.dark .matrix-callout strong { color: #f1f5f9; }

@media (max-width: 860px) {
  .rendering-matrix { padding: 24px 0; }
  .client-grid { grid-template-columns: 1fr; }
}
</style>
