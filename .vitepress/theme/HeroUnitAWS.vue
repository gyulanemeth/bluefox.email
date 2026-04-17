<script setup>
</script>

<template>
  <div class="heroDiv">
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
  justify-content: center;
}

.heroContent {
  text-align: center;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
