<script setup>
const segments = [
  {
    id: 'student-newsletters',
    label: 'Student newsletters',
    color: '#13b0ee',
    description: 'Campus news, deadlines, opportunities'
  },
  {
    id: 'event-invitations',
    label: 'Event invitations',
    color: '#6366f1',
    description: 'Lectures, conferences, open days'
  },
  {
    id: 'alumni',
    label: 'Alumni communication',
    color: '#f59e0b',
    description: 'Reunions, updates, fundraising'
  },
  {
    id: 'faculty-department',
    label: 'Faculty & department updates',
    color: '#10b981',
    description: 'Newsletters tailored to each faculty, department or team'
  }
]
</script>

<template>
  <section class="audience-section" aria-labelledby="audience-title">
    <div class="audience-head">
      <v-chip color="primary" class="audience-badge" aria-label="Who it fits badge">
        <span class="text-overline">Who it fits</span>
      </v-chip>
      <h2 id="audience-title">What universities send</h2>
      <p>The recurring emails every university sends, to students, alumni, and every department.</p>
    </div>

    <div class="segment-grid">
      <div v-for="segment in segments" :key="segment.id" class="segment-card">
        <div class="segment-dot" :style="{ background: segment.color }" aria-hidden="true"></div>
        <h3 class="segment-label">{{ segment.label }}</h3>
        <p class="segment-desc">{{ segment.description }}</p>
      </div>
    </div>

    <p class="audience-foot">Reach the right audience with flexible segmentation by graduating year, engagement and other subscriber data.</p>
  </section>
</template>

<style scoped>
.audience-section { padding: 0; }

.audience-head { margin-bottom: 28px; }

.audience-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
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
  max-width: 680px;
}

html.dark .audience-head p { color: #94a3b8; }

.segment-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.segment-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

html.dark .segment-card { background: rgba(30, 41, 59, 0.5); }

.segment-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.segment-label {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
  border-top: 0 !important;
  padding-top: 0 !important;
}

html.dark .segment-label { color: #f1f5f9; }

.segment-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #475569;
}

html.dark .segment-desc { color: #94a3b8; }

.audience-foot {
  margin: 24px 0 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .audience-foot { color: #94a3b8; }

@media (max-width: 980px) {
  .segment-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 620px) {
  .segment-grid { grid-template-columns: 1fr; }
}
</style>
