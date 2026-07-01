<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const props = defineProps({
  domain: { type: String, default: '' },
})

const TOOLS = [
  { key: 'dmarc', label: 'DMARC', path: '/tools/deliverability/dmarc-checker' },
  { key: 'spf',   label: 'SPF',   path: '/tools/deliverability/spf-checker' },
  { key: 'dkim',  label: 'DKIM',  path: '/tools/deliverability/dkim-checker' },
  { key: 'mx',    label: 'MX',    path: '/tools/deliverability/mx-checker' },
]

const route = useRoute()

const items = computed(() => {
  const cleanDomain = props.domain?.trim()
  return TOOLS.map(tool => {
    const active = route.path.replace(/\.html$/, '').endsWith(tool.path)
    let href = tool.path
    if (cleanDomain) {
      const params = new URLSearchParams({ domain: cleanDomain, run: '1' })
      if (tool.key === 'dkim') params.set('selector', 'google')
      href = `${tool.path}?${params.toString()}`
    }
    return { ...tool, active, href }
  })
})
</script>

<template>
  <nav class="tool-switcher" aria-label="Switch email diagnostic tool">
    <a
      v-for="item in items"
      :key="item.key"
      :href="item.href"
      class="switcher-pill"
      :class="{ active: item.active }"
      :aria-current="item.active ? 'page' : undefined"
    >
      {{ item.label }}
    </a>
  </nav>
</template>

<style scoped>
.tool-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 1.5rem;
}

.switcher-pill {
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.switcher-pill:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.switcher-pill.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}
</style>
