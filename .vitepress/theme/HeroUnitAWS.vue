<script setup>
import { useData } from 'vitepress'

const { isDark } = useData()

const sesFeatureItems = [
  {
    title: 'Bring your own SES infrastructure',
    description: 'Keep your AWS identities, reputation, and compliance controls while upgrading your UX.',
    metric: 'Control + convenience'
  },
  {
    title: 'Marketing + transactional in one flow',
    description: 'Run campaigns, automations, and triggered messages from one platform on top of SES.',
    metric: 'One operating layer'
  },
  {
    title: 'Faster setup with support',
    description: 'Connect SES and SNS quickly with practical guidance for production-ready sending.',
    metric: 'Launch in minutes'
  }
]
</script>

<template>
  <div class="heroDiv">
    <div class="heroMain">
      <div class="heroGrid">
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

        <aside class="feature-panel" aria-label="Amazon SES user highlights">
          <p class="panel-kicker">For Amazon SES users</p>
          <h2 class="panel-title">Everything you need on top of SES</h2>
          <p class="panel-subtitle">Keep SES deliverability power while gaining faster production workflows, automation, and reporting clarity.</p>

          <ul class="feature-list" role="list">
            <li v-for="(item, index) in sesFeatureItems" :key="`${item.title}-${index}`" class="feature-card" role="listitem">
              <p class="feature-title">{{ item.title }}</p>
              <p class="feature-description">{{ item.description }}</p>
              <p class="feature-metric">{{ item.metric }}</p>
            </li>
          </ul>

          <img
            :src="`/assets/mascot-bring-your-own-awsses${isDark ? '-dark' : ''}-450x270.webp`"
            alt="Bring your own Amazon SES"
            class="panelImage"
            width="450"
            height="270"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heroDiv {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  min-height: 95vh;
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 64px) 56px 64px;
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
  max-width: 1280px;
  margin: 0 auto;
}

.heroGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
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
}

.feature-panel {
  width: 100%;
  border-radius: 20px;
  padding: 26px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(19, 176, 238, 0.28);
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 60px rgba(19, 176, 238, 0.14);
}

html.dark .feature-panel {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(19, 176, 238, 0.38);
}

.panel-kicker {
  margin: 0;
  color: #0e7490;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  font-size: 12px;
}

.panel-title {
  margin: 8px 0 8px;
  font-size: clamp(24px, 3vw, 30px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.panel-subtitle {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.55;
  font-size: 15px;
}

.feature-list {
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.feature-card {
  border-radius: 14px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(19, 176, 238, 0.22);
}

html.dark .feature-card {
  background: rgba(30, 41, 59, 0.78);
  border-color: rgba(19, 176, 238, 0.3);
}

.feature-title {
  margin: 0;
  font-weight: 700;
  font-size: 14px;
  line-height: 1.3;
}

.feature-description {
  margin: 6px 0 0;
  font-size: 13px;
  line-height: 1.45;
  color: var(--vp-c-text-2);
}

.feature-metric {
  margin: 8px 0 0;
  color: #0e7490;
  font-size: 12px;
  font-weight: 700;
}

.panelImage {
  width: 100%;
  max-width: 330px;
  margin: 14px auto 0;
  display: block;
  height: auto;
}

@media (max-width: 980px) {
  .heroGrid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .heroDiv {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 18px 48px;
  }

  .tagline {
    font-size: 17px;
  }

  .tagline2 {
    font-size: 15px;
  }

  .feature-panel {
    padding: 20px;
  }
}
</style>
