<script setup>
import Segmentation from '../../.vitepress/theme/Segmentation.vue'

defineProps({
  isDark: { type: Boolean, default: false },
  lgAndUp: { type: Boolean, default: true },
  md: { type: Boolean, default: false },
  sm: { type: Boolean, default: false },
  xs: { type: Boolean, default: false }
})

const universityFilters = [
  { icon: 'star',  label: 'Graduating year: 2016',        tone: 'purple' },
  { icon: 'check', label: 'Program: Computer Science',    tone: 'green'  },
  { icon: 'clock', label: 'Engagement: opened in the last 90 days', tone: 'cyan' }
]

const listPoints = [
  {
    title: 'Import from a spreadsheet',
    description: 'Upload a CSV and map each column to a contact property. New columns become new properties.'
  },
  {
    title: 'A list per audience',
    description: 'Students, alumni, staff, and donors each get their own list, sign-up page, and double opt-in.'
  },
  {
    title: 'Automatic cleanup',
    description: 'Bounced and complained addresses are removed, and unsubscribes apply across every list.'
  }
]
</script>

<template>
  <section class="segmentation-section" aria-labelledby="segmentation-title">
    <div class="segmentation-head">
      <h2 id="segmentation-title">Send each email to the right group</h2>
      <p>Build segments from graduating year, program, or engagement instead of keeping a separate list for every group.</p>
    </div>

    <Segmentation
      class="mt-6"
      :is-dark="isDark"
      :lg-and-up="lgAndUp"
      :md="md"
      :sm="sm"
      :xs="xs"
      :filters="universityFilters"
      :target-count="412"
      :total-contacts="9480"
      callout-lead="Segments stay up to date."
      callout-text=" When contact data changes, membership changes with it."
    />

    <ul class="list-points" role="list">
      <li v-for="point in listPoints" :key="point.title" class="list-point">
        <p class="list-point-title">{{ point.title }}</p>
        <p class="list-point-desc">{{ point.description }}</p>
      </li>
    </ul>

    <p class="segmentation-link">
      <a href="/docs/projects/segments">How segments work</a>
    </p>
  </section>
</template>

<style scoped>
.segmentation-section { padding: 0; }

.segmentation-head {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.segmentation-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.segmentation-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
}

html.dark .segmentation-head p { color: #94a3b8; }

.list-points {
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.list-point {
  /* the global `li + li` rule would otherwise nudge cards 2 and 3 down 8px */
  margin-top: 0;
  background: #eef8fd;
  border-radius: 4px;
  padding: 28px 24px;
  text-align: center;
}

html.dark .list-point { background: #0c1e2d; }

.list-point-title {
  margin: 0 0 8px;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
}

html.dark .list-point-title { color: #f1f5f9; }

.list-point-desc {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #475569;
}

html.dark .list-point-desc { color: #94a3b8; }

.segmentation-link {
  margin: 24px 0 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}

@media (max-width: 860px) {
  .list-points { grid-template-columns: 1fr; }
}
</style>
