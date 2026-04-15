<script setup>
import { useDisplay } from 'vuetify'
import { useData } from 'vitepress'

import DesignSystem from '../../.vitepress/theme/DesignSystem.vue'
import Automation from '../../.vitepress/theme/Automation.vue'
import Integration from '../../.vitepress/theme/Integration.vue'
import AppleMailTestimonials from '../../.vitepress/theme/AppleMailTestimonials.vue'
import PersonaHero from './PersonaHero.vue'

defineProps({
  heroBadge: { type: String, required: true },
  heroTitle: { type: String, required: true },
  heroDescription: { type: String, required: true },
  heroHighlights: { type: Array, default: () => [] },
  heroFeatureTitle: { type: String, default: '' },
  heroFeatureSubtitle: { type: String, default: '' },
  heroFeatureItems: { type: Array, default: () => [] },
  ctaText: { type: String, required: true },
  ctaHref: { type: String, required: true },
  showTestimonials: { type: Boolean, default: true },
  testimonialTitle: { type: String, default: '' },
  midCtaTitle: { type: String, default: '' },
  midCtaDescription: { type: String, default: '' },
  showDesign: { type: Boolean, default: true },
  designTitle: { type: String, default: '' },
  designDescription: { type: String, default: '' },
  showAutomation: { type: Boolean, default: true },
  automationTitle: { type: String, default: '' },
  automationDescription: { type: String, default: '' },
  renderingTitle: { type: String, default: '' },
  renderingDescription: { type: String, default: '' },
  deliverabilityTitle: { type: String, default: '' },
  deliverabilityDescription: { type: String, default: '' },
  deliverabilityFeatures: { type: Array, default: () => [] },
  analyticsTitle: { type: String, default: '' },
  analyticsDescription: { type: String, default: '' },
  showIntegrations: { type: Boolean, default: true },
  finalTitle: { type: String, required: true },
  finalDescription: { type: String, required: true },
  testimonialIds: { type: Array, default: null },
  afterPainStripe: { type: String, default: 'blue' },
  testimonialsStripe: { type: String, default: 'white' },
  midCtaStripe: { type: String, default: 'blue' },
  designStripe: { type: String, default: 'white' },
  automationStripe: { type: String, default: 'blue' },
  renderingStripe: { type: String, default: 'white' },
  analyticsStripe: { type: String, default: 'white' },
  integrationsStripe: { type: String, default: 'blue' },
  bottomStripe: { type: String, default: 'white' },
  finalCtaStripe: { type: String, default: 'blue' },
  deliverabilityStripe: { type: String, default: 'blue' },
  showAnalytics: { type: Boolean, default: true }
})

const { lgAndUp, md, sm, xs } = useDisplay()
const { isDark } = useData()
</script>

<template>
  <PersonaHero
    :badge="heroBadge"
    :title="heroTitle"
    :description="heroDescription"
    :highlights="heroHighlights"
    :feature-title="heroFeatureTitle"
    :feature-subtitle="heroFeatureSubtitle"
    :feature-items="heroFeatureItems"
    :cta-text="ctaText"
    :cta-href="ctaHref"
  >
    <template v-if="$slots.heroVisual" #heroVisual>
      <slot name="heroVisual" />
    </template>
  </PersonaHero>

  <!-- 1. After-pain slot -->
  <div v-if="$slots.afterPain" class="stripe" :class="`stripe--${afterPainStripe}`">
    <div id="after-pain" class="stripe-inner persona-slot" aria-label="Persona-specific feature section">
      <slot name="afterPain" />
    </div>
  </div>

  <!-- 2. Testimonials (white) -->
  <div v-if="showTestimonials" class="stripe" :class="`stripe--${testimonialsStripe}`">
    <section class="stripe-inner section-block" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading" class="section-title">{{ testimonialTitle }}</h2>
      <AppleMailTestimonials
        :is-dark="isDark"
        :lg-and-up="lgAndUp"
        :md="md"
        :sm="sm"
        :xs="xs"
        :testimonial-ids="testimonialIds"
      />
    </section>
  </div>

  <!-- 3. Mid CTA (blue) -->
  <div v-if="midCtaTitle" class="stripe" :class="`stripe--${midCtaStripe}`">
    <section class="stripe-inner mid-cta" aria-labelledby="mid-cta-heading">
      <div class="mid-cta-inner">
        <h2 id="mid-cta-heading">{{ midCtaTitle }}</h2>
        <p v-if="midCtaDescription">{{ midCtaDescription }}</p>
        <v-btn
          size="large"
          color="primary"
          variant="flat"
          class="mid-cta-btn"
          :href="ctaHref"
          target="_blank"
        >
          <strong>{{ ctaText }}</strong>
        </v-btn>
      </div>
    </section>
  </div>

  <!-- 4. Design (white) -->
  <div v-if="$slots.designContent" class="stripe" :class="`stripe--${designStripe}`">
    <div id="design-system" class="stripe-inner persona-slot" aria-label="Design section">
      <slot name="designContent" />
    </div>
  </div>
  <div v-else-if="showDesign" class="stripe" :class="`stripe--${designStripe}`">
    <section id="design-system" class="stripe-inner section-block" aria-labelledby="design-title">
      <h2 id="design-title" class="section-title">{{ designTitle }}</h2>
      <p class="section-subtitle constrained">{{ designDescription }}</p>
      <DesignSystem :is-dark="isDark" class="mt-6" />
    </section>
  </div>

  <!-- 5. Automation (blue) -->
  <div v-if="showAutomation" class="stripe" :class="`stripe--${automationStripe}`">
    <section id="automation" class="stripe-inner section-block" aria-labelledby="automation-title">
      <h2 id="automation-title" class="section-title">{{ automationTitle }}</h2>
      <p class="section-subtitle constrained">{{ automationDescription }}</p>
      <Automation
        class="mt-6"
        :is-dark="isDark"
        :lg-and-up="lgAndUp"
        :md="md"
        :sm="sm"
        :xs="xs"
      />
    </section>
  </div>

  <!-- 6. Rendering (white) -->
  <div v-if="$slots.renderingContent" class="stripe" :class="`stripe--${renderingStripe}`">
    <div id="rendering" class="stripe-inner persona-slot" aria-label="Rendering content">
      <slot name="renderingContent" />
    </div>
  </div>
  <div v-else-if="renderingTitle" class="stripe" :class="`stripe--${renderingStripe}`">
    <section id="rendering-reliability" class="stripe-inner section-block" aria-labelledby="rendering-title">
      <h2 id="rendering-title" class="section-title">{{ renderingTitle }}</h2>
      <p class="section-subtitle constrained">{{ renderingDescription }}</p>
    </section>
  </div>

  <!-- 7. Deliverability -->
  <div v-if="$slots.deliverabilityContent" class="stripe" :class="`stripe--${deliverabilityStripe}`">
    <div id="deliverability" class="stripe-inner persona-slot" aria-label="Deliverability content">
      <slot name="deliverabilityContent" />
    </div>
  </div>
  <div v-else-if="deliverabilityTitle" class="stripe" :class="`stripe--${deliverabilityStripe}`">
    <section id="deliverability" class="stripe-inner section-block" aria-labelledby="deliverability-title">
      <h2 id="deliverability-title" class="section-title">{{ deliverabilityTitle }}</h2>
      <p class="section-subtitle constrained">{{ deliverabilityDescription }}</p>
    </section>
  </div>

  <!-- 8. Analytics -->
  <div v-if="showAnalytics" class="stripe" :class="`stripe--${analyticsStripe}`">
    <div v-if="$slots.analyticsContent" id="analytics-title" class="stripe-inner persona-slot" aria-label="Analytics content">
      <slot name="analyticsContent" />
    </div>
    <section v-else class="stripe-inner section-block" aria-labelledby="analytics-title">
      <h2 id="analytics-title" class="section-title">{{ analyticsTitle }}</h2>
      <p class="section-subtitle constrained">{{ analyticsDescription }}</p>
      <v-card class="d-flex justify-center mt-4" variant="elevated" role="img" aria-label="Analytics dashboard screenshot">
        <img alt="Analytics dashboard screenshot" src="/assets/analytics-alt.webp" loading="lazy" width="1920" height="1080" />
      </v-card>
    </section>
  </div>

  <!-- 9. Integrations (blue) -->
  <div v-if="showIntegrations" class="stripe" :class="`stripe--${integrationsStripe}`">
    <section class="stripe-inner section-block" aria-labelledby="integrations-title">
      <h2 id="integrations-title" class="visually-hidden">Integrations</h2>
      <Integration :is-dark="isDark" />
    </section>
  </div>

  <!-- 10. Bottom slot (white) -->
  <div v-if="$slots.bottom" class="stripe" :class="`stripe--${bottomStripe}`">
    <div id="workflow" class="stripe-inner persona-slot" aria-label="Audience-specific section">
      <slot name="bottom" />
    </div>
  </div>

  <!-- 11. Final CTA -->
  <div class="stripe" :class="`stripe--${finalCtaStripe}`">
    <section class="stripe-inner final-cta" aria-labelledby="final-cta-title">
      <h2 id="final-cta-title">{{ finalTitle }}</h2>
      <p>{{ finalDescription }}</p>
      <v-btn
        size="x-large"
        color="primary"
        variant="flat"
        class="hero-cta"
        :href="ctaHref"
        target="_blank"
      >
        <strong>{{ ctaText }}</strong>
      </v-btn>
    </section>
  </div>
</template>

<style scoped>
.hero-cta {
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-radius: 10px !important;
  min-height: 56px !important;
  padding: 0 30px !important;
  text-decoration: none !important;
}

.hero-cta :deep(.v-btn__content) {
  display: flex;
  align-items: center;
  line-height: 1.2;
}

.hero-cta strong {
  display: block;
  margin: 0;
  line-height: 1.2;
}

/* Full-bleed alternating stripes */
.stripe {
  position: relative;
  left: calc(-50vw + 50%);
  width: 100vw;
  box-sizing: border-box;
}

.stripe--white {
  background: #ffffff;
}

.stripe--blue {
  background: #eef8fd;
}

html.dark .stripe--white {
  background: #0f172a;
}

html.dark .stripe--blue {
  background: #0c1e2d;
}

.stripe-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.section-block,
.persona-slot,
.final-cta {
  padding: 72px 24px;
}

.mid-cta {
  padding: 56px 24px;
}

.section-title,
.section-subtitle {
  text-align: center;
}

.section-title {
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.2;
  margin-bottom: 12px;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.section-subtitle {
  font-size: 17px;
  line-height: 1.65;
  color: #4b5563;
}

html.dark .section-subtitle {
  color: #9ca3af;
}

.constrained {
  max-width: 760px;
  margin: 0 auto;
}

/* Mid-page CTA content */

.mid-cta-inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.mid-cta-inner h2 {
  font-size: clamp(24px, 3.5vw, 38px);
  line-height: 1.2;
  margin-bottom: 12px;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.mid-cta-inner p {
  margin: 0 0 24px;
  font-size: 17px;
  line-height: 1.65;
  color: #4b5563;
}

html.dark .mid-cta-inner p {
  color: #9ca3af;
}

.mid-cta-btn {
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-radius: 10px !important;
  min-height: 50px !important;
  padding: 0 28px !important;
  text-decoration: none !important;
}

.mid-cta-btn :deep(.v-btn__content) {
  line-height: 1.2;
}

.mid-cta-btn strong {
  line-height: 1.2;
}

.final-cta {
  text-align: center;
}

.final-cta h2 {
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1.2;
  margin-bottom: 12px;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.final-cta p {
  margin: 0 auto 24px;
  max-width: 720px;
  font-size: 17px;
  line-height: 1.7;
  color: #4b5563;
}

html.dark .final-cta p {
  color: #9ca3af;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 760px) {
  .section-block,
  .persona-slot,
  .mid-cta,
  .final-cta {
    padding: 56px 16px;
  }
}

@media (max-width: 480px) {
  .section-block,
  .persona-slot,
  .mid-cta,
  .final-cta {
    padding: 40px 14px;
  }

  .hero-cta,
  .mid-cta-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
