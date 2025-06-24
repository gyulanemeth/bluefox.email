<script setup>
import { useRoute } from 'vitepress'

const route = useRoute()
const currentPath = route.path

// Determine which glossary this page belongs to
const isAwsGlossary = currentPath.includes('/aws-concepts/')
const isEmailSendingGlossary = currentPath.includes('/email-sending-concepts/')
const isEmailMarketingGlossary = currentPath.includes('/email-marketing-concepts/')

// Set the appropriate back link and text
let backLink = '/'
let backText = 'Back to Glossary'

if (isAwsGlossary) {
  backLink = '/aws-concepts/'
  backText = 'Back to AWS Concepts'
} else if (isEmailSendingGlossary) {
  backLink = '/email-sending-concepts/'
  backText = 'Back to Email Sending Concepts'
}
</script>

<template>
  <div class="glossary-navigation">
    <a :href="backLink" class="back-button">
      <span class="arrow">←</span><span class="text">{{ backText }}</span>
    </a>
  </div>
</template>

<style scoped>
.glossary-navigation {
  margin: 3rem 0 1.5rem;
  text-align: center;
  width: 100%;
  padding: 0 1rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  color: var(--vp-c-text-1);
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none !important;
  min-width: 200px;
  max-width: 100%;
}

.back-button:hover {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  text-decoration: none !important;
}

.arrow {
  margin-right: 0.5rem;
  font-size: 1.2em;
  display: inline-block;
  text-decoration: none !important;
}

.text {
  text-decoration: none !important;
}

.back-button:hover .text {
  text-decoration: none !important;
}

/* Mobile-specific styles */
@media (max-width: 640px) {
  .glossary-navigation {
    margin: 2rem 0 1rem;
  }
  
  .back-button {
    padding: 0.65rem 0.9rem;
    width: 100%;
    font-size: 0.95rem;
  }
}
</style>
