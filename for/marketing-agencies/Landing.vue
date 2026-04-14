<script setup>
import { useData } from 'vitepress'
import { useDisplay } from 'vuetify'
import PersonaLanding from '../components/PersonaLanding.vue'
import ClientProjectGrid from './ClientProjectGrid.vue'
import AgencyAnalytics from './AgencyAnalytics.vue'
import AgencyPricing from './AgencyPricing.vue'
import TemplateShowcase from '../../.vitepress/theme/TemplateShowcase.vue'

const { isDark } = useData()
const { lgAndUp, md, sm, xs } = useDisplay()

const heroFeatureItems = [
  {
    title: 'One account, every client isolated',
    description: 'Each client gets their own project with separate contacts, templates, automations, and analytics. Zero cross-contamination.',
    anchor: 'after-pain'
  },
  {
    title: 'Clone flows to every new client',
    description: 'Build your best welcome sequence or win-back flow once. Clone it to the next client with brand overrides in minutes.',
    anchor: 'design-system'
  },
  {
    title: 'Pay per send, not per contact',
    description: 'Client lists can grow freely. Your costs stay tied to send volume, so retainer margins hold as you scale.',
    anchor: 'analytics-title'
  }
]
</script>

<template>
  <PersonaLanding
    hero-badge="For Email Marketing Agencies"
    hero-title="Growing Client Lists Shouldn't Shrink Your Margins"
    hero-description="Pay per email sent, not per contact stored. Clone proven flows to new clients in minutes. Keep every account fully isolated. 3,000 free sends to start."
    :hero-highlights="['Pay per send', 'Clone flows across clients', 'Full client isolation']"
    hero-feature-title="Built for agencies that sell email as a service"
    hero-feature-subtitle="One account. Every client isolated. Margins that hold as you scale."
    :hero-feature-items="heroFeatureItems"
    cta-text="Start Free. 3,000 Sends Included"
    cta-href="https://app.bluefox.email/accounts/create-account"
    :pain-points="[]"
    testimonial-title="What Agency Teams Say"
    :testimonial-ids="[0, 1, 2]"
    mid-cta-title="Your next client project can be live in 30 minutes."
    mid-cta-description="No subscription, no contact-based billing. Pay only for emails sent."
    design-title="One Design System, Every Client"
    design-description="Build your component library once, apply brand overrides per client, and ship campaigns without starting from scratch each time."
    design-pain="How many hours does your team spend rebuilding the same templates for each new client?"
    automation-title="Clone Automations. Target With Segments."
    automation-description="Clone flows between projects, apply brand overrides, and define segments with AND/OR conditions to target exactly the right contacts per account. No rebuilding the same logic twice."
    automation-pain="Does your best-performing sequence get rebuilt from scratch every time you onboard a new client?"
    analytics-title="Clear Reports, Fast"
    analytics-description="Per-project analytics are clean and visual. Client reviews become straightforward, retainer conversations get easier."
    analytics-pain="How long does it take to pull a report together before a retainer review call?"
    :show-integrations="false"
    final-title="Run a Tighter Email Agency Operation"
    final-description="Less rebuilding, better margins, and clean per-client reporting. All from one account."
  >
    <template #afterPain>
      <ClientProjectGrid />
    </template>
    <template #renderingContent>
      <section class="templates-section" aria-labelledby="agency-templates-title">
        <v-chip color="primary" class="templates-badge">
          <span class="text-overline">Template Library</span>
        </v-chip>
        <h2 id="agency-templates-title">Start Every Client Campaign From a Proven Template</h2>
        <p class="templates-desc">Ready-to-use templates for newsletters, promotions, onboarding, and win-back flows. Clone to any client project, apply their brand settings, and ship in minutes.</p>
        <TemplateShowcase
          :is-dark="isDark"
          :lg-and-up="lgAndUp"
          :md="md"
          :sm="sm"
          :xs="xs"
        />
      </section>
    </template>
    <template #deliverabilityContent>
      <AgencyPricing />
    </template>
    <template #analyticsContent>
      <AgencyAnalytics />
    </template>
  </PersonaLanding>
</template>

<style scoped>
.templates-section {
  padding: 36px 24px;
}

.templates-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.templates-section h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.templates-desc {
  margin: 0 0 28px;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .templates-desc {
  color: #94a3b8;
}

@media (max-width: 860px) {
  .templates-section {
    padding: 24px 16px;
  }
}
</style>
