<script setup>
import { ref, computed } from 'vue'

const SLIDER_VALUES = [10000, 25000, 50000, 100000, 250000, 500000, 1000000]
const currentSliderIndex = ref(2)

const emails = computed(() => SLIDER_VALUES[currentSliderIndex.value])

const PACKS = [
  { name: 'Start-up', sends: 50_000, price: 50 },
  { name: 'Scale-up', sends: 500_000, price: 300 }
]

const COMPETITOR_COST_PER_EMAIL = {
  mailchimp: 0.0037,
  sendgrid: 0.0106,
  mailersend: 0.00145
}

const recommendedPack = computed(() =>
  emails.value > 0 ? PACKS.find(pack => emails.value <= pack.sends) || 'enterprise' : null
)

const totalCost = computed(() =>
  !recommendedPack.value || recommendedPack.value === 'enterprise' ? null : recommendedPack.value.price
)

const bluefoxCostPerEmail = computed(() => {
  if (!recommendedPack.value || recommendedPack.value === 'enterprise') return 0
  return recommendedPack.value.price / recommendedPack.value.sends
})

// Calculate actual cost for the selected email volume
const actualBluefoxCost = computed(() => emails.value * bluefoxCostPerEmail.value)

const sendsRemaining = computed(() =>
  !recommendedPack.value || recommendedPack.value === 'enterprise'
    ? null
    : recommendedPack.value.sends - emails.value
)

const estimatedContacts = computed(() => Math.round(emails.value / 5))

const competitorCosts = computed(() => ({
  mailchimp: emails.value * COMPETITOR_COST_PER_EMAIL.mailchimp,
  sendgrid: emails.value * COMPETITOR_COST_PER_EMAIL.sendgrid,
  mailersend: emails.value * COMPETITOR_COST_PER_EMAIL.mailersend
}))

const calculateSavings = (competitorCost) => {
  const bluefoxCost = actualBluefoxCost.value
  if (!bluefoxCost || bluefoxCost === 0) return 0
  return Math.round(((competitorCost - bluefoxCost) / competitorCost) * 100)
}

const formatNumber = num => (num == null ? '—' : num.toLocaleString('en-US'))

const formatPrice = price => {
  if (price == null) return '—'
  if (price < 0.01) return '< $0.01'
  return `$${price.toFixed(2)}`
}

const formatAbbreviated = num => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
  return num.toString()
}
</script>

<template>
  <div class="pricing-calculator">
    <div class="calculator-container">
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

      <div class="results-grid">
        <div class="pack-card">
          <template v-if="recommendedPack !== 'enterprise'">
            <div class="pack-content">
              <div class="pack-header">{{ formatNumber(emails) }} emails cost at BlueFox Email</div>
              
              <div class="actual-price">{{ formatPrice(actualBluefoxCost) }}</div>
              
              <div class="recommended-pack-info">
                <span class="recommended-label">Recommended pack:</span>
                <span class="recommended-pack-name">{{ recommendedPack.name }}</span>
              </div>
              
              <div class="pack-price-section">
                <span class="pack-price-label">Pack cost:</span>
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

              <ul class="pack-features">
                <li>Sends valid for 12 months</li>
                <li>All features included</li>
                <li>No contact-based pricing</li>
              </ul>
            </div>
          </template>

          <template v-else>
            <div class="enterprise-content">
              <div class="enterprise-icon">🚀</div>
              <h5>Enterprise Volume</h5>
              <p>For 1M+ emails, we offer custom pricing with volume discounts.</p>
              <a href="mailto:hello@bluefox.email" class="enterprise-link">Contact sales</a>
            </div>
          </template>
        </div>

        <div class="comparison-section">
          <h4>Compare with Competitors</h4>
          <div class="comparison-table-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Monthly Cost</th>
                  <th>You Save</th>
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
            <ul class="table-note">
              <li>Comparison based on premium/highest tier plans with all features (automation, A/B testing, advanced segmentation)</li>
              <li>Estimated {{ formatNumber(estimatedContacts) }} contacts (assuming 5 marketing emails per contact per month)</li>
              <li>BlueFox has no contact limits and includes all features at every tier</li>
            </ul>
          </div>
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
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(19, 176, 238, 0.3);
}

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

.comparison-table-wrapper {
  width: 100%;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  table-layout: fixed;
}

.comparison-table th:nth-child(1),
.comparison-table td:nth-child(1) {
  width: 40%;
}

.comparison-table th:nth-child(2),
.comparison-table td:nth-child(2) {
  width: 35%;
}

.comparison-table th:nth-child(3),
.comparison-table td:nth-child(3) {
  width: 25%;
}

.comparison-table th,
.comparison-table td {
  border: 1px solid var(--vp-c-divider);
  text-align: center;
  padding: 12px 16px;
  color: var(--vp-c-text-1);
}

.comparison-table th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
  font-size: 13px;
}

.table-note {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 12px;
  padding-left: 20px;
  text-align: left;
  line-height: 1.6;
  list-style-type: disc;
}

.table-note li {
  margin-bottom: 4px;
}

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
}
</style>