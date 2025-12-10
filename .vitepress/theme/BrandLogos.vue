<script setup>
import { ref } from 'vue'

const logos = [
  {
    src: '/assets/testimonials/mailsmiths.webp',
    alt: 'Mailsmiths',
    url: 'https://mailsmiths.com/audit'
  },    
  {
    src: '/assets/testimonials/trendfingers.webp',
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
      <h3 class="brand-logos-title">Trusted by Marketing Agencies & Teams Worldwide</h3>
      <p class="brand-logos-subtitle">Join companies that deliver exceptional email campaigns with BlueFox Email</p>
    </div>
    
    <div class="logos-carousel">
      <div class="logos-track">
        <!-- First set of logos -->
        <div 
          v-for="(logo, index) in logos" 
          :key="`logo-1-${index}`" 
          class="logo-item"
        >
          <a 
            :href="logo.url" 
            target="_blank" 
            rel="noopener noreferrer"
            :title="`Visit ${logo.alt}`"
          >
            <img 
              :src="logo.src" 
              :alt="logo.alt"
              class="logo-image"
              loading="lazy"
            />
          </a>
        </div>
        
        <!-- Duplicate set for seamless loop -->
        <div 
          v-for="(logo, index) in logos" 
          :key="`logo-2-${index}`" 
          class="logo-item"
          aria-hidden="true"
        >
          <a 
            :href="logo.url" 
            target="_blank" 
            rel="noopener noreferrer"
            tabindex="-1"
          >
            <img 
              :src="logo.src" 
              :alt="logo.alt"
              class="logo-image"
              loading="lazy"
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
  /* border-bottom: 1px solid rgba(229, 231, 235, 0.3); */
}

html.dark .brand-logos-section {
  border-top: 1px solid rgba(75, 85, 99, 0.3);
  /* border-bottom: 1px solid rgba(75, 85, 99, 0.3); */
}

.brand-logos-intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 48px;
}

.brand-logos-title {
  font-size: 18px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 8px;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

html.dark .brand-logos-title {
  color: #9ca3af;
}

.brand-logos-subtitle {
  font-size: 15px;
  color: #9ca3af;
  line-height: 1.6;
  margin: 0;
}

html.dark .brand-logos-subtitle {
  color: #6b7280;
}

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
}

.logos-carousel::before {
  left: 0;
  background: linear-gradient(
    to right,
    var(--vp-c-bg) 0%,
    transparent 100%
  );
}

.logos-carousel::after {
  right: 0;
  background: linear-gradient(
    to left,
    var(--vp-c-bg) 0%,
    transparent 100%
  );
}

.logos-track {
  display: flex;
  gap: 80px;
  animation: scroll 30s linear infinite;
  width: fit-content;
}

.logos-track:hover {
  animation-play-state: paused;
}

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
  transition: all 0.3s ease;
  text-decoration: none;
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
  transition: all 0.3s ease;
  display: block;
  filter: grayscale(100%) opacity(0.7);
}

.logo-item a:hover .logo-image {
  filter: grayscale(0%) opacity(1);
}

/* Dark mode: brighter, higher opacity, more contrast so they pop */
html.dark .logo-image {
  filter: grayscale(100%) opacity(0.9) brightness(1.6) contrast(1.1);
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
