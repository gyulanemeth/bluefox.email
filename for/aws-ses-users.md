---
layout: home

title: Supercharge Your Amazon SES with BlueFox Email
description: Connect your AWS SES account to BlueFox and unlock automation, stunning designs, smart list management, and detailed analytics. All in one place.

head:
  - - meta
    - name: description
      content: "Connect your AWS SES account to BlueFox and unlock automation, stunning designs, smart list management, and detailed analytics. All in one place."
  - - meta
    - property: og:title
      content: Supercharge Your Amazon SES with BlueFox Email
  - - meta
    - property: og:description
      content: "Connect your AWS SES account to BlueFox and unlock automation, stunning designs, smart list management, and detailed analytics. All in one place."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/share-amazon-ses.png
  - - meta
    - property: og:url
      content: https://bluefox.email/for/aws-ses-users
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Supercharge Your Amazon SES with BlueFox Email
  - - meta
    - name: twitter:description
      content: "Connect your AWS SES account to BlueFox and unlock automation, stunning designs, smart list management, and detailed analytics. All in one place."
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/share-amazon-ses.png
---
<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useDisplay } from 'vuetify'
import { useData } from 'vitepress'

import HeroUnit from '../.vitepress/theme/HeroUnitAWS.vue'
import TestimonialDiv from '../.vitepress/theme/TestimonialDiv.vue'
import DesignSystem from '../.vitepress/theme/DesignSystem.vue'
import RenderingIssues from '../.vitepress/theme/RenderingIssues.vue'
import Automation from '../.vitepress/theme/Automation.vue'
import Integration from '../.vitepress/theme/IntegrationAWS.vue'
import SendQueues from '../.vitepress/theme/SendQueues.vue'

const { lgAndUp, md, sm, xs } = useDisplay()
const { isDark } = useData()

const selectedEmailType = ref('0');
let intervalId

onMounted(() => {
  setInterval(() => {
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
<style>
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
    width: 600px; /* Adjust as necessary */
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

  /* Default state: show Image 1 */
  #image1:checked ~ .image-container .img1 {
    opacity: 1;
    transform: translateX(-100%);
  }

  /* Show Image 2 when radio button 2 is checked */
  #image2:checked ~ .image-container .img2 {
    opacity: 1;
    transform: translateX(-100%);
  }

  /* Show Image 3 when radio button 3 is checked */
  #image3:checked ~ .image-container .img3 {
    opacity: 1;
    transform: translateX(-100%);
  }

  #image4:checked ~ .image-container .img4 {
    opacity: 1;
    transform: translateX(-100%);
  }

  /* Animation for slide-in effect */
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
    transition: width 0.3s ease; /* Add animation to the underline */
  }

  /* When the corresponding radio button is checked, extend the underline */
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
      line-height: 20 px !important;
    }

    .section-index {
      padding-top: 5vh;
      padding-bottom: 5vh;
    }
  }

  .mt-150 {
    margin-top: 150px !important;
  }
</style>

<section id="hero">
  <HeroUnit />
</section>

<section class="section-index">
  <h2 class="sectionTitle text-center mt-4 mb-6">
    Feedback from our inbox
  </h2>
  <TestimonialDiv
    :is-dark="isDark"
    :lg-and-up="lgAndUp"
    :md="md"
    :sm="sm"
    :xs="xs"
  />
</section>


<section id="design-system" class="value-prop">
  <h2 class="sectionTitle text-center mb-3 pt-0">
    All Your Emails, One Powerful Platform
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Manage transactional and marketing emails seamlessly in one place.
    </div>
  </div>

  <DesignSystem
    class="mt-6"
    :is-dark="isDark"
  />
</section>

<section id="marketers" class="section-index">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Effortless Automations for Every Workflow
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Automate your email sequences with ease and keep your audience engaged without the hassle.
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

<section id="designers" class="section-index">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Design Stunning Emails with Ease
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Create eye-catching, professional emails in minutes with our drag-and-drop editor.
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
      <source src="/assets/bluefox-email-editor-intro.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </v-card>
</section>

<section class="value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Master Your Audience with Smart List Management
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Easily organize, segment, and target your contacts to ensure the right message reaches the right audience
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated">
    <img alt="List management screens" src="/assets/list-management.webp" loading="lazy" />
  </v-card>
</section>

<section class="value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Gain Insights with Advanced Analytics
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Track performance, understand your audience, and optimize your campaigns with comprehensive reporting tools.
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated">
    <img alt="Analytics screenshot" src="/assets/analytics-alt.webp" loading="lazy" />
  </v-card>
</section>

<section>
  <SendQueues />
</section>

<section id="developers" class="value-prop">
  <h2 class="sectionTitle text-center mb-3 pt-0">
    How it works
  </h2>

  <Integration
    class="mt-6"
    :is-dark="isDark"
    :xs="xs"
  >
  <template #tab-1>

  ```json
  {
    "name": "Jon Doe",
    "email": "jon@doe.com"
  }
  ```
  </template>
  <template #tab-2>

  ```json
  {
    "status": "unsubscribed"
  }
  ```
  </template>
  <template #tab-3>

  ```json
  {
    "email": "jon@doe.com",
    "transactionalId": "##EMAIL_ID##",
    "data": {
      "example": "example merge tag value"
    },
    "attachments": [ // optional
      {
        "fileName": "example.txt",
        "content": "Ymx1ZWZveC5lbWFpbCBhdHRhY2htZW50IGV4YW1wbGUh"
      }
    ]
  }
  ```
  </template>
  <template #tab-4>

  ```json
  {
    "emails": ["jon@doe.com"],
    "triggeredId": "##EMAIL_ID##",
    "data": {
      "example": "example merge tag value"
    },
    "attachments": [ // optional
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


<section id="second-cta">
  <h2 class="sectionTitle text-center mb-3">
    Ready to Transform Your Email Strategy?
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Get started with BlueFox.email today and unlock the full potential of your Amazon SES.
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
      Let's Land Some Emails!
    </v-btn>
  </v-row>
</section>


