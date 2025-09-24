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
import ConnectAWS from '../.vitepress/theme/ConnectAWS.vue'
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
      font-size: 26px !important;
      line-height: 28 px !important;
    }

    .section-index {
      padding-top: 10vh;
      padding-bottom: 10vh;
    }
  }

  .mt-150 {
    margin-top: 150px !important;
  }
</style>

<section id="hero">
  <HeroUnit />
</section>

<section class="section-index value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-6">
    Feedback from Amazon SES Users
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
    Send All Your Emails with Amazon SES in One Powerful Platform
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Combine the power of Amazon SES for both transactional and marketing emails, keep your brand consistent, and manage all your communications from one easy-to-use plaftorm.
    </div>
  </div>

  <DesignSystem
    class="mt-6"
    :is-dark="isDark"
  />
</section>

<section id="marketers" class="section-index">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Effortless Email Automations
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Building automated email workflows with Amazon SES can be complex and require custom coding. With BlueFox Email, you can easily automate everything from onboarding sequences to re-engagement campaigns and event-based triggers.
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
    Design Stunning Emails Without Writing a Line of Code
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      With Amazon SES, you're stuck hand-coding HTML and fixing rendering bugs. Maintaining changes is a nightmare. BlueFox Email lets you skip the code and design stunning emails with drag & drop, that will work on all major email clients, including Outlook.
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated">
    <video
      width="100%"
      :autoplay="lgAndUp || md"
      :loop="lgAndUp || md"
      :controls="sm || xs"
      muted
      preload="none"
    >
      <source src="/assets/bluefox-email-editor-intro.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </v-card>
</section>

<section class="section-index value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Effortless Audience Management, from Segmentation to Complaints
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Manage and segment your audience with advanced filtering and list management features. Enjoy seamless integration with Amazon SES and SNS, and take advantage of features like double opt-in and easy subscription preferences.
    </div>
  </div>
  <v-card class="d-flex justify-center mt-4" variant="elevated">
    <img alt="List management screens" src="/assets/list-management.webp" loading="lazy" />
  </v-card>
</section>

<section class="value-prop">
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Advanced Analytics Made Easy
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Say goodbye to the bare-bones reports of Amazon SES. With BlueFox Email, you get intuitive, detailed analytics that highlight what really matters, helping you optimize your email performance effortlessly.
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
    Connect Quickly & Securely
  </h2>

  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      You can be fully set up (including bounces & complaints via SNS) in just a few minutes! Choose the method which fits your workflow:
    </div>
  </div>

  <ConnectAWS
    class="mt-6"
    :is-dark="isDark"
    :xs="xs"
  />
</section>

<section id="developers" class="value-prop" style="padding-top: 0;">
  <h2 class="sectionTitle text-center mb-3">
    Simple, Technology-Agnostic API
  </h2>

  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Whether you're using Node, Python, Go, Ruby, PHP, or anything else, you can send emails, manage lists, and trigger automations with just a few lines of code. It’s the easiest way to make SES feel like a modern email platform.
    </div>
  </div>
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
    Get Started with 3,000 Free Emails Every Month for a Year!
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Experience the full power of BlueFox Email with zero risk. For your first year, enjoy 3,000 free sends per month and see how easy it is to supercharge your Amazon SES experience.
      <div class="mt-4"><strong>No subscription required!</strong></div>
    </div>
  </div>

  <v-row class="mt-4 justify-center">
    <v-btn
      size="large"
      color="primary"
      variant="flat"
      class="no-uppercase mt-4"
      href="https://app.bluefox.email/accounts/create-account"
      target="_blank"
    >
      <strong>Supercharge Your Amazon SES</strong>
    </v-btn>
  </v-row>
</section>


