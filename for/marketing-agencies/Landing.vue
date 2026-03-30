<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import AgencyWorkflowPanel from './AgencyWorkflowPanel.vue'
import ClientProjectGrid from './ClientProjectGrid.vue'
import AgencyRenderingQA from './AgencyRenderingQA.vue'
import AgencyClientHealth from './AgencyClientHealth.vue'
import AgencyAnalytics from './AgencyAnalytics.vue'
import AgencyPricing from './AgencyPricing.vue'

const heroFeatureItems = [
  {
    title: 'Isolated client workspaces',
    description: 'Every client gets its own project with contacts, templates, automations, and analytics fully separated.',
    anchor: 'after-pain'
  },
  {
    title: 'Reusable production kits',
    description: 'Clone templates and automations across accounts. Build once, deploy everywhere with brand overrides and per-client segments.',
    anchor: 'design-system'
  },
  {
    title: 'Margin-first pricing',
    description: 'Pay for emails sent, not for growing contact lists. Margins hold as client databases scale.',
    anchor: 'analytics-title'
  }
]
</script>

<template>
  <PersonaLanding
    hero-badge="For Marketing Agencies"
    hero-title="Scale Client Email Without Agency Chaos"
    hero-description="Run multi-client programs from isolated workspaces with repeatable systems your team can execute at speed."
    :hero-highlights="['Reusable production', 'Segment-based targeting', 'Margin-friendly model']"
    hero-feature-title="Built for multi-client agency operations"
    hero-feature-subtitle="One account. Every client fully isolated. Zero cross-contamination."
    :hero-feature-items="heroFeatureItems"
    cta-text="Start Your Agency Account"
    cta-href="https://app.bluefox.email/accounts/create-account"
    :pain-points="[]"
    testimonial-title="What Agency Teams Say"
    :testimonial-ids="[0, 1, 2]"
    mid-cta-title="Run every client from one place."
    mid-cta-description="Start free. First client project live in under 30 minutes. No subscription, pay only for emails sent."
    design-title="One Design System, Every Client"
    design-description="Build your component library once, apply brand overrides per client, and ship campaigns without starting from scratch each time."
    design-pain="Reusable systems rarely survive copy-paste between client accounts."
    automation-title="Clone Automations. Target With Segments."
    automation-description="Clone flows between projects, apply brand overrides, and define segments with AND/OR conditions to target exactly the right contacts per account. No rebuilding the same logic twice."
    automation-pain="Proven automations get rebuilt from scratch for every new client."
    rendering-pain="Client campaigns fail rendering checks at the last minute, burning hours on QA you didn't plan for."
    deliverability-pain="One client's bad list can drag down your whole agency's sending reputation."
    analytics-title="Clear Reports, Fast"
    analytics-description="Per-project analytics are clean and visual. Client reviews become straightforward, retainer conversations get easier."
    analytics-pain="Reporting takes longer than the campaign itself. Data is scattered, client reviews slow down."
    final-title="Run a Tighter Agency Email Operation"
    final-description="Less rework, better output, and clearer performance data across every client."
  >
    <template #afterPain>
      <ClientProjectGrid />
    </template>
    <template #renderingContent>
      <AgencyRenderingQA />
    </template>
    <template #deliverabilityContent>
      <AgencyClientHealth />
    </template>
    <template #analyticsContent>
      <AgencyAnalytics />
    </template>
    <template #bottom>
      <AgencyPricing />
      <AgencyWorkflowPanel />
    </template>
  </PersonaLanding>
</template>
