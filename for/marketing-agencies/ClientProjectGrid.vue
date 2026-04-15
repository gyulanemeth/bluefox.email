<script setup>
import alexPhoto from './alex-suprun-ZHvM3XIOHoE-unsplash.jpg'
import chrisPhoto from './christopher-campbell-rDEOVtE7vOs-unsplash.jpg'
import michaelPhoto from './michael-dam-mEZ3PoFGs_k-unsplash.jpg'
import vickyPhoto from './vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg'
import jakePhoto from './jake-nackos-IF9TK5Uy-KI-unsplash.jpg'

const admin = {
  name: 'Vicky',
  role: 'Admin',
  photo: vickyPhoto
}

const members = [
  { name: 'Alex', role: 'User', photo: alexPhoto },
  { name: 'Jake', role: 'User', photo: jakePhoto }
]

const clientAccess = [
  { project: 'Apex Digital', name: 'Chris', level: 'Editor', photo: chrisPhoto },
  { project: 'Greenway Co.', name: 'Michael', level: 'Viewer', photo: michaelPhoto }
]
</script>

<template>
  <section class="role-demo" aria-labelledby="role-demo-title">
    <div class="role-demo__head">
      <v-chip color="primary" class="role-demo__badge" aria-label="Account role model">
        <span class="text-overline">Account users</span>
      </v-chip>
      <h2 id="role-demo-title">How admin, user, and client access works</h2>
      <p>Admin manages account settings and permissions. Users work across projects. Clients access only their assigned project as editor or viewer.</p>
    </div>

    <div class="role-demo__grid">
      <article class="role-card" aria-label="Admin role">
        <h3>Admin</h3>
        <div class="person-row">
          <img :src="admin.photo" :alt="admin.name" class="avatar" />
          <div class="person-meta">
            <strong>{{ admin.name }}</strong>
            <span class="pill pill--admin">{{ admin.role }}</span>
          </div>
        </div>
        <p>Full control over account settings, users, projects, and client access.</p>
      </article>

      <article class="role-card" aria-label="User role">
        <h3>User</h3>
        <div class="list-stack">
          <div v-for="member in members" :key="member.name" class="person-row">
            <img :src="member.photo" :alt="member.name" class="avatar" />
            <div class="person-meta">
              <strong>{{ member.name }}</strong>
              <span class="pill pill--user">{{ member.role }}</span>
            </div>
          </div>
        </div>
        <p>Works in projects and themes with limited account-level permissions.</p>
      </article>

      <article class="role-card" aria-label="Client access role">
        <h3>Client access</h3>
        <div class="list-stack">
          <div v-for="client in clientAccess" :key="`${client.project}-${client.name}`" class="client-row">
            <img :src="client.photo" :alt="client.name" class="avatar" />
            <div class="person-meta">
              <strong>{{ client.name }}</strong>
              <span class="pill" :class="client.level === 'Editor' ? 'pill--editor' : 'pill--viewer'">
                Client · {{ client.level }}
              </span>
              <span class="project-tag">{{ client.project }}</span>
            </div>
          </div>
        </div>
        <p>Client sees only assigned project. Editor can manage, viewer is read-only.</p>
      </article>
    </div>
  </section>
</template>

<style>
.role-demo {
  padding: 36px 24px;
}

.role-demo__head {
  margin-bottom: 20px;
}

.role-demo__badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 12px;
}

.role-demo__head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.role-demo__head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #475569;
  max-width: 780px;
}

html.dark .role-demo__head p {
  color: #94a3b8;
}

.role-demo__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 12px;
}

.role-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px;
}

html.dark .role-card {
  background: rgba(30, 41, 59, 0.8);
  border-color: #334155;
}

.role-card h3 {
  margin: 0 0 10px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.role-card p {
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.55;
  color: #475569;
}

html.dark .role-card p {
  color: #94a3b8;
}

.list-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.person-row,
.client-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.12);
}

html.dark .avatar {
  border-color: rgba(30, 41, 59, 0.95);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.person-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.person-meta strong {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
}

html.dark .person-meta strong {
  color: #f1f5f9;
}

.pill {
  display: inline-block;
  width: fit-content;
  font-size: 11px;
  font-weight: 600;
  border-radius: 999px;
  padding: 1px 8px;
  white-space: nowrap;
}

.pill--admin { background: rgba(19, 176, 238, 0.1); color: #0369a1; }
.pill--user { background: rgba(99, 102, 241, 0.1); color: #4338ca; }
.pill--editor { background: rgba(16, 185, 129, 0.1); color: #047857; }
.pill--viewer { background: rgba(245, 158, 11, 0.1); color: #b45309; }

html.dark .pill--admin { background: rgba(19, 176, 238, 0.15); color: #67e8f9; }
html.dark .pill--user { background: rgba(99, 102, 241, 0.15); color: #a5b4fc; }
html.dark .pill--editor { background: rgba(16, 185, 129, 0.15); color: #6ee7b7; }
html.dark .pill--viewer { background: rgba(245, 158, 11, 0.15); color: #fcd34d; }

.project-tag {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
}

html.dark .project-tag {
  color: #94a3b8;
}

@media (max-width: 980px) {
  .role-demo__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  .role-demo {
    padding: 24px 16px;
  }
}
</style>
