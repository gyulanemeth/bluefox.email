---
layout: home

title: Design Breathtaking Brand Emails. Send Smarter. Pay Lean.
description: Email campaigns that look perfect, land in the inbox, and scale with your agency. Automate flows, unify design, and only pay per send.

head:
  - - meta
    - name: description
      content: "Email campaigns that look perfect, land in the inbox, and scale with your agency. Automate flows, unify design, and only pay per send."
  - - meta
    - property: og:title
      content: Design Breathtaking Brand Emails. Send Smarter. Pay Lean. | BlueFox Email
  - - meta
    - property: og:description
      content: "Email campaigns that look perfect, land in the inbox, and scale with your agency. Automate flows, unify design, and only pay per send."
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
      content: Design Breathtaking Brand Emails. Send Smarter. Pay Lean. | BlueFox Email
  - - meta
    - name: twitter:description
      content: "Email campaigns that look perfect, land in the inbox, and scale with your agency. Automate flows, unify design, and only pay per send."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/share.png
---
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useDisplay } from 'vuetify'
import { useData } from 'vitepress'

import HeroUnit from './.vitepress/theme/HeroUnit.vue'
import TestimonialDiv from './.vitepress/theme/TestimonialDiv.vue'
import DesignSystem from './.vitepress/theme/DesignSystem.vue'
import RenderingIssues from './.vitepress/theme/RenderingIssues.vue'
import Automation from './.vitepress/theme/Automation.vue'
import Integration from './.vitepress/theme/Integration.vue'
import Deliverability from './.vitepress/theme/Deliverability.vue'

const { lgAndUp, md, sm, xs } = useDisplay()
const { isDark } = useData()

const selectedEmailType = ref('0');
let intervalId

onMounted(() => {
  intervalId = setInterval(() => {
    let actSelVal = parseInt(selectedEmailType.value)
    actSelVal += 1
    actSelVal %= 4
    selectedEmailType.value = actSelVal
  }, 3000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId);
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

  #second-cta {
    text-align: center;
    padding-bottom: 10vh;
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
  }

  .mt-150 {
    margin-top: 150px !important;
  }
</style>

<!-- 1. HERO - First impression with value proposition -->
<section id="hero">
  <HeroUnit />
</section>

<!-- 2. CORE AGENCY FEATURE: Multi-client Management via Design System -->
<section id="design-system" class="section-index">
  <div class="d-flex justify-center">
    <v-chip color="primary">
      <span class="text-overline">For marketing agencies</span>
    </v-chip>
  </div>
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    A unified design system that every client can adopt
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Your agency can ship consistent email templates to multiple clients. One brand-palette = one source of truth, so updates propagate instantly.
    </div>
  </div>

  <DesignSystem
    class="mt-6"
    :is-dark="isDark"
  />
</section>

<!-- 3. AGENCY CONTENT CREATION - No-code editor for speed -->
<section id="marketers" class="value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Effortless content creation for every client
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      No design team? No problem. Our drag-and-drop editor gives your creatives pixel-perfect layouts that render across Gmail, Outlook and mobile. Spend less time on code and more on strategy.
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated">
    <video
      width="100%"
      :autoplay="lgAndUp || md"
      :loop="lgAndUp || md"
      :controls="sm || xs"
      muted
    >
      <source src="/assets/bluefox-email-content-editing.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </v-card>
</section>

<!-- 4. AUTOMATION - Scale agency operations -->
<section class="value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Automate pipelines that keep clients engaged
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Create drip sequences, triggered emails, & re-engagement funnels with just a few clicks. Offer your clients data-driven nurture flows without a developer's hand.
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

<!-- 5. RENDERING - Quality assurance for agencies -->
<section id="no-rendering-issues" class="value-prop">
  <h2 class="sectionTitle text-center mb-3">
    Mapped inboxes, identical look & feel
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Your emails will look perfect everywhere. Our battle-tested email HTML ensures flawless rendering across all major email clients, including Outlook.
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

<!-- 6. LIST MANAGEMENT - Compliance & reputation -->
<section class="section-index value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Manage client lists, guard brand reputation, and stay compliant
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Double-opt-in, unsubscribe-one-click, opt-out flows, all built-in. Give your clients peace of mind, and proof-prove that you care about inbox health.
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated">
    <img alt="List management screens" src="/assets/list-management.webp" loading="lazy" />
  </v-card>
</section>

<!-- 7. ANALYTICS - Prove ROI to clients -->
<section class="value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Turn email data into client KPIs
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Open, click, conversion, bounce → all in one dashboard. Export reports for your brief-in-brief calls. Show clients why their investment is paying off.
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated">
    <img alt="Analytics screenshot" src="/assets/analytics-alt.webp" loading="lazy" />
  </v-card>
</section>

<!-- 8. DELIVERABILITY - Critical for agency reputation -->
<section id="deliverability" class="value-prop">
  <Deliverability />
</section>

<!-- 9. TESTIMONIALS - Social proof after showing value -->
<section class="section-index">
  <h2 class="sectionTitle text-center mt-4 mb-6">
    What agencies are saying
  </h2>
  <TestimonialDiv
    :is-dark="isDark"
    :lg-and-up="lgAndUp"
    :md="md"
    :sm="sm"
    :xs="xs"
  />
</section>

<!-- 10. FOR CREATIVE TEAMS - Secondary audience segment -->
<section id="designers" class="section-index">
  <div class="d-flex justify-center">
    <v-chip color="primary">
      <span class="text-overline">For creative teams</span>
    </v-chip>
  </div>
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Create pixel-perfect brand emails in minutes
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Leverage brand-ready components, real-time preview, and a shared design system that editors and developers share. No code, no QA loop.
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated">
    <video
      width="100%"
      :autoplay="lgAndUp || md"
      :loop="lgAndUp || md"
      :controls="sm || xs"
      muted
      aria-label="BlueFox Email editor interface demonstration showing no-code email design capabilities"
    >
      <source src="/assets/bluefox-email-editor-intro.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </v-card>
</section>

<!-- 11. FOR DEVELOPERS - Technical audience segment -->
<section id="developers" class="section-index">
  <div class="d-flex justify-center">
    <v-chip color="primary">
      <span class="text-overline">For agency tech teams</span>
    </v-chip>
  </div>
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    API integration that scales with your agency
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Programmatic access, webhooks, SMTP relay, all you need to send client emails from your own stack without giving up deliverability.
    </div>
  </div>

  <Integration
    class="mt-6"
    :is-dark="isDark"
    :xs="xs"
  >
    <template #tab-1>
      ```
      {
        "name": "Jon Doe",
        "email": "jon@doe.com"
      }
      ```
    </template>
    <template #tab-2>
      ```
      {
        "status": "unsubscribed"
      }
      ```
    </template>
    <template #tab-3>
      ```
      {
        "email": "jon@doe.com",
        "transactionalId": "##EMAIL_ID##",
        "data": {
          "example": "example merge tag value"
        },
        "attachments": [
          {
            "fileName": "example.txt",
            "content": "Ymx1ZWZveC5lbWFpbCBhdHRhY2htZW50IGV4YW1wbGUh"
          }
        ]
      }
      ```
    </template>
    <template #tab-4>
      ```
      {
        "emails": ["jon@doe.com"],
        "triggeredId": "##EMAIL_ID##",
        "data": {
          "example": "example merge tag value"
        },
        "attachments": [
          {
            "fileName": "example.txt",
            "content": "Ymx1ZWZveC5lbWFpbCBhdHRhY2htZW50IGV4YW1wbGUh"
          }
        ]
      }
      ```
    </template>
  </Integration>
</section>

<!-- 12. FINAL CTA - Convert after all value demonstrated -->
<section id="second-cta">
  <h2 class="sectionTitle text-center mb-3">
    Send amazing emails for your clients today
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Your agency's clients deserve great design, great ROI, and great inbox placement. Try BlueFox for free.
    </div>
  </div>

  <v-row class="mt-4 justify-center">
    <v-btn
      size="large"
      color="primary"
      variant="flat"
      class="no-uppercase mr-3"
      href="https://app.bluefox.email/accounts/create-account"
      target="_blank"
    >
      Create a free agency workspace
    </v-btn>
  </v-row>
</section>
