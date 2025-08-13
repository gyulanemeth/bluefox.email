<script setup>
import { computed } from 'vue'

const props = defineProps({
  level: {
    type: String,
    default: 'category',
    validator: (value) => ['main', 'category'].includes(value)
  }
})

const isMainLevel = computed(() => props.level === 'main')
const isCategoryLevel = computed(() => props.level === 'category')

const navigateToItem = (link) => {
  if (link) {
    window.location.href = link
  }
}

// Available categories
const availableCategories = [
  {
    name: 'Email Deliverability Tools',
    description: 'Check your domain\'s email authentication setup with DMARC, SPF, DKIM, and MX record checkers.',
    toolCount: 5,
    link: '/tools/deliverability/'
  }
]

// Deliverability tools - clean, professional design
const deliverabilityTools = [
  {
    name: 'DMARC Checker',
    description: 'Validate your DMARC policy and prevent email spoofing with detailed analysis.',
    link: '/tools/deliverability/dmarc-checker',
    features: ['Policy Validation', 'Syntax Analysis', 'Security Report'],
    category: 'authentication'
  },
  {
    name: 'SPF Checker',
    description: 'Verify your SPF records and authorize legitimate email senders.',
    link: '/tools/deliverability/spf-checker',
    features: ['DNS Validation', 'Record Analysis', 'Server Check'],
    category: 'authentication'
  },
  {
    name: 'DKIM Checker',
    description: 'Test DKIM signatures and email authentication protocols.',
    link: '/tools/deliverability/dkim-checker',
    features: ['Signature Test', 'Key Validation', 'Protocol Check'],
    category: 'authentication'
  },
  {
    name: 'MX Record Checker',
    description: 'Lookup and analyze mail exchange records for proper routing.',
    link: '/tools/deliverability/mx-checker',
    features: ['DNS Lookup', 'Priority Check', 'Route Analysis'],
    category: 'infrastructure'
  },
  {
    name: 'DMARC Report Analyzer',
    description: 'Analyze DMARC aggregate reports for security insights and trends.',
    link: '/tools/deliverability/dmarc-report-analyzer',
    features: ['Report Analysis', 'Trend Insights', 'Security Metrics'],
    category: 'analytics'
  }
]
</script>

<template>
  <div class="tools-container">
    <!-- Main Level: Tool Categories -->
    <div v-if="isMainLevel" class="category-grid">
      <div 
        v-for="category in availableCategories" 
        :key="category.name"
        class="category-card"
        @click="navigateToItem(category.link)"
      >
        <div class="category-header">
          <div class="category-badge">
            <span class="tool-count">{{ category.toolCount }}</span>
            <span class="badge-label">Tools</span>
          </div>
        </div>
        <div class="category-content">
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
        </div>
      </div>
    </div>

    <!-- Category Level: Individual Tools -->
    <div v-if="isCategoryLevel" class="tools-grid">
      <div 
        v-for="tool in deliverabilityTools" 
        :key="tool.name"
        class="tool-card"
        :class="`category-${tool.category}`"
        @click="navigateToItem(tool.link)"
      >
        <div class="tool-header">
          <div class="tool-category-badge">{{ tool.category }}</div>
        </div>
        
        <div class="tool-content">
          <h3>{{ tool.name }}</h3>
          <p>{{ tool.description }}</p>
        </div>

        <div class="tool-features">
          <span v-for="feature in tool.features" :key="feature" class="feature-tag">
            {{ feature }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tools-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Category Grid (Main Level) */
.category-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.category-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  min-height: 200px;
}

/* Diagonal pop-out effect for category cards */
.category-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.category-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.category-badge {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.tool-count {
  font-size: 1.25rem;
  font-weight: 700;
}

.category-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.category-content p {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* Tools Grid (Category Level) */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.tool-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

/* Category-based accent colors */
.tool-card.category-authentication {
  border-left: 3px solid #10b981;
}

.tool-card.category-infrastructure {
  border-left: 3px solid #3b82f6;
}

.tool-card.category-analytics {
  border-left: 3px solid #8b5cf6;
}

/* Diagonal pop-out effect for tool cards */
.tool-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.12);
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.tool-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.tool-category-badge {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  border: 1px solid var(--vp-c-divider-light);
}

.tool-content {
  flex: 1;
  margin-bottom: 1rem;
}

.tool-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.tool-content p {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.tool-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.feature-tag {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid var(--vp-c-divider-light);
  transition: all 0.2s ease;
  cursor: pointer;
}

/* Simple hover effect for chips without outline */
.feature-tag:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  transform: translateY(-1px);
}

/* Dark theme enhancements */
html:not(.dark) .feature-tag {
  background: #f1f5f9;
  border-color: #e2e8f0;
}

html:not(.dark) .tool-category-badge {
  background: #f8fafc;
  border-color: #e2e8f0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .tools-container {
    padding: 0 1rem;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .tool-card {
    padding: 1.25rem;
    min-height: 180px;
  }
  
  .category-card {
    padding: 1.5rem;
    min-height: 160px;
  }
  
  .category-content h3 {
    font-size: 1.25rem;
  }
  
  .tool-content h3 {
    font-size: 1rem;
  }
  
  /* Reduced diagonal effect on mobile */
  .tool-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .category-card:hover {
    transform: translate(-3px, -3px);
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.08);
  }
}

@media (max-width: 480px) {
  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .tool-category-badge {
    align-self: flex-end;
  }
}

/* Entrance animations */
.tool-card, .category-card {
  opacity: 0;
  animation: slideInUp 0.6s ease forwards;
}

.tool-card:nth-child(1), .category-card:nth-child(1) { animation-delay: 0.1s; }
.tool-card:nth-child(2), .category-card:nth-child(2) { animation-delay: 0.2s; }
.tool-card:nth-child(3), .category-card:nth-child(3) { animation-delay: 0.3s; }
.tool-card:nth-child(4), .category-card:nth-child(4) { animation-delay: 0.4s; }
.tool-card:nth-child(5), .category-card:nth-child(5) { animation-delay: 0.5s; }

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .tool-card, .category-card {
    animation: none;
    opacity: 1;
  }
  
  .tool-card:hover, .category-card:hover {
    transform: none;
  }
  
  .feature-tag:hover {
    transform: none;
  }
}
</style>
