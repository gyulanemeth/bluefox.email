<script setup>
import { useData } from 'vitepress'
import { useDisplay } from 'vuetify'
import PersonaLanding from '../components/PersonaLanding.vue'
import EducationAudienceGrid from './EducationAudienceGrid.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'
import TemplateShowcase from '../../.vitepress/theme/TemplateShowcase.vue'

const { isDark } = useData()
const { lgAndUp, md, sm, xs } = useDisplay()
</script>

<template>
  <PersonaLanding
    hero-badge="For schools & education organizations"
    hero-title="Email built for how schools and education orgs actually send"
    hero-description="Pay per email sent, not per contact stored. One theme library for every department. Credits that fit the academic calendar, not a monthly subscription."
    :hero-highlights="['Pay per send, not per contact', 'Credits that fit the academic calendar', 'Isolated accounts per school or department']"
    :hero-feature-items="[]"
    cta-text="Start free. 3,000 sends included"
    cta-href="https://app.bluefox.email/accounts/create-account"
    :show-testimonials="false"
    after-pain-stripe="white"
    mid-cta-title="Send your first campaign in minutes."
    mid-cta-description="No subscription. Buy credits, use them across the school year."
    mid-cta-stripe="blue"
    design-title="One theme, every newsletter and department"
    design-description="Build your email design once, reuse it across admissions, alumni, and every department newsletter. No rebuilding for each send."
    design-stripe="white"
    automation-title="Automate the emails that repeat every term"
    automation-description="Enrollment reminders, event RSVPs, and fundraising sequences, triggered automatically instead of sent by hand."
    automation-stripe="blue"
    deliverability-stripe="white"
    :show-analytics="false"
    integrations-stripe="blue"
    final-cta-stripe="white"
    final-title="Bring order to your school's email"
    final-description="One platform, every department, one price per email sent."
  >
    <template #heroVisual>
      <TemplateShowcase
        :is-dark="isDark"
        :lg-and-up="lgAndUp"
        :md="md"
        :sm="sm"
        :xs="xs"
      />
    </template>
    <template #afterPain>
      <EducationAudienceGrid />
    </template>
    <template #deliverabilityContent>
      <AgencyAnalytics
        title="See what worked after every send"
        description="Track opens, clicks, bounces, and unsubscribes for every newsletter and campaign."
        default-tab="hourly"
      />
    </template>
  </PersonaLanding>
</template>
