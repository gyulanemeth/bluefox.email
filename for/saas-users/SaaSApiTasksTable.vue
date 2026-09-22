<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()

const API = 'https://api.bluefox.email'

const active = ref('triggered')

const endpoints = [
  {
    id: 'triggered',
    method: 'POST',
    path: '/v1/send-triggered',
    label: 'Triggered email',
    description: 'Send a triggered email to one or more recipients, personalized with merge tags.',
    docLink: '/docs/api/send-triggered-email',
    snippet: `fetch('${API}/v1/send-triggered', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    emails: ['user@example.com'],
    triggeredId: 'EMAIL_ID',
    data: { plan: 'pro', name: 'Jamie' }
  })
})`
  },
  {
    id: 'transactional',
    method: 'POST',
    path: '/v1/send-transactional',
    label: 'Transactional email',
    description: 'One-to-one emails such as invoices, password resets, and receipts, with attachments.',
    docLink: '/docs/api/send-transactional-email',
    snippet: `fetch('${API}/v1/send-transactional', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    transactionalId: 'EMAIL_ID',
    data: { invoiceNumber: 'INV-3021' }
  })
})`
  },
  {
    id: 'contacts',
    method: 'POST',
    path: '/v1/contacts/{projectId}',
    label: 'Contacts',
    description: 'Create contacts from your backend or CRM. Custom properties power segments, personalization, and automation triggers.',
    docLink: '/docs/api/contacts-management',
    snippet: `fetch('${API}/v1/contacts/PROJECT_ID', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'Jamie',
    data: { plan: 'pro', lifecycleStage: 'expansion' }
  })
})`
  },
  {
    id: 'lists',
    method: 'PATCH',
    path: '/v1/subscriber-lists/{listId}/{email}',
    label: 'Subscriptions',
    description: 'Pause, unsubscribe, or reactivate a recipient on a subscriber list.',
    docLink: '/docs/api/subscriber-list-management',
    snippet: `fetch('${API}/v1/subscriber-lists/LIST_ID/user@example.com', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    status: 'paused',
    pausedUntil: '2026-12-01T00:00:00Z'
  })
})`
  }
]
</script>

<template>
  <section class="api-showcase" aria-labelledby="api-showcase-title">
    <div class="showcase-head">
      <h2 id="api-showcase-title">One API for every email use case</h2>
      <p>Trigger sends, sync contacts, and manage subscriptions with plain HTTP calls.</p>
    </div>

    <div class="api-panel">
      <div class="api-tabs" role="tablist" aria-label="API endpoints">
        <button
          v-for="ep in endpoints"
          :id="`api-tab-${ep.id}`"
          :key="ep.id"
          type="button"
          role="tab"
          class="api-tab"
          :class="{ active: active === ep.id }"
          :aria-selected="active === ep.id"
          :aria-controls="`api-panel-${ep.id}`"
          @click="active = ep.id"
        >{{ ep.label }}</button>
      </div>

      <template v-for="ep in endpoints" :key="ep.id">
        <div
          v-show="active === ep.id"
          :id="`api-panel-${ep.id}`"
          class="api-body"
          role="tabpanel"
          :aria-labelledby="`api-tab-${ep.id}`"
        >
          <div class="api-info">
            <code class="endpoint-path"><strong>{{ ep.method }}</strong> {{ ep.path }}</code>
            <p class="endpoint-desc">{{ ep.description }}</p>
            <a :href="ep.docLink" class="doc-link" target="_blank" rel="noopener">
              API reference
              <v-icon size="14" aria-hidden="true">mdi-open-in-new</v-icon>
            </a>
          </div>
          <pre class="code-block"><code>{{ ep.snippet }}</code></pre>
        </div>
      </template>
    </div>

    <div class="integrations-strip">
      <a href="/docs/integrations/webhooks" class="int-card" target="_blank" rel="noopener">
        <img
          :src="isDark ? '/assets/integrations/webhooks-dark.svg' : '/assets/integrations/webhooks-light.svg'"
          alt=""
          width="28"
          height="28"
        />
        <div class="int-body">
          <span class="int-name">Webhooks</span>
          <span class="int-desc">React to opens, clicks, bounces, and complaints in real time.</span>
        </div>
        <v-icon size="16" class="int-icon" aria-hidden="true">mdi-open-in-new</v-icon>
      </a>
      <a href="/docs/integrations/supabase" class="int-card" target="_blank" rel="noopener">
        <img
          :src="isDark ? '/assets/integrations/supabase-dark.svg' : '/assets/integrations/supabase-light.svg'"
          alt=""
          width="28"
          height="28"
        />
        <div class="int-body">
          <span class="int-name">Supabase</span>
          <span class="int-desc">Replace default auth emails with branded, high-deliverability sends.</span>
        </div>
        <v-icon size="16" class="int-icon" aria-hidden="true">mdi-open-in-new</v-icon>
      </a>
    </div>

    <p class="api-footer">
      All endpoints accept JSON and authenticate with your project API key.
      <a href="/docs/api/" class="full-docs-link">Full API docs</a>
    </p>
  </section>
</template>

<style scoped>
.api-showcase { padding: 36px 24px; }

.showcase-head {
  margin-bottom: 28px;
  text-align: center;
}

.showcase-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.showcase-head p {
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .showcase-head p { color: #94a3b8; }

.api-panel,
.int-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}

html.dark .api-panel,
html.dark .int-card {
  background: #1e293b;
  border-color: #334155;
}

.api-panel {
  margin-bottom: 12px;
  overflow: hidden;
}

.api-tabs {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  border-bottom: 1px solid #e2e8f0;
}

.api-tabs::-webkit-scrollbar { display: none; }

html.dark .api-tabs { border-bottom-color: #334155; }

.api-tab {
  flex: 1;
  padding: 14px 20px;
  white-space: nowrap;
  font-size: 15px;
  font-weight: 600;
  color: #475569;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}

.api-tab:hover { color: #0f172a; }

.api-tab.active {
  color: #0f172a;
  border-bottom-color: #13b0ee;
}

html.dark .api-tab { color: #94a3b8; }
html.dark .api-tab:hover,
html.dark .api-tab.active { color: #f1f5f9; }

.api-body {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  gap: 28px;
  align-items: start;
  padding: 28px;
}

.api-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.endpoint-path {
  font-size: 13px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  color: #475569;
  word-break: break-all;
}

.endpoint-path strong { color: #0f172a; }

html.dark .endpoint-path { color: #94a3b8; }
html.dark .endpoint-path strong { color: #f1f5f9; }

.endpoint-desc {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #475569;
}

html.dark .endpoint-desc { color: #94a3b8; }

.code-block {
  margin: 0;
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 4px;
  padding: 16px;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
  box-sizing: border-box;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
}

.doc-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #0369a1;
  text-decoration: none;
}

.doc-link:hover,
.full-docs-link:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}

html.dark .doc-link,
html.dark .full-docs-link { color: #67e8f9; }

.integrations-strip {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.int-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  text-decoration: none;
  color: inherit;
}

.int-card:hover { border-color: #13b0ee; }

.int-body {
  flex: 1;
  min-width: 0;
}

.int-name {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .int-name { color: #f1f5f9; }

.int-desc {
  display: block;
  margin-top: 2px;
  font-size: 14px;
  line-height: 1.5;
  color: #475569;
}

html.dark .int-desc { color: #94a3b8; }

.int-icon { flex-shrink: 0; color: #64748b; }

.api-footer {
  margin: 0;
  text-align: center;
  font-size: 14px;
  color: #475569;
}

html.dark .api-footer { color: #94a3b8; }

.full-docs-link {
  margin-left: 6px;
  font-weight: 600;
  color: #0369a1;
  text-decoration: none;
}

@media (max-width: 860px) {
  .api-showcase { padding: 24px 16px; }
  .api-body { grid-template-columns: 1fr; gap: 20px; padding: 20px; }
  .api-tab { flex: none; padding: 12px 16px; }
  .integrations-strip { grid-template-columns: 1fr; }
}
</style>
