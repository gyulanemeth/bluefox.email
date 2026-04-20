<script setup>
const colA = [
  '/assets/templates/spring-newsletter-ecommerce-seasonal-promotional-newsletter-template.webp',
  '/assets/templates/clean-b2b-newsletter-responsive-email.webp',
  '/assets/templates/modern-business-portfolio-welcome-email.webp'
]

const colB = [
  '/assets/templates/easter-egg-hunt-party-template.webp',
  '/assets/templates/marketing-agency-modern-responsive-newsletter.webp',
  '/assets/templates/summer-newsletter-fully-responsive-html-email.webp'
]

const colC = [
  '/assets/templates/black-friday-webshop-sale-promo.webp',
  '/assets/templates/shoes-ecommerce-email-template-marketo.webp',
  '/assets/templates/happy-easter-travel-template.webp'
]
</script>

<template>
  <div class="heroDiv">
    <div class="templatesFlow" aria-hidden="true">
      <div class="templateCol">
        <img v-for="(src, i) in colA" :key="`a-${i}`" :src="src" loading="lazy" alt="" />
      </div>
      <div class="templateCol templateCol--shift">
        <img v-for="(src, i) in colB" :key="`b-${i}`" :src="src" loading="lazy" alt="" />
      </div>
      <div class="templateCol">
        <img v-for="(src, i) in colC" :key="`c-${i}`" :src="src" loading="lazy" alt="" />
      </div>
    </div>

    <div class="heroMain">
      <div class="heroContent">
        <h1 class="title">
          Supercharge Your Amazon SES
        </h1>
        <p class="tagline">BlueFox Email gives you beautiful emails, smart list management, effortless automation, and in-depth analytics, without giving up any control or deliverability.</p>
        <p class="tagline2">Get started with 3,000 free sends per month and personalized support.</p>

        <v-btn
          size="x-large"
          color="primary"
          variant="flat"
          class="hero-button"
          href="https://app.bluefox.email/accounts/create-account"
          target="_blank"
        >
          <strong>Get More from SES Today</strong>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heroDiv {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 64px) 56px 72px;
  position: relative;
  left: calc(-50vw + 50%);
  width: 100vw;
  box-sizing: border-box;
  background: linear-gradient(278deg, hsl(247.72, 53.44%, 90%) 10%, hsl(196.99, 86.56%, 90%) 90%);
  overflow: hidden;
}

html.dark .heroDiv {
  background: linear-gradient(278deg, hsl(247.72, 53.44%, 10%) 10%, hsl(196.99, 86.56%, 10%) 90%);
}

.heroMain {
  max-width: 1240px;
  margin: 0 auto;
  min-height: calc(100vh - var(--vp-nav-height) - var(--vp-layout-top-height, 0px) - 136px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  z-index: 2;
}

.heroContent {
  text-align: left;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title {
  font-size: clamp(34px, 5vw, 56px);
  background: -webkit-linear-gradient(120deg, #392c91 5%, #13b0ee);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.15;
  margin-bottom: 16px;
  border-top: 0 !important;
  padding-top: 0 !important;
}

html.dark .title {
  background: -webkit-linear-gradient(120deg, #8a7ed8 5%, #13b0ee);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagline {
  font-size: 20px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0;
}

.tagline2 {
  font-size: 17px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-top: 12px;
  font-weight: 600;
}

.hero-button {
  margin-top: 18px;
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-radius: 10px !important;
  min-height: 56px !important;
  padding: 0 30px !important;
  text-decoration: none !important;
}

/* Diagonal templates flow */
.templatesFlow {
  position: absolute;
  top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 24px);
  right: -6%;
  bottom: -8%;
  width: 56%;
  display: flex;
  gap: 18px;
  transform: rotate(-14deg);
  transform-origin: top right;
  pointer-events: none;
  z-index: 1;
  mask-image: linear-gradient(255deg, rgba(0, 0, 0, 0.95) 35%, rgba(0, 0, 0, 0.55) 65%, transparent 92%);
  -webkit-mask-image: linear-gradient(255deg, rgba(0, 0, 0, 0.95) 35%, rgba(0, 0, 0, 0.55) 65%, transparent 92%);
}

.templateCol {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
}

.templateCol--shift {
  margin-top: -60px;
}

.templateCol img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 12px 32px -10px rgba(15, 23, 42, 0.25), 0 4px 12px -4px rgba(15, 23, 42, 0.12);
  display: block;
}

html.dark .templateCol img {
  box-shadow: 0 12px 32px -10px rgba(0, 0, 0, 0.6), 0 4px 12px -4px rgba(0, 0, 0, 0.4);
}

@media (max-width: 1100px) {
  .heroContent {
    max-width: 540px;
  }

  .templatesFlow {
    width: 50%;
    opacity: 0.85;
  }
}

@media (max-width: 900px) {
  .templatesFlow {
    display: none;
  }

  .heroMain {
    justify-content: center;
  }

  .heroContent {
    text-align: center;
    align-items: center;
    max-width: 720px;
  }
}

@media (max-width: 768px) {
  .heroDiv {
    min-height: auto;
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 40px) 18px 48px;
  }

  .heroMain {
    min-height: auto;
  }

  .tagline {
    font-size: 17px;
  }

  .tagline2 {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .heroDiv {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 28px) 14px 36px;
  }

  .hero-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
