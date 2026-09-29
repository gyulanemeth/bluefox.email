<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import SaaSApiTasksTable from './SaaSApiTasksTable.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'
import SaaSMcp from './SaaSMcp.vue'
</script>

<template>
  <PersonaLanding
    hero-badge=""
    hero-brand-bg
    center-section-titles
    hero-title="Every email on-brand, sent from one platform"
    hero-description="Send transactional, triggered, and marketing emails with a simple API and webhooks, and run your project from an AI agent over MCP. Pay per send, not per contact."
    :hero-highlights="['API, webhooks, and MCP', 'No subscription', 'Credits valid 12 months']"
    :hero-feature-items="[]"
    cta-text="Start free. 3,000 sends included"
    cta-href="https://app.bluefox.email/accounts/create-account"
    testimonial-title="What SaaS teams say"
    :testimonial-ids="[5, 6]"
    simple-testimonials
    testimonials-stripe="white"
    mid-cta-title="Connect your backend and send your first email in minutes."
    mid-cta-description="No credit card and no subscription. Pay only for the emails you send."
    mid-cta-stripe="blue"
    design-title="One design system for every email type"
    design-description="Build your brand theme once and reuse it across transactional emails, triggered flows, and campaigns."
    design-stripe="white"
    automation-title="Automations triggered by product events"
    automation-description="Start a flow from any event in your product, from onboarding through win-back."
    automation-stripe="blue"
    deliverability-stripe="white"
    analytics-stripe="blue"
    bottom-stripe="white"
    :show-integrations="false"
    final-cta-stripe="blue"
    final-title="Run all your product email from one place"
    final-description="Transactional, triggered, and marketing emails from one account, billed per send."
  >
    <template #deliverabilityContent>
      <AgencyAnalytics
        title="Email analytics for every project"
        description="Delivery, opens, clicks, and bounces at a glance, by hour, day, week, or month."
        :show-badge="false"
      />
    </template>
    <template #analyticsContent>
      <SaaSApiTasksTable />
    </template>
    <template #bottom>
      <SaaSMcp />
    </template>
  </PersonaLanding>
</template>

<style scoped>
/* AgencyAnalytics is a single-root component, so :deep() reaches its header.
   PersonaLanding's own titles are centered via its center-section-titles prop. */
:deep(.analytics-head) {
  text-align: center;
}

:deep(.analytics-head p) {
  margin-left: auto;
  margin-right: auto;
}
</style>
