<script setup>
const packs = [
  {
    name: 'Free',
    price: '$0',
    note: 'Forever',
    detail: '3,000 sends included',
    highlight: false,
    accent: '#10b981'
  },
  {
    name: 'Starter pack',
    price: '$50',
    note: 'one-time',
    detail: '50,000 sends',
    highlight: true,
    accent: '#13B0EE'
  },
  {
    name: 'Scale pack',
    price: '$300',
    note: 'one-time',
    detail: '$0.60 per 1,000 sends',
    highlight: false,
    accent: '#392C91'
  }
]

const included = [
  'Every feature on every plan',
  'No tiers, no feature paywalls',
  'No contact-based billing',
  'Credits valid for 12 months',
  'Cancel anytime, no contract',
  'No credit card to start'
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

    <div class="packs-row">
      <div
        v-for="p in packs"
        :key="p.name"
        class="pack-card"
        :class="{ 'pack-card--featured': p.highlight }"
        :style="{ '--pack-accent': p.accent }"
      >
        <span v-if="p.highlight" class="pack-ribbon">Most popular</span>
        <span class="pack-name">{{ p.name }}</span>
        <div class="pack-price">
          <span class="pack-amount">{{ p.price }}</span>
          <span class="pack-note">{{ p.note }}</span>
        </div>
        <span class="pack-detail">{{ p.detail }}</span>
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
        aria-label="Create your free BlueFox Email account"
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

/* Pack cards */
.packs-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 0 auto 32px;
  max-width: 820px;
  position: relative;
  z-index: 1;
}

.pack-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 22px 18px;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

html.dark .pack-card {
  background: rgba(30, 41, 59, 0.85);
  border-color: rgba(148, 163, 184, 0.18);
}

.pack-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
  border-color: var(--pack-accent);
}

.pack-card--featured {
  border-color: var(--pack-accent);
  border-width: 2px;
  box-shadow: 0 12px 36px rgba(19, 176, 238, 0.18);
  transform: translateY(-6px);
}

html.dark .pack-card--featured {
  box-shadow: 0 12px 36px rgba(19, 176, 238, 0.28);
}

.pack-ribbon {
  position: absolute;
  top: -11px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 12px;
  background: var(--pack-accent);
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 999px;
  white-space: nowrap;
}

.pack-name {
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

html.dark .pack-name { color: #94a3b8; }

.pack-price {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.pack-amount {
  font-size: clamp(28px, 3.6vw, 36px);
  font-weight: 800;
  color: var(--pack-accent);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.pack-note {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}

html.dark .pack-note { color: #94a3b8; }

.pack-detail {
  font-size: 13px;
  color: #475569;
  line-height: 1.4;
}

html.dark .pack-detail { color: #cbd5e1; }

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
  border-radius: 12px !important;
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
  .packs-row { grid-template-columns: 1fr; gap: 12px; max-width: 380px; }
  .pack-card--featured { transform: none; }
  .included-list { grid-template-columns: 1fr; }
}
</style>
