<script setup>
import { ref, computed } from 'vue'

const emails = ref(100_000)

const creditsNeeded = computed(() => Math.ceil(emails.value))

const packs = [
  { name: 'Start-up', credits: 100_000, price: 50 },
  { name: 'Scale-up', credits: 1_000_000, price: 300 },
  { name: 'Grown-up', credits: 10_000_000, price: 2500 },
  { name: 'Enterprise', credits: Infinity, price: null }
]

const selectedPack = computed(() => {
  return packs.find(pack => creditsNeeded.value <= pack.credits) || packs[3]
})

const awsCost = computed(() => emails.value * 0.0001)
const bluefoxCost = computed(() => selectedPack.value.price || 0)
const totalCost = computed(() => bluefoxCost.value + awsCost.value)
const costPerEmail = computed(() => totalCost.value / emails.value)

const formatNumber = (num) => {
  if (typeof num !== 'number') return num
  return num.toLocaleString()
}

const formatPrice = (price) => {
  if (price === null) return '—'
  if (price < 0.01) return '< $0.01'
  return `$${price.toFixed(4)}`
}
</script>

<template>
  <div class="pricing-calculator">
    <div class="input-section">
      <label for="email-count">How many emails do you plan to send?</label>
      <input
        id="email-count"
        type="number"
        v-model.number="emails"
        min="1"
        :max="20_000_000"
        placeholder="e.g. 100000"
      />
    </div>

    <div class="result">
      <div class="metric">
        <span>Credits needed (1:1):</span>
        <strong>{{ formatNumber(creditsNeeded) }}</strong>
      </div>

      <div class="metric">
        <span>Recommended pack:</span>
        <strong>{{ selectedPack.name }}</strong>
      </div>

      <div class="metric">
        <span>Bluefox platform fee:</span>
        <strong v-if="selectedPack.price !== null">
          ${{ formatNumber(selectedPack.price) }}
        </strong>
        <a v-else href="mailto:hello@bluefox.email" class="contact-link">Contact us</a>
      </div>

      <div class="metric">
        <span>AWS SES cost (est.):</span>
        <strong>${{ formatPrice(awsCost) }}</strong>
      </div>

      <div class="metric total-cost" v-if="selectedPack.price !== null">
        <span>Total estimated cost:</span>
        <strong class="price">${{ formatPrice(totalCost) }}</strong>
      </div>

      <div class="metric" v-if="selectedPack.price !== null">
        <span>Effective cost per email:</span>
        <strong>{{ formatPrice(costPerEmail) }}/email</strong>
      </div>

      <!-- Only show leftover credits for non-Enterprise -->
      <div
        v-if="selectedPack.price !== null && selectedPack.credits !== Infinity"
        class="savings-note"
      >
        💡 You’ll have <strong>{{ formatNumber(selectedPack.credits - creditsNeeded) }}</strong> credits left.
      </div>

      <!-- Enterprise note -->
      <div v-else-if="selectedPack.price === null" class="savings-note">
        💡 For high-volume needs, we’ll tailor a plan with dedicated support and custom credit limits.
      </div>

      <div class="note">
        ℹ️ AWS charges $1 per 10,000 emails separately. Bluefox only charges for platform access.
      </div>
    </div>
  </div>
</template>

<style scoped>
.pricing-calculator {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 24px;
  margin: 32px auto;
  max-width: 560px;
  color: var(--vp-c-text-1);
}

.input-section {
  margin-bottom: 20px;
}

.input-section label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 16px;
}

.input-section input {
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.input-section input:focus {
  outline: 2px solid var(--vp-c-brand);
  border-color: transparent;
}

.metric {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 16px;
}

.metric span {
  color: var(--vp-c-text-2);
}

.metric strong {
  font-weight: 600;
}

.total-cost .price {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(120deg, #392c91 5%, #13b0ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.contact-link {
  color: var(--vp-c-brand);
  font-weight: 600;
  text-decoration: none;
}

.contact-link:hover {
  text-decoration: underline;
}

.savings-note {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 14px;
  color: var(--vp-c-text-2);
  text-align: center;
}

.note {
  margin-top: 16px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-align: center;
  font-style: italic;
}
</style>