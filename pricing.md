---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<style>
  .VPHero {
    background: linear-gradient(278deg, hsl(247.72, 53.44%, 90%) 10%, hsl(196.99, 86.56%, 90%) 90%);
  }

  html.dark .VPHero {
    background: linear-gradient(278deg, hsl(247.72, 53.44%, 10%) 10%, hsl(196.99, 86.56%, 10%) 90%);
  }

  .VPHero .container {
    max-width: 100%;
  }

  .VPHero .main {
    width: 100% !important;
    max-width: unset !important;
    text-align: center;
    display: block !important;
    padding-top: 15vh;
    padding-bottom: 10vh;
  }
  .VPHero .main .name {
    font-size: 72px;
    line-height: 72px;
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
    font-size: 32px;
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

  .VPHero .VPButton.medium {
      border-radius: 50px;
      padding: 15px 30px;
      line-height: 22px;
      font-size: 22px;
  }


.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 30px;
}

.pricing-card {
  border: 1px solid #eeeeee;
  border-radius: 5px;
  padding: 30px;

  background: #13B0EE;
  color: white;

  width: 200px;
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
}

.pricing-card .pricing-card-credits {
  padding: 20px 0;
  font-weight: 700;
}

.pricing-card .pricing-card-price {
  font-size: 22px;
  line-height: 28px;
  font-weight: 700;
}

.pricing-card a {
  color: white !important;
}

.pricing-card a:hover {
  color: #eeeeee;
}

#credit-packs {
  text-align: center;

  padding-top: 100px;
  padding-bottom: 100px;
}

#credit-packs h1 {
  font-size: 72px;
  line-height: 72px;
  border-top: 0;
}

#credit-packs p {
  font-size: 24px;
  line-height: 28px;
}

#free-credits {
  text-align: center;
  padding-bottom: 100px;
}

#free-credits h2 {
  border-top: 0;
  margin-top: 0;
  padding-top: 0;
  font-size: 64px;
  line-height: 64px;
}

#free-credits p {
  font-size: 24px;
  line-height: 28px;
}

#credit-packs .VPButton.medium {
      border-radius: 50px;
      padding: 15px 30px;
      line-height: 22px;
      font-size: 22px;
  }
.vp-doc .actions {
    padding-top: 30px;
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
</style>

<section id="credit-packs">
  <h1>Credit packs</h1>
  <div>Don't pay for contact-based subscriptions ever again.</div>
  <p>All packages include all of our features without restrictions!</p>
  <div class="card-container">
    <div class="pricing-card start-up">
      <h3>Start-up</h3>
      <div class="pricing-card-credits">100K credits</div>
      <div class="pricing-card-price">$50</div>
    </div>
    <div class="pricing-card scale-up">
      <h3>Scale-up</h3>
      <div class="pricing-card-credits">1M credits</div>
      <div class="pricing-card-price">$300</div>
    </div>
    <div class="pricing-card grown-up">
      <h3>Grown-up</h3>
      <div class="pricing-card-credits">10M credits</div>
      <div class="pricing-card-price">$2500</div>
    </div>
    <div class="pricing-card enterprise">
      <h3>Enterprise</h3>
      <div class="pricing-card-credits">10M+ credits</div>
      <div class="pricing-card-price"><a href="mailto:hello@bluefox.email">Contact us</a></div>
    </div>
  </div>
  <div>1 credit = 1 send without branding. (We don't add our logo + link to your emails.)</div>
  <div>OR</div>
  <div>1 credit = 2 sends with branding. (We add our logo + link to your emails.)</div>
  <div> Credits expire in a year. Yes, that also means that you can buy a credit pack and even use it for a whole year!</div>

  <div class="actions">
    <div class="action">
      <a class="VPButton brand medium" target="_blank" href="https://app.bluefox.email/accounts/create-account">Get Started</a>
    </div>
    <div class="action">
      <a class="VPButton alt medium" target="_blank" href="mailto:hello@bluefox.email">Contact us</a>
    </div>
  </div>
</section>

<section id="free-credits">
  <h2>Start with 36000 free credits</h2>
  <div>1 credit = 1 branded send. (We add our logo with a link to your emails.)</div>
  <p>It is aligned with AWS SES' free tier, in which you get 3000 free sends per month.</p>
  <p>It means you have a whole year to kick off your project with free email sending!</p>
</section>
