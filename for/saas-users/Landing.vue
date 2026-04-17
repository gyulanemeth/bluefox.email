<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import SaaSApiTasksTable from './SaaSApiTasksTable.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'
</script>

<template>
  <PersonaLanding
    hero-badge="For SaaS teams"
    hero-title="Every email on-brand, sent from one platform."
    hero-description="Transactional, promotional, and automated emails, all on-brand. Integrate with a simple API and webhooks. Pay per send, not per contact."
    :hero-highlights="['Every email type, one platform', 'On-brand by default', 'Pay per send, not per contact']"
    :hero-feature-items="[]"
    cta-text="Start free. 3,000 sends included"
    cta-href="https://app.bluefox.email/accounts/create-account"
    testimonial-title="SaaS teams trust BlueFox Email for production-grade email"
    :testimonial-ids="[4, 5]"
    testimonials-stripe="white"
    mid-cta-title="Start sending in minutes, not days."
    mid-cta-description="No credit card, no subscription. Connect your backend, send your first email, and scale from there."
    mid-cta-stripe="blue"
    design-title="Every email on-brand, every time"
    design-description="Transactional, triggered, promotional, newsletters. Build your design system once and reuse it across every email type. No rebuilding per campaign."
    design-stripe="white"
    automation-title="Lifecycle automation that drives MRR"
    automation-description="Trigger flows from any product event. Onboarding to win-back, every stage compounds into retention and revenue."
    automation-stripe="blue"
    deliverability-stripe="white"
    analytics-stripe="blue"
    :show-integrations="false"
    final-cta-stripe="white"
    final-title="Email that scales with your SaaS"
    final-description="Transactional, triggered, marketing. One platform, one API, one price per send."
  >
    <template #deliverabilityContent>
      <SaaSApiTasksTable />
    </template>
    <template #analyticsContent>
      <AgencyAnalytics
        title="Email analytics built for product teams"
        description="Track delivery, engagement, and conversion in one place. Optimize on outcomes, not guesswork."
        default-tab="hourly"
      />
    </template>
  </PersonaLanding>
</template>
