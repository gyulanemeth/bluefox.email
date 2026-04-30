<script setup>
import { useDisplay } from 'vuetify'
import { useData } from 'vitepress'
import PersonaLanding from '../components/PersonaLanding.vue'
import SaaSApiTasksTable from './SaaSApiTasksTable.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'
import DesignSystem from '../../.vitepress/theme/DesignSystem.vue'
import AppleMailTestimonials from '../../.vitepress/theme/AppleMailTestimonials.vue'

const { lgAndUp, md, sm, xs } = useDisplay()
const { isDark } = useData()
</script>

<template>
  <PersonaLanding
    hero-badge="For SaaS teams"
    hero-title="Every email on-brand, sent from one platform."
    hero-description="Transactional, promotional, and automated emails, all on-brand. Integrate with a simple API and webhooks. Pay per send, not per contact."
    :hero-highlights="['Every email type, one platform', 'On-brand by default', 'Pay per send, not per contact']"
    :hero-feature-items="[]"
    cta-text="Start free. 3,000 sends included"
    cta-href="https://app.bluefox.email/accounts/create-account"
    :show-testimonials="false"
    mid-cta-title=""
    :show-design="false"
    after-pain-stripe="white"
    automation-title="Lifecycle automation that drives MRR"
    automation-description="Trigger flows from any product event. Onboarding to win-back, every stage compounds into retention and revenue."
    automation-stripe="blue"
    deliverability-stripe="white"
    analytics-stripe="blue"
    :show-integrations="false"
    final-cta-stripe="white"
    final-title="Email that scales with your SaaS"
    final-description="Transactional, triggered, marketing. One platform, one API, one price per send."
  >
    <template #afterPain>
      <!-- 1. Design (white, sits inside white afterPain stripe) -->
      <section id="design-system" class="section-block" aria-labelledby="design-title">
        <h2 id="design-title" class="section-title">Every email on-brand, every time</h2>
        <p class="section-subtitle constrained">Transactional, triggered, promotional, newsletters. Build your design system once and reuse it across every email type. No rebuilding per campaign.</p>
        <DesignSystem :is-dark="isDark" class="mt-6" />
      </section>

      <!-- 2. Mid-CTA (blue full-bleed stripe) -->
      <div class="saas-stripe saas-stripe--blue">
        <section class="saas-stripe-inner saas-mid-cta" aria-labelledby="saas-mid-cta-heading">
          <div class="saas-mid-cta-inner">
            <h2 id="saas-mid-cta-heading">Start sending in minutes, not days.</h2>
            <p>No credit card, no subscription. Connect your backend, send your first email, and scale from there.</p>
            <v-btn
              size="large"
              color="primary"
              variant="flat"
              class="saas-mid-cta-btn"
              href="https://app.bluefox.email/accounts/create-account"
              target="_blank"
            >
              <strong>Start free. 3,000 sends included</strong>
            </v-btn>
          </div>
        </section>
      </div>

      <!-- 3. Testimonials (white full-bleed stripe) -->
      <div class="saas-stripe saas-stripe--white">
        <section class="saas-stripe-inner section-block" aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" class="section-title">SaaS teams trust BlueFox Email for production-grade email</h2>
          <AppleMailTestimonials
            :is-dark="isDark"
            :lg-and-up="lgAndUp"
            :md="md"
            :sm="sm"
            :xs="xs"
            :testimonial-ids="[4, 5]"
          />
        </section>
      </div>
    </template>
    <template #deliverabilityContent>
      <AgencyAnalytics
        title="Email analytics built for product teams"
        description="Track delivery, engagement, and conversion in one place. Optimize on outcomes, not guesswork."
        default-tab="hourly"
      />
    </template>
    <template #analyticsContent>
      <SaaSApiTasksTable />
    </template>
  </PersonaLanding>
</template>

<style scoped>
.saas-stripe {
  position: relative;
  left: calc(-50vw + 50%);
  width: 100vw;
  box-sizing: border-box;
}

.saas-stripe--white { background: #ffffff; }
.saas-stripe--blue { background: #eef8fd; }

html.dark .saas-stripe--white { background: #0f172a; }
html.dark .saas-stripe--blue { background: #0c1e2d; }

.saas-stripe-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 24px 96px;
}

.saas-mid-cta {
  padding: 56px 24px 80px;
}

.saas-mid-cta-inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.saas-mid-cta-inner h2 {
  font-size: clamp(24px, 3.5vw, 38px);
  line-height: 1.2;
  margin-bottom: 12px;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.saas-mid-cta-inner p {
  margin: 0 0 24px;
  font-size: 17px;
  line-height: 1.65;
  color: #4b5563;
}

html.dark .saas-mid-cta-inner p {
  color: #9ca3af;
}

.saas-mid-cta-btn {
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-radius: 10px !important;
  min-height: 50px !important;
  padding: 0 28px !important;
  text-decoration: none !important;
}

.section-title {
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.2;
  margin-bottom: 12px;
  border-top: 0 !important;
  padding-top: 0 !important;
  text-align: left;
}

.section-subtitle {
  font-size: 17px;
  line-height: 1.65;
  color: #4b5563;
  text-align: left;
}

html.dark .section-subtitle {
  color: #9ca3af;
}

.constrained {
  max-width: 760px;
}

.section-block {
  padding: 64px 0 96px;
}
</style>
