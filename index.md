---
layout: home

title: BlueFox Email — Reliable email for every sender
description: Transactional, marketing, and automated emails on one platform. Pay per send, not per contact. Built on your Amazon SES or ours.

head:
  - - meta
    - name: description
      content: "Transactional, marketing, and automated emails on one platform. Pay per send, not per contact. Built on your Amazon SES or ours."
  - - meta
    - property: og:title
      content: BlueFox Email — Reliable email for every sender
  - - meta
    - property: og:description
      content: "Transactional, marketing, and automated emails on one platform. Pay per send, not per contact. Built on your Amazon SES or ours."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/share.png
  - - meta
    - property: og:url
      content: https://bluefox.email
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: BlueFox Email — Reliable email for every sender
  - - meta
    - name: twitter:description
      content: "Transactional, marketing, and automated emails on one platform. Pay per send, not per contact. Built on your Amazon SES or ours."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/share.png
---

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useDisplay } from 'vuetify'
import { useData } from 'vitepress'

import HeroUnit from './.vitepress/theme/HeroUnit.vue'
import BrandLogos from './.vitepress/theme/BrandLogos.vue'
import DesignSystem from './.vitepress/theme/DesignSystem.vue'
import RenderingIssues from './.vitepress/theme/RenderingIssues.vue'
import Automation from './.vitepress/theme/Automation.vue'
import Integration from './.vitepress/theme/Integration.vue'
import AppleMailTestimonials from './.vitepress/theme/AppleMailTestimonials.vue'
import TemplateShowcase from './.vitepress/theme/TemplateShowcase.vue'
import AgencyAnalytics from './for/marketing-agencies/AgencyAnalytics.vue'

const { lgAndUp, md, sm, xs } = useDisplay()
const { isDark } = useData()

const shouldLoadEditorVideo = ref(false)
const editorVideoContainer = ref(null)
let editorVideoObserver

function getObserverTarget(target) {
  if (!target || typeof window === 'undefined') {
    return null
  }
  const resolvedTarget = target.$el || target
  return resolvedTarget instanceof window.Element ? resolvedTarget : null
}

onMounted(() => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    shouldLoadEditorVideo.value = true
    return
  }

  const observerTarget = getObserverTarget(editorVideoContainer.value)

  if (!observerTarget) {
    shouldLoadEditorVideo.value = true
    return
  }

  editorVideoObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        shouldLoadEditorVideo.value = true
        editorVideoObserver.disconnect()
      }
    },
    { rootMargin: '200px 0px' }
  )

  editorVideoObserver.observe(observerTarget)
})

onBeforeUnmount(() => {
  if (editorVideoObserver) {
    editorVideoObserver.disconnect()
  }
})
</script>

<style scoped>
  a {
    text-decoration: none !important;
  }

  /* Stripe owns vertical rhythm; section classes only inherit horizontal */
  .section-index,
  .value-prop {
    padding-top: 0;
    padding-bottom: 0;
  }

  h2 {
    border-top: 0 !important;
  }

  .sectionTitle {
    font-size: 30px !important;
  }
  @media (max-width: 640px) {
    .sectionTitle {
      font-size: 26px !important;
    }
  }

  .value-prop p {
    font-size: 18px;
    line-height: 28px;
  }

  .value-prop .VPButton.medium {
    padding: 15px 30px;
    line-height: 22px;
    font-size: 22px;
  }

  .VPHome {
    margin-bottom: 0 !important;
  }

  .vp-doc .actions {
    display: flex;
    width: 100% !important;
    max-width: unset !important;
    justify-content: center !important;
  }

  .vp-doc .action {
    padding: 6px;
  }

  .VPButton {
    display: inline-block;
    border: 1px solid transparent;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s !important;
    text-decoration: none !important;
  }

  .VPButton.brand {
      border-color: var(--vp-button-brand-border);
      color: var(--vp-button-brand-text);
      background-color: var(--vp-button-brand-bg);
  }

  .VPButton.brand:hover {
    color: var(--vp-button-brand-text);
    background-color: var(--vp-button-brand-hover-bg);
  }

  .VPButton.alt {
    border-color: var(--vp-button-alt-border);
    color: var(--vp-button-alt-text);
    background-color: var(--vp-button-alt-bg);
  }

  .VPButton.alt:hover {
    border-color: var(--vp-button-alt-border);
    color: var(--vp-button-alt-text);
    background-color: var(--vp-button-alt-hover-bg);
  }

  .VPFeatures .title {
    font-size: 20px !important;
  }
  .VPFeatures .details {
    font-size: 16px !important;
  }

  .VPImage {
    max-width: 100% !important;
    max-height: 100% !important;
  }

  /* This rule ensures the video player's captions are not tiny on mobile */
  video::cue {
    font-size: 14px;
  }

  #email-editor video {
    border: 1px solid #eeeeee;
    border-radius: 5px;
  }

  .vp-doc input {
    display: none;
  }

  #design-system label {
    cursor: pointer;
    position: relative;
  }

  .image-container {
    position: relative;
    width: 600px;
    max-width: 80vw;
    height: 800px;
    max-height: 120vw;
    overflow: hidden;
    background: #f6f6f6;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    margin: auto;
  }

  .image-container img {
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    opacity: 0;
    transition: all 0.5s ease;
  }

  #image1:checked ~ .image-container .img1 {
    opacity: 1;
    transform: translateX(-100%);
  }

  #image2:checked ~ .image-container .img2 {
    opacity: 1;
    transform: translateX(-100%);
  }

  #image3:checked ~ .image-container .img3 {
    opacity: 1;
    transform: translateX(-100%);
  }

  #image4:checked ~ .image-container .img4 {
    opacity: 1;
    transform: translateX(-100%);
  }

  .image-container img {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  #design-system label::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, hsl(196.99, 86.56%, 50.39%) 10%, hsl(247.72, 53.44%, 37.06%) 90%);
    transition: width 0.3s ease;
  }

  #image1:checked ~ div #image1-label::after {
    width: 100%;
  }

  #image2:checked ~ div #image2-label::after {
    width: 100%;
  }

  #image3:checked ~ div #image3-label::after {
    width: 100%;
  }

  #image4:checked ~ div #image4-label::after {
    width: 100%;
  }

  #great-deliverability {
    background: #392C91;
    color: white;
    padding: 100px;
    margin-top: 100px;
    border-radius: 5px;
  }

  .vp-doc #great-deliverability h2 {
    margin: 0 0 10px 0 !important;
    padding-top: 0 !important;
  }

  .persona-hub {
    padding-top: 0;
    padding-bottom: 0;
  }

  .persona-hub-intro {
    max-width: 720px;
    margin: 16px auto 40px;
    text-align: center;
    color: #4b5563;
    line-height: 1.7;
    font-size: 17px;
  }

  html.dark .persona-hub-intro {
    color: #9ca3af;
  }

  .persona-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 960px;
    margin: 0 auto;
  }

  .persona-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 28px 28px 24px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    text-decoration: none !important;
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  html.dark .persona-card {
    background: #1e293b;
    border-color: #334155;
  }

  .persona-card:hover {
    border-color: rgba(19, 176, 238, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(19, 176, 238, 0.12);
  }

  .persona-card-title {
    font-size: 19px;
    font-weight: 700;
    color: #0f172a;
  }

  html.dark .persona-card-title {
    color: #f1f5f9;
  }

  .persona-card-desc {
    font-size: 14.5px;
    line-height: 1.6;
    color: #475569;
    flex: 1;
  }

  html.dark .persona-card-desc {
    color: #94a3b8;
  }

  .persona-card-link {
    font-size: 14px;
    font-weight: 600;
    color: #13B0EE;
    margin-top: 4px;
  }

  @media (max-width: 760px) {
    .persona-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }
    .persona-card {
      padding: 22px 22px 20px;
    }
  }

  .template-showcase {
    padding-top: 0;
    padding-bottom: 0;
  }

  .template-showcase-intro {
    max-width: 760px;
    margin: 20px auto 36px;
    text-align: center;
    color: #4b5563;
    line-height: 1.7;
    font-size: 17px;
  }

  html.dark .template-showcase-intro {
    color: #9ca3af;
  }

  /* Homepage-only: center AgencyAnalytics header to match other sections */
  .home-analytics :deep(.analytics-head) {
    text-align: center;
  }

  .home-analytics :deep(.analytics-head p) {
    margin-left: auto;
    margin-right: auto;
  }

  /* Homepage-only: stripe-inner owns vertical padding, zero out component padding */
  .home-analytics :deep(.agency-analytics) {
    padding: 0;
  }

  /* Final CTA Section */
  .final-cta-section {
    padding: 0;
    position: relative;
  }

  .cta-container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .cta-badge-wrapper {
    margin-bottom: 24px;
    animation: fadeInUp 0.6s ease;
  }

  .cta-badge {
    padding: 8px 20px !important;
    height: auto !important;
  }

  .cta-title {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 24px;
    color: #1f2937;
    background: linear-gradient(135deg, #1f2937 0%, #392C91 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fadeInUp 0.6s ease 0.1s both;
    border-top: 0 !important;
    padding-top: 0 !important;
  }

  html.dark .cta-title {
    background: linear-gradient(135deg, #f3f4f6 0%, #13B0EE 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .cta-description {
    font-size: clamp(16px, 2vw, 19px);
    color: #4b5563;
    line-height: 1.7;
    margin: 0 auto 48px;
    max-width: 680px;
    font-weight: 400;
    animation: fadeInUp 0.6s ease 0.2s both;
  }

  html.dark .cta-description {
    color: #9ca3af;
  }

  .cta-button-wrapper {
    animation: fadeInUp 0.6s ease 0.3s both;
    margin-bottom: 32px;
  }

  .cta-primary-button {
    font-size: 18px !important;
    padding: 28px 48px !important;
    height: auto !important;
    border-radius: 12px !important;
    text-transform: none !important;
    letter-spacing: 0 !important;
    box-shadow: 0 10px 40px rgba(19, 176, 238, 0.25) !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    position: relative;
    overflow: hidden;
  }

  .cta-primary-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  .cta-primary-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 50px rgba(19, 176, 238, 0.35) !important;
  }

  .cta-primary-button:hover::before {
    left: 100%;
  }

  html.dark .cta-primary-button {
    box-shadow: 0 10px 40px rgba(19, 176, 238, 0.3) !important;
  }

  html.dark .cta-primary-button:hover {
    box-shadow: 0 15px 50px rgba(19, 176, 238, 0.45) !important;
  }

  .cta-subtext {
    margin-top: 16px;
    font-size: 14px;
    color: #6b7280;
    font-weight: 500;
  }

  html.dark .cta-subtext {
    color: #9ca3af;
  }

  .cta-trust-indicators {
    display: flex;
    gap: 32px;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    animation: fadeInUp 0.6s ease 0.4s both;
    max-width: 600px;
    margin: 0 auto;
  }

  html.dark .cta-trust-indicators {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #4b5563;
    font-weight: 500;
  }

  html.dark .trust-item {
    color: #9ca3af;
  }

  /* Meet Founder Section */
  .founder-section {
    padding: 0;
    position: relative;
  }

  .founder-inner {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  .founder-photo-wrap {
    margin: 0 auto 22px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    padding: 4px;
    background: linear-gradient(135deg, #13B0EE 0%, #392C91 100%);
    box-shadow: 0 14px 36px rgba(19, 176, 238, 0.22);
  }

  .founder-photo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }

  .founder-eyebrow {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #13B0EE;
    margin-bottom: 16px;
  }

  .founder-title {
    border-top: 0 !important;
    padding-top: 0 !important;
    margin: 0 0 20px;
    font-size: clamp(36px, 5vw, 56px);
    line-height: 1.1;
    font-weight: 800;
    letter-spacing: -1.5px;
    background: linear-gradient(135deg, #1f2937 0%, #392C91 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  html.dark .founder-title {
    background: linear-gradient(135deg, #f3f4f6 0%, #13B0EE 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .founder-description {
    max-width: 720px;
    margin: 0 auto;
    color: #6b7280;
    font-size: clamp(16px, 1.8vw, 18px);
    line-height: 1.7;
  }

  html.dark .founder-description {
    color: #9ca3af;
  }

  .founder-actions {
    margin-top: 30px;
  }

  .founder-team-button {
    min-height: 54px !important;
    padding: 0 30px !important;
    border-radius: 12px !important;
    font-size: 16px !important;
    text-transform: none !important;
    letter-spacing: 0 !important;
    font-weight: 700 !important;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .cta-primary-button {
      font-size: 16px !important;
      padding: 20px 36px !important;
      width: 100%;
      max-width: 400px;
    }

    .cta-trust-indicators {
      gap: 20px;
      flex-direction: column;
      align-items: center;
    }

    .founder-description {
      font-size: 16px;
      line-height: 1.7;
    }

    .founder-photo-wrap {
      width: 140px;
      height: 140px;
      margin-bottom: 18px;
    }

    .founder-team-button {
      width: 100%;
      max-width: 360px;
    }

    .template-showcase-intro {
      font-size: 15px;
      margin: 16px auto 26px;
    }
  }

  @media (max-width: 599px) {
    .VPHero .main {
      padding: 0;
    }

    .VPHero .main .name {
      font-size: 48px;
      line-height: 48px;
      width: 100% !important;
      max-width: unset !important;
    }

    .value-prop h2 {
      font-size: 20px !important;
      line-height: 20px !important;
    }

    #great-deliverability {
      padding: 25px;
    }

    .cta-description {
      margin-bottom: 36px;
    }

    .cta-button-wrapper {
      margin-bottom: 24px;
    }

    .cta-primary-button {
      font-size: 15px !important;
      padding: 18px 32px !important;
    }

    .founder-actions {
      margin-top: 24px;
    }

    .founder-photo-wrap {
      width: 124px;
      height: 124px;
    }
  }

  .mt-150 {
    margin-top: 150px !important;
  }

  /* Alternating full-bleed stripes (matches /for/* persona pages) */
  .stripe {
    position: relative;
    left: calc(-50vw + 50%);
    width: 100vw;
    box-sizing: border-box;
  }

  .stripe--white { background: #ffffff; }
  .stripe--blue  { background: #eef8fd; }

  html.dark .stripe--white { background: #0f172a; }
  html.dark .stripe--blue  { background: #0c1e2d; }

  .stripe-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 88px 24px;
  }

  @media (max-width: 960px) {
    .stripe-inner {
      padding: 64px 24px;
    }
  }

  @media (max-width: 760px) {
    .stripe-inner {
      padding: 56px 16px;
    }
  }

  @media (max-width: 599px) {
    .stripe-inner {
      padding: 48px 16px;
    }
  }
</style>

<!-- 1. HERO - First impression with value proposition -->
<main id="hero">
  <HeroUnit />
</main>

<!-- 2. TEMPLATE SHOWCASE -->
<div class="stripe stripe--white"><div class="stripe-inner">
<section class="section-index template-showcase" role="region" aria-labelledby="templates-heading">
  <h2 id="templates-heading" class="sectionTitle text-center mt-4 mb-3 pt-0">
    Start from a professional template
  </h2>
  <p class="template-showcase-intro">
    Ready-made layouts for newsletters, transactional emails, product launches, and lifecycle campaigns. Apply your theme, update the copy, and send.
  </p>
  <TemplateShowcase
    :is-dark="isDark"
    :lg-and-up="lgAndUp"
    :md="md"
    :sm="sm"
    :xs="xs"
  />
  <div class="d-flex justify-center mt-6">
    <v-btn
      size="large"
      color="primary"
      variant="flat"
      href="https://app.bluefox.email/accounts/create-account"
      target="_blank"
      aria-label="Explore all email templates"
    >
      Explore All Templates
    </v-btn>
  </div>
</section>

</div></div>

<!-- 3. SOCIAL PROOF - Build trust early -->
<div class="stripe stripe--blue"><div class="stripe-inner">
<section role="region" aria-labelledby="testimonials-heading">
  <h2 id="testimonials-heading" class="sectionTitle text-center mt-4 mb-6">
    What teams say about BlueFox Email
  </h2>
  <AppleMailTestimonials
    :is-dark="isDark"
    :lg-and-up="lgAndUp"
    :md="md"
    :sm="sm"
    :xs="xs"
  />
</section>
</div></div>

<!-- 4. BRAND LOGOS - Trust indicators -->
<div class="stripe stripe--white"><div class="stripe-inner">
<section aria-labelledby="brand-logos-heading">
  <BrandLogos />
</section>
</div></div>

<!-- 5. SOLUTION: Design System -->
<div class="stripe stripe--blue"><div class="stripe-inner">
<section id="design-system" class="section-index" role="region" aria-labelledby="design-system-heading">
  <div class="d-flex justify-center">
    <v-chip color="primary" aria-label="Design system badge">
      <span class="text-overline">Design System</span>
    </v-chip>
  </div>
  <h2 id="design-system-heading" class="sectionTitle text-center mt-4 mb-3 pt-0">
    Build your theme once, reuse it everywhere
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Define brand colors, typography, and components once. Every template, campaign, and transactional email stays on-brand. Update the theme, and every email updates with it.
    </div>
  </div>

  <DesignSystem
    class="mt-6"
    :is-dark="isDark"
  />
</section>
</div></div>

<!-- 6. SOLUTION: Visual Editor -->
<div class="stripe stripe--white"><div class="stripe-inner">
<section id="marketers" class="value-prop" role="region" aria-labelledby="email-editor-heading">
  <h2 id="email-editor-heading" class="sectionTitle text-center mt-4 mb-3 pt-0">
    Design emails visually, render them reliably
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      A drag-and-drop editor that outputs HTML tested against Gmail, Outlook, Apple Mail, and mobile clients. No hand-coded tables, no rendering surprises.
    </div>
  </div>
  <v-card ref="editorVideoContainer" class="d-flex justify-center mt-4" variant="elevated" role="region" aria-label="Editor demo video">
    <video
      width="100%"
      :autoplay="(lgAndUp || md) && shouldLoadEditorVideo"
      :loop="(lgAndUp || md) && shouldLoadEditorVideo"
      :controls="sm || xs"
      muted
      preload="none"
    >
      <source v-if="shouldLoadEditorVideo" src="/assets/bluefox-email-editor-intro.mp4" type="video/mp4">
      <!-- Captions track so accessibility audit picks up subtitles -->
      <track kind="captions" src="/assets/captions/email-editor-intro-en.vtt" srclang="en" label="English captions" default>
      Your browser does not support the video tag.
    </video>
  </v-card>
</section>
</div></div>

<!-- 7. SOLUTION: Automation -->
<div class="stripe stripe--blue"><div class="stripe-inner">
<section class="value-prop" role="region" aria-labelledby="automation-heading">
  <h2 id="automation-heading" class="sectionTitle text-center mt-4 mb-3 pt-0">
    Automate the sequences that matter
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Onboarding flows, drip sequences, re-engagement campaigns, and event-triggered emails. Configure once, let them run, and adjust when the data tells you to.
    </div>
  </div>

  <Automation
    class="mt-6"
    :is-dark="isDark"
    :lg-and-up="lgAndUp"
    :md="md"
    :sm="sm"
    :xs="xs"
  />
</section>
</div></div>

<!-- 8. SOLUTION: Rendering -->
<div class="stripe stripe--white"><div class="stripe-inner">
<section id="no-rendering-issues" class="value-prop" role="region" aria-labelledby="rendering-heading">
  <h2 id="rendering-heading" class="sectionTitle text-center mb-3">
    Consistent rendering across every major client
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Gmail, Outlook (2016 onward), Apple Mail, mobile, and dark mode. The generated HTML is tested against the clients your recipients actually use.
    </div>
  </div>

  <RenderingIssues
    class="mt-6"
    :is-dark="isDark"
    :lg-and-up="lgAndUp"
    :md="md"
    :sm="sm"
    :xs="xs"
  />
</section>
</div></div>

<!-- 9. SOLUTION: List Management & Compliance -->
<div class="stripe stripe--blue"><div class="stripe-inner">
<section class="section-index value-prop" role="region" aria-labelledby="list-management-heading">
  <h2 id="list-management-heading" class="sectionTitle text-center mt-4 mb-3 pt-0">
    Compliant list management out of the box
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Double opt-in, one-click unsubscribe, subscription preferences, and automated suppression lists. Stay aligned with GDPR, CAN-SPAM, and the current Gmail and Yahoo sender requirements.
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated" role="img" aria-label="List management dashboard screenshot">
    <img alt="List management dashboard showing compliance features including double opt-in, unsubscribe management, and automated suppression lists" src="/assets/list-management.webp" loading="lazy" width="1920" height="1080" />
  </v-card>
</section>
</div></div>

<!-- 10. SOLUTION: Analytics -->
<div class="stripe stripe--white"><div class="stripe-inner">
<section class="value-prop home-analytics" role="region" aria-labelledby="analytics-heading">
  <AgencyAnalytics
    title="Analytics that show what happened"
    description="Delivery, opens, clicks, bounces, and subscription trends. Switch between hourly, daily, weekly, and monthly views. Export when you need to share."
    default-tab="daily"
  />
</section>
</div></div>

<!-- 12. INTEGRATIONS - Connect with your stack -->
<div class="stripe stripe--blue"><div class="stripe-inner">
<section class="value-prop" role="region" aria-labelledby="integrations-heading">
  <h2 id="integrations-heading" class="visually-hidden">Platform integrations</h2>
  <Integration :is-dark="isDark" />
</section>
</div></div>

<!-- 13. FOUNDER EXPERIENCE -->
<div class="stripe stripe--white"><div class="stripe-inner">
<section class="founder-section" role="region" aria-labelledby="founder-heading">
  <div class="founder-inner">
    <div class="founder-photo-wrap">
      <img src="/assets/gyula.png" alt="Gyula Németh, founder of BlueFox Email" class="founder-photo" loading="lazy" />
    </div>
    <span class="founder-eyebrow">Meet the Founder</span>
    <h2 id="founder-heading" class="founder-title">
      10+ Years Building for Real-World Email
    </h2>
    <p class="founder-description">
      Gyula Németh has worked in HTML email since 2013. Before BlueFox Email, he co-founded edmdesigner.com, chamaileon.io, and emailhero.io, including enterprise-grade platforms, where he served as CTO. His focus has always been the same: emails should render consistently across real inboxes including Gmail, Apple Mail, mobile clients, and Outlook.
    </p>
    <div class="founder-actions">
      <v-btn
        color="primary"
        size="large"
        variant="flat"
        class="founder-team-button"
        href="/meet-the-team"
        aria-label="Team Behind BlueFox Email"
      >
        Team Behind BlueFox Email
      </v-btn>
    </div>
  </div>
</section>
</div></div>

<!-- PERSONA HUB - Route to persona-specific landing pages -->
<div class="stripe stripe--blue"><div class="stripe-inner">
<section class="section-index persona-hub" role="region" aria-labelledby="persona-hub-heading">
  <h2 id="persona-hub-heading" class="sectionTitle text-center mt-4 mb-3 pt-0">
    Find the setup that fits how you send
  </h2>
  <p class="persona-hub-intro">
    BlueFox Email works for marketing agencies, SaaS teams, occasional senders, and Amazon SES operators. Pick the path closest to your workflow.
  </p>
  <div class="persona-grid">
    <a href="/for/marketing-agencies" class="persona-card">
      <div class="persona-card-title">Marketing agencies</div>
      <div class="persona-card-desc">Multi-client projects, clone flows across accounts, per-project reporting.</div>
      <span class="persona-card-link">See agency setup →</span>
    </a>
    <a href="/for/saas-users" class="persona-card">
      <div class="persona-card-title">SaaS teams</div>
      <div class="persona-card-desc">Transactional, triggered, and lifecycle emails through a single API.</div>
      <span class="persona-card-link">See SaaS setup →</span>
    </a>
    <a href="/for/occasional-senders" class="persona-card">
      <div class="persona-card-title">Occasional senders</div>
      <div class="persona-card-desc">No subscription. Buy credits, send when you need to, and they stay valid for 12 months.</div>
      <span class="persona-card-link">See occasional setup →</span>
    </a>
    <a href="/for/amazon-ses-users" class="persona-card">
      <div class="persona-card-title">Amazon SES users</div>
      <div class="persona-card-desc">Keep your SES account. Add design, automation, list management, and analytics on top.</div>
      <span class="persona-card-link">See SES setup →</span>
    </a>
  </div>
</section>
</div></div>

<!-- 14. FINAL CTA -->
<div class="stripe stripe--white"><div class="stripe-inner">
<section id="second-cta" class="final-cta-section" role="region" aria-labelledby="final-cta-heading">
  <div class="cta-container">
    <div class="cta-badge-wrapper">
      <v-chip color="primary" size="large" class="cta-badge" aria-label="Get started badge">
        <span class="text-overline font-weight-bold">Start sending</span>
      </v-chip>
    </div>
    <h2 id="final-cta-heading" class="cta-title">
      Send your first campaign today
    </h2>
    <p class="cta-description">
      Create a free account and send up to 3,000 emails per month for your first year. No credit card required, no subscription.
    </p>
    <div class="cta-button-wrapper">
      <v-btn
        size="x-large"
        color="primary"
        variant="flat"
        class="cta-primary-button"
        href="https://app.bluefox.email/accounts/create-account"
        target="_blank"
        aria-label="Create your free BlueFox Email account"
      >
        <strong>Create your free account</strong>
      </v-btn>
      <p class="cta-subtext">
        No credit card required
      </p>
    </div>
  </div>
</section>
</div></div>
