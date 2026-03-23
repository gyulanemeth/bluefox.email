<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'

const painPoints = [
  {
    title: 'Too many client workflows to juggle',
    description: 'Each client has unique approvals, lists, assets, and deadlines, but most tools are built for single-brand teams.',
    impact: 'Operational overload'
  },
  {
    title: 'Reusable systems are hard to maintain',
    description: 'Templates and automations are copied inconsistently, forcing teams to rebuild proven work repeatedly.',
    impact: 'Rework every month'
  },
  {
    title: 'Rendering QA steals billable hours',
    description: 'Broken layouts and client-specific QA cycles consume time that should be spent on strategy and campaign performance.',
    impact: 'Lower delivery margin'
  },
  {
    title: 'Reporting takes longer than execution',
    description: 'Collecting and cleaning data for stakeholder reports becomes a recurring monthly bottleneck.',
    impact: 'Delayed client communication'
  },
  {
    title: 'Deliverability risk hurts client trust',
    description: 'When campaigns land in spam, agencies are blamed first, even when root causes are hard to diagnose quickly.',
    impact: 'Retention risk'
  },
  {
    title: 'Cost models punish list growth',
    description: 'Contact-based plans reduce margins as client databases scale, even with efficient sending programs.',
    impact: 'Profit pressure'
  }
]

const heroFeatureItems = [
  {
    title: 'Reusable client kits',
    description: 'Clone templates and automations across accounts.'
  },
  {
    title: 'Client-ready proof',
    description: 'Share clean exports that explain performance fast.'
  },
  {
    title: 'Margin-first pricing',
    description: 'Pay for sends, not growing contact lists.'
  }
]
</script>

<template>
  <PersonaLanding
    hero-badge="For Marketing Agencies"
    hero-title="Scale Client Email Without Agency Chaos"
    hero-description="Run multi-client programs with repeatable systems your team can execute fast."
    :hero-highlights="['Reusable production', 'Client-ready reporting', 'Margin-friendly model']"
    hero-feature-title="Built for multi-client agency operations"
    hero-feature-subtitle="Run every client from one clear operating system."
    :hero-feature-items="heroFeatureItems"
    cta-text="Start Your Agency Account"
    cta-href="https://app.bluefox.email/accounts/create-account"
    pain-title="Agency Growth Should Not Break Your Email Ops"
    pain-subtitle="As your client count increases, fragmented tools and repetitive production work erode profitability and team capacity."
    :pain-points="painPoints"
    testimonial-title="Agency Teams Choose BlueFox for Operational Clarity"
    design-title="Standardize Production with a Reusable Client Design System"
    design-description="Build component libraries once, apply brand-specific overrides, and launch polished campaigns across accounts without starting from zero."
    automation-title="Deploy Automations Faster Across Multiple Clients"
    automation-description="Ship onboarding, retention, and promotional flows quickly while preserving each client brand voice and segmentation logic."
    rendering-title="Protect Client Reputation with Reliable Rendering"
    rendering-description="Send campaigns confidently with battle-tested markup designed for real-world inbox behavior, including Outlook edge cases."
    analytics-title="Deliver Client-Ready Reporting in Minutes"
    analytics-description="Export clean, visual reporting that helps clients understand performance and makes renewals and upsells easier."
    final-title="Build a Higher-Margin Agency Email Operation"
    final-description="Use one platform to reduce rework, improve quality, and prove performance at scale across your client portfolio."
  />
</template>
