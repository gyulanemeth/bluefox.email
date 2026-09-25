---
layout: home
title: Pricing
description: Don't overpay for contact-based pricing ever again. Buy one-time send packs or a monthly plan, and pay for the emails you send, never for contacts.
---

<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'
import PricingCalculator from './components/PricingCalculator.vue'
const { isDark } = useData()
const mode = ref('monthly')
const plans = [
  { name: 'Starter', price: '$6', sends: '5,000' },
  { name: 'Basic', price: '$9', sends: '10,000' },
  { name: 'Growth', price: '$19', sends: '25,000', popular: true },
  { name: 'Pro', price: '$35', sends: '50,000' },
  { name: 'Business', price: '$59', sends: '100,000' },
  { name: 'Scale', price: '$129', sends: '250,000' },
  { name: 'Elite', price: '$239', sends: '500,000' },
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
  padding: 60px 24px 8px;
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

.addons-section {
  max-width: 1200px;
  margin: 32px auto;
  padding: 0 24px;
}

.addons-section h2 {
  font-size: clamp(24px, 3.5vw, 32px);
  font-weight: 700;
  margin: 0 0 8px 0;
  border: none;
  padding: 0;
  text-align: center;
}

.addons-subtitle {
  font-size: 16px;
  color: #64748b;
  text-align: center;
  margin: 0 0 24px 0;
}

html.dark .addons-subtitle {
  color: #94a3b8;
}

.addon-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  max-width: 420px;
  margin: 0 auto;
  padding: 28px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}

html.dark .addon-card {
  background: rgb(27, 27, 31);
  border-color: #334155;
}

.addon-card h3 {
  font-size: 20px !important;
  font-weight: 600 !important;
  margin: 0 0 8px 0 !important;
  border: none !important;
  padding: 0 !important;
}

.addon-card-desc {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

html.dark .addon-card-desc {
  color: #94a3b8;
}

.addon-card-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 6px;
  margin-bottom: 20px;
}

.addon-card-amount {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
}

.addon-card-period {
  font-size: 14px;
  color: #64748b;
}

html.dark .addon-card-period {
  color: #94a3b8;
}

.addon-card-cta {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
  transition: background 0.2s ease;
  font-size: 14px;
  text-decoration: none !important;
  background: transparent;
  color: var(--vp-c-brand) !important;
  border: 2px solid var(--vp-c-brand);
  align-self: center;
}

.addon-card-cta:hover {
  background: rgba(19, 176, 238, 0.05);
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

.addons-section {
  max-width: 1200px;
  margin: 32px auto;
  padding: 0 24px;
}

.addons-section h2 {
  font-size: clamp(24px, 3.5vw, 32px);
  font-weight: 700;
  margin: 0 0 8px 0;
  border: none;
  padding: 0;
  text-align: center;
}

.addons-subtitle {
  font-size: 16px;
  color: #64748b;
  text-align: center;
  margin: 0 0 24px 0;
}

html.dark .addons-subtitle {
  color: #94a3b8;
}

.addons-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 420px;
  margin: 0 auto;
}

.addon-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  max-width: 420px;
  margin: 0 auto;
  padding: 28px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

html.dark .addon-card {
  background: rgb(27, 27, 31);
  border-color: #334155;
}

.addon-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

html.dark .addon-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.addon-card h3 {
  font-size: 20px !important;
  font-weight: 600 !important;
  margin: 0 0 8px 0 !important;
  border: none !important;
  padding: 0 !important;
}

.addon-card-desc {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

html.dark .addon-card-desc {
  color: #94a3b8;
}

.addon-card-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 6px;
  margin-bottom: 20px;
}

.addon-card-amount {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
}

.addon-card-period {
  font-size: 14px;
  color: #64748b;
}

html.dark .addon-card-period {
  color: #94a3b8;
}

.addon-card-cta {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s ease;
  font-size: 14px;
  text-decoration: none !important;
  background: transparent;
  color: var(--vp-c-brand) !important;
  border: 2px solid var(--vp-c-brand);
  align-self: center;
}

.addon-card-cta:hover {
  background: rgba(19, 176, 238, 0.05);
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

.pricing-hero-note {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  text-align: center;
}

html.dark .pricing-hero-note {
  color: #94a3b8;
}

.pricing-hero-note strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
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
  border-bottom: 1px solid #e2e8f0;
}

html.dark .billing-toggle {
  border-bottom-color: #334155;
}

.billing-toggle button {
  margin: 0 20px -1px;
  padding: 8px 2px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: #64748b;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

html.dark .billing-toggle button {
  color: #94a3b8;
}

.billing-toggle button.active,
html.dark .billing-toggle button.active {
  border-bottom-color: var(--vp-c-brand);
  color: var(--vp-c-text-1);
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

.pricing-card-more {
  margin: 8px 0 24px 0;
  font-size: 15px;
  line-height: 1.6;
  color: #334155;
}

html.dark .pricing-card-more {
  color: #cbd5e1;
}

.pricing-card-cta.primary,
.pricing-card-cta.contact {
  border: 2px solid transparent;
}

.pricing-card-cta.contact {
  background: #000;
  color: white !important;
}

html.dark .pricing-card-cta.contact {
  border-color: #475569;
}

.plan-more {
  flex: 2.5 1 0;
  font-size: 14px;
  color: #334155;
}

html.dark .plan-more {
  color: #cbd5e1;
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
    padding: 40px 16px 8px;
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
  <h1>Pay only for what you send</h1>
  
  <p class="pricing-hero-subtitle">
    Simple, transparent pricing for agencies that send for clients. Buy one-time send packs or pick a monthly plan. No contact limits. 
    Automations, segmentation, analytics, and deliverability tools included.
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
  <p class="pricing-hero-note">Includes <strong>3,000 free sends</strong>, no credit card required.</p>
</section>

<section class="pricing-cards-section">
  <p class="sending-switch">Bring your own SES for better email prices. <a href="/byo-amazon-ses-pricing">See BYO SES pricing</a></p>
  <div class="billing-toggle" role="group" aria-label="Billing type">
    <button type="button" :class="{ active: mode === 'monthly' }" :aria-pressed="mode === 'monthly'" @click="mode = 'monthly'">Monthly subscription</button>
    <button type="button" :class="{ active: mode === 'packs' }" :aria-pressed="mode === 'packs'" @click="mode = 'packs'">One-time packs</button>
  </div>
  <div v-if="mode === 'packs'" class="pricing-cards-grid">
    <div class="pricing-card featured">
          <h3>Essential</h3>
      <div class="pricing-card-price">
        <span class="pricing-card-amount">$50<span class="pricing-vat-label">+VAT</span></span>
        <span class="pricing-card-period">/ pack</span>
      </div>
      <ul class="pricing-card-features">
        <li><strong>50,000 sends</strong> included</li>
        <li>$1 per 1,000 sends</li>
        <li>Full platform access, no restrictions</li>
      </ul>
      <a href="https://app.bluefox.email/accounts/create-account" target="_blank" class="pricing-card-cta primary">
        Buy 50K sends
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
        <li><strong>500,000 sends</strong> included</li>
        <li>$0.60 per 1,000 sends</li>
        <li>Full platform access, no restrictions</li>
      </ul>
      <a href="https://app.bluefox.email/accounts/create-account" target="_blank" class="pricing-card-cta secondary">
        Buy 500K sends
      </a>
      <p class="mt-2" style="font-size: 0.65rem; font-weight: 400; line-height: 1.667; color: #64748b;">The final price may vary based on your local VAT rate. VAT is applied at checkout.</p>
    </div>
    <div class="pricing-card">
      <h3>Need more sends?</h3>
      <p class="pricing-card-more">Custom volume &amp; enterprise setup with dedicated onboarding.</p>
      <a href="mailto:hello@bluefox.email" class="pricing-card-cta contact">
        Contact sales
      </a>
      <p class="mt-2" style="font-size: 0.65rem; font-weight: 400; line-height: 1.667; min-height: 2.167rem; color: #64748b;">Get in touch and we'll set up a discovery call to plan your volume and onboarding.</p>
    </div>
  </div>
  <div v-else class="plans-list">
    <p class="plans-note">Every plan includes a fresh sending allowance each billing cycle (unused sends do not roll over) and <strong>full access to the platform</strong>.</p>
    <div v-for="plan in plans" :key="plan.name" class="plan-row" :class="{ featured: plan.popular }">
      <span v-if="plan.popular" class="plan-flag">Most popular</span>
      <div class="plan-name">{{ plan.name }}</div>
      <div class="plan-price"><span class="plan-amount">{{ plan.price }}</span><span class="pricing-vat-label">+VAT</span><span class="pricing-card-period">/ month</span></div>
      <div class="plan-sends"><strong>{{ plan.sends }}</strong> sends / month</div>
      <a href="https://app.bluefox.email/accounts/create-account" target="_blank" class="pricing-card-cta" :class="plan.popular ? 'primary' : 'secondary'">Subscribe</a>
    </div>
    <div class="plan-row">
      <div class="plan-name">Need more sends?</div>
      <div class="plan-more">Custom volume & enterprise setup with dedicated onboarding.</div>
      <a href="mailto:hello@bluefox.email" class="pricing-card-cta contact">Contact sales</a>
    </div>
    <p class="plans-vat">The final price may vary based on your local VAT rate. VAT is applied at checkout.</p>
  </div>
  <div class="need-more-banner">
    <p>Coming from a contact-based plan? See how per-send pricing compares to <a href="/comparisons/bluefox-vs-mailchimp">Mailchimp</a>, <a href="/comparisons/bluefox-vs-activecampaign">ActiveCampaign</a>, <a href="/comparisons/bluefox-vs-brevo">Brevo</a>, or <a href="/comparisons/bluefox-vs-constant-contact">Constant Contact</a></p>
    <p>Switching from a transactional API? See how BlueFox compares to <a href="/comparisons/bluefox-vs-sendgrid">SendGrid</a>, <a href="/comparisons/bluefox-vs-mailersend">MailerSend</a>, or <a href="/comparisons/bluefox-vs-resend">Resend</a></p>
  </div>
</section>

<section class="value-props">
  <div class="value-props-grid">
    <div class="value-prop-card">
      <div class="value-prop-content">
        <h4>Agency-first</h4>
        <p>Manage multiple client workspaces with isolated domains, contacts, and reports.</p>
      </div>
    </div>
    <div class="value-prop-card">
      <div class="value-prop-content">
        <h4>Automations, segmentation & analytics</h4>
        <p>Build flows, segment audiences, and track performance. Bounce handling and reputation tools included in every pack and plan.</p>
      </div>
    </div>
    <div class="value-prop-card">
      <div class="value-prop-content">
        <h4>Packs or monthly plans</h4>
        <p>Buy one-time packs when you need them, and sends stay available for 12 months. Or pick a monthly plan with a fresh allowance every billing cycle.</p>
      </div>
    </div>
  </div>
</section>

<section class="addons-section">
  <h2>Optional add-ons</h2>
  <p class="addons-subtitle">Boost deliverability and sender reputation with a dedicated sending IP.</p>
  <div class="addons-grid">
    <div class="addon-card">
      <h3>Dedicated IP</h3>
      <p class="addon-card-desc">A sending IP reserved just for your workspace. Full control over your sender reputation, ideal for high-volume senders.</p>
      <div class="addon-card-price">
        <span class="addon-card-amount">$50<span class="pricing-vat-label">+VAT</span></span>
        <span class="addon-card-period">/ month</span>
      </div>
      <a href="mailto:hello@bluefox.email?subject=Dedicated%20IP%20request" class="addon-card-cta">
        Request dedicated IP
      </a>
    </div>
  </div>
</section>

<section class="calculator-section">
  <div class="calculator-header">
    <div class="calculator-title">
      <h2>Compare your savings with BlueFox Email</h2>
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
  
  <div class="faq-item">
    <h3>Is there a free plan or trial?</h3>
    <p>Yes. Every new workspace starts with <strong>3,000 free sends</strong>, no credit card required. You can explore all features, send real campaigns, and build automations before deciding to upgrade.</p>
  </div>
  
  <div class="faq-item">
    <h3>How does the pricing work?</h3>
    <p>You only pay for <strong>email sends</strong>, not for contacts or features. Choose <strong>one-time packs</strong>, where each pack includes a fixed number of sends that stay <strong>valid for 12 months</strong>, or a <strong>monthly plan</strong> that gives you a fresh sending allowance every billing cycle. <strong>No hidden limits</strong> either way.</p>
  </div>

  <div class="faq-item">
    <h3>Do the prices include VAT?</h3>
    <p>No. All prices are shown <strong>excluding VAT</strong>. The final price may vary based on your local VAT rate, and VAT is applied at checkout.</p>
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
    <h3>Can I use my own SMTP?</h3>
    <p>Yes. BlueFox Email connects directly to <strong>Amazon SES</strong> using secure STS credentials. You simply link your SES account, and everything just works.</p>
    <p style="margin-top: 12px;">Want to bring your own SES and get better email prices? <a href="/byo-amazon-ses-pricing">See BYO SES pricing</a></p>
  </div>

  <div class="faq-item">
    <h3>Do you offer a dedicated IP?</h3>
    <p>Yes. A <strong>dedicated sending IP is available for $50/month</strong> as an add-on. It gives you full control over your sender reputation and is recommended for high-volume senders. <a href="mailto:hello@bluefox.email?subject=Dedicated%20IP%20request">Contact us</a> to set one up.</p>
  </div>


</section>