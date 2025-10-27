<script setup>
import { ref, computed } from 'vue'

// User input
const emails = ref(100_000)

// Pricing configuration
const CREDIT_RATIO = 1 // 1 email = 1 credit
const AWS_SES_COST_PER_EMAIL = 0.0001 // $0.0001 per email
const PACKS = [
  { name: 'Start-up', credits: 100_000, price: 50 },
  { name: 'Scale-up', credits: 1_000_000, price: 300 },
  { name: 'Grown-up', credits: 10_000_000, price: 2_500 }
]

// Competitor pricing data (cost per email)
const COST_PER_EMAIL = {
  bluefox: 0.0001, // AWS SES cost only (BlueFox platform cost amortized separately)
  sendgrid: 0.0046995,
  mailchimp: 0.0023,
  mailersend: 0.001355
}

// Calculations
const creditsNeeded = computed(() => emails.value * CREDIT_RATIO)
const recommendedPack = computed(() =>
  emails.value > 0 ? PACKS.find(pack => creditsNeeded.value <= pack.credits) || 'enterprise' : null
)
const awsCost = computed(() => emails.value * AWS_SES_COST_PER_EMAIL)
const totalCost = computed(() =>
  !recommendedPack.value || recommendedPack.value === 'enterprise'
    ? null
    : recommendedPack.value.price + awsCost.value
)
const costPerEmail = computed(() =>
  totalCost.value && emails.value > 0 ? totalCost.value / emails.value : null
)
const creditsRemaining = computed(() =>
  !recommendedPack.value || recommendedPack.value === 'enterprise'
    ? null
    : recommendedPack.value.credits - creditsNeeded.value
)

// Competitor comparison calculations
const competitorCosts = computed(() => ({
  sendgrid: emails.value * COST_PER_EMAIL.sendgrid,
  mailchimp: emails.value * COST_PER_EMAIL.mailchimp,
  mailersend: emails.value * COST_PER_EMAIL.mailersend,
  bluefox: totalCost.value || (emails.value * (COST_PER_EMAIL.bluefox + 0.00025)) // Fallback for enterprise
}))

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
</script>

<template>
  <div class="pricing-calculator">
    <h3>Estimate your cost (BYO SES)</h3>

    <div class="input-section">
      <label for="emails">Emails you plan to send</label>
      <input
        id="emails"
        v-model.number="emails"
        type="number"
        min="1"
        max="20_000_000"
        step="1000"
        placeholder="e.g. 100,000"
      />
    </div>

    <div class="results" v-if="emails > 0">
      <div class="metric">
        <span>Credits required (1:1):</span>
        <strong>{{ formatNumber(creditsNeeded) }}</strong>
      </div>

      <div class="divider"></div>

      <template v-if="recommendedPack !== 'enterprise'">
        <div class="metric">
          <span>Recommended pack:</span>
          <strong class="brand">{{ recommendedPack.name }}</strong>
        </div>

        <div class="metric">
          <span>Pack includes:</span>
          <strong>{{ formatNumber(recommendedPack.credits / CREDIT_RATIO) }} emails</strong>
        </div>

        <div class="cost-breakdown">
          <div class="metric">
            <span>BlueFox platform:</span>
            <strong>{{ formatPrice(recommendedPack.price) }}</strong>
          </div>
          <div class="metric">
            <span>AWS SES (estimated):</span>
            <strong>{{ formatPrice(awsCost) }}</strong>
          </div>
        </div>

        <div class="metric total">
          <span>Total cost:</span>
          <strong class="price">{{ formatPrice(totalCost) }}</strong>
        </div>

        <div class="metric">
          <span>Effective cost per email:</span>
          <strong>{{ formatPriceDetailed(costPerEmail) }}</strong>
        </div>

        <div v-if="creditsRemaining > 0" class="info-box">
          You'll have <strong>{{ formatNumber(creditsRemaining) }}</strong> credits
          (≈ {{ formatNumber(Math.floor(creditsRemaining / CREDIT_RATIO)) }} emails)
          remaining for future use.
        </div>
      </template>

      <template v-else>
        <div class="info-box enterprise">
          <strong>Enterprise volume!</strong>
          <a href="mailto:hello@bluefox.email">Contact us</a> for custom pricing.
        </div>
        <div class="metric">
          <span>AWS SES cost (estimated):</span>
          <strong>{{ formatPrice(awsCost) }}</strong>
        </div>
      </template>

      <div class="divider top-border"></div>

      <!-- Competitor comparison table -->
      <div class="comparison-section">
        <div class="comparison-header">
          <h4>Compare with Competitors</h4>
        </div>
        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Total Cost</th>
                <th>Savings vs BlueFox</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SendGrid</td>
                <td>{{ formatPrice(competitorCosts.sendgrid) }}</td>
                <td>{{ Math.round(100 - (competitorCosts.bluefox / competitorCosts.sendgrid * 100)) }}%</td>
              </tr>
              <tr>
                <td>Mailchimp</td>
                <td>{{ formatPrice(competitorCosts.mailchimp) }}</td>
                <td>{{ Math.round(100 - (competitorCosts.bluefox / competitorCosts.mailchimp * 100)) }}%</td>
              </tr>
              <tr>
                <td>MailerSend</td>
                <td>{{ formatPrice(competitorCosts.mailersend) }}</td>
                <td>{{ Math.round(100 - (competitorCosts.bluefox / competitorCosts.mailersend * 100)) }}%</td>
              </tr>
              <tr class="highlight">
                <td>BlueFox Email (BYO SES)</td>
                <td>{{ formatPrice(competitorCosts.bluefox) }}</td>
                <td>Baseline</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="note">
        AWS charges $1 per 10,000 emails separately. Credits valid for 12 months.
      </div>
    </div>

    <div v-else class="empty-state">
      Enter your email volume above to see pricing recommendations and competitor savings.
    </div>
  </div>
</template>

<style scoped>
.pricing-calculator {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 32px;
  margin: 40px auto;
  max-width: 600px;
}

h3 {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: var(--vp-c-text-1);
  margin-bottom: 24px;
}

.input-section {
  margin-bottom: 24px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 15px;
  color: var(--vp-c-text-2);
}

input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  padding: 10px 0;
}

.metric span {
  color: var(--vp-c-text-2);
}

strong.brand {
  background: linear-gradient(120deg, #392c91, #13b0ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.price {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(120deg, #392c91, #13b0ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 12px 0;
}

/* Top border before comparison */
.divider.top-border {
  width: 100%;
  height: 2px;
  background: var(--vp-c-divider);
  margin: 20px 0;
}

.cost-breakdown {
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
}

.cost-breakdown .metric {
  padding: 6px 0;
}

/* Comparison table section */
.comparison-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.comparison-section h4 {
  font-size: 23px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.comparison-table th,
.comparison-table td {
  border: 1px solid var(--vp-c-divider);
  text-align: center;
  padding: 12px 26px;
  color: var(--vp-c-text-1);
}

.comparison-table th {
  background: var(--vp-c-bg-alt);
  font-weight: 600;
}

.highlight td {
  font-weight: 700;
  color: var(--vp-c-brand);
}

.info-box {
  margin-top: 16px;
  padding: 12px 16px;
  background: var(--vp-c-bg-alt);
  border-left: 3px solid var(--vp-c-brand);
  border-radius: 6px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.note {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 13px;
  color: var(--vp-c-text-3);
  text-align: center;
  font-style: italic;
}

.empty-state {
  padding: 32px 16px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 15px;
}

@media (max-width: 640px) {
  .pricing-calculator {
    padding: 24px 20px;
  }

  .metric {
    font-size: 14px;
  }

  .price {
    font-size: 20px;
  }
}
</style>