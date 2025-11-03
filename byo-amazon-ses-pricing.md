---
layout: home
title: BYO Amazon SES Pricing
description: Connect your own Amazon SES account and pay only for platform credits plus AWS costs.
---

<script setup>
import { useData } from 'vitepress'
import BYOPriceCalculator from './components/BYOPriceCalculator.vue'
const { isDark } = useData()
</script>

<style>
/* Force remove link underlines */
.pricing-hero a,
.pricing-cards-section a,
.value-props a,
.calculator-section a,
.faq-section a,
.pricing-footer-note a {
  text-decoration: none !important;
}

.pricing-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
}

.pricing-badge {
  padding: 6px 16px;
  border-radius: 50px;
  background: linear-gradient(120deg, rgba(57, 44, 145, 0.1), rgba(19, 176, 238, 0.1));
  color: var(--vp-c-brand);
  font-size: 14px;
  font-weight: 500;
  /* margin-bottom: 16px; */
  white-space: nowrap;
}

html.dark .pricing-badge {
  background: linear-gradient(120deg, rgba(138, 126, 216, 0.15), rgba(19, 176, 238, 0.15));
}

.pricing-hero h1 {
  font-size: clamp(36px, 5vw, 56px) !important;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  /* margin: 0 0 16px 0 !important; */
  border: none !important;
  padding: 0 !important;
  text-align: center;
  max-width: 900px;
}

.pricing-hero-subtitle {
  font-size: 17px;
  line-height: 1.6;
  color: #64748b;
  max-width: 700px;
  margin: 0 0 28px 0;
  text-align: center;
}

html.dark .pricing-hero-subtitle {
  color: #94a3b8;
}

.pricing-hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 14px;
  max-width: 500px;
  width: 100%;
}

.pricing-hero-note {
  font-size: 14px;
  color: #64748b;
  text-align: center;
  max-width: 600px;
  margin: 4px 0 !important;
}

html.dark .pricing-hero-note {
  color: #94a3b8;
}

.pricing-hero-note strong {
  color: #1e293b;
  font-weight: 600;
}

html.dark .pricing-hero-note strong {
  color: #e2e8f0;
}

.pricing-cards-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 15px;
}

.pricing-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
  width: 100%;
  min-width: 0;
}

@media (max-width: 959px) and (min-width: 640px) {
  .pricing-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 639px) {
  .pricing-cards-grid {
    grid-template-columns: 1fr;
  }
}

.pricing-card {
  position: relative;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

html.dark .pricing-card {
  background: rgb(27, 27, 31);
  border-color: #334155;
}

.pricing-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

html.dark .pricing-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.pricing-card.featured {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(19, 176, 238, 0.15);
}

html.dark .pricing-card.featured {
  box-shadow: 0 4px 12px rgba(19, 176, 238, 0.25);
}

.pricing-badge-popular {
  position: absolute;
  top: -12px;
  left: 24px;
  background: var(--vp-c-brand);
  color: white !important;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(19, 176, 238, 0.3);
}

.pricing-card h3,
.pricing-cards-section h3 {
  font-size: 24px !important;
  font-weight: 600 !important;
  margin: 0 0 8px 0 !important;
  border: none !important;
  padding: 0 !important;
}

.pricing-card-subtitle {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 24px;
}

html.dark .pricing-card-subtitle {
  color: #94a3b8;
}

.pricing-card-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 24px;
}

.pricing-card-amount {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
}

.pricing-card-period {
  font-size: 16px;
  color: #64748b;
}

html.dark .pricing-card-period {
  color: #94a3b8;
}

.pricing-card-features {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 0 24px 0 !important;
  flex-grow: 1;
}

.pricing-card-features li {
  padding: 8px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #334155;
  list-style: none !important;
}

html.dark .pricing-card-features li {
  color: #cbd5e1;
}

.pricing-card-features li::before {
  content: "✓ ";
  color: var(--vp-c-brand);
  font-weight: bold;
  margin-right: 8px;
}

.pricing-card-cta {
  display: block;
  width: 100%;
  padding: 12px 24px;
  border-radius: 5px;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none !important;
}

.pricing-card-cta.primary {
  background: var(--vp-c-brand) !important;
  color: white !important;
}

.pricing-card-cta.primary:hover {
  background: var(--vp-c-brand-light) !important;
  transform: translateY(-1px);
  color: white !important;
}

.pricing-card-cta.primary:visited {
  color: white !important;
}

.pricing-card-cta.secondary {
  background: transparent;
  color: var(--vp-c-brand) !important;
  border: 2px solid var(--vp-c-brand);
}

.pricing-card-cta.secondary:hover {
  background: rgba(19, 176, 238, 0.05);
}

.pricing-card-cta.dark {
  background: #1e293b !important;
  color: white !important;
}

html.dark .pricing-card-cta.dark {
  background: #334155 !important;
  color: white !important;
}

.pricing-card-cta.dark:hover {
  background: #0f172a !important;
  color: white !important;
}

html.dark .pricing-card-cta.dark:hover {
  background: #475569 !important;
  color: white !important;
}

.pricing-card.contact-sales {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px dashed #cbd5e1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 400px;
}

html.dark .pricing-card.contact-sales {
  background: linear-gradient(135deg, rgb(30, 30, 34) 0%, rgb(24, 24, 27) 100%);
  border-color: #475569;
}

.pricing-card.contact-sales h3 {
  font-size: 28px !important;
  margin-bottom: 16px !important;
}

.pricing-card.contact-sales .pricing-card-subtitle {
  font-size: 16px;
  margin-bottom: 32px;
}

.pricing-card-note {
  /* margin-top: 16px; */
  font-size: 12px;
  color: #64748b;
  text-align: center;
}

html.dark .pricing-card-note {
  color: #94a3b8;
}

.pricing-card-note a {
  text-decoration: underline;
  color: var(--vp-c-brand);
}

.value-props {
  max-width: 1200px;
  margin: 0 auto;
  padding: 13px 24px;
}

.value-props-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.value-prop-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

html.dark .value-prop-card {
  background: rgb(27, 27, 31);
  border-color: #334155;
}

.value-prop-icon {
  font-size: 28px;
  line-height: 1;
  flex-shrink: 0;
}

.value-prop-content h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.value-prop-content p {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

html.dark .value-prop-content p {
  color: #94a3b8;
}

.calculator-section {
  max-width: 1200px;
  margin: 18px auto;
  padding: 48px 24px;
  background: white;
  border-radius: 16px;
}

html.dark .calculator-section {
  background: rgb(27, 27, 31);
}

.calculator-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.calculator-title h2 {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  margin: 0 0 12px 0;
  border: none;
  padding: 0;
}

.calculator-subtitle {
  font-size: 16px;
  color: #64748b;
  max-width: 600px;
  margin: 0;
}

html.dark .calculator-subtitle {
  color: #94a3b8;
}

.calculator-note {
  font-size: 14px;
  color: #64748b;
}

html.dark .calculator-note {
  color: #94a3b8;
}

.faq-section {
  max-width: 900px;
  margin: 48px auto;
  padding: 0 24px;
}

.faq-section h2 {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  margin: 0 0 32px 0;
  border: none;
  padding: 0;
}

.faq-item {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

html.dark .faq-item {
  background: rgb(27, 27, 31);
  border-color: #334155;
}

.faq-item h3 {
  font-size: 16px !important;
  font-weight: 600 !important;
  margin: 0 0 12px 0 !important;
  border: none !important;
  padding: 0 !important;
  color: var(--vp-c-text-1);
}

.faq-item p {
  margin: 0;
  font-size: 14px;
  color: #334155;
  line-height: 1.6;
}

html.dark .faq-item p {
  color: #cbd5e1;
}

.pricing-footer-note {
  text-align: center;
  margin: 48px auto;
  padding: 0 24px;
  max-width: 900px;
}

.pricing-footer-note p {
  font-size: 16px;
  margin: 16px 0;
  color: #334155;
}

html.dark .pricing-footer-note p {
  color: #cbd5e1;
}

.free-sends-banner {
  background: linear-gradient(120deg, #392C91 5%, #13B0EE);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.2;
  letter-spacing: 1px;
  font-weight: 700;
  margin: 32px auto;
  text-align: center;
}

html.dark .free-sends-banner {
  background: linear-gradient(120deg, #8a7ed8 5%, #13B0EE);
  background-clip: text;
  -webkit-background-clip: text;
}

.pricing-footer-cta {
  max-width: 900px;
  margin: 48px auto;
  padding: 0 24px;
}

.footer-cta-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 40px 32px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

html.dark .footer-cta-card {
  background: rgb(27, 27, 31);
  border-color: #334155;
}

.footer-cta-banner {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.footer-cta-description {
  font-size: 16px;
  color: #334155;
  margin: 0 0 12px 0;
  line-height: 1.6;
}

html.dark .footer-cta-description {
  color: #cbd5e1;
}

.footer-cta-subtext {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

html.dark .footer-cta-subtext {
  color: #94a3b8;
}

.footer-cta-subtext a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

@media (max-width: 768px) {
  .footer-cta-card {
    padding: 32px 24px;
  }
  
  .footer-cta-banner {
    font-size: 24px;
  }
}

@media (max-width: 768px) {
  .pricing-hero {
    padding: 40px 16px;
  }
  
  .pricing-cards-section {
    padding: 0 16px 32px;
  }
  
  .pricing-hero-actions {
    flex-direction: column;
    max-width: 100%;
  }
  
  .calculator-header {
    flex-direction: column;
  }
}

.vp-doc .VPButton.medium {
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
}
</style>

<section class="pricing-hero">
  <div class="pricing-badge">
    <span>Bring Your Own Amazon SES</span>
  </div>
  
  <h1>Connect your SES, pay less</h1>
  
  <p class="pricing-hero-subtitle">
    Use your own Amazon SES account with BlueFox Email's platform. You pay AWS directly for sending ($0.10 per 1,000 emails), plus our platform fee for unlimited features.
  </p>
  
  <div class="pricing-hero-actions">
    <v-btn
      rounded="x1"
      size="large"
      color="primary"
      variant="flat"
      class="no-uppercase"
      href="https://app.bluefox.email/accounts/create-account"
      target="_blank"
    >
      Get started free
    </v-btn>
    <v-btn
      rounded="x1"
      size="large"
      color="buttonBackground"
      variant="flat"
      class="no-uppercase"
      :theme="isDark ? 'dark' : 'light'"
      href="mailto:hello@bluefox.email"
    >
      Contact sales
    </v-btn>
  </div>
  
  <p class="pricing-hero-note">
    Every new workspace starts with <strong>6000 free sends</strong> no credit card required.<br><strong>Use your sends anytime within a year.</strong> Buy more whenever you need, they stack automatically.
  </p>
</section>

<section class="pricing-cards-section">
  <div class="pricing-cards-grid">
    <div class="pricing-card featured">
      <span class="pricing-badge-popular">Most popular</span>
      <h3>Start-up</h3>
      <div class="pricing-card-price">
        <span class="pricing-card-amount">$50</span>
        <span class="pricing-card-period">/ pack</span>
      </div>
      <ul class="pricing-card-features">
        <li><strong>100,000 sends</strong> included</li>
        <li><strong>$0.50 per 1,000 sends</strong> + AWS SES Fee</li>
        <li><strong>Access to full platform!</strong> No Restrictions</li>
      </ul>
      <a href="https://app.bluefox.email/accounts/create-account" target="_blank" class="pricing-card-cta primary">
        Buy 100K sends
      </a>
    </div>
    <div class="pricing-card">
      <h3>Scale-up</h3>
      <div class="pricing-card-price">
        <span class="pricing-card-amount">$300</span>
        <span class="pricing-card-period">/ pack</span>
      </div>
      <ul class="pricing-card-features">
        <li><strong>1,000,000 sends</strong> included</li>
        <li><strong>$0.30 per 1,000 sends</strong> + AWS SES Fee</li>
        <li><strong>Access to full platform!</strong> No Restrictions</li>
      </ul>
      <a href="https://app.bluefox.email/accounts/create-account" target="_blank" class="pricing-card-cta secondary">
        Buy 1M sends
      </a>
    </div>
    <div class="pricing-card contact-sales">
      <h3>Need more sends?</h3>
      <p class="pricing-card-subtitle">Custom volume & enterprise setup with dedicated onboarding and volume discounts</p>
      <a href="mailto:hello@bluefox.email" class="pricing-card-cta dark">
        Talk to sales
      </a>
      <p class="pricing-card-note">
        Want us to handle sending? <a href="/pricing">See our regular pricing</a>
      </p>
    </div>
  </div>
</section>

<section class="value-props">
  <div class="value-props-grid">
    <div class="value-prop-card">
      <div class="value-prop-content">
        <h4>Your AWS account, your control</h4>
        <p>Keep your sending reputation and AWS credits. We never touch your AWS credentials.</p>
      </div>
    </div>
    <div class="value-prop-card">
      <div class="value-prop-content">
        <h4>All features included</h4>
        <p>Automations, segmentation, analytics, client workspaces, and deliverability tools in every pack.</p>
      </div>
    </div>
    <div class="value-prop-card">
      <div class="value-prop-content">
        <h4>Lower total cost at scale</h4>
        <p>AWS SES costs just $0.10 per 1,000 emails. Combined with our platform fee, you save at high volumes.</p>
      </div>
    </div>
  </div>
</section>

<section class="calculator-section">
  <div class="calculator-header">
    <div class="calculator-title">
      <h2>Compare your savings with BlueFox Email</h2>
      <p class="calculator-subtitle">See total costs including platform fees and AWS SES charges.</p>
    </div>
    <div class="calculator-note">Estimates only</div>
  </div>
  
  <div id="calculator">
    <BYOPriceCalculator />
  </div>
</section>

<section class="faq-section">
  <h2>Pricing FAQs</h2>
  
  <div class="faq-item">
    <h3>Is there a free plan or trial?</h3>
    <p>Yes. Every new workspace starts with <strong> 6,000 free sends, no credit card required</strong>. You can explore all features, send real campaigns, and build automations before deciding to upgrade.</p>
  </div>
  
  <div class="faq-item">
    <h3>How does the pricing work?</h3>
    <p>You pay <strong>two fees</strong>: our platform fee for sends, and <strong>AWS SES costs</strong> directly to Amazon ($0.10 per 1,000 emails). Each pack includes a fixed number of sends that stay <strong>valid for 12 months. No subscriptions, no hidden limits,</strong> just buy more when you need them.</p>
  </div>
  
  <div class="faq-item">
    <h3>What's included in every pack?</h3>
    <p><strong>Everything.</strong> All features are included in every plan: <strong>automations, segmentation, analytics, templates, and API access.</strong></p>
  </div>
  
  <div class="faq-item">
    <h3>What's the difference between the packs?</h3>
    <p>Both packs include the same features. The only difference is <strong>how many emails you can send</strong>, so choose the one that fits your volume.</p>
  </div>
  
  <div class="faq-item">
    <h3>Do sends (packs) expire?</h3>
    <p>Yes. Sends stay valid for <strong>12 months</strong> from the date of purchase. You can <strong>top up anytime</strong>, your balance simply adds up, and <strong>older sends are always used first</strong>, so the newest ones last the longest.</p>
  </div>
  
  <div class="faq-item">
    <h3>Can I upgrade from one credit pack to a bigger one?</h3>
    <p><strong>Absolutely</strong>. When you upgrade, your remaining sends carry over, nothing is lost. You just get a <strong> larger send balance</strong>.</p>
  </div>
  
 <div class="faq-item">
  <h3>Do I need to bring my own Amazon SES account?</h3>
  <p>Not necessarily. You can use <strong>BlueFox Email's managed sending infrastructure</strong> right away, <strong>no setup required</strong>. </p>
<p style="margin-top: 12px;"><a href="/pricing">See our regular pricing</a> for our fully managed option.</p>
</div>
</section>

<section class="pricing-footer-cta">
  <div class="footer-cta-card">
    <p class="footer-cta-banner">Get started with 6,000 free sends in the first year</p>
    <p class="footer-cta-description">All packages include all of our features without restrictions!</p>
    <p class="footer-cta-subtext">Need enterprise pricing? <a href="mailto:hello@bluefox.email">Contact us</a></p>
  </div>
</section>