<script setup>
const templates = [
  {
    src: '/assets/templates/summer-newsletter-fully-responsive-html-email.webp',
    alt: 'Summer newsletter template'
  },
  {
    src: '/assets/templates/modern-business-portfolio-welcome-email.webp',
    alt: 'Welcome email template'
  },
  {
    src: '/assets/templates/happy-easter-travel-template.webp',
    alt: 'Travel email template'
  },
  {
    src: '/assets/templates/shoes-ecommerce-email-template-marketo.webp',
    alt: 'Ecommerce email template'
  }
]
</script>

<template>
  <div class="gallery" aria-hidden="true">
    <div class="glow glow--one"></div>
    <div class="glow glow--two"></div>

    <div class="grid">
      <figure
        v-for="(tpl, i) in templates"
        :key="tpl.src"
        class="tile"
        :style="{ '--delay': `${i * 0.08}s` }"
      >
        <div class="tile-chrome">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <img :src="tpl.src" :alt="tpl.alt" loading="lazy" />
      </figure>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  position: relative;
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  padding: 6px 6px 6px;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
}

.glow--one {
  top: -10%;
  left: -10%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(19, 176, 238, 0.3), transparent 70%);
}

.glow--two {
  bottom: -8%;
  right: -8%;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.22), transparent 70%);
}

html.dark .glow--one {
  background: radial-gradient(circle, rgba(19, 176, 238, 0.25), transparent 70%);
}

html.dark .glow--two {
  background: radial-gradient(circle, rgba(139, 92, 246, 0.22), transparent 70%);
}

.grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.tile {
  position: relative;
  margin: 0;
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow:
    0 22px 44px -20px rgba(15, 23, 42, 0.28),
    0 6px 14px -6px rgba(19, 176, 238, 0.18);
  aspect-ratio: 4 / 4.4;
  transform: translateY(10px);
  opacity: 0;
  animation: tile-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) var(--delay, 0s) forwards;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

html.dark .tile {
  background: #0f172a;
  border-color: rgba(148, 163, 184, 0.14);
  box-shadow:
    0 22px 44px -20px rgba(0, 0, 0, 0.55),
    0 6px 14px -6px rgba(19, 176, 238, 0.25);
}

.tile:hover {
  transform: translateY(-6px);
  box-shadow:
    0 30px 60px -20px rgba(19, 176, 238, 0.32),
    0 10px 22px -8px rgba(19, 176, 238, 0.25);
}

@keyframes tile-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tile:nth-child(1) { transform: translateY(10px) rotate(-0.5deg); }
.tile:nth-child(2) { transform: translateY(10px) rotate(0.5deg); margin-top: 20px; }
.tile:nth-child(3) { transform: translateY(10px) rotate(0.5deg); margin-top: -8px; }
.tile:nth-child(4) { transform: translateY(10px) rotate(-0.5deg); margin-top: 12px; }

.tile:nth-child(1):hover { transform: translateY(-6px) rotate(-0.5deg); }
.tile:nth-child(2):hover { transform: translateY(-6px) rotate(0.5deg); }
.tile:nth-child(3):hover { transform: translateY(-6px) rotate(0.5deg); }
.tile:nth-child(4):hover { transform: translateY(-6px) rotate(-0.5deg); }

.tile-chrome {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  background: #f8fafc;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}

html.dark .tile-chrome {
  background: #0b1220;
  border-bottom-color: rgba(148, 163, 184, 0.12);
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #e2e8f0;
}

html.dark .dot {
  background: #334155;
}

.tile img {
  display: block;
  width: 100%;
  height: calc(100% - 27px);
  object-fit: cover;
  object-position: top;
}

.chip {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: #ffffff;
  border-radius: 999px;
  border: 1px solid rgba(19, 176, 238, 0.24);
  box-shadow: 0 14px 32px -10px rgba(19, 176, 238, 0.35);
  white-space: nowrap;
  z-index: 2;
  font-size: 13px;
  font-weight: 700;
  color: #0e7490;
}

html.dark .chip {
  background: #0f172a;
  border-color: rgba(19, 176, 238, 0.35);
  color: #67e8f9;
}

.chip-star {
  color: #f59e0b;
  font-size: 14px;
  line-height: 1;
}

@media (prefers-reduced-motion: reduce) {
  .tile {
    animation: none;
    opacity: 1;
    transform: none !important;
  }
}

@media (max-width: 980px) {
  .gallery {
    max-width: 360px;
    margin: 12px auto 0;
  }
}

@media (max-width: 480px) {
  .gallery {
    max-width: 300px;
    padding: 4px;
  }

  .grid {
    gap: 10px;
  }

  .tile:nth-child(2) { margin-top: 16px; }
  .tile:nth-child(4) { margin-top: 10px; }
}
</style>
