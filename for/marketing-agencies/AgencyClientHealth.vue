<script setup>
import { ref } from 'vue'

const showExplainer = ref(false)

const clients = [
  {
    name: 'Apex Digital',
    initial: 'A',
    color: '#13b0ee',
    grade: 'A+',
    gradeColor: '#047857',
    gradeBg: 'rgba(16, 185, 129, 0.1)',
    gradeBgDark: 'rgba(16, 185, 129, 0.15)',
    gradeColorDark: '#34d399',
    inboxRate: '96.1%',
    bounceRate: '0.4%',
    complaintRate: '0.01%',
    authPassed: true
  },
  {
    name: 'Greenway Co.',
    initial: 'G',
    color: '#10b981',
    grade: 'A',
    gradeColor: '#047857',
    gradeBg: 'rgba(16, 185, 129, 0.1)',
    gradeBgDark: 'rgba(16, 185, 129, 0.15)',
    gradeColorDark: '#34d399',
    inboxRate: '93.8%',
    bounceRate: '0.7%',
    complaintRate: '0.03%',
    authPassed: true
  },
  {
    name: 'Nova Commerce',
    initial: 'N',
    color: '#f59e0b',
    grade: 'A',
    gradeColor: '#047857',
    gradeBg: 'rgba(16, 185, 129, 0.1)',
    gradeBgDark: 'rgba(16, 185, 129, 0.15)',
    gradeColorDark: '#34d399',
    inboxRate: '91.2%',
    bounceRate: '1.1%',
    complaintRate: '0.04%',
    authPassed: true
  },
  {
    name: 'Drift Studio',
    initial: 'D',
    color: '#8b5cf6',
    grade: '—',
    gradeColor: '#b45309',
    gradeBg: 'rgba(245, 158, 11, 0.1)',
    gradeBgDark: 'rgba(245, 158, 11, 0.15)',
    gradeColorDark: '#fcd34d',
    inboxRate: '—',
    bounceRate: '—',
    complaintRate: '—',
    authPassed: false
  }
]
</script>

<template>
  <section class="client-health" aria-labelledby="client-health-title">
    <div class="health-head">
      <v-chip color="primary" class="health-badge">
        <span class="text-overline">Client Deliverability</span>
      </v-chip>
      <h2 id="client-health-title">Client inbox health at a glance</h2>
      <p>One client's list issues stay contained. Track every project's inbox health from a single view.</p>
    </div>

    <div class="scorecard-grid" role="list">
      <article v-for="client in clients" :key="client.name" class="scorecard" role="listitem">
        <div class="scorecard-top">
          <div class="sc-avatar" :style="{ background: client.color }">{{ client.initial }}</div>
          <strong class="sc-name">{{ client.name }}</strong>
          <span
            class="sc-grade light-only"
            :style="{ background: client.gradeBg, color: client.gradeColor }"
          >{{ client.grade }}</span>
          <span
            class="sc-grade dark-only"
            :style="{ background: client.gradeBgDark, color: client.gradeColorDark }"
          >{{ client.grade }}</span>
        </div>

        <div class="sc-metrics">
          <div class="sc-metric">
            <span class="sc-metric-label">Inbox</span>
            <span class="sc-metric-value">{{ client.inboxRate }}</span>
          </div>
          <div class="sc-metric">
            <span class="sc-metric-label">Bounce</span>
            <span class="sc-metric-value">{{ client.bounceRate }}</span>
          </div>
          <div class="sc-metric">
            <span class="sc-metric-label">Complaints</span>
            <span class="sc-metric-value">{{ client.complaintRate }}</span>
          </div>
        </div>

        <div class="sc-auth" :class="{ 'sc-auth--pending': !client.authPassed }">
          <svg v-if="client.authPassed" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          <span v-if="client.authPassed">DKIM + SPF + DMARC</span>
          <span v-else>Setup pending</span>
        </div>
      </article>
    </div>

    <div class="explainer-toggle">
      <button type="button" class="explainer-btn" @click="showExplainer = !showExplainer">
        <span>How does client isolation protect reputation?</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          :style="{ transform: showExplainer ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div v-if="showExplainer" class="explainer-body">
        <ul class="explainer-list">
          <li>DKIM, SPF, and DMARC are configured per project, preventing cross-client authentication conflicts.</li>
          <li>A bounce spike on one client's campaign has zero effect on any other client's inbox placement.</li>
        </ul>
      </div>
    </div>

    <div class="health-callout" role="note">
      <strong>Evidence-based retainer conversations.</strong>
      <span> Share per-client health reports to demonstrate deliverability management as a value-add, not just a checkbox.</span>
    </div>
  </section>
</template>

<style scoped>
.client-health {
  padding: 36px 24px;
}

.health-head { margin-bottom: 24px; }

.health-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.health-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.health-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .health-head p { color: #94a3b8; }

/* Scorecard grid */
.scorecard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 20px;
}

.scorecard {
  background: #ffffff;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 14px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

html.dark .scorecard {
  background: rgba(30, 41, 59, 0.95);
  box-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 4px 14px rgba(0,0,0,0.25);
}

.scorecard-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sc-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sc-name {
  flex: 1;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  min-width: 0;
}

html.dark .sc-name { color: #f1f5f9; }

.sc-grade {
  font-size: 13px;
  font-weight: 800;
  border-radius: 8px;
  padding: 4px 10px;
  flex-shrink: 0;
}

.light-only { display: inline-flex; }
.dark-only { display: none; }
html.dark .light-only { display: none; }
html.dark .dark-only { display: inline-flex; }

.sc-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.sc-metric {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sc-metric-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
}

html.dark .sc-metric-label { color: #94a3b8; }

.sc-metric-value {
  font-size: 15px;
  font-weight: 800;
  color: #0f172a;
  font-variant-numeric: tabular-nums;
}

html.dark .sc-metric-value { color: #f1f5f9; }

.sc-auth {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: #047857;
}

html.dark .sc-auth { color: #34d399; }

.sc-auth--pending {
  color: #b45309;
}

html.dark .sc-auth--pending { color: #fcd34d; }

/* Explainer */
.explainer-toggle {
  margin-bottom: 16px;
}

.explainer-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #f8fafc;
  border: none;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  text-align: left;
}

html.dark .explainer-btn {
  background: rgba(30, 41, 59, 0.6);
  color: #e2e8f0;
}

.explainer-body {
  background: #f8fafc;
  border-radius: 0 0 10px 10px;
  padding: 0 16px 14px;
  margin-top: -4px;
}

html.dark .explainer-body { background: rgba(30, 41, 59, 0.6); }

.explainer-list {
  margin: 0;
  padding: 0 0 0 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.explainer-list li {
  font-size: 13px;
  line-height: 1.6;
  color: #475569;
}

html.dark .explainer-list li { color: #94a3b8; }

.health-callout {
  background: #f8fafc;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

html.dark .health-callout {
  background: rgba(30, 41, 59, 0.6);
  color: #94a3b8;
}

.health-callout strong { color: #0f172a; }
html.dark .health-callout strong { color: #f1f5f9; }

@media (max-width: 860px) {
  .client-health { padding: 24px 16px; }
  .scorecard-grid { grid-template-columns: 1fr; }
}
</style>
