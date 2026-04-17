<script setup>
const tiers = [
  { sends: '50K', price: '$50', perEmail: '$1.00 / 1K', label: 'Essential' },
  { sends: '500K', price: '$300', perEmail: '$0.60 / 1K', label: 'Premium' }
]
</script>

<template>
  <section class="agency-pricing" aria-labelledby="agency-pricing-title">
    <div class="pricing-head">
      <v-chip color="primary" class="pricing-badge">
        <span class="text-overline">Pricing</span>
      </v-chip>
      <h2 id="agency-pricing-title">One credit pool. Every client covered.</h2>
      <p>Pay per email sent, not per contact stored. Buy credits for your account, use them across every client project.</p>
    </div>

    <div class="tier-row">
      <div v-for="tier in tiers" :key="tier.sends" class="tier-card">
        <span class="tier-label">{{ tier.label }}</span>
        <span class="tier-price">{{ tier.price }}<span class="tier-vat"> + VAT</span></span>
        <span class="tier-sends">{{ tier.sends }} sends</span>
        <span class="tier-per">{{ tier.perEmail }}</span>
      </div>
    </div>

    <div class="pricing-footer">
      <span class="footer-lead"><strong>3,000 free sends to start.</strong> No card. Credits valid 12 months.</span>
      <div class="pricing-links">
        <a href="https://bluefox.email/pricing" class="pricing-link">Full pricing →</a>
        <a href="https://bluefox.email/byo-amazon-ses-pricing" class="pricing-link pricing-link--muted">BYO Amazon SES →</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.agency-pricing { padding: 36px 24px; }

.pricing-head { margin-bottom: 24px; }

.pricing-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.pricing-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.pricing-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .pricing-head p { color: #94a3b8; }

.tier-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.tier-card {
  background: #f8fafc;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

html.dark .tier-card { background: rgba(30, 41, 59, 0.6); }

.tier-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #13b0ee;
}

.tier-price {
  font-size: 28px;
  font-weight: 800;
  color: #047857;
  line-height: 1.2;
}

html.dark .tier-price { color: #34d399; }

.tier-vat {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
}

html.dark .tier-vat { color: #94a3b8; }

.tier-sends {
  font-size: 13px;
  font-weight: 700;
  color: #334155;
  margin-top: 2px;
}

html.dark .tier-sends { color: #cbd5e1; }

.tier-per {
  font-size: 12px;
  color: #64748b;
}

html.dark .tier-per { color: #94a3b8; }

.pricing-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;
}

html.dark .pricing-footer { border-top-color: #1e293b; }

.footer-lead {
  font-size: 14px;
  color: #475569;
}

html.dark .footer-lead { color: #94a3b8; }

.footer-lead strong {
  color: #0f172a;
  font-weight: 700;
}

html.dark .footer-lead strong { color: #f1f5f9; }

.pricing-links {
  display: flex;
  gap: 16px;
  flex-shrink: 0;
  flex-wrap: wrap;
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
  text-underline-offset: 2px;
}

html.dark .pricing-link { color: #67e8f9; }

.pricing-link--muted {
  color: #475569 !important;
  font-weight: 600 !important;
}

html.dark .pricing-link--muted { color: #94a3b8 !important; }

@media (max-width: 720px) {
  .agency-pricing { padding: 24px 16px; }
  .tier-row { grid-template-columns: 1fr; }
  .pricing-footer { flex-direction: column; align-items: flex-start; }
}
</style>
