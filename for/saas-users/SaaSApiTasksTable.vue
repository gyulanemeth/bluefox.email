<script setup>
const endpoints = [
  {
    id: 'triggered',
    method: 'POST',
    path: '/v1/send-triggered',
    label: 'Send Triggered Email',
    description: 'Send to an entire subscriber list or specific recipients. Personalize with dynamic data via handlebars. Built-in unsubscribe and pause keeps your lists clean.',
    useCases: ['Onboarding sequences', 'Event notifications', 'Weekly digests'],
    docLink: '/docs/api/send-triggered-email',
    snippet: `fetch('/v1/send-triggered', {
  method: 'POST',
  body: JSON.stringify({
    emails: ['user@example.com'],
    triggeredId: 'TEMPLATE_ID',
    data: { plan: 'pro', name: 'Jamie' }
  })
})`
  },
  {
    id: 'transactional',
    method: 'POST',
    path: '/v1/send-transactional',
    label: 'Send Transactional Email',
    description: 'Deliver one-to-one account emails instantly. Invoices, password resets, receipts. Supports attachments inline.',
    useCases: ['Payment confirmations', 'Invoice delivery', 'Account alerts'],
    docLink: '/docs/api/send-transactional-email',
    snippet: `fetch('/v1/send-transactional', {
  method: 'POST',
  body: JSON.stringify({
    email: 'user@example.com',
    transactionalId: 'TEMPLATE_ID',
    data: { invoiceNumber: 'INV-3021' }
  })
})`
  },
  {
    id: 'contacts',
    method: 'POST',
    path: '/v1/contacts/{projectId}',
    label: 'Sync Contacts',
    description: 'Sync profiles from your backend or CRM. Update custom properties to power segmentation, personalization, and trigger automations automatically.',
    useCases: ['CRM sync', 'Trigger automations', 'Segmentation updates'],
    docLink: '/docs/api/contacts-management',
    snippet: `fetch('/v1/contacts/PROJECT_ID', {
  method: 'POST',
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
    label: 'Manage Subscriptions',
    description: 'Pause, unsubscribe, or reactivate recipients in real time. Protect deliverability by acting on bounces and complaints automatically.',
    useCases: ['Bounce handling', 'Compliance opt-outs', 'Temporary pausing'],
    docLink: '/docs/api/subscriber-list-management',
    snippet: `fetch('/v1/subscriber-lists/LIST_ID/user@example.com', {
  method: 'PATCH',
  body: JSON.stringify({
    status: 'paused',
    pausedUntil: '2026-12-01T00:00:00Z'
  })
})`
  }
]

const methodColor = {
  POST: { bg: 'rgba(19, 176, 238, 0.1)', color: '#0369a1' },
  PATCH: { bg: 'rgba(245, 158, 11, 0.1)', color: '#b45309' }
}
</script>

<template>
  <section class="api-showcase" aria-labelledby="api-showcase-title">
    <div class="showcase-head">
      <v-chip color="primary" class="showcase-badge" aria-label="API badge">
        <span class="text-overline">Developer API</span>
      </v-chip>
      <h2 id="api-showcase-title">Four endpoints. Every email use case covered.</h2>
      <p>
        BlueFox Email's API is minimal by design. Trigger emails from product events, sync contacts from your backend,
        and manage subscriptions, all with simple HTTP calls.
      </p>
    </div>

    <div class="endpoint-grid">
      <div
        v-for="ep in endpoints"
        :key="ep.id"
        class="endpoint-card"
      >
        <div class="card-top">
          <div class="endpoint-meta">
            <span
              class="method-badge"
              :style="{ background: methodColor[ep.method].bg, color: methodColor[ep.method].color }"
            >{{ ep.method }}</span>
            <code class="endpoint-path">{{ ep.path }}</code>
          </div>
          <h3 class="endpoint-label">{{ ep.label }}</h3>
          <p class="endpoint-desc">{{ ep.description }}</p>
          <ul class="use-case-list" role="list">
            <li
              v-for="use in ep.useCases"
              :key="use"
              class="use-case-pill"
              role="listitem"
            >{{ use }}</li>
          </ul>
        </div>

        <pre class="code-block"><code>{{ ep.snippet }}</code></pre>

        <a :href="ep.docLink" class="doc-link" target="_blank" rel="noopener">
          View API reference
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </div>

    <div class="api-footer-note" role="note">
      <span>All endpoints accept JSON. Authenticate with your project API key.</span>
      <a href="/docs/api/" class="full-docs-link">Full API docs →</a>
    </div>
  </section>
</template>

<style scoped>
.api-showcase {
  padding: 36px 24px;
}

.showcase-head {
  margin-bottom: 28px;
}

.showcase-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.showcase-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.showcase-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .showcase-head p {
  color: #94a3b8;
}

.endpoint-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.endpoint-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #ffffff;
  border-radius: 20px;
  padding: 22px;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 16px rgba(0, 0, 0, 0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  min-width: 0;
  overflow: hidden;
}

.endpoint-card:hover {
  transform: translateY(-3px);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 16px 40px rgba(0, 0, 0, 0.1);
}

html.dark .endpoint-card {
  background: rgba(30, 41, 59, 0.95);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.2),
    0 4px 16px rgba(0, 0, 0, 0.25);
}

html.dark .endpoint-card:hover {
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.25),
    0 16px 40px rgba(0, 0, 0, 0.3);
}

.card-top {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.endpoint-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.method-badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  border-radius: 6px;
  padding: 3px 8px;
  flex-shrink: 0;
}

.endpoint-path {
  font-size: 12px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  color: #475569;
  word-break: break-all;
}

html.dark .endpoint-path {
  color: #94a3b8;
}

.endpoint-label {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
  border-top: 0 !important;
  padding-top: 0 !important;
}

html.dark .endpoint-label {
  color: #f1f5f9;
}

.endpoint-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #475569;
}

html.dark .endpoint-desc {
  color: #94a3b8;
}

.use-case-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.use-case-pill {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 600;
  color: #475569;
  background: rgba(15, 23, 42, 0.05);
  border-radius: 999px;
  padding: 4px 10px;
}

html.dark .use-case-pill {
  color: #cbd5e1;
  background: rgba(248, 250, 252, 0.08);
}

.code-block {
  margin: 0;
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 12px;
  padding: 14px;
  font-size: 12px;
  line-height: 1.6;
  overflow-x: auto;
  max-width: 100%;
  box-sizing: border-box;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
}

.doc-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  color: #0284c7;
  text-decoration: none;
  margin-top: auto;
}

.doc-link:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}

html.dark .doc-link {
  color: #67e8f9;
}

.api-footer-note {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #f8fafc;
  border-radius: 10px;
  padding: 12px 18px;
  font-size: 13px;
  color: #64748b;
  flex-wrap: wrap;
}

html.dark .api-footer-note {
  background: rgba(30, 41, 59, 0.6);
  color: #94a3b8;
}

.full-docs-link {
  font-size: 13px;
  font-weight: 700;
  color: #0369a1;
  text-decoration: none;
  flex-shrink: 0;
}

.full-docs-link:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}

html.dark .full-docs-link {
  color: #67e8f9;
}

@media (prefers-reduced-motion: reduce) {
  .endpoint-card {
    transition: none;
  }
}

@media (max-width: 860px) {
  .api-showcase {
    padding: 24px 16px;
    overflow: hidden;
  }

  .endpoint-grid {
    grid-template-columns: 1fr;
  }

  .endpoint-card {
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
  }

  .code-block {
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .endpoint-card:hover {
    transform: none;
  }
}

@media (max-width: 480px) {
  .api-showcase {
    padding: 20px 10px;
  }

  .endpoint-card {
    padding: 14px;
    border-radius: 14px;
    gap: 10px;
  }

  .endpoint-label {
    font-size: 14px;
  }

  .endpoint-desc {
    font-size: 12px;
  }

  .code-block {
    padding: 10px;
    font-size: 10px;
    border-radius: 8px;
  }

  .showcase-head h2 {
    font-size: 20px;
  }

  .showcase-head p {
    font-size: 14px;
  }

  .use-case-pill {
    font-size: 10px;
    padding: 3px 8px;
  }

  .endpoint-path {
    font-size: 11px;
  }

  .api-footer-note {
    flex-direction: column;
    text-align: center;
    gap: 8px;
    padding: 10px 14px;
    font-size: 12px;
  }
}
</style>
