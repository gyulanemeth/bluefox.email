<script setup>
const clients = [
  {
    name: 'Apex Digital',
    industry: 'E-commerce',
    initial: 'A',
    color: '#13b0ee',
    checks: ['Gmail', 'Outlook', 'Apple Mail']
  },
  {
    name: 'Greenway Co.',
    industry: 'SaaS',
    initial: 'G',
    color: '#10b981',
    checks: ['Gmail', 'Outlook', 'Yahoo']
  },
  {
    name: 'Nova Commerce',
    industry: 'Retail',
    initial: 'N',
    color: '#f59e0b',
    checks: ['Gmail', 'Apple Mail', 'Samsung']
  }
]

const steps = [
  {
    number: '01',
    title: 'Build',
    detail: 'Use the client\'s design system components to assemble the campaign.'
  },
  {
    number: '02',
    title: 'Preview',
    detail: 'Automatic rendering verification across 8+ major email clients.'
  },
  {
    number: '03',
    title: 'Ship',
    detail: 'Send with confidence, no manual cross-client testing needed.'
  }
]
</script>

<template>
  <section class="rendering-qa" aria-labelledby="rendering-qa-title">
    <div class="qa-head">
      <v-chip color="primary" class="qa-badge">
        <span class="text-overline">Rendering QA</span>
      </v-chip>
      <h2 id="rendering-qa-title">Ship Client Campaigns Without Rendering Fire Drills</h2>
      <p>Every client's email renders perfectly across all major inboxes. No more billable hours lost to cross-client QA and last-minute Outlook fixes.</p>
    </div>

    <div class="brand-cards" role="list">
      <article v-for="client in clients" :key="client.name" class="brand-card" role="listitem">
        <div class="brand-header">
          <div class="brand-avatar" :style="{ background: client.color }">{{ client.initial }}</div>
          <div class="brand-info">
            <strong class="brand-name">{{ client.name }}</strong>
            <span class="brand-industry">{{ client.industry }}</span>
          </div>
        </div>
        <div class="brand-status">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          <span>All clients pass</span>
        </div>
        <div class="brand-checks">
          <span v-for="c in client.checks" :key="c" class="inbox-check">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            {{ c }}
          </span>
        </div>
      </article>
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
      <span> Agencies typically spend 2-4 hours per campaign on rendering QA. BlueFox's battle-tested markup eliminates that work entirely across every client account.</span>
    </div>
  </section>
</template>

<style scoped>
.rendering-qa {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 36px 24px;
  background: #ffffff;
}

html.dark .rendering-qa {
  background: rgba(15, 23, 42, 0.72);
  border-color: #334155;
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

/* Brand cards */
.brand-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}

.brand-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 14px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.brand-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.06), 0 14px 36px rgba(0,0,0,0.1);
}

html.dark .brand-card {
  background: rgba(30, 41, 59, 0.95);
  box-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 4px 14px rgba(0,0,0,0.25);
}

html.dark .brand-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.25), 0 14px 36px rgba(0,0,0,0.3);
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brand-info { min-width: 0; }

.brand-name {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
}

html.dark .brand-name { color: #f1f5f9; }

.brand-industry {
  font-size: 11px;
  color: #94a3b8;
}

.brand-status {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #047857;
  font-size: 13px;
  font-weight: 600;
}

html.dark .brand-status { color: #34d399; }

.brand-checks {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.inbox-check {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 600;
  color: #475569;
  background: rgba(15, 23, 42, 0.04);
  border-radius: 999px;
  padding: 3px 8px;
}

.inbox-check svg { color: #10b981; }

html.dark .inbox-check {
  color: #cbd5e1;
  background: rgba(248, 250, 252, 0.06);
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

@media (prefers-reduced-motion: reduce) {
  .brand-card { transition: none; }
}

@media (max-width: 860px) {
  .rendering-qa { padding: 24px 16px; }
  .brand-cards { grid-template-columns: 1fr; }
  .timeline-steps { grid-template-columns: 1fr; gap: 16px; }
  .node-connector { display: none; }
}
</style>
