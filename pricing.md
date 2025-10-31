---
layout: home
title: Pricing
description: Don't overpay for contact-based subscriptions ever again. Only pay for the emails you send!
---

<script setup>
import { useData } from 'vitepress'
import PricingCalculator from './components/PricingCalculator.vue'
const { isDark } = useData()
</script>

<style>
/* Remove scoped attribute and use :where() for low specificity */
:where(.vp-doc) a {
  text-decoration: none !important;
}

/* Hero section */
:where(.vp-doc) .pricing-hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
  text-align: center;
}

:where(.vp-doc) .pricing-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 50px;
  background: linear-gradient(120deg, rgba(57, 44, 145, 0.1), rgba(19, 176, 238, 0.1));
  color: var(--vp-c-brand);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
}

:where(.vp-doc) html.dark .pricing-badge {
  background: linear-gradient(120deg, rgba(138, 126, 216, 0.15), rgba(19, 176, 238, 0.15));
}

:where(.vp-doc) .pricing-hero h1 {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
  border: none;
  padding: 0;
}

:where(.vp-doc) .pricing-hero-subtitle {
  font-size: 18px;
  line-height: 1.6;
  color: #64748b;
  max-width: 800px;
  margin: 0 auto 32px;
}

:where(.vp-doc) html.dark .pricing-hero-subtitle {
  color: #94a3b8;
}

:where(.vp-doc) .pricing-hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

:where(.vp-doc) .pricing-hero-note {
  font-size: 14px;
  color: #64748b;
  margin-top: 16px;
}

:where(.vp-doc) html.dark .pricing-hero-note {
  color: #94a3b8;
}

:where(.vp-doc) .pricing-hero-note strong {
  color: #1e293b;
  font-weight: 600;
}

:where(.vp-doc) html.dark .pricing-hero-note strong {
  color: #e2e8f0;
}

/* Pricing cards section */
:where(.vp-doc) .pricing-cards-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 48px;
}

:where(.vp-doc) .pricing-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  :where(.vp-doc) .pricing-cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

:where(.vp-doc) .pricing-card {
  position: relative;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

:where(.vp-doc) html.dark .pricing-card {
  background: rgb(27, 27, 31);
  border-color: #334155;
}

:where(.vp-doc) .pricing-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

:where(.vp-doc) html.dark .pricing-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

:where(.vp-doc) .pricing-card.featured {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(19, 176, 238, 0.15);
}

:where(.vp-doc) html.dark .pricing-card.featured {
  box-shadow: 0 4px 12px rgba(19, 176, 238, 0.25);
}

:where(.vp-doc) .pricing-badge-popular {
  position: absolute;
  top: -12px;
  left: 24px;
  background: var(--vp-c-brand);
  color: white;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(19, 176, 238, 0.3);
}

:where(.vp-doc) .pricing-card h3 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
  border: none;
  padding: 0;
}

:where(.vp-doc) .pricing-card-subtitle {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 24px;
}

:where(.vp-doc) html.dark .pricing-card-subtitle {
  color: #94a3b8;
}

:where(.vp-doc) .pricing-card-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 24px;
}

:where(.vp-doc) .pricing-card-amount {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
}

:where(.vp-doc) .pricing-card-period {
  font-size: 16px;
  color: #64748b;
}

:where(.vp-doc) html.dark .pricing-card-period {
  color: #94a3b8;
}

:where(.vp-doc) .pricing-card-features {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

:where(.vp-doc) .pricing-card-features li {
  padding: 8px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #334155;
}

:where(.vp-doc) html.dark .pricing-card-features li {
  color: #cbd5e1;
}

:where(.vp-doc) .pricing-card-features li::before {
  content: "• ";
  color: var(--vp-c-brand);
  font-weight: bold;
  margin-right: 8px;
}

:where(.vp-doc) .pricing-card-cta {
  display: block;
  width: 100%;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
}

:where(.vp-doc) .pricing-card-cta.primary {
  background: var(--vp-c-brand);
  color: white;
}

:where(.vp-doc) .pricing-card-cta.primary:hover {
  background: var(--vp-c-brand-light);
  transform: translateY(-1px);
}

:where(.vp-doc) .pricing-card-cta.secondary {
  background: transparent;
  color: var(--vp-c-brand);
  border: 2px solid var(--vp-c-brand);
}

:where(.vp-doc) .pricing-card-cta.secondary:hover {
  background: rgba(19, 176, 238, 0.05);
}

:where(.vp-doc) .pricing-card-cta.dark {
  background: #1e293b;
  color: white;
}

:where(.vp-doc) html.dark .pricing-card-cta.dark {
  background: #334155;
}

:where(.vp-doc) .pricing-card-cta.dark:hover {
  background: #0f172a;
}

:where(.vp-doc) html.dark .pricing-card-cta.dark:hover {
  background: #475569;
}

:where(.vp-doc) .pricing-card.contact-sales {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px dashed #cbd5e1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 400px;
}

:where(.vp-doc) html.dark .pricing-card.contact-sales {
  background: linear-gradient(135deg, rgb(30, 30, 34) 0%, rgb(24, 24, 27) 100%);
  border-color: #475569;
}

:where(.vp-doc) .pricing-card.contact-sales h3 {
  font-size: 28px;
  margin-bottom: 16px;
}

:where(.vp-doc) .pricing-card.contact-sales .pricing-card-subtitle {
  font-size: 16px;
  margin-bottom: 32px;
}

:where(.vp-doc) .pricing-card-note {
  margin-top: 16px;
  font-size: 12px;
  color: #64748b;
  text-align: center;
}

:where(.vp-doc) html.dark .pricing-card-note {
  color: #94a3b8;
}

:where(.vp-doc) .pricing-card-note a {
  text-decoration: underline;
  color: var(--vp-c-brand);
}

/* Value props */
:where(.vp-doc) .value-props {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

:where(.vp-doc) .value-props-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

:where(.vp-doc) .value-prop-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

:where(.vp-doc) html.dark .value-prop-card {
  background: rgb(27, 27, 31);
  border-color: #334155;
}

:where(.vp-doc) .value-prop-icon {
  font-size: 28px;
  line-height: 1;
  flex-shrink: 0;
}

:where(.vp-doc) .value-prop-content h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

:where(.vp-doc) .value-prop-content p {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

:where(.vp-doc) html.dark .value-prop-content p {
  color: #94a3b8;
}

/* Calculator section */
:where(.vp-doc) .calculator-section {
  max-width: 1200px;
  margin: 48px auto;
  padding: 48px 24px;
  background: white;
  border-radius: 16px;
}

:where(.vp-doc) html.dark .calculator-section {
  background: rgb(27, 27, 31);
}

:where(.vp-doc) .calculator-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

:where(.vp-doc) .calculator-title h2 {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  margin: 0 0 12px 0;
  border: none;
  padding: 0;
}

:where(.vp-doc) .calculator-subtitle {
  font-size: 16px;
  color: #64748b;
  max-width: 600px;
  margin: 0;
}

:where(.vp-doc) html.dark .calculator-subtitle {
  color: #94a3b8;
}

:where(.vp-doc) .calculator-note {
  font-size: 14px;
  color: #64748b;
}

:where(.vp-doc) html.dark .calculator-note {
  color: #94a3b8;
}

/* FAQ section */
:where(.vp-doc) .faq-section {
  max-width: 900px;
  margin: 48px auto;
  padding: 0 24px;
}

:where(.vp-doc) .faq-section h2 {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  margin: 0 0 32px 0;
  border: none;
  padding: 0;
}

:where(.vp-doc) .faq-item {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

:where(.vp-doc) html.dark .faq-item {
  background: rgb(27, 27, 31);
  border-color: #334155;
}

:where(.vp-doc) .faq-item summary {
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
  user-select: none;
}

:where(.vp-doc) .faq-item summary::-webkit-details-marker {
  display: none;
}

:where(.vp-doc) .faq-item p {
  margin: 16px 0 0 0;
  font-size: 14px;
  color: #334155;
  line-height: 1.6;
}

:where(.vp-doc) html.dark .faq-item p {
  color: #cbd5e1;
}

/* Footer note */
:where(.vp-doc) .pricing-footer-note {
  text-align: center;
  margin: 48px auto;
  padding: 0 24px;
  max-width: 900px;
}

:where(.vp-doc) .pricing-footer-note p {
  font-size: 16px;
  margin: 16px 0;
  color: #334155;
}

:where(.vp-doc) html.dark .pricing-footer-note p {
  color: #cbd5e1;
}

:where(.vp-doc) .free-sends-banner {
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

:where(.vp-doc) html.dark .free-sends-banner {
  background: linear-gradient(120deg, #8a7ed8 5%, #13B0EE);
  background-clip: text;
  -webkit-background-clip: text;
}

/* Responsive */
@media (max-width: 768px) {
  :where(.vp-doc) .pricing-hero {
    padding: 40px 16px;
  }
  
  :where(.vp-doc) .pricing-cards-section {
    padding: 0 16px 32px;
  }
  
  :where(.vp-doc) .pricing-hero-actions {
    flex-direction: column;
    width: 100%;
  }
  
  :where(.vp-doc) .calculator-header {
    flex-direction: column;
  }
}
</style>

<section class="pricing-hero">
  <div class="pricing-badge">
    <span>🦊 Built for marketing agencies</span>
  </div>
  
  <h1>Pay only for what you send</h1>
  
  <p class="pricing-hero-subtitle">
    Simple, transparent pricing for agencies that send for clients. No subscriptions. No contact limits. 
    Automations, segmentation, analytics, and deliverability tools included.
  </p>
  
  <div class="pricing-hero-actions">
    <v-btn
      rounded
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
      rounded
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
    Every new workspace starts with <strong>1,500 free sends monthly</strong> — no credit card required.
  </p>
  <p class="pricing-hero-note">
    ⏱️ <strong>Use your sends anytime within a year.</strong> Buy more whenever you need — they stack automatically.
  </p>
</section>

<section class="pricing-cards-section">
  <div class="pricing-cards-grid">
    <!-- Start-up Pack -->
    <div class="pricing-card featured">
      <span class="pricing-badge-popular">Most popular</span>
      <h3>Start-up</h3>
      <div class="pricing-card-price">
        <span class="pricing-card-amount">$50</span>
        <span class="pricing-card-period">/ pack</span>
      </div>
      <ul class="pricing-card-features">
        <li><strong>50,000 sends</strong> included</li>
        <li><strong>$1 per 1,000 sends</strong></li>
        <li>Automations & segmentation</li>
        <li>Client workspaces & analytics</li>
      </ul>
      <a href="https://app.bluefox.email/accounts/create-account" target="_blank" class="pricing-card-cta primary">
        Buy 50K sends
      </a>
    </div>
    <!-- Scale-up Pack -->
    <div class="pricing-card">
      <h3>Scale-up</h3>
      <div class="pricing-card-price">
        <span class="pricing-card-amount">$300</span>
        <span class="pricing-card-period">/ pack</span>
      </div>
      <ul class="pricing-card-features">
        <li><strong>500,000 sends</strong> included</li>
        <li><strong>$0.60 per 1,000 sends</strong></li>
        <li>Automations & segmentation</li>
        <li>Priority support available</li>
      </ul>
      <a href="https://app.bluefox.email/accounts/create-account" target="_blank" class="pricing-card-cta secondary">
        Buy 500K sends
      </a>
    </div>
    <!-- Contact Sales Card -->
    <div class="pricing-card contact-sales">
      <h3>Need more sends?</h3>
      <p class="pricing-card-subtitle">Custom volume & enterprise setup with dedicated onboarding and volume discounts</p>
      <a href="mailto:hello@bluefox.email" class="pricing-card-cta dark">
        Talk to sales
      </a>
      <p class="pricing-card-note">
        Prefer using your own Amazon SES? <a href="/byo-amazon-ses-pricing">See BYO SES pricing</a>
      </p>
    </div>
  </div>
</section>

<section class="value-props">
  <div class="value-props-grid">
    <div class="value-prop-card">
      <span class="value-prop-icon">🦊</span>
      <div class="value-prop-content">
        <h4>Agency-first</h4>
        <p>Manage multiple client workspaces with isolated domains, contacts, and reports.</p>
      </div>
    </div>
    <div class="value-prop-card">
      <span class="value-prop-icon">📈</span>
      <div class="value-prop-content">
        <h4>Automations, segmentation & analytics</h4>
        <p>Build flows, segment audiences, and track performance. Bounce handling and reputation tools included in every pack.</p>
      </div>
    </div>
    <div class="value-prop-card">
      <span class="value-prop-icon">💳</span>
      <div class="value-prop-content">
        <h4>No subscriptions</h4>
        <p>Buy packs when you need them. Sends remain available for 12 months.</p>
      </div>
    </div>
  </div>
</section>

<section class="calculator-section">
  <div class="calculator-header">
    <div class="calculator-title">
      <h2>Compare your savings with BlueFox</h2>
      <p class="calculator-subtitle">Enter your monthly send volume to estimate costs across platforms.</p>
    </div>
    <div class="calculator-note">Estimates only</div>
  </div>
  
  <div id="calculator">
    <PricingCalculator />
  </div>
</section>

<section class="faq-section">
  <h2>Pricing FAQs</h2>
  
  <details class="faq-item" open>
    <summary>How long do my sends last?</summary>
    <p>Use your sends anytime within a year. Buy more whenever you need — they stack automatically.</p>
  </details>
  
  <details class="faq-item">
    <summary>What's included in every pack?</summary>
    <p>All features: automations, segmentation, client workspaces, analytics, tracking, bounce handling, and deliverability tools. No feature gating.</p>
  </details>
  
  <details class="faq-item">
    <summary>Do you offer BYO SES?</summary>
    <p>Yes, but it's optional and not required. If you prefer to connect your own Amazon SES, you can — see <a href="/byo-amazon-ses-pricing">BYO SES pricing</a> for details.</p>
  </details>
  
  <details class="faq-item">
    <summary>How does pricing work?</summary>
    <p>Simple pay-as-you-go pricing. You buy a pack of sends that you can use anytime within 12 months. No monthly subscriptions or contact limits.</p>
  </details>
</section>

<div class="pricing-footer-note">
  <p class="free-sends-banner">Get started with 1,500 free monthly sends in the first year</p>
  <p>All packages include all of our features without restrictions!</p>
  <p>Need enterprise pricing? <a href="mailto:hello@bluefox.email">Contact us</a></p>
</div>