<script setup>
const advantages = [
  {
    title: 'Account-wide credit pool',
    description: 'Buy credits once for your account. Use them across any client project. No separate billing per client.',
    icon: 'pool'
  },
  {
    title: 'Pay per send, not per contact',
    description: 'Client databases can grow freely. Your costs stay tied to send volume, not list size, so margins hold as you scale.',
    icon: 'send'
  },
  {
    title: 'Built for retainer models',
    description: 'Charge clients a retainer for email management and availability. Your send costs stay predictable while your service fee stays yours.',
    icon: 'retainer'
  }
]

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
      <p>Contact-based pricing punishes agencies that grow client lists. BlueFox Email charges per email sent. Buy credits for your account and use them across all your clients.</p>
    </div>

    <div class="advantages">
      <div v-for="adv in advantages" :key="adv.title" class="advantage-item">
        <div class="adv-icon" aria-hidden="true">
          <svg v-if="adv.icon === 'pool'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /></svg>
          <svg v-else-if="adv.icon === 'send'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
        </div>
        <div class="adv-text">
          <strong>{{ adv.title }}</strong>
          <p>{{ adv.description }}</p>
        </div>
      </div>
    </div>

    <div class="tier-row">
      <div v-for="tier in tiers" :key="tier.sends" class="tier-card">
        <span class="tier-label">{{ tier.label }}</span>
        <span class="tier-sends">{{ tier.sends }} sends</span>
        <span class="tier-price">{{ tier.price }}<span class="tier-vat"> + VAT</span></span>
        <span class="tier-per">{{ tier.perEmail }}</span>
      </div>
    </div>

    <div class="pricing-note" role="note">
      <div class="note-main">
        <strong>3,000 free sends to start.</strong>
        <span> No credit card required. Send packs are valid for 12 months from purchase. All features included in every pack.</span>
      </div>
      <div class="pricing-links">
        <a href="https://bluefox.email/pricing" class="pricing-link">See full pricing →</a>
        <a href="https://bluefox.email/byo-amazon-ses-pricing" class="pricing-link pricing-link--byo">BYO Amazon SES pricing →</a>
      </div>
    </div>

    <div class="byo-callout">
      <strong>Already using Amazon SES?</strong>
      <span> Connect your own AWS account for lower per-send rates, starting at $0.30 / 1K with the Premium pack.</span>
    </div>
  </section>
</template>

<style scoped>
.agency-pricing {
  padding: 36px 24px;
}

.pricing-head {
  margin-bottom: 28px;
}

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

/* Advantages */
.advantages {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 28px;
}

.advantage-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.adv-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(19, 176, 238, 0.1);
  color: #0369a1;
  display: flex;
  align-items: center;
  justify-content: center;
}

html.dark .adv-icon {
  background: rgba(19, 176, 238, 0.15);
  color: #67e8f9;
}

.adv-text strong {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

html.dark .adv-text strong { color: #f1f5f9; }

.adv-text p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #475569;
}

html.dark .adv-text p { color: #94a3b8; }

/* Tier row */
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
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

html.dark .tier-card {
  background: rgba(30, 41, 59, 0.6);
}

.tier-sends {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
}

html.dark .tier-sends { color: #94a3b8; }

.tier-price {
  font-size: 28px;
  font-weight: 800;
  color: #047857;
  line-height: 1.2;
}

html.dark .tier-price { color: #34d399; }

.tier-per {
  font-size: 12px;
  color: #475569;
}

.tier-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #13b0ee;
}

html.dark .tier-per { color: #94a3b8; }

.tier-vat {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
}

html.dark .tier-vat { color: #94a3b8; }

/* Note */
.pricing-note {
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

html.dark .pricing-note {
  background: rgba(19, 176, 238, 0.08);
  border-color: rgba(19, 176, 238, 0.25);
}

.note-main {
  font-size: 14px;
  line-height: 1.55;
  color: #334155;
}

html.dark .note-main { color: #cbd5e1; }

.note-main strong { color: #0f172a; }
html.dark .note-main strong { color: #f1f5f9; }

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

.pricing-links {
  display: flex;
  gap: 16px;
  flex-shrink: 0;
  flex-wrap: wrap;
}

html.dark .pricing-link { color: #67e8f9; }

.pricing-link--byo {
  color: #475569 !important;
  font-weight: 600 !important;
}

html.dark .pricing-link--byo { color: #94a3b8 !important; }

/* BYO callout */
.byo-callout {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
  padding: 12px 18px;
  background: #f8fafc;
  border-radius: 10px;
}

html.dark .byo-callout {
  background: rgba(30, 41, 59, 0.5);
  color: #94a3b8;
}

.byo-callout strong {
  color: #0f172a;
}

html.dark .byo-callout strong { color: #f1f5f9; }

@media (max-width: 860px) {
  .agency-pricing { padding: 24px 16px; }
  .tier-row { grid-template-columns: 1fr; }
  .pricing-note { flex-direction: column; }
}
</style>
