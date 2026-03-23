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
  heroFeatureTitle: { type: String, required: true },
  heroFeatureSubtitle: { type: String, default: '' },
  heroFeatureItems: { type: Array, default: () => [] },
  ctaText: { type: String, required: true },
  ctaHref: { type: String, required: true },
  painTitle: { type: String, required: true },
  painSubtitle: { type: String, required: true },
  painPoints: {
    type: Array,
    required: true,
    validator: (value) => value.length >= 3
  },
  testimonialTitle: { type: String, required: true },
  midCtaTitle: { type: String, default: '' },
  midCtaDescription: { type: String, default: '' },
  designTitle: { type: String, required: true },
  designDescription: { type: String, required: true },
  automationTitle: { type: String, required: true },
  automationDescription: { type: String, required: true },
  renderingTitle: { type: String, default: '' },
  renderingDescription: { type: String, default: '' },
  deliverabilityTitle: { type: String, default: '' },
  deliverabilityDescription: { type: String, default: '' },
  deliverabilityFeatures: { type: Array, default: () => [] },
  analyticsTitle: { type: String, required: true },
  analyticsDescription: { type: String, required: true },
  finalTitle: { type: String, required: true },
  finalDescription: { type: String, required: true }
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
  />

  <section class="problem-section" role="region" aria-labelledby="problem-heading">
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
        <span class="problem-impact">{{ item.impact }}</span>
      </article>
    </div>
  </section>

  <section v-if="$slots.afterPain" class="persona-slot" aria-label="Persona-specific feature section">
    <slot name="afterPain" />
  </section>

  <section class="section-block" aria-labelledby="testimonials-heading">
    <h2 id="testimonials-heading" class="section-title">{{ testimonialTitle }}</h2>
    <AppleMailTestimonials
      :is-dark="isDark"
      :lg-and-up="lgAndUp"
      :md="md"
      :sm="sm"
      :xs="xs"
    />
  </section>

  <section v-if="midCtaTitle" class="mid-cta" aria-labelledby="mid-cta-heading">
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

  <section id="design-system" class="section-block" aria-labelledby="design-title">
    <h2 id="design-title" class="section-title">{{ designTitle }}</h2>
    <p class="section-subtitle constrained">{{ designDescription }}</p>
    <DesignSystem :is-dark="isDark" class="mt-6" />
  </section>

  <section id="automation" class="section-block" aria-labelledby="automation-title">
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

  <section v-if="$slots.renderingContent" class="persona-slot" aria-label="Rendering content">
    <slot name="renderingContent" />
  </section>
  <section v-else-if="renderingTitle" id="rendering-reliability" class="section-block" aria-labelledby="rendering-title">
    <h2 id="rendering-title" class="section-title">{{ renderingTitle }}</h2>
    <p class="section-subtitle constrained">{{ renderingDescription }}</p>
  </section>

  <section v-if="$slots.deliverabilityContent" class="persona-slot" aria-label="Deliverability content">
    <slot name="deliverabilityContent" />
  </section>
  <section v-else-if="deliverabilityTitle" id="deliverability" class="section-block" aria-labelledby="deliverability-title">
    <h2 id="deliverability-title" class="section-title">{{ deliverabilityTitle }}</h2>
    <p class="section-subtitle constrained">{{ deliverabilityDescription }}</p>
  </section>

  <section class="section-block" aria-labelledby="analytics-title">
    <h2 id="analytics-title" class="section-title">{{ analyticsTitle }}</h2>
    <p class="section-subtitle constrained">{{ analyticsDescription }}</p>
    <v-card class="d-flex justify-center mt-4" variant="elevated" role="img" aria-label="Analytics dashboard screenshot">
      <img alt="Analytics dashboard screenshot" src="/assets/analytics-alt.webp" loading="lazy" width="1920" height="1080" />
    </v-card>
  </section>

  <section class="section-block" aria-labelledby="integrations-title">
    <h2 id="integrations-title" class="visually-hidden">Integrations</h2>
    <Integration :is-dark="isDark" />
  </section>

  <section class="final-cta" aria-labelledby="final-cta-title">
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

  <section v-if="$slots.bottom" class="bottom-extension" aria-label="Audience-specific section">
    <slot name="bottom" />
  </section>
</template>

<style scoped>
.hero-cta {
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-radius: 10px !important;
  min-height: 56px !important;
  padding: 0 30px !important;
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

.problem-section,
.section-block,
.final-cta {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 24px;
}

/* Spacing fix: create breathing room between full-bleed hero and first section */
.problem-section {
  margin-top: 56px;
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.03), rgba(57, 44, 145, 0.03));
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

html.dark .problem-section {
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.08), rgba(57, 44, 145, 0.08));
}

.problem-section::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(19, 176, 238, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(19, 176, 238, 0.03) 1px, transparent 1px);
  background-size: 44px 44px;
  opacity: 0.55;
}

html.dark .problem-section::before {
  background-image:
    linear-gradient(rgba(19, 176, 238, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(19, 176, 238, 0.05) 1px, transparent 1px);
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

.problem-grid {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  position: relative;
  z-index: 1;
}

.problem-card {
  background: rgba(255, 255, 255, 0.9);
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

.problem-impact {
  margin-top: auto;
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

/* Persona-specific slot between pain points and testimonials */
.persona-slot {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 24px;
}

/* Mid-page CTA strip */
.mid-cta {
  position: relative;
  left: calc(-50vw + 50%);
  width: 100vw;
  background: linear-gradient(135deg, rgba(57, 44, 145, 0.06) 0%, rgba(19, 176, 238, 0.06) 100%);
  border-top: 1px solid rgba(19, 176, 238, 0.12);
  border-bottom: 1px solid rgba(19, 176, 238, 0.12);
  padding: 56px 24px;
}

html.dark .mid-cta {
  background: linear-gradient(135deg, rgba(57, 44, 145, 0.12) 0%, rgba(19, 176, 238, 0.12) 100%);
  border-color: rgba(19, 176, 238, 0.2);
}

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
}

.mid-cta-btn :deep(.v-btn__content) {
  line-height: 1.2;
}

.mid-cta-btn strong {
  line-height: 1.2;
}

.final-cta {
  text-align: center;
  padding-top: 34px;
  padding-bottom: 96px;
}

.bottom-extension {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 80px;
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
  .problem-section {
    margin-top: 40px;
  }

  .problem-grid {
    grid-template-columns: 1fr;
  }

  .persona-hero,
  .problem-section,
  .section-block,
  .final-cta {
    padding-left: 16px;
    padding-right: 16px;
  }

  .persona-slot {
    padding: 56px 16px;
  }

  .bottom-extension {
    padding: 24px 16px 56px;
  }

  .problem-section,
  .section-block,
  .final-cta {
    padding-top: 56px;
    padding-bottom: 56px;
  }
}
</style>
