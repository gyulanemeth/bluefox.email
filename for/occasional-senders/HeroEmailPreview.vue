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
    <div class="grid">
      <figure
        v-for="tpl in templates"
        :key="tpl.src"
        class="tile"
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
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  padding: 6px 6px 6px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.tile {
  margin: 0;
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  aspect-ratio: 4 / 4.4;
}

html.dark .tile {
  background: #1e293b;
  border-color: #334155;
}

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
}
</style>
