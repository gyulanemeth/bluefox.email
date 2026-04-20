<script setup>
import { useData } from 'vitepress'
import { useDisplay } from 'vuetify'
import PersonaLanding from '../components/PersonaLanding.vue'
import HeroUnitAWS from '../../.vitepress/theme/HeroUnitAWS.vue'
import ConnectAWS from '../../.vitepress/theme/ConnectAWS.vue'
import IntegrationAWS from '../../.vitepress/theme/IntegrationAWS.vue'
import SendQueues from '../../.vitepress/theme/SendQueues.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'

const { isDark } = useData()
const { xs } = useDisplay()
</script>

<template>
  <HeroUnitAWS />

  <PersonaLanding
    :show-hero="false"
    hero-badge=""
    hero-title=""
    hero-description=""
    cta-text="Supercharge Your Amazon SES"
    cta-href="https://app.bluefox.email/accounts/create-account"
    testimonial-title="Feedback from Amazon SES users"
    :testimonial-ids="[1, 0, 2, 3, 4, 5]"
    mid-cta-title="Keep SES. Skip the missing pieces."
    mid-cta-description="3,000 free sends per month for your first year. No subscription required."
    design-title="Design stunning emails without writing a line of code"
    design-description="With Amazon SES, you're stuck hand-coding HTML and fixing rendering bugs. BlueFox Email lets you skip the code and design emails with drag & drop that work everywhere, including Outlook."
    automation-title="Effortless email automations"
    automation-description="Building automated email workflows on raw SES needs custom code. BlueFox Email gives you onboarding sequences, re-engagement campaigns, and event-based triggers without writing glue code."
    :show-integrations="false"
    final-title="Get more from SES today"
    final-description="3,000 free sends per month for your first year. No subscription required."
    testimonials-stripe="white"
    mid-cta-stripe="blue"
    design-stripe="white"
    automation-stripe="blue"
    deliverability-stripe="white"
    analytics-stripe="blue"
    bottom-stripe="white"
    extra-stripe="blue"
    final-cta-stripe="white"
  >
    <template #deliverabilityContent>
      <section class="ses-section" aria-labelledby="connect-title">
        <h2 id="connect-title" class="ses-title">Connect quickly &amp; securely</h2>
        <p class="ses-desc">You can be fully set up (including bounces &amp; complaints via SNS) in just a few minutes. Pick the method that fits your workflow.</p>
        <ConnectAWS class="mt-6" :is-dark="isDark" :xs="xs" />
      </section>
    </template>

    <template #analyticsContent>
      <AgencyAnalytics
        title="Analytics SES doesn't give you"
        description="Skip the bare-bones SES reports. Track opens, clicks, bounces, and subscriber trends with views built for fast diagnosis."
        default-tab="hourly"
      />
    </template>

    <template #bottom>
      <div class="ses-stack">
        <SendQueues />
      </div>
    </template>

    <template #extra>
      <section class="api-block">
        <h2 id="api-title" class="ses-title">Simple, technology-agnostic API</h2>
        <p class="ses-desc">Whether you use Node, Python, Go, Ruby, PHP, or anything else, send emails, manage lists, and trigger automations in a few lines. Make SES feel like a modern email platform.</p>
        <IntegrationAWS class="mt-6" :is-dark="isDark" :xs="xs">
            <template #tab-1>
              <pre class="json-sample"><code>{
  "name": "Jon Doe",
  "email": "jon@doe.com"
}</code></pre>
            </template>
            <template #tab-2>
              <pre class="json-sample"><code>{
  "status": "unsubscribed"
}</code></pre>
            </template>
            <template #tab-3>
              <pre class="json-sample"><code>{
  "email": "jon@doe.com",
  "transactionalId": "##EMAIL_ID##",
  "data": {
    "example": "example merge tag value"
  },
  "attachments": [
    {
      "fileName": "example.txt",
      "content": "Ymx1ZWZveC5lbWFpbCBhdHRhY2htZW50IGV4YW1wbGUh"
    }
  ]
}</code></pre>
            </template>
            <template #tab-4>
              <pre class="json-sample"><code>{
  "emails": ["jon@doe.com"],
  "triggeredId": "##EMAIL_ID##",
  "data": {
    "example": "example merge tag value"
  },
  "attachments": [
    {
      "fileName": "example.txt",
      "content": "Ymx1ZWZveC5lbWFpbCBhdHRhY2htZW50IGV4YW1wbGUh"
    }
  ]
}</code></pre>
            </template>
        </IntegrationAWS>
      </section>
    </template>
  </PersonaLanding>
</template>

<style scoped>
.ses-section,
.api-block {
  padding: 0;
}

.ses-title {
  margin: 0 0 12px;
  font-size: clamp(24px, 3.5vw, 38px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.ses-desc {
  margin: 0 0 24px;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 760px;
}

html.dark .ses-desc {
  color: #94a3b8;
}

.ses-stack {
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.json-sample {
  margin: 12px 0 0;
  padding: 16px 20px;
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
  line-height: 1.55;
  overflow-x: auto;
}

html.dark .json-sample {
  background: #020617;
}

.ses-stack :deep(.deliverabilityDiv) {
  position: static;
  left: auto;
  width: 100%;
  background: transparent;
  padding: 0 !important;
}

html.dark .ses-stack :deep(.deliverabilityDiv) {
  background: transparent;
}
</style>
