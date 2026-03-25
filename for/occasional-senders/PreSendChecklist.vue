<script setup>
import { ref, computed } from 'vue'

const categories = [
  {
    id: 'list',
    label: 'List Health',
    description: 'Make sure your audience is clean and ready to receive.',
    items: [
      { id: 'list-1', text: 'Contacts imported or synced to the correct subscriber list' },
      { id: 'list-2', text: 'Previous bounces and unsubscribes are already suppressed' },
      { id: 'list-3', text: 'Suppression list reviewed for this specific send' },
      { id: 'list-4', text: 'Audience segment or filter confirmed — right people, right send' }
    ]
  },
  {
    id: 'auth',
    label: 'Email Authentication',
    description: 'Verify your domain is set up to pass inbox filters.',
    items: [
      { id: 'auth-1', text: 'SPF record is configured for your sending domain' },
      { id: 'auth-2', text: 'DKIM is enabled and verified in BlueFox Email settings' },
      { id: 'auth-3', text: 'DMARC policy is in place (at minimum p=none to start)' }
    ]
  },
  {
    id: 'template',
    label: 'Template & Design',
    description: 'Confirm the email looks right before it reaches inboxes.',
    items: [
      { id: 'tmpl-1', text: 'Previewed on desktop and mobile layouts' },
      { id: 'tmpl-2', text: 'Images load correctly and have descriptive alt text' },
      { id: 'tmpl-3', text: 'Merge tags and personalization tested with a real contact' },
      { id: 'tmpl-4', text: 'Plain text version filled in or auto-generated' }
    ]
  },
  {
    id: 'content',
    label: 'Content & Compliance',
    description: 'Final check on copy, links, and legal requirements.',
    items: [
      { id: 'cnt-1', text: 'Subject line and preview text are finalized and reviewed' },
      { id: 'cnt-2', text: 'All links tested and pointing to the correct destinations' },
      { id: 'cnt-3', text: 'Unsubscribe link is present and functional' },
      { id: 'cnt-4', text: 'Physical mailing address or company info is in the footer' }
    ]
  }
]

const checkedItems = ref(
  Object.fromEntries(
    categories.flatMap(cat => cat.items.map(item => [item.id, false]))
  )
)

const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0)

const checkedCount = computed(() =>
  Object.values(checkedItems.value).filter(Boolean).length
)

const progress = computed(() => Math.round((checkedCount.value / totalItems) * 100))

const isComplete = computed(() => checkedCount.value === totalItems)

const progressStatus = computed(() => {
  if (checkedCount.value === 0) return { label: 'Start reviewing before your next send', color: '#94a3b8' }
  if (progress.value < 50) return { label: 'Good start — keep going', color: '#f59e0b' }
  if (progress.value < 100) return { label: 'Almost ready to send', color: '#13b0ee' }
  return { label: 'Ready to send!', color: '#10b981' }
})

function categoryCheckedCount(cat) {
  return cat.items.filter(item => checkedItems.value[item.id]).length
}

function isCategoryComplete(cat) {
  return cat.items.every(item => checkedItems.value[item.id])
}

function toggleCategory(cat) {
  const allChecked = isCategoryComplete(cat)
  cat.items.forEach(item => {
    checkedItems.value[item.id] = !allChecked
  })
}
</script>

<template>
  <section class="checklist-section" aria-labelledby="checklist-title">
    <div class="checklist-head">
      <v-chip color="primary" class="checklist-badge" aria-label="Pre-send checklist badge">
        <span class="text-overline">Pre-Send Checklist</span>
      </v-chip>
      <h2 id="checklist-title">Everything to Verify Before You Hit Send</h2>
      <p>Occasional senders get burned by skipped steps. Run through this checklist so every campaign goes out with confidence.</p>
    </div>

    <div class="progress-bar-wrap" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100" :aria-label="`${checkedCount} of ${totalItems} items checked`">
      <div class="progress-meta">
        <span class="progress-label" :style="{ color: progressStatus.color }">{{ progressStatus.label }}</span>
        <span class="progress-count">{{ checkedCount }}/{{ totalItems }}</span>
      </div>
      <div class="progress-track">
        <div
          class="progress-fill"
          :style="{ width: `${progress}%`, background: progressStatus.color }"
        />
      </div>
    </div>

    <div class="categories-grid">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="category-card"
        :class="{ complete: isCategoryComplete(cat) }"
      >
        <div class="category-header">
          <div class="category-meta">
            <span class="category-label">{{ cat.label }}</span>
            <span class="category-count" :class="{ done: isCategoryComplete(cat) }">
              {{ categoryCheckedCount(cat) }}/{{ cat.items.length }}
            </span>
          </div>
          <p class="category-description">{{ cat.description }}</p>
          <button
            type="button"
            class="check-all-btn"
            @click="toggleCategory(cat)"
          >
            {{ isCategoryComplete(cat) ? 'Uncheck all' : 'Check all' }}
          </button>
        </div>

        <ul class="item-list" role="list">
          <li
            v-for="item in cat.items"
            :key="item.id"
            class="item-row"
            :class="{ checked: checkedItems[item.id] }"
            role="listitem"
          >
            <label :for="item.id" class="item-label">
              <input
                :id="item.id"
                v-model="checkedItems[item.id]"
                type="checkbox"
                class="item-checkbox"
              />
              <span class="item-text">{{ item.text }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="isComplete" class="complete-banner" role="status" aria-live="polite">
      <span class="complete-icon" aria-hidden="true">✓</span>
      <div>
        <strong>You are ready to send.</strong>
        <p>All items checked. Go deliver a great campaign.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.checklist-section {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 36px 24px;
  background: #ffffff;
}

html.dark .checklist-section {
  background: rgba(15, 23, 42, 0.72);
  border-color: #334155;
}

.checklist-head {
  margin-bottom: 28px;
}

.checklist-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.checklist-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.checklist-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .checklist-head p {
  color: #94a3b8;
}

.progress-bar-wrap {
  margin-bottom: 28px;
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-label {
  font-size: 14px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.progress-count {
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
}

html.dark .progress-count {
  color: #94a3b8;
}

.progress-track {
  height: 6px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}

html.dark .progress-track {
  background: #334155;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.35s ease;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.category-card {
  border-radius: 16px;
  padding: 20px;
  background: #f8fafc;
  transition: background 0.3s ease;
}

.category-card.complete {
  background: rgba(16, 185, 129, 0.06);
}

html.dark .category-card {
  background: rgba(30, 41, 59, 0.5);
}

html.dark .category-card.complete {
  background: rgba(16, 185, 129, 0.08);
}

.category-header {
  margin-bottom: 14px;
}

.category-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.category-label {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .category-label {
  color: #f1f5f9;
}

.category-count {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  background: #e2e8f0;
  border-radius: 999px;
  padding: 2px 8px;
  transition: background 0.25s, color 0.25s;
}

.category-count.done {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}

html.dark .category-count {
  background: #334155;
  color: #94a3b8;
}

html.dark .category-count.done {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.category-description {
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.5;
  color: #475569;
}

html.dark .category-description {
  color: #94a3b8;
}

.check-all-btn {
  font-size: 12px;
  font-weight: 600;
  color: #0369a1;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
}

html.dark .check-all-btn {
  color: #67e8f9;
}

.item-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-row {
  display: flex;
  align-items: flex-start;
}

.item-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  width: 100%;
}

.item-checkbox {
  flex-shrink: 0;
  margin-top: 2px;
  width: 16px;
  height: 16px;
  accent-color: #13b0ee;
  cursor: pointer;
}

.item-text {
  font-size: 13px;
  line-height: 1.5;
  color: #334155;
  transition: color 0.2s, text-decoration 0.2s;
}

html.dark .item-text {
  color: #cbd5e1;
}

.item-row.checked .item-text {
  color: #94a3b8;
  text-decoration: line-through;
  text-decoration-color: rgba(16, 185, 129, 0.5);
}

html.dark .item-row.checked .item-text {
  color: #64748b;
}

.complete-banner {
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(16, 185, 129, 0.08);
  border-radius: 14px;
  padding: 18px 22px;
}

html.dark .complete-banner {
  background: rgba(16, 185, 129, 0.1);
}

.complete-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.2);
  color: #059669;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
}

html.dark .complete-icon {
  color: #34d399;
}

.complete-banner strong {
  display: block;
  font-size: 15px;
  color: #065f46;
  margin-bottom: 2px;
}

html.dark .complete-banner strong {
  color: #34d399;
}

.complete-banner p {
  margin: 0;
  font-size: 13px;
  color: #047857;
  line-height: 1.4;
}

html.dark .complete-banner p {
  color: #6ee7b7;
}

@media (prefers-reduced-motion: reduce) {
  .progress-fill,
  .item-text,
  .category-card,
  .category-count {
    transition: none;
  }
}

@media (max-width: 860px) {
  .checklist-section {
    padding: 24px 16px;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
