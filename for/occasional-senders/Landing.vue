<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'
import PreSendChecklist from './PreSendChecklist.vue'
import PricingSnapshot from './PricingSnapshot.vue'
import SimpleRenderingPreview from './SimpleRenderingPreview.vue'
import GuidedDeliverySetup from './GuidedDeliverySetup.vue'

const painPoints = [
  {
    title: 'Enterprise tools feel built for someone else',
    description: 'Most platforms assume you are sending daily and overwhelm teams that only need to communicate a few times a year with features they will never touch.',
    impact: 'Low team adoption'
  },
  {
    title: 'Infrequent use means relearning every time',
    description: 'When campaigns are weeks apart, teams forget setup steps and spend time getting back up to speed before each send — killing momentum.',
    impact: 'Slow time-to-send'
  },
  {
    title: 'One-off edits erode template quality',
    description: 'Without a stable design system, quick fixes between campaigns accumulate and brand consistency quietly deteriorates over time.',
    impact: 'Inconsistent brand'
  },
  {
    title: 'Authentication and hygiene steps get skipped',
    description: 'Teams focused on getting the campaign out quickly miss DKIM, SPF, and list health checks — then wonder why their open rates drop.',
    impact: 'Avoidable inbox issues'
  },
  {
    title: 'Analytics dashboards built for power users',
    description: 'Occasional senders need a clear answer to "did this work and what should I do next?" — not a reporting suite that takes time to interpret.',
    impact: 'No clear next actions'
  },
  {
    title: 'Monthly subscriptions punish light senders',
    description: 'Paying $40–60 per month to send four campaigns a year is hard to justify — and makes email feel like an expensive tool rather than a useful one.',
    impact: 'Budget hard to justify'
  }
]

const heroFeatureItems = [
  {
    title: 'Launch-ready templates',
    description: 'Start from polished, proven layouts every time — never from a blank canvas.'
  },
  {
    title: 'Lightweight workflow',
    description: 'Simple enough to pick up after months away without relearning anything.'
  },
  {
    title: 'Send-based pricing',
    description: 'Buy a send pack once — valid 12 months. No monthly subscription between campaigns.'
  }
]
</script>

<template>
  <PersonaLanding
    hero-badge="For Occasional Senders"
    hero-title="Send Great Campaigns, Only When You Need To"
    hero-description="A simple workflow for teams that send a few times a year and still need it to look fully professional every time."
    :hero-highlights="['Quick setup', 'Reliable templates', 'Predictable spend']"
    hero-feature-title="Built for periodic campaign teams"
    hero-feature-subtitle="Pick it up whenever you need it. Put it down when you don't."
    :hero-feature-items="heroFeatureItems"
    cta-text="Create Your Free Account"
    cta-href="https://app.bluefox.email/accounts/create-account"
    pain-title="Occasional Sending Should Be Simple, Not Stressful"
    pain-subtitle="If your team sends monthly, quarterly, or only for big moments, you need clarity and speed — not an enterprise system that assumes daily operations."
    :pain-points="painPoints"
    testimonial-title="Teams Use BlueFox to Ship Better Campaigns with Less Effort"
    mid-cta-title="Start with 3,000 free sends. No subscription needed."
    mid-cta-description="Run your first campaign today and see how simple it is. Your sends are valid for 12 months — buy more only when you need to."
    design-title="Keep Brand Quality Consistent Between Campaigns"
    design-description="Use reusable templates and blocks so every new send starts from a proven baseline — not a rushed rebuild that introduces drift and inconsistency."
    automation-title="Automate the Essentials and Stay Lean"
    automation-description="Set up practical flows like welcome messages and follow-ups without committing to a heavy operational overhead your team doesn't have time for."
    analytics-title="Understand What Worked After Each Send"
    analytics-description="Review clean open rates, clicks, and subscriber data after each campaign so you can make one or two smart improvements next time — without getting buried."
    final-title="Run Occasional Email with Confidence"
    final-description="A focused, professional system for quality sends whenever your audience needs to hear from you — with no complexity in between."
  >
    <template #afterPain>
      <PricingSnapshot />
    </template>
    <template #renderingContent>
      <SimpleRenderingPreview />
    </template>
    <template #deliverabilityContent>
      <GuidedDeliverySetup />
    </template>
    <template #bottom>
      <PreSendChecklist />
    </template>
  </PersonaLanding>
</template>
