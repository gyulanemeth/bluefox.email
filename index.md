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
import AppleMailTestimonials from './.vitepress/theme/AppleMailTestimonials.vue'

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

  /* Enhanced Problem Section - More Professional & Engaging */
  .problem-section {
    background: linear-gradient(135deg, rgba(19, 176, 238, 0.02) 0%, rgba(57, 44, 145, 0.02) 100%);
    padding: 120px 24px;
    /* margin: 60px 0; */
    position: relative;
    overflow: hidden;
  }

  html.dark .problem-section {
    background: linear-gradient(135deg, rgba(19, 176, 238, 0.05) 0%, rgba(57, 44, 145, 0.05) 100%);
  }

  /* Subtle background pattern */
  .problem-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(19, 176, 238, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(19, 176, 238, 0.02) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
    opacity: 0.5;
  }

  html.dark .problem-section::before {
    background-image: 
      linear-gradient(rgba(19, 176, 238, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(19, 176, 238, 0.04) 1px, transparent 1px);
  }

  .problem-intro {
    max-width: 900px;
    margin: 0 auto 80px;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .problem-main-title {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 24px;
    color: #1f2937;
    background: linear-gradient(135deg, #1f2937 0%, #392C91 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  html.dark .problem-main-title {
    background: linear-gradient(135deg, #f3f4f6 0%, #13B0EE 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .problem-subtitle {
    font-size: clamp(17px, 2vw, 20px);
    color: #4b5563;
    line-height: 1.7;
    max-width: 750px;
    margin: 0 auto;
    font-weight: 400;
  }

  html.dark .problem-subtitle {
    color: #9ca3af;
  }

  .problem-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    align-items: start;
  }

  .problem-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(229, 231, 235, 0.6);
    border-radius: 20px;
    padding: 36px 28px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 340px;
    height: 100%;
  }

  html.dark .problem-card {
    background: rgba(31, 41, 55, 0.8);
    border: 1px solid rgba(75, 85, 99, 0.6);
  }

  /* Red hover effect with glow */
  .problem-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(239, 68, 68, 0.3);
    border-color: rgba(239, 68, 68, 0.6);
    background: rgba(255, 255, 255, 0.95);
  }

  html.dark .problem-card:hover {
    background: rgba(31, 41, 55, 0.95);
    border-color: rgba(239, 68, 68, 0.7);
    box-shadow: 0 20px 60px rgba(239, 68, 68, 0.4);
  }

  .problem-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(19, 176, 238, 0.1), rgba(57, 44, 145, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    flex-shrink: 0;
  }

  .problem-card:hover .problem-icon-wrapper {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.15));
    transform: scale(1.05) rotate(-3deg);
  }

  .problem-icon-wrapper svg {
    width: 30px;
    height: 30px;
    stroke: #13B0EE;
    fill: none;
    stroke-width: 2;
    transition: all 0.3s ease;
  }

  .problem-card:hover .problem-icon-wrapper svg {
    stroke: #ef4444;
    transform: scale(1.1);
  }

  html.dark .problem-card:hover .problem-icon-wrapper svg {
    stroke: #ef4444;
  }

  .problem-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .problem-title {
    font-size: 19px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 12px;
    line-height: 1.4;
    transition: color 0.3s ease;
  }

  html.dark .problem-title {
    color: #f3f4f6;
  }

  .problem-card:hover .problem-title {
    color: #dc2626;
  }

  html.dark .problem-card:hover .problem-title {
    color: #ef4444;
  }

  .problem-description {
    font-size: 15px;
    color: #6b7280;
    line-height: 1.7;
    flex: 1;
  }

  html.dark .problem-description {
    color: #9ca3af;
  }

  .problem-impact {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    padding: 8px 14px;
    background: rgba(19, 176, 238, 0.08);
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #13B0EE;
    align-self: flex-start;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  html.dark .problem-impact {
    background: rgba(19, 176, 238, 0.15);
    color: #13B0EE;
  }

  .problem-card:hover .problem-impact {
    background: rgba(239, 68, 68, 0.12);
    color: #dc2626;
  }

  html.dark .problem-card:hover .problem-impact {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
  }

  .problem-impact svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
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

  /* Responsive Design */
  @media (max-width: 1200px) {
    .problem-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 960px) {
    .problem-section {
      padding: 80px 24px;
      margin: 60px 0;
    }

    .problem-intro {
      margin-bottom: 60px;
    }

    .problem-grid {
      gap: 20px;
    }

    .problem-card {
      padding: 28px 24px;
      min-height: 300px;
    }

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
    .problem-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .problem-card {
      padding: 24px 20px;
      min-height: auto;
    }

    .problem-icon-wrapper {
      width: 56px;
      height: 56px;
      margin-bottom: 20px;
    }

    .problem-icon-wrapper svg {
      width: 26px;
      height: 26px;
    }

    .problem-title {
      font-size: 18px;
    }

    .problem-description {
      font-size: 14px;
    }

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
      padding: 60px 16px;
      margin: 40px 0;
    }

    .problem-intro {
      margin-bottom: 40px;
    }

    .problem-card {
      padding: 20px 18px;
    }

    .problem-icon-wrapper {
      width: 52px;
      height: 52px;
    }

    .problem-icon-wrapper svg {
      width: 24px;
      height: 24px;
    }

    .problem-impact {
      font-size: 12px;
      padding: 6px 12px;
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

<!-- 3. PROBLEM AGITATION - Synced with Why page -->
<section class="problem-section">
  <div class="problem-intro">
    <div class="d-flex justify-center mb-4">
      <v-chip color="primary">
        <span class="text-overline">The Agency Challenge</span>
      </v-chip>
    </div>
    <h2 class="problem-main-title">
      Managing Multiple Client Email Programs Shouldn't Be This Hard
    </h2>
    <p class="problem-subtitle">
      If you run email for multiple clients, you've seen these problems. Stop us when one sounds familiar.
    </p>
  </div>

  <div class="problem-grid">
    <!-- Problem 1: Multiple Client Chaos -->
    <div class="problem-card">
      <div class="problem-icon-wrapper">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="problem-content">
        <div class="problem-title">Managing Multiple Clients Is Chaos</div>
        <div class="problem-description">Constant juggling with logins, late client requests, and endless approval cycles. Each client feels like a full-time job.</div>
        <div class="problem-impact">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
          </svg>
          Endless context switching
        </div>
      </div>
    </div>
    <!-- Problem 2: Rebuilding from Scratch -->
    <div class="problem-card">
      <div class="problem-icon-wrapper">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="problem-content">
        <div class="problem-title">You Rebuild Everything for Every Client</div>
        <div class="problem-description">Same templates, same automations, same segments recreated from scratch. New client equals the exact same work, every single time.</div>
        <div class="problem-impact">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
          </svg>
          Massive time waste
        </div>
      </div>
    </div>
    <!-- Problem 3: Design & Rendering Issues -->
    <div class="problem-card">
      <div class="problem-icon-wrapper">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="M3 7l9 6 9-6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 15l-2 2m8-2l2 2" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="problem-content">
        <div class="problem-title">Design & Rendering Issues Waste Hours</div>
        <div class="problem-description">Looks perfect in the editor, then breaks in Outlook for absolutely no reason. Mobile layouts crushed. Endless QA cycles.</div>
        <div class="problem-impact">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
          </svg>
          Hours of debugging
        </div>
      </div>
    </div>
    <!-- Problem 4: Reporting Drains Time -->
    <div class="problem-card">
      <div class="problem-icon-wrapper">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3v18h18" stroke-linecap="round"/>
          <path d="M18 17V9l-5 5-3-3-4 4" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="18" cy="6" r="2"/>
        </svg>
      </div>
      <div class="problem-content">
        <div class="problem-title">Reporting Drains Hours Every Month</div>
        <div class="problem-description">You spend more time building reports than actually sending campaigns. Exporting data, combining spreadsheets, making it client-ready.</div>
        <div class="problem-impact">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
          </svg>
          5+ hours per client
        </div>
      </div>
    </div>
    <!-- Problem 5: Deliverability Issues -->
    <div class="problem-card">
      <div class="problem-icon-wrapper">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 9v4M12 17h.01" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="problem-content">
        <div class="problem-title">Great Emails Land in Spam</div>
        <div class="problem-description">And clients blame you, even though you don't know what went wrong this time. Deliverability is a black box you can't control.</div>
        <div class="problem-impact">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
          </svg>
          Lost campaign ROI
        </div>
      </div>
    </div>
    <!-- Problem 6: Pricing Squeezes Margins -->
    <div class="problem-card">
      <div class="problem-icon-wrapper">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="problem-content">
        <div class="problem-title">Pricing Squeezes Your Margins</div>
        <div class="problem-description">Contact-based billing gets expensive fast. Client lists grow, costs explode, but your retainer stays flat. Hidden cost jumps kill profitability.</div>
        <div class="problem-impact">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
          </svg>
          Shrinking profit margins
        </div>
      </div>
    </div>
  </div>

  <div class="problem-stats-section">
    <div class="problem-stat-card">
      <div class="problem-stat-number">70%</div>
      <div class="problem-stat-divider"></div>
      <div class="problem-stat-content">
        <div class="problem-stat-label">Time Wasted</div>
        <div class="problem-stat-description">Average time agencies waste on email production inefficiencies</div>
      </div>
    </div>
    <div class="problem-stat-card">
      <div class="problem-stat-number">3-5</div>
      <div class="problem-stat-divider"></div>
      <div class="problem-stat-content">
        <div class="problem-stat-label">Days Delayed</div>
        <div class="problem-stat-description">Typical campaign launch delay due to design bottlenecks</div>
      </div>
    </div>
  </div>
</section>

<!-- 4. SOCIAL PROOF - Build trust early -->
<section class="section-index" style="padding-top: 5vh;">
  <h2 class="sectionTitle text-center mt-4 mb-6">
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
      Your team doesn't need to be Adobe experts. Our visual editor produces pixel-perfect emails that render flawlessly across Gmail, Outlook, and mobile so you can deliver premium quality even with a lean creative team.
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
    <div class="problem-stat-card">
      <div class="problem-stat-number">10x</div>
      <div class="problem-stat-divider"></div>
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
<section id="no-rendering-issues" class="value-prop">
  <h2 class="sectionTitle text-center mb-3">
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
<section class="section-index value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Protect Your Clients (and Your Agency) from Compliance Nightmares
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Double opt-in, one-click unsubscribe, automated suppression lists, all built-in. Show clients you're not just creative, you're responsible stewards of their brand reputation.
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
      Stop spending hours in spreadsheets. Export beautiful, client-ready reports that prove ROI. Open rates, click rates, conversion attribution, revenue impact <strong>everything your client needs to see why they should increase your retainer.</strong>
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated">
    <img alt="Analytics dashboard showing ROI metrics" src="/assets/analytics-alt.webp" loading="lazy" />
  </v-card>
</section>

<!-- 13. FOR CREATIVE TEAMS - Secondary audience segment -->
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

<!-- 12. INTEGRATIONS - Connect with your stack -->
<section class="value-prop">
  <Integration :is-dark="isDark" />
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
      class="no-uppercase"
      href="https://app.bluefox.email/accounts/create-account"
      target="_blank"
    >
      <strong>Start Your Free Agency Account</strong>
    </v-btn>
  </v-row>
</section>