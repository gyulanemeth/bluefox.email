<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useSwipe } from '@vueuse/core'

const props = defineProps({
  isDark: { type: Boolean, default: false },
  lgAndUp: { type: Boolean, default: true },
  md: { type: Boolean, default: false },
  sm: { type: Boolean, default: false },
  xs: { type: Boolean, default: false }
})

const templates = [
  {
    id: 'open-day',
    title: 'Open Day Invitation',
    category: 'Events',
    accent: '#6366f1',
    sender: 'Admissions Office',
    layout: 'hero',
    kicker: 'Saturday 14 March',
    headline: 'Open Day 2026',
    cta: 'Reserve your place'
  },
  {
    id: 'scholarship',
    title: 'Scholarship Deadline',
    category: 'Student news',
    accent: '#13b0ee',
    sender: 'Student Funding',
    layout: 'hero',
    kicker: 'Applications close 30 April',
    headline: 'Merit scholarships are open',
    cta: 'Start your application'
  },
  {
    id: 'alumni-reunion',
    title: 'Alumni Reunion',
    category: 'Alumni',
    accent: '#f59e0b',
    sender: 'Alumni Relations',
    layout: 'stats',
    kicker: 'Class of 2016',
    headline: 'Ten years on. Come back.',
    cta: 'RSVP for the weekend',
    stats: [
      { value: '410', label: 'Attending' },
      { value: '2 days', label: 'Programme' },
      { value: 'Free', label: 'For alumni' }
    ]
  },
  {
    id: 'student-newsletter',
    title: 'Monthly Student Newsletter',
    category: 'Newsletter',
    accent: '#10b981',
    sender: 'Student Communications',
    layout: 'list',
    kicker: 'March edition',
    headline: 'This month on campus',
    cta: 'Read the full issue',
    rows: [
      { date: '04 MAR', lines: 2 },
      { date: '11 MAR', lines: 2 },
      { date: '22 MAR', lines: 2 }
    ]
  },
  {
    id: 'department-notice',
    title: 'Department Announcement',
    category: 'Internal',
    accent: '#392c91',
    sender: 'Faculty of Engineering',
    layout: 'hero',
    kicker: 'Staff and faculty',
    headline: 'Semester timetable published',
    cta: 'View the timetable'
  }
]

const categoryColors = {
  'Events':       '#6366F1',
  'Student news': '#13B0EE',
  'Alumni':       '#D97706',
  'Newsletter':   '#16A34A',
  'Internal':     '#392C91'
}

const activeIndex = ref(0)
const isHovered = ref(false)
const viewport = ref(null)
let timer = null

const isWide = computed(() => props.lgAndUp || props.md)

function next() {
  activeIndex.value = (activeIndex.value + 1) % templates.length
}

function prev() {
  activeIndex.value = (activeIndex.value - 1 + templates.length) % templates.length
}

function goTo(index) {
  activeIndex.value = index
}

function getCardOffset(index) {
  return ((index - activeIndex.value) % templates.length + templates.length) % templates.length
}

function getCardStyle(index) {
  const offset = getCardOffset(index)
  const total = templates.length

  if (isWide.value) {
    if (offset === 0) {
      return { transform: 'translateX(-50%) scale(1)', opacity: '1', zIndex: 3, pointerEvents: 'auto' }
    }
    if (offset === 1) {
      return { transform: 'translateX(20%) scale(0.85)', opacity: '1', zIndex: 1, pointerEvents: 'auto', cursor: 'pointer' }
    }
    if (offset === total - 1) {
      return { transform: 'translateX(-120%) scale(0.85)', opacity: '1', zIndex: 1, pointerEvents: 'auto', cursor: 'pointer' }
    }
    return { transform: 'translateX(-50%) scale(0.7)', opacity: '0', zIndex: 0, pointerEvents: 'none' }
  }

  // Mobile: only the centre card is visible. Neighbours are parked off to the
  // sides rather than at centre, so a change slides instead of crossfading in
  // place (which reads as doubled text mid-transition).
  if (offset === 0) {
    return { transform: 'translateX(-50%) scale(1)', opacity: '1', zIndex: 3, pointerEvents: 'auto' }
  }
  if (offset === 1) {
    return { transform: 'translateX(60%) scale(0.85)', opacity: '0', zIndex: 0, pointerEvents: 'none' }
  }
  if (offset === total - 1) {
    return { transform: 'translateX(-160%) scale(0.85)', opacity: '0', zIndex: 0, pointerEvents: 'none' }
  }
  return { transform: 'translateX(-50%) scale(0.7)', opacity: '0', zIndex: 0, pointerEvents: 'none' }
}

function isCenter(index) {
  return getCardOffset(index) === 0
}

function onCardClick(index) {
  if (!isCenter(index)) goTo(index)
}

function startAutoRotate() {
  stopAutoRotate()
  timer = setInterval(() => {
    if (!isHovered.value) next()
  }, 2600)
}

function stopAutoRotate() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startAutoRotate()
  if (viewport.value) {
    useSwipe(viewport, {
      onSwipeEnd(e, direction) {
        if (direction === 'left') next()
        if (direction === 'right') prev()
      }
    })
  }
})

onBeforeUnmount(() => {
  stopAutoRotate()
})
</script>

<template>
  <div
    class="ut-root"
    :class="{ 'ut-root--dark': isDark }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    role="region"
    aria-roledescription="carousel"
    aria-label="University email template showcase"
    tabindex="0"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
  >
    <div class="ut-viewport" ref="viewport">
      <div
        v-for="(tpl, i) in templates"
        :key="tpl.id"
        class="ut-card"
        :class="{ 'ut-card--center': isCenter(i) }"
        :style="getCardStyle(i)"
        :aria-hidden="!isCenter(i)"
        @click="onCardClick(i)"
      >
        <v-card class="ut-inner-card" :elevation="isCenter(i) ? 12 : 2" rounded="lg">
          <!-- Miniature email preview -->
          <div class="ut-mail" aria-hidden="true">
            <div class="ut-mail-head">
              <span class="ut-crest" :style="{ background: tpl.accent }"></span>
              <span class="ut-sender">{{ tpl.sender }}</span>
            </div>

            <div class="ut-hero" :style="{ background: `linear-gradient(135deg, ${tpl.accent}, ${tpl.accent}b3)` }">
              <span class="ut-hero-kicker">{{ tpl.kicker }}</span>
              <span class="ut-hero-title">{{ tpl.headline }}</span>
            </div>

            <div class="ut-mail-body">
              <!-- Hero layout: paragraph + button -->
              <template v-if="tpl.layout === 'hero'">
                <span class="ut-line"></span>
                <span class="ut-line"></span>
                <span class="ut-line ut-line--short"></span>
                <span class="ut-rule"></span>
                <span class="ut-line"></span>
                <span class="ut-line ut-line--short"></span>
              </template>

              <!-- List layout: dated rows -->
              <template v-else-if="tpl.layout === 'list'">
                <div v-for="row in tpl.rows" :key="row.date" class="ut-row">
                  <span class="ut-row-date" :style="{ color: tpl.accent, borderColor: `${tpl.accent}40` }">{{ row.date }}</span>
                  <span class="ut-row-lines">
                    <span class="ut-line"></span>
                    <span class="ut-line ut-line--short"></span>
                  </span>
                </div>
              </template>

              <!-- Stats layout: three tiles -->
              <template v-else>
                <span class="ut-line"></span>
                <span class="ut-line ut-line--short"></span>
                <span class="ut-rule"></span>
                <div class="ut-stats">
                  <div v-for="stat in tpl.stats" :key="stat.label" class="ut-stat">
                    <span class="ut-stat-value" :style="{ color: tpl.accent }">{{ stat.value }}</span>
                    <span class="ut-stat-label">{{ stat.label }}</span>
                  </div>
                </div>
              </template>

              <span class="ut-btn" :style="{ background: tpl.accent }">{{ tpl.cta }}</span>
            </div>

            <div class="ut-mail-foot">
              <span class="ut-line ut-line--faint"></span>
              <span class="ut-line ut-line--faint ut-line--short"></span>
            </div>
          </div>

          <div class="ut-card-footer">
            <v-chip size="small" label :style="{ background: categoryColors[tpl.category], color: '#fff' }">
              <span class="ut-chip-text">{{ tpl.category }}</span>
            </v-chip>
            <div class="ut-card-title">{{ tpl.title }}</div>
          </div>
        </v-card>
      </div>
    </div>

    <v-btn
      icon
      variant="flat"
      size="small"
      class="ut-arrow ut-arrow--left"
      @click="prev"
      aria-label="Previous template"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn
      icon
      variant="flat"
      size="small"
      class="ut-arrow ut-arrow--right"
      @click="next"
      aria-label="Next template"
    >
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>

    <div class="ut-dots" role="tablist" aria-label="Template navigation">
      <button
        v-for="(tpl, i) in templates"
        :key="tpl.id"
        class="ut-dot"
        :class="{ 'ut-dot--active': activeIndex === i }"
        :aria-label="`Go to template ${i + 1}: ${tpl.title}`"
        :aria-selected="activeIndex === i"
        role="tab"
        @click="goTo(i)"
      />
    </div>

    <div class="visually-hidden" aria-live="polite" aria-atomic="true">
      Template {{ activeIndex + 1 }} of {{ templates.length }}: {{ templates[activeIndex].title }}
    </div>
  </div>
</template>

<style scoped>
.ut-root {
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 48px;
  outline: none;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
}

.ut-viewport {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: visible;
  touch-action: pan-y;
}

.ut-card {
  position: absolute;
  top: 0;
  left: 50%;
  width: 300px;
  transition:
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.ut-inner-card {
  overflow: hidden;
  border: 1px solid rgba(19, 176, 238, 0.15);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

html.dark .ut-inner-card { border-color: rgba(19, 176, 238, 0.25); }

.ut-card:not(.ut-card--center) .ut-mail { filter: brightness(0.94) saturate(0.75); }
html.dark .ut-card:not(.ut-card--center) .ut-mail { filter: brightness(0.7) saturate(0.7); }

/* ---- Miniature email ---- */
.ut-mail {
  aspect-ratio: 3 / 4;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  transition: filter 0.4s ease;
}

html.dark .ut-mail { background: #111c2e; }

.ut-mail-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid #eef2f7;
}

html.dark .ut-mail-head { border-bottom-color: rgba(148, 163, 184, 0.18); }

.ut-crest {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  flex: 0 0 auto;
}

.ut-sender {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #64748b;
}

html.dark .ut-sender { color: #94a3b8; }

.ut-hero {
  padding: 22px 14px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.ut-hero-kicker {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
}

.ut-hero-title {
  font-size: 17px;
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
}

.ut-mail-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 14px;
}

.ut-line {
  display: block;
  height: 6px;
  border-radius: 3px;
  background: #e6ebf2;
}

html.dark .ut-line { background: rgba(148, 163, 184, 0.22); }

.ut-line--short { width: 62%; }
.ut-line--faint { opacity: 0.55; height: 4px; }

.ut-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ut-row-date {
  flex: 0 0 auto;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 4px 5px;
  border: 1px solid;
  border-radius: 5px;
}

.ut-row-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.ut-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-top: 2px;
}

.ut-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 7px 5px;
  border-radius: 6px;
  background: #f5f8fb;
  text-align: center;
}

html.dark .ut-stat { background: rgba(148, 163, 184, 0.12); }

.ut-stat-value { font-size: 11px; font-weight: 800; line-height: 1.1; }

.ut-stat-label {
  font-size: 7px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #94a3b8;
}

.ut-rule {
  display: block;
  height: 1px;
  margin: 3px 0;
  background: #eef2f7;
}

html.dark .ut-rule { background: rgba(148, 163, 184, 0.18); }

.ut-btn {
  margin-top: auto;
  align-self: flex-start;
  padding: 7px 12px;
  border-radius: 6px;
  font-size: 9px;
  font-weight: 700;
  color: #ffffff;
}

.ut-mail-foot {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px 14px;
  border-top: 1px solid #eef2f7;
}

html.dark .ut-mail-foot { border-top-color: rgba(148, 163, 184, 0.18); }

/* ---- Card footer ---- */
.ut-card-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
}

.ut-chip-text {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.ut-card-title {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

html.dark .ut-card-title { color: #f1f5f9; }

/* ---- Arrows ---- */
.ut-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-80%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

html.dark .ut-arrow {
  background: rgba(31, 41, 55, 0.9) !important;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.ut-arrow:hover { box-shadow: 0 4px 20px rgba(19, 176, 238, 0.25); }

.ut-arrow--left { left: 4px; }
.ut-arrow--right { right: 4px; }

/* ---- Dots ---- */
.ut-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.ut-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 0;
  padding: 0;
  cursor: pointer;
  background: #cbd5e1;
  transition: background 0.25s ease, width 0.25s ease;
}

html.dark .ut-dot { background: #475569; }

.ut-dot--active,
html.dark .ut-dot--active {
  width: 22px;
  border-radius: 4px;
  background: #13b0ee;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 960px) {
  .ut-root { padding: 0 32px; }
  .ut-viewport { height: 470px; }
  .ut-card { width: 280px; }
}

@media (max-width: 599px) {
  .ut-root { padding: 0 16px; }
  .ut-viewport { height: 440px; }
  .ut-card { width: 260px; }
}

@media (prefers-reduced-motion: reduce) {
  .ut-card { transition: none; }
}
</style>
