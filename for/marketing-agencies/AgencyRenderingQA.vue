<script setup>
const steps = [
  {
    number: '01',
    title: 'Build',
    detail: 'Use the client\'s design system components to assemble the campaign.'
  },
  {
    number: '02',
    title: 'Preview',
    detail: 'Review how the campaign looks before it leaves your hands. BlueFox Email generates markup engineered to render consistently across major clients.'
  },
  {
    number: '03',
    title: 'Ship',
    detail: 'Send with confidence. No manual cross-client testing needed.'
  }
]

const emailClients = ['Gmail', 'Outlook', 'Apple Mail', 'Yahoo', 'Samsung Mail']
</script>

<template>
  <section class="rendering-qa" aria-labelledby="rendering-qa-title">
    <div class="qa-head">
      <v-chip color="primary" class="qa-badge">
        <span class="text-overline">Rendering QA</span>
      </v-chip>
      <h2 id="rendering-qa-title">Ship Campaigns Without Rendering Headaches</h2>
      <p>BlueFox Email generates HTML templates engineered to render as consistently as possible across major email clients. Less time on layout fixes, more time on strategy.</p>
    </div>

    <div class="client-pills" aria-label="Supported email clients">
      <span v-for="client in emailClients" :key="client" class="client-pill">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
        {{ client }}
      </span>
    </div>

    <div class="workflow-timeline">
      <p class="timeline-label">QA Workflow</p>
      <div class="timeline-steps">
        <div v-for="(step, i) in steps" :key="step.number" class="timeline-node">
          <div class="node-circle">{{ step.number }}</div>
          <strong class="node-title">{{ step.title }}</strong>
          <p class="node-detail">{{ step.detail }}</p>
          <div v-if="i < steps.length - 1" class="node-connector" aria-hidden="true" />
        </div>
      </div>
    </div>

    <div class="qa-callout" role="note">
      <strong>Hours saved per campaign.</strong>
      <span> Agencies typically spend 2–4 hours per campaign on rendering QA. BlueFox Email's battle-tested markup eliminates that work entirely across every client account.</span>
    </div>
  </section>
</template>

<style scoped>
.rendering-qa {
  padding: 36px 24px;
}

.qa-head { margin-bottom: 24px; }

.qa-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.qa-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.qa-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .qa-head p { color: #94a3b8; }

/* Client pills */
.client-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.client-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  background: rgba(16, 185, 129, 0.08);
  border-radius: 999px;
  padding: 6px 14px;
}

.client-pill svg { color: #10b981; }

html.dark .client-pill {
  color: #cbd5e1;
  background: rgba(16, 185, 129, 0.12);
}

/* Timeline */
.workflow-timeline {
  background: #f8fafc;
  border-radius: 14px;
  padding: 22px;
  margin-bottom: 20px;
}

html.dark .workflow-timeline { background: rgba(30, 41, 59, 0.6); }

.timeline-label {
  margin: 0 0 16px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}

html.dark .timeline-label { color: #94a3b8; }

.timeline-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  position: relative;
}

.timeline-node {
  position: relative;
  text-align: center;
  padding: 0 12px;
}

.node-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #13b0ee;
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  position: relative;
  z-index: 1;
}

.node-title {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

html.dark .node-title { color: #f1f5f9; }

.node-detail {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: #475569;
}

html.dark .node-detail { color: #94a3b8; }

.node-connector {
  position: absolute;
  top: 18px;
  left: calc(50% + 18px);
  right: calc(-50% + 18px);
  height: 2px;
  background: #cbd5e1;
}

html.dark .node-connector { background: #475569; }

.qa-callout {
  background: #f8fafc;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

html.dark .qa-callout {
  background: rgba(30, 41, 59, 0.6);
  color: #94a3b8;
}

.qa-callout strong { color: #0f172a; }
html.dark .qa-callout strong { color: #f1f5f9; }

@media (max-width: 860px) {
  .rendering-qa { padding: 24px 16px; }
  .timeline-steps { grid-template-columns: 1fr; gap: 16px; }
  .node-connector { display: none; }
}
</style>
