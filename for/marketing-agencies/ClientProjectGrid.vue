<script setup>
const adminSees = [
  'Every client project',
  'Full account and billing settings',
  'Can add or remove client access anytime'
]

const clientSees = [
  'Only their own project',
  'Editor or Viewer access, your choice',
  'As many clients as you need per project, none of them see each other'
]
</script>

<template>
  <section class="access-section" aria-labelledby="access-title">
    <div class="access-head">
      <h2 id="access-title">Admins see everything. Each client sees their own project.</h2>
      <p>Contacts, templates, automations, and analytics are scoped per project, so one client's account never touches another's.</p>
    </div>

    <div class="access-columns">
      <div class="access-col">
        <span class="access-col-label">Admins see</span>
        <ul>
          <li v-for="item in adminSees" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div class="access-col">
        <span class="access-col-label">Clients see</span>
        <ul>
          <li v-for="item in clientSees" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.access-section { padding: 36px 24px; }

.access-head {
  max-width: 720px;
  margin: 0 auto 28px;
  text-align: center;
}

.access-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.access-head p {
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
}

html.dark .access-head p { color: #94a3b8; }

/* Columns */
.access-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.access-col {
  background: #eef8fd;
  border-radius: 4px;
  padding: 36px 24px;
  text-align: center;
}

html.dark .access-col { background: #0c1e2d; }

.access-col-label {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 14px;
}

html.dark .access-col-label { color: #f1f5f9; }

.access-col ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.access-col li {
  font-size: 17px;
  line-height: 1.5;
  color: #334155;
}

html.dark .access-col li { color: #cbd5e1; }

@media (max-width: 720px) {
  .access-section { padding: 24px 16px; }
  .access-columns { grid-template-columns: 1fr; gap: 12px; }
}
</style>
