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
    src: '/assets/templates/marketing-agency-modern-responsive-newsletter.webp',
    alt: 'Marketing agency modern responsive newsletter template',
    title: 'Marketing Agency Newsletter',
    category: 'Agency'
  },
  {
    src: '/assets/templates/shoes-ecommerce-email-template-marketo.webp',
    alt: 'Ecommerce shoes product promotional email template',
    title: 'Ecommerce Product Promo',
    category: 'Ecommerce'
  },
  {
    src: '/assets/templates/saas-cart-abandoned.webp',
    alt: 'SaaS cart abandonment recovery email template',
    title: 'SaaS Cart Abandonment',
    category: 'SaaS'
  },
  {
    src: '/assets/templates/clean-b2b-newsletter-responsive-email.webp',
    alt: 'Clean B2B responsive newsletter email template',
    title: 'Clean B2B Newsletter',
    category: 'B2B'
  },
  {
    src: '/assets/templates/summer-newsletter-fully-responsive-html-email.webp',
    alt: 'Summer fashion fully responsive newsletter email template',
    title: 'Summer Fashion Newsletter',
    category: 'Seasonal'
  },
  {
    src: '/assets/templates/black-friday-webshop-sale-promo.webp',
    alt: 'Black Friday webshop sale promotional email template',
    title: 'Black Friday Sale Promo',
    category: 'Ecommerce'
  },
  {
    src: '/assets/templates/happy-easter-travel-template.webp',
    alt: 'Travel promotional email template with holiday deals',
    title: 'Easter Travel Deals',
    category: 'Travel'
  },
  {
    src: '/assets/templates/modern-business-portfolio-welcome-email.webp',
    alt: 'Modern business portfolio welcome email template',
    title: 'Business Portfolio Welcome',
    category: 'B2B'
  },
  {
    src: '/assets/templates/easter-egg-hunt-party-template.webp',
    alt: 'Easter egg hunt party invitation email template',
    title: 'Easter Event Invitation',
    category: 'Events'
  },
  {
    src: '/assets/templates/spring-newsletter-ecommerce-seasonal-promotional-newsletter-template.webp',
    alt: 'Spring seasonal promotional newsletter email template',
    title: 'Spring Seasonal Newsletter',
    category: 'Seasonal'
  }
]

const categoryColors = {
  Agency:     '#392C91',
  Ecommerce:  '#13B0EE',
  SaaS:       '#7C3AED',
  B2B:        '#0369A1',
  Seasonal:   '#16A34A',
  Travel:     '#D97706',
  Events:     '#DB2777'
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
      return { transform: 'translateX(20%) scale(0.85)', opacity: '0.55', zIndex: 1, pointerEvents: 'auto', cursor: 'pointer' }
    }
    if (offset === total - 1) {
      return { transform: 'translateX(-120%) scale(0.85)', opacity: '0.55', zIndex: 1, pointerEvents: 'auto', cursor: 'pointer' }
    }
    if (offset === 2) {
      return { transform: 'translateX(80%) scale(0.7)', opacity: '0', zIndex: 0, pointerEvents: 'none' }
    }
    if (offset === total - 2) {
      return { transform: 'translateX(-180%) scale(0.7)', opacity: '0', zIndex: 0, pointerEvents: 'none' }
    }
    return { transform: 'translateX(-50%) scale(0.7)', opacity: '0', zIndex: 0, pointerEvents: 'none' }
  }

  // Mobile: only center visible
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

function isVisible(index) {
  const offset = getCardOffset(index)
  if (isWide.value) return offset === 0 || offset === 1 || offset === templates.length - 1
  return offset === 0
}

function onCardClick(index) {
  if (!isCenter(index)) {
    goTo(index)
  }
}

// Auto-rotation
function startAutoRotate() {
  stopAutoRotate()
  timer = setInterval(() => {
    if (!isHovered.value) next()
  }, 2000)
}

function stopAutoRotate() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// Swipe support
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
    class="ts-root"
    :class="{ 'ts-root--dark': isDark }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    role="region"
    aria-roledescription="carousel"
    aria-label="Email template showcase"
    tabindex="0"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
  >
    <!-- Carousel viewport -->
    <div class="ts-viewport" ref="viewport">
      <div
        v-for="(tpl, i) in templates"
        :key="tpl.src"
        class="ts-card"
        :style="getCardStyle(i)"
        :aria-hidden="!isVisible(i)"
        @click="onCardClick(i)"
      >
        <v-card
          class="ts-inner-card"
          :elevation="isCenter(i) ? 12 : 2"
          rounded="lg"
        >
          <div class="ts-img-wrapper">
            <img
              :src="tpl.src"
              :alt="tpl.alt"
              class="ts-img"
              :loading="isVisible(i) ? 'eager' : 'lazy'"
            />
          </div>
          <div class="ts-card-footer">
            <v-chip
              size="small"
              label
              :style="{ background: categoryColors[tpl.category], color: '#fff' }"
            >
              <span class="ts-chip-text">{{ tpl.category }}</span>
            </v-chip>
            <div class="ts-card-title" :class="{ 'ts-card-title--dark': isDark }">
              {{ tpl.title }}
            </div>
          </div>
        </v-card>
      </div>
    </div>

    <!-- Navigation arrows -->
    <v-btn
      icon
      variant="flat"
      size="small"
      class="ts-arrow ts-arrow--left"
      :class="{ 'ts-arrow--mobile': !isWide }"
      @click="prev"
      aria-label="Previous template"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn
      icon
      variant="flat"
      size="small"
      class="ts-arrow ts-arrow--right"
      :class="{ 'ts-arrow--mobile': !isWide }"
      @click="next"
      aria-label="Next template"
    >
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>

    <!-- Dot indicators -->
    <div class="ts-dots" role="tablist" aria-label="Template navigation">
      <button
        v-for="(tpl, i) in templates"
        :key="i"
        class="ts-dot"
        :class="{
          'ts-dot--active': activeIndex === i,
          'ts-dot--dark': isDark
        }"
        :aria-label="`Go to template ${i + 1}: ${tpl.title}`"
        :aria-selected="activeIndex === i"
        role="tab"
        @click="goTo(i)"
      />
    </div>

    <!-- Screen reader live region -->
    <div class="visually-hidden" aria-live="polite" aria-atomic="true">
      Template {{ activeIndex + 1 }} of {{ templates.length }}: {{ templates[activeIndex].title }}
    </div>
  </div>
</template>

<style scoped>
.ts-root {
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 48px;
  outline: none;
}

/* ---- Viewport ---- */
.ts-viewport {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: visible;
  touch-action: pan-y;
}

/* ---- Cards ---- */
.ts-card {
  position: absolute;
  top: 0;
  left: 50%;
  width: 300px;
  transition:
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.ts-inner-card {
  overflow: hidden;
  border: 1px solid rgba(19, 176, 238, 0.15);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.ts-root--dark .ts-inner-card {
  border-color: rgba(19, 176, 238, 0.25);
}

.ts-img-wrapper {
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #f3f4f6;
}

.ts-root--dark .ts-img-wrapper {
  background: #1f2937;
}

.ts-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

/* ---- Card footer ---- */
.ts-card-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
}

.ts-chip-text {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.ts-card-title {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ts-card-title--dark {
  color: #e5e7eb;
}

/* ---- Navigation arrows ---- */
.ts-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-80%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.ts-root--dark .ts-arrow {
  background: rgba(31, 41, 55, 0.9) !important;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.ts-arrow:hover {
  box-shadow: 0 4px 20px rgba(19, 176, 238, 0.25);
}

.ts-arrow--left {
  left: 0;
}

.ts-arrow--right {
  right: 0;
}

.ts-arrow--mobile {
  background: rgba(255, 255, 255, 0.85) !important;
}

.ts-root--dark .ts-arrow--mobile {
  background: rgba(31, 41, 55, 0.85) !important;
}

/* ---- Dot indicators ---- */
.ts-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 16px 0 4px;
}

.ts-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(17, 24, 39, 0.18);
  cursor: pointer;
  padding: 0;
  transition: background 0.3s ease, width 0.3s ease, border-radius 0.3s ease;
  flex-shrink: 0;
}

.ts-dot--dark {
  background: rgba(255, 255, 255, 0.18);
}

.ts-dot--active {
  background: #13B0EE;
  width: 24px;
  border-radius: 4px;
}

.ts-dot--dark.ts-dot--active {
  background: #13B0EE;
}

/* ---- Screen reader only ---- */
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

/* ---- Responsive ---- */
@media (max-width: 960px) {
  .ts-root {
    padding: 0 36px;
  }

  .ts-card {
    width: 280px;
  }

  .ts-viewport {
    height: 440px;
  }
}

@media (max-width: 599px) {
  .ts-root {
    padding: 0 28px;
  }

  .ts-card {
    width: 260px;
  }

  .ts-viewport {
    height: 410px;
  }

  .ts-arrow--left {
    left: -4px;
  }

  .ts-arrow--right {
    right: -4px;
  }
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .ts-card {
    transition-duration: 0.01ms !important;
  }
}
</style>
