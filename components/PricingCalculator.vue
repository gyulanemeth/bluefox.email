<script setup>
import { ref, computed } from 'vue'

const SLIDER_VALUES = [10000, 25000, 50000, 100000, 250000, 500000, 1000000, 1500000]
const currentSliderIndex = ref(2)
const emails = computed(() => SLIDER_VALUES[currentSliderIndex.value])

const COMPETITOR_COST_PER_EMAIL = {
  mailchimp: 0.0037,
  sendgrid: 0.0106,
  mailersend: 0.00145
}

const PACKS = [
  { name: 'Essential', sends: 50000, price: 50 },
  { name: 'Premium', sends: 500000, price: 300 }
]

const PRICE_POINTS = [
  { emails: 10000, price: 10 },
  { emails: 50000, price: 50 },
  { emails: 100000, price: 80 },
  { emails: 250000, price: 180 },
  { emails: 500000, price: 300 },
  { emails: 1000000, price: 600 }
]

/**
 * PACK-BASED COST — What the customer actually pays per usage
 * This is shown as the main display price
 */
const packBasedCost = computed(() => {
  const v = emails.value
  if (v === 0) return 0
  if (v === 1000000) return 600 // 2× Premium packs
  if (v > 1000000) return 0

  // Find the pack that covers this volume
  const pack = PACKS.find(p => v <= p.sends)
  if (!pack) return 0

  // Calculate actual cost based on usage within the pack
  return v * (pack.price / pack.sends)
})

/**
 * INTERPOLATED COST — For savings calculation only
 * This creates a smooth curve for competitor comparisons
 */
const interpolatedCost = computed(() => {
  const v = emails.value
  if (v <= 0) return 0
  if (v > 1000000) return 0

  let lower = PRICE_POINTS[0]
  let upper = PRICE_POINTS.at(-1)
  
  for (let i = 0; i < PRICE_POINTS.length - 1; i++) {
    if (v >= PRICE_POINTS[i].emails && v <= PRICE_POINTS[i + 1].emails) {
      lower = PRICE_POINTS[i]
      upper = PRICE_POINTS[i + 1]
      break
    }
  }
  
  const fraction = (v - lower.emails) / (upper.emails - lower.emails)
  return lower.price + fraction * (upper.price - lower.price)
})

const packBasedCostPerEmail = computed(() => {
  if (emails.value === 0) return 0
  return packBasedCost.value / emails.value
})

const recommendedPack = computed(() => {
  const v = emails.value
  if (v <= 0) return null
  if (v > 1000000) return 'enterprise'
  if (v === 1000000) return { name: '2× Premium', sends: 1000000, price: 600 }
  
  const pack = PACKS.find(p => v <= p.sends)
  return pack || 'enterprise'
})

const packTotalCost = computed(() => {
  const pack = recommendedPack.value
  if (!pack || pack === 'enterprise') return null
  return pack.price
})

const sendsRemaining = computed(() => {
  const pack = recommendedPack.value
  if (!pack || pack === 'enterprise') return null
  if (pack.name === '2× Premium') return 0
  return pack.sends - emails.value
})

const estimatedContacts = computed(() => Math.round(emails.value / 5))
const isEnterpriseVolume = computed(() => emails.value > 1000000)

const competitorCosts = computed(() => ({
  mailchimp: emails.value * COMPETITOR_COST_PER_EMAIL.mailchimp,
  sendgrid: emails.value * COMPETITOR_COST_PER_EMAIL.sendgrid,
  mailersend: emails.value * COMPETITOR_COST_PER_EMAIL.mailersend
}))

/**
 * Use interpolated cost for savings to get smooth percentage curve
 */
const calculateSavings = (competitorCost) => {
  const bluefoxCost = interpolatedCost.value
  if (!bluefoxCost || bluefoxCost === 0 || !competitorCost) return 0
  return Math.round(((competitorCost - bluefoxCost) / competitorCost) * 100)
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
        <template v-if="recommendedPack !== 'enterprise'">
          <div class="pack-header">{{ formatNumber(emails) }} emails cost at BlueFox Email</div>
          <div class="actual-price">{{ formatPrice(packBasedCost) }}</div>

          <div class="info-row">
            <span class="info-label">Recommended pack</span>
            <span class="info-value">{{ recommendedPack.name }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Pack cost</span>
            <span class="info-value">{{ emails === 1000000 ? '2× $300.00' : formatPrice(packTotalCost) }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Pack includes</span>
            <span class="info-value">{{ formatNumber(recommendedPack.sends) }} sends</span>
          </div>
          <div class="info-row">
            <span class="info-label">Cost per 1,000 sends</span>
            <span class="info-value">{{ formatPrice(packBasedCostPerEmail * 1000) }}</span>
          </div>

          <p class="remaining-note">
            <template v-if="sendsRemaining > 0">{{ formatNumber(sendsRemaining) }} sends left over for later. </template>Sends stay valid for 12 months, with all features included.
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
              <tr>
                <td><a href="/comparisons/bluefox-vs-mailchimp">Mailchimp</a> Premium</td>
                <td>{{ formatPrice(competitorCosts.mailchimp) }}</td>
                <td>{{ calculateSavings(competitorCosts.mailchimp) }}%</td>
              </tr>
              <tr>
                <td><a href="/comparisons/bluefox-vs-sendgrid">SendGrid</a> Premier</td>
                <td>{{ formatPrice(competitorCosts.sendgrid) }}</td>
                <td>{{ calculateSavings(competitorCosts.sendgrid) }}%</td>
              </tr>
              <tr>
                <td><a href="/comparisons/bluefox-vs-mailersend">MailerSend</a> Pro</td>
                <td>{{ formatPrice(competitorCosts.mailersend) }}</td>
                <td>{{ calculateSavings(competitorCosts.mailersend) }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul class="table-note">
        <li>Comparison based on premium/highest tier plans with all features (automation, A/B testing, advanced segmentation)</li>
        <li>Estimated {{ formatNumber(estimatedContacts) }} contacts (assuming 5 marketing emails per contact per month)</li>
        <li>BlueFox has no contact limits and includes all features at every tier</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
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