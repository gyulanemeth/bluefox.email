---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: Beautiful emails for SaaS companies
---
<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useDisplay } from 'vuetify'
import { useData } from 'vitepress'

import HeroUnit from './.vitepress/theme/HeroUnit.vue'
import TestimonialDiv from './.vitepress/theme/TestimonialDiv.vue'
import DesignSystem from './.vitepress/theme/DesignSystem.vue'

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
    padding-top: 10vh;
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
  }

  #no-rendering-issues .img-container {
    display: flex;
    justify-content: space-between;
    align-items: top;
  }

  #no-rendering-issues .img-box {
    text-align: center;
    flex: 1;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
  }

  #no-rendering-issues .img-box img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }

  #no-rendering-issues .img-label {
    margin-top: 5px;
    font-weight: bold;
  }

  #no-rendering-issues .img-wrapper {
    flex-grow: 1;
    background: #cccccc;
    border-radius: 5px;
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

    #no-rendering-issues .img-container {
      flex-direction: column;
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

<section id="testimonials" class="section-index">
  <h2 class="sectionTitle text-center mt-4 mb-6">
    Feedback from our inbox
  </h2>
  <TestimonialDiv />
</section>

<section id="designers" class="section-index">
  <div class="d-flex justify-center">
    <v-chip color="primary">
      <span class="text-overline">Designers</span>
    </v-chip>
  </div>
  <h2 class="sectionTitle text-center mt-4 mb-3 pt-0">
    Amazing email design? Easy!
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Create pixel-perfect email designs with the most sophisticated email editor on the market. Don't worry, you can start out with our built-in templates!
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

  <h2 class="sectionTitle text-center mb-3 pt-0" style="margin-top: 15vh !important">
    Consistent-looking transactional, triggered, & marketing emails
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Our design system feature makes it sure that all of your emails look great and consistent.
    </div>
  </div>

  <DesignSystem
    class="mt-6"
    :is-dark="isDark"
  />
</section>

<!--
<section id="design-system" class="value-prop pt-0">
  <input type="radio" name="image" id="image1" v-model="selectedEmailType" value="0">
  <input type="radio" name="image" id="image2" v-model="selectedEmailType" value="1">
  <input type="radio" name="image" id="image3" v-model="selectedEmailType" value="2">
  <input type="radio" name="image" id="image4" v-model="selectedEmailType" value="3">
  
  <h2 class="text-center mb-3">
    Consistent-looking transactional, triggered, & marketing emails
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Our design system feature makes it sure that all of your emails look great and consistent, be it <label id="image1-label" for="image1">transactional emails</label>, <label id="image2-label" for="image2">triggered emails</label>, <label id="image3-label" for="image3">newsletters</label> or <label id="image4-label" for="image4">promotional emails</label>.
    </div>
  </div>
  <div class="image-container mt-4">
    <img src="/assets/consistent-emails-01.png" alt="Image 1" class="image img1">
    <img src="/assets/consistent-emails-02.png" alt="Image 2" class="image img2">
    <img src="/assets/consistent-emails-03.png" alt="Image 3" class="image img3">
    <img src="/assets/consistent-emails-04.png" alt="Image 4" class="image img4">
  </div>
</section>
-->

<section id="no-rendering-issues" class="value-prop pt-0">
  <h2 class="sectionTitle text-center mb-3">
    No more email rendering issues
  </h2>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      You might have experienced that your email looks great on a certain email client, but it falls apart on other email clients, such as Outlook. That will never happen if you use our platform. Our battle-hardened email generator is continuously tested on all the relevant email clients.
    </div>
  </div>
  
  <div class="img-container mt-6">
    <div class="img-box">
      <p class="img-label">Our templates</p>
      <div class="img-wrapper">
        <img src="/assets/template-rendering-we.png" alt="Ours">
      </div>
    </div>
    <div class="img-box">
      <p class="img-label">Others...</p>
      <div class="img-wrapper">
        <img src="/assets/template-rendering-others.png" alt="Others'">
      </div>
    </div>
  </div>
</section>

<section id="great-deliverability" class="value-prop ">
  <h2 class="sectionTitle text-center">
    Bring your own AWS SES
  </h2>
  <p style="background: white; color: #392C91; font-weight: bold; padding: 10px; font-size: 20px; text-align: center;">The gold-standard of great deliverability</p>

  <div class="mt-4">
    Using your own AWS SES with bluefox.email gives you full control over your sender reputation while still benefiting from AWS's infrastructure. Since you connect your own AWS account, your email campaigns are isolated from other users' activities, ensuring better control over deliverability and security. You get the reliability and performance of AWS SES, but with the added assurance that only your actions affect your email sending reputation.
  </div>
  <div class="mt-4">
    If needed, you can easily upgrade to dedicated IPs through AWS SES for even greater control and improved deliverability.
  </div>
</section>

<!--
<section id="email-analytics">
  <h2>Detailed analytics</h2>
</section>
<hr class="value-prop-divider type1"/>
<section id="easy-integration">
  <h2>Easy integration</h2>
  <p>It is really funcking easy!</p>
</section>
<hr class="value-prop-divider type2"/>
-->
<section id="second-cta" class="value-prop">
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
      rounded
      size="large"
      color="primary"
      variant="flat"
      class="no-uppercase mr-3"
      href="https://app.bluefox.email/accounts/create-account"
      target="_blank"
    >
      Get started now
    </v-btn>
    <v-btn
      rounded
      size="large"
      color="buttonBackground"
      variant="flat"
      class="no-uppercase"
      :theme="isDark? 'dark' : 'light'"
      href="/pricing"
    >
      Pricing
    </v-btn>
  </v-row>
</section>


