<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

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

// One card at a time. Every card stays in the DOM, stacked in one grid cell,
// so the hero keeps the tallest card's height and never jumps on a switch.
const ROTATE_MS = 8000
const active = ref(0)
const paused = ref(false)
let timer = null

function show(index) {
  active.value = index
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    if (!paused.value) active.value = (active.value + 1) % testimonials.length
  }, ROTATE_MS)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section class="proof-section" aria-labelledby="proof-title">
    <h2 id="proof-title" class="visually-hidden">What university teams say</h2>

    <div
      class="proof-list"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
      @focusin="paused = true"
      @focusout="paused = false"
    >
      <div
        v-for="(testimonial, i) in testimonials"
        :key="testimonial.name"
        class="proof-card"
        :class="{ 'proof-card--active': i === active }"
        :aria-hidden="i !== active"
      >
        <p class="proof-quote">
          {{ testimonial.quote }}
        </p>

        <div class="proof-footer">
          <div class="proof-author">
            <v-avatar size="48" class="proof-avatar">
              <img :src="testimonial.avatar" :alt="testimonial.name" width="48" height="48" decoding="async" />
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
            decoding="async"
          />
        </div>
      </div>
    </div>

    <div class="proof-dots">
      <button
        v-for="(testimonial, i) in testimonials"
        :key="testimonial.name"
        type="button"
        class="proof-dot"
        :class="{ 'proof-dot--active': i === active }"
        :aria-label="`Show testimonial from ${testimonial.name}`"
        :aria-pressed="i === active"
        @click="show(i)"
        @focus="paused = true"
        @blur="paused = false"
      />
    </div>
  </section>
</template>

<style scoped>
/* Sits in the hero's right column, so the heading is for screen readers only. */
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
}

.proof-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  grid-area: 1 / 1;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0s linear 0.4s;
}

.proof-card--active {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.4s ease;
}

html.dark .proof-card {
  background: #1e293b;
  border-color: #334155;
}

.proof-quote {
  margin: 0 0 16px;
  font-size: 15px;
  line-height: 1.6;
  color: #334155;
  text-align: left;
}

html.dark .proof-quote { color: #cbd5e1; }

.proof-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
}

html.dark .proof-footer { border-top-color: #334155; }

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

.proof-dots {
  display: flex;
  justify-content: center;
  margin-top: 6px;
}

/* 24px hit area around an 8px dot */
.proof-dot {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.proof-dot::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #cbd5e1;
}

html.dark .proof-dot::before { background: #475569; }

.proof-dot--active::before,
html.dark .proof-dot--active::before { background: #13b0ee; }

@media (prefers-reduced-motion: reduce) {
  .proof-card,
  .proof-card--active { transition: none; }
}

@media (max-width: 480px) {
  .proof-card { padding: 20px; }
  /* The university is already named in the text; the logo would wrap
     onto its own line at this width. */
  .proof-logo { display: none; }
}
</style>
