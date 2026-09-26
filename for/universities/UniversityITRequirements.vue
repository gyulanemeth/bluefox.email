<script setup>
const requirements = [
  {
    title: 'Dedicated sending IP',
    description: 'A fixed IP your IT team can monitor and allowlist in institutional mail filters.'
  },
  {
    title: 'Your own Amazon SES account',
    description: 'Send through your university’s own Amazon SES account for full control over infrastructure and reputation.'
  },
  {
    title: 'Email authentication',
    description: 'SPF, DKIM, and DMARC alignment, so receiving servers can verify every message.'
  },
  {
    title: 'Bounce and complaint handling',
    description: 'Bounces, complaints, and suppression lists are managed for you to protect your sending reputation.'
  }
]
</script>

<template>
  <section class="it-section" aria-labelledby="it-title">
    <div class="it-head">
      <h2 id="it-title">Ready for your IT team</h2>
      <p>Start with one communications team, and add stricter controls when IT gets involved.</p>
    </div>

    <ul class="it-grid" role="list">
      <li v-for="item in requirements" :key="item.title" class="it-card">
        <p class="it-card-title">{{ item.title }}</p>
        <p class="it-card-desc">{{ item.description }}</p>
      </li>
    </ul>

    <p class="it-foot">BlueFox Email is GDPR compliant. Any AWS credentials or webhook secrets you connect are encrypted.</p>
  </section>
</template>

<style scoped>
.it-section { padding: 0; }

.it-head {
  max-width: 720px;
  margin: 0 auto 28px;
  text-align: center;
}

.it-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.it-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
}

html.dark .it-head p { color: #94a3b8; }

.it-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.it-card {
  /* the global `li + li` rule would otherwise nudge cards down 8px */
  margin-top: 0;
  background: #eef8fd;
  border-radius: 4px;
  padding: 28px 24px;
  text-align: center;
}

html.dark .it-card { background: #0c1e2d; }

.it-card-title {
  margin: 0 0 8px;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
}

html.dark .it-card-title { color: #f1f5f9; }

.it-card-desc {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #475569;
}

html.dark .it-card-desc { color: #94a3b8; }

.it-foot {
  margin: 24px auto 0;
  max-width: 720px;
  text-align: center;
  font-size: 15px;
  line-height: 1.6;
  color: #475569;
}

html.dark .it-foot { color: #94a3b8; }

@media (max-width: 720px) {
  .it-grid { grid-template-columns: 1fr; }
}
</style>
