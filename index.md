---
layout: home

title: Scale Your Agency's Email Campaigns Without Scaling Your Headaches
description: The email platform built for agencies managing multiple brands. Send your first campaign in minutes, then scale to dozens of clients without enterprise prices or complexity.

head:
  - - meta
    - name: description
      content: "The email platform built for agencies managing multiple brands. Send your first campaign in minutes, then scale to dozens of clients without enterprise prices or complexity."
  - - meta
    - property: og:title
      content: Scale Your Agency's Email Campaigns Without Scaling Your Headaches | BlueFox Email
  - - meta
    - property: og:description
      content: "The email platform built for agencies managing multiple brands. Send your first campaign in minutes, then scale to dozens of clients without enterprise prices or complexity."
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
      content: Scale Your Agency's Email Campaigns Without Scaling Your Headaches | BlueFox Email
  - - meta
    - name: twitter:description
      content: "The email platform built for agencies managing multiple brands. Send your first campaign in minutes, then scale to dozens of clients without enterprise prices or complexity."
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

  .section-index {
    padding-top: 15vh;
    padding-bottom: 10vh;
  }

  .value-prop {
    padding-top: 10vh;
    padding-bottom: 10vh;
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

  .problem-stats-section {
    max-width: 1200px;
    margin: 80px auto 0;
    display: flex;
    gap: 24px;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  .problem-stat-card {
    display: flex;
    align-items: center;
    gap: 24px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(19, 176, 238, 0.2);
    border-radius: 16px;
    padding: 28px 36px;
    transition: all 0.3s ease;
    min-width: 320px;
  }

  html.dark .problem-stat-card {
    background: rgba(31, 41, 55, 0.9);
    border: 1px solid rgba(19, 176, 238, 0.3);
  }

  .problem-stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(19, 176, 238, 0.15);
    border-color: rgba(19, 176, 238, 0.5);
  }

  html.dark .problem-stat-card:hover {
    box-shadow: 0 12px 32px rgba(19, 176, 238, 0.25);
  }

  .problem-stat-number {
    font-size: 56px;
    font-weight: 900;
    background: linear-gradient(135deg, #13B0EE, #392C91);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
    letter-spacing: -2px;
    padding:2px;
  }

  .problem-stat-divider {
    width: 2px;
    height: 60px;
    background: linear-gradient(180deg, transparent, rgba(19, 176, 238, 0.3), transparent);
  }

  .problem-stat-content {
    text-align: left;
    flex: 1;
  }

  .problem-stat-label {
    font-size: 15px;
    font-weight: 800;
    color: #1f2937;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  html.dark .problem-stat-label {
    color: #f3f4f6;
  }

  .problem-stat-description {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.5;
  }

  html.dark .problem-stat-description {
    color: #9ca3af;
  }

  .template-showcase {
    padding-top: 5vh;
    padding-bottom: 8vh;
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

  /* Final CTA Section - Premium Design */
  .final-cta-section {
    background: linear-gradient(135deg, rgba(19, 176, 238, 0.03) 0%, rgba(57, 44, 145, 0.03) 100%);
    padding: 120px 24px;
    margin: 80px 0 0 0;
    position: relative;
    overflow: hidden;
  }

  html.dark .final-cta-section {
    background: linear-gradient(135deg, rgba(19, 176, 238, 0.08) 0%, rgba(57, 44, 145, 0.08) 100%);
  }

  .final-cta-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(19, 176, 238, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(57, 44, 145, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }

  html.dark .final-cta-section::before {
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(19, 176, 238, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(57, 44, 145, 0.12) 0%, transparent 50%);
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
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding: 88px 24px 64px;
    position: relative;
    background: linear-gradient(180deg, rgba(19, 176, 238, 0.04) 0%, rgba(19, 176, 238, 0.01) 100%);
  }

  .founder-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(19, 176, 238, 0.3), transparent);
  }

  html.dark .founder-section {
    background: linear-gradient(180deg, rgba(19, 176, 238, 0.08) 0%, rgba(19, 176, 238, 0.02) 100%);
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
  @media (max-width: 960px) {
    .problem-stats-section {
      margin-top: 60px;
      flex-direction: column;
      align-items: center;
    }

    .problem-stat-card {
      width: 100%;
      max-width: 500px;
    }

  }

  @media (max-width: 768px) {
    .problem-stat-card {
      flex-direction: column;
      text-align: center;
      padding: 24px;
      min-width: auto;
    }

    .problem-stat-number {
      font-size: 48px;
    }

    .problem-stat-divider {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(19, 176, 238, 0.3), transparent);
    }

    .problem-stat-content {
      text-align: center;
    }

    .final-cta-section {
      padding: 80px 20px;
    }

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

    .founder-section {
      padding: 72px 20px 40px;
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

    .section-index {
      padding-top: 5vh;
      padding-bottom: 5vh;
    }

    #great-deliverability {
      padding: 25px;
    }

    .problem-stats-section {
      margin-top: 48px;
    }

    .problem-stat-card {
      padding: 20px;
    }

    .problem-stat-number {
      font-size: 42px;
    }

    .problem-stat-label {
      font-size: 13px;
    }

    .problem-stat-description {
      font-size: 13px;
    }

    .final-cta-section {
      padding: 60px 16px;
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

    .founder-section {
      padding: 56px 16px 28px;
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
</style>

<!-- 1. HERO - First impression with value proposition -->
<main id="hero">
  <HeroUnit />
</main>

<!-- 2. TEMPLATE SHOWCASE -->
<section class="section-index template-showcase" role="region" aria-labelledby="templates-heading">
  <h2 id="templates-heading" class="sectionTitle text-center mt-4 mb-3 pt-0">
    Launch Faster with Ready-to-Use Email Templates
  </h2>
  <p class="template-showcase-intro">
    Start campaigns with professionally designed templates for Marketing Agencies, SaaS, travel, agencies, and transactional emails. Swap in your theme settings, update the copy, adjust brand colors, and launch in minutes.
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

<!-- 3. SOCIAL PROOF - Build trust early -->
<section class="section-index" style="padding-top: 5vh;" role="region" aria-labelledby="testimonials-heading">
  <h2 id="testimonials-heading" class="sectionTitle text-center mt-4 mb-6">
    Agencies Choose BlueFox Email. Their Clients Stay.
  </h2>
  <AppleMailTestimonials
    :is-dark="isDark"
    :lg-and-up="lgAndUp"
    :md="md"
    :sm="sm"
    :xs="xs"
  />
</section>

<!-- 4. BRAND LOGOS - Trust indicators -->
<section aria-labelledby="brand-logos-heading">
  <BrandLogos />
</section>

<!-- 5. SOLUTION: Multi-client Management via Design System -->
<section id="design-system" class="section-index" role="region" aria-labelledby="design-system-heading">
  <div class="d-flex justify-center">
    <v-chip color="primary" aria-label="Core solution badge">
      <span class="text-overline">Core Solution</span>
    </v-chip>
  </div>
  <h2 id="design-system-heading" class="sectionTitle text-center mt-4 mb-3 pt-0">
    Manage 10 Clients as Easily as 1
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Stop rebuilding email templates from scratch for every client. Our unified design system lets you create brand-specific components once, then replicate and customize instantly. <strong>Update 50 templates with one click.</strong>
    </div>
  </div>

  <DesignSystem
    class="mt-6"
    :is-dark="isDark"
  />
</section>

<!-- 6. SOLUTION: No-code Content Creation -->
<section id="marketers" class="value-prop" role="region" aria-labelledby="email-editor-heading">
  <h2 id="email-editor-heading" class="sectionTitle text-center mt-4 mb-3 pt-0">
    Create Pixel-Perfect Brand Emails in Minutes
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Your team doesn't need to be Adobe experts. Our visual editor produces pixel-perfect emails that render flawlessly across Gmail, Outlook, and mobile so you can deliver premium quality even with a lean creative team.
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

  <div class="d-flex justify-center mt-6">
    <div class="problem-stat-card" role="group" aria-labelledby="stat3-label">
      <div class="problem-stat-number" id="stat3-value">10x</div>
      <div class="problem-stat-divider" aria-hidden="true"></div>
      <div class="problem-stat-content">
        <div id="stat3-label" class="problem-stat-label">Faster</div>
        <div class="problem-stat-description">Average speed improvement for<br/>email production</div>
      </div>
    </div>
  </div>
</section>

<!-- 7. SOLUTION: Automation -->
<section class="value-prop" role="region" aria-labelledby="automation-heading">
  <h2 id="automation-heading" class="sectionTitle text-center mt-4 mb-3 pt-0">
    Set It, Send It, Invoice It
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Create sophisticated drip campaigns, triggered sequences, and re-engagement flows in minutes, not days. Your clients get enterprise-level nurturing without you staffing up for every campaign.
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

<!-- 8. SOLUTION: Perfect Rendering -->
<section id="no-rendering-issues" class="value-prop" role="region" aria-labelledby="rendering-heading">
  <h2 id="rendering-heading" class="sectionTitle text-center mb-3">
    Never Apologize for Broken Emails Again
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Your reputation depends on flawless execution. Our battle-tested HTML guarantees your emails look perfect everywhere from Gmail on mobile to Outlook 2016 on desktop. <strong>No more embarrassing rendering bugs.</strong>
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

<!-- 9. SOLUTION: List Management & Compliance -->
<section class="section-index value-prop" role="region" aria-labelledby="list-management-heading">
  <h2 id="list-management-heading" class="sectionTitle text-center mt-4 mb-3 pt-0">
    Protect Your Clients (and Your Agency) from Compliance Nightmares
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Double opt-in, one-click unsubscribe, automated suppression lists, all built-in. Show clients you're not just creative, you're responsible stewards of their brand reputation.
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated" role="img" aria-label="List management dashboard screenshot">
    <img alt="List management dashboard showing compliance features including double opt-in, unsubscribe management, and automated suppression lists" src="/assets/list-management.webp" loading="lazy" width="1920" height="1080" />
  </v-card>
</section>

<!-- 10. SOLUTION: Analytics & ROI Proof -->
<section class="value-prop" role="region" aria-labelledby="analytics-heading">
  <h2 id="analytics-heading" class="sectionTitle text-center mt-4 mb-3 pt-0">
    The Reports That Win Renewals
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Stop spending hours in spreadsheets. Export beautiful, client-ready reports that prove ROI. Open rates, click rates, conversion attribution, revenue impact <strong>everything your client needs to see why they should increase your retainer.</strong>
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated" role="img" aria-label="Analytics dashboard screenshot">
    <img alt="Analytics dashboard displaying email campaign metrics including open rates, click-through rates, conversion attribution, and revenue impact data" src="/assets/analytics-alt.webp" loading="lazy" width="1920" height="1080" />
  </v-card>
</section>

<!-- 12. INTEGRATIONS - Connect with your stack -->
<section class="value-prop" role="region" aria-labelledby="integrations-heading">
  <h2 id="integrations-heading" class="visually-hidden">Platform integrations</h2>
  <Integration :is-dark="isDark" />
</section>

<!-- 13. FOUNDER EXPERIENCE -->
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

<!-- 14. FINAL CTA - Beautified Premium Design -->
<section id="second-cta" class="final-cta-section" role="region" aria-labelledby="final-cta-heading">
  <div class="cta-container">
    <div class="cta-badge-wrapper">
      <v-chip color="primary" size="large" class="cta-badge" aria-label="Get started today badge">
        <span class="text-overline font-weight-bold">Get Started Today</span>
      </v-chip>
    </div>
    <h2 id="final-cta-heading" class="cta-title">
      Ready to Scale Without the Growing Pains?
    </h2>
    <p class="cta-description">
      Send your first client campaign in minutes. BlueFox Email handles design, rendering, and deliverability so your agency can focus on strategy, retainers, and results, not wrestling with email tools.
    </p>
    <div class="cta-button-wrapper">
      <v-btn
        size="x-large"
        color="primary"
        variant="flat"
        class="cta-primary-button"
        href="https://app.bluefox.email/accounts/create-account"
        target="_blank"
        aria-label="Start your free BlueFox Email agency account"
      >
        <strong>Start Your Free Agency Account</strong>
      </v-btn>
      <p class="cta-subtext">
        No credit card required • Cancel anytime
      </p>
    </div>
  </div>
</section>
