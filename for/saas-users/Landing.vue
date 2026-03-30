<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import SaaSApiTasksTable from './SaaSApiTasksTable.vue'
import LifecycleStageCards from './LifecycleStageCards.vue'
import SaaSRenderingMatrix from './SaaSRenderingMatrix.vue'
import SaaSDeliveryModes from './SaaSDeliveryModes.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'

const heroFeatureItems = [
  {
    title: 'Unified lifecycle stack',
    description: 'Product, marketing, and transactional messaging in one system with one design system, one analytics view, and one segmentation engine.',
    anchor: 'after-pain'
  },
  {
    title: 'API-triggered emails',
    description: 'Fire any email from your product via API, whether transactional, triggered, or lifecycle flows.',
    anchor: 'workflow'
  },
  {
    title: 'Send-based pricing',
    description: 'Pay per email sent, not per contact stored. Your costs scale with activity, not list size.',
    anchor: 'analytics-title'
  }
]
</script>

<template>
  <PersonaLanding
    hero-badge="For SaaS Teams"
    hero-title="Lifecycle Email, Without the Complexity"
    hero-description="Unify product, marketing, and transactional messaging in one clean workflow your whole team can own."
    :hero-highlights="['Faster launches', 'Segment-driven targeting', 'Built for growth']"
    hero-feature-title="Purpose-built for SaaS lifecycle execution"
    hero-feature-subtitle="One platform covering every stage from onboarding to win-back."
    :hero-feature-items="heroFeatureItems"
    cta-text="Start Your SaaS Workspace"
    cta-href="https://app.bluefox.email/accounts/create-account"
    :pain-points="[]"
    testimonial-title="Teams Trust BlueFox Email for Production-Grade Email"
    :testimonial-ids="[4, 5]"
    mid-cta-title="Start building your lifecycle stack."
    mid-cta-description="3,000 free sends when you sign up. No credit card, no subscription. First flow live today."
    design-title="Build Once, Reuse Everywhere"
    design-description="Build a modular design system for your lifecycle emails, then reuse it safely across every product stream without rebuilding from scratch."
    design-pain="Without shared components, templates drift and every campaign introduces inconsistencies."
    automation-title="Automate and Segment Without Engineering Overhead"
    automation-description="Build segments with AND/OR conditions on any contact property, then use them as audience filters in lifecycle flows. Branching logic, targeting precision, no engineering ticket required."
    automation-pain="Onboarding sequence changes shouldn't sit in sprint queues."
    rendering-pain="Lifecycle emails break in Outlook, get clipped in Gmail, and shift in dark mode. Issues only surface when clients report them."
    deliverability-pain="One batch with poor list hygiene can damage the sender reputation your transactional mail depends on."
    analytics-title="Email Analytics for Product Teams"
    analytics-description="Track engagement, delivery health, and subscription trends in one place so product and growth teams can optimize journeys based on outcomes, not guesswork."
    analytics-pain="Email events stay siloed from your product, so lifecycle decisions rely on guesswork."
    final-title="Email That Scales With Your Product"
    final-description="Launch faster, maintain quality, and scale communication confidently with a lifecycle system built for modern product-led growth."
  >
    <template #afterPain>
      <LifecycleStageCards />
    </template>
    <template #renderingContent>
      <SaaSRenderingMatrix />
    </template>
    <template #deliverabilityContent>
      <SaaSDeliveryModes />
    </template>
    <template #analyticsContent>
      <AgencyAnalytics />
    </template>
    <template #bottom>
      <SaaSApiTasksTable />
    </template>
  </PersonaLanding>
</template>
