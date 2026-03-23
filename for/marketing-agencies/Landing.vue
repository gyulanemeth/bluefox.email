<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import AgencyWorkflowPanel from './AgencyWorkflowPanel.vue'
import ClientProjectGrid from './ClientProjectGrid.vue'
import AgencyRenderingQA from './AgencyRenderingQA.vue'
import AgencyClientHealth from './AgencyClientHealth.vue'

const painPoints = [
  {
    title: 'Juggling client workflows at scale breaks focus',
    description: 'Each client has unique approvals, lists, assets, and deadlines, but most tools are built for single-brand teams, not multi-client operations.',
    impact: 'Operational overload'
  },
  {
    title: 'Reusable systems are never actually reused',
    description: 'Templates and automations get copied inconsistently, so teams rebuild proven work from scratch every month instead of levering what already works.',
    impact: 'Rework every cycle'
  },
  {
    title: 'Rendering QA steals billable hours from strategy',
    description: 'Broken layouts and client-specific QA cycles consume time that should go toward campaign performance and strategic value.',
    impact: 'Lower delivery margin'
  },
  {
    title: 'Reporting takes longer than the campaigns themselves',
    description: 'Collecting, cleaning, and formatting data for stakeholder reports becomes a recurring monthly bottleneck that slows client communication.',
    impact: 'Delayed client updates'
  },
  {
    title: 'Deliverability failures damage client relationships',
    description: 'When campaigns land in spam, agencies take the blame first, even when the root cause takes time to diagnose and fix.',
    impact: 'Client retention risk'
  },
  {
    title: 'Contact-based pricing destroys margin at scale',
    description: 'Plans that charge per contact raise costs as client databases grow, even when your team sends efficiently and strategically.',
    impact: 'Profit pressure'
  }
]

const heroFeatureItems = [
  {
    title: 'Isolated client workspaces',
    description: 'Every client gets its own project with contacts, templates, automations, and analytics fully separated.'
  },
  {
    title: 'Reusable production kits',
    description: 'Clone templates and automations across accounts. Build once, deploy everywhere with brand overrides.'
  },
  {
    title: 'Margin-first pricing',
    description: 'Pay for emails sent, not for growing contact lists. Margins hold as client databases scale.'
  }
]
</script>

<template>
  <PersonaLanding
    hero-badge="For Marketing Agencies"
    hero-title="Scale Client Email Without Agency Chaos"
    hero-description="Run multi-client programs from isolated workspaces with repeatable systems your team can execute at speed."
    :hero-highlights="['Reusable production', 'Client-ready reporting', 'Margin-friendly model']"
    hero-feature-title="Built for multi-client agency operations"
    hero-feature-subtitle="One account. Every client fully isolated. Zero cross-contamination."
    :hero-feature-items="heroFeatureItems"
    cta-text="Start Your Agency Account"
    cta-href="https://app.bluefox.email/accounts/create-account"
    pain-title="Agency Growth Should Not Break Your Email Operations"
    pain-subtitle="As your client count increases, fragmented tools and repetitive production work erode profitability and stretch your team's capacity."
    :pain-points="painPoints"
    testimonial-title="Agency Teams Choose BlueFox for Operational Clarity"
    mid-cta-title="Ready to run every client from one clean system?"
    mid-cta-description="Start free and bring your first client project live in under 30 minutes. No subscription, pay only for the emails you send."
    design-title="Standardize Production with a Reusable Client Design System"
    design-description="Build component libraries once, apply brand-specific overrides per client, and launch polished campaigns across accounts without starting from zero every time."
    automation-title="Deploy Automations Faster Across Multiple Clients"
    automation-description="Ship onboarding, retention, and promotional flows quickly by cloning proven automations between projects while preserving each client's brand voice and segmentation logic."
    analytics-title="Deliver Client-Ready Reporting in Minutes"
    analytics-description="Export clean, visual analytics that help clients understand performance clearly, making retainer renewals, upsells, and strategy conversations much easier."
    final-title="Build a Higher-Margin Agency Email Operation"
    final-description="Use one platform to reduce rework, improve quality, and prove performance at scale across your entire client portfolio."
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
    <template #bottom>
      <AgencyWorkflowPanel />
    </template>
  </PersonaLanding>
</template>
