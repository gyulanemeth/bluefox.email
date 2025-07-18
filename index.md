---
layout: home

title: Design Better Emails. Send Smarter. Pay Less. | BlueFox Email
description: Send reliable, well-designed emails at a fair price. Automate flows and improve inbox placement with BlueFox Email.

head:
  - - meta
    - name: description
      content: "Send reliable, well-designed emails at a fair price. Automate flows and improve inbox placement with BlueFox Email."
  - - meta
    - property: og:title
      content: Design Better Emails. Send Smarter. Pay Less. | BlueFox Email
  - - meta
    - property: og:description
      content: "Send reliable, well-designed emails at a fair price. Automate flows and improve inbox placement with BlueFox Email."
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
      content: Design Better Emails. Send Smarter. Pay Less. | BlueFox Email
  - - meta
    - name: twitter:description
      content: "Send reliable, well-designed emails at a fair price. Automate flows and improve inbox placement with BlueFox Email."
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
      line-height: 20 px !important;
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

<section id="designers" class="section-index">
  <div class="d-flex justify-center">
    <v-chip color="primary">
      <span class="text-overline">For designers</span>
    </v-chip>
  </div>
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Create pixel-perfect designs without coding
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Build flawless emails with the most powerful no-code editor. If it’s possible in email, you can create it here!
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

<section id="design-system" class="value-prop">
<h2 class="sectionTitle text-center mb-3 pt-0">
    Maintain coherent design for all of your emails
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Keep every email on-brand with a unified design system: set global styles, save reusable blocks, and ensure consistency across transactional, product, and marketing emails.
    </div>
  </div>

  <DesignSystem
    class="mt-6"
    :is-dark="isDark"
  />
</section>

<section id="no-rendering-issues" class="value-prop">
  <h2 class="sectionTitle text-center mb-3">
    No more email rendering issues
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

<section id="marketers" class="section-index">
  <div class="d-flex justify-center">
    <v-chip color="primary">
      <span class="text-overline">For marketers</span>
    </v-chip>
  </div>
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Craft thoughtful email journeys
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Create seamless, considerate email workflows that engage the right people at the right time.
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

<section class="value-prop">
    <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
      Effortless content editing
    </h2>
    <div class="d-flex justify-center">
      <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
        Quickly refine your email content with our intuitive, no-code editor.
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
  

  <section class="value-prop">
    <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
      Understand your audience
    </h2>
    <div class="d-flex justify-center">
      <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
        Track engagement, segment smarter, and fine-tune your emails to drive more conversions.
      </div>
    </div>
    <v-card class="d-flex justify-center mt-4" variant="elevated">
      <img alt="Analytics screenshot" src="/assets/analytics.png" loading="lazy" />
    </v-card>
  </section>






<section id="developers" class="section-index">
  <div class="d-flex justify-center">
    <v-chip color="primary">
      <span class="text-overline">For developers</span>
    </v-chip>
  </div>
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Easy integration
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Simple, technology-agnostic API
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

<section id="deliverability" class="value-prop">
  <Deliverability />
</section>


<section id="second-cta">
  <h2 class="sectionTitle text-center mb-3">
    Send consistent-looking & beautiful emails today!
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Email communication is part of your product! Don't let it ruin your users' experience with your brand!
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


