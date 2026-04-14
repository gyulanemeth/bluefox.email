<script setup>
import { ref } from 'vue'
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
  painTitle: { type: String, default: '' },
  painSubtitle: { type: String, default: '' },
  painPoints: { type: Array, default: () => [] },
  showTestimonials: { type: Boolean, default: true },
  testimonialTitle: { type: String, default: '' },
  midCtaTitle: { type: String, default: '' },
  midCtaDescription: { type: String, default: '' },
  showDesign: { type: Boolean, default: true },
  designTitle: { type: String, default: '' },
  designDescription: { type: String, default: '' },
  designPain: { type: String, default: '' },
  showAutomation: { type: Boolean, default: true },
  automationTitle: { type: String, default: '' },
  automationDescription: { type: String, default: '' },
  automationPain: { type: String, default: '' },
  renderingTitle: { type: String, default: '' },
  renderingDescription: { type: String, default: '' },
  renderingPain: { type: String, default: '' },
  deliverabilityTitle: { type: String, default: '' },
  deliverabilityDescription: { type: String, default: '' },
  deliverabilityFeatures: { type: Array, default: () => [] },
  deliverabilityPain: { type: String, default: '' },
  analyticsTitle: { type: String, default: '' },
  analyticsDescription: { type: String, default: '' },
  analyticsPain: { type: String, default: '' },
  showIntegrations: { type: Boolean, default: true },
  finalTitle: { type: String, required: true },
  finalDescription: { type: String, required: true },
  testimonialIds: { type: Array, default: null },
  afterPainStripe: { type: String, default: 'blue' },
  analyticsStripe: { type: String, default: 'white' },
  finalCtaStripe: { type: String, default: 'blue' }
})

const { lgAndUp, md, sm, xs } = useDisplay()
const { isDark } = useData()

const openSolution = ref(null)
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

  <!-- 1. Pain points (white) -->
  <div v-if="painPoints.length" class="stripe stripe--white">
    <section class="stripe-inner problem-section" role="region" aria-labelledby="problem-heading">
      <div class="problem-intro">
        <div class="problem-badge-wrap">
          <v-chip color="primary" class="problem-badge" aria-label="Audience challenge badge">
            <span class="text-overline">The Challenge</span>
          </v-chip>
        </div>
        <h2 id="problem-heading" class="section-title">{{ painTitle }}</h2>
        <p class="section-subtitle">{{ painSubtitle }}</p>
      </div>
      <div class="problem-grid" role="list">
        <article
          v-for="(item, index) in painPoints"
          :key="`${item.title}-${index}`"
          class="problem-card"
          role="listitem"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <div class="problem-card-footer">
            <span class="problem-impact">{{ item.impact }}</span>
            <button
              v-if="item.solution"
              class="solution-toggle"
              :aria-expanded="openSolution === index"
              @click="openSolution = openSolution === index ? null : index"
            >
              Solution
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round"
                :style="{ transform: openSolution === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }"
                aria-hidden="true"
              ><polyline points="6 9 12 15 18 9" /></svg>
            </button>
          </div>
          <div v-if="item.solution && openSolution === index" class="solution-reveal">
            {{ item.solution }}
          </div>
        </article>
      </div>
    </section>
  </div>

  <!-- 2. After-pain slot -->
  <div v-if="$slots.afterPain" class="stripe" :class="`stripe--${afterPainStripe}`">
    <div id="after-pain" class="stripe-inner persona-slot" aria-label="Persona-specific feature section">
      <slot name="afterPain" />
    </div>
  </div>

  <!-- 3. Testimonials (white) -->
  <div v-if="showTestimonials" class="stripe stripe--white">
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

  <!-- 4. Mid CTA (blue) -->
  <div v-if="midCtaTitle" class="stripe stripe--blue">
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

  <!-- 5. Design (white) -->
  <div v-if="$slots.designContent" class="stripe stripe--white">
    <div id="design-system" class="stripe-inner persona-slot" aria-label="Design section">
      <slot name="designContent" />
    </div>
  </div>
  <div v-else-if="showDesign" class="stripe stripe--white">
    <section id="design-system" class="stripe-inner section-block" aria-labelledby="design-title">
      <h2 id="design-title" class="section-title">{{ designTitle }}</h2>
      <p v-if="designPain" class="pain-callout">{{ designPain }}</p>
      <p class="section-subtitle constrained">{{ designDescription }}</p>
      <DesignSystem :is-dark="isDark" class="mt-6" />
    </section>
  </div>

  <!-- 6. Automation (blue) -->
  <div v-if="showAutomation" class="stripe stripe--blue">
    <section id="automation" class="stripe-inner section-block" aria-labelledby="automation-title">
      <h2 id="automation-title" class="section-title">{{ automationTitle }}</h2>
      <p v-if="automationPain" class="pain-callout">{{ automationPain }}</p>
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

  <!-- 7. Rendering (white) -->
  <div v-if="$slots.renderingContent" class="stripe stripe--white">
    <div id="rendering" class="stripe-inner persona-slot" aria-label="Rendering content">
      <p v-if="renderingPain" class="pain-callout">{{ renderingPain }}</p>
      <slot name="renderingContent" />
    </div>
  </div>
  <div v-else-if="renderingTitle" class="stripe stripe--white">
    <section id="rendering-reliability" class="stripe-inner section-block" aria-labelledby="rendering-title">
      <h2 id="rendering-title" class="section-title">{{ renderingTitle }}</h2>
      <p v-if="renderingPain" class="pain-callout">{{ renderingPain }}</p>
      <p class="section-subtitle constrained">{{ renderingDescription }}</p>
    </section>
  </div>

  <!-- 8. Deliverability (blue) -->
  <div v-if="$slots.deliverabilityContent" class="stripe stripe--blue">
    <div id="deliverability" class="stripe-inner persona-slot" aria-label="Deliverability content">
      <p v-if="deliverabilityPain" class="pain-callout">{{ deliverabilityPain }}</p>
      <slot name="deliverabilityContent" />
    </div>
  </div>
  <div v-else-if="deliverabilityTitle" class="stripe stripe--blue">
    <section id="deliverability" class="stripe-inner section-block" aria-labelledby="deliverability-title">
      <h2 id="deliverability-title" class="section-title">{{ deliverabilityTitle }}</h2>
      <p v-if="deliverabilityPain" class="pain-callout">{{ deliverabilityPain }}</p>
      <p class="section-subtitle constrained">{{ deliverabilityDescription }}</p>
    </section>
  </div>

  <!-- 9. Analytics -->
  <div class="stripe" :class="`stripe--${analyticsStripe}`">
    <div v-if="$slots.analyticsContent" id="analytics-title" class="stripe-inner persona-slot" aria-label="Analytics content">
      <p v-if="analyticsPain" class="pain-callout">{{ analyticsPain }}</p>
      <slot name="analyticsContent" />
    </div>
    <section v-else class="stripe-inner section-block" aria-labelledby="analytics-title">
      <h2 id="analytics-title" class="section-title">{{ analyticsTitle }}</h2>
      <p v-if="analyticsPain" class="pain-callout">{{ analyticsPain }}</p>
      <p class="section-subtitle constrained">{{ analyticsDescription }}</p>
      <v-card class="d-flex justify-center mt-4" variant="elevated" role="img" aria-label="Analytics dashboard screenshot">
        <img alt="Analytics dashboard screenshot" src="/assets/analytics-alt.webp" loading="lazy" width="1920" height="1080" />
      </v-card>
    </section>
  </div>

  <!-- 10. Integrations (blue) -->
  <div v-if="showIntegrations" class="stripe stripe--blue">
    <section class="stripe-inner section-block" aria-labelledby="integrations-title">
      <h2 id="integrations-title" class="visually-hidden">Integrations</h2>
      <Integration :is-dark="isDark" />
    </section>
  </div>

  <!-- 11. Bottom slot (white) -->
  <div v-if="$slots.bottom" class="stripe stripe--white">
    <div id="workflow" class="stripe-inner persona-slot" aria-label="Audience-specific section">
      <slot name="bottom" />
    </div>
  </div>

  <!-- 12. Final CTA -->
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

.problem-section,
.section-block,
.persona-slot,
.final-cta {
  padding: 72px 24px;
}

.mid-cta {
  padding: 56px 24px;
}

.problem-intro,
.section-title,
.section-subtitle {
  text-align: center;
}

.problem-intro {
  position: relative;
  z-index: 1;
}

.problem-badge-wrap {
  margin-bottom: 10px;
}

.problem-badge {
  height: auto !important;
  padding: 6px 12px !important;
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

.pain-callout {
  display: table;
  margin: 0 auto 20px;
  padding: 6px 16px;
  background: rgba(239, 68, 68, 0.08);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: #b91c1c;
  text-align: center;
}

html.dark .pain-callout {
  background: rgba(239, 68, 68, 0.14);
  color: #fca5a5;
}

.problem-grid {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  position: relative;
  z-index: 1;
}

.problem-card {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 230px;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

html.dark .problem-card {
  background: rgba(31, 41, 55, 0.9);
  border-color: #374151;
}

.problem-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(239, 68, 68, 0.3);
  border-color: rgba(239, 68, 68, 0.6);
  background: rgba(255, 255, 255, 0.98);
}

html.dark .problem-card:hover {
  background: rgba(31, 41, 55, 0.98);
  border-color: rgba(239, 68, 68, 0.7);
  box-shadow: 0 20px 60px rgba(239, 68, 68, 0.4);
}

.problem-card h3 {
  font-size: 18px;
  margin: 0;
  line-height: 1.35;
  transition: color 0.25s ease;
}

.problem-card:hover h3 {
  color: #dc2626;
}

html.dark .problem-card:hover h3 {
  color: #ef4444;
}

.problem-card p {
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
  transition: color 0.25s ease;
}

html.dark .problem-card p {
  color: #9ca3af;
}

.problem-card-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.solution-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(16, 185, 129, 0.1);
  color: #047857;
  border: none;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.solution-toggle:hover {
  background: rgba(16, 185, 129, 0.18);
}

html.dark .solution-toggle {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

html.dark .solution-toggle:hover {
  background: rgba(16, 185, 129, 0.25);
}

.solution-reveal {
  background: rgba(16, 185, 129, 0.07);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 13px;
  line-height: 1.6;
  color: #064e3b;
}

html.dark .solution-reveal {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
}

.problem-impact {
  align-self: flex-start;
  background: rgba(19, 176, 238, 0.12);
  color: #0e7490;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  transition: background 0.25s ease, color 0.25s ease;
}

html.dark .problem-impact {
  background: rgba(19, 176, 238, 0.2);
  color: #67e8f9;
}

.problem-card:hover .problem-impact {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

html.dark .problem-card:hover .problem-impact {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

@media (prefers-reduced-motion: reduce) {
  .problem-card,
  .problem-card h3,
  .problem-card p,
  .problem-impact {
    transition: none;
  }
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

@media (max-width: 1100px) {
  .problem-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 760px) {
  .problem-grid {
    grid-template-columns: 1fr;
  }

  .problem-section,
  .section-block,
  .persona-slot,
  .mid-cta,
  .final-cta {
    padding: 56px 16px;
  }
}

@media (max-width: 480px) {
  .problem-section,
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
