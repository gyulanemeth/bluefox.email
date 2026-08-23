<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

// Only docs pages render FAQs from frontmatter. Glossary, aws-concepts and posts
// already write their FAQ sections as visible markdown, so rendering here too
// would duplicate them.
const faqs = computed(() => {
  if (!page.value.relativePath?.startsWith('docs/')) {
    return []
  }
  const list = frontmatter.value.faqs
  if (!Array.isArray(list)) {
    return []
  }
  return list.filter(item => item && item.question && item.answer)
})
</script>

<template>
  <section v-if="faqs.length" class="docs-faq" aria-labelledby="docs-faq-heading">
    <h2 id="docs-faq-heading" class="faq-heading">Frequently Asked Questions</h2>
    <div v-for="faq in faqs" :key="faq.question" class="faq-item">
      <h3 class="faq-question">{{ faq.question }}</h3>
      <p class="faq-answer">{{ faq.answer }}</p>
    </div>
  </section>
</template>

<style scoped>
.docs-faq {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.faq-heading {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.faq-item {
  margin-top: 24px;
}

.faq-question {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

.faq-answer {
  margin: 0;
  font-size: 16px;
  line-height: 28px;
  color: var(--vp-c-text-2);
}
</style>
