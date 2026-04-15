<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import ClientProjectGrid from './ClientProjectGrid.vue'
import AgencyAnalytics from './AgencyAnalytics.vue'
import AgencyPricing from './AgencyPricing.vue'
</script>

<template>
  <PersonaLanding
    hero-badge="For email marketing agencies"
    hero-title="Growing client lists shouldn't shrink your margins"
    hero-description="Pay per email sent, not per contact stored. Clone proven flows to new clients in minutes. Keep every account fully isolated. 3,000 free sends to start."
    :hero-highlights="['Pay per send', 'Clone flows across clients', 'Full client isolation']"
    :hero-feature-items="[]"
    cta-text="Start free. 3,000 sends included"
    cta-href="https://app.bluefox.email/accounts/create-account"
    testimonial-title="What agency teams say"
    :testimonial-ids="[0, 1, 2]"
    after-pain-stripe="white"
    testimonials-stripe="blue"
    mid-cta-title="Your next client project can be live in 30 minutes."
    mid-cta-description="No subscription, no contact-based billing. Pay only for emails sent."
    mid-cta-stripe="white"
    design-title="One theme library, every client"
    design-description="Build your email themes once, apply brand overrides per client, and reuse them across every campaign. No rebuilding the same design for each account."
    design-stripe="blue"
    automation-title="Clone automations. Target with segments."
    automation-description="Clone flows between projects, apply brand overrides, and define segments with AND/OR conditions to target the right contacts per account. No rebuilding the same logic twice."
    automation-stripe="white"
    :show-analytics="false"
    deliverability-stripe="blue"
    integrations-stripe="white"
    bottom-stripe="blue"
    final-cta-stripe="white"
    final-title="Run a tighter email agency operation"
    final-description="Less rebuilding, better margins, and clean per-client reporting. All from one account."
  >
    <template #afterPain>
      <ClientProjectGrid />
    </template>
    <template #deliverabilityContent>
      <AgencyPricing />
    </template>
    <template #bottom>
      <AgencyAnalytics />
    </template>
  </PersonaLanding>
</template>
