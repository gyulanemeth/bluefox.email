<script setup>
import { ref, computed } from 'vue'

// User input
const annualEmails = ref(100_000)

// Pricing configuration
const CREDIT_RATIO = 2 // 1 email = 2 credits
const FREE_CREDITS_ANNUAL = 36_000 // 3,000/month × 12
const PACKS = [
  { name: 'Start-up', credits: 100_000, price: 50 },
  { name: 'Scale-up', credits: 1_000_000, price: 300 },
  { name: 'Grown-up', credits: 10_000_000, price: 2_500 }
]

// Calculations
const creditsNeeded = computed(() => annualEmails.value * CREDIT_RATIO)
const netCreditsNeeded = computed(() => Math.max(0, creditsNeeded.value - FREE_CREDITS_ANNUAL))

// Only recommend a pack if they need to buy credits
const recommendedPack = computed(() => {
  if (netCreditsNeeded.value === 0) return null
  return PACKS.find(pack => netCreditsNeeded.value <= pack.credits) || 'enterprise'
})

const costPerEmail = computed(() => {
  if (!recommendedPack.value || recommendedPack.value === 'enterprise') return null
  return recommendedPack.value.price / annualEmails.value
})

const creditsRemaining = computed(() => {
  if (!recommendedPack.value || recommendedPack.value === 'enterprise') return null
  return recommendedPack.value.credits - netCreditsNeeded.value
})

const emailsSendable = computed(() => {
  if (!recommendedPack.value || recommendedPack.value === 'enterprise') return null
  return recommendedPack.value.credits / CREDIT_RATIO
})

const freeEmailsAvailable = computed(() => FREE_CREDITS_ANNUAL / CREDIT_RATIO)

const isCoveredByFreeCredits = computed(() => creditsNeeded.value <= FREE_CREDITS_ANNUAL)

// Formatting helpers
const formatNumber = (num) => {
  if (num === null || num === undefined) return '—'
  return num.toLocaleString('en-US')
}

const formatPrice = (price) => {
  if (price === null) return '—'
  if (price < 0.01) return '< $0.01'
  return `$${price.toFixed(4)}`
}
</script>

<template>
  <div class="pricing-calculator">
    <h3>Calculate your annual cost</h3>
    
    <div class="input-section">
      <label for="annual-emails">Annual emails you plan to send</label>
      <input
        id="annual-emails"
        type="number"
        v-model.number="annualEmails"
        min="0"
        max="20_000_000"
        step="1000"
      />
    </div>

    <div class="results">
      <div class="metric">
        <span>Credits needed:</span>
        <strong>{{ formatNumber(creditsNeeded) }}</strong>
      </div>

      <div class="metric highlight">
        <span>Free credits (first year):</span>
        <strong class="success">{{ formatNumber(FREE_CREDITS_ANNUAL) }}</strong>
      </div>

      <div class="metric">
        <span>Additional credits to purchase:</span>
        <strong>{{ formatNumber(netCreditsNeeded) }}</strong>
      </div>

      <div class="divider"></div>

      <!-- Covered by free credits -->
      <template v-if="isCoveredByFreeCredits">
        <div class="info-box success">
          🎉 <strong>Great news!</strong> Your email volume ({{ formatNumber(annualEmails) }} emails/year) 
          is covered by the <strong>free 36,000 credits</strong> included in your first year!
        </div>

        <div class="metric total">
          <span>Annual cost:</span>
          <strong class="price-free">$0</strong>
        </div>

        <div class="metric">
          <span>Free credits remaining:</span>
          <strong>{{ formatNumber(FREE_CREDITS_ANNUAL - creditsNeeded) }}</strong>
        </div>

        <div class="note">
          ℹ️ That's {{ formatNumber(Math.floor((FREE_CREDITS_ANNUAL - creditsNeeded) / CREDIT_RATIO)) }} additional emails you can send for free!
        </div>
      </template>

      <!-- Need to purchase credits -->
      <template v-else-if="recommendedPack && recommendedPack !== 'enterprise'">
        <div class="metric">
          <span>Recommended pack:</span>
          <strong class="brand">{{ recommendedPack.name }}</strong>
        </div>

        <div class="metric">
          <span>Pack includes:</span>
          <strong>{{ formatNumber(emailsSendable) }} email sends</strong>
        </div>

        <div class="metric total">
          <span>Annual cost:</span>
          <strong class="price">${{ formatNumber(recommendedPack.price) }}</strong>
        </div>

        <div class="metric">
          <span>Cost per email:</span>
          <strong>{{ formatPrice(costPerEmail) }}</strong>
        </div>

        <div class="info-box" v-if="creditsRemaining > 0">
          💡 You'll have <strong>{{ formatNumber(creditsRemaining) }} credits</strong> 
          ({{ formatNumber(Math.floor(creditsRemaining / CREDIT_RATIO)) }} emails) remaining for future use.
        </div>
      </template>

      <!-- Enterprise -->
      <template v-else-if="recommendedPack === 'enterprise'">
        <div class="info-box enterprise">
          🚀 <strong>Enterprise volume!</strong> 
          <a href="mailto:hello@bluefox.email">Contact us</a> for custom pricing and dedicated support.
        </div>
      </template>

      <div class="note" v-if="!isCoveredByFreeCredits">
        ℹ️ Credits valid for 12 months. All features included without restrictions.
      </div>
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

.metric.highlight {
  background: var(--vp-c-bg-alt);
  padding: 10px 16px;
  margin: 0 -16px;
  border-radius: 8px;
}

.metric strong.success {
  color: #4caf50;
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

.metric .price-free {
  font-size: 24px;
  font-weight: 700;
  color: #4caf50;
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

.info-box.success {
  border-left-color: #4caf50;
  background: rgba(76, 175, 80, 0.1);
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

@media (max-width: 640px) {
  .pricing-calculator {
    padding: 24px 20px;
  }

  .metric {
    font-size: 14px;
  }

  .metric .price,
  .metric .price-free {
    font-size: 20px;
  }
}
</style>