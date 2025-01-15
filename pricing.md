---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: Pricing
description: Don't overpay for contact-based subscriptions ever again. Only pay for the emails you send!
---

<style>
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
  padding: 25px 0;
  font-weight: 700;
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

#pricing-page-credit-packs h1 {
  font-size: 72px;
  line-height: 72px;
  border-top: 0;
  padding-bottom: 25px;
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
    background: linear-gradient(-10deg, #392C91 10%, #13B0EE 90%);
    background-clip: text;
    color: transparent;

    font-size: 42px;
    line-height: 42px;
    letter-spacing: 2px;
    font-weight: 700;

    margin: 25px 0;
  }

  html.dark #get-started-with-free-credits {
    background: linear-gradient(-10deg, #8a7ed8 10%, #13B0EE 90%);
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
  }

  @media (max-width: 599px) {
    .vp-doc .actions {
      flex-direction: column;
    }
  }
</style>

<section id="pricing-page-credit-packs">
  <h1>Credit packs</h1>
  <div>Don't overpay for contact-based subscriptions ever again.</div>
  <div class="card-container">
    <div class="pricing-card start-up">
      <div class="pricing-card-inner">
        <h3>Start-up</h3>
        <div class="pricing-card-credits">100K credits</div>
        <div class="pricing-card-price">$50</div>
      </div>
    </div>
    <div class="pricing-card scale-up">
      <div class="pricing-card-inner">
        <h3>Scale-up</h3>
        <div class="pricing-card-credits">1M credits</div>
        <div class="pricing-card-price">$300</div>
      </div>
    </div>
    <div class="pricing-card grown-up">
      <div class="pricing-card-inner">
        <h3>Grown-up</h3>
        <div class="pricing-card-credits">10M credits</div>
        <div class="pricing-card-price">$2500</div>
      </div>
    </div>
    <div class="pricing-card enterprise">
      <div class="pricing-card-inner">
        <h3>Enterprise</h3>
        <div class="pricing-card-credits">10M+ credits</div>
        <div class="pricing-card-price"><a href="mailto:hello@bluefox.email">Contact us</a></div>
      </div>
    </div>
  </div>
  <div class="credit-explanation">
    <div class="with-branding">
      <div>1 credit = 2 email sends</div>
      <div>with bluefox.email branding.</div>
      <div>(We put our logo & link in your emails.)</div>
    </div>
    <div>OR</div>
    <div class="without-branding">
      <div>1 credit = 1 email send</div>
      <div>without bluefox.email branding.</div>
      <div>(We don't put our logo in your emails.)</div>
    </div>
  </div>  
  <div>You will also need to pay to AWS $0.1 / 1000 emails for your SES usage.</div>
  <p>All packages include all of our features without restrictions!</p>
  <div id="get-started-with-free-credits">Get started with 36000 free credits</div>
  <div class="actions">
    <div class="action">
      <a class="VPButton brand medium" target="_blank" href="https://app.bluefox.email/accounts/create-account">Get Started Now</a>
    </div>
    <div class="action">
      <a class="VPButton alt medium" target="_blank" href="/docs/credits">How Credits Work</a>
    </div>
  </div>
</section>

