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
        The BlueFox platform is clear and easy to use. The editor is very user-friendly, and another major advantage is how quickly emails can be sent. The interface is simple, intuitive, and easy to follow, and it genuinely makes regular communication tasks easier.
      </p>

      <div class="proof-footer">
        <div class="proof-author">
          <v-avatar size="64" class="proof-avatar">
            <img src="/assets/testimonials/reka-magyaros.jpg" alt="Réka Magyaros" width="64" height="64" loading="lazy" decoding="async" />
          </v-avatar>
          <div class="proof-author-info">
            <p class="proof-author-name">
              Réka Magyaros
              <span class="proof-author-title">Public Relations Manager</span>
            </p>
            <p class="proof-author-faculty">Faculty of Information Technology and Bionics</p>
            <p class="proof-author-university">Pázmány Péter Catholic University</p>
          </div>
        </div>

        <div class="proof-divider" aria-hidden="true"></div>

        <img
          class="proof-logo"
          src="/assets/testimonials/ppke-logo.svg"
          alt="Pázmány Péter Catholic University logo"
          width="56"
          height="56"
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
  gap: 14px;
}

.proof-author-info { text-align: left; }

.proof-author-name {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .proof-author-name { color: #f1f5f9; }

.proof-author-title {
  margin-left: 6px;
  font-size: 13px;
  font-weight: 400;
  color: #475569;
}

html.dark .proof-author-title { color: #94a3b8; }

.proof-author-faculty,
.proof-author-university {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #475569;
}

html.dark .proof-author-faculty,
html.dark .proof-author-university { color: #94a3b8; }

.proof-divider {
  width: 1px;
  height: 48px;
  background: #e2e8f0;
}

html.dark .proof-divider { background: rgba(148, 163, 184, 0.3); }

.proof-logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

@media (max-width: 480px) {
  .proof-mark { font-size: 56px; }
  .proof-quote { font-size: 19px; }
  .proof-footer {
    flex-direction: column;
    gap: 16px;
  }
  .proof-author {
    flex-direction: column;
    gap: 10px;
  }
  .proof-author-name { text-align: center; }
  .proof-author-title {
    display: block;
    margin-left: 0;
  }
  .proof-author-faculty,
  .proof-author-university { text-align: center; }
  .proof-divider { display: none; }
}
</style>
