<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import SaaSApiTasksTable from './SaaSApiTasksTable.vue'
import LifecycleStageCards from './LifecycleStageCards.vue'
import SaaSRenderingMatrix from './SaaSRenderingMatrix.vue'
import SaaSDeliveryStreams from './SaaSDeliveryStreams.vue'

const painPoints = [
  {
    title: 'Lifecycle emails live in too many places',
    description: 'Product, marketing, and transactional messages run in separate tools, so your customer journey feels disjointed and ownership is unclear.',
    impact: 'Fragmented customer experience'
  },
  {
    title: 'Engineering bottlenecks slow every launch',
    description: 'Simple onboarding sequence changes sit in sprint queues because growth teams depend on developers for every email update.',
    impact: 'Slower feature adoption'
  },
  {
    title: 'Templates drift without a design system',
    description: 'Without shared components, each new campaign introduces layout inconsistencies, branding drift, and avoidable QA overhead.',
    impact: 'Inconsistent brand execution'
  },
  {
    title: 'Deliverability problems surface too late',
    description: 'Bounce spikes and complaint rates are discovered after inbox placement drops, making recovery slow and expensive.',
    impact: 'Lower inbox placement'
  },
  {
    title: 'Metrics don\'t connect to product outcomes',
    description: 'Raw open and click numbers tell you nothing about whether email is actually driving activation, retention, or expansion.',
    impact: 'Harder prioritization'
  },
  {
    title: 'Contact-based pricing punishes growth',
    description: 'Your bill grows with your user base even when your send volume stays flat, turning a healthy list into a budget problem.',
    impact: 'Unpredictable spend'
  }
]

const heroFeatureItems = [
  {
    title: 'Unified lifecycle stack',
    description: 'Product, marketing, and transactional messaging in one system: one design system, one analytics view.'
  },
  {
    title: 'Growth-team velocity',
    description: 'Launch and iterate lifecycle flows without waiting on engineering sprints.'
  },
  {
    title: 'Send-based pricing',
    description: 'Pay per email sent, not per contact stored. Your costs scale with activity, not list size.'
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
    testimonial-title="Teams Trust BlueFox for Production-Grade Email"
    mid-cta-title="Ready to unify your lifecycle stack?"
    mid-cta-description="3,000 free sends when you sign up. No credit card. No subscription. Start building your first lifecycle flow today."
    design-title="Create Once, Reuse Across Every Product Journey"
    design-description="Build a modular design system for onboarding, activation, retention, and transactional messaging, then reuse it safely across every product stream without rebuilding from scratch."
    automation-title="Automate Lifecycle Messaging Without Engineering Overhead"
    automation-description="Set up onboarding flows, usage nudges, trial-to-paid conversion campaigns, and churn-risk plays in a visual workflow builder your growth team can own and iterate on independently."
    analytics-title="Measure Email as a Product Growth Channel"
    analytics-description="Track engagement, delivery health, and subscription trends in one place so product and growth teams can optimize journeys based on outcomes, not guesswork."
    final-title="Turn Email Into a Compounding SaaS Growth Advantage"
    final-description="Launch faster, maintain quality, and scale communication confidently with a lifecycle system built for modern product-led growth."
  >
    <template #afterPain>
      <LifecycleStageCards />
    </template>
    <template #renderingContent>
      <SaaSRenderingMatrix />
    </template>
    <template #deliverabilityContent>
      <SaaSDeliveryStreams />
    </template>
    <template #bottom>
      <SaaSApiTasksTable />
    </template>
  </PersonaLanding>
</template>
