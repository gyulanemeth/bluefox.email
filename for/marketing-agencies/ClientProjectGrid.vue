<script setup>
const agencyMembers = [
  { name: 'Sarah', initial: 'S', color: '#13b0ee', role: 'Admin', projects: ['Apex Digital', 'Greenway Co.', 'Nova Commerce'] },
  { name: 'Tom', initial: 'T', color: '#6366f1', role: 'Editor', projects: ['Apex Digital', 'Nova Commerce'] }
]

const clientMembers = [
  { name: 'Lisa (Apex)', initial: 'L', color: '#f59e0b', role: 'Viewer', projects: ['Apex Digital'] },
  { name: 'Mark (Greenway)', initial: 'M', color: '#10b981', role: 'Viewer', projects: ['Greenway Co.'] }
]

const projects = [
  { name: 'Apex Digital', initial: 'A', color: '#13b0ee' },
  { name: 'Greenway Co.', initial: 'G', color: '#10b981' },
  { name: 'Nova Commerce', initial: 'N', color: '#f59e0b' }
]
</script>

<template>
  <section class="access-section" aria-labelledby="access-title">
    <div class="access-head">
      <v-chip color="primary" class="access-badge" aria-label="Multi-client badge">
        <span class="text-overline">Multi-Client Access</span>
      </v-chip>
      <h2 id="access-title">Your Team Across Every Client. Each Client in Their Own Space.</h2>
      <p>Agency team members work across multiple client projects. Clients only see their own. Roles keep permissions clean.</p>
    </div>

    <div class="access-diagram">
      <!-- Agency side -->
      <div class="diagram-col">
        <p class="col-label">Agency Team</p>
        <div class="member-list">
          <div v-for="member in agencyMembers" :key="member.name" class="member-row">
            <div class="member-avatar" :style="{ background: member.color }">{{ member.initial }}</div>
            <div class="member-info">
              <strong>{{ member.name }}</strong>
              <span class="member-role" :class="`role--${member.role.toLowerCase()}`">{{ member.role }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects center -->
      <div class="diagram-col diagram-col--projects">
        <p class="col-label">Client Projects</p>
        <div class="project-list">
          <div v-for="project in projects" :key="project.name" class="project-node">
            <div class="project-avatar" :style="{ background: project.color }">{{ project.initial }}</div>
            <span class="project-name">{{ project.name }}</span>
          </div>
        </div>
      </div>

      <!-- Client side -->
      <div class="diagram-col">
        <p class="col-label">Client Access</p>
        <div class="member-list">
          <div v-for="member in clientMembers" :key="member.name" class="member-row">
            <div class="member-avatar" :style="{ background: member.color }">{{ member.initial }}</div>
            <div class="member-info">
              <strong>{{ member.name }}</strong>
              <span class="member-role role--viewer">{{ member.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="access-legend">
      <span class="legend-item"><span class="legend-dot" style="background: #13b0ee" /> Admin: full access to all projects</span>
      <span class="legend-item"><span class="legend-dot" style="background: #6366f1" /> Editor: create and send campaigns</span>
      <span class="legend-item"><span class="legend-dot" style="background: #f59e0b" /> Viewer: read-only, own project only</span>
    </div>

    <div class="access-callout" role="note">
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
.access-section {
  padding: 36px 24px;
}

.access-head {
  margin-bottom: 28px;
}

.access-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.access-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.access-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .access-head p { color: #94a3b8; }

/* Diagram */
.access-diagram {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.diagram-col {
  background: #f8fafc;
  border-radius: 14px;
  padding: 20px;
}

html.dark .diagram-col { background: rgba(30, 41, 59, 0.5); }

.diagram-col--projects {
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06);
}

html.dark .diagram-col--projects {
  background: rgba(30, 41, 59, 0.9);
  box-shadow: 0 1px 3px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.2);
}

.col-label {
  margin: 0 0 14px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}

html.dark .col-label { color: #94a3b8; }

.member-list, .project-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.member-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.member-avatar, .project-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.member-info {
  min-width: 0;
}

.member-info strong {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
}

html.dark .member-info strong { color: #f1f5f9; }

.member-role {
  font-size: 11px;
  font-weight: 600;
  border-radius: 999px;
  padding: 1px 8px;
}

.role--admin {
  background: rgba(19, 176, 238, 0.1);
  color: #0369a1;
}

.role--editor {
  background: rgba(99, 102, 241, 0.1);
  color: #4338ca;
}

.role--viewer {
  background: rgba(245, 158, 11, 0.1);
  color: #b45309;
}

html.dark .role--admin { background: rgba(19, 176, 238, 0.15); color: #67e8f9; }
html.dark .role--editor { background: rgba(99, 102, 241, 0.15); color: #a5b4fc; }
html.dark .role--viewer { background: rgba(245, 158, 11, 0.15); color: #fcd34d; }

.project-node {
  display: flex;
  align-items: center;
  gap: 10px;
}

.project-name {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .project-name { color: #f1f5f9; }

/* Legend */
.access-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 0 4px;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #475569;
}

html.dark .legend-item { color: #94a3b8; }

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Callout */
.access-callout {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 14px 18px;
}

html.dark .access-callout { background: rgba(30, 41, 59, 0.6); }

.callout-icon {
  flex-shrink: 0;
  margin-top: 1px;
  color: #64748b;
}

html.dark .callout-icon { color: #94a3b8; }

.callout-text {
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

html.dark .callout-text { color: #94a3b8; }

.callout-text strong { color: #0f172a; }
html.dark .callout-text strong { color: #f1f5f9; }

@media (max-width: 860px) {
  .access-section { padding: 24px 16px; }
  .access-diagram { grid-template-columns: 1fr; }
}
</style>
