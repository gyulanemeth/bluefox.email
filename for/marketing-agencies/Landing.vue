<script setup>
import { useData } from 'vitepress'
import { useDisplay } from 'vuetify'
import PersonaLanding from '../components/PersonaLanding.vue'
import ClientProjectGrid from './ClientProjectGrid.vue'
import AgencyAnalytics from './AgencyAnalytics.vue'
import AgencyPricing from './AgencyPricing.vue'
import TemplateShowcase from '../../.vitepress/theme/TemplateShowcase.vue'

const { isDark } = useData()
const { lgAndUp, md, sm, xs } = useDisplay()
</script>

<template>
  <PersonaLanding
    hero-badge=""
    hero-brand-bg
    center-section-titles
    hero-title="One email platform for every client"
    hero-description="Pay per email sent, not per contact stored. Clone proven flows to new clients in minutes, and keep every account fully isolated."
    :hero-highlights="['No subscription', 'Unlimited clients per project', 'Credits valid 12 months']"
    :hero-feature-items="[]"
    cta-text="Start free. 3,000 sends included"
    cta-href="https://app.bluefox.email/accounts/create-account"
    testimonial-title="What agency teams say"
    :testimonial-ids="[0, 1, 2]"
    simple-testimonials
    after-pain-stripe="white"
    testimonials-stripe="blue"
    mid-cta-title="Your next client project can be live in 30 minutes."
    mid-cta-description="No subscription, no contact-based billing. Pay only for emails sent."
    mid-cta-stripe="white"
    design-title="One theme library for every client"
    design-description="Build your email theme once, then apply brand overrides per client, colors, logo, fonts, and reuse it across every campaign."
    design-stripe="blue"
    automation-title="Clone automations, then target with segments"
    automation-description="Clone flows between projects, apply brand overrides, and define segments with AND/OR conditions to target the right contacts in each account."
    automation-stripe="white"
    analytics-stripe="white"
    deliverability-stripe="blue"
    integrations-stripe="blue"
    final-cta-stripe="white"
    final-title="Run every client account from one place"
    final-description="Less rebuilding, better margins, and clean per-client reporting. All from one account."
  >
    <template #heroVisual>
      <TemplateShowcase
        :is-dark="isDark"
        :lg-and-up="lgAndUp"
        :md="md"
        :sm="sm"
        :xs="xs"
      />
    </template>
    <template #afterPain>
      <ClientProjectGrid />
    </template>
    <template #deliverabilityContent>
      <AgencyAnalytics :interactive="false" :show-badge="false" />
    </template>
    <template #analyticsContent>
      <AgencyPricing />
    </template>
  </PersonaLanding>
</template>

<style scoped>
/* Testimonials/design/automation titles are centered via PersonaLanding's own
   center-section-titles prop (see PersonaLanding.vue) — a parent :deep()
   selector can't reach them since PersonaLanding renders as sibling root
   elements, not a single root, so Vue never forwards this scope attribute in.
   AgencyAnalytics/AgencyPricing are single-root components, so :deep() does
   reach their headers below. Mid-cta/final-cta are already centered by
   PersonaLanding's own styles; hero stays left-aligned, it's a two-column
   split against the template-showcase visual. */
:deep(.analytics-head),
:deep(.pricing-head) {
  text-align: center;
}

:deep(.analytics-head p),
:deep(.pricing-head p) {
  margin-left: auto;
  margin-right: auto;
}
</style>
