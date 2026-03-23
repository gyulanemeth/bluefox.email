<script setup>
import PersonaLanding from '../components/PersonaLanding.vue'

const painPoints = [
  {
    title: 'Complex tools feel heavy for occasional campaigns',
    description: 'Many platforms assume daily sending operations and overwhelm teams that only send during launches or key announcements.',
    impact: 'Low team adoption'
  },
  {
    title: 'Infrequent use causes process drift',
    description: 'When campaigns are spaced out, teams forget setup steps and spend time relearning workflows before each send.',
    impact: 'Slow time-to-send'
  },
  {
    title: 'Template quality degrades between sends',
    description: 'Without a stable design system, one-off edits accumulate and brand consistency drops over time.',
    impact: 'Inconsistent brand perception'
  },
  {
    title: 'Deliverability checks are often skipped',
    description: 'Teams rushing to send occasional blasts can miss authentication and list hygiene checks.',
    impact: 'Avoidable inbox issues'
  },
  {
    title: 'Reports are hard to interpret',
    description: 'Occasional senders need clear guidance quickly, not complex dashboards built for power users.',
    impact: 'Unclear next actions'
  },
  {
    title: 'Monthly subscriptions feel wasteful',
    description: 'Paying high fixed costs between campaigns can make occasional email programs hard to justify.',
    impact: 'Budget friction'
  }
]

const heroFeatureItems = [
  {
    title: 'Launch-ready templates',
    description: 'Start from polished layouts every time you send.'
  },
  {
    title: 'Lightweight workflow',
    description: 'Simple setup keeps periodic campaigns low stress.'
  },
  {
    title: 'Spend stays practical',
    description: 'Avoid high fixed costs between send windows.'
  }
]
</script>

<template>
  <PersonaLanding
    hero-badge="For Occasional Senders"
    hero-title="Send Great Campaigns, Only When You Need To"
    hero-description="A simple workflow for occasional sends that still looks fully professional."
    :hero-highlights="['Quick setup', 'Reliable templates', 'Predictable spend']"
    hero-feature-title="Optimized for periodic campaign teams"
    hero-feature-subtitle="Everything needed for smooth monthly or quarterly sends."
    :hero-feature-items="heroFeatureItems"
    cta-text="Create Your Free Account"
    cta-href="https://app.bluefox.email/accounts/create-account"
    pain-title="Occasional Sending Should Be Simple, Not Stressful"
    pain-subtitle="If your team sends monthly or quarterly, you need clarity and speed, not enterprise complexity."
    :pain-points="painPoints"
    testimonial-title="Teams Use BlueFox to Ship Better Campaigns with Less Effort"
    design-title="Keep Brand Quality Consistent Between Campaigns"
    design-description="Use reusable templates and blocks so each new send starts from a proven baseline instead of a rushed rebuild."
    automation-title="Automate the Essentials and Stay Lean"
    automation-description="Set up practical workflows such as welcome messages and follow-ups without committing to heavy operational overhead."
    rendering-title="Avoid Last-Minute Rendering Surprises"
    rendering-description="Preview and send messages built to hold up across major inboxes, reducing panic before launch windows."
    analytics-title="See What Worked and Improve the Next Send"
    analytics-description="Review clean metrics after each campaign to refine content and audience strategy without getting buried in noise."
    final-title="Run Occasional Email with Confidence"
    final-description="BlueFox Email gives you a focused system for quality sends whenever your audience needs to hear from you."
  />
</template>
