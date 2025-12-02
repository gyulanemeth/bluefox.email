<script setup>
import { ref } from 'vue'

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  },
  xs: {
    type: Boolean,
    default: false
  }
})

const tab = ref('tab-1')
const tabs = [
  {
    value: 'tab-1',
    text: 'Subscribe',
    url: '/v1/subscriber-lists/{listId}',
    method: 'POST',
    icon: 'mdi-account-plus',
    description: 'Add a subscriber to your list'
  },
  {
    value: 'tab-2',
    text: 'Unsubscribe',
    url: '/v1/subscriber-lists/{listId}/{email}',
    method: 'PATCH',
    icon: 'mdi-account-minus',
    description: 'Remove a subscriber from your list'
  },
  {
    value: 'tab-3',
    text: 'Transactional',
    url: '/v1/send-transactional',
    method: 'POST',
    icon: 'mdi-email-fast',
    description: 'Send one-off transactional emails'
  },
  {
    value: 'tab-4',
    text: 'Triggered',
    url: '/v1/send-triggered',
    method: 'POST',
    icon: 'mdi-email-sync',
    description: 'Send automated triggered emails'
  }
]

const codeExamples = {
  'tab-1': `{
  "name": "Jon Doe",
  "email": "jon@doe.com",
  "customFields": {
    "company": "Acme Corp",
    "plan": "Enterprise"
  },
  "tags": ["customer", "vip"]
}`,
  'tab-2': `{
  "status": "unsubscribed",
  "reason": "user_request"
}`,
  'tab-3': `{
  "email": "jon@doe.com",
  "transactionalId": "##EMAIL_ID##",
  "data": {
    "name": "Jon",
    "order_id": "12345",
    "total": "$99.99"
  },
  "attachments": [
    {
      "fileName": "receipt.pdf",
      "content": "base64_encoded_content"
    }
  ]
}`,
  'tab-4': `{
  "emails": ["jon@doe.com"],
  "triggeredId": "##EMAIL_ID##",
  "data": {
    "name": "Jon",
    "product": "Pro Plan",
    "trial_days": 14
  },
  "scheduleAt": "2025-12-10T09:00:00Z"
}`
}

function getTabItem () {
  return tabs.find(item => item.value === tab.value)
}

function copyCode(code) {
  navigator.clipboard.writeText(code)
}
</script>

<template>
<div class="developer-section">
  <!-- API Endpoints Section -->
  <div class="api-container">
    <div class="api-header">
      <div class="header-content">
        <div class="api-badge">
          <v-icon size="small">mdi-api</v-icon>
          <span>REST API</span>
        </div>
        <h3 class="api-title">Simple, Powerful API Endpoints</h3>
        <p class="api-subtitle">
          Full programmatic access with RESTful endpoints. Authentication via API keys, comprehensive error handling, and rate limiting.
        </p>
      </div>
    </div>

    <!-- Endpoint Tabs -->
    <div class="endpoint-tabs" v-if="!xs">
      <button
        v-for="item in tabs"
        :key="item.value"
        @click="tab = item.value"
        :class="['endpoint-tab', { active: tab === item.value }]"
      >
        <v-icon size="small" class="tab-icon">{{ item.icon }}</v-icon>
        <div class="tab-content">
          <span class="tab-label">{{ item.text }}</span>
          <span class="tab-desc">{{ item.description }}</span>
        </div>
      </button>
    </div>

    <!-- Mobile Tabs -->
    <div class="mobile-endpoint-select" v-else>
      <v-select
        v-model="tab"
        :items="tabs"
        item-title="text"
        item-value="value"
        variant="outlined"
        density="comfortable"
        hide-details
      >
        <template v-slot:prepend-inner>
          <v-icon size="small">{{ getTabItem().icon }}</v-icon>
        </template>
      </v-select>
    </div>

    <!-- Code Display -->
    <div class="code-display">
      <!-- Request Section -->
      <div class="request-section">
        <div class="section-label">
          <v-icon size="small" class="mr-2">mdi-arrow-right-bold</v-icon>
          Request
        </div>
        <div class="endpoint-display">
          <v-chip 
            :color="getTabItem().method === 'POST' ? 'success' : 'warning'"
            size="small"
            class="method-chip"
          >
            {{ getTabItem().method }}
          </v-chip>
          <code class="endpoint-path">
            https://api.bluefox.email{{ getTabItem().url }}
          </code>
        </div>
        
        <div class="code-block">
          <div class="code-header">
            <div class="code-lang">
              <v-icon size="small" class="mr-1">mdi-code-json</v-icon>
              JSON
            </div>
            <v-btn
              size="x-small"
              variant="text"
              prepend-icon="mdi-content-copy"
              @click="copyCode(codeExamples[tab])"
            >
              Copy
            </v-btn>
          </div>
          <pre class="code-content"><code class="language-json">{{ codeExamples[tab] }}</code></pre>
        </div>
      </div>

      <!-- Response Section -->
      <div class="response-section">
        <div class="section-label">
          <v-icon size="small" class="mr-2">mdi-arrow-left-bold</v-icon>
          Response
        </div>
        <div class="code-block response">
          <div class="code-header">
            <div class="code-lang success">
              <v-icon size="small" class="mr-1">mdi-check-circle</v-icon>
              200 OK
            </div>
          </div>
          <pre class="code-content"><code class="language-json">{
  "success": true,
  "data": {
    "id": "sub_1a2b3c4d",
    "status": "active",
    "created_at": "2025-12-02T13:04:00Z"
  }
}</code></pre>
        </div>
      </div>
    </div>

    <!-- Documentation Link -->
    <div class="docs-cta">
      <v-btn
        color="primary"
        variant="flat"
        size="large"
        prepend-icon="mdi-book-open-variant"
        href="https://bluefox.email/docs/api/"
        target="_blank"
      >
        View Full API Documentation
      </v-btn>
      <div class="docs-info">
        Complete reference with authentication, rate limits, and error codes
      </div>
    </div>
  </div>

  <!-- Integrations Grid -->
  <div class="integrations-section">
    <div class="section-header">
      <div class="section-badge">
        <v-icon size="small">mdi-puzzle</v-icon>
        <span>Integrations</span>
      </div>
      <h3 class="section-title">Connect With Your Stack</h3>
      <p class="section-subtitle">
        Pre-built integrations and flexible options for custom workflows
      </p>
    </div>

    <v-row class="integration-grid">
      <!-- Zapier -->
      <v-col cols="12" sm="6" md="4">
        <a 
          href="https://zapier.com/apps/bluefox/integrations"
          target="_blank"
          class="integration-link"
        >
          <div class="integration-card">
            <div class="integration-badge new">
              <v-icon size="x-small">mdi-star-four-points</v-icon>
              <span>New</span>
            </div>
            
            <div class="integration-icon zapier">
              <v-icon color="#FF4A00" size="40">mdi-lightning-bolt</v-icon>
            </div>
            
            <h4 class="integration-name">Zapier</h4>
            <p class="integration-desc">
              Connect with thousands of apps. No code required—automate workflows in minutes.
            </p>
            
            <div class="integration-tags">
              <v-chip size="x-small" variant="tonal">No-Code</v-chip>
              <v-chip size="x-small" variant="tonal">Automation</v-chip>
            </div>

            <div class="integration-arrow">
              <v-icon size="small">mdi-arrow-right</v-icon>
            </div>
          </div>
        </a>
      </v-col>

      <!-- Webhooks -->
      <v-col cols="12" sm="6" md="4">
        <a 
          href="https://bluefox.email/docs/integrations/webhooks"
          target="_blank"
          class="integration-link"
        >
          <div class="integration-card">
            <div class="integration-icon">
              <v-img
                :width="40"
                :src="isDark ? '/assets/integrations/webhooks-dark.svg' : '/assets/integrations/webhooks-light.svg'"
              />
            </div>
            
            <h4 class="integration-name">Webhooks</h4>
            <p class="integration-desc">
              Real-time event notifications for opens, clicks, bounces, and more.
            </p>
            
            <div class="integration-tags">
              <v-chip size="x-small" variant="tonal">Real-time</v-chip>
              <v-chip size="x-small" variant="tonal">Events</v-chip>
            </div>

            <div class="integration-arrow">
              <v-icon size="small">mdi-arrow-right</v-icon>
            </div>
          </div>
        </a>
      </v-col>

      <!-- Supabase -->
      <v-col cols="12" sm="6" md="4">
        <a 
          href="https://bluefox.email/docs/integrations/supabase"
          target="_blank"
          class="integration-link"
        >
          <div class="integration-card">
            <div class="integration-icon">
              <v-img
                :width="40"
                :src="isDark ? '/assets/integrations/supabase-dark.svg' : '/assets/integrations/supabase-light.svg'"
              />
            </div>
            
            <h4 class="integration-name">Supabase Auth</h4>
            <p class="integration-desc">
              Enhanced auth emails with better deliverability and custom branding.
            </p>
            
            <div class="integration-tags">
              <v-chip size="x-small" variant="tonal">Authentication</v-chip>
              <v-chip size="x-small" variant="tonal">Backend</v-chip>
            </div>

            <div class="integration-arrow">
              <v-icon size="small">mdi-arrow-right</v-icon>
            </div>
          </div>
        </a>
      </v-col>
    </v-row>
  </div>
</div>
</template>

<style scoped>
.developer-section {
  max-width: 1200px;
  margin: 0 auto;
}

/* API Container */
.api-container {
  background: var(--vp-c-bg-soft);
  border-radius: 24px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  margin-bottom: 80px;
}

.api-header {
  padding: 48px 40px 32px;
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.05), rgba(57, 44, 145, 0.05));
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
}

.api-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(var(--v-theme-primary), 0.1);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 16px;
}

.api-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
}

.api-subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

/* Endpoint Tabs */
.endpoint-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid var(--vp-c-divider);
}

.endpoint-tab {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.endpoint-tab:hover {
  background: rgba(var(--v-theme-primary), 0.05);
}

.endpoint-tab.active {
  border-bottom-color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.05);
}

.tab-icon {
  opacity: 0.6;
  flex-shrink: 0;
}

.endpoint-tab.active .tab-icon {
  opacity: 1;
  color: rgb(var(--v-theme-primary));
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tab-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tab-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.mobile-endpoint-select {
  padding: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

/* Code Display */
.code-display {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--vp-c-divider);
}

.request-section,
.response-section {
  padding: 32px;
  background: var(--vp-c-bg);
}

.section-label {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.endpoint-display {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.method-chip {
  font-weight: 700;
  font-family: 'Fira Code', monospace;
  font-size: 12px;
}

.endpoint-path {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 13px;
  color: var(--vp-c-text-1);
  background: transparent;
  padding: 0;
  word-break: break-all;
}

/* Code Block */
.code-block {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-code-block-bg);
}

.code-block.response {
  background: rgba(16, 185, 129, 0.05);
}

html.dark .code-block.response {
  background: rgba(16, 185, 129, 0.1);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid var(--vp-c-divider);
}

html.dark .code-header {
  background: rgba(255, 255, 255, 0.02);
}

.code-lang {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-lang.success {
  color: #10B981;
}

.code-content {
  margin: 0;
  padding: 20px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-code-block-color);
  overflow-x: auto;
}

.code-content code {
  background: transparent;
  padding: 0;
}

/* Documentation CTA */
.docs-cta {
  padding: 40px;
  text-align: center;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

.docs-info {
  margin-top: 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

/* Integrations Section */
.integrations-section {
  margin-top: 80px;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.1), rgba(57, 44, 145, 0.1));
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 16px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
}

.section-subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.integration-grid {
  margin: 0 -12px;
}

.integration-link {
  text-decoration: none;
  display: block;
  height: 100%;
}

.integration-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 32px;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
}

.integration-link:hover .integration-card {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(19, 176, 238, 0.15);
  border-color: rgba(var(--v-theme-primary), 0.4);
}

.integration-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.integration-badge.new {
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
}

.integration-icon {
  width: 72px;
  height: 72px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.08), rgba(57, 44, 145, 0.08));
  transition: transform 0.3s ease;
}

.integration-link:hover .integration-icon {
  transform: scale(1.05);
}

.integration-icon.zapier {
  background: linear-gradient(135deg, rgba(255, 74, 0, 0.12), rgba(255, 74, 0, 0.06));
}

.integration-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
}

.integration-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 20px 0;
  flex: 1;
}

.integration-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.integration-arrow {
  display: flex;
  justify-content: flex-end;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.integration-link:hover .integration-arrow {
  opacity: 1;
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 960px) {
  .code-display {
    grid-template-columns: 1fr;
  }

  .endpoint-tabs {
    grid-template-columns: repeat(2, 1fr);
  }

  .api-header {
    padding: 32px 24px;
  }

  .api-title {
    font-size: 24px;
  }
}

@media (max-width: 640px) {
  .endpoint-tabs {
    display: none;
  }

  .request-section,
  .response-section {
    padding: 20px;
  }

  .endpoint-display {
    flex-direction: column;
    align-items: flex-start;
  }

  .code-content {
    font-size: 12px;
    padding: 16px;
  }

  .docs-cta {
    padding: 13px 9px;
  }

  .integration-card {
    padding: 24px;
  }
}
</style>
