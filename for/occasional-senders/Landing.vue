<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import PricingSnapshot from './PricingSnapshot.vue'
import HeroEmailPreview from './HeroEmailPreview.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'
</script>

<template>
  <PersonaLanding
    hero-badge="For Occasional Senders"
    hero-title="Professional Campaigns, Only When You Need Them"
    hero-description="Send when you have something to say. Buy credits once, valid for 12 months. No subscription, no recurring bill."
    :hero-highlights="['12-month credits', 'No subscription', 'Simple segmentation']"
    :hero-feature-items="[]"
    cta-text="Create Your Free Account"
    cta-href="https://app.bluefox.email/accounts/create-account"
    :pain-points="[]"
    :show-testimonials="false"
    mid-cta-title="3,000 free sends to get started."
    mid-cta-description="Credits are valid for 12 months from purchase. Buy more only when you need to. No subscription required."
    design-title="Templates That Stay Consistent"
    design-description="Start from polished, reusable layouts every time. Brand stays consistent between campaigns without manual cleanup each send."
    :show-automation="false"
    :show-integrations="false"
    analytics-title="See What Worked After Every Send"
    analytics-description="Track open rates, clicks, bounces, and subscriber trends after each campaign. Know what landed, what to improve, and who to target next time."
    final-title="Professional Campaigns When You Need Them"
    final-description="No subscription. No complexity. Just credits you use when you have something worth sending."
    after-pain-stripe="white"
    analytics-stripe="blue"
    final-cta-stripe="white"
  >
    <template #heroVisual>
      <HeroEmailPreview />
    </template>
    <template #afterPain>
      <PricingSnapshot />
    </template>
    <template #analyticsContent>
      <AgencyAnalytics
        title="See What Worked After Every Send"
        description="Track opens, clicks, bounces, and subscriber trends right after each campaign. Know what landed, what to fix, and who to follow up with next time."
        default-tab="hourly"
      />
    </template>
  </PersonaLanding>
</template>
