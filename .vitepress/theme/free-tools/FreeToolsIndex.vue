<script setup>
import { defineProps, computed } from 'vue'

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

// Only available categories (remove coming soon ones)
const availableCategories = [
  {
    name: 'Email Deliverability Tools',
    description: 'Check your domain\'s email authentication setup with DMARC, SPF, DKIM, and MX record checkers.',
    toolCount: 5,
    link: '/tools/deliverability/'
  }
]

// Deliverability tools
const deliverabilityTools = [
  {
    name: 'DMARC Checker',
    description: 'Validate your DMARC policy and prevent email spoofing.',
    link: '/tools/deliverability/dmarc-checker',
    features: ['Policy Validation', 'Syntax Check', 'Security Analysis']
  },
  {
    name: 'SPF Checker',
    description: 'Verify your SPF records and authorize legitimate senders.',
    link: '/tools/deliverability/spf-checker',
    features: ['DNS Validation', 'Syntax Check', 'Server Authorization']
  },
  {
    name: 'DKIM Checker',
    description: 'Test DKIM signatures and email authentication.',
    link: '/tools/deliverability/dkim-checker',
    features: ['Signature Validation', 'Key Lookup', 'Integrity Check']
  },
  {
    name: 'MX Record Checker',
    description: 'Lookup and analyze mail exchange records.',
    link: '/tools/deliverability/mx-checker',
    features: ['Record Lookup', 'Priority Check', 'SMTP Test']
  },
  {
    name: 'DMARC Report Analyzer',
    description: 'Analyze DMARC aggregate reports for security insights.',
    link: '/tools/deliverability/dmarc-report-analyzer',
    features: ['Report Parsing', 'Security Insights', 'Trend Analysis']
  }
]
</script>

<template>
  <div class="free-tools-index">
    <!-- Main Level: Tool Categories -->
    <div v-if="isMainLevel" class="tools-grid">
      <div 
        v-for="category in availableCategories" 
        :key="category.name"
        class="tool-card"
        @click="navigateToItem(category.link)"
      >
        <h3>{{ category.name }}</h3>
        <p>{{ category.description }}</p>
        <div class="card-footer">
          <span class="tool-count">{{ category.toolCount }} tools</span>
        </div>
      </div>
    </div>

    <!-- Category Level: Individual Tools -->
    <div v-if="isCategoryLevel" class="tools-grid">
      <div 
        v-for="tool in deliverabilityTools" 
        :key="tool.name"
        class="tool-card"
        @click="navigateToItem(tool.link)"
      >
        <h3>{{ tool.name }}</h3>
        <p>{{ tool.description }}</p>
        <div v-if="tool.features" class="features">
          <span v-for="feature in tool.features" :key="feature" class="feature">
            {{ feature }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.free-tools-index {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
}

.tool-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 200px;
  width: 100%;
  box-sizing: border-box;
}

.tool-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 20px var(--vp-c-shadow);
  transform: translateY(-4px);
}

.tool-card h3 {
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem 0;
  text-align: center;
}

.tool-card p {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin: 0 0 auto 0;
  line-height: 1.5;
  text-align: center;
  flex-grow: 1;
}

.card-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider-light);
  text-align: center;
}

.tool-count {
  color: var(--vp-c-text-3);
  font-size: 0.875rem;
  font-weight: 500;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
  justify-content: center;
}

.feature {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--vp-c-divider-light);
}

/* Responsive Design */
@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .free-tools-index {
    padding: 0 1rem;
  }
  
  .tool-card {
    padding: 1.5rem;
    min-height: 180px;
  }
  
  .tool-card h3 {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .tool-card {
    padding: 1.25rem;
    min-height: 160px;
  }
  
  .tool-card h3 {
    font-size: 1.125rem;
  }
}
</style>
