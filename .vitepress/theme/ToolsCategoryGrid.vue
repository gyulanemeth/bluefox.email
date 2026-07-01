<script setup>
defineProps({
  tools: { type: Array, required: true }, // [{ name, desc, href, iconPaths, tag? }]
})
</script>

<template>
  <div class="tools-grid">
    <a
      v-for="tool in tools"
      :key="tool.href"
      :href="tool.href"
      class="tool-card"
    >
      <div class="card-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="tool.iconPaths" />
      </div>
      <div class="card-body">
        <div class="card-heading">
          <h3 class="card-name">{{ tool.name }}</h3>
          <span v-if="tool.tag" class="card-tag">{{ tool.tag }}</span>
        </div>
        <p class="card-desc">{{ tool.desc }}</p>
      </div>
      <div class="card-link" aria-hidden="true">
        Open tool
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </a>
  </div>
</template>

<style scoped>
.tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 2rem 0;
}

.tool-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  text-decoration: none !important;
  color: inherit;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
  cursor: pointer;
}

.tool-card:hover {
  border-color: rgba(19, 176, 238, 0.5);
  box-shadow: 0 8px 28px rgba(19, 176, 238, 0.15);
  transform: translateY(-3px);
}

html.dark .tool-card:hover {
  box-shadow: 0 8px 28px rgba(19, 176, 238, 0.22);
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.12), rgba(57, 44, 145, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #13B0EE;
  flex-shrink: 0;
  transition: background 0.25s ease;
}

.tool-card:hover .card-icon {
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.22), rgba(57, 44, 145, 0.18));
}

.card-body { flex: 1; }

.card-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 6px;
}

.card-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
  padding: 0;
  border: none !important;
  line-height: 1.3;
}

.card-tag {
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #392C91;
  background: rgba(57, 44, 145, 0.1);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  flex-shrink: 0;
}

html.dark .card-tag { color: #b3a4ff; background: rgba(179, 164, 255, 0.15); }

.card-desc {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.card-link {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  color: #13B0EE;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.tool-card:hover .card-link { opacity: 1; }

@media (max-width: 640px) {
  .tools-grid { grid-template-columns: 1fr; }
}
</style>
