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
    description: 'Upload a CSV and map each column to a contact property. Columns you haven’t used before become new properties.'
  },
  {
    title: 'A separate list per audience',
    description: 'Students, alumni, staff, and donors each get their own subscriber list, with its own sign-up page and double opt-in.'
  },
  {
    title: 'Cleanup that runs itself',
    description: 'Bounced and complained addresses are removed in bulk, and unsubscribes are honored across every list.'
  }
]
</script>

<template>
  <section class="segmentation-section" aria-labelledby="segmentation-title">
    <h2 id="segmentation-title" class="section-title">Send the right message to the right people</h2>
    <p class="section-subtitle constrained">
      Create targeted audiences from subscriber data and engagement, without maintaining separate lists for every group.
    </p>

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
      callout-lead="No more emailing the whole database."
      callout-text=" Segments update themselves as contact data changes, so the class of 2016 stays the class of 2016."
    />

    <ul class="list-points" role="list">
      <li v-for="point in listPoints" :key="point.title" class="list-point">
        <div class="list-point-dot" aria-hidden="true"></div>
        <div>
          <p class="list-point-title">{{ point.title }}</p>
          <p class="list-point-desc">{{ point.description }}</p>
        </div>
      </li>
    </ul>

    <div class="segmentation-cta">
      <v-btn
        size="large"
        color="primary"
        variant="flat"
        class="segmentation-btn"
        href="/docs/projects/segments"
      >
        <strong>Read the segments docs</strong>
      </v-btn>
    </div>
  </section>
</template>

<style scoped>
.segmentation-section { padding: 0; }

.section-title {
  margin: 0 0 12px;
  max-width: 900px;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.2;
  text-align: left;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.section-subtitle {
  margin: 0;
  font-size: 17px;
  line-height: 1.65;
  color: #4b5563;
  text-align: left;
}

html.dark .section-subtitle { color: #9ca3af; }

.constrained { max-width: 760px; }

.list-points {
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.list-point {
  /* the global `li + li` rule would otherwise nudge cards 2 and 3 down 8px */
  margin-top: 0;
  background: #f8fafc;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

html.dark .list-point { background: rgba(30, 41, 59, 0.5); }

.list-point-dot {
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  margin-top: 6px;
  border-radius: 50%;
  background: #13b0ee;
}

.list-point-title {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
}

html.dark .list-point-title { color: #f1f5f9; }

.list-point-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: #475569;
}

html.dark .list-point-desc { color: #94a3b8; }

.segmentation-cta {
  margin-top: 28px;
  display: flex;
}

.segmentation-btn {
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-radius: 10px !important;
  min-height: 50px !important;
  padding: 0 28px !important;
  text-decoration: none !important;
}

.segmentation-btn :deep(.v-btn__content) { line-height: 1.2; }
.segmentation-btn strong { line-height: 1.2; }

@media (max-width: 980px) {
  .list-points { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 620px) {
  .list-points { grid-template-columns: 1fr; }
  .segmentation-btn { width: 100%; justify-content: center; }
}
</style>
