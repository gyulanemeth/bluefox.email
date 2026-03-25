<script setup>
const modes = [
  {
    id: 'sandbox',
    label: 'Sandbox Mode',
    badge: 'Default',
    accent: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.1)',
    headline: 'Start sending in minutes',
    description: 'Every new project begins in sandbox mode. No AWS setup, no domain verification required to start.',
    points: [
      'Send to up to 5 verified addresses',
      '100 emails per day',
      'From bluefoxemailsandbox.com domain',
      'Ideal for testing and development',
    ],
    cta: null
  },
  {
    id: 'production',
    label: 'Production Mode',
    badge: 'Most Common',
    accent: '#13b0ee',
    accentBg: 'rgba(19, 176, 238, 0.1)',
    headline: 'Unrestricted sending, managed infrastructure',
    description: 'Verify your domain, request production access, and send to any address at full volume using BlueFox Email\'s infrastructure.',
    points: [
      'Send to any address, no volume limits',
      'Your own verified sender domain',
      'Bounce and complaint rate monitoring',
      'Higher throughput for production sends',
    ],
    cta: { text: 'How to request access', href: '/docs/projects/delivery-modes#production-mode' }
  },
  {
    id: 'aws',
    label: 'AWS SES',
    badge: 'Bring Your Own',
    accent: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.1)',
    headline: 'Connect your own AWS SES account',
    description: 'Already using AWS SES? Plug in your credentials and use BlueFox Email\'s templates, automations, and analytics on top of your own infrastructure.',
    points: [
      'Full control over sending limits',
      'STS temporary credentials supported',
      'Bounce and complaint webhooks via SNS',
      'Switch at any time without data loss',
    ],
    cta: { text: 'AWS SES setup guide', href: '/docs/projects/delivery-modes#using-aws-ses-directly' }
  }
]
</script>

<template>
  <section class="delivery-modes" aria-labelledby="delivery-modes-title">
    <div class="modes-head">
      <v-chip color="primary" class="modes-badge">
        <span class="text-overline">Delivery Modes</span>
      </v-chip>
      <h2 id="delivery-modes-title">Start Instantly. Scale When You're Ready.</h2>
      <p>Every project begins in sandbox mode with no setup required. Upgrade to production or connect your own AWS SES whenever you need more.</p>
    </div>

    <div class="modes-grid">
      <div
        v-for="(mode, index) in modes"
        :key="mode.id"
        class="mode-card"
        :class="{ 'mode-card--highlight': mode.id === 'production' }"
      >
        <div class="mode-card-top">
          <div class="mode-label-row">
            <span class="mode-label">{{ mode.label }}</span>
            <span class="mode-badge" :style="{ background: mode.accentBg, color: mode.accent }">{{ mode.badge }}</span>
          </div>
          <h3 class="mode-headline">{{ mode.headline }}</h3>
          <p class="mode-desc">{{ mode.description }}</p>
        </div>

        <ul class="mode-points" role="list">
          <li v-for="point in mode.points" :key="point" class="mode-point" role="listitem">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" :stroke="mode.accent" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
            <span>{{ point }}</span>
          </li>
        </ul>

        <a v-if="mode.cta" :href="mode.cta.href" class="mode-cta-link">
          {{ mode.cta.text }}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </a>

        <div v-if="index < modes.length - 1" class="mode-arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
        </div>
      </div>
    </div>

    <div class="modes-note" role="note">
      Every project starts in sandbox mode. To send without restrictions, request production access after verifying your domain, or connect your own AWS SES account if you already have one set up.
    </div>
  </section>
</template>

<style scoped>
.delivery-modes { padding: 36px 24px; }

.modes-head { margin-bottom: 32px; }

.modes-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.modes-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.modes-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .modes-head p { color: #94a3b8; }

.modes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: start;
}

.mode-card {
  position: relative;
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mode-card--highlight {
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(19,176,238,0.1);
  border: 1px solid rgba(19,176,238,0.2);
}

html.dark .mode-card { background: rgba(30, 41, 59, 0.5); }

html.dark .mode-card--highlight {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(19, 176, 238, 0.3);
  box-shadow: 0 1px 3px rgba(0,0,0,0.2), 0 8px 24px rgba(19,176,238,0.1);
}

.mode-label-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.mode-label {
  font-size: 13px;
  font-weight: 800;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

html.dark .mode-label { color: #f1f5f9; }

.mode-badge {
  font-size: 10px;
  font-weight: 700;
  border-radius: 999px;
  padding: 2px 8px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.mode-headline {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
  border-top: 0 !important;
  padding-top: 0 !important;
}

html.dark .mode-headline { color: #f1f5f9; }

.mode-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #475569;
}

html.dark .mode-desc { color: #94a3b8; }

.mode-points {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mode-point {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #334155;
  line-height: 1.45;
}

.mode-point svg { flex-shrink: 0; margin-top: 1px; }

html.dark .mode-point { color: #cbd5e1; }

.mode-cta-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #0369a1;
  text-decoration: none;
  margin-top: auto;
  transition: gap 0.15s ease;
}

.mode-cta-link:hover { gap: 8px; text-decoration: underline; text-underline-offset: 2px; }

html.dark .mode-cta-link { color: #67e8f9; }

.mode-arrow {
  display: none;
}

.modes-note {
  margin-top: 20px;
  font-size: 13px;
  color: #64748b;
  line-height: 1.55;
  padding: 14px 18px;
  background: #f8fafc;
  border-radius: 10px;
}

html.dark .modes-note {
  background: rgba(30, 41, 59, 0.5);
  color: #94a3b8;
}

@media (max-width: 860px) {
  .delivery-modes { padding: 24px 0; }

  .modes-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .mode-arrow {
    display: flex;
    justify-content: center;
    color: #94a3b8;
  }
}
</style>
