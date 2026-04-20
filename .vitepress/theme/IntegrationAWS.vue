<script setup>
import { ref, computed } from 'vue'

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
    url: 'https://api.bluefox.email/v1/subscriber-lists/##YOUR_SUBSCRIBER_LIST_ID##',
    method: 'POST'
  },
  {
    value: 'tab-2',
    text: 'Unsubscribe',
    url: 'https://api.bluefox.email/v1/subscriber-lists/##YOUR_SUBSCRIBER_LIST_ID##/##SUBSCRIBER_EMAIL_ADDRESS##',
    method: 'PATCH'
  },
  {
    value: 'tab-3',
    text: 'Send transactional',
    url: 'https://api.bluefox.email/v1/send-transactional',
    method: 'POST'
  },
  {
    value: 'tab-4',
    text: 'Send triggered',
    url: 'https://api.bluefox.email/v1/send-triggered',
    method: 'POST'
  }
]

const activeTab = computed(() => tabs.find(t => t.value === tab.value))

const methodColor = (method) => {
  switch (method) {
    case 'POST': return 'method--post'
    case 'PATCH': return 'method--patch'
    case 'GET': return 'method--get'
    case 'DELETE': return 'method--delete'
    default: return ''
  }
}
</script>

<template>
  <div class="apiWrap">
  <div class="apiCard">
    <div class="apiTabs" role="tablist">
      <button
        v-for="t in tabs"
        :key="t.value"
        type="button"
        role="tab"
        :aria-selected="tab === t.value"
        :class="['apiTab', { 'apiTab--active': tab === t.value }]"
        @click="tab = t.value"
      >
        {{ t.text }}
      </button>
    </div>

    <div class="endpointRow">
      <span :class="['methodChip', methodColor(activeTab.method)]">{{ activeTab.method }}</span>
      <code class="endpointUrl">{{ activeTab.url }}</code>
    </div>

    <div class="payloadLabel">Request body</div>
    <div class="payload">
      <slot :name="tab" />
    </div>

    <div class="apiFooter">
      <a class="docsLink" href="https://bluefox.email/docs/api/" target="_blank" rel="noopener">
        Read the API docs
        <span class="docsArrow" aria-hidden="true">→</span>
      </a>
    </div>
  </div>

  <a
    class="webhookCard"
    href="https://bluefox.email/docs/integrations/webhooks"
    target="_blank"
    rel="noopener"
  >
    <img
      class="webhookIcon"
      :src="isDark ? '/assets/integrations/webhooks-dark.svg' : '/assets/integrations/webhooks-light.svg'"
      alt=""
      width="40"
      height="40"
    />
    <div class="webhookBody">
      <div class="webhookHead">
        <h4 class="webhookTitle">Webhooks</h4>
        <span class="webhookTag">Real-time</span>
      </div>
      <p class="webhookDesc">Get notified the moment something happens — opens, clicks, bounces, complaints, subscriptions. Push events straight into your stack.</p>
    </div>
    <span class="webhookArrow" aria-hidden="true">→</span>
  </a>
  </div>
</template>

<style scoped>
.apiWrap {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.apiCard {
  background: #ffffff;
  border-radius: 14px;
  padding: 8px 8px 16px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 16px -8px rgba(15, 23, 42, 0.1);
}

html.dark .apiCard {
  background: #0f172a;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 4px 16px -8px rgba(0, 0, 0, 0.5);
}

.webhookCard {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 22px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 16px -8px rgba(15, 23, 42, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.webhookCard:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 28px -16px rgba(15, 23, 42, 0.18);
}

html.dark .webhookCard {
  background: #0f172a;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 4px 16px -8px rgba(0, 0, 0, 0.5);
}

html.dark .webhookCard:hover {
  box-shadow: 0 12px 28px -16px rgba(0, 0, 0, 0.7);
}

.webhookIcon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: block;
}

.webhookBody {
  flex: 1;
  min-width: 0;
}

.webhookHead {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.webhookTitle {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  border-top: 0 !important;
  padding-top: 0 !important;
}

html.dark .webhookTitle {
  color: #f1f5f9;
}

.webhookTag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #392c91;
  background: rgba(19, 176, 238, 0.12);
  padding: 3px 8px;
  border-radius: 6px;
}

html.dark .webhookTag {
  color: #13b0ee;
  background: rgba(19, 176, 238, 0.16);
}

.webhookDesc {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: #475569;
}

html.dark .webhookDesc {
  color: #94a3b8;
}

.webhookArrow {
  flex-shrink: 0;
  font-size: 18px;
  color: #94a3b8;
  transition: transform 0.18s ease, color 0.18s ease;
}

.webhookCard:hover .webhookArrow {
  transform: translateX(2px);
  color: #0369a1;
}

html.dark .webhookCard:hover .webhookArrow {
  color: #67e8f9;
}

.apiTabs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 4px;
  background: #f1f5f9;
  border-radius: 10px;
  margin-bottom: 16px;
}

html.dark .apiTabs {
  background: #1e293b;
}

.apiTab {
  flex: 1;
  min-width: 0;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  background: transparent;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.apiTab:hover {
  color: #0f172a;
}

html.dark .apiTab {
  color: #94a3b8;
}

html.dark .apiTab:hover {
  color: #f1f5f9;
}

.apiTab--active {
  background: #ffffff;
  color: #0f172a;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}

html.dark .apiTab--active {
  background: #0f172a;
  color: #f1f5f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.endpointRow {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  margin: 0 8px;
  background: #0f172a;
  border-radius: 8px;
  overflow-x: auto;
}

html.dark .endpointRow {
  background: #020617;
}

.methodChip {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #ffffff;
  padding: 3px 8px;
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.method--post { background: #16a34a; }
.method--patch { background: #ea580c; }
.method--get { background: #0284c7; }
.method--delete { background: #dc2626; }

.endpointUrl {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
  color: #e2e8f0;
  white-space: nowrap;
  background: transparent;
  padding: 0;
}

.payloadLabel {
  margin: 16px 8px 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
}

html.dark .payloadLabel {
  color: #64748b;
}

.payload {
  margin: 0 8px;
}

.payload :deep(.json-sample) {
  margin: 0;
}

.apiFooter {
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
  padding: 0 8px;
}

.docsLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #0369a1;
  text-decoration: none;
}

.docsLink:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

html.dark .docsLink {
  color: #67e8f9;
}

.docsArrow {
  transition: transform 0.18s ease;
}

.docsLink:hover .docsArrow {
  transform: translateX(2px);
}

@media (max-width: 640px) {
  .apiTab {
    flex: 0 0 auto;
    padding: 8px 12px;
    font-size: 12px;
  }

  .apiTabs {
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .endpointUrl {
    font-size: 12px;
  }

  .webhookCard {
    padding: 16px;
    gap: 14px;
  }

  .webhookArrow {
    display: none;
  }

  .webhookHead {
    flex-wrap: wrap;
  }
}
</style>
