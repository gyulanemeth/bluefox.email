<script setup>
defineProps({
  isDark: { type: Boolean, default: false }
})

const testimonials = [
  {
    quote: 'BlueFox is a very flexible and versatile platform that can accomplish pretty much whatever you want to do. The modular format makes it easy to create mailings quickly on the same theme as previous announcements without having to recreate parts from scratch. Customer service is also very responsive and helpful.',
    name: 'Elizabeth "Leo" Rosenstein',
    title: 'Administrative Coordinator',
    department: 'Department of East Asian Languages and Civilizations (EALC)',
    university: 'Harvard University',
    avatar: '/assets/testimonials/leo-rosenstein.jpg',
    logo: {
      src: '/assets/testimonials/harvard-logo.svg',
      alt: 'Harvard University logo'
    }
  },
  {
    quote: "The BlueFox platform is clear and easy to use. The editor is very user-friendly, and another major advantage is how quickly emails can be sent. The interface is simple, intuitive, and easy to follow, and it genuinely makes regular communication tasks easier.",
    name: 'Réka Magyaros',
    title: 'Public Relations Manager',
    department: 'Faculty of Information Technology and Bionics',
    university: 'Pázmány Péter Catholic University',
    avatar: '/assets/testimonials/reka-magyaros.jpg',
    logo: {
      src: '/assets/testimonials/ppke-logo.svg',
      alt: 'Pázmány Péter Catholic University logo'
    }
  }
]
</script>

<template>
  <section class="proof-section" aria-labelledby="proof-title">
    <h2 id="proof-title" class="visually-hidden">Trusted by universities</h2>

    <div class="proof-list">
      <div v-for="testimonial in testimonials" :key="testimonial.name" class="proof-card">
        <span class="proof-mark" aria-hidden="true">&ldquo;</span>

        <p class="proof-quote">
          {{ testimonial.quote }}
        </p>

        <div class="proof-footer">
          <div class="proof-author">
            <v-avatar size="56" class="proof-avatar">
              <img :src="testimonial.avatar" :alt="testimonial.name" width="56" height="56" loading="lazy" decoding="async" />
            </v-avatar>
            <div class="proof-author-info">
              <p class="proof-author-name">
                {{ testimonial.name }}
                <span class="proof-author-title">{{ testimonial.title }}</span>
              </p>
              <p class="proof-author-faculty">{{ testimonial.department }}</p>
              <p class="proof-author-university">{{ testimonial.university }}</p>
            </div>
          </div>

          <img
            v-if="testimonial.logo"
            class="proof-logo"
            :src="testimonial.logo.src"
            :alt="testimonial.logo.alt"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
          />
        </div>
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

.proof-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.proof-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
}

html.dark .proof-card { background: rgba(30, 41, 59, 0.5); }

.proof-mark {
  display: block;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 40px;
  line-height: 1;
  color: #13b0ee;
  opacity: 0.5;
}

.proof-quote {
  margin: 4px 0 24px;
  font-size: 16px;
  line-height: 1.6;
  color: #0f172a;
}

html.dark .proof-quote { color: #f1f5f9; }

.proof-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

html.dark .proof-footer { border-top-color: rgba(148, 163, 184, 0.2); }

.proof-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.proof-author-info { text-align: left; }

.proof-author-name {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .proof-author-name { color: #f1f5f9; }

.proof-author-title {
  display: block;
  margin-top: 2px;
  font-size: 12.5px;
  font-weight: 400;
  color: #475569;
}

html.dark .proof-author-title { color: #94a3b8; }

.proof-author-faculty,
.proof-author-university {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.5;
  color: #475569;
}

html.dark .proof-author-faculty,
html.dark .proof-author-university { color: #94a3b8; }

.proof-logo {
  flex-shrink: 0;
  /* VitePress's default-theme `.vp-doc img` rule centers images with
     `margin: 0 auto`. It doesn't reach dev (route-based CSS chunking
     skips it for this `layout: home` page), but it's always present in
     the production bundle, so it must be overridden explicitly here. */
  margin: 0;
  width: 40px;
  height: 40px;
  object-fit: contain;
}

@media (max-width: 860px) {
  .proof-list {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .proof-card { padding: 22px; }
  .proof-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
