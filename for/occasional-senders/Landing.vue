<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import PricingSnapshot from './PricingSnapshot.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'

const heroFeatureItems = [
  {
    title: 'Pay only for what you send',
    description: 'Buy a credit pack once. Valid for 12 months. No monthly subscription between campaigns.',
    anchor: 'after-pain'
  },
  {
    title: 'Up and running in minutes',
    description: 'Start from polished templates every time. No blank canvas, no complex setup.',
    anchor: 'design-system'
  },
  {
    title: 'Target the right people',
    description: 'Build simple segments to send to the right contacts. Filter by any property with AND/OR conditions.',
    anchor: 'analytics-title'
  }
]
</script>

<template>
  <PersonaLanding
    hero-badge="For Occasional Senders"
    hero-title="Professional Campaigns, Only When You Need Them"
    hero-description="Send when you have something to say. Buy credits once, valid for 12 months. No subscription, no recurring bill."
    :hero-highlights="['12-month credits', 'No subscription', 'Simple segmentation']"
    hero-feature-title="Built for teams that send a few times a year"
    hero-feature-subtitle="Pick it up whenever you need it. Put it down when you don't."
    :hero-feature-items="heroFeatureItems"
    cta-text="Create Your Free Account"
    cta-href="https://app.bluefox.email/accounts/create-account"
    pain-title=""
    pain-subtitle=""
    :pain-points="[]"
    :show-testimonials="false"
    mid-cta-title="3,000 free sends to get started."
    mid-cta-description="Credits are valid for 12 months from purchase. Buy more only when you need to. No subscription required."
    :show-design="true"
    design-title="Templates That Stay Consistent"
    design-description="Start from polished, reusable layouts every time. Brand stays consistent between campaigns without manual cleanup each send."
    :show-automation="false"
    :show-integrations="false"
    analytics-title="Segment, Send, and See What Worked"
    analytics-description="Filter contacts into segments so each campaign reaches the right audience. Then track open rates, clicks, and subscriber data. Know what to improve without digging through dashboards."
    final-title="Professional Campaigns When You Need Them"
    final-description="No subscription. No complexity. Just credits you use when you have something worth sending."
  >
    <template #afterPain>
      <PricingSnapshot />
    </template>
    <template #analyticsContent>
      <AgencyAnalytics />
    </template>
  </PersonaLanding>
</template>
