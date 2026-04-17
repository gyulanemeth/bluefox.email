<script setup>
const transactional = {
  label: 'Transactional Stream',
  accent: '#10b981',
  accentLight: 'rgba(16, 185, 129, 0.1)',
  accentLightDark: 'rgba(16, 185, 129, 0.15)',
  metrics: [
    { label: 'Delivery Rate', value: '99.7%', width: 99.7 },
    { label: 'Avg Latency', value: '1.2s', width: 24 },
    { label: 'Bounce Rate', value: '0.1%', width: 2 }
  ],
  auth: ['DKIM', 'SPF', 'DMARC']
}

const marketing = {
  label: 'Marketing Stream',
  accent: '#13b0ee',
  accentLight: 'rgba(19, 176, 238, 0.1)',
  accentLightDark: 'rgba(19, 176, 238, 0.15)',
  metrics: [
    { label: 'Inbox Placement', value: '94.8%', width: 94.8 },
    { label: 'Open Rate', value: '38.2%', width: 38.2 },
    { label: 'Complaint Rate', value: '0.02%', width: 2 }
  ],
  hygiene: ['Auto-suppression', 'Bounce handling']
}
</script>

<template>
  <section class="delivery-streams" aria-labelledby="delivery-streams-title">
    <div class="streams-head">
      <v-chip color="primary" class="streams-badge">
        <span class="text-overline">Deliverability at Scale</span>
      </v-chip>
      <h2 id="delivery-streams-title">Isolate Sending Streams. Protect Every Channel.</h2>
      <p>Transactional and marketing emails run on separate infrastructure. One channel's engagement patterns never degrade the other's inbox placement.</p>
    </div>

    <div class="streams-grid">
      <!-- Transactional -->
      <div class="stream-card">
        <div class="stream-header">
          <span class="stream-pill" :style="{ background: transactional.accentLight, color: transactional.accent }">
            {{ transactional.label }}
          </span>
        </div>
        <div class="metric-list">
          <div v-for="m in transactional.metrics" :key="m.label" class="metric-row">
            <div class="metric-label-row">
              <span class="metric-label">{{ m.label }}</span>
              <span class="metric-value" :style="{ color: transactional.accent }">{{ m.value }}</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" :style="{ width: m.width + '%', background: transactional.accent }" />
            </div>
          </div>
        </div>
        <div class="auth-row">
          <span class="auth-heading">Authentication</span>
          <div class="auth-checks">
            <span v-for="a in transactional.auth" :key="a" class="auth-check">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              {{ a }}
            </span>
          </div>
        </div>
      </div>

      <!-- Marketing -->
      <div class="stream-card">
        <div class="stream-header">
          <span class="stream-pill" :style="{ background: marketing.accentLight, color: marketing.accent }">
            {{ marketing.label }}
          </span>
        </div>
        <div class="metric-list">
          <div v-for="m in marketing.metrics" :key="m.label" class="metric-row">
            <div class="metric-label-row">
              <span class="metric-label">{{ m.label }}</span>
              <span class="metric-value" :style="{ color: marketing.accent }">{{ m.value }}</span>
            </div>
            <div class="metric-bar">
              <div class="metric-fill" :style="{ width: m.width + '%', background: marketing.accent }" />
            </div>
          </div>
        </div>
        <div class="auth-row">
          <span class="auth-heading">List Hygiene</span>
          <div class="auth-checks">
            <span v-for="h in marketing.hygiene" :key="h" class="auth-check">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              {{ h }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="isolation-strip" role="note">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      <div class="isolation-text">
        <strong>Stream isolation with BYO SES.</strong>
        <span> Connect your own Amazon SES so each email stream runs on dedicated infrastructure. Marketing list fatigue never touches transactional delivery.</span>
      </div>
      <a href="/byo-amazon-ses-pricing" class="ses-link">See BYO SES pricing
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.delivery-streams {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 36px 24px;
  background: #ffffff;
}

html.dark .delivery-streams {
  background: rgba(15, 23, 42, 0.72);
  border-color: #334155;
}

.streams-head { margin-bottom: 24px; }

.streams-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.streams-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.streams-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .streams-head p { color: #94a3b8; }

.streams-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.stream-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.07);
}

html.dark .stream-card {
  background: rgba(30, 41, 59, 0.95);
  box-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.25);
}

.stream-header { margin-bottom: 18px; }

.stream-pill {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  border-radius: 999px;
  padding: 4px 12px;
}

.metric-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 18px;
}

.metric-label-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}

.metric-label {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}

html.dark .metric-label { color: #cbd5e1; }

.metric-value {
  font-size: 15px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.metric-bar {
  width: 100%;
  height: 5px;
  background: #f1f5f9;
  border-radius: 999px;
  overflow: hidden;
}

html.dark .metric-bar { background: rgba(248, 250, 252, 0.08); }

.metric-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 1s ease;
}

.auth-row {
  border-top: 1px solid #f1f5f9;
  padding-top: 14px;
}

html.dark .auth-row { border-top-color: #1e293b; }

.auth-heading {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
  margin-bottom: 8px;
}

html.dark .auth-heading { color: #94a3b8; }

.auth-checks {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.auth-check {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #047857;
}

html.dark .auth-check { color: #34d399; }

.isolation-strip {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px 20px;
  flex-wrap: wrap;
}

html.dark .isolation-strip { background: rgba(30, 41, 59, 0.6); }

.isolation-strip > svg {
  flex-shrink: 0;
  color: #64748b;
}

html.dark .isolation-strip > svg { color: #94a3b8; }

.isolation-text {
  flex: 1;
  min-width: 0;
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

html.dark .isolation-text { color: #94a3b8; }
.isolation-text strong { color: #0f172a; }
html.dark .isolation-text strong { color: #f1f5f9; }

.ses-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 700;
  color: #0369a1;
  text-decoration: none;
  flex-shrink: 0;
  white-space: nowrap;
}

.ses-link:hover { text-decoration: underline; text-underline-offset: 2px; }
html.dark .ses-link { color: #67e8f9; }

@media (prefers-reduced-motion: reduce) {
  .metric-fill { transition: none; }
}

@media (max-width: 860px) {
  .delivery-streams { padding: 24px 16px; }
  .streams-grid { grid-template-columns: 1fr; }
  .isolation-strip { flex-direction: column; align-items: flex-start; }
}
</style>
