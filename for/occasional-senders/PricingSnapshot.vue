<script setup>
const coverage = [
  { use: 'Quarterly newsletter', detail: '4 sends a year to ~2,500 contacts' },
  { use: 'Monthly update', detail: '12 sends a year to ~1,800 contacts' },
  { use: 'Product launches', detail: '6 sends a year to ~5,000 contacts' }
]
</script>

<template>
  <section class="pricing-snapshot" aria-labelledby="pricing-snapshot-title">
    <div class="snapshot-head">
      <v-chip color="primary" class="snapshot-badge" aria-label="Pricing badge">
        <span class="text-overline">Honest Pricing</span>
      </v-chip>
      <h2 id="pricing-snapshot-title">Pay when you send. Not every month.</h2>
      <p>Most email tools charge a monthly subscription whether you send or not. We sell send packs. Buy once, use whenever, valid for 12 months.</p>
    </div>

    <div class="compare">
      <div class="compare-col compare-col--typical">
        <span class="col-label">Subscription tools</span>
        <span class="col-price">
          <span class="amount">$240 – $720</span>
          <span class="period">per year</span>
        </span>
        <span class="col-sub">Paid monthly whether you send or not.</span>
      </div>

      <div class="compare-rule" aria-hidden="true"></div>

      <div class="compare-col compare-col--ours">
        <span class="col-label">BlueFox send pack</span>
        <span class="col-price">
          <span class="amount">$50</span>
          <span class="period">once</span>
        </span>
        <span class="col-sub">50,000 sends. Valid for 12 months.</span>
      </div>
    </div>

    <div class="coverage">
      <p class="coverage-title">One $50 pack typically covers a full year of:</p>
      <ul class="coverage-list">
        <li v-for="item in coverage" :key="item.use">
          <span class="tick" aria-hidden="true">✓</span>
          <span><strong>{{ item.use }}</strong> — {{ item.detail }}</span>
        </li>
      </ul>
    </div>

    <div class="footer-row">
      <span class="footer-lead">Start with 3,000 free sends. No card, no subscription.</span>
      <a href="https://bluefox.email/pricing" class="pricing-link">See full pricing →</a>
    </div>
  </section>
</template>

<style scoped>
.pricing-snapshot {
  padding: 36px 24px;
}

.snapshot-head {
  margin-bottom: 32px;
  max-width: 680px;
}

.snapshot-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.snapshot-head h2 {
  margin: 0 0 10px;
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.snapshot-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
}

html.dark .snapshot-head p {
  color: #94a3b8;
}

.compare {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: stretch;
  gap: 32px;
  padding: 24px 8px;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

html.dark .compare {
  border-top-color: #1e293b;
  border-bottom-color: #1e293b;
}

.compare-rule {
  width: 1px;
  background: #e2e8f0;
}

html.dark .compare-rule {
  background: #1e293b;
}

.compare-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.col-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}

html.dark .col-label {
  color: #94a3b8;
}

.col-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 2px 0 4px;
}

.amount {
  font-size: clamp(26px, 3.4vw, 36px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.015em;
}

.period {
  font-size: 14px;
  color: #64748b;
}

html.dark .period {
  color: #94a3b8;
}

.compare-col--typical .amount {
  color: #94a3b8;
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: rgba(185, 28, 28, 0.55);
}

html.dark .compare-col--typical .amount {
  color: #64748b;
  text-decoration-color: rgba(248, 113, 113, 0.55);
}

.compare-col--ours .amount {
  color: #0f172a;
}

html.dark .compare-col--ours .amount {
  color: #f1f5f9;
}

.col-sub {
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

html.dark .col-sub {
  color: #94a3b8;
}

.coverage {
  margin: 28px 0 24px;
}

.coverage-title {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .coverage-title {
  color: #f1f5f9;
}

.coverage-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.coverage-list li {
  display: flex;
  gap: 10px;
  font-size: 15px;
  line-height: 1.55;
  color: #334155;
}

html.dark .coverage-list li {
  color: #cbd5e1;
}

.coverage-list strong {
  color: #0f172a;
  font-weight: 700;
}

html.dark .coverage-list strong {
  color: #f1f5f9;
}

.tick {
  flex-shrink: 0;
  color: #10b981;
  font-weight: 700;
}

.footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;
}

html.dark .footer-row {
  border-top-color: #1e293b;
}

.footer-lead {
  font-size: 14px;
  color: #475569;
}

html.dark .footer-lead {
  color: #94a3b8;
}

.pricing-link {
  font-size: 14px;
  font-weight: 700;
  color: #0369a1;
  text-decoration: none;
  white-space: nowrap;
}

.pricing-link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

html.dark .pricing-link {
  color: #67e8f9;
}

@media (max-width: 720px) {
  .compare {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .compare-rule {
    width: 100%;
    height: 1px;
  }
}

@media (max-width: 860px) {
  .pricing-snapshot {
    padding: 24px 16px;
  }

  .footer-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
