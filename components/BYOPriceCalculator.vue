<script setup>
import { ref, computed } from 'vue'

// User input
const annualEmails = ref(100_000)

// Pricing configuration
const CREDIT_RATIO = 1 // 1 email = 1 credit (BYO SES)
const AWS_SES_COST_PER_EMAIL = 0.0001 // $0.0001 per email
const PACKS = [
  { name: 'Start-up', credits: 100_000, price: 50 },
  { name: 'Scale-up', credits: 1_000_000, price: 300 },
  { name: 'Grown-up', credits: 10_000_000, price: 2_500 }
]

// Calculations
const creditsNeeded = computed(() => annualEmails.value * CREDIT_RATIO)

const recommendedPack = computed(() => {
  if (annualEmails.value <= 0) return null
  return PACKS.find(pack => creditsNeeded.value <= pack.credits) || 'enterprise'
})

const awsCost = computed(() => annualEmails.value * AWS_SES_COST_PER_EMAIL)

const totalCost = computed(() => {
  if (!recommendedPack.value || recommendedPack.value === 'enterprise') return null
  return recommendedPack.value.price + awsCost.value
})

const costPerEmail = computed(() => {
  if (!totalCost.value || annualEmails.value <= 0) return null
  return totalCost.value / annualEmails.value
})

const creditsRemaining = computed(() => {
  if (!recommendedPack.value || recommendedPack.value === 'enterprise') return null
  return recommendedPack.value.credits - creditsNeeded.value
})

// Formatting helpers
const formatNumber = (num) => {
  if (num === null || num === undefined) return '—'
  return num.toLocaleString('en-US')
}

const formatPrice = (price) => {
  if (price === null) return '—'
  if (price < 0.01) return '< $0.01'
  return `$${price.toFixed(2)}`
}

const formatPriceDetailed = (price) => {
  if (price === null) return '—'
  if (price < 0.0001) return '< $0.0001'
  return `$${price.toFixed(6)}`
}
</script>

<template>
  <div class="pricing-calculator">
    <h3>Calculate your annual cost (BYO SES)</h3>
    
    <div class="input-section">
      <label for="annual-emails-byo">Annual emails you plan to send</label>
      <input
        id="annual-emails-byo"
        type="number"
        v-model.number="annualEmails"
        min="1"
        max="20_000_000"
        step="1000"
        placeholder="e.g. 100000"
      />
    </div>

    <div class="results">
      <!-- Show results only for valid input -->
      <template v-if="annualEmails > 0">
        <div class="metric">
          <span>Credits needed (1:1):</span>
          <strong>{{ formatNumber(creditsNeeded) }}</strong>
        </div>

        <div class="divider"></div>

        <!-- Paid pack recommendation -->
        <template v-if="recommendedPack !== 'enterprise'">
          <div class="metric">
            <span>Recommended pack:</span>
            <strong class="brand">{{ recommendedPack.name }}</strong>
          </div>

          <div class="cost-breakdown">
            <div class="metric">
              <span>BlueFox platform:</span>
              <strong>${{ formatNumber(recommendedPack.price) }}</strong>
            </div>

            <div class="metric">
              <span>AWS SES (est.):</span>
              <strong>{{ formatPrice(awsCost) }}</strong>
            </div>
          </div>

          <div class="metric total">
            <span>Total annual cost:</span>
            <strong class="price">{{ formatPrice(totalCost) }}</strong>
          </div>

          <div class="metric">
            <span>Cost per email:</span>
            <strong>{{ formatPriceDetailed(costPerEmail) }}</strong>
          </div>

          <div class="info-box" v-if="creditsRemaining > 0">
            💡 You'll have <strong>{{ formatNumber(creditsRemaining) }} credits</strong> 
            ({{ formatNumber(creditsRemaining) }} emails) remaining for future use.
          </div>
        </template>

        <!-- Enterprise -->
        <template v-else>
          <div class="info-box enterprise">
            🚀 <strong>Enterprise volume!</strong> 
            <a href="mailto:hello@bluefox.email">Contact us</a> for custom pricing and dedicated support.
          </div>
          
          <div class="metric">
            <span>AWS SES cost (est.):</span>
            <strong>{{ formatPrice(awsCost) }}</strong>
          </div>
        </template>

        <div class="note">
          ℹ️ AWS charges $1 per 10,000 emails separately. Credits valid for 12 months.
        </div>
      </template>

      <!-- Empty state -->
      <template v-else>
        <div class="empty-state">
          📊 Enter your annual email volume above to see pricing recommendations.
        </div>
      </template>
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

.pricing-calculator h3 {
  margin: 0 0 24px 0;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: var(--vp-c-text-1);
}

.input-section {
  margin-bottom: 24px;
}

.input-section label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 15px;
  color: var(--vp-c-text-2);
}

.input-section input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color 0.2s;
}

.input-section input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.results {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 15px;
}

.metric span {
  color: var(--vp-c-text-2);
}

.metric strong {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.metric strong.brand {
  background: linear-gradient(120deg, #392c91, #13b0ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 16px;
}

.divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 12px 0;
}

.cost-breakdown {
  background: var(--vp-c-bg-alt);
  padding: 12px 16px;
  margin: 8px -16px;
  border-radius: 8px;
}

.cost-breakdown .metric {
  padding: 6px 0;
}

.metric.total {
  margin-top: 8px;
  padding: 16px 0;
  border-top: 2px solid var(--vp-c-divider);
}

.metric .price {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(120deg, #392c91, #13b0ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
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

.info-box.enterprise {
  border-left-color: #13b0ee;
}

.info-box strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.info-box a {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 600;
}

.info-box a:hover {
  text-decoration: underline;
}

.note {
  margin-top: 16px;
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

  .metric .price {
    font-size: 20px;
  }
}
</style>
