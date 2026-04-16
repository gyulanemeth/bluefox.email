<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import SaaSApiTasksTable from './SaaSApiTasksTable.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'
</script>

<template>
  <PersonaLanding
    hero-badge="For SaaS teams"
    hero-title="From signup to win-back, on one platform."
    hero-description="Transactional, triggered, and marketing, fire them all from product events. Pay per send. 3,000 free to start."
    :hero-highlights="['One platform, every email', 'Built to grow MRR', 'Pay per send, not per contact']"
    :hero-feature-items="[]"
    cta-text="Start free. 3,000 sends included"
    cta-href="https://app.bluefox.email/accounts/create-account"
    testimonial-title="SaaS teams trust BlueFox Email for production-grade email"
    :testimonial-ids="[4, 5]"
    testimonials-stripe="white"
    mid-cta-title="Your first triggered flow can ship today."
    mid-cta-description="No card, no subscription. Wire up onboarding, dunning, or win-back in minutes."
    mid-cta-stripe="blue"
    design-title="Every email on-brand, every time"
    design-description="Build blocks once, reuse them everywhere. Onboarding, receipts, billing, alerts, win-back, all on-brand, no rebuilding."
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
