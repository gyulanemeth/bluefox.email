<script setup>
// Short orientation block placed directly under a docs page H1, before the
// first section. Holds the non-obvious facts that change what the reader does:
// scope, permissions, irreversible actions, conditional UI, security.
// Content is a markdown slot, so links and inline formatting work normally.
//
// Optional `next` slot renders a separated "See also" row for outbound
// resources: a free tool to run, a published article that goes deeper, a
// pricing or reference page. Kept apart from the bullets on purpose - the
// bullets are facts that change what you do here, the row is where to go next.
defineProps({
  title: { type: String, default: 'Before you dig in' },
  nextTitle: { type: String, default: 'See also' },
})
</script>

<template>
  <aside class="primer">
    <p class="primer-title">{{ title }}</p>
    <div class="primer-body">
      <slot />
    </div>
    <div v-if="$slots.next" class="primer-next">
      <p class="primer-next-title">{{ nextTitle }}</p>
      <div class="primer-next-body">
        <slot name="next" />
      </div>
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

/* "See also" row: outbound resources, held apart from the bullets by a rule
   in the neutral divider colour so it reads as a footer, not another point. */
.primer-next {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.primer-next-title {
  margin: 0 0 6px !important;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  color: var(--vp-c-text-3);
}

.primer-next-body :deep(p) {
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  color: var(--vp-c-text-3);
}

.primer-next-body :deep(a) {
  font-weight: 500;
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
