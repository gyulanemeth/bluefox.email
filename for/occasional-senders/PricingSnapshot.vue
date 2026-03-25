<script setup>
const scenarios = [
  {
    id: 'quarterly',
    label: 'Quarterly newsletter',
    sends: '4 campaigns/year',
    audienceSize: '2,500 contacts',
    totalEmails: '10,000 emails/year',
    bluefoxCost: '$50',
    bluefoxNote: '50K send pack, covers 5× this volume',
    typicalCost: '$240–$480',
    typicalNote: '$20–$40/month subscription × 12'
  },
  {
    id: 'monthly',
    label: 'Monthly announcement',
    sends: '12 campaigns/year',
    audienceSize: '1,800 contacts',
    totalEmails: '21,600 emails/year',
    bluefoxCost: '$50',
    bluefoxNote: '50K send pack, still has sends left over',
    typicalCost: '$240–$600',
    typicalNote: '$20–$50/month subscription × 12'
  },
  {
    id: 'launch',
    label: 'Product launch blasts',
    sends: '6 campaigns/year',
    audienceSize: '5,000 contacts',
    totalEmails: '30,000 emails/year',
    bluefoxCost: '$50',
    bluefoxNote: '50K send pack, 20K sends still available',
    typicalCost: '$300–$720',
    typicalNote: '$25–$60/month subscription × 12'
  }
]
</script>

<template>
  <section class="pricing-snapshot" aria-labelledby="pricing-snapshot-title">
    <div class="snapshot-head">
      <v-chip color="primary" class="snapshot-badge" aria-label="Pricing badge">
        <span class="text-overline">Honest Pricing</span>
      </v-chip>
      <h2 id="pricing-snapshot-title">Pay Only When You Send. Not Every Month.</h2>
      <p>Most email tools bill you monthly, whether you send or not. BlueFox Email uses send packs: buy once, valid for 12 months, and use them whenever you need to.</p>
    </div>

    <div class="comparison-grid">
      <div
        v-for="scenario in scenarios"
        :key="scenario.id"
        class="comparison-card"
      >
        <p class="scenario-label">{{ scenario.label }}</p>
        <div class="scenario-meta">
          <span class="meta-item">{{ scenario.sends }}</span>
          <span class="meta-dot" aria-hidden="true" />
          <span class="meta-item">{{ scenario.audienceSize }}</span>
          <span class="meta-dot" aria-hidden="true" />
          <span class="meta-item">{{ scenario.totalEmails }}</span>
        </div>

        <div class="cost-row">
          <div class="cost-block cost-block--typical">
            <span class="cost-type">Typical monthly platform</span>
            <span class="cost-amount">{{ scenario.typicalCost }}</span>
            <span class="cost-note">{{ scenario.typicalNote }}</span>
          </div>

          <div class="cost-vs" aria-hidden="true">vs</div>

          <div class="cost-block cost-block--bluefox">
            <span class="cost-type">BlueFox Email send pack</span>
            <span class="cost-amount">{{ scenario.bluefoxCost }}</span>
            <span class="cost-note">{{ scenario.bluefoxNote }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="free-sends-callout" role="note">
      <div class="callout-main">
        <strong>Start with 3,000 free sends.</strong>
        <span> No credit card. No subscription. Enough to run a small campaign or test everything before you buy.</span>
      </div>
      <a href="https://bluefox.email/pricing" class="pricing-link">
        See full pricing →
      </a>
    </div>
  </section>
</template>

<style scoped>
.pricing-snapshot {
  padding: 36px 24px;
}

.snapshot-head {
  margin-bottom: 28px;
}

.snapshot-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.snapshot-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.snapshot-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .snapshot-head p {
  color: #94a3b8;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 20px;
}

.comparison-card {
  border-radius: 18px;
  padding: 22px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06);
}

html.dark .comparison-card {
  background: rgba(30, 41, 59, 0.9);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.2);
}

.scenario-label {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .scenario-label {
  color: #f1f5f9;
}

.scenario-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
}

.meta-item {
  font-size: 12px;
  color: #64748b;
}

html.dark .meta-item {
  color: #94a3b8;
}

.meta-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #cbd5e1;
}

.cost-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cost-block {
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cost-block--typical {
  background: #f8fafc;
  border-radius: 10px;
}

html.dark .cost-block--typical {
  background: rgba(15, 23, 42, 0.4);
}

.cost-block--bluefox {
  background: #f0fdf4;
  border-radius: 10px;
}

html.dark .cost-block--bluefox {
  background: rgba(16, 185, 129, 0.08);
}

.cost-type {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
}

html.dark .cost-type {
  color: #94a3b8;
}

.cost-amount {
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
  color: #0f172a;
}

.cost-block--typical .cost-amount {
  color: #b91c1c;
}

html.dark .cost-block--typical .cost-amount {
  color: #f87171;
}

.cost-block--bluefox .cost-amount {
  color: #047857;
}

html.dark .cost-block--bluefox .cost-amount {
  color: #34d399;
}

.cost-note {
  font-size: 12px;
  line-height: 1.4;
  color: #475569;
}

html.dark .cost-note {
  color: #94a3b8;
}

.cost-vs {
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.free-sends-callout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: rgba(19, 176, 238, 0.06);
  border: 1px solid rgba(19, 176, 238, 0.2);
  border-radius: 10px;
  padding: 14px 18px;
  flex-wrap: wrap;
}

html.dark .free-sends-callout {
  background: rgba(19, 176, 238, 0.08);
  border-color: rgba(19, 176, 238, 0.25);
}

.callout-main {
  font-size: 14px;
  line-height: 1.55;
  color: #334155;
}

html.dark .callout-main {
  color: #cbd5e1;
}

.callout-main strong {
  color: #0f172a;
}

html.dark .callout-main strong {
  color: #f1f5f9;
}

.pricing-link {
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0369a1;
  text-decoration: none;
  white-space: nowrap;
}

.pricing-link:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}

html.dark .pricing-link {
  color: #67e8f9;
}

@media (max-width: 900px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  .pricing-snapshot {
    padding: 24px 16px;
  }

  .free-sends-callout {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
