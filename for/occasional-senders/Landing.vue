<script setup>
import { useData } from 'vitepress'
import { useDisplay } from 'vuetify'
import PersonaLanding from '../components/PersonaLanding.vue'
import PricingSnapshot from './PricingSnapshot.vue'
import HeroEmailPreview from './HeroEmailPreview.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'
import TemplateShowcase from '../../.vitepress/theme/TemplateShowcase.vue'

const { isDark } = useData()
const { lgAndUp, md, sm, xs } = useDisplay()
</script>

<template>
  <PersonaLanding
    hero-badge="For occasional senders"
    hero-title="Professional campaigns, only when you need them"
    hero-description="Send when you have something to say. Buy credits once, valid for 12 months. No subscription, no recurring bill."
    :hero-highlights="['12-month credits', 'No subscription', 'Simple segmentation']"
    :hero-feature-items="[]"
    cta-text="Create your free account"
    cta-href="https://app.bluefox.email/accounts/create-account"
    :show-testimonials="false"
    mid-cta-title="3,000 free sends to get started."
    mid-cta-description="Credits are valid for 12 months from purchase. Buy more only when you need to. No subscription required."
    :show-automation="false"
    :show-integrations="false"
    final-title="Professional campaigns when you need them"
    final-description="No subscription. No complexity. Just credits you use when you have something worth sending."
    after-pain-stripe="white"
    analytics-stripe="blue"
    final-cta-stripe="white"
  >
    <template #heroVisual>
      <HeroEmailPreview />
    </template>
    <template #afterPain>
      <PricingSnapshot />
    </template>
    <template #designContent>
      <section class="templates-section" aria-labelledby="occasional-templates-title">
        <v-chip color="primary" class="templates-badge">
          <span class="text-overline">Template library</span>
        </v-chip>
        <h2 id="occasional-templates-title">Start every campaign from a polished template</h2>
        <p class="templates-desc">Ready-to-use layouts for newsletters, announcements, product launches, and seasonal sends. Pick one, add your content, ship.</p>
        <TemplateShowcase
          :is-dark="isDark"
          :lg-and-up="lgAndUp"
          :md="md"
          :sm="sm"
          :xs="xs"
        />
      </section>
    </template>
    <template #analyticsContent>
      <AgencyAnalytics
        title="See what worked after every send"
        description="Track opens, clicks, bounces, and subscriber trends right after each campaign. Know what landed, what to fix, and who to follow up with next time."
        default-tab="hourly"
      />
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
