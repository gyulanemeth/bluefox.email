<script setup>
import { useDisplay } from 'vuetify'
import { useData } from 'vitepress'

import BrandLogos from '../../.vitepress/theme/BrandLogos.vue'
import DesignSystem from '../../.vitepress/theme/DesignSystem.vue'
import Automation from '../../.vitepress/theme/Automation.vue'
import RenderingIssues from '../../.vitepress/theme/RenderingIssues.vue'
import Integration from '../../.vitepress/theme/Integration.vue'
import AppleMailTestimonials from '../../.vitepress/theme/AppleMailTestimonials.vue'
import PersonaHero from './PersonaHero.vue'

defineProps({
  heroBadge: { type: String, required: true },
  heroTitle: { type: String, required: true },
  heroDescription: { type: String, required: true },
  heroHighlights: { type: Array, default: () => [] },
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
  designTitle: { type: String, required: true },
  designDescription: { type: String, required: true },
  automationTitle: { type: String, required: true },
  automationDescription: { type: String, required: true },
  renderingTitle: { type: String, required: true },
  renderingDescription: { type: String, required: true },
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
    :cta-text="ctaText"
    :cta-href="ctaHref"
  />

  <section class="brand-strip" aria-labelledby="brand-strip-title">
    <h2 id="brand-strip-title" class="visually-hidden">Brand trust strip</h2>
    <BrandLogos />
  </section>

  <section class="problem-section" role="region" aria-labelledby="problem-heading">
    <div class="problem-intro">
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

  <section id="rendering-reliability" class="section-block" aria-labelledby="rendering-title">
    <h2 id="rendering-title" class="section-title">{{ renderingTitle }}</h2>
    <p class="section-subtitle constrained">{{ renderingDescription }}</p>
    <RenderingIssues
      class="mt-6"
      :is-dark="isDark"
      :lg-and-up="lgAndUp"
      :md="md"
      :sm="sm"
      :xs="xs"
    />
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

.brand-strip {
  padding: 0 24px 18px;
}

.problem-section,
.section-block,
.final-cta {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 24px;
}

.problem-section {
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.03), rgba(57, 44, 145, 0.03));
  border-radius: 16px;
}

html.dark .problem-section {
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.08), rgba(57, 44, 145, 0.08));
}

.problem-intro,
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

.problem-grid {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.problem-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

html.dark .problem-card {
  background: rgba(31, 41, 55, 0.9);
  border-color: #374151;
}

.problem-card h3 {
  font-size: 18px;
  margin: 0;
}

.problem-card p {
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
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
}

html.dark .problem-impact {
  background: rgba(19, 176, 238, 0.2);
  color: #67e8f9;
}

.final-cta {
  text-align: center;
  padding-top: 34px;
  padding-bottom: 96px;
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

  .persona-hero,
  .problem-section,
  .section-block,
  .final-cta {
    padding-left: 16px;
    padding-right: 16px;
  }

  .problem-section,
  .section-block,
  .final-cta {
    padding-top: 56px;
    padding-bottom: 56px;
  }
}
</style>
