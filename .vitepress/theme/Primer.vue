<script setup>
// Short orientation block placed directly under a docs page H1, before the
// first section. Holds the non-obvious facts that change what the reader does:
// scope, permissions, irreversible actions, conditional UI, security.
// Content is a markdown slot, so links and inline formatting work normally.
defineProps({
  title: { type: String, default: 'Before you dig in' },
})
</script>

<template>
  <aside class="primer">
    <p class="primer-title">{{ title }}</p>
    <div class="primer-body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.primer {
  --primer-accent: hsl(197, 87%, 38%);
  --primer-line: rgba(19, 176, 238, 0.42);
  --primer-tint: rgba(19, 176, 238, 0.045);

  position: relative;
  margin: 2.25rem 0 2.5rem;
  padding: 26px 24px 22px;
  border: 1px solid var(--primer-line);
  border-radius: 10px;
  background: var(--primer-tint);
}

html.dark .primer {
  --primer-accent: hsl(197, 87%, 62%);
  --primer-line: rgba(19, 176, 238, 0.34);
  --primer-tint: rgba(19, 176, 238, 0.06);
}

/* Legend: sits on the top border, masking it with the page background so the
   label reads as part of the frame rather than as a heading inside a box. */
.primer-title {
  position: absolute;
  top: 0;
  left: 18px;
  transform: translateY(-50%);
  margin: 0 !important;
  padding: 0 8px;
  background: var(--vp-c-bg);
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--primer-accent);
}

.primer-body :deep(ul) {
  margin: 0;
  padding: 0;
  list-style: none;
}

.primer-body :deep(li) {
  margin: 0 0 14px;
  padding: 0;
  font-size: 15px;
  line-height: 26px;
  color: var(--vp-c-text-2);
}

.primer-body :deep(li:last-child) {
  margin-bottom: 0;
}

.primer-body :deep(p) {
  margin: 0 0 14px;
  font-size: 15px;
  line-height: 26px;
  color: var(--vp-c-text-2);
}

.primer-body :deep(p:last-child) {
  margin-bottom: 0;
}

.primer-body :deep(strong) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.primer-body :deep(code) {
  font-size: 0.85em;
}

@media (max-width: 640px) {
  .primer {
    padding: 24px 18px 20px;
  }

  .primer-title {
    left: 12px;
  }
}
</style>
