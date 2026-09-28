<script setup>
const segments = [
  {
    id: 'student-newsletters',
    label: 'Student newsletters',
    description: 'Campus news, deadlines, opportunities'
  },
  {
    id: 'event-invitations',
    label: 'Event invitations',
    description: 'Lectures, conferences, open days'
  },
  {
    id: 'alumni',
    label: 'Alumni communication',
    description: 'Reunions, updates, fundraising'
  },
  {
    id: 'faculty-department',
    label: 'Faculty & department updates',
    description: 'Newsletters tailored to each faculty, department or team'
  }
]
</script>

<template>
  <section class="audience-section" aria-labelledby="audience-title">
    <div class="audience-head">
      <h2 id="audience-title">What universities send</h2>
      <p>The recurring emails every university sends, to students, alumni, and every department.</p>
    </div>

    <div class="segment-grid">
      <div v-for="segment in segments" :key="segment.id" class="segment-card">
        <h3 class="segment-label">{{ segment.label }}</h3>
        <p class="segment-desc">{{ segment.description }}</p>
      </div>
    </div>

    <p class="audience-foot">Reach the right audience with flexible segmentation by graduating year, engagement and other subscriber data.</p>
  </section>
</template>

<style scoped>
.audience-section { padding: 0; }

.audience-head {
  max-width: 720px;
  margin: 0 auto 28px;
  text-align: center;
}

.audience-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.audience-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
}

html.dark .audience-head p { color: #94a3b8; }

.segment-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.segment-card {
  background: #eef8fd;
  border-radius: 4px;
  padding: 28px 24px;
  text-align: center;
}

html.dark .segment-card { background: #0c1e2d; }

.segment-label {
  margin: 0 0 8px;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
  border-top: 0 !important;
  padding-top: 0 !important;
}

html.dark .segment-label { color: #f1f5f9; }

.segment-desc {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #475569;
}

html.dark .segment-desc { color: #94a3b8; }

.audience-foot {
  margin: 24px auto 0;
  max-width: 720px;
  text-align: center;
  font-size: 15px;
  line-height: 1.6;
  color: #475569;
}

html.dark .audience-foot { color: #94a3b8; }

@media (max-width: 980px) {
  .segment-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 620px) {
  .segment-grid { grid-template-columns: 1fr; }
}
</style>
