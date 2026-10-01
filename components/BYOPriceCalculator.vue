<script setup>
import { ref, computed } from 'vue'
import { cheapestOption, COMPETITORS } from './pricingData.js'

const SLIDER_VALUES = [10000, 25000, 50000, 100000, 250000, 500000, 750000, 1000000, 1500000]
const currentSliderIndex = ref(0)
const emails = computed(() => SLIDER_VALUES[currentSliderIndex.value])
const isEnterpriseVolume = computed(() => emails.value > 1000000)
const best = computed(() => cheapestOption(emails.value, true))
const AWS_SES_COST_PER_EMAIL = 0.0001
const awsSESCost = computed(() => emails.value * AWS_SES_COST_PER_EMAIL)
const totalCost = computed(() => best.value.monthly + awsSESCost.value)
const estimatedContacts = computed(() => Math.round(emails.value / 5))

const savings = competitorCost => {
  if (competitorCost == null) return '—'
  return `${Math.round(((competitorCost - totalCost.value) / competitorCost) * 100)}%`
}

const formatNumber = num => (num == null ? '—' : num.toLocaleString('en-US'))
const formatPrice = price => {
  if (price == null) return '—'
  if (price < 0.01) return '< $0.01'
  return `$${price.toFixed(2)}`
}
const formatAbbreviated = num => {
  if (num >= 1500000) return '1M+'
  if (num === 1000000) return '1M'
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
  return num.toString()
}
</script>

<template>
  <div class="pricing-calculator">
    <div class="slider-section">
      <h3 class="slider-title">How many emails do you send monthly?</h3>
      <div class="slider-wrapper">
        <input
          v-model.number="currentSliderIndex"
          type="range"
          min="0"
          :max="SLIDER_VALUES.length - 1"
          step="1"
          class="email-slider"
          aria-label="Monthly email volume"
        />
        <div class="slider-labels">
          <span
            v-for="(value, index) in SLIDER_VALUES"
            :key="value"
            class="slider-label"
            :class="{ active: index === currentSliderIndex }"
          >
            {{ formatAbbreviated(value) }}
          </span>
        </div>
      </div>
    </div>

    <div class="results-grid" :class="{ 'full-width': isEnterpriseVolume }">
      <div class="pack-card">
        <template v-if="!isEnterpriseVolume">
          <div class="pack-header">{{ formatNumber(emails) }} emails a month at BlueFox Email (BYO SES)</div>
          <div class="actual-price">{{ formatPrice(totalCost) }}<span class="per-month">/ month</span></div>

          <div class="info-row">
            <span class="info-label">Platform fee</span>
            <span class="info-value">{{ formatPrice(best.monthly) }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">AWS SES fee</span>
            <span class="info-value">{{ formatPrice(awsSESCost) }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Best option</span>
            <span class="info-value">{{ best.count > 1 ? `${best.count}× ` : '' }}{{ best.name }} {{ best.type }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Billed</span>
            <span class="info-value">{{ best.type === 'plan' ? `${formatPrice(best.price)} / month` : `${formatPrice(best.price)} one-time` }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Includes</span>
            <span class="info-value">{{ formatNumber(best.sends) }} sends{{ best.type === 'plan' ? ' / month' : '' }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Total cost per 1,000</span>
            <span class="info-value">{{ formatPrice(totalCost / emails * 1000) }}</span>
          </div>

          <p class="remaining-note">
            <template v-if="best.type === 'plan'">Fresh sending allowance every billing cycle. </template>
            <template v-else-if="best.count > 1">No monthly plan covers this volume, so this uses {{ best.count }} packs a month. </template>
            <template v-else>At this volume one pack covers about {{ Math.round(best.months * 10) / 10 }} months of sending (sends stay valid for 12 months), which works out cheaper than a monthly plan. </template>
            All features included.
          </p>
        </template>

        <div v-else class="enterprise-content">
          <div class="enterprise-icon">
            <img
              src="/assets/mascot-fox-bluefoxemail.png"
              alt="BlueFox Email Mascot"
              class="mascot-light"
            >
            <img
              src="/assets/mascot-fox-bluefoxemail-dark.png"
              alt="BlueFox Email Mascot"
              class="mascot-dark"
            >
          </div>
          <p>For 1M+ emails, we offer custom pricing with volume discounts.</p>
          <a href="mailto:hello@bluefox.email" class="enterprise-link">Contact sales</a>
        </div>
      </div>

      <div v-if="!isEnterpriseVolume" class="comparison-card">
        <h4 class="comparison-title">Compare with competitors</h4>
        <div class="table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th scope="col">Provider</th>
                <th scope="col">Monthly cost</th>
                <th scope="col">You save</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in COMPETITORS" :key="c.name">
                <td><a :href="c.href">{{ c.name }}</a> {{ c.plan(emails) }}</td>
                <td>{{ formatPrice(c.prices[emails]) }}</td>
                <td>{{ savings(c.prices[emails]) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul class="table-note">
        <li>Monthly list prices from each provider's pricing page, checked October 2026 (prices may vary by region), on the cheapest plan with automation, A/B testing, and advanced segmentation. MailerSend has no plan with automation or segmentation, so its highest self-serve plan is shown.</li>
        <li>Estimated {{ formatNumber(estimatedContacts) }} contacts (assuming 5 marketing emails per contact per month)</li>
        <li>BlueFox has no contact limits and includes all features on every pack and plan</li>
        <li>BlueFox BYO SES includes platform fee + AWS SES costs ($0.10 per 1,000 emails)</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.per-month {
  margin-left: 6px;
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
.pricing-calculator {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

/* === Slider === */
.slider-section {
  margin-bottom: 40px;
  text-align: center;
}

.slider-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 28px 0;
}

.slider-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.email-slider {
  width: 100%;
  height: 6px;
  border-radius: 4px;
  background: var(--vp-c-divider);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}

.email-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  cursor: pointer;
}

.email-slider::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  cursor: pointer;
  border: none;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 4px;
}

.slider-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.slider-label.active {
  color: var(--vp-c-brand);
  font-weight: 700;
}

/* === Results === */
.results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.results-grid.full-width {
  grid-template-columns: 1fr;
}

.results-grid.full-width .pack-card {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.pack-card,
.comparison-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 28px;
}

.pack-header {
  font-size: 15px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.actual-price {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  color: var(--vp-c-text-1);
  margin-bottom: 24px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 14px;
}

.info-row:last-of-type {
  border-bottom: 1px solid var(--vp-c-divider);
}

.info-label {
  color: var(--vp-c-text-2);
}

.info-value {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-align: right;
}

.remaining-note {
  margin: 16px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

/* === Enterprise === */
.enterprise-content {
  text-align: center;
  padding: 24px 0;
}

.enterprise-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.enterprise-icon img {
  width: 100%;
  max-width: 280px;
  height: auto;
}

.mascot-dark,
html.dark .mascot-light {
  display: none;
}

html.dark .mascot-dark {
  display: block;
}

.enterprise-content p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.enterprise-link {
  display: inline-block;
  padding: 12px 28px;
  background: var(--vp-c-brand);
  color: white;
  font-weight: 600;
  font-size: 15px;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.2s ease;
}

.enterprise-link:hover {
  background: var(--vp-c-brand-light);
  color: white;
}

/* === Comparison === */
.comparison-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 16px 0;
}

.table-container {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 16px;
}

/* Overrides the default .vp-doc table look (borders, striped rows) */
.comparison-table {
  display: table;
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  font-size: 14px;
}

.comparison-table tr,
.comparison-table tr:nth-child(2n) {
  background: transparent;
  border: none;
}

.comparison-table th,
.comparison-table td {
  padding: 10px 12px;
  border: none;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: left;
}

.comparison-table th {
  background: transparent;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.comparison-table th:not(:first-child),
.comparison-table td:not(:first-child) {
  text-align: right;
}

.table-note {
  margin: 0;
  padding-left: 18px;
  list-style: disc;
  font-size: 12px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}

.table-note li {
  margin: 0 0 4px 0;
}

/* === Responsive === */
@media (max-width: 968px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .pack-card,
  .comparison-card {
    padding: 20px 16px;
  }

  .actual-price {
    font-size: 40px;
  }

  .slider-label {
    font-size: 11px;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 8px 6px;
    font-size: 12px;
  }

  .enterprise-icon img {
    max-width: 200px;
  }
}
</style>
