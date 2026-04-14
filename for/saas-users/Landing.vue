<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import SaaSApiTasksTable from './SaaSApiTasksTable.vue'
import LifecycleStageCards from './LifecycleStageCards.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'

const heroFeatureItems = [
  {
    title: 'Full lifecycle coverage',
    description: 'Onboarding, activation, retention, expansion, win-back, all in one platform with one API and one design system.',
    anchor: 'after-pain'
  },
  {
    title: 'Fire emails from your product',
    description: '4 endpoints. Trigger transactional, lifecycle, and marketing sends directly from product events.',
    anchor: 'deliverability'
  },
  {
    title: 'Pay per send, not per contact',
    description: 'No monthly fee for a list you barely email. Costs scale with activity, not list size.',
    anchor: 'analytics-title'
  }
]
</script>

<template>
  <PersonaLanding
    hero-badge="For SaaS Teams"
    hero-title="From Signup to Win-Back: One Platform, One API"
    hero-description="3,000 free sends to start. Trigger lifecycle emails from product events, manage every stage in one place, and pay only for what you send."
    :hero-highlights="['3,000 free sends', 'API-triggered emails', 'Pay per send']"
    hero-feature-title="Built for product-led SaaS teams"
    hero-feature-subtitle="One platform covering every stage from signup to win-back."
    :hero-feature-items="heroFeatureItems"
    cta-text="Start Free. 3,000 Sends Included"
    cta-href="https://app.bluefox.email/accounts/create-account"
    :pain-points="[]"
    testimonial-title="Teams Trust BlueFox Email for Production-Grade Email"
    :testimonial-ids="[4, 5]"
    mid-cta-title="Your first lifecycle flow can go live today."
    mid-cta-description="No credit card, no subscription. Start free, scale on your own terms."
    design-title="One Design System Across Every Email Type"
    design-description="Build component blocks once and reuse them across welcome sequences, invoices, usage alerts, and win-back flows. Lifecycle emails stay on-brand without rebuilding from scratch."
    design-pain="Why does every campaign start with a copy-paste from the last one?"
    automation-title="Build Once. Trigger From Anywhere."
    automation-description="Define your lifecycle flows visually, then fire them from any product event via API. AND/OR segment conditions let you target exactly the right users. No engineering ticket required to adjust targeting."
    automation-pain="Why does tweaking one onboarding email need a sprint ticket?"
    analytics-title="Email Analytics for Product Teams"
    analytics-description="Track delivery health, engagement, and subscription trends in one place. Product and growth teams can optimize lifecycle journeys based on outcomes, not guesswork."
    analytics-pain="Which of your lifecycle emails is actually driving retention?"
    :show-integrations="false"
    final-title="Lifecycle Email That Scales With Your Product"
    final-description="Launch faster, maintain quality, and grow confidently: one platform, one API, one price per send."
  >
    <template #afterPain>
      <LifecycleStageCards />
    </template>
    <template #deliverabilityContent>
      <SaaSApiTasksTable />
    </template>
    <template #analyticsContent>
      <AgencyAnalytics />
    </template>
  </PersonaLanding>
</template>
