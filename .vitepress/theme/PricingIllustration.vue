<script setup>
const included = [
  'Every feature on every plan',
  'No tiers, no feature paywalls',
  'No contact-based billing',
  'Credits valid for 12 months',
  'No credit card to start',
  'No subscription, ever'
]
</script>

<template>
  <section class="pricing-illus" aria-labelledby="pricing-illus-title">
    <div class="illus-head">
      <v-chip color="primary" class="illus-badge" aria-label="Pricing badge">
        <span class="text-overline">Honest pricing</span>
      </v-chip>
      <h2 id="pricing-illus-title">Pay only for what you send.</h2>
      <p>No monthly subscription. No contact-based billing. No features locked behind tiers. Buy a send pack when you need it, that's it.</p>
    </div>

    <div class="compare">
      <div class="compare-col compare-col--typical">
        <span class="col-label">Typical email tools</span>
        <span class="col-price">
          <span class="amount">$200+</span>
          <span class="period">per month</span>
        </span>
        <span class="col-sub">Subscriptions billed monthly, with features locked behind tiers.</span>
      </div>

      <div class="compare-rule" aria-hidden="true"></div>

      <div class="compare-col compare-col--ours">
        <span class="col-label">BlueFox send pack</span>
        <span class="col-price">
          <span class="amount">$50</span>
          <span class="period">one-time</span>
        </span>
        <span class="col-sub">50,000 sends. Every feature. Credits valid 12 months.</span>
      </div>
    </div>

    <div class="included">
      <p class="included-title">Always included, every plan, every send pack:</p>
      <ul class="included-list">
        <li v-for="item in included" :key="item">
          <span class="tick" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </span>
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="cta-row">
      <v-btn
        size="x-large"
        color="primary"
        variant="flat"
        class="illus-cta"
        href="https://app.bluefox.email/accounts/create-account"
        target="_blank"
      >
        <strong>Start with 3,000 free sends</strong>
      </v-btn>
      <span class="cta-sub">No credit card. No subscription. No surprises.</span>
      <a href="/pricing" class="pricing-link">See full pricing →</a>
    </div>
  </section>
</template>

<style scoped>
.pricing-illus {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 8px 16px;
  text-align: center;
  overflow: hidden;
}

.illus-head {
  margin: 0 auto 32px;
  max-width: 680px;
  position: relative;
  z-index: 1;
}

.illus-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.illus-head h2 {
  margin: 0 0 12px;
  font-size: clamp(26px, 3.4vw, 38px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
  font-weight: 800;
  background: linear-gradient(120deg, #392C91 30%, #13B0EE 70%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.illus-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
}

html.dark .illus-head p { color: #94a3b8; }

/* Compare row — mirrors PricingSnapshot pattern */
.compare {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: stretch;
  gap: 32px;
  max-width: 820px;
  margin: 0 auto 32px;
  padding: 24px 8px;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  position: relative;
  z-index: 1;
  text-align: left;
}

html.dark .compare {
  border-top-color: #1e293b;
  border-bottom-color: #1e293b;
}

.compare-rule {
  width: 1px;
  background: #e2e8f0;
}

html.dark .compare-rule { background: #1e293b; }

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
  color: #475569;
}

html.dark .col-label { color: #cbd5e1; }

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
  color: #475569;
}

html.dark .period { color: #cbd5e1; }

.compare-col--typical .amount {
  color: #64748b;
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: rgba(185, 28, 28, 0.55);
}

html.dark .compare-col--typical .amount {
  color: #94a3b8;
  text-decoration-color: rgba(248, 113, 113, 0.55);
}

.compare-col--ours .amount { color: #0f172a; }
html.dark .compare-col--ours .amount { color: #f1f5f9; }

.col-sub {
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

html.dark .col-sub { color: #94a3b8; }

/* Included list */
.included {
  margin: 0 auto 32px;
  max-width: 720px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.06), rgba(57, 44, 145, 0.06));
  border-radius: 16px;
  border: 1px solid rgba(19, 176, 238, 0.18);
  position: relative;
  z-index: 1;
}

html.dark .included {
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.1), rgba(57, 44, 145, 0.1));
  border-color: rgba(19, 176, 238, 0.25);
}

.included-title {
  margin: 0 0 14px;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
}

html.dark .included-title { color: #f1f5f9; }

.included-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 24px;
  text-align: left;
}

.included-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #334155;
  line-height: 1.4;
}

html.dark .included-list li { color: #cbd5e1; }

.tick {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.15);
  color: #047857;
  border-radius: 50%;
}

html.dark .tick { background: rgba(16, 185, 129, 0.22); color: #6ee7b7; }

/* CTA */
.cta-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1;
}

.illus-cta {
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-radius: 4px !important;
  min-height: 56px !important;
  padding: 0 32px !important;
  font-size: 16px !important;
  box-shadow: 0 8px 24px rgba(19, 176, 238, 0.28) !important;
  text-decoration: none !important;
}

.illus-cta :deep(.v-btn__content),
.illus-cta strong {
  text-decoration: none !important;
}

.illus-cta strong { line-height: 1.2; }

.cta-sub {
  font-size: 14px;
  color: #475569;
}

html.dark .cta-sub { color: #94a3b8; }

.pricing-link,
.pricing-link:hover,
.pricing-link:focus,
.pricing-link:visited {
  font-size: 14px;
  font-weight: 700;
  color: #0369a1;
  text-decoration: none;
  margin-top: 4px;
}

.pricing-link:hover { text-decoration: underline; text-underline-offset: 3px; }

html.dark .pricing-link,
html.dark .pricing-link:hover,
html.dark .pricing-link:visited { color: #67e8f9; }

@media (max-width: 720px) {
  .compare { grid-template-columns: 1fr; gap: 20px; }
  .compare-rule { width: 100%; height: 1px; }
  .included-list { grid-template-columns: 1fr; }
}
</style>
