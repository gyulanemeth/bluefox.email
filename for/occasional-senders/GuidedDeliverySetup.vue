<script setup>
const steps = [
  {
    number: '1',
    title: 'Verify your domain',
    detail: 'Add a single DNS record to prove you own the domain you send from. BlueFox Email walks you through it.'
  },
  {
    number: '2',
    title: 'Configure authentication',
    detail: 'DKIM, SPF, and DMARC are set up automatically once your domain is verified. No manual DNS juggling.'
  },
  {
    number: '3',
    title: 'Start sending',
    detail: 'Your emails are authenticated and inbox-ready. Send with confidence, deliverability is handled.'
  }
]

const healthChecks = [
  { label: 'Domain verified', status: 'pass' },
  { label: 'DKIM + SPF + DMARC', status: 'pass' },
  { label: 'Sender reputation', status: 'pass' }
]
</script>

<template>
  <section class="guided-setup" aria-labelledby="guided-setup-title">
    <div class="setup-head">
      <v-chip color="primary" class="setup-badge">
        <span class="text-overline">Inbox Delivery</span>
      </v-chip>
      <h2 id="guided-setup-title">Land in the Inbox Without Becoming a Deliverability Expert</h2>
      <p>Three steps. No jargon. BlueFox Email handles the technical details so your emails actually reach people.</p>
    </div>

    <div class="setup-grid">
      <!-- Stepper -->
      <div class="stepper">
        <div v-for="(step, i) in steps" :key="step.number" class="step">
          <div class="step-indicator">
            <div class="step-circle">{{ step.number }}</div>
            <div v-if="i < steps.length - 1" class="step-line" aria-hidden="true" />
          </div>
          <div class="step-content">
            <strong class="step-title">{{ step.title }}</strong>
            <p class="step-detail">{{ step.detail }}</p>
          </div>
        </div>
      </div>

      <!-- Health card -->
      <div class="health-card">
        <div class="health-top">
          <span class="health-status">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            Healthy
          </span>
          <span class="health-label">Sending Status</span>
        </div>
        <div class="health-checks">
          <div v-for="check in healthChecks" :key="check.label" class="health-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            <span>{{ check.label }}</span>
          </div>
        </div>
        <div class="health-footer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Infrastructure managed by BlueFox Email</span>
        </div>
      </div>
    </div>

    <div class="setup-callout" role="note">
      <strong>Plain-English alerts if anything needs attention.</strong>
      <span> If a DNS record expires or your bounce rate creeps up, BlueFox Email tells you exactly what to do, no deliverability expertise required.</span>
    </div>
  </section>
</template>

<style scoped>
.guided-setup {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 36px 24px;
  background: #ffffff;
}

html.dark .guided-setup {
  background: rgba(15, 23, 42, 0.72);
  border-color: #334155;
}

.setup-head { margin-bottom: 24px; }

.setup-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.setup-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.setup-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .setup-head p { color: #94a3b8; }

.setup-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
  margin-bottom: 20px;
}

/* Stepper */
.stepper {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.step {
  display: flex;
  gap: 16px;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #13b0ee;
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-line {
  width: 2px;
  flex: 1;
  min-height: 24px;
  background: #cbd5e1;
}

html.dark .step-line { background: #475569; }

.step-content {
  padding-bottom: 24px;
}

.step-title {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
  line-height: 36px;
}

html.dark .step-title { color: #f1f5f9; }

.step-detail {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #475569;
}

html.dark .step-detail { color: #94a3b8; }

/* Health card */
.health-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.07);
}

html.dark .health-card {
  background: rgba(30, 41, 59, 0.95);
  box-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.25);
}

.health-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.health-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(16, 185, 129, 0.1);
  color: #047857;
  font-size: 13px;
  font-weight: 700;
  border-radius: 999px;
  padding: 6px 14px;
}

html.dark .health-status {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

.health-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
}

html.dark .health-label { color: #94a3b8; }

.health-checks {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.health-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.health-row svg { color: #10b981; flex-shrink: 0; }

html.dark .health-row { color: #f1f5f9; }

.health-footer {
  border-top: 1px solid #f1f5f9;
  padding-top: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}

html.dark .health-footer {
  border-top-color: #1e293b;
  color: #94a3b8;
}

.setup-callout {
  background: #f8fafc;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

html.dark .setup-callout {
  background: rgba(30, 41, 59, 0.6);
  color: #94a3b8;
}

.setup-callout strong { color: #0f172a; }
html.dark .setup-callout strong { color: #f1f5f9; }

@media (max-width: 860px) {
  .guided-setup { padding: 24px 16px; }
  .setup-grid { grid-template-columns: 1fr; }
}
</style>
