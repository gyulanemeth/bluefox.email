<script setup>
const clients = [
  {
    name: 'Apex Digital',
    industry: 'E-commerce',
    accentColor: '#13b0ee',
    initial: 'A',
    lastCampaign: '2 days ago',
    templates: 14,
    lists: 3,
    status: 'active',
    statusLabel: 'Campaign live'
  },
  {
    name: 'Greenway Co.',
    industry: 'SaaS',
    accentColor: '#10b981',
    initial: 'G',
    lastCampaign: '6 days ago',
    templates: 9,
    lists: 2,
    status: 'scheduled',
    statusLabel: 'Send scheduled'
  },
  {
    name: 'Nova Commerce',
    industry: 'Retail',
    accentColor: '#f59e0b',
    initial: 'N',
    lastCampaign: 'Yesterday',
    templates: 17,
    lists: 5,
    status: 'active',
    statusLabel: 'Automation running'
  },
  {
    name: 'Drift Studio',
    industry: 'Agency',
    accentColor: '#8b5cf6',
    initial: 'D',
    lastCampaign: null,
    templates: 4,
    lists: 1,
    status: 'setup',
    statusLabel: 'Onboarding'
  }
]
</script>

<template>
  <section class="client-grid-section" aria-labelledby="client-grid-title">
    <div class="grid-head">
      <v-chip color="primary" class="grid-badge" aria-label="Multi-client badge">
        <span class="text-overline">Multi-Client Management</span>
      </v-chip>
      <h2 id="client-grid-title">Every Client in Its Own Isolated Workspace</h2>
      <p>Run multiple brands from a single BlueFox account. Each client project has completely separate contacts, templates, automations, and analytics — nothing bleeds across.</p>
    </div>

    <div class="client-cards" role="list">
      <article
        v-for="client in clients"
        :key="client.name"
        class="client-card"
        role="listitem"
      >
        <div class="card-header">
          <div class="client-avatar" :style="{ background: client.accentColor }">
            {{ client.initial }}
          </div>
          <div class="client-info">
            <strong class="client-name">{{ client.name }}</strong>
            <span class="client-industry">{{ client.industry }}</span>
          </div>
          <span class="status-tag" :class="`status-tag--${client.status}`">
            {{ client.statusLabel }}
          </span>
        </div>

        <div class="card-divider" />

        <div class="card-stats">
          <div class="stat">
            <span class="stat-value">{{ client.templates }}</span>
            <span class="stat-label">Templates</span>
          </div>
          <div class="stat-sep" aria-hidden="true" />
          <div class="stat">
            <span class="stat-value">{{ client.lists }}</span>
            <span class="stat-label">{{ client.lists === 1 ? 'List' : 'Lists' }}</span>
          </div>
          <div class="stat-sep" aria-hidden="true" />
          <div class="stat">
            <span class="stat-value">{{ client.lastCampaign ?? '—' }}</span>
            <span class="stat-label">Last send</span>
          </div>
        </div>
      </article>
    </div>

    <div class="isolation-callout" role="note">
      <div class="callout-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <div class="callout-text">
        <strong>Complete workspace isolation.</strong>
        <span> Contacts, lists, automations, templates, and analytics are all scoped per project. One account, zero cross-client data bleed.</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.client-grid-section {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 36px 24px;
  background: #ffffff;
}

html.dark .client-grid-section {
  background: rgba(15, 23, 42, 0.72);
  border-color: #334155;
}

.grid-head {
  margin-bottom: 28px;
}

.grid-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.grid-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.grid-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .grid-head p {
  color: #94a3b8;
}

.client-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

/* Card — elevation-only, zero visible border */
.client-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 16px rgba(0, 0, 0, 0.07);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.client-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 16px 48px rgba(0, 0, 0, 0.11);
}

html.dark .client-card {
  background: rgba(30, 41, 59, 0.95);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.2),
    0 4px 16px rgba(0, 0, 0, 0.25);
}

html.dark .client-card:hover {
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.25),
    0 16px 48px rgba(0, 0, 0, 0.35);
}

/* Header */
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.client-avatar {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: -0.02em;
}

.client-info {
  flex: 1;
  min-width: 0;
}

.client-name {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

html.dark .client-name {
  color: #f1f5f9;
}

.client-industry {
  display: block;
  font-size: 12px;
  color: #94a3b8;
  margin-top: 1px;
}

/* Status tag — readable text, no dot */
.status-tag {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  padding: 3px 8px;
  white-space: nowrap;
}

.status-tag--active {
  background: rgba(16, 185, 129, 0.1);
  color: #047857;
}

.status-tag--scheduled {
  background: rgba(19, 176, 238, 0.1);
  color: #0369a1;
}

.status-tag--setup {
  background: rgba(245, 158, 11, 0.1);
  color: #b45309;
}

html.dark .status-tag--active {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

html.dark .status-tag--scheduled {
  background: rgba(19, 176, 238, 0.15);
  color: #67e8f9;
}

html.dark .status-tag--setup {
  background: rgba(245, 158, 11, 0.15);
  color: #fcd34d;
}

/* Divider */
.card-divider {
  height: 1px;
  background: #f1f5f9;
  margin: 18px 0;
}

html.dark .card-divider {
  background: #1e293b;
}

/* Stats */
.card-stats {
  display: flex;
  align-items: center;
}

.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.stat-value {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
}

html.dark .stat-value {
  color: #f1f5f9;
}

.stat-label {
  font-size: 11px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.stat-sep {
  width: 1px;
  height: 26px;
  background: #f1f5f9;
  margin: 0 14px;
}

html.dark .stat-sep {
  background: #1e293b;
}

/* Callout */
.isolation-callout {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 14px 18px;
}

html.dark .isolation-callout {
  background: rgba(30, 41, 59, 0.6);
}

.callout-icon {
  flex-shrink: 0;
  margin-top: 1px;
  color: #64748b;
}

html.dark .callout-icon {
  color: #94a3b8;
}

.callout-text {
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

html.dark .callout-text {
  color: #94a3b8;
}

.callout-text strong {
  color: #0f172a;
}

html.dark .callout-text strong {
  color: #f1f5f9;
}

@media (prefers-reduced-motion: reduce) {
  .client-card { transition: none; }
}

@media (max-width: 860px) {
  .client-grid-section { padding: 24px 16px; }
  .client-cards { grid-template-columns: 1fr; }
}
</style>
