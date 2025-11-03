<script setup>
import { ref, computed } from 'vue'

// Predefined slider values
const SLIDER_VALUES = [10000, 25000, 50000, 100000, 250000, 500000, 1000000]
const currentSliderIndex = ref(3) // Default to 100K

// User input based on slider
const emails = computed(() => SLIDER_VALUES[currentSliderIndex.value])

// Add enterprise flag
const isEnterpriseVolume = computed(() => emails.value >= 1000000)

// Pricing configuration (BYO SES mode)
const AWS_SES_COST_PER_EMAIL = 0.0001 // $0.0001 per email
const PACKS = [
  { name: 'Start-up', sends: 50_000, price: 50 },
  { name: 'Scale-up', sends: 500_000, price: 300 }
]

// Competitor cost per email (premium tiers, all features)
const COMPETITOR_COST_PER_EMAIL = {
  sendgrid: 0.0106,     // SendGrid Premier
  mailchimp: 0.0037,    // Mailchimp Premium
  mailersend: 0.00145   // MailerSend Pro
}

// BlueFox calculations
const recommendedPack = computed(() =>
  emails.value > 0 ? PACKS.find(pack => emails.value <= pack.sends) || 'enterprise' : null
)

const awsCost = computed(() => emails.value * AWS_SES_COST_PER_EMAIL)

const totalCost = computed(() =>
  !recommendedPack.value || recommendedPack.value === 'enterprise'
    ? null
    : recommendedPack.value.price + awsCost.value
)

// BlueFox BYO cost per email (platform + AWS)
const bluefoxCostPerEmail = computed(() => {
  if (!recommendedPack.value || recommendedPack.value === 'enterprise') return AWS_SES_COST_PER_EMAIL
  return (recommendedPack.value.price / recommendedPack.value.sends) + AWS_SES_COST_PER_EMAIL
})

const sendsRemaining = computed(() =>
  !recommendedPack.value || recommendedPack.value === 'enterprise'
    ? null
    : recommendedPack.value.sends - emails.value
)

const estimatedContacts = computed(() => Math.round(emails.value / 5))

// Actual BlueFox cost for the emails being sent
const actualBluefoxCost = computed(() => emails.value * bluefoxCostPerEmail.value)

// Dynamic competitor costs based on ACTUAL email volume
const competitorCosts = computed(() => ({
  sendgrid: emails.value * COMPETITOR_COST_PER_EMAIL.sendgrid,
  mailchimp: emails.value * COMPETITOR_COST_PER_EMAIL.mailchimp,
  mailersend: emails.value * COMPETITOR_COST_PER_EMAIL.mailersend
}))

// Calculate savings
const calculateSavings = (competitorCost) => {
  const bluefoxCost = actualBluefoxCost.value
  if (!bluefoxCost || bluefoxCost === 0) return 0
  return Math.round(((competitorCost - bluefoxCost) / competitorCost) * 100)
}

// Formatting helpers
const formatNumber = num => (num == null ? '—' : num.toLocaleString('en-US'))
const formatPrice = price => {
  if (price == null) return '—'
  if (price < 0.01) return '< $0.01'
  return `$${price.toFixed(2)}`
}
const formatPriceDetailed = price => {
  if (price == null) return '—'
  if (price < 0.0001) return '< $0.0001'
  return `$${price.toFixed(6)}`
}

// Format number to abbreviated form
const formatAbbreviated = num => {
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

      <!-- Results Grid: BlueFox Pack + Comparison Table -->
      <div class="results-grid">
        <!-- BlueFox Pack Card -->
        <div class="pack-card">
          <template v-if="recommendedPack !== 'enterprise'">
            <div class="pack-content">
              <!-- Header -->
              <div class="pack-header">{{ formatNumber(emails) }} emails cost at BlueFox Email (BYO SES)</div>
              
              <!-- Actual price for emails being sent -->
              <div class="actual-price">{{ formatPrice(actualBluefoxCost) }}</div>
              
              <!-- Recommended pack info -->
              <div class="recommended-pack-info">
                <span class="recommended-label">Recommended pack:</span>
                <span class="recommended-pack-name">{{ recommendedPack.name }}</span>
              </div>
              
              <!-- Cost breakdown -->
              <div class="cost-breakdown">
                <div class="breakdown-row">
                  <span class="breakdown-label">BlueFox platform:</span>
                  <span class="breakdown-value">{{ formatPrice(recommendedPack.price) }}</span>
                </div>
                <div class="breakdown-row">
                  <span class="breakdown-label">AWS SES (estimated):</span>
                  <span class="breakdown-value">{{ formatPrice(awsCost) }}</span>
                </div>
              </div>

              <div class="pack-price-section">
                <span class="pack-price-label">Total pack cost:</span>
                <span class="pack-price-value">{{ formatPrice(totalCost) }}</span>
              </div>

              <div class="pack-info">
                <div class="info-row">
                  <span class="info-label">Pack includes:</span>
                  <span class="info-value">{{ formatNumber(recommendedPack.sends) }} sends</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Cost per 1,000 sends:</span>
                  <span class="info-value">{{ formatPrice(bluefoxCostPerEmail * 1000) }}</span>
                </div>
              </div>

              <div v-if="sendsRemaining > 0" class="remaining-note">
                ✨ <strong>{{ formatNumber(sendsRemaining) }} sends</strong> remaining for future use
              </div>

              <!-- Features list -->
              <ul class="pack-features">
                <li>AWS charges $0.10 per 1K emails</li>
                <li>Sends valid for 12 months</li>
                <li>All features included</li>
              </ul>
            </div>
          </template>

          <template v-else>
            <div class="enterprise-content">
              <div class="enterprise-icon">🚀</div>
              <h5>Enterprise Volume</h5>
              <p>For 1M+ emails, we offer custom pricing with volume discounts.</p>
              <div class="aws-cost-note">
                <strong>AWS SES cost (estimated):</strong> {{ formatPrice(awsCost) }}
              </div>
              <a href="mailto:hello@bluefox.email" class="enterprise-link">Contact sales</a>
            </div>
          </template>
        </div>

        <!-- Comparison Table Card -->
        <div class="comparison-section">
          <h4>Compare with Competitors</h4>
          <div class="table-container">
            <table class="comparison-table" :class="{ 'enterprise-mode': isEnterpriseVolume }">
              <thead>
                <tr>
                  <th scope="col">Provider</th>
                  <th scope="col">Monthly Cost</th>
                  <th v-if="!isEnterpriseVolume" scope="col">You Save</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SendGrid Premier</td>
                  <td>{{ formatPrice(competitorCosts.sendgrid) }}</td>
                  <td v-if="!isEnterpriseVolume">{{ calculateSavings(competitorCosts.sendgrid) }}%</td>
                </tr>
                <tr>
                  <td>Mailchimp Premium</td>
                  <td>{{ formatPrice(competitorCosts.mailchimp) }}</td>
                  <td v-if="!isEnterpriseVolume">{{ calculateSavings(competitorCosts.mailchimp) }}%</td>
                </tr>
                <tr>
                  <td>MailerSend <br> Pro</td>
                  <td>{{ formatPrice(competitorCosts.mailersend) }}</td>
                  <td v-if="!isEnterpriseVolume">{{ calculateSavings(competitorCosts.mailersend) }}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="table-note">
            <li>Comparison based on premium/highest tier plans with all features (automation, A/B testing, advanced segmentation)</li>
            <li>Estimated {{ formatNumber(estimatedContacts) }} contacts (assuming 5 marketing emails per contact per month)</li>
            <li>BlueFox BYO includes platform credits + your AWS SES costs, no contact limits</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

/* Slider Section */
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

/* Results Grid */
.results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.pack-card,
.comparison-section {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}

/* Pack Content */
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

/* Cost breakdown */
.cost-breakdown {
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  padding: 4px 0;
}

.breakdown-label {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.breakdown-value {
  color: var(--vp-c-text-1);
  font-weight: 600;
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

/* Pack features list */
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

/* Enterprise Content */
.enterprise-content {
  text-align: center;
  padding: 20px 0;
}

.enterprise-icon {
  font-size: 48px;
  margin-bottom: 16px;
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
  margin: 0 0 16px 0;
  line-height: 1.6;
}

.aws-cost-note {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
  padding: 12px;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
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
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(19, 176, 238, 0.3);
}

/* Comparison Section */
.comparison-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.comparison-section h4 {
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 20px 0;
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
  margin: 0;
  box-sizing: border-box;
}

/* Column width distribution */
.comparison-table:not(.enterprise-mode) th,
.comparison-table:not(.enterprise-mode) td {
  width: 33.3333%;
}

.comparison-table.enterprise-mode th,
.comparison-table.enterprise-mode td {
  width: 50%;
}

.comparison-table th,
.comparison-table td {
  padding: 12px 18px; /* Match your fix */
  text-align: center;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.comparison-table th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  font-size: 15px;
  /* text-transform: uppercase; */
  letter-spacing: 0.5px;
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
  padding: 0; /* No left padding! */
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

/* Responsive */
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

  .comparison-section h4 {
    font-size: 18px;
  }

  .table-note li {
    padding: 0 12px;
  }
}
</style>