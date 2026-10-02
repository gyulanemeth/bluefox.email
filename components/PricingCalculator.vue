<script setup>
import { ref, computed } from 'vue'
import { planFor, packsFor, COMPETITORS } from './pricingData.js'

const props = defineProps({ byo: Boolean })

const AWS_PER_EMAIL = 0.0001 // BYO only: $0.10 per 1,000, paid to AWS
const MONTHLY_VOLUMES = [5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000, 1500000]
const CONTACTS = [1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000]
const SENDS_PER_YEAR = [1, 2, 3, 4, 6]

const mode = ref('monthly')
const volumeIndex = ref(0)
const contactsIndex = ref(3)
const sendsPerYear = ref(4)

const emails = computed(() => MONTHLY_VOLUMES[volumeIndex.value])
const contacts = computed(() => CONTACTS[contactsIndex.value])
const yearlySends = computed(() => contacts.value * sendsPerYear.value)

const aws = sends => (props.byo ? sends * AWS_PER_EMAIL : 0)

// Every month: plans only. Above the largest plan, contact sales.
const plan = computed(() => planFor(emails.value, props.byo))
// A few times a year: one-time packs, compared with paying for a plan all year.
const packs = computed(() => packsFor(yearlySends.value, props.byo))
const packLabel = computed(() => [
  packs.value.premium && `${packs.value.premium}× Premium`,
  packs.value.essential && `${packs.value.essential}× Essential`
].filter(Boolean).join(' + '))
const yearlyOnPlan = computed(() => planFor(contacts.value, props.byo).price * 12 + aws(yearlySends.value))

const total = computed(() => (mode.value === 'monthly'
  ? plan.value && plan.value.price + aws(emails.value)
  : packs.value.price + aws(yearlySends.value)))

// Monthly: every competitor's monthly price. Occasional: contact-based tools bill
// every month whether you send or not, so their year costs 12 × the monthly price.
const rows = computed(() => (mode.value === 'monthly'
  ? COMPETITORS.map(c => ({ ...c, label: c.plan(emails.value), cost: c.prices[emails.value] }))
  : COMPETITORS.filter(c => c.perContact).map(c => {
    const price = c.prices[contacts.value * 5]
    return { ...c, label: c.plan(contacts.value * 5), cost: price == null ? null : price * 12 }
  })))

const savings = cost => (cost == null ? '—' : `${Math.round(((cost - total.value) / cost) * 100)}%`)

const formatNumber = num => num.toLocaleString('en-US')
const formatPrice = price => (price == null ? '—' : price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
// Centre each label on its stop: the 22px thumb's centre runs from 11px to (width - 11px).
const labelLeft = (i, n) => `calc(11px + (100% - 22px) * ${i / (n - 1)})`
const compact = num => new Intl.NumberFormat('en', { notation: 'compact' }).format(num)
</script>

<template>
  <div class="pricing-calculator">
    <div class="mode-toggle" role="group" aria-label="How often do you send?">
      <button type="button" :class="{ active: mode === 'monthly' }" :aria-pressed="mode === 'monthly'" @click="mode = 'monthly'">I send every month</button>
      <button type="button" :class="{ active: mode === 'occasional' }" :aria-pressed="mode === 'occasional'" @click="mode = 'occasional'">I send a few times a year</button>
    </div>

    <div v-if="mode === 'monthly'" class="slider-section">
      <h3 class="slider-title">How many emails do you send each month?</h3>
      <div class="slider-wrapper">
        <input
          v-model.number="volumeIndex"
          type="range"
          min="0"
          :max="MONTHLY_VOLUMES.length - 1"
          class="email-slider"
          aria-label="Monthly email volume"
        />
        <div class="slider-labels">
          <span
            v-for="(value, index) in MONTHLY_VOLUMES"
            :key="value"
            class="slider-label"
            :class="{ active: index === volumeIndex }"
            :style="{ left: labelLeft(index, MONTHLY_VOLUMES.length) }"
          >
            {{ index === MONTHLY_VOLUMES.length - 1 ? '1M+' : compact(value) }}
          </span>
        </div>
      </div>
    </div>

    <div v-else class="slider-section">
      <h3 class="slider-title">How many people do you email, and how often?</h3>
      <div class="slider-wrapper">
        <input
          v-model.number="contactsIndex"
          type="range"
          min="0"
          :max="CONTACTS.length - 1"
          class="email-slider"
          aria-label="Number of contacts"
        />
        <div class="slider-labels">
          <span
            v-for="(value, index) in CONTACTS"
            :key="value"
            class="slider-label"
            :class="{ active: index === contactsIndex }"
            :style="{ left: labelLeft(index, CONTACTS.length) }"
          >
            {{ compact(value) }}
          </span>
        </div>
        <label class="sends-select">
          Emails to every contact per year
          <select v-model.number="sendsPerYear">
            <option v-for="n in SENDS_PER_YEAR" :key="n" :value="n">{{ n }}×</option>
          </select>
        </label>
      </div>
    </div>

    <div class="results-grid" :class="{ 'full-width': mode === 'monthly' && !plan }">
      <div class="pack-card">
        <template v-if="mode === 'monthly' && plan">
          <div class="pack-header">{{ formatNumber(emails) }} emails a month at BlueFox Email{{ byo ? ' (BYO SES)' : '' }}</div>
          <div class="actual-price">{{ formatPrice(total) }}<span class="per-month">/ month</span></div>

          <template v-if="byo">
            <div class="info-row">
              <span class="info-label">Platform fee</span>
              <span class="info-value">{{ formatPrice(plan.price) }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">AWS SES fee</span>
              <span class="info-value">{{ formatPrice(aws(emails)) }}</span>
            </div>
          </template>
          <div class="info-row">
            <span class="info-label">Plan</span>
            <span class="info-value">{{ plan.name }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Includes</span>
            <span class="info-value">{{ formatNumber(plan.sends) }} sends / month</span>
          </div>
          <div class="info-row">
            <span class="info-label">Cost per 1,000 sends</span>
            <span class="info-value">{{ formatPrice(total / emails * 1000) }}</span>
          </div>

          <p class="remaining-note">Fresh sending allowance every billing cycle. All features included.</p>
        </template>

        <template v-else-if="mode === 'occasional'">
          <div class="pack-header">{{ formatNumber(contacts) }} contacts × {{ sendsPerYear }} = {{ formatNumber(yearlySends) }} emails a year{{ byo ? ' (BYO SES)' : '' }}</div>
          <div class="actual-price">{{ formatPrice(total) }}<span class="per-month">/ year</span></div>

          <template v-if="byo">
            <div class="info-row">
              <span class="info-label">Platform fee</span>
              <span class="info-value">{{ formatPrice(packs.price) }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">AWS SES fee</span>
              <span class="info-value">{{ formatPrice(aws(yearlySends)) }}</span>
            </div>
          </template>
          <div class="info-row">
            <span class="info-label">One-time packs</span>
            <span class="info-value">{{ packLabel }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Includes</span>
            <span class="info-value">{{ formatNumber(packs.sends) }} sends, valid 12 months</span>
          </div>
          <div class="info-row">
            <span class="info-label">On a monthly plan instead</span>
            <span class="info-value">{{ formatPrice(yearlyOnPlan) }} / year</span>
          </div>

          <p class="remaining-note">BlueFox charges only for emails sent, never for contacts. Packs are a one-time purchase, no subscription. All features included.</p>
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
          <p>For this volume, we offer custom pricing with volume discounts.</p>
          <a href="mailto:hello@bluefox.email" class="enterprise-link">Contact sales</a>
        </div>
      </div>

      <div v-if="mode === 'occasional' || plan" class="comparison-card">
        <h4 class="comparison-title">Compare with competitors</h4>
        <div class="table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th scope="col">Provider</th>
                <th scope="col">{{ mode === 'monthly' ? 'Monthly cost' : 'Yearly cost' }}</th>
                <th scope="col">You save</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in rows" :key="c.name">
                <td><a :href="c.href">{{ c.name }}</a> {{ c.label }}</td>
                <td>{{ formatPrice(c.cost) }}</td>
                <td>{{ savings(c.cost) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul class="table-note">
        <li>Monthly list prices from each provider's pricing page, checked October 2026 (prices may vary by region), on the cheapest plan with automation, A/B testing, and advanced segmentation.<template v-if="mode === 'monthly'"> MailerSend has no plan with automation or segmentation, so its highest self-serve plan is shown.</template></li>
        <template v-if="mode === 'monthly'">
        <li>Estimated {{ formatNumber(emails / 5) }} contacts (assuming 5 marketing emails per contact per month)</li>
        </template>
        <template v-else>
        <li>Contact-based tools bill every month whether you send or not, so a year costs 12 × their monthly price. MailerSend bills per send, so it isn't compared here.</li>
        </template>
        <li>BlueFox has no contact limits and includes all features on every pack and plan</li>
        <li v-if="byo">BlueFox BYO SES includes platform fee + AWS SES costs ($0.10 per 1,000 emails)</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mode-toggle {
  display: flex;
  width: fit-content;
  margin: 0 auto 32px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.mode-toggle button {
  margin: 0 16px -1px;
  padding: 8px 2px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.mode-toggle button.active {
  border-bottom-color: var(--vp-c-brand);
  color: var(--vp-c-text-1);
}

.sends-select {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.sends-select select {
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 15px;
  cursor: pointer;
}
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
  position: relative;
  height: 20px;
  margin-top: 12px;
}

.slider-label {
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
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
