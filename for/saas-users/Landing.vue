<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import SaaSApiTasksTable from './SaaSApiTasksTable.vue'
import LifecycleStageCards from './LifecycleStageCards.vue'
import SaaSRenderingMatrix from './SaaSRenderingMatrix.vue'
import SaaSDeliveryModes from './SaaSDeliveryModes.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'

const painPoints = [
  {
    title: 'Lifecycle emails live in too many places',
    description: 'Product, marketing, and transactional messages run in separate tools, so your customer journey feels disjointed and ownership is unclear.',
    impact: 'Fragmented customer experience',
    solution: 'BlueFox Email consolidates product, marketing, and transactional messaging in one workspace. One design system, one analytics view, and one place to manage your entire customer communication lifecycle.'
  },
  {
    title: 'Engineering bottlenecks slow every launch',
    description: 'Simple onboarding sequence changes sit in sprint queues because growth teams depend on developers for every email update.',
    impact: 'Slower feature adoption',
    solution: 'Growth teams can build, clone, and iterate on lifecycle flows without writing code. Triggered emails and automation branching are configured visually, with no sprint ticket required.'
  },
  {
    title: 'Templates drift without a design system',
    description: 'Without shared components, each new campaign introduces layout inconsistencies, branding drift, and avoidable QA overhead.',
    impact: 'Inconsistent brand execution',
    solution: 'Build a shared component library once, then reuse blocks across every email type. Brand rules are enforced by the system, not by manual QA checklists.'
  },
  {
    title: 'Deliverability problems surface too late',
    description: 'Bounce spikes and complaint rates are discovered after inbox placement drops, making recovery slow and expensive.',
    impact: 'Lower inbox placement',
    solution: 'BlueFox Email monitors bounce and complaint rates against defined thresholds and notifies you before limits are exceeded. Each project has isolated delivery health so one bad send does not affect others.'
  },
  {
    title: 'Email events stay siloed from your product',
    description: 'When a user opens an email, clicks a link, unsubscribes, or bounces, your product has no idea. Those signals never reach your backend, so you cannot act on them.',
    impact: 'Missed product signals',
    solution: 'BlueFox Email fires real-time webhooks for opens, clicks, bounces, complaints, and subscription changes. Your backend receives a verified POST request the moment an event happens, so you can update user state, trigger in-app flows, or flag churn risk without polling.'
  },
  {
    title: 'Contact-based pricing punishes growth',
    description: 'Your bill grows with your user base even when your send volume stays flat, turning a healthy list into a budget problem.',
    impact: 'Unpredictable spend',
    solution: 'BlueFox Email charges per email sent, not per contact stored. Your costs scale with activity, not list size, so growing your user base does not inflate your email bill.'
  }
]

const heroFeatureItems = [
  {
    title: 'Unified lifecycle stack',
    description: 'Product, marketing, and transactional messaging in one system: one design system, one analytics view.',
    anchor: 'after-pain'
  },
  {
    title: 'API-triggered emails',
    description: 'Fire any email from your product via API: transactional, triggered, or lifecycle flows.',
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
    hero-title="Lifecycle Email, Without Tool Sprawl"
    hero-description="Unify product, marketing, and transactional messaging in one clean workflow your whole team can own."
    :hero-highlights="['Faster launches', 'Consistent templates', 'Built for growth']"
    hero-feature-title="Purpose-built for SaaS lifecycle execution"
    hero-feature-subtitle="One platform covering every stage from onboarding to win-back."
    :hero-feature-items="heroFeatureItems"
    cta-text="Start Your SaaS Workspace"
    cta-href="https://app.bluefox.email/accounts/create-account"
    pain-title="SaaS Email Gets Messy as You Scale"
    pain-subtitle="When lifecycle communication grows, disconnected tools and unclear ownership slow both product velocity and customer outcomes."
    :pain-points="painPoints"
    testimonial-title="Teams Trust BlueFox Email for Production-Grade Email"
    :testimonial-ids="[4, 5]"
    mid-cta-title="Start building your lifecycle stack."
    mid-cta-description="3,000 free sends when you sign up. No credit card, no subscription. First flow live today."
    design-title="Build Once, Reuse Everywhere"
    design-description="Build a modular design system for onboarding, activation, retention, and transactional messaging, then reuse it safely across every product stream without rebuilding from scratch."
    automation-title="Automate Without Engineering Overhead"
    automation-description="Set up onboarding flows, usage nudges, trial-to-paid conversion campaigns, and churn-risk plays in a visual workflow builder your growth team can own and iterate on independently."
    analytics-title="Email Analytics for Product Teams"
    analytics-description="Track engagement, delivery health, and subscription trends in one place so product and growth teams can optimize journeys based on outcomes, not guesswork."
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
