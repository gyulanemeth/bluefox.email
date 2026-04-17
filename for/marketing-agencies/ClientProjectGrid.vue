<script setup>
import alexPhoto from './alex-suprun-ZHvM3XIOHoE-unsplash.jpg'
import chrisPhoto from './christopher-campbell-rDEOVtE7vOs-unsplash.jpg'
import michaelPhoto from './michael-dam-mEZ3PoFGs_k-unsplash.jpg'
import samPhoto from './vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg'
import nguyenPhoto from './nguyen.png'
import siriPhoto from './siri.png'

const admins = [
  { name: 'Alex', photo: alexPhoto },
  { name: 'Michael', photo: michaelPhoto }
]

const columns = [
  {
    id: 'apex',
    name: 'Apex Digital',
    initial: 'A',
    color: '#13b0ee',
    clients: [
      { name: 'Chris', access: 'Editor', accessClass: 'access--editor', photo: chrisPhoto },
      { name: 'Sam', access: 'Viewer', accessClass: 'access--viewer', photo: samPhoto }
    ]
  },
  {
    id: 'greenway',
    name: 'Greenway Co.',
    initial: 'G',
    color: '#10b981',
    clients: [
      { name: 'Siri', access: 'Viewer', accessClass: 'access--viewer', photo: siriPhoto }
    ]
  },
  {
    id: 'nova',
    name: 'Nova Commerce',
    initial: 'N',
    color: '#f59e0b',
    clients: [
      { name: 'Nguyen', access: 'Editor', accessClass: 'access--editor', photo: nguyenPhoto }
    ]
  }
]
</script>

<template>
  <section class="access-section" aria-labelledby="access-title">
    <div class="access-head">
      <v-chip color="primary" class="access-badge" aria-label="Isolation badge">
        <span class="text-overline">Isolated client workspaces</span>
      </v-chip>
      <h2 id="access-title">Every client in their own project. Admins see everything.</h2>
      <p>Admins stay across every account. Each client only sees their own project, as an Editor or Viewer. Contacts, templates, automations, analytics, scoped per project.</p>
    </div>

    <div class="tree">
      <!-- Admin card (multiple admins supported) -->
      <div class="admin-card" role="group" aria-label="Account admins">
        <div class="admin-list">
          <div v-for="admin in admins" :key="admin.name" class="admin-person">
            <img :src="admin.photo" :alt="admin.name" class="admin-avatar" />
            <div class="admin-meta">
              <strong>{{ admin.name }}</strong>
              <span class="role-pill role--admin">Admin</span>
            </div>
          </div>
        </div>
        <span class="admin-note">Full access to every project.</span>
      </div>

      <!-- Admin → 3 projects fan -->
      <div class="fan" aria-hidden="true">
        <span class="fan-stem" />
        <span class="fan-bar" />
        <span class="fan-tick fan-tick--0" />
        <span class="fan-tick fan-tick--1" />
        <span class="fan-tick fan-tick--2" />
      </div>

      <!-- Project row -->
      <div class="project-row">
        <div
          v-for="col in columns"
          :key="col.id"
          class="project-col"
        >
          <div class="project-card" :style="{ '--project-color': col.color }">
            <div class="project-avatar" :style="{ background: col.color }">{{ col.initial }}</div>
            <span class="project-name">{{ col.name }}</span>
          </div>

          <span class="v-line" :style="{ '--line-color': col.color }" aria-hidden="true" />

          <div class="clients-stack">
            <div
              v-for="client in col.clients"
              :key="client.name"
              class="client-card"
              :style="{ '--project-color': col.color }"
            >
              <img
                v-if="client.photo"
                :src="client.photo"
                :alt="client.name"
                class="client-avatar"
              />
              <div
                v-else
                class="client-avatar client-avatar--initial"
                :style="{ background: client.initialColor }"
                aria-hidden="true"
              >{{ client.initial }}</div>
              <div class="client-meta">
                <strong>{{ client.name }}</strong>
                <div class="client-pills">
                  <span class="role-pill role--client">Client</span>
                  <span class="role-pill" :class="client.accessClass">{{ client.access }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="access-callout" role="note">
      <div class="callout-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <div class="callout-text">
        <strong>Zero cross-client data bleed.</strong>
        <span> Add as many clients as you need per project. Editor access lets them act, Viewer access keeps them read-only.</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.access-section { padding: 36px 24px; }

.access-head { margin-bottom: 28px; }

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

/* Tree */
.tree {
  max-width: 840px;
  margin: 0 auto 24px;
}

/* Admin card */
.admin-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(90deg, rgba(19, 176, 238, 0.1), rgba(99, 102, 241, 0.1));
  border: 1px solid rgba(19, 176, 238, 0.25);
  border-radius: 14px;
  padding: 14px 20px;
  max-width: 620px;
  margin: 0 auto;
  flex-wrap: wrap;
}

html.dark .admin-card {
  background: linear-gradient(90deg, rgba(19, 176, 238, 0.14), rgba(99, 102, 241, 0.14));
  border-color: rgba(103, 232, 249, 0.25);
}

.admin-list {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.admin-person {
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px #ffffff, 0 2px 6px rgba(15, 23, 42, 0.12);
}

html.dark .admin-avatar {
  box-shadow: 0 0 0 2px rgba(30, 41, 59, 0.95), 0 2px 6px rgba(0, 0, 0, 0.4);
}

.admin-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.admin-meta strong {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
}

html.dark .admin-meta strong { color: #f1f5f9; }

.admin-note {
  margin-left: auto;
  font-size: 13px;
  color: #475569;
  line-height: 1.5;
  text-align: right;
}

html.dark .admin-note { color: #94a3b8; }

/* Fan connector (admin → 3 projects) */
.fan {
  position: relative;
  height: 56px;
  margin: 0 auto;
  max-width: 840px;
}

.fan-stem {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 24px;
  background: rgba(19, 176, 238, 0.5);
  border-radius: 2px;
  transform: translateX(-50%);
}

.fan-bar {
  position: absolute;
  top: 24px;
  left: 16.67%;
  right: 16.67%;
  height: 2px;
  background: rgba(19, 176, 238, 0.5);
  border-radius: 2px;
}

.fan-tick {
  position: absolute;
  top: 24px;
  width: 2px;
  height: 32px;
  background: rgba(19, 176, 238, 0.5);
  border-radius: 2px;
}

.fan-tick--0 { left: 16.67%; transform: translateX(-50%); }
.fan-tick--1 { left: 50%; transform: translateX(-50%); }
.fan-tick--2 { left: 83.33%; transform: translateX(-50%); }

.fan-tick::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(19, 176, 238, 0.6);
  transform: translateX(-50%);
}

/* Project row */
.project-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 20px;
  align-items: start;
}

.project-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.project-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  width: 100%;
  max-width: 220px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05), 0 4px 12px rgba(15, 23, 42, 0.04);
}

html.dark .project-card {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(148, 163, 184, 0.15);
}

.project-avatar {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.15);
}

.project-name {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .project-name { color: #f1f5f9; }

/* Vertical line project → clients */
.v-line {
  position: relative;
  width: 2px;
  height: 40px;
  background: var(--line-color);
  opacity: 0.5;
  margin: 6px 0;
  border-radius: 2px;
}

.v-line::before,
.v-line::after {
  content: '';
  position: absolute;
  left: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--line-color);
  transform: translateX(-50%);
}

.v-line::before { top: -3px; }
.v-line::after { bottom: -3px; }

/* Clients stack */
.clients-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 220px;
  align-items: center;
}

.client-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  width: 100%;
}

html.dark .client-card {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(148, 163, 184, 0.15);
}

.client-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px #ffffff, 0 1px 3px rgba(15, 23, 42, 0.12);
}

html.dark .client-avatar {
  box-shadow: 0 0 0 2px rgba(30, 41, 59, 0.95), 0 1px 3px rgba(0, 0, 0, 0.4);
}

.client-avatar--initial {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.client-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.client-meta strong {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
}

html.dark .client-meta strong { color: #f1f5f9; }

.client-pills {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

/* Role pills */
.role-pill {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  border-radius: 999px;
  padding: 2px 7px;
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.role--admin { background: rgba(19, 176, 238, 0.12); color: #0369a1; }
.role--client { background: rgba(148, 163, 184, 0.18); color: #475569; }
.access--editor { background: rgba(16, 185, 129, 0.12); color: #047857; }
.access--viewer { background: rgba(245, 158, 11, 0.12); color: #b45309; }

html.dark .role--admin { background: rgba(19, 176, 238, 0.18); color: #67e8f9; }
html.dark .role--client { background: rgba(148, 163, 184, 0.22); color: #cbd5e1; }
html.dark .access--editor { background: rgba(16, 185, 129, 0.18); color: #6ee7b7; }
html.dark .access--viewer { background: rgba(245, 158, 11, 0.18); color: #fcd34d; }

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

@media (max-width: 720px) {
  .access-section { padding: 24px 16px; }

  .admin-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 16px;
  }

  .admin-note {
    margin-left: 0;
    text-align: left;
  }

  .fan { display: none; }

  .project-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .project-col {
    padding: 14px;
    background: #f8fafc;
    border-radius: 12px;
    gap: 0;
  }

  html.dark .project-col { background: rgba(30, 41, 59, 0.5); }

  .v-line { height: 24px; }

  .project-card,
  .clients-stack { max-width: none; }
}
</style>
