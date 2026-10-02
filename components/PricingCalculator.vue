<script setup>
import { ref, computed } from 'vue'
import { findPlan, findCheapestPacks, COMPETITORS, PRICE_STOPS } from './pricingData.js'

const props = defineProps({
  byo: { type: Boolean, default: false }
})

// BYO SES only: AWS charges $0.10 per 1,000 emails on top of the BlueFox price.
const AWS_PRICE_PER_EMAIL = 0.0001
const SENDS_PER_YEAR_OPTIONS = [1, 2, 3, 4, 6]

// 'monthly' = sends every month, 'occasional' = sends a few times a year
const mode = ref('monthly')
const stopIndex = ref(0)
const sendsPerYear = ref(4)

const stop = computed(() => {
  return PRICE_STOPS[stopIndex.value]
})

const sliderTitle = computed(() => {
  if (mode.value === 'monthly') {
    return 'How many emails do you send each month?'
  }
  return 'How many people do you email, and how often?'
})

const costColumnTitle = computed(() => {
  if (mode.value === 'monthly') {
    return 'Monthly cost'
  }
  return 'Yearly cost'
})

// The BlueFox result card. Null when no monthly plan is big enough (contact sales).
const summary = computed(() => {
  if (mode.value === 'monthly') {
    return getMonthlySummary()
  }
  return getOccasionalSummary()
})

const competitorRows = computed(() => {
  const rows = []

  for (const competitor of COMPETITORS) {
    let cost = stop.value[competitor.key]

    if (mode.value === 'occasional') {
      // Only contact-based tools charge every month whether you send or not.
      if (!competitor.billsPerContact) {
        continue
      }
      cost = cost * 12
    }

    rows.push({
      name: competitor.name,
      href: competitor.href,
      plan: getCompetitorPlan(competitor),
      cost: formatPrice(cost),
      savings: getSavings(cost)
    })
  }

  return rows
})

const notes = computed(() => {
  const list = [
    "Monthly list prices from each provider's pricing page, checked October 2026 (prices may vary by region), on the cheapest plan with automation, A/B testing, and advanced segmentation."
  ]

  if (mode.value === 'monthly') {
    list.push('MailerSend has no plan with automation or segmentation, so its highest self-serve plan is shown.')
    list.push(`Estimated ${formatNumber(stop.value.contacts)} contacts (assuming 5 marketing emails per contact per month).`)
  } else {
    list.push("Contact-based tools bill every month whether you send or not, so a year costs 12 × their monthly price. MailerSend bills per send, so it isn't compared here.")
  }

  list.push('BlueFox has no contact limits and includes all features on every pack and plan.')

  if (props.byo) {
    list.push('BlueFox BYO SES includes the platform fee plus AWS SES costs ($0.10 per 1,000 emails).')
  }

  return list
})

function getMonthlySummary () {
  const emails = stop.value.sends
  const plan = findPlan(emails, props.byo)

  if (plan === null) {
    return null
  }

  const awsCost = getAwsCost(emails)
  const total = plan.price + awsCost
  const details = []

  if (props.byo) {
    details.push({ label: 'Platform fee', value: formatPrice(plan.price) })
    details.push({ label: 'AWS SES fee', value: formatPrice(awsCost) })
  }
  details.push({ label: 'Plan', value: plan.name })
  details.push({ label: 'Includes', value: `${formatNumber(plan.sends)} sends / month` })
  details.push({ label: 'Cost per 1,000 sends', value: formatPrice(total / emails * 1000) })

  return {
    title: `${formatNumber(emails)} emails a month at BlueFox Email`,
    total,
    period: 'month',
    details,
    note: 'Fresh sending allowance every billing cycle. All features included.'
  }
}

function getOccasionalSummary () {
  const contacts = stop.value.contacts
  const yearlySends = contacts * sendsPerYear.value
  const packs = findCheapestPacks(yearlySends, props.byo)
  const awsCost = getAwsCost(yearlySends)
  const total = packs.price + awsCost

  // The same sending on a monthly plan: a plan big enough to email every contact once a month, for 12 months.
  const plan = findPlan(contacts, props.byo)
  const yearlyOnPlan = plan.price * 12 + awsCost

  const details = []

  if (props.byo) {
    details.push({ label: 'Platform fee', value: formatPrice(packs.price) })
    details.push({ label: 'AWS SES fee', value: formatPrice(awsCost) })
  }
  details.push({ label: 'One-time packs', value: getPacksLabel(packs) })
  details.push({ label: 'Includes', value: `${formatNumber(packs.sends)} sends, valid 12 months` })
  details.push({ label: 'On a monthly plan instead', value: `${formatPrice(yearlyOnPlan)} / year` })

  return {
    title: `${formatNumber(contacts)} contacts × ${sendsPerYear.value} = ${formatNumber(yearlySends)} emails a year`,
    total,
    period: 'year',
    details,
    note: 'BlueFox charges only for emails sent, never for contacts. Packs are a one-time purchase, no subscription. All features included.'
  }
}

function getAwsCost (emails) {
  if (!props.byo) {
    return 0
  }
  return emails * AWS_PRICE_PER_EMAIL
}

function getPacksLabel (packs) {
  const parts = []

  if (packs.premium > 0) {
    parts.push(`${packs.premium}× Premium`)
  }
  if (packs.essential > 0) {
    parts.push(`${packs.essential}× Essential`)
  }

  return parts.join(' + ')
}

function getCompetitorPlan (competitor) {
  // Mailchimp Standard stores up to 100,000 contacts; above that it's Premium.
  if (competitor.key === 'mailchimp' && stop.value.contacts > 100000) {
    return 'Premium'
  }
  return competitor.plan
}

function getSavings (competitorCost) {
  const saved = (competitorCost - summary.value.total) / competitorCost
  return `${Math.round(saved * 100)}%`
}

function getSliderLabel (priceStop) {
  if (mode.value === 'monthly') {
    return formatCompact(priceStop.sends)
  }
  return formatCompact(priceStop.contacts)
}

// Centres each label on its stop: the 22px thumb's centre moves from 11px to (width - 11px).
function getLabelPosition (index) {
  const fraction = index / (PRICE_STOPS.length - 1)
  return `calc(11px + (100% - 22px) * ${fraction})`
}

function formatNumber (number) {
  return number.toLocaleString('en-US')
}

function formatCompact (number) {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(number)
}

function formatPrice (price) {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
</script>

<template>
  <div class="pricing-calculator">
    <div class="mode-toggle" role="group" aria-label="How often do you send?">
      <button
        type="button"
        :class="{ active: mode === 'monthly' }"
        :aria-pressed="mode === 'monthly'"
        @click="mode = 'monthly'"
      >
        I send every month
      </button>
      <button
        type="button"
        :class="{ active: mode === 'occasional' }"
        :aria-pressed="mode === 'occasional'"
        @click="mode = 'occasional'"
      >
        I send a few times a year
      </button>
    </div>

    <div class="slider-section">
      <h3 class="slider-title">{{ sliderTitle }}</h3>
      <div class="slider-wrapper">
        <input
          v-model.number="stopIndex"
          type="range"
          min="0"
          :max="PRICE_STOPS.length - 1"
          class="email-slider"
          :aria-label="sliderTitle"
        />
        <div class="slider-labels">
          <span
            v-for="(priceStop, index) in PRICE_STOPS"
            :key="priceStop.sends"
            class="slider-label"
            :class="{ active: index === stopIndex }"
            :style="{ left: getLabelPosition(index) }"
          >
            {{ getSliderLabel(priceStop) }}
          </span>
        </div>
        <label v-if="mode === 'occasional'" class="sends-select">
          Emails to every contact per year
          <select v-model.number="sendsPerYear">
            <option v-for="option in SENDS_PER_YEAR_OPTIONS" :key="option" :value="option">
              {{ option }}×
            </option>
          </select>
        </label>
      </div>
    </div>

    <div v-if="summary" class="results-grid">
      <div class="pack-card">
        <div class="pack-header">
          {{ summary.title }}<span v-if="byo"> (BYO SES)</span>
        </div>
        <div class="actual-price">
          {{ formatPrice(summary.total) }}<span class="per-month">/ {{ summary.period }}</span>
        </div>

        <div v-for="detail in summary.details" :key="detail.label" class="info-row">
          <span class="info-label">{{ detail.label }}</span>
          <span class="info-value">{{ detail.value }}</span>
        </div>

        <p class="remaining-note">{{ summary.note }}</p>
      </div>

      <div class="comparison-card">
        <h4 class="comparison-title">Compare with competitors</h4>
        <div class="table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th scope="col">Provider</th>
                <th scope="col">{{ costColumnTitle }}</th>
                <th scope="col">You save</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in competitorRows" :key="row.name">
                <td><a :href="row.href">{{ row.name }}</a> {{ row.plan }}</td>
                <td>{{ row.cost }}</td>
                <td>{{ row.savings }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul class="table-note">
          <li v-for="note in notes" :key="note">{{ note }}</li>
        </ul>
      </div>
    </div>

    <div v-else class="results-grid full-width">
      <div class="pack-card">
        <div class="enterprise-content">
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
