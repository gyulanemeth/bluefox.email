<script setup>
const requirements = [
  {
    title: 'Dedicated sending IP',
    description: 'Available when your institution needs it: a stable sending IP your IT team can identify, monitor and allowlist against strict institutional or enterprise mail filters.'
  },
  {
    title: 'Your own Amazon SES account',
    description: 'Use BlueFox with your university’s own Amazon SES account when you need more control over sending infrastructure and reputation.'
  },
  {
    title: 'Email authentication',
    description: 'Send with SPF, DKIM and DMARC-aligned authentication in place, so receiving mail servers can verify every message.'
  },
  {
    title: 'Deliverability controls',
    description: 'Bounces, complaints and suppression lists are handled for you, to help protect your sending reputation.'
  }
]
</script>

<template>
  <section class="it-section" aria-labelledby="it-title">
    <h2 id="it-title" class="section-title">Ready for your IT team</h2>
    <p class="section-subtitle constrained">BlueFox can start with one communications team and support stricter institutional requirements when IT gets involved.</p>

    <ul class="it-grid" role="list">
      <li v-for="item in requirements" :key="item.title" class="it-card">
        <div class="it-card-dot" aria-hidden="true"></div>
        <div>
          <p class="it-card-title">{{ item.title }}</p>
          <p class="it-card-desc">{{ item.description }}</p>
        </div>
      </li>
    </ul>

    <p class="section-subtitle section-subtitle--second constrained">BlueFox Email is GDPR compliant, and any AWS credentials or webhook secrets you connect are encrypted.</p>
  </section>
</template>

<style scoped>
.it-section { padding: 0; }

.section-title {
  margin: 0 0 12px;
  max-width: 900px;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.2;
  text-align: left;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.section-subtitle {
  margin: 0;
  font-size: 17px;
  line-height: 1.65;
  color: #4b5563;
  text-align: left;
}

html.dark .section-subtitle { color: #9ca3af; }

.constrained { max-width: 760px; }

.it-grid {
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.it-card {
  margin-top: 0;
  background: #f8fafc;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

html.dark .it-card { background: rgba(30, 41, 59, 0.5); }

.it-card-dot {
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  margin-top: 6px;
  border-radius: 50%;
  background: #13b0ee;
}

.it-card-title {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
}

html.dark .it-card-title { color: #f1f5f9; }

.it-card-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: #475569;
}

html.dark .it-card-desc { color: #94a3b8; }

.section-subtitle--second { margin-top: 20px; }

@media (max-width: 620px) {
  .it-grid { grid-template-columns: 1fr; }
}
</style>
