<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import AgencyWorkflowPanel from './AgencyWorkflowPanel.vue'
import ClientProjectGrid from './ClientProjectGrid.vue'
import AgencyRenderingQA from './AgencyRenderingQA.vue'
import AgencyClientHealth from './AgencyClientHealth.vue'
import AgencyAnalytics from './AgencyAnalytics.vue'

const painPoints = [
  {
    title: 'Juggling client workflows at scale breaks focus',
    description: 'Each client has unique approvals, lists, assets, and deadlines, but most tools are built for single-brand teams, not multi-client operations.',
    impact: 'Operational overload',
    solution: 'BlueFox Email gives each client a fully isolated project. Contacts, templates, automations, and analytics are separated per account so your team switches context cleanly without risk of cross-contamination.'
  },
  {
    title: 'Reusable systems are never actually reused',
    description: 'Templates and automations get copied inconsistently, so teams rebuild proven work from scratch every month instead of levering what already works.',
    impact: 'Rework every cycle',
    solution: 'Clone any template or automation across client accounts in one click, then apply brand-specific overrides without touching the original. Build your production kit once and deploy it everywhere.'
  },
  {
    title: 'Rendering QA steals billable hours from strategy',
    description: 'Broken layouts and client-specific QA cycles consume time that should go toward campaign performance and strategic value.',
    impact: 'Lower delivery margin',
    solution: 'BlueFox Email generates inbox-safe markup automatically. Campaigns render correctly across Gmail, Outlook, and mobile clients without manual QA cycles, freeing your team for higher-value work.'
  },
  {
    title: 'Reporting takes longer than the campaigns themselves',
    description: 'Collecting, cleaning, and formatting data for stakeholder reports becomes a recurring monthly bottleneck that slows client communication.',
    impact: 'Delayed client updates',
    solution: 'Export clean, visual analytics that clients can read directly. Per-project dashboards keep each client\'s data separate, and reports are ready in minutes, not hours.'
  },
  {
    title: 'Deliverability failures damage client relationships',
    description: 'When campaigns land in spam, agencies take the blame first, even when the root cause takes time to diagnose and fix.',
    impact: 'Client retention risk',
    solution: 'Each client project uses isolated sending infrastructure, so one client\'s bounce spike or complaint rate never affects another client\'s sender reputation. Problems stay contained.'
  },
  {
    title: 'Contact-based pricing destroys margin at scale',
    description: 'Plans that charge per contact raise costs as client databases grow, even when your team sends efficiently and strategically.',
    impact: 'Profit pressure',
    solution: 'BlueFox Email charges per email sent, not per contact stored. As client databases grow your costs stay tied to activity, not list size, so margins hold regardless of how large each client scales.'
  }
]

const heroFeatureItems = [
  {
    title: 'Isolated client workspaces',
    description: 'Every client gets its own project with contacts, templates, automations, and analytics fully separated.',
    anchor: 'after-pain'
  },
  {
    title: 'Reusable production kits',
    description: 'Clone templates and automations across accounts. Build once, deploy everywhere with brand overrides.',
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
    :hero-highlights="['Reusable production', 'Client-ready reporting', 'Margin-friendly model']"
    hero-feature-title="Built for multi-client agency operations"
    hero-feature-subtitle="One account. Every client fully isolated. Zero cross-contamination."
    :hero-feature-items="heroFeatureItems"
    cta-text="Start Your Agency Account"
    cta-href="https://app.bluefox.email/accounts/create-account"
    pain-title="More Clients Shouldn't Mean More Chaos"
    pain-subtitle="Most tools weren't built for multi-client work. Fragmented workflows and repeated effort eat into your margin as you scale."
    :pain-points="painPoints"
    testimonial-title="What Agency Teams Say"
    :testimonial-ids="[0, 1, 2]"
    mid-cta-title="Run every client from one place."
    mid-cta-description="Start free. First client project live in under 30 minutes. No subscription, pay only for emails sent."
    design-title="One Design System, Every Client"
    design-description="Build your component library once, apply brand overrides per client, and ship campaigns without starting from scratch each time."
    automation-title="Clone Automations Across Clients"
    automation-description="Clone proven flows between client projects and apply brand overrides per account. No rebuilding the same logic for every new client."
    analytics-title="Clear Reports, Fast"
    analytics-description="Per-project analytics are clean and visual. Client performance reviews become straightforward, and retainer conversations get easier."
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
      <AgencyWorkflowPanel />
    </template>
  </PersonaLanding>
</template>
