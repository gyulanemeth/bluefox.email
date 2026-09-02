<script setup>
defineProps({
  isDark: { type: Boolean, default: false }
})
</script>

<template>
  <section class="proof-section" aria-labelledby="proof-title">
    <h2 id="proof-title" class="visually-hidden">Trusted by universities</h2>

    <div class="proof-inner">
      <span class="proof-mark" aria-hidden="true">&ldquo;</span>

      <p class="proof-quote">
        Testimonial quote goes here.
      </p>

      <div class="proof-footer">
        <div class="proof-author">
          <v-avatar size="44" class="proof-avatar" color="grey-lighten-2">
            <v-icon size="26" color="white">mdi-account</v-icon>
          </v-avatar>
          <div class="proof-author-info">
            <p class="proof-author-name">Author name</p>
            <p class="proof-author-role">Role, Pázmány Péter Catholic University</p>
          </div>
        </div>

        <div class="proof-divider" aria-hidden="true"></div>

        <img
          class="proof-logo"
          src="/assets/testimonials/ppke-logo.svg"
          alt="Pázmány Péter Catholic University logo"
          width="48"
          height="48"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  border: 0;
  padding: 0;
  margin: -1px;
}

.proof-section { padding: 0; }

.proof-inner {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.proof-mark {
  display: block;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 72px;
  line-height: 1;
  color: #13b0ee;
  opacity: 0.5;
}

.proof-quote {
  margin: -8px 0 28px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: #0f172a;
}

html.dark .proof-quote { color: #f1f5f9; }

.proof-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.proof-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.proof-author-info { text-align: left; }

.proof-author-name {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .proof-author-name { color: #f1f5f9; }

.proof-author-role {
  margin: 0;
  font-size: 13px;
  color: #475569;
}

html.dark .proof-author-role { color: #94a3b8; }

.proof-divider {
  width: 1px;
  height: 36px;
  background: #e2e8f0;
}

html.dark .proof-divider { background: rgba(148, 163, 184, 0.3); }

.proof-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

@media (max-width: 480px) {
  .proof-mark { font-size: 56px; }
  .proof-quote { font-size: 19px; }
  .proof-footer {
    flex-direction: column;
    gap: 16px;
  }
  .proof-divider { display: none; }
}
</style>
