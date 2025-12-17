<script setup>
import { ref } from 'vue'

const logos = [
  {
    src: '/assets/testimonials/mailsmiths.webp',
    alt: 'Mailsmiths',
    url: 'https://mailsmiths.com/audit'
  },
  {
    src: '/assets/testimonials/Trendfingers-logo.webp',
    alt: 'TrendFingers',
    url: 'https://trendfingers.com'
  },
  {
    src: '/assets/testimonials/NDcompany.webp',
    alt: 'ND Consulting',
    url: 'https://ndcon.ca/'
  },
  {
    src: '/assets/testimonials/possolutions-logo.webp',
    alt: 'POS Solutions Australia',
    url: 'https://possolutions.com.au'
  },
  {
    src: '/assets/testimonials/clarity-text.webp',
    alt: 'ClarityText',
    url: 'https://www.claritytext.com'
  },
  {
    src: '/assets/testimonials/chamaileon.webp',
    alt: 'Chamaileon',
    url: 'https://chamaileon.io/'
  }
]
</script>

<template>
  <div class="brand-logos-section">
    <div class="brand-logos-intro">
      <h2 class="brand-logos-title" id="brand-logos-heading">Trusted by Marketing Agencies &amp; Teams Worldwide</h2>
      <p class="brand-logos-subtitle">Join companies that deliver exceptional email campaigns with BlueFox Email</p>
    </div>

    <div class="logos-carousel" aria-label="Trusted partner logos">
      <div
        class="logos-track"
        role="list"
        tabindex="-1"
      >
        <div
          v-for="(logo, index) in logos"
          :key="`logo-1-${index}`"
          class="logo-item"
          role="listitem"
        >
          <a
            :href="logo.url"
            target="_blank"
            rel="noopener noreferrer"
            :title="`Visit ${logo.alt}`"
            :aria-label="`Visit ${logo.alt} — opens in a new tab`"
          >
            <img
              :src="logo.src"
              :alt="logo.alt"
              class="logo-image"
              loading="lazy"
              aria-hidden="false"
              draggable="false"
            />
          </a>
        </div>

        <!-- Duplicate set for seamless loop (non-focusable for assistive tech) -->
        <div
          v-for="(logo, index) in logos"
          :key="`logo-2-${index}`"
          class="logo-item"
          role="listitem"
          aria-hidden="true"
        >
          <a
            :href="logo.url"
            target="_blank"
            rel="noopener noreferrer"
            tabindex="-1"
            aria-hidden="true"
            :title="`Visit ${logo.alt}`"
          >
            <img
              :src="logo.src"
              :alt="logo.alt"
              class="logo-image"
              loading="lazy"
              draggable="false"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brand-logos-section {
  padding: 60px 24px;
  background: transparent;
  border-top: 1px solid rgba(229, 231, 235, 0.3);
}

html.dark .brand-logos-section {
  border-top: 1px solid rgba(75, 85, 99, 0.3);
}

.brand-logos-intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 48px;
}

/* Improved contrast: darker colors for title/subtitle */
.brand-logos-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151; /* gray-700 - better contrast */
  margin-bottom: 8px;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

html.dark .brand-logos-title {
  color: #e6edf8; /* light text suitable for dark backgrounds */
}

.brand-logos-subtitle {
  font-size: 15px;
  color: #4b5563; /* gray-600 - improved contrast vs previous value */
  line-height: 1.6;
  margin: 0;
}

html.dark .brand-logos-subtitle {
  color: #9ca3af;
}

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

/* Carousel container */
.logos-carousel {
  position: relative;
  overflow: hidden;
  padding: 20px 0;
}

/* Fade edges effect */
.logos-carousel::before,
.logos-carousel::after {
  content: '';
  position: absolute;
  top: 0;
  width: 150px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  /* Use background aware of page background variable if available */
  background: linear-gradient(to right, var(--vp-c-bg) 0%, transparent 100%);
}

.logos-carousel::after {
  right: 0;
  background: linear-gradient(to left, var(--vp-c-bg) 0%, transparent 100%);
}

/* Track: make it pause on hover and focus-within for keyboard users */
.logos-track {
  display: flex;
  gap: 80px;
  animation: scroll 30s linear infinite;
  width: fit-content;
}

/* Pause animation on hover or keyboard focus inside */
.logos-track:hover,
.logos-track:focus-within {
  animation-play-state: paused;
}

/* Respect user preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .logos-track {
    animation: none !important;
  }
}

/* Scrolling animation */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.logo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 60px;
  padding: 0 20px;
}

.logo-item a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: transform 0.25s ease, filter 0.25s ease;
  text-decoration: none;
}

/* Give focused link a visible focus ring (improves keyboard visibility) */
.logo-item a:focus {
  outline: 3px solid rgba(59, 130, 246, 0.25); /* blue-500 with alpha */
  outline-offset: 4px;
  border-radius: 6px;
  transform: translateY(-2px);
}

.logo-item a:hover {
  transform: scale(1.08);
}

.logo-image {
  max-height: 50px;
  max-width: 180px;
  min-width: 80px;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: filter 0.25s ease, opacity 0.25s ease, transform 0.25s ease;
  display: block;
  filter: grayscale(100%) opacity(0.6);
  -webkit-user-drag: none;
  user-select: none;
}

.logo-item a:hover .logo-image {
  filter: grayscale(0%) opacity(1);
}

/* Dark mode: brighter, higher opacity, more contrast so they pop */
html.dark .logo-image {
  filter: grayscale(100%) opacity(0.9) brightness(2.35);
}

html.dark .logo-item a:hover .logo-image {
  filter: grayscale(0%) opacity(1) brightness(1.2) contrast(1.05);
}

/* Dark mode fine-tuning */
html.dark .logo-image {
  image-rendering: auto;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .brand-logos-section {
    padding: 40px 24px;
  }

  .brand-logos-intro {
    margin-bottom: 32px;
  }

  .brand-logos-title {
    font-size: 16px;
  }

  .brand-logos-subtitle {
    font-size: 14px;
  }

  .logos-track {
    gap: 60px;
    animation-duration: 25s;
  }

  .logo-item {
    min-width: 100px;
    height: 50px;
    padding: 0 15px;
  }

  .logo-image {
    max-height: 40px;
    max-width: 150px;
    min-width: 60px;
  }
}

@media (max-width: 640px) {
  .brand-logos-section {
    padding: 32px 16px;
  }

  .brand-logos-title {
    font-size: 14px;
  }

  .brand-logos-subtitle {
    font-size: 13px;
  }

  .logos-carousel::before,
  .logos-carousel::after {
    width: 80px;
  }

  .logos-track {
    gap: 40px;
    animation-duration: 20s;
  }

  .logo-item {
    min-width: 80px;
    height: 40px;
    padding: 0 10px;
  }

  .logo-image {
    max-height: 35px;
    max-width: 120px;
    min-width: 50px;
  }
}
</style>
