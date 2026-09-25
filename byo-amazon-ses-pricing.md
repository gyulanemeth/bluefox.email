---
layout: home
title: BYO Amazon SES Pricing
description: Connect your own Amazon SES account to BlueFox Email and pay only for platform credits plus AWS costs, no per-contact fees, no hidden markups, ever.
---

<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'
import BYOPriceCalculator from './components/BYOPriceCalculator.vue'
const { isDark } = useData()
const mode = ref('monthly')
const plans = [
  { name: 'Starter', price: '$6', sends: '10,000', regular: '5,000' },
  { name: 'Basic', price: '$9', sends: '20,000', regular: '10,000' },
  { name: 'Growth', price: '$19', sends: '50,000', regular: '25,000', popular: true },
  { name: 'Pro', price: '$35', sends: '100,000', regular: '50,000' },
  { name: 'Business', price: '$59', sends: '200,000', regular: '100,000' },
  { name: 'Scale', price: '$129', sends: '500,000', regular: '250,000' },
  { name: 'Elite', price: '$239', sends: '1,000,000', regular: '500,000' },
]
</script>

<style>
/* Force remove link underlines */
.pricing-hero a,
.pricing-cards-section a,
.calculator-section a,
.faq-section a {
  text-decoration: none !important;
}

.pricing-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px 24px;
}

.pricing-hero h1 {
  font-size: clamp(32px, 4.4vw, 50px) !important;
  font-weight: 800;
  line-height: 1.15;
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
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 32px;
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

html.dark .pricing-card {
  background: rgb(27, 27, 31);
  border-color: #334155;
}

.pricing-card.featured {
  border-color: var(--vp-c-brand);
}

.pricing-card h3 {
  font-size: 24px !important;
  font-weight: 600 !important;
  margin: 0 0 8px 0 !important;
  border: none !important;
  padding: 0 !important;
}

.pricing-card-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
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

.pricing-vat-label {
  font-size: 14px;
  color: #94a3b8;
  font-weight: 500;
  margin-left: 4px;
  vertical-align: super;
  line-height: 1;
}

html.dark .pricing-vat-label {
  color: #64748b;
}

.pricing-card-features {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 0 24px 0 !important;
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
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
  transition: background 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none !important;
  margin-top: auto;
}

.pricing-card-cta.primary,
.pricing-card-cta.primary:visited {
  background: var(--vp-c-brand) !important;
  color: white !important;
}

.pricing-card-cta.primary:hover {
  background: var(--vp-c-brand-light) !important;
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

.need-more-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 20px 24px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  text-align: center;
}

html.dark .need-more-banner {
  background: rgb(30, 30, 34);
  border-color: #334155;
}

.need-more-banner p {
  margin: 0;
  font-size: 15px;
  color: #334155;
}

html.dark .need-more-banner p {
  color: #cbd5e1;
}

.need-more-banner a {
  color: var(--vp-c-brand);
  font-weight: 600;
  text-decoration: none !important;
}

.need-more-banner a:hover {
  text-decoration: underline !important;
}

.byo-compare-line {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

html.dark .byo-compare-line {
  color: #94a3b8;
}

.calculator-section {
  max-width: 1200px;
  margin: 18px auto;
  padding: 48px 24px;
  background: white;
  border-radius: 4px;
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
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 16px;
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

.pricing-card-amount {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
}

.pricing-vat-label {
  font-size: 14px;
  color: #94a3b8;
  font-weight: 500;
  margin-left: 4px;
  vertical-align: super;
  line-height: 1;
}

html.dark .pricing-vat-label {
  color: #64748b;
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
  padding: 24px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}

html.dark .value-prop-card {
  background: rgb(27, 27, 31);
  border-color: #334155;
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

.sending-switch {
  margin: 0 0 20px 0;
  font-size: 15px;
  color: #334155;
  text-align: center;
}

html.dark .sending-switch {
  color: #cbd5e1;
}

.sending-switch a {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.billing-toggle {
  display: flex;
  width: fit-content;
  margin: 0 auto 24px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

html.dark .billing-toggle {
  border-color: #334155;
}

.billing-toggle button {
  padding: 10px 20px;
  border: none;
  background: transparent;
  color: #334155;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

html.dark .billing-toggle button {
  color: #cbd5e1;
}

.billing-toggle button.active {
  background: var(--vp-c-brand);
  color: white;
}

.plans-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.plans-note {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #64748b;
  text-align: center;
}

html.dark .plans-note {
  color: #94a3b8;
}

.plan-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px 24px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}

html.dark .plan-row {
  background: rgb(27, 27, 31);
  border-color: #334155;
}

.plan-row.featured,
html.dark .plan-row.featured {
  border-color: var(--vp-c-brand);
}

.plan-name {
  flex: 1 1 0;
  font-size: 18px;
  font-weight: 600;
}

.plan-price {
  flex: 1 1 0;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.plan-amount {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.plan-sends {
  flex: 1.5 1 0;
  font-size: 14px;
  color: #334155;
}

html.dark .plan-sends {
  color: #cbd5e1;
}

.plan-row .pricing-card-cta {
  width: auto;
  margin-top: 0;
  padding: 10px 24px;
  border: 2px solid var(--vp-c-brand);
  font-size: 14px;
}

.plan-chip {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: white;
  font-size: 11px;
  font-weight: 600;
  vertical-align: middle;
}

.plan-flag {
  position: absolute;
  top: -10px;
  left: 24px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: white;
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
}

.plans-list .plans-vat {
  margin: 0;
  font-size: 0.65rem;
  color: #64748b;
  text-align: center;
}

@media (max-width: 640px) {
  .plan-row {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .plan-row .pricing-card-cta {
    width: 100%;
  }
}

/* === Responsive Styles === */
@media (max-width: 768px) {
  .pricing-hero {
    padding: 40px 16px 16px;
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

  .calculator-section {
    padding: 32px 24px;
  }
}

@media (max-width: 640px) {
  .pricing-cards-section {
    padding: 0 12px 24px;
  }

  .calculator-section {
    padding: 24px 16px;
    margin: 16px auto;
  }

  .faq-section {
    padding: 0 12px;
  }

  .faq-item {
    padding: 16px;
  }

  .pricing-card {
    padding: 24px 16px;
  }

  .pricing-card-amount {
    font-size: 40px;
  }

  .pricing-card-cta {
    padding: 10px 16px;
    font-size: 14px;
  }

  .pricing-vat-label {
    font-size: 12px;
  }
}
</style>

<section class="pricing-hero">
  <h1>Connect your SES, get 2× the sends</h1>
  
  <p class="pricing-hero-subtitle">
    Use your own Amazon SES account and get <strong>twice as many sends per pack or monthly plan</strong> compared to our regular pricing, at the same price. You pay AWS directly for sending ($0.10 per 1,000 emails), plus our platform fee for unlimited features.
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
      Get Started for Free
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
</section>

<section class="pricing-cards-section">
  <p class="sending-switch">Want us to handle sending? <a href="/pricing">See our regular pricing</a></p>
  <div class="billing-toggle" role="group" aria-label="Billing type">
    <button type="button" :class="{ active: mode === 'monthly' }" :aria-pressed="mode === 'monthly'" @click="mode = 'monthly'">Monthly subscription</button>
    <button type="button" :class="{ active: mode === 'packs' }" :aria-pressed="mode === 'packs'" @click="mode = 'packs'">One-time packs</button>
  </div>
  <div v-if="mode === 'packs'" class="pricing-cards-grid">
    <div class="pricing-card free-card">
      <h3>Free</h3>
      <div class="pricing-card-price">
        <span class="pricing-card-amount">$0</span>
      </div>
      <ul class="pricing-card-features">
        <li><strong>6,000 free sends</strong> included<div class="byo-compare-line">vs 3,000 on regular pricing</div></li>
        <li>No credit card required</li>
        <li>Full platform access, no restrictions</li>
        <li>Valid for 12 months</li>
      </ul>
      <a href="https://app.bluefox.email/accounts/create-account" target="_blank" class="pricing-card-cta secondary">
        Get Started for Free
      </a>
       <p class="mt-2" style="font-size: 0.65rem; font-weight: 400; line-height: 1.667; color: #64748b;visibility: hidden">The final price may vary based on your local VAT rate. VAT is applied at checkout.</p>
    </div>
    <div class="pricing-card featured">
          <h3>Essential</h3>
      <div class="pricing-card-price">
        <span class="pricing-card-amount">$50<span class="pricing-vat-label">+VAT</span></span>
        <span class="pricing-card-period">/ pack</span>
      </div>
      <ul class="pricing-card-features">
        <li><strong>100,000 sends</strong> included<div class="byo-compare-line">vs 50,000 on regular pricing</div></li>
        <li>$0.50 per 1,000 sends + AWS SES fee</li>
        <li>Full platform access, no restrictions</li>
      </ul>
      <a href="https://app.bluefox.email/accounts/create-account" target="_blank" class="pricing-card-cta primary">
        Buy 100K sends
      </a>
      <p class="mt-2" style="font-size: 0.65rem; font-weight: 400; line-height: 1.667; color: #64748b;">The final price may vary based on your local VAT rate. VAT is applied at checkout.</p>
    </div>
    <div class="pricing-card">
      <h3>Premium</h3>
      <div class="pricing-card-price">
        <span class="pricing-card-amount">$300<span class="pricing-vat-label">+VAT</span></span>
        <span class="pricing-card-period">/ pack</span>
      </div>
      <ul class="pricing-card-features">
        <li><strong>1,000,000 sends</strong> included<div class="byo-compare-line">vs 500,000 on regular pricing</div></li>
        <li>$0.30 per 1,000 sends + AWS SES fee</li>
        <li>Full platform access, no restrictions</li>
      </ul>
      <a href="https://app.bluefox.email/accounts/create-account" target="_blank" class="pricing-card-cta secondary">
        Buy 1M sends
      </a>
      <p class="mt-2" style="font-size: 0.65rem; font-weight: 400; line-height: 1.667; color: #64748b;">The final price may vary based on your local VAT rate. VAT is applied at checkout.</p>
    </div>
  </div>
  <div v-else class="plans-list">
    <p class="plans-note">Every plan includes a fresh sending allowance each billing cycle (unused sends do not roll over) and <strong>full access to the platform</strong>. You pay AWS directly for sending ($0.10 per 1,000 emails) on top of the plan price.</p>
    <div v-for="plan in plans" :key="plan.name" class="plan-row" :class="{ featured: plan.popular }">
      <span v-if="plan.popular" class="plan-flag">Most popular</span>
      <div class="plan-name">{{ plan.name }}</div>
      <div class="plan-price"><span class="plan-amount">{{ plan.price }}</span><span class="pricing-vat-label">+VAT</span><span class="pricing-card-period">/ month</span></div>
      <div class="plan-sends"><strong>{{ plan.sends }}</strong> sends / month <span class="plan-chip">2× sends</span><div class="byo-compare-line">vs {{ plan.regular }} on regular pricing</div></div>
      <a href="https://app.bluefox.email/accounts/create-account" target="_blank" class="pricing-card-cta" :class="plan.popular ? 'primary' : 'secondary'">Subscribe</a>
    </div>
    <p class="plans-vat">The final price may vary based on your local VAT rate. VAT is applied at checkout.</p>
  </div>
  <div class="need-more-banner">
    <p><strong>Need more sends?</strong> Custom volume & enterprise setup with dedicated onboarding. <a href="mailto:hello@bluefox.email">Talk to sales</a></p>
    <p>Comparing SES-based senders? See how BlueFox compares to <a href="/comparisons/bluefox-vs-resend">Resend</a>, <a href="/comparisons/bluefox-vs-sendgrid">SendGrid</a>, or <a href="/comparisons/bluefox-vs-mailersend">MailerSend</a></p>
  </div>
</section>

<section class="value-props">
  <div class="value-props-grid">
    <div class="value-prop-card">
      <div class="value-prop-content">
        <h4>2× sends per pack or plan</h4>
        <p>Every BYO pack and monthly plan includes double the sends of our regular pricing, at the same platform fee. More volume for the same dollar.</p>
      </div>
    </div>
    <div class="value-prop-card">
      <div class="value-prop-content">
        <h4>Your AWS account, your control</h4>
        <p>Keep your sending reputation and AWS credits. We never touch your AWS credentials.</p>
      </div>
    </div>
    <div class="value-prop-card">
      <div class="value-prop-content">
        <h4>Lower total cost at scale</h4>
        <p>AWS SES costs just $0.10 per 1,000 emails. Combined with our platform fee and 2× pack size, you save at high volumes.</p>
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
    <p>Yes. Every new workspace starts with <strong>6,000 free sends</strong>, no credit card required. You can explore all features, send real campaigns, and build automations before deciding to upgrade.</p>
  </div>
  
  <div class="faq-item">
    <h3>How does the pricing work?</h3>
    <p>You pay <strong>two fees</strong>: our platform fee for sends, and <strong>AWS SES costs</strong> directly to Amazon ($0.10 per 1,000 emails). Choose <strong>one-time packs</strong>, where each pack includes a fixed number of sends that stay <strong>valid for 12 months</strong>, or a <strong>monthly plan</strong> that gives you a fresh sending allowance every billing cycle. <strong>No hidden limits</strong> either way.</p>
  </div>

  <div class="faq-item">
    <h3>Do the prices include VAT?</h3>
    <p>No. All prices are shown <strong>excluding VAT</strong>. The final price may vary based on your local VAT rate, and VAT is applied at checkout.</p>
  </div>

  <div class="faq-item">
    <h3>How is this different from your regular pricing?</h3>
    <p>BYO SES packs and monthly plans include <strong>2× the sends</strong> at the same platform fee. Free: 6,000 vs 3,000. Essential: 100,000 vs 50,000. Premium: 1,000,000 vs 500,000. Monthly plans, for example Growth: 50,000 vs 25,000 sends per month. In return, you connect your own Amazon SES account and pay AWS directly ($0.10 per 1,000 emails) for delivery.</p>
  </div>
  
  <div class="faq-item">
    <h3>What's included in every pack?</h3>
    <p><strong>Everything.</strong> All features are included in every plan: automations, segmentation, analytics, templates, and API access.</p>
  </div>
  
  <div class="faq-item">
    <h3>What's the difference between the packs and plans?</h3>
    <p>All packs and plans include the same features. The only difference is <strong>how many emails you can send</strong>, so choose the one that fits your volume.</p>
  </div>
  
  <div class="faq-item">
    <h3>Do sends (packs) expire?</h3>
    <p>Yes. Pack sends stay valid for <strong>12 months</strong> from the date of purchase. You can <strong>top up anytime</strong>, your balance simply adds up, and <strong>older sends are always used first</strong>, so the newest ones last the longest. Monthly plan allowances work differently: <strong>unused sends do not roll over</strong> to the next billing cycle.</p>
  </div>

  <div class="faq-item">
    <h3>Should I choose a monthly plan or a one-time pack?</h3>
    <p>Choose a <strong>monthly plan</strong> if you send regularly and want a fresh allowance every billing cycle. Choose a <strong>one-time pack</strong> if your volume is occasional or unpredictable: sends stay valid for 12 months and you are never billed again unless you buy another pack.</p>
  </div>

  <div class="faq-item">
    <h3>Can I cancel a monthly plan any time?</h3>
    <p>Yes. If you cancel, you simply won't be charged again, and you can <strong>keep using your allowance until the current billing period ends</strong>.</p>
  </div>

  <div class="faq-item">
    <h3>Can I switch between monthly plans?</h3>
    <p>Yes. When you upgrade, you <strong>pay the difference in price</strong> and the new plan starts right away. The difference is not calculated from how much of the month you have used, so it is the same even if you upgrade on the last day of the cycle.</p>
  </div>

  <div class="faq-item">
    <h3>Can I upgrade from one credit pack to a bigger one?</h3>
    <p>Yes. When you upgrade, your remaining sends carry over, so nothing is lost. You just get a larger send balance.</p>
  </div>
  
  <div class="faq-item">
    <h3>Do I need to bring my own Amazon SES account?</h3>
    <p>Not necessarily. You can use <strong>BlueFox Email's managed sending infrastructure</strong> right away, no setup required.</p>
    <p style="margin-top: 12px;"><a href="/pricing">See our regular pricing</a> for our fully managed option.</p>
  </div>

</section>