<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'

const painPoints = [
  {
    title: 'Lifecycle emails break across tools',
    description: 'Product, marketing, and support messages live in different systems, so your customer journey feels disconnected.',
    impact: 'Fragmented customer experience'
  },
  {
    title: 'Engineering bottlenecks delay launches',
    description: 'Simple onboarding updates wait in sprint queues because teams depend on developers for every email change.',
    impact: 'Slower feature adoption'
  },
  {
    title: 'Template quality drifts over time',
    description: 'Without a reusable design system, every campaign introduces layout drift, inconsistent branding, and QA overhead.',
    impact: 'Inconsistent brand execution'
  },
  {
    title: 'Deliverability issues are discovered too late',
    description: 'Bounces and complaints surface after performance drops, making recovery expensive and reactive.',
    impact: 'Lower inbox placement'
  },
  {
    title: 'Reporting lacks business context',
    description: 'Raw open and click metrics do not clearly show how email supports activation, retention, and expansion.',
    impact: 'Harder prioritization'
  },
  {
    title: 'Pricing penalizes growth',
    description: 'Contact-based billing rises with your user base even when your team sends strategically.',
    impact: 'Unpredictable spend'
  }
]

const heroFeatureItems = [
  {
    title: 'Unified lifecycle stack',
    description: 'Run product and marketing messaging in one system.'
  },
  {
    title: 'Growth-team velocity',
    description: 'Ship and iterate without developer bottlenecks.'
  },
  {
    title: 'Deliverability visibility',
    description: 'Track delivery health and engagement in one view.'
  }
]
</script>

<template>
  <PersonaLanding
    hero-badge="For SaaS Teams"
    hero-title="Lifecycle Email, Without Tool Sprawl"
    hero-description="Unify product, marketing, and transactional messaging in one clean workflow."
    :hero-highlights="['Faster launches', 'Consistent templates', 'Built for growth']"
    hero-feature-title="Purpose-built for SaaS lifecycle execution"
    hero-feature-subtitle="A clean lifecycle setup for product-led growth teams."
    :hero-feature-items="heroFeatureItems"
    cta-text="Start Your SaaS Workspace"
    cta-href="https://app.bluefox.email/accounts/create-account"
    pain-title="SaaS Email Gets Messy as You Scale"
    pain-subtitle="When lifecycle communication grows, disconnected tools and workflows start slowing both product velocity and customer outcomes."
    :pain-points="painPoints"
    testimonial-title="Teams Trust BlueFox for Production-Grade Email"
    design-title="Create Once, Reuse Across Product Journeys"
    design-description="Build a modular design system for onboarding, activation, retention, and transactional messaging, then reuse it safely across every product stream."
    automation-title="Automate Lifecycle Messaging Without Engineering Overhead"
    automation-description="Set up onboarding flows, usage nudges, trial-to-paid conversion campaigns, and churn-risk plays in a visual workflow your growth team can own."
    rendering-title="Deliver Reliable UX Across Every Inbox"
    rendering-description="From desktop Outlook to mobile Gmail, your messages stay consistent so product communication feels as polished as your app."
    analytics-title="Measure Email as a Product Growth Channel"
    analytics-description="Track engagement and delivery quality in one place so product and growth teams can optimize journeys based on outcomes, not guesswork."
    final-title="Turn Email Into a Compounding SaaS Advantage"
    final-description="Launch faster, maintain quality, and scale communication confidently with a system built for modern SaaS execution."
  />
</template>
