<script setup>
import { ref } from 'vue'

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
})

// Duplicate integrations for seamless infinite scroll
const integrations = [
  {
    name: 'Zapier',
    description: 'Connect with thousands of apps. No code required, automate workflows in minutes.',
    icon: 'mdi-lightning-bolt',
    iconColor: '#FF4A00',
    url: 'https://bluefox.email/docs/integrations/zapier',
    tags: ['No-Code', 'Automation'],
    badge: 'New',
    gradient: 'rgba(255, 74, 0, 0.12), rgba(255, 74, 0, 0.06)'
  },
  {
    name: 'Webhooks',
    description: 'Real-time event notifications for opens, clicks, bounces, and more.',
    icon: 'webhooks',
    url: 'https://bluefox.email/docs/integrations/webhooks',
    tags: ['Real-time', 'Events']
  },
  {
    name: 'API',
    description: 'Full programmatic access with API endpoints. Complete docs with authentication and rate limits.',
    icon: 'mdi-api',
    iconColor: '#13B0EE',
    url: 'https://bluefox.email/docs/api/',
    tags: ['Developer', 'Integration'],
    gradient: 'rgba(19, 176, 238, 0.12), rgba(57, 44, 145, 0.12)'
  },
  {
    name: 'Supabase Auth',
    description: 'Enhanced auth emails with better deliverability and custom branding.',
    icon: 'supabase',
    url: 'https://bluefox.email/docs/integrations/supabase',
    tags: ['Authentication', 'Backend']
  },
  {
    name: 'make.com',
    description: 'Visual automation platform. Build sophisticated workflows without coding.',
    icon: 'make',
    url: 'https://www.make.com/en',
    tags: ['No-Code', 'Automation'],
    comingSoon: true,
    gradient: 'rgba(110, 63, 243, 0.12), rgba(233, 78, 146, 0.12)'
  },
  {
    name: 'Shopify',
    description: 'Seamless e-commerce integration for transactional and marketing emails.',
    icon: 'shopify',
    url: 'https://www.shopify.com/in',
    tags: ['E-commerce', 'Automation'],
    comingSoon: true,
    gradient: 'rgba(149, 191, 71, 0.12), rgba(149, 191, 71, 0.08)'
  }
]
</script>

<template>
<div class="integrations-section">
  <div class="section-header">
    <div class="d-flex justify-center mb-4">
      <v-chip color="primary">
        <span class="text-overline">
          <v-icon size="small" class="mr-1">mdi-puzzle</v-icon>
          Integrations
        </span>
      </v-chip>
    </div>
    <h2 class="section-title">Works With the Tools You Already Use</h2>
    <p class="section-subtitle">
      Plug into your favorite apps and automate your workflows, no technical setup required
    </p>
  </div>

  <!-- Infinite Scrolling Carousel -->
  <div class="carousel-container">
    <div class="carousel-track">
      <!-- First set of cards -->
      <div
        v-for="(integration, index) in integrations"
        :key="`first-${index}`"
        class="carousel-slide"
      >
        <a 
          :href="integration.url"
          :target="integration.comingSoon ? '_self' : '_blank'"
          class="integration-link"
          :class="{ 'disabled': integration.comingSoon }"
        >
          <div class="integration-card">
            <!-- Badge -->
            <div v-if="integration.badge" class="integration-badge new">
              <v-icon size="x-small">mdi-star-four-points</v-icon>
              <span>{{ integration.badge }}</span>
            </div>
            
            <div v-if="integration.comingSoon" class="integration-badge coming-soon">
              <v-icon size="x-small">mdi-clock-outline</v-icon>
              <span>Coming Soon</span>
            </div>
            
            <!-- Icon -->
            <div 
              class="integration-icon"
              :style="integration.gradient ? `background: linear-gradient(135deg, ${integration.gradient})` : ''"
            >
              <v-icon 
                v-if="integration.icon.startsWith('mdi-')"
                :color="integration.iconColor"
                size="40"
              >
                {{ integration.icon }}
              </v-icon>
              <v-img
                v-else
                :width="40"
                :src="isDark ? `/assets/integrations/${integration.icon}-dark.svg` : `/assets/integrations/${integration.icon}-light.svg`"
                :alt="`${integration.name} logo`"
              />
            </div>
            
            <h4 class="integration-name">{{ integration.name }}</h4>
            <p class="integration-desc">{{ integration.description }}</p>
            
            <div class="integration-tags">
              <v-chip 
                v-for="tag in integration.tags" 
                :key="tag"
                size="x-small" 
                variant="tonal"
              >
                {{ tag }}
              </v-chip>
            </div>

            <div class="integration-arrow">
              <v-icon size="small">mdi-arrow-right</v-icon>
            </div>
          </div>
        </a>
      </div>

      <!-- Duplicate set for seamless loop -->
      <div
        v-for="(integration, index) in integrations"
        :key="`second-${index}`"
        class="carousel-slide"
      >
        <a 
          :href="integration.url"
          :target="integration.comingSoon ? '_self' : '_blank'"
          class="integration-link"
          :class="{ 'disabled': integration.comingSoon }"
        >
          <div class="integration-card">
            <!-- Badge -->
            <div v-if="integration.badge" class="integration-badge new">
              <v-icon size="x-small">mdi-star-four-points</v-icon>
              <span>{{ integration.badge }}</span>
            </div>
            
            <div v-if="integration.comingSoon" class="integration-badge coming-soon">
              <v-icon size="x-small">mdi-clock-outline</v-icon>
              <span>Coming Soon</span>
            </div>
            
            <!-- Icon -->
            <div 
              class="integration-icon"
              :style="integration.gradient ? `background: linear-gradient(135deg, ${integration.gradient})` : ''"
            >
              <v-icon 
                v-if="integration.icon.startsWith('mdi-')"
                :color="integration.iconColor"
                size="40"
              >
                {{ integration.icon }}
              </v-icon>
              <v-img
                v-else
                :width="40"
                :src="isDark ? `/assets/integrations/${integration.icon}-dark.svg` : `/assets/integrations/${integration.icon}-light.svg`"
                :alt="`${integration.name} logo`"
              />
            </div>
            
            <h4 class="integration-name">{{ integration.name }}</h4>
            <p class="integration-desc">{{ integration.description }}</p>
            
            <div class="integration-tags">
              <v-chip 
                v-for="tag in integration.tags" 
                :key="tag"
                size="x-small" 
                variant="tonal"
              >
                {{ tag }}
              </v-chip>
            </div>

            <div class="integration-arrow">
              <v-icon size="small">mdi-arrow-right</v-icon>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.integrations-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 16px 0;
  padding: 0;
  border: none !important;
}

.section-subtitle {
  font-size: clamp(16px, 2vw, 18px);
  color: var(--vp-c-text-2);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Carousel Container */
.carousel-container {
  position: relative;
  overflow: hidden;
  padding: 20px 0;
  
  /* Gradient masks for fade effect */
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.carousel-track {
  display: flex;
  gap: 24px;
  animation: scroll 40s linear infinite;
  width: fit-content;
}

/* Pause animation on hover */
.carousel-container:hover .carousel-track {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-1 * (360px + 24px) * 6));
  }
}

.carousel-slide {
  flex: 0 0 360px;
  width: 360px;
}

.integration-link {
  text-decoration: none;
  display: block;
  height: 100%;
}

.integration-link.disabled {
  pointer-events: none;
  cursor: default;
}

.integration-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 32px;
  height: 100%;
  min-height: 320px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
}

.integration-link:not(.disabled):hover .integration-card {
  transform: translateY(-8px);
  box-shadow: 0 10px 30px rgba(19, 176, 238, 0.2);
  border-color: rgba(19, 176, 238, 0.5);
  overflow: none;
}

html.dark .integration-link:not(.disabled):hover .integration-card {
  box-shadow: 0 10px 20px rgba(19, 176, 238, 0.3);
}

.integration-link.disabled .integration-card {
  opacity: 0.7;
  cursor: not-allowed;
}

.integration-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
}

.integration-badge.new {
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
}

.integration-badge.coming-soon {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2));
  color: #F59E0B;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

html.dark .integration-badge.coming-soon {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.15));
  color: #FCD34D;
  border: 1px solid rgba(252, 211, 77, 0.3);
}

.integration-icon {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.08), rgba(57, 44, 145, 0.08));
  transition: transform 0.4s ease;
}

.integration-link:hover .integration-icon {
  transform: scale(1.05) rotate(-3deg);
}

.integration-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
}

.integration-desc {
  font-size: 15px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 20px 0;
  flex: 1;
}

.integration-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.integration-arrow {
  display: flex;
  justify-content: flex-end;
  opacity: 0.4;
  transition: all 0.3s ease;
  color: var(--vp-c-text-2);
}

.integration-link:not(.disabled):hover .integration-arrow {
  opacity: 1;
  transform: translateX(4px);
  color: rgb(var(--v-theme-primary));
}

/* Responsive */
@media (max-width: 1024px) {
  .carousel-slide {
    flex: 0 0 320px;
    width: 320px;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-1 * (320px + 24px) * 6));
    }
  }
}

@media (max-width: 768px) {
  .carousel-slide {
    flex: 0 0 280px;
    width: 280px;
  }
  
  .integration-card {
    padding: 24px;
    min-height: 300px;
  }
  
  .integration-icon {
    width: 64px;
    height: 64px;
  }
  
  .integration-name {
    font-size: 20px;
  }
  
  .integration-desc {
    font-size: 14px;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-1 * (280px + 24px) * 6));
    }
  }
}

@media (max-width: 640px) {
  .section-header {
    margin-bottom: 48px;
  }
  
  .carousel-container {
    padding: 16px 0;
  }
  
  .carousel-slide {
    flex: 0 0 260px;
    width: 260px;
  }
  
  .integration-card {
    padding: 20px;
    min-height: 280px;
  }
  
  .integration-icon {
    width: 56px;
    height: 56px;
    margin-bottom: 20px;
  }
  
  .integration-name {
    font-size: 18px;
  }
  
  .integration-desc {
    font-size: 13px;
  }
  
  .integration-badge {
    top: 16px;
    right: 16px;
    padding: 4px 10px;
    font-size: 9px;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-1 * (260px + 24px) * 6));
    }
  }
}
</style>
