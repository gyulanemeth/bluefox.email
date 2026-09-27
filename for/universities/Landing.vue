<script setup>
import { useData } from 'vitepress'
import { useDisplay } from 'vuetify'
import PersonaLanding from '../components/PersonaLanding.vue'
import EducationAudienceGrid from './EducationAudienceGrid.vue'
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
    hero-title="University email without the contact-based pricing"
    hero-description="Send newsletters, alumni updates and event invitations. Segment your audience, keep every email on-brand, and pay only for what you send."
    :hero-highlights="['Pay per send, not per contact', 'Credits that fit the academic calendar', 'Segment audiences by year, program and engagement']"
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
    after-pain-stripe="white"
    design-stripe="blue"
    rendering-stripe="white"
    deliverability-stripe="blue"
    bottom-stripe="white"
    extra-stripe="blue"
    final-cta-stripe="white"
    final-title="Start with your team"
    final-description="You do not need a university-wide rollout to get started. Try BlueFox with your newsletter, alumni program or communications team first."
    final-primary-cta-text="Talk to the founder"
    final-primary-cta-href="mailto:gyula@bluefox.email"
    final-secondary-cta-text="Start free"
    final-secondary-cta-href="https://app.bluefox.email/accounts/create-account"
  >
    <template #heroVisual>
      <UniversitySocialProof />
    </template>

    <template #afterPain>
      <EducationAudienceGrid />
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
          title="See what your audience actually reads"
          description="Track opens, clicks, bounces and complaints, then see which links and messages get the most engagement."
          secondary-description="Compare performance over time and learn what works for your audience."
          default-tab="hourly"
          :show-badge="false"
        />
      </div>
    </template>

    <template #bottom>
      <section id="design-system" class="edu-design" aria-labelledby="edu-design-title">
        <div class="edu-head">
          <h2 id="edu-design-title">Start with one team. Scale across the university.</h2>
          <p>One faculty, department or alumni team can start using BlueFox on its own. As other teams join, they can keep separate email workflows while sharing the same university design system.</p>
          <p>Keep colors, typography, reusable content and email design consistent without forcing every team into the same newsletter setup.</p>
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

.edu-head p + p { margin-top: 10px; }

html.dark .edu-head p { color: #94a3b8; }
</style>
