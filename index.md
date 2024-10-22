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
</script>
<style>
  .vp-doc {
    overflow: hidden;
  }
  .vp-doc h2 {
    border-top: 0;
    margin: 20px 0 10px 0;

    font-size: 32px;
    line-height: 32px;
  }

  .VPHero {
    background: linear-gradient(278deg, hsl(247.72, 53.44%, 90%) 10%, hsl(196.99, 86.56%, 90%) 90%);
  }

  html.dark .VPHero {
    background: linear-gradient(278deg, hsl(247.72, 53.44%, 10%) 10%, hsl(196.99, 86.56%, 10%) 90%);
  }

  .VPHero .container {
    display: block;
  }

  .VPHero .main {
    width: 100% !important;
    max-width: unset !important;
    text-align: center;
    display: block !important;
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

  .vp-doc .value-prop-divider {
    height: 3px;
    border: 0;

    margin: 100px 0;

    background: linear-gradient(90deg, hsl(196.99, 86.56%, 50.39%) 10%, hsl(247.72, 53.44%, 37.06%) 90%);
  }

  #email-editor video {
    border: 1px solid #eeeeee;
    border-radius: 25px;
  }

  .image-rows {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Space between each row */
}

  .row {
    text-align: center;
  }

  .image-pair {
    display: flex;
    justify-content: center; /* Center the images in the row */
    gap: 20px; /* Space between the images */
  }

  .image-pair img {
    width: 50%; /* Adjust the size of the images */
  }

  @media (max-width: 599px) {
    .VPHero .main {
      padding: 0;
    }
  }
</style>

<section id="email-editor">
  <h2>Amazing email designs? Easy!</h2>
  <p>Create pixel-perfect email designs with the most sophisticated email editor on the market. Don't worry, you can start out with our built-in templates!</p>
  <video width="100%" autoplay muted loop>
    <source src="/assets/bluefox-email-editor-intro.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</section>

<hr class="value-prop-divider" style="transform: rotate(25deg) skew(-30deg, -20deg) scale(1.3) translate(-100px, 0);"/>

<section id="design-system">
  <h2>Consistent-looking transactional, triggered, & marketing emails</h2>
  <p>Our design system feature makes it sure that all of your emails look great and consistent, be it transactional, triggered, or marketing emails.</p>
  <div class="image-rows">
  <div class="row">
    <h3>Transactional</h3>
    <div class="image-pair">
      <img src="/assets/consistent-emails-01.png" alt="Transactional Email 1">
      <img src="/assets/consistent-emails-02.png" alt="Transactional Email 2">
    </div>
  </div>
  
  <div class="row">
    <h3>Triggered</h3>
    <div class="image-pair">
      <img src="/assets/consistent-emails-03.png" alt="Triggered Email 1">
      <img src="/assets/consistent-emails-04.png" alt="Triggered Email 2">
    </div>
  </div>
  
  <div class="row">
    <h3>Promotional</h3>
    <div class="image-pair">
      <img src="/assets/consistent-emails-05.png" alt="Promotional Email 1">
      <img src="/assets/consistent-emails-06.png" alt="Promotional Email 2">
    </div>
  </div>
</div>


</section>

<hr class="value-prop-divider" style="transform: rotate(-27deg) skew(30deg, 20deg) scale(1.3) translate(100px, 0);"/>

<section id="no-rendering-issues">
  <h2>No more email rendering issues</h2>
  <p>You might have experienced that your email looks great on a certain email client, but it falls apart on other email clients, such as Outlook. That will never happen if you use our platform. Our battle-hardened email generator is continuously tested on all the relevant email clients.</p>
</section>

<hr class="value-prop-divider" style="transform: rotate(25deg) skew(-30deg, -20deg) scale(1.3) translate(-100px, 0);"/>


<section id="great-deliverability">
  <h2>Use your own AWS SES - the gold-standard of great deliverability</h2>
  <p>yo</p>
</section>

<hr class="value-prop-divider" style="transform: rotate(-27deg) skew(30deg, 20deg) scale(1.3) translate(100px, 0);"/>

<section id="email-analytics">
  <h2>Detailed analytics</h2>
</section>

<hr class="value-prop-divider" style="transform: rotate(25deg) skew(-30deg, -20deg) scale(1.3) translate(-100px, 0);"/>

<section id="easy-integration">
  <h2>Easy integration</h2>
  <p>It is really funcking easy!</p>
</section>



