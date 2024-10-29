---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: Beautiful emails for SaaS companies

hero:
  name: Beautiful emails for SaaS companies.
  text: Powered by your own AWS SES.
  tagline: Send consistent and beautiful transactional, triggered, & marketing emails that your customers will love.
  actions:
    - theme: brand
      text: Sign up
      link: https://app.bluefox.email/accounts/create-account
    - theme: alt
      text: Why?
      link: /why
---
<script setup>
import { ref } from 'vue'

const selectedEmailType = ref('0')

setInterval(() => {
  let actSelVal = parseInt(selectedEmailType.value)
  actSelVal += 1
  actSelVal %= 4
  selectedEmailType.value = actSelVal
}, 3000)

</script>
<style>
  .VPHome {
    margin-bottom: 0 !important;
  }
  .vp-doc {
    overflow: hidden;
  }
  html.dark .vp-doc {
    background: #222222;
  }

  .vp-doc h2 {
    border-top: 0 !important;
    margin: 100px 0 10px 0 !important;

    font-size: 32px !important;
    line-height: 32px !important;
  }

  .VPHero {
    width: 1280px;
    max-width: 100%;
    margin: auto;
  }

  .VPHero .container {
    display: block;
  }

  .VPHero .main {
    width: 100% !important;
    max-width: unset !important;
    text-align: center;
    display: block !important;
    padding: 0 !important;
  }
  .VPHero .main .name {
    width: 100% !important;
    max-width: unset !important;
  }

  .VPHero .main .text {
    width: 100% !important;
    max-width: unset !important;
    font-size: 26px;
    line-height: 32px;
  }
  .VPHero .main .tagline {
    width: 100% !important;
    max-width: unset !important;
  }

  .VPHero .main .actions {
    width: 100% !important;
    max-width: unset !important;
    justify-content: center !important;
  }
  html.dark .VPHero .name .clip {
    background: -webkit-linear-gradient(
      120deg,
      #8a7ed8 5%,
      #13B0EE
    );
    background-clip: text;
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

  .VPHero .main .image {
    width: 100% !important;
    max-width: 100% !important;
    display: block !important;
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

  .VPButton.medium {
      border-radius: 20px;
      padding: 0 20px;
      line-height: 38px;
      font-size: 14px;
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

  .VPHome .vp-doc {
    margin-top: -90px !important;
  }

  #email-editor video {
    border: 1px solid #eeeeee;
    border-radius: 25px;
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
    border-radius: 25px;
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
  #image1:checked ~ p #image1-label::after {
    width: 100%;
  }

  #image2:checked ~ p #image2-label::after {
    width: 100%;
  }

  #image3:checked ~ p #image3-label::after {
    width: 100%;
  }

  #image4:checked ~ p #image4-label::after {
    width: 100%;
  }

  #second-cta {
    text-align: center;
    padding-bottom: 100px;
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
  }

  #no-rendering-issues .img-box img {
    max-width: 100%;
    height: auto;
    border-radius: 25px;
  }

  #no-rendering-issues .img-label {
    margin-top: 10px;
    font-weight: bold;
  }

  #great-deliverability {
    background: #392C91;
    color: white;
    padding: 100px;
    margin-top: 100px;
    border-radius: 25px;
  }

  .vp-doc #great-deliverability h2 {
    margin: 0 0 10px 0 !important;
    padding-top: 0 !important;
  }



  @media (max-width: 599px) {
    .VPHero .main {
      padding: 0;
    }

    #no-rendering-issues .img-container {
      flex-direction: column;
    }
  }
</style>

<section id="email-editor">
  <h2>Amazing email design? Easy!</h2>
  <p>Create pixel-perfect email designs with the most sophisticated email editor on the market. Don't worry, you can start out with our built-in templates!</p>
  <video width="100%" autoplay muted loop>
    <source src="/assets/bluefox-email-editor-intro.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</section>

<section id="design-system">
  <input type="radio" name="image" id="image1" v-model="selectedEmailType" value="0">
  <input type="radio" name="image" id="image2" v-model="selectedEmailType" value="1">
  <input type="radio" name="image" id="image3" v-model="selectedEmailType" value="2">
  <input type="radio" name="image" id="image4" v-model="selectedEmailType" value="3">
  
  <h2>Consistent-looking transactional, triggered, & marketing emails</h2>
  <p>Our design system feature makes it sure that all of your emails look great and consistent, be it <label id="image1-label" for="image1">transactional emails</label>, <label id="image2-label" for="image2">triggered emails</label>, <label id="image3-label" for="image3">newsletters</label> or <label id="image4-label" for="image4">promotional emails</label>.</p>

  <div class="image-container">
    <img src="/assets/consistent-emails-01.png" alt="Image 1" class="image img1">
    <img src="/assets/consistent-emails-02.png" alt="Image 2" class="image img2">
    <img src="/assets/consistent-emails-03.png" alt="Image 3" class="image img3">
    <img src="/assets/consistent-emails-04.png" alt="Image 4" class="image img4">
  </div>
</section>

<section id="no-rendering-issues">
  <h2>No more email rendering issues</h2>
  <p>You might have experienced that your email looks great on a certain email client, but it falls apart on other email clients, such as Outlook. That will never happen if you use our platform. Our battle-hardened email generator is continuously tested on all the relevant email clients.</p>
  
  <div class="img-container">
    <div class="img-box">
      <p class="img-label">Our templates</p>
      <img src="/assets/template-rendering-we.png" alt="Ours">
    </div>
    <div class="img-box">
      <p class="img-label">Others...</p>
      <img src="/assets/template-rendering-others.png" alt="Others'">
    </div>
  </div>
</section>

<section id="great-deliverability">
  <h2>Use your own AWS SES - the gold-standard of great deliverability</h2>
  <p>Using your own AWS SES with bluefox.email gives you full control over your sender reputation while still benefiting from AWS's infrastructure. Since you connect your own AWS account, your email campaigns are isolated from other users' activities, ensuring better control over deliverability and security. You get the reliability and performance of AWS SES, but with the added assurance that only your actions affect your email sending reputation.</p>
  <p>If needed, you can easily upgrade to dedicated IPs through AWS SES for even greater control and improved deliverability.</p>
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
<section id="second-cta">
  <h2>Send consistent-looking & beautiful emails today!</h2>
  <p>If you have any questions, don't hesitate to contact us.</p>
  <div class="actions">
    <div class="action">
      <a class="VPButton brand medium" target="_blank" href="https://app.bluefox.email/accounts/create-account">Sign up</a>
    </div>
    <div class="action">
      <a class="VPButton alt medium" target="_blank" href="mailto:hello@bluefox.email">Contact us</a>
    </div>
  </div>
</section>



