---
layout: home

title: Scale Your Agency's Email Campaigns Without Scaling Your Headaches
description: The email platform built for agencies managing multiple brands. Deliver enterprise-level campaigns without enterprise prices or complexity.

head:
  - - meta
    - name: description
      content: "The email platform built for agencies managing multiple brands. Deliver enterprise-level campaigns without enterprise prices or complexity."
  - - meta
    - property: og:title
      content: Scale Your Agency's Email Campaigns Without Scaling Your Headaches | BlueFox Email
  - - meta
    - property: og:description
      content: "The email platform built for agencies managing multiple brands. Deliver enterprise-level campaigns without enterprise prices or complexity."
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
      content: "The email platform built for agencies managing multiple brands. Deliver enterprise-level campaigns without enterprise prices or complexity."
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

  /* Problem Agitation Section Styles - Professional Version */
  .problem-section {
    background: linear-gradient(135deg, rgba(19, 176, 238, 0.03) 0%, rgba(57, 44, 145, 0.03) 100%);
    padding: 100px 24px;
    margin: 80px 0;
  }

  html.dark .problem-section {
    background: linear-gradient(135deg, rgba(19, 176, 238, 0.08) 0%, rgba(57, 44, 145, 0.08) 100%);
  }

  .problem-intro {
    max-width: 800px;
    margin: 0 auto 60px;
    text-align: center;
  }

  .problem-subtitle {
    font-size: 20px;
    color: #6b7280;
    line-height: 1.6;
    margin-top: 16px;
  }

  html.dark .problem-subtitle {
    color: #9ca3af;
  }

  .problem-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .problem-card {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(229, 231, 235, 0.8);
    border-radius: 16px;
    padding: 32px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  html.dark .problem-card {
    background: rgba(31, 41, 55, 0.6);
    border: 1px solid rgba(75, 85, 99, 0.8);
  }

  .problem-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(19, 176, 238, 0.08);
    border-color: rgba(19, 176, 238, 0.3);
    background: rgba(255, 255, 255, 0.9);
  }

  html.dark .problem-card:hover {
    background: rgba(31, 41, 55, 0.9);
    border-color: rgba(19, 176, 238, 0.4);
  }

  .problem-icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(19, 176, 238, 0.1), rgba(57, 44, 145, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }

  .problem-card:hover .problem-icon-wrapper {
    background: linear-gradient(135deg, rgba(19, 176, 238, 0.15), rgba(57, 44, 145, 0.15));
    transform: scale(1.05);
  }

  .problem-icon-wrapper svg {
    width: 28px;
    height: 28px;
    stroke: #13B0EE;
    fill: none;
  }

  .problem-title {
    font-size: 20px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 12px;
    line-height: 1.3;
  }

  html.dark .problem-title {
    color: #f3f4f6;
  }

  .problem-description {
    font-size: 16px;
    color: #6b7280;
    line-height: 1.7;
  }

  html.dark .problem-description {
    color: #9ca3af;
  }

  .problem-stat {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(19, 176, 238, 0.2);
    border-radius: 12px;
    padding: 20px 32px;
    margin-top: 60px;
  }

  html.dark .problem-stat {
    background: rgba(31, 41, 55, 0.8);
    border: 1px solid rgba(19, 176, 238, 0.3);
  }

  .problem-stat-number {
    font-size: 48px;
    font-weight: 800;
    background: linear-gradient(135deg, #13B0EE, #392C91);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }

  .problem-stat-content {
    text-align: left;
  }

  .problem-stat-label {
    font-size: 14px;
    font-weight: 700;
    color: #1f2937;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  html.dark .problem-stat-label {
    color: #f3f4f6;
  }

  .problem-stat-description {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.4;
  }

  html.dark .problem-stat-description {
    color: #9ca3af;
  }

  @media (max-width: 960px) {
    .problem-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .problem-section {
      padding: 60px 24px;
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

    .problem-section {
      padding: 40px 16px;
      margin: 40px 0;
    }

    .problem-card {
      padding: 24px;
    }

    .problem-icon-wrapper {
      width: 48px;
      height: 48px;
    }

    .problem-icon-wrapper svg {
      width: 24px;
      height: 24px;
    }

    .problem-title {
      font-size: 18px;
    }

    .problem-description {
      font-size: 15px;
    }

    .problem-stat {
      flex-direction: column;
      text-align: center;
      padding: 20px 24px;
    }

    .problem-stat-number {
      font-size: 36px;
    }

    .problem-stat-content {
      text-align: center;
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

<!-- 2. BRAND LOGOS - Trust indicators -->
<section>
  <BrandLogos />
</section>

<!-- 3. PROBLEM AGITATION - Professional Version -->
<section class="problem-section">
  <div class="problem-intro">
    <div class="d-flex justify-center mb-4">
      <v-chip color="primary" size="large" variant="flat">
        <span class="text-overline font-weight-bold">For Marketing Agencies</span>
      </v-chip>
    </div>
    <h2 class="sectionTitle mb-0">
      Managing Multiple Client Email Programs Shouldn't Feel Like This
    </h2>
    <p class="problem-subtitle">
      You're juggling multiple clients, each with their own brand, deadlines, and expectations. Your team is stretched thin, and every email campaign feels like starting from scratch.
    </p>
  </div>

  <div class="problem-grid">
    <!-- Problem 1 -->
    <div class="problem-card">
      <div class="problem-icon-wrapper">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7h16M4 12h16M4 17h10" stroke-width="2" stroke-linecap="round"/>
          <path d="M20 17l-3-3 3-3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="problem-title">Rebuilding templates from scratch</div>
      <div class="problem-description">Every new client means recreating email templates, testing across devices, and fixing rendering bugs. Your design team spends 60% of their time on repetitive setup work.</div>
    </div>
    <!-- Problem 2 -->
    <div class="problem-card">
      <div class="problem-icon-wrapper">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="problem-title">Designer bottlenecks slow everything</div>
      <div class="problem-description">Campaign launches get delayed because your designers are overbooked. Simple text updates require a ticket, approval, and a 3-day turnaround.</div>
    </div>
    <!-- Problem 3 -->
    <div class="problem-card">
      <div class="problem-icon-wrapper">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="problem-title">Per-contact pricing eating margins</div>
      <div class="problem-description">Your clients have growing lists, but platforms like Mailchimp charge per contact—not per email sent. Your costs scale faster than your revenue.</div>
    </div>
    <!-- Problem 4 -->
    <div class="problem-card">
      <div class="problem-icon-wrapper">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke-width="2"/>
          <path d="M3 7l9 6 9-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 15l-2 2m8-2l2 2" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="problem-title">Rendering issues embarrass your agency</div>
      <div class="problem-description">Emails look perfect in Gmail but break in Outlook. Mobile layouts are crushed. Clients screenshot the disasters and CC your boss.</div>
    </div>
    <!-- Problem 5 -->
    <div class="problem-card">
      <div class="problem-icon-wrapper">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3v18h18" stroke-width="2" stroke-linecap="round"/>
          <path d="M18 17V9l-5 5-3-3-4 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="18" cy="6" r="2" stroke-width="2"/>
        </svg>
      </div>
      <div class="problem-title">Can't prove ROI with existing tools</div>
      <div class="problem-description">Clients ask "What's our email ROI?" and you're stuck exporting spreadsheets, combining data sources, and building reports manually for hours.</div>
    </div>
    <!-- Problem 6 -->
    <div class="problem-card">
      <div class="problem-icon-wrapper">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7v7c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 12l2 2 4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="problem-title">Compliance nightmares keep you up</div>
      <div class="problem-description">GDPR, CAN-SPAM, unsubscribe regulations—one mistake could cost your client (and your reputation) dearly. But manual compliance checks aren't scalable.</div>
    </div>
  </div>

  <div class="d-flex justify-center">
    <div class="problem-stat">
      <div class="problem-stat-number">70%</div>
      <div style="border-left: 2px solid rgba(19, 176, 238, 0.3); height: 50px; margin: 0 8px;"></div>
      <div class="problem-stat-content">
        <div class="problem-stat-label">Time Wasted</div>
        <div class="problem-stat-description">Average time agencies waste on<br/>email production inefficiencies</div>
      </div>
    </div>
  </div>
</section>

<!-- 4. SOCIAL PROOF - Build trust early -->
<section class="section-index" style="padding-top: 5vh;">
  <h2 class="sectionTitle text-center mt-4 mb-6">
    Agencies Choose BlueFox. Their Clients Stay.
  </h2>
  <TestimonialDiv
    :is-dark="isDark"
    :lg-and-up="lgAndUp"
    :md="md"
    :sm="sm"
    :xs="xs"
  />
</section>

<!-- 5. SOLUTION: Multi-client Management via Design System -->
<section id="design-system" class="section-index">
  <div class="d-flex justify-center">
    <v-chip color="primary">
      <span class="text-overline">Core Solution</span>
    </v-chip>
  </div>
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Manage 10 Clients as Easily as 1
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Stop rebuilding email templates from scratch for every client. Our unified design system lets you create brand-specific components once, then replicate and customize instantly. <strong>Update 50 campaigns with one click.</strong>
    </div>
  </div>

  <DesignSystem
    class="mt-6"
    :is-dark="isDark"
  />
</section>

<!-- 6. SOLUTION: No-code Content Creation -->
<section id="marketers" class="value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Your Junior Designer Just Got 10x Faster
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Your team doesn't need to be Adobe experts. Our visual editor produces pixel-perfect emails that render flawlessly across Gmail, Outlook, and mobile—so you can deliver premium quality even with a lean creative team.
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

  <div class="d-flex justify-center mt-6">
    <div class="problem-stat">
      <div class="problem-stat-number">10x</div>
      <div style="border-left: 2px solid rgba(19, 176, 238, 0.3); height: 50px; margin: 0 8px;"></div>
      <div class="problem-stat-content">
        <div class="problem-stat-label">Faster</div>
        <div class="problem-stat-description">Average speed improvement for<br/>email production</div>
      </div>
    </div>
  </div>
</section>

<!-- 7. SOLUTION: Automation -->
<section class="value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Set It, Send It, Invoice It
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Create sophisticated drip campaigns, triggered sequences, and re-engagement flows in minutes—not days. Your clients get enterprise-level nurturing without you staffing up for every campaign.
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
<section id="no-rendering-issues" class="value-prop">
  <h2 class="sectionTitle text-center mb-3">
    Never Apologize for Broken Emails Again
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Your reputation depends on flawless execution. Our battle-tested HTML guarantees your emails look perfect everywhere—from Gmail on mobile to Outlook 2016 on desktop. <strong>No more embarrassing rendering bugs.</strong>
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
<section class="section-index value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Protect Your Clients (and Your Agency) from Compliance Nightmares
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Double opt-in, one-click unsubscribe, automated suppression lists—all built-in. Show clients you're not just creative, you're responsible stewards of their brand reputation.
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated">
    <img alt="List management screens showing compliance features" src="/assets/list-management.webp" loading="lazy" />
  </v-card>
</section>

<!-- 10. SOLUTION: Analytics & ROI Proof -->
<section class="value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    The Reports That Win Renewals
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Stop spending hours in spreadsheets. Export beautiful, client-ready reports that prove ROI. Open rates, click rates, conversion attribution, revenue impact—<strong>everything your client needs to see why they should increase your retainer.</strong>
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated">
    <img alt="Analytics dashboard showing ROI metrics" src="/assets/analytics-alt.webp" loading="lazy" />
  </v-card>
</section>

<!-- 11. DELIVERABILITY - Critical for agency reputation -->
<section id="deliverability" class="value-prop">
  <Deliverability />
</section>

<!-- 12. FOR CREATIVE TEAMS - Secondary audience segment -->
<section id="designers" class="section-index">
  <div class="d-flex justify-center">
    <v-chip color="primary">
      <span class="text-overline">For creative teams</span>
    </v-chip>
  </div>
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Create Pixel-Perfect Brand Emails in Minutes
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Leverage brand-ready components, real-time preview, and a shared design system that editors and developers both use. No code required. No QA loop delays.
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

<!-- 13. FOR DEVELOPERS - Technical audience segment -->
<section id="developers" class="section-index">
  <div class="d-flex justify-center">
    <v-chip color="primary">
      <span class="text-overline">For agency tech teams</span>
    </v-chip>
  </div>
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Connect Your Entire Tech Stack Without Bothering Developers
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Programmatic access, webhooks, SMTP relay everything you need to send client emails from your own stack without giving up deliverability or control.
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

<!-- 14. FINAL CTA - Convert after all value demonstrated -->
<section id="second-cta">
  <h2 class="sectionTitle text-center mb-3">
    Ready to Scale Without the Growing Pains?
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Start free. No credit card required. Import your first client in 5 minutes and see why agencies choose BlueFox to manage their email campaigns.
    </div>
  </div>

  <v-row class="mt-4 justify-center">
    <v-btn
      size="x-large"
      color="primary"
      variant="flat"
      class="no-uppercase mr-3"
      href="https://app.bluefox.email/accounts/create-account"
      target="_blank"
    >
      <strong>Start Your Free Agency Account</strong>
    </v-btn>
  </v-row>
</section>
