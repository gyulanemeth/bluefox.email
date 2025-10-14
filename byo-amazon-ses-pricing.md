---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: Pricing
description: Don't overpay for contact-based subscriptions ever again. Only pay for the emails you send!
---

<script setup>
  import { useData } from 'vitepress'
  const { isDark } = useData()
</script>

<style>
a {
  text-decoration: none !important;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  padding-top: 50px;
}

.pricing-card {
  padding: 5px;
  border-radius: 13px;

  width: 200px;
  min-width: 200px;
}

.pricing-card .pricing-card-inner {
  padding: 30px;
  border-radius: 10px;
  background: white;
}

html.dark .pricing-card .pricing-card-inner {
  background-color: rgb(27, 27, 31);
}

.pricing-card.start-up {
  background: linear-gradient(-5deg, #392C91 0%, #13B0EE 30%);
}

.pricing-card.scale-up {
  background: linear-gradient(-5deg, #392C91 30%, #13B0EE 60%);
}

.pricing-card.grown-up {
  background: linear-gradient(-5deg, #392C91 60%, #13B0EE 90%);
}

.pricing-card.enterprise {
  background: #392C91;
}

.vp-doc .pricing-card h3 {
  margin: 0;
  border-top: 0;
  padding-top: 0;
  font-size: 28px;
  line-height: 28px;
  white-space: nowrap;
}

.pricing-card .pricing-card-credits {
  padding-top: 13px;
  font-weight: 700;
}

.pricing-card .pricing-card-sends {
  padding-bottom: 13px;
}

.pricing-card .pricing-card-price {
  font-size: 22px;
  line-height: 28px;
  font-weight: 700;
}

.pricing-card a {
  color: unset !important;
}

#pricing-page-credit-packs {
  text-align: center;

  padding-top: 100px;
}


#pricing-page-credit-packs p {
  font-size: 24px;
  line-height: 28px;
  margin: 25px 0;
}

.vp-doc .VPButton.medium {
      border-radius: 50px;
      padding: 15px 30px;
      line-height: 22px;
      font-size: 22px;
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

  #get-started-with-free-credits {
     background: -webkit-linear-gradient(
      120deg,
      #392C91 5%,
      #13B0EE
    );
    background-clip: text;
    color: transparent;

    font-size: 42px;
    line-height: 50px;
    letter-spacing: 2px;
    font-weight: 700;

    margin: 25px auto;

    width: 100%;
    max-width: 800px
  }

  html.dark #get-started-with-free-credits {
    background: -webkit-linear-gradient(
      120deg,
      #8a7ed8 5%,
      #13B0EE
    );
    background-clip: text;
  }

  .credit-explanation {
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 50px;
    padding: 15px;
  }

  .credit-explanation div {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    max-width: 600px;
  }

  @media (max-width: 599px) {
    .vp-doc .actions {
      flex-direction: column;
    }
  }
</style>

<section id="pricing-page-credit-packs">
  <h1 class="text-center">Credit packs</h1>
  <div class="d-flex justify-center">
    <div class="text-center mt-4" :style="`width: ${lgAndUp || md ? '60%' : '100%'}`">
      Don't overpay for contact-based subscriptions ever again.
    </div>
  </div>
  <div class="card-container">
    <div class="pricing-card start-up">
      <div class="pricing-card-inner">
        <h3>Start-up</h3>
        <div class="pricing-card-credits">100K credits</div>
        <div class="pricing-card-sends">(100K sends)</div>
        <div class="pricing-card-price">$50</div>
      </div>
    </div>
    <div class="pricing-card scale-up">
      <div class="pricing-card-inner">
        <h3>Scale-up</h3>
        <div class="pricing-card-credits">1M credits</div>
        <div class="pricing-card-sends">(1M sends)</div>
        <div class="pricing-card-price">$300</div>
      </div>
    </div>
    <div class="pricing-card grown-up">
      <div class="pricing-card-inner">
        <h3>Grown-up</h3>
        <div class="pricing-card-credits">10M credits</div>
        <div class="pricing-card-sends">(10M sends)</div>
        <div class="pricing-card-price">$2500</div>
      </div>
    </div>
    <div class="pricing-card enterprise">
      <div class="pricing-card-inner">
        <h3>Enterprise</h3>
        <div class="pricing-card-credits">10M+ credits</div>
        <div class="pricing-card-sends">(10M+ sends)</div>
        <div class="pricing-card-price"><a href="mailto:hello@bluefox.email">Contact us</a></div>
      </div>
    </div>
  </div>
  
  <div class="credit-explanation">
    <div class="with-branding">
      <div>1 email send = 1 credit</div>
      <div>In the "bring your own Amazon SES" version, you can connect your own SES account to BlueFox Email. It means that you will also need to pay to AWS $1 / 10,000 emails for your SES usage.</div>
    </div>
  </div>
  <div>Wanna use our sending infrastructure? <a href="/pricing">See our regular pricing.</a></div>
  <p>All packages include all of our features without restrictions!</p>
  <div id="get-started-with-free-credits">Get started with 3000 free monthly credits in the first year</div>

  <div class="my-4">
    <v-btn
      rounded
      size="large"
      color="primary"
      variant="flat"
      class="no-uppercase mb-2 mb-sm-0 mr-sm-3"
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
      href="/docs/credits"
    >
      How credits work
    </v-btn>
  </div>
</section>

