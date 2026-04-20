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
    text: 'Send transactional email',
    url: 'https://api.bluefox.email/v1/send-transactional',
    method: 'POST'
  },
  {
    value: 'tab-4',
    text: 'Send triggered email',
    url: 'https://api.bluefox.email/v1/send-triggered',
    method: 'POST'
  }
]

function getTabItem () {
  return tabs.find(item => item.value === tab.value)
}
</script>

<template>
<div class="connectGrid">
  <article class="connectCard">
    <div class="cardHead">
      <span class="cardTag">Quick setup</span>
      <span class="cardEffort">~5 min</span>
    </div>
    <h3 class="cardTitle">Access Keys</h3>
    <p class="cardBody">Connect with your Access Key ID and Secret Access Key. Simple, fast, fewer moving parts. Less secure than STS, credentials live until you rotate them.</p>
    <ul class="cardMeta">
      <li><span class="metaDot"></span> Long-lived credentials</li>
      <li><span class="metaDot"></span> Best for trying things out</li>
    </ul>
  </article>

  <article class="connectCard connectCard--featured">
    <span class="featuredBadge">Recommended</span>
    <div class="cardHead">
      <span class="cardTag cardTag--primary">Most secure</span>
      <span class="cardEffort">~10 min</span>
    </div>
    <h3 class="cardTitle">STS</h3>
    <p class="cardBody">Temporary credentials via AWS STS. Limited scope, time-bound, revocable. You stay in control of permissions and can pull access at any time.</p>
    <ul class="cardMeta">
      <li><span class="metaDot metaDot--primary"></span> Short-lived, auto-rotating</li>
      <li><span class="metaDot metaDot--primary"></span> Production-grade</li>
    </ul>
  </article>

  <article class="connectCard">
    <div class="cardHead">
      <span class="cardTag">Automated</span>
      <span class="cardEffort">~3 min</span>
    </div>
    <h3 class="cardTitle">CloudFormation Script</h3>
    <p class="cardBody">AWS-native script to provision everything safely. Review the template, click deploy, done.</p>
    <ul class="cardMeta">
      <li><span class="metaDot"></span> One-click deploy</li>
      <li><span class="metaDot"></span> Up and running in minutes</li>
    </ul>
  </article>
</div>
</template>

<style scoped>
.connectGrid {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: stretch;
}

.connectCard {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 28px 24px 24px;
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px -8px rgba(15, 23, 42, 0.08);
}

.connectCard--featured {
  padding-top: 40px;
}

.connectCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -16px rgba(15, 23, 42, 0.18);
}

html.dark .connectCard {
  background: #0f172a;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 4px 12px -8px rgba(0, 0, 0, 0.5);
}

html.dark .connectCard:hover {
  box-shadow: 0 12px 28px -16px rgba(0, 0, 0, 0.7);
}

.connectCard--featured {
  background: linear-gradient(180deg, rgba(19, 176, 238, 0.05), rgba(57, 44, 145, 0.02));
}

html.dark .connectCard--featured {
  background: linear-gradient(180deg, rgba(19, 176, 238, 0.08), rgba(138, 126, 216, 0.04));
}

.featuredBadge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 14px 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  background: linear-gradient(120deg, #392c91 5%, #13b0ee);
  border-radius: 0 0 8px 8px;
  line-height: 1.4;
  white-space: nowrap;
  z-index: 1;
}

html.dark .featuredBadge {
  background: linear-gradient(120deg, #8a7ed8 5%, #13b0ee);
}

.cardHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.cardTag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  padding: 4px 10px;
  background: #f1f5f9;
  border-radius: 6px;
}

html.dark .cardTag {
  color: #94a3b8;
  background: #1e293b;
}

.cardTag--primary {
  color: #392c91;
  background: rgba(19, 176, 238, 0.12);
}

html.dark .cardTag--primary {
  color: #13b0ee;
  background: rgba(19, 176, 238, 0.16);
}

.cardEffort {
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  font-variant-numeric: tabular-nums;
}

html.dark .cardEffort {
  color: #64748b;
}

.cardTitle {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
  color: #0f172a;
  border-top: 0 !important;
  padding-top: 0 !important;
}

html.dark .cardTitle {
  color: #f1f5f9;
}

.cardBody {
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.6;
  color: #475569;
  flex: 1;
}

html.dark .cardBody {
  color: #94a3b8;
}

.cardMeta {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #e2e8f0;
  padding-top: 14px;
}

html.dark .cardMeta {
  border-top-color: #1e293b;
}

.cardMeta li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  line-height: 1.4;
  color: #475569;
}

html.dark .cardMeta li {
  color: #cbd5e1;
}

.metaDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #cbd5e1;
  flex-shrink: 0;
}

html.dark .metaDot {
  background: #475569;
}

.metaDot--primary {
  background: linear-gradient(135deg, #13b0ee, #392c91);
}

html.dark .metaDot--primary {
  background: linear-gradient(135deg, #13b0ee, #8a7ed8);
}

@media (max-width: 960px) {
  .connectGrid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
