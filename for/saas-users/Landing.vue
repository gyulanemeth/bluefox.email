<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import SaaSApiTasksTable from './SaaSApiTasksTable.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'
</script>

<template>
  <PersonaLanding
    hero-badge="For SaaS teams"
    hero-title="From signup to win-back: one email platform for your SaaS"
    hero-description="Run transactional, triggered, and marketing emails from a single platform. Fire flows straight from product events. Pay per send. 3,000 free to start."
    :hero-highlights="['One platform, every email', 'Built to grow MRR', 'Pay per send, not per contact']"
    :hero-feature-items="[]"
    cta-text="Start free. 3,000 sends included"
    cta-href="https://app.bluefox.email/accounts/create-account"
    testimonial-title="SaaS teams trust BlueFox Email for production-grade email"
    :testimonial-ids="[4, 5]"
    testimonials-stripe="white"
    mid-cta-title="Your first triggered flow can ship today."
    mid-cta-description="No credit card, no subscription. Wire up onboarding, dunning, or win-back from your product events in minutes."
    mid-cta-stripe="blue"
    design-title="Every email on-brand, every time"
    design-description="Build component blocks once and reuse them everywhere. Onboarding sequences, transactional receipts, billing notices, usage alerts, retention nudges, win-back campaigns, every email stays on-brand without rebuilding from scratch. One design system, every email type."
    design-stripe="white"
    automation-title="Lifecycle automation that drives MRR"
    automation-description="Trigger flows from any product event via API. Onboarding, activation, expansion, win-back, every stage compounds into retention and revenue. AND/OR segments target users by plan, activity, or stage. No engineering ticket to adjust."
    automation-stripe="blue"
    deliverability-stripe="white"
    analytics-stripe="blue"
    :show-integrations="false"
    final-cta-stripe="white"
    final-title="Email that scales with your SaaS"
    final-description="Onboarding, activation, retention, expansion, win-back. Transactional, triggered, marketing. One platform, one API, one price per send."
  >
    <template #deliverabilityContent>
      <SaaSApiTasksTable />
    </template>
    <template #analyticsContent>
      <AgencyAnalytics
        title="Email analytics built for product teams"
        description="Track delivery, engagement, and conversion in one place. Product and growth teams optimize onboarding, retention, and win-back based on outcomes, not guesswork."
        default-tab="hourly"
      />
    </template>
  </PersonaLanding>
</template>
