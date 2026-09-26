<script setup>
import { useData } from 'vitepress'
import { useDisplay } from 'vuetify'
import PersonaLanding from '../components/PersonaLanding.vue'
import UniversitySegmentation from './UniversitySegmentation.vue'
import UniversityEditor from './UniversityEditor.vue'
import UniversitySocialProof from './UniversitySocialProof.vue'
import UniversityITRequirements from './UniversityITRequirements.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'
import DesignSystem from '../../.vitepress/theme/DesignSystem.vue'

const { isDark } = useData()
const { lgAndUp, md, sm, xs } = useDisplay()
</script>

<template>
  <PersonaLanding
    hero-badge=""
    hero-brand-bg
    hero-center-stacked-cta
    hero-title="Email for students and alumni, billed per send"
    hero-description="Send student newsletters, alumni updates, event invitations, and department news. Pay for the emails you send, not the contacts you store."
    :hero-highlights="['No subscription', 'Credits valid 12 months', 'Segments by year and program']"
    :hero-feature-items="[]"
    cta-text="Start free. 3,000 sends included"
    cta-href="https://app.bluefox.email/accounts/create-account"
    hero-primary-cta-text="Talk to the founder"
    hero-primary-cta-href="mailto:gyula@bluefox.email"
    hero-secondary-cta-text="Start free. 3,000 sends included"
    hero-secondary-cta-href="https://app.bluefox.email/accounts/create-account"
    hero-cta-supporting-text="Questions about using BlueFox at your university? Email Gyula directly."
    :show-testimonials="false"
    :show-automation="false"
    :show-integrations="false"
    :show-analytics="false"
    :show-design="false"
    design-stripe="white"
    rendering-stripe="blue"
    deliverability-stripe="white"
    bottom-stripe="blue"
    extra-stripe="white"
    final-cta-stripe="blue"
    final-title="Try it with one newsletter first"
    final-description="Move your next student newsletter or alumni update to BlueFox. 3,000 sends are free, and no card is needed."
    final-primary-cta-text="Talk to the founder"
    final-primary-cta-href="mailto:gyula@bluefox.email"
    final-secondary-cta-text="Start free"
    final-secondary-cta-href="https://app.bluefox.email/accounts/create-account"
  >
    <template #heroVisual>
      <UniversitySocialProof />
    </template>

    <template #designContent>
      <UniversitySegmentation
        :is-dark="isDark"
        :lg-and-up="lgAndUp"
        :md="md"
        :sm="sm"
        :xs="xs"
      />
    </template>

    <template #renderingContent>
      <UniversityEditor />
    </template>

    <template #deliverabilityContent>
      <div class="edu-analytics">
        <AgencyAnalytics
          title="See what your audience reads"
          description="Opens, clicks, bounces, and complaints for every send, by hour, day, week, or month."
          :show-badge="false"
        />
      </div>
    </template>

    <template #bottom>
      <section class="edu-design" aria-labelledby="edu-design-title">
        <div class="edu-head">
          <h2 id="edu-design-title">One design system for every department</h2>
          <p>A faculty or alumni team can start on its own. As more teams join, each keeps its own lists and workflows while sharing the same colors, fonts, and saved blocks.</p>
        </div>
        <DesignSystem :is-dark="isDark" class="mt-6" />
      </section>
    </template>

    <template #extra>
      <UniversityITRequirements />
    </template>
  </PersonaLanding>
</template>

<style scoped>
/* AgencyAnalytics carries its own 36px/24px padding, which stacks on
   PersonaLanding's slot padding. Neutralised here only. */
.edu-analytics :deep(.agency-analytics) {
  padding: 0;
}

.edu-analytics :deep(.analytics-head) {
  text-align: center;
}

.edu-analytics :deep(.analytics-head p) {
  margin-left: auto;
  margin-right: auto;
}

.edu-head {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.edu-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.edu-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
}

html.dark .edu-head p { color: #94a3b8; }
</style>
