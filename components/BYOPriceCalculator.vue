<script setup>
import { ref, computed } from 'vue'

const SLIDER_VALUES = [10000, 25000, 50000, 100000, 250000, 500000, 750000, 1000000, 1500000]
const currentSliderIndex = ref(3)
const emails = computed(() => SLIDER_VALUES[currentSliderIndex.value])
const PACKS = [
  { name: 'Essential', sends: 100000, price: 50 },
  { name: 'Premium', sends: 1000000, price: 300 }
]

const AWS_SES_COST_PER_EMAIL = 0.0001

const COMPETITOR_COST_PER_EMAIL = {
  mailchimp: 0.0037,
  sendgrid: 0.0106,
  mailersend: 0.00145
}

const PLATFORM_PRICE_POINTS = [
  { emails: 100000, price: 50 },
  { emails: 1000000, price: 300 }
]

const recommendedPack = computed(() => {
  const v = emails.value
  if (v <= 0) return null
  if (v > 1000000) return 'enterprise'
  if (v <= 100000) return PACKS[0] // Essential
  return PACKS[1] // Premium
})

const packBasedPlatformCost = computed(() => {
  const v = emails.value
  if (v === 0) return 0
  if (v > 1000000) return 0

  const pack = PACKS.find(p => v <= p.sends)
  if (!pack) return 0

  return v * (pack.price / pack.sends)
})

const interpolatedPlatformCost = computed(() => {
  const v = emails.value
  if (v <= 0) return 0
  if (v > 1000000) return 0

  // Below Essential pack
  if (v < 100000) {
    return v * (50 / 100000)
  }

  // Interpolate between 100K and 1M
  const lower = PLATFORM_PRICE_POINTS[0]
  const upper = PLATFORM_PRICE_POINTS[1]
  const fraction = (v - lower.emails) / (upper.emails - lower.emails)
  const estimatedPrice = lower.price + fraction * (upper.price - lower.price)
  
  return estimatedPrice
})

const awsSESCost = computed(() => emails.value * AWS_SES_COST_PER_EMAIL)

const displayPlatformCost = computed(() => packBasedPlatformCost.value)
const displayTotalCost = computed(() => packBasedPlatformCost.value + awsSESCost.value)

const comparisonTotalCost = computed(() => interpolatedPlatformCost.value + awsSESCost.value)

const displayedPackCost = computed(() => {
  const pack = recommendedPack.value
  if (!pack || pack === 'enterprise') return null
  return pack.price
})

const sendsRemaining = computed(() => {
  const pack = recommendedPack.value
  if (!pack || pack === 'enterprise') return null
  return pack.sends - emails.value
})

const packBasedCostPerEmail = computed(() => {
  if (emails.value === 0) return 0
  return displayTotalCost.value / emails.value
})

const estimatedContacts = computed(() => Math.round(emails.value / 5))
const isEnterpriseVolume = computed(() => emails.value > 1000000)

const competitorCosts = computed(() => ({
  mailchimp: emails.value * COMPETITOR_COST_PER_EMAIL.mailchimp,
  sendgrid: emails.value * COMPETITOR_COST_PER_EMAIL.sendgrid,
  mailersend: emails.value * COMPETITOR_COST_PER_EMAIL.mailersend
}))

const calculateSavings = (competitorCost) => {
  const bluefoxCost = comparisonTotalCost.value
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
    <div class="calculator-container">
      <!-- Slider Section -->
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

      <!-- Results Grid -->
      <div class="results-grid" :class="{ 'full-width': isEnterpriseVolume }">
        <!-- Pack Card (Left) -->
        <div class="pack-card">
          <div v-if="recommendedPack !== 'enterprise'" class="pack-content">
            <div class="pack-header">{{ formatNumber(emails) }} emails cost at BlueFox Email (BYO SES)</div>
            
            <!-- Display pack-based total cost -->
            <div class="actual-price">{{ formatPrice(displayTotalCost) }}</div>
            
            <div class="cost-breakdown">
              <div class="breakdown-row">
                <span class="breakdown-label">Platform fee:</span>
                <span class="breakdown-value">{{ formatPrice(displayPlatformCost) }}</span>
              </div>
              <div class="breakdown-row">
                <span class="breakdown-label">AWS SES fee:</span>
                <span class="breakdown-value">{{ formatPrice(awsSESCost) }}</span>
              </div>
            </div>
            
            <div class="recommended-pack-info">
              <span class="recommended-label">Recommended pack:</span>
              <span class="recommended-pack-name">{{ recommendedPack.name }}</span>
            </div>
            
            <div class="pack-price-section">
              <span class="pack-price-label">Platform pack cost:</span>
              <span class="pack-price-value">{{ formatPrice(displayedPackCost) }}</span>
            </div>
            
            <div class="pack-info">
              <div class="info-row">
                <span class="info-label">Pack includes:</span>
                <span class="info-value">{{ formatNumber(recommendedPack.sends) }} sends</span>
              </div>
              <div class="info-row">
                <span class="info-label">Total cost per 1,000:</span>
                <span class="info-value">{{ formatPrice(packBasedCostPerEmail * 1000) }}</span>
              </div>
            </div>

            <div v-if="sendsRemaining > 0" class="remaining-note">
              ✨ <strong>{{ formatNumber(sendsRemaining) }} sends</strong> remaining for future use
            </div>

            <ul class="pack-features">
              <li>Sends valid for 12 months</li>
              <li>All features included</li>
              <li>Your AWS account, your control</li>
            </ul>
          </div>

          <!-- Enterprise Display -->
          <div v-else class="enterprise-content enterprise-full">
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

        <!-- Comparison Card -->
        <div v-if="!isEnterpriseVolume" class="comparison-card">
          <h4 class="comparison-title">Compare with Competitors</h4>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Provider</th>
                  <th scope="col">Monthly Cost</th>
                  <th scope="col">You Save</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mailchimp Premium</td>
                  <td>{{ formatPrice(competitorCosts.mailchimp) }}</td>
                  <td>{{ calculateSavings(competitorCosts.mailchimp) }}%</td>
                </tr>
                <tr>
                  <td>SendGrid Premier</td>
                  <td>{{ formatPrice(competitorCosts.sendgrid) }}</td>
                  <td>{{ calculateSavings(competitorCosts.sendgrid) }}%</td>
                </tr>
                <tr>
                  <td>MailerSend Pro</td>
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
            <li>BlueFox BYO SES includes platform fee + AWS SES costs ($0.10 per 1,000 emails)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* === Calculator Container === */
.pricing-calculator {
  width: 100%;
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
}

.calculator-container {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* === Slider Section === */
.slider-section {
  margin-bottom: 40px;
  text-align: center;
}

.slider-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 32px 0;
}

.slider-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.email-slider {
  width: 100%;
  height: 8px;
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
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(19, 176, 238, 0.4);
  transition: all 0.2s ease;
}

.email-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(19, 176, 238, 0.6);
}

.email-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--vp-c-brand);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(19, 176, 238, 0.4);
  transition: all 0.2s ease;
}

.email-slider::-moz-range-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(19, 176, 238, 0.6);
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
  transition: all 0.2s ease;
}

.slider-label.active {
  color: var(--vp-c-brand);
  font-weight: 700;
  transform: scale(1.1);
}

.cost-breakdown {
  margin-bottom: 20px;
  padding: 12px 16px;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;
}

.breakdown-row:not(:last-child) {
  border-bottom: 1px dashed var(--vp-c-divider);
}

.breakdown-label {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.breakdown-value {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

/* === Results Grid === */
.results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.results-grid.full-width {
  grid-template-columns: 1fr;
}

.results-grid.full-width .pack-card {
  max-width: 800px;
  margin: 0 auto;
}

/* === Pack Card === */
.pack-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}

.pack-content {
  text-align: center;
}

.pack-header {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.actual-price {
  font-size: 56px;
  font-weight: 700;
  background: linear-gradient(120deg, #392C91, #13B0EE);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  line-height: 1;
}

html.dark .actual-price {
  background: linear-gradient(120deg, #8a7ed8, #13B0EE);
  background-clip: text;
  -webkit-background-clip: text;
}

.recommended-pack-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.recommended-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.recommended-pack-name {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.pack-price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  margin-bottom: 20px;
}

.pack-price-label {
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.pack-price-value {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(120deg, #392C91, #13B0EE);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

html.dark .pack-price-value {
  background: linear-gradient(120deg, #8a7ed8, #13B0EE);
  background-clip: text;
  -webkit-background-clip: text;
}

.pack-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.info-label {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.info-value {
  color: var(--vp-c-text-1);
  font-weight: 700;
}

.remaining-note {
  margin-top: 16px;
  padding: 12px 16px;
  background: rgba(19, 176, 238, 0.05);
  border: 1px solid rgba(19, 176, 238, 0.2);
  border-radius: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

html.dark .remaining-note {
  background: rgba(19, 176, 238, 0.1);
  border-color: rgba(19, 176, 238, 0.3);
}

.pack-features {
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
  text-align: left;
}

.pack-features li {
  font-size: 13px;
  color: var(--vp-c-text-2);
  padding: 6px 0;
  font-weight: 500;
}

.pack-features li::before {
  content: "✓ ";
  color: var(--vp-c-brand);
  font-weight: bold;
  margin-right: 8px;
}

/* === Enterprise Content === */
.enterprise-content {
  text-align: center;
  padding: 20px 0;
}

.enterprise-content.enterprise-full {
  padding: 40px 0;
}

.enterprise-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  min-height: 300px;
}

.enterprise-icon img {
  width: 100%;
  max-width: 370px;
  height: auto;
  object-fit: contain;
  transition: opacity 0.3s ease;
}

.mascot-light {
  display: block;
}

.mascot-dark {
  display: none;
}

html.dark .mascot-light {
  display: none;
}

html.dark .mascot-dark {
  display: block;
}

.enterprise-content h5 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: var(--vp-c-text-1);
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
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.enterprise-link:hover {
  background: var(--vp-c-brand-light);
  box-shadow: 0 4px 12px rgba(19, 176, 238, 0.3);
  color: white;
}

/* === Comparison Card === */
.comparison-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comparison-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 20px 0;
  text-align: center;
}

.table-container {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  margin: 0 0 16px 0;
}

.comparison-table {
  width: 100%;
  table-layout: fixed;
  border-spacing: 0;
  font-size: 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  margin-top: 10px;
  box-sizing: border-box;
  text-align: center;
}

.comparison-table th,
.comparison-table td {
  width: 33.33%;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  vertical-align: middle;
}

.comparison-table th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.5px;
  text-align: center;
}

.comparison-table tbody tr:last-child td {
  border-bottom: none;
}

.comparison-table tbody tr:hover {
  background: var(--vp-c-bg-soft);
}

.table-note {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 0;
  padding: 0;
  text-align: center;
  line-height: 1.6;
  list-style: none;
}

.table-note li {
  margin-bottom: 4px;
  text-align: left;
  padding: 0 16px;
  position: relative;
}

.table-note li::before {
  content: "•";
  color: var(--vp-c-brand);
  font-weight: bold;
  position: absolute;
  left: 0;
  transform: translateX(-100%);
}

/* === Responsive Design === */
@media (max-width: 968px) {
  .results-grid {
    grid-template-columns: 1fr;
  }

  .calculator-container {
    padding: 32px 24px;
  }

  .pack-card {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pack-content,
  .enterprise-content {
    width: 100%;
    max-width: 500px;
  }
  
  .enterprise-icon {
    min-height: 200px;
  }
  
  .enterprise-icon img {
    max-width: 280px;
  }
}

@media (max-width: 640px) {
  .pricing-calculator {
    padding: 0 12px;
  }

  .calculator-container {
    padding: 24px 20px;
  }

  .actual-price {
    font-size: 44px;
  }

  .recommended-pack-name {
    font-size: 24px;
  }

  .slider-labels {
    font-size: 11px;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 10px 8px;
    font-size: 12px;
  }

  .comparison-title {
    font-size: 18px;
  }

  .table-note li {
    padding: 0 12px;
  }
  
  .enterprise-icon {
    min-height: 150px;
  }
  
  .enterprise-icon img {
    max-width: 200px;
  }
}
</style>
